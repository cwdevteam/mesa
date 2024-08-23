'use client'

import CreateButton from './CreateButton'
import { useOnchainDistributionProvider } from '@/context/OnchainDistributionProvider'
import TitleAndDescription from './TitleAndDescription'
import MediaUploads from './MediaUploads'
import Price from './Price'
import ZoraSaleStrategyTabs from './ZoraSaleStrategyTabs'
import FeeRecipient from '../FeeRecipient'

export default function TokenForm() {
  const { isZora, isFixedPrice } = useOnchainDistributionProvider()

  return (
    <div className="flex flex-col gap-8 max-w-md flex-1">
      {isZora && <ZoraSaleStrategyTabs />}
      <TitleAndDescription />
      <FeeRecipient />
      <MediaUploads />
      {isZora && isFixedPrice && <Price />}
      <CreateButton />
    </div>
  )
}
