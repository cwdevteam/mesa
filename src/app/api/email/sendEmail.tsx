import handleError from "./handleError";
import { NextRequest, NextResponse } from "next/server";
import { getNodeMailerClient } from "@/lib/nodemailer/nodemailer";
import { getEmailHtmlText } from "@/lib/nodemailer/getBodyText";
import { getEmailOptions } from "@/lib/nodemailer/getEmailOptions";
import { addNewCollaborator } from "@/lib/supabase/collaborators/addCollaborator";

const sendEmailApi = async (req: NextRequest) => {
  try {
    const data = await req.json();
    const transporter = getNodeMailerClient();
    const emailHtml = getEmailHtmlText(
      data.username,
      data.description,
      data.link
    );

    try {
      await transporter.sendMail(getEmailOptions(data.email, emailHtml));
    } catch (error) {}

    let response = {
      to: data.email,
    };
    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return handleError(error.message, 500);
  }
};

export default sendEmailApi;
