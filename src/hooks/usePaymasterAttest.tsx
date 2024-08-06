import { usePaymasterProvider } from "@/context/Paymasters";
import { useProjectProvider } from "@/context/ProjectProvider";
import easAttest from "@/lib/eas/attest";
import getAttestArgs from "@/lib/eas/getAttestArgs";
import getEncodedAttestationData from "@/lib/eas/getEncodedAttestationData";
import { Address } from "viem";
import { useAccount } from "wagmi";
import { useParams } from "next/navigation";
import { ProjectIDType } from "@/types/const";
import { uploadJson } from "@/lib/ipfs/uploadJson";
import { useUserProvider } from "@/context/UserProvider";

const usePaymasterAttest = () => {
  const { name, description, animationUrl, credits, image } =
    useProjectProvider();
  const { writeContracts, capabilities } = usePaymasterProvider();
  const { address } = useAccount();
  const { id } = useParams<ProjectIDType>();
  const { user } = useUserProvider();

  const attest = async () => {
    const { uri: metadataUri } = await uploadJson({
      description,
      image,
      animation_url: animationUrl,
      credits,
    });
    const encodedAttestation = getEncodedAttestationData(
      name,
      metadataUri,
      [user?.full_name || ""],
      [address as Address],
      []
    );
    const args = getAttestArgs(encodedAttestation, id);
    easAttest(writeContracts, capabilities, args);
  };

  return { attest };
};

export default usePaymasterAttest;
