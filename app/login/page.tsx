'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { GoogleSignInButton } from '@/components/google-sign-in-button'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)
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
    <div className="min-h-screen overflow-y-auto bg-background px-4 py-6 sm:py-8 lg:flex lg:items-center lg:justify-center lg:py-10">
      <div className="w-full max-w-4xl grid lg:grid-cols-2 gap-8 items-stretch">
        <div className="hidden lg:flex rounded-3xl border border-border bg-white/70 p-10 flex-col justify-center">
          <div>
            <p className="text-xs font-mono tracking-widest text-foreground/50 mb-3">SECURE ACCESS</p>
            <h2 className="font-serif text-4xl text-foreground mb-4">Welcome back to your verification workspace.</h2>
            <p className="text-foreground/60 leading-relaxed">Continue reviewing sources, checking credibility scores, and managing your account context.</p>
          </div>
          <div className="mt-8 rounded-2xl border border-border bg-background p-4 text-sm text-foreground/70">
            Tip: Use Google sign-in if your account was created with Google.
          </div>
        </div>
        <div className="w-full max-w-md mx-auto">
        {/* Header */}
        <div className="short-vp-tight text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Link href="/" className="flex items-center justify-center gap-2 mb-8">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-serif font-bold text-lg">A</span>
            </div>
            <span className="font-serif text-2xl font-bold text-foreground">agpAIso</span>
          </Link>
          <h1 className="font-serif text-3xl font-bold text-foreground mb-2">Welcome Back</h1>
          <p className="text-foreground/60">Sign in to your account to continue</p>
        </div>

        {/* Form Card */}
        <div className="short-vp-tight bg-white rounded-2xl border border-border p-8 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: "100ms" }}>
          <div className="mb-6">
            <GoogleSignInButton mode="login" />
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-foreground/60">Or continue with email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-foreground">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@university.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-foreground">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
              />
            </div>

            {/* Forgot Password Link */}
            <div className="text-right">
              <a href="#" className="text-sm text-primary hover:text-primary/80 transition">
                Forgot password?
              </a>
            </div>

            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}
            <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-foreground/60">Don't have an account?</span>
            </div>
          </div>

          {/* Register Link */}
          <Link href="/register">
            <Button type="button" variant="outline" size="lg" className="w-full">
              Create Account
            </Button>
          </Link>
        </div>

        </div>
      </div>
    </div>
  )
}
