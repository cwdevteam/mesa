'use client'

import CreateButton from './CreateButton'
import { useOnchainDistributionProvider } from '@/context/OnchainDistributionProvider'
import TitleAndDescription from './TitleAndDescription'
import MediaUploads from './MediaUploads'
import Price from './Price'
import ZoraSaleStrategyTabs from './ZoraSaleStrategyTabs'
import FeeRecipient from '../FeeRecipient'
import SplitSelection from './SplitSelection'
import Splits from './Splits'

export default function TokenForm() {
  const { isZora, isFixedPrice, activeSplit } = useOnchainDistributionProvider()

  return (
    <div className="flex flex-col gap-4 max-w-md flex-1">
      {isZora && <ZoraSaleStrategyTabs />}
      <TitleAndDescription />
      <div className="space-y-2 border rounded-sm p-3">
        <p className="text-[14px]">Pay out funds to...</p>
        <SplitSelection />
        {activeSplit ? <Splits /> : <FeeRecipient />}
      </div>
      <MediaUploads />
      {isZora && isFixedPrice && <Price />}
      <CreateButton />
    </div>
  )
}
