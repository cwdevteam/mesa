import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest, { params: { lang } }: { params: { lang: string } }) {
  const cookieStore = cookies()
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (session) {
    await supabase.auth.signOut()
  }
  
  return NextResponse.redirect(new URL(`/${lang}`, req.url), {
    status: 302,
  })
}