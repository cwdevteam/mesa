import { UserDetailsProps } from "@/types/const";
import { createServerClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

const updateExistingUser = async (
  id: string,
  newUserDetails: UserDetailsProps
) => {
  const allowedFields = ["username", "full_name", "website", "avatar_url"];
  const updateData = Object.fromEntries(
    Object.entries(newUserDetails).filter(([key]) =>
      allowedFields.includes(key)
    )
  );
  const supabase = createServerClient(cookies());
  const { data: updatedUser, error: updateError } = await supabase
    .from("profiles")
    .update(updateData)
    .eq("id", id)
    .select()
    .single();
  if (updateError) {
    throw new Error(updateError.message);
  }
  return updatedUser as any as UserDetailsProps;
};

export default updateExistingUser;
