import { ProjectCollaborators } from '@/components/ProjectCollaborators'
import project from './project.json' // TODO
// export const dynamic = 'force-dynamic'

import ProjectDetailsCard from "@/components/ProjectDetailsCard"
import ProjectTimeline from "@/components/ProjectTimeline"
import { TimelineProvider } from "@/context/TimelineContext"
import { createServerComponentClient, getUser } from "@/lib/supabase"

export default async function Project() {
  const supabase = createServerComponentClient()
  const user = await getUser(supabase)
  if (!user) {
    return <></>
  }

  return (
    <TimelineProvider>
      <main className="grid grid-rows-[auto_minmax(0,1fr)] gap-6 container py-8 h-full">
        <div>
          <ProjectDetailsCard project={project} />
          <ProjectCollaborators project={project} />
        </div>
        <ProjectTimeline />
      </main>
    </TimelineProvider>
  )
}
