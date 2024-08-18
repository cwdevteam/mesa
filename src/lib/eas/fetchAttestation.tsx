import getDecodedAttestationData from "@/lib/eas/getDecodedAttestationData";
import fetchUri from "../ipfs/fetchUri";

export const fetchAttestation = async (attestation: any) => {
  const mapped = getDecodedAttestationData(attestation);
  const extractedData: any = {};
  const dashboardData: any = {};
  for (const item of mapped.flat()) {
    if (item.value && item.value.name) {
      const isMetadata = item.value.name === "metadataUri";
      if (isMetadata) {
        const metadataUri = item.value.value;
        try {
          const response = await fetchUri(metadataUri);
          dashboardData["credits"] = response.credits;
          dashboardData["description"] = response.description;
          dashboardData["animationUrl"] = response.animation_url;
          dashboardData["image"] = response.image;
        } catch (error) {
          console.error("Failed to fetch metadata URI:", error);
          dashboardData["description"] = "Failed to fetch description";
        }
        continue;
      }
      const key = item.name;
      extractedData[key] = item.value.value;
    }
  }
  dashboardData["name"] = extractedData["title"];
  return { extractedData, dashboardData };
};
