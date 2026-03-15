'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { GoogleSignInButton } from '@/components/google-sign-in-button'

function validatePassword(pw: string): string | null {
  if (pw.length < 8) return 'Password must be at least 8 characters'
  if (!/[A-Z]/.test(pw)) return 'Password must contain at least one uppercase letter'
  if (!/[a-z]/.test(pw)) return 'Password must contain at least one lowercase letter'
  if (!/[^a-zA-Z0-9]/.test(pw)) return 'Password must contain at least one special character'
  return null
}

export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const pwError = validatePassword(formData.password)
    if (pwError) {
      setError(pwError)
      return
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }
    setError('')
    setIsLoading(true)
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
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
    <div className="min-h-screen overflow-y-auto bg-background px-4 py-6 sm:py-8 lg:flex lg:items-center lg:justify-center lg:py-10">
      <div className="w-full max-w-4xl grid lg:grid-cols-2 gap-8 items-stretch">
        <div className="hidden lg:flex rounded-3xl border border-border bg-white/70 p-10 flex-col justify-center">
          <div>
            <p className="text-xs font-mono tracking-widest text-foreground/50 mb-3">NEW ACCOUNT</p>
            <h2 className="font-serif text-4xl text-foreground mb-4">Create your credibility lab in under a minute.</h2>
            <p className="text-foreground/60 leading-relaxed">Get your personal verify workspace with usage tracking, source scoring, and account controls.</p>
          </div>
          <div className="mt-8 rounded-2xl border border-border bg-background p-4 text-sm text-foreground/70">
            Strong passwords are required to protect account-linked credibility history.
          </div>
        </div>
        <div className="w-full max-w-md mx-auto">
        {/* Header */}
        <div className="short-vp-tight text-center mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Link href="/" className="flex items-center justify-center gap-2 mb-8">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-serif font-bold text-lg">A</span>
            </div>
            <span className="font-serif text-2xl font-bold text-foreground">agpAIso</span>
          </Link>
          <h1 className="font-serif text-3xl font-bold text-foreground mb-2">Create Account</h1>
          <p className="text-foreground/60">Join us to start verifying information</p>
        </div>

        {/* Form Card */}
        <div className="short-vp-tight bg-white rounded-2xl border border-border p-6 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500 sm:p-7" style={{ animationDelay: "100ms" }}>
          <div className="mb-4">
            <GoogleSignInButton mode="register" />
          </div>

          <div className="relative mb-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-foreground/60">Or create an account with email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name Field */}
            <div className="space-y-2">
              <label htmlFor="fullName" className="block text-sm font-medium text-foreground">
                Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
              />
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-foreground">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@university.edu"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-foreground">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
              />
              <ul className="text-xs text-foreground/50 space-y-0.5 pt-1">
                <li className={formData.password.length >= 8 ? 'text-green-600' : ''}>• At least 8 characters</li>
                <li className={/[A-Z]/.test(formData.password) ? 'text-green-600' : ''}>• One uppercase letter</li>
                <li className={/[a-z]/.test(formData.password) ? 'text-green-600' : ''}>• One lowercase letter</li>
                <li className={/[^a-zA-Z0-9]/.test(formData.password) ? 'text-green-600' : ''}>• One special character</li>
              </ul>
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
              />
            </div>

            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}
            <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
              {isLoading ? 'Creating account...' : 'Create Account'}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-foreground/60">Already have an account?</span>
            </div>
          </div>

          {/* Login Link */}
          <Link href="/login">
            <Button type="button" variant="outline" size="lg" className="w-full">
              Sign In
            </Button>
          </Link>
        </div>

        </div>
      </div>
    </div>
  )
}
