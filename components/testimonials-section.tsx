export default function TestimonialsSection() {
  const testimonials = [
    {
      id: "CCIS-0088",
      quote:
        "I used to spend 20 minutes cross-checking a single news article before citing it in my paper. agpAIso cuts that down to under a minute and gives me structured reasoning I can actually show my professor.",
      author: "Mikael Santos",
      role: "BS IS · 3rd Year",
    },
    {
      id: "CCIS-2301",
      quote:
        "The counter-facts section is what sold me. It's not just a score — it tells you exactly which claims are questionable and why. That's the kind of detail I need for research work.",
      author: "Clarisse Reyes",
      role: "BS CS · 2nd Year",
    },
    {
      id: "CCIS-7725",
      quote:
        "I checked a viral campus link that everyone was sharing. agpAIso flagged it as low credibility and explained the author credentials were unverifiable. Nobody else bothered to look that up.",
      author: "Jerome Tan",
      role: "BS IT · 4th Year",
    },
    {
      id: "CCIS-0030",
      quote:
        "Google gives me a list of sources. agpAIso actually tells me which ones to trust and why. That distinction matters when you're writing a thesis and every citation counts.",
      author: "Andrea Lim",
      role: "BS CS · 3rd Year",
    },
    {
      id: "CCIS-2134",
      quote:
        "Clean interface, clear results. I submitted a URL, read the verdict in 5 seconds, and moved on. That's exactly what I needed during finals week when every hour mattered.",
      author: "Darren Cruz",
      role: "BS IS · 2nd Year",
    },
  ]

  return (
    <section id="testimonials" className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 flex items-start justify-between gap-6">
          <div>
            <span className="section-kicker">Student voices</span>
            <h2 className="mt-4 max-w-lg font-serif text-4xl leading-tight md:text-5xl">
              What CCIS students actually say
            </h2>
          </div>
          <p className="hidden max-w-xs text-sm text-muted-foreground md:block">
            Framed as field notes and use cases, not filler praise. The product has to earn trust on the page too.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="editorial-shell rounded-[1.8rem] p-6 sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border/70 pb-5">
              <div>
                <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground">Featured testimony</p>
                <h3 className="mt-3 max-w-2xl font-serif text-3xl leading-tight text-foreground sm:text-4xl">
                  “{testimonials[0].quote}”
                </h3>
              </div>
              <div className="rounded-2xl border border-border/70 bg-secondary/55 px-4 py-3 text-right">
                <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground">Reference</p>
                <p className="mt-2 font-mono text-sm text-primary">{testimonials[0].id}</p>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="font-medium text-foreground">{testimonials[0].author}</p>
                <p className="text-xs font-mono text-muted-foreground">{testimonials[0].role}</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-border/70 bg-[#fcfaf5] px-4 py-3">
                  <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground">Used for</p>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/68">Citation checks, thesis research, and fast source triage during deadlines.</p>
                </div>
                <div className="rounded-2xl border border-border/70 bg-white/80 px-4 py-3">
                  <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground">Product signal</p>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/68">Users value reasoning and counter-facts more than a raw score.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
            {testimonials.slice(1, 3).map((testimonial) => (
              <div key={testimonial.id} className="editorial-shell h-full rounded-[1.5rem] p-5">
                <div className="mb-4 flex items-center justify-between gap-3 border-b border-border/70 pb-4">
                  <span className="text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground">Field note</span>
                  <span className="text-xs font-mono text-primary">{testimonial.id}</span>
                </div>
                <p className="min-h-28 text-sm leading-relaxed text-foreground/78">“{testimonial.quote}”</p>
                <div className="mt-5 flex items-center justify-between gap-3">
                  <div>
                    <p className="font-medium text-sm text-foreground">{testimonial.author}</p>
                    <p className="text-xs font-mono text-muted-foreground">{testimonial.role}</p>
                  </div>
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-border/70 bg-white text-primary font-serif">
                    {testimonial.author.charAt(0)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {testimonials.slice(3).map((testimonial) => (
            <div key={testimonial.id} className="editorial-shell h-full rounded-[1.5rem] p-5">
              <div className="mb-4 flex items-center justify-between gap-3 border-b border-border/70 pb-4">
                <span className="text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground">Archive</span>
                <span className="text-xs font-mono text-primary">{testimonial.id}</span>
              </div>
              <p className="min-h-24 text-sm leading-relaxed text-foreground/78">“{testimonial.quote}”</p>
              <div className="mt-5">
                <p className="font-medium text-sm text-foreground">{testimonial.author}</p>
                <p className="text-xs font-mono text-muted-foreground">{testimonial.role}</p>
              </div>
            </div>
          ))}

          <div className="paper-grid rounded-[1.5rem] border border-dashed border-border/80 bg-[#f9f3e8] p-5">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">What users keep emphasizing</p>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-foreground/70">
              <li>Reasoning matters more than decorative AI language.</li>
              <li>Counter-facts make the tool useful for real academic scrutiny.</li>
              <li>Speed is valuable only when the result still feels responsible.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
