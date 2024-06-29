"use client";

import { useState, useEffect } from "react";
import { SplitV1Client, SplitRecipient } from "@0xsplits/splits-sdk";
import { Address, Chain, HttpTransport, PublicClient } from "viem";

interface SplitsConfig {
  recipients: SplitRecipient[];
  distributorFeePercent: number;
}

interface UsePredictedSplitAddressProps {
  chainId: number;
  publicClient: PublicClient<HttpTransport, Chain>;
  splitsClient: SplitV1Client;
  splitConfig: SplitsConfig;
}

const usePredictedSplitAddress = ({
  chainId,
  publicClient,
  splitsClient,
  splitConfig,
}: UsePredictedSplitAddressProps) => {
  const [predictedAddress, setPredictedAddress] = useState<Address | null>(
    null
  );
  const [splitExists, setSplitExists] = useState<boolean>(false);

  useEffect(() => {
    const predictAddress = async () => {
      try {
        const predicted = await splitsClient.predictImmutableSplitAddress(
          splitConfig
        );
        setPredictedAddress(predicted.splitAddress as Address);
        setSplitExists(predicted.splitExists);
      } catch (error) {
        console.error("Error in predicting the split address:", error);
      }
    };

    predictAddress();
  }, [chainId, publicClient, splitsClient, splitConfig]);

  return { predictedAddress, splitExists };
};

export default usePredictedSplitAddress;
