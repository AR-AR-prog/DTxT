import Link from 'next/link';
import { Briefcase, ShieldCheck, ArrowRight, Home } from 'lucide-react';
import GlassCard from '@/components/payroll/glass-card';

export default function PayrollHub() {
  return (
    <div className="min-h-screen bg-[#08090B] text-white flex flex-col justify-center items-center px-4 relative overflow-hidden">
      {/* Dynamic glow blobs */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[400px] h-[400px] rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none" />

      {/* Decorative cyber grid background */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none" 
        style={{
          backgroundImage: `
            linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="max-w-4xl w-full z-10 text-center space-y-8">
        {/* Hub Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/20 text-cyan-400 text-xs font-mono tracking-widest uppercase">
            Security Layer Enabled
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-cyan-100 to-slate-400 bg-clip-text text-transparent">
            Helport Payroll & Payslips
          </h1>
          <p className="text-slate-400 text-base md:text-lg max-w-xl mx-auto">
            Authorized employee and administrative portal for company accounts, salary submission approvals, and ledger tracking.
          </p>
        </div>

        {/* Portal Cards */}
        <div className="grid md:grid-cols-2 gap-6 text-left mt-8">
          {/* Employee Portal Card */}
          <Link href="/payroll/employee">
            <GlassCard hoverable className="h-full border-white/5 hover:border-cyan-400/30 group">
              <div className="flex flex-col h-full justify-between space-y-6">
                <div className="space-y-4">
                  <div className="h-12 w-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-110 group-hover:bg-cyan-500/20 group-hover:shadow-[0_0_16px_rgba(6,182,212,0.2)] transition-all duration-300">
                    <Briefcase className="h-6 w-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                    Employee Portal
                  </h2>
                  <p className="text-slate-400 text-sm">
                    Access your personalized workspace to submit monthly payroll adjustments, check hourly ledgers, view historical payslips, and download encrypted PDFs.
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-cyan-400 text-sm font-semibold uppercase tracking-wider mt-4">
                  Access Portal
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </GlassCard>
          </Link>

          {/* Admin Portal Card */}
          <Link href="/payroll/admin">
            <GlassCard hoverable className="h-full border-white/5 hover:border-indigo-400/30 group">
              <div className="flex flex-col h-full justify-between space-y-6">
                <div className="space-y-4">
                  <div className="h-12 w-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-110 group-hover:bg-indigo-500/20 group-hover:shadow-[0_0_16px_rgba(139,92,246,0.2)] transition-all duration-300">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                    Admin Portal
                  </h2>
                  <p className="text-slate-400 text-sm">
                    Command console for HR administrators. Sync employee indexes directly with Google Sheets, compile payroll indexes, and review delivery logs.
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-indigo-400 text-sm font-semibold uppercase tracking-wider mt-4">
                  Verify Credentials
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </GlassCard>
          </Link>
        </div>

        {/* Global actions */}
        <div className="flex justify-center pt-6">
          <Link 
            href="/"
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 transition-all duration-200 border border-white/5 text-sm"
          >
            <Home className="h-4 w-4" />
            Back to agpAIso Home
          </Link>
        </div>
      </div>
    </div>
  );
}
