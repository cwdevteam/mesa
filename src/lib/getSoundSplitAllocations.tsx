import { getRecipientSortedAddressesAndAllocations } from '@0xsplits/splits-sdk/utils'

const getSoundSplitAllocations = (splitArgs: any) => {
  const recipients = getRecipientSortedAddressesAndAllocations(
    splitArgs.recipients
  )

  const allocations = splitArgs.recipients.map((_: any, index: any) => ({
    account: recipients[0][index],
    percentAllocation: recipients[1][index],
  }))

  return allocations
}

export default getSoundSplitAllocations
