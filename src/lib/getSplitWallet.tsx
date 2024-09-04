import { PULL_SPLIT_FACTORY_ADDRESS } from '@0xsplits/splits-sdk/constants'
import { getPublicClient } from './clients'
import { CHAIN_ID } from './consts'
import { pullSplitFactoryAbi } from './abi/pullSplitFactory'
import { Address } from 'viem'
import { getRecipientSortedAddressesAndAllocations } from '@0xsplits/splits-sdk/utils'

const getSplitWallet = async (owner: Address, splitArgs: any) => {
  try {
    const publicClient = getPublicClient(CHAIN_ID)

    const recipients = getRecipientSortedAddressesAndAllocations(
      splitArgs.recipients
    )
    const response = await publicClient.readContract({
      address: PULL_SPLIT_FACTORY_ADDRESS,
      abi: pullSplitFactoryAbi,
      functionName: 'predictDeterministicAddress',
      args: [
        {
          recipients: recipients[0],
          allocations: recipients[1],
          totalAllocation: BigInt(1000000),
          distributionIncentive: 0,
        },
        owner,
      ],
    })

    return response
  } catch (error) {
    return { error }
  }
}

export default getSplitWallet
