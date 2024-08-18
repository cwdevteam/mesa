import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { getProjects } from "@/lib/eas/getProjects";
import { getDecodedProjectsData } from "@/lib/eas/getDecodedProjectsData";

const useProjects = () => {
  const { address } = useAccount();
  const [attestations, setAttestations] = useState<any[]>([]);

  useEffect(() => {
    const init = async () => {
      try {
        const queryParam = address ? `?address=${address}` : "";
        const data: any = await getProjects(queryParam);
        const decodedAttestations = getDecodedProjectsData(data);
        setAttestations(decodedAttestations.reverse() as any);
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
