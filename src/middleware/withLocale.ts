import { NextRequest, NextResponse } from 'next/server'

import { match as matchLocale } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'

import { MiddlewareFactory } from '@/middleware/util'
import i18n from '@/../i18n.config'

const getLocale = (request: NextRequest): string | undefined => {
  // Negotiator expects plain object so we need to transform headers
  const negotiatorHeaders: Record<string, string> = {}
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

  const locales: readonly string[] = i18n.locales

  // Use negotiator and intl-localematcher to get best locale
  let languages = new Negotiator({ headers: negotiatorHeaders }).languages(
    locales as string[]
  )

  const locale = matchLocale(languages, locales, i18n.defaultLocale)

  return locale
}



export const withLocale: MiddlewareFactory = (next) => {
  return async (req: NextRequest, event) => {
    const pathname = req.nextUrl.pathname

    // `/_next/` and `/api/` are ignored by the watcher, but we need to ignore files in `public` manually.
    // If you have one
    // if (
    //   [
    //     '/manifest.json',
    //     '/favicon.ico',
    //     // Your other files in `public`
    //   ].includes(pathname)
    // )
    //   return

    // Check if there is any supported locale in the pathname
    const currentLocale = i18n.locales.find(
      (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    )

    // Redirect if there is no locale
    if (!currentLocale) {
      const locale = getLocale(req)

      // e.g. incoming request is /dashboard
      // The new URL is now /en/dashboard
      return NextResponse.redirect(
        new URL(
          `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
          req.url
        )
      )
    }

    // Add the current locale to the request headers
    req.headers.set(i18n.localeHeader, currentLocale)

    const res = await next(req, event)

    // Add the current locale to the response headers
    res?.headers.set(i18n.localeHeader, currentLocale)

    return res
  }
}