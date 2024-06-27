"use client";
import { Dispatch, SetStateAction, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { UserDetailsProps } from "@/types/const";

export const useSignUpUser = ({
  address,
  setUser,
}: {
  address: string;
  setUser: Dispatch<SetStateAction<UserDetailsProps | null>>;
}) => {
  const signUpUser = useCallback(async () => {
    try {
      const id = uuidv4();
      const response = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user: { id, userId: address } }),
      });

      if (!response.ok) {
        return;
      }

      const data = await response.json();
      setUser(data.data);
    } catch (error) {
      console.error("Error signing up user:", error);
      throw error;
    }
  }, [address, setUser]);

  return signUpUser;
};
