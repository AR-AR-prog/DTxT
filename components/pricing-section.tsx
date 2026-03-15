import { Check } from "lucide-react"
import Link from "next/link"

const plans = [
  {
    name: "FREE",
    label: "Free",
    price: "$0",
    period: "",
    description: "Perfect for occasional fact-checking.",
    features: [
      "50 URL checks per day",
      "Resets at 12:00 AM PHT",
      "AI-powered Gemini analysis",
      "Credibility score (0–10)",
      "Summary & reasoning",
      "Verdict classification",
    ],
    cta: "Get Started",
    href: "/register",
    highlight: false,
  },
  {
    name: "PRO",
    label: "Pro",
    price: "$9",
    period: "/mo",
    description: "For students and researchers who fact-check regularly.",
    features: [
      "200 URL checks per month",
      "AI-powered Gemini analysis",
      "Credibility score (0–10)",
      "Summary, reasoning & factors",
      "Counter-fact extraction",
      "Verdict classification",
      "Priority processing",
    ],
    cta: "Upgrade to Pro",
    href: "/billing",
    highlight: true,
  },
  {
    name: "UNLIMITED",
    label: "Unlimited",
    price: "$19",
    period: "/mo",
    description: "For journalists, researchers, and power users.",
    features: [
      "Unlimited URL checks",
      "AI-powered Gemini analysis",
      "Credibility score (0–10)",
      "Summary, reasoning & factors",
      "Counter-fact extraction",
      "Verdict classification",
      "Priority processing",
      "API access (coming soon)",
    ],
    cta: "Go Unlimited",
    href: "/billing",
    highlight: false,
  },
]

export default function PricingSection() {
  return (
    <section id="pricing" className="bg-secondary/28 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="section-kicker">Pricing</span>
            <h2 className="mt-4 max-w-md font-serif text-4xl leading-tight text-foreground md:text-5xl">
              Plans presented like a clear comparison, not a gimmick.
            </h2>
          </div>
          <p className="max-w-xs text-sm text-muted-foreground sm:text-right">
            Start free, compare quickly, and upgrade only when your workload demands more headroom.
          </p>
        </div>

        <div className="mb-8 grid gap-4 lg:grid-cols-[0.75fr_1.25fr]">
          <div className="rounded-[1.6rem] border border-dashed border-border/80 bg-[#faf5eb] p-5">
            <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground">Editorial note</p>
            <p className="mt-3 text-sm leading-relaxed text-foreground/68">
              Free remains a real product, not a crippled teaser. Paid plans expand capacity and speed while preserving the same core verification flow.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-[1.3rem] border border-border/75 bg-white/78 px-4 py-4">
              <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground">Free</p>
              <p className="mt-2 font-serif text-2xl text-foreground">50/day</p>
              <p className="mt-1 text-sm text-foreground/62">Resets at 12:00 AM PHT.</p>
            </div>
            <div className="rounded-[1.3rem] border border-border/75 bg-white/78 px-4 py-4">
              <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground">Pro</p>
              <p className="mt-2 font-serif text-2xl text-foreground">200/mo</p>
              <p className="mt-1 text-sm text-foreground/62">For repeat research and semester-long work.</p>
            </div>
            <div className="rounded-[1.3rem] border border-border/75 bg-white/78 px-4 py-4">
              <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground">Unlimited</p>
              <p className="mt-2 font-serif text-2xl text-foreground">No cap</p>
              <p className="mt-1 text-sm text-foreground/62">For desks with constant review volume.</p>
            </div>
          </div>
        </div>

        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`editorial-shell relative flex flex-col rounded-[1.7rem] p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_26px_52px_rgba(39,34,26,0.12)] ${
                plan.highlight ? "overflow-visible border-primary/70 ring-1 ring-primary/15" : ""
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-primary/15 bg-primary px-3 py-1 text-xs font-mono text-primary-foreground">
                  ◆ Recommended desk plan
                </div>
              )}

              <div className="mb-6 border-b border-border/70 pb-5">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-mono tracking-[0.22em] text-muted-foreground">{plan.name}</span>
                  <span className="rounded-full border border-border/70 bg-secondary/60 px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.16em] text-foreground/55">
                    {plan.label}
                  </span>
                </div>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="font-serif text-5xl font-bold">{plan.price}</span>
                  {plan.period && <span className="self-end pb-1 text-sm text-muted-foreground/80">{plan.period}</span>}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{plan.description}</p>
              </div>

              <div className="mb-6 flex-1 space-y-2.5">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-2.5">
                    <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accent/12">
                      <Check className="h-2.5 w-2.5 text-accent" />
                    </div>
                    <span className="text-sm text-foreground/80">{feature}</span>
                  </div>
                ))}
              </div>

              <Link
                href={plan.href}
                className={`focus-ring block min-h-11 w-full rounded-full py-3 text-center text-sm font-medium transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] ${
                  plan.highlight
                    ? "border border-accent/15 bg-accent text-accent-foreground shadow-[0_16px_34px_rgba(47,91,135,0.22)] hover:bg-accent/92"
                    : "border border-border bg-white/72 hover:bg-white"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
