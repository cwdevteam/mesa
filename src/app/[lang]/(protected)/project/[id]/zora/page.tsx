"use client";

import { Chain, HttpTransport, PublicClient } from "viem";
import { useAccount, useWalletClient, usePublicClient } from "wagmi";
import usePredictedSplits from "@/hooks/usePredictedSplits";
import SplitsCard from "./SplitsCard";
import ZoraCard from "./ZoraCard";

// NOTE: addresses must have valid checksums or splits client will hang
const dummySplitsConfig = {
  recipients: [
    {
      address: "0xDADe31b9CdA249f9C241114356Ba81349Ca920aB",
      percentAllocation: 95,
    },
    {
      address: "0xbC4D657fAbEe03181d07043E00dbC5751800Ee05",
      percentAllocation: 5,
    },
  ],
  distributorFeePercent: 0,
};

export default function Zora() {
  const creatorAccount = useAccount().address!; // TODO: Handle null case
  const walletClient = useWalletClient().data!; // TODO: Handle null case
  const publicClient = usePublicClient()!; // TODO: Handle null case

  const { query: predictedSplitsQuery, createSplit } = usePredictedSplits({
    splitConfig: dummySplitsConfig,
    publicClient: publicClient as PublicClient<HttpTransport, Chain>,
    walletClient,
    creatorAccount,
  });

  const { splitAddress: payoutRecipient, splitExists } =
    predictedSplitsQuery.data || {};

  return (
    <main className="flex flex-col gap-12 container mx-auto py-10 content-start">
      <section className="flex flex-col gap-4 max-w-screen-lg">
        <h2 className="cursor-pointer text-2xl font-bold">
          Step 1: Deploy Splits contract
        </h2>
        <SplitsCard
          splitAddress={payoutRecipient}
          splitExists={splitExists}
          splitsConfig={dummySplitsConfig}
          createSplitMutation={createSplit}
        />
      </section>
      <section className="flex flex-col gap-4 max-w-screen-lg">
        <h2 className="cursor-pointer text-2xl font-bold">
          Step 2: Create token on Zora
        </h2>
        <ZoraCard
          publicClient={publicClient as PublicClient<HttpTransport, Chain>}
          walletClient={walletClient}
          creatorAccount={creatorAccount}
          payoutRecipient={payoutRecipient}
          splitExists={splitExists}
          isLoading={predictedSplitsQuery.isLoading}
        />
      </section>
      <div className="h-20 flex-none"></div>
    </main>
  );
}
