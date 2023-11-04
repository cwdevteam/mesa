import Link from "next/link";

import { ThemeToggle } from "@/components/ThemeToggle"
import { Logo } from "@/components/Logo"
import { SignOutButton } from "./SignOutButton";
import { createServerComponentClient, getUser } from "@/lib/supabase";

export default async function Header() {
  const supabase = createServerComponentClient()
  const user = await getUser(supabase)
  return (
    <header className="flex border-b border-foreground/20">
      <div className="flex container mx-auto py-4">
        <Link className="flex items-center gap-2" href="/">
          <Logo className="h-6 w-auto" />
        </Link>
        <div className="flex gap-4 ml-auto">
          {user && <SignOutButton />}
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}