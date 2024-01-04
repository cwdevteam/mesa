import { SignedOffchainAttestation } from "@ethereum-attestation-service/eas-sdk"
import { serialize } from "superjson"

export function AttestationFormFields({
  attester,
  attestation,
}: {
  attester: string | null,
  attestation: SignedOffchainAttestation | null
}) {
  if (!attester || !attestation) {
    return 
  }

  const { json, meta } = serialize(attestation)
  
  return (
    <>
      <input type="hidden" name="attester" value={attester} />
      <input type="hidden" name="attestation" value={JSON.stringify(json)} />
      <input type="hidden" name="attestationMeta" value={JSON.stringify(meta)} />
    </>
  )
}