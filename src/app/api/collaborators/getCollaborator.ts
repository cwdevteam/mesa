import handleError from "./handleError";
import { NextRequest, NextResponse } from "next/server";
import { getCollaborator } from "@/lib/supabase/collaborators/getCollaborators";

const getCollaboratorApi = async (req: NextRequest) => {
  try {
    const response = await getCollaborator();
    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return handleError(error.message, 500);
  }
};

export default getCollaboratorApi;
