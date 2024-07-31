"use client";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/Icons";
import useZoraCreateTokenAndCollection from "@/hooks/useZoraCreateTokenAndCollection";
import { useOnchainDistributionProvider } from "@/context/OnchainDistributionProvider";
import useSoundCreate from "@/hooks/useSoundCreate";
import { useMemo } from "react";

const CreateButton = ({ create1155Token }: any) => {
  const { isSound, isZora } = useOnchainDistributionProvider();
  const { createTokenAndCollection, tokenCreated } =
    useZoraCreateTokenAndCollection(create1155Token);
  const { createEdition, isPending: soundPending } = useSoundCreate();
  const pending = useMemo(
    () => soundPending || create1155Token.isPending || tokenCreated,
    [soundPending, create1155Token.isPending, tokenCreated]
  );
  const handleClick = async () => {
    if (isZora) return await createTokenAndCollection();
    if (isSound) return await createEdition();
  };

  return (
    <Button
      onClick={handleClick}
      className="self-start"
      type="submit"
      disabled={pending}
    >
      {(() => {
        if (tokenCreated) {
          return <>Waiting for confirmation&hellip;</>;
        }

        if (create1155Token.isPending) {
          return (
            <>
              Creating token&hellip;
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            </>
          );
        }

        return "Create token";
      })()}
    </Button>
  );
};

export default CreateButton;
