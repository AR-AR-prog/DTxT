"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const UniqueTestimonial = ({
  testimonial,
}: {
  testimonial: { quote: string; author: string; role: string; id: string };
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      layout
      className="editorial-shell h-full rounded-[1.5rem] p-5 cursor-pointer relative overflow-hidden transition-all duration-500"
    >
      <motion.div
        layout
        className="mb-4 flex items-center justify-between gap-3 border-b border-border pb-4 relative z-10"
      >
        <span className="text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground">
          Field note
        </span>
        <span className="text-xs font-mono text-primary">{testimonial.id}</span>
      </motion.div>
      
      <motion.p layout className="min-h-28 text-sm leading-relaxed text-foreground/78 relative z-10">
        “{testimonial.quote}”
      </motion.p>
      
      <motion.div layout className="mt-5 flex items-center justify-between gap-3 relative z-10">
        <motion.div layout>
          <motion.p layout="position" className="font-medium text-sm text-foreground">
            {testimonial.author}
          </motion.p>
          <motion.p layout="position" className="text-xs font-mono text-muted-foreground">
            {testimonial.role}
          </motion.p>
        </motion.div>
        
        <motion.div 
          layout
          className="flex items-center justify-center rounded-xl border border-border bg-white text-primary font-serif relative overflow-hidden"
          animate={{
            width: isHovered ? 64 : 36,
            height: isHovered ? 64 : 36,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <AnimatePresence mode="wait">
            {!isHovered ? (
              <motion.span
                key="initial"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="absolute"
              >
                {testimonial.author.charAt(0)}
              </motion.span>
            ) : (
              <motion.div
                key="expanded"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-primary/5 flex items-center justify-center p-2"
              >
                <div className="w-full h-full rounded-md border border-primary/20 bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-bold">{testimonial.id.split("-")[1]}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Glow Effect */}
      <motion.div
        animate={{
          opacity: isHovered ? 0.3 : 0,
        }}
        className="absolute -inset-10 bg-gradient-to-r from-accent/0 via-accent/30 to-accent/0 blur-2xl z-0 pointer-events-none"
        style={{ transform: "translateZ(0)" }}
      />
    </motion.div>
  );
};
