'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { GoogleSignInButton } from '@/components/google-sign-in-button'

interface AccountClientProps {
  user: {
    fullName: string
    email: string
    hasPassword: boolean
    hasGoogle: boolean
  }
  googleConfigured: boolean
}

export default function AccountClient({ user, googleConfigured }: AccountClientProps) {
  const router = useRouter()
  const [isUnlinking, setIsUnlinking] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleUnlinkGoogle = async () => {
    setError('')
    setSuccess('')
    setIsUnlinking(true)
    try {
      const res = await fetch('/api/account/google', {
        method: 'DELETE',
        credentials: 'include',
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? 'Failed to disconnect Google')
        return
      }
      setSuccess('Google account disconnected.')
      router.refresh()
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsUnlinking(false)
    }
  }

  const initials = user.fullName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() || '?'

  return (
    <div className="min-h-screen bg-background font-sans">
      <header className="border-b border-border bg-background px-4 py-3 flex items-center justify-between">
        <Link
          href="/"
          className="font-serif text-xl font-bold text-foreground"
        >
          agpAIso
        </Link>
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline text-sm text-foreground/70">{user.email}</span>
          <Link href="/verify" className="focus-ring text-sm font-medium text-primary hover:underline">
            ← Back to Verify
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-4 py-10 space-y-6">
        <div>
          <span className="section-kicker">Account desk</span>
          <h1 className="mt-4 font-serif text-4xl leading-tight text-foreground">Identity and sign-in controls.</h1>
        </div>

        <div className="editorial-shell rounded-2xl p-6">
          <h2 className="text-lg font-medium text-foreground mb-4">Profile</h2>
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 select-none items-center justify-center rounded-full border border-border bg-primary text-xl font-medium text-primary-foreground">
              {initials}
            </div>
            <div>
              <p className="font-medium text-foreground">{user.fullName}</p>
              <p className="text-sm text-foreground/84">{user.email}</p>
            </div>
          </div>
        </div>

        <div className="editorial-shell rounded-2xl p-6">
          <h2 className="text-lg font-medium text-foreground mb-1">Connected Accounts</h2>
          <p className="text-sm text-foreground/84 mb-4">Manage how you sign in to agpAIso.</p>

          <div className="border-t border-border pt-4 space-y-3">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 shrink-0">
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <div>
                  <p className="text-sm font-medium text-foreground">Google</p>
                  <p className="text-xs text-foreground/76">
                    {user.hasGoogle ? 'Connected' : 'Not connected'}
                  </p>
                </div>
              </div>

              {user.hasGoogle ? (
                <button
                  type="button"
                  onClick={handleUnlinkGoogle}
                  disabled={isUnlinking || !user.hasPassword}
                  title={!user.hasPassword ? 'Set a password before disconnecting Google' : undefined}
                  className="focus-ring min-h-10 shrink-0 rounded-md px-2 text-sm font-medium text-foreground transition-colors hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {isUnlinking ? 'Disconnecting…' : 'Disconnect'}
                </button>
              ) : googleConfigured ? (
                <GoogleSignInButton mode="link" />
              ) : (
                <span className="text-xs italic text-foreground/72">Not configured</span>
              )}
            </div>

            {user.hasGoogle && !user.hasPassword && (
              <p className="verdict-caution rounded-lg border px-3 py-2 text-xs">
                You sign in with Google only. To disconnect, you would first need a password — contact support if needed.
              </p>
            )}
          </div>

          <div className="mt-4 border-t border-border pt-4">
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 shrink-0 text-foreground/72" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
              </svg>
              <div>
                <p className="text-sm font-medium text-foreground">Password</p>
                <p className="text-xs text-foreground/76">
                  {user.hasPassword ? 'Set' : 'Not set — Google sign-in only'}
                </p>
              </div>
            </div>
          </div>

          {error && <p className="verdict-risk mt-4 rounded-lg border px-3 py-2 text-sm">{error}</p>}
          {success && <p className="verdict-strong mt-4 rounded-lg border px-3 py-2 text-sm">{success}</p>}
        </div>
      </div>
    </div>
  )
}
