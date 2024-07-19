import { UserDetailsProps } from "@/types/const";
import { useState } from "react";

const useProjectInvite = () => {
  const [email, setEmail] = useState<UserDetailsProps | null>(null);
  const [name, setName] = useState<boolean>(false);

  return {
    email,
    setEmail,
    name,
    setName,
  };
};

export default useProjectInvite;
