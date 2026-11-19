'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, ChevronDown, ExternalLink, SlidersHorizontal } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { SiteFooter } from '@/components/SiteFooter';
import { Dot } from '@/components/OssParts';
import { LicenseWatchSubscribe } from '@/components/LicenseWatchSubscribe';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { FadeUp, ReadingProgressBar } from '@/components/motion/MotionPrimitives';
import type { GuideArticleView, GuideSummary } from '@/types/guide';
import { localePath, useI18n, type Language } from '@/lib/i18n';
import { articleNode, SITE_URL, webPageNode } from '@/lib/schema';
import { cn } from '@/lib/utils';

interface GuideArticlePageProps {
  guide: GuideArticleView;
  peers: GuideSummary[];
}

const TONE_BADGE = {
  good: 'border-[#BBF7D0] bg-[#F0FDF4] text-[#15803D]',
  warn: 'border-[#FDE68A] bg-[#FFFBEB] text-[#B45309]',
  bad: 'border-[#FECACA] bg-[#FEF2F2] text-[#B91C1C]',
} as const;

const TONE_TEXT = {
  ink: 'text-[var(--ink)]',
  good: 'text-[#15803D]',
  bad: 'text-[#B91C1C]',
} as const;

export const GuideArticlePage: React.FC<GuideArticlePageProps> = ({ guide, peers }) => {
  const { lang, t } = useI18n();
  const o = t.oss;
  const g = t.guides;
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const pageUrl = `${SITE_URL}${guide.href}`;
  const filteredRows = guide.matrixSection
    ? guide.matrixSection.rows.filter((r) => activeFilter === 'all' || r.filterGroup === activeFilter)
    : [];

  const aboutUrls = [
    ...guide.relatedProjectIds.map((id) => `${SITE_URL}/oss/${id}/`),
    ...guide.relatedVsSlugs.map((slug) => `${SITE_URL}/oss/vs/${slug}/`),
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: o.crumb, item: `${SITE_URL}${localePath(lang, '/')}` },
          { '@type': 'ListItem', position: 2, name: t.nav.guides, item: `${SITE_URL}${localePath(lang, '/guides/')}` },
          { '@type': 'ListItem', position: 3, name: guide.crumbLabel, item: pageUrl },
        ],
      },
      webPageNode({
        path: guide.href,
        name: guide.title,
        description: guide.subtitle,
        lang: lang as Language,
        dateModified: guide.updatedAt,
      }),
      articleNode({
        path: guide.href,
        headline: guide.title,
        description: guide.subtitle,
        datePublished: guide.publishedAt,
        dateModified: guide.updatedAt,
        lang: lang as Language,
        aboutUrls,
      }),
      ...(guide.faqs.length > 0
        ? [
            {
              '@type': 'FAQPage',
              mainEntity: guide.faqs.map((item) => ({
                '@type': 'Question',
                name: item.q,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: item.a,
                },
              })),
            },
          ]
        : []),
    ],
  };

  return (
    <div className="flex flex-1 flex-col text-[15px] leading-[1.65]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <ReadingProgressBar />
      <Navbar active="guides" />

      {/* Editorial Hero & Horizontal Spec Dossier */}
      <section className="dot-fade relative border-b border-[var(--line)] bg-white">
        <div className="relative mx-auto max-w-[1140px] px-6 pb-10 pt-10 sm:px-10 sm:pb-12 sm:pt-14">
          <FadeUp>
            <nav
              aria-label="Breadcrumb"
              className="flex flex-wrap items-center gap-2 text-[13px] text-[var(--sub)]"
            >
              <Link href={localePath(lang, '/')} className="hover:text-[var(--ink)]">
                {o.crumb}
              </Link>
              <span>/</span>
              <Link href={localePath(lang, '/guides/')} className="hover:text-[var(--ink)]">
                {t.nav.guides}
              </Link>
              <span>/</span>
              <span className="rounded-md border border-[var(--line)] bg-white px-2.5 py-0.5 font-mono text-[11.5px] font-medium text-[var(--ink)]">
                {guide.crumbLabel}
              </span>
            </nav>

            <h1 className="mt-5 max-w-[960px] text-[clamp(30px,4vw,44px)] font-semibold leading-[1.15] tracking-[-0.028em] text-[var(--ink)]">
              {guide.title}
            </h1>
            <p className="mt-4 max-w-[780px] text-[17px] leading-[1.65] text-[var(--sub)]">
              {guide.subtitle}
            </p>
          </FadeUp>

          {/* 5-Column Horizontal Spec Dossier + Index Jump Bar */}
          <FadeUp delay={0.05} className="mt-8 overflow-hidden rounded-[10px] border border-[var(--line)] bg-white">
            <div className="grid grid-cols-2 divide-y divide-[var(--line)] sm:grid-cols-3 lg:grid-cols-5 lg:divide-x lg:divide-y-0">
              {guide.specCells.map((cell) => (
                <div key={cell.label} className="px-5 py-4">
                  <div className="font-mono text-[10.5px] font-medium uppercase tracking-[0.06em] text-[#737370]">
                    {cell.label}
                  </div>
                  <div className="mt-1.5 flex items-center gap-2 text-[13.5px] font-medium leading-[1.45] text-[var(--ink)]">
                    {cell.dot && <Dot verdict={cell.dot} />}
                    {cell.href ? (
                      <Link
                        href={localePath(lang, cell.href)}
                        className="underline decoration-[#CFCFC9] underline-offset-[3px] hover:decoration-[var(--ink)]"
                      >
                        {cell.value}
                      </Link>
                    ) : (
                      <span>{cell.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-2 border-t border-[var(--line)] bg-[var(--wash)] px-5 py-3">
              <span className="mr-2 font-mono text-[11px] font-medium uppercase tracking-[0.06em] text-[#737370]">
                {g.indexJump}
              </span>
              {guide.indexLinks.map((lnk, i) => (
                <a
                  key={lnk.id}
                  href={`#${lnk.id}`}
                  className={cn(
                    'rounded-[6px] border px-3 py-1 font-mono text-[11.5px] font-medium transition-colors',
                    i === 1
                      ? 'border-[var(--ink)] bg-[var(--ink)] text-white'
                      : 'border-[var(--line)] bg-white text-[var(--sub)] hover:border-[var(--ink)]/40 hover:text-[var(--ink)]'
                  )}
                >
                  {lnk.label}
                </a>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      <main className="mx-auto w-full max-w-[1140px] flex-1 px-6 pb-16 pt-12 sm:px-10">
        {/* Section 01 — Executive Verdicts */}
        <section id="verdicts" className="scroll-mt-24">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <span className="font-mono text-[11px] font-medium uppercase tracking-[0.06em] text-[#737370]">
              {g.sec01Tag}
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-[#737370]">
              {guide.verdictsRightTag}
            </span>
          </div>
          <h2 className="mt-2 text-[24px] font-semibold leading-[1.28] tracking-[-0.02em] text-[var(--ink)]">
            {guide.verdictsHeading}
          </h2>
          <p className="mt-2 max-w-[740px] text-[15px] text-[var(--sub)]">{guide.verdictsSub}</p>

          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">
            {guide.verdictCards.map((card) => (
              <div
                key={card.kicker}
                className="flex flex-col justify-between rounded-[10px] border border-[var(--line)] bg-[var(--wash)] p-6"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[10.5px] font-medium uppercase tracking-[0.06em] text-[#737370]">
                      {card.kicker}
                    </span>
                    <span
                      className={cn(
                        'inline-flex items-center gap-1.5 rounded-[6px] border px-2 py-0.5 font-mono text-[11px] font-medium',
                        TONE_BADGE[card.badgeTone]
                      )}
                    >
                      {card.badgeText}
                    </span>
                  </div>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span
                      className={cn(
                        'font-mono text-[30px] font-semibold leading-[1.15] tracking-[-0.03em] tabular-nums',
                        TONE_TEXT[card.metricTone ?? 'ink']
                      )}
                    >
                      {card.metricPrimary}
                    </span>
                    {card.metricSub && (
                      <span className="font-mono text-[14px] text-[#737370]">{card.metricSub}</span>
                    )}
                  </div>
                  <h3 className="mt-3 text-[15.5px] font-semibold leading-[1.4] text-[var(--ink)]">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-[1.6] text-[var(--sub)]">{card.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 02 — Full-Width Audit Matrix */}
        {guide.matrixSection && (
          <section id={guide.matrixSection.id} className="mt-14 scroll-mt-24 border-t border-[var(--line)] pt-12">
            <div className="flex flex-col gap-4">
              <div>
                <div className="font-mono text-[11px] font-medium uppercase tracking-[0.06em] text-[#737370]">
                  {guide.matrixSection.kicker}
                </div>
                <h2 className="mt-2 text-[24px] font-semibold leading-[1.28] tracking-[-0.02em] text-[var(--ink)]">
                  {guide.matrixSection.heading}
                </h2>
                <p className="mt-2 max-w-[740px] text-[15px] text-[var(--sub)]">{guide.matrixSection.sub}</p>
              </div>

              {guide.matrixSection.filters.length > 1 && (
                <div className="flex flex-wrap items-center gap-2">
                  {guide.matrixSection.filters.map((f) => {
                    const active = activeFilter === f.id;
                    return (
                      <button
                        key={f.id}
                        type="button"
                        aria-pressed={active}
                        onClick={() => setActiveFilter(f.id)}
                        className={cn(
                          'whitespace-nowrap rounded-[6px] border px-3.5 py-1.5 font-mono text-[12px] font-medium transition-colors',
                          active
                            ? 'border-[var(--ink)] bg-[var(--ink)] text-white'
                            : 'border-[var(--line)] bg-white text-[var(--sub)] hover:border-[var(--ink)]/40 hover:text-[var(--ink)]'
                        )}
                      >
                        {f.label}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="mt-6 overflow-hidden rounded-[10px] border border-[var(--line)] bg-white">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[880px] border-collapse text-left text-[14px]">
                  <thead>
                    <tr className="border-b border-[var(--line)] bg-[var(--wash)]">
                      {guide.matrixSection.columns.map((col, idx) => (
                        <th
                          key={col}
                          className={cn(
                            'px-5 py-3.5 font-mono text-[11px] font-medium uppercase tracking-[0.06em] text-[#737370]',
                            idx === 5 && 'text-right'
                          )}
                        >
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--line)]">
                    {filteredRows.map((row) => (
                      <tr
                        key={row.id}
                        className={cn(
                          'transition-colors',
                          row.rowTint === 'bad' && 'bg-[#FEF2F2]/50 hover:bg-[#FEF2F2]/80',
                          row.rowTint === 'good' && 'bg-[#F0FDF4]/50 hover:bg-[#F0FDF4]/80',
                          (!row.rowTint || row.rowTint === 'none') && 'bg-white hover:bg-[var(--wash)]'
                        )}
                      >
                        <td className="px-5 py-4 align-top">
                          <div className="flex flex-wrap items-center gap-2">
                            <Dot verdict={row.verdict} />
                            <Link
                              href={localePath(lang, row.projectHref)}
                              className="font-semibold text-[var(--ink)] underline-offset-[3px] hover:underline"
                            >
                              {row.projectName}
                            </Link>
                            {row.microBadge && (
                              <span
                                className={cn(
                                  'rounded-[5px] border px-1.5 py-0.5 font-mono text-[10.5px] font-medium',
                                  TONE_BADGE[row.microBadge.tone]
                                )}
                              >
                                {row.microBadge.text}
                              </span>
                            )}
                          </div>
                          <div className="mt-1 pl-4 text-[12.5px] text-[var(--sub)]">{row.category}</div>
                        </td>

                        <td className="px-5 py-4 align-top">
                          <div className="font-medium text-[var(--ink)]">{row.licenseTitle}</div>
                          <div className="mt-1 text-[13px] leading-[1.5] text-[var(--sub)]">{row.licenseNote}</div>
                        </td>

                        <td className="max-w-[280px] px-5 py-4 align-top">
                          <div className="leading-[1.55] text-[var(--ink)]">{row.lockedSummary}</div>
                          {row.lockedHighlight && (
                            <span
                              className={cn(
                                'mt-2 inline-block rounded-[5px] border px-2 py-0.5 font-mono text-[11px] font-medium',
                                TONE_BADGE[row.lockedHighlight.tone]
                              )}
                            >
                              {row.lockedHighlight.text}
                            </span>
                          )}
                        </td>

                        <td className="px-5 py-4 align-top">
                          <div className="font-mono text-[13px] font-medium tabular-nums text-[var(--ink)]">
                            {row.minStackTitle}
                          </div>
                          <div className="mt-1 font-mono text-[12px] text-[var(--sub)]">{row.minStackNote}</div>
                        </td>

                        <td className="px-5 py-4 align-top">
                          <div
                            className={cn(
                              'font-mono text-[13.5px] font-semibold tabular-nums',
                              TONE_TEXT[row.paidFloorTone ?? 'ink']
                            )}
                          >
                            {row.paidFloorTitle}
                          </div>
                          <div className="mt-1 font-mono text-[12px] text-[var(--sub)]">{row.paidFloorNote}</div>
                        </td>

                        <td className="px-5 py-4 text-right align-top">
                          <div className="flex flex-col items-end gap-1.5">
                            <Link
                              href={localePath(lang, row.projectHref)}
                              className="inline-flex items-center gap-1 rounded-[6px] border border-[var(--line)] bg-white px-2.5 py-1 font-mono text-[11.5px] font-medium text-[var(--ink)] transition-colors hover:border-[var(--ink)]"
                            >
                              <span>{g.inspectRow}</span>
                              <ArrowRight aria-hidden="true" className="h-3 w-3" />
                            </Link>
                            <a
                              href={row.sourceUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 font-mono text-[11px] text-[#737370] hover:text-[var(--ink)]"
                            >
                              <span>{row.sourceLabel}</span>
                              <ExternalLink aria-hidden="true" className="h-2.5 w-2.5" />
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--line)] bg-[var(--wash)] px-5 py-3 text-[12px] text-[var(--sub)]">
                <div className="flex flex-wrap items-center gap-4">
                  <span className="inline-flex items-center gap-1.5">
                    <Dot verdict="good" /> {g.legendGood}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Dot verdict="caution" /> {g.legendWarn}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Dot verdict="bad" /> {g.legendBad}
                  </span>
                </div>
                <span className="font-mono text-[11px] text-[#737370]">{guide.matrixSection.legendNote}</span>
              </div>
            </div>
          </section>
        )}

        {/* Section 03 — Stacked Bar TCO Crossover & Granular Table */}
        {guide.tcoSection && (
          <section id="tco-model" className="mt-14 scroll-mt-24 border-t border-[var(--line)] pt-12">
            <div className="font-mono text-[11px] font-medium uppercase tracking-[0.06em] text-[#737370]">
              {guide.tcoSection.kicker}
            </div>
            <div className="mt-5 rounded-[10px] border border-[var(--line)] bg-[var(--wash)] p-6 sm:p-8">
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
                <div className="lg:col-span-8">
                  <h2 className="text-[22px] font-semibold leading-[1.3] tracking-[-0.018em] text-[var(--ink)]">
                    {guide.tcoSection.heading}
                  </h2>
                  <p className="mt-3 text-[14.5px] leading-[1.65] text-[var(--sub)]">
                    {guide.tcoSection.summary}
                  </p>

                  {/* Stacked Horizontal Bars */}
                  <div className="mt-6 space-y-5">
                    {guide.tcoSection.bars.map((bar) => (
                      <div key={bar.id}>
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-[14px] font-semibold text-[var(--ink)]">{bar.title}</span>
                            {bar.savingsBadge && (
                              <span className="rounded-[5px] border border-[#BBF7D0] bg-[#F0FDF4] px-2 py-0.5 font-mono text-[11px] font-medium text-[#15803D]">
                                {bar.savingsBadge}
                              </span>
                            )}
                          </div>
                          <span className="font-mono text-[15px] font-semibold tabular-nums text-[var(--ink)]">
                            {bar.totalLabel}
                          </span>
                        </div>

                        <div className="mt-2 flex h-7 w-full overflow-hidden rounded-[6px] border border-[var(--line)] bg-white">
                          {bar.segments.map((seg) => (
                            <div
                              key={seg.label}
                              style={{ width: `${Math.max(4, seg.percent)}%` }}
                              className={cn(
                                'flex items-center justify-center truncate px-2 font-mono text-[11px] font-medium',
                                seg.tone === 'ink' && 'bg-[#141414] text-white',
                                seg.tone === 'good' && 'bg-[#15803D] text-white',
                                seg.tone === 'warn' && 'bg-[#F59E0B] text-[#141414]'
                              )}
                              title={seg.label}
                            >
                              {seg.percent >= 16 ? seg.label : ''}
                            </div>
                          ))}
                        </div>
                        <p className="mt-1.5 font-mono text-[11.5px] text-[var(--sub)]">{bar.caption}</p>
                      </div>
                    ))}
                  </div>

                  {/* Generously Spaced 4-Column Breakdown Table */}
                  <div className="mt-7 overflow-x-auto rounded-[8px] border border-[var(--line)] bg-white">
                    <table className="w-full min-w-[540px] border-collapse text-[13px]">
                      <thead>
                        <tr className="border-b border-[var(--line)] bg-[var(--wash)]">
                          {guide.tcoSection.tableColumns.map((col, idx) => (
                            <th
                              key={col}
                              className={cn(
                                'px-4 py-3 font-mono text-[11px] font-medium uppercase tracking-[0.05em] text-[#737370]',
                                idx === 0 ? 'text-left' : 'text-right'
                              )}
                            >
                              {col}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[var(--line)]">
                        {guide.tcoSection.tableRows.map((row) => (
                          <tr key={row.component} className={row.bold ? 'bg-[var(--wash)]/60 font-semibold' : ''}>
                            <td className="px-4 py-3 text-[var(--ink)]">{row.component}</td>
                            <td
                              className={cn(
                                'px-4 py-3 text-right font-mono tabular-nums',
                                TONE_TEXT[row.col1Tone ?? 'ink']
                              )}
                            >
                              {row.col1}
                            </td>
                            <td
                              className={cn(
                                'px-4 py-3 text-right font-mono tabular-nums',
                                TONE_TEXT[row.col2Tone ?? 'ink']
                              )}
                            >
                              {row.col2}
                            </td>
                            <td
                              className={cn(
                                'px-4 py-3 text-right font-mono tabular-nums',
                                TONE_TEXT[row.col3Tone ?? 'ink']
                              )}
                            >
                              {row.col3}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Right Interactive Bridge Card */}
                <Card className="p-6 lg:col-span-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[11px] font-medium uppercase tracking-[0.06em] text-[#737370]">
                      {guide.tcoSection.ctaKicker}
                    </span>
                    <Badge variant="outline" className="font-mono text-[10.5px]">
                      <SlidersHorizontal aria-hidden="true" className="mr-1 h-3 w-3" />
                      TCO
                    </Badge>
                  </div>
                  <p className="mt-3 text-[14px] leading-[1.6] text-[var(--sub)]">
                    {guide.tcoSection.ctaDescription}
                  </p>
                  <Button asChild size="lg" className="mt-5 w-full">
                    <Link href={localePath(lang, guide.tcoSection.ctaHref)}>
                      <span>{guide.tcoSection.ctaLabel}</span>
                      <ArrowRight aria-hidden="true" className="h-4 w-4" />
                    </Link>
                  </Button>
                  <div className="mt-5 space-y-2 border-t border-[var(--line)] pt-4">
                    {guide.tcoSection.quickLinks.map((ql) => (
                      <Link
                        key={ql.href}
                        href={localePath(lang, ql.href)}
                        className="flex items-center justify-between rounded-[6px] px-2 py-1.5 text-[13.5px] font-medium text-[var(--sub)] transition-colors hover:bg-[var(--wash)] hover:text-[var(--ink)]"
                      >
                        <span>{ql.label}</span>
                        <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
                      </Link>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </section>
        )}

        {/* Editorial Prose & Benchmark Deep-Dive Sections */}
        {guide.proseSections.map((sec) => (
          <section key={sec.id} id={sec.id} className="mt-14 scroll-mt-24 border-t border-[var(--line)] pt-12">
            <div className="max-w-[780px]">
              <div className="font-mono text-[11px] font-medium uppercase tracking-[0.06em] text-[#737370]">
                {sec.kicker}
              </div>
              <h2 className="mt-2 text-[22px] font-semibold leading-[1.3] tracking-[-0.018em] text-[var(--ink)]">
                {sec.heading}
              </h2>
              {sec.intro && <p className="mt-3 text-[15.5px] leading-[1.7] text-[var(--sub)]">{sec.intro}</p>}

              {sec.bullets && sec.bullets.length > 0 && (
                <ul className="mt-5 space-y-4">
                  {sec.bullets.map((b) => (
                    <li
                      key={b.lead}
                      className="rounded-[8px] border border-[var(--line)] bg-white px-5 py-4 text-[14.5px] leading-[1.65]"
                    >
                      <strong className="font-semibold text-[var(--ink)]">{b.lead}: </strong>
                      <span className="text-[var(--sub)]">{b.text}</span>
                    </li>
                  ))}
                </ul>
              )}

              {sec.codeBlock && (
                <div className="mt-6 overflow-hidden rounded-[8px] border border-[var(--line)] bg-[var(--wash)]">
                  <div className="border-b border-[var(--line)] px-4 py-2 font-mono text-[11.5px] text-[#737370]">
                    {sec.codeBlock.label}
                  </div>
                  <pre className="overflow-x-auto p-4 font-mono text-[12.5px] leading-[1.6] text-[var(--ink)]">
                    <code>{sec.codeBlock.code}</code>
                  </pre>
                </div>
              )}

              {sec.figure && (
                <figure className="mt-6">
                  <img
                    src={sec.figure.src}
                    alt={sec.figure.alt}
                    width={sec.figure.width}
                    height={sec.figure.height}
                    className="block h-auto w-full rounded-[10px] border border-[var(--line)]"
                  />
                  <figcaption className="mt-2.5 text-[13px] text-[var(--sub)]">{sec.figure.caption}</figcaption>
                </figure>
              )}

              {sec.callout && (
                <div
                  className={cn(
                    'mt-6 rounded-[8px] border p-5 text-[14px] leading-[1.65]',
                    sec.callout.tone === 'warn'
                      ? 'border-[#FDE68A] bg-[#FFFBEB] text-[var(--ink)]'
                      : 'border-[#BBF7D0] bg-[#F0FDF4] text-[var(--ink)]'
                  )}
                >
                  <div className="font-semibold">{sec.callout.title}</div>
                  <p className="mt-1 text-[var(--sub)]">{sec.callout.body}</p>
                </div>
              )}
            </div>
          </section>
        ))}

        {/* Verified FAQ Section (1:1 synced with FAQPage JSON-LD) */}
        {guide.faqs.length > 0 && (
          <section id="faq" className="mt-14 scroll-mt-24 border-t border-[var(--line)] pt-12">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <span className="font-mono text-[11px] font-medium uppercase tracking-[0.06em] text-[#737370]">
                {g.faqKicker}
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-[#737370]">
                {g.schemaSynced}
              </span>
            </div>
            <h2 className="mt-2 text-[24px] font-semibold leading-[1.28] tracking-[-0.02em] text-[var(--ink)]">
              {o.faqTitle}
            </h2>
            <p className="mt-2 text-[15px] text-[var(--sub)]">{o.faqSub}</p>

            <div className="mt-6 overflow-hidden rounded-[10px] border border-[var(--line)] bg-white">
              <div className="divide-y divide-[var(--line)]">
                {guide.faqs.map((item, idx) => (
                  <details key={item.q} className="group px-6 py-5" open={idx === 0}>
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[15.5px] font-semibold text-[var(--ink)] marker:hidden">
                      {item.q}
                      <ChevronDown
                        aria-hidden="true"
                        className="h-4 w-4 shrink-0 text-[var(--sub)] transition-transform duration-200 group-open:rotate-180"
                      />
                    </summary>
                    <p className="mt-3 max-w-[780px] text-[14.5px] leading-[1.7] text-[var(--sub)]">{item.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Peer Guides */}
        {peers.length > 0 && (
          <section className="mt-14 border-t border-[var(--line)] pt-10">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-[19px] font-semibold tracking-[-0.015em] text-[var(--ink)]">
                {g.moreGuidesTitle}
              </h2>
              <Link
                href={localePath(lang, '/guides/')}
                className="inline-flex items-center gap-1 text-[13.5px] font-medium text-[var(--sub)] hover:text-[var(--ink)]"
              >
                <span>{g.allGuidesLink}</span>
                <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className={cn('mt-4 grid grid-cols-1 gap-4', peers.length > 1 ? 'md:grid-cols-2' : 'max-w-[740px]')}>
              {peers.map((peer) => (
                <Link
                  key={peer.slug}
                  href={peer.href}
                  className="group rounded-[10px] border border-[var(--line)] bg-white p-5 transition-colors hover:border-[var(--ink)]/35 hover:bg-[var(--wash)]"
                >
                  <div className="flex items-center justify-between gap-2 font-mono text-[11px] text-[#737370]">
                    <span>{peer.docId}</span>
                    <span>{peer.updatedAt}</span>
                  </div>
                  <div className="mt-2 text-[16px] font-semibold text-[var(--ink)] group-hover:underline group-hover:underline-offset-4">
                    {peer.title}
                  </div>
                  <p className="mt-1.5 text-[13.5px] text-[var(--sub)]">{peer.subtitle}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        <LicenseWatchSubscribe id="license-watch" className="mt-14" />
      </main>

      <SiteFooter />
    </div>
  );
};
