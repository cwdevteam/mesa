import getSchemaEncoder from "./getSchemaEncoder";

const getEncodedAttestationData = (
  fid: any,
  castHash: any,
  tip: any,
  parentFid: any,
  parentCastHash: any
) => {
  const schemaEncoder = getSchemaEncoder();
  const encodedData = schemaEncoder.encodeData([
    { name: "fid", value: fid, type: "uint256" },
    {
      name: "castHash",
      value: castHash,
      type: "string",
    },
    { name: "tip", value: tip, type: "uint256" },
    { name: "parentFid", value: parentFid, type: "uint256" },
    {
      name: "parentCastHash",
      value: parentCastHash,
      type: "string",
    },
  ]);
  return encodedData;
};

export default getEncodedAttestationData;
