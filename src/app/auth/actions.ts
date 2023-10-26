'use server'

import { Provider, SupabaseClient } from '@supabase/supabase-js'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { revalidatePath } from 'next/cache'
import { cookies, headers } from 'next/headers'
import { z } from 'zod'
import { zfd } from 'zod-form-data'

const schemas = {
  signInWithPassword: zfd.formData(z.object({
    email: z.string(),
    password: z.string(),
  })),
  signInWithOtp: zfd.formData(z.object({
    email: z.string(),
  }).transform(data => ({
    ...data,
    options: {
      emailRedirectTo: `${getOrigin()}/auth/callback`,
    },
  }))),
  signInWithOAuth: zfd.formData(z.object({
    provider: z.string().transform((provider) => provider as Provider),
  }).transform(data => ({
    ...data,
    options: {
      redirectTo: `${getOrigin()}/auth/callback`,
    },
  }))),
}

type AuthMethod = keyof typeof schemas

type AuthMethodFns = {
  [M in AuthMethod]: (credentials: AuthCredentials[M]) => ReturnType<SupabaseClient['auth'][M]>
}

type AuthCredentials = {
  [M in AuthMethod]: Parameters<SupabaseClient['auth'][M]>[0]
}

function getOrigin() {
  // Get the server origin from the request
  const requestHeaders = headers()
  const host = requestHeaders.get('host')
  if (host) {
    // Set the protocol based on the host
    const protocol = host.startsWith('localhost') ? 'http' : 'https'
    // Construct the origin from the protocol and host
    return `${protocol}://${host}`
  }

  console.error('Error: Host is not defined')
  return null
}

function errorResponse(error: unknown) {
  const message = `${error}` || 'Unknown Error'
  return {data: null, error: {message}}
}

async function signInWithSupabase<M extends AuthMethod>(authMethod: M, credentials: AuthCredentials[M]) {
  try {
    const supabase = createServerActionClient({ cookies })
    const authMethodFn = supabase.auth[authMethod].bind(supabase.auth) as AuthMethodFns[M]
    const {data, error} = await authMethodFn(credentials)
    if (error) {
      console.error(`Failed to '${authMethod}':`, error)
      return errorResponse(error)
    } else {
      revalidatePath('/')
      return {data, error: null}
    }
  } catch (e) {
    console.error(`Failed to ${authMethod}: Error in supabase client`, e)
    return errorResponse(e)
  }
}

function createSignInFunction(authMethod: AuthMethod) {
  return async function(prevState: any, formData: FormData) {
    const schema = schemas[authMethod];
    const result = schema.safeParse(formData);
    if (!result.success) {
      console.error(`Error in ${authMethod}:`, result.error)
      return errorResponse(result.error)
    }

    return signInWithSupabase(authMethod, result.data)
  }
}

export const signInWithPassword = createSignInFunction('signInWithPassword');
export const signInWithOtp = createSignInFunction('signInWithOtp');
export const signInWithOAuth = createSignInFunction('signInWithOAuth');

export async function signOut() {
  try {
    const supabase = createServerActionClient({ cookies })
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error('Failed to sign out:', error)
      return errorResponse(error)
    } else {
      revalidatePath('/')
      return {data: null, error: null}
    }
  } catch (e) {
    console.error('Failed to sign out: Error in supabase client', e)
    return errorResponse(e)
  }
}