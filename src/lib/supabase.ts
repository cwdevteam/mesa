import { cookies } from 'next/headers'
import { SupabaseClient } from '@supabase/supabase-js';
import * as Supabase from '@supabase/auth-helpers-nextjs'

import { Database } from '@/types/supabase'

export function createRouteHandlerClient() {
  const cookieStore = cookies()
  return Supabase.createRouteHandlerClient<Database>({ cookies: () => cookieStore })
}

export function createServerActionClient() {
  return Supabase.createServerActionClient<Database>({ cookies })
}

export function createServerComponentClient() {
  const cookieStore = cookies()
  return Supabase.createServerComponentClient<Database>({ cookies: () => cookieStore })
}

export function createClientComponentClient() {
  return Supabase.createClientComponentClient<Database>()
}

export async function getUser(supabase: SupabaseClient) {
  const { data: { user }, error } = await supabase.auth.getUser()
  if (!user || error) {
    console.error('Error retrieving user:', error)
    return
  }
  return user
}
