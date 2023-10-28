import Link from "next/link";

import { ThemeToggle } from "@/components/ThemeToggle"
import { Logo } from "@/components/Logo"

export default function Header() {
  return (
    <header className="flex border-b border-foreground/20">
      <div className="flex container mx-auto py-4">
        <Link className="flex items-center gap-2" href="/">
          <Logo className="h-6 w-auto" />
        </Link>
        <div className="ml-auto">
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}