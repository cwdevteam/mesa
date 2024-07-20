import { InviteEmail } from "@/components/Emails/InviteEmail";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name, message = "", referenceAttestation } = body;
    if (!email || !name) {
      return new Response(JSON.stringify({ error: "Missing email or name" }), {
        status: 400,
      });
    }

    const { data, error } = await resend.emails.send({
      from: "Mesa <mesa@onchainmagic.xyz>",
      to: [email],
      subject: "Mesa - Project Invite",
      react: InviteEmail({ name, message, referenceAttestation }),
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
