import { useCallback, useEffect, useState } from 'react'
import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  Path,
  PathValue,
  UseFormSetError,
  UseFormSetValue,
  useFormState,
  useWatch,
} from 'react-hook-form'
import { XMarkIcon } from '@heroicons/react/20/solid'
import { Dictionary } from 'lodash'

import { MiniButton } from '../ui/button'
import { shortenAddress } from '@/lib/address'
import { IAddress } from '@/types/mesa'
import { isAddress } from 'viem'
import ValidAddressDisplay from './ValidAddressDisplay'
import viemClient from '@/lib/viem/client'
import { normalize } from 'viem/ens'

const AddressInput = <FormType extends FieldValues>({
  control,
  inputName,
  placeholder,
  setValue,
  validationFunc,
  onClearInput,
  autoFocus,
  validAddressDisplay,
}: {
  control: Control<FormType>
  inputName: Path<FormType>
  placeholder: string
  setValue: UseFormSetValue<FormType>
  setError: UseFormSetError<FormType>
  validationFunc: (
    address: string
  ) => (boolean | string) | Promise<boolean | string>
  onClearInput?: () => void
  autoFocus?: boolean
  validAddressDisplay?: (address: string) => JSX.Element
}): JSX.Element => {
  const [addressEns, setAddressEns] = useState('')
  const inputVal = useWatch({
    control,
    name: inputName,
  })
  const { errors } = useFormState({
    control,
    name: inputName,
  })
  const error = getNestedObj(errors, inputName) as FieldError

  useEffect(() => {
    const checkEns = async () => {
      if (
        inputVal &&
        ['.eth', '.cb.id'].find((ext) => inputVal.endsWith(ext))
      ) {
        const address = await viemClient.getEnsAddress({
          name: normalize(inputVal),
        })
        if (address) {
          const typedAddress = address as PathValue<FormType, Path<FormType>>
          setAddressEns(inputVal)
          setValue(inputName, typedAddress, { shouldValidate: true })
        }
      } else if (isAddress(inputVal)) {
        const ensName = await viemClient.getEnsName({
          address: inputVal,
        })
        if (ensName) {
          setAddressEns(ensName)
        }
      }
    }
    checkEns()
  }, [inputVal, inputName, setValue])

  const clearInput = useCallback(() => {
    const typedAddress = '' as PathValue<FormType, Path<FormType>>
    setValue(inputName, typedAddress)
    setAddressEns('')
    if (onClearInput) onClearInput()
  }, [inputName, onClearInput, setValue])

  return (
    <div
      className={
        'relative w-full grow rounded border border-gray-200 ring-gray-500/10 transition focus-within:border-gray-400 focus-within:shadow-none dark:border-gray-700 dark:focus-within:border-gray-500'
      }
    >
      <Controller
        control={control}
        name={inputName}
        render={({ field }) =>
          isAddress(field.value) && !error ? (
            <ValidAddressDisplay
              address={field.value}
              ens={addressEns}
              onClearInput={clearInput}
              validAddressDisplay={validAddressDisplay}
            />
          ) : (
            <>
              <input
                className={`flex w-full grow items-center bg-transparent px-2 py-2 transition focus:outline-none text-[14px]`}
                placeholder={placeholder}
                autoComplete={'off'}
                autoFocus={autoFocus}
                {...field}
              />
              {onClearInput && (
                <MiniButton
                  type="button"
                  compact
                  onClick={onClearInput}
                  eventName={'clearedTokenToBeneficiary'}
                  className="absolute inset-y-0 right-0 focus:outline-none"
                >
                  <XMarkIcon className="size-4" />
                </MiniButton>
              )}
            </>
          )
        }
        rules={{
          required: {
            value: true,
            message: 'Required',
          },
          validate: validationFunc,
        }}
      />
      <AddressErrorsDisplay
        fieldError={error}
        address={inputVal}
        ens={addressEns}
      />
    </div>
  )
}

const AddressErrorsDisplay = ({
  fieldError,
  address,
  ens,
}: {
  fieldError?: FieldError
  address: IAddress
  ens?: string
}): JSX.Element => {
  return (
    <div
      className={
        'absolute -bottom-2.5 left-2 flex items-center bg-white px-px text-[12px] dark:bg-black'
      }
    >
      {(() => {
        if (fieldError)
          return (
            <AddressInputMessage
              isError
              message={fieldError.message ?? 'Error'}
            />
          )
        else if (isAddress(address))
          return (
            <AddressInputMessage
              message={ens ? shortenAddress(address) : 'Valid address'}
            />
          )
      })()}
    </div>
  )
}

export const AddressInputMessage = ({
  message,
  isError,
}: {
  message: string
  isError?: boolean
}): JSX.Element => {
  return (
    <p
      className={
        isError
          ? `text-red-500 dark:text-red-400`
          : `text-green-500 dark:text-green-400`
      }
    >
      {message}
    </p>
  )
}

const getNestedObj = (object: Dictionary<any>, pathName: string) => {
  let currentObj = object
  const pathParts = pathName.split('.')
  pathParts.map((part) => {
    if (currentObj) {
      currentObj = currentObj[part]
    }
  })

  return currentObj
}

export default AddressInput
