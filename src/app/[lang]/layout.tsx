import clsx from 'clsx'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { i18n, Locale } from '@/../i18n.config'
import { Toaster } from "@/components/ui/toaster"
import Header from '@/components/Header'
import Providers from '@/context/Providers'
import env from'@/env'

import '@/app/globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'Next.js Supabase Auth Starter',
  description: 'The fastest way to start building apps with Supabase and Next.js',
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

export default async function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode
  params: { lang: Locale }
}) {
  return (
    <html lang={lang} className="h-full" suppressHydrationWarning>
      <body className={clsx('h-full', inter.className)}>
        <Providers lang={lang}>
          <div className="grid grid-rows-[auto_1fr] min-h-full h-fit">
            <Header />
            {children}
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
