import { useUser } from "@/context/UserProvider";
import { UserDetailsProps } from "@/types/const";
import { useEffect, useState } from "react";

const useProfile = () => {
  const [user, setUser] = useState<UserDetailsProps | null>(null);
  const { user: initialUser } = useUser();
  const [editing, setEditing] = useState<boolean>(false);

  const handleInputChange = (field: keyof UserDetailsProps, value: string) => {
    setUser((prevUser: any) => ({
      ...prevUser!,
      [field]: value,
    }));
  };

  useEffect(() => {
    console.log("SWEETS initialUser", initialUser);
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
