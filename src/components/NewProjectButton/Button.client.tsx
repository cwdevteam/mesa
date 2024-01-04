'use client'

import { PlusCircledIcon, ReloadIcon } from "@radix-ui/react-icons"
import { User } from "@supabase/supabase-js"

import { Button } from "@/components/ui/button"
import { Dictionary } from "@/dictionaries/types"

import { MesaProjectCreateEvent } from '@/types/mesa';
import { ProjectSubmitButton } from '@/components/ProjectSubmitButton';
import { useEffect, useState } from "react"

export default function NewProjectButtonFormChildren({
  dict,
  user
}: {
  dict: Dictionary['dashboard']['newProjectButton'],
  user: User
}) {
  const [eventData, setEventData] = useState<MesaProjectCreateEvent | null>(null)
  const [toggle, setToggle] = useState(false)
  
  useEffect(() => {
    setEventData({
      type: 'mesa.project.create',
      user_id: user.id,
      project_id: self.crypto.randomUUID()
    })
  }, [user, toggle])

  return (
    <ProjectSubmitButton user={user} eventData={eventData}>
      {({ buttonProps: {onClick, ...props} }) => {
        return (
          <Button
            className="inline-flex gap-2"
            type="submit"
            onClick={(event) => {
              onClick && onClick(event)
              setToggle(!toggle)
            }}
            {...props}
          >
            {props.disabled ? (
              <ReloadIcon color="currentColor" className="h-4 w-4 animate-spin" />
            ) : (
              <PlusCircledIcon color="currentColor" className="h-4 w-4" />
            )}{" "}
            {dict.buttonLabel}
          </Button>
        )
      }}
    </ProjectSubmitButton>
  )
}
