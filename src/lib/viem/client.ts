import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'

const viemClient = createPublicClient({
  chain: mainnet,
  transport: http(),
})

export default viemClient
