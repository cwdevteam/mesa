import { NextRequest } from "next/server";
import sendEmailApi from "@/app/api/email/sendEmail";

export async function POST(req: NextRequest) {
  return await sendEmailApi(req);
}
