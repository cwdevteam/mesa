"use client";

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useUser } from "./UserProvider";
import { UserDetailsProps } from "@/types/const";

const ProfileContext = createContext({} as any);

const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserDetailsProps | null>(null);
  const [editing, setEditing] = useState<boolean>(false);
  const { user: initialUser } = useUser();

  useEffect(() => {
    console.log("SWEETS initialUser", initialUser);
    setUser(initialUser);
  }, [initialUser]);

  const value = useMemo(
    () => ({
      user,
      setUser,
      editing,
      setEditing,
    }),
    [user, setUser, editing, setEditing]
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
