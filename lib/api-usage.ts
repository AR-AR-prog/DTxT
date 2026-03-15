import { cookies, headers } from 'next/headers'
import { prisma } from '@/lib/db'
import { verifySessionToken, COOKIE_NAME } from '@/lib/auth'

export interface AuthenticatedUser {
  id: string
  email: string
  fullName: string
  apiUsageCount: number
  apiUsageLimit: number
  apiUsageResetAt: Date | null
}

const PHILIPPINES_UTC_OFFSET_HOURS = 8

function readCookieValue(cookieHeader: string | null, cookieName: string): string | null {
  if (!cookieHeader) return null

  const segments = cookieHeader.split(';')
  for (const segment of segments) {
    const [key, ...rest] = segment.trim().split('=')
    if (key === cookieName) {
      return rest.join('=')
    }
  }

  return null
}

function getPhilippineDayKey(date: Date): string {
  const shifted = new Date(date.getTime() + PHILIPPINES_UTC_OFFSET_HOURS * 60 * 60 * 1000)
  const year = shifted.getUTCFullYear()
  const month = String(shifted.getUTCMonth() + 1).padStart(2, '0')
  const day = String(shifted.getUTCDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

function getStartOfCurrentPhilippineDay(now = new Date()): Date {
  const shifted = new Date(now.getTime() + PHILIPPINES_UTC_OFFSET_HOURS * 60 * 60 * 1000)
  return new Date(
    Date.UTC(
      shifted.getUTCFullYear(),
      shifted.getUTCMonth(),
      shifted.getUTCDate(),
      -PHILIPPINES_UTC_OFFSET_HOURS
    )
  )
}

function shouldResetDailyUsage(resetAt: Date | null, now = new Date()): boolean {
  if (!resetAt) {
    return true
  }

  return getPhilippineDayKey(resetAt) !== getPhilippineDayKey(now)
}

async function normalizeDailyUsage(user: AuthenticatedUser): Promise<AuthenticatedUser> {
  if (!shouldResetDailyUsage(user.apiUsageResetAt)) {
    return user
  }

  return prisma.user.update({
    where: { id: user.id },
    data: {
      apiUsageCount: 0,
      apiUsageResetAt: getStartOfCurrentPhilippineDay(),
    },
    select: {
      id: true,
      email: true,
      fullName: true,
      apiUsageCount: true,
      apiUsageLimit: true,
      apiUsageResetAt: true,
    },
  })
}

async function getSessionToken(request?: Request): Promise<string | null> {
  const fromRequestHeader = request
    ? readCookieValue(request.headers.get('cookie'), COOKIE_NAME)
    : null

  if (fromRequestHeader) {
    return fromRequestHeader
  }

  const headerStore = await headers()
  const fromHeaderStore = readCookieValue(headerStore.get('cookie'), COOKIE_NAME)
  if (fromHeaderStore) {
    return fromHeaderStore
  }

  const cookieStore = await cookies()
  return cookieStore.get(COOKIE_NAME)?.value ?? null
}

export async function getAuthenticatedUserFromToken(token: string): Promise<AuthenticatedUser | null> {
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
      apiUsageResetAt: true,
    },
  })

  if (!user) {
    return null
  }

  return normalizeDailyUsage(user)
}

export async function getAuthenticatedUser(request?: Request): Promise<AuthenticatedUser | null> {
  const token = await getSessionToken(request)

  if (!token) return null

  return getAuthenticatedUserFromToken(token)
}

export function hasRemainingUsage(user: AuthenticatedUser): boolean {
  return user.apiUsageCount < user.apiUsageLimit
}

export async function incrementUsage(userId: string): Promise<void> {
  await prisma.user.update({
    where: { id: userId },
    data: {
      apiUsageCount: { increment: 1 },
      apiUsageResetAt: getStartOfCurrentPhilippineDay(),
    },
  })
}
