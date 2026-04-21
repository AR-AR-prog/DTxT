'use client'

import { Shield, Lock, Zap, BookOpen, FileSearch, BarChart3 } from "lucide-react"
import { useInView } from "@/hooks/use-in-view"

const features = [
  {
    title: "AI-Powered Credibility Score",
    description: "Gemini analyses URL content for credibility signals, gives a score from 0–10, and explains every point of its reasoning.",
    icon: Zap,
    accent: "bg-accent/10 text-accent",
  },
  {
    title: "Verdict Classification",
    description: "Five clear verdict categories — from Highly Credible to Not Credible — so you know exactly where a source stands.",
    icon: BarChart3,
    accent: "bg-primary/10 text-primary",
  },
  {
    title: "Counter-Fact Extraction",
    description: "The AI surfaces specific claims it found questionable, with brief explanations of why they raise credibility concerns.",
    icon: FileSearch,
    accent: "bg-amber-100 text-amber-700",
  },
  {
    title: "Academic Research Ready",
    description: "Built for students. Quick citation checks, source vetting, and structured reasoning you can quote or reference.",
    icon: BookOpen,
    accent: "bg-muted text-primary",
  },
  {
    title: "Secure Account-Based Access",
    description: "Personal accounts with JWT session auth and optional Google sign-in. Your analysis history stays private.",
    icon: Lock,
    accent: "bg-primary/10 text-primary",
  },
  {
    title: "Fair Usage Limits",
    description: "50 free checks per day, resetting every 12:00 AM PHT. Upgrade for higher limits without losing any existing data.",
    icon: Shield,
    accent: "bg-accent/10 text-accent",
  },
]

export default function FeaturesSection() {
  const { ref: sectionRef, isInView } = useInView({ threshold: 0.1 })

  return (
    <section id="features" ref={sectionRef} className="editorial-section py-24 px-4 sm:px-6 lg:px-8 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <div
          className={`mb-16 transition-all duration-500 ease-out ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="section-kicker">System capabilities</span>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mt-4">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground text-balance max-w-xl">
              One verification desk, six capabilities that hold up under scrutiny.
            </h2>
            <p className="text-foreground/80 text-sm max-w-xs sm:text-right">
              No novelty features. Each capability is tuned for confidence, traceability, and fast reading.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className={`group document-card p-7 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_26px_52px_rgba(39,34,26,0.12)] ${
                  isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={isInView ? { transitionDelay: `${index * 80}ms` } : undefined}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-5 ${feature.accent}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <p className="mb-2 text-[10px] font-mono uppercase tracking-[0.2em] text-foreground/86">Desk module</p>
                <h3 className="font-serif text-lg font-bold text-foreground mb-2 leading-snug">
                  {feature.title}
                </h3>
                <p className="text-sm text-foreground/84 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
