import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

import { SignOutButton } from '@/components/SignOutButton'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Database } from '@/lib/database.types'

export const dynamic = 'force-dynamic'

export default async function Dashboard() {
  const supabase = createServerComponentClient<Database>({ cookies })
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return <></>
  }

  return (
    <main className="grid place-items-center">
      <Card className="grid grid-flow-row place-items-center gap-4 w-fit">
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
      </Card>
    </main>
  )
}
