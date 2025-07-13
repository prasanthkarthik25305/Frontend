
import React from 'react';
import { cn } from '@/lib/utils';

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'cta' | 'specialty';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children: React.ReactNode;
}

const AnimatedButton = ({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: AnimatedButtonProps) => {
  const baseStyles = "relative overflow-hidden transition-all duration-300 font-medium rounded-lg transform hover:-translate-y-1 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variantStyles = {
    primary: "bg-health-blue text-white hover:bg-health-blue-light shadow-md hover:shadow-lg focus:ring-health-blue/30",
    secondary: "bg-white text-health-blue-light border border-health-blue/20 hover:border-health-blue/50 shadow-sm hover:shadow-md focus:ring-health-blue/20",
    cta: "bg-health-orange text-white hover:bg-health-orange-light shadow-md hover:shadow-lg focus:ring-health-orange/30",
    specialty: "bg-health-blue/90 text-white hover:bg-health-blue shadow-md hover:shadow-lg focus:ring-health-blue/30",
  };

  const sizeStyles = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {/* Subtle background glow effect */}
      <span className="absolute inset-0 overflow-hidden rounded-lg">
        <span className="absolute -inset-[100%] animate-[spin_4s_linear_infinite] bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></span>
      </span>
      
      <span className="relative z-10">{children}</span>
    </button>
  );
};

export default AnimatedButton;
