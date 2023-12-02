import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { type EmailOtpType } from '@supabase/supabase-js'
import { createServerClient } from '@/lib/supabase/server'
import { pathnameWithLocale } from '@/lib/utils'
import { Locale } from '@/../i18n.config'

export async function GET(request: NextRequest, { params: { lang } }: { params: { lang: Locale } }) {
  const { pathname, searchParams } =  request.nextUrl
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type') as EmailOtpType | null
  const next = searchParams.get('next') ?? '/'

  // will redirect to dashboard on success
  const redirectTo = request.nextUrl.clone()
  redirectTo.pathname = pathnameWithLocale(lang, next)
  redirectTo.search = ''

  let success: boolean = false

  if (token_hash && type) {
    const supabase = createServerClient(cookies())
    const { error } = await supabase.auth.verifyOtp({
      token_hash,
      type,
    })
    
    if (!error) {
      success = true
    } else {
      console.log(`Error in ${pathname}: ${error.message}`)
    }
  } else {
    console.log(`Error in ${pathname}: Missing token_hash or type:`, {token_hash, type})
  }

  // return the user to the home page with an auth error
  if (!success) {
    redirectTo.pathname = `/${lang}`
    redirectTo.search = '?auth-code-error=1'
  }

  console.log(`Redirecting user from ${request.url} to ${redirectTo} ...`)
  return NextResponse.redirect(redirectTo)
}