export default function WorkflowSection() {
  const steps = [
    {
      number: "01",
      title: "Paste URL",
      description: "Drop in any public article link from news, blogs, or social reposts.",
      visual: "url",
    },
    {
      number: "02",
      title: "Fetch + Parse",
      description: "agpAIso extracts the page content and prepares it for credibility analysis.",
      visual: "scan",
    },
    {
      number: "03",
      title: "Get Verdict",
      description: "Receive a score, summary, reasoning, and counter-facts in seconds.",
      visual: "verdict",
    },
    {
      number: "04",
      title: "Act Faster",
      description: "Cite credible sources with confidence and reject weak links quickly.",
      visual: "action",
    },
  ]

  return (
    <section className="border-y border-border/70 bg-secondary/35 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-6 flex items-start justify-between gap-6">
          <div>
            <span className="section-kicker">Desk workflow</span>
            <h2 className="mt-4 max-w-lg font-serif text-4xl leading-tight md:text-5xl">
              From random link to evidence-backed decision.
            </h2>
          </div>
          <p className="hidden max-w-xs text-sm text-muted-foreground md:block">
            Each step is designed to feel like a real review desk: submit, inspect, read the brief, decide.
          </p>
        </div>

        <div className="ink-rule mb-12" />

        <div className="grid gap-6 md:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              <div className="editorial-shell h-full rounded-[1.6rem] p-5">
                <div className="mb-5 flex items-center justify-between gap-3 border-b border-border/70 pb-4">
                  <span className="text-xs font-mono tracking-[0.22em] text-muted-foreground">STEP {step.number}</span>
                  <span className="rounded-full border border-border/70 bg-secondary/60 px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.16em] text-foreground/68">
                    desk action
                  </span>
                </div>
                <div className="relative mb-6 flex aspect-square items-center justify-center overflow-hidden rounded-[1.3rem] border border-border/70 bg-[#f8f3ea]">
                  {step.visual === "url" && (
                    <div className="w-4/5 rounded-2xl border border-border/70 bg-card px-3 py-3 shadow-sm">
                      <p className="text-[9px] font-mono text-muted-foreground">INPUT</p>
                      <p className="mt-1 truncate text-[10px] text-foreground/60">https://example.com/article...</p>
                    </div>
                  )}
                  {step.visual === "scan" && (
                    <div className="w-full space-y-2 px-4">
                      <div className="h-2 bg-border rounded w-3/4" />
                      <div className="h-2 bg-border rounded w-full" />
                      <div className="h-2 bg-border rounded w-2/3" />
                      <div className="mt-4 flex gap-1">
                        <div className="h-3 w-3 rounded-full bg-accent" />
                        <div className="h-3 flex-1 rounded bg-border" />
                      </div>
                    </div>
                  )}
                  {step.visual === "verdict" && (
                    <div className="w-4/5 rounded-2xl border border-border bg-card p-3 shadow-sm">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-[10px] font-mono text-muted-foreground">CREDIBILITY</span>
                        <span className="text-[10px] font-mono text-primary">8.4 / 10</span>
                      </div>
                      <div className="h-1.5 bg-border rounded-full overflow-hidden">
                        <div className="h-full w-[84%] rounded-full bg-linear-to-r from-primary to-accent" />
                      </div>
                    </div>
                  )}
                  {step.visual === "action" && (
                    <div className="text-center">
                      <div className="inline-flex items-center gap-2 rounded-full border border-[#d2ddd7] bg-[#edf3ef] px-4 py-2 text-primary">
                        <span className="text-xs font-mono">CITE CONFIDENTLY</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mb-2 flex items-start justify-between">
                  <span className="text-xs font-mono text-muted-foreground">{step.number}</span>
                </div>
                <h3 className="mb-2 font-serif text-2xl leading-tight text-foreground">{step.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{step.description}</p>
              </div>

              {index < steps.length - 1 && (
                <div className="absolute top-1/2 -right-3 hidden h-0.5 w-6 bg-border/90 md:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
