'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { MagneticPull } from "./magnetic-pull"

type MeResponseUser = {
  id: string
  email: string
  fullName: string | null
  apiUsageCount: number
  apiUsageLimit: number
}

interface NavbarUIProps {
  user: MeResponseUser | null
  isLoadingUser: boolean
  handleLogout: () => void
  scrolled: boolean
}

export default function NavbarUI({ user, isLoadingUser, handleLogout, scrolled }: NavbarUIProps) {
  const displayName = user?.fullName || user?.email

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-white/60 backdrop-blur-md border-b border-white/20 shadow-[0_16px_42px_rgba(36,31,23,0.08)]" 
          : "bg-white/40 backdrop-blur-md border-b border-white/20"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center gap-4 py-3.5 lg:py-3">
          <Link href="/" className="flex min-w-0 items-center gap-3">
            <MagneticPull attraction={0.3}>
              <div className="flex h-10 w-10 items-center justify-center rounded-md border border-white/40 bg-white/60 backdrop-blur shadow-sm">
                {/* Digital Iris Logo */}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 4C7 4 2.73 7.11 1 12C2.73 16.89 7 20 12 20C17 20 21.27 16.89 23 12C21.27 7.11 17 4 12 4ZM12 17.5C8.96 17.5 6.5 15.04 6.5 12C6.5 8.96 8.96 6.5 12 6.5C15.04 6.5 17.5 8.96 17.5 12C17.5 15.04 15.04 17.5 12 17.5ZM12 8.5C10.07 8.5 8.5 10.07 8.5 12C8.5 13.93 10.07 15.5 12 15.5C13.93 15.5 15.5 13.93 15.5 12C15.5 10.07 13.93 8.5 12 8.5Z" fill="#1A1A1A" stroke="#1A1A1A" strokeWidth="0.5"/>
                </svg>
              </div>
            </MagneticPull>
            <div className="min-w-0">
              <span className="block font-serif text-xl font-bold leading-none text-foreground tracking-tight">agpAIso</span>
              <span className="block truncate text-[10px] uppercase tracking-[0.2em] text-foreground/60 mt-1">
                Verification Desk
              </span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-2 rounded-full border border-white/40 bg-white/40 backdrop-blur-md px-5 py-1.5 shadow-sm xl:px-9">
            <Link
              href="#how-it-works"
              className="focus-ring rounded-full px-4 py-1.5 text-sm text-foreground/80 transition-colors duration-200 hover:bg-white/60 hover:text-foreground"
            >
              How It Works
            </Link>
            <Link
              href="#pricing"
              className="focus-ring rounded-full px-4 py-1.5 text-sm text-foreground/80 transition-colors duration-200 hover:bg-white/60 hover:text-foreground"
            >
              Pricing
            </Link>
            <Link
              href="#testimonials"
              className="focus-ring rounded-full px-4 py-1.5 text-sm text-foreground/80 transition-colors duration-200 hover:bg-white/60 hover:text-foreground"
            >
              Testimonials
            </Link>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {user && !isLoadingUser ? (
              <>
                <span className="hidden xl:inline text-sm text-foreground/65">
                  Signed in as{" "}
                  <span className="font-medium text-foreground">
                    {displayName}
                  </span>
                </span>
                <Link href="/verify">
                  <Button size="sm" className="focus-ring rounded-full bg-foreground text-background hover:bg-foreground/90 px-4 text-sm">
                    Verify
                  </Button>
                </Link>
                <Link href="/account">
                  <Button variant="ghost" size="sm" className="focus-ring rounded-full border border-transparent text-sm hover:border-black/10 hover:bg-white/60">
                    Account
                  </Button>
                </Link>
                <Link href="/billing">
                  <Button variant="ghost" size="sm" className="focus-ring rounded-full border border-transparent text-sm hover:border-black/10 hover:bg-white/60">
                    Billing
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  className="focus-ring rounded-full border-white/40 bg-white/50 text-sm shadow-sm hover:bg-white/70"
                  onClick={handleLogout}
                >
                  Sign out
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" className="focus-ring rounded-full border border-transparent text-sm hover:border-black/10 hover:bg-white/60">
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="focus-ring rounded-full bg-foreground px-5 text-sm text-background hover:bg-foreground/90">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  )
}
