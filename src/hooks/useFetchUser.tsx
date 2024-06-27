"use client";
import { Dispatch, SetStateAction, useCallback } from "react";
import { UserDetailsProps } from "@/types/const";

export const useFetchUser = ({
  address,
  setUser,
}: {
  address: string;
  setUser: Dispatch<SetStateAction<UserDetailsProps | null>>;
}) => {
  const fetchUser = useCallback(async () => {
    try {
      const response = await fetch(`/api/profile?address=${address}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok)
        throw new Error(`Failed to fetch user data: ${response.statusText}`);

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
      //   setUser(null);
    }
  }, [address, setUser]);

  return fetchUser;
};
