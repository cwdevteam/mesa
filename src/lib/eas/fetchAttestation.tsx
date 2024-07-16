import getDecodedAttestationData from "@/lib/eas/getDecodedAttestationData";
import MockData from "@/components/Project/project.json";
import { getAddress } from "@/lib/eas/getAddress";

export const fetchAttestation = async (
  projects: any,
  address: any,
  id: string
) => {
  let addressData: any = getAddress(projects, address, id);
  const response = await fetch(
    `/api/attestation?address=${addressData.accountAddress}&uid=${addressData.uid}`
  );
  if (!response.ok) return false;
  const data = await response.json();
  const mapped = data.data.map((attestation: any) =>
    getDecodedAttestationData(attestation.result)
  );
  const extractedData: any = {};
  mapped.forEach((subArray: any) => {
    subArray.forEach((item: any) => {
      const key = item.name === "metadataUri" ? "description" : item.name;
      extractedData[key] = item?.value?.value;
    });
  });
  let dashboardData: any = MockData;
  dashboardData["name"] = extractedData["title"];
  dashboardData["description"] = extractedData["description"];

  return { extractedData, dashboardData };
};
