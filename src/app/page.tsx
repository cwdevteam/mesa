import Link from "next/link";
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

import SignOutButton from '@/components/SignOutButton'
import AuthForm from '@/components/AuthForm'
import { ThemeToggle } from "@/components/ThemeToggle";

export const dynamic = 'force-dynamic'

export default async function Home() {
  const supabase = createServerComponentClient({ cookies })

  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="grid grid-rows-[auto_1fr] min-h-full h-fit">
      <header className="flex border-b border-foreground/20">
        <div className="flex container mx-auto py-4">
          <div className="ml-auto">
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main className="grid grid-flow-row place-content-center">
        <div className="container py-4">
          <h1 className="scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl">
            Nextjs <Link className="underline font-medium text-primary" href="https://ui.shadcn.com/">shadcn/ui</Link> Starter.
          </h1>
        </div>
        <div className="container p-4">
          {user ? (
            <div className="grid grid-flow-row place-items-center gap-4">
              Hey, {user.email}!
              <SignOutButton />
            </div>
          ) : (
            <AuthForm />
          )}
        </div>
      </main>
    </div>
  )
}
