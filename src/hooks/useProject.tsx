import { Credit, defaultCredit } from "@/types/projectMetadataForm";
import { useState } from "react";

const useProject = () => {
  const [id, setId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [animationUrl, setAnimationUrl] = useState<string>("");
  const [credits, setCredits] = useState<Credit[]>([defaultCredit]);

  return {
    credits,
    setCredits,
    id,
    setId,
    name,
    setName,
    description,
    setDescription,
    animationUrl,
    setAnimationUrl,
  };
};

export default useProject;
