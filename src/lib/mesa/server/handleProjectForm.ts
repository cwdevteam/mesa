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
  MesaProjectEvent,
  MesaProjectCreateEvent,
  MesaProjectUpdateEvent
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
  
  // Write project event, after updating the project
  // N.B. due to the lack of transactions here it is possible that the insert
  // will fail. In that case, we log the eventData so that i cn be recovered
  // from the logs if necessary.
  const { error: eventError } = await supabase.schema('mesa')
    .from('project_events')
    .insert({
      ...eventData,
      attestation: attestationJson,
      attestation_meta: attestationMeta,
    })
  if (eventError) {
    console.warn('Failed to store event data:', JSON.stringify(eventData))
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
    case 'mesa.project.update':
      return handleProjectUpdateEvent(supabase, eventData)
    default:
      console.log('Unexpected event data:', eventData);
      // @ts-ignore, may encounter unknown eventData.type at runtime.
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

async function handleProjectUpdateEvent(
  supabase: SupabaseClient, 
  eventData: MesaProjectUpdateEvent
): Promise<MesaProject> {
  const { project_id, payload: {title, description, users} } = eventData
  
  // TODO: transaction

  if (title || description) {
    const { error } = await supabase.schema('mesa')
      .from('projects')
      .update({
        id: project_id,
        // TODO consider diff'ing old and new values to apply update while
        // preserving concurrent updates
        title: title.new,
        description: description.new
      })
      .select()
      .single()

    if (error) {
      throw new Error('Error updating new project', { cause: error })
    }
  }

  // TODO require project splits to add up to 100%

  if (users) {
    for (const user of users) {
      switch ([!!user.new, !!user.old]) {
        case [true, false]: {
          // This is an insert operation
          const { data: invitation, error: invitationError } = await supabase
            .from('project_invitations')
            .select('id')
            .eq('user_id', user.new.user_id)
            .eq('project_id', project_id)
            .single()
  
          if (invitationError) {
            throw new Error('Error fetching invitation', { cause: invitationError })
          }
  
          const { error: insertError } = await supabase
            .from('project_users')
            .insert({
              project_id: project_id,
              ...user.new,
              invitation_id: invitation.id,
            })
  
          if (insertError) {
            throw new Error('Error inserting user', { cause: insertError })
          }
          break;
        }
        case [true, true]: {
          // This is an update operation
          if (user.new.user_id !== user.old.user_id) {
            throw new Error('User ID cannot be changed')
          }
  
          const { error: updateError } = await supabase
            .from('project_users')
            .update(user.new)
            .eq('user_id', user.new.user_id)
  
          if (updateError) {
            throw new Error('Error updating user', { cause: updateError })
          }
          break;
        }
        case [false, true]: {
          // This is a delete operation
          const { error: deleteError } = await supabase
            .from('project_users')
            .delete()
            .eq('user_id', user.old.user_id)
  
          if (deleteError) {
            throw new Error('Error deleting user', { cause: deleteError })
          }
          break;
        }
      }
    }
  }

  const { data: project, error } = await supabase.schema('mesa')
    .from('projects')
    .select()
    .eq('id', project_id)
    .single()

    if (error) {
      throw new Error(`Error selecting project: ${project_id}`, { cause: error })
    }
  
  return project
}