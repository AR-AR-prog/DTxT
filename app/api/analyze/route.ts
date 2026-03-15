import { NextResponse } from 'next/server'
import { z } from 'zod'
import { getAuthenticatedUser, hasRemainingUsage, incrementUsage } from '@/lib/api-usage'
import { fetchArticleTitleAndContent } from '@/lib/fetch-article'
import { analyzeCredibilityWithGemini } from '@/lib/gemini'

const analyzeSchema = z.object({
  url: z.string().url('Invalid URL'),
})

export async function POST(request: Request) {
  const user = await getAuthenticatedUser(request)

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

  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    return NextResponse.json(
      { error: 'Credibility analysis is not configured' },
      { status: 503 }
    )
  }

  let title: string
  let content: string

  try {
    const fetched = await fetchArticleTitleAndContent(parsed.data.url)
    title = fetched.title
    content = fetched.content
  } catch (err) {
    const raw = err instanceof Error ? err.message : 'Failed to fetch URL'
    let userMessage = raw

    if (raw.includes('403')) {
      userMessage = 'This website blocked access to its content. Try pasting a direct article link, or use a site without bot protection (e.g. BBC, Reuters, AP, Wikipedia).'
    } else if (raw.includes('401')) {
      userMessage = 'This page requires a login or subscription. Try a publicly accessible article instead.'
    } else if (raw.includes('404')) {
      userMessage = 'This URL returned a 404 — the page was not found. Double-check the link and try again.'
    } else if (raw.includes('429')) {
      userMessage = 'This website is rate-limiting requests. Try again in a few moments.'
    } else if (raw.includes('timeout') || raw.includes('TimeoutError') || raw.includes('AbortError')) {
      userMessage = 'The request timed out — the website took too long to respond. Try a different URL.'
    } else if (raw.includes('ENOTFOUND') || raw.includes('ECONNREFUSED') || raw.includes('network')) {
      userMessage = 'Could not reach this URL. Check that the link is correct and the site is accessible.'
    }

    return NextResponse.json({ error: userMessage }, { status: 422 })
  }

  let analysis
  try {
    analysis = await analyzeCredibilityWithGemini(title, content, apiKey)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Analysis failed'
    const isDaily = message === 'DAILY_QUOTA_EXHAUSTED'
    const isRateLimit = message === 'RATE_LIMITED' || message.includes('429') || message.includes('RESOURCE_EXHAUSTED')
    console.error('Gemini analysis error:', err)
    return NextResponse.json(
      {
        error: isDaily
          ? 'The daily AI quota has been reached. Please try again tomorrow or contact support.'
          : isRateLimit
          ? 'The AI service is busy right now. Please wait about a minute and try again.'
          : message,
      },
      { status: isDaily || isRateLimit ? 429 : 502 }
    )
  }

  await incrementUsage(user.id)

  const remaining = user.apiUsageLimit - user.apiUsageCount - 1

  return NextResponse.json({
    success: true,
    url: parsed.data.url,
    title,
    analysis: {
      score: analysis.score,
      summary: analysis.summary,
      reasoning: analysis.reasoning,
      verdict: analysis.verdict,
      factors: analysis.factors,
    },
    remaining,
  })
}
