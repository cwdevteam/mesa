import Link from "next/link";

import { ThemeToggle } from "@/components/ThemeToggle";
import { UserAuthForm } from '@/components/UserAuthForm'
import { Icons } from "@/components/Icons";

export const dynamic = 'force-dynamic'

export default async function Home() {

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
            <UserAuthForm />
          </section>
        </div>
      </main>
    </div>
  )
}
