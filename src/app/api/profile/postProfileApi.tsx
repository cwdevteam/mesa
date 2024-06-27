import { UserDetailsProps } from "@/types/const";
import handleError from "./handleError";
import { NextRequest, NextResponse } from "next/server";
import getUserByAddress from "@/lib/supabase/user/getUserByAddress";
import { Address } from "viem";
import updateExistingUser from "@/lib/supabase/user/updateExistingUser";
import createNewUser from "@/lib/supabase/user/createNewUser";

const postProfileApi = async (req: NextRequest) => {
  try {
    const { user }: { user: UserDetailsProps } = await req.json();
    const existingUser = await getUserByAddress(user.userId as Address);
    let response: UserDetailsProps;
    if (existingUser[0]) {
      const { id } = existingUser[0];
      const data = await updateExistingUser(id as string, user);
      response = data;
    } else {
      const data = await createNewUser(user);
      response = data;
    }
    return NextResponse.json({ data: response }, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return handleError(error.message, 500);
  }
};

export default postProfileApi;
