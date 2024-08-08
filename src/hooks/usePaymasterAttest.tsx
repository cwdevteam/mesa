import { usePaymasterProvider } from "@/context/Paymasters";
import { useProjectProvider } from "@/context/ProjectProvider";
import easAttest from "@/lib/eas/attest";
import getAttestArgs from "@/lib/eas/getAttestArgs";
import getEncodedAttestationData from "@/lib/eas/getEncodedAttestationData";
import { Address, Log, parseEventLogs } from "viem";
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
import { useCallsStatus, useWriteContracts } from "wagmi/experimental";

const usePaymasterAttest = () => {
  const { name, description, animationUrl, credits, image } =
    useProjectProvider();
  const { capabilities } = usePaymasterProvider();
  const { data: callsStatusId, writeContractsAsync } = useWriteContracts({
    mutation: { onSuccess: console.log },
  });
  const { address } = useAccount();
  const { id } = useParams<ProjectIDType>();
  const { user } = useUserProvider();
  const { push } = useRouter();
  const { data: callsStatus } = useCallsStatus({
    id: callsStatusId as string,
    query: {
      enabled: !!callsStatusId,
      refetchInterval: (data) =>
        data.state.data?.status === "CONFIRMED" ? false : 500,
    },
  });

  useEffect(() => {
    if (callsStatus?.status !== "CONFIRMED") return;
    console.log("SWEETS callsStatus CONFIRMED", callsStatus);
    const logs = parseEventLogs({
      abi: easAbi,
      logs: callsStatus.receipts?.[0]?.logs as Log[],
    }) as any;
    const refId = logs?.[0]?.args?.uid;
    console.log("SWEETS refId", refId);

    push(`/project/${refId}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callsStatus]);

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
    easAttest(writeContractsAsync, capabilities, args);
  };

  return { attest };
};

export default usePaymasterAttest;
