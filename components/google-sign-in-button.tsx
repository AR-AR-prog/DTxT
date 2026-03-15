'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (options: {
            client_id: string
            callback: (response: { credential?: string }) => void
          }) => void
          prompt: () => void
        }
      }
    }
  }
}

type GoogleSignInButtonProps = {
  mode: 'login' | 'register' | 'link'
}

const GOOGLE_SCRIPT_SRC = 'https://accounts.google.com/gsi/client'

export function GoogleSignInButton({ mode }: GoogleSignInButtonProps) {
  const router = useRouter()
  const [error, setError] = useState('')
  const [isReady, setIsReady] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const isInitializedRef = useRef(false)
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
  const isConfigured = Boolean(clientId)

  useEffect(() => {
    if (!clientId) {
      return
    }

    const initializeGoogle = () => {
      if (!window.google?.accounts?.id || isInitializedRef.current) {
        return
      }

      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: async ({ credential }) => {
          if (!credential) {
            setError('Google sign-in failed. Please try again.')
            setIsLoading(false)
            return
          }

          setError('')
          setIsLoading(true)

          try {
            const endpoint = mode === 'link' ? '/api/account/google' : '/api/auth/google'
            const res = await fetch(endpoint, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ credential }),
              credentials: 'include',
            })

            const data = await res.json()
            if (!res.ok) {
              setError(data.error ?? 'Google sign-in failed')
              return
            }

            if (mode === 'link') {
              router.refresh()
            } else {
              router.push('/')
              router.refresh()
            }
          } catch {
            setError('Google sign-in failed. Please try again.')
          } finally {
            setIsLoading(false)
          }
        },
      })

      isInitializedRef.current = true
      setIsReady(true)
    }

    const existingScript = document.querySelector<HTMLScriptElement>(`script[src="${GOOGLE_SCRIPT_SRC}"]`)
    if (existingScript) {
      if (window.google?.accounts?.id) {
        initializeGoogle()
      } else {
        existingScript.addEventListener('load', initializeGoogle, { once: true })
      }
      return
    }

    const script = document.createElement('script')
    script.src = GOOGLE_SCRIPT_SRC
    script.async = true
    script.defer = true
    script.addEventListener('load', initializeGoogle, { once: true })
    document.head.appendChild(script)

    return () => {
      script.removeEventListener('load', initializeGoogle)
    }
  }, [clientId, mode, router])

  const label = mode === 'login'
    ? 'Continue with Google'
    : mode === 'register'
    ? 'Sign up with Google'
    : 'Link Google account'

  const statusMessage = !isConfigured
    ? 'Google sign-in is not configured. Add NEXT_PUBLIC_GOOGLE_CLIENT_ID and restart the dev server.'
    : error

  return (
    <div className="space-y-2">
      <button
        type="button"
        disabled={!isConfigured || !isReady || isLoading}
        onClick={() => {
          if (!isConfigured) {
            return
          }

          setError('')
          setIsLoading(true)
          window.google?.accounts?.id.prompt()
        }}
        className="w-full flex items-center justify-center gap-3 px-4 py-2.5 rounded-lg border border-[#dadce0] bg-white text-[#3c4043] text-sm font-medium hover:bg-[#f8faff] hover:border-[#c6d4f6] focus:outline-none focus:ring-2 focus:ring-[#4285F4]/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isLoading ? (
          <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
          </svg>
        ) : (
          <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
        )}
        <span>{isLoading ? 'Connecting…' : label}</span>
      </button>
      {statusMessage ? <p className="text-sm text-destructive text-center">{statusMessage}</p> : null}
    </div>
  )
}