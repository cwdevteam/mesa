import { cookies } from 'next/headers'
import { createServerClient } from '@/lib/supabase/server'
import { Locale } from "@/../i18n.config";

import NewProjectButtonFormChildren from './Button.client'
import { Dictionary } from '@/dictionaries/types';
import { redirect } from 'next/navigation';
import { User } from '@supabase/supabase-js';

import { createClient, verifyOffchainAttestation } from '@/lib/eas/server';
import { deserialize } from 'superjson';
import { SignedOffchainAttestation } from '@ethereum-attestation-service/eas-sdk';
import { MesaProjectEvent } from '@/types/mesa';

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
    const cookieStore = cookies()
    const supabase = createServerClient(cookieStore)

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      throw new Error('Missing auth user!')
    }

    // TODO validate form data
    const attester = formData.get('attester') as string
    const attestationJson = JSON.parse(formData.get('attestation') as string)
    const attestationMeta = JSON.parse(formData.get('attestationMeta') as string)
    const attestation = deserialize<SignedOffchainAttestation>({
      json: attestationJson,
      meta: attestationMeta,
    })

    // TODO store chainid as constant, use here and render for use in client-side code.
    const eas = await createClient(10) // Optimism
    
    const eventData = verifyOffchainAttestation<MesaProjectEvent>(eas, attester.toLowerCase(), attestation)
    if (!eventData) {
      throw new Error('Invalid attestation')
    }
    
    // TODO transaction.

    const { data: project, error } = await supabase.schema('mesa')
      .from('projects')
      .insert({
        id: eventData.project_id,
        title: 'New Project',
        // description: 'This is a new project.', 
      })
      .select()
      .single()

    if (error) {
      throw new Error('Error inserting new project', {cause: error})
    }
    
    // Write project create event, after creating the project
    const { error: eventError } = await supabase.schema('mesa')
      .from('project_events')
      .insert({
        ...eventData,
        attestation: attestationJson,
        attestation_meta: attestationMeta,
      })
    if (eventError) {
      try {
        // remove project to approximate transaction
        await supabase.schema('mesa').from('projects').delete().eq('id', project.id)
      } catch (e) {
        console.error(`Failed to remove project after error: ${project.id}`, e)
      }
      throw new Error(`Error inserting new '${eventData.type}' event in project_events`, {cause: eventError})
    }

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