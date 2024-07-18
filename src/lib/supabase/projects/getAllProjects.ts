import { createServerClient } from "../server";
import { cookies } from "next/headers";
import { ProjectProps } from "@/types/const";

export const getAllProjects = async (userId: string) => {
  const supabase = createServerClient(cookies());
  let { data: projects, error } = await supabase
    .from("invitations")
    .select("*")
    .eq("user_id", userId);

  const processedData = projects.map((project) => {
    if (project.invitations && project.invitations.length > 0) {
      project = { ...project, ...project.invitations[0] };
    }

    delete project.invitations;
    return project;
  });

  if (error) {
    throw error;
  }
  return processedData as ProjectProps;
};
