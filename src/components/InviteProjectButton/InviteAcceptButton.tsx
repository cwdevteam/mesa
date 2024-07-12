import { useState } from 'react'
import { Router, useRouter } from 'next/router'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import axios from 'axios'

export default function InviteAcceptButton({ inviteId }: { inviteId: string }) {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState<boolean>(false)

  const handleSubmit = async (state: string) => {
    try {
      setLoading(true)
      const { data } = await axios.post('/api/project_invitation/choice', {
        state: state,
        inviteId: inviteId,
      })

      if (data && data.status) {
        if (state === 'accept') {
          toast({
            title: 'Success',
            description: 'Accepted Invitation',
            variant: 'default',
          })
          router.push(`/${router.locale}/project/${data.id}`)
        } else {
          router.reload()
        }
      }
      setLoading(false)
    } catch (err: any) {
      setLoading(false)
      toast({
        title: 'Error',
        description: 'Something went wrong!',
        variant: 'destructive',
      })
    }
  }

  return (
    <div className="flex gap-4">
      <Button
        className="bg-blue-600 hover:bg-blue-800"
        onClick={() => handleSubmit('accept')}
        disabled={loading}
      >
        Accept
      </Button>
      <Button
        className="bg-red-600 hover:bg-red-800"
        onClick={() => handleSubmit('reject')}
        disabled={loading}
      >
        Reject
      </Button>
    </div>
  )
}
