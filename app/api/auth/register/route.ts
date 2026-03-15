import { NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/db'
import { hashPassword, createSessionToken, getSessionCookieHeader } from '@/lib/auth'

const STRONG_PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/

const registerSchema = z.object({
  fullName: z.string().min(1, 'Full name is required').max(200),
  email: z.string().email('Invalid email address').toLowerCase(),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(STRONG_PASSWORD_REGEX, 'Password must contain at least one uppercase letter, one lowercase letter, and one special character'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const parsed = registerSchema.safeParse(body)

    if (!parsed.success) {
      const errors = parsed.error.flatten().fieldErrors
      const firstError = Object.values(errors)[0]?.[0] ?? 'Invalid input'
      return NextResponse.json({ error: firstError }, { status: 400 })
    }

    const { fullName, email, password } = parsed.data

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      const message = existing.googleId
        ? 'Email already registered. Use Google sign-in for this account.'
        : 'Email already registered'
      return NextResponse.json({ error: message }, { status: 400 })
    }

    const passwordHash = await hashPassword(password)

    const user = await prisma.user.create({
      data: { fullName, email, passwordHash },
      select: { id: true, email: true, fullName: true },
    })

    const token = await createSessionToken(user.id, user.email)
    const response = NextResponse.json({ user: { id: user.id, email: user.email, fullName: user.fullName } }, { status: 201 })
    response.headers.set('Set-Cookie', getSessionCookieHeader(token))

    return response
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 })
  }
}
