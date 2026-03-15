'use client'

import { useInView } from "@/hooks/use-in-view"

const steps = [
  {
    number: "01",
    time: "1 min",
    title: "Create your account",
    description: "Register with email or Google. Your daily checks reset automatically every 12:00 AM PHT.",
  },
  {
    number: "02",
    time: "5 sec",
    title: "Paste any URL",
    description: "Drop in any web URL — news article, blog post, research page. The system fetches and parses the content server-side.",
  },
  {
    number: "03",
    time: "< 5 sec",
    title: "Get your credibility brief",
    description: "Gemini analyses the content and returns a structured report: score, verdict, summary, reasoning, and counter-facts.",
  },
]

export default function HowItWorksSection() {
  const { ref: sectionRef, isInView } = useInView({ threshold: 0.1 })

  return (
    <section id="how-it-works" ref={sectionRef} className="editorial-section py-24 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <div
          className={`mb-16 transition-all duration-500 ease-out ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="section-kicker">Workflow</span>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mt-4">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground text-balance max-w-md">
              From URL to decision in three concise review steps.
            </h2>
            <p className="text-foreground/55 text-sm max-w-xs sm:text-right">
              Built for repeat use during classes, deadline crunches, and citation-heavy research.
            </p>
          </div>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0">
          <div className="hidden md:block absolute top-13 left-[calc(16.66%+16px)] right-[calc(16.66%+16px)] h-px bg-border z-0" />

          {steps.map((step, index) => (
            <div
              key={step.number}
              className={`relative flex flex-col transition-all duration-500 ease-out ${
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              } ${index > 0 ? "md:pl-8" : ""}`}
              style={isInView ? { transitionDelay: `${index * 130}ms` } : undefined}
            >
              <div className="relative z-10 w-13 h-13 rounded-full bg-white border-2 border-accent flex items-center justify-center mb-6 shrink-0">
                <span className="font-serif font-bold text-lg text-accent">{step.number}</span>
              </div>

              <div className="document-card paper-grid flex-1 p-6 transition-shadow duration-300 hover:shadow-[0_22px_38px_rgba(39,34,26,0.1)]">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-serif text-xl font-bold text-foreground">{step.title}</h3>
                  <span className="text-[10px] font-mono text-foreground/40 bg-secondary rounded-full px-2 py-0.5 shrink-0 ml-2">
                    ~{step.time}
                  </span>
                </div>
                <p className="text-sm text-foreground/60 leading-relaxed">{step.description}</p>
              </div>

              {index < steps.length - 1 && (
                <div className="md:hidden w-px h-8 bg-border ml-6 mt-2 mb-2" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
