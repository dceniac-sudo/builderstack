'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { Check, ChevronDown, Search } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { SiteFooter } from '@/components/SiteFooter';
import { Dot, OssCta, OssIndustryView, OssLogo, OssProjectView, ROW_FACTS } from '@/components/OssParts';
import { useI18n } from '@/lib/i18n';
import { cn } from '@/lib/utils';

interface OssDirectoryProps {
  title: string;
  sub: string;
  industries: OssIndustryView[];
  projects: OssProjectView[];      // 所有行业的项目
  initialIndustry: string;         // 打开页面时选中的行业
  active?: 'industries';           // 行业页在顶栏里高亮“行业”
}

// 首页和行业页共用的目录：居中的标题区和搜索框，左栏选行业和想解决的事，右边一张表，点一行展开依据。
export const OssDirectory: React.FC<OssDirectoryProps> = ({ title, sub, industries, projects, initialIndustry, active }) => {
  const { lang, t } = useI18n();
  const o = t.oss;
  const [industry, setIndustry] = useState(initialIndustry);
  const [use, setUse] = useState('all');
  const [onlyCommercial, setOnlyCommercial] = useState(false);
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const [touched, setTouched] = useState(false);   // 筛选过之后，行的入场动画换成更短的那种

  const current = industries.find((i) => i.id === industry);
  const inIndustry = useMemo(() => projects.filter((p) => p.industry === industry), [projects, industry]);
  const uses = (current?.uses ?? []).filter((u) => inIndustry.some((p) => p.uses.includes(u.id)));

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    // 有搜索词时在所有行业里找，否则只看选中的行业
    const pool = q ? projects : inIndustry;
    return pool.filter(
      (p) =>
        (q || use === 'all' || p.uses.includes(use)) &&
        (!onlyCommercial || p.facts.commercial.verdict === 'good') &&
        (!q || p.name.toLowerCase().includes(q) || p.what.toLowerCase().includes(q) || p.industryLabel.toLowerCase().includes(q))
    );
  }, [projects, inIndustry, use, onlyCommercial, query]);

  const live = industries.filter((i) => i.count > 0);
  const total = live.reduce((n, i) => n + i.count, 0);
  const checkedAt = projects.map((p) => p.checkedAt).sort().pop() ?? '';
  const change = (fn: () => void) => {
    setTouched(true);
    fn();
  };

  const railButton = (isActive: boolean) =>
    cn(
      'flex w-full items-center justify-between gap-2 rounded-lg px-2.5 py-2 min-h-[38px] text-left text-[14.5px] transition-colors',
      'max-md:w-auto max-md:whitespace-nowrap max-md:border max-md:border-[var(--line)]',
      isActive ? 'bg-[#F0F0EC] font-semibold' : 'hover:bg-[var(--wash)]'
    );

  return (
    <div className="flex-1 flex flex-col text-[15px] leading-[1.6]">
      <Navbar active={active} />

      <section className="border-b border-[var(--line)]">
        <div className="dot-fade relative mx-auto max-w-[1120px] overflow-hidden px-5 pb-8 pt-10 text-center sm:px-10 sm:pb-12 sm:pt-[72px]">
          <p className="rise relative inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-white px-3.5 py-[5px] text-[13px] text-[var(--sub)] shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--good)]" />
            {o.homeBadge(total, live.length, checkedAt)}
          </p>
          <h1
            className={cn(
              'rise relative mx-auto mt-[18px] max-w-[20em] text-[clamp(28px,4.2vw,50px)] font-semibold leading-[1.16] tracking-[-0.02em]',
              // 中文标题只在标点处换行，不把一个词拆到两行
              lang === 'zh' && '[word-break:keep-all] [overflow-wrap:anywhere]'
            )}
            style={{ animationDelay: '70ms', textWrap: 'balance' } as React.CSSProperties}
          >
            {title}
          </h1>
          <p className="rise relative mx-auto mt-3.5 max-w-[34em] text-[clamp(15px,1.4vw,18px)] text-[var(--sub)]" style={{ animationDelay: '140ms' }}>
            {sub}
          </p>
          <label
            className="rise relative mx-auto mt-[26px] flex h-12 max-w-[520px] items-center gap-2.5 rounded-xl border border-[#D9D9D5] bg-white px-4 shadow-[0_1px_2px_rgba(0,0,0,0.05)] transition-[border-color,box-shadow] duration-150 focus-within:border-[var(--ink)] focus-within:shadow-[0_0_0_4px_rgba(20,20,20,0.08)]"
            style={{ animationDelay: '210ms' }}
          >
            <Search aria-hidden="true" className="h-4 w-4 shrink-0 text-[#8C8C88]" />
            <input
              type="search"
              value={query}
              onChange={(e) => change(() => setQuery(e.target.value))}
              placeholder={o.searchPlaceholder}
              aria-label={o.searchPlaceholder}
              className="min-w-0 flex-1 bg-transparent text-[15px] outline-none placeholder:text-[#8C8C88]"
            />
          </label>
          <div className="rise relative mt-[22px] flex flex-wrap justify-center gap-x-[26px] gap-y-2 text-[13px] text-[var(--sub)]" style={{ animationDelay: '280ms' }}>
            {o.basisItems.map((item) => (
              <span key={item} className="inline-flex items-center gap-1.5">
                <Check aria-hidden="true" className="h-3.5 w-3.5 text-[var(--good)]" strokeWidth={2.6} />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <main className="mx-auto w-full max-w-[1120px] flex-1 px-5 sm:px-10">
        <div className="grid grid-cols-1 items-start gap-[18px] pt-5 md:grid-cols-[220px_minmax(0,1fr)] md:gap-10 md:pt-8">
          <aside className="grid gap-3 md:sticky md:top-20 md:gap-6">
            <div>
              <h2 className="mb-1.5 text-[12.5px] font-medium text-[var(--sub)] md:pl-2.5">{t.nav.industries}</h2>
              <div className="no-scrollbar flex gap-1.5 overflow-x-auto md:grid md:gap-0.5 md:overflow-visible">
                {industries.map((i) => (
                  <button
                    key={i.id}
                    type="button"
                    disabled={i.count === 0}
                    aria-pressed={i.id === industry}
                    onClick={() => change(() => { setIndustry(i.id); setUse('all'); })}
                    className={cn(railButton(i.id === industry), 'disabled:cursor-default disabled:text-[#9A9A96] disabled:hover:bg-transparent')}
                  >
                    {i.label}
                    <span className="shrink-0 whitespace-nowrap text-[12.5px] font-normal text-[var(--sub)]">{i.count > 0 ? i.count : o.evaluating}</span>
                  </button>
                ))}
              </div>
            </div>

            {uses.length > 1 && (
              <div>
                <h2 className="mb-1.5 text-[12.5px] font-medium text-[var(--sub)] md:pl-2.5">{o.pick}</h2>
                <div className="no-scrollbar flex gap-1.5 overflow-x-auto md:grid md:gap-0.5 md:overflow-visible">
                  {[{ id: 'all', label: o.all }, ...uses].map((u) => (
                    <button key={u.id} type="button" aria-pressed={use === u.id} onClick={() => change(() => setUse(u.id))} className={railButton(use === u.id)}>
                      {u.label}
                      <span className="text-[12.5px] font-normal text-[var(--sub)]">
                        {u.id === 'all' ? inIndustry.length : inIndustry.filter((p) => p.uses.includes(u.id)).length}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <label className="flex cursor-pointer items-center gap-2.5 text-sm md:justify-between md:border-t md:border-[var(--line)] md:px-2.5 md:pt-3.5">
              {o.only}
              <input
                type="checkbox"
                checked={onlyCommercial}
                onChange={(e) => change(() => setOnlyCommercial(e.target.checked))}
                className="peer sr-only"
              />
              <span
                aria-hidden="true"
                className="relative h-5 w-9 shrink-0 rounded-full bg-[#D4D4D0] transition-colors duration-200 after:absolute after:left-0.5 after:top-0.5 after:h-4 after:w-4 after:rounded-full after:bg-white after:shadow-[0_1px_2px_rgba(0,0,0,0.25)] after:transition-transform after:duration-200 peer-checked:bg-[var(--ink)] peer-checked:after:translate-x-4 peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--ink)] peer-focus-visible:ring-offset-2"
              />
            </label>
          </aside>

          <div className="min-w-0">
            <div className="mb-3 flex items-center justify-between gap-3 text-[13.5px] text-[var(--sub)]">
              <span>{o.projectCount(shown.length)}</span>
              <span>{o.hint}</span>
            </div>

            <div className="rounded-[14px] border border-[var(--line)] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)] [overflow:clip]">
              <div className="sticky top-16 z-[2] hidden min-h-10 grid-cols-[minmax(0,2.7fr)_repeat(4,minmax(0,1fr))_24px] items-center gap-3 border-b border-[var(--line)] bg-[var(--wash)] px-[18px] text-[12.5px] font-medium text-[var(--sub)] md:grid">
                <span>{o.colProject}</span>
                {ROW_FACTS.map((key) => (
                  <span key={key}>{o.cols[key]}</span>
                ))}
                <span />
              </div>

              {shown.map((p, i) => {
                const isOpen = !!open[p.id];
                return (
                  <div
                    key={`${p.industry}-${p.id}`}
                    className={cn(touched ? 'swap-in' : 'rise', i > 0 && 'border-t border-[var(--line)]')}
                    style={{ animationDelay: `${touched ? i * 18 : 340 + i * 35}ms` }}
                  >
                    <button
                      type="button"
                      onClick={() => setOpen((prev) => ({ ...prev, [p.id]: !isOpen }))}
                      aria-expanded={isOpen}
                      className={cn(
                        'relative grid w-full grid-cols-2 items-center gap-x-3.5 gap-y-2.5 py-3.5 pl-3.5 pr-11 text-left transition-colors duration-150 hover:bg-[var(--wash)]',
                        'md:min-h-[68px] md:grid-cols-[minmax(0,2.7fr)_repeat(4,minmax(0,1fr))_24px] md:gap-3 md:px-[18px] md:py-3',
                        isOpen && 'bg-[var(--wash)]'
                      )}
                    >
                      <span className="col-span-2 flex min-w-0 items-center gap-3 md:col-span-1">
                        <OssLogo project={p} />
                        <span className="min-w-0">
                          <span className="block text-[15.5px] font-semibold leading-[1.3]">
                            {p.name}
                            {!p.confirmed && <span className="ml-2 text-xs font-normal text-[var(--sub)]">{o.draft}</span>}
                          </span>
                          <span className="block truncate text-[13px] text-[var(--sub)]">{p.what}</span>
                        </span>
                      </span>
                      {ROW_FACTS.map((key) => {
                        const fact = p.facts[key];
                        return (
                          <span key={key}>
                            <span className="block text-xs text-[var(--sub)] md:hidden">{o.cols[key]}</span>
                            <span className="inline-flex items-center gap-[7px] whitespace-nowrap text-sm font-medium">
                              <Dot verdict={fact.verdict} />
                              {fact.short ?? o.short[key][fact.verdict]}
                            </span>
                          </span>
                        );
                      })}
                      <ChevronDown
                        aria-hidden="true"
                        className={cn(
                          'absolute right-3.5 top-[18px] h-[18px] w-[18px] text-[var(--sub)] transition-transform duration-[250ms] md:static',
                          isOpen && 'rotate-180'
                        )}
                      />
                    </button>

                    <div className={cn('grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none', isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]')}>
                      <div className={cn('overflow-hidden transition-[visibility] duration-300', isOpen ? 'visible' : 'invisible')}>
                        <dl className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-x-7 gap-y-3.5 bg-[var(--wash)] px-3.5 pb-5 pt-1.5 md:pl-16 md:pr-[18px]">
                          {ROW_FACTS.map((key) => (
                            <div key={key}>
                              <dt className="text-[12.5px] text-[var(--sub)]">{o.questions[key]}</dt>
                              <dd className="mt-0.5 text-[14.5px]">{p.facts[key].detail ?? p.facts[key].label}</dd>
                            </div>
                          ))}
                          {p.facts.caveats.verdict !== 'pending' && (
                            <div className="col-span-full rounded-[10px] border border-[#EFD9A7] bg-[#FFF8E5] px-[13px] py-2.5 text-sm">
                              <dt className="inline font-semibold">
                                {o.questions.caveats}
                                {lang === 'zh' ? '：' : ': '}
                              </dt>
                              <dd className="inline">{p.facts.caveats.detail ?? p.facts.caveats.label}</dd>
                            </div>
                          )}
                          <div className="col-span-full flex flex-wrap gap-2">
                            <Link
                              href={p.href}
                              className="inline-flex min-h-[38px] items-center rounded-[9px] bg-[var(--ink)] px-3.5 text-[13.5px] font-medium text-white transition-colors hover:bg-[#2E2E2B]"
                            >
                              {o.seeSources}
                            </Link>
                            {p.homepage && (
                              <a
                                href={p.homepage}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex min-h-[38px] items-center rounded-[9px] border border-[#D9D9D5] bg-white px-3.5 text-[13.5px] font-medium transition-colors hover:border-[var(--ink)]"
                              >
                                {o.site}
                              </a>
                            )}
                          </div>
                        </dl>
                      </div>
                    </div>
                  </div>
                );
              })}

              {shown.length === 0 && <p className="px-[18px] py-11 text-center text-[var(--sub)]">{o.empty}</p>}
            </div>
          </div>
        </div>

        <OssCta />
      </main>

      <SiteFooter />
    </div>
  );
};
