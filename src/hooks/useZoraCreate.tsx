'use client'

import { useAccount, usePublicClient } from 'wagmi'
import { useWriteContracts } from 'wagmi/experimental'
import { createCreatorClient } from '@zoralabs/protocol-sdk'
import useConnectSmartWallet from './useConnectSmartWallet'
import { usePaymasterProvider } from '@/context/Paymasters'
import { CHAIN_ID, REFERRAL_RECIPIENT } from '@/lib/consts'
import useWaitForBatchTx from './useWaitForBatchTx'
import { useMemo, useState } from 'react'
import { useProjectProvider } from '@/context/ProjectProvider'
import { uploadJson } from '@/lib/ipfs/uploadJson'
import { useOnchainDistributionProvider } from '@/context/OnchainDistributionProvider'
import useTransactionConfirm from './useTransactionConfirm'
import { toast } from '@/components/ui/use-toast'
import { Address, zeroAddress } from 'viem'
import { pullSplitFactoryAbi } from '@/lib/abi/pullSplitFactory'

const useZoraCreate = () => {
  const publicClient = usePublicClient()!
  const { name, description, animationUrl, image, feeRecipient } =
    useProjectProvider()
  const { address } = useAccount()
  const { capabilities } = usePaymasterProvider()
  const {
    data: callsStatusId,
    writeContractsAsync,
    writeContracts,
  } = useWriteContracts()
  const { parsedLogs } = useWaitForBatchTx(callsStatusId)
  useTransactionConfirm(callsStatusId, 'Published On Zora Successfully!')
  const { connect } = useConnectSmartWallet()
  const [loading, setLoading] = useState(false)
  const { salesConfig } = useOnchainDistributionProvider()
  const createdContract = useMemo(
    () => parsedLogs?.[1] && parsedLogs[1].args.newContract,
    [parsedLogs]
  )
  const { activeSplit, splitPercents, splits, totalSplitPercent } =
    useProjectProvider()

  const create = async () => {
    try {
      if (!address) await connect()
      setLoading(true)
      const creatorClient = createCreatorClient({
        chainId: CHAIN_ID,
        publicClient,
      })
      const { uri } = await uploadJson({
        name,
        description,
        image,
        animation_url: animationUrl,
      })
      const { parameters } = await creatorClient.create1155({
        contract: {
          name,
          uri,
        },
        token: {
          tokenMetadataURI: uri,
          createReferral: REFERRAL_RECIPIENT,
          payoutRecipient: feeRecipient,
          salesConfig,
        },
        account: address!,
      })
      const newParameters = { ...parameters, functionName: 'createContract' }
      let contracts = [{ ...(newParameters as any) }]
      if (activeSplit) {
        if (splits.length < 2) {
          toast({
            title: 'Error',
            description: 'At least two recipients are required',
            variant: 'destructive',
          })
          return
        }
        if (totalSplitPercent !== 100) {
          toast({
            title: 'Error',
            description: 'Percent allocation must add up to 100',
            variant: 'destructive',
          })
          return
        }
        const recipients = splits.map((recipient: any, index: number) => ({
          address: recipient,
          percentAllocation: splitPercents[index],
        }))
        const pullSplitFactory =
          '0x80f1B766817D04870f115fEBbcCADF8DBF75E017' as Address
        contracts.push({
          address: pullSplitFactory,
          abi: pullSplitFactoryAbi as any,
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
          account: address,
        })
      }
      await writeContractsAsync({
        contracts,
        capabilities,
      } as any)
      setLoading(false)
    } catch (err) {
      console.log('ZIAD HERE', err)
      setLoading(false)
      console.error(err)
    }
  }

  return { create, createdContract, zoraCreating: loading }
}

export default useZoraCreate
