import { NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/db'
import { getAuthenticatedUser } from '@/lib/api-usage'
import { verifyGoogleIdToken } from '@/lib/google-auth'

async function getSessionUser(request: Request) {
  const authUser = await getAuthenticatedUser(request)
  if (!authUser) return null

  return prisma.user.findUnique({
    where: { id: authUser.id },
    select: { id: true, passwordHash: true, googleId: true },
  })
}

// POST /api/account/google — link a Google account to the current session user
export async function POST(request: Request) {
  try {
    const user = await getSessionUser(request)
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await request.json()
    const parsed = z.object({ credential: z.string().min(1) }).safeParse(body)
    if (!parsed.success) return NextResponse.json({ error: 'Invalid request' }, { status: 400 })

    const googleProfile = await verifyGoogleIdToken(parsed.data.credential)

    const conflict = await prisma.user.findUnique({
      where: { googleId: googleProfile.googleId },
      select: { id: true },
    })
    if (conflict && conflict.id !== user.id) {
      return NextResponse.json({ error: 'This Google account is already linked to a different account' }, { status: 409 })
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { googleId: googleProfile.googleId },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'INVALID_GOOGLE_ID_TOKEN') {
        return NextResponse.json({ error: 'Google verification failed. Please try again.' }, { status: 401 })
      }
      if (error.message === 'GOOGLE_AUTH_NOT_CONFIGURED') {
        return NextResponse.json({ error: 'Google sign-in is not configured' }, { status: 503 })
      }
    }
    console.error('Google link error:', error)
    return NextResponse.json({ error: 'Failed to link Google account' }, { status: 500 })
  }
}

// DELETE /api/account/google — unlink Google from the current session user
export async function DELETE(request: Request) {
  try {
    const user = await getSessionUser(request)
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    if (!user.googleId) {
      return NextResponse.json({ error: 'No Google account is linked' }, { status: 400 })
    }

    if (!user.passwordHash) {
      return NextResponse.json({ error: 'Set a password before disconnecting Google' }, { status: 400 })
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { googleId: null },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Google unlink error:', error)
    return NextResponse.json({ error: 'Failed to disconnect Google account' }, { status: 500 })
  }
}
