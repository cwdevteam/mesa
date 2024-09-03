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
import { Address, zeroAddress } from 'viem'
import { pullSplitFactoryAbi } from '@/lib/abi/pullSplitFactory'
import { getRecipientSortedAddressesAndAllocations } from '@0xsplits/splits-sdk/utils'

const useZoraCreate = () => {
  const publicClient = usePublicClient()!
  const { name, description, animationUrl, image } = useProjectProvider()
  const { address } = useAccount()
  const { capabilities } = usePaymasterProvider()
  const { data: callsStatusId, writeContractsAsync } = useWriteContracts()
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
      const tokenConfig: any = {
        tokenMetadataURI: uri,
        createReferral: REFERRAL_RECIPIENT,
        salesConfig,
      }
      if (!shouldSplit) tokenConfig.payoutRecipient = recipients[0].address

      const { parameters } = await creatorClient.create1155({
        contract: {
          name,
          uri,
        },
        token: tokenConfig,
        account: address!,
      })

      const contracts: any = []
      const newParameters = { ...parameters, functionName: 'createContract' }
      if (shouldSplit) {
        const splitRecipients = getRecipientSortedAddressesAndAllocations(
          splitArgs.recipients
        )
        const pullSplitFactory =
          '0x80f1B766817D04870f115fEBbcCADF8DBF75E017' as Address
        const splitParameters = {
          address: pullSplitFactory,
          abi: pullSplitFactoryAbi as any,
          functionName: 'createSplit',
          args: [
            {
              recipients: splitRecipients[0],
              allocations: splitRecipients[1],
              totalAllocation: BigInt(1000000),
              distributionIncentive: 0,
            },
            zeroAddress,
            zeroAddress,
          ],
          account: address,
        }
        contracts.push(splitParameters)
      }
      contracts.push(newParameters)
      await writeContractsAsync({
        contracts,
        capabilities,
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
