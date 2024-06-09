import getDecodedAttestationData from "@/lib/eas/getDecodedAttestationData";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

const useProjects = () => {
  const { address } = useAccount();
  const [attestations, setAttestations] = useState<any[]>([]);

  useEffect(() => {
    const init = async () => {
      try {
        const queryParam = address ? `?address=${address}` : "";
        const response = await fetch(`/api/projects${queryParam}`);
        const data = await response.json();
        const mapped = data.data.map((attestation: any) =>
          getDecodedAttestationData(attestation.result)
        );
        const decodedAttestations = mapped.filter(
          (attestation: any) => attestation !== false
        );
        setAttestations(decodedAttestations as any);
      } catch (error) {
        console.error("Failed to fetch attestations:", error);
      }
    };
    if (!address) return;
    init();
  }, [address]);

  return { projects: attestations };
};

export default useProjects;
