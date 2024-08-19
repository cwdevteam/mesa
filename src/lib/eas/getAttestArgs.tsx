import { zeroAddress } from 'viem'
import { ATTESTATION_REF_UID, ATTESTATION_SCHEMA } from '../consts'

const getAttestArgs = (encodedData: string, refUID?: string) => [
  {
    schema: ATTESTATION_SCHEMA,
    data: {
      recipient: zeroAddress,
      expirationTime: 0,
      revocable: false,
      refUID: refUID || ATTESTATION_REF_UID,
      data: encodedData,
      value: 0,
    },
  },
]

export default getAttestArgs
