'use client'

import { useEffect, useState } from 'react'
import { AlertTriangle, CheckCircle2, XCircle, Fingerprint, Scale } from 'lucide-react'

type StatusKind = 'strong' | 'context' | 'review' | 'low' | 'not_credible'

const meterColors = [
  '#D05718', '#C87A1A', '#C87A1A', '#B89020',
  '#8FA020', '#5EA828', '#3AA042', '#27885C',
  '#1D6E4E', '#1D4432',
]

function getStatus(score: number): StatusKind {
  if (score >= 8) return 'strong'
  if (score >= 6) return 'context'
  if (score >= 4) return 'review'
  if (score >= 2) return 'low'
  return 'not_credible'
}

function statusStyles(kind: StatusKind) {
  switch (kind) {
    case 'strong': return 'verdict-strong'
    case 'context': return 'verdict-context'
    case 'review': return 'verdict-caution'
    case 'low': return 'verdict-low'
    case 'not_credible': return 'verdict-risk'
  }
}

function statusIcon(kind: StatusKind) {
  switch (kind) {
    case 'strong':
    case 'context':
      return <CheckCircle2 className="w-3.5 h-3.5" />
    case 'low':
    case 'not_credible':
      return <XCircle className="w-3.5 h-3.5" />
    case 'review':
      return <AlertTriangle className="w-3.5 h-3.5" />
  }
}

function statusLabel(kind: StatusKind) {
  switch (kind) {
    case 'strong': return 'Strong credibility'
    case 'context': return 'Credible with context'
    case 'review': return 'Review recommended'
    case 'low': return 'Low credibility'
    case 'not_credible': return 'Not credible'
  }
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
  const score = Math.min(10, Math.max(1, analysis.score))
  const status = getStatus(score)
  const segments = Array.from({ length: 10 }, (_, i) => i + 1)
  const band = confidenceBand(score)
  const guidance = reviewGuidance(score)
  const [animateMeter, setAnimateMeter] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setAnimateMeter(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="w-full">
      {/* Header bar */}
      <div className="border-b border-dashed border-[#1A1A1A]/10 bg-white/50 px-5 py-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Fingerprint className="w-3.5 h-3.5 text-foreground/30" />
            <p className="text-[9px] font-mono uppercase tracking-[0.44em] text-foreground/40">Evidence brief</p>
          </div>
          <span className={`inline-flex items-center gap-1.5 rounded border px-2.5 py-1 text-xs font-medium ${statusStyles(status)}`}>
            {statusIcon(status)}
            {statusLabel(status)}
          </span>
        </div>
      </div>

      <div className="space-y-4 p-5 text-foreground">

        {/* Score meter */}
        <div className="rounded-2xl border border-dashed border-[#1A1A1A]/10 bg-white/60 p-4">
          <div className="mb-2 flex items-end justify-between gap-3">
            <span className="text-[9px] font-mono uppercase tracking-[0.32em] text-foreground/50">Credibility score</span>
            <span className="font-serif text-4xl font-bold tabular-nums text-foreground">
              {score}
              <span className="ml-1 text-xs font-mono text-foreground/50">/10</span>
            </span>
          </div>
          <div className="flex items-center gap-1">
            {segments.map((seg) => (
              <div
                key={seg}
                className={`h-1.5 flex-1 rounded-sm transition-opacity duration-500`}
                style={{
                  backgroundColor: meterColors[seg - 1],
                  opacity: animateMeter ? (seg <= score ? 1 : 0.15) : 0.15,
                  transitionDelay: animateMeter ? `${seg * 40}ms` : '0ms',
                }}
              />
            ))}
          </div>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-[10px] text-foreground/50 font-mono">{band}</span>
            <span className="text-[10px] text-foreground/40 font-mono italic">{guidance}</span>
          </div>
        </div>

        {/* Verdict */}
        {analysis.verdict && (
          <div className="rounded-2xl border border-dashed border-[#1A1A1A]/10 bg-white/60 px-4 py-3">
            <div className="flex items-center gap-2 mb-1.5">
              <Scale className="w-3 h-3 text-foreground/30" />
              <p className="text-[9px] font-mono uppercase tracking-[0.44em] text-foreground/40">Verdict line</p>
            </div>
            <p className="font-serif text-xl leading-snug text-foreground">{analysis.verdict}</p>
          </div>
        )}

        {/* Summary + Reasoning */}
        <div className="grid gap-3 sm:grid-cols-2">
          {analysis.summary && (
            <div className="rounded-2xl border border-dashed border-[#1A1A1A]/10 bg-white/60 p-3">
              <p className="text-[9px] font-mono uppercase tracking-[0.44em] text-foreground/40 mb-1.5">Summary</p>
              <p className="text-sm leading-relaxed font-medium text-foreground">{analysis.summary}</p>
            </div>
          )}
          {analysis.reasoning && (
            <div className="rounded-2xl border border-dashed border-[#1A1A1A]/10 bg-white/60 p-3">
              <p className="text-[9px] font-mono uppercase tracking-[0.44em] text-foreground/40 mb-1.5">Reasoning</p>
              <p className="text-sm leading-relaxed text-foreground/85">{analysis.reasoning}</p>
            </div>
          )}
        </div>

        {/* Counter-facts */}
        {analysis.factors && analysis.factors.length > 0 ? (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Fingerprint className="w-3 h-3 text-foreground/30" />
              <p className="text-[9px] font-mono uppercase tracking-[0.44em] text-foreground/40">Counter-facts</p>
            </div>
            <ul className="space-y-2 text-sm">
              {analysis.factors.map((f, i) => (
                <li key={i} className="flex gap-2.5 rounded-2xl border border-dashed border-[#1A1A1A]/10 bg-white/60 p-3">
                  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-foreground/8 text-[9px] font-mono font-bold text-foreground/60">
                    {i + 1}
                  </span>
                  <span className="leading-relaxed text-foreground/90">{f}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-[#1A1A1A]/10 bg-white/60 px-4 py-3">
            <p className="text-[9px] font-mono uppercase tracking-[0.44em] text-foreground/40 mb-1">Counter-facts</p>
            <p className="text-sm leading-relaxed text-foreground/70">
              No explicit counter-facts surfaced. Continue with manual corroboration if citing this source.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
