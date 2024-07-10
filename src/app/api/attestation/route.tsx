import { NextRequest, NextResponse } from "next/server";
import { getAttestationData } from "@/lib/eas/getAttestation";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const address: any = searchParams.get("address");
    const uid: any = searchParams.get("uid");
    const serializedAttestations = await getAttestationData(address, uid);
    return NextResponse.json({ data: serializedAttestations }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
