'use client'

import { useEffect, useState } from 'react'

import env from '@/env'
import { Icons } from '@/components/Icons'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { signInWithOAuth } from '@/lib/supabase/auth/actions'
import { useFormState, useFormStatus } from 'react-dom'
import { Provider } from '@supabase/supabase-js'

const initialState = {} as Awaited<ReturnType<typeof signInWithOAuth>>

// TODO add more icons
const providerIcons = {
  github: Icons.github,
  google: Icons.google,
  apple: Icons.apple,
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
  twitter: Icons.twitter,
  // 'workos': Icons.workos,
  // 'zoom': Icons.zoom,
  // 'fly': Icons.fly
}

function ProviderIcon({ provider }: { provider: string }) {
  const Icon =
    provider in providerIcons
      ? providerIcons[provider as keyof typeof providerIcons]
      : null

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
      {env.NEXT_PUBLIC_OAUTH_PROVIDERS?.map((provider: Provider) => (
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
          )}{' '}
          {provider.charAt(0).toUpperCase() + provider.slice(1)}
        </Button>
      ))}
    </>
  )
}

export default function SocialAuthForm() {
  const { toast } = useToast()
  const [state, formAction] = useFormState(signInWithOAuth, initialState)

  useEffect(() => {
    if (state?.error) {
      toast({
        title: 'Error',
        description: 'An error occurred while signing in',
        variant: 'destructive',
      })
    }
  }, [toast, state?.error])

  return (
    <form action={formAction} className="contents">
      <SocialAuthFormFields />
    </form>
  )
}
