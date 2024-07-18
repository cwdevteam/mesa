"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Chain, HttpTransport, PublicClient, getAddress } from "viem";
import { generatePrivateKey, privateKeyToAddress } from "viem/accounts";
import { useAccount, useWalletClient, usePublicClient } from "wagmi";
import type { CreateSplitConfig } from "@0xsplits/splits-sdk/types";

import { Button } from "@/components/ui/button";
import usePredictedSplits from "@/hooks/usePredictedSplits";

import SplitsCard from "./SplitsCard";
import ZoraCard from "./ZoraCard";
import StepCard from "./StepCard";
import SplitsLogo from "./SplitsLogo";

const dummyAddresses = [generatePrivateKey(), generatePrivateKey()].map((key) =>
  getAddress(privateKeyToAddress(key))
);

const dummySplitsConfig: CreateSplitConfig = {
  recipients: [
    {
      address: dummyAddresses[0],
      percentAllocation: 50,
    },
    {
      address: dummyAddresses[1],
      percentAllocation: 50,
    },
  ],
  distributorFeePercent: 0,
};

export default function ZoraPage() {
  const router = useRouter();
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
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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

  const handleSubmit = () => {
    try {
      const newConfig = textareaRef.current
        ? JSON.parse(textareaRef.current.value)
        : null;
      if (!newConfig) throw new Error("Missing splits config");
      const encodedConfig = encodeURIComponent(JSON.stringify(newConfig));
      router.push(`?splits=${encodedConfig}`);
    } catch (e) {
      alert("Invalid JSON configuration.");
      console.error(e);
    }
  };

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
    return (
      <section className="flex flex-col gap-4 max-w-screen-lg">
        <h2 className="cursor-pointer text-2xl font-bold">
          Step 0: Confirm Splits configuration
        </h2>
        <StepCard className="w-full p-6 items-center">
          <SplitsLogo className="h-10 w-auto text-foreground" />
          <div className="flex flex-col gap-4 flex-1">
            <textarea
              className="text-sm text-muted-foreground p-6 rounded-lg bg-muted"
              ref={textareaRef}
              defaultValue={JSON.stringify(dummySplitsConfig, null, 2)}
              rows={10}
              cols={60}
              required={true}
            />
            <Button onClick={handleSubmit}>Submit</Button>
          </div>
        </StepCard>
      </section>
    );
  }

  return (
    <>
      <section className="flex flex-col gap-4 max-w-screen-lg">
        <h2 className="cursor-pointer text-2xl font-bold">
          Step 1: Deploy Splits contract
        </h2>
        <SplitsCard
          splitAddress={payoutRecipient}
          splitExists={splitExists}
          splitConfig={splitConfig}
          createSplitMutation={createSplit}
        />
      </section>
      <section className="flex flex-col gap-4 max-w-screen-lg">
        <h2 className="cursor-pointer text-2xl font-bold">
          Step 2: Create token on Zora
        </h2>
        <ZoraCard
          publicClient={publicClient}
          walletClient={walletClient!}
          creatorAccount={creatorAccount}
          payoutRecipient={payoutRecipient}
          splitExists={splitExists}
          isLoading={predictedSplitsQuery.isLoading}
        />
      </section>
    </>
  );
}
