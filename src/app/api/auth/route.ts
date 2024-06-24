import { TUser } from "@/components/LoginButton/LoginButton";
import { createServerClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
    const supabase = createServerClient(cookies());
    const { address } = await req.json();

    const { data: existingUser, error: fetchError } = await supabase
      .from("profiles")
      .select("*")
      .eq("userId", address)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      throw new Error(fetchError.message);
    }

    let user;
    if (existingUser) {
      user = existingUser;
    } else {
      const { data: newUser, error: insertError } = await supabase
        .from("profiles")
        .insert<TUser>([
          {
            userId: address,
            username: null,
            full_name: null,
            avatar_url: null,
            website: null,
          },
        ])
        .single();

      if (insertError) {
        throw new Error(insertError.message);
      }

      user = newUser;
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
