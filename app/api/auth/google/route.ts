import { NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/db'
import { createSessionToken, getSessionCookieHeader } from '@/lib/auth'
import { verifyGoogleIdToken } from '@/lib/google-auth'

const googleAuthSchema = z.object({
  credential: z.string().min(1, 'Google credential is required'),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const parsed = googleAuthSchema.safeParse(body)

    if (!parsed.success) {
      const errors = parsed.error.flatten().fieldErrors
      const firstError = Object.values(errors)[0]?.[0] ?? 'Invalid input'
      return NextResponse.json({ error: firstError }, { status: 400 })
    }

    const googleProfile = await verifyGoogleIdToken(parsed.data.credential)
    const existingGoogleUser = await prisma.user.findUnique({
      where: { googleId: googleProfile.googleId },
      select: { id: true, email: true, fullName: true },
    })

    const user = existingGoogleUser ?? await prisma.$transaction(async (tx) => {
      const existingEmailUser = await tx.user.findUnique({
        where: { email: googleProfile.email },
        select: { id: true, email: true, fullName: true, googleId: true },
      })

      if (existingEmailUser) {
        if (existingEmailUser.googleId && existingEmailUser.googleId !== googleProfile.googleId) {
          throw new Error('GOOGLE_ACCOUNT_CONFLICT')
        }

        return tx.user.update({
          where: { id: existingEmailUser.id },
          data: { googleId: googleProfile.googleId },
          select: { id: true, email: true, fullName: true },
        })
      }

      return tx.user.create({
        data: {
          email: googleProfile.email,
          fullName: googleProfile.fullName,
          googleId: googleProfile.googleId,
        },
        select: { id: true, email: true, fullName: true },
      })
    })

    const token = await createSessionToken(user.id, user.email)
    const response = NextResponse.json({ user }, { status: existingGoogleUser ? 200 : 201 })
    response.headers.set('Set-Cookie', getSessionCookieHeader(token))

    return response
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'GOOGLE_AUTH_NOT_CONFIGURED') {
        return NextResponse.json({ error: 'Google sign-in is not configured' }, { status: 503 })
      }

      if (error.message === 'INVALID_GOOGLE_ID_TOKEN') {
        return NextResponse.json({ error: 'Google sign-in failed. Please try again.' }, { status: 401 })
      }

      if (error.message === 'GOOGLE_ACCOUNT_CONFLICT') {
        return NextResponse.json({ error: 'This email is already linked to a different Google account' }, { status: 409 })
      }
    }

    console.error('Google auth error:', error)
    return NextResponse.json({ error: 'Google sign-in failed' }, { status: 500 })
  }
}