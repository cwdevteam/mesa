import { createServerClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import getProfileApi from "./getProfileApi";
import postProfileApi from "./postProfileApi";
import handleError from "./handleError";

export async function GET(req: NextRequest) {
  return await getProfileApi(req);
}

export async function POST(req: NextRequest) {
  return await postProfileApi(req);
}

export async function DELETE(req: NextRequest) {
  try {
    const { userId }: { userId: string } = await req.json();
    const supabase = createServerClient(cookies());

    const { error: updateError } = await supabase
      .from("profiles")
      .update({ avatar_url: null })
      .eq("userId", userId);

    if (updateError) {
      console.error("Failed to delete avatar:", updateError.message);
      return handleError("Failed to delete avatar", 500);
    }

    return NextResponse.json(
      { message: "Avatar deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Failed to delete avatar:", error.message);
    return handleError(error.message, 500);
  }
}
