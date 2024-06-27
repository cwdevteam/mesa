import { UserDetailsProps } from "@/types/const";

const updateUser = async (updatedUser: UserDetailsProps) => {
  try {
    const response = await fetch("/api/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: updatedUser }),
    });

    if (!response.ok)
      throw new Error(`Error updating user: ${response.statusText}`);

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

export default updateUser;
