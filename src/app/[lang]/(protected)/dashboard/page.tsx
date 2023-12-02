
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { NewProjectButton } from '@/components/NewProjectButton'
import { createServerClient, getUser } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import { Locale } from '@/../i18n.config'
import { getDictionary } from '@/lib/dictionary'

export default async function Dashboard({
  params: { lang },
}: {
  params: { lang: Locale }
}) {
  const { dashboard: dict } = await getDictionary(lang)
  const supabase = createServerClient(cookies())
  const user = await getUser(supabase)
  if (!user) {
    return <></>
  }

  return (
    <main className="grid place-items-center">
      <NewProjectButton lang={lang} dict={dict.newProjectButton} />
      {/* <Card className="grid grid-flow-row place-items-center gap-4 w-fit">
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
      </Card> */}
    </main>
  )
}
