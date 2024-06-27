"use client";

import {
  createContext,
  useContext,
  useEffect,
  ReactNode,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { UserContextType, UserDetailsProps } from "@/types/const";
import { useFetchUser } from "@/hooks/useFetchUser";
import { useDeleteAvatar } from "@/hooks/useDeleteAvatar";
import { useAccount } from "wagmi";
import fetchUserByAddress from "@/lib/supabase/user/fetchUserByAddress";
import { Address } from "viem";

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { address, isConnected } = useAccount();
  const [user, setUser] = useState<UserDetailsProps | null>(null);
  const deleteAvatar = useDeleteAvatar();
  const { push } = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const responseLib = await fetchUserByAddress(address as Address);
      console.log("SWEETS responseLib", responseLib);
      if (!responseLib) return push("/profile");
      push("/dashboard");
    };

    if (!(isConnected && address)) {
      return push("/");
    }
    checkUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, address]);

  const fetchUser = async () => {
    const response = await fetchUserByAddress(address as Address);
    setUser(response);
  };

  const contextValue: UserContextType = {
    user,
    setUser,
    fetchUser,
    deleteAvatar,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
