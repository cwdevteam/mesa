import { NextRequest, NextResponse } from "next/server";
import getAttestations from "@/lib/eas/getAttestations";
import { ethGetLogs } from "@/lib/alchemy/eth_getLogs";
import { Address } from "viem";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const address = searchParams.get("address");
    const uid = searchParams.get("uid");
    let logs = await ethGetLogs(address as Address);
    logs =  logs.filter((log:any)=> log.data === uid)
    const attestations = await getAttestations(logs);
    const serializedAttestations = attestations.map((attestation: any) => ({
      ...attestation,
      result: attestation.result.map((value: any) =>
          typeof value === "bigint" ? value.toString() : value
      ),
    }));

    return NextResponse.json({ data: serializedAttestations }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
