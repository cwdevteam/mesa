import { UserDetailsProps } from "@/types/const";
import { createServerClient } from "../server";
import { cookies } from "next/headers";

export const addNewCollaborator = async (collaboratorData: any) => {
  const supabase = createServerClient(cookies());
  let tableData = {
    member_name: collaboratorData.name,
    email: collaboratorData.email,
    message: collaboratorData.description,
    owner: collaboratorData.owner,
    project_id: collaboratorData.project_id,
    invite_person_name: collaboratorData.invite_person_name,
  };
  /* eslint-disable no-unused-vars, no-undef */
  const { data, error: createError } = await supabase
    .from("collaborators")
    .insert([tableData])
    .select()
    .single();
  /* eslint-enable no-unused-vars, no-undef */

  if (createError) {
    throw new Error(createError.message);
  }
  return data as any as UserDetailsProps;
};
