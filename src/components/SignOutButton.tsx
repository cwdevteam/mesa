'use client'

import { signOut } from "@/app/auth/actions"
import { useFormStatus } from "@/lib/react-dom-shim"
import { Icons } from "@/components/Icons"
import { Button } from "@/components/ui/button"

function SignOutButtonFormChildren() {
  const { pending } = useFormStatus()
  return (
    <>
      <Button disabled={pending} type="submit">
        {pending ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          "Logout"
        )}
      </Button>
    </>
  )
}

export function SignOutButton() {
  return (
    <form action={signOut}>
      <SignOutButtonFormChildren />
    </form>
  )
}
