'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

import { useToast } from '@/components/ui/use-toast'

export function ToastQuery() {
  const searchParams = useSearchParams()
  const isAuthError = searchParams.get('auth-code-error') === 'true'

  const { toast } = useToast()

  useEffect(() => {
    if (isAuthError) {
      toast({
        title: 'Oops! Something went wrong.',
        description: 'Please try again',
        variant: 'destructive',
      })
    }
  }, [isAuthError, toast])

  return null
}
