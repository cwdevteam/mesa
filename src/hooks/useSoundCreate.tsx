"use client";

import { useMutation } from "@tanstack/react-query";
import { useMemo } from "react";
import { retryAsync } from "@soundxyz/sdk/utils/helpers";
import { usePublicClient, useWalletClient } from "wagmi";
import { editionV2WalletActionsCreate } from "@soundxyz/sdk/contract/edition-v2/write/create";
import { editionV2PublicActionsCreate } from "@soundxyz/sdk/contract/edition-v2/read/create";
import { useProjectProvider } from "@/context/ProjectProvider";
import { uploadJson } from "@/lib/ipfs/uploadJson";

const UINT32_MAX = 4294967295;
const NULL_ADDRESS = "0x0000000000000000000000000000000000000000";
const NULL_BYTES32 =
  "0x0000000000000000000000000000000000000000000000000000000000000000";

const useSoundCreate = () => {
  const { name, description, animationUrl, image } = useProjectProvider();
  const { data: wallet } = useWalletClient();
  const publicClient = usePublicClient()?.extend(editionV2PublicActionsCreate);
  const walletClient = useMemo(() => {
    if (!wallet) return null;
    return wallet.extend(editionV2WalletActionsCreate);
  }, [wallet]);

  const {
    mutate: createEdition,
    isPending,
    error,
  } = useMutation({
    async mutationFn() {
      if (!publicClient) {
        console.error("Public client not found");
        return;
      }
      if (!walletClient) {
        console.error("Wallet not found");
        return;
      }
      const { uri: metadataUri } = await uploadJson({
        name,
        description,
        image,
        animation_url: animationUrl,
      });
      const { edition, formattedSalt } =
        await publicClient.editionV2.getExpectedEditionAddress({
          deployer: walletClient.account.address,
        });

      const { input } = await publicClient.editionV2.createEditionParameters({
        precomputedEdition: edition,
        formattedSalt,
        chain: walletClient.chain,
        createSplit: null,
        editionConfig: {
          baseURI: metadataUri,
          contractURI: metadataUri,
          fundingRecipient: walletClient.account.address,
          name,
          royaltyBPS: 500,
          symbol: name,
          shouldFreezeMetadata: false,
          shouldFreezeTierCreation: false,
        },
        mintConfigs: [
          {
            affiliateFeeBPS: 0,
            affiliateMerkleRoot: NULL_BYTES32,
            startTime: 0,
            endTime: UINT32_MAX,
            maxMintable: UINT32_MAX,
            maxMintablePerAccount: UINT32_MAX,
            mode: "DEFAULT",
            platform: NULL_ADDRESS,
            price: BigInt(0),
            tier: 1,
          },
        ],
        owner: walletClient.account.address,
        tierConfigs: [
          {
            baseURI: metadataUri,
            cutoffTime: 0,
            isFrozen: false,
            maxMintableLower: 0,
            maxMintableUpper: UINT32_MAX,
            mintRandomnessEnabled: false,
            tier: 1,
          },
        ],
      });

      const hash = await walletClient.editionV2.createEdition(input);

      const receipt = await retryAsync(
        () =>
          publicClient.getTransactionReceipt({
            hash,
          }),
        {
          attempts: 10,
          interval: 500,
        }
      );

      if (receipt.status !== "success") throw Error("Transaction failed");
    },
    onSuccess() {
      console.log("successfully created");
    },
  });
  return { createEdition, error, isPending };
};

export default useSoundCreate;
