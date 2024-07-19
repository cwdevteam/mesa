import { UserDetailsProps } from "@/types/const";
import { useState } from "react";

const useProjectInvite = () => {
  const [email, setEmail] = useState<UserDetailsProps | null>(null);
  const [name, setName] = useState<boolean>(false);
  const [message, setMessage] = useState<boolean>(false);

  return {
    email,
    setEmail,
    message,
    setMessage,
    name,
    setName,
  };
};

export default useProjectInvite;
