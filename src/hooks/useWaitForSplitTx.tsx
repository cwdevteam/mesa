import { useEffect, useState } from 'react'
import { parseEventLogs } from 'viem'
import { useCallsStatus } from 'wagmi/experimental'
import { pullSplitFactoryAbi } from '@/lib/abi/pullSplitFactory'

const useWaitForSplitTx = (callsStatusId?: string) => {
  const { data: callsStatus } = useCallsStatus({
    id: callsStatusId as string,
    query: {
      enabled: !!callsStatusId,
      refetchInterval: (data) =>
        data.state.data?.status === 'CONFIRMED' ? false : 500,
    },
  })
  const [parsedLogs, setParsedLogs] = useState<any>()

  useEffect(() => {
    const handleSuccess = async () => {
      console.log('ZIAD DEBUG', callsStatus)
      const logs = parseEventLogs({
        abi: pullSplitFactoryAbi,
        logs: callsStatus?.receipts?.[0]?.logs as any[],
      }) as any
      setParsedLogs(logs)
    }

    if (callsStatus?.status !== 'CONFIRMED') return
    handleSuccess()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callsStatus])

  return { parsedLogs, callsStatus }
}

export default useWaitForSplitTx
