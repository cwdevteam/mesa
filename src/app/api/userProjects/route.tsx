import { NextRequest } from "next/server";
import getProjectsByIdApi from "@/app/api/userProjects/getProjectById";
import addProjectRole from "@/app/api/userProjects/addProjectRole";
import getAllProjectsApi from "@/app/api/userProjects/getAllProject";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const projectId = searchParams.get("id");
  const action = searchParams.get("action");

  if (projectId && action == "byId") {
    return await getProjectsByIdApi(req);
  } else {
    return await getAllProjectsApi(req);
  }
}

export async function POST(req: NextRequest) {
  return await addProjectRole(req);
}
