import clsx from 'clsx'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { i18n, Locale } from '@/../i18n.config'
import { Toaster } from '@/components/ui/toaster'
import Header from '@/components/Header'
import Providers from '@/context/Providers'
import env from '@/env'
import MediaPlayer from '@/components/GlobalAudioPlayer/MediaPlayer'

import '@/app/globals.css'
import { getDictionary } from '@/lib/dictionary'
import { ToastQuery } from '@/components/ToastQuery'
import { PaymasterProvider } from '@/context/Paymasters'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap'
})

export const metadata: Metadata = {
  title: env.NEXT_PUBLIC_SITE_TITLE,
  description: env.NEXT_PUBLIC_SITE_DESCRIPTION,
}

export async function generateStaticParams() {
  return i18n.locales.map(locale => ({ lang: locale }))
}

export default async function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode
  params: { lang: Locale }
}) {
  const dict = await getDictionary(lang)
  return (
    <html lang={lang} className="h-full" suppressHydrationWarning>
      <body className={clsx('h-full', inter.className)}>
        <Providers lang={lang}>
          <div className="grid grid-rows-[auto_minmax(0,1fr)] min-h-full h-fit max-h-full">
            <Header lang={lang} dict={dict} />
            <PaymasterProvider>{children}</PaymasterProvider>
            <MediaPlayer />
          </div>
          <ToastQuery />
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
