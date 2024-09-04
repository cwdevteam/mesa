'use client'

import { useAccount } from 'wagmi'
import { useWriteContracts } from 'wagmi/experimental'
import { usePaymasterProvider } from '@/context/Paymasters'
import { useMemo } from 'react'
import useTransactionConfirm from './useTransactionConfirm'
import getSplitParameters from '@/lib/getSplitParameters'
import useWaitForSplitTx from './useWaitForSplitTx'

const useCreateSplit = () => {
  const { address } = useAccount()
  const { capabilities } = usePaymasterProvider()
  const { data: callsStatusId, writeContractsAsync } = useWriteContracts()
  const { parsedLogs } = useWaitForSplitTx(callsStatusId)
  useTransactionConfirm(callsStatusId, 'Created Split Successfully!')

  const createdSplit = useMemo(
    () => parsedLogs?.[1] && parsedLogs[1].args.split,
    [parsedLogs]
  )

  const createSplit = async (splitArgs: any) => {
    try {
      const splitParameters = getSplitParameters(address, splitArgs)
      await writeContractsAsync({
        constracts: [splitParameters],
        capabilities,
      } as any)
    } catch (err) {
      console.error(err)
    }
  }

  return { createSplit, createdSplit }
}

export default useCreateSplit
