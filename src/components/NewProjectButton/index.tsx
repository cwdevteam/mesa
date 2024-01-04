import { Locale } from "@/../i18n.config";

import NewProjectButtonFormChildren from './Button.client'
import { Dictionary } from '@/dictionaries/types';
import { redirect } from 'next/navigation';
import { User } from '@supabase/supabase-js';

import { handleProjectForm } from '@/lib/mesa/server';

export async function NewProjectButton({
  user,
  lang,
  dict, 
}: {
  user: User,
  lang: Locale,
  dict: Dictionary['dashboard']['newProjectButton']
}) {
  async function createProject(formData: FormData) {
    'use server'
    
    const project = await handleProjectForm(formData)
    
    redirect(`/${lang}/project/${project.id}`)
  }

  return (
    <div className="flex items-center gap-4">
      <form action={createProject}>
        <NewProjectButtonFormChildren user={user} dict={dict} />
      </form>
    </div>
  )
}