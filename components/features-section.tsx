'use client'

import { Shield, Lock, Zap } from "lucide-react"

export default function FeaturesSection() {
  const features = [
    {
      title: "AI-Powered Detection",
      description: "Advanced machine learning analyzes URLs for credibility signals, content authenticity, and potential misinformation.",
      icon: Zap
    },
    {
      title: "Secure Account-Based Access",
      description: "Personal accounts with secure authentication. Track your analysis history and maintain academic integrity.",
      icon: Lock
    },
    {
      title: "Controlled API Usage Per User",
      description: "Fair-use API limits ensure equitable access for all CCIS students while maintaining system reliability.",
      icon: Shield
    }
  ]

  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Powerful Features for Better Research
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Everything you need to verify online information with confidence.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 border border-border hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-serif text-xl font-bold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-foreground/60 leading-relaxed">
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
