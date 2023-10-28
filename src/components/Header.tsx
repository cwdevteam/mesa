import Link from "next/link";

import { ThemeToggle } from "@/components/ThemeToggle"
import { Icons } from "@/components/Icons"

export default function Header() {
  return (
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
  )
}