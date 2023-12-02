-- Create a new mesa schema
CREATE SCHEMA IF NOT EXISTS mesa;

-- Create new private schema for security definer functions which run as
-- the "postgres" user to bypass rls
CREATE SCHEMA IF NOT EXISTS private;

CREATE TYPE mesa.project_user_role AS ENUM (
  'owner'
  -- 'contributor'
  -- 'member'
);

CREATE TYPE mesa.invitation_status AS ENUM (
  'open',
  'closed',
  'accepted',
  'rejected'
);

CREATE DOMAIN mesa.title AS TEXT 
CHECK (
  char_length(VALUE) >= 1 AND
  char_length(VALUE) <= 80
);

CREATE DOMAIN mesa.name AS TEXT 
CHECK (
  char_length(VALUE) >= 1 AND 
  char_length(VALUE) <= 64
);

CREATE DOMAIN mesa.bps AS SMALLINT 
CHECK (
  VALUE >= 0 AND 
  VALUE <= 10000
);

CREATE OR REPLACE FUNCTION private.mesa_check_project_user_role(
  _project_id UUID,
  _user_id UUID,
  _user_role mesa.project_user_role
) RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM mesa.project_users
    WHERE project_id = _project_id 
      AND user_id = _user_id 
      AND user_role = _user_role
  );
END;
$$ LANGUAGE plpgsql
  SECURITY DEFINER;

CREATE OR REPLACE FUNCTION private.get_default_user_name(_user_id UUID) RETURNS TEXT AS $$
BEGIN
  RETURN split_part((SELECT email FROM auth.users WHERE id = _user_id), '@', 1);
END;
$$ LANGUAGE plpgsql
  SECURITY DEFINER;

-- Create a trigger to set created_by to the id of the currently authenticated user on insert
-- and ensure that the created_at timestamp is not explicitly provided on INSERT and not modified on UPDATE
-- also handle updated by setting updated_at to the current timestamp on insert and update.
CREATE OR REPLACE FUNCTION private.mesa_handle_row_meta() RETURNS TRIGGER AS $$
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
$$ LANGUAGE plpgsql
  SECURITY DEFINER;

-- insert invitation when project is created by authenticated user.
CREATE OR REPLACE FUNCTION private.mesa_handle_project_created() RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' AND (select auth.uid()) = NEW.created_by THEN
    
    RAISE LOG 'Project created: %. Adding creator % as owner via accepted invitation.',
      NEW.id, NEW.created_by;
    
    INSERT INTO mesa.project_invitations (project_id, user_id, user_role, status)
      VALUES (NEW.id, NEW.created_by, 'owner', 'accepted');
    
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql 
   SECURITY DEFINER;

-- insert new project user when invitation is accepted by authenticated user
CREATE OR REPLACE FUNCTION private.mesa_handle_invitation_accepted() RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'UPDATE' AND OLD.status = NEW.status THEN
    -- skip, status not changed
    RETURN NEW;
  END IF;

  IF NEW.status = 'accepted' and (select auth.uid()) = NEW.user_id THEN
    
    RAISE LOG 'Invitation accepted: %. Adding user % to project % with role %.',
      NEW.id, NEW.user_id, NEW.project_id, NEW.user_role;
    
    INSERT INTO mesa.project_users (project_id, user_id, user_role, invitation_id)
      VALUES (NEW.project_id, NEW.user_id, NEW.user_role, NEW.id);
    
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql
   SECURITY DEFINER;

