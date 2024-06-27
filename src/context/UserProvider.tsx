"use client";
import { useToast } from "@/components/ui/use-toast";
import { UserDetailsProps } from "@/types/const";
import { useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAccount } from "wagmi";
import { v4 as uuidv4 } from "uuid";

interface UserContextType {
  user: UserDetailsProps | null;
  setUser: React.Dispatch<React.SetStateAction<UserDetailsProps | null>>;
  updateUser: (updatedUser: UserDetailsProps) => void;
  fetchUser: () => void;
  deleteAvatar: (userId: string) => void;
  signUpUser: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { address, isConnected } = useAccount();
  const [user, setUser] = useState<UserDetailsProps | null>(null);
  const { toast } = useToast();
  const { push } = useRouter();
  const [signupInitiated, setSignupInitiated] = useState(false);

  useEffect(() => {
    if (!isConnected) {
      push("/");
    }

    if (isConnected && !user?.username) {
      toast({
        description: "Username is missing.",
      });
      push("/profile");
    }
  }, [user?.username, isConnected]);

  const fetchUser = async () => {
    try {
      const response = await fetch(`/api/profile?address=${address}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch user data: ${response.statusText}`);
      }

      const { data } = await response.json();
      setUser({
        avatar_url: data?.avatar_url ?? null,
        full_name: data?.full_name ?? "",
        userId: data?.userId ?? "",
        username: data?.username ?? "",
        website: data?.website ?? "",
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
      setUser(null);
    }
  };

  const updateUser = async (updatedUser: UserDetailsProps) => {
    try {
      const response = await fetch("/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: updatedUser }),
      });

      if (!response.ok) {
        throw new Error(`Error updating user: ${response.statusText}`);
      }

      const data = await response.json();
      setUser(data.data);
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  };

  const deleteAvatar = async (userId: string) => {
    try {
      const response = await fetch("/api/profile", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) {
        throw new Error(`Error deleting avatar: ${response.statusText}`);
      }

      fetchUser();
    } catch (error) {
      console.error("Error deleting avatar:", error);
      throw error;
    }
  };

  const signUpUser = useCallback(async () => {
    try {
      const id = uuidv4();
      const response = await fetch("/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: { id, userId: address } }),
      });

      if (!response.ok) {
        throw new Error(`Error signing up user: ${response.statusText}`);
      }
      const data = await response.json();
      console.log(data, "------------------->");
      setUser(data.data);
    } catch (error) {
      console.error("Error signing up user:", error);
      throw error;
    }
  }, [address]);

  useEffect(() => {
    if (isConnected && !user && !signupInitiated) {
      signUpUser();
      setSignupInitiated(true);
      console.log("auauau");
    }
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
