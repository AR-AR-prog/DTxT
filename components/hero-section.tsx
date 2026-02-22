'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HeroSection() {
  return (
    <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="font-serif text-5xl sm:text-6xl font-bold text-foreground leading-tight text-balance">
                Verify Information Before You Believe It.
              </h1>
              <p className="text-lg text-foreground/60 leading-relaxed max-w-xl">
                AI-powered URL credibility analysis built for CCIS students.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/register">
                <Button size="lg" className="w-full sm:w-auto px-8">
                  Analyze Now
                </Button>
              </Link>
              <Link href="/register">
                <Button size="lg" variant="outline" className="w-full sm:w-auto px-8">
                  Create Account
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Side - Dashboard Mockup */}
          <div className="relative h-96 hidden lg:flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/0 rounded-2xl"></div>
            
            {/* Mockup Card */}
            <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden border border-border">
              {/* Header */}
              <div className="bg-gradient-to-r from-primary to-primary/80 px-6 py-4">
                <h3 className="text-white font-serif text-sm font-semibold">Credibility Check</h3>
              </div>

              {/* Content */}
              <div className="p-6 space-y-5">
                {/* URL Input */}
                <div className="space-y-2">
                  <label className="text-xs font-medium text-foreground/70">Enter URL</label>
                  <input
                    type="text"
                    placeholder="https://example.com"
                    className="w-full px-3 py-2 bg-secondary text-foreground rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    disabled
                  />
                </div>

                {/* Analyze Button */}
                <Button className="w-full" size="sm" disabled>
                  Analyze
                </Button>

                {/* Result Card */}
                <div className="mt-4 p-4 bg-secondary rounded-xl border border-border/50">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-foreground/70">Credibility Score</span>
                      <span className="font-bold text-lg text-primary">8.5/10</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full w-[85%] bg-primary rounded-full"></div>
                    </div>
                    <p className="text-xs text-foreground/60 pt-2">
                      High credibility. Source verified as trustworthy.
                    </p>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="pt-2 space-y-2 text-xs text-foreground/60">
                  <div className="flex justify-between">
                    <span>Domain Age</span>
                    <span className="font-medium">5 years</span>
                  </div>
                  <div className="flex justify-between">
                    <span>SSL Certificate</span>
                    <span className="font-medium">✓ Valid</span>
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
