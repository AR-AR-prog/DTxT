'use client'

import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

interface Testimonial {
  avatarSrc: string
  name: string
  handle: string
  text: string
}

interface TestimonialsColumnProps {
  testimonials: Testimonial[]
  duration?: number
  className?: string
}

export function TestimonialsColumn({
  testimonials,
  duration = 20,
  className = ''
}: TestimonialsColumnProps) {
  const [columnHeight, setColumnHeight] = useState(0)
  const columnRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (columnRef.current) {
      setColumnHeight(columnRef.current.offsetHeight)
    }
  }, [testimonials])

  return (
    <div className={`relative h-full overflow-hidden ${className}`}>
      <motion.div
        animate={{
          y: ['0%', '-50%'],
        }}
        transition={{
          duration,
          ease: 'linear',
          repeat: Infinity,
        }}
        className="flex flex-col gap-6"
      >
        {/* Render twice for seamless loop */}
        {[...testimonials, ...testimonials].map((t, i) => (
          <div
            key={i}
            className="flex flex-col gap-3 rounded-2xl border border-black/5 bg-white/20 p-5 backdrop-blur-lg shadow-sm"
          >
            <div className="flex items-center gap-3">
              <img
                src={t.avatarSrc}
                alt={t.name}
                className="h-10 w-10 rounded-xl object-cover grayscale brightness-110"
              />
              <div className="text-left">
                <p className="text-xs font-bold tracking-tight text-foreground">{t.name}</p>
                <p className="text-[10px] font-mono uppercase tracking-widest text-foreground/40">{t.handle}</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-foreground/80 italic font-serif">
               "{t.text}"
            </p>
          </div>
        ))}
      </motion.div>
    </div>
  )
}
