
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import { createServerComponentClient, getUser } from '@/lib/supabase'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function Dashboard() {
  const supabase = createServerComponentClient()
  const user = await getUser(supabase)
  if (!user) {
    return <></>
  }

  return (
    <main className="grid place-items-center">
      <Button asChild>
        <Link href="/project/new">New Project</Link>
      </Button>
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
