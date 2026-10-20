'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Download, Printer, Mail, ShieldCheck, Check } from 'lucide-react';
import GlassCard from '@/components/payroll/glass-card';
import ActionButton from '@/components/payroll/action-button';
import StatusBadge from '@/components/payroll/status-badge';
import PayrollSidebar from '@/components/payroll/payroll-sidebar';

export default function PayslipViewer({ params }: { params: Promise<{ id: string }> }) {
  // Unwrap parameters using React.use() or simple destructuring since it's a client page
  const resolvedParams = React.use(params);
  const id = resolvedParams.id;
  
  const [emailStatus, setEmailStatus] = useState<'sent' | 'sending'>('sent');

  const handlePrint = () => {
    window.print();
  };

  const handleEmailReset = () => {
    setEmailStatus('sending');
    setTimeout(() => {
      setEmailStatus('sent');
    }, 1500);
  };

  // Sample data corresponding to selected period
  const isMayPeriod = id === 'pay-2026-05' || id === 'pay-2026-04';
  const basicRate = 50;
  const basicHours = 160;
  const overtimeHours = isMayPeriod ? 15 : 12;
  const overtimeRate = 75;
  const grossPay = basicHours * basicRate + overtimeHours * overtimeRate + 225; // Base + OT + Stipend
  
  // Deductions
  const fedTax = grossPay * 0.15;
  const ficaTax = grossPay * 0.062;
  const medIns = 127.30;
  const retirement = 450.00;
  const totalDeductions = fedTax + ficaTax + medIns + retirement;
  const netTakeHome = grossPay - totalDeductions;

  return (
    <div className="min-h-screen bg-[#08090B] text-white pl-64 print:pl-0">
      
      {/* Sidebar hidden during prints */}
      <div className="print:hidden">
        <PayrollSidebar />
      </div>

      <main className="p-8 max-w-4xl mx-auto space-y-6 print:p-0 print:max-w-full">
        
        {/* Navigation & Action Panel (Hidden in print) */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/5 print:hidden">
          <div className="space-y-1">
            <Link href="/payroll/employee" className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-cyan-400 transition-colors">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Link>
            <h1 className="text-2xl font-bold tracking-tight">Payslip Document Viewer</h1>
          </div>

          <div className="flex flex-wrap gap-2">
            <ActionButton variant="secondary" onClick={handleEmailReset} disabled={emailStatus === 'sending'} className="text-xs gap-1.5 py-2">
              <Mail className="h-4 w-4" />
              {emailStatus === 'sending' ? 'Sending Email Copy...' : 'Email Copy to Me'}
            </ActionButton>
            
            <ActionButton variant="secondary" onClick={handlePrint} className="text-xs gap-1.5 py-2">
              <Printer className="h-4 w-4" />
              Print Payslip
            </ActionButton>

            <ActionButton variant="primary" className="text-xs gap-1.5 py-2 px-4">
              <Download className="h-4 w-4" />
              Download PDF
            </ActionButton>
          </div>
        </div>

        {/* Email Notification Dispatch Status Node */}
        <div className="p-4 bg-cyan-950/15 border border-cyan-500/10 rounded-xl flex items-center justify-between text-sm print:hidden">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-400">Email Delivery Notification Status:</span>
            <span className="font-semibold text-slate-200">Delivered on 2026-05-31 at 18:00 UTC</span>
          </div>
          <StatusBadge status="success" label="Secure Link Sent" />
        </div>

        {/* Payslip Document Card Wrapper */}
        <GlassCard className="p-0 border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.5)] print:border-none print:shadow-none print:bg-white print:text-black">
          
          {/* Document Content */}
          <div className="p-8 md:p-12 space-y-8 bg-neutral-900/40 print:bg-white print:p-0">
            
            {/* Header Block */}
            <div className="flex flex-col md:flex-row justify-between gap-6 pb-6 border-b border-white/10 print:border-black/10">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg bg-cyan-400 flex items-center justify-center print:bg-black">
                    <span className="text-slate-950 font-bold text-base print:text-white">H</span>
                  </div>
                  <span className="text-xl font-bold tracking-wider text-white print:text-black">HELPORT AI CORP.</span>
                </div>
                <p className="text-xs text-slate-400 print:text-slate-600 max-w-xs">
                  100 Marina Boulevard, Suite 500,<br />
                  San Francisco, CA 94123
                </p>
              </div>

              <div className="text-left md:text-right space-y-1.5">
                <h2 className="text-sm font-bold uppercase tracking-widest text-cyan-400 print:text-black">Official Salary Slip</h2>
                <div className="text-xs text-slate-400 print:text-slate-600 space-y-1 font-mono">
                  <p>PAYSLIP PERIOD: <span className="font-semibold text-white print:text-black">May 1 - May 31, 2026</span></p>
                  <p>ISSUE DATE: <span className="font-semibold text-white print:text-black">2026-05-31</span></p>
                </div>
              </div>
            </div>

            {/* Metadata Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 bg-neutral-950/40 rounded-xl border border-white/5 font-sans text-xs print:bg-slate-50 print:border-black/5 print:text-black">
              <div className="space-y-1">
                <span className="text-slate-500 block">Employee ID</span>
                <span className="font-mono font-semibold text-white print:text-black">HP-00249</span>
              </div>
              <div className="space-y-1">
                <span className="text-slate-500 block">Employee Name</span>
                <span className="font-semibold text-white print:text-black">Emily Chen</span>
              </div>
              <div className="space-y-1">
                <span className="text-slate-500 block">Department</span>
                <span className="font-semibold text-white print:text-black">AI Engineering</span>
              </div>
              <div className="space-y-1">
                <span className="text-slate-500 block">Bank Account</span>
                <span className="font-semibold text-white print:text-black font-mono">Chase Bank (...8891)</span>
              </div>
            </div>

            {/* Calculations Balance Double-Entry Table */}
            <div className="border border-white/10 rounded-xl overflow-hidden print:border-black/10">
              <div className="grid md:grid-cols-2 text-xs font-semibold uppercase tracking-wider text-slate-400 print:text-slate-600 bg-white/[0.02] border-b border-white/10 print:border-black/10">
                <div className="px-6 py-3 border-r border-white/10 print:border-black/10">Earnings Breakdown</div>
                <div className="px-6 py-3">Deductions Breakdown</div>
              </div>

              <div className="grid md:grid-cols-2 text-sm divide-y md:divide-y-0 md:divide-x divide-white/10 print:divide-black/10">
                
                {/* Left Column: Earnings */}
                <div className="px-6 py-4 space-y-3.5 print:bg-white">
                  <div className="flex justify-between items-baseline">
                    <span className="text-slate-300 print:text-black font-medium">Regular Base Hours</span>
                    <span className="text-xs text-slate-500 font-mono pr-2">({basicHours}h @ ${basicRate.toFixed(2)})</span>
                    <span className="font-mono text-white print:text-black font-semibold">${(basicHours * basicRate).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-slate-300 print:text-black font-medium">Overtime Premium Hours</span>
                    <span className="text-xs text-slate-500 font-mono pr-2">({overtimeHours}h @ ${overtimeRate.toFixed(2)})</span>
                    <span className="font-mono text-white print:text-black font-semibold">${(overtimeHours * overtimeRate).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-slate-300 print:text-black font-medium">Technology Stipend</span>
                    <span className="text-xs text-slate-500 font-mono pr-2">(Stipend)</span>
                    <span className="font-mono text-white print:text-black font-semibold">$225.00</span>
                  </div>
                </div>

                {/* Right Column: Deductions */}
                <div className="px-6 py-4 space-y-3.5 print:bg-white">
                  <div className="flex justify-between items-baseline">
                    <span className="text-slate-300 print:text-black font-medium">Federal Income Tax</span>
                    <span className="text-xs text-slate-500 font-mono pr-2">(15.0%)</span>
                    <span className="font-mono text-white print:text-black font-semibold">${fedTax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-slate-300 print:text-black font-medium">FICA Social Security</span>
                    <span className="text-xs text-slate-500 font-mono pr-2">(6.2%)</span>
                    <span className="font-mono text-white print:text-black font-semibold">${ficaTax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-slate-300 print:text-black font-medium">Medical Insurance PPO</span>
                    <span className="text-xs text-slate-500 font-mono pr-2">(Premium)</span>
                    <span className="font-mono text-white print:text-black font-semibold">${medIns.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-slate-300 print:text-black font-medium">Retirement Pension (401k)</span>
                    <span className="text-xs text-slate-500 font-mono pr-2">(Voluntary)</span>
                    <span className="font-mono text-white print:text-black font-semibold">${retirement.toFixed(2)}</span>
                  </div>
                </div>

              </div>

              {/* Aggregation Totals Bar */}
              <div className="grid md:grid-cols-2 border-t border-white/10 print:border-black/10 divide-y md:divide-y-0 md:divide-x divide-white/10 print:divide-black/10 text-sm font-semibold">
                <div className="px-6 py-4 flex justify-between bg-white/[0.01] print:bg-white">
                  <span className="text-slate-400 print:text-black uppercase text-xs tracking-wider">Gross Total</span>
                  <span className="font-mono text-white print:text-black font-bold">${grossPay.toFixed(2)}</span>
                </div>
                <div className="px-6 py-4 flex justify-between bg-white/[0.01] print:bg-white">
                  <span className="text-slate-400 print:text-black uppercase text-xs tracking-wider">Deductions Total</span>
                  <span className="font-mono text-white print:text-black font-bold">${totalDeductions.toFixed(2)}</span>
                </div>
              </div>

              {/* Net Take-Home Double-Underlined Header */}
              <div className="bg-cyan-950/20 border-t border-cyan-500/10 px-6 py-5 flex items-center justify-between print:bg-slate-50 print:border-black/10">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 print:text-black block">Net take-home pay</span>
                  <span className="text-[10px] text-slate-500 block">Funds cleared for bank deposit dispatch</span>
                </div>
                <div className="text-right">
                  <span className="font-mono text-2xl font-bold text-cyan-400 print:text-black border-b-4 border-double border-cyan-500/40 print:border-black/40 pb-0.5">
                    ${netTakeHome.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

            </div>

            {/* Cryptographic Compliance Footer */}
            <div className="pt-6 border-t border-white/5 print:border-black/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-[10px] font-mono text-slate-500">
              <div className="space-y-1">
                <p className="font-semibold text-slate-400 print:text-slate-700 uppercase tracking-widest text-[9px]">Validation Key & Security Hash</p>
                <p className="break-all select-all font-mono">SHA-256: 8f92bd3a41eef554a938de1f7481cf1350a498273b4eef892837ff452140a321</p>
              </div>
              <div className="flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/20 rounded px-2.5 py-1 text-emerald-400 font-semibold shrink-0 print:border-black/10 print:text-black">
                <ShieldCheck className="h-3.5 w-3.5 shrink-0" />
                <span>SSO Authenticated</span>
              </div>
            </div>

          </div>
        </GlassCard>
      </main>
    </div>
  );
}
