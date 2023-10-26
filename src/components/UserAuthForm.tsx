"use client"

import { useEffect, useState } from "react"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/Icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { signInWithOAuth, signInWithOtp } from "@/app/auth/actions"
import { useFormState, useFormStatus } from "@/lib/react-dom-shim"
import Link from "next/link"
import { z } from "zod"


const initialState = {
  message: null,
}

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

function EmailAuthFormFields() {
  const { pending } = useFormStatus()
  return (
    <>
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
    </>
  )
}

function EmailAuthForm() {
  const { toast } = useToast()
  const [state, formAction] = useFormState(signInWithOtp, initialState)
  
  useEffect(() => {
    if (state?.data) {
      toast({
        title: "Success",
        description: "Please check your email to finish signing in.",
      })
    } else if (state?.error) {
      toast({
        title: "Error",
        description: "An error occurred while signing in",
        variant: "destructive",
      })
    }
  }, [state])

  return (
    <form action={formAction} className="contents">
      <EmailAuthFormFields />
    </form>
  )
}


 // Includes all providers currently supported by supabase-js
const SupabaseOAuthProvider = z.enum([
  'apple',
  'azure',
  'bitbucket',
  'discord',
  'facebook',
  'figma',
  'github',
  'gitlab',
  'google',
  'kakao',
  'keycloak',
  'linkedin',
  // 'linkedin_oidc',
  'notion',
  'slack',
  'spotify',
  'twitch',
  'twitter',
  'workos',
  'zoom',
  'fly'
])

const ProviderArray = z.array(SupabaseOAuthProvider)
const stringToArrays = z.string().transform((val) => val.split(/[, ]+/).filter(Boolean))
const enabledOAuthProviders = ProviderArray.parse(
  stringToArrays.parse(process.env.NEXT_PUBLIC_OAUTH_PROVIDERS)
)

// TODO add more icons
const providerIcons = {
  'github': Icons.github,
  'google': Icons.google,
  'apple': Icons.apple,
  // 'azure': Icons.azure,
  // 'bitbucket': Icons.bitbucket,
  // 'discord': Icons.discord,
  // 'facebook': Icons.facebook,
  // 'figma': Icons.figma,
  // 'gitlab': Icons.gitlab,
  // 'kakao': Icons.kakao,
  // 'keycloak': Icons.keycloak,
  // 'linkedin': Icons.linkedin,
  // 'notion': Icons.notion,
  // 'slack': Icons.slack,
  // 'spotify': Icons.spotify,
  // 'twitch': Icons.twitch,
  'twitter': Icons.twitter,
  // 'workos': Icons.workos,
  // 'zoom': Icons.zoom,
  // 'fly': Icons.fly
};

function ProviderIcon({ provider }: { provider: string }) {
  const Icon = provider in providerIcons ? 
    providerIcons[provider as keyof typeof providerIcons] :
    null

  return Icon && <Icon className="mr-2 h-4 w-4" />
}

function SocialAuthFormFields() {
  const { pending } = useFormStatus()
  const [pendingProvider, setPendingProvider] = useState<string | null>(null)

  useEffect(() => {
    if (!pending) {
      setPendingProvider(null)
    }
  }, [pending])

  return (
    <>
      {enabledOAuthProviders.map((provider) => (
        <Button 
          key={provider} 
          type="submit" 
          name="provider" 
          value={provider} 
          variant="outline" 
          disabled={pending}
          onClick={() => setPendingProvider(provider)}
        >
          {pending && pendingProvider === provider ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <ProviderIcon provider={provider} />
          )}{" "}
          {provider.charAt(0).toUpperCase() + provider.slice(1)}
        </Button>
      ))}
    </>
  )
}

function SocialAuthForm() {
  const { toast } = useToast()
  const [state, formAction] = useFormState(signInWithOAuth, initialState)
  const url = state?.data?.url

  useEffect(() => {
    if (url) {
      window.location.href = url
    }
  }, [url])

  useEffect(() => {
    if (state?.error) {
      toast({
        title: "Error",
        description: "An error occurred while signing in with OAuth",
        variant: "destructive",
      })
    }
  }, [state?.error])
  
  return (
    <form action={formAction} className="contents">
      <SocialAuthFormFields />
    </form>
  )
}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <div className="grid gap-1">
        <EmailAuthForm />
      </div>
      {enabledOAuthProviders.length > 0 && (
        <>
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
        </>
      )}
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