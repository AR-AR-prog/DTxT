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
        <div className="verdict-caution rounded-2xl border border-dashed px-4 py-3 flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-medium">You&apos;ve used all {user.apiUsageLimit} free searches</p>
            <p className="mt-0.5 text-xs">Searches reset every 12:00 AM Philippine Time (PHT). Upgrade to continue checking URLs now.</p>
          </div>
          <Link
            href="/billing"
            className="focus-ring shrink-0 rounded-full bg-primary px-4 py-2 text-xs font-medium text-primary-foreground transition hover:bg-secondary"
          >
            Upgrade
          </Link>
        </div>
      )}
      <div className={`flex items-center gap-3 rounded-[2rem] border border-dashed border-[#1A1A1A]/20 bg-white/10 backdrop-blur-2xl px-4 py-3 shadow-[0_8px_40px_rgba(0,0,0,0.06)] transition ${isLimitHit ? 'pointer-events-none opacity-50' : 'focus-within:border-[#1A1A1A]/30 focus-within:bg-white/20 focus-within:shadow-[0_12px_50px_rgba(0,0,0,0.08)]'}`}>
        <label htmlFor={inputId} className="sr-only">
          URL to analyze for credibility
        </label>
        <input
          id={inputId}
          type="url"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Paste any URL to run a credibility check…"
          disabled={isLimitHit}
          className="focus-ring min-w-0 flex-1 rounded-md bg-transparent px-2 py-2 font-mono text-[14px] text-foreground placeholder:text-foreground/35 outline-none disabled:cursor-not-allowed"
          aria-label="URL to analyze"
        />
        <button
          type="button"
          onClick={handleSend}
          disabled={isLoading || isLimitHit}
          className="focus-ring flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-foreground text-background transition hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:shadow-none"
          aria-label="Analyze URL"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
      <div className="flex items-center justify-between px-2 text-[9px] font-mono text-foreground/40">
        <span className="uppercase tracking-[0.3em]">Press ↵ Enter to analyze</span>
        <span className="uppercase tracking-[0.3em]">Evidence brief · Desk mode</span>
      </div>
    </div>
  )

  return (
    <ChatLayout user={user} onLogout={handleLogout} inputSlot={inputSlot} remaining={remaining} limit={user.apiUsageLimit}>
      <div className="min-h-50" role="log" aria-live="polite" aria-relevant="additions text">
        {messages.length === 0 && (
          <div className="py-6">
            <div className="rounded-3xl border border-dashed border-[#1A1A1A]/15 bg-white/50 backdrop-blur-xl p-8 text-center shadow-[0_8px_40px_rgba(0,0,0,0.04)]">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-dashed border-[#1A1A1A]/15 bg-white/80">
                <span className="font-serif text-2xl font-bold text-foreground">A</span>
              </div>
              <p className="text-[9px] font-mono uppercase tracking-[0.44em] text-foreground/40">Evidence brief generator</p>
              <h2 className="mb-2 mt-3 font-serif text-3xl text-foreground">Start your first credibility check</h2>
              <p className="mx-auto mb-6 max-w-md text-sm text-foreground/65 font-mono">
                Paste any public URL to receive a forensic evidence brief — score, verdict, summary, and counter-facts.
              </p>
              <div className="mx-auto mb-6 grid max-w-lg gap-2 text-left sm:grid-cols-3">
                <div className="rounded-2xl border border-dashed border-[#1A1A1A]/15 bg-white/70 px-4 py-3">
                  <p className="text-[9px] font-mono uppercase tracking-[0.44em] text-foreground/40">Score</p>
                  <p className="mt-1 text-xs text-foreground/65">0–10 credibility band.</p>
                </div>
                <div className="rounded-2xl border border-dashed border-[#1A1A1A]/15 bg-white/70 px-4 py-3">
                  <p className="text-[9px] font-mono uppercase tracking-[0.44em] text-foreground/40">Verdict</p>
                  <p className="mt-1 text-xs text-foreground/65">Standing line for source triage.</p>
                </div>
                <div className="rounded-2xl border border-dashed border-[#1A1A1A]/15 bg-white/70 px-4 py-3">
                  <p className="text-[9px] font-mono uppercase tracking-[0.44em] text-foreground/40">Counter-facts</p>
                  <p className="mt-1 text-xs text-foreground/65">Weak claims surfaced.</p>
                </div>
              </div>
              <div className="flex flex-wrap justify-center gap-2 mb-5">
                {suggestedUrls.map((url) => (
                  <button
                    key={url}
                    type="button"
                    onClick={() => setInputValue(url)}
                    className="focus-ring rounded-full border border-dashed border-[#1A1A1A]/15 bg-white/60 px-3 py-1.5 font-mono text-[10px] text-foreground/55 transition hover:bg-white/90 hover:text-foreground"
                  >
                    {url.replace('https://', '')}
                  </button>
                ))}
              </div>
              <p className="text-[10px] font-mono text-foreground/40 uppercase tracking-[0.3em]">
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
              <div key={m.id} className="flex justify-start">
                <div className="verdict-caution max-w-[85%] rounded-2xl rounded-bl-md border px-4 py-4 sm:max-w-[75%]">
                  <p className="mb-1 text-sm font-medium">Search limit reached</p>
                  <p className="mb-3 text-xs">
                    You&apos;ve used all {user.apiUsageLimit} free searches. Searches reset every 12:00 AM Philippine Time (PHT), or upgrade to continue now.
                  </p>
                  <Link
                    href="/billing"
                    className="focus-ring inline-block rounded-full bg-primary px-4 py-2 text-xs font-medium text-primary-foreground transition hover:bg-secondary"
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
