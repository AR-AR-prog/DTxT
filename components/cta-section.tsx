'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useInView } from "@/hooks/use-in-view"

const trustSignals = [
  "Free to start — no credit card",
  "50 checks per day",
  "Resets daily at 12:00 AM PHT",
]

export default function CTASection() {
  const { ref: sectionRef, isInView } = useInView({ threshold: 0.1 })

  return (
    <section ref={sectionRef} className="bg-primary/5 px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div
          className={`editorial-shell relative rounded-4xl p-7 text-center transition-all duration-600 ease-out sm:p-10 md:p-14 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="pointer-events-none absolute -right-14 -top-20 h-52 w-52 rounded-full bg-accent/10" />
          <div className="pointer-events-none absolute -bottom-24 -left-12 h-60 w-60 rounded-full bg-primary/10" />
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary/40 blur-3xl" />
          <div className="pointer-events-none absolute inset-x-12 top-0 h-px bg-linear-to-r from-transparent via-primary/35 to-transparent" />

          <div className="relative space-y-6">
            <span className="section-kicker">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              Ready to verify
            </span>

            <h2 className="font-serif text-[2.2rem] font-bold leading-[1.06] text-balance text-foreground sm:text-5xl md:text-6xl">
              Give every source the scrutiny it deserves.
            </h2>

            <p className="mx-auto max-w-2xl text-base text-foreground/60 sm:text-lg">
              Open the desk, paste a URL, and get a calmer answer than the internet usually gives you. Registration is fast, and the first 50 checks each day are free.
            </p>

            <div className="flex flex-col justify-center gap-3 pt-2 sm:flex-row">
              <Link href="/register" className="inline-block">
                <Button size="lg" className="focus-ring min-h-11 rounded-full border border-accent/20 bg-accent px-8 shadow-[0_16px_34px_rgba(47,91,135,0.24)] transition-all duration-200 hover:scale-[1.02] hover:bg-accent/92 active:scale-[0.98]">
                  Create free account
                </Button>
              </Link>
              <Link href="/login" className="inline-block">
                <Button size="lg" variant="outline" className="focus-ring min-h-11 rounded-full border-border/80 bg-white/78 px-8 transition-all duration-200 hover:scale-[1.02] hover:bg-white active:scale-[0.98]">
                  Continue with login
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              {trustSignals.map((signal) => (
                <span key={signal} className="flex items-center gap-1.5 text-xs text-foreground/52">
                  <span className="text-primary">•</span>
                  {signal}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
