import { easAbi } from '../abi/eas'
import { EAS } from '../consts'

const attest = async (writeContracts: any, capabilities: any, args: any[]) => {
  try {
    const tx = await writeContracts({
      address: EAS,
      abi: easAbi,
      functionName: 'attest',
      args,
    })
    return tx
  } catch (error) {
    console.error('Error during attestation:', error)
    return { error }
  }
}

export default attest
