import { createServerClient } from "../server";
import { cookies } from "next/headers";

export const addInvitationData = async (invitationData: any) => {
  const supabase = createServerClient(cookies());

  const { data, error: createError } = await supabase
    .from("invitations")
    .insert([invitationData])
    .select()
    .single();

  if (createError) {
    throw new Error(createError.message);
  }
  return data;
};
