import { InviteEmail } from "@/components/Emails/InviteEmail";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    console.log("SENDING EMAIL");

    const body = await request.json();
    console.log("Request Body:", body);
    const { email, name } = body;
    console.log("Parsed Data:", { email, name });
    console.log(email, name);
    if (!email || !name) {
      return new Response(JSON.stringify({ error: "Missing email or name" }), {
        status: 400,
      });
    }

    const { data, error } = await resend.emails.send({
      from: "Mesa <onboarding@resend.dev>",
      to: [email],
      subject: "Mesa - Project Invite",
      react: InviteEmail({ firstName: name }),
    } as any);

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    console.error(error);
    return Response.json({ error }, { status: 500 });
  }
}
