import { Address } from "viem";
import getSchemaEncoder from "./getSchemaEncoder";

const getEncodedAttestationData = (
  title: string,
  metadataUri: string,
  author: string[],
  authorAddresses: Address[],
  contentHashes: string[]
) => {
  const schemaEncoder = getSchemaEncoder();
  const encodedData = schemaEncoder.encodeData([
    { name: "title", value: title, type: "string" },
    { name: "metadataUri", value: metadataUri, type: "string" },
    { name: "author", value: author, type: "string[]" },
    { name: "author", value: authorAddresses, type: "address[]" },
    { name: "contentHashes", value: contentHashes, type: "bytes32[]" },
  ]);
  return encodedData;
};

export default getEncodedAttestationData;
