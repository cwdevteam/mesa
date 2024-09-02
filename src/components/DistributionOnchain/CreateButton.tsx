'use client'

import { Button } from '@/components/ui/button'
import { sum } from 'lodash'

const CreateButton = ({
  watch,
  isFormValid,
  creating,
  createdContract,
}: any) => {
  const recipientAllocationTotal = sum(
    watch('recipients').map((recipient: any) => recipient.percentAllocation)
  )
  const isFullyAllocated = recipientAllocationTotal === 100
  const isButtonDisabled = !isFormValid || !isFullyAllocated
  const buttonLabel = creating ? 'Creating...' : 'Create Token'

  return (
    <Button className="self-start" type="submit" disabled={isButtonDisabled}>
      {createdContract ? 'View on Zora' : buttonLabel}
    </Button>
  )
}

export default CreateButton
