"use client"

import { useEffect } from "react"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/Icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signInWithOAuth, signInWithOtp } from "@/app/auth/actions"
import { useFormState, useFormStatus } from "@/lib/react-dom-shim"
import Link from "next/link"


const initialState = {
  message: null,
}

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

function EmailAuthForm() {
  // XXX TODO use TOAST for form message?
  const [state, formAction] = useFormState(signInWithOtp, initialState)
  const { pending } = useFormStatus()
  return (
    <form action={formAction} className="contents">
      <Label className="sr-only" htmlFor="email">
        Email
      </Label>
      <Input
        id="email"
        name="email"
        placeholder="name@example.com"
        type="email"
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect="off"
        disabled={pending}
        required
      />
      <Button disabled={pending} type="submit">
        {pending && (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        )}
        Continue with Email
      </Button>
    </form>
  )
}

function SocialAuthForm() {
  // XXX TODO use TOAST for form message?
  const [state, formAction] = useFormState(signInWithOAuth, initialState)
  const { pending } = useFormStatus()
  const url = state?.data?.url

  useEffect(() => {
    if (url) {
      window.location.href = url
    }
  }, [url])

  return (
    <form action={formAction} className="contents">
      <Button type="submit" name="provider" value="github" variant="outline" disabled={pending}>
        {pending ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.gitHub className="mr-2 h-4 w-4" />
        )}{" "}
        Github
      </Button>
      <Button type="submit" name="provider" value="google" variant="outline" disabled={pending}>
        {pending ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}{" "}
        Google
      </Button>
    </form>
  )
}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <div className="grid gap-1">
        <EmailAuthForm />
      </div>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <div className="grid gap-1">
        <SocialAuthForm />
      </div>
      <p className="px-8 text-center text-sm text-muted-foreground">
        By clicking continue, you agree to our{" "}
        <Link
          href="/terms"
          className="underline underline-offset-4 hover:text-primary"
        >
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link
          href="/privacy"
          className="underline underline-offset-4 hover:text-primary"
        >
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  )
}