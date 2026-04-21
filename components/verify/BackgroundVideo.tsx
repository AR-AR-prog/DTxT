'use client'

import { useEffect, useRef } from 'react'

export default function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    // Ensure playback even after hydration
    video.play().catch(() => {})
  }, [])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden>
      {/* The cinematic newspaper vortex */}
      <video
        ref={videoRef}
        src="/videos/chronicle-vortex.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
        style={{
          opacity: 0.18,
          mixBlendMode: 'multiply',
          filter: 'sepia(10%) contrast(105%)',
        }}
      />

      {/* Edge vignette — draws the eye to center chat */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 50%, transparent 20%, rgba(253,252,250,0.85) 100%)',
        }}
      />
    </div>
  )
}
