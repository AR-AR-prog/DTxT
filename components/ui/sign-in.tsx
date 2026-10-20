'use client'

import React, { useState } from 'react';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { GoogleSignInButton } from '@/components/google-sign-in-button'
import { TestimonialsColumn } from './testimonials-columns-1'

export interface Testimonial {
  avatarSrc: string;
  name: string;
  handle: string;
  text: string;
}

interface SignInPageProps {
  mode: 'login' | 'register';
  title?: React.ReactNode;
  description?: React.ReactNode;
  heroImageSrc?: string;
  testimonials?: Testimonial[];
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  isLoading?: boolean;
  error?: string;
}

const agpAIsoTeam = [
  {
    avatarSrc: "/images/Patrick TOmas.jpg",
    name: "Patrick Tomas",
    handle: "Lead Developer",
    text: "Building agpAIso taught me how powerful AI can be when applied to real problems like misinformation."
  },
  {
    avatarSrc: "/images/Jeiwinfrey Ulep.jpg",
    name: "Jeiwinfrey Ulep",
    handle: "System Architect",
    text: "Designing the system architecture for agpAIso was a challenge I'm proud of. We built something that actually helps students think critically about what they read online."
  },
  {
    avatarSrc: "/images/Mark Leigh Samoy.jpg",
    name: "Mark Leigh Samoy",
    handle: "Security Analyst",
    text: "Fake news is a real threat to students doing research. agpAIso gives them a reliable first line of defense."
  },
  {
    avatarSrc: "/images/France Lagazo.jpg",
    name: "France Lagazo",
    handle: "Project Manager",
    text: "Managing this project showed me how much students need a tool like this. We didn't just build an app — we built something that helps people find the truth faster."
  },
  {
    avatarSrc: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=256&h=256&auto=format&fit=crop",
    name: "Dodge Lorenzo",
    handle: "Data Scientist",
    text: "The credibility scoring model we designed gives users a clear, honest picture of a source — no guesswork, just data."
  },
  {
    avatarSrc: "/images/charles blanco.jpg",
    name: "Charles Blanco",
    handle: "Software Engineer",
    text: "Every line of code in agpAIso was written with one goal: make it easier for students to verify what's real."
  },
  {
    avatarSrc: "/images/JB Tarun.jpg",
    name: "JB Tarun",
    handle: "Frontend Specialist",
    text: "I wanted the interface to feel as trustworthy as the tool itself — clean, clear, and honest."
  },
  {
    avatarSrc: "/images/Richmond Tamayo.png",
    name: "Richmond Tamayo",
    handle: "QA Engineer",
    text: "Testing agpAIso meant running it against hundreds of real articles. It holds up — and that's something we're genuinely proud of."
  },
  {
    avatarSrc: "/images/adlai angeles.jpg",
    name: "Adlai Angeles",
    handle: "Fullstack Developer",
    text: "From the database to the UI, every part of agpAIso was built to serve one purpose: helping people spot misinformation before it spreads."
  }
]

const GlassInputWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded-2xl border border-border bg-foreground/5 backdrop-blur-sm transition-colors focus-within:border-accent/70 focus-within:bg-accent/5">
    {children}
  </div>
);

