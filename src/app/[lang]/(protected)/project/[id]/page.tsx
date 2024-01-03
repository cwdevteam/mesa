import { ProjectCollaborators } from '@/components/ProjectCollaborators'
import project from './project.json' // TODO

import ProjectDetailsCard from "@/components/ProjectDetailsCard"
import ProjectTimeline from "@/components/ProjectTimeline"
import { TimelineProvider } from "@/context/TimelineContext"
import { ServerClient, createServerClient, getUser } from "@/lib/supabase/server"
import { cookies } from 'next/headers'
import { User } from '@supabase/supabase-js'
import { Locale } from '@/../i18n.config'


async function getProject(supabase: ServerClient, user: User, id: string) {
  const { data: project, error } = await supabase.schema('mesa')
    .from('projects')
    .select('*, project_users(*)')
    .eq('id', id)
    .single()

  if (error) {
    console.error(error)
    throw new Error(`Project with id: ${id} not found for user with id: ${user.id}`)
  }
  
  return project
}

export default async function Project({
  params: { lang, id },
}: {
  params: { lang: Locale, id: string }
}) {
  const supabase = createServerClient(cookies())
  const user = await getUser(supabase)
  if (!user) {
    return <></>
  }

  const project = await getProject(supabase, user, id)
  
  return (
    <TimelineProvider>
      <main className="grid grid-rows-[auto_minmax(0,1fr)] gap-6 container py-10 h-full">
        <div>
          <ProjectDetailsCard project={project} />
          <ProjectCollaborators project={project} />
        </div>
        {/* <ProjectTimeline /> */}
      </main>
    </TimelineProvider>
  )
}
