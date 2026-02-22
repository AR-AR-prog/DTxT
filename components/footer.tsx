'use client'

import Link from "next/link"

export default function Footer() {
  return (
    <footer className="py-12 border-t border-border bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-serif font-bold text-sm">A</span>
              </div>
              <span className="font-serif text-lg font-bold text-foreground">agpAIso</span>
            </Link>
            <p className="text-sm text-foreground/60">
              AI-powered URL credibility analysis for CCIS students.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold text-foreground mb-4 text-sm">Product</h4>
            <ul className="space-y-3">
              <li>
                <Link href="#features" className="text-foreground/60 hover:text-foreground text-sm transition">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#how-it-works" className="text-foreground/60 hover:text-foreground text-sm transition">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="#about" className="text-foreground/60 hover:text-foreground text-sm transition">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-foreground mb-4 text-sm">Legal</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-foreground/60 hover:text-foreground text-sm transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/60 hover:text-foreground text-sm transition">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-foreground mb-4 text-sm">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a href="mailto:info@agpaiso.com" className="text-foreground/60 hover:text-foreground text-sm transition">
                  info@agpaiso.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-border">
          <p className="text-xs text-foreground/60 mb-4 md:mb-0">© 2026 agpAIso. CCIS Project. Academic Prototype.</p>
          <p className="text-xs text-foreground/60">Built for information verification in 2026.</p>
        </div>
      </div>
    </footer>
  )
}
