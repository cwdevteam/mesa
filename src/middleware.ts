import { chain } from '@/middleware/util'
import { withLocale } from '@/middleware/withLocale'

export const middleware = chain([withLocale])

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|static|favicon.ico).*)'],
}
