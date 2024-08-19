'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

import { useToast } from '@/components/ui/use-toast'

import { useDictionary } from '@/context/DictionaryContext'

export function ToastQuery() {
  const searchParams = useSearchParams()
  const isAuthError = searchParams.get('auth-code-error') === 'true'

  const { toast } = useToast()
  const {
    auth: { error: dict },
  } = useDictionary()

  useEffect(() => {
    if (isAuthError) {
      toast({
        title: dict.message,
        description: dict.instructions,
        variant: 'destructive',
      })
    }
  }, [isAuthError, toast, dict])

  return null
}
