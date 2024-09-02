import { IS_TESTNET } from '../consts'

const findLatestReferences = async (attestations: any) => {
  const latestPromise = attestations.map(async (attestation: any) => {
    if (
      attestation.refUID ===
      '0x0000000000000000000000000000000000000000000000000000000000000000'
    )
      return attestation
    const response = await fetch(
      `https://base${IS_TESTNET ? '-sepolia' : ''}.easscan.org/attestations/referencing/${attestation.refUID}?_data=routes/__boundary/attestations/referencing/$attestationUID`
    )

    const data = await response.json()

    return data.attestations[0]
  })

  const latestReferences = await Promise.all(latestPromise)

  return latestReferences
}

export default findLatestReferences
