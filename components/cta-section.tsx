'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function CTASection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-primary/5">
      <div className="max-w-4xl mx-auto">
        <div className="relative bg-gradient-to-br from-white to-secondary/30 border border-border rounded-3xl p-12 md:p-16 text-center">
          <div className="space-y-6">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground text-balance">
              Start Verifying Today
            </h2>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
              Join CCIS students making smarter decisions about the information they consume online.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/register">
                <Button size="lg" className="px-8">
                  Create Account
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline" className="px-8">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
