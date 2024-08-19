import { cookies } from 'next/headers'
import { createServerClient } from '@/lib/supabase/server'
import { Locale } from '@/../i18n.config'
import { signOut } from '@/lib/supabase/auth/actions'

import SignOutButtonFormChildren from './Button.client'
import { Dictionary } from '@/dictionaries/types'

export async function SignOutButton({
  lang,
  dict,
}: {
  lang: Locale
  dict: Dictionary['auth']['signOutButton']
}) {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    const signOutWithLang = signOut.bind(null, lang)
    return (
      <div className="flex items-center gap-4">
        Hey, {user.email}!
        <form action={signOutWithLang}>
          <SignOutButtonFormChildren dict={dict} />
        </form>
      </div>
    )
  }
}
