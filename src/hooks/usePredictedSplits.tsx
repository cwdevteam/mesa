"use client";

import {
  useQuery,
  useMutation,
  useQueryClient,
  UseMutationResult,
} from "@tanstack/react-query";
import { CreateSplitConfig } from "@0xsplits/splits-sdk";
import {
  Address,
  Chain,
  Hash,
  HttpTransport,
  PublicClient,
  WalletClient,
} from "viem";
import { CHAIN, CHAIN_ID } from "@/lib/consts";
import { getSplitsClient } from "@/lib/clients/splits";

interface UsePredictedSplitsProps {
  splitConfig: CreateSplitConfig | null;
  publicClient: PublicClient<HttpTransport, Chain> | null;
  walletClient: WalletClient | null;
  creatorAccount: Address | null;
}

export type CreateSplitMutation = UseMutationResult<
  Hash | null,
  Error,
  void,
  unknown
>;

const usePredictedSplits = ({
  splitConfig,
  publicClient,
  walletClient,
  creatorAccount,
}: UsePredictedSplitsProps) => {
  const queryClient = useQueryClient();
  const predictedSplitAddressQueryKey = [
    "predictImmutableSplitAddress",
    CHAIN_ID,
    splitConfig,
  ];

  const splitsClient =
    publicClient &&
    getSplitsClient({
      chainId: CHAIN_ID,
      publicClient,
    });

  const enabled =
    !!splitsClient &&
    !!splitConfig &&
    !!publicClient &&
    !!walletClient &&
    !!creatorAccount;

  const predictedSplitAddressQuery = useQuery({
    queryKey: predictedSplitAddressQueryKey,
    queryFn: async () => {
      return splitsClient!.predictImmutableSplitAddress(splitConfig!);
    },
    staleTime: (query) => {
      return query.state.data?.splitExists ? Infinity : 30000;
    },
    enabled,
  });

  const createSplitMutation: CreateSplitMutation = useMutation({
    mutationFn: async () => {
      if (!enabled) return null;
      const { data, address } = await splitsClient.callData.createSplit(
        splitConfig
      );

      return walletClient.sendTransaction({
        chain: CHAIN,
        to: address as Address,
        account: creatorAccount,
        data,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: predictedSplitAddressQueryKey,
      });
    },
    onError: (error) => {
      console.error("Error in creating the split:", error);
    },
  });

  return {
    query: predictedSplitAddressQuery,
    createSplit: createSplitMutation,
  };
};

export default usePredictedSplits;
