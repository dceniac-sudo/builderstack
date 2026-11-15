import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-lg text-sm font-medium transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ink)] disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]',
  {
    variants: {
      variant: {
        default: 'bg-[var(--ink)] text-white shadow-[0_1px_2px_rgba(0,0,0,0.06)] hover:bg-[#2E2E2B]',
        outline: 'border border-[#D9D9D5] bg-white text-[var(--ink)] hover:border-[var(--ink)] hover:bg-[var(--wash)]',
        secondary: 'border border-[var(--line)] bg-[var(--wash)] text-[var(--ink)] hover:bg-[#EFEFEB]',
        ghost: 'text-[var(--sub)] hover:bg-[var(--wash)] hover:text-[var(--ink)]',
        link: 'text-[var(--ink)] underline decoration-[#CFCFCA] underline-offset-[3px] hover:decoration-[var(--ink)]',
      },
      size: {
        default: 'min-h-10 px-4 py-2 text-[13.5px]',
        sm: 'min-h-8 rounded-md px-3 text-xs',
        lg: 'min-h-11 rounded-[10px] px-[18px] text-[14.5px]',
        icon: 'h-9 w-9 p-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { buttonVariants };
