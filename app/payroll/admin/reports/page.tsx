'use client';

import React, { useState, useEffect } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  Legend
} from 'recharts';
import { Download, FileSpreadsheet, ShieldAlert, BarChart3, TrendingUp } from 'lucide-react';
import GlassCard from '@/components/payroll/glass-card';
import ActionButton from '@/components/payroll/action-button';
import StatusBadge from '@/components/payroll/status-badge';
import PayrollSidebar from '@/components/payroll/payroll-sidebar';

// Mock data for analytics
const monthlyTrendData = [
  { month: 'Jan', liability: 285000, employees: 40 },
  { month: 'Feb', liability: 292000, employees: 41 },
  { month: 'Mar', liability: 292000, employees: 41 },
  { month: 'Apr', liability: 305000, employees: 42 },
  { month: 'May', liability: 312450, employees: 42 },
  { month: 'Jun', liability: 312450, employees: 42 },
];

const departmentCostData = [
  { name: 'Engineering', cost: 125000, count: 15 },
  { name: 'Growth/Sales', cost: 72000, count: 11 },
  { name: 'Product/Design', cost: 58000, count: 8 },
  { name: 'Operations', cost: 35000, count: 5 },
  { name: 'Admin/HR', cost: 22450, count: 3 },
];

export default function ReportsAnalytics() {
  const [mounted, setMounted] = useState(false);

  // Recharts requires mounting on client side to prevent server-side mismatches
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#08090B] text-white pl-64 relative">
      {/* Sidebar */}
      <PayrollSidebar isAdmin />

      <main className="p-8 max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-white/5">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
            <p className="text-sm text-slate-400">
              Overview monthly liability metrics, tax deductions logs, and department resource breakdowns.
            </p>
          </div>

          <div className="flex gap-2">
            <ActionButton variant="secondary" className="text-xs uppercase tracking-wider px-3.5 py-2.5">
              <FileSpreadsheet className="h-4 w-4" />
              Export CSV Ledger
            </ActionButton>
            <ActionButton variant="primary" className="text-xs uppercase tracking-wider px-4 py-2.5">
              <Download className="h-4 w-4" />
              Download Q2 Report
            </ActionButton>
          </div>
        </div>

        {/* 2-Column Analytics Workspace */}
        {mounted && (
          <div className="grid lg:grid-cols-2 gap-8">
            
            {/* Chart 1: Liability Trends */}
            <GlassCard className="space-y-4">
              <div className="flex items-center gap-2 border-b border-white/5 pb-4 justify-between">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 block">Liability Tracker</span>
                  <h3 className="font-bold text-base text-white">Monthly Payroll Expense Trends</h3>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded">
                  <TrendingUp className="h-3.5 w-3.5" />
                  <span>+9.6% YTD</span>
                </div>
              </div>

              <div className="h-72 w-full pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyTrendData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="month" stroke="#64748b" fontSize={11} tickLine={false} />
                    <YAxis 
                      stroke="#64748b" 
                      fontSize={11} 
                      tickLine={false} 
                      tickFormatter={(val) => `$${(val / 1000)}k`} 
                    />
                    <Tooltip 
                      contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                      labelClassName="text-slate-400 font-bold"
                    />
                    <Legend wrapperStyle={{ fontSize: 11, pt: 10 }} />
                    <Line 
                      type="monotone" 
                      dataKey="liability" 
                      name="Total Cost ($)" 
                      stroke="#06b6d4" 
                      strokeWidth={2.5} 
                      dot={{ r: 4, strokeWidth: 2 }}
                      activeDot={{ r: 6 }} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </GlassCard>

            {/* Chart 2: Cost by Department */}
            <GlassCard className="space-y-4">
              <div className="flex items-center gap-2 border-b border-white/5 pb-4 justify-between">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 block">Department Index</span>
                  <h3 className="font-bold text-base text-white">Payroll Distribution by Department</h3>
                </div>
                <StatusBadge status="success" label="Active Alignment" />
              </div>

              <div className="h-72 w-full pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={departmentCostData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} />
                    <YAxis 
                      stroke="#64748b" 
                      fontSize={11} 
                      tickLine={false} 
                      tickFormatter={(val) => `$${(val / 1000)}k`}
                    />
                    <Tooltip 
                      contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                      labelClassName="text-slate-400 font-bold"
                    />
                    <Legend wrapperStyle={{ fontSize: 11, pt: 10 }} />
                    <Bar 
                      dataKey="cost" 
                      name="Allocated Cost ($)" 
                      fill="#8b5cf6" 
                      radius={[4, 4, 0, 0]} 
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </GlassCard>

          </div>
        )}

        {/* Ledger Audits History */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold tracking-tight">Recent Financial Events Ledger</h2>
            <span className="text-xs text-slate-400">Showing last 3 months action indicators</span>
          </div>

          <GlassCard className="p-0 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/5 text-[10px] font-semibold uppercase text-slate-400 tracking-wider bg-white/[0.02]">
                    <th className="px-6 py-3.5">Filing period</th>
                    <th className="px-6 py-3.5">Approval Date</th>
                    <th className="px-6 py-3.5">Filing Admin</th>
                    <th className="px-6 py-3.5">Total Dispatched</th>
                    <th className="px-6 py-3.5">Audits Code</th>
                    <th className="px-6 py-3.5 text-right">Ledger Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-xs text-slate-300 font-sans">
                  <tr className="hover:bg-white/[0.01]">
                    <td className="px-6 py-4 font-semibold text-white">May 2026 Salary Cycle</td>
                    <td className="px-6 py-4 font-mono">2026-05-31</td>
                    <td className="px-6 py-4">HR Lead Admin</td>
                    <td className="px-6 py-4 font-mono">$312,450.00</td>
                    <td className="px-6 py-4 font-mono">MD-PAY-260531</td>
                    <td className="px-6 py-4 text-right">
                      <StatusBadge status="success" label="Audited & Filed" />
                    </td>
                  </tr>
                  <tr className="hover:bg-white/[0.01]">
                    <td className="px-6 py-4 font-semibold text-white">April 2026 Salary Cycle</td>
                    <td className="px-6 py-4 font-mono">2026-04-30</td>
                    <td className="px-6 py-4">HR Lead Admin</td>
                    <td className="px-6 py-4 font-mono">$305,000.00</td>
                    <td className="px-6 py-4 font-mono">MD-PAY-260430</td>
                    <td className="px-6 py-4 text-right">
                      <StatusBadge status="success" label="Audited & Filed" />
                    </td>
                  </tr>
                  <tr className="hover:bg-white/[0.01]">
                    <td className="px-6 py-4 font-semibold text-white">March 2026 Salary Cycle</td>
                    <td className="px-6 py-4 font-mono">2026-03-31</td>
                    <td className="px-6 py-4">Junior Accountant</td>
                    <td className="px-6 py-4 font-mono">$292,000.00</td>
                    <td className="px-6 py-4 font-mono">MD-PAY-260331</td>
                    <td className="px-6 py-4 text-right">
                      <StatusBadge status="success" label="Audited & Filed" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </GlassCard>
        </div>

      </main>
    </div>
  );
}
