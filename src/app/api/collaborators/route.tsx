import { NextRequest } from "next/server";
import addCollaboratorApi from "@/app/api/collaborators/addCollaborator";
import getCollaboratorApi from "@/app/api/collaborators/getCollaborator";

export async function POST(req: NextRequest) {
  return await addCollaboratorApi(req);
}

export async function GET(req: NextRequest) {
  return await getCollaboratorApi(req);
}
