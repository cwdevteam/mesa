'use client'

import { useEffect } from 'react'

import { Icons } from '@/components/Icons'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'
import { signInWithOtp } from '@/lib/supabase/auth/actions'
import { useFormState, useFormStatus } from 'react-dom'

const initialState = {} as Awaited<ReturnType<typeof signInWithOtp>>

function EmailAuthFormFields() {
  const { pending } = useFormStatus()
  return (
    <>
      <Label className="sr-only" htmlFor="email">
        {'Email'}
      </Label>
      <Input
        id="email"
        name="email"
        placeholder={'name@example.com'}
        type="email"
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect="off"
        disabled={pending}
        required
      />
      <Button disabled={pending} type="submit">
        {pending && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
        {'Continue with Email'}
      </Button>
    </>
  )
}

export default function EmailAuthForm() {
  const { toast } = useToast()
  const [state, formAction] = useFormState(signInWithOtp, initialState)

  useEffect(() => {
    if (state?.data) {
      toast({
        title: 'Success',
        description: 'Please check your email to finish signing in.',
      })
    } else if (state?.error) {
      toast({
        title: 'Error',
        description: 'An error occurred while signing in',
        variant: 'destructive',
      })
    }
  }, [toast, state])

  return (
    <form action={formAction} className="contents">
      <EmailAuthFormFields />
    </form>
  )
}
