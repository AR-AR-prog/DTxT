'use client'

import { Check } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

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
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  }

  return (
    <section id="pricing" className="relative h-full w-full flex flex-col justify-center items-center overflow-hidden text-white border-y border-white/5 py-4">
      <div className="absolute inset-0 -z-10 bg-[#0a0a0a] overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.5 }}
          viewport={{ once: true }}
          transition={{ duration: 2 }}
          className="absolute top-[-20%] right-[-10%] w-[100%] h-[100%] rounded-full bg-indigo-600/20 blur-[120px] pointer-events-none"
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="mx-auto w-full max-w-7xl px-6"
      >
        {/* Header row */}
        <motion.div variants={itemVariants} className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between relative z-10">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md px-3 py-1 text-[10px] font-mono uppercase tracking-[0.26em] text-white/80">Pricing</span>
            <h2 className="mt-2 max-w-md font-serif text-3xl leading-tight text-white md:text-4xl">
              Simple, transparent pricing. No surprises.
            </h2>
          </div>
          <p className="max-w-xs text-xs text-white/60 sm:text-right font-sans">
            Start free, compare quickly, and upgrade only when your workload demands more headroom.
          </p>
        </motion.div>

        {/* Stats summary row */}
        <motion.div variants={itemVariants} className="mb-4 grid gap-3 lg:grid-cols-[0.7fr_1.3fr] relative z-10">
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md px-4 py-3 shadow-sm">
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/60">Editorial note</p>
            <p className="mt-1 text-xs leading-relaxed text-white/70 font-sans">
              Free remains a real product, not a crippled teaser. Paid plans expand capacity while preserving the same core verification flow.
            </p>
          </div>
          <div className="grid gap-2 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md px-4 py-3 shadow-sm">
              <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/60">Free</p>
              <p className="mt-1 font-serif text-xl text-white font-bold">50/day</p>
              <p className="text-[11px] text-white/50 font-sans">Resets 12:00 AM PHT.</p>
            </div>
            <div className="rounded-2xl border border-indigo-500/20 bg-indigo-500/10 backdrop-blur-md px-4 py-3 shadow-[0_0_15px_rgba(79,70,229,0.12)]">
              <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-indigo-300">Pro</p>
              <p className="mt-1 font-serif text-xl text-white font-bold">200/mo</p>
              <p className="text-[11px] text-indigo-200/50 font-sans">Repeat research.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md px-4 py-3 shadow-sm">
              <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/60">Unlimited</p>
              <p className="mt-1 font-serif text-xl text-white font-bold">No cap</p>
              <p className="text-[11px] text-white/50 font-sans">Constant review volume.</p>
            </div>
          </div>
        </motion.div>

        {/* Plan cards */}
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3 relative z-10">
          {plans.map((plan) => (
            <motion.div
              variants={itemVariants}
              key={plan.name}
              className={`relative flex flex-col rounded-[1.5rem] p-5 transition-all duration-300 hover:-translate-y-1 backdrop-blur-xl ${plan.highlight
                  ? "border-2 border-indigo-500/30 bg-[#120F1A] shadow-[0_0_30px_rgba(79,70,229,0.15)]"
                  : "border border-white/10 bg-white/5 shadow-lg"
                }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-indigo-500/30 bg-indigo-600 px-4 py-1 text-[9px] font-mono uppercase text-white shadow-md">
                  ◆ Recommended
                </div>
              )}

              <div className="mb-3 border-b border-white/10 pb-3">
                <div className="flex items-center justify-between gap-3">
                  <span className={`text-xs font-mono font-medium tracking-[0.22em] ${plan.highlight ? 'text-indigo-300' : 'text-white'}`}>{plan.name}</span>
                  <span className="rounded-full border border-white/10 bg-white/10 px-2.5 py-0.5 text-[9px] font-mono font-medium uppercase tracking-[0.16em] text-white/70">
                    {plan.label}
                  </span>
                </div>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="font-serif text-4xl font-bold text-white">{plan.price}</span>
                  {plan.period && <span className="self-end pb-0.5 text-sm text-white/60 font-sans">{plan.period}</span>}
                </div>
                <p className="mt-1 text-xs font-medium leading-relaxed text-white/60 font-sans">{plan.description}</p>
              </div>

              <div className="mb-4 flex-1 space-y-1.5">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2.5">
                    <div className={`flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full ${plan.highlight ? 'bg-indigo-500/20' : 'bg-white/10'}`}>
                      <Check className={`h-2 w-2 ${plan.highlight ? 'text-indigo-400' : 'text-white/80'}`} />
                    </div>
                    <span className="text-xs font-medium text-white/75 font-sans">{feature}</span>
                  </div>
                ))}
              </div>

              <Link
                href={plan.href}
                className={`focus-ring block w-full rounded-full py-2.5 text-center text-xs font-bold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${plan.highlight
                    ? "bg-indigo-600 text-white shadow-lg hover:bg-indigo-500"
                    : "border border-white/20 bg-white/5 text-white hover:bg-white/10"
                  }`}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
