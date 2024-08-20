import { NextRequest, NextResponse } from 'next/server'
import { findLatestProjectStates } from '@/lib/eas/findLatestProjectStates'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const address = searchParams.get('address')

    const data = await response.json()
    const attestations = findLatestProjectStates(data.attestations)

    return NextResponse.json({ data: attestations }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
