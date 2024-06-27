import { NextRequest, NextResponse } from "next/server";
import handleError from "./handleError";
import getUserByAddress from "@/lib/supabase/user/getUserByAddress";
import { Address } from "viem";

const getProfileApi = async (req: NextRequest) => {
  try {
    const address = new URL(req.nextUrl).searchParams.get("address");
    if (!address) {
      return handleError("Missing address parameter", 400);
    }
    const existingUser = await getUserByAddress(address as Address);
    return NextResponse.json({ data: existingUser }, { status: 200 });
  } catch (error: any) {
    return handleError(error.message, 500);
  }
};

export default getProfileApi;
