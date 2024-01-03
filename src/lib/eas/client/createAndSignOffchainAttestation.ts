import { EAS, SchemaEncoder, SignedOffchainAttestation, ZERO_ADDRESS, ZERO_BYTES32 } from "@ethereum-attestation-service/eas-sdk";
import { json } from '@/lib/eas/schemas'
import { Signer } from "ethers6";

export async function createAndSignOffchainAttestation(
  eas: EAS, 
  signer: Signer, 
  data: any,
): Promise<SignedOffchainAttestation> {
  const offchain = await eas.getOffchain();
  const chainId = Number(await eas.getChainId());
  const value = JSON.stringify(data);
  
  // Initialize SchemaEncoder with the schema string
  const schemaEncoder = new SchemaEncoder(json.schema);
  const encodedData = schemaEncoder.encodeData([
    {name: 'json', value, type: 'string'}
  ]);

  return offchain.signOffchainAttestation({
    data: encodedData,
    expirationTime: BigInt(0),
    nonce: BigInt(0),
    recipient: ZERO_ADDRESS,
    refUID: ZERO_BYTES32,
    revocable: json.revocable,
    schema: json.getUID(chainId),
    time: BigInt(Math.floor(Date.now() / 1000)),
    version: 1,
  }, signer);
}