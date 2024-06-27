"use client";
import { Dispatch, SetStateAction, useCallback } from "react";
import { UserDetailsProps } from "@/types/const";

export const useUpdateUser = ({
  setUser,
}: {
  setUser: Dispatch<SetStateAction<UserDetailsProps | null>>;
}) => {
  const updateUser = useCallback(
    async (updatedUser: UserDetailsProps) => {
      try {
        const response = await fetch("/api/profile", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user: updatedUser }),
        });

        if (!response.ok)
          throw new Error(`Error updating user: ${response.statusText}`);

        const data = await response.json();
        setUser(data.data);
      } catch (error) {
        console.error("Error updating user:", error);
        throw error;
      }
    },
    [setUser]
  );

  return updateUser;
};
