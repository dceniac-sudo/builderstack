'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { SiteFooter } from '@/components/SiteFooter';
import { OssCategoryView, OssCta } from '@/components/OssParts';
import { useI18n, localePath } from '@/lib/i18n';
import { cn } from '@/lib/utils';

// 分类列表页：按要解决的事（用途）和按行业各一张表，宽屏上左右并排，窄屏上下排。一行一个分类，都可以点进去。
export const OssIndustriesPage: React.FC<{ uses: OssCategoryView[]; industries: OssCategoryView[] }> = ({ uses, industries }) => {
  const { lang, t } = useI18n();
  const o = t.oss;
  const row = 'flex items-center justify-between gap-4 px-[18px] py-4 min-h-[68px]';

  const table = (items: OssCategoryView[], delay: number) => (
    <div className="mt-3 rounded-[14px] border border-[var(--line)] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)] [overflow:clip]">
      {items.map((item, i) => (
        <div key={item.id} className={cn('rise', i > 0 && 'border-t border-[var(--line)]')} style={{ animationDelay: `${delay + i * 30}ms` }}>
          <Link href={item.href} className={cn(row, 'transition-colors hover:bg-[var(--wash)]')}>
            <span className="min-w-0">
              <span className="block text-[15.5px] font-semibold">{item.label}</span>
              <span className="block text-[13px] text-[var(--sub)]">{item.description}</span>
            </span>
            <span className="flex shrink-0 items-center gap-2 text-[13.5px] text-[var(--sub)]">
              {o.projectCount(item.count)}
              <ChevronRight aria-hidden="true" className="h-4 w-4" />
            </span>
          </Link>
        </div>
      ))}
    </div>
  );

  return (
    <div className="flex-1 flex flex-col text-[15px] leading-[1.6]">
      <Navbar active="industries" />

      <main className="mx-auto w-full max-w-[1120px] flex-1 px-5 pt-10 sm:px-10 sm:pt-16">
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

        {/* 宽屏上两栏并排：左边按要解决的事，右边按行业（用户 2026-10-16 嫌单栏两侧空白太大） */}
        <div className="mt-9 grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] lg:items-start">
          <section>
            <h2 className="text-[19px] font-semibold tracking-[-0.01em]">{o.byUse}</h2>
            {table(uses, 140)}
          </section>
          <section>
            <h2 className="text-[19px] font-semibold tracking-[-0.01em]">{o.byIndustry}</h2>
            {table(industries, 200)}
          </section>
        </div>

        <OssCta />
      </main>

      <SiteFooter />
    </div>
  );
};
