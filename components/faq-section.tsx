'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: 'What does agpAIso actually analyze?',
    answer:
      'It fetches the article content from a public URL, then evaluates source reliability, writing quality, factual consistency, and context signals using Gemini. You get a credibility score, verdict, summary, and reasoning.',
  },
  {
    question: 'Do free checks reset?',
    answer:
      'Yes. Free accounts get 50 checks per day, and the count resets automatically at 12:00 AM Philippine Time (PHT).',
  },
  {
    question: 'Why do some URLs fail to analyze?',
    answer:
      'Some pages block automated fetches (403), require login/paywall, or time out. When that happens, agpAIso returns a clear fetch error instead of generating a misleading credibility score.',
  },
  {
    question: 'Is this a replacement for human judgment?',
    answer:
      'No. It is a fast screening layer. Use the output to prioritize deeper review, especially for academic work, policy, or journalism.',
  },
  {
    question: 'Is my API key exposed in the browser?',
    answer:
      'No. Gemini calls run server-side only. The client never receives or stores your Gemini API credentials.',
  },
]

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="border-t border-border py-24">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="space-y-5">
          <span className="section-kicker">Questions</span>
          <h2 className="max-w-xl font-serif text-4xl leading-tight md:text-5xl">
            Questions people ask before they trust an AI verdict
          </h2>
          <p className="max-w-md text-sm leading-relaxed text-foreground/86">
            The product is serious enough to answer the skeptical questions up front: what gets analyzed, where limits apply, and what the tool should never replace.
          </p>
          <div className="rounded-[1.5rem] border border-dashed border-border bg-[#faf5eb] p-5">
            <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground">Trust note</p>
            <p className="mt-3 text-sm leading-relaxed text-foreground/68">
              agpAIso is built to support judgment, not perform it for you. That positioning should be visible in the interface, not buried in documentation.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index
            return (
              <div
                key={item.question}
                className="editorial-shell rounded-[1.4rem] overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-foreground/78">0{index + 1}</p>
                    <span className="mt-2 block font-medium text-foreground">{item.question}</span>
                  </div>
                  <ChevronDown
                    className={`h-4 w-4 text-muted-foreground transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <div
                  className={`grid transition-all duration-300 ease-out ${
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm leading-relaxed text-foreground/86">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
