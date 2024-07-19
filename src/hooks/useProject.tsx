import { useUserProvider } from "@/context/UserProvider";
import { ContractType, Credit, UserRole } from "@/types/projectMetadataForm";
import { useEffect, useState } from "react";

const defaultCredit = {
  contractType: ContractType.Songwriting,
  collaboratorType: UserRole.Owner,
  name: "",
  splitBps: 10000,
};

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
