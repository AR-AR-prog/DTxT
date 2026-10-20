import React from 'react';

interface ActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  children: React.ReactNode;
}

export default function ActionButton({ 
  variant = 'primary', 
  children, 
  className = '', 
  ...props 
}: ActionButtonProps) {
  const baseStyles = "relative flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black";
  
  const variants = {
    primary: "bg-cyan-400 text-slate-950 hover:bg-cyan-300 hover:shadow-[0_0_16px_rgba(34,211,238,0.4)] focus:ring-cyan-400",
    secondary: "bg-white/5 text-white border border-white/10 hover:bg-white/10 focus:ring-white",
    danger: "bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30 focus:ring-red-500"
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
