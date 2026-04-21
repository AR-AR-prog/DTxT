"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SignIn() {
  return (
    <div className="w-full max-w-md mx-auto p-8 rounded-[2rem] border border-stitch bg-card/50 backdrop-blur-xl shadow-[0_16px_40px_rgba(30,28,24,0.05)]">
      <div className="text-center mb-8">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-black/10 bg-white mb-4 shadow-sm relative overflow-hidden">
          {/* Digital Iris SVG placeholder */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-90">
            <path d="M12 4C7 4 2.73 7.11 1 12C2.73 16.89 7 20 12 20C17 20 21.27 16.89 23 12C21.27 7.11 17 4 12 4ZM12 17.5C8.96 17.5 6.5 15.04 6.5 12C6.5 8.96 8.96 6.5 12 6.5C15.04 6.5 17.5 8.96 17.5 12C17.5 15.04 15.04 17.5 12 17.5ZM12 8.5C10.07 8.5 8.5 10.07 8.5 12C8.5 13.93 10.07 15.5 12 15.5C13.93 15.5 15.5 13.93 15.5 12C15.5 10.07 13.93 8.5 12 8.5Z" fill="#1A1A1A" stroke="#1A1A1A" strokeWidth="0.5"/>
          </svg>
        </div>
        <h1 className="font-serif text-3xl font-bold tracking-tight text-foreground">Sign In</h1>
        <p className="text-sm text-foreground/60 mt-2 font-mono uppercase tracking-widest">To the verification workspace</p>
      </div>

      <form className="space-y-4 group">
        <div className="space-y-2">
          <label className="text-xs font-mono uppercase tracking-[0.1em] text-foreground/80">Email</label>
          <input 
            type="email" 
            placeholder="name@example.com" 
            className="w-full h-11 px-4 rounded-xl border border-border bg-white/60 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all font-sans"
          />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-xs font-mono uppercase tracking-[0.1em] text-foreground/80">Password</label>
            <Link href="#" className="flex text-[10px] uppercase font-mono text-accent hover:underline">Forgot?</Link>
          </div>
          <input 
            type="password" 
            className="w-full h-11 px-4 rounded-xl border border-border bg-white/60 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all font-sans"
          />
        </div>
        <Button className="w-full h-11 mt-6 text-background bg-foreground hover:bg-foreground/90 font-sans tracking-wide rounded-xl group-invalid:opacity-50 transition-opacity">
          Sign In
        </Button>
      </form>
      
      <div className="mt-6 text-center text-sm font-sans text-foreground/60">
        Don&apos;t have an account? <Link href="/register" className="text-foreground underline underline-offset-4 font-medium hover:text-accent">Request access</Link>
      </div>
    </div>
  );
}
