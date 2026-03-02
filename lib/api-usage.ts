import { cookies } from 'next/headers'
import { prisma } from '@/lib/db'
import { verifySessionToken, COOKIE_NAME } from '@/lib/auth'

export interface AuthenticatedUser {
  id: string
  email: string
  fullName: string
  apiUsageCount: number
  apiUsageLimit: number
}

export async function getAuthenticatedUser(): Promise<AuthenticatedUser | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value

  if (!token) return null

  const payload = await verifySessionToken(token)
  if (!payload) return null

  const user = await prisma.user.findUnique({
    where: { id: payload.sub },
    select: {
      id: true,
      email: true,
      fullName: true,
      apiUsageCount: true,
      apiUsageLimit: true,
    },
  })

  return user
}

export function hasRemainingUsage(user: AuthenticatedUser): boolean {
  return user.apiUsageCount < user.apiUsageLimit
}

export async function incrementUsage(userId: string): Promise<void> {
  await prisma.user.update({
    where: { id: userId },
    data: { apiUsageCount: { increment: 1 } },
  })
}
