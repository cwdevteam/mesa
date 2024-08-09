"use client";

import { useProjectProvider } from "@/context/ProjectProvider";
import { uploadJson } from "@/lib/ipfs/uploadJson";
import useSoundCreateInputs from "./useSoundCreateInputs";
import useSoundCreatePaymasterEdition from "./useSoundCreatePaymasterEdition";

const useSoundCreate = () => {
  const { name, description, animationUrl, image } = useProjectProvider();
  const { getInputs } = useSoundCreateInputs();
  const { createPaymasterEdition } = useSoundCreatePaymasterEdition();

  const createEdition = async () => {
    const { uri } = await uploadJson({
      name,
      description,
      image,
      animation_url: animationUrl,
    });
    const input = await getInputs(uri);
    await createPaymasterEdition(input);
  };

  return { createEdition };
};

export default useSoundCreate;
