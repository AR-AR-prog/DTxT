'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { SignInPage } from '@/components/ui/sign-in'

const sampleTestimonials = [
  {
    avatarSrc: "/images/reymart-sambat.jpg",
    name: "Reymart Sambat",
    handle: "@reymartdigital",
    text: "Signing up took under a minute and I was already running credibility checks on news I'd read that morning."
  },
  {
    avatarSrc: "/images/rocky-turwel.jpg",
    name: "Rocky Turwel",
    handle: "@rockyturwel",
    text: "The free plan alone is genuinely useful. Not a teaser — it's a real product."
  },
];

function validatePassword(pw: string): string | null {
  if (pw.length < 8) return 'Password must be at least 8 characters'
  if (!/[A-Z]/.test(pw)) return 'Password must contain at least one uppercase letter'
  if (!/[a-z]/.test(pw)) return 'Password must contain at least one lowercase letter'
  if (!/[^a-zA-Z0-9]/.test(pw)) return 'Password must contain at least one special character'
  return null
}

export default function RegisterPage() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    
    const formDataObj = new FormData(e.currentTarget)
    const fullName = formDataObj.get('fullName') as string
    const email = formDataObj.get('email') as string
    const password = formDataObj.get('password') as string
    const confirmPassword = formDataObj.get('confirmPassword') as string

    const pwError = validatePassword(password)
    if (pwError) {
      setError(pwError)
      return
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }
    
    setIsLoading(true)
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, password, confirmPassword }),
        credentials: 'include',
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? 'Registration failed')
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
      mode="register"
      title={<>Create Account <br/><span className="text-foreground/40 font-serif">agpAIso Desk</span></>}
      description="Create your credibility lab in under a minute."
      heroImageSrc="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" // Placeholder background
      testimonials={sampleTestimonials}
      onSubmit={handleSubmit}
      error={error}
      isLoading={isLoading}
    />
  )
}
