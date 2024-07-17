import handleError from "./handleError";
import { NextRequest, NextResponse } from "next/server";
import { getNodeMailerClient } from "@/lib/nodemailer/nodemailer";
import { getEmailHtmlText } from "@/lib/nodemailer/getBodyText";
import { getEmailOptions } from "@/lib/nodemailer/getEmailOptions";
import { addNewCollaborator } from "@/lib/supabase/collaborators/addCollaborator";

const addCollaboratorApi = async (req: NextRequest) => {
  try {
    const data = await req.json();
    const response: any = await addNewCollaborator(data);
    const transporter = getNodeMailerClient();
    const emailHtml = getEmailHtmlText(data.username, data.description);

    try {
      await transporter.sendMail(getEmailOptions(data.email, emailHtml));
      response["to"] = data.email;
    } catch (error) {}

    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return handleError(error.message, 500);
  }
};

export default addCollaboratorApi;
