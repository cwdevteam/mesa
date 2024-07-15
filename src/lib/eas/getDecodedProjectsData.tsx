import getDecodedAttestationData from "@/lib/eas/getDecodedAttestationData";

export const getDecodedProjectsData = (data: any) => {
  const mapped = data.data.map((attestation: any) =>
    getDecodedAttestationData(attestation.result)
  );
  const decodedAttestations = mapped.filter(
    (attestation: any) => attestation !== false
  );
  return decodedAttestations;
};
