'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Returns a subtle X/Y offset that moves in OPPOSITION to the mouse,
 * creating a layered depth illusion — the UI floats above the background.
 */
export function useMouseParallax(strength = 10) {
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const rafRef = useRef<number | null>(null)
  const targetRef = useRef({ x: 0, y: 0 })
  const currentRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2
      const cy = window.innerHeight / 2
      // Normalize to -1..1 then invert for opposition movement
      targetRef.current = {
        x: -((e.clientX - cx) / cx) * strength,
        y: -((e.clientY - cy) / cy) * strength,
      }
    }

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const tick = () => {
      currentRef.current.x = lerp(currentRef.current.x, targetRef.current.x, 0.07)
      currentRef.current.y = lerp(currentRef.current.y, targetRef.current.y, 0.07)
      setOffset({ x: currentRef.current.x, y: currentRef.current.y })
      rafRef.current = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [strength])

  return offset
}
