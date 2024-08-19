import { useEffect, useState } from 'react'
import { parseEventLogs } from 'viem'
import { useCallsStatus } from 'wagmi/experimental'
import { zoraCreator1155FactoryImplABI } from '@zoralabs/protocol-deployments'

const useWaitForBatchTx = (callsStatusId?: string) => {
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
      const logs = parseEventLogs({
        abi: zoraCreator1155FactoryImplABI,
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

export default useWaitForBatchTx
