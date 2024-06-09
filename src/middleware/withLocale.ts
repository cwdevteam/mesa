import { NextRequest, NextResponse } from 'next/server'

import { match as matchLocale } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'

import { MiddlewareFactory } from '@/middleware/util'
import i18n, { Locale } from '@/../i18n.config'
import { pathnameWithLocale } from '@/lib/utils'

const getLocale = (request: NextRequest): Locale | undefined => {
  // Negotiator expects plain object so we need to transform headers
  const negotiatorHeaders: Record<string, string> = {}
  request.headers.forEach((value: any, key: any) => (negotiatorHeaders[key] = value))

  const locales: readonly string[] = i18n.locales

  // Use negotiator and intl-localematcher to get best locale
  let languages = new Negotiator({ headers: negotiatorHeaders }).languages(
    locales as string[]
  )

  const locale = matchLocale(languages, locales, i18n.defaultLocale) as Locale

  return locale
}

export const withLocale: MiddlewareFactory = (next) => {
  return async (request: NextRequest, event) => {
    const { pathname } = request.nextUrl

    // Check if there is any supported locale in the pathname
    const currentLocale = i18n.locales.find(
      (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    )

    // Redirect if there is no locale
    if (!currentLocale) {
      const locale = getLocale(request)
      const redirectTo = request.nextUrl.clone()
      // Add the locale to the URL pathname
      redirectTo.pathname = pathnameWithLocale(locale as Locale, pathname)
      return NextResponse.redirect(redirectTo)
    }

    // Add the current locale to the request headers
    request.headers.set(i18n.localeHeader, currentLocale)

    const response = await next(request, event)

    // Add the current locale to the response headers
    response?.headers.set(i18n.localeHeader, currentLocale)

    return response
  }
}