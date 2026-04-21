'use client'

import { motion } from 'framer-motion'

export default function TypingDots() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex justify-start my-2"
    >
      <div className="flex items-center gap-1.5 px-4 py-3 rounded-3xl rounded-bl-md border border-black/5 bg-background shadow-sm">
        <motion.span animate={{ y: [0, -4, 0] }} transition={{ duration: 0.9, repeat: Infinity, delay: 0 }} className="w-1.5 h-1.5 rounded-full bg-foreground/40" />
        <motion.span animate={{ y: [0, -4, 0] }} transition={{ duration: 0.9, repeat: Infinity, delay: 0.18 }} className="w-1.5 h-1.5 rounded-full bg-foreground/40" />
        <motion.span animate={{ y: [0, -4, 0] }} transition={{ duration: 0.9, repeat: Infinity, delay: 0.36 }} className="w-1.5 h-1.5 rounded-full bg-foreground/40" />
      </div>
    </motion.div>
  )
}
