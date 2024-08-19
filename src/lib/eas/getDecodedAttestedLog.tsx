import { decodeEventLog } from 'viem'
import { easAbi } from '../abi/eas'

const getDecodedAttestedLog = (rawEvent: any) => {
  const decoded = decodeEventLog({
    abi: easAbi,
    eventName: 'Attested',
    data: rawEvent.data,
    topics: rawEvent.topics,
  })
  return decoded
}

export default getDecodedAttestedLog
