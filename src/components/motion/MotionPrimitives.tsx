'use client';

import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

export const FadeUp: React.FC<{
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: 'div' | 'section' | 'article';
  id?: string;
}> = ({ children, delay = 0, className, as = 'div', id }) => {
  const Comp = as === 'section' ? motion.section : as === 'article' ? motion.article : motion.div;
  return (
    <Comp
      id={id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </Comp>
  );
};

export const ReadingProgressBar: React.FC<{ className?: string }> = ({ className }) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 320, damping: 32, restDelta: 0.001 });

  return (
    <div
      aria-hidden="true"
      className={cn('pointer-events-none fixed left-0 right-0 top-0 z-50 h-[2px] bg-transparent', className)}
    >
      <motion.div
        style={{ scaleX, transformOrigin: '0% 50%' }}
        className="h-full w-full bg-[var(--ink)]"
      />
    </div>
  );
};

export const AnimatedBar: React.FC<{
  percent: number;
  tone?: 'ink' | 'muted' | 'good' | 'warn';
  className?: string;
}> = ({ percent, tone = 'ink', className }) => {
  const clamped = Math.max(4, Math.min(100, percent));
  return (
    <div className={cn('h-2 w-full overflow-hidden rounded-full bg-[#F4F4F1]', className)}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${clamped}%` }}
        transition={{ type: 'spring', stiffness: 280, damping: 30 }}
        className={cn(
          'h-full rounded-full',
          tone === 'ink' && 'bg-[var(--ink)]',
          tone === 'muted' && 'bg-[#737370]',
          tone === 'good' && 'bg-[var(--good)]',
          tone === 'warn' && 'bg-[var(--warn)]'
        )}
      />
    </div>
  );
};

export interface SourceCitationData {
  label: string;
  url: string;
  date: string;
  quote: string;
  sponsored?: boolean;
}

export const SourceCitationPill: React.FC<{
  citation: SourceCitationData;
  lang?: 'en' | 'zh';
}> = ({ citation, lang = 'en' }) => {
  const rel = citation.sponsored ? 'sponsored noopener noreferrer' : 'noopener noreferrer';
  const heading = lang === 'zh' ? '一手原文摘录' : 'PRIMARY SOURCE';
  const checkedLabel = lang === 'zh' ? `核对 ${citation.date}` : `Checked ${citation.date}`;
  const verifyLabel = lang === 'zh' ? '核对原文' : 'Verify URL';

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <a
          href={citation.url}
          target="_blank"
          rel={rel}
          className="inline-flex items-center gap-1 rounded-md border border-black/[0.08] bg-[var(--wash)] px-1.5 py-0.5 font-mono text-[11px] font-medium text-[var(--sub)] transition-colors hover:border-[var(--ink)]/35 hover:text-[var(--ink)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--ink)]"
        >
          <span>{citation.label}</span>
          <ExternalLink aria-hidden="true" className="h-2.5 w-2.5 opacity-70" />
        </a>
      </TooltipTrigger>
      <TooltipContent>
        <div className="flex items-center justify-between gap-2 font-mono text-[10.5px] font-medium text-[var(--sub)]">
          <span>{heading}</span>
          <span>{checkedLabel}</span>
        </div>
        <p className="mt-1.5 text-[12px] leading-[1.45] text-[var(--ink)]">{citation.quote}</p>
        <a
          href={citation.url}
          target="_blank"
          rel={rel}
          className="mt-2 inline-flex items-center gap-1 font-mono text-[11px] font-medium text-[var(--ink)] underline decoration-black/25 underline-offset-2 hover:decoration-[var(--ink)]"
        >
          <span>{verifyLabel}</span>
          <ExternalLink aria-hidden="true" className="h-3 w-3" />
        </a>
      </TooltipContent>
    </Tooltip>
  );
};
