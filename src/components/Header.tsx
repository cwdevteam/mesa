import Link from "next/link";

import { ThemeToggle } from "@/components/ThemeToggle"
import { Logo } from "@/components/Logo"
import { SignOutButton } from "./SignOutButton";
import { Dictionary } from "@/dictionaries/types";
import { Locale } from "@/../i18n.config";

export default async function Header({
  lang,
  dict, 
}: {
  lang: Locale,
  dict: Dictionary
}) {
  return (
    <header className="flex border-b border-foreground/20">
      <div className="flex container mx-auto py-4">
        <Link className="flex items-center gap-2" href="/">
          <Logo className="h-6 w-auto" />
        </Link>
        <div className="flex gap-4 ml-auto">
          <SignOutButton lang={lang} dict={dict.auth.signOutButton}/>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}