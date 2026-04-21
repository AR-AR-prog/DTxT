"use client";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function VortexBackground() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Level 6 Transition: Fade to 0% opacity upon entering the calm workspace
  const isVerify = pathname === "/verify";

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {!isVerify && (
        <motion.div
          key="vortex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="fixed inset-0 overflow-hidden pointer-events-none"
          style={{ zIndex: 0 }}
        >
          {/* Swirling typography fragments */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 150, ease: "linear" }}
            className="absolute top-1/2 left-1/2 w-[150vw] h-[150vw] -translate-x-1/2 -translate-y-1/2 opacity-40 mix-blend-multiply"
          >
            <div className="absolute top-[20%] left-[30%] font-serif text-[12rem] font-bold tracking-tighter opacity-10 transform rotate-12 text-foreground blur-[2px]">Architecting</div>
            <div className="absolute top-[60%] left-[60%] font-serif text-[18rem] italic tracking-widest opacity-5 transform -rotate-45 text-foreground blur-[4px]">Synthetic</div>
            <div className="absolute top-[40%] left-[80%] font-serif text-[14rem] font-black opacity-10 transform rotate-90 text-foreground blur-[1px]">Analysis</div>
            <div className="absolute top-[70%] left-[10%] font-serif text-[15rem] leading-[0.8] opacity-5 transform rotate-[160deg] text-foreground blur-[3px]">Truth</div>
            <div className="absolute top-[10%] left-[50%] font-sans text-9xl font-light tracking-[1em] opacity-[0.03] transform -rotate-12 text-foreground">VERIFICATION</div>
            
            {/* Grid orbit rings */}
            <div className="absolute top-1/4 left-1/4 w-[50vw] h-[50vw] rounded-full border border-foreground/10 border-dashed"></div>
            <div className="absolute top-1/3 left-1/3 w-[80vw] h-[80vw] rounded-full border border-foreground/5"></div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
