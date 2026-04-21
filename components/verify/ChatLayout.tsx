'use client'

import Link from 'next/link'
import type { ReactNode } from 'react'
import { User, CreditCard } from 'lucide-react'
import { motion } from 'framer-motion'
import BackgroundVideo from './BackgroundVideo'
import { useMouseParallax } from '@/hooks/useMouseParallax'

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
  const parallax = useMouseParallax(10)

  return (
    <div className="min-h-[100dvh] flex flex-col bg-[#FDFCFA] font-sans relative overflow-hidden">

      {/* ── Layer 0: Cinematic newspaper vortex video ── */}
      <BackgroundVideo />

      {/* ── Layer 1: Header glass capsule ── */}
      <header className="shrink-0 border-b border-dashed border-[#1A1A1A]/10 bg-white/20 backdrop-blur-2xl px-4 py-3 z-10 shadow-[0_1px_30px_rgba(0,0,0,0.04)]">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
          <div>
            <p className="text-[9px] font-mono uppercase tracking-[0.44em] text-foreground/40">Verification desk</p>
            <h1 className="font-serif text-xl font-bold text-foreground">agpAIso Verify</h1>
            <p className="hidden text-[11px] text-foreground/50 sm:block font-mono italic">Forensic review mode · source credibility checks</p>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/billing"
              title="View billing & plans"
              className="focus-ring hidden min-h-9 items-center gap-1.5 rounded-full border border-dashed border-[#1A1A1A]/20 bg-white/30 backdrop-blur-xl px-4 py-1.5 text-[11px] text-foreground transition hover:bg-white/50 sm:flex shadow-sm font-mono"
            >
              <span className="tabular-nums font-bold">{used}/{limit}</span>
              <span className="text-foreground/60">searches · Resets 12:00 AM</span>
              {isAtLimit && <span className="text-accent font-semibold">· Upgrade</span>}
            </Link>

            <nav className="hidden sm:flex items-center gap-1">
              <Link href="/" className="focus-ring inline-flex min-h-8 items-center gap-1.5 rounded-xl px-3 py-1.5 text-[11px] font-mono text-foreground/60 transition hover:bg-black/5 hover:text-foreground">
                Landing
              </Link>
              <Link href="/account" className="focus-ring inline-flex min-h-8 items-center gap-1.5 rounded-xl px-3 py-1.5 text-[11px] font-mono text-foreground/60 transition hover:bg-black/5 hover:text-foreground">
                <User className="w-3 h-3" />
                Account
              </Link>
              <Link href="/billing" className="focus-ring inline-flex min-h-8 items-center gap-1.5 rounded-xl px-3 py-1.5 text-[11px] font-mono text-foreground/60 transition hover:bg-black/5 hover:text-foreground">
                <CreditCard className="w-3 h-3" />
                Billing
              </Link>
            </nav>

            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground text-xs font-bold text-background shadow-md" aria-hidden>
              {displayName.charAt(0).toUpperCase()}
            </div>
            <button
              type="button"
              onClick={onLogout}
              className="focus-ring min-h-8 rounded-xl px-3 text-[11px] font-mono text-foreground/50 transition hover:text-foreground hover:bg-black/5"
            >
              Sign out
            </button>
          </div>
        </div>
        {/* Mobile usage */}
        <div className="mx-auto mt-1 flex max-w-5xl items-center justify-between text-[9px] font-mono uppercase tracking-[0.2em] text-foreground/50 sm:hidden">
          <span>Usage</span>
          <span className="text-foreground font-bold">{used}/{limit}</span>
        </div>
      </header>

      {/* Usage progress bar */}
      <div className="h-px w-full bg-[#1A1A1A]/5 z-10">
        <div
          className={`h-full transition-all duration-700 ease-out ${
            isAtLimit ? 'bg-red-400' : isLow ? 'bg-orange-400' : 'bg-foreground/25'
          }`}
          style={{ width: `${usagePercent}%` }}
        />
      </div>

      {/* ── Layer 2: Chat feed with mouse parallax ── */}
      <div className="flex-1 overflow-y-auto z-0 pb-10">
        <motion.div
          className="mx-auto w-full max-w-[48rem] px-4 py-8 md:px-6 space-y-5"
          animate={{
            x: parallax.x,
            y: parallax.y,
          }}
          transition={{ type: 'spring', stiffness: 80, damping: 22, mass: 0.5 }}
        >
          {children}
        </motion.div>
      </div>

      {/* ── Layer 3: Input capsule — more translucent glass ── */}
      <div className="shrink-0 z-10 px-4 pb-6 md:px-6">
        <motion.div
          className="mx-auto max-w-[48rem]"
          animate={{
            x: parallax.x * 0.5,
            y: parallax.y * 0.5,
          }}
          transition={{ type: 'spring', stiffness: 80, damping: 22, mass: 0.5 }}
        >
          {inputSlot}
        </motion.div>
      </div>
    </div>
  )
}
