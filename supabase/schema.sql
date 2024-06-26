
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

CREATE SCHEMA IF NOT EXISTS "mesa";

ALTER SCHEMA "mesa" OWNER TO "postgres";

CREATE EXTENSION IF NOT EXISTS "pg_net" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";

CREATE SCHEMA IF NOT EXISTS "private";

ALTER SCHEMA "private" OWNER TO "postgres";

CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";

CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";

CREATE DOMAIN "mesa"."bps" AS smallint
	CONSTRAINT "bps_check" CHECK (((VALUE >= 0) AND (VALUE <= 10000)));

ALTER DOMAIN "mesa"."bps" OWNER TO "postgres";

CREATE TYPE "mesa"."invitation_status" AS ENUM (
    'open',
    'closed',
    'accepted',
    'rejected'
);

ALTER TYPE "mesa"."invitation_status" OWNER TO "postgres";

CREATE DOMAIN "mesa"."name" AS "text"
	CONSTRAINT "name_check" CHECK ((("char_length"(VALUE) >= 1) AND ("char_length"(VALUE) <= 64)));

ALTER DOMAIN "mesa"."name" OWNER TO "postgres";

CREATE TYPE "mesa"."project_event_type" AS ENUM (
    'mesa.project.create',
    'mesa.project.update'
);

ALTER TYPE "mesa"."project_event_type" OWNER TO "postgres";

CREATE TYPE "mesa"."project_user_role" AS ENUM (
    'owner'
);

ALTER TYPE "mesa"."project_user_role" OWNER TO "postgres";

CREATE DOMAIN "mesa"."title" AS "text"
	CONSTRAINT "title_check" CHECK ((("char_length"(VALUE) >= 1) AND ("char_length"(VALUE) <= 80)));

ALTER DOMAIN "mesa"."title" OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "private"."get_default_user_name"("_user_id" "uuid") RETURNS "text"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
BEGIN
  RETURN split_part((SELECT email FROM auth.users WHERE id = _user_id), '@', 1);
END;
$$;

ALTER FUNCTION "private"."get_default_user_name"("_user_id" "uuid") OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "private"."mesa_check_project_user_invitation"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
BEGIN
  DECLARE
    invitation_project_id UUID;
    invitation_user_id UUID;
    invitation_status mesa.invitation_status;
  BEGIN
    
    SELECT 
      project_id, 
      user_id, 
      status
    INTO 
      invitation_project_id, 
      invitation_user_id,
      invitation_status 
    FROM 
      mesa.project_invitations 
    WHERE 
      id = NEW.invitation_id;

    IF invitation_project_id IS NULL THEN
      RAISE EXCEPTION 'Invitation project id is null';
    END IF;
    IF invitation_project_id != NEW.project_id THEN
      RAISE EXCEPTION 'Invitation project mismatch. Expected % but got %', NEW.project_id, invitation_project_id;
    END IF;
    IF invitation_user_id != NEW.user_id THEN
      RAISE EXCEPTION 'Invitation user mismatch. Expected % but got %', NEW.user_id, invitation_user_id;
    END IF;
    IF invitation_status != 'accepted' THEN
      RAISE EXCEPTION 'Invitation status mismatch. Expected "accepted" but got "%"', invitation_status;
    END IF;
  END;
  RETURN NEW;
END;
$$;

ALTER FUNCTION "private"."mesa_check_project_user_invitation"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "private"."mesa_check_project_user_role"("_project_id" "uuid", "_user_id" "uuid", "_user_role" "mesa"."project_user_role") RETURNS boolean
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM mesa.project_users
    WHERE project_id = _project_id 
      AND user_id = _user_id 
      AND user_role = _user_role
  );
END;
$$;

