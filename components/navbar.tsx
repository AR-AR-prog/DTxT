'use client'

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

type MeResponseUser = {
  id: string
  email: string
  fullName: string | null
  apiUsageCount: number
  apiUsageLimit: number
}

export default function Navbar() {
  const router = useRouter()
  const [user, setUser] = useState<MeResponseUser | null>(null)
  const [isLoadingUser, setIsLoadingUser] = useState(true)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    let isMounted = true

    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me", {
          credentials: "include",
        })
        if (!res.ok) return
        const data = await res.json()
        if (!isMounted) return
        setUser(data.user ?? null)
      } catch {
        if (!isMounted) return
        setUser(null)
      } finally {
        if (isMounted) {
          setIsLoadingUser(false)
        }
      }
    }

    fetchUser()

    return () => {
      isMounted = false
    }
  }, [])

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      })
    } catch {
      // ignore
    } finally {
      setUser(null)
      router.push("/")
      router.refresh()
    }
  }

  const displayName = user?.fullName || user?.email

  return (
    <nav
      className={`fixed top-0 w-full border-b z-50 transition-all duration-300 ${
        scrolled ? "bg-background/96 backdrop-blur-xl shadow-[0_16px_42px_rgba(36,31,23,0.08)]" : "bg-background/84 backdrop-blur-md"
      } border-border/80`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center gap-4 py-3.5 lg:py-3">
          <Link href="/" className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md border border-border/80 bg-white shadow-sm">
              <span className="text-primary font-serif font-bold text-base">A</span>
            </div>
            <div className="min-w-0">
              <span className="block font-serif text-lg font-bold leading-none text-foreground">agpAIso</span>
              <span className="block truncate text-[11px] uppercase tracking-[0.2em] text-foreground/45">
                Verification Desk
              </span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-2 rounded-full border border-border/80 bg-white/75 px-5 py-1.5 shadow-sm xl:px-9">
            <Link
              href="#features"
              className="focus-ring rounded-full px-4 py-1.5 text-sm text-foreground/68 transition-colors duration-200 hover:bg-secondary/70 hover:text-foreground"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="focus-ring rounded-full px-4 py-1.5 text-sm text-foreground/68 transition-colors duration-200 hover:bg-secondary/70 hover:text-foreground"
            >
              Method
            </Link>
            <Link
              href="#testimonials"
              className="focus-ring rounded-full px-4 py-1.5 text-sm text-foreground/68 transition-colors duration-200 hover:bg-secondary/70 hover:text-foreground"
            >
              Voices
            </Link>
            <Link
              href="#faq"
              className="focus-ring rounded-full px-4 py-1.5 text-sm text-foreground/68 transition-colors duration-200 hover:bg-secondary/70 hover:text-foreground"
            >
              Questions
            </Link>
            <Link
              href="#pricing"
              className="focus-ring rounded-full px-4 py-1.5 text-sm text-foreground/68 transition-colors duration-200 hover:bg-secondary/70 hover:text-foreground"
            >
              Pricing
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
                <Link href="/account">
                  <Button variant="ghost" size="sm" className="focus-ring rounded-full border border-transparent text-sm hover:border-border/70 hover:bg-white/80">
                    Account
                  </Button>
                </Link>
                <Link href="/billing">
                  <Button variant="ghost" size="sm" className="focus-ring rounded-full border border-transparent text-sm hover:border-border/70 hover:bg-white/80">
                    Billing
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  className="focus-ring rounded-full border-border/80 bg-white/85 text-sm shadow-sm hover:bg-white"
                  onClick={handleLogout}
                >
                  Sign out
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" className="focus-ring rounded-full border border-transparent text-sm hover:border-border/70 hover:bg-white/80">
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="focus-ring rounded-full border border-accent/20 bg-accent px-5 text-sm text-accent-foreground shadow-[0_12px_28px_rgba(47,91,135,0.22)] hover:bg-accent/92">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="pb-3 lg:hidden">
          <div className="flex items-center gap-2 overflow-x-auto rounded-full border border-border/80 bg-white/70 px-2 py-2 shadow-sm">
            <Link href="#features" className="focus-ring rounded-full px-3 py-2 text-xs text-foreground/68 hover:bg-secondary/70 hover:text-foreground">
              Features
            </Link>
            <Link href="#how-it-works" className="focus-ring rounded-full px-3 py-2 text-xs text-foreground/68 hover:bg-secondary/70 hover:text-foreground">
              Method
            </Link>
            <Link href="#testimonials" className="focus-ring rounded-full px-3 py-2 text-xs text-foreground/68 hover:bg-secondary/70 hover:text-foreground">
              Voices
            </Link>
            <Link href="#faq" className="focus-ring rounded-full px-3 py-2 text-xs text-foreground/68 hover:bg-secondary/70 hover:text-foreground">
              Questions
            </Link>
            <Link href="#pricing" className="focus-ring rounded-full px-3 py-2 text-xs text-foreground/68 hover:bg-secondary/70 hover:text-foreground">
              Pricing
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
