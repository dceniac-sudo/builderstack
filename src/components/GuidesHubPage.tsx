'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { SiteFooter } from '@/components/SiteFooter';
import { LicenseWatchSubscribe } from '@/components/LicenseWatchSubscribe';
import { Badge } from '@/components/ui/badge';
import { FadeUp } from '@/components/motion/MotionPrimitives';
import type { GuideSummary } from '@/types/guide';
import { localePath, useI18n, type Language } from '@/lib/i18n';
import { pageGraph, SITE_URL, webPageNode } from '@/lib/schema';

interface GuidesHubPageProps {
  guides: GuideSummary[];
}

export const GuidesHubPage: React.FC<GuidesHubPageProps> = ({ guides }) => {
  const { lang, t } = useI18n();
  const o = t.oss;
  const g = t.guides;
  const pagePath = localePath(lang, '/guides/');
  const latestDate = guides.map((x) => x.updatedAt).sort().pop() ?? '2026-11-19';

  const jsonLd = pageGraph([
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: o.crumb, item: `${SITE_URL}${localePath(lang, '/')}` },
        { '@type': 'ListItem', position: 2, name: t.nav.guides, item: `${SITE_URL}${pagePath}` },
      ],
    },
    webPageNode({
      path: pagePath,
      name: g.hubTitle,
      description: g.hubSub,
      lang: lang as Language,
      dateModified: latestDate,
    }),
  ]);

  return (
    <div className="flex flex-1 flex-col text-[15px] leading-[1.65]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <Navbar active="guides" />

      <main className="mx-auto w-full max-w-[1140px] flex-1 px-6 pb-16 pt-12 sm:px-10 sm:pt-14">
        <FadeUp>
          <p className="mb-4 text-[13px] text-[var(--sub)]">
            <Link href={localePath(lang, '/')} className="hover:text-[var(--ink)]">
              {o.crumb}
            </Link>
            {' / '}
            {t.nav.guides}
          </p>
          <Badge variant="outline" className="font-mono text-[11.5px] text-[var(--sub)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--good)]" />
            {g.hubBadge(guides.length, latestDate)}
          </Badge>
          <h1 className="mt-4 max-w-[820px] text-[clamp(28px,4vw,42px)] font-semibold leading-[1.15] tracking-[-0.025em] text-[var(--ink)]">
            {g.hubTitle}
          </h1>
          <p className="mt-3 max-w-[700px] text-[16px] text-[var(--sub)]">{g.hubSub}</p>
        </FadeUp>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {guides.map((item) => (
            <Link
              key={item.slug}
              href={item.href}
              className="group flex flex-col justify-between rounded-[10px] border border-[var(--line)] bg-white p-6 transition-colors hover:border-[var(--ink)]/35 hover:bg-[var(--wash)]"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-mono text-[11px] font-medium text-[#737370]">{item.docId}</span>
                  <Badge variant={item.auditBasis === 'hands-on' ? 'good' : 'mono'}>
                    {item.auditBasis === 'hands-on' ? g.basisHandsOn : g.basisPrimary}
                  </Badge>
                </div>
                <h2 className="mt-3 text-[20px] font-semibold leading-[1.32] tracking-[-0.015em] text-[var(--ink)] group-hover:underline group-hover:underline-offset-4">
                  {item.title}
                </h2>
                <p className="mt-2.5 text-[14.5px] leading-[1.6] text-[var(--sub)]">{item.subtitle}</p>
              </div>
              <div className="mt-6 flex items-center justify-between gap-3 border-t border-[var(--line)] pt-4 font-mono text-[12px]">
                <span className="text-[var(--sub)]">
                  {item.sampleLabel} · {item.updatedAt}
                </span>
                <span className="inline-flex items-center gap-1 font-sans text-[13.5px] font-medium text-[var(--ink)]">
                  <span>{g.readReport}</span>
                  <ArrowRight aria-hidden="true" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <LicenseWatchSubscribe className="mt-14" />
      </main>

      <SiteFooter />
    </div>
  );
};
