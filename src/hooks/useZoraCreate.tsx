'use client'

import { useAccount, usePublicClient, useWriteContract } from 'wagmi'
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
import getSplitParameters from '@/lib/getSplitParameters'
import getSplitWallet from '@/lib/getSplitWallet'

const useZoraCreate = () => {
  const publicClient = usePublicClient()!
  const { name, description, animationUrl, image } = useProjectProvider()
  const { address } = useAccount()
  const { capabilities } = usePaymasterProvider()
  const { data: callsStatusId, writeContractsAsync } = useWriteContracts()
  const { writeContractAsync } = useWriteContract()
  const { parsedLogs } = useWaitForBatchTx(callsStatusId)
  useTransactionConfirm(callsStatusId, 'Published On Zora Successfully!')
  const { connect } = useConnectSmartWallet()
  const [loading, setLoading] = useState(false)
  const { salesConfig } = useOnchainDistributionProvider()
  const createdContract = useMemo(
    () => parsedLogs?.[1] && parsedLogs[1].args.newContract,
    [parsedLogs]
  )

  const create = async (splitArgs: any) => {
    try {
      if (!address) await connect()
      setLoading(true)
      const recipients = splitArgs.recipients
      const shouldSplit = recipients.length !== 1

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
      const splitWallet = await getSplitWallet(splitArgs)

      const { parameters } = await creatorClient.create1155({
        contract: {
          name,
          uri,
        },
        token: {
          tokenMetadataURI: uri,
          createReferral: REFERRAL_RECIPIENT,
          salesConfig,
          payoutRecipient: shouldSplit ? splitWallet : recipients[0].address,
        },
        account: address!,
      })

      const contracts: any = []
      if (shouldSplit) {
        const splitParameters = getSplitParameters(address, splitArgs)
        contracts.push(splitParameters)
      }
      const newParameters = { ...parameters, functionName: 'createContract' }
      contracts.push(newParameters)
      const splitParameters = getSplitParameters(address, splitArgs)
      await writeContractAsync({
        ...splitParameters,
      } as any)
      setLoading(false)
    } catch (err) {
      setLoading(false)
      console.error(err)
    }
  }

  return { create, createdContract, zoraCreating: loading }
}

export default useZoraCreate
