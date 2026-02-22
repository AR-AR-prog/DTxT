'use client'

import { Check } from "lucide-react"

export default function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      title: "Register an account",
      description: "Create your account with your CCIS email to get started.",
    },
    {
      number: "02",
      title: "Submit a URL",
      description: "Paste the URL you want to verify into our analysis tool.",
    },
    {
      number: "03",
      title: "View AI-generated credibility result",
      description: "Get instant credibility scores and detailed analysis of the source.",
    },
  ]

  return (
    <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            How It Works
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Three simple steps to verify any information.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              <div className="flex flex-col h-full">
                {/* Step Number */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-serif font-bold text-lg">
                    {step.number}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden md:block flex-1 h-0.5 bg-border"></div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="font-serif text-2xl font-bold text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-foreground/60 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Vertical connector for mobile */}
              {index < steps.length - 1 && (
                <div className="md:hidden absolute -bottom-8 left-6 w-0.5 h-8 bg-border"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
