'use client'

import { signOut } from "@/app/auth/actions"
import { useFormStatus } from "@/lib/react-dom-shim"
import { Icons } from "@/components/Icons"
import { Button } from "@/components/ui/button"

export function SignOutButton() {
  const { pending } = useFormStatus()
  return (
    <form action={signOut}>
      <Button disabled={pending} type="submit">
        {pending ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          "Logout"
        )}
      </Button>
    </form>
  )
}
