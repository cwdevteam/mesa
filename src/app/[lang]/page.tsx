import Link from "next/link";

import UserAuthForm from '@/components/UserAuthForm'

export default async function Home() {
  return (
    <main className="grid content-start justify-center gap-6 sm:gap-12 md:gap-24 pt-10 pb-4">
      <div className="container w-fit">
        <section>
          <UserAuthForm />
        </section>
      </div>
    </main>
  )
}
