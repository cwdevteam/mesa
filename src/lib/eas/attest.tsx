import { easAbi } from '../abi/eas'
import { CHAIN_ID, EAS } from '../consts'

const attest = async (writeContracts: any, capabilities: any, args: any[]) => {
  try {
    const tx = await writeContracts({
      chainId:CHAIN_ID,
      contracts: [
        {
          address: EAS,
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
