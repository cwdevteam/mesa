import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

import { createHash } from "crypto";

export async function POST(req: Request) {
  const cookieStore = cookies()
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    console.error('Not Authorized')
    return new Response(null, { status: 401 })
  }

  const { token } = await req.json()
  if (!token) {
    console.error('Missing token')
    return new Response(null, { status: 400 })
  }
  
  const hash = createHash('sha256');
  hash.update(token + process.env.SERVER_SECRET_KEY);

  const password = hash.digest('base64')
  return Response.json({ password })
}

