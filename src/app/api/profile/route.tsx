import { createServerClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { TUser } from "@/components/LoginButton/LoginButton";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.nextUrl);
    const userId = url.searchParams.get("userId");

    if (!userId) {
      return handleError("Missing userId parameter", 400);
    }

    const supabase = createServerClient(cookies());

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("userId", userId as string)
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (error: any) {
    return handleError(error.message, 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const { user }: { user: TUser } = await req.json();
    const supabase = createServerClient(cookies());

    const { data: existingUser, error: existingUserError } = await supabase
      .from("profiles")
      .select("*")
      .eq("userId", String(user.userId))
      .single();

    if (existingUserError && existingUserError.code !== "PGRST116") {
      console.error("Error fetching user:", existingUserError.message);
      return handleError(existingUserError.message, 500);
    }

    let response: { data: TUser | null } = { data: null };

    if (existingUser) {
      const allowedFields = ["username", "full_name", "website"];
      const updateData = Object.fromEntries(
        Object.entries(user).filter(([key]) => allowedFields.includes(key))
      );

      const { error: updateError } = await supabase
        .from("profiles")
        .update(updateData)
        .eq("userId", user.userId as string);

      if (updateError) {
        throw new Error(updateError.message);
      }

      const { data: updatedUser } = await supabase
        .from("profiles")
        .select("*")
        .eq("userId", user.userId as string)
        .single();

      response.data = updatedUser;
    }

    return NextResponse.json({ data: response.data }, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return handleError(error.message, 500);
  }
}

function handleError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}
