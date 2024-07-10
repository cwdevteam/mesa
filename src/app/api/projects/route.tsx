import { NextRequest, NextResponse } from "next/server";
import getAttestations from "@/lib/eas/getAttestations";
import { ethGetLogs } from "@/lib/alchemy/eth_getLogs";
import { Address } from "viem";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const address = searchParams.get("address");
    const logs = await ethGetLogs(address as Address);
    const attestations = await getAttestations(logs);
    let serializedAttestations = attestations.map((attestation: any) => ({
      ...attestation,
      result: attestation.result.map((value: any) => {
        return typeof value === "bigint" ? value.toString() : value;
      }),
    }));

    return NextResponse.json({ data: serializedAttestations }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
