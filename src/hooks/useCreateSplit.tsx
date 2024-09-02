import { useAccount, useWriteContract } from 'wagmi'
import { pullSplitFactoryAbi } from '@/lib/abi/pullSplitFactory'
import { getRecipientSortedAddressesAndAllocations } from '@0xsplits/splits-sdk/utils'
import { Address, parseEventLogs, zeroAddress } from 'viem'
import { useState } from 'react'
import { useWriteContracts } from 'wagmi/experimental'
import { usePaymasterProvider } from '@/context/Paymasters'
import { CHAIN } from '@/lib/consts'

const useCreateSplit = () => {
  const [result, setResult] = useState<Address>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>()

  const { address } = useAccount()
  const { data: callsStatusId, writeContractsAsync } = useWriteContracts()
  const { capabilities } = usePaymasterProvider()

  const createSplit = async (args: any) => {
    setLoading(true)
    try {
      const recipients = getRecipientSortedAddressesAndAllocations(
        args.recipients,
      )

      const pullSplitFactory =
        '0x80f1B766817D04870f115fEBbcCADF8DBF75E017' as Address

      const transactionHash = await writeContractsAsync({
        account: address,
        chain: CHAIN,
        address: pullSplitFactory,
        abi: pullSplitFactoryAbi,
        functionName: 'createSplit',
        args: [
          {
            recipients: recipients[0],
            allocations: recipients[1],
            totalAllocation: BigInt(1000000),
            distributionIncentive: 0,
          },
          zeroAddress,
          zeroAddress,
        ],
      })

      const transaction = await publicClient.waitForTransactionReceipt({
        hash: transactionHash,
      })
      const topics = parseEventLogs({
        abi: pullSplitFactoryAbi,
        logs: transaction.logs,
      })
      const split = (topics[0] as any).args.split
      setResult(split)
    } catch (error) {
      console.error(error)
      setError('Something went wrong')
    }
    setLoading(false)
  }

  return { createSplit, result, loading, error }
}

export default useCreateSplit
