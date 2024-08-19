import { getPublicClient } from '../clients'
import { easAbi } from '../abi/eas'
import { CHAIN_ID, EAS } from '../consts'
import getDecodedAttestedLog from './getDecodedAttestedLog'

const getAttestations = async (rawEvents: any[]) => {
  const publicClient = getPublicClient(CHAIN_ID)
  const wagmiContract = {
    address: EAS,
    abi: easAbi,
    functionName: 'getAttestation',
  } as const
  const contracts = rawEvents.map((event) => {
    const decoded = getDecodedAttestedLog(event) as any
    const uid = decoded?.args?.uid
    return {
      ...wagmiContract,
      args: [uid],
    }
  }) as any
  const results = await publicClient.multicall({ contracts })
  return results
}

export default getAttestations
