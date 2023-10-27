import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse, NextRequest } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest, { params: { lang } }: { params: { lang: string } }) {
  // The `/auth/callback` route is required for the server-side auth flow implemented
  // by the Auth Helpers package. It exchanges an auth code for the user's session.
  // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-sign-in-with-code-exchange
  const requestUrl = request.nextUrl
  const baseUrl = requestUrl.origin
  const code = requestUrl.searchParams.get('code')

  if (code) {
    try {
    // TODO pass Database type to client constructor
      const supabase = createRouteHandlerClient({ cookies })
      await supabase.auth.exchangeCodeForSession(code)
    } catch (error: unknown) {
      const message = 'An unexpected error occurred'
      const params = `error=1&message=${encodeURIComponent(message)}`
      console.error(message, error)
      return NextResponse.redirect(
        new URL(`/${lang}?${params}`, baseUrl)
      )
    }
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(new URL(`/${lang}/dashboard`, baseUrl))
}
