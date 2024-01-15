BEGIN;

ALTER TYPE mesa.project_event_type ADD VALUE IF NOT EXISTS 'mesa.project.update';

COMMIT;