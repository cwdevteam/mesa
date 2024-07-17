import { UserDetailsProps } from "@/types/const";
import handleError from "./handleError";
import { NextRequest, NextResponse } from "next/server";
import updateExistingUser from "@/lib/supabase/user/updateExistingUser";
import createNewUser from "@/lib/supabase/user/createNewUser";

const postProfileApi = async (req: NextRequest) => {
  try {
    const { user }: { user: UserDetailsProps } = await req.json();
    const { id } = user;
    if (!id) {
      const data = (await createNewUser(user)) as UserDetailsProps;
      const response = data;
      return NextResponse.json({ data: response }, { status: 200 });
    }
    const data = (await updateExistingUser(
      id as string,
      user
    )) as UserDetailsProps;
    const response = data as UserDetailsProps;
    return NextResponse.json({ data: response }, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return handleError(error.message, 500);
  }
};

export default postProfileApi;
