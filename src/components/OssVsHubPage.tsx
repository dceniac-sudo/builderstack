'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, SlidersHorizontal } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { SiteFooter } from '@/components/SiteFooter';
import { OssCta } from '@/components/OssParts';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FadeUp } from '@/components/motion/MotionPrimitives';
import type { VsComparisonSummary } from '@/data/oss-vs';
import { localePath, useI18n } from '@/lib/i18n';

const SITE = 'https://dceniac.com';

interface OssVsHubPageProps {
  pairs: VsComparisonSummary[];
}

export const OssVsHubPage: React.FC<OssVsHubPageProps> = ({ pairs }) => {
  const { lang, t } = useI18n();
  const o = t.oss;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: o.crumb, item: `${SITE}${localePath(lang, '/')}` },
      { '@type': 'ListItem', position: 2, name: t.nav.comparisons, item: `${SITE}${localePath(lang, '/oss/vs/')}` },
    ],
  };

  const methodItems =
    lang === 'zh'
      ? [
          {
            id: 'm1',
            q: '为什么对比要单独列出自建硬件与隐形企业门槛？',
            a: '很多榜单只对比“开源免费”和 SaaS 月费，却隐瞒了自建需要 8 GB 内存服务器（Appsmith）、四个外部云组件（Papermark）或把 Teams 与 SSO 移出免费仓（Cal.com cal.diy）等真实门槛。',
          },
          {
            id: 'm2',
            q: '计算器里的数字从哪里来？',
            a: '全部源自 2026 年 11 月核对的官方定价页、GitHub LICENSE 原文与官方安装文档；每条关键判断均附可鼠标悬停核对的出处链接。',
          },
        ]
      : [
          {
            id: 'm1',
            q: 'Why do these audits highlight commercial license traps and RAM limits?',
            a: 'Ordinary comparison posts call self-hosting “$0 free” while glossing over 8 GB RAM minimums (Appsmith), four external cloud dependencies (Papermark), or MIT repos that omit production team features (cal.diy). We verify those walls first.',
          },
          {
            id: 'm2',
            q: 'Where do the calculator tiers and numbers come from?',
            a: 'Every tier threshold, seat rate, and hardware baseline comes directly from official pricing pages, GitHub LICENSE texts, and installation docs checked on November 15, 2026.',
          },
        ];

  return (
    <div className="flex flex-1 flex-col text-[15px] leading-[1.6]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <Navbar active="comparisons" />

      <main className="mx-auto w-full max-w-[1040px] flex-1 px-5 pb-16 pt-10 sm:px-10 sm:pt-14">
        <FadeUp>
          <p className="mb-4 text-sm text-[var(--sub)]">
            <Link href={localePath(lang, '/')} className="hover:text-[var(--ink)]">
              {o.crumb}
            </Link>
            {' / '}
            {t.nav.comparisons}
          </p>
          <Badge variant="outline" className="font-mono text-[11.5px] text-[var(--sub)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--good)]" />
            {o.vsHubBadge}
          </Badge>
          <h1 className="mt-3 text-[clamp(28px,4.2vw,44px)] font-semibold leading-[1.16] tracking-[-0.02em] text-[var(--ink)]">
            {o.vsHubTitle}
          </h1>
          <p className="mt-3 max-w-[44rem] text-[16px] text-[var(--sub)]">{o.vsHubSub}</p>
        </FadeUp>

        <FadeUp delay={0.08} className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          {pairs.map((p) => (
            <Link
              key={p.slug}
              href={p.href}
              className="group flex flex-col justify-between rounded-xl border border-[var(--line)] bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-all hover:border-[var(--ink)]/35 hover:bg-[var(--wash)]"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <Badge variant="mono">{p.categoryLabel}</Badge>
                  <Badge variant="good">{p.winnerTag}</Badge>
                </div>
                <h2 className="mt-3 text-[20px] font-semibold tracking-[-0.015em] text-[var(--ink)] group-hover:underline group-hover:underline-offset-4">
                  {p.title}
                </h2>
                <p className="mt-2 text-[13.5px] leading-[1.6] text-[var(--sub)]">{p.subtitle}</p>
              </div>
              <div className="mt-5 flex items-center justify-between gap-2 border-t border-[var(--line)] pt-3 text-[12.5px]">
                <span className="inline-flex items-center gap-1.5 font-mono text-[var(--sub)]">
                  <SlidersHorizontal aria-hidden="true" className="h-3.5 w-3.5" />
                  <span>{p.pricingHighlight}</span>
                </span>
                <span className="inline-flex items-center gap-1 font-medium text-[var(--ink)]">
                  <span>{o.compareTag}</span>
                  <ArrowRight aria-hidden="true" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </FadeUp>

        <FadeUp delay={0.14} className="mt-10">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-[16px]">{o.vsMethodTitle}</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible defaultValue="m1">
                {methodItems.map((m) => (
                  <AccordionItem key={m.id} value={m.id}>
                    <AccordionTrigger>{m.q}</AccordionTrigger>
                    <AccordionContent>{m.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </FadeUp>

        <OssCta />
      </main>

      <SiteFooter />
    </div>
  );
};
