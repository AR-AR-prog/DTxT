'use client';

import React, { useState } from 'react';
import { 
  Search, 
  UserPlus, 
  Briefcase, 
  ShieldCheck, 
  Sliders, 
  Trash2, 
  Settings, 
  X,
  CreditCard,
  Building
} from 'lucide-react';
import GlassCard from '@/components/payroll/glass-card';
import StatusBadge from '@/components/payroll/status-badge';
import ActionButton from '@/components/payroll/action-button';
import InputField from '@/components/payroll/input-field';
import PayrollSidebar from '@/components/payroll/payroll-sidebar';

export default function EmployeeManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState<any | null>(null);

  // Sample database records (represented in local state)
  const [employees, setEmployees] = useState([
    { id: 'HP-00249', name: 'Emily Chen', email: 'emily@helport.ai', dept: 'AI Engineering', role: 'Staff Scientist', baseSalary: '$9,350.00', status: 'active', bank: 'Chase Bank (...8891)' },
    { id: 'HP-00250', name: 'John Davis', email: 'john.d@helport.ai', dept: 'Sales & Growth', role: 'Account Lead', baseSalary: '$8,120.00', status: 'active', bank: 'Wells Fargo (...0412)' },
    { id: 'HP-00251', name: 'Sophia Lopez', email: 'sophia.l@helport.ai', dept: 'Product Design', role: 'UX Designer', baseSalary: '$8,450.00', status: 'active', bank: 'Bank of America (...9921)' },
    { id: 'HP-00252', name: 'Hiroshi Tanaka', email: 'hiroshi@helport.ai', dept: 'Operations', role: 'Operations Lead', baseSalary: '$7,900.00', status: 'active', bank: 'CitiBank (...4451)' },
    { id: 'HP-00253', name: 'Chloe Williams', email: 'chloe@helport.ai', dept: 'Human Resources', role: 'HR Recruiter', baseSalary: '$6,800.00', status: 'active', bank: 'Chase Bank (...1120)' },
    { id: 'HP-00254', name: 'Marcus Vance', email: 'marcus@helport.ai', dept: 'Legal Counsel', role: 'Compliance officer', baseSalary: '$10,200.00', status: 'suspended', bank: 'Chase Bank (...0093)' }
  ]);

  const filteredEmployees = employees.filter(emp => 
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.dept.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleStatus = (id: string) => {
    setEmployees(prev => prev.map(emp => {
      if (emp.id === id) {
        const nextStatus = emp.status === 'active' ? 'suspended' : 'active';
        // Sync selected panel state if open
        if (selectedEmployee && selectedEmployee.id === id) {
          setSelectedEmployee({ ...selectedEmployee, status: nextStatus });
        }
        return { ...emp, status: nextStatus };
      }
      return emp;
    }));
  };

  return (
    <div className="min-h-screen bg-[#08090B] text-white pl-64 relative">
      {/* Sidebar */}
      <PayrollSidebar isAdmin />

      <main className="p-8 max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-white/5">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">Employees Directory</h1>
            <p className="text-sm text-slate-400">
              Manage base pay rates, role descriptors, deposit bank records, and contract states.
            </p>
          </div>

          <ActionButton variant="primary" className="text-xs uppercase tracking-wider px-4 py-2.5">
            <UserPlus className="h-4 w-4" />
            Add Employee Record
          </ActionButton>
        </div>

        {/* Filter Controls Row */}
        <div className="flex gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <input
              type="text"
              className="w-full bg-neutral-950/80 pl-10 pr-4 py-2.5 rounded-lg border border-white/10 text-sm focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/10 placeholder:text-slate-600 transition-all duration-200"
              placeholder="Search by name, employee ID, or department..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Master Directory Grid Workspace */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Layout (Table Directory): Col-span 8 (or 12 if no drawer is active) */}
          <div className={`${selectedEmployee ? 'lg:col-span-8' : 'lg:col-span-12'} space-y-4 transition-all duration-300`}>
            <GlassCard className="p-0 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/5 text-xs font-semibold uppercase text-slate-400 tracking-wider bg-white/[0.02]">
                      <th className="px-6 py-4">Employee ID</th>
                      <th className="px-6 py-4">Name</th>
                      <th className="px-6 py-4">Department</th>
                      <th className="px-6 py-4">Role</th>
                      <th className="px-6 py-4">Base Rate (Mo.)</th>
                      <th className="px-6 py-4">Contract Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-sm text-slate-300 font-sans">
                    {filteredEmployees.map((emp) => {
                      const isSelected = selectedEmployee?.id === emp.id;
                      return (
                        <tr 
                          key={emp.id} 
                          onClick={() => setSelectedEmployee(emp)}
                          className={`
                            cursor-pointer transition-all duration-200
                            ${isSelected ? 'bg-cyan-500/5 hover:bg-cyan-500/10 text-white' : 'hover:bg-white/[0.01]'}
                          `}
                        >
                          <td className="px-6 py-4 font-mono font-semibold">{emp.id}</td>
                          <td className="px-6 py-4 font-semibold text-white">{emp.name}</td>
                          <td className="px-6 py-4 text-slate-400">{emp.dept}</td>
                          <td className="px-6 py-4 text-slate-300">{emp.role}</td>
                          <td className="px-6 py-4 font-mono">{emp.baseSalary}</td>
                          <td className="px-6 py-4">
                            <StatusBadge 
                              status={emp.status === 'active' ? 'success' : 'danger'} 
                              label={emp.status === 'active' ? 'Active' : 'Suspended'} 
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </GlassCard>
          </div>

          {/* Right Slide-Over Panel (Col-span 4) */}
          {selectedEmployee && (
            <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-8 animate-slide-in">
              <GlassCard className="border-cyan-500/10 shadow-[0_0_30px_rgba(6,182,212,0.03)] p-6 space-y-6">
                
                {/* Header Actions */}
                <div className="flex justify-between items-start border-b border-white/5 pb-4">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 block">Record Details</span>
                    <h3 className="font-bold text-lg text-white">{selectedEmployee.name}</h3>
                  </div>
                  <button 
                    onClick={() => setSelectedEmployee(null)} 
                    className="p-1 hover:bg-white/5 text-slate-400 hover:text-white rounded transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Profile Fields */}
                <div className="space-y-4 text-xs font-sans">
                  
                  <div className="flex items-center gap-3 p-3 bg-neutral-950/40 rounded-lg border border-white/5">
                    <Building className="h-4.5 w-4.5 text-slate-400 shrink-0" />
                    <div className="space-y-0.5">
                      <span className="text-[10px] uppercase text-slate-500 font-semibold block">Office Assignment</span>
                      <span className="text-slate-200 font-medium">{selectedEmployee.dept} • {selectedEmployee.role}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-neutral-950/40 rounded-lg border border-white/5">
                    <CreditCard className="h-4.5 w-4.5 text-slate-400 shrink-0" />
                    <div className="space-y-0.5">
                      <span className="text-[10px] uppercase text-slate-500 font-semibold block">Bank Account Node</span>
                      <span className="text-slate-200 font-mono font-medium">{selectedEmployee.bank}</span>
                    </div>
                  </div>

                  <div className="space-y-3.5 border-t border-white/5 pt-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Employee ID</span>
                      <span className="font-mono font-semibold">{selectedEmployee.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Mail Address</span>
                      <span className="font-semibold">{selectedEmployee.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Contract Rate</span>
                      <span className="font-mono font-semibold text-cyan-400">{selectedEmployee.baseSalary} / Mo.</span>
                    </div>
                  </div>
                </div>

                {/* Action Override Control Nodes */}
                <div className="space-y-2 border-t border-white/5 pt-4">
                  <ActionButton 
                    variant={selectedEmployee.status === 'active' ? 'danger' : 'primary'}
                    onClick={() => toggleStatus(selectedEmployee.id)}
                    className="w-full py-2.5 text-xs uppercase tracking-wider font-semibold"
                  >
                    {selectedEmployee.status === 'active' ? 'Suspend Employee Contract' : 'Activate Employee Contract'}
                  </ActionButton>
                  
                  <ActionButton variant="secondary" className="w-full py-2.5 text-xs uppercase tracking-wider font-semibold">
                    <Settings className="h-4 w-4" />
                    Override Base Settings
                  </ActionButton>
                </div>

              </GlassCard>
            </div>
          )}

        </div>

      </main>
    </div>
  );
}
