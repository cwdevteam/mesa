'use client'

import { useMemo } from 'react'
import { usePublicClient, useWalletClient } from 'wagmi'
import { editionV2WalletActionsCreate } from '@soundxyz/sdk/contract/edition-v2/write/create'
import { editionV2PublicActionsCreate } from '@soundxyz/sdk/contract/edition-v2/read/create'
import { useProjectProvider } from '@/context/ProjectProvider'
import {
  DEFAULT_DISTRIBUTOR_FEE,
  NULL_ADDRESS,
  NULL_BYTES32,
  UINT32_MAX,
} from '@/lib/consts'
import { zeroAddress } from 'viem'

const useSoundCreateInputs = () => {
  const { name, feeRecipient } = useProjectProvider()
  const { data: wallet } = useWalletClient()
  const publicClient = usePublicClient()?.extend(editionV2PublicActionsCreate)
  const walletClient = useMemo(() => {
    if (!wallet) return null
    return wallet.extend(editionV2WalletActionsCreate)
  }, [wallet])

  const getInputs = async (metadataUri: string, splitArgs: any) => {
    if (!publicClient) {
      console.error('Public client not found')
      return
    }
    if (!walletClient) {
      console.error('Wallet not found')
      return
    }
    const { edition, formattedSalt } =
      await publicClient.editionV2.getExpectedEditionAddress({
        deployer: walletClient.account.address,
      })

    const recipients = splitArgs.recipients
    const shouldSplit = recipients.length !== 1

    const allocations = splitArgs.recipients.map((recipient: any) => ({
      account: recipient.address,
      percentAllocation: recipient?.percentAllocation,
    }))

    const createSplitConfig = shouldSplit
      ? {
          distributorFee: DEFAULT_DISTRIBUTOR_FEE,
          controller: zeroAddress,
          accountAllocations: allocations,
        }
      : null

    const { input } = await publicClient.editionV2.createEditionParameters({
      precomputedEdition: edition,
      formattedSalt,
      chain: walletClient.chain,
      createSplit: createSplitConfig,
      editionConfig: {
        baseURI: metadataUri,
        contractURI: metadataUri,
        fundingRecipient: feeRecipient,
        name,
        royaltyBPS: 500,
        symbol: name,
        shouldFreezeMetadata: false,
        shouldFreezeTierCreation: false,
      },
      mintConfigs: [
        {
          affiliateFeeBPS: 0,
          affiliateMerkleRoot: NULL_BYTES32,
          startTime: 0,
          endTime: UINT32_MAX,
          maxMintable: UINT32_MAX,
          maxMintablePerAccount: UINT32_MAX,
          mode: 'DEFAULT',
          platform: NULL_ADDRESS,
          price: BigInt(0),
          tier: 1,
        },
      ],
      owner: walletClient.account.address,
      tierConfigs: [
        {
          baseURI: metadataUri,
          cutoffTime: 0,
          isFrozen: false,
          maxMintableLower: 0,
          maxMintableUpper: UINT32_MAX,
          mintRandomnessEnabled: false,
          tier: 1,
        },
      ],
    })
    return input
  }

  return { getInputs }
}

export default useSoundCreateInputs
