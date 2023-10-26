import Link from "next/link";
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

import { ThemeToggle } from "@/components/ThemeToggle";
import { SignOutButton } from '@/components/SignOutButton'
import { UserAuthForm } from '@/components/UserAuthForm'
import { Icons } from "@/components/Icons";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default async function Home() {
  const supabase = createServerComponentClient({ cookies })

  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="grid grid-rows-[auto_1fr] min-h-full h-fit">
      <header className="flex border-b border-foreground/20">
        <div className="flex container mx-auto py-4">
          <Link className="flex items-center gap-2" href="/">
            <Icons.logo className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">Next.js</span>
            <span className="hidden font-bold sm:inline-block">+</span>
            <span className="hidden font-bold sm:inline-block">shadcn/ui</span>
          </Link>
          <div className="ml-auto">
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main className="grid content-start justify-center gap-6 sm:gap-12 md:gap-24">
        <div className="container text-center">
          <section className="grid place-items-center max-w-[800px] gap-2 px-4 py-8 md:pt-16 lg:pt-20">
            <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">
              The fastest way to start building apps with Supabase and Next.js
            </h1>
            <p className="max-w-[600px] pl-1 text-lg text-muted-foreground sm:text-xl">
              Kickstart your projects with this Next.js starter, featuring{' '}
              <Link className="underline text-primary" href="https://supabase.com">Supabase Auth</Link> and{' '}
              <Link className="underline text-primary" href="https://ui.shadcn.com/">shadcn/ui</Link> components.
            </p>
          </section>
        </div>
        <div className="container w-fit">
          <section>
            {user ? (
              <Card className="grid grid-flow-row place-items-center gap-4">
                <CardHeader className="grid place-items-center text-center">
                  <CardTitle className="text-2xl font-semibold tracking-tight">
                    Welcome
                  </CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">
                    Hey, {user.email}!
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <SignOutButton />
                </CardContent>
              </Card>
            ) : (
              <Card className="grid gap-2 w-full max-w-[24rem]">
                <CardHeader className="grid grid-flow-row gap-1 place-items-center text-center">
                  <CardTitle className="text-2xl font-semibold tracking-tight">
                    Sign-in or create an account
                  </CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">
                    Enter your email below to continue
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <UserAuthForm />
                </CardContent>
              </Card>
            )}
          </section>
        </div>
      </main>
    </div>
  )
}
