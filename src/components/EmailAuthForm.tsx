'use client'

import { useEffect } from 'react'

import { Icons } from '@/components/Icons'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'
import { signInWithOtp } from '@/lib/supabase/auth/actions'
import { useFormState, useFormStatus } from 'react-dom'
import { useLocale } from '@/context/LocaleContext'
import { useDictionary } from '@/context/DictionaryContext'

const initialState = {} as Awaited<ReturnType<typeof signInWithOtp>>

function EmailAuthFormFields() {
  const { pending } = useFormStatus()
  const {
    auth: { emailAuthForm: dict },
  } = useDictionary()
  return (
    <>
      <Label className="sr-only" htmlFor="email">
        {dict.emailInputLabel}
      </Label>
      <Input
        id="email"
        name="email"
        placeholder={dict.emailInputPlaceholder}
        type="email"
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect="off"
        disabled={pending}
        required
      />
      <Button disabled={pending} type="submit">
        {pending && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
        {dict.buttonLabel}
      </Button>
    </>
  )
}

export default function EmailAuthForm() {
  const { toast } = useToast()
  const lang = useLocale()
  const {
    auth: { emailAuthForm: dict },
  } = useDictionary()
  const [state, formAction] = useFormState(signInWithOtp, initialState)

  useEffect(() => {
    if (state?.data) {
      toast({
        title: dict.successToastTitle,
        description: dict.successToastDescription,
      })
    } else if (state?.error) {
      toast({
        title: dict.errorToastTitle,
        description: dict.errorToastDescription,
        variant: 'destructive',
      })
    }
  }, [toast, state, dict])

  return (
    <form action={formAction} className="contents">
      <input type="hidden" name="lang" value={lang} />
      <EmailAuthFormFields />
    </form>
  )
}
