import { NextRequest, NextResponse } from "next/server";
import getAttestations from "@/lib/eas/getAttestations";
import { ethGetLogs } from "@/lib/alchemy/eth_getLogs";
import { Address } from "viem";
import { findLatestProjectStates } from "@/lib/eas/findLatestProjectStates";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const address = searchParams.get("address");
    // get logs for all Attested events
    const logs = await ethGetLogs(address as Address);
    // get logs for all Attested events
    const attestations = await getAttestations(logs);
    console.log(attestations.length);
    let serializedAttestations = attestations.map((attestation: any) => ({
      ...attestation,
      result: attestation.result.map((value: any) =>
        typeof value === "bigint" ? value.toString() : value
      ),
    }));
    console.log(serializedAttestations.length);

    serializedAttestations = findLatestProjectStates(
      serializedAttestations.reverse()
    );
    console.log(serializedAttestations.length);

    return NextResponse.json(
      { data: serializedAttestations.reverse() },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
