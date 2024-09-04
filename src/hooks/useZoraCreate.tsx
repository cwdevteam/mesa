'use client'

import { useAccount, usePublicClient } from 'wagmi'
import { useWriteContracts } from 'wagmi/experimental'
import { createCreatorClient } from '@zoralabs/protocol-sdk'
import useConnectSmartWallet from './useConnectSmartWallet'
import { usePaymasterProvider } from '@/context/Paymasters'
import { CHAIN_ID, REFERRAL_RECIPIENT } from '@/lib/consts'
import useWaitForBatchTx from './useWaitForBatchTx'
import { useEffect, useMemo, useState } from 'react'
import { useProjectProvider } from '@/context/ProjectProvider'
import { uploadJson } from '@/lib/ipfs/uploadJson'
import { useOnchainDistributionProvider } from '@/context/OnchainDistributionProvider'
import useTransactionConfirm from './useTransactionConfirm'
import useCreateSplit from './useCreateSplit'

const useZoraCreate = () => {
  const publicClient = usePublicClient()!
  const { name, description, animationUrl, image } = useProjectProvider()
  const { address } = useAccount()
  const { capabilities } = usePaymasterProvider()
  const { data: callsStatusId, writeContractsAsync } = useWriteContracts()
  const { parsedLogs: parsedCreatedLogs } = useWaitForBatchTx(callsStatusId)
  useTransactionConfirm(callsStatusId, 'Published On Zora Successfully!')
  const { createSplit, createdSplit } = useCreateSplit()
  const { connect } = useConnectSmartWallet()
  const [loading, setLoading] = useState(false)
  const { salesConfig } = useOnchainDistributionProvider()
  const createdContract = useMemo(
    () => parsedCreatedLogs?.[1] && parsedCreatedLogs[1].args.newContract,
    [parsedCreatedLogs]
  )
  const [fundingRecipient, setFundingRecipient] = useState<any>(null)

  const create = async (splitArgs: any) => {
    try {
      if (!address) await connect()
      setLoading(true)
      const recipients = splitArgs.recipients
      const shouldSplit = recipients.length !== 1
      if (shouldSplit) {
        await createSplit(splitArgs)
        return
      }

      setFundingRecipient(recipients[0].address)
    } catch (err) {
      setLoading(false)
      console.error(err)
    }
  }

  useEffect(() => {
    const init = async () => {
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
          salesConfig,
          payoutRecipient: fundingRecipient,
        },
        account: address!,
      })
      const newParameters = { ...parameters, functionName: 'createContract' }

      await writeContractsAsync({
        contracts: [newParameters],
        capabilities,
      })

      setFundingRecipient(null)
      setLoading(false)
    }
    if (!fundingRecipient) return

    init()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fundingRecipient])

  useEffect(() => {
    if (createdSplit) setFundingRecipient(createdSplit)
  }, [createdSplit])

  return { create, createdContract, zoraCreating: loading }
}

export default useZoraCreate