ALTER FUNCTION "private"."mesa_check_project_user_role"("_project_id" "uuid", "_user_id" "uuid", "_user_role" "mesa"."project_user_role") OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "private"."mesa_handle_invitation_accepted"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
BEGIN
  IF TG_OP = 'UPDATE' AND OLD.status = NEW.status THEN
    -- skip, status not changed
    RETURN NEW;
  END IF;

  IF NEW.status = 'accepted' and (select auth.uid()) = NEW.user_id THEN
    
    RAISE LOG 'Invitation accepted: %. Adding user % to project % with role %.',
      NEW.id, NEW.user_id, NEW.project_id, NEW.user_role;
    
    INSERT INTO mesa.project_users 
    (
      project_id, 
      user_id, 
      user_role, 
      user_name, 
      user_bps, 
      invitation_id
    )
    VALUES 
    (
      NEW.project_id, 
      NEW.user_id, 
      NEW.user_role, 
      NEW.user_name, 
      NEW.user_bps, 
      NEW.id
    );
    
  END IF;
  
  RETURN NEW;
END;
$$;

ALTER FUNCTION "private"."mesa_handle_invitation_accepted"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "private"."mesa_handle_project_created"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
BEGIN
  IF TG_OP = 'INSERT' AND (select auth.uid()) = NEW.created_by THEN
    
    RAISE LOG 'Project created: %. Adding creator % as owner via accepted invitation.',
      NEW.id, NEW.created_by;
    
    INSERT INTO mesa.project_invitations 
    (
      project_id, 
      user_id, 
      user_role, 
      user_name, 
      user_bps, 
      status
    )
    VALUES 
    (
      NEW.id, 
      NEW.created_by, 
      'owner', 
      private.get_default_user_name(NEW.created_by), 
      10000, 
      'accepted'
    );
    
  END IF;
  RETURN NEW;
END;
$$;

ALTER FUNCTION "private"."mesa_handle_project_created"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "private"."mesa_handle_row_meta"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    NEW.created_by := (select auth.uid());
    NEW.created_at := CURRENT_TIMESTAMP;
    NEW.updated_at := CURRENT_TIMESTAMP;
  END IF;
  IF TG_OP = 'UPDATE' THEN
    IF NEW.created_by != OLD.created_by THEN
      RAISE EXCEPTION 'created_by cannot be changed';
    END IF;
    IF NEW.created_at != OLD.created_at THEN
      RAISE EXCEPTION 'created_at cannot be changed';
    END IF;
    NEW.updated_at := CURRENT_TIMESTAMP;
  END IF;
  RETURN NEW;
END;
$$;

ALTER FUNCTION "private"."mesa_handle_row_meta"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "private"."mesa_prevent_update"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'private', 'pg_temp'
    AS $$
BEGIN
  IF TG_OP = 'UPDATE' THEN
    RAISE EXCEPTION 'Updates to project_events are not allowed';
  END IF;
  RETURN NEW;
END;
$$;

ALTER FUNCTION "private"."mesa_prevent_update"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "private"."set_default_user_name"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
BEGIN
  IF NEW.user_name IS NULL THEN
    NEW.user_name := private.get_default_user_name(NEW.user_id);
  END IF;
  RETURN NEW;
END;
$$;

ALTER FUNCTION "private"."set_default_user_name"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."handle_new_user"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$;

ALTER FUNCTION "public"."handle_new_user"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."user_wallets_check_update"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
begin
  if new.id != old.id
  or new.user_id != old.user_id 
  or new.wallet_address != old.wallet_address 
  or new.managed != old.managed 
  or new.created_at != old.created_at then
    raise exception 'cannot update protected columns: id, user_id, wallet_address, managed, created_at';
  end if;
  return new;
end;
$$;

ALTER FUNCTION "public"."user_wallets_check_update"() OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";

CREATE TABLE IF NOT EXISTS "mesa"."project_events" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "type" "mesa"."project_event_type" NOT NULL,
    "project_id" "uuid" NOT NULL,
    "user_id" "uuid" NOT NULL,
    "payload" "jsonb",
    "attestation" "jsonb" NOT NULL,
    "attestation_meta" "jsonb" NOT NULL,
    "attestation_uid" "text" GENERATED ALWAYS AS (TRIM(BOTH '"'::"text" FROM (("attestation" -> 'uid'::"text"))::"text")) STORED,
    "created_by" "uuid",
    "created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

