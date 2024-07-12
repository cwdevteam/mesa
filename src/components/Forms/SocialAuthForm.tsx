'use client'

import { useEffect, useState } from 'react'

import { Icons } from '@/components/Icons'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { useFormState, useFormStatus } from 'react-dom'

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
      <Button
        type="submit"
        name="provider"
        value={'provider'}
        variant="outline"
        disabled={pending}
        onClick={() => setPendingProvider('provider')}
      >
        {pending && pendingProvider === 'provider' ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <ProviderIcon provider={'provider'} />
        )}{' '}
        provider
      </Button>
    </>
  )
}

export default function SocialAuthForm() {
  const { toast } = useToast()

  return (
    <form className="contents">
      <SocialAuthFormFields />
    </form>
  )
}
