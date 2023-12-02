'use client'

import { useFormStatus } from "react-dom"

import { Icons } from "@/components/Icons"
import { Button } from "@/components/ui/button"
import { Dictionary } from "@/dictionaries/types"
import { PlusIcon } from "@radix-ui/react-icons"

export default function NewProjectButtonFormChildren({dict}: {dict: Dictionary['dashboard']['newProjectButton']}) {
  const { pending } = useFormStatus()
  return (
    <Button className="inline-flex gap-2" disabled={pending} type="submit">
      {pending ? (
        <Icons.spinner className="h-4 w-4 animate-spin" />
      ) : (
        <PlusIcon className="h-4 w-4" />
      )}{" "}
      {dict.buttonLabel}
    </Button>
  )
}