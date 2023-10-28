"use client"

import { useEffect, useState } from "react"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/Icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { signInWithOAuth, signInWithOtp } from "@/app/actions"
import { useFormState, useFormStatus } from "@/lib/react-dom-shim"
import Link from "next/link"
import { env } from "@/env"
import { useLocale } from "@/context/LocaleContext"
import { useDictionary } from "@/context/DictionaryContext"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const initialState = {
  EmailAuthForm: {},
  SocialAuthForm: {}
}

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

function EmailAuthFormFields() {
  const { pending } = useFormStatus()
  const { auth: {emailAuthForm: dict } } = useDictionary()
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
        {pending && (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        )}
        {dict.buttonLabel}
      </Button>
    </>
  )
}

function EmailAuthForm() {
  const { toast } = useToast()
  const lang = useLocale()
  const { auth: {emailAuthForm: dict } } = useDictionary()
  
  const [state, formAction] = useFormState(
    signInWithOtp,
    initialState.EmailAuthForm as
    ReturnType<typeof signInWithOtp>
  )
  
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
        variant: "destructive",
      })
    }
  }, [toast, state])

  return (
    <form action={formAction} className="contents">
      <input type="hidden" name="lang" value={lang} />
      <EmailAuthFormFields />
    </form>
  )
}

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
      {env.NEXT_PUBLIC_OAUTH_PROVIDERS?.map((provider) => (
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
  const lang = useLocale()
  const { auth: {socialAuthForm: dict } } = useDictionary()
  const [state, formAction] = useFormState(
    signInWithOAuth,
    initialState.SocialAuthForm as
    ReturnType<typeof signInWithOAuth>
  )
  const url = state?.data?.url

  useEffect(() => {
    if (url) {
      window.location.href = url
    }
  }, [url])

  useEffect(() => {
    if (state?.error) {
      toast({
        title: dict.errorToastTitle,
        description: dict.errorToastDescription,
        variant: "destructive",
      })
    }
  }, [toast, state?.error])
  
  return (
    <form action={formAction} className="contents">
      <input type="hidden" name="lang" value={lang} />
      <SocialAuthFormFields />
    </form>
  )
}

export default function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const { auth: {userAuthForm: dict } } = useDictionary()
  return (
    <Card className={cn("grid gap-2 w-full max-w-[24rem]", className)} {...props}>
      <CardHeader className="grid grid-flow-row gap-1 place-items-center text-center">
        <CardTitle className="text-2xl font-semibold tracking-tight">
          {dict.title}
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          {dict.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="grid gap-1">
            <EmailAuthForm />
          </div>
          {env.NEXT_PUBLIC_OAUTH_PROVIDERS && (
            <>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    {dict.orContinueWith}
                  </span>
                </div>
              </div>
              <div className="grid gap-1">
                <SocialAuthForm />
              </div>
            </>
          )}
          <p className="px-8 text-center text-sm text-muted-foreground">
            {dict.agreementText}{" "}
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              {dict.termsOfService}
            </Link>{" "}
            {dict.and}{" "}
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              {dict.privacyPolicy}
            </Link>
            .
          </p>
        </div>
      </CardContent>
    </Card>
  )
}