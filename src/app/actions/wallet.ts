'use server'

import { z } from 'zod';
import { createHash } from "crypto";
import { createServerActionClient, getUser } from '@/lib/supabase';
import env from '@/env';

 // Ethereum addresses are 42 characters long
const WalletAddressSchema = z.string().min(42).max(42)

async function fetchAuthUser() {
  const supabase = createServerActionClient()
  const user = await getUser(supabase)
  if (!user) {
    throw new Error('Not Authorized')
  }
  return user
}

export async function fetchWalletId() {
  const user = await fetchAuthUser()
  return createHash('sha256')
    .update(user.id)
    .digest('base64')
}

export async function fetchWalletToken(address: string) {
  WalletAddressSchema.parse(address);
  const user = await fetchAuthUser()
  return createHash('sha256')
    .update(user.id + address + env.SERVER_SECRET_KEY)
    .digest('base64')
}