import handleError from "./handleError";
import { NextRequest, NextResponse } from "next/server";
import { getProjectById } from "@/lib/supabase/projects/getProjectById";

const getProjectsByIdApi = async (req: NextRequest) => {
  try {
    const id: any = new URL(req.nextUrl).searchParams.get("id");
    const response = await getProjectById(id);
    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return handleError(error.message, 500);
  }
};

export default getProjectsByIdApi;
