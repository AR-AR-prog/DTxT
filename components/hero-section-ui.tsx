'use client'

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { VariableProximity } from "@/components/variable-proximity"

interface HeroSectionUIProps {
  isLoggedIn: boolean | null
}

export default function HeroSectionUI({ isLoggedIn }: HeroSectionUIProps) {
  return (
    <section className="relative overflow-hidden bg-transparent h-full w-full flex flex-col items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.8, 
          ease: [0.16, 1, 0.3, 1], // Custom ease for a premium feel
          delay: 0.1 
        }}
        className="flex flex-col items-center justify-center space-y-6 pb-20 w-full max-w-5xl px-4 z-10"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/50 backdrop-blur-md px-3 py-1 text-[11px] font-mono uppercase tracking-[0.26em] text-foreground/80">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-foreground"></span>
          Editorial AI workspace · Student project
        </div>
        
        <h1 className="font-serif text-5xl sm:text-6xl lg:text-[6rem] font-bold leading-none align-middle text-balance max-w-5xl text-center">
          <VariableProximity 
            text="Architecting Truth" 
            radius={120} 
            className="inline-block font-serif text-foreground break-words text-center" 
          />
          <br />
          <span className="text-foreground/60 font-normal mt-2 inline-block">in the Synthetic Age.</span>
        </h1>

        <p className="mx-auto max-w-2xl text-lg leading-relaxed text-foreground/80 sm:text-xl font-sans mt-4 text-center">
          Empowering human judgment with transparent, AI-driven credibility analysis.
        </p>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row items-center justify-center">
          <Link href={isLoggedIn === true ? "/verify" : "/register"} className="w-full sm:w-auto">
            <Button size="lg" className="h-12 w-full rounded-full bg-foreground px-8 text-background transition-all duration-200 hover:scale-[1.02] hover:bg-foreground/90 active:scale-[0.98]">
              Open the verification desk
            </Button>
          </Link>
          {isLoggedIn !== true && (
            <Link href="/login" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="h-12 w-full rounded-full border-stitch bg-white/40 backdrop-blur-md px-8 transition-all duration-200 hover:scale-[1.02] hover:bg-white/60 active:scale-[0.98] text-foreground">
                Sign in to continue
              </Button>
            </Link>
          )}
        </div>
      </motion.div>
    </section>
  )
}
