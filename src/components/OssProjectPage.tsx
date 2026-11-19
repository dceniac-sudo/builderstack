'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, BookOpen, ChevronRight, ExternalLink, SlidersHorizontal } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { SiteFooter } from '@/components/SiteFooter';
import { ALL_FACTS, Dot, OssCta, OssLogo, OssProjectView, RowFactKey } from '@/components/OssParts';
import { LicenseWatchSubscribe } from '@/components/LicenseWatchSubscribe';
import { ChatwootCalculator } from '@/components/ChatwootCalculator';
import { JupyterHubCalculator } from '@/components/JupyterHubCalculator';
import { LiveKitCalculator } from '@/components/LiveKitCalculator';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { FadeUp, ReadingProgressBar } from '@/components/motion/MotionPrimitives';
import type { GuideSummary } from '@/types/guide';
import { useI18n, localePath, type Language } from '@/lib/i18n';
import { pageGraph, SITE_URL, webPageNode } from '@/lib/schema';
import { cn } from '@/lib/utils';

export interface OssFitView {
  considerIf: string;
  lookElsewhereIf: string;
  confirmed: boolean;
}

export interface OssShotView {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
  sourceUrl: string;
  sourceLabel: string;
  confirmed: boolean;
}

export interface OssComparisonView {
  otherId: string;
  otherName: string;
  otherHref: string;
  heading: string;
  pickThis: string;
  pickOther: string;
  confirmed: boolean;
}

interface OssProjectPageProps {
  project: OssProjectView;
  priceAnswer?: string;
  fit?: OssFitView;
  shot?: OssShotView;
  comparisons?: OssComparisonView[];
  alternatives: OssProjectView[];
  relatedGuides?: GuideSummary[];
}

const H2 = 'text-[19px] font-semibold tracking-[-0.01em]';
const SOURCE_LINK =
  'text-[var(--sub)] underline decoration-[#CFCFCA] underline-offset-[3px] transition-colors hover:text-[var(--ink)] hover:decoration-[var(--ink)]';
const ALT_FACTS: RowFactKey[] = ['commercial', 'deploy'];

