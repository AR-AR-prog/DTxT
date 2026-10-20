import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  onClick?: () => void;
}

export default function GlassCard({ children, className = '', hoverable = false, onClick }: GlassCardProps) {
  return (
    <div 
      onClick={onClick}
      className={`
        relative overflow-hidden rounded-xl border border-white/5
        bg-neutral-900/60 backdrop-blur-xl shadow-2xl transition-all duration-300
        ${hoverable ? 'hover:-translate-y-1 hover:border-cyan-500/20 hover:shadow-cyan-500/5 hover:bg-neutral-900/80 cursor-pointer' : ''}
        ${className}
      `}
    >
      {/* Decorative top-down soft light reflect gradient */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/5 to-transparent" />
      <div className="relative z-10 p-5">{children}</div>
    </div>
  );
}
