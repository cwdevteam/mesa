import { Address } from "viem";
import { CreateSplitConfig } from "@0xsplits/splits-sdk";

import { CHAIN_ID } from "@/lib/consts";
import type { CreateSplitMutation } from "@/hooks/usePredictedSplits";

import StepCard from "./StepCard";
import ExternalLinkButton from "./ExternalLinkButton";
import SplitsForm from "./SplitsForm";
import SplitsLogo from "./SplitsLogo";

export default function SplitsCard({
  splitAddress,
  splitExists,
  splitsConfig,
  createSplitMutation,
}: {
  splitAddress: Address | undefined;
  splitExists: boolean | undefined;
  splitsConfig: CreateSplitConfig;
  createSplitMutation: CreateSplitMutation;
}) {
  return (
    <StepCard className="w-full p-6 items-center">
      <SplitsLogo className="h-10 w-auto text-foreground" />
      {(() => {
        if (!splitAddress) {
          return (
            <div className="flex items-center flex-1">
              <p className="text-muted-foreground">Loading splits&hellip;</p>
            </div>
          );
        }

        if (!splitExists) {
          return (
            <SplitsForm
              createSplitMutation={createSplitMutation}
              splitsConfig={splitsConfig}
            />
          );
        }

        return (
          <>
            <div className="flex items-center flex-1">
              <p className="text-muted-foreground">
                Your splits have been deployed.
              </p>
            </div>
            <ExternalLinkButton
              href={`https://app.splits.org/accounts/${splitAddress}?chainId=${CHAIN_ID}`}
            >
              View on Splits
            </ExternalLinkButton>
          </>
        );
      })()}
    </StepCard>
  );
}
