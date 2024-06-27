import { useUserProvider } from "@/context/UserProvider";
import { UserDetailsProps } from "@/types/const";
import { useEffect, useState } from "react";

const useProfile = () => {
  const [user, setUser] = useState<UserDetailsProps | null>(null);
  const { user: initialUser } = useUserProvider();
  const [editing, setEditing] = useState<boolean>(false);

  const handleInputChange = (field: keyof UserDetailsProps, value: string) => {
    setUser((prevUser: any) => ({
      ...prevUser!,
      [field]: value,
    }));
  };

  useEffect(() => {
    setUser(initialUser);
  }, [initialUser]);

  return {
    user,
    setUser,
    editing,
    setEditing,
    handleInputChange,
  };
};

export default useProfile;
