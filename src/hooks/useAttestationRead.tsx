import { useContractRead, useReadContract } from "wagmi";
import { CHAIN_ID, EAS } from "@/lib/consts";
import { easAbi } from "@/lib/abi/eas";
import { useParams } from "next/navigation";
import { ProjectIDType } from "@/types/const";

const useAttestationRead = () => {
  const { id } = useParams<ProjectIDType>();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const attestationData = useReadContract({
    address: EAS,
    abi: easAbi,
    chainId: CHAIN_ID,
    functionName: "getAttestation",
    args: [id],
  });

  return {
    attestationData,
  };
};

export default useAttestationRead;
