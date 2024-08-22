'use client'

import { useWriteContracts } from 'wagmi/experimental'
import { usePaymasterProvider } from '@/context/Paymasters'
import useTransactionConfirm from '../useTransactionConfirm'

const useSoundCreatePaymasterEdition = () => {
  const { capabilities } = usePaymasterProvider()
  const { data: callsStatusId, writeContractsAsync } = useWriteContracts()
  useTransactionConfirm(callsStatusId, 'Published On Sound Successfully!')

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

  return { createPaymasterEdition }
}

export default useSoundCreatePaymasterEdition
