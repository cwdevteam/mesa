import { SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";

const getSchemaEncoder = () => {
  const schemaEncoder = new SchemaEncoder(
    "uint256 fid, string castHash, uint256 tip, uint256 parentFid, string parentCastHash"
  );

  return schemaEncoder;
};

export default getSchemaEncoder;
