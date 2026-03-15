/**
 * Fetches a URL and extracts title + main text content for credibility analysis.
 * Keeps a safe character limit to avoid token overflow.
 */

const MAX_CONTENT_LENGTH = 15000 // ~4k tokens, safe for free-tier Gemini

function stripHtml(html: string): string {
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function extractTitle(html: string): string {
  const match = html.match(/<title[^>]*>([^<]+)<\/title>/i)
  return match ? stripHtml(match[1]) : 'No title'
}

export async function fetchArticleTitleAndContent(url: string): Promise<{
  title: string
  content: string
}> {
  const res = await fetch(url, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (compatible; agpAIso/1.0; +https://agpaiso.com)',
    },
    signal: AbortSignal.timeout(10000),
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch URL: ${res.status} ${res.statusText}`)
  }

  const html = await res.text()
  const title = extractTitle(html)
  const fullText = stripHtml(html)
  const content =
    fullText.length > MAX_CONTENT_LENGTH
      ? fullText.slice(0, MAX_CONTENT_LENGTH) + '…'
      : fullText

  return { title, content: content || 'No extractable text.' }
}
