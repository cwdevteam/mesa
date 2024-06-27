"use client";
import {
  createContext,
  useContext,
  useEffect,
  ReactNode,
  useState,
} from "react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { UserContextType, UserDetailsProps } from "@/types/const";
import { useFetchUser } from "@/hooks/useFetchUser";
import { useUpdateUser } from "@/hooks/useUpdateUser";
import { useDeleteAvatar } from "@/hooks/useDeleteAvatar";
import { useSignUpUser } from "@/hooks/useSignUpUser";
import { useAccount } from "wagmi";

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

  const fetchUser = useFetchUser({ address: String(address), setUser });
  const updateUser = useUpdateUser({ setUser });
  const deleteAvatar = useDeleteAvatar();
  const signUpUser = useSignUpUser({ address: String(address), setUser });
  const { toast } = useToast();
  const { push } = useRouter();

  useEffect(() => {
    if (!isConnected) push("/");
    if (isConnected && !user?.username) {
      toast({ description: "Username is missing." });
      push("/profile");
    }
  }, [user?.username, isConnected]);

  useEffect(() => {
    if (isConnected && !user) signUpUser();
  }, [isConnected]);

  const contextValue: UserContextType = {
    user,
    setUser,
    signUpUser,
    updateUser,
    fetchUser,
    deleteAvatar,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
