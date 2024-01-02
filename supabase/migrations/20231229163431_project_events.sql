BEGIN;

-- Create the project_events table
CREATE TABLE mesa.project_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES mesa.projects ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users,
  data JSONB NOT NULL,
  attestation JSONB NOT NULL,
  attestation_uid text GENERATED ALWAYS AS (
    substr((attestation->'sig'->>'uid')::text, 3)
  ) STORED,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users
);

-- Add a unique constraint on attestation_uid
ALTER TABLE mesa.project_events ADD CONSTRAINT unique_attestation_uid UNIQUE (attestation_uid);

-- Enable Row Level Security
ALTER TABLE mesa.project_events ENABLE ROW LEVEL SECURITY;

-- Define RLS policies for project_events table
CREATE POLICY authenticated_insert_own_project_events ON mesa.project_events
  FOR INSERT TO authenticated
  WITH CHECK (
    private.mesa_check_project_user_role(project_id, (select auth.uid()), 'owner')
  );

CREATE POLICY authenticated_select_own_project_events ON mesa.project_events
  FOR SELECT TO authenticated
  USING (
    private.mesa_check_project_user_role(project_id, (select auth.uid()), 'owner')
  );

-- Add a new trigger and function to prevent updates
CREATE OR REPLACE FUNCTION private.mesa_prevent_update()
  RETURNS TRIGGER
  LANGUAGE plpgsql
  SECURITY DEFINER SET search_path = private, pg_temp
  AS $$
BEGIN
  IF TG_OP = 'UPDATE' THEN
    RAISE EXCEPTION 'Updates to project_events are not allowed';
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER "10_mesa_project_events_prevent_updates"
  BEFORE UPDATE ON mesa.project_events
  FOR EACH ROW EXECUTE FUNCTION private.mesa_prevent_update();

-- Use the existing trigger function to manage metadata columns
CREATE TRIGGER "20_mesa_project_events_handle_row_meta"
  BEFORE INSERT OR UPDATE ON mesa.project_events
  FOR EACH ROW EXECUTE FUNCTION private.mesa_handle_row_meta();

-- Grant privileges
GRANT INSERT, SELECT ON mesa.project_events TO authenticated;

COMMIT;