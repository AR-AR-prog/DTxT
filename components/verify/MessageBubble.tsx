'use client'

import { motion } from 'framer-motion'
import ResultCard from './ResultCard'

export type MessageBubbleProps =
  | { type: 'user'; content: string; domainLabel?: string; timestampLabel?: string }
  | {
      type: 'ai'
      content?: string
      analysis?: {
        score: number
        summary: string
        reasoning: string
        verdict: string
        factors?: string[]
      }
      error?: string
      timestampLabel?: string
    }

export default function MessageBubble(props: MessageBubbleProps) {
  if (props.type === 'user') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
        className="flex justify-end"
      >
        <div className="max-w-[80%] sm:max-w-[70%]">
          <div className="mb-1 flex items-center justify-end gap-2 text-[9px] font-mono uppercase tracking-[0.22em] text-foreground/40">
            {props.domainLabel && <span>{props.domainLabel}</span>}
            {props.timestampLabel && <span>{props.timestampLabel}</span>}
          </div>
          <div className="rounded-3xl rounded-br-md border border-dashed border-[#1A1A1A]/20 bg-foreground px-5 py-3.5 shadow-md">
            <p className="break-all text-[14px] font-medium leading-relaxed text-background">{props.content}</p>
          </div>
        </div>
      </motion.div>
    )
  }

  if (props.error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 380, damping: 26 }}
        className="flex justify-start"
      >
        <div className="max-w-[80%] sm:max-w-[70%]">
          {props.timestampLabel && (
            <div className="mb-1 text-[9px] font-mono uppercase tracking-[0.22em] text-foreground/40">{props.timestampLabel}</div>
          )}
          <div className="rounded-3xl rounded-bl-md border border-dashed border-red-300/60 bg-red-50 px-5 py-4">
            <p className="text-[14px] text-red-800 leading-relaxed font-medium">{props.error}</p>
          </div>
        </div>
      </motion.div>
    )
  }

  if (props.analysis) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 320, damping: 28, delay: 0.05 }}
        className="flex justify-start"
      >
        <div className="w-full max-w-[90%] sm:max-w-[85%]">
          {props.timestampLabel && (
            <div className="mb-1.5 text-[9px] font-mono uppercase tracking-[0.22em] text-foreground/40">Brief generated · {props.timestampLabel}</div>
          )}
          <div className="rounded-3xl rounded-bl-md border border-dashed border-[#1A1A1A]/15 bg-white/70 backdrop-blur-xl shadow-[0_8px_40px_rgba(0,0,0,0.06)] overflow-hidden">
            <ResultCard analysis={props.analysis} />
          </div>
        </div>
      </motion.div>
    )
  }

  return null
}
