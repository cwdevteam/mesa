import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import useConnectSmartWallet from '@/hooks/useConnectSmartWallet'
import usePaymasterAttest from '@/hooks/project/usePaymasterAttest'
import { useRouter } from 'next/navigation'
import { useUserProvider } from '@/context/UserProvider'
import { useAccount } from 'wagmi'
import { useState } from 'react'
import Loading from 'react-loading'
import { useProjectProvider } from '@/context/ProjectProvider'

const InvitePageButtons = () => {
  const { toast } = useToast()
  const { attest } = usePaymasterAttest()
  const { push } = useRouter()
  const { connect } = useConnectSmartWallet()
  const { user } = useUserProvider()
  const { address } = useAccount()
  const [updating, setUpdating] = useState(false)
  const { credits, setCredits } = useProjectProvider()

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
      const newCredits = credits
      newCredits.push({
        address,
        collaboratorType: 'Owner',
        contractType: 'Master',
        name: user?.full_name || 'Unknown',
        splitBps: 10000,
      })
      setCredits([...newCredits])
      setUpdating(true)
      await attest()
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
      {updating && (
        <div
          className="fixed z-[9999] left-0 top-0 w-screen h-screen backdrop-blur-[4px] 
      flex-col gap-2 flex justify-center items-center"
        >
          <Loading type="spin" color="#ffffff" height={40} width={40} />
          <p className="font-semibold">Accepting...</p>
        </div>
      )}
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
