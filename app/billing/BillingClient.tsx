'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Check, Zap, Infinity } from 'lucide-react'

interface BillingClientProps {
  user: {
    fullName: string
    email: string
    apiUsageCount: number
    apiUsageLimit: number
  }
}

const plans = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    period: '',
    description: 'Try agpAIso with no commitment.',
    limit: 50,
    features: [
      '50 URL credibility checks per day',
      'AI-powered Gemini analysis',
      'Credibility score (0–10)',
      'Summary & reasoning',
      'Verdict classification',
    ],
    cta: 'Current Plan',
    highlight: false,
    icon: null,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$9',
    period: '/mo',
    description: 'For students and researchers who fact-check regularly.',
    limit: 200,
    features: [
      '200 URL credibility checks/mo',
      'AI-powered Gemini analysis',
      'Credibility score (0–10)',
      'Summary, reasoning & factors',
      'Verdict classification',
      'Priority processing',
    ],
    cta: 'Upgrade to Pro',
    highlight: true,
    icon: Zap,
  },
  {
    id: 'unlimited',
    name: 'Unlimited',
    price: '$19',
    period: '/mo',
    description: 'For journalists, researchers, and power users.',
    limit: null,
    features: [
      'Unlimited URL checks',
      'AI-powered Gemini analysis',
      'Credibility score (0–10)',
      'Summary, reasoning & factors',
      'Verdict classification',
      'Priority processing',
      'API access (coming soon)',
    ],
    cta: 'Go Unlimited',
    highlight: false,
    icon: Infinity,
  },
]

