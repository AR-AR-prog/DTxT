'use client'

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
      <div className="flex justify-end animate-in fade-in slide-in-from-bottom-2 duration-500">
        <div className="w-full max-w-[85%] sm:max-w-[75%]">
          <div className="mb-1 flex items-center justify-end gap-2 text-[10px] font-mono uppercase tracking-[0.16em] text-foreground/42">
            {props.domainLabel ? <span>{props.domainLabel}</span> : null}
            {props.timestampLabel ? <span>{props.timestampLabel}</span> : null}
          </div>
          <div className="rounded-2xl rounded-br-md border border-primary/25 bg-primary px-4 py-3 text-white">
          <p className="break-all text-sm">{props.content}</p>
          </div>
        </div>
      </div>
    )
  }

  if (props.error) {
    return (
      <div className="flex justify-start animate-in fade-in slide-in-from-bottom-2 duration-500">
        <div className="w-full max-w-[85%] sm:max-w-[75%]">
          {props.timestampLabel ? (
            <div className="mb-1 text-[10px] font-mono uppercase tracking-[0.16em] text-foreground/42">{props.timestampLabel}</div>
          ) : null}
          <div className="verdict-risk rounded-2xl rounded-bl-md border px-4 py-3">
          <p className="text-sm">{props.error}</p>
          </div>
        </div>
      </div>
    )
  }

  if (props.analysis) {
    return (
      <div className="flex justify-start animate-in fade-in slide-in-from-bottom-2 duration-500">
        <div className="w-full max-w-[85%] sm:max-w-[75%]">
          {props.timestampLabel ? (
            <div className="mb-1 text-[10px] font-mono uppercase tracking-[0.16em] text-foreground/42">Brief generated {props.timestampLabel}</div>
          ) : null}
          <ResultCard analysis={props.analysis} />
        </div>
      </div>
    )
  }

  return null
}
