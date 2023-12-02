
import { cookies } from 'next/headers'
import { createServerClient } from '@/lib/supabase/server'
import { Locale } from "@/../i18n.config";
import { signOut } from '@/lib/supabase/auth/actions'

import NewProjectButtonFormChildren from './Button.client'
import { Dictionary } from '@/dictionaries/types';
import { Database } from '@/types/supabase';
import { redirect } from 'next/navigation';

export async function NewProjectButton({
  lang,
  dict, 
}: {
  lang: Locale,
  dict: Dictionary['dashboard']['newProjectButton']
}) {
  async function createProject() {
    'use server'
    const cookieStore = cookies()
    const supabase = createServerClient(cookieStore)

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      throw new Error('Missing auth user!')
    }

    const { data: project, error } = await supabase.schema('mesa')
      .from('projects')
      .insert({
        title: 'New Project',
        // description: 'This is a new project.', 
      })
      .select()
      .single()

    if (error) {
      throw error
    }

    redirect(`/${lang}/project/${project.id}`)
  }

  return (
    <div className="flex items-center gap-4">
      <form action={createProject}>
        <NewProjectButtonFormChildren dict={dict} />
      </form>
    </div>
  )
}