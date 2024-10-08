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
    console.error('Error during attestation:', error)
    return { error }
  }
}

export default attest
