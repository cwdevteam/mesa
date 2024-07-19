import { NextResponse } from "next/server";

const handleError = (message: string, status: number) =>
  NextResponse.json({ error: message }, { status });

export default handleError;