export default function BillingClient({ user }: BillingClientProps) {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly')
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const used = user.apiUsageCount
  const limit = user.apiUsageLimit
  const remaining = Math.max(0, limit - used)
  const usagePercent = Math.min(100, (used / limit) * 100)
  const isAtLimit = used >= limit

  const barColor = usagePercent >= 100
    ? 'bg-[#8e5444]'
    : usagePercent >= 80
    ? 'bg-[#9d7a3a]'
    : 'bg-primary'

  return (
    <div className="min-h-screen bg-background font-sans">
      <header className="border-b border-border bg-background px-4 py-3 flex items-center justify-between">
        <Link
          href="/"
          className="font-serif text-xl font-bold text-foreground"
        >
          agpAIso
        </Link>
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline text-sm text-foreground/82">{user.email}</span>
          <Link href="/verify" className="focus-ring text-sm font-medium text-primary hover:underline">
            ← Back to Verify
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 py-10 space-y-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="section-kicker">Billing desk</span>
            <h1 className="mt-4 font-serif text-4xl leading-tight text-foreground">Plan headroom and usage at a glance.</h1>
          </div>
          <p className="max-w-xs text-sm text-foreground/84 sm:text-right">Compare free, pro, and unlimited quickly, then choose when you need more research capacity.</p>
        </div>

        <div className="editorial-shell rounded-[1.6rem] p-6">
          <h2 className="text-lg font-medium text-foreground mb-1">Your Usage</h2>
          <p className="text-sm text-foreground/84 mb-4">Free plan usage resets every 12:00 AM Philippine Time (PHT)</p>

          <div className="flex justify-between text-sm mb-2">
            <span className="text-foreground/82">Searches used</span>
            <span className="font-medium tabular-nums text-foreground">
              {used} / {limit}
            </span>
          </div>
          <div className="h-3 w-full overflow-hidden rounded-full bg-border">
            <div
              className={`h-full rounded-full transition-all duration-500 ${barColor}`}
              style={{ width: `${usagePercent}%` }}
            />
          </div>
          <p className="text-xs text-foreground/80 mt-2">
            {isAtLimit
              ? 'You have used all your free searches. Upgrade to continue.'
              : `${remaining} search${remaining === 1 ? '' : 'es'} remaining`}
          </p>

          {isAtLimit && (
            <div className="verdict-caution mt-4 flex items-start gap-3 rounded-xl border px-4 py-3">
              <span className="text-lg mt-0.5">⚠</span>
              <div>
                <p className="text-sm font-medium">Search limit reached</p>
                <p className="text-xs mt-0.5">
                  You&apos;ve used all {limit} free checks for today. Your balance resets automatically at 12:00 AM Philippine Time (PHT).
                </p>
              </div>
            </div>
          )}
        </div>

        <div>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-2">Choose a Plan</h2>
              <p className="text-sm text-foreground/84">Upgrade anytime. Cancel anytime.</p>
            </div>
            <div className="inline-flex rounded-full border border-border bg-card p-1" role="tablist" aria-label="Billing cycle selector">
              <button
                type="button"
                onClick={() => setBillingCycle('monthly')}
                role="tab"
                aria-selected={billingCycle === 'monthly'}
                className={`focus-ring px-3 py-1.5 text-xs rounded-full transition ${
                  billingCycle === 'monthly'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground/84 hover:text-foreground'
                }`}
              >
                Monthly
              </button>
              <button
                type="button"
                onClick={() => setBillingCycle('yearly')}
                role="tab"
                aria-selected={billingCycle === 'yearly'}
                className={`focus-ring px-3 py-1.5 text-xs rounded-full transition ${
                  billingCycle === 'yearly'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground/84 hover:text-foreground'
                }`}
              >
                Yearly (-20%)
              </button>
            </div>
          </div>

          <div className="mb-5 grid gap-3 sm:grid-cols-3">
            <div className="document-card px-4 py-3">
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-foreground/82">Free</p>
              <p className="mt-1 font-serif text-2xl text-foreground">50/day</p>
              <p className="text-xs text-foreground/90">Best for occasional source checks.</p>
            </div>
            <div className="document-card px-4 py-3">
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-foreground/82">Pro</p>
              <p className="mt-1 font-serif text-2xl text-foreground">200/mo</p>
              <p className="text-xs text-foreground/90">Better for repeat coursework and projects.</p>
            </div>
            <div className="document-card px-4 py-3">
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-foreground/82">Unlimited</p>
              <p className="mt-1 font-serif text-2xl text-foreground">No cap</p>
              <p className="text-xs text-foreground/90">For high-volume verification workflows.</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-5">
            {plans.map((plan) => {
              const isCurrent = plan.id === 'free'
              const Icon = plan.icon
              const monthlyPrice = Number(plan.price.replace('$', ''))
              const yearlyPrice = Number.isNaN(monthlyPrice)
                ? plan.price
                : `$${Math.max(0, Math.round(monthlyPrice * 0.8))}`
              const displayPrice =
                plan.id === 'free'
                  ? plan.price
                  : billingCycle === 'yearly'
                  ? yearlyPrice
                  : plan.price
              const displayPeriod =
                plan.id === 'free' ? '' : billingCycle === 'yearly' ? '/mo billed yearly' : plan.period

              return (
                <div
                  key={plan.id}
                  className={`editorial-shell relative rounded-2xl p-5 flex flex-col ${
                    plan.highlight
                      ? 'border-primary/70 ring-1 ring-primary/15'
                      : ''
                  }`}
                >
                  {plan.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded border border-border bg-primary px-3 py-1 text-xs font-mono text-primary-foreground whitespace-nowrap">
                      ◆ MOST POPULAR
                    </div>
                  )}

                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-1">
                      {Icon && <Icon className="w-4 h-4 text-primary" />}
                      <span className="text-xs font-mono text-foreground/84 uppercase tracking-widest">
                        {plan.name}
                      </span>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-serif font-bold text-foreground">{displayPrice}</span>
                      {displayPeriod && (
                        <span className="text-sm text-foreground/84">{displayPeriod}</span>
                      )}
                    </div>
                    <p className="text-xs text-foreground/92 mt-1">{plan.description}</p>
                  </div>

                  <ul className="space-y-2 mb-5 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-xs text-foreground/92">
                        <Check className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  {isCurrent ? (
                    <div className="w-full py-2.5 rounded-full text-sm font-medium text-center bg-border/80 text-foreground/86 cursor-default">
                      Current Plan
                    </div>
                  ) : selectedPlan === plan.id ? (
                    <div className="w-full py-2.5 rounded text-sm font-medium text-center bg-muted border border-border text-foreground">
                      Billing checkout coming soon
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setSelectedPlan(plan.id)}
                      className={`focus-ring min-h-11 w-full py-2.5 rounded-full text-sm font-medium transition-colors ${
                        plan.highlight
                          ? 'bg-primary text-primary-foreground hover:bg-secondary'
                          : 'border border-border bg-card text-foreground hover:bg-muted'
                      }`}
                    >
                      {plan.cta}
                    </button>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        <p className="text-center text-xs text-foreground/72">
          Questions?{' '}
          <a href="mailto:support@agpaiso.com" className="underline hover:text-foreground/70">
            Contact support
          </a>
        </p>
      </div>
    </div>
  )
}
