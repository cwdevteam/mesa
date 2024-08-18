import { usePaymasterProvider } from "@/context/Paymasters";
import { useProjectProvider } from "@/context/ProjectProvider";
import easAttest from "@/lib/eas/attest";
import getAttestArgs from "@/lib/eas/getAttestArgs";
import getEncodedAttestationData from "@/lib/eas/getEncodedAttestationData";
import { Address } from "viem";
import { useAccount } from "wagmi";
import { useParams, useRouter } from "next/navigation";
import { ProjectIDType } from "@/types/const";
import { uploadJson } from "@/lib/ipfs/uploadJson";
import { useUserProvider } from "@/context/UserProvider";
import { useWriteContracts } from "wagmi/experimental";
import useProjectCreateRedirect from "./useProjectCreateRedirect";

const usePaymasterAttest = () => {
  const { name, description, animationUrl, credits, image } =
    useProjectProvider();
  const { capabilities } = usePaymasterProvider();
  const { data: callsStatusId, writeContractsAsync } = useWriteContracts();
  const { address } = useAccount();
  const { id } = useParams<ProjectIDType>();
  const { user } = useUserProvider();
  useProjectCreateRedirect(callsStatusId);

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
      [credits[0].name],
      [credits[0].address],
      []
    );
    const args = getAttestArgs(encodedAttestation, id);
    easAttest(writeContractsAsync, capabilities, args);
  };

  return { attest };
};

export default usePaymasterAttest;
