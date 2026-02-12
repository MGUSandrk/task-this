import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, className = '', ...props }) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label className="font-mono text-xs uppercase tracking-wider text-gray-500">
          {label}
        </label>
      )}
      <input 
        className={`
          w-full bg-transparent border-2 border-grid p-3 font-mono text-sm outline-none transition-colors
          focus:border-foreground placeholder:text-gray-400
          ${error ? 'border-red-500' : ''}
          ${className}
        `}
        {...props}
      />
      {error && <span className="text-red-500 text-xs font-mono">{error}</span>}
    </div>
  );
};