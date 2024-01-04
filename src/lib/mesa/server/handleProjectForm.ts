import 'server-only'

import { cookies } from "next/headers"
import { notFound } from 'next/navigation'

import { SignedOffchainAttestation } from "@ethereum-attestation-service/eas-sdk"
import { deserialize } from "superjson"

import { createServerClient, getUser } from "@/lib/supabase/server"
import { createClient, verifyOffchainAttestation } from "@/lib/eas/server"
import {
  SupabaseClient,
  MesaProject,
  MesaProjectCreateEvent,
  MesaProjectEvent
} from "@/types/mesa"

export async function handleProjectForm(formData: FormData): Promise<MesaProject> {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)
  
  const user = await getUser(supabase)
  if (!user) {
    notFound()
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

  const project: MesaProject = await handleProjectEvent(supabase, eventData)
  
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

  return project
}

async function handleProjectEvent(
  supabase: SupabaseClient,
  eventData: MesaProjectEvent
): Promise<MesaProject> {
  
  switch (eventData.type) {
    case 'mesa.project.create':
      return handleProjectCreateEvent(supabase, eventData)
    default:
      console.log('Unexpected event data:', eventData);
      throw new Error(`Unknown project event: ${eventData.type}`);
  }
}

async function handleProjectCreateEvent(
  supabase: SupabaseClient, 
  eventData: MesaProjectCreateEvent
): Promise<MesaProject> {
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
    throw new Error('Error inserting new project', { cause: error })
  }

  return project
}