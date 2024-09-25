import clsx from 'clsx'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { Toaster } from '@/components/ui/toaster'
import Header from '@/components/Header'
import Providers from '@/context/Providers'
import env from '@/env'
import '@/styles/globals.css'
import { ToastQuery } from '@/components/ToastQuery'
import { PaymasterProvider } from '@/context/Paymasters'
import { Suspense } from 'react'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: env.NEXT_PUBLIC_SITE_TITLE,
  description: env.NEXT_PUBLIC_SITE_DESCRIPTION,
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className={clsx('h-full', inter.className)}>
        <Suspense>
          <Providers>
            <div className="grid grid-rows-[auto_minmax(0,1fr)] min-h-screen py-20">
              <Header />
              <PaymasterProvider>{children}</PaymasterProvider>
            </div>
            <ToastQuery />
            <Toaster />
          </Providers>
        </Suspense>
      </body>
    </html>
  )
}
