import { NextRequest } from "next/server";
import getProfileApi from "./getProfileApi";
import postProfileApi from "./postProfileApi";

export async function GET(req: NextRequest) {
  return await getProfileApi(req);
}

export async function POST(req: NextRequest) {
  return await postProfileApi(req);
}