ALTER TABLE "mesa"."project_events" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "mesa"."project_invitations" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "project_id" "uuid",
    "user_id" "uuid",
    "user_role" "mesa"."project_user_role" DEFAULT 'owner'::"mesa"."project_user_role",
    "created_by" "uuid",
    "created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    "status" "mesa"."invitation_status" DEFAULT 'open'::"mesa"."invitation_status",
    "user_name" "mesa"."name" NOT NULL,
    "user_bps" "mesa"."bps" DEFAULT 0
);

ALTER TABLE "mesa"."project_invitations" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "mesa"."project_users" (
    "project_id" "uuid" NOT NULL,
    "user_id" "uuid" NOT NULL,
    "user_role" "mesa"."project_user_role" DEFAULT 'owner'::"mesa"."project_user_role",
    "user_name" "mesa"."name" NOT NULL,
    "user_bps" "mesa"."bps" DEFAULT 0,
    "invitation_id" "uuid" NOT NULL,
    "created_by" "uuid",
    "created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE "mesa"."project_users" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "mesa"."projects" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "title" "mesa"."title" NOT NULL,
    "description" "text",
    "created_by" "uuid",
    "created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE "mesa"."projects" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."profiles" (
    "id" "uuid" NOT NULL,
    "updated_at" timestamp with time zone,
    "username" "text",
    "full_name" "text",
    "avatar_url" "text",
    "website" "text",
    CONSTRAINT "username_length" CHECK (("char_length"("username") >= 3))
);

ALTER TABLE "public"."profiles" OWNER TO "postgres";

ALTER TABLE ONLY "mesa"."project_events"
    ADD CONSTRAINT "project_events_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "mesa"."project_invitations"
    ADD CONSTRAINT "project_invitations_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "mesa"."project_users"
    ADD CONSTRAINT "project_users_pkey" PRIMARY KEY ("project_id", "user_id");

ALTER TABLE ONLY "mesa"."projects"
    ADD CONSTRAINT "projects_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "mesa"."project_events"
    ADD CONSTRAINT "unique_attestation_uid" UNIQUE ("attestation_uid");

ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_username_key" UNIQUE ("username");

CREATE INDEX "project_invitations_project_id_idx" ON "mesa"."project_invitations" USING "btree" ("project_id");

CREATE INDEX "project_invitations_user_id_idx" ON "mesa"."project_invitations" USING "btree" ("user_id");

CREATE OR REPLACE TRIGGER "10_mesa_project_events_prevent_updates" BEFORE UPDATE ON "mesa"."project_events" FOR EACH ROW EXECUTE FUNCTION "private"."mesa_prevent_update"();

CREATE OR REPLACE TRIGGER "20_mesa_project_events_handle_row_meta" BEFORE INSERT OR UPDATE ON "mesa"."project_events" FOR EACH ROW EXECUTE FUNCTION "private"."mesa_handle_row_meta"();

CREATE OR REPLACE TRIGGER "check_project_user_invitation_trigger" BEFORE INSERT ON "mesa"."project_users" FOR EACH ROW EXECUTE FUNCTION "private"."mesa_check_project_user_invitation"();

CREATE OR REPLACE TRIGGER "handle_invitation_accepted_trigger" AFTER INSERT OR UPDATE ON "mesa"."project_invitations" FOR EACH ROW WHEN (("new"."status" = 'accepted'::"mesa"."invitation_status")) EXECUTE FUNCTION "private"."mesa_handle_invitation_accepted"();

CREATE OR REPLACE TRIGGER "handle_project_created_trigger" AFTER INSERT ON "mesa"."projects" FOR EACH ROW EXECUTE FUNCTION "private"."mesa_handle_project_created"();

