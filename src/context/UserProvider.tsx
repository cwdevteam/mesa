"use client";
import { TUser } from "@/components/LoginButton/LoginButton";
import React, { createContext, useContext, useState } from "react";
import { useAccount } from "wagmi";

interface UserContextType {
  user: TUser | null;
  setUser: React.Dispatch<React.SetStateAction<TUser | null>>;
  updateUser: (updatedUser: TUser) => void;
  fetchUser: () => void;
  updateAvatar: (userId: string, avatarUrl: string) => void;
  deleteAvatar: (userId: string) => void;
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
  const { address } = useAccount();
  const [user, setUser] = useState<TUser | null>(null);

  const fetchUser = async () => {
    try {
      const response = await fetch(`/api/profile?userId=${address}`, {
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
        avatar_url: data?.avatar_url,
        full_name: data?.full_name,
        userId: data?.userId,
        username: data?.username,
        website: data?.website,
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const updateUser = async (updatedUser: TUser) => {
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
      throw error; // Rethrow the error to handle it outside
    }
  };

  const updateAvatar = async (userId: string, avatarUrl: string) => {
    try {
      const response = await fetch("/api/avatar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, avatar_url: avatarUrl }),
      });

      if (!response.ok) {
        throw new Error(`Error updating avatar: ${response.statusText}`);
      }

      fetchUser();
    } catch (error) {
      console.error("Error updating avatar:", error);
      throw error;
    }
  };

  const deleteAvatar = async (userId: string) => {
    try {
      const response = await fetch("/api/avatar", {
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

  const contextValue: UserContextType = {
    user,
    setUser,
    updateUser,
    fetchUser,
    updateAvatar,
    deleteAvatar,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
