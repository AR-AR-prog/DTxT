'use client'

import Link from 'next/link'
import type { ReactNode } from 'react'
import { User, CreditCard } from 'lucide-react'

interface ChatLayoutProps {
  user: { fullName: string; email: string }
  onLogout: () => void
  children: ReactNode
  inputSlot: ReactNode
  remaining: number
  limit: number
}

export default function ChatLayout({
  user,
  onLogout,
  children,
  inputSlot,
  remaining,
  limit,
}: ChatLayoutProps) {
  const displayName = user.fullName || user.email
  const used = limit - remaining
  const usagePercent = Math.min(100, (used / limit) * 100)
  const isLow = remaining <= 1 && remaining > 0
  const isAtLimit = remaining <= 0

  const counterColor = isAtLimit
    ? 'text-[#7a3e31]'
    : isLow
    ? 'text-[#7a5b2c]'
    : 'text-[#1f4d43]'

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      <header className="shrink-0 border-b border-border/80 bg-background/95 backdrop-blur-md px-4 py-3">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
          <div>
            <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-foreground/45">Verification desk</p>
            <h1 className="font-serif text-xl font-bold text-foreground">agpAIso Verify</h1>
            <p className="hidden text-xs text-foreground/52 sm:block">Forensic review mode for source credibility checks</p>
          </div>
        <div className="flex items-center gap-5">
          <Link
            href="/billing"
            title="View billing & plans"
            className={`focus-ring hidden min-h-10 sm:flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-full border transition ${
              isAtLimit
                ? 'verdict-risk'
                : isLow
                ? 'verdict-caution'
                : 'verdict-strong'
            }`}
          >
            <span className={`tabular-nums font-semibold ${counterColor}`}>{used}/{limit}</span>
            <span>searches</span>
            <span className="hidden md:inline text-current/80">· Resets 12:00 AM PHT</span>
            {isAtLimit && <span>· Upgrade</span>}
          </Link>

          <nav className="hidden sm:flex items-center gap-3">
            <Link
              href="/account"
              className="focus-ring inline-flex min-h-9 items-center gap-1 rounded-md px-2.5 py-1.5 text-xs text-foreground/65 transition hover:bg-secondary/75 hover:text-foreground"
            >
              <User className="w-3.5 h-3.5" />
              Account
            </Link>
            <Link
              href="/billing"
              className="focus-ring inline-flex min-h-9 items-center gap-1 rounded-md px-2.5 py-1.5 text-xs text-foreground/65 transition hover:bg-secondary/75 hover:text-foreground"
            >
              <CreditCard className="w-3.5 h-3.5" />
              Billing
            </Link>
          </nav>
          <div
            className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-medium text-white"
            aria-hidden
          >
            {displayName.charAt(0).toUpperCase()}
          </div>
          <button
            type="button"
            onClick={onLogout}
            className="focus-ring min-h-10 rounded-md px-2 text-sm font-medium text-foreground/70 transition hover:text-foreground"
          >
            Sign out
          </button>
        </div>
        </div>
        <div className="mx-auto mt-2 flex max-w-5xl items-center justify-between text-[10px] font-mono uppercase tracking-[0.16em] text-foreground/42 sm:hidden">
          <span>Usage</span>
          <span className={counterColor}>{used}/{limit}</span>
        </div>
      </header>

      <div className="h-1 w-full bg-border/80">
        <div
          className={`h-full transition-all duration-500 ${
            isAtLimit ? 'bg-[#7a3e31]' : isLow ? 'bg-[#9d7a3a]' : 'bg-primary'
          }`}
          style={{ width: `${usagePercent}%` }}
        />
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-2xl px-4 py-6 md:px-6 space-y-4">
          {children}
        </div>
      </div>

      <div className="shrink-0 border-t border-border/80 bg-background p-4 md:px-6">
        <div className="mx-auto max-w-2xl">{inputSlot}</div>
      </div>
    </div>
  )
}
