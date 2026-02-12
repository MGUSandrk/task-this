import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  isLoading, 
  className = '', 
  ...props 
}) => {
  const baseStyle = "px-6 py-3 font-mono text-sm uppercase tracking-widest transition-all duration-200 active:translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-foreground text-background border-2 border-foreground hover:bg-transparent hover:text-foreground",
    outline: "bg-transparent text-foreground border-2 border-foreground hover:bg-foreground hover:text-background"
  };

  return (
    <button 
      className={`${baseStyle} ${variants[variant]} ${className}`}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? 'PROCESANDO...' : children}
    </button>
  );
};