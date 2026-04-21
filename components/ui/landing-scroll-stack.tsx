'use client';
import { useScroll, useTransform, motion, MotionValue } from 'framer-motion';
import React, { useRef } from 'react';

// Common background for sections to retain the theme requested
export const GridBackground = () => (
  <div className='pointer-events-none absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] z-0'></div>
);

interface LandingScrollStackProps {
  hero: React.ReactNode;
  testimonials: React.ReactNode;
  pricing: React.ReactNode;
  footer: React.ReactNode;
}

export default function LandingScrollStack({ hero, testimonials, pricing, footer }: LandingScrollStackProps) {
  const container = useRef<HTMLDivElement>(null);
  
  // Entire sequence takes 3 viewport heights of scrolling
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  // Section 1 (Hero): Scales down and rotates as scroll goes 0 -> 0.33 (Testimonial covers it)
  const heroScale = useTransform(scrollYProgress, [0, 0.33, 1], [1, 0.8, 0.8]);
  const heroRotate = useTransform(scrollYProgress, [0, 0.33, 1], [0, -5, -5]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  // Section 2 (Testimonials): 
  // Starts scaled down (0.8) while it comes into view (0 -> 0.33)
  // Becomes full size at 0.33.
  // Then scales down as Pricing covers it (0.33 -> 0.66)
  const testScale = useTransform(scrollYProgress, [0, 0.33, 0.66, 1], [0.8, 1, 0.8, 0.8]);
  const testRotate = useTransform(scrollYProgress, [0, 0.33, 0.66, 1], [5, 0, -5, -5]);

  // Section 3 (Pricing):
  // Starts scaled down, reaches 1.0 when Testimonial finishes shrinking (0.66)
  const priceScale = useTransform(scrollYProgress, [0, 0.33, 0.66, 1], [0.8, 0.8, 1, 1]);
  const priceRotate = useTransform(scrollYProgress, [0, 0.33, 0.66, 1], [5, 5, 0, 0]);

  return (
    <main ref={container} className='relative h-[300vh] bg-background'>
      {/* SECTION 1: HERO */}
      <motion.section
        style={{ scale: heroScale, rotate: heroRotate, opacity: heroOpacity }}
        className='sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-background'
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover pointer-events-none"
          style={{
            opacity: 0.18,
            mixBlendMode: 'multiply',
            filter: 'sepia(10%) contrast(105%)',
          }}
        >
          <source src="/videos/chronicle-vortex.mp4" type="video/mp4" />
        </video>
        <div className="relative z-10 w-full h-full flex flex-col pt-20">
          {hero}
        </div>
      </motion.section>

      {/* SECTION 2: TESTIMONIALS */}
      <motion.section
        style={{ scale: testScale, rotate: testRotate }}
        className='sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-background border-t border-border shadow-[0_-20px_50px_rgba(0,0,0,0.05)]'
      >
        <GridBackground />
        <div className="relative z-10 w-full h-full flex flex-col justify-center">
          {testimonials}
        </div>
      </motion.section>

      {/* SECTION 3: PRICING */}
      <motion.section
        style={{ scale: priceScale, rotate: priceRotate }}
        className='sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#0a0a0a] border-t border-white/10 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]'
      >
        <div className='pointer-events-none absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] z-0'></div>
        <div className="relative z-10 w-full h-full flex flex-col justify-center">
          {pricing}
        </div>
      </motion.section>

      {/* FOOTER */}
      <footer className='relative z-20'>
         {footer}
      </footer>
    </main>
  );
}
