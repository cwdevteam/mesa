"use client";

import { useState } from "react";
import { Address } from "viem";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Icons } from "@/components/Icons";

import type { Create1155TokenMutation } from "@/hooks/useZoraToken";
import { IS_TESTNET } from "@/lib/consts";

interface ZoraCardProps {
  payoutRecipient: Address;
  create1155Token: Create1155TokenMutation;
}

export default function ZoraTokenForm({
  payoutRecipient,
  create1155Token,
}: ZoraCardProps) {
  const [tokenCreated, setTokenCreated] = useState(false);

  const createToken = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const mediaFile = formData.get("mediaFile") as File;
    const thumbnailFile = formData.get("thumbnailFile") as File;
    const creatorContract = formData.get("creatorContract") as Address;

    create1155Token.mutateAsync(
      {
        name,
        description,
        mediaFile,
        thumbnailFile,
        creatorContract,
        payoutRecipient,
      },
      {
        onSuccess: () => {
          setTokenCreated(true);
        },
      }
    );
  };

  return (
    <form
      className="flex flex-col gap-8 max-w-md flex-1"
      onSubmit={createToken}
    >
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="creatorContract">Collection Address:</Label>
        <Input
          type="text"
          name="creatorContract"
          id="creatorContract"
          placeholder="0x..."
          pattern="0x[a-fA-F0-9]{40}"
          required
        />
        <div className="text-sm text-muted-foreground">
          Find your collection address on{" "}
          <a
            className="underline"
            href={`https://${IS_TESTNET ? "testnet." : ""}zora.co/manage`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Zora
          </a>
          .
        </div>
      </div>

      <div className="grid w-full items-center gap-2">
        <Label htmlFor="name">Title:</Label>
        <Input type="text" name="name" id="name" required />
      </div>
      <div className="grid w-full items-center gap-2">
        <Label htmlFor="description">Description:</Label>
        <Textarea name="description" id="description" required />
      </div>
      <div className="grid w-full items-center gap-2">
        <Label htmlFor="mediaFile">Media File:</Label>
        <Input type="file" name="mediaFile" id="mediaFile" required />
      </div>
      <div className="grid w-full items-center gap-2">
        <Label htmlFor="thumbnailFile">Thumbnail File:</Label>
        <Input type="file" name="thumbnailFile" id="thumbnailFile" required />
      </div>

      <Button
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
    </form>
  );
}
