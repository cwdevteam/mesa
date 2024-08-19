"use client";

import { useAccount, usePublicClient } from "wagmi";
import { useWriteContracts } from "wagmi/experimental";
import { createCreatorClient } from "@zoralabs/protocol-sdk";
import useConnectSmartWallet from "./useConnectSmartWallet";
import { usePaymasterProvider } from "@/context/Paymasters";
import { CHAIN_ID, REFERRAL_RECIPIENT } from "@/lib/consts";
import useWaitForBatchTx from "./useWaitForBatchTx";
import { useMemo } from "react";
import { useProjectProvider } from "@/context/ProjectProvider";
import { uploadJson } from "@/lib/ipfs/uploadJson";
import { useOnchainDistributionProvider } from "@/context/OnchainDistributionProvider";

const useZoraCreate = () => {
  const publicClient = usePublicClient()!;
  const { name, description, animationUrl, image } = useProjectProvider();
  const { address } = useAccount();
  const { capabilities } = usePaymasterProvider();
  const { data: callsStatusId, writeContractsAsync } = useWriteContracts();
  const { parsedLogs } = useWaitForBatchTx(callsStatusId);
  const { connect } = useConnectSmartWallet();
  const { salesConfig } = useOnchainDistributionProvider();
  const createdContract = useMemo(
    () => parsedLogs?.[1] && parsedLogs[1].args.newContract,
    [parsedLogs]
  );

  const create = async () => {
    try {
      if (!address) await connect();
      const creatorClient = createCreatorClient({
        chainId: CHAIN_ID,
        publicClient,
      });
      const { uri } = await uploadJson({
        name,
        description,
        image,
        animation_url: animationUrl,
      });
      const { parameters } = await creatorClient.create1155({
        contract: {
          name,
          uri,
        },
        token: {
          tokenMetadataURI: uri,
          createReferral: REFERRAL_RECIPIENT,
          salesConfig,
        },
        account: address!,
      });
      const newParameters = { ...parameters, functionName: "createContract" };
      await writeContractsAsync({
        contracts: [{ ...(newParameters as any) }],
        capabilities,
      } as any);
    } catch (err) {
      console.error(err);
    }
  };

  return { create, createdContract };
};

export default useZoraCreate;
