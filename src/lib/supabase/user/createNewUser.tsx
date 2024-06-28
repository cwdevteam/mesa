import { UserDetailsProps } from "@/types/const";
import { v4 as uuidv4 } from "uuid";
import { createServerClient } from "../server";
import { cookies } from "next/headers";

const createNewUser = async (user: UserDetailsProps) => {
  const newUser = {
    ...user,
    id: uuidv4(),
  };
  const supabase = createServerClient(cookies());
  const { data, error: createError } = await supabase
    .from("profiles")
    .insert(newUser)
    .select()
    .single();
  if (createError) {
    throw new Error(createError.message);
  }
  return data as any as UserDetailsProps;
};

export default createNewUser;
