'use client'

import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t border-border/70 bg-background py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="editorial-shell mb-8 grid grid-cols-1 gap-8 rounded-[1.8rem] p-8 md:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4 transition-opacity duration-200 hover:opacity-80">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/80 bg-white">
                <span className="text-primary font-serif font-bold text-sm">A</span>
              </div>
              <span className="font-serif text-lg font-bold text-foreground">agpAIso</span>
            </Link>
            <p className="text-sm leading-relaxed text-foreground/60">
              AI-powered URL credibility analysis designed as a calm research desk for CCIS students.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-foreground">Product</h4>
            <ul className="space-y-3">
              <li>
                <Link href="#features" className="text-foreground/60 hover:text-foreground text-sm transition-colors duration-200 hover:underline underline-offset-2">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#how-it-works" className="text-foreground/60 hover:text-foreground text-sm transition-colors duration-200 hover:underline underline-offset-2">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="#testimonials" className="text-foreground/60 hover:text-foreground text-sm transition-colors duration-200 hover:underline underline-offset-2">
                  Student Voices
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-foreground">Guidance</h4>
            <ul className="space-y-3">
              <li>
                <Link href="#faq" className="text-foreground/60 hover:text-foreground text-sm transition-colors duration-200 hover:underline underline-offset-2">FAQ</Link>
              </li>
              <li>
                <Link href="#pricing" className="text-foreground/60 hover:text-foreground text-sm transition-colors duration-200 hover:underline underline-offset-2">Pricing</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-foreground">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a href="mailto:info@agpaiso.com" className="text-foreground/60 hover:text-foreground text-sm transition-colors duration-200 hover:underline underline-offset-2">
                  info@agpaiso.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 pt-2 md:flex-row">
          <p className="text-xs text-foreground/60">© 2026 agpAIso. CCIS Project. Academic prototype.</p>
          <p className="text-xs text-foreground/60">Built for information verification, source review, and better research decisions.</p>
        </div>
      </div>
    </footer>
  )
}
