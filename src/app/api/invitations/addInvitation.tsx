import handleError from "./handleError";
import { NextRequest, NextResponse } from "next/server";
import { addInvitationData } from "@/lib/supabase/invitation/addInvitation";

const addInvitation = async (req: NextRequest) => {
  try {
    const data = await req.json();
    const response: any = await addInvitationData(data);

    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return handleError(error.message, 500);
  }
};

export default addInvitation;
