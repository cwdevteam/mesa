'use server'

import { Provider, SupabaseClient } from '@supabase/supabase-js'
import { createServerClient } from '@/lib/supabase/server'
import { cookies, headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { zfd } from 'zod-form-data'
import { z } from 'zod'
import { Locale } from '@/../i18n.config'
import env from '@/env'

const schemas = {
  signInWithOtp: zfd.formData(z.object({
    email: z.string(),
    lang: z.string(),
  }).transform(({lang, ...data}) => ({
    ...data,
    options: {
      shouldCreateUser: env.NEXT_PUBLIC_SIGNUPS_OPEN,
      // Smuggle the lang via unused option
      emailRedirectTo: `${origin()}/${lang}`,
    },
  }))),
  
  signInWithOAuth: zfd.formData(z.object({
    provider: z.string().transform((provider) => provider as Provider),
    lang: z.string(),
  }).transform(({lang, ...data}) => ({
    ...data,
    options: {
      redirectTo: `${origin()}/${lang}/auth/callback`,
    },
  }))),
}

type AuthError = {
  data: null, error: {
    message: string
  }
}

type AuthMethod = keyof typeof schemas

type AuthResponse = {
  [M in AuthMethod]: ReturnType<SupabaseClient['auth'][M]> 
}

type AuthCredentials = {
  [M in AuthMethod]: Parameters<SupabaseClient['auth'][M]>[0]
}

type AuthMethodFns = {
  [M in AuthMethod]: (credentials: AuthCredentials[M]) => AuthResponse[M]
}

function origin() {
  // Get the server origin from the request
  const requestHeaders = headers()
  
  // Use origin header if present
  const origin = requestHeaders.get('origin')
  if (origin) {
    return origin
  }

  // Construct origin from host and protocol
  const host = requestHeaders.get('host')
  if (host) {
    // Set the protocol based on the host
    const protocol = host.startsWith('localhost') ? 'http' : 'https'
    // Construct the origin from the protocol and host
    return `${protocol}://${host}`
  }

  console.error('Error: failed to determine request origin')
  return null
}

function errorResponse(error: unknown): AuthError {
  const message = `${error}` || 'Unknown Error'
  return {data: null, error: {message}}
}

async function signInWithSupabase<M extends AuthMethod>(
  authMethod: M, 
  credentials: AuthCredentials[M]
) {
  try {
    // TODO pass Database type to client constructor
    const cookieStore = cookies()
    const supabase = createServerClient(cookieStore)
    const authMethodFn = supabase.auth[authMethod].bind(supabase.auth) as AuthMethodFns[M]
    const result = await authMethodFn(credentials)
    if (!result.error) {
      return result
    }

    console.error(`Failed to '${authMethod}':`, result.error)
    return errorResponse(result.error)
  } catch (e) {
    console.error(`Failed to ${authMethod}: Error in supabase client`, e)
    return errorResponse(e)
  }
}

  function createSignInFunction<M extends AuthMethod>(
    authMethod: M, 
    callback?: (result: Awaited<AuthResponse[M]> | AuthError) => void
) {
  return async function(
    state: Awaited<AuthResponse[M]> | AuthError,
    formData: FormData
  ): Promise<Awaited<AuthResponse[M]> | AuthError> {
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

export const signOut = async (lang: Locale) => {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)
  await supabase.auth.signOut()
  return redirect(`/${lang}`)
}