CREATE OR REPLACE FUNCTION private.set_default_user_name() RETURNS TRIGGER AS $$
BEGIN
  NEW.user_name := private.get_default_user_name(NEW.user_id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql
  SECURITY DEFINER;

-- check a project_user's invitation project_id, user_id, and status
CREATE OR REPLACE FUNCTION private.mesa_check_project_user_invitation() RETURNS TRIGGER AS $$
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
$$ LANGUAGE plpgsql
  SECURITY DEFINER;

--
-- Create the projects table
--

CREATE TABLE mesa.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title mesa.title NOT NULL,
  description TEXT,
  created_by UUID REFERENCES auth.users(id) ON DELETE NO ACTION,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER handle_row_meta_on_projects
BEFORE INSERT OR UPDATE ON mesa.projects
FOR EACH ROW EXECUTE PROCEDURE private.mesa_handle_row_meta();

CREATE TRIGGER handle_project_created_trigger
AFTER INSERT ON mesa.projects
FOR EACH ROW EXECUTE PROCEDURE private.mesa_handle_project_created();

--
-- Create the project_invitations table
--

CREATE TABLE mesa.project_invitations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES mesa.projects(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  user_role mesa.project_user_role DEFAULT 'owner',
  created_by UUID REFERENCES auth.users(id) ON DELETE NO ACTION,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  status mesa.invitation_status DEFAULT 'open'
);

CREATE TRIGGER handle_invitation_accepted_trigger
AFTER INSERT OR UPDATE ON mesa.project_invitations
FOR EACH ROW WHEN (NEW.status = 'accepted')
EXECUTE PROCEDURE private.mesa_handle_invitation_accepted();

CREATE TRIGGER handle_row_meta_on_project_invitations
BEFORE INSERT OR UPDATE ON mesa.project_invitations
FOR EACH ROW EXECUTE PROCEDURE private.mesa_handle_row_meta();

-- Create indexes on project_id and user_id
CREATE INDEX ON mesa.project_invitations (project_id);
CREATE INDEX ON mesa.project_invitations (user_id);

--
-- Create the project_users table
--

CREATE TABLE mesa.project_users (
  project_id UUID REFERENCES mesa.projects(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  user_role mesa.project_user_role DEFAULT 'owner',
  user_name mesa.name NOT NULL,
  user_bps mesa.bps DEFAULT 0,
  invitation_id UUID REFERENCES mesa.project_invitations(id) NOT NULL,
  created_by UUID REFERENCES auth.users(id) ON DELETE NO ACTION,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (project_id, user_id)
);

CREATE TRIGGER handle_row_meta_on_project_users
BEFORE INSERT OR UPDATE ON mesa.project_users
FOR EACH ROW EXECUTE PROCEDURE private.mesa_handle_row_meta();

CREATE TRIGGER set_default_user_name_trigger
BEFORE INSERT ON mesa.project_users
FOR EACH ROW EXECUTE PROCEDURE private.set_default_user_name();

CREATE TRIGGER check_project_user_invitation_trigger
BEFORE INSERT ON mesa.project_users
FOR EACH ROW EXECUTE PROCEDURE private.mesa_check_project_user_invitation();

--
-- RLS
--

-- Enable RLS on the projects, project_invitations, and project_users tables
ALTER TABLE mesa.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE mesa.project_invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE mesa.project_users ENABLE ROW LEVEL SECURITY;

-- Define Row-Level Security policies for projects table
-- RLS policy: Allow authenticated to INSERT their own project
CREATE POLICY authenticated_insert_new_project ON mesa.projects
  FOR INSERT TO authenticated WITH CHECK ((select auth.uid()) = created_by);

-- RLS policy: Allow authenticated to INSERT their own project
-- TODO: this policy should be limited to new projects
CREATE POLICY authenticated_select_new_project ON mesa.projects
  FOR SELECT TO authenticated USING ((select auth.uid()) = created_by);

-- RLS policy: Allow authenticated to SELECT their own projects
CREATE POLICY authenticated_select_own_project ON mesa.projects
  FOR SELECT TO authenticated
  USING (
    private.mesa_check_project_user_role(id, (select auth.uid()), 'owner')
  );

-- RLS policy: Allow authenticated to UPDATE their own projects
CREATE POLICY authenticated_update_own_project ON mesa.projects
  FOR UPDATE TO authenticated
  USING (
    private.mesa_check_project_user_role(id, (select auth.uid()), 'owner')
  );

-- RLS policy: Allow authenticated to DELETE their own projects
CREATE POLICY authenticated_delete_own_project ON mesa.projects
  FOR DELETE TO authenticated
  USING (
    private.mesa_check_project_user_role(id, (select auth.uid()), 'owner')
  );

-- Define Row-Level Security policies for project_invitations table
-- RLS policy: Allow invited user to accept or reject their own invitations
CREATE POLICY authenticated_manage_own_invitation ON mesa.project_invitations
  FOR UPDATE TO authenticated
  USING (
    status = 'open' AND user_id = (select auth.uid())
  )
  WITH CHECK (
    status IN ('accepted', 'rejected') AND user_id = (select auth.uid())
  );

-- RLS policy: Allow project owner to close invitations
CREATE POLICY authenticated_manage_own_project_invitations ON mesa.project_invitations
  FOR UPDATE TO authenticated
  USING (
    status = 'open' AND
    private.mesa_check_project_user_role(project_id, (select auth.uid()), 'owner')
  )
  WITH CHECK (
    status IN ('closed', 'open') AND
    private.mesa_check_project_user_role(project_id, (select auth.uid()), 'owner')
  );

-- Define Row-Level Security policies for project_users table
-- RLS policy: Allow authenticated to SELECT their own project_users
CREATE POLICY authenticated_select_own_project_users ON mesa.project_users
  FOR SELECT TO authenticated
  USING (
    private.mesa_check_project_user_role(project_id, (select auth.uid()), 'owner')
  );

-- RLS policy: Allow authenticated to UPDATE their own project_users
CREATE POLICY authenticated_update_own_project_users ON mesa.project_users
  FOR UPDATE TO authenticated
  USING (
    private.mesa_check_project_user_role(project_id, (select auth.uid()), 'owner')
  );

-- RLS policy: Allow authenticated to DELETE their own project_users
CREATE POLICY authenticated_delete_own_project_users ON mesa.project_users
  FOR DELETE TO authenticated
  USING (
    private.mesa_check_project_user_role(project_id, (select auth.uid()), 'owner')
  );

--
-- Grants
--

-- Grant usage permissions on the mesa schema to the roles
GRANT USAGE ON SCHEMA mesa TO authenticated, service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA mesa TO authenticated;

-- Grant all privileges on all tables, routines, and sequences in the mesa schema to the service_role
GRANT ALL ON ALL TABLES IN SCHEMA mesa TO service_role, postgres;
GRANT ALL ON ALL ROUTINES IN SCHEMA mesa TO service_role, postgres;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA mesa TO service_role, postgres;
GRANT ALL ON ALL SEQUENCES IN SCHEMA mesa TO service_role, postgres;

-- Set default privileges for new tables, routines, and sequences in the mesa schema
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA mesa GRANT ALL ON TABLES TO service_role, postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA mesa GRANT ALL ON ROUTINES TO service_role, postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA mesa GRANT ALL ON FUNCTIONS TO service_role, postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA mesa GRANT ALL ON SEQUENCES TO service_role, postgres;