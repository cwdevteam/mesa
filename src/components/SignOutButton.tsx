'use client'

import { useFormStatus } from "@/lib/react-dom-shim"
import { Icons } from "@/components/Icons"
import { Button } from "@/components/ui/button"
import { useLocale } from "@/context/LocaleContext"
import { useDictionary } from "@/context/DictionaryContext"

function SignOutButtonFormChildren() {
  const { pending } = useFormStatus()
  const { auth: {signOutButton: dict }} = useDictionary()
  return (
    <>
      <Button disabled={pending} type="submit">
        {pending ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          dict.buttonLabel
        )}
      </Button>
    </>
  )
}

export const SignOutButton = () => {
  const lang = useLocale()
  return (
    <form action={`/${lang}/auth/signout`} method="post">
      <SignOutButtonFormChildren />
    </form>
  )
}