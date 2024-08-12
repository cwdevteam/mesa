"use client";

import type { Create1155TokenMutation } from "@/hooks/useZoraToken";
import CreateButton from "./CreateButton";
import { useOnchainDistributionProvider } from "@/context/OnchainDistributionProvider";
import TitleAndDescription from "./TitleAndDescription";
import MediaUploads from "./MediaUploads";
import Price from "./Price";

export default function ZoraTokenForm() {
  const { isZora } = useOnchainDistributionProvider();

  return (
    <div className="flex flex-col gap-8 max-w-md flex-1">
      <TitleAndDescription />
      <MediaUploads />
      {isZora && <Price />}
      <CreateButton />
    </div>
  );
}
