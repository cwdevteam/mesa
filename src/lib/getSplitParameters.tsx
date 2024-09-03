import { getRecipientSortedAddressesAndAllocations } from '@0xsplits/splits-sdk/utils'
import { zeroAddress } from 'viem'
import { pullSplitFactoryAbi } from './abi/pullSplitFactory'
import { PullSplitFactory } from './consts'

const getSplitParameters = (address: any, splitArgs: any) => {
  const recipients = getRecipientSortedAddressesAndAllocations(
    splitArgs.recipients
  )

  const splitParameters = {
    address: PullSplitFactory,
    abi: pullSplitFactoryAbi as any,
    functionName: 'createSplit',
    args: [
      {
        recipients: recipients[0],
        allocations: recipients[1],
        totalAllocation: BigInt(1000000),
        distributionIncentive: 0,
      },
      zeroAddress,
      zeroAddress,
    ],
    account: address,
  }

  return splitParameters
}

export default getSplitParameters
