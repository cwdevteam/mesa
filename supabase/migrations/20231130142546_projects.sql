-- Create a new private schema
CREATE SCHEMA IF NOT EXISTS private;

CREATE ROLE project_bot;

CREATE TYPE private.project_user_role AS ENUM (
  'owner'
  -- 'contributor'
  -- 'member'
);

CREATE TYPE private.invitation_status AS ENUM (
  'open',
  'closed',
  'accepted',
  'rejected'
);

CREATE DOMAIN private.title AS TEXT 
CHECK (
  char_length(VALUE) >= 1 AND
  char_length(VALUE) <= 80
);

CREATE DOMAIN private.name AS TEXT 
CHECK (
  char_length(VALUE) >= 1 AND 
  char_length(VALUE) <= 64
);

CREATE DOMAIN private.bps AS SMALLINT 
CHECK (
  VALUE >= 0 AND 
  VALUE <= 10000
);

CREATE OR REPLACE FUNCTION private.check_role(project_id UUID, user_id UUID, role private.project_user_role) RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM private.project_users as pu
    WHERE pu.project_id = project_id 
      AND pu.user_id = user_id 
      AND pu.user_role = role
  );
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to set created_by to the id of the currently authenticated user on insert
-- and ensure that the created_at timestamp is not explicitly provided on INSERT and not modified on UPDATE
-- also handle updated by setting updated_at to the current timestamp on insert and update.
CREATE OR REPLACE FUNCTION private.handle_row_meta() RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    NEW.created_by := auth.uid();
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
$$ LANGUAGE plpgsql;

