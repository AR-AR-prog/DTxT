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

          {/* Auth / User */}
          <div className="flex items-center gap-3">
            {user && !isLoadingUser ? (
              <>
                <span className="hidden sm:inline text-sm text-foreground/70">
                  Signed in as{" "}
                  <span className="font-medium text-foreground">
                    {displayName}
                  </span>
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-sm"
                  onClick={handleLogout}
                >
                  Sign out
                </Button>
              </>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
