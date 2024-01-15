import {
  MesaProjectEvent,
  MesaProjectCreateEvent,
  MesaProjectUpdateEvent,
} from "@/types/mesa"

export const mesaProjectEvent = (event: MesaProjectEvent) => event

export function newMesaProjectCreateEvent({
  user_id,
  project_id 
}: {
  project_id?: MesaProjectCreateEvent['project_id']
  user_id: MesaProjectCreateEvent['user_id']
}): MesaProjectCreateEvent {
  return {
    type: 'mesa.project.create',
    user_id: user_id,
    project_id: project_id ?? self.crypto.randomUUID()
  }
}

export function newMesaProjectUpdateEvent({
  user_id,
  project_id,
  payload
}: Omit<MesaProjectUpdateEvent, 'type'>): MesaProjectUpdateEvent {
  return {
    type: 'mesa.project.update',
    user_id,
    project_id,
    payload
  }
}