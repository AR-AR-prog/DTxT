'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Server, 
  Database, 
  CheckCircle, 
  FileCheck, 
  AlertTriangle,
  RefreshCw,
  Search,
  Check,
  X
} from 'lucide-react';
import GlassCard from '@/components/payroll/glass-card';
import StatusBadge from '@/components/payroll/status-badge';
import ActionButton from '@/components/payroll/action-button';
import PayrollSidebar from '@/components/payroll/payroll-sidebar';

export default function AdminDashboard() {
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [syncStatus, setSyncStatus] = useState<string>('Sync Completed (2 mins ago)');
  
  // Real-time audit logs state
  const [logs, setLogs] = useState<Array<{ time: string, msg: string, type: 'info' | 'warn' | 'success' }>>([
    { time: '11:15:20', msg: 'Admin session started via SSO OAuth.', type: 'info' },
    { time: '11:15:22', msg: 'Connection established with Google Sheet "Helport_Labor_Database_2026".', type: 'success' },
    { time: '11:15:25', msg: '42 active employee contracts verified from sheet indices.', type: 'info' },
    { time: '11:16:01', msg: 'Auto-PDF generation pipeline initialized.', type: 'info' },
    { time: '11:16:12', msg: 'Generated PDF document: Emily Chen (HP-00249) - Success.', type: 'success' },
    { time: '11:16:14', msg: 'Email dispatched: HP-00249 to emily@helport.ai.', type: 'success' },
  ]);

  // Periodic log stream simulation
  useEffect(() => {
    const messages = [
      { msg: 'SMTP dispatch queue verified: 0 pending emails.', type: 'success' },
      { msg: 'Backup copy of SQLite dev.db written to cloud secure bucket.', type: 'info' },
      { msg: 'System verification checks: All modules online.', type: 'info' },
      { msg: 'Warning: Hourly logs sync rate warning triggered (Threshold: 50 req/m).', type: 'warn' },
      { msg: 'Manual override log verified by Admin: HR Lead.', type: 'success' }
    ];

    const interval = setInterval(() => {
      const randomMsg = messages[Math.floor(Math.random() * messages.length)];
      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0];
      
      setLogs(prev => [
        { time: timeStr, msg: randomMsg.msg, type: randomMsg.type as any },
        ...prev.slice(0, 8) // Limit logs length
      ]);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const handleSync = () => {
    setIsSyncing(true);
    setSyncStatus('Synchronizing tables with Google Sheets API...');
    
    setTimeout(() => {
      setIsSyncing(false);
      const now = new Date();
      setSyncStatus(`Sync Completed (Just now)`);
      
      setLogs(prev => [
        { time: now.toTimeString().split(' ')[0], msg: 'Forced sync with Google Sheets completed. 42 profiles processed.', type: 'success' },
        ...prev
      ]);
    }, 2000);
  };

  const queueData = [
    { name: 'Emily Chen', dept: 'AI Engineering', baseAmount: '$9,350.00', calcStatus: 'success', calcLabel: 'Calculated', delivery: 'sent', deliveryLabel: 'Dispatched' },
    { name: 'John Davis', dept: 'Sales & Growth', baseAmount: '$8,120.00', calcStatus: 'success', calcLabel: 'Calculated', delivery: 'sent', deliveryLabel: 'Dispatched' },
    { name: 'Sophia Lopez', dept: 'Product Design', baseAmount: '$8,450.00', calcStatus: 'success', calcLabel: 'Calculated', delivery: 'sent', deliveryLabel: 'Dispatched' },
    { name: 'Hiroshi Tanaka', dept: 'Operations', baseAmount: '$7,900.00', calcStatus: 'warning', calcLabel: 'Pending Rev.', delivery: 'blocked', deliveryLabel: 'Blocked' },
    { name: 'Chloe Williams', dept: 'Human Resources', baseAmount: '$6,800.00', calcStatus: 'success', calcLabel: 'Calculated', delivery: 'sent', deliveryLabel: 'Dispatched' }
  ];

  return (
    <div className="min-h-screen bg-[#08090B] text-white pl-64 relative">
      {/* Sidebar */}
      <PayrollSidebar isAdmin />

      <main className="p-8 max-w-7xl mx-auto space-y-8">
        
        {/* Admin Portal Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-white/5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-indigo-400 animate-pulse" />
              <span className="text-xs font-mono tracking-widest uppercase text-slate-400">Admin Control Center</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight">System Command Board</h1>
            <p className="text-sm text-slate-400">
              Active Sync Database: <span className="font-mono text-cyan-400">Google Sheet ID: 1eX...8Yp</span>
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <ActionButton 
              variant="secondary" 
              onClick={handleSync} 
              disabled={isSyncing}
              className="text-xs uppercase tracking-wider px-4 py-2.5"
            >
              <RefreshCw className={`h-4 w-4 ${isSyncing ? 'animate-spin' : ''}`} />
              {isSyncing ? 'Syncing...' : 'Sync Google Sheets'}
            </ActionButton>
          </div>
        </div>

        {/* Server System Health Indicators */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-neutral-900/40 border border-white/5 rounded-xl flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <Database className="h-4.5 w-4.5" />
            </div>
            <div>
              <span className="text-[10px] uppercase text-slate-500 tracking-wider font-semibold block">Google Sheet Connector</span>
              <span className="text-sm font-semibold text-white">Online & Synced</span>
            </div>
          </div>
          
          <div className="p-4 bg-neutral-900/40 border border-white/5 rounded-xl flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <FileCheck className="h-4.5 w-4.5" />
            </div>
            <div>
              <span className="text-[10px] uppercase text-slate-500 tracking-wider font-semibold block">Auto-PDF Compiler</span>
              <span className="text-sm font-semibold text-white">Idle | Queue Complete</span>
            </div>
          </div>

          <div className="p-4 bg-neutral-900/40 border border-white/5 rounded-xl flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <Server className="h-4.5 w-4.5" />
            </div>
            <div>
              <span className="text-[10px] uppercase text-slate-500 tracking-wider font-semibold block">SMTP Mail Gateway</span>
              <span className="text-sm font-semibold text-white">Active | Dispatching</span>
            </div>
          </div>
        </div>

        {/* Aggregate Stats Metrics */}
        <div className="grid md:grid-cols-5 gap-4">
          <GlassCard className="p-4 md:col-span-2">
            <span className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Total Payroll Liability</span>
            <h3 className="text-2xl font-bold font-mono text-cyan-400 mt-1">$312,450.00</h3>
            <p className="text-[10px] text-slate-500 mt-1">{syncStatus}</p>
          </GlassCard>

          <GlassCard className="p-4">
            <span className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Synced Profiles</span>
            <h3 className="text-2xl font-bold font-mono text-white mt-1">42 / 42</h3>
            <p className="text-[10px] text-slate-500 mt-1">100% active alignment</p>
          </GlassCard>

          <GlassCard className="p-4">
            <span className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">PDF Compilation</span>
            <h3 className="text-2xl font-bold font-mono text-white mt-1">42 (100%)</h3>
            <p className="text-[10px] text-emerald-400 mt-1">✓ Complete</p>
          </GlassCard>

          <GlassCard className="p-4">
            <span className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Email Dispatch</span>
            <h3 className="text-2xl font-bold font-mono text-emerald-400 mt-1">99.8%</h3>
            <p className="text-[10px] text-slate-500 mt-1">41 sent / 1 review</p>
          </GlassCard>
        </div>

        {/* Split Grid workspace */}
        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* Left Column (60%): Compile Queue */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold tracking-tight">Auto-Generation Pipeline</h2>
              <span className="text-xs text-slate-400">Payroll Cycle: May 2026</span>
            </div>

            <GlassCard className="p-0 overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/5 text-[10px] font-semibold uppercase text-slate-400 tracking-wider bg-white/[0.02]">
                    <th className="px-5 py-3">Employee</th>
                    <th className="px-5 py-3">Dept</th>
                    <th className="px-5 py-3">Base Amount</th>
                    <th className="px-5 py-3">Calculations</th>
                    <th className="px-5 py-3">Email Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-xs text-slate-300">
                  {queueData.map((row, idx) => (
                    <tr key={idx} className="hover:bg-white/[0.01]">
                      <td className="px-5 py-3.5 font-semibold text-white">{row.name}</td>
                      <td className="px-5 py-3.5 text-slate-400">{row.dept}</td>
                      <td className="px-5 py-3.5 font-mono">{row.baseAmount}</td>
                      <td className="px-5 py-3.5">
                        <StatusBadge 
                          status={row.calcStatus === 'success' ? 'success' : 'warning'} 
                          label={row.calcLabel} 
                        />
                      </td>
                      <td className="px-5 py-3.5">
                        <StatusBadge 
                          status={row.delivery === 'sent' ? 'info' : 'danger'} 
                          label={row.deliveryLabel} 
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </GlassCard>
          </div>

          {/* Right Column (40%): Live Log stream */}
          <div className="lg:col-span-4 space-y-4">
            <h2 className="text-lg font-bold tracking-tight">Security Audit Stream</h2>
            <div className="border border-white/5 bg-neutral-950 rounded-xl p-5 shadow-2xl h-[330px] overflow-y-auto flex flex-col-reverse font-mono text-[10px] leading-relaxed gap-2 scrollbar-thin">
              {logs.map((log, idx) => {
                const color = {
                  info: 'text-slate-400',
                  warn: 'text-amber-400',
                  success: 'text-cyan-400'
                }[log.type];

                return (
                  <div key={idx} className={`${color} border-l border-white/5 pl-2 py-0.5`}>
                    <span className="text-slate-500 font-semibold pr-1.5">[{log.time}]</span>
                    {log.msg}
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}
