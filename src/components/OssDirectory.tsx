'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Check, ChevronDown, Search } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { SiteFooter } from '@/components/SiteFooter';
import { Dot, OssCategoryView, OssCta, OssLogo, OssProjectView, ROW_FACTS } from '@/components/OssParts';
import { LicenseWatchSubscribe } from '@/components/LicenseWatchSubscribe';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { FadeUp } from '@/components/motion/MotionPrimitives';
import type { CategoryMatrixView } from '@/data/category-matrices';
import { guideSummaries } from '@/data/guides';
import { localePath, useI18n, type Language } from '@/lib/i18n';
import { itemListNode, pageGraph, SITE_URL, webPageNode } from '@/lib/schema';
import { cn } from '@/lib/utils';

// 首页旗舰一手实证报告（SSR 中距首页 1 次点击）
const FLAGSHIP_GUIDE_SLUGS = ['open-core-paywall-matrix-2026', 'self-hosting-n8n-vps-ram-benchmark'];

interface OssDirectoryProps {
  title: string; // 首页的大标题，“全部”且没选用途时用
  homeHref: string;
  sub: string;
  industries: OssCategoryView[]; // 第一排的行业标签（前面再加一个“全部”）
  uses: OssCategoryView[]; // 第二排的用途
  projects: OssProjectView[]; // 全部项目
  initialIndustry: string; // 打开页面时选中的行业，'all' 是全部
  initialUse: string; // 打开页面时选中的用途，'all' 是全部
  active?: 'industries'; // 行业页和用途页在顶栏里高亮“分类”
  categoryMatrix?: CategoryMatrixView; // 重点多项目用途页顶部的横向裁决矩阵
}

// 表头和每一行共用的列。宽屏上四个结论列是固定宽度，左边都留给名字和介绍；窄一些的屏幕上按比例分。
const COLS = 'md:grid-cols-[minmax(0,2.2fr)_repeat(4,minmax(0,1fr))_36px] lg:grid-cols-[minmax(0,1fr)_repeat(4,116px)_36px]';
// 点开后的列表，一行一件事：问题、结论、依据。手机上依据另起一行。
const FACT_ROW = 'grid grid-cols-[1fr_auto] items-baseline gap-x-4 gap-y-1 py-2.5 md:grid-cols-[140px_116px_minmax(0,1fr)]';
const TEXT_LINK = 'py-1 underline decoration-[#CFCFCA] underline-offset-[3px] transition-colors hover:decoration-[var(--ink)]';

