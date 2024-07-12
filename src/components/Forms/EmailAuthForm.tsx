'use client'

import { FormEvent, useState } from 'react'

import { Icons } from '@/components/Icons'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'
import axios from 'axios'

export default function EmailAuthForm() {
  const { toast } = useToast()
  const [loading, setLoading] = useState<boolean>(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      setLoading(true)
      const { data } = await axios.post('/api/auth/login', {
        email: event.currentTarget.email.value,
      })

      if (data && data.status) {
        toast({
          title: 'Success',
          description: data.message,
          variant: 'default',
        })
      } else {
        toast({
          title: 'Failed',
          description: data.message,
          variant: 'destructive',
        })
      }
      setLoading(false)
    } catch (err) {
      toast({
        title: 'Failed',
        description: 'Something went wrong',
        variant: 'destructive',
      })
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="contents">
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
        required
      />

      <>
        {loading ? (
          <Button>
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          </Button>
        ) : (
          <Button type="submit">Continue with Email</Button>
        )}
      </>
    </form>
  )
}
