import handleError from "./handleError";
import { NextRequest, NextResponse } from "next/server";
import { addNewCollaborator } from "@/lib/supabase/collaborators/addCollaborator";

const addCollaboratorApi = async (req: NextRequest) => {
  try {
    const data = await req.json();
    const response: any = await addNewCollaborator(data);

    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return handleError(error.message, 500);
  }
};

export default addCollaboratorApi;
