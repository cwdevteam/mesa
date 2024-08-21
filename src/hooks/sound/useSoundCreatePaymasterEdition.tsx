'use client'

import { useCallsStatus, useWriteContracts } from 'wagmi/experimental'
import { usePaymasterProvider } from '@/context/Paymasters'
import { useEffect } from 'react'
import { toast } from '@/components/ui/use-toast'

const useSoundCreatePaymasterEdition = () => {
  const { capabilities } = usePaymasterProvider()
  const { data: callsStatusId, writeContractsAsync } = useWriteContracts()
  const { data: callsStatus } = useCallsStatus({
    id: callsStatusId as string,
    query: {
      enabled: !!callsStatusId,
      refetchInterval: (data) =>
        data.state.data?.status === 'CONFIRMED' ? false : 500,
    },
  })

  const createPaymasterEdition = async (input: any) => {
    await writeContractsAsync({
      contracts: [
        {
          ...input,
        },
      ],
      capabilities,
    })
  }

  useEffect(() => {
    if (callsStatus?.status !== 'CONFIRMED') return
    toast({
      title: 'Success',
      description: 'Published On Sound Successfully!',
      variant: 'default',
    })
    window.location.reload()
  }, [callsStatus])

  return { createPaymasterEdition }
}

export default useSoundCreatePaymasterEdition
