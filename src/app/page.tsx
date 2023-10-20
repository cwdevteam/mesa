import { ThemeToggle } from "@/components/ThemeToggle";
import Link from "next/link";

export default function Home() {
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
      </main>
    </div>
  )
}