CREATE OR REPLACE TRIGGER "handle_row_meta_on_project_invitations" BEFORE INSERT OR UPDATE ON "mesa"."project_invitations" FOR EACH ROW EXECUTE FUNCTION "private"."mesa_handle_row_meta"();

CREATE OR REPLACE TRIGGER "handle_row_meta_on_project_users" BEFORE INSERT OR UPDATE ON "mesa"."project_users" FOR EACH ROW EXECUTE FUNCTION "private"."mesa_handle_row_meta"();

CREATE OR REPLACE TRIGGER "handle_row_meta_on_projects" BEFORE INSERT OR UPDATE ON "mesa"."projects" FOR EACH ROW EXECUTE FUNCTION "private"."mesa_handle_row_meta"();

CREATE OR REPLACE TRIGGER "set_default_user_name_trigger" BEFORE INSERT ON "mesa"."project_users" FOR EACH ROW EXECUTE FUNCTION "private"."set_default_user_name"();

ALTER TABLE ONLY "mesa"."project_events"
    ADD CONSTRAINT "project_events_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "auth"."users"("id");

ALTER TABLE ONLY "mesa"."project_events"
    ADD CONSTRAINT "project_events_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "mesa"."projects"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "mesa"."project_events"
    ADD CONSTRAINT "project_events_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id");

ALTER TABLE ONLY "mesa"."project_invitations"
    ADD CONSTRAINT "project_invitations_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "auth"."users"("id");

ALTER TABLE ONLY "mesa"."project_invitations"
    ADD CONSTRAINT "project_invitations_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "mesa"."projects"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "mesa"."project_invitations"
    ADD CONSTRAINT "project_invitations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "mesa"."project_users"
    ADD CONSTRAINT "project_users_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "auth"."users"("id");

ALTER TABLE ONLY "mesa"."project_users"
    ADD CONSTRAINT "project_users_invitation_id_fkey" FOREIGN KEY ("invitation_id") REFERENCES "mesa"."project_invitations"("id");

ALTER TABLE ONLY "mesa"."project_users"
    ADD CONSTRAINT "project_users_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "mesa"."projects"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "mesa"."project_users"
    ADD CONSTRAINT "project_users_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "mesa"."projects"
    ADD CONSTRAINT "projects_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "auth"."users"("id");

ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;

CREATE POLICY "authenticated_delete_own_project" ON "mesa"."projects" FOR DELETE TO "authenticated" USING ("private"."mesa_check_project_user_role"("id", ( SELECT "auth"."uid"() AS "uid"), 'owner'::"mesa"."project_user_role"));

CREATE POLICY "authenticated_delete_own_project_users" ON "mesa"."project_users" FOR DELETE TO "authenticated" USING ("private"."mesa_check_project_user_role"("project_id", ( SELECT "auth"."uid"() AS "uid"), 'owner'::"mesa"."project_user_role"));

CREATE POLICY "authenticated_insert_new_project" ON "mesa"."projects" FOR INSERT TO "authenticated" WITH CHECK ((( SELECT "auth"."uid"() AS "uid") = "created_by"));

CREATE POLICY "authenticated_insert_own_project_events" ON "mesa"."project_events" FOR INSERT TO "authenticated" WITH CHECK ("private"."mesa_check_project_user_role"("project_id", ( SELECT "auth"."uid"() AS "uid"), 'owner'::"mesa"."project_user_role"));

CREATE POLICY "authenticated_manage_own_invitation" ON "mesa"."project_invitations" FOR UPDATE TO "authenticated" USING ((("status" = 'open'::"mesa"."invitation_status") AND ("user_id" = ( SELECT "auth"."uid"() AS "uid")))) WITH CHECK ((("status" = ANY (ARRAY['accepted'::"mesa"."invitation_status", 'rejected'::"mesa"."invitation_status"])) AND ("user_id" = ( SELECT "auth"."uid"() AS "uid"))));

