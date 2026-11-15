import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const alertVariants = cva(
  'relative w-full rounded-xl border p-4 sm:p-5 text-[13.5px] leading-[1.6]',
  {
    variants: {
      variant: {
        default: 'border-[var(--line)] bg-[var(--wash)] text-[var(--ink)]',
        warn: 'border-[#c2700a]/25 bg-[var(--wash)] text-[var(--ink)]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div ref={ref} role="alert" className={cn(alertVariants({ variant }), className)} {...props} />
));
Alert.displayName = 'Alert';

export const AlertTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn('text-[14.5px] font-semibold leading-snug tracking-[-0.01em] text-[var(--ink)]', className)}
      {...props}
    />
  )
);
AlertTitle.displayName = 'AlertTitle';

export const AlertDescription = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('mt-1 text-[13.5px] leading-[1.6] text-[var(--sub)]', className)} {...props} />
  )
);
AlertDescription.displayName = 'AlertDescription';
