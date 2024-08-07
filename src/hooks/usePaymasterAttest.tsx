import { usePaymasterProvider } from "@/context/Paymasters";
import { useProjectProvider } from "@/context/ProjectProvider";
import easAttest from "@/lib/eas/attest";
import getAttestArgs from "@/lib/eas/getAttestArgs";
import getEncodedAttestationData from "@/lib/eas/getEncodedAttestationData";
import { Address, parseEventLogs } from "viem";
import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { useParams, useRouter } from "next/navigation";
import { ProjectIDType } from "@/types/const";
import { uploadJson } from "@/lib/ipfs/uploadJson";
import { useUserProvider } from "@/context/UserProvider";
import { useEffect } from "react";
import { easAbi } from "@/lib/abi/eas";

const usePaymasterAttest = () => {
  const { name, description, animationUrl, credits, image } =
    useProjectProvider();
  const { capabilities } = usePaymasterProvider();
  const { data: hash, writeContractAsync } = useWriteContract({
    mutation: { onSuccess: console.log, onSettled: console.log },
  });
  const { data: result } = useWaitForTransactionReceipt({
    hash,
  });
  const { address } = useAccount();
  const { id } = useParams<ProjectIDType>();
  const { user } = useUserProvider();
  const { push } = useRouter();
  console.log("SWEETS hash", hash);
  console.log("SWEETS result", result);

  useEffect(() => {
    if (!result) return;
    const logs = parseEventLogs({
      abi: easAbi,
      logs: result.logs,
    }) as any;
    console.log("SWEETS get refId from result", logs);
    const refId = logs?.[0]?.args?.uid;
    console.log("Sweets redirect to project/uid", refId);
    push(`/project/${refId}`);
  }, [result]);

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
    console.log("SWEETS CREATING NEW PROJECT", args);
    easAttest(writeContractAsync, capabilities, args);
  };

  return { attest };
};

export default usePaymasterAttest;
