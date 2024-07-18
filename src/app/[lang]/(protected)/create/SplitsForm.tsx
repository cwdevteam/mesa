"use client";

import { useState } from "react";
import { CreateSplitConfig } from "@0xsplits/splits-sdk";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/Icons";
import type { CreateSplitMutation } from "@/hooks/usePredictedSplits";

export default function SplitsDeployCard({
  splitConfig,
  createSplitMutation,
}: {
  splitConfig: CreateSplitConfig;
  createSplitMutation: CreateSplitMutation;
}) {
  const [splitsDeployed, setSplitsDeployed] = useState(false);
  return (
    <>
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
