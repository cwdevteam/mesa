'use client'

import React from 'react'
import Link from 'next/link'

import { ThemeToggle } from '@/components/ThemeToggle'
import WalletDropdownButton from './ConnectButton/WalletDropdownButton'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

export default function Header() {
  const pathname = usePathname()
  const isProjectPage = pathname.includes('/project')

  return (
    <header className="fixed left-0 top-0 w-screen z-2 bg-background flex border-b border-foreground/20">
      <div className="flex items-center justify-between container mx-auto py-2">
        <Link className="flex items-center gap-2" href="/">
          <Image src={'/images/logo.svg'} alt="" width={188} height={63} />
        </Link>
        {isProjectPage && (
          <div className="flex items-end h-full pb-2">
            <p className="font-roboto_bold text-black dark:text-white text-2xl align-bottom">
              Project Name
            </p>
          </div>
        )}
        <div className="flex gap-4">
          <ThemeToggle />
          <WalletDropdownButton />
        </div>
      </div>
    </header>
  )
}
