"use client";

import useUser from "@/hooks/useUser";
import { ReactNode, createContext, useContext, useMemo } from "react";

const UserContext = createContext({} as any);

const UserProvider = ({ children }: { children: ReactNode }) => {
  const user = useUser();

  const value = useMemo(
    () => ({
      ...user,
    }),
    [user]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserProvider = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserProvider must be used within a UserProvider");
  }
  return context;
};

export default UserProvider;
