'use server'

import { Provider, SupabaseClient } from '@supabase/supabase-js'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { revalidatePath } from 'next/cache'
import { cookies, headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { zfd } from 'zod-form-data'
import env from '@/env'
import { Database } from '@/lib/database.types'

const schemas = {
  signInWithOtp: zfd.formData(z.object({
    email: z.string(),
    lang: z.string(),
  }).transform(({lang, ...data}) => ({
    ...data,
    options: {
      shouldCreateUser: env.NEXT_PUBLIC_SIGNUPS_OPEN,
      emailRedirectTo: `${getOrigin()}/${lang}/auth/callback`,
    },
  }))),
  
  signInWithOAuth: zfd.formData(z.object({
    provider: z.string().transform((provider) => provider as Provider),
    lang: z.string(),
  }).transform(({lang, ...data}) => ({
    ...data,
    options: {
      redirectTo: `${getOrigin()}/${lang}/auth/callback`,
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

async function signInWithSupabase<M extends AuthMethod>(
  authMethod: M, 
  credentials: AuthCredentials[M]
): Promise<ReturnType<AuthMethodFns[M] | typeof errorResponse>> {
  try {
    const supabase = createServerActionClient<Database>({ cookies })
    const authMethodFn = supabase.auth[authMethod].bind(supabase.auth) as AuthMethodFns[M]
    const result = await authMethodFn(credentials)
    if (!result.error) {
      revalidatePath('/')
      return result
    }

    console.error(`Failed to '${authMethod}':`, result.error)
    return errorResponse(result.error)
  } catch (e) {
    console.error(`Failed to ${authMethod}: Error in supabase client`, e)
    return errorResponse(e)
  }
}

// function createSignInFunction() {
function createSignInFunction<M extends AuthMethod>(
  authMethod: M, 
  callback?: (result: Awaited<ReturnType<typeof signInWithSupabase<M>>>) => void
) {
  return async function(prevState: any, formData: FormData) {
    const schema = schemas[authMethod]
    const parsed = schema.safeParse(formData)
    if (!parsed.success) {
      console.error(`Error in ${authMethod}:`, parsed.error)
      return errorResponse(parsed.error)
    }

    const result = await signInWithSupabase(authMethod, parsed.data as AuthCredentials[M])
    if (callback) {
      callback(result)
    }

    return result
  }
}

export const signInWithOtp = createSignInFunction('signInWithOtp')
export const signInWithOAuth = createSignInFunction('signInWithOAuth', (result) => {
  if (!env.NEXT_PUBLIC_SIGNUPS_OPEN) {
    console.error('Signups are currently closed.')
    return errorResponse('Signups are currently closed.')
  }

  const url = result.data?.url
  if (url) {
    redirect(url)
  }
})