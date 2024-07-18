import { createServerClient } from "../server";
import { cookies } from "next/headers";

export const addProjectRoleData = async (projectRoleData: any) => {
  const supabase = createServerClient(cookies());

  const { data, error: createError } = await supabase
    .from("roles")
    .insert([projectRoleData])
    .select()
    .single();

  if (createError) {
    throw new Error(createError.message);
  }
  return data;
};
