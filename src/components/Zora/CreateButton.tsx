"use client";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/Icons";
import useZoraCreateTokenAndCollection from "@/hooks/useZoraCreateTokenAndCollection";

const CreateButton = ({ create1155Token }: any) => {
  const { createTokenAndCollection, tokenCreated } =
    useZoraCreateTokenAndCollection(create1155Token);

  return (
    <Button
      onClick={createTokenAndCollection}
      className="self-start"
      type="submit"
      disabled={create1155Token.isPending || tokenCreated}
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
