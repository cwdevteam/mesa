import { SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";

const getSchemaEncoder = () => {
  const schemaEncoder = new SchemaEncoder(
    "string title,string metadataUri,string[] author,address[] author,bytes32[] contentHashes"
  );

  return schemaEncoder;
};

export default getSchemaEncoder;
