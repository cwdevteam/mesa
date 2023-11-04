type ProjectType = {
  name: string;
  description: string;
  collaborators: Array<{name: string, percentage: string}>;
}

export function ProjectCollaborators({project: {collaborators}}: { project: ProjectType}) {

  return (
    <section className="grid mt-4 max-w-prose">
      <h3 className="text-lg font-bold tracking-tight">Collaborators</h3>
      <div className="flex flex-wrap overflow-auto text-muted-foreground text-xs">
        {collaborators.map((collaborator: {name: string, percentage: string}, index: number) => (
          <span key={index} className="mr-2">
            <span className="font-medium">{collaborator.name}</span>: <span>{collaborator.percentage}</span>{index < collaborators.length - 1 && ','}
          </span>
        ))}
      </div>
    </section>
  )
}