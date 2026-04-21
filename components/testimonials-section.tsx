import { CircularTestimonials } from "@/components/ui/circular-testimonials"

const testimonials = [
  {
    quote: "agpAIso fundamentally changed how I approach verifying sources online. The speed and clarity of the analysis is unmatched.",
    name: "Kay Alegre",
    designation: "Digital Media Researcher",
    src: "/images/reymart-sambat.jpg"
  },
  {
    quote: "Instead of spending hours cross-referencing claims manually, agpAIso gives me a concrete starting point. It's not a replacement for human judgment, but a massive accelerant.",
    name: "Rocky Turwel",
    designation: "Content Strategist",
    src: "/images/kay-alegre.jpg"
  },
  {
    quote: "The interface is exactly what I needed. Clean, devoid of noise, and hyper-focused on the task. It respects the investigator's time.",
    name: "Reymart Sambat",
    designation: "Investigative Journalist",
    src: "/images/rocky-turwel.jpg"
  }
]

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="relative h-full w-full flex flex-col justify-center items-center py-10">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <div className="mb-10 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/50 backdrop-blur-md px-3 py-1 text-[11px] font-mono uppercase tracking-[0.26em] text-foreground/80">Social proof</span>
          <h2 className="mt-4 max-w-2xl mx-auto font-serif text-3xl leading-tight text-foreground md:text-5xl">
            Trusted by desks handling the volume.
          </h2>
        </div>

        <CircularTestimonials
          testimonials={testimonials}
          autoplay={true}
          colors={{
            name: "#1A1A1A",
            designation: "#6B7280",
            testimony: "#1A1A1A",
            arrowBackground: "transparent",
            arrowForeground: "#1A1A1A",
            arrowHoverBackground: "rgba(26,26,26,0.05)",
          }}
          fontSizes={{
            name: "1.5rem",
            designation: "0.875rem",
            quote: "1.25rem",
          }}
        />
      </div>
    </section>
  )
}
