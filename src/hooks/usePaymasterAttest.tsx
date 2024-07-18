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

const usePaymasterAttest = () => {
  const { name, description, animationUrl } = useProjectProvider();
  const { writeContracts, capabilities } = usePaymasterProvider();
  const { address } = useAccount();
  const { id } = useParams<ProjectIDType>();

  const attest = async () => {
    const { uri: metadataUri } = await uploadJson({
      description: description,
      animation_url: animationUrl,
    });
    const encodedAttestation = getEncodedAttestationData(
      name,
      metadataUri,
      [],
      [address as Address],
      []
    );
    const args = getAttestArgs(encodedAttestation, id);
    easAttest(writeContracts, capabilities, args);
  };

  return { attest };
};

export default usePaymasterAttest;
