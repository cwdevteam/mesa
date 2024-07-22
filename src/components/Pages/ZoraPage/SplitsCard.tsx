import { Address } from "viem";
import { CreateSplitConfig } from "@0xsplits/splits-sdk";

import { CHAIN_ID } from "@/lib/consts";
import type { CreateSplitMutation } from "@/hooks/usePredictedSplits";

import StepCard from "./StepCard";
import ExternalLinkButton from "./ExternalLinkButton";
import SplitsForm from "./SplitsForm";

export default function SplitsCard({
  splitAddress,
  splitExists,
  splitConfig,
  createSplitMutation,
}: {
  splitAddress: Address | undefined;
  splitExists: boolean | undefined;
  splitConfig: CreateSplitConfig;
  createSplitMutation: CreateSplitMutation;
}) {
  return (
    <StepCard className="w-full p-6 items-center">
      {(() => {
        if (!splitAddress) {
          return (
            <div className="flex items-center flex-1">
              <p className="text-muted-foreground">Loading splits&hellip;</p>
            </div>
          );
        }

        return (
          <>
            <div className="flex flex-col items-center md:items-stretch text-center md:text-left gap-4 flex-1">
              <p className="text-muted-foreground">
                {splitExists
                  ? "Your Splits smart contract has been deployed."
                  : "Your Splits smart contract is ready to deploy."}
              </p>
              <p className="text-sm text-muted-foreground italic">
                This contract will be used to distribute on-chain payments from
                the sale of your NFT.
                <br />
                <br />
                Visit{" "}
                <a
                  className="underline"
                  href="https://splits.org"
                  target="_blank"
                >
                  Splits.org
                </a>{" "}
                to learn more.
              </p>
              {!splitExists && (
                <details className="text-sm text-muted-foreground">
                  <summary>View Config</summary>
                  <div className="p-6 rounded-lg bg-muted text-left">
                    <pre className="whitespace-pre-wrap">
                      <code>{JSON.stringify(splitConfig, null, 2)}</code>
                    </pre>
                  </div>
                </details>
              )}
            </div>
            {splitExists ? (
              <ExternalLinkButton
                href={`https://app.splits.org/accounts/${splitAddress}?chainId=${CHAIN_ID}`}
              >
                View on Splits
              </ExternalLinkButton>
            ) : (
              <SplitsForm
                createSplitMutation={createSplitMutation}
                splitConfig={splitConfig}
              />
            )}
          </>
        );
      })()}
    </StepCard>
  );
}
