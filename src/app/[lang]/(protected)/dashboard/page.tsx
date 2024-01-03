
import { NewProjectButton } from '@/components/NewProjectButton'
import { ServerClient, createServerClient, getUser } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import { Locale } from '@/../i18n.config'
import { getDictionary } from '@/lib/dictionary'
import { ProjectDataTable } from '@/components/ProjectDataTable'
import { User } from '@supabase/supabase-js'

async function getProjects(supabase: ServerClient, user: User) {
  const { data: projects, error } = await supabase.schema('mesa')
    .from('projects')
    .select('*')
    .order('updated_at', {ascending: false})

  if (error) {
    console.error(error)
    return []
  }
  
  return projects
}

export default async function Dashboard({
  params: { lang },
}: {
  params: { lang: Locale }
}) {
  const { dashboard: dict } = await getDictionary(lang)
  const supabase = createServerClient(cookies())
  const user = await getUser(supabase)
  if (!user) {
    return <></>
  }

  const projects = await getProjects(supabase, user)
  return (
    <main className="grid gap-10 container mx-auto py-10 content-start">
      <div className="flex justify-between gap-4">
        <h2 className="text-2xl font-semibold tracking-tight">Your Projects</h2>
        <NewProjectButton user={user} lang={lang} dict={dict.newProjectButton} />
      </div>
      <ProjectDataTable data={projects} />
    </main>
  )
}

