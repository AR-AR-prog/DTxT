'use client'

import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
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
    avatarSrc: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=256&h=256&auto=format&fit=crop",
    name: "Patrick Tomas",
    handle: "Lead Developer",
    text: "The API integration is incredibly smooth."
  },
  {
    avatarSrc: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?q=80&w=256&h=256&auto=format&fit=crop",
    name: "Jeiwinfrey Ulep",
    handle: "System Architect",
    text: "World-class forensic UI transitions."
  },
  {
    avatarSrc: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=256&h=256&auto=format&fit=crop",
    name: "Mark Leigh Samoy",
    handle: "Security Analyst",
    text: "Essential tool for technical research."
  },
  {
    avatarSrc: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=256&h=256&auto=format&fit=crop",
    name: "France Lagazo",
    handle: "Project Manager",
    text: "Architecting the future of verification."
  },
  {
    avatarSrc: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=256&h=256&auto=format&fit=crop",
    name: "Dodge Lorenzo",
    handle: "Data Scientist",
    text: "Finally, an AI detector that doesn't hallucinate."
  },
  {
    avatarSrc: "https://images.unsplash.com/photo-1552058544-f2b08422138a?q=80&w=256&h=256&auto=format&fit=crop",
    name: "Charles Blanco",
    handle: "Software Engineer",
    text: "Flawless technical methodology."
  },
  {
    avatarSrc: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&h=256&auto=format&fit=crop",
    name: "JB Tarun",
    handle: "Frontend Specialist",
    text: "A joy to work with these components."
  },
  {
    avatarSrc: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=256&h=256&auto=format&fit=crop",
    name: "Richmond Tamayo",
    handle: "QA Engineer",
    text: "Highly efficient source verification."
  },
  {
    avatarSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&h=256&auto=format&fit=crop",
    name: "Adlai Angeles",
    handle: "Fullstack Developer",
    text: "Best tech stack for truth-seeking."
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
    <div className="h-[100dvh] flex flex-col md:flex-row w-full bg-[#FDFCFA]">
      {/* Left column: form */}
      <section className="flex-1 overflow-y-auto">
        <div className="min-h-full flex items-center justify-center p-8">
          <div className="w-full max-w-md py-8">
            <div className="flex flex-col gap-6">
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
