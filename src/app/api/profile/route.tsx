import { createServerClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { UserDetailsProps } from "@/types/const";

export async function GET(req: NextRequest) {
  try {
    const address = new URL(req.nextUrl).searchParams.get("address");

    if (!address) {
      return handleError("Missing address parameter", 400);
    }

    const supabase = createServerClient(cookies());

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("userId", address as string)
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
    const { user }: { user: UserDetailsProps } = await req.json();
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

    let response: { data: UserDetailsProps | null } = { data: null };

    if (existingUser) {
      const allowedFields = ["username", "full_name", "website", "avatar_url"];
      const updateData = Object.fromEntries(
        Object.entries(user).filter(([key]) => allowedFields.includes(key))
      );

      const { data: updatedUser, error: updateError } = await supabase
        .from("profiles")
        .update(updateData)
        .eq("userId", user.userId as string)
        .select()
        .single();

      if (updateError) {
        throw new Error(updateError.message);
      }

      response.data = updatedUser;
    } else {
      // Handle case where the user does not exist and needs to be created
      const { data: newUser, error: createError } = await supabase
        .from("profiles")
        .insert(user)
        .select()
        .single();

      if (createError) {
        throw new Error(createError.message);
      }

      response.data = newUser;
    }

    return NextResponse.json({ data: response.data }, { status: 200 });
  } catch (error: any) {
    console.error(error);
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
