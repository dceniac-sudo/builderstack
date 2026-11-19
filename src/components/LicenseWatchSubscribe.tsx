'use client';

import React from 'react';
import { ArrowUpRight, Rss } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SUBSTACK_URL, useI18n } from '@/lib/i18n';

export const LicenseWatchSubscribe: React.FC<{ id?: string; className?: string }> = ({
  id = 'license-watch',
  className = 'mt-12',
}) => {
  const { t } = useI18n();
  const w = t.watch;

  return (
    <section
      id={id}
      className={`${className} scroll-mt-24 rounded-[10px] border border-[var(--line)] bg-[var(--wash)] p-6 sm:p-7`}
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-[560px]">
          <div className="flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.06em] text-[#737370]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#F59E0B]" />
            <span>{w.kicker}</span>
          </div>
          <h2 className="mt-2 text-[20px] font-semibold leading-[1.3] tracking-[-0.015em] text-[var(--ink)]">
            {w.title}
          </h2>
          <p className="mt-2 text-[14.5px] leading-[1.65] text-[var(--sub)]">{w.body}</p>
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-2.5 lg:flex-col lg:items-stretch lg:min-w-[230px]">
          <Button asChild size="lg">
            <a href={SUBSTACK_URL} target="_blank" rel="noopener noreferrer">
              <span>{w.subscribeButton}</span>
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </a>
          </Button>
          <Button asChild variant="outline" className="font-mono text-[12.5px]">
            <a href="/rss.xml">
              <Rss aria-hidden="true" className="h-3.5 w-3.5 text-[#F59E0B]" />
              <span>{w.rssButton}</span>
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};
