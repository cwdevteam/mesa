"use client";

import { CHAIN, IS_TESTNET } from "@/lib/consts";
import ExternalLinkButton from "@/components/Pages/ZoraPage/ExternalLinkButton";
import useSetupNewTokenLog from "@/hooks/useSetupNewTokenLog";

const DistributionSuccess = ({ tokenQuery }: any) => {
  const { url: explorerUrl, name: explorerName } = CHAIN.blockExplorers.default;
  const { transactionHash } = tokenQuery.data;
  const { data: setupNewTokenLog } = useSetupNewTokenLog({
    hash: transactionHash,
  });

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

export default DistributionSuccess;
