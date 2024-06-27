"use client";

import { createContext, useContext, ReactNode, useState } from "react";
import { UserContextType, UserDetailsProps } from "@/types/const";
import { useAccount } from "wagmi";
import fetchUserByAddress from "@/lib/supabase/user/fetchUserByAddress";
import { Address } from "viem";
import useAuthRedirect from "@/hooks/useAuthRedirect";

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { address } = useAccount();
  const [user, setUser] = useState<UserDetailsProps | null>(null);
  useAuthRedirect();

  const fetchUser = async () => {
    const response = await fetchUserByAddress(address as Address);
    setUser(response);
  };

  const contextValue: UserContextType = {
    user,
    setUser,
    fetchUser,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
