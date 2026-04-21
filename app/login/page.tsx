'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { SignInPage } from '@/components/ui/sign-in'

const sampleTestimonials = [
  {
    avatarSrc: "/images/reymart-sambat.jpg",
    name: "Reymart Sambat",
    handle: "@reymartdigital",
    text: "agpAIso changed how I verify sources. Fast, clear, and actionable — every time."
  },
  {
    avatarSrc: "/images/kay-alegre.jpg",
    name: "Kay Alegre",
    handle: "@kayalegre",
    text: "Incredible platform. The credibility scores alone saved me hours of manual cross-checking."
  },
  {
    avatarSrc: "/images/rocky-turwel.jpg",
    name: "Rocky Turwel",
    handle: "@rockyturwel",
    text: "Clean interface, powerful output. I use it on every story I investigate."
  },
];

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)
    
    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? 'Login failed')
        return
      }
      router.push('/')
      router.refresh()
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <SignInPage
      mode="login"
      title={<>Welcome Back <br/><span className="text-foreground/40 font-serif">agpAIso Desk</span></>}
      description="Sign in to your account to continue verifying sources."
      heroImageSrc="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" // Placeholder background
      testimonials={sampleTestimonials}
      onSubmit={handleSubmit}
      error={error}
      isLoading={isLoading}
    />
  )
}
