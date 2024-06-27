import { createServerClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { UserDetailsProps } from "@/types/const";
import getUserByAddress from "@/lib/supabase/user/getUserByAddress";
import { Address } from "viem";
import updateExistingUser from "@/lib/supabase/user/updateExistingUser";

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
    console.log("SWEETS updating user API", user);
    const supabase = createServerClient(cookies());
    const existingUser = await getUserByAddress(user.userId as Address);
    console.log("SWEETS existingUser", existingUser[0]);

    let response: UserDetailsProps;

    if (existingUser) {
      const { id } = existingUser[0];
      console.log("SWEETS id", id);

      const responseFromLib = await updateExistingUser(id as string, user);
      console.log("SWEETS responseFromLib", responseFromLib);

      response = responseFromLib;
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
