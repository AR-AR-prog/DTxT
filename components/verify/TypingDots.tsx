'use client'

export default function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-4 py-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <span
        className="w-2 h-2 rounded-full bg-[#1b5e4a]/60 animate-bounce"
        style={{ animationDelay: '0ms', animationDuration: '0.6s' }}
      />
      <span
        className="w-2 h-2 rounded-full bg-[#1b5e4a]/60 animate-bounce"
        style={{ animationDelay: '150ms', animationDuration: '0.6s' }}
      />
      <span
        className="w-2 h-2 rounded-full bg-[#1b5e4a]/60 animate-bounce"
        style={{ animationDelay: '300ms', animationDuration: '0.6s' }}
      />
    </div>
  )
}
