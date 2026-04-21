'use client'

import { useEffect, useState } from "react"
import HeroSectionUI from "./hero-section-ui"

export default function HeroSection() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null)

  useEffect(() => {
    fetch("/api/auth/me", { credentials: "include" })
      .then((r) => r.json())
      .then((data) => setIsLoggedIn(!!data?.user))
      .catch(() => setIsLoggedIn(false))
  }, [])

  return <HeroSectionUI isLoggedIn={isLoggedIn} />
}
