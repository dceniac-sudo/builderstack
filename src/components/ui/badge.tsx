import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11.5px] font-medium transition-colors whitespace-nowrap',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-[var(--ink)] text-white',
        secondary: 'border-[var(--line)] bg-[var(--wash)] text-[var(--sub)]',
        outline: 'border-[var(--line)] bg-white text-[var(--ink)] shadow-[0_1px_2px_rgba(0,0,0,0.03)]',
        good: 'border-[#15803d]/20 bg-[#E8F3EC] text-[#15803d]',
        warn: 'border-[#c2700a]/25 bg-[#FEF5E7] text-[#c2700a]',
        bad: 'border-[#c0281f]/20 bg-[#FDECEB] text-[#c0281f]',
        mono: 'rounded-md border-[var(--line)] bg-[var(--wash)] px-2 py-0.5 font-mono text-[11px] text-[var(--ink)]',
      },
    },
    defaultVariants: {
      variant: 'secondary',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { badgeVariants };
