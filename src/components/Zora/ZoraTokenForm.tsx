"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Create1155TokenMutation } from "@/hooks/useZoraToken";
import { useProjectProvider } from "@/context/ProjectProvider";
import ZoraMediaFile from "./ZoraMediaFile";
import CreateButton from "./CreateButton";
import ZoraImageSelect from "./ZoraImageSelect";

interface ZoraCardProps {
  create1155Token: Create1155TokenMutation;
}

export default function ZoraTokenForm({ create1155Token }: ZoraCardProps) {
  const { name, description, animationUrl, setEthPrice } = useProjectProvider();

  return (
    <div className="flex flex-col gap-8 max-w-md flex-1">
      <div className="grid w-full items-center gap-2">
        <Label htmlFor="name">Title:</Label>
        <Input
          type="text"
          name="name"
          id="name"
          required
          value={name}
          disabled
        />
      </div>
      <div className="grid w-full items-center gap-2">
        <Label htmlFor="description">Description:</Label>
        <Textarea
          name="description"
          id="description"
          required
          value={description}
          disabled
        />
      </div>

      <ZoraImageSelect />
      <ZoraMediaFile mediaFile={animationUrl} />
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
          onChange={(event) => setEthPrice(Number(event.target.value))}
        />
      </div>
      <CreateButton create1155Token={create1155Token} />
    </div>
  );
}
