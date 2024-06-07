import clsx from 'clsx'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { i18n, Locale } from '@/../i18n.config'
import { Toaster } from '@/components/ui/toaster'
import Header from '@/components/Header'
import Providers from '@/context/Providers'
import env from '@/env'

import '@/app/globals.css'
import { getDictionary } from '@/lib/dictionary'
import { ToastQuery } from '@/components/ToastQuery'
import {
  createServerClient,
  getUser
} from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import MediaPlayer from '@/components/GlobalAudioPlayer/MediaPlayer'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap'
})

export const metadata: Metadata = {
  title: env.NEXT_PUBLIC_SITE_TITLE,
  description: env.NEXT_PUBLIC_SITE_DESCRIPTION,
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
  const dict = await getDictionary(lang)
  const supabase = createServerClient(cookies())
  const user = await getUser(supabase)
  return (
    <html lang={lang} className="h-full" suppressHydrationWarning>
      <body className={clsx('h-full', inter.className)}>
        <Providers lang={lang}>
          <div className="grid grid-rows-[auto_minmax(0,1fr)] min-h-full h-fit max-h-full">
            <Header lang={lang} dict={dict} />
            {children}
            {user && <MediaPlayer />}
          </div>
          <ToastQuery />
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
