import getDecodedAttestationData from "@/lib/eas/getDecodedAttestationData";
import MockData from "@/components/Project/project.json";

export const fetchAttestation = async (attestation: any) => {
  const mapped = getDecodedAttestationData(attestation);
  const extractedData: any = {};
  mapped.flat().forEach((item) => {
    if (item.value && item.value.name) {
      const key = item.name === "metadataUri" ? "description" : item.name;
      extractedData[key] = item.value.value;
    }
  });
  let dashboardData: any = MockData;
  dashboardData["name"] = extractedData["title"];
  dashboardData["description"] = extractedData["description"];
  return { extractedData, dashboardData };
};
