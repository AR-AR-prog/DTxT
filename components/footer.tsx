'use client'

import { LogoMark } from "@/components/logo-mark"

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="editorial-shell mb-8 rounded-[1.8rem] p-8 flex flex-col items-center text-center gap-4">
          <LogoMark size="sm" />
          <p className="text-sm leading-relaxed text-foreground/84 max-w-sm">
            AI-powered URL credibility analysis designed as a calm research desk for students.
          </p>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 pt-2 md:flex-row">
          <p className="text-xs text-foreground/84">© 2026 agpAIso. Student project. Academic prototype.</p>
          <p className="text-xs text-foreground/84">Built for information verification, source review, and better research decisions.</p>
        </div>
      </div>
    </footer>
  )
}
