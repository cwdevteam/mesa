'use client'

import { useAccount } from 'wagmi'
import Link from 'next/link'
import { Logo } from '@/components/Logo'

export function DashboardLink() {
  const { address } = useAccount()

  return address ? (
    <Link className="flex items-center gap-2" href="/dashboard">
      <Logo className="h-6 w-auto" />
    </Link>
  ) : (
    <span className="flex items-center gap-2 cursor-not-allowed opacity-50">
      <Logo className="h-6 w-auto" />
    </span>
  )
}