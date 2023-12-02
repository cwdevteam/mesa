import { ServerClient } from './createServerClient'

export * from './createServerClient'
export * from './createMiddlewareClient'

export async function getUser(supabase: ServerClient) {
  const { data: { user }, error } = await supabase.auth.getUser()
  if (!user || error) {
    console.error('Error retrieving user:', error)
    return
  }
  return user
}