export const SignInPage: React.FC<SignInPageProps> = ({
  mode,
  title = <span className="font-light text-foreground tracking-tighter">Welcome</span>,
  description = "Access your account and continue your journey with us",
  heroImageSrc,
  testimonials = [],
  onSubmit,
  isLoading = false,
  error = "",
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="h-dvh flex flex-col md:flex-row w-full bg-[#FDFCFA]">
      {/* Left column: form */}
      <section className="flex-1 overflow-y-auto">
        <div className="min-h-full flex items-center justify-center p-8">
          <div className="w-full max-w-md py-8">
            <div className="flex flex-col gap-6">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors w-fit"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Link>
              <h1 className="animate-element animate-delay-100 text-4xl md:text-5xl font-semibold leading-tight font-serif">{title}</h1>
              <p className="animate-element animate-delay-200 text-muted-foreground">{description}</p>

              <form className="space-y-5" onSubmit={onSubmit}>
                {mode === 'register' && (
                  <div className="animate-element animate-delay-300">
                    <label className="text-sm font-medium text-muted-foreground block mb-1">Full Name</label>
                    <GlassInputWrapper>
                      <input name="fullName" type="text" placeholder="John Doe" required className="w-full bg-transparent text-sm p-4 rounded-2xl focus:outline-none" />
                    </GlassInputWrapper>
                  </div>
                )}

                <div className="animate-element animate-delay-300">
                  <label className="text-sm font-medium text-muted-foreground block mb-1">Email Address</label>
                  <GlassInputWrapper>
                    <input name="email" type="email" placeholder="you@university.edu" required className="w-full bg-transparent text-sm p-4 rounded-2xl focus:outline-none" />
                  </GlassInputWrapper>
                </div>

                <div className="animate-element animate-delay-400">
                  <label className="text-sm font-medium text-muted-foreground block mb-1">Password</label>
                  <GlassInputWrapper>
                    <div className="relative">
                      <input name="password" type={showPassword ? 'text' : 'password'} placeholder="••••••••" required className="w-full bg-transparent text-sm p-4 pr-12 rounded-2xl focus:outline-none" />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-3 flex items-center">
                        {showPassword ? <EyeOff className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" /> : <Eye className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />}
                      </button>
                    </div>
                  </GlassInputWrapper>
                </div>

                {mode === 'register' && (
                  <div className="animate-element animate-delay-400">
                    <label className="text-sm font-medium text-muted-foreground block mb-1">Confirm Password</label>
                    <GlassInputWrapper>
                      <div className="relative">
                        <input name="confirmPassword" type={showPassword ? 'text' : 'password'} placeholder="••••••••" required className="w-full bg-transparent text-sm p-4 pr-12 rounded-2xl focus:outline-none" />
                      </div>
                    </GlassInputWrapper>
                  </div>
                )}

                {mode === 'login' && (
                  <div className="animate-element animate-delay-500 flex items-center justify-between text-sm">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" name="rememberMe" className="rounded border-border text-accent focus:ring-accent" />
                      <span className="text-foreground/90">Keep me signed in</span>
                    </label>
                    <a href="#" onClick={(e) => e.preventDefault()} className="hover:underline text-accent transition-colors font-medium">Reset password</a>
                  </div>
                )}

                {error && (
                  <p className="animate-element animate-delay-500 text-sm text-destructive font-medium">{error}</p>
                )}

                <button type="submit" disabled={isLoading} className="animate-element animate-delay-600 w-full rounded-2xl bg-foreground py-4 font-medium text-background hover:bg-foreground/90 disabled:opacity-70 transition-colors">
                  {isLoading ? (mode === 'login' ? 'Signing in...' : 'Creating account...') : (mode === 'login' ? 'Sign In' : 'Create Account')}
                </button>
              </form>

              <div className="animate-element animate-delay-700 relative flex items-center justify-center">
                <span className="w-full border-t border-border"></span>
                <span className="px-4 text-sm text-muted-foreground bg-background absolute">Or continue with</span>
              </div>

              <div className="animate-element animate-delay-800">
                 <GoogleSignInButton mode={mode} />
              </div>

              <p className="animate-element animate-delay-900 text-center text-sm text-muted-foreground mt-2">
                {mode === 'login' ? (
                  <>New to our platform? <a href="/register" className="text-accent font-medium hover:underline transition-colors">Create Account</a></>
                ) : (
                  <>Already have an account? <a href="/login" className="text-accent font-medium hover:underline transition-colors">Sign In</a></>
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Right column: Infinite scrolling team testimonials */}
      <section 
        className="hidden md:flex flex-1 relative h-screen overflow-hidden bg-muted/20 items-center justify-center gap-6 p-6"
        style={{
          maskImage: 'linear-gradient(to bottom, transparent, black 25%, black 75%, transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 25%, black 75%, transparent)'
        }}
      >
        <TestimonialsColumn testimonials={agpAIsoTeam.slice(0, 3)} duration={15} className="w-full max-w-[200px]" />
        <TestimonialsColumn testimonials={agpAIsoTeam.slice(3, 6)} duration={19} className="w-full max-w-[200px]" />
        <TestimonialsColumn testimonials={agpAIsoTeam.slice(6, 9)} duration={17} className="hidden lg:flex w-full max-w-[200px]" />
      </section>
    </div>
  );
};
