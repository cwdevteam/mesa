"use client";

import { useState } from "react";
import { Address, parseEther } from "viem";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Icons } from "@/components/Icons";

import type { Create1155TokenMutation } from "@/hooks/useZoraToken";

interface ZoraCardProps {
  payoutRecipient: Address;
  create1155Token: Create1155TokenMutation;
}

export default function ZoraTokenForm({
  payoutRecipient,
  create1155Token,
}: ZoraCardProps) {
  const [tokenCreated, setTokenCreated] = useState(false);

  const createTokenAndCollection = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const mediaFile = formData.get("mediaFile") as File;
    const thumbnailFile = formData.get("thumbnailFile") as File;
    const pricePerToken = parseEther(formData.get("tokenPrice") as string);

    const contract = {
      // See https://ipfs.decentralized-content.com/ipfs/bafkreiffhuoppwxzyajvxrznyalahjg2q7or4ljpkoe6jkvwzc3h3hh6ae
      uri: "ipfs://bafkreiffhuoppwxzyajvxrznyalahjg2q7or4ljpkoe6jkvwzc3h3hh6ae", // TODO: replace with custom metadata uri
      name: "MESA Artist",
    };

    create1155Token.mutateAsync(
      {
        contract,
        token: {
          name,
          description,
          mediaFile,
          thumbnailFile,
          payoutRecipient,
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

  return (
    <form
      className="flex flex-col gap-8 max-w-md flex-1"
      onSubmit={createTokenAndCollection}
    >
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
      <div className="grid w-full items-center gap-2">
        <Label htmlFor="tokenPrice">Price per token (ETH):</Label>
        <Input
          type="text"
          name="tokenPrice"
          id="tokenPrice"
          defaultValue="0"
          inputMode="decimal"
          pattern="^\d+(\.\d+)?$"
          required
        />
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