export const OssProjectPage: React.FC<OssProjectPageProps> = ({
  project: p,
  priceAnswer,
  fit,
  shot,
  comparisons,
  alternatives,
  relatedGuides = [],
}) => {
  const { lang, t } = useI18n();
  const o = t.oss;
  const g = t.guides;
  const hasInlineCalc = lang === 'en' && (p.id === 'livekit' || p.id === 'chatwoot' || p.id === 'jupyterhub');
  // 主 CTA 优先指向本项目专属的实测报告（如 /oss/n8n/ → n8n RAM 基准），否则退回首个关联报告
  const projectGuide =
    relatedGuides.find((rg) => rg.slug.includes(p.id)) ??
    relatedGuides.find((rg) => rg.relatedProjectIds.length === 1 && rg.relatedProjectIds[0] === p.id);
  const primaryGuide = projectGuide ?? relatedGuides[0];
  const orderedGuides = primaryGuide
    ? [primaryGuide, ...relatedGuides.filter((rg) => rg.slug !== primaryGuide.slug)]
    : relatedGuides;
  const primaryGuideLabel = projectGuide
    ? lang === 'zh'
      ? `${p.name} 实测报告`
      : `Read ${p.name} hands-on benchmark`
    : lang === 'zh'
      ? '阅读关联审计报告'
      : 'Read related audit';
  const hasInSitePrimary = Boolean(p.compareHref || hasInlineCalc || primaryGuide);
  const rows = ALL_FACTS.flatMap((key) => {
    const row = { key: key as string, question: o.questions[key], fact: p.facts[key] };
    return key === 'caveats' && p.needs ? [{ key: 'needs', question: o.needs, fact: p.needs }, row] : [row];
  });
  const draftTag = <span className="ml-3 align-middle text-sm font-normal tracking-normal text-[var(--sub)]">{o.draft}</span>;

  const licenseUrl = p.facts.commercial.sources[0]?.url;
  const image = shot ? `${SITE_URL}${shot.src}` : p.logo ? `${SITE_URL}${p.logo}` : undefined;
  const pageUrl = `${SITE_URL}${p.href}`;
  const jsonLd = pageGraph([
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: o.crumb, item: `${SITE_URL}${localePath(lang, '/')}` },
          { '@type': 'ListItem', position: 2, name: p.useLabel, item: `${SITE_URL}${p.useHref}` },
          { '@type': 'ListItem', position: 3, name: p.name, item: pageUrl },
        ],
      },
      webPageNode({
        path: p.href,
        name: p.name,
        description: p.what,
        lang: lang as Language,
        dateModified: p.checkedAt,
      }),
      {
        // 第三方开源软件本体：不声明 BuilderStack 为 publisher，url 指向上游项目
        '@type': 'SoftwareApplication',
        '@id': `${pageUrl}#software`,
        name: p.name,
        description: p.what,
        url: p.homepage ?? p.repoUrl,
        mainEntityOfPage: { '@id': `${pageUrl}#webpage` },
        applicationCategory: 'BusinessApplication',
        applicationSubCategory: p.useLabel,
        operatingSystem: 'Linux, Docker, Cross-platform',
        ...(image ? { image } : {}),
        ...(licenseUrl ? { license: licenseUrl } : {}),
        sameAs: Array.from(new Set([p.repoUrl, ...(p.homepage ? [p.homepage] : [])])),
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
          description: priceAnswer ?? p.facts.cost.detail ?? p.facts.cost.label,
        },
      },
  ]);

  return (
    <div className="flex flex-1 flex-col text-[15px] leading-[1.6]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <ReadingProgressBar />
      <Navbar active="industries" />

      <main className="mx-auto w-full max-w-[860px] flex-1 px-5 pt-10 sm:px-10 sm:pt-16">
        <p className="mb-5 text-sm text-[var(--sub)]">
          <Link href={localePath(lang, '/')} className="hover:text-[var(--ink)]">
            {o.crumb}
          </Link>
          {' / '}
          <Link href={p.useHref} className="hover:text-[var(--ink)]">
            {p.useLabel}
          </Link>
        </p>

        <FadeUp className="flex items-center gap-4">
          <OssLogo project={p} size={52} />
          <div className="flex min-w-0 flex-wrap items-center gap-2.5">
            <h1 className="min-w-0 text-[clamp(26px,4vw,40px)] font-semibold leading-[1.16] tracking-[-0.02em]">
              {p.name}
            </h1>
            {p.handsOn && (
              <Badge variant="good" className="text-[13px]">
                {o.handsOn}
              </Badge>
            )}
            {!p.confirmed && draftTag}
          </div>
        </FadeUp>

        <FadeUp delay={0.04}>
          <p className="mt-4 text-[17px] text-[var(--sub)]">{p.what}</p>
        </FadeUp>

        {priceAnswer && (
          <FadeUp delay={0.06}>
            <p className="mt-3 text-base">
              <span className="font-semibold">{o.priceAnswer}:</span> {priceAnswer}
            </p>
          </FadeUp>
        )}

        <FadeUp delay={0.08} className="mt-5 flex flex-wrap gap-2.5">
          {p.compareHref && p.compareLabel && (
            <Button asChild variant="default">
              <Link href={p.compareHref}>
                <SlidersHorizontal aria-hidden="true" className="h-3.5 w-3.5" />
                <span>{p.compareLabel}</span>
                <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
              </Link>
            </Button>
          )}
          {!p.compareHref && hasInlineCalc && (
            <Button asChild variant="default">
              <a href="#calculator">
                <SlidersHorizontal aria-hidden="true" className="h-3.5 w-3.5" />
                <span>{o.jumpToCalc}</span>
                <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
              </a>
            </Button>
          )}
          {primaryGuide && (
            <Button asChild variant={!p.compareHref && !hasInlineCalc ? 'default' : 'secondary'}>
              <Link href={primaryGuide.href}>
                <BookOpen aria-hidden="true" className="h-3.5 w-3.5" />
                <span>{primaryGuideLabel}</span>
                <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
              </Link>
            </Button>
          )}
          <Button asChild variant={hasInSitePrimary ? 'outline' : 'default'}>
            <a href={p.repoUrl} target="_blank" rel="noopener noreferrer">
              <span>{o.repo}</span>
              <ExternalLink aria-hidden="true" className="h-3.5 w-3.5" />
            </a>
          </Button>
          {p.homepage && (
            <Button asChild variant="outline">
              <a href={p.homepage} target="_blank" rel="noopener noreferrer">
                <span>{o.site}</span>
                <ExternalLink aria-hidden="true" className="h-3.5 w-3.5" />
              </a>
            </Button>
          )}
        </FadeUp>

        {orderedGuides.length > 0 && (
          <div className="mt-6 space-y-3">
            {orderedGuides.map((guide) => (
              <Link
                key={guide.slug}
                href={guide.href}
                className="group flex flex-wrap items-center justify-between gap-4 rounded-[10px] border border-[var(--line)] bg-[var(--wash)] px-5 py-4 transition-colors hover:border-[var(--ink)]/35"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.06em] text-[#737370]">
                    <span>{g.relatedGuideKicker}</span>
                    <span>·</span>
                    <span>{guide.docId}</span>
                  </div>
                  <div className="mt-1 text-[15.5px] font-semibold text-[var(--ink)] group-hover:underline group-hover:underline-offset-4">
                    {guide.title}
                  </div>
                </div>
                <span className="inline-flex shrink-0 items-center gap-1.5 text-[13.5px] font-medium text-[var(--ink)]">
                  <span>{g.readReport}</span>
                  <ArrowRight aria-hidden="true" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        )}

        {fit && (
          <FadeUp as="section" delay={0.1} className="mt-9">
            <h2 className={H2}>
              {o.fitTitle}
              {!fit.confirmed && draftTag}
            </h2>
            <dl className="mt-3 border-y border-[var(--line)]">
              {[
                { label: o.considerIf, text: fit.considerIf },
                { label: o.lookElsewhereIf, text: fit.lookElsewhereIf },
              ].map(({ label, text }, i) => (
                <div key={label} className={cn('grid grid-cols-1 gap-x-8 gap-y-1 py-3.5 sm:grid-cols-[9rem_1fr]', i > 0 && 'border-t border-[var(--line)]')}>
                  <dt className="text-[13px] text-[var(--sub)] sm:pt-0.5">{label}</dt>
                  <dd className="min-w-0 text-base">{text}</dd>
                </div>
              ))}
            </dl>
          </FadeUp>
        )}

        {p.scenarios.length > 0 && (
          <FadeUp as="section" delay={0.12} className="mt-9">
            <h2 className={H2}>{o.inIndustries}</h2>
            <dl className="mt-3 border-y border-[var(--line)]">
              {p.scenarios.map((s, i) => (
                <div key={s.id} className={cn('grid grid-cols-1 gap-x-8 gap-y-1 py-3.5 sm:grid-cols-[9rem_1fr]', i > 0 && 'border-t border-[var(--line)]')}>
                  <dt className="text-[13px] text-[var(--sub)] sm:pt-0.5">
                    <Link href={localePath(lang, `/for/${s.id}/`)} className="hover:text-[var(--ink)]">
                      {s.label}
                    </Link>
                  </dt>
                  <dd className="min-w-0 text-base">{s.text}</dd>
                </div>
              ))}
            </dl>
          </FadeUp>
        )}

        {shot && (
          <FadeUp delay={0.14}>
            <figure className="mt-8">
              <img
                src={shot.src}
                alt={shot.alt}
                width={shot.width}
                height={shot.height}
                className="block h-auto w-full rounded-[14px] border border-[var(--line)]"
              />
              <figcaption className="mt-2.5 flex flex-wrap justify-between gap-x-4 gap-y-1 text-[13px] text-[var(--sub)]">
                <span>
                  {shot.caption}
                  {!shot.confirmed && draftTag}
                </span>
                <a href={shot.sourceUrl} target="_blank" rel="noopener noreferrer" className={SOURCE_LINK}>
                  {shot.sourceLabel}
                </a>
              </figcaption>
            </figure>
          </FadeUp>
        )}

        <FadeUp delay={0.16}>
          <Card className="mt-9 [overflow:clip]">
            <dl>
              {rows.map(({ key, question, fact }, i) => (
                <div
                  key={key}
                  className={cn(
                    'grid grid-cols-1 gap-x-8 gap-y-1.5 p-[18px] sm:grid-cols-[9rem_1fr] sm:p-5',
                    i > 0 && 'border-t border-[var(--line)]'
                  )}
                >
                  <dt className="text-[13px] text-[var(--sub)] sm:pt-0.5">{question}</dt>
                  <dd className="min-w-0">
                    <span className="flex items-center gap-2 text-base font-semibold">
                      <Dot verdict={fact.verdict} />
                      {fact.label}
                    </span>
                    {fact.detail && <p className="mt-1.5 leading-[1.75] text-[#2E2E2B]">{fact.detail}</p>}
                    {fact.sources.length > 0 && (
                      <p className="mt-2.5 flex flex-wrap gap-1.5 text-[12px]">
                        {fact.sources.map((s) => (
                          <a
                            key={s.url}
                            href={s.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 rounded-md border border-[var(--line)] bg-[var(--wash)] px-2 py-0.5 font-mono text-[11px] font-medium text-[var(--sub)] transition-colors hover:border-[var(--ink)]/35 hover:text-[var(--ink)]"
                          >
                            <span>{s.label}</span>
                            <ExternalLink aria-hidden="true" className="h-2.5 w-2.5 opacity-70" />
                          </a>
                        ))}
                      </p>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </Card>
        </FadeUp>

        <p className="mt-4 text-[13px] text-[var(--sub)]">
          {p.handsOn && `${o.basisHandsOn}${lang === 'zh' ? '' : ' '}`}
          {o.checked}
          {lang === 'zh' ? '：' : ': '}
          <time dateTime={p.checkedAt}>{p.checkedAt}</time>
          {lang === 'zh' ? '。' : '.'}
          {' · '}
          <Link href={localePath(lang, '/about/')} className={SOURCE_LINK}>
            {o.howWeVerifyLink}
          </Link>
        </p>

        {p.compareHref && p.compareLabel && (
          <Card className="mt-8 bg-[var(--wash)] p-5">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="min-w-0">
                <div className="font-mono text-[11px] font-medium uppercase tracking-wider text-[var(--sub)]">
                  {o.compareHeadToHead}
                </div>
                <div className="mt-1 text-[17px] font-semibold text-[var(--ink)]">{p.compareLabel}</div>
              </div>
              <Button asChild>
                <Link href={p.compareHref}>
                  <span>{o.compareOpenPage}</span>
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </Card>
        )}

        {lang === 'en' && p.id === 'livekit' && <LiveKitCalculator />}
        {lang === 'en' && p.id === 'chatwoot' && <ChatwootCalculator />}
        {lang === 'en' && p.id === 'jupyterhub' && <JupyterHubCalculator />}

        {comparisons &&
          comparisons.map((c) => (
            <section key={c.otherId} className="mt-12">
              <h2 className={H2}>
                {c.heading}
                {!c.confirmed && draftTag}
              </h2>
              <dl className="mt-3 border-y border-[var(--line)]">
                <div className="grid grid-cols-1 gap-x-8 gap-y-1 py-3.5 sm:grid-cols-[9rem_1fr]">
                  <dt className="text-[13px] text-[var(--sub)] sm:pt-0.5">{o.pickProject(p.name)}</dt>
                  <dd className="min-w-0 text-base">{c.pickThis}</dd>
                </div>
                <div className="grid grid-cols-1 gap-x-8 gap-y-1 border-t border-[var(--line)] py-3.5 sm:grid-cols-[9rem_1fr]">
                  <dt className="text-[13px] sm:pt-0.5">
                    <Link href={c.otherHref} className={SOURCE_LINK}>
                      {o.pickProject(c.otherName)}
                    </Link>
                  </dt>
                  <dd className="min-w-0 text-base">{c.pickOther}</dd>
                </div>
              </dl>
            </section>
          ))}

        {alternatives.length > 0 && (
          <section className="mt-12">
            <h2 className={H2}>{o.altTitle}</h2>
            <div className="mt-3 border-y border-[var(--line)]">
              {alternatives.map((a, i) => (
                <Link
                  key={a.id}
                  href={a.href}
                  className={cn(
                    'group grid grid-cols-[minmax(0,1fr)_18px] items-center gap-x-6 gap-y-3 py-3.5 sm:grid-cols-[minmax(0,1fr)_auto_18px]',
                    i > 0 && 'border-t border-[var(--line)]'
                  )}
                >
                  <span className="flex min-w-0 items-center gap-3">
                    <OssLogo project={a} />
                    <span className="min-w-0">
                      <span className="block text-[15.5px] font-semibold leading-[1.3]">
                        <span className="underline-offset-[3px] group-hover:underline">{a.name}</span>
                        {!a.confirmed && <span className="ml-2 text-xs font-normal text-[var(--sub)]">{o.draft}</span>}
                      </span>
                      <span className="block text-[13px] text-[var(--sub)]">{a.what}</span>
                    </span>
                  </span>
                  <span className="col-span-full row-start-2 flex gap-5 sm:col-span-1 sm:row-start-auto">
                    {ALT_FACTS.map((key) => (
                      <span key={key} className="min-w-24">
                        <span className="block text-xs text-[var(--sub)]">{o.cols[key]}</span>
                        <span className="inline-flex items-center gap-[7px] whitespace-nowrap text-sm font-medium">
                          <Dot verdict={a.facts[key].verdict} />
                          {a.facts[key].short ?? o.short[key][a.facts[key].verdict]}
                        </span>
                      </span>
                    ))}
                  </span>
                  <ChevronRight aria-hidden="true" className="h-[18px] w-[18px] text-[var(--sub)]" />
                </Link>
              ))}
            </div>
          </section>
        )}

        <LicenseWatchSubscribe className="mt-12" />
        <OssCta />
      </main>

      <SiteFooter />
    </div>
  );
};
