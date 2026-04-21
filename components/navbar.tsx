'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import NavbarUI from "./navbar-ui"

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

  return (
    <NavbarUI 
      user={user} 
      isLoadingUser={isLoadingUser} 
      handleLogout={handleLogout} 
      scrolled={scrolled} 
    />
  )
}
