import { createServerClient } from "../server";
import { cookies } from "next/headers";

export const getCollaborator = async () => {
  const supabase = createServerClient(cookies());
  let { data: collaborators, error } = await supabase
    .from("collaborators")
    .select("*");
  if (error) {
    throw error;
  }
  return collaborators;
};
