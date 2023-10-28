import Link from "next/link";

import UserAuthForm from '@/components/UserAuthForm'

export const dynamic = 'force-dynamic'

export default async function Home() {
  return (
    <main className="grid content-start justify-center gap-6 sm:gap-12 md:gap-24 pt-10 pb-4">
      <div className="container text-center hidden">
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
  )
}
