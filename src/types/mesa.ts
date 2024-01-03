type MesaProjectEventBase = {
  type: string,
  user_id: string,
  project_id: string,
  payload?: any,
}

export type MesaProjectCreateEvent = MesaProjectEventBase & {
  type: 'mesa.project.create',
  payload?: never,
}

export type MesaProjectEvent = 
  | MesaProjectCreateEvent