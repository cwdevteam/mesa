import {
  EAS,
  Offchain,
  OffChainAttestationVersion,
  PartialTypedDataConfig,
  SchemaEncoder,
  SignedOffchainAttestation,
} from "@ethereum-attestation-service/eas-sdk";
import { json } from "../schemas";

export function verifyOffchainAttestation<T>(
  eas: EAS,
  attester: string, 
  attestation: SignedOffchainAttestation
): T | null {
  const EAS_CONFIG: PartialTypedDataConfig = {
    address: attestation.domain.verifyingContract,
    version: attestation.domain.version,
    chainId: attestation.domain.chainId,
  };

  // TODO: support different version of provided attestation
  const OFFCHAIN_ATTESTATION_VERSION = OffChainAttestationVersion.Version1

  const offchain = new Offchain(EAS_CONFIG, OFFCHAIN_ATTESTATION_VERSION, eas);

  let isValid
  try {
    isValid = offchain.verifyOffchainAttestationSignature(attester, attestation)
  } catch (e) {
    console.error("Error while verifying offchain attestation signature: ", e)
  }

  if (!isValid) {
    return null
  }
  
  // TODO support arbitrary schemas.
  const schemaEncoder = new SchemaEncoder(json.schema)
  const decodedData = schemaEncoder.decodeData(attestation.message.data)
  
  // Assumes json schema with a single value
  return JSON.parse(decodedData[0].value.value + '')
}