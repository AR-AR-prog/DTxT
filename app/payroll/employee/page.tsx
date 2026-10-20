'use client';

import React from 'react';
import Link from 'next/link';
import { Calendar, Download, Eye, FileSpreadsheet, ArrowRight, User } from 'lucide-react';
import GlassCard from '@/components/payroll/glass-card';
import StatusBadge from '@/components/payroll/status-badge';
import ActionButton from '@/components/payroll/action-button';
import PayrollSidebar from '@/components/payroll/payroll-sidebar';

export default function EmployeeDashboard() {
  const recentPayslips = [
    { id: 'pay-2026-05', period: 'May 1 - May 31, 2026', issueDate: '2026-05-31', gross: '$9,350.00', net: '$7,240.50', status: 'success', emailStatus: 'Sent to emily@helport.ai' },
    { id: 'pay-2026-04', period: 'Apr 1 - Apr 30, 2026', issueDate: '2026-04-30', gross: '$9,350.00', net: '$7,240.50', status: 'success', emailStatus: 'Sent to emily@helport.ai' },
    { id: 'pay-2026-03', period: 'Mar 1 - Mar 31, 2026', issueDate: '2026-03-31', gross: '$9,120.00', net: '$7,070.00', status: 'success', emailStatus: 'Sent to emily@helport.ai' },
    { id: 'pay-2026-02', period: 'Feb 1 - Feb 28, 2026', issueDate: '2026-02-28', gross: '$9,120.00', net: '$7,070.00', status: 'success', emailStatus: 'Sent to emily@helport.ai' },
  ];

  return (
    <div className="min-h-screen bg-[#08090B] text-white pl-64">
      {/* Sidebar */}
      <PayrollSidebar />

      {/* Main Workspace */}
      <main className="p-8 max-w-7xl mx-auto space-y-8">
        
        {/* Portal Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-white/5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-xs font-mono tracking-widest uppercase text-slate-400">Employee Workspace</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight">Welcome back, Emily Chen</h1>
            <p className="text-sm text-slate-400">
              Employee ID: <span className="font-mono text-cyan-400">HP-00249</span> | Department: AI Research & Engineering
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Link href="/payroll/employee/submit">
              <ActionButton variant="primary" className="text-xs uppercase tracking-wider px-4 py-2.5">
                <FileSpreadsheet className="h-4 w-4" />
                Submit Adjustments
              </ActionButton>
            </Link>
          </div>
        </div>

        {/* Aggregated Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* YTD Gross */}
          <GlassCard>
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Gross Earnings YTD</span>
              <div className="flex items-baseline gap-2">
                <h3 className="text-3xl font-bold font-mono text-cyan-400">$84,350.00</h3>
                <span className="text-xs text-emerald-400 font-semibold font-sans">+12.4% vs LY</span>
              </div>
              <p className="text-xs text-slate-500">Calculated from fiscal start: Jan 1, 2026</p>
            </div>
          </GlassCard>

          {/* Last Pay Period Net */}
          <GlassCard>
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Net Pay (Last Period)</span>
              <div className="flex items-baseline gap-2">
                <h3 className="text-3xl font-bold font-mono text-white">$7,240.50</h3>
              </div>
              <p className="text-xs text-slate-500">Gross: $9,350.00 | Deductions applied: $2,109.50</p>
            </div>
          </GlassCard>

          {/* Payday Countdown */}
          <GlassCard>
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Next Payday Countdown</span>
              <div className="flex justify-between items-baseline">
                <h3 className="text-3xl font-bold text-white">14 Days</h3>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" /> June 15, 2026
                </span>
              </div>
              <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden mt-1">
                <div className="bg-cyan-400 h-full w-[53%]" />
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Recent Documents Table */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold tracking-tight">Recent Payslips</h2>
            <span className="text-xs text-slate-400">Showing last 4 salary cycles</span>
          </div>

          <GlassCard className="p-0 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/5 text-xs font-semibold uppercase text-slate-400 tracking-wider bg-white/[0.02]">
                    <th className="px-6 py-4">Pay Period</th>
                    <th className="px-6 py-4">Issue Date</th>
                    <th className="px-6 py-4">Gross Earnings</th>
                    <th className="px-6 py-4">Net Take-home</th>
                    <th className="px-6 py-4">Delivery Node</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-sans">
                  {recentPayslips.map((payslip) => (
                    <tr key={payslip.id} className="hover:bg-white/[0.01] transition-colors text-sm text-slate-300">
                      <td className="px-6 py-4 font-semibold text-white">{payslip.period}</td>
                      <td className="px-6 py-4 font-mono">{payslip.issueDate}</td>
                      <td className="px-6 py-4 font-mono">{payslip.gross}</td>
                      <td className="px-6 py-4 font-mono font-semibold text-cyan-400">{payslip.net}</td>
                      <td className="px-6 py-4">
                        <StatusBadge status="success" label={payslip.emailStatus} />
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Link href={`/payroll/employee/payslips/${payslip.id}`}>
                            <ActionButton variant="secondary" className="px-3 py-1.5 text-xs gap-1">
                              <Eye className="h-3.5 w-3.5" />
                              View
                            </ActionButton>
                          </Link>
                          <ActionButton variant="secondary" className="px-3 py-1.5 text-xs gap-1 hover:border-cyan-400/20">
                            <Download className="h-3.5 w-3.5" />
                            PDF
                          </ActionButton>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCard>
        </div>

        {/* Profile / Informational Section */}
        <div className="grid md:grid-cols-2 gap-6 pt-4">
          <GlassCard className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                <User className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold text-white">Payment Method & Accounts</h3>
                <p className="text-xs text-slate-400">Active bank accounts and deposit logs</p>
              </div>
            </div>
            <div className="space-y-2.5 text-sm border-t border-white/5 pt-4">
              <div className="flex justify-between">
                <span className="text-slate-400">Deposit Option</span>
                <span className="font-semibold">Direct Deposit (SSO verified)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Financial Institution</span>
                <span className="font-semibold">Chase Bank, N.A.</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Account Ending</span>
                <span className="font-mono font-semibold">...8891</span>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                <FileSpreadsheet className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold text-white">Payroll Submission Status</h3>
                <p className="text-xs text-slate-400">Pending extra hours & adjustments for June</p>
              </div>
            </div>
            <div className="space-y-2.5 text-sm border-t border-white/5 pt-4">
              <div className="flex justify-between">
                <span className="text-slate-400">Submission Period</span>
                <span className="font-semibold">June 1 - June 15, 2026</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Approved Adjustments</span>
                <span className="font-semibold font-mono text-emerald-400">0.0 hrs ($0.00)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Current Status</span>
                <StatusBadge status="warning" label="Pending Submission" />
              </div>
            </div>
          </GlassCard>
        </div>

      </main>
    </div>
  );
}
