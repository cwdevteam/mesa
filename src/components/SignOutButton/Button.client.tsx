'use client'

import { useFormStatus } from "react-dom"

import { Icons } from "@/components/Icons"
import { Button } from "@/components/ui/button"
import { Dictionary } from "@/dictionaries/types"

export default function SignOutButtonFormChildren({dict}: {dict: Dictionary['auth']['signOutButton']}) {
  const { pending } = useFormStatus()
  return (
    <Button disabled={pending} type="submit">
      {pending ? (
        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        dict.buttonLabel
      )}
    </Button>
  )
}