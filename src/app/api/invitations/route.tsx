import { NextRequest } from "next/server";
import addInvitation from "@/app/api/invitations/addInvitation";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  return await addInvitation(req);
}
