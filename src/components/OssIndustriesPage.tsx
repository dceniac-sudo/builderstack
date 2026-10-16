'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { SiteFooter } from '@/components/SiteFooter';
import { OssCategoryView, OssCta } from '@/components/OssParts';
import { useI18n, localePath } from '@/lib/i18n';

// 一栏：一个行业（标题点进行业页），下面是这个行业用得上的用途（点进用途页）。最后一栏是不分行业的用途。
export interface OssCategoryGroup {
  id: string;
  label: string;
  href?: string;               // 行业页；“各行业通用”这一栏没有
  items: OssCategoryView[];
}

// 分类列表页（2026-10-16 改，用户拿 OpenAlternative 的分类页做参考）：几栏链接列表，不用卡片和描述，一眼扫完。
// 按行业分栏、栏里列用途，两条线放在一页里；跨行业的用途（比如直播与视频会议）会出现在几栏里。
export const OssIndustriesPage: React.FC<{ groups: OssCategoryGroup[] }> = ({ groups }) => {
  const { lang, t } = useI18n();
  const o = t.oss;

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

        <div className="mt-10 grid grid-cols-1 gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((g, gi) => (
            <section key={g.id} className="rise" style={{ animationDelay: `${140 + gi * 50}ms` }}>
              <h2 className="text-[19px] font-semibold tracking-[-0.01em]">
                {g.href ? (
                  <Link href={g.href} className="underline-offset-4 hover:underline">
                    {g.label}
                  </Link>
                ) : (
                  g.label
                )}
              </h2>
              <ul className="mt-3">
                {g.items.map((u) => (
                  <li key={u.id}>
                    <Link href={u.href} className="group flex min-h-9 items-center gap-3 text-[var(--sub)] transition-colors hover:text-[var(--ink)]">
                      <ArrowRight aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-[#B4B4AF] transition-colors group-hover:text-[var(--ink)]" />
                      <span className="text-[15px] text-[var(--ink)]">{u.label}</span>
                      <span className="text-[12.5px]">{u.count}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <OssCta />
      </main>

      <SiteFooter />
    </div>
  );
};
