'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertTriangle,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Copy,
  GitBranch,
  ShieldAlert,
  SlidersHorizontal,
} from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { SiteFooter } from '@/components/SiteFooter';
import { Dot, OssCta } from '@/components/OssParts';
import { LicenseWatchSubscribe } from '@/components/LicenseWatchSubscribe';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { SpringTabsTrigger, Tabs, TabsList } from '@/components/ui/tabs';
import { AnimatedBar, FadeUp, ReadingProgressBar, SourceCitationPill } from '@/components/motion/MotionPrimitives';
import {
  evaluateVsCalculator,
  type AuditGroup,
  type VsComparisonSummary,
  type VsComparisonView,
  type VsSideView,
} from '@/data/oss-vs';
import { localePath, useI18n, type Language } from '@/lib/i18n';
import { pageGraph, SITE_URL, webPageNode } from '@/lib/schema';
import { cn } from '@/lib/utils';

interface OssVsPageProps {
  data: VsComparisonView;
  peers: VsComparisonSummary[];
}

export const OssVsPage: React.FC<OssVsPageProps> = ({ data, peers }) => {
  const { lang, t } = useI18n();
  const o = t.oss;

  const initialToggles: Record<string, boolean> = {};
  data.calc.toggles.forEach((tg) => {
    initialToggles[tg.key] = tg.defaultValue;
  });

  const [sliderValue, setSliderValue] = useState<number>(data.calc.defaultSlider);
  const [toggles, setToggles] = useState<Record<string, boolean>>(initialToggles);
  const [matrixTab, setMatrixTab] = useState<AuditGroup>('all');
  const [copied, setCopied] = useState(false);
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowSticky(window.scrollY > 420);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const calcResult = evaluateVsCalculator(data.slug, sliderValue, toggles, lang);

  const applyPreset = (presetId: string) => {
    const p = data.calc.presets.find((x) => x.id === presetId);
    if (!p) return;
    setSliderValue(p.sliderValue);
    setToggles({ ...initialToggles, ...p.toggles });
  };

  const handleCopy = () => {
    navigator.clipboard?.writeText(calcResult.copyText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    });
  };

  const filteredRows = data.matrix.filter((r) => matrixTab === 'all' || r.group === matrixTab);

  const pageUrl = `${SITE_URL}${data.href}`;
  const jsonLd = pageGraph([
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: o.crumb, item: `${SITE_URL}${localePath(lang, '/')}` },
        {
          '@type': 'ListItem',
          position: 2,
          name: data.categoryLabel,
          item: `${SITE_URL}${localePath(lang, `/oss/${data.categoryId}/`)}`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: t.nav.comparisons,
          item: `${SITE_URL}${localePath(lang, '/oss/vs/')}`,
        },
        { '@type': 'ListItem', position: 4, name: data.title, item: pageUrl },
      ],
    },
    webPageNode({
      path: data.href,
      name: data.title,
      description: data.subtitle,
      lang: lang as Language,
      dateModified: data.checkedAt,
    }),
    {
      '@type': 'FAQPage',
      mainEntity: data.faqs.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.a,
        },
      })),
    },
  ]);

  // Reciprocal internal links back to the GEO 2.0 flagship guide cluster.
  const zh = lang === 'zh';
  const flagshipGuides: { href: string; kicker: string; title: string }[] = [
    {
      href: localePath(lang, '/guides/open-core-paywall-matrix-2026/'),
      kicker: 'BS-GUIDE-01',
      title: zh ? '2026 Open-Core 付费墙横向矩阵（12 款工具）' : '2026 Open-Core Paywall Matrix (12 tools)',
    },
    ...(data.slug === 'n8n-vs-activepieces'
      ? [
          {
            href: localePath(lang, '/guides/self-hosting-n8n-vps-ram-benchmark/'),
            kicker: 'BS-GUIDE-02',
            title: zh ? 'n8n 2.35.0 自建实测：VPS 内存与 Queue Mode' : 'Self-Hosting n8n: Hands-On VPS RAM Benchmark',
          },
        ]
      : []),
  ];

  const renderActionLink = (
    label: string,
    url: string,
    variant: 'default' | 'outline',
    sponsored?: boolean,
    icon: 'external' | 'branch' = 'external',
    fullWidth = false
  ) => {
    const isInternal = url.startsWith('/');
    const iconNode =
      icon === 'branch' ? (
        <GitBranch aria-hidden="true" className="h-3.5 w-3.5" />
      ) : (
        <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
      );

    if (isInternal) {
      return (
        <Button asChild variant={variant} className={cn(fullWidth ? 'w-full' : 'flex-1')}>
          <Link href={localePath(lang, url)}>
            <span>{label}</span>
            <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
          </Link>
        </Button>
      );
    }

    return (
      <Button asChild variant={variant} className={cn(fullWidth ? 'w-full' : 'flex-1')}>
        <a
          href={url}
          target="_blank"
          rel={sponsored ? 'sponsored noopener noreferrer' : 'noopener noreferrer'}
        >
          {icon === 'branch' && iconNode}
          <span>{label}</span>
          {icon !== 'branch' && iconNode}
        </a>
      </Button>
    );
  };

  const renderSideCard = (side: VsSideView, isLeft: boolean) => (
    <Card
      className={cn(
        'flex flex-col justify-between transition-shadow duration-200 hover:shadow-[0_10px_28px_-8px_rgba(20,20,20,0.08)]',
        side.highlighted && 'border-[#141414]/25 shadow-[0_8px_24px_-6px_rgba(20,20,20,0.07)]'
      )}
    >
      <CardHeader className="pb-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <span
              className={cn(
                'grid h-10 w-10 shrink-0 place-items-center rounded-lg border font-mono text-sm font-semibold',
                side.highlighted
                  ? 'border-[#141414] bg-[#141414] text-white'
                  : 'border-[var(--line)] bg-[var(--wash)] text-[var(--ink)]'
              )}
            >
              {side.monogram}
            </span>
            <div>
              <CardTitle className="text-[18px]">{side.name}</CardTitle>
              <p className="mt-0.5 text-[12.5px] text-[var(--sub)]">{side.tagline}</p>
            </div>
          </div>
          <Badge variant={side.highlighted ? 'good' : 'secondary'}>{side.winnerBadge}</Badge>
        </div>

        <div className="flex flex-wrap gap-1.5 pt-3">
          {side.pricePills.map((pill) => (
            <Badge key={pill} variant="mono" className={side.highlighted ? 'text-[var(--ink)]' : 'text-[var(--sub)]'}>
              {pill}
            </Badge>
          ))}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <Separator />
        <div className="space-y-2.5 text-[13.5px]">
          <div className="font-mono text-[11px] font-medium uppercase tracking-wider text-[var(--sub)]">
            {o.chooseIfPrefix(side.name)}
          </div>
          {side.chooseIf.map((point) => (
            <div key={point} className="flex items-start gap-2 text-[var(--ink)]">
              <Check aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--good)]" strokeWidth={2.5} />
              <span>{point}</span>
            </div>
          ))}

          <div className="pt-2 font-mono text-[11px] font-medium uppercase tracking-wider text-[var(--warn)]">
            {o.watchOutPrefix}
          </div>
          {side.watchOut.map((warnText) => (
            <div key={warnText} className="flex items-start gap-2 text-[var(--sub)]">
              <AlertTriangle aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--warn)]" />
              <span>{warnText}</span>
            </div>
          ))}
        </div>
      </CardContent>

      <CardFooter className="flex-col items-stretch gap-2 pt-4">
        <div className="flex flex-wrap gap-2">
          {renderActionLink(
            side.ctaLabel,
            side.ctaUrl,
            side.highlighted ? 'default' : 'outline',
            side.ctaSponsored,
            'external',
            false
          )}
          {renderActionLink(
            side.secondaryLabel,
            side.secondaryUrl,
            'outline',
            false,
            side.secondaryUrl.includes('github.com') ? 'branch' : 'external',
            false
          )}
        </div>
        <p className="text-[11.5px] text-[#737370]">{side.disclosure}</p>
      </CardFooter>
    </Card>
  );

  return (
    <div className="flex flex-1 flex-col text-[15px] leading-[1.6]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <ReadingProgressBar />
      <Navbar active="comparisons" />

      {/* Scroll-linked compact sticky VS bar */}
      <AnimatePresence>
        {showSticky && (
          <motion.div
            initial={{ y: -16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -16, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="fixed left-0 right-0 top-16 z-30 border-b border-[var(--line)] bg-white/95 shadow-[0_2px_8px_rgba(20,20,20,0.06)] backdrop-blur-xl"
          >
            <div className="mx-auto flex h-12 max-w-[1040px] items-center justify-between gap-3 px-5 sm:px-10">
              <div className="flex min-w-0 items-center gap-2.5 text-sm">
                <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-[var(--line)] bg-[var(--wash)] font-mono text-[11px] font-semibold">
                  {data.left.monogram}
                </span>
                <span className="truncate font-semibold tracking-tight text-[var(--ink)]">{data.title}</span>
                <Badge variant="good" className="hidden sm:inline-flex">
                  {data.stickyWinnerBadge}
                </Badge>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <Button asChild variant="outline" size="sm" className="hidden sm:inline-flex">
                  <a href="#tco-section">{o.jumpToCalc}</a>
                </Button>
                {data.stickyCtaUrl.startsWith('/') ? (
                  <Button asChild size="sm">
                    <Link href={localePath(lang, data.stickyCtaUrl)}>
                      <span>{data.stickyCtaLabel}</span>
                      <ArrowRight aria-hidden="true" className="h-3 w-3" />
                    </Link>
                  </Button>
                ) : (
                  <Button asChild size="sm">
                    <a
                      href={data.stickyCtaUrl}
                      target="_blank"
                      rel={data.stickyCtaSponsored ? 'sponsored noopener noreferrer' : 'noopener noreferrer'}
                    >
                      <span>{data.stickyCtaLabel}</span>
                      <ArrowUpRight aria-hidden="true" className="h-3 w-3" />
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="mx-auto w-full max-w-[1040px] flex-1 px-5 pb-16 pt-8 sm:px-10 sm:pt-12">
        {/* Hero */}
        <section className="dot-fade relative -mx-5 border-b border-[var(--line)] px-5 pb-8 pt-2 sm:-mx-10 sm:px-10">
          <FadeUp>
            <p className="relative flex flex-wrap items-center gap-2 text-[13px] text-[var(--sub)]">
              <Link href={localePath(lang, '/')} className="hover:text-[var(--ink)]">
                {o.crumb}
              </Link>
              <span>/</span>
              <Link href={localePath(lang, `/oss/${data.categoryId}/`)} className="hover:text-[var(--ink)]">
                {data.categoryLabel}
              </Link>
              <span>/</span>
              <Link href={localePath(lang, '/oss/vs/')} className="hover:text-[var(--ink)]">
                {t.nav.comparisons}
              </Link>
            </p>
          </FadeUp>

          <FadeUp delay={0.05} className="relative mt-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className="font-mono text-[11px] text-[var(--sub)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--good)]" />
                {o.checkedPrefix} {data.checkedAt} · {o.primarySourcesLabel}
              </Badge>
              <Badge variant="mono" className="text-[var(--sub)]">
                {data.starsBadge}
              </Badge>
              <Link
                href={localePath(lang, '/about/')}
                className="text-[12px] text-[var(--sub)] underline decoration-[#CFCFCA] underline-offset-[3px] transition-colors hover:text-[var(--ink)] hover:decoration-[var(--ink)]"
              >
                {o.howWeVerifyLink}
              </Link>
            </div>
            <h1 className="mt-3 text-[clamp(28px,4vw,42px)] font-semibold leading-[1.12] tracking-[-0.025em] text-[var(--ink)]">
              {data.title}
            </h1>
            <p className="mt-2.5 max-w-[46rem] text-[16px] leading-[1.6] text-[var(--sub)]">{data.subtitle}</p>
          </FadeUp>
        </section>

        <div className="mt-7 space-y-6">
          {/* Option A Split Verdict Cards */}
          <FadeUp as="section" delay={0.08} className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {renderSideCard(data.left, true)}
            {renderSideCard(data.right, false)}
          </FadeUp>

          {/* Pitfall Alert Banner */}
          <FadeUp delay={0.12}>
            <Alert variant="warn">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 rounded-lg border border-[#c2700a]/20 bg-white p-2 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
                  <ShieldAlert aria-hidden="true" className="h-4 w-4 text-[var(--warn)]" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <AlertTitle>{data.trap.title}</AlertTitle>
                    <SourceCitationPill citation={data.trap.citation} lang={lang} />
                  </div>
                  <AlertDescription>{data.trap.body}</AlertDescription>
                </div>
              </div>
            </Alert>
          </FadeUp>

          {/* Interactive Seat / Cost Calculator */}
          <FadeUp as="section" id="tco-section" delay={0.14} className="scroll-mt-32">
            <Card className="[overflow:clip]">
              <CardHeader className="border-b border-[var(--line)] bg-[var(--wash)] py-3.5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <SlidersHorizontal aria-hidden="true" className="h-4 w-4 text-[var(--ink)]" />
                    <div>
                      <CardTitle as="h2" className="text-[16px]">{data.calc.title}</CardTitle>
                      <p className="mt-0.5 text-[12.5px] text-[var(--sub)]">{data.calc.subtitle}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5">
                    {data.calc.presets.map((p) => {
                      const active =
                        sliderValue === p.sliderValue &&
                        data.calc.toggles.every((tg) => Boolean(toggles[tg.key]) === Boolean(p.toggles[tg.key]));
                      return (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => applyPreset(p.id)}
                          aria-pressed={active}
                          className={cn(
                            'inline-flex min-h-[36px] items-center rounded-md border px-2.5 py-1 font-mono text-[11.5px] font-medium transition-colors',
                            active
                              ? 'border-[var(--ink)] bg-[var(--ink)] text-white'
                              : 'border-[var(--line)] bg-white text-[var(--sub)] hover:border-[var(--ink)]/40 hover:text-[var(--ink)]'
                          )}
                        >
                          {p.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="grid grid-cols-1 gap-6 pt-5 sm:pt-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)]">
                <div className="space-y-5">
                  <div>
                    <div className="mb-2.5 flex items-baseline justify-between gap-2">
                      <span className="text-[13px] font-medium text-[var(--ink)]">{data.calc.sliderLabel}</span>
                      <Badge variant="mono" className="px-2.5 py-0.5 text-[12.5px] font-semibold tabular-nums">
                        {calcResult.sliderFormatted}
                      </Badge>
                    </div>
                    <Slider
                      value={[sliderValue]}
                      min={data.calc.min}
                      max={data.calc.max}
                      step={data.calc.step}
                      onValueChange={(vals) => setSliderValue(vals[0] ?? data.calc.defaultSlider)}
                      aria-label={data.calc.sliderLabel}
                    />
                    <div className="mt-2 flex justify-between font-mono text-[11px] text-[#737370]">
                      {data.calc.scaleTicks.map((tick) => (
                        <span key={tick}>{tick}</span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3 rounded-xl border border-[var(--line)] bg-[var(--wash)] p-3.5">
                    {data.calc.toggles.map((tg, idx) => (
                      <React.Fragment key={tg.key}>
                        {idx > 0 && <Separator />}
                        <div className="flex items-center justify-between gap-3">
                          <div className="min-w-0">
                            <div className="text-[13.5px] font-medium text-[var(--ink)]">{tg.label}</div>
                            <div className="text-[12px] text-[var(--sub)]">{tg.hint}</div>
                          </div>
                          <Switch
                            checked={!!toggles[tg.key]}
                            onCheckedChange={(checked) => setToggles((prev) => ({ ...prev, [tg.key]: checked }))}
                            aria-label={tg.label}
                          />
                        </div>
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    {calcResult.bars.map((bar) => (
                      <div
                        key={bar.id}
                        className={cn(
                          'rounded-xl border border-[var(--line)] p-3.5',
                          bar.mutedCard ? 'bg-[var(--wash)]' : 'bg-white shadow-[0_1px_2px_rgba(0,0,0,0.03)]'
                        )}
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex flex-wrap items-center gap-2">
                            <Dot verdict={bar.dot} />
                            <span className="text-[13.5px] font-semibold text-[var(--ink)]">{bar.name}</span>
                            <Badge variant="mono">{bar.planBadge}</Badge>
                            {bar.statusBadge && (
                              <Badge variant={bar.statusBadge.variant}>
                                {bar.statusBadge.text}
                              </Badge>
                            )}
                          </div>
                          <div className="font-mono text-[15.5px] font-semibold tabular-nums text-[var(--ink)]">
                            {bar.costLabel}
                          </div>
                        </div>
                        {bar.percent > 0 && (
                          <div className="mt-2.5">
                            <AnimatedBar percent={bar.percent} tone={bar.tone} />
                          </div>
                        )}
                        <p className="mt-2 text-[12.5px] text-[var(--sub)]">{bar.note}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[var(--line)] bg-[var(--wash)] px-4 py-2.5">
                    <div className="text-[13px] font-medium text-[var(--ink)]">{calcResult.deltaText}</div>
                    <Button type="button" variant="outline" size="sm" onClick={handleCopy}>
                      {copied ? (
                        <Check aria-hidden="true" className="h-3.5 w-3.5 text-[var(--good)]" />
                      ) : (
                        <Copy aria-hidden="true" className="h-3.5 w-3.5" />
                      )}
                      <span>{copied ? o.copiedEstimate : o.copyEstimate}</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </FadeUp>

          {/* Tabbed 6-Dimension Audit Matrix */}
          <FadeUp as="section" id="spec-matrix" delay={0.16} className="scroll-mt-32">
            <Card className="[overflow:clip]">
              <CardHeader className="border-b border-[var(--line)] bg-[var(--wash)] py-3.5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <CardTitle as="h2" className="text-[17px]">{o.matrixTitle}</CardTitle>
                    <p className="mt-0.5 text-[12.5px] text-[var(--sub)]">{o.matrixSub}</p>
                  </div>
                  <Tabs value={matrixTab} onValueChange={(v) => setMatrixTab(v as AuditGroup)}>
                    <TabsList>
                      <SpringTabsTrigger value="all" active={matrixTab === 'all'} layoutId={`matrix-tab-${data.slug}`}>
                        {o.tabAllDimensions}
                      </SpringTabsTrigger>
                      <SpringTabsTrigger value="license" active={matrixTab === 'license'} layoutId={`matrix-tab-${data.slug}`}>
                        {o.tabLicenseSelfHost}
                      </SpringTabsTrigger>
                      <SpringTabsTrigger value="pricing" active={matrixTab === 'pricing'} layoutId={`matrix-tab-${data.slug}`}>
                        {o.tabPricingEnterprise}
                      </SpringTabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </CardHeader>

              <Table className="min-w-[680px]">
                <TableHeader>
                  <TableRow className="bg-white hover:bg-white">
                    <TableHead className="w-[24%]">{o.matrixColDimension}</TableHead>
                    <TableHead className="w-[38%] text-[var(--ink)]">{data.left.name}</TableHead>
                    <TableHead className="w-[38%] text-[var(--ink)]">{data.right.name}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRows.map((row) => (
                    <TableRow key={row.dimension}>
                      <TableCell>
                        <div className="font-medium text-[var(--ink)]">{row.dimension}</div>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {row.citations.map((cit) => (
                            <SourceCitationPill key={cit.label + cit.url} citation={cit} lang={lang} />
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 font-medium text-[var(--ink)]">
                          <Dot verdict={row.leftVerdict} />
                          <span>{row.leftHeadline}</span>
                        </div>
                        <p className="mt-1 text-[13px] leading-[1.55] text-[var(--sub)]">{row.leftDetail}</p>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 font-medium text-[var(--ink)]">
                          <Dot verdict={row.rightVerdict} />
                          <span>{row.rightHeadline}</span>
                        </div>
                        <p className="mt-1 text-[13px] leading-[1.55] text-[var(--sub)]">{row.rightDetail}</p>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </FadeUp>

          {/* Visible FAQ synced 1:1 with FAQPage JSON-LD */}
          <FadeUp as="section" id="faq-section" delay={0.18}>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle as="h2" className="text-[17px]">{o.faqTitle}</CardTitle>
                <p className="text-[12.5px] text-[var(--sub)]">{o.faqSub}</p>
              </CardHeader>
              <CardContent>
                <div className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
                  {data.faqs.map((item, idx) => (
                    <details key={item.q} className="group py-3.5" open={idx === 0}>
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[14.5px] font-medium text-[var(--ink)] marker:hidden">
                        {item.q}
                        <ChevronDown
                          aria-hidden="true"
                          className="h-4 w-4 shrink-0 text-[var(--sub)] transition-transform duration-200 group-open:rotate-180"
                        />
                      </summary>
                      <p className="mt-2.5 pr-6 text-[13.5px] leading-[1.65] text-[var(--sub)]">{item.a}</p>
                    </details>
                  ))}
                </div>
              </CardContent>
            </Card>
          </FadeUp>

          {/* Reciprocal flagship guide links (GEO 2.0 cluster) */}
          <section aria-labelledby={`guide-links-${data.slug}`} className="rounded-xl border border-[var(--line)] bg-[var(--wash)] px-4 py-3.5">
            <h2 id={`guide-links-${data.slug}`} className="font-mono text-[11px] font-medium uppercase tracking-[0.06em] text-[#737370]">
              {zh ? '延伸阅读 · 一手核验报告' : 'Related benchmark reports'}
            </h2>
            <ul className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {flagshipGuides.map((guide) => (
                <li key={guide.href}>
                  <Link
                    href={guide.href}
                    className="group flex min-h-[36px] items-center justify-between gap-3 rounded-md border border-[var(--line)] bg-white px-3 py-2 text-[13.5px] font-medium text-[var(--ink)] transition-colors hover:border-[var(--ink)]/35"
                  >
                    <span className="min-w-0">
                      <span className="mr-2 font-mono text-[11px] text-[#737370]">{guide.kicker}</span>
                      {guide.title}
                    </span>
                    <ArrowRight
                      aria-hidden="true"
                      className="h-3.5 w-3.5 shrink-0 text-[var(--sub)] transition-transform group-hover:translate-x-0.5 group-hover:text-[var(--ink)]"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* Peer comparisons */}
          {peers.length > 0 && (
            <section className="pt-4">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-[18px] font-semibold tracking-[-0.01em] text-[var(--ink)]">
                  {o.moreComparisonsTitle}
                </h2>
                <Link
                  href={localePath(lang, '/oss/vs/')}
                  className="inline-flex items-center gap-1 text-[13.5px] font-medium text-[var(--sub)] hover:text-[var(--ink)]"
                >
                  <span>{o.allComparisonsLink}</span>
                  <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
                </Link>
              </div>
              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {peers.map((peer) => (
                  <Link
                    key={peer.slug}
                    href={peer.href}
                    className="group flex flex-col justify-between rounded-xl border border-[var(--line)] bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.03)] transition-all hover:border-[var(--ink)]/35 hover:bg-[var(--wash)]"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <Badge variant="mono">{peer.categoryLabel}</Badge>
                        <ArrowRight
                          aria-hidden="true"
                          className="h-3.5 w-3.5 text-[var(--sub)] transition-transform group-hover:translate-x-0.5 group-hover:text-[var(--ink)]"
                        />
                      </div>
                      <div className="mt-2 font-semibold text-[var(--ink)]">{peer.title}</div>
                      <p className="mt-1 text-[12.5px] text-[var(--sub)]">{peer.pricingHighlight}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <LicenseWatchSubscribe className="mt-10" />
          <OssCta />
        </div>
      </main>

      <SiteFooter />
    </div>
  );
};
