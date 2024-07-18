import { useContractRead } from "wagmi";
import { EAS } from "@/lib/consts";
import { easAbi } from "@/lib/abi/eas";
import { useParams } from "next/navigation";
import { ProjectIDType } from "@/types/const";

const useAttestationRead = () => {
  const { id } = useParams<ProjectIDType>();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const attestationData = useContractRead({
    address: EAS,
    abi: easAbi,
    functionName: "getAttestation",
    args: [id],
  });
  return attestationData;
};

export default useAttestationRead;
