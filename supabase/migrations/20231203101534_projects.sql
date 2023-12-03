-- Add the user_name column as nullable
ALTER TABLE mesa.project_invitations ADD COLUMN user_name mesa.name;

-- Update null user_name values to default
UPDATE mesa.project_invitations
SET user_name = private.get_default_user_name(user_id)
WHERE user_name IS NULL;

-- Now alter the column to set it as non-nullable
ALTER TABLE mesa.project_invitations ALTER COLUMN user_name SET NOT NULL;

ALTER TABLE mesa.project_invitations ADD COLUMN user_bps mesa.bps DEFAULT 0;

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