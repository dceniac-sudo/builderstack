'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { SiteFooter } from '@/components/SiteFooter';
import { OssCta, OssIndustryView } from '@/components/OssParts';
import { useI18n, localePath } from '@/lib/i18n';
import { cn } from '@/lib/utils';

// 行业列表页：一张表，一行一个行业。还没有项目的行业显示“评估中”，不能点。
export const OssIndustriesPage: React.FC<{ industries: OssIndustryView[] }> = ({ industries }) => {
  const { lang, t } = useI18n();
  const o = t.oss;
  const row = 'flex items-center justify-between gap-4 px-[18px] py-4 min-h-[68px]';

  return (
    <div className="flex-1 flex flex-col text-[15px] leading-[1.6]">
      <Navbar active="industries" />

      <main className="mx-auto w-full max-w-[860px] flex-1 px-5 pt-10 sm:px-10 sm:pt-16">
        <p className="mb-4 text-sm text-[var(--sub)]">
          <Link href={localePath(lang, '/')} className="hover:text-[var(--ink)]">
            {o.crumb}
          </Link>
          {' / '}
          {t.nav.industries}
        </p>
        <h1 className="rise text-[clamp(28px,4.2vw,44px)] font-semibold leading-[1.16] tracking-[-0.02em]">{o.industriesTitle}</h1>
        <p className="rise mt-3 text-[var(--sub)]" style={{ animationDelay: '70ms' }}>
          {o.industriesSub}
        </p>

        <div className="mt-8 rounded-[14px] border border-[var(--line)] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)] [overflow:clip]">
          {industries.map((industry, i) => {
            const body = (
              <>
                <span className="min-w-0">
                  <span className={cn('block text-[15.5px] font-semibold', !industry.href && 'text-[#9A9A96]')}>{industry.label}</span>
                  <span className="block text-[13px] text-[var(--sub)]">{industry.description}</span>
                </span>
                <span className="flex shrink-0 items-center gap-2 text-[13.5px] text-[var(--sub)]">
                  {industry.href ? o.projectCount(industry.count) : o.evaluating}
                  {industry.href && <ChevronRight aria-hidden="true" className="h-4 w-4" />}
                </span>
              </>
            );
            return (
              <div key={industry.id} className={cn('rise', i > 0 && 'border-t border-[var(--line)]')} style={{ animationDelay: `${140 + i * 40}ms` }}>
                {industry.href ? (
                  <Link href={industry.href} className={cn(row, 'transition-colors hover:bg-[var(--wash)]')}>
                    {body}
                  </Link>
                ) : (
                  <div className={row}>{body}</div>
                )}
              </div>
            );
          })}
        </div>

        <OssCta />
      </main>

      <SiteFooter />
    </div>
  );
};
