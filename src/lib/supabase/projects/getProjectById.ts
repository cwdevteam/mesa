import { createServerClient } from "../server";
import { cookies } from "next/headers";
import { ProjectProps } from "@/types/const";

export const getProjectById = async (id: string) => {
  const supabase = createServerClient(cookies());

  let { data: projects, error }: any = await supabase
    .from("invitations")
    .select("*,  roles(*)")
    .eq("project_id", id)
    .eq("user_role", "Owner")
    .eq("roles.contract_type", "Owner");

  if (error) {
    throw error;
  }
  return projects as ProjectProps;
};