CREATE POLICY "authenticated_manage_own_project_invitations" ON "mesa"."project_invitations" FOR UPDATE TO "authenticated" USING ((("status" = 'open'::"mesa"."invitation_status") AND "private"."mesa_check_project_user_role"("project_id", ( SELECT "auth"."uid"() AS "uid"), 'owner'::"mesa"."project_user_role"))) WITH CHECK ((("status" = ANY (ARRAY['closed'::"mesa"."invitation_status", 'open'::"mesa"."invitation_status"])) AND "private"."mesa_check_project_user_role"("project_id", ( SELECT "auth"."uid"() AS "uid"), 'owner'::"mesa"."project_user_role")));

CREATE POLICY "authenticated_select_new_project" ON "mesa"."projects" FOR SELECT TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") = "created_by"));

CREATE POLICY "authenticated_select_own_project" ON "mesa"."projects" FOR SELECT TO "authenticated" USING ("private"."mesa_check_project_user_role"("id", ( SELECT "auth"."uid"() AS "uid"), 'owner'::"mesa"."project_user_role"));

CREATE POLICY "authenticated_select_own_project_events" ON "mesa"."project_events" FOR SELECT TO "authenticated" USING ("private"."mesa_check_project_user_role"("project_id", ( SELECT "auth"."uid"() AS "uid"), 'owner'::"mesa"."project_user_role"));

CREATE POLICY "authenticated_select_own_project_users" ON "mesa"."project_users" FOR SELECT TO "authenticated" USING ("private"."mesa_check_project_user_role"("project_id", ( SELECT "auth"."uid"() AS "uid"), 'owner'::"mesa"."project_user_role"));

CREATE POLICY "authenticated_update_own_project" ON "mesa"."projects" FOR UPDATE TO "authenticated" USING ("private"."mesa_check_project_user_role"("id", ( SELECT "auth"."uid"() AS "uid"), 'owner'::"mesa"."project_user_role"));

CREATE POLICY "authenticated_update_own_project_users" ON "mesa"."project_users" FOR UPDATE TO "authenticated" USING ("private"."mesa_check_project_user_role"("project_id", ( SELECT "auth"."uid"() AS "uid"), 'owner'::"mesa"."project_user_role"));

ALTER TABLE "mesa"."project_events" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "mesa"."project_invitations" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "mesa"."project_users" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "mesa"."projects" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone." ON "public"."profiles" FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile." ON "public"."profiles" FOR INSERT WITH CHECK (("auth"."uid"() = "id"));

CREATE POLICY "Users can update own profile." ON "public"."profiles" FOR UPDATE USING (("auth"."uid"() = "id"));

ALTER TABLE "public"."profiles" ENABLE ROW LEVEL SECURITY;

GRANT USAGE ON SCHEMA "mesa" TO "authenticated";
GRANT USAGE ON SCHEMA "mesa" TO "service_role";

GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "anon";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "service_role";

GRANT ALL ON FUNCTION "public"."user_wallets_check_update"() TO "anon";
GRANT ALL ON FUNCTION "public"."user_wallets_check_update"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."user_wallets_check_update"() TO "service_role";

GRANT ALL ON TABLE "mesa"."project_events" TO "service_role";
GRANT SELECT,INSERT ON TABLE "mesa"."project_events" TO "authenticated";

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "mesa"."project_invitations" TO "authenticated";
GRANT ALL ON TABLE "mesa"."project_invitations" TO "service_role";

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "mesa"."project_users" TO "authenticated";
GRANT ALL ON TABLE "mesa"."project_users" TO "service_role";

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "mesa"."projects" TO "authenticated";
GRANT ALL ON TABLE "mesa"."projects" TO "service_role";

GRANT ALL ON TABLE "public"."profiles" TO "anon";
GRANT ALL ON TABLE "public"."profiles" TO "authenticated";
GRANT ALL ON TABLE "public"."profiles" TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "mesa" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "mesa" GRANT ALL ON SEQUENCES  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "mesa" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "mesa" GRANT ALL ON FUNCTIONS  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "mesa" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "mesa" GRANT ALL ON TABLES  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";

RESET ALL;
