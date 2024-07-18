import handleError from "./handleError";
import { NextRequest, NextResponse } from "next/server";
import { getProjectById } from "@/lib/supabase/projects/getProjectById";

export async function GET(req: NextRequest) {
  try {
    const id: any = new URL(req.nextUrl).searchParams.get("id");
    const response = await getProjectById(id);
    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return handleError(error.message, 500);
  }
  // try {
  //   const { searchParams } = new URL(req.url);
  //   const address = searchParams.get("address");
  //   const logs = await ethGetLogs(address as Address);
  //   const attestations = await getAttestations(logs);
  //   let serializedAttestations = attestations.map((attestation: any) => ({
  //     ...attestation,
  //     result: attestation.result.map((value: any) =>
  //         typeof value === "bigint" ? value.toString() : value
  //     ),
  //   }));
  //
  //   serializedAttestations = findUniqueMatches(
  //       serializedAttestations.reverse()
  //   );
  //

  // } catch (error: any) {
  //   return NextResponse.json({ error: error.message }, { status: 500 });
  // }
}

// const getProjectsApi = async (req: NextRequest) => {
//
// };
//
// export default getProjectsApi;
