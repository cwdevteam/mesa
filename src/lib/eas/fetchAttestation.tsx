import getDecodedAttestationData from "@/lib/eas/getDecodedAttestationData";
import MockData from "@/components/Project/project.json";
import fetchUri from "../ipfs/fetchUri";

export const fetchAttestation = async (attestation: any) => {
  const mapped = getDecodedAttestationData(attestation);
  const extractedData: any = {};
  for (const item of mapped.flat()) {
    if (item.value && item.value.name) {
      const isMetadata = item.value.name === "metadataUri";
      if (isMetadata) {
        const metadataUri = item.value.value;
        try {
          const response: any = await fetchUri(metadataUri);
          extractedData["description"] = response?.description;
        } catch (error) {
          console.error("Failed to fetch metadata URI:", error);
          extractedData["description"] = "Failed to fetch description";
        }
        continue;
      }
      const key = item.name;
      extractedData[key] = item.value.value;
    }
  }
  const dashboardData: any = MockData;
  dashboardData["name"] = extractedData["title"];
  dashboardData["description"] = extractedData["description"];
  return { extractedData, dashboardData };
};
