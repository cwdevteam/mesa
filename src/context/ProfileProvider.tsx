"use client";

import { ReactNode, createContext, useContext, useMemo } from "react";
import useProfile from "@/hooks/useProfile";

const ProfileContext = createContext({} as any);

const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const profile = useProfile();

  const value = useMemo(
    () => ({
      ...profile,
    }),
    [profile]
  );

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
};

export const useProfileProvider = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfileProvider must be used within a ProfileProvider");
  }
  return context;
};

export default ProfileProvider;
