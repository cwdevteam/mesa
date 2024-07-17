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
    console.log("SWEETS user", user);
    const { userId } = user;
    if (!userId) {
      const data = await createNewUser(user);
      const response = data as UserDetailsProps;
      return NextResponse.json({ data: response }, { status: 200 });
    }
    const existingUser = await getUserByAddress(user.userId as Address);
    console.log("SWEETS existingUser", existingUser);
    const { id } = existingUser[0];
    const data = await updateExistingUser(id as string, user);
    const response = data as UserDetailsProps;
    return NextResponse.json({ data: response }, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return handleError(error.message, 500);
  }
};

export default postProfileApi;