export const OssDirectory: React.FC<OssDirectoryProps> = ({
  title,
  homeHref,
  sub,
  industries,
  uses: allUses,
  projects,
  initialIndustry,
  initialUse,
  active,
  categoryMatrix,
}) => {
  const { lang, t } = useI18n();
  const o = t.oss;
  const [industry, setIndustry] = useState(initialIndustry);
  const [use, setUse] = useState(initialUse);
  const [onlyCommercial, setOnlyCommercial] = useState(false);
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const [touched, setTouched] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const flagshipGuides = useMemo(() => {
    const all = guideSummaries(lang as Language);
    return FLAGSHIP_GUIDE_SLUGS.map((slug) => all.find((gs) => gs.slug === slug)).filter(
      (gs): gs is NonNullable<typeof gs> => Boolean(gs)
    );
  }, [lang]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const pageFor = (ind: string, u: string) => {
    const i = industries.find((x) => x.id === ind);
    if (i) return { title: i.title, sub: i.description, href: i.href };
    const x = allUses.find((y) => y.id === u);
    if (x) return { title: x.title, sub: x.description, href: x.href };
    return { title, sub, href: homeHref };
  };
  const current = pageFor(industry, use);
  const heading = current.title;
  const pick = (ind: string, u: string) => {
    change(() => {
      setIndustry(ind);
      setUse(u);
    });
    const next = pageFor(ind, u);
    if (ind !== 'all' && ind === industry) {
      // 行业页内的二级用途筛选：同步到 ?use=<slug>，刷新 / 分享都能保留筛选状态
      const params = new URLSearchParams(window.location.search);
      if (u === 'all') params.delete('use');
      else params.set('use', u);
      const qs = params.toString();
      window.history.replaceState(null, '', `${next.href}${qs ? `?${qs}` : ''}`);
      return;
    }
    if (next.href !== pageFor(industry, use).href) {
      window.history.replaceState(null, '', next.href);
      document.title = `${next.title} — BuilderStack`;
    }
  };

  // 行业页挂载时读取 ?use=<slug>
  useEffect(() => {
    if (initialIndustry === 'all') return;
    const fromUrl = new URLSearchParams(window.location.search).get('use');
    if (!fromUrl) return;
    const valid = projects.some((p) => p.industries.includes(initialIndustry) && p.use === fromUrl);
    if (valid) setUse(fromUrl);
    // 仅挂载时执行一次
  }, []);

  const inIndustry = useMemo(() => {
    if (industry === 'all') return projects;
    const own = projects.filter((p) => p.industries.includes(industry));
    const crossing = (p: OssProjectView) => p.scenarios.some((s) => s.id === industry);
    return [...own.filter((p) => !crossing(p)), ...own.filter(crossing)];
  }, [projects, industry]);

  const uses = useMemo(() => allUses.filter((u) => inIndustry.some((p) => p.use === u.id)), [allUses, inIndustry]);

  // 搜索索引：名称、简介、用途、行业场景 + 全部事实卡（商用 / 部署 / 成本 / 注意事项 / 额外依赖）的结论与依据。
  // 视图数据已按当前语言（EN / ZH）本地化，因此 lang === 'zh' 时自动检索中文字段。
  const searchIndex = useMemo(() => {
    const map = new Map<string, string>();
    for (const p of projects) {
      const parts: (string | undefined)[] = [p.name, p.what, p.useLabel];
      for (const s of p.scenarios) parts.push(s.label, s.text);
      for (const key of Object.keys(p.facts) as (keyof typeof p.facts)[]) {
        const f = p.facts[key];
        parts.push(f.label, f.detail, f.short);
      }
      if (p.needs) parts.push(p.needs.label, p.needs.detail, p.needs.short);
      map.set(p.id, parts.filter(Boolean).join(' \n ').toLowerCase());
    }
    return map;
  }, [projects]);

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    const pool = q ? projects : inIndustry;
    return pool.filter(
      (p) =>
        (q || use === 'all' || p.use === use) &&
        (!onlyCommercial || p.facts.commercial.verdict === 'good') &&
        (!q || (searchIndex.get(p.id) ?? '').includes(q))
    );
  }, [projects, inIndustry, use, onlyCommercial, query, searchIndex]);

  const checkedAt = projects.map((p) => p.checkedAt).sort().pop() ?? '';
  const initialPage = pageFor(initialIndustry, initialUse);
  const isHome = initialIndustry === 'all' && initialUse === 'all';
  const jsonLd = pageGraph(
    isHome
      ? [
          webPageNode({
            path: homeHref,
            name: title,
            description: sub,
            lang: lang as Language,
            dateModified: checkedAt || undefined,
          }),
        ]
      : [
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: o.crumb, item: `${SITE_URL}${homeHref}` },
              { '@type': 'ListItem', position: 2, name: initialPage.title, item: `${SITE_URL}${initialPage.href}` },
            ],
          },
          webPageNode({
            path: initialPage.href,
            name: initialPage.title,
            description: initialPage.sub,
            lang: lang as Language,
            dateModified: checkedAt || undefined,
          }),
          ...(shown.length > 0
            ? [
                itemListNode({
                  path: initialPage.href,
                  name: initialPage.title,
                  items: shown.map((p) => ({ name: p.name, url: `${SITE_URL}${p.href}` })),
                }),
              ]
            : []),
        ]
  );

  const tabs = [{ id: 'all', label: o.all, count: projects.length }, ...industries.filter((i) => i.count > 0)];
  const chipUses = industry !== 'all' ? uses : uses.filter((u) => u.id === use);
  const showUseChips = industry !== 'all' ? uses.length > 1 : use !== 'all';
  const grouped = industry === 'all' && use === 'all' && !query.trim();
  const groups = useMemo(() => {
    if (!grouped) return [{ id: '', label: '', href: '', items: shown }];
    return allUses
      .map((u) => ({ id: u.id, label: u.label, href: u.href, items: shown.filter((p) => p.use === u.id) }))
      .filter((g) => g.items.length > 0);
  }, [grouped, allUses, shown]);

  function change(fn: () => void) {
    setTouched(true);
    fn();
  }

  return (
    <div className="flex flex-1 flex-col text-[15px] leading-[1.6]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <Navbar active={active} />

      <section className="border-b border-[var(--line)]">
        <div className="dot-fade relative mx-auto max-w-[1120px] overflow-hidden px-5 pb-8 pt-10 text-center sm:px-10 sm:pb-12 sm:pt-[72px]">
          <FadeUp className="relative flex justify-center">
            <Badge variant="outline" className="gap-2 px-3.5 py-[5px] text-[13px] font-normal text-[var(--sub)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--good)]" />
              {o.homeBadge(projects.length, allUses.filter((u) => u.count > 0).length, checkedAt)}
            </Badge>
          </FadeUp>

          <FadeUp delay={0.05} className="relative">
            <h1
              className={cn(
                'mx-auto mt-[18px] max-w-[20em] text-[clamp(28px,4.2vw,50px)] font-semibold leading-[1.16] tracking-[-0.02em]',
                lang === 'zh' && '[word-break:keep-all] [overflow-wrap:anywhere]'
              )}
              style={{ textWrap: 'balance' } as React.CSSProperties}
            >
              {heading}
            </h1>
          </FadeUp>

          <FadeUp delay={0.1} className="relative">
            <p className="mx-auto mt-3.5 max-w-[34em] text-[clamp(15px,1.4vw,18px)] text-[var(--sub)]">
              {current.sub}
            </p>
          </FadeUp>

          <FadeUp delay={0.14} className="relative">
            <label className="mx-auto mt-[26px] flex h-12 max-w-[520px] items-center gap-2.5 rounded-xl border border-[#D9D9D5] bg-white px-4 shadow-[0_1px_2px_rgba(0,0,0,0.05)] transition-[border-color,box-shadow] duration-150 focus-within:border-[var(--ink)] focus-within:shadow-[0_0_0_4px_rgba(20,20,20,0.08)]">
              <Search aria-hidden="true" className="h-4 w-4 shrink-0 text-[#8C8C88]" />
              <input
                ref={searchRef}
                id="oss-directory-search"
                name="q"
                type="search"
                value={query}
                onChange={(e) => change(() => setQuery(e.target.value))}
                placeholder={o.searchPlaceholder}
                aria-label={o.searchPlaceholder}
                className="min-w-0 flex-1 bg-transparent text-[15px] outline-none placeholder:text-[#8C8C88]"
              />
              <kbd
                title="Ctrl+K / ⌘K"
                className="hidden rounded border border-[var(--line)] bg-[var(--wash)] px-1.5 py-0.5 font-mono text-[10.5px] text-[var(--sub)] sm:inline-block"
              >
                ⌘K
              </kbd>
            </label>
            {query.trim() && (industry !== 'all' || use !== 'all') && (
              <p role="status" className="mt-3 flex justify-center">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--line)] bg-[var(--wash)] px-3 py-1 font-mono text-[11.5px] text-[var(--sub)]">
                  <Search aria-hidden="true" className="h-3 w-3" />
                  {lang === 'zh'
                    ? `正在全站 ${projects.length} 个项目中搜索`
                    : `Searching all ${projects.length} projects across categories`}
                </span>
              </p>
            )}
          </FadeUp>

          <FadeUp delay={0.18} className="relative mt-[22px] flex flex-wrap justify-center gap-x-[26px] gap-y-2 text-[13px] text-[var(--sub)]">
            {o.basisItems.map((item) => (
              <span key={item} className="inline-flex items-center gap-1.5">
                <Check aria-hidden="true" className="h-3.5 w-3.5 text-[var(--good)]" strokeWidth={2.6} />
                {item}
              </span>
            ))}
          </FadeUp>
        </div>
      </section>

      <main className="mx-auto w-full max-w-[1120px] flex-1 px-5 sm:px-10">
        {industry === 'all' && use === 'all' && !query.trim() && flagshipGuides.length > 0 && (
          <section aria-labelledby="flagship-audits-heading" className="mt-8">
            <h2
              id="flagship-audits-heading"
              className="font-mono text-[11px] font-medium uppercase tracking-[0.06em] text-[#737370]"
            >
              {lang === 'zh' ? '旗舰一手实证报告' : 'Flagship Primary-Source Audits'}
            </h2>
            <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
              {flagshipGuides.map((fg) => (
                <Link
                  key={fg.slug}
                  href={fg.href}
                  className="group flex flex-col justify-between gap-3 rounded-[10px] border border-[#E6E6E2] bg-[#FAFAF8] px-5 py-4 transition-colors hover:border-[var(--ink)]/35"
                >
                  <div className="min-w-0">
                    <div className="flex items-center justify-between gap-2 font-mono text-[11px] tabular-nums text-[#737370]">
                      <span>{fg.docId}</span>
                      <time dateTime={fg.updatedAt}>{fg.updatedAt}</time>
                    </div>
                    <div className="mt-1.5 text-[15.5px] font-semibold leading-[1.35] text-[var(--ink)] group-hover:underline group-hover:underline-offset-4">
                      {fg.title}
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[var(--ink)]">
                    <span>{t.guides.readReport}</span>
                    <ArrowRight aria-hidden="true" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}
        {categoryMatrix && use === initialUse && industry === 'all' && !query.trim() && (
          <section className="mt-8 overflow-hidden rounded-[10px] border border-[var(--line)] bg-white">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--line)] bg-[var(--wash)] px-5 py-4">
              <div>
                <div className="font-mono text-[11px] font-medium uppercase tracking-[0.06em] text-[#737370]">
                  {t.categoryMatrix.kicker}
                </div>
                <h2 className="mt-1 text-[17px] font-semibold tracking-[-0.015em] text-[var(--ink)]">
                  {categoryMatrix.heading}
                </h2>
              </div>
              {categoryMatrix.compareHref && (
                <Link
                  href={localePath(lang, categoryMatrix.compareHref)}
                  className="inline-flex items-center gap-1.5 text-[13.5px] font-medium text-[var(--ink)] underline decoration-[#CFCFC9] underline-offset-[3px] hover:decoration-[var(--ink)]"
                >
                  <span>{categoryMatrix.compareLabel ?? t.categoryMatrix.compareLink}</span>
                  <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
                </Link>
              )}
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[780px] border-collapse text-left text-[13.5px]">
                <thead>
                  <tr className="border-b border-[var(--line)] bg-white">
                    {categoryMatrix.columns.map((col) => (
                      <th
                        key={col}
                        className="px-5 py-3 font-mono text-[11px] font-medium uppercase tracking-[0.05em] text-[#737370]"
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--line)]">
                  {categoryMatrix.rows.map((row) => (
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
                            href={row.href}
                            className="font-semibold text-[var(--ink)] underline-offset-[3px] hover:underline"
                          >
                            {row.name}
                          </Link>
                          {row.microBadge && (
                            <span
                              className={cn(
                                'rounded-[5px] border px-1.5 py-0.5 font-mono text-[10.5px] font-medium',
                                row.microBadge.tone === 'bad' && 'border-[#FECACA] bg-[#FEF2F2] text-[#B91C1C]',
                                row.microBadge.tone === 'good' && 'border-[#BBF7D0] bg-[#F0FDF4] text-[#15803D]',
                                row.microBadge.tone === 'warn' && 'border-[#FDE68A] bg-[#FFFBEB] text-[#B45309]'
                              )}
                            >
                              {row.microBadge.text}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-5 py-4 align-top">
                        <div className="font-medium text-[var(--ink)]">{row.license}</div>
                        <div className="mt-0.5 text-[12.5px] text-[var(--sub)]">{row.licenseNote}</div>
                      </td>
                      <td className="px-5 py-4 align-top font-mono text-[12.5px] tabular-nums text-[var(--ink)]">
                        {row.minStack}
                      </td>
                      <td className="max-w-[230px] px-5 py-4 align-top text-[13.5px] leading-[1.55] text-[var(--sub)]">
                        {row.freeCeiling}
                      </td>
                      <td className="px-5 py-4 align-top font-mono text-[12.5px] font-medium tabular-nums text-[var(--ink)]">
                        {row.paidFloor}
                      </td>
                      <td className="max-w-[220px] px-5 py-4 align-top text-[13.5px] leading-[1.55] text-[var(--ink)]">
                        {row.bestFor}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {categoryMatrix.guideHref && categoryMatrix.guideLabel && (
              <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[var(--line)] bg-[var(--wash)] px-5 py-3 text-[13px] text-[var(--sub)]">
                <span>
                  {t.categoryMatrix.guidePrefix}{' '}
                  <Link
                    href={localePath(lang, categoryMatrix.guideHref)}
                    className="font-medium text-[var(--ink)] underline decoration-[#CFCFC9] underline-offset-[3px] hover:decoration-[var(--ink)]"
                  >
                    {categoryMatrix.guideLabel}
                  </Link>
                </span>
              </div>
            )}
          </section>
        )}

        <div className="mt-6 rounded-[14px] border border-[var(--line)] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)] [overflow:clip] md:mt-8">
          <div className="flex flex-wrap items-stretch gap-x-6 border-b border-[var(--line)] px-3.5 md:px-[18px]">
            {tabs.map((i) => {
              const isSelected = i.id === industry;
              const href = i.id === 'all' ? homeHref : 'href' in i ? i.href : homeHref;
              return (
                <Link
                  key={i.id}
                  href={href}
                  aria-current={isSelected ? 'page' : undefined}
                  className={cn(
                    'relative -mb-px inline-flex min-h-12 items-center gap-[7px] whitespace-nowrap text-[15px] transition-colors md:min-h-[52px]',
                    isSelected ? 'font-semibold text-[var(--ink)]' : 'text-[var(--sub)] hover:text-[var(--ink)]'
                  )}
                >
                  {i.label}
                  {i.count > 0 && <span className="text-[12.5px] font-normal tabular-nums text-[var(--sub)]">{i.count}</span>}
                  {isSelected && (
                    <motion.span
                      layoutId="dir-industry-underline"
                      transition={{ type: 'spring', stiffness: 460, damping: 36 }}
                      aria-hidden="true"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--ink)]"
                    />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="md:flex md:items-start md:gap-2 md:px-[18px] md:py-3">
            {showUseChips && (
              <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2 px-3.5 py-3 md:p-0">
                <span className="mr-1 text-[13px] text-[var(--sub)] md:mr-1.5">{o.pick}</span>
                {[{ id: 'all', label: o.all }, ...chipUses].map((u) => (
                  <button
                    key={u.id}
                    type="button"
                    aria-pressed={use === u.id}
                    onClick={() => pick(industry, u.id)}
                    className={cn(
                      'inline-flex min-h-10 items-center gap-[7px] whitespace-nowrap rounded-lg border px-3 text-sm transition-colors md:min-h-[34px]',
                      use === u.id
                        ? 'border-[var(--ink)] bg-[var(--ink)] font-medium text-white'
                        : 'border-[var(--line)] bg-white hover:border-[var(--ink)]'
                    )}
                  >
                    {u.label}
                    <span className={cn('text-[12.5px] font-normal', use === u.id ? 'text-[#C9C9C4]' : 'text-[var(--sub)]')}>
                      {u.id === 'all' ? inIndustry.length : inIndustry.filter((p) => p.use === u.id).length}
                    </span>
                  </button>
                ))}
              </div>
            )}

            <div
              className={cn(
                'flex min-h-12 items-center justify-between gap-2.5 whitespace-nowrap px-3.5 text-sm md:ml-auto md:min-h-[34px] md:shrink-0 md:px-0',
                showUseChips && 'max-md:border-t max-md:border-[var(--line)]'
              )}
            >
              <label htmlFor="only-commercial-switch" className="cursor-pointer">
                {o.only}
              </label>
              <Switch
                id="only-commercial-switch"
                checked={onlyCommercial}
                onCheckedChange={(checked) => change(() => setOnlyCommercial(checked))}
                aria-label={o.only}
              />
            </div>
          </div>

          <div
            className={cn(
              'sticky top-16 z-[2] flex min-h-9 items-center border-y border-[var(--line)] bg-[var(--wash)] px-3.5 text-[12.5px] font-medium text-[var(--sub)] md:grid md:min-h-10 md:gap-3 md:px-[18px]',
              COLS
            )}
          >
            <span>{o.projectCount(shown.length)}</span>
            {ROW_FACTS.map((key) => (
              <span key={key} className="hidden md:block">
                {o.cols[key]}
              </span>
            ))}
            <span className="hidden md:block" />
          </div>

          {groups.map((g, gi) => (
            <React.Fragment key={g.id || 'rows'}>
              {g.id && (
                <div className={cn('flex items-baseline gap-2 px-3.5 pb-2 pt-4 md:px-[18px]', gi > 0 && 'border-t border-[var(--line)]')}>
                  <Link href={g.href} className="text-[13.5px] font-semibold underline-offset-[3px] hover:underline">
                    {g.label}
                  </Link>
                  <span className="text-[12.5px] text-[var(--sub)]">{g.items.length}</span>
                </div>
              )}
              {g.items.map((p, j) => {
                const i = groups.slice(0, gi).reduce((n, x) => n + x.items.length, 0) + j;
                const isOpen = !!open[p.id];
                const toggle = () => setOpen((prev) => ({ ...prev, [p.id]: !isOpen }));
                const scenario = !query.trim() ? p.scenarios.find((s) => s.id === industry)?.text : undefined;
                const verdict = (key: (typeof ROW_FACTS)[number]) => (
                  <span className="inline-flex items-center gap-[7px] whitespace-nowrap text-sm font-medium">
                    <Dot verdict={p.facts[key].verdict} />
                    {p.facts[key].short ?? o.short[key][p.facts[key].verdict]}
                  </span>
                );
                return (
                  <div
                    key={p.id}
                    className={cn(touched ? 'swap-in' : 'rise', (grouped || i > 0) && 'border-t border-[var(--line)]')}
                    style={{ animationDelay: `${touched ? i * 15 : 220 + Math.min(i, 12) * 28}ms` }}
                  >
                    <div
                      onClick={toggle}
                      className={cn(
                        'relative grid w-full cursor-pointer grid-cols-2 items-center gap-x-3.5 gap-y-2.5 py-3.5 pl-3.5 pr-11 text-left transition-colors duration-150 hover:bg-[var(--wash)]',
                        'md:min-h-[68px] md:gap-3 md:px-[18px] md:py-3',
                        COLS,
                        isOpen && 'bg-[var(--wash)]'
                      )}
                    >
                      <span className={cn('col-span-2 flex min-w-0 items-center gap-3', isOpen ? 'md:col-span-5' : 'md:col-span-1')}>
                        <OssLogo project={p} />
                        <span className="min-w-0">
                          <span className="flex flex-wrap items-center gap-1.5 text-[15.5px] font-semibold leading-[1.3]">
                            <Link href={p.href} onClick={(e) => e.stopPropagation()} className="underline-offset-[3px] hover:underline">
                              {p.name}
                            </Link>
                            {p.handsOn && (
                              <Badge variant="good" className="px-1.5 py-px text-[11px]">
                                {o.handsOn}
                              </Badge>
                            )}
                            {p.compareHref && (
                              <Link
                                href={p.compareHref}
                                onClick={(e) => e.stopPropagation()}
                                className="inline-flex items-center gap-0.5 rounded-md border border-[var(--line)] bg-[var(--wash)] px-1.5 py-px font-mono text-[10.5px] font-medium text-[var(--sub)] transition-colors hover:border-[var(--ink)] hover:text-[var(--ink)]"
                              >
                                <span>{o.compareTag}</span>
                                <ArrowRight aria-hidden="true" className="h-2.5 w-2.5" />
                              </Link>
                            )}
                            {!p.confirmed && <span className="text-xs font-normal text-[var(--sub)]">{o.draft}</span>}
                          </span>
                          <span className={cn('block text-[13px] text-[var(--sub)]', !isOpen && 'truncate')}>{scenario ?? p.what}</span>
                          {scenario && isOpen && <span className="mt-0.5 block text-[13px] text-[var(--sub)]">{p.what}</span>}
                        </span>
                      </span>
                      {!isOpen &&
                        ROW_FACTS.map((key) => (
                          <span key={key}>
                            <span className="block text-xs text-[var(--sub)] md:hidden">{o.cols[key]}</span>
                            {verdict(key)}
                          </span>
                        ))}
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-label={lang === 'zh' ? `展开 / 收起 ${p.name} 审计摘要` : `Toggle ${p.name} audit summary`}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggle();
                        }}
                        className="absolute right-1 top-[9px] grid min-h-[36px] min-w-[36px] place-items-center rounded-md text-[var(--sub)] transition-colors hover:text-[var(--ink)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--ink)] md:static"
                      >
                        <ChevronDown
                          aria-hidden="true"
                          className={cn('h-[18px] w-[18px] transition-transform duration-[250ms]', isOpen && 'rotate-180')}
                        />
                      </button>
                    </div>

                    {isOpen && (
                      <div className="bg-[var(--wash)] px-3.5 pb-[18px] pt-1 md:pl-16 md:pr-[18px]">
                        <dl>
                          {ROW_FACTS.map((key, n) => (
                            <div key={key} className={cn(FACT_ROW, n > 0 && 'border-t border-[var(--line)]')}>
                              <dt className="text-[13px] text-[var(--sub)]">{o.cols[key]}</dt>
                              <dd>{verdict(key)}</dd>
                              <dd className="col-span-full text-[14.5px] md:col-span-1">{p.facts[key].detail ?? p.facts[key].label}</dd>
                            </div>
                          ))}
                          {p.needs && (
                            <div className={cn(FACT_ROW, 'border-t border-[var(--line)]')}>
                              <dt className="col-span-full text-[13px] text-[var(--sub)] md:col-span-1">{o.needs}</dt>
                              <dd className="col-span-full text-[14.5px] md:col-[2/-1]">{p.needs.detail ?? p.needs.label}</dd>
                            </div>
                          )}
                          {p.facts.caveats.verdict !== 'pending' && (
                            <div className={cn(FACT_ROW, 'border-t border-[var(--line)]')}>
                              <dt className="col-span-full text-[13px] font-semibold text-[var(--warn)] md:col-span-1">
                                {o.questions.caveats}
                              </dt>
                              <dd className="col-span-full text-[14.5px] md:col-[2/-1]">{p.facts.caveats.detail ?? p.facts.caveats.label}</dd>
                            </div>
                          )}
                        </dl>
                        <div className="flex flex-wrap gap-x-[18px] gap-y-1 border-t border-[var(--line)] pt-2 text-[13.5px]">
                          <Link href={p.href} className={TEXT_LINK}>
                            {o.seeSources}
                          </Link>
                          {p.compareHref && p.compareLabel && (
                            <Link href={p.compareHref} className={TEXT_LINK}>
                              {p.compareLabel}
                            </Link>
                          )}
                          {p.homepage && (
                            <a
                              href={p.homepage}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={TEXT_LINK}
                            >
                              {o.site}
                            </a>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </React.Fragment>
          ))}

          {shown.length === 0 && (
            <p className="px-[18px] py-11 text-center text-[var(--sub)]">
              {inIndustry.length === 0 && !query.trim() ? o.emptyCategory : o.empty}
            </p>
          )}
        </div>

        <LicenseWatchSubscribe className="mt-12" />
        <OssCta />
      </main>

      <SiteFooter />
    </div>
  );
};
