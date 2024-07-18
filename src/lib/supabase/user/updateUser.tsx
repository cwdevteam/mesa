import { UserDetailsProps } from "@/types/const";
import axios from "axios";

const updateUser = async (updatedUser: UserDetailsProps) => {
  try {
    const response = await axios.post("/api/profile", {
      user: updatedUser,
    });
    if (response.status !== 200)
      throw new Error(`Error updating user: ${response.statusText}`);
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

export default updateUser;
