'use client';

import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export const Tabs = TabsPrimitive.Root;

export const TabsList = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      'inline-flex items-center rounded-lg border border-[var(--line)] bg-[#F5F5F2] p-0.5 text-[var(--sub)]',
      className
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

export const TabsTrigger = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      'relative inline-flex items-center justify-center whitespace-nowrap rounded-md px-2.5 py-1 text-xs font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--ink)] disabled:pointer-events-none disabled:opacity-50 data-[state=active]:text-[var(--ink)]',
      className
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

interface SpringTabTriggerProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> {
  active: boolean;
  layoutId: string;
}

export const SpringTabsTrigger = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Trigger>,
  SpringTabTriggerProps
>(({ className, children, active, layoutId, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      'relative z-10 inline-flex items-center justify-center whitespace-nowrap rounded-md px-2.5 py-1 text-xs font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--ink)]',
      active ? 'text-[var(--ink)]' : 'text-[var(--sub)] hover:text-[var(--ink)]',
      className
    )}
    {...props}
  >
    {active && (
      <motion.span
        layoutId={layoutId}
        transition={{ type: 'spring', stiffness: 460, damping: 34 }}
        aria-hidden="true"
        className="absolute inset-0 -z-10 rounded-md border border-[var(--line)] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.05)]"
      />
    )}
    {children}
  </TabsPrimitive.Trigger>
));
SpringTabsTrigger.displayName = 'SpringTabsTrigger';

export const TabsContent = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn('mt-3 focus-visible:outline-none', className)}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;
