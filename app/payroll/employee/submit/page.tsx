'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Upload, FileText, CheckCircle2, ShieldCheck, Calculator } from 'lucide-react';
import GlassCard from '@/components/payroll/glass-card';
import InputField from '@/components/payroll/input-field';
import ActionButton from '@/components/payroll/action-button';
import StatusBadge from '@/components/payroll/status-badge';
import PayrollSidebar from '@/components/payroll/payroll-sidebar';

export default function PayrollSubmission() {
  // Input states
  const [baseHourlyRate, setBaseHourlyRate] = useState<number>(50);
  const [regularHours, setRegularHours] = useState<number>(160);
  const [overtimeHours, setOvertimeHours] = useState<number>(0);
  const [bonusAmount, setBonusAmount] = useState<number>(0);
  const [deductions, setDeductions] = useState<number>(450); // pension, etc.
  const [notes, setNotes] = useState<string>('');
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  
  // Validation and Modal states
  const [errorState, setErrorState] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);

  // Computed financial rates (Tax 22% average)
  const [grossPay, setGrossPay] = useState<number>(0);
  const [estimatedTax, setEstimatedTax] = useState<number>(0);
  const [netTakeHome, setNetTakeHome] = useState<number>(0);

  // Real-time calculation effect
  useEffect(() => {
    const regularEarnings = regularHours * baseHourlyRate;
    const overtimeEarnings = overtimeHours * (baseHourlyRate * 1.5);
    const calculatedGross = regularEarnings + overtimeEarnings + bonusAmount;
    
    // Tax rate deduction estimation (22.5%)
    const calculatedTax = calculatedGross * 0.225;
    const calculatedNet = calculatedGross - calculatedTax - deductions;

    setGrossPay(calculatedGross);
    setEstimatedTax(calculatedTax);
    setNetTakeHome(calculatedNet > 0 ? calculatedNet : 0);

    // Dynamic warning validations
    if (overtimeHours > 40) {
      setErrorState('Warning: Overtime hours exceed company policy threshold (40 hrs). Requires manual HR validation.');
    } else {
      setErrorState(null);
    }
  }, [baseHourlyRate, regularHours, overtimeHours, bonusAmount, deductions]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadedFile(e.target.files[0].name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate database write
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccessModal(true);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#08090B] text-white pl-64 relative">
      {/* Sidebar */}
      <PayrollSidebar />

      <main className="p-8 max-w-7xl mx-auto space-y-8">
        
        {/* Navigation & Header */}
        <div className="space-y-4">
          <Link href="/payroll/employee" className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-cyan-400 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
          <div className="pb-6 border-b border-white/5">
            <h1 className="text-3xl font-bold tracking-tight">Payroll Submission Form</h1>
            <p className="text-sm text-slate-400">
              Submit timesheets, overtime hours, adjustments, and stipends for Pay Period: <span className="font-mono text-cyan-400">June 1 - June 15, 2026</span>.
            </p>
          </div>
        </div>

        {/* 2-Column Workspace Grid */}
        <form onSubmit={handleSubmit} className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Form Inputs (Col-span 7) */}
          <div className="lg:col-span-7 space-y-6">
            <GlassCard className="space-y-6">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Calculator className="h-5 w-5 text-cyan-400" />
                Work Hours & Income Adjustments
              </h2>

              <div className="grid grid-cols-2 gap-4">
                <InputField
                  label="Regular Base Hours"
                  type="number"
                  value={regularHours}
                  onChange={(e) => setRegularHours(Math.max(0, Number(e.target.value)))}
                  required
                />
                <InputField
                  label="Hourly Base Rate ($)"
                  type="number"
                  value={baseHourlyRate}
                  onChange={(e) => setBaseHourlyRate(Math.max(0, Number(e.target.value)))}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <InputField
                  label="Overtime Hours Worked"
                  type="number"
                  value={overtimeHours}
                  onChange={(e) => setOvertimeHours(Math.max(0, Number(e.target.value)))}
                  error={overtimeHours > 40 ? "Exceeds standard limits" : undefined}
                />
                <InputField
                  label="Bonuses / Travel Stipends ($)"
                  type="number"
                  value={bonusAmount}
                  onChange={(e) => setBonusAmount(Math.max(0, Number(e.target.value)))}
                />
              </div>

              <div className="grid grid-cols-1">
                <InputField
                  label="Pre-Tax Deductions (401k / Health) ($)"
                  type="number"
                  value={deductions}
                  onChange={(e) => setDeductions(Math.max(0, Number(e.target.value)))}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Adjustment Justification Notes</label>
                <textarea
                  className="w-full h-24 rounded-lg bg-neutral-950/80 px-4 py-2.5 font-sans text-sm text-white border border-white/10 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 focus:outline-none transition-all duration-200"
                  placeholder="Detail reasons for bonuses, stipends, or overtime claims..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>

              {/* Upload Drag/Drop */}
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Timesheet verification (PDF / PNG)</label>
                <div className="border border-dashed border-white/10 hover:border-cyan-500/30 bg-neutral-950/40 rounded-xl p-6 text-center hover:bg-neutral-950/80 transition-all duration-200 relative group cursor-pointer">
                  <input
                    type="file"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={handleFileUpload}
                  />
                  <div className="flex flex-col items-center gap-2">
                    <div className="h-10 w-10 rounded-lg bg-cyan-400/5 flex items-center justify-center text-cyan-400 group-hover:scale-110 group-hover:bg-cyan-400/10 transition-transform duration-300">
                      <Upload className="h-5 w-5" />
                    </div>
                    {uploadedFile ? (
                      <div className="space-y-1">
                        <p className="text-sm font-semibold text-white flex items-center gap-1.5 justify-center">
                          <FileText className="h-4 w-4 text-cyan-400 animate-pulse" />
                          {uploadedFile}
                        </p>
                        <p className="text-xs text-slate-500">File uploaded cleanly. Click or drag to replace.</p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-sm font-medium text-slate-300">Click to upload or drag & drop files</p>
                        <p className="text-xs text-slate-500 mt-1">Timesheet logs, activity PDFs, up to 10MB</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Right Column: Calculator Widget & Confirm (Col-span 5) */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8">
            <GlassCard className="border-cyan-500/10 shadow-[0_0_30px_rgba(6,182,212,0.03)] space-y-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-white/5 pb-4">
                <Calculator className="h-5 w-5 text-cyan-400" />
                Real-Time Pay Computation
              </h3>

              {errorState && (
                <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg text-amber-400 text-xs flex gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0 animate-ping" />
                  <span>{errorState}</span>
                </div>
              )}

              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400">Regular Earnings ({regularHours}h @ ${baseHourlyRate})</span>
                  <span className="font-mono text-white">${(regularHours * baseHourlyRate).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </div>

                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400">Overtime Earnings ({overtimeHours}h @ ${baseHourlyRate * 1.5})</span>
                  <span className="font-mono text-white">${(overtimeHours * baseHourlyRate * 1.5).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </div>

                {bonusAmount > 0 && (
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-400">Bonuses & Stipends</span>
                    <span className="font-mono text-emerald-400">+${bonusAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                  </div>
                )}

                <div className="flex justify-between items-center text-sm border-t border-white/5 pt-4">
                  <span className="text-slate-300 font-medium">Estimated Gross Pay</span>
                  <span className="font-mono font-semibold text-white text-base">${grossPay.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </div>

                <div className="flex justify-between items-center text-sm text-red-400/80">
                  <span>Estimated Taxes (22.5%)</span>
                  <span className="font-mono">-${estimatedTax.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </div>

                {deductions > 0 && (
                  <div className="flex justify-between items-center text-sm text-red-400/80">
                    <span>Pre-Tax Deductions</span>
                    <span className="font-mono">-${deductions.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                  </div>
                )}

                <div className="flex justify-between items-center border-t border-cyan-500/10 pt-4 bg-cyan-950/10 -mx-5 px-5 py-4">
                  <div className="space-y-0.5">
                    <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400 block">Est. Take-Home Pay</span>
                    <span className="text-[10px] text-slate-500 block">Tax calculations are values estimation</span>
                  </div>
                  <span className="font-mono text-2xl font-bold text-cyan-400">${netTakeHome.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </div>
              </div>

              <ActionButton
                type="submit"
                variant="primary"
                className="w-full py-3 text-xs uppercase tracking-wider font-bold"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Writing to SQLite database...' : 'Submit Adjustments Log'}
              </ActionButton>
            </GlassCard>
          </div>

        </form>

      </main>

      {/* Success Modal Overlay */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <GlassCard className="max-w-md w-full border-cyan-500/20 shadow-[0_0_50px_rgba(6,182,212,0.15)] text-center p-8 space-y-6">
            <div className="h-16 w-16 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mx-auto animate-bounce">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-white">Submission Complete</h3>
              <p className="text-slate-400 text-sm">
                Your hours and adjustment requests have been successfully written to the database schema.
              </p>
            </div>

            <div className="p-4 bg-neutral-950/60 rounded-xl border border-white/5 text-left text-xs font-mono space-y-2">
              <div className="flex justify-between text-slate-400">
                <span>Row Hash ID:</span>
                <span className="text-cyan-400">#HP-SUB-98f921</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>DB Sync:</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5" /> Synced to Sheets
                </span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Claim Amount:</span>
                <span>${netTakeHome.toLocaleString(undefined, { minimumFractionDigits: 2 })} Net</span>
              </div>
            </div>

            <div className="flex justify-center gap-3">
              <ActionButton
                variant="primary"
                onClick={() => {
                  setShowSuccessModal(false);
                  // Reset states
                  setOvertimeHours(0);
                  setBonusAmount(0);
                  setNotes('');
                  setUploadedFile(null);
                }}
                className="w-full text-xs uppercase tracking-wider py-2.5"
              >
                Done
              </ActionButton>
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  );
}
