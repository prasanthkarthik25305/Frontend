
import React from 'react';
import { cn } from '@/lib/utils';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  alignment?: 'left' | 'center' | 'right';
  className?: string;
  highlightColor?: string;
}

const SectionTitle = ({
  title,
  subtitle,
  alignment = 'center',
  className,
  highlightColor = 'bg-health-blue/10'
}: SectionTitleProps) => {
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  return (
    <div className={cn('mb-10', alignmentClasses[alignment], className)}>
      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 animate-fade-in opacity-0" style={{animationDelay: '100ms'}}>
        <span className={cn('px-2 -mx-2 rounded-lg py-1', highlightColor)}>
          {title}
        </span>
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto animate-fade-in opacity-0" style={{animationDelay: '200ms'}}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;
