'use client'

import { useEffect, useMemo, useState } from 'react'
import { usePublicClient, useWalletClient } from 'wagmi'
import { editionV2WalletActionsCreate } from '@soundxyz/sdk/contract/edition-v2/write/create'
import { editionV2PublicActionsCreate } from '@soundxyz/sdk/contract/edition-v2/read/create'
import { useProjectProvider } from '@/context/ProjectProvider'
import useCreateSplit from '../useCreateSplit'
import getCreateEditionParameter from '@/lib/getCreateEditionParameter'

const useSoundCreateInputs = () => {
  const { name } = useProjectProvider()
  const { data: wallet } = useWalletClient()
  const publicClient: any = usePublicClient()?.extend(
    editionV2PublicActionsCreate
  )
  const walletClient: any = useMemo(() => {
    if (!wallet) return null
    return wallet.extend(editionV2WalletActionsCreate)
  }, [wallet])
  const { createSplit, createdSplit } = useCreateSplit()
  const [fundingRecipient, setFundingRecipient] = useState(null)
  const [input, setInput] = useState<any>(null)
  const [metadataUri, setMetadataUri] = useState<any>(null)

  const getInputs = async (splitArgs: any) => {
    const recipients = splitArgs.recipients
    const shouldSplit = recipients.length !== 1
    if (shouldSplit) {
      await createSplit(splitArgs)
      return
    }
    setFundingRecipient(recipients[0].address)
  }

  useEffect(() => {
    if (createdSplit) setFundingRecipient(createdSplit)
  }, [createdSplit])

  useEffect(() => {
    const init = async () => {
      const { edition, formattedSalt } =
        await publicClient.editionV2.getExpectedEditionAddress({
          deployer: walletClient.account.address,
        })

      const editionParameters: any = getCreateEditionParameter(
        edition,
        formattedSalt,
        walletClient?.chain,
        metadataUri,
        name,
        fundingRecipient,
        walletClient?.account?.address
      )

      const { input } =
        await publicClient.editionV2.createEditionParameters(editionParameters)
      setInput(input)
      setFundingRecipient(null)
    }
    if (!fundingRecipient || !metadataUri || !walletClient || !publicClient)
      return

    init()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fundingRecipient, metadataUri, publicClient, walletClient])

  return { getInputs, setMetadataUri, input, setInput }
}

export default useSoundCreateInputs
