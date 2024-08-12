"use client";

import { Button } from "@/components/ui/button";
import { useOnchainDistributionProvider } from "@/context/OnchainDistributionProvider";
import useSoundCreate from "@/hooks/sound/useSoundCreate";
import useZoraCreate from "@/hooks/useZoraCreate";
import getCollectPageUrl from "@/lib/zora/getCollectPageUrl";

const CreateButton = () => {
  const { isSound, isZora } = useOnchainDistributionProvider();
  const { create, createdContract } = useZoraCreate();
  const { createEdition } = useSoundCreate();
  const zoraUrl = getCollectPageUrl(createdContract);

  const handleClick = async () => {
    if (createdContract) return await window.open(zoraUrl, "_blank");
    if (isZora) return await create();
    if (isSound) return await createEdition();
  };

  return (
    <Button onClick={handleClick} className="self-start" type="submit">
      {createdContract ? "View on Zora" : " Create Token"}
    </Button>
  );
};

export default CreateButton;
