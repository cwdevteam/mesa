"use client";

import {
  Address,
  Chain,
  HttpTransport,
  PublicClient,
  WalletClient,
} from "viem";
import {
  TokenMetadataJson,
  createCreatorClient,
  makeMediaTokenMetadata,
} from "@zoralabs/protocol-sdk";
import {
  useQuery,
  useMutation,
  useQueryClient,
  UseMutationResult,
} from "@tanstack/react-query";
import { CHAIN_ID } from "@/lib/consts";
import { uploadFile } from "@/lib/ipfs/uploadToIpfs";

const STORAGE_PREFIX = `zora-token/${CHAIN_ID}`;

export type TokenResult = {
  transactionHash: string;
  tokenMetadata: TokenMetadataJson;
  tokenMetadataUri: string;
};

type Create1155TokenMutationProps = {
  name: string;
  description: string;
  mediaFile: File;
  thumbnailFile: File;
  creatorContract: Address;
  payoutRecipient: Address;
};

export type Create1155TokenMutation = UseMutationResult<
  TokenResult,
  Error,
  Create1155TokenMutationProps,
  unknown
>;

export default function useZoraToken({
  id,
  publicClient,
  walletClient,
  // payoutRecipient,
  creatorAccount,
}: {
  id: string;
  publicClient: PublicClient<HttpTransport, Chain>;
  walletClient: WalletClient;
  // payoutRecipient: Address | undefined;
  creatorAccount: Address;
}) {
  const storageKey = `${STORAGE_PREFIX}/${id}`;
  const queryKey = [storageKey];
  const queryClient = useQueryClient();

  const tokenQuery = useQuery({
    queryKey,
    queryFn: async () => {
      const storageValue = localStorage.getItem(storageKey);
      if (storageValue) {
        try {
          // TODO: validate and sanitize for safety
          return JSON.parse(storageValue) as TokenResult;
        } catch (error) {
          console.error("Error parsing stored token result:", error);
          return null;
        }
      }
      return null;
    },
    staleTime: Infinity,
  });

  const create1155TokenMutation: Create1155TokenMutation = useMutation({
    mutationFn: async ({
      name,
      description,
      mediaFile,
      thumbnailFile,
      creatorContract,
      payoutRecipient,
    }: Create1155TokenMutationProps) => {
      // Step 1: Create the token metadata
      const [mediaUpload, thumbnailUpload] = await Promise.all([
        uploadFile(mediaFile),
        uploadFile(thumbnailFile),
      ]);

      const tokenMetadata = await makeMediaTokenMetadata({
        name,
        description,
        mediaUrl: mediaUpload.uri,
        thumbnailUrl: thumbnailUpload.uri,
      });

      const tokenMetadataJson = new File(
        [JSON.stringify(tokenMetadata)],
        "token.json"
      );

      const { uri: tokenMetadataUri } = await uploadFile(tokenMetadataJson);

      // Step 2: Create the 1155 token
      const creatorClient = createCreatorClient({
        chainId: CHAIN_ID,
        publicClient,
      });

      const { parameters } = await creatorClient.create1155({
        contract: creatorContract,
        token: {
          tokenMetadataURI: tokenMetadataUri,
          payoutRecipient,
        },
        account: creatorAccount,
      });

      const { request } = await publicClient.simulateContract(parameters);

      const transactionHash = await walletClient.writeContract(request);

      const result: TokenResult = {
        transactionHash,
        tokenMetadata,
        tokenMetadataUri,
      };

      return result;
    },
    onSuccess: (result) => {
      localStorage.setItem(storageKey, JSON.stringify(result));
      queryClient.invalidateQueries({ queryKey });
    },
    onError: (error) => {
      console.error("Error creating token:", error);
    },
  });

  const reset = () => {
    localStorage.removeItem(storageKey);
    queryClient.invalidateQueries({
      queryKey,
    });
  };

  return {
    create1155Token: create1155TokenMutation,
    query: tokenQuery,
    reset,
  };
}
