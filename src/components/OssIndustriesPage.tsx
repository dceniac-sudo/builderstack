'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { SiteFooter } from '@/components/SiteFooter';
import { OssCategoryView, OssCta } from '@/components/OssParts';
import { Badge } from '@/components/ui/badge';
import { FadeUp } from '@/components/motion/MotionPrimitives';
import { useI18n, localePath } from '@/lib/i18n';

export interface OssCategoryGroup {
  id: string;
  label: string;
  href?: string;
  items: OssCategoryView[];
}

export const OssIndustriesPage: React.FC<{ groups: OssCategoryGroup[] }> = ({ groups }) => {
  const { lang, t } = useI18n();
  const o = t.oss;

  return (
    <div className="flex flex-1 flex-col text-[15px] leading-[1.6]">
      <Navbar active="industries" />

      <main className="mx-auto w-full max-w-[1120px] flex-1 px-5 pt-10 sm:px-10 sm:pt-16">
        <FadeUp>
          <p className="mb-4 text-sm text-[var(--sub)]">
            <Link href={localePath(lang, '/')} className="hover:text-[var(--ink)]">
              {o.crumb}
            </Link>
            {' / '}
            {t.nav.industries}
          </p>
          <h1 className="text-[clamp(28px,4.2vw,44px)] font-semibold leading-[1.16] tracking-[-0.02em]">
            {o.industriesTitle}
          </h1>
          <p className="mt-3 text-[var(--sub)]">{o.industriesSub}</p>
        </FadeUp>

        <div className="mt-10 grid grid-cols-1 gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((g, gi) => (
            <FadeUp as="section" key={g.id} delay={0.05 + gi * 0.04}>
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
                    <Link
                      href={u.href}
                      className="group flex min-h-9 items-center gap-3 text-[var(--sub)] transition-colors hover:text-[var(--ink)]"
                    >
                      <ArrowRight
                        aria-hidden="true"
                        className="h-3.5 w-3.5 shrink-0 text-[#B4B4AF] transition-all group-hover:translate-x-0.5 group-hover:text-[var(--ink)]"
                      />
                      <span className="text-[15px] text-[var(--ink)]">{u.label}</span>
                      <Badge variant="mono" className="text-[10.5px] text-[var(--sub)]">
                        {u.count}
                      </Badge>
                    </Link>
                  </li>
                ))}
              </ul>
            </FadeUp>
          ))}
        </div>

        <OssCta />
      </main>

      <SiteFooter />
    </div>
  );
};
