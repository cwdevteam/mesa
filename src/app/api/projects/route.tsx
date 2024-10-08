import { NextRequest, NextResponse } from 'next/server'
import { IS_TESTNET } from '@/lib/consts'
import { findLatestProjectStates } from '@/lib/eas/findLatestProjectStates'
import findLatestReferences from '@/lib/eas/findLatestReferences'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const address = searchParams.get('address')
    const response = await fetch(
      `https://base${IS_TESTNET ? '-sepolia' : ''}.easscan.org/address/${address}?_data=routes/__boundary/address/$address`
    )
    const data = await response.json()
    const latestProjectStates = findLatestProjectStates(data.attestations)
    const attestations = await findLatestReferences(latestProjectStates)

    return NextResponse.json({ data: attestations }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
