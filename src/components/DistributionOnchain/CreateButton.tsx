'use client'

import { Button } from '@/components/ui/button'
import { useOnchainDistributionProvider } from '@/context/OnchainDistributionProvider'
import useSoundCreate from '@/hooks/sound/useSoundCreate'
import useZoraCreate from '@/hooks/useZoraCreate'
import getCollectPageUrl from '@/lib/zora/getCollectPageUrl'

const CreateButton = () => {
  const { isSound, isZora } = useOnchainDistributionProvider()
  const { create, createdContract, zoraCreating } = useZoraCreate()
  const { createEdition, soundCreating } = useSoundCreate()
  const zoraUrl = getCollectPageUrl(createdContract)
  const creating = zoraCreating || soundCreating

  const buttonLabel = creating ? 'Creating...' : "'Create Token'"
  const handleClick = async () => {
    if (createdContract) return window.open(zoraUrl, '_blank')
    if (isZora) return await create()
    if (isSound) return await createEdition()
  }

  return (
    <Button onClick={handleClick} className="self-start" type="submit">
      {createdContract ? 'View on Zora' : buttonLabel}
    </Button>
  )
}

export default CreateButton
