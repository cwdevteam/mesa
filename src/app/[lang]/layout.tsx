import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { i18n, Locale } from '@/../i18n.config'
import { LocaleProvider } from '@/context/LocaleContext'
import { DictionaryProvider } from '@/context/DictionaryContext'
import { getDictionary } from '@/lib/dictionary'

import ThemeProvider from '@/components/ThemeProvider'
import { Toaster } from "@/components/ui/toaster"

import '@/app/globals.css'
import clsx from 'clsx'

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
  const dictionary = await getDictionary(lang)
  return (
    <html lang={lang} className="h-full" suppressHydrationWarning>
      <body className={clsx('h-full', inter.className)}>
      <LocaleProvider locale={lang}>
          <DictionaryProvider dictionary={dictionary}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
              <Toaster />
            </ThemeProvider>
          </DictionaryProvider>
        </LocaleProvider>
      </body>
    </html>
  )
}
