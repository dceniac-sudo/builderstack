import * as React from 'react';
import { cn } from '@/lib/utils';

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-11 w-full rounded-xl border border-[#D9D9D5] bg-white px-3.5 py-2 text-[15px] text-[var(--ink)] shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-[border-color,box-shadow] placeholder:text-[#8C8C88] focus-visible:border-[var(--ink)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(20,20,20,0.08)] disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';
