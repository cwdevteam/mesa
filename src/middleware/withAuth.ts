import { NextResponse, NextRequest } from 'next/server'

import { MiddlewareFactory, currentLocale } from '@/middleware/util'
import { createMiddlewareClient } from '@/lib/supabase/server'

export const withAuth: MiddlewareFactory = (next) => {
  return async (request: NextRequest, event) => {
    const locale = currentLocale(request)

    // Auth is not required for auth callback routes
    if (request.nextUrl.pathname.startsWith(`/${locale}/auth/`)) {
      return next(request, event)
    }

    // Create supabase client for auth
    const { supabase, response } = createMiddlewareClient(request)
    
    // Get auth user from supabase client. If null, user is not logged in.
    // Also, refreshes session if expired - required for Server Components
    // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-session-with-middleware
    const { data: { user } } = await supabase.auth.getUser()

    // if user is signed in and the current path is /<locale> redirect the user to /<locale>/dashboard
    if (user && request.nextUrl.pathname === `/${locale}`) {
      console.log('auth: user is signed in, redirect to dashboard')
      return NextResponse.redirect(new URL(`${locale}/dashboard`, request.url))
    }

    // if user is not signed in and the current path is not /<locale> redirect the user to /<locale>
    if (!user && request.nextUrl.pathname !== `/${locale}`) {
      console.log('auth: user is not signed in, redirect to sign in page')
      return NextResponse.redirect(new URL(`/${locale}`, request.url))
    }

    return response
  }
}