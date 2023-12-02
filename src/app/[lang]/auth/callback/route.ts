import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest, { params: { lang } }: { params: { lang: string } }) {
  const { pathname, searchParams } =  request.nextUrl
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/'

  const redirectTo = request.nextUrl.clone()
  redirectTo.pathname = next

  if (code) {
    const supabase = createServerClient(cookies())
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (error) {
      console.log(`Error in ${pathname}: ${error.message}`)
    } else {
      return NextResponse.redirect(redirectTo)
    }
  } else {
    console.log(`Error in ${pathname} Missing auth code: ${code}`)
  }

  // redirect to the home page with error
  redirectTo.pathname = `/${lang}`
  redirectTo.searchParams.set('auth-code-error', 'true')
  return NextResponse.redirect(redirectTo)
}