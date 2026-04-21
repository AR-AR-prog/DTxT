'use client'

import { motion } from "framer-motion"

const steps = [
  {
    number: "01",
    time: "1 min",
    title: "Create your account",
    description: "Register with email or Google. Your daily checks reset automatically every 12:00 AM.",
  },
  {
    number: "02",
    time: "5 sec",
    title: "Paste any URL",
    description: "Drop in any web URL — news article, blog post, research page. The system fetches and parses the content server-side.",
  },
  {
    number: "03",
    time: "< 5 sec",
    title: "Get your credibility brief",
    description: "AI analyses the content and returns a structured report: score, verdict, summary, reasoning, and counter-facts.",
  },
]

export default function HowItWorksSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  }

  return (
    <section id="how-it-works" className="relative editorial-section py-48 px-4 sm:px-6 lg:px-8 bg-transparent overflow-hidden">
      {/* Mesh background */}
      <div className="absolute inset-0 -z-10 bg-transparent overflow-hidden">
        <motion.img 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.5 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          src="/images/mesh_gradient_2_1776553776023.png" 
          alt="Abstract background" 
          className="absolute top-[10%] right-[-10%] w-[100%] h-[100%] object-cover blur-3xl mix-blend-multiply opacity-50"
        />
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-6xl mx-auto"
      >
        <motion.div variants={itemVariants} className="mb-16">
          <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/50 backdrop-blur-md px-3 py-1 text-[11px] font-mono uppercase tracking-[0.26em] text-foreground/80">Workflow</span>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mt-4">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground text-balance max-w-md">
              From URL to decision in three concise review steps.
            </h2>
            <p className="text-foreground/80 text-sm max-w-xs sm:text-right font-sans">
              Built for repeat use during classes, deadline crunches, and citation-heavy research.
            </p>
          </div>
        </motion.div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-8">
          {steps.map((step, index) => (
            <motion.div
              variants={itemVariants}
              key={step.number}
              className="relative flex flex-col"
            >
              <div className="relative z-10 w-13 h-13 rounded-full bg-white/60 backdrop-blur-md border border-white/40 flex items-center justify-center mb-6 shrink-0 shadow-sm">
                <span className="font-serif font-bold text-lg text-foreground">{step.number}</span>
              </div>

              <div className="flex-1 p-6 rounded-3xl border border-white/40 bg-white/40 backdrop-blur-md shadow-lg transition-transform duration-300 hover:-translate-y-1">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-serif text-xl font-bold text-foreground">{step.title}</h3>
                  <span className="text-[10px] font-mono text-foreground/80 bg-white/60 rounded-full px-2 py-0.5 shrink-0 ml-2">
                    ~{step.time}
                  </span>
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed font-sans">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
