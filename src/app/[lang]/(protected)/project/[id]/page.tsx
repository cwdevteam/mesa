import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

import { Database } from '@/lib/database.types'

export const dynamic = 'force-dynamic'

export default async function Project() {
  const supabase = createServerComponentClient<Database>({ cookies })
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return <></>
  }

  return (
    <main className="grid place-items-center">
    </main>
  )
}
