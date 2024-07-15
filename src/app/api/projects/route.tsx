import { NextRequest, NextResponse } from "next/server";
import getAttestations from "@/lib/eas/getAttestations";
import { ethGetLogs } from "@/lib/alchemy/eth_getLogs";
import { Address } from "viem";
import { findUniqueMatches } from "@/lib/eas/findUniqueMatches";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const address = searchParams.get("address");
    const logs = await ethGetLogs(address as Address);
    const attestations = await getAttestations(logs);
    let serializedAttestations = attestations.map((attestation: any) => ({
      ...attestation,
      result: attestation.result.map((value: any) =>
        typeof value === "bigint" ? value.toString() : value
      ),
    }));

    serializedAttestations = findUniqueMatches(
      serializedAttestations.reverse()
    );

    return NextResponse.json(
      { data: serializedAttestations.reverse() },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
