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

// 表头和每一行共用的列。宽屏上四个结论列是固定宽度，左边都留给名字和介绍；窄一些的屏幕上按比例分。
const COLS = 'md:grid-cols-[minmax(0,2.2fr)_repeat(4,minmax(0,1fr))_24px] lg:grid-cols-[minmax(0,1fr)_repeat(4,116px)_24px]';
// 点开后的列表，一行一件事：问题、结论、依据。手机上依据另起一行。
const FACT_ROW = 'grid grid-cols-[1fr_auto] items-baseline gap-x-4 gap-y-1 py-2.5 md:grid-cols-[140px_116px_minmax(0,1fr)]';
const TEXT_LINK = 'py-1 underline decoration-[#CFCFCA] underline-offset-[3px] transition-colors hover:decoration-[var(--ink)]';

// 首页和行业页共用的目录：居中的标题区和搜索框，下面一张表。
// 筛选并在表头里：最上面一排是分类，第二排是想解决的事和“只看能直接商用的”开关。
// 点开一行时，这一行的四个结论从行里挪到下面，和依据写在一起，同样的话不说两遍（用户 2026-10-11 选定）。
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
  // 分类页上换标签时，大标题、浏览器标题和地址都跟着换成那个分类的；首页的标题不分行业，不用换。
  const followTab = active === 'industries';
  const heading = followTab && current ? current.title : title;
  const pickIndustry = (i: OssIndustryView) => {
    change(() => { setIndustry(i.id); setUse('all'); });
    if (followTab && i.id !== industry) {
      window.history.replaceState(null, '', i.href);
      document.title = `${i.title} — BuilderStack`;
    }
  };
  // 一个分类下的项目：本来就属于它的，加上标了“也出现在这里”的（比如餐饮门店里的通用收银系统同时出现在电商零售下面）
  const inIndustry = useMemo(() => projects.filter((p) => p.industry === industry || p.alsoIn.includes(industry)), [projects, industry]);
  // “想解决的事”先列这个分类自己的，再补上从别的分类带过来的项目的
  const uses = useMemo(() => {
    const known = new Map<string, string>();
    (current?.uses ?? []).forEach((u) => known.set(u.id, u.label));
    industries.forEach((i) => i.uses.forEach((u) => { if (!known.has(u.id)) known.set(u.id, u.label); }));
    return Array.from(known, ([id, label]) => ({ id, label })).filter((u) => inIndustry.some((p) => p.uses.includes(u.id)));
  }, [current, industries, inIndustry]);

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
  const checkedAt = projects.map((p) => p.checkedAt).sort().pop() ?? '';
  const change = (fn: () => void) => {
    setTouched(true);
    fn();
  };

  return (
    <div className="flex-1 flex flex-col text-[15px] leading-[1.6]">
      <Navbar active={active} />

      <section className="border-b border-[var(--line)]">
        <div className="dot-fade relative mx-auto max-w-[1120px] overflow-hidden px-5 pb-8 pt-10 text-center sm:px-10 sm:pb-12 sm:pt-[72px]">
          <p className="rise relative inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-white px-3.5 py-[5px] text-[13px] text-[var(--sub)] shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--good)]" />
            {o.homeBadge(projects.length, live.length, checkedAt)}
          </p>
          <h1
            className={cn(
              'rise relative mx-auto mt-[18px] max-w-[20em] text-[clamp(28px,4.2vw,50px)] font-semibold leading-[1.16] tracking-[-0.02em]',
              // 中文标题只在标点处换行，不把一个词拆到两行
              lang === 'zh' && '[word-break:keep-all] [overflow-wrap:anywhere]'
            )}
            style={{ animationDelay: '70ms', textWrap: 'balance' } as React.CSSProperties}
          >
            {heading}
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
        <div className="mt-5 rounded-[14px] border border-[var(--line)] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)] [overflow:clip] md:mt-8">
          <div className="flex flex-wrap items-stretch gap-x-6 border-b border-[var(--line)] px-3.5 md:px-[18px]">
            {industries.map((i) => (
              <button
                key={i.id}
                type="button"
                aria-pressed={i.id === industry}
                onClick={() => pickIndustry(i)}
                className={cn(
                  '-mb-px inline-flex min-h-12 items-center gap-[7px] whitespace-nowrap text-[15px] transition-colors md:min-h-[52px]',
                  i.id === industry ? 'font-semibold shadow-[inset_0_-2px_0_var(--ink)]' : 'text-[var(--sub)] hover:text-[var(--ink)]'
                )}
              >
                {i.label}
                {i.count > 0 && <span className="text-[12.5px] font-normal text-[var(--sub)]">{i.count}</span>}
              </button>
            ))}
          </div>

          <div className="md:flex md:items-start md:gap-2 md:px-[18px] md:py-3">
            {uses.length > 1 && (
              <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2 px-3.5 py-3 md:p-0">
                <span className="mr-1 text-[13px] text-[var(--sub)] md:mr-1.5">{o.pick}</span>
                {[{ id: 'all', label: o.all }, ...uses].map((u) => (
                  <button
                    key={u.id}
                    type="button"
                    aria-pressed={use === u.id}
                    onClick={() => change(() => setUse(u.id))}
                    className={cn(
                      'inline-flex min-h-10 items-center gap-[7px] whitespace-nowrap rounded-lg border px-3 text-sm transition-colors md:min-h-[34px]',
                      use === u.id
                        ? 'border-[var(--ink)] bg-[var(--ink)] font-medium text-white'
                        : 'border-[var(--line)] bg-white hover:border-[var(--ink)]'
                    )}
                  >
                    {u.label}
                    <span className={cn('text-[12.5px] font-normal', use === u.id ? 'text-[#C9C9C4]' : 'text-[var(--sub)]')}>
                      {u.id === 'all' ? inIndustry.length : inIndustry.filter((p) => p.uses.includes(u.id)).length}
                    </span>
                  </button>
                ))}
              </div>
            )}

            <label
              className={cn(
                'flex min-h-12 cursor-pointer items-center justify-between gap-2.5 whitespace-nowrap px-3.5 text-sm md:ml-auto md:min-h-[34px] md:shrink-0 md:px-0',
                uses.length > 1 && 'max-md:border-t max-md:border-[var(--line)]'
              )}
            >
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
          </div>

          {/* 表头第一格是项目数。手机上没有列名，这一条只剩项目数。 */}
          <div className={cn('sticky top-16 z-[2] flex min-h-9 items-center border-y border-[var(--line)] bg-[var(--wash)] px-3.5 text-[12.5px] font-medium text-[var(--sub)] md:grid md:min-h-10 md:gap-3 md:px-[18px]', COLS)}>
            <span>{o.projectCount(shown.length)}</span>
            {ROW_FACTS.map((key) => (
              <span key={key} className="hidden md:block">{o.cols[key]}</span>
            ))}
            <span className="hidden md:block" />
          </div>

          {shown.map((p, i) => {
            const isOpen = !!open[p.id];
            const verdict = (key: (typeof ROW_FACTS)[number]) => (
              <span className="inline-flex items-center gap-[7px] whitespace-nowrap text-sm font-medium">
                <Dot verdict={p.facts[key].verdict} />
                {p.facts[key].short ?? o.short[key][p.facts[key].verdict]}
              </span>
            );
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
                    'md:min-h-[68px] md:gap-3 md:px-[18px] md:py-3',
                    COLS,
                    isOpen && 'bg-[var(--wash)]'
                  )}
                >
                  <span className={cn('col-span-2 flex min-w-0 items-center gap-3', isOpen ? 'md:col-span-5' : 'md:col-span-1')}>
                    <OssLogo project={p} />
                    <span className="min-w-0">
                      <span className="block text-[15.5px] font-semibold leading-[1.3]">
                        {p.name}
                        {p.industry !== industry && !query.trim() && (
                          <span className="ml-2 rounded-md border border-[var(--line)] px-1.5 py-px align-[1px] text-[11.5px] font-medium text-[var(--sub)]">{p.industryLabel}</span>
                        )}
                        {p.handsOn && (
                          <span className="ml-2 rounded-md bg-[#E8F3EC] px-1.5 py-px align-[1px] text-[11.5px] font-medium text-[var(--good)]">{o.handsOn}</span>
                        )}
                        {!p.confirmed && <span className="ml-2 text-xs font-normal text-[var(--sub)]">{o.draft}</span>}
                      </span>
                      <span className={cn('block text-[13px] text-[var(--sub)]', !isOpen && 'truncate')}>{p.what}</span>
                    </span>
                  </span>
                  {!isOpen &&
                    ROW_FACTS.map((key) => (
                      <span key={key}>
                        <span className="block text-xs text-[var(--sub)] md:hidden">{o.cols[key]}</span>
                        {verdict(key)}
                      </span>
                    ))}
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
                            <dt className="col-span-full text-[13px] font-semibold text-[var(--warn)] md:col-span-1">{o.questions.caveats}</dt>
                            <dd className="col-span-full text-[14.5px] md:col-[2/-1]">{p.facts.caveats.detail ?? p.facts.caveats.label}</dd>
                          </div>
                        )}
                      </dl>
                      <div className="flex flex-wrap gap-x-[18px] gap-y-1 border-t border-[var(--line)] pt-2 text-[13.5px]">
                        <Link href={p.href} className={TEXT_LINK}>
                          {o.seeSources}
                        </Link>
                        {p.homepage && (
                          <a href={p.homepage} target="_blank" rel="noopener noreferrer" className={TEXT_LINK}>
                            {o.site}
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {shown.length === 0 && (
            <p className="px-[18px] py-11 text-center text-[var(--sub)]">{inIndustry.length === 0 && !query.trim() ? o.emptyCategory : o.empty}</p>
          )}
        </div>

        <OssCta />
      </main>

      <SiteFooter />
    </div>
  );
};
