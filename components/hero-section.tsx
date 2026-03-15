'use client'

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const stats = [
  { label: "Free checks/day", value: "50" },
  { label: "AI model", value: "Gemini" },
  { label: "Avg. analysis time", value: "< 5 s" },
  { label: "Verdict types", value: "5" },
]

export default function HeroSection() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null)

  useEffect(() => {
    fetch("/api/auth/me", { credentials: "include" })
      .then((r) => r.json())
      .then((data) => setIsLoggedIn(!!data?.user))
      .catch(() => setIsLoggedIn(false))
  }, [])

  return (
    <section className="overflow-hidden px-4 pb-12 pt-20 sm:px-6 sm:pb-14 sm:pt-24 lg:px-8 lg:pt-24">
      <div className="mx-auto max-w-7xl">
        <div className="editorial-shell rounded-4xl px-5 py-6 sm:px-8 sm:py-7 lg:px-10 lg:py-8">
          <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-linear-to-r from-transparent via-primary/40 to-transparent" />
          <div className="pointer-events-none absolute -left-20 top-20 h-48 w-48 rounded-full bg-accent/7 blur-3xl" />
          <div className="pointer-events-none absolute -right-24 bottom-14 h-56 w-56 rounded-full bg-primary/8 blur-3xl" />
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(380px,0.95fr)] lg:items-start">
            <div className="space-y-6">
            <div
              className="section-kicker animate-in fade-in slide-in-from-bottom-3 duration-500"
              style={{ animationDelay: "0ms" }}
            >
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary"></span>
              Editorial AI workspace · CCIS project
            </div>

            <div className="space-y-5">
              <h1
                className="max-w-3xl font-serif text-4xl leading-tight text-balance text-foreground sm:text-[3.1rem] lg:text-[3.35rem] xl:text-6xl 2xl:text-7xl animate-in fade-in slide-in-from-bottom-4 duration-500"
                style={{ animationDelay: "60ms" }}
              >
                Scrutinize every link like it belongs on the record.
              </h1>
              <p
                className="max-w-xl text-base leading-relaxed text-foreground/62 sm:text-lg animate-in fade-in slide-in-from-bottom-4 duration-500"
                style={{ animationDelay: "120ms" }}
              >
                agpAIso turns raw URLs into credibility briefs with score, verdict, reasoning, and counter-facts in seconds. Designed for students who need calm, fast, evidence-aware decisions.
              </p>
              <p className="short-vp-hide max-w-xl border-l-2 border-primary/35 pl-4 text-sm leading-relaxed text-foreground/58">
                Built with an editorial reading flow: claim, evidence, friction points, then a final standing.
              </p>
            </div>

            <div
              className="grid gap-3 rounded-[1.75rem] border border-border/80 bg-secondary/45 p-3.5 sm:grid-cols-[1.2fr_0.8fr] animate-in fade-in slide-in-from-bottom-4 duration-500"
              style={{ animationDelay: "170ms" }}
            >
              <div className="rounded-[1.4rem] border border-border/80 bg-white/88 p-4 shadow-[0_18px_38px_rgba(40,34,27,0.08)]">
                <div className="flex items-center justify-between gap-3 border-b border-border/70 pb-3">
                  <div>
                    <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-foreground/42">Edition 03 · Research desk</p>
                    <p className="mt-2 font-serif text-xl leading-tight text-foreground">Built for trust, scrutiny, and source review.</p>
                  </div>
                  <div className="rounded-full border border-border/80 bg-secondary px-3 py-1 text-[11px] font-mono uppercase tracking-[0.18em] text-foreground/55">
                    Live
                  </div>
                </div>
                <div className="grid gap-3 pt-3 sm:grid-cols-3">
                  {stats.slice(0, 3).map((stat) => (
                    <div key={stat.label} className="rounded-2xl border border-border/70 bg-[#fcfaf5] px-4 py-3">
                      <p className="text-[11px] uppercase tracking-[0.16em] text-foreground/45">{stat.label}</p>
                      <p className="mt-2 font-serif text-2xl text-foreground">{stat.value}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="paper-grid rounded-[1.4rem] border border-dashed border-border/80 bg-[#f7f1e7] p-4">
                <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-foreground/45">Why it matters</p>
                <ul className="mt-4 space-y-3 text-sm leading-relaxed text-foreground/68">
                  <li>Move from “looks believable” to evidence-backed confidence.</li>
                  <li>Reduce time spent manually cross-checking thin or viral sources.</li>
                  <li>Keep citation decisions grounded in structured reasoning, not guesswork.</li>
                </ul>
                <div className="mt-5 rounded-2xl border border-border/70 bg-white/80 px-4 py-3">
                  <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-foreground/40">Verdict types</p>
                  <p className="mt-2 font-serif text-xl text-foreground">{stats[3].value}</p>
                </div>
              </div>
            </div>

            <div
              className="flex flex-col gap-3 sm:flex-row animate-in fade-in slide-in-from-bottom-4 duration-500"
              style={{ animationDelay: "200ms" }}
            >
              <Link href={isLoggedIn === true ? "/verify" : "/register"} className="w-full sm:w-auto">
                <Button size="lg" className="focus-ring min-h-11 w-full rounded-full border border-accent/20 bg-accent px-8 text-accent-foreground shadow-[0_16px_36px_rgba(47,91,135,0.25)] transition-all duration-200 hover:scale-[1.02] hover:bg-accent/92 active:scale-[0.98]">
                  Open the verification desk
                </Button>
              </Link>
              {isLoggedIn !== true && (
                <Link href="/login" className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="focus-ring min-h-11 w-full rounded-full border-border/80 bg-white/80 px-8 transition-all duration-200 hover:scale-[1.02] hover:bg-white active:scale-[0.98]">
                    Sign in to continue
                  </Button>
                </Link>
              )}
            </div>

            <div
              className="short-vp-hide grid gap-3 text-sm text-foreground/62 sm:grid-cols-3 animate-in fade-in slide-in-from-bottom-4 duration-500"
              style={{ animationDelay: "280ms" }}
            >
              <div className="rounded-2xl border border-border/80 bg-white/78 px-4 py-3">
                <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-foreground/45">Research promise</p>
                <p className="mt-2 leading-relaxed">Readable verdicts, preserved nuance, and visible reasons for every score.</p>
              </div>
              <div className="rounded-2xl border border-border/80 bg-white/78 px-4 py-3">
                <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-foreground/45">Designed for</p>
                <p className="mt-2 leading-relaxed">Citation checks, newsroom triage, debate prep, and source vetting during thesis work.</p>
              </div>
              <div className="rounded-2xl border border-border/80 bg-white/78 px-4 py-3">
                <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-foreground/45">Response profile</p>
                <p className="mt-2 leading-relaxed">Fast enough for daily use, serious enough to slow you down when a source needs scrutiny.</p>
              </div>
            </div>

            <div className="short-vp-hide ink-rule" />

            <div className="short-vp-hide flex flex-wrap gap-2 text-[11px] text-foreground/55">
              <span className="rounded-full border border-border/70 bg-white/75 px-3 py-1.5">Designed for mobile reading</span>
              <span className="rounded-full border border-border/70 bg-white/75 px-3 py-1.5">Evidence-first summaries</span>
              <span className="rounded-full border border-border/70 bg-white/75 px-3 py-1.5">No dashboard overload</span>
            </div>
          </div>

          <div
            className="relative animate-in fade-in slide-in-from-bottom-4 duration-700 lg:max-h-[66vh] lg:overflow-y-auto lg:pr-1"
            style={{ animationDelay: "150ms" }}
          >
            <div className="rounded-4xl border border-border/80 bg-[#fcfaf5] p-4 shadow-[0_28px_62px_rgba(39,34,26,0.12)] sm:p-6">
              <div className="rounded-3xl border border-border/80 bg-white p-5 shadow-[0_14px_28px_rgba(41,36,27,0.06)]">
                <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border/70 pb-4">
                  <div>
                    <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-foreground/42">Credibility brief preview</p>
                    <h2 className="mt-2 font-serif text-2xl leading-tight text-foreground sm:text-[2rem]">
                      A result surface that reads like an evidence memo.
                    </h2>
                  </div>
                  <div className="rounded-2xl border border-[#cfdccf] bg-[#edf4ef] px-4 py-3 text-right">
                    <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-primary/70">Standing</p>
                    <p className="mt-2 font-serif text-3xl text-primary">8.5</p>
                    <p className="text-xs text-foreground/55">High credibility</p>
                  </div>
                </div>

                <div className="grid gap-4 pt-5 lg:grid-cols-[1.25fr_0.75fr]">
                  <div className="space-y-4">
                    <div className="rounded-[1.3rem] border border-border/75 bg-[#f8f4ec] p-4">
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-foreground/42">Source under review</p>
                        <span className="rounded-full border border-border/70 bg-white px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.16em] text-foreground/55">
                          4.8 sec avg
                        </span>
                      </div>
                      <p className="mt-3 font-serif text-xl leading-snug text-foreground">Campus misinformation thread fact-checked against original institutional notices.</p>
                      <p className="mt-2 text-sm leading-relaxed text-foreground/65">
                        Summary, reasoning, and counter-facts are broken into sections so weak sourcing and missing context are easy to scan.
                      </p>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="rounded-[1.2rem] border border-border/70 bg-white p-4">
                        <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-foreground/42">Counter-facts</p>
                        <ul className="mt-3 space-y-2 text-sm leading-relaxed text-foreground/68">
                          <li>Screenshot date conflicts with the claimed publication timeline.</li>
                          <li>Post removes the original institutional statement that changes meaning.</li>
                        </ul>
                      </div>
                      <div className="rounded-[1.2rem] border border-border/75 bg-[#f3f7fb] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.55)]">
                        <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-foreground/58">Reasoning trace</p>
                        <ul className="mt-3 space-y-2 text-sm leading-relaxed text-foreground/68">
                          <li>Author and publication metadata are visible and consistent.</li>
                          <li>Source claims align with traceable primary references.</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="rounded-[1.2rem] border border-border/70 bg-secondary/55 p-4">
                      <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-foreground/42">Verdict line</p>
                      <p className="mt-2 font-serif text-2xl text-foreground">Credible, with context preserved.</p>
                    </div>
                    <div className="rounded-[1.2rem] border border-border/70 bg-white p-4">
                      <div className="flex justify-between text-xs text-foreground/58">
                        <span>Credibility meter</span>
                        <span className="font-mono text-primary">85/100</span>
                      </div>
                      <div className="mt-3 h-2 rounded-full bg-muted/70">
                        <div className="h-full w-[85%] rounded-full bg-linear-to-r from-primary to-accent" />
                      </div>
                    </div>
                    <div className="rounded-[1.2rem] border border-dashed border-border/80 bg-[#faf7f1] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.55)]">
                      <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-foreground/58">Desk note</p>
                      <p className="mt-2 text-sm leading-relaxed text-foreground/66">The interface keeps technical detail visible without turning analysis into a dashboard. The emphasis stays on reading and judging.</p>
                    </div>
                  </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  )
}
