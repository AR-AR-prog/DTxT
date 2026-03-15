'use client'

import { AlertTriangle, CheckCircle2, XCircle } from 'lucide-react'

type StatusKind = 'correct' | 'incorrect' | 'lacks'

function getStatus(verdict: string): StatusKind {
  const v = verdict.toLowerCase()
  if (v.includes('highly credible') || v.includes('credible')) return 'correct'
  if (v.includes('not credible') || v.includes('low credibility')) return 'incorrect'
  return 'lacks'
}

function statusStyles(kind: StatusKind) {
  switch (kind) {
    case 'correct':
      return 'verdict-strong'
    case 'incorrect':
      return 'verdict-risk'
    default:
      return 'verdict-caution'
  }
}

function statusIcon(kind: StatusKind) {
  switch (kind) {
    case 'correct':
      return <CheckCircle2 className="w-3.5 h-3.5" />
    case 'incorrect':
      return <XCircle className="w-3.5 h-3.5" />
    default:
      return <AlertTriangle className="w-3.5 h-3.5" />
  }
}

function statusLabel(kind: StatusKind) {
  switch (kind) {
    case 'correct':
      return 'Strong credibility'
    case 'incorrect':
      return 'Needs scrutiny'
    default:
      return 'Insufficient support'
  }
}

function progressColor(score: number) {
  if (score >= 7) return 'bg-emerald-500'
  if (score >= 4) return 'bg-amber-500'
  return 'bg-[#8e5444]'
}

function confidenceBand(score: number) {
  if (score >= 8) return 'High confidence'
  if (score >= 6) return 'Measured confidence'
  if (score >= 4) return 'Mixed confidence'
  return 'Low confidence'
}

function reviewGuidance(score: number) {
  if (score >= 8) return 'Suitable for initial citation screening. Cross-check key claims for academic use.'
  if (score >= 6) return 'Use with context checks and at least one independent corroborating source.'
  if (score >= 4) return 'Treat as tentative. Validate major claims before referencing.'
  return 'Do not rely on this source without strong independent verification.'
}

interface ResultCardProps {
  analysis: {
    score: number
    summary: string
    reasoning: string
    verdict: string
    factors?: string[]
  }
}

export default function ResultCard({ analysis }: ResultCardProps) {
  const status = getStatus(analysis.verdict)
  const score = Math.min(10, Math.max(0, analysis.score))
  const segments = Array.from({ length: 10 }, (_, i) => i + 1)
  const band = confidenceBand(score)
  const guidance = reviewGuidance(score)

  return (
    <div className="editorial-shell animate-in fade-in slide-in-from-bottom-2 overflow-hidden rounded-2xl rounded-bl-md duration-500">
      <div className="border-b border-border/70 bg-[#f8f3ea]/80 px-4 py-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-foreground/45">Evidence brief</p>
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${statusStyles(status)}`}
          >
            {statusIcon(status)}
            {statusLabel(status)}
          </span>
        </div>
      </div>

      <div className="space-y-5 p-4 text-foreground">
        <div className="grid gap-2 sm:grid-cols-2">
          <div className="rounded-lg border border-border/70 bg-[#faf6ee] px-3 py-2">
            <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-foreground/45">Confidence band</p>
            <p className="mt-1 text-sm font-medium text-foreground/85">{band}</p>
          </div>
          <div className="rounded-lg border border-border/70 bg-white/80 px-3 py-2">
            <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-foreground/45">Review guidance</p>
            <p className="mt-1 text-xs leading-relaxed text-foreground/70">{guidance}</p>
          </div>
        </div>

        <div className="rounded-[1.2rem] border border-border/75 bg-[#faf6ee] p-3">
          <div className="mb-1 flex items-end justify-between gap-3">
            <span className="text-sm font-medium">Credibility score</span>
            <span className="font-serif text-3xl font-bold tabular-nums text-foreground">
              {score}
              <span className="ml-1 text-xs font-mono text-foreground/40">/10</span>
            </span>
          </div>
          <div className="flex items-center gap-1">
            {segments.map((seg) => (
              <div
                key={seg}
                className={`h-1.5 flex-1 rounded-sm transition-all duration-500 ${
                  seg <= score ? progressColor(score) : 'bg-border/70'
                }`}
                style={{ transitionDelay: `${seg * 35}ms` }}
              />
            ))}
          </div>
        </div>

        {analysis.verdict && (
          <div className="rounded-xl border border-border/70 bg-white/85 px-3 py-3">
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-foreground/45">Verdict line</p>
            <p className="mt-2 font-serif text-xl leading-snug text-foreground">{analysis.verdict}</p>
          </div>
        )}

        <div className="grid gap-3 sm:grid-cols-2">
          {analysis.summary && (
            <div className="rounded-xl border border-border/70 bg-white/85 p-3">
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-foreground/45">Summary</p>
              <p className="mt-2 text-sm leading-relaxed font-medium text-foreground/90">{analysis.summary}</p>
            </div>
          )}

          {analysis.reasoning && (
            <div className="rounded-xl border border-border/70 bg-[#f2f6f9] p-3">
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-foreground/45">Reasoning</p>
              <p className="mt-2 text-sm leading-relaxed text-foreground/80">{analysis.reasoning}</p>
            </div>
          )}
        </div>

        {analysis.factors && analysis.factors.length > 0 && (
          <div className="border-t border-border/70 pt-2">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-foreground/70">
              Counter-facts
            </p>
            <ul className="space-y-2 text-sm">
              {analysis.factors.map((f, i) => (
                <li key={i} className="flex gap-2.5 rounded-lg border border-border/75 bg-white/75 p-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#f2e7cf] text-[10px] font-bold text-[#7b5f33]">
                    {i + 1}
                  </span>
                  <span className="leading-relaxed text-foreground/85">{f}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {(!analysis.factors || analysis.factors.length === 0) && (
          <div className="border-t border-border/70 pt-2">
            <div className="rounded-lg border border-border/75 bg-white/75 px-3 py-3">
              <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-foreground/45">Counter-facts</p>
              <p className="mt-1 text-sm leading-relaxed text-foreground/72">
                No explicit counter-facts were surfaced for this source. Continue with manual corroboration if this will be cited.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
