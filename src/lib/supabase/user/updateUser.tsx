import { UserDetailsProps } from "@/types/const";

const updateUser = async (updatedUser: UserDetailsProps) => {
  try {
    let payload = {
      user: updatedUser,
    };
    const response = await fetch("/api/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    let data = await response.json();

    if (!response.ok)
      throw new Error(`Error updating user: ${response.statusText}`);
    return data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

export default updateUser;
