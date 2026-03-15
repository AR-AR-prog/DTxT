'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import ChatLayout from './ChatLayout'
import MessageBubble from './MessageBubble'
import TypingDots from './TypingDots'

type Message =
  | { id: string; type: 'user'; content: string; createdAt: number }
  | {
      id: string
      type: 'ai'
      createdAt: number
      analysis?: {
        score: number
        summary: string
        reasoning: string
        verdict: string
        factors?: string[]
      }
      error?: string
      limitReached?: boolean
    }
  | { id: string; type: 'typing'; createdAt: number }

interface VerifyClientProps {
  user: { fullName: string; email: string; apiUsageCount: number; apiUsageLimit: number }
}

export default function VerifyClient({ user }: VerifyClientProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [remaining, setRemaining] = useState(
    Math.max(0, user.apiUsageLimit - user.apiUsageCount)
  )
  const scrollBottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollBottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const formatTime = (value: number) =>
    new Date(value).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

  const getDomainLabel = (urlString: string) => {
    try {
      return new URL(urlString).hostname.replace(/^www\./, '')
    } catch {
      return 'source'
    }
  }

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' })
    window.location.href = '/'
  }

  const handleSend = async () => {
    const url = inputValue.trim()
    if (!url || isLoading) return

    try {
      new URL(url)
    } catch {
      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), type: 'ai', error: 'Please enter a valid URL.', createdAt: Date.now() },
      ])
      return
    }

    setInputValue('')
    setIsLoading(true)

    const userMsgId = crypto.randomUUID()
    const typingId = crypto.randomUUID()

    setMessages((prev) => [
      ...prev,
      { id: userMsgId, type: 'user', content: url, createdAt: Date.now() },
      { id: typingId, type: 'typing', createdAt: Date.now() },
    ])

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
        credentials: 'include',
      })
      const data = await res.json()

      if (res.ok && data.analysis) {
        setRemaining(typeof data.remaining === 'number' ? data.remaining : 0)
      }

      const isLimitReached = res.status === 403

      setMessages((prev) =>
        prev
          .filter((m) => m.id !== typingId)
          .concat({
            id: crypto.randomUUID(),
            type: 'ai',
            createdAt: Date.now(),
            ...(res.ok && data.analysis
              ? { analysis: data.analysis }
              : {
                  error: isLimitReached
                    ? undefined
                    : data.error || 'Analysis failed',
                  limitReached: isLimitReached,
                }),
          })
      )
    } catch {
      setMessages((prev) =>
        prev
          .filter((m) => m.id !== typingId)
          .concat({
            id: crypto.randomUUID(),
            type: 'ai',
            error: 'Something went wrong. Please try again.',
            createdAt: Date.now(),
          })
      )
    } finally {
      setIsLoading(false)
    }
  }

  const isLimitHit = remaining <= 0
  const suggestedUrls = [
    'https://www.bbc.com/news',
    'https://apnews.com',
    'https://en.wikipedia.org/wiki/Misinformation',
  ]

  const inputId = 'verify-url-input'

  const inputSlot = (
    <div className="space-y-2">
      {isLimitHit && (
        <div className="verdict-caution rounded-xl border px-4 py-3 flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold">You&apos;ve used all {user.apiUsageLimit} free searches</p>
            <p className="mt-0.5 text-xs">Searches reset every 12:00 AM Philippine Time (PHT). Upgrade your plan to continue checking URLs now.</p>
          </div>
          <Link
            href="/billing"
            className="focus-ring shrink-0 rounded-full bg-primary px-4 py-2 text-xs font-medium text-white transition hover:bg-primary/90"
          >
            Upgrade
          </Link>
        </div>
      )}
      <div className={`editorial-shell flex items-center gap-3 rounded-2xl px-4 py-2.5 transition ${isLimitHit ? 'pointer-events-none opacity-50' : 'focus-within:border-primary/70 focus-within:ring-2 focus-within:ring-primary/35'}`}>
        <label htmlFor={inputId} className="sr-only">
          URL to analyze for credibility
        </label>
        <input
          id={inputId}
          type="url"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Paste a URL to analyze credibility..."
          disabled={isLimitHit}
          className="focus-ring min-w-0 flex-1 rounded-md bg-transparent px-1 py-2 font-mono text-sm text-foreground placeholder:text-foreground/58 outline-none disabled:cursor-not-allowed"
          aria-label="URL to analyze"
        />
        <button
          type="button"
          onClick={handleSend}
          disabled={isLoading || isLimitHit}
          className="focus-ring flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent text-white transition hover:bg-accent/85 disabled:opacity-50"
          aria-label="Analyze URL"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
      <div className="flex items-center justify-between px-1 text-[11px] text-foreground/48">
        <span>Press Enter to run a credibility check</span>
        <span className="font-mono uppercase tracking-[0.14em]">Desk mode: evidence brief</span>
      </div>
    </div>
  )

  return (
    <ChatLayout user={user} onLogout={handleLogout} inputSlot={inputSlot} remaining={remaining} limit={user.apiUsageLimit}>
      <div className="min-h-50" role="log" aria-live="polite" aria-relevant="additions text">
        {messages.length === 0 && (
          <div className="py-8">
            <div className="editorial-shell rounded-2xl p-6 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-primary/20 bg-primary/10">
                <span className="font-serif text-xl font-bold text-primary">A</span>
              </div>
              <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-foreground/45">Evidence brief generator</p>
              <h2 className="mb-2 mt-3 font-serif text-2xl text-foreground">Start your first credibility check</h2>
              <p className="mx-auto mb-5 max-w-md text-sm text-foreground/55">
                Paste any public URL to get a score, verdict, summary, and counter-facts.
              </p>
              <div className="mx-auto mb-5 grid max-w-lg gap-2 text-left sm:grid-cols-3">
                <div className="rounded-xl border border-border/70 bg-[#faf6ee] px-3 py-2">
                  <p className="text-[10px] font-mono uppercase tracking-[0.16em] text-foreground/45">Score</p>
                  <p className="mt-1 text-xs text-foreground/68">0-10 credibility band with readable context.</p>
                </div>
                <div className="rounded-xl border border-border/70 bg-white/80 px-3 py-2">
                  <p className="text-[10px] font-mono uppercase tracking-[0.16em] text-foreground/45">Verdict</p>
                  <p className="mt-1 text-xs text-foreground/68">Clear standing line for faster source triage.</p>
                </div>
                <div className="rounded-xl border border-border/70 bg-[#f2f6f9] px-3 py-2">
                  <p className="text-[10px] font-mono uppercase tracking-[0.16em] text-foreground/45">Counter-facts</p>
                  <p className="mt-1 text-xs text-foreground/68">Specific weak claims surfaced for review.</p>
                </div>
              </div>
              <div className="flex flex-wrap justify-center gap-2 mb-4">
                {suggestedUrls.map((url) => (
                  <button
                    key={url}
                    type="button"
                    onClick={() => setInputValue(url)}
                    className="focus-ring rounded-full border border-border/75 bg-secondary/55 px-3 py-1.5 font-mono text-[11px] text-foreground/65 transition hover:bg-secondary hover:text-foreground"
                  >
                    {url.replace('https://', '')}
                  </button>
                ))}
              </div>
              <p className="text-xs text-foreground/40">
                {remaining} of {user.apiUsageLimit} checks remaining today
              </p>
            </div>
          </div>
        )}
        {messages.map((m) => {
          if (m.type === 'typing') return <TypingDots key={m.id} />
          if (m.type === 'user') {
            return (
              <MessageBubble
                key={m.id}
                type="user"
                content={m.content}
                domainLabel={getDomainLabel(m.content)}
                timestampLabel={formatTime(m.createdAt)}
              />
            )
          }
          if (m.type === 'ai' && m.limitReached) {
            return (
              <div key={m.id} className="flex justify-start animate-in fade-in duration-300">
                <div className="verdict-caution max-w-[85%] rounded-2xl rounded-bl-md border px-4 py-4 sm:max-w-[75%]">
                  <p className="mb-1 text-sm font-semibold">Search limit reached</p>
                  <p className="mb-3 text-xs">
                    You&apos;ve used all {user.apiUsageLimit} free searches. Searches reset every 12:00 AM Philippine Time (PHT), or upgrade to continue now.
                  </p>
                  <Link
                    href="/billing"
                    className="focus-ring inline-block rounded-full bg-primary px-4 py-2 text-xs font-medium text-white transition hover:bg-primary/90"
                  >
                    View Plans →
                  </Link>
                </div>
              </div>
            )
          }
          return (
            <MessageBubble
              key={m.id}
              type="ai"
              analysis={m.analysis}
              error={m.error}
              timestampLabel={formatTime(m.createdAt)}
            />
          )
        })}
        <div ref={scrollBottomRef} />
      </div>
    </ChatLayout>
  )
}
