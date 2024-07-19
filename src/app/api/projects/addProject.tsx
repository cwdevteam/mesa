import handleError from "./handleError";
import { NextRequest, NextResponse } from "next/server";
import { addProjectData } from "@/lib/supabase/projects/addProject";

const addProject = async (req: NextRequest) => {
  try {
    const data = await req.json();
    const response: any = await addProjectData(data);

    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return handleError(error.message, 500);
  }
};

export default addProject;
