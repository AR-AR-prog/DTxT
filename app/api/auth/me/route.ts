import { NextResponse } from 'next/server'
import { getAuthenticatedUser } from '@/lib/api-usage'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    const user = await getAuthenticatedUser(request)

    return NextResponse.json({ user })
  } catch (error) {
    console.error('Session check error:', error)
    return NextResponse.json({ user: null }, { status: 200 })
  }
}
