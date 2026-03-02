import { NextResponse } from 'next/server'
import { z } from 'zod'
import { getAuthenticatedUser, hasRemainingUsage, incrementUsage } from '@/lib/api-usage'

const analyzeSchema = z.object({
  url: z.string().url('Invalid URL'),
})

export async function POST(request: Request) {
  const user = await getAuthenticatedUser()

  if (!user) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
  }

  if (!hasRemainingUsage(user)) {
    return NextResponse.json(
      {
        error: 'API usage limit reached',
        apiUsageCount: user.apiUsageCount,
        apiUsageLimit: user.apiUsageLimit,
      },
      { status: 403 }
    )
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const parsed = analyzeSchema.safeParse(body)
  if (!parsed.success) {
    const firstError = parsed.error.flatten().fieldErrors.url?.[0] ?? 'Invalid input'
    return NextResponse.json({ error: firstError }, { status: 400 })
  }

  await incrementUsage(user.id)

  return NextResponse.json({
    success: true,
    url: parsed.data.url,
    message: 'URL analysis request recorded (mock - no external API call)',
    remaining: user.apiUsageLimit - user.apiUsageCount - 1,
  })
}
