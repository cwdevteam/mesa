import handleError from "./handleError";
import { NextRequest, NextResponse } from "next/server";
import { addProjectRoleData } from "@/lib/supabase/roles/addProjectRole";

const addProjectRole = async (req: NextRequest) => {
  try {
    const data = await req.json();
    const response: any = await addProjectRoleData(data);

    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return handleError(error.message, 500);
  }
};

export default addProjectRole;
