import { chain } from '@/middleware/util'
import { withAuth } from '@/middleware/withAuth'
import { withLocale } from '@/middleware/withLocale'
import { withTrace } from '@/middleware/withTrace'

export const middleware = chain([
  withTrace("[1]"),
  withLocale,
  withTrace("[2]"),
  withAuth,
  withTrace("[3]")
])

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|static|favicon.ico).*)'],
}