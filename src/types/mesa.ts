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

export type MesaProjectEvent = 
  | MesaProjectCreateEvent