'use server'
import React from 'react'
import Link from 'next/link'
import { cookies } from 'next/headers'

import { createServerClient, getUser } from '@/lib/supabase/server'

import { ThemeToggle } from '@/components/ThemeToggle'
import { Logo } from '@/components/Logo'
import WalletDropdownButton from './ConnectButton/WalletDropdownButton'

export default async function Header() {
  const supabase = createServerClient(cookies())
  const user = await getUser(supabase)
  return (
    <header className="fixed left-0 top-0 w-screen z-2 bg-background flex border-b border-foreground/20">
      <div className="flex container mx-auto py-4">
        <Link className="flex items-center gap-2" href="/dashboard">
          <Logo className="h-6 w-auto" />
        </Link>
        <div className="flex gap-4 ml-auto">
          <ThemeToggle />
          <WalletDropdownButton />
        </div>
      </div>
    </header>
  )
}
