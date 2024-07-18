import { createServerClient } from "../server";
import { cookies } from "next/headers";

export const addProjectData = async (projectData: any) => {
  const supabase = createServerClient(cookies());

  const { data, error: createError } = await supabase
    .from("projects")
    .insert([projectData])
    .select()
    .single();

  if (createError) {
    throw new Error(createError.message);
  }
  return data;
};
