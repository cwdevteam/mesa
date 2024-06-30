"use client";

import { Chain, HttpTransport, PublicClient, getAddress } from "viem";
import { useAccount, useWalletClient, usePublicClient } from "wagmi";
import usePredictedSplits from "@/hooks/usePredictedSplits";
import SplitsCard from "./SplitsCard";
import ZoraCard from "./ZoraCard";
import { generatePrivateKey, privateKeyToAddress } from "viem/accounts";

// TODO: replace dummy splits config with real splits data from project.
const dummyAddresses = [generatePrivateKey(), generatePrivateKey()].map((key) =>
  getAddress(privateKeyToAddress(key))
);

// NOTE: addresses must have valid checksums and percentages or splits client will hang.
const dummySplitsConfig = {
  recipients: [
    {
      address: dummyAddresses[0],
      percentAllocation: 80,
    },
    {
      address: dummyAddresses[1],
      percentAllocation: 20,
    },
  ],
  distributorFeePercent: 0,
};
console.log(dummySplitsConfig);

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
