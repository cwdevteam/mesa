import { createServerClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    const { userId, avatar_url }: { userId: string; avatar_url: string } =
      await req.json();
    const supabase = createServerClient(cookies());

    const { error: updateError } = await supabase
      .from("profiles")
      .update({ avatar_url })
      .eq("userId", userId)
      .single();

    if (updateError) {
      console.error("Failed to update avatar:", updateError.message);
      return handleError("Failed to update avatar", 500);
    }

    return NextResponse.json(
      { message: "Avatar updated successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Failed to update avatar:", error.message);
    return handleError(error.message, 500);
  }
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

function handleError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}
