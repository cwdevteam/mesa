import { Locale } from "@/../i18n.config";
import { Button } from "@/components/ui/button";
import UserAuthDialog from "@/components/UserAuthDialog";
import env from "@/env";

export default async function Home({
  params: { lang },
}: {
  params: { lang: Locale }
}) {
  return (
    <main className="grid gap-6 sm:gap-12 md:gap-24">
      <div className="grid grid-rows-[1fr_auto_2fr]">
        <section className="row-start-2 grid gap-4 place-items-center container w-fit p-8">
          <h1 className="text-4xl font-medium tracking-tight">Welcome to Mesa</h1>
          <UserAuthDialog lang={lang}>
            <Button className="text-md px-8 w-full">Sign in</Button>
          </UserAuthDialog>
          <p className="text-sm text-muted-foreground text-center max-w-[18em]">
            Access is currently limited to our alpha release partners.
            {env.NEXT_PUBLIC_ACCESS_FORM_URL && (
              <>
                <br/>
                <br/>
                <a
                  href={env.NEXT_PUBLIC_ACCESS_FORM_URL}
                  className="underline underline-offset-4 hover:text-primary"
                  rel="noreferrer noopener"
                  target="_blank"
                >
                  Sign up for early access
                </a>
              </>
            )}
          </p>
        </section>
      </div>
    </main>
  )
}