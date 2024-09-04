import { cookies } from 'next/headers'
import { createServerClient, getUser } from '@/lib/supabase/server'
import { Dictionary } from '@/dictionaries/types'
import { Locale } from '@/../i18n.config'
import { ThemeToggle } from '@/components/ThemeToggle'
import WalletDropdownButton from './ConnectButton/WalletDropdownButton'
import { DashboardLink } from './DashboardLink'  // Import your new client component

export default async function Header({
  lang,
  dict,
}: {
  lang: Locale
  dict: Dictionary
}) {
  const supabase = createServerClient(cookies())
  const user = await getUser(supabase)

  return (
    <header className="fixed left-0 top-0 w-screen z-2 bg-background flex border-b border-foreground/20">
      <div className="flex container mx-auto py-4">
        <DashboardLink />
        <div className="flex gap-4 ml-auto">
          <ThemeToggle />
          <WalletDropdownButton />
        </div>
      </div>
    </header>
  )
}