alter table "mesa"."project_invitations" add column "user_bps" mesa.bps default 0;

alter table "mesa"."project_invitations" add column "user_name" mesa.name not null;


-- set check_function_bodies = off;

-- insert invitation when project is created by authenticated user.
CREATE OR REPLACE FUNCTION private.mesa_handle_project_created() RETURNS TRIGGER AS $$
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
$$ LANGUAGE plpgsql
   SECURITY DEFINER;

CREATE OR REPLACE FUNCTION private.set_default_user_name() RETURNS TRIGGER AS $$
BEGIN
  IF NEW.user_name IS NULL THEN
    NEW.user_name := private.get_default_user_name(NEW.user_id);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql
  SECURITY DEFINER;