-- insert invitation when project is created
CREATE OR REPLACE FUNCTION private.handle_project_created() RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    -- add project creator as owner via accepted invitation
    RAISE LOG 'Project created: %. Adding creator % as owner via accepted invitation.',
      NEW.id, NEW.created_by;
    INSERT INTO private.project_invitations 
    (
      project_id, 
      user_id, 
      user_role,
      status
    )
    VALUES 
    (
      NEW.id, 
      NEW.created_by, 
      'owner',
      'accepted'
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql 
   SECURITY DEFINER;

-- insert new project user when invitation is accepted
CREATE OR REPLACE FUNCTION private.handle_invitation_accepted() RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'UPDATE' AND OLD.status = NEW.status THEN
    -- skip, status not changed
    RETURN NEW;
  END IF;

  IF NEW.status = 'accepted' THEN
    -- skip, status not accepted
    RETURN NEW;
  END IF;

  RAISE LOG 'Invitation accepted: %. Adding user % to project % with role %.',
    NEW.id, NEW.user_id, NEW.project_id, NEW.user_role;

  INSERT INTO private.project_users 
  (
    project_id, 
    user_id, 
    user_role, 
    invitation_id
  )
  VALUES 
  (
    NEW.project_id, 
    NEW.user_id, 
    NEW.user_role, 
    NEW.id
  );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql
   SECURITY DEFINER;

-- check a project_user's invitation project_id, user_id, and status
CREATE OR REPLACE FUNCTION private.check_project_user_invitation() RETURNS TRIGGER AS $$
BEGIN
  DECLARE
    invitation_project_id UUID;
    invitation_user_id UUID;
    invitation_status private.invitation_status;
  BEGIN
    IF invitation.project_id IS NULL THEN
      RAISE EXCEPTION 'Invitation project id is null';
    END IF;

    SELECT 
      project_id, 
      user_id, 
      status
    INTO 
      invitation_project_id, 
      invitation_user_id,
      invitation_status 
    FROM 
      private.project_invitations 
    WHERE 
      id = NEW.invitation_id;

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
$$ LANGUAGE plpgsql;

--
-- Create the projects table
--

CREATE TABLE private.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title private.title NOT NULL,
  description TEXT,
  created_by UUID REFERENCES auth.users(id) ON DELETE NO ACTION,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER handle_row_meta_on_projects
BEFORE INSERT OR UPDATE ON private.projects
FOR EACH ROW EXECUTE PROCEDURE private.handle_row_meta();

CREATE TRIGGER handle_project_created_trigger
AFTER INSERT ON private.projects
FOR EACH ROW EXECUTE PROCEDURE private.handle_project_created();

--
-- Create the project_invitations table
--

CREATE TABLE private.project_invitations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES private.projects(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  user_role private.project_user_role DEFAULT 'owner',
  created_by UUID REFERENCES auth.users(id) ON DELETE NO ACTION,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  status private.invitation_status DEFAULT 'open'
);

CREATE TRIGGER handle_invitation_accepted_trigger
AFTER UPDATE ON private.project_invitations
FOR EACH ROW WHEN (NEW.status = 'accepted')
EXECUTE PROCEDURE private.handle_invitation_accepted();

CREATE TRIGGER handle_row_meta_on_project_invitations
BEFORE INSERT OR UPDATE ON private.project_invitations
FOR EACH ROW EXECUTE PROCEDURE private.handle_row_meta();

-- Create indexes on project_id and user_id
CREATE INDEX ON private.project_invitations (project_id);
CREATE INDEX ON private.project_invitations (user_id);

--
-- Create the project_users table
--

CREATE TABLE private.project_users (
  project_id UUID REFERENCES private.projects(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  user_role private.project_user_role DEFAULT 'owner',
  user_name private.name NOT NULL,
  user_bps private.bps DEFAULT 0,
  invitation_id UUID REFERENCES private.project_invitations(id) NOT NULL,
  created_by UUID REFERENCES auth.users(id) ON DELETE NO ACTION,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (project_id, user_id)
);

CREATE TRIGGER handle_row_meta_on_project_users
BEFORE INSERT OR UPDATE ON private.project_users
FOR EACH ROW EXECUTE PROCEDURE private.handle_row_meta();

CREATE TRIGGER check_project_user_invitation_trigger
BEFORE INSERT ON private.project_users
FOR EACH ROW EXECUTE PROCEDURE private.check_project_user_invitation();

--
-- RLS
--

-- Enable RLS on the projects, project_invitations, and project_users tables
ALTER TABLE private.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE private.project_invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE private.project_users ENABLE ROW LEVEL SECURITY;

-- Define Row-Level Security policies for projects table
-- RLS policy: Allow authenticated to INSERT their own project
CREATE POLICY authenticated_insert_own_project ON private.projects
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = created_by);

-- RLS policy: Allow authenticated to SELECT their own projects
CREATE POLICY authenticated_manage_own_project_select ON private.projects
  FOR SELECT TO authenticated
  USING (
    private.check_role(id, auth.uid(), 'owner')
  );

-- RLS policy: Allow authenticated to UPDATE their own projects
CREATE POLICY authenticated_manage_own_project_update ON private.projects
  FOR UPDATE TO authenticated
  USING (
    private.check_role(id, auth.uid(), 'owner')
  );

-- RLS policy: Allow authenticated to DELETE their own projects
CREATE POLICY authenticated_manage_own_project_delete ON private.projects
  FOR DELETE TO authenticated
  USING (
    private.check_role(id, auth.uid(), 'owner')
  );

-- Define Row-Level Security policies for project_invitations table
-- RLS policy: Allow project bot to insert project invitations
CREATE POLICY project_bot_insert_invitation ON private.project_invitations
  FOR INSERT TO project_bot;

-- RLS policy: Allow invited user to accept or reject their own invitations
CREATE POLICY authenticated_manage_own_invitation ON private.project_invitations
  FOR UPDATE TO authenticated
  USING (
    status = 'open' AND user_id = auth.uid()
  )
  WITH CHECK (
    status IN ('accepted', 'rejected') AND user_id = auth.uid()
  );

-- RLS policy: Allow project owner to close invitations
CREATE POLICY authenticated_manage_own_project_invitations ON private.project_invitations
  FOR UPDATE TO authenticated
  USING (
    status = 'open' AND
    private.check_role(project_id, auth.uid(), 'owner')
  )
  WITH CHECK (
    status IN ('closed', 'open') AND
    private.check_role(project_id, auth.uid(), 'owner')
  );

-- Define Row-Level Security policies for project_users table
-- RLS policy: Allow project bot to insert project users
CREATE POLICY project_bot_insert_user ON private.project_users
  FOR INSERT TO project_bot;

-- RLS policy: Allow authenticated to SELECT their own project_users
CREATE POLICY authenticated_manage_own_project_users_select ON private.project_users
  FOR SELECT TO authenticated
  USING (
    private.check_role(project_id, auth.uid(), 'owner')
  );

-- RLS policy: Allow authenticated to UPDATE their own project_users
CREATE POLICY authenticated_manage_own_project_users_update ON private.project_users
  FOR UPDATE TO authenticated
  USING (
    private.check_role(project_id, auth.uid(), 'owner')
  );

-- RLS policy: Allow authenticated to DELETE their own project_users
CREATE POLICY authenticated_manage_own_project_users_delete ON private.project_users
  FOR DELETE TO authenticated
  USING (
    private.check_role(project_id, auth.uid(), 'owner')
  );

--
-- Grants
--

-- Grant usage permissions on the private schema to the roles
GRANT USAGE ON SCHEMA private TO authenticated, service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA private TO authenticated;

-- Grant all privileges on all tables, routines, and sequences in the private schema to the service_role
GRANT ALL ON ALL TABLES IN SCHEMA private TO service_role, postgres;
GRANT ALL ON ALL ROUTINES IN SCHEMA private TO service_role, postgres;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA private TO service_role, postgres;
GRANT ALL ON ALL SEQUENCES IN SCHEMA private TO service_role, postgres;

-- Set default privileges for new tables, routines, and sequences in the private schema
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA private GRANT ALL ON TABLES TO service_role, postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA private GRANT ALL ON ROUTINES TO service_role, postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA private GRANT ALL ON FUNCTIONS TO service_role, postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA private GRANT ALL ON SEQUENCES TO service_role, postgres;

-- Grant specific permissions to the project_bot
GRANT USAGE ON SCHEMA private TO project_bot, postgres;
GRANT INSERT ON private.project_invitations TO project_bot;
GRANT INSERT ON private.project_users TO project_bot;

-- Set project_bot to owner of specific functions
GRANT project_bot TO postgres;
GRANT CREATE ON SCHEMA private TO project_bot, postgres;
ALTER FUNCTION private.handle_project_created() OWNER TO project_bot;
ALTER FUNCTION private.handle_invitation_accepted() OWNER TO project_bot;
REVOKE CREATE ON SCHEMA private FROM project_bot, postgres;
REVOKE project_bot FROM postgres;