"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Chain, HttpTransport, PublicClient, getAddress } from "viem";
import { useAccount, useWalletClient, usePublicClient } from "wagmi";
import type { CreateSplitConfig } from "@0xsplits/splits-sdk/types";
import usePredictedSplits from "@/hooks/usePredictedSplits";
import SplitsCard from "./SplitsCard";
import ZoraCard from "./ZoraCard";
import ConfirmSplitsSection from "./ConfirmSplitsSection";

export default function ZoraPage() {
  const creatorAccount = useAccount().address || null;
  const walletClient = useWalletClient().data || null;
  const publicClient = usePublicClient() as PublicClient<
    HttpTransport,
    Chain
  > | null;

  const [splitConfig, setSplitsConfig] = useState<CreateSplitConfig | null>(
    null
  );
  const searchParams = useSearchParams();

  useEffect(() => {
    const splitsParam = searchParams.get("splits");
    if (splitsParam) {
      try {
        const parsedConfig = JSON.parse(splitsParam);
        setSplitsConfig(parsedConfig);
      } catch (e) {
        // Invalid JSON, show default
        setSplitsConfig(null);
        alert("Failed to parse splits parameter.");
        console.error(e);
      }
    } else {
      // No splits param found, show default
      setSplitsConfig(null);
    }
  }, [searchParams, setSplitsConfig]);

  const { query: predictedSplitsQuery, createSplit } = usePredictedSplits({
    splitConfig,
    publicClient,
    walletClient,
    creatorAccount,
  });

  const { splitAddress: payoutRecipient, splitExists } =
    predictedSplitsQuery.data || {};

  if (!publicClient) {
    return <div>Loading...</div>;
  }
  if (!creatorAccount) {
    return <div>Connect your wallet to continue.</div>;
  }
  if (!splitConfig) {
    return <ConfirmSplitsSection />;
  }

  return (
    <>
      <section className="flex flex-col gap-4 max-w-screen-md">
        <h2 className="cursor-pointer text-2xl font-bold">
          Step 1: Deploy splits contract
        </h2>
        <SplitsCard
          splitAddress={payoutRecipient}
          splitExists={splitExists}
          splitConfig={splitConfig}
          createSplitMutation={createSplit}
        />
      </section>
      <section className="flex flex-col gap-4 max-w-screen-md">
        <h2 className="cursor-pointer text-2xl font-bold">
          Step 2: Create token
        </h2>
        <ZoraCard
          publicClient={publicClient}
          walletClient={walletClient!}
          creatorAccount={creatorAccount}
          payoutRecipient={payoutRecipient}
          splitExists={splitExists}
          isLoading={predictedSplitsQuery.isLoading}
          tokenKey={searchParams.get("uid") || null}
        />
      </section>
    </>
  );
}
