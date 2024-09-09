import { getPublicClient } from './clients'
import { CHAIN_ID, SPLIT_MAIN_ADDRESS } from './consts'
import { splitMainAbi } from './abi/splitMain'

const isDeployedSplitWalletV1 = async (splitWallet: any) => {
  try {
    const publicClient = getPublicClient(CHAIN_ID)

    const response = await publicClient.readContract({
      address: SPLIT_MAIN_ADDRESS,
      abi: splitMainAbi,
      functionName: 'getHash',
      args: [splitWallet],
    })

    return (
      response !==
      '0x0000000000000000000000000000000000000000000000000000000000000000'
    )
  } catch (error) {
    return { error }
  }
}

export default isDeployedSplitWalletV1
