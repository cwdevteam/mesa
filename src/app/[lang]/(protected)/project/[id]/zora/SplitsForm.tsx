"use client";

import { useState } from "react";
import { CreateSplitConfig } from "@0xsplits/splits-sdk";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/Icons";
import type { CreateSplitMutation } from "@/hooks/usePredictedSplits";

export default function SplitsDeployCard({
  splitsConfig,
  createSplitMutation,
}: {
  splitsConfig: CreateSplitConfig;
  createSplitMutation: CreateSplitMutation;
}) {
  const [splitsDeployed, setSplitsDeployed] = useState(false);
  return (
    <>
      <div className="flex flex-col gap-4 flex-1">
        <p className="text-muted-foreground">
          Your Splits smart contract is ready to deploy.
        </p>
        <p className="text-sm text-muted-foreground italic">
          This contract will be used to distribute on-chain payments from the
          sale of your NFT.
          <br />
          Visit{" "}
          <a className="underline" href="https://splits.org" target="_blank">
            Splits.org
          </a>{" "}
          to learn more.
        </p>
        <details className="text-sm text-muted-foreground">
          <summary>View Config</summary>
          <div className="p-6 rounded-lg bg-muted">
            <pre>
              <code>{JSON.stringify(splitsConfig, null, 2)}</code>
            </pre>
          </div>
        </details>
      </div>
      <Button
        disabled={createSplitMutation.isPending || splitsDeployed}
        onClick={() =>
          createSplitMutation.mutate(void 0, {
            onSuccess: () => setSplitsDeployed(true),
          })
        }
      >
        {(() => {
          if (splitsDeployed) {
            return <>Waiting for confirmation&hellip;</>;
          }

          if (createSplitMutation.isPending) {
            return (
              <>
                Deploying&hellip;
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              </>
            );
          }

          return "Deploy Splits";
        })()}
      </Button>
    </>
  );
}
