"use client";

import { CHAIN, IS_TESTNET } from "@/lib/consts";
import ExternalLinkButton from "@/components/Pages/ZoraPage/ExternalLinkButton";
import { useEffect, useState } from "react";
import { usePublicClient } from "wagmi";
import { Address, parseEventLogs } from "viem";
import {
  zoraCreator1155FactoryImplABI,
  zoraCreator1155FactoryImplAddress,
  zoraCreator1155ImplABI,
} from "@zoralabs/protocol-deployments";

const ZoraSuccess = ({ tokenQuery }: any) => {
  const { url: explorerUrl, name: explorerName } = CHAIN.blockExplorers.default;
  const { transactionHash } = tokenQuery.data;
  const publicClient = usePublicClient() as any;
  const [setupNewTokenLog, setSetupNewTokenLog] = useState<any>();

  useEffect(() => {
    const init = async () => {
      const transaction = await publicClient.getTransactionReceipt({
        hash: transactionHash,
      });
      const { logs } = transaction;
      const parsedLogs = parseEventLogs({
        abi: zoraCreator1155ImplABI,
        logs,
        eventName: "SetupNewToken",
      });
      setSetupNewTokenLog(parsedLogs[0]);
    };
    if (!transactionHash) return;
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactionHash]);

  console.log("SWEETS setupNewTokenLog", setupNewTokenLog);
  const zoraTokenUrl = setupNewTokenLog
    ? `https://${IS_TESTNET ? "testnet." : ""}zora.co/collect/${
        IS_TESTNET ? "bsep" : "base"
      }:${setupNewTokenLog.address}/${setupNewTokenLog.args.tokenId.toString()}`
    : "";

  return (
    <>
      <div className="flex items-center flex-grow min-w-12">
        <p className="text-muted-foreground">Your token has been created.</p>
      </div>
      {/* TODO: get contract address from transaction receipt and link to zora.co */}
      <div className="flex justify-center md:justify-end flex-wrap gap-2">
        <ExternalLinkButton href={zoraTokenUrl}>
          Manage on Zora
        </ExternalLinkButton>
        <ExternalLinkButton
          href={`${explorerUrl}/tx/${tokenQuery.data.transactionHash}`}
        >
          View on {explorerName}
        </ExternalLinkButton>
      </div>
    </>
  );
};

export default ZoraSuccess;
