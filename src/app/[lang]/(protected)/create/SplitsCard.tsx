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

        if (!splitExists) {
          return (
            <SplitsForm
              createSplitMutation={createSplitMutation}
              splitConfig={splitConfig}
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
