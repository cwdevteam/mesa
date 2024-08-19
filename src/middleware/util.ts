import { NextMiddleware, NextRequest, NextResponse } from 'next/server'

import i18n from '@/../i18n.config'

export type MiddlewareFactory = (next: NextMiddleware) => NextMiddleware

export function chain(arr: MiddlewareFactory[] = []): NextMiddleware {
  if (arr.length > 0) {
    const [a, ...bs] = arr
    const b = chain(bs)
    return a(b)
  }
  return () => NextResponse.next()
}

export const currentLocale = (r: NextRequest | NextResponse): string | null => {
  return r.headers.get(i18n.localeHeader)
}
