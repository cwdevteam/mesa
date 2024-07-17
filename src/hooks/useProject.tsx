import { useState } from "react";

const useProject = () => {
  const [id, setId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [contentHash, setContentHash] = useState<string>("");

  return {
    id,
    setId,
    name,
    setName,
    description,
    setDescription,
    contentHash,
    setContentHash,
  };
};

export default useProject;
