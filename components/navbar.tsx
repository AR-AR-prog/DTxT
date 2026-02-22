'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-serif font-bold text-sm">A</span>
            </div>
            <span className="font-serif text-lg font-bold text-foreground">agpAIso</span>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex gap-8 items-center">
            <Link href="#features" className="text-sm text-foreground/70 hover:text-foreground transition">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm text-foreground/70 hover:text-foreground transition">
              How It Works
            </Link>
            <Link href="#about" className="text-sm text-foreground/70 hover:text-foreground transition">
              About
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="flex gap-3">
            <Link href="/login">
              <Button variant="ghost" className="text-sm">
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button className="text-sm">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
