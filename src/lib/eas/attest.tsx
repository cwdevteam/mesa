import { Address } from 'viem'
import { easAbi } from '../abi/eas'
import { EAS } from '../consts'

const attest = async (
  writeContracts: any,
  capabilities: any,
  args: any[],
  account: Address
) => {
  try {
    const tx = await writeContracts({
      contracts: [
        {
          address: EAS,
          account,
          abi: easAbi,
          functionName: 'attest',
          args,
        },
      ],
      capabilities,
    })
    return tx
  } catch (error) {
    console.log('DEBUG ZIAD', error)
    return { error }
  }
}

export default attest
