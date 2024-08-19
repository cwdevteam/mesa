'use server'

import { z } from 'zod'
import { createHash } from 'crypto'

import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'

import { createServerClient } from '@/lib/supabase/server'
import { getUser } from '@/lib/supabase/server'
import env from '@/env'

// Ethereum addresses are 42 characters long
const WalletAddressSchema = z.string().min(42).max(42)

async function fetchAuthUser() {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)

  const user = await getUser(supabase)
  if (!user) {
    notFound()
  }
  return user
}

export async function fetchWalletId() {
  const user = await fetchAuthUser()
  return createHash('sha256').update(user.id).digest('base64')
}

export async function fetchWalletToken(address: string) {
  WalletAddressSchema.parse(address)
  const user = await fetchAuthUser()
  return createHash('sha256')
    .update(user.id + address + env.SERVER_SECRET_KEY)
    .digest('base64')
}
