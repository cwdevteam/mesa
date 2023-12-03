import { bpsToPercent } from '@/lib/utils';
import { Database } from '@/types/supabase';

type ProjectUserType = Database['mesa']['Tables']['project_users']['Row'];

type ProjectType = Database['mesa']['Tables']['projects']['Row'] & {
  project_users: ProjectUserType[];
};

export function ProjectCollaborators({project}: { project: ProjectType }) {
  return (
    <section className="grid mt-4 max-w-prose">
      <h3 className="text-lg font-bold tracking-tight">Collaborators</h3>
      <div className="flex flex-wrap overflow-auto text-muted-foreground text-xs">
        {project.project_users.map((collaborator: ProjectUserType, index: number) => (
          <span key={index} className="mr-2">
            <span className="font-medium">{collaborator.user_name}</span>: <span>{bpsToPercent(collaborator.user_bps ?? 0)}</span>{index < project.project_users.length - 1 && ','}
          </span>
        ))}
      </div>
    </section>
  )
}