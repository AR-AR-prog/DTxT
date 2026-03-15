const GEMINI_API_BASE = 'https://generativelanguage.googleapis.com/v1beta'

export interface CredibilityAnalysis {
  score: number
  summary: string
  reasoning: string
  verdict: string
  factors?: string[]
}

  const CREDIBILITY_PROMPT = `You are a credibility analyst. Given the title and main text of a web page, analyze its credibility (e.g. news, article, blog).

  Respond with a single JSON object only, no markdown, with these exact keys:
  - "score": number from 0 to 10 (10 = highly credible, 0 = not credible)
  - "summary": one short sentence summarizing credibility
  - "reasoning": 2-4 sentences explaining why
  - "verdict": one of: "Highly credible", "Credible", "Moderately credible", "Low credibility", "Not credible"
  - "factors": optional array of short strings (e.g. ["Author cited", "Claims unsourced"])`

interface GeminiErrorBody {
  error?: {
    code?: number
    message?: string
    status?: string
    details?: Array<Record<string, unknown>>
  }
}

function parseGemini429(errText: string): { retryMs: number; isDaily: boolean } {
  let body: GeminiErrorBody = {}
  try { body = JSON.parse(errText) as GeminiErrorBody } catch { /* raw text */ }

  console.error('[Gemini 429] Full error body:', JSON.stringify(body, null, 2))

  const details = (body.error?.details ?? []) as Array<Record<string, unknown>>

  // Extract RetryInfo delay if present
  const retryInfo = details.find((d) => typeof d['@type'] === 'string' && (d['@type'] as string).endsWith('RetryInfo'))
  const delaySec = retryInfo?.retryDelay
    ? parseInt(String(retryInfo.retryDelay).replace(/[^0-9]/g, ''), 10) || 0
    : 0

  // Check QuotaFailure violation quotaIds for per-day patterns
  const quotaFailure = details.find((d) => typeof d['@type'] === 'string' && (d['@type'] as string).endsWith('QuotaFailure'))
  const violations = (quotaFailure?.violations ?? []) as Array<{ quotaId?: string; quotaMetric?: string }>
  const isDailyByViolation = violations.some((v) =>
    /PerDay|per_day|per-day|Daily/i.test(v.quotaId ?? '') ||
    /PerDay|per_day|per-day|Daily/i.test(v.quotaMetric ?? '')
  )

  // A very long suggested retry (> 5 min) also means daily quota
  const isDailyByDelay = delaySec > 300

  const isDaily = isDailyByViolation || isDailyByDelay

  // Default to 65 s if Gemini provides no RetryInfo (covers the free-tier 1 RPM reset window)
  const retryMs = delaySec > 0 ? delaySec * 1000 : 65000

  return { retryMs, isDaily }
}

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function analyzeCredibilityWithGemini(
  title: string,
  content: string,
  apiKey: string
): Promise<CredibilityAnalysis> {
  const model = process.env.GEMINI_MODEL ?? 'gemini-2.0-flash-lite'
  const url = `${GEMINI_API_BASE}/models/${model}:generateContent?key=${encodeURIComponent(apiKey)}`

  const body = {
    contents: [
      {
        role: 'user',
        parts: [
          {
            text: `${CREDIBILITY_PROMPT}\n\n---\nTitle: ${title}\n\nContent:\n${content}`,
          },
        ],
      },
    ],
    generationConfig: {
      responseMimeType: 'application/json',
      temperature: 0.3,
      maxOutputTokens: 512,
    },
  }

  // One retry only — wait the suggested delay for per-minute limits.
  // If it still fails after one retry, it's almost certainly a daily quota issue.
  for (let attempt = 0; attempt <= 1; attempt++) {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(30000),
    })

    if (res.ok) {
      const data = (await res.json()) as {
        candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>
      }

      const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim()
      if (!rawText) throw new Error('Gemini returned no content')

      const text = rawText.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim()
      let parsed: CredibilityAnalysis
      try {
        parsed = JSON.parse(text) as CredibilityAnalysis
      } catch {
        throw new Error('Gemini returned invalid JSON')
      }

      if (typeof parsed.score !== 'number' || parsed.score < 0 || parsed.score > 10) {
        parsed.score = Math.min(10, Math.max(0, Number(parsed.score) || 5))
      }
      if (typeof parsed.summary !== 'string') parsed.summary = ''
      if (typeof parsed.reasoning !== 'string') parsed.reasoning = ''
      if (typeof parsed.verdict !== 'string') parsed.verdict = 'Unknown'

      return parsed
    }

    if (res.status === 429) {
      const errText = await res.text()
      const { retryMs, isDaily } = parseGemini429(errText)

      // Daily quota — no point waiting
      if (isDaily) throw new Error('DAILY_QUOTA_EXHAUSTED')

      // First attempt: wait the suggested delay then retry
      if (attempt === 0) {
        console.warn(`[Gemini] Rate limited, waiting ${retryMs}ms before retry…`)
        await sleep(Math.min(retryMs, 70000))
        continue
      }

      // Still rate-limited after waiting — let the user know to retry manually
      throw new Error('RATE_LIMITED')
    }

    // Any other non-OK status
    const errText = await res.text()
    throw new Error(`Gemini API error: ${res.status} ${errText}`)
  }

  throw new Error('DAILY_QUOTA_EXHAUSTED')
}
