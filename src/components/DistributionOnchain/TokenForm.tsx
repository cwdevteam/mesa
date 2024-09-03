'use client'

import CreateButton from './CreateButton'
import { useOnchainDistributionProvider } from '@/context/OnchainDistributionProvider'
import TitleAndDescription from './TitleAndDescription'
import MediaUploads from './MediaUploads'
import Price from './Price'
import ZoraSaleStrategyTabs from './ZoraSaleStrategyTabs'
import RecipientSetter from '../CreateSplit/RecipientSetter'
import { FormProvider, useForm } from 'react-hook-form'
import {
  CHAIN,
  DEFAULT_DISTRIBUTOR_FEE,
  DEFAULT_RECIPIENTS,
} from '@/lib/consts'
import { zeroAddress } from 'viem'
import { ICreateSplitForm } from '@/types/mesa'
import useSoundCreate from '@/hooks/sound/useSoundCreate'
import useZoraCreate from '@/hooks/useZoraCreate'
import getCollectPageUrl from '@/lib/zora/getCollectPageUrl'
import { useSwitchChain } from 'wagmi'
import { useCallback } from 'react'
import { CreateSplitConfig } from '@0xsplits/splits-sdk'
import { useProjectProvider } from '@/context/ProjectProvider'

export default function TokenForm() {
  const { isZora, isFixedPrice, isSound } = useOnchainDistributionProvider()
  const { create, createdContract, zoraCreating } = useZoraCreate()
  const { createEdition, soundCreating } = useSoundCreate()
  const zoraUrl = getCollectPageUrl(createdContract)
  const creating = zoraCreating || soundCreating
  const { switchChainAsync } = useSwitchChain()
  const { credits } = useProjectProvider()

  const defaultRecipients = credits?.map((credit: any) => ({
    address: credit.address,
    percentAllocation: credits?.length === 1 ? 100 : 0,
  }))

  const onSubmit = useCallback(
    async (data: ICreateSplitForm) => {
      await switchChainAsync({ chainId: CHAIN.id })
      const args: CreateSplitConfig = {
        recipients: data.recipients,
        distributorFeePercent: data.distributorFee,
        controller: data.controller,
      }

      if (createdContract) return window.open(zoraUrl, '_blank')
      if (isZora) return await create(args)
      if (isSound) return await createEdition(args)
    },
    [
      switchChainAsync,
      createdContract,
      isZora,
      isSound,
      zoraUrl,
      create,
      createEdition,
    ]
  )

  const form = useForm<ICreateSplitForm>({
    mode: 'onChange',
    defaultValues: {
      recipients: defaultRecipients,
      controller: zeroAddress,
      distributorFee: DEFAULT_DISTRIBUTOR_FEE,
    },
  })

  const {
    handleSubmit,
    watch,
    formState: { isValid: isFormValid },
  } = form

  return (
    <div className="flex flex-col gap-4 max-w-md flex-1">
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {isZora && <ZoraSaleStrategyTabs />}
          <TitleAndDescription />
          <RecipientSetter />
          <MediaUploads />
          {isZora && isFixedPrice && <Price />}
          <CreateButton
            watch={watch}
            isFormValid={isFormValid}
            createdContract={createdContract}
            creating={creating}
          />
        </form>
      </FormProvider>
    </div>
  )
}
