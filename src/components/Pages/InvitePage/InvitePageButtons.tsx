import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import useConnectSmartWallet from '@/hooks/useConnectSmartWallet'
import usePaymasterAttest from '@/hooks/project/usePaymasterAttest'
import { useRouter } from 'next/navigation'
import { useUserProvider } from '@/context/UserProvider'
import { useAccount } from 'wagmi'

const InvitePageButtons = () => {
  const { toast } = useToast()
  const { attest } = usePaymasterAttest()
  const { push } = useRouter()
  const { connect } = useConnectSmartWallet()
  const { user } = useUserProvider()
  const { address } = useAccount()

  const handleSubmit = async (accepted: boolean) => {
    if (!address) {
      connect()
      return
    }
    try {
      if (!accepted) {
        toast({
          title: 'Declined',
          description: 'Declined Invitation',
          variant: 'default',
        })
        push('/')
        return
      }
      const newCredit = {
        address,
        collaboratorType: 'Owner',
        contractType: 'Master',
        name: user.full_name,
        splitBps: 10000,
      }
      await attest(newCredit)
      toast({
        title: 'Success',
        description: 'Accepted Invitation',
        variant: 'default',
      })
    } catch (err: any) {
      console.error(err)
      toast({
        title: 'Error',
        description: 'Something went wrong',
        variant: 'destructive',
      })
    }
  }

  return (
    <div className="flex items-center justify-center gap-4">
      <Button
        className="bg-green-600 px-4 py-3 hover:bg-green-700"
        onClick={() => handleSubmit(true)}
      >
        Accept invitation
      </Button>
      <Button
        className="bg-zinc-100 text-black border-2 border-zinc-200 hover:bg-zinc-200"
        onClick={() => handleSubmit(false)}
      >
        Decline
      </Button>
    </div>
  )
}

export default InvitePageButtons
