import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import ThemeProvider from '@/components/ThemeProvider'
import { Toaster } from "@/components/ui/toaster"

import './globals.css'
import clsx from 'clsx'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'Next.js Supabase Auth Starter',
  description: 'The fastest way to start building apps with Supabase and Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className={clsx('h-full', inter.className)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
