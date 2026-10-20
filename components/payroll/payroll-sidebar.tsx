'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  FileSpreadsheet, 
  Users, 
  BarChart3, 
  FileText, 
  Home, 
  ArrowLeftRight,
  ShieldCheck,
  Briefcase
} from 'lucide-react';

interface SidebarProps {
  isAdmin?: boolean;
}

export default function PayrollSidebar({ isAdmin = false }: SidebarProps) {
  const pathname = usePathname();

  const employeeLinks = [
    { name: 'Dashboard', href: '/payroll/employee', icon: LayoutDashboard },
    { name: 'Submit Adjustments', href: '/payroll/employee/submit', icon: FileSpreadsheet },
  ];

  const adminLinks = [
    { name: 'Admin Console', href: '/payroll/admin', icon: ShieldCheck },
    { name: 'Employees Directory', href: '/payroll/admin/employees', icon: Users },
    { name: 'Reports & Audits', href: '/payroll/admin/reports', icon: BarChart3 },
  ];

  const links = isAdmin ? adminLinks : employeeLinks;

  return (
    <aside className="w-64 border-r border-white/5 bg-neutral-950/80 backdrop-blur-md flex flex-col h-screen fixed left-0 top-0 text-white z-20">
      {/* Brand Header */}
      <div className="h-16 flex items-center px-6 border-b border-white/5 gap-2.5">
        <div className="h-8 w-8 rounded-lg bg-cyan-400 flex items-center justify-center shadow-[0_0_12px_rgba(34,211,238,0.5)]">
          <Briefcase className="h-4.5 w-4.5 text-slate-950" />
        </div>
        <div>
          <span className="font-bold text-sm tracking-wider uppercase block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">
            Helport Payroll
          </span>
          <span className="text-[10px] font-mono text-slate-400 block -mt-1">
            {isAdmin ? 'HR Administrator' : 'Employee Portal'}
          </span>
        </div>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {links.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;
          return (
            <Link 
              key={link.name} 
              href={link.href}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                ${isActive 
                  ? 'bg-cyan-500/10 border-l-2 border-cyan-400 text-cyan-400 shadow-[0_0_16px_rgba(6,182,212,0.05)]' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5'}
              `}
            >
              <Icon className={`h-4.5 w-4.5 ${isActive ? 'text-cyan-400' : 'text-slate-400 group-hover:text-white'}`} />
              {link.name}
            </Link>
          );
        })}
      </nav>

      {/* Quick Switch / Footer Actions */}
      <div className="p-4 border-t border-white/5 space-y-2">
        <Link 
          href={isAdmin ? "/payroll/employee" : "/payroll/admin"}
          className="flex items-center gap-2 justify-center w-full px-3 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider text-slate-400 bg-white/5 hover:bg-white/10 hover:text-white border border-white/5 transition-all duration-200"
        >
          <ArrowLeftRight className="h-3.5 w-3.5" />
          Switch to {isAdmin ? "Employee" : "Admin"}
        </Link>
        
        <Link 
          href="/payroll"
          className="flex items-center gap-2 justify-center w-full px-3 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-white transition-all duration-200"
        >
          <Home className="h-3.5 w-3.5" />
          Portal Hub
        </Link>
      </div>
    </aside>
  );
}
