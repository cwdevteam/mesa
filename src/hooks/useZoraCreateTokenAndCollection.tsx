import { useProjectProvider } from "@/context/ProjectProvider";
import { useState } from "react";
import { parseEther } from "viem";
import { Create1155TokenMutation } from "./useZoraToken";
import { useAccount } from "wagmi";
import fetchFile from "@/lib/ipfs/fetchFile";

const useZoraCreateTokenAndCollection = (
  create1155Token: Create1155TokenMutation
) => {
  const { name, description, animationUrl, ethPrice, image } =
    useProjectProvider();
  const { address } = useAccount();
  const [tokenCreated, setTokenCreated] = useState(false);

  const createTokenAndCollection = async () => {
    const pricePerToken = parseEther(ethPrice.toString());

    const contract = {
      uri: "ipfs://bafkreiffhuoppwxzyajvxrznyalahjg2q7or4ljpkoe6jkvwzc3h3hh6ae",
      name,
    };

    const [mediaFile, thumbnailFile] = await Promise.all([
      fetchFile(animationUrl),
      fetchFile(image),
    ]);

    create1155Token.mutateAsync(
      {
        contract,
        token: {
          name,
          description,
          mediaFile,
          thumbnailFile,
          payoutRecipient: address,
          salesConfig: {
            pricePerToken,
          },
        },
      },
      {
        onSuccess: () => {
          setTokenCreated(true);
        },
      }
    );
  };

  return {
    createTokenAndCollection,
    tokenCreated,
  };
};

export default useZoraCreateTokenAndCollection;
