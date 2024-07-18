import { createServerClient } from "../server";
import { cookies } from "next/headers";

export const getProjectById = async (id: string) => {
  const supabase = createServerClient(cookies());
  let { data: projects, error } = supabase
    .from("projects")
    .select("*")
    .eq("id", id);

  if (error) {
    throw error;
  }
  return projects;
};
