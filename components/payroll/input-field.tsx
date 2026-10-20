import React from 'react';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          {label}
        </label>
        <input
          ref={ref}
          className={`
            w-full rounded-lg bg-neutral-950/80 px-4 py-2.5 
            font-sans text-sm text-white border transition-all duration-200
            placeholder:text-slate-600 focus:outline-none
            ${error ? 'border-red-500/50 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' 
                    : 'border-white/10 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20'}
            ${className}
          `}
          {...props}
        />
        {error && (
          <span className="text-xs text-red-400 mt-0.5">{error}</span>
        )}
      </div>
    );
  }
);

InputField.displayName = 'InputField';

export default InputField;
