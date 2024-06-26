import type { Database } from './supabase'

import type {
  SupabaseClient as _SupabaseClient,
  Session as _AuthSession,
  User as _AuthUser
} from '@supabase/supabase-js'

export type SupabaseClient = _SupabaseClient<Database>
export type AuthSession = _AuthSession
export type AuthUser = _AuthUser

export type MesaProject = Database['mesa']['Tables']['projects']['Row']

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

type Insert<T> = {
  new: T,
  old: null,
}

type Update<T> = {
  new: T,
  old: T,
}

type Delete<T> = {
  new: null,
  old: T,
}

type InsertUpdateOrDelete<T> = Insert<T> | Update<T> | Delete<T>

export type MesaProjectUpdateEvent = MesaProjectEventBase & {
  type: 'mesa.project.update',
  payload: {
    title?: Update<string>,
    description?: Update<string>,
    users?: InsertUpdateOrDelete<{
      user_id: string,
      user_name: string,
      user_bps: number,
    }>[]
  },
}

export type MesaProjectEvent = 
  | MesaProjectCreateEvent
  | MesaProjectUpdateEvent

export type Media = {  
  url: string
  avatar: string
  name: string
}
