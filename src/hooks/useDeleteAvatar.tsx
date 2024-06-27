"use client";
import { useCallback } from "react";

export const useDeleteAvatar = () => {
  const deleteAvatar = useCallback(async (userId: string) => {
    try {
      const response = await fetch("/api/profile", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok)
        throw new Error(`Error deleting avatar: ${response.statusText}`);
    } catch (error) {
      console.error("Error deleting avatar:", error);
      throw error;
    }
  }, []);

  return deleteAvatar;
};
