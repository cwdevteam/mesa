import { NextRequest } from "next/server";
import getProjectsApi from "@/app/api/userProjects/getProject";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  return await getProjectsApi(req);
}
