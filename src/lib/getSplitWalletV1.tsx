import { getPublicClient } from './clients'
import { CHAIN_ID, DEFAULT_DISTRIBUTOR_FEE, SPLIT_MAIN_ADDRESS } from './consts'
import { splitMainAbi } from './abi/splitMain'
import { getRecipientSortedAddressesAndAllocations } from '@0xsplits/splits-sdk/utils'

const getSplitWalletV1 = async (splitArgs: any) => {
  try {
    const publicClient = getPublicClient(CHAIN_ID)
    const recipients = getRecipientSortedAddressesAndAllocations(
      splitArgs.recipients
    )
    const response = await publicClient.readContract({
      address: SPLIT_MAIN_ADDRESS,
      abi: splitMainAbi,
      functionName: 'predictImmutableSplitAddress',
      args: [recipients[0], recipients[1], DEFAULT_DISTRIBUTOR_FEE],
    })

    return response
  } catch (error) {
    return { error }
  }
}

export default getSplitWalletV1
