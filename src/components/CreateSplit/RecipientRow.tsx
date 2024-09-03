import { XMarkIcon } from '@heroicons/react/20/solid'
import { useFormContext } from 'react-hook-form'
import { isAddress } from 'viem'

import AddressInput from './AddressInput'
import NumberInput from './NumberInput'
import { ICreateSplitForm } from '@/types/mesa'
import { Button } from '../ui/button'

export const RecipientRow = ({
  index,
  onRemove,
}: {
  index: number
  onRemove?: () => void
}) => {
  const { control, getValues, setValue, setError } =
    useFormContext<ICreateSplitForm>()

  const isAddressValid = () => {
    const address = getValues(`recipients.${index}.address`)
    const otherRecipients = getValues('recipients').filter(
      (_, i) => i !== index
    )
    const isDuplicate = otherRecipients.some(
      (r) => r.address.toLowerCase() === address.toLowerCase()
    )
    if (isDuplicate) return 'Address in use'
    return isAddress(address) || 'Invalid address'
  }

  return (
    <fieldset>
      <div className={'flex items-stretch space-x-3'}>
        <AddressInput
          control={control}
          inputName={`recipients.${index}.address`}
          placeholder="Enter address"
          setValue={setValue}
          setError={setError}
          validationFunc={isAddressValid}
        />
        <div className="w-1/3">
          <NumberInput
            inputName={`recipients.${index}.percentAllocation`}
            control={control}
            maxVal={100}
            minVal={0.0001}
            decimalScale={4}
            placeholder={'0.00%'}
            suffix="%"
          />
        </div>
        <Button
          onClick={onRemove}
          className="border-gray-200 transition hover:border-gray-400 dark:border-gray-700 dark:hover:border-gray-500"
        >
          <XMarkIcon className="w-4" />
        </Button>
      </div>
    </fieldset>
  )
}
