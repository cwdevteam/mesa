import { toast } from '@/components/ui/use-toast'
import { useEffect } from 'react'
import { useCallsStatus } from 'wagmi/experimental'

const useTransactionConfirm = (callsStatusId: any, confirmText: string) => {
  const { data: callsStatus } = useCallsStatus({
    id: callsStatusId as string,
    query: {
      enabled: !!callsStatusId,
      refetchInterval: (data) =>
        data.state.data?.status === 'CONFIRMED' ? false : 500,
    },
  })

  useEffect(() => {
    if (callsStatus?.status !== 'CONFIRMED') return
    toast({
      title: 'Success',
      description: confirmText,
      variant: 'default',
    })
  }, [callsStatus, confirmText])
}

export default useTransactionConfirm
