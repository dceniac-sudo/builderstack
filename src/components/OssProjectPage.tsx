'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { SiteFooter } from '@/components/SiteFooter';
import { ALL_FACTS, Dot, OssCta, OssLogo, OssProjectView, RowFactKey } from '@/components/OssParts';
import { useI18n, localePath } from '@/lib/i18n';
import { cn } from '@/lib/utils';

// 适不适合和截图的内容在 src/data/oss-extras.ts，这里拿到的是已经按当前语言取好的文字
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

interface OssProjectPageProps {
  project: OssProjectView;
  fit?: OssFitView;
  shot?: OssShotView;
  alternatives: OssProjectView[];  // 同一用途下的其他项目
}

const H2 = 'text-[19px] font-semibold tracking-[-0.01em]';
const SOURCE_LINK = 'text-[var(--sub)] underline decoration-[#CFCFCA] underline-offset-[3px] transition-colors hover:text-[var(--ink)] hover:decoration-[var(--ink)]';
// “别的选择”里每个项目带出来的两个结论：读者换项目，多半是因为许可证或者部署难度
const ALT_FACTS: RowFactKey[] = ['commercial', 'deploy'];

// 一个项目的详情页，从上往下：适不适合、界面截图、五件事（每行有结论、依据和出处）、同一用途的其他项目。
// 适不适合放在最前面：从搜索进来的人先要知道适不适合自己，再看依据。
export const OssProjectPage: React.FC<OssProjectPageProps> = ({ project: p, fit, shot, alternatives }) => {
  const { lang, t } = useI18n();
  const o = t.oss;
  const rows = ALL_FACTS.flatMap((key) => {
    const row = { key: key as string, question: o.questions[key], fact: p.facts[key] };
    return key === 'caveats' && p.needs ? [{ key: 'needs', question: o.needs, fact: p.needs }, row] : [row];
  });
  const draftTag = <span className="ml-3 align-middle text-sm font-normal tracking-normal text-[var(--sub)]">{o.draft}</span>;
  // 上面多出来的每一块，把下面各行的入场往后推一拍
  const rowsDelay = 210 + (fit ? 70 : 0) + (shot ? 70 : 0);

  return (
    <div className="flex-1 flex flex-col text-[15px] leading-[1.6]">
      <Navbar active="industries" />

      <main className="mx-auto w-full max-w-[860px] flex-1 px-5 pt-10 sm:px-10 sm:pt-16">
        <p className="mb-5 text-sm text-[var(--sub)]">
          <Link href={localePath(lang, '/')} className="hover:text-[var(--ink)]">
            {o.crumb}
          </Link>
          {' / '}
          <Link href={localePath(lang, `/oss/${p.industry}/`)} className="hover:text-[var(--ink)]">
            {p.industryLabel}
          </Link>
        </p>

        <div className="rise flex items-center gap-4">
          <OssLogo project={p} size={52} />
          <h1 className="min-w-0 text-[clamp(26px,4vw,40px)] font-semibold leading-[1.16] tracking-[-0.02em]">
            {p.name}
            {p.handsOn && (
              <span className="ml-3 rounded-md bg-[#E8F3EC] px-2 py-0.5 align-middle text-[13px] font-medium tracking-normal text-[var(--good)]">{o.handsOn}</span>
            )}
            {!p.confirmed && draftTag}
          </h1>
        </div>
        <p className="rise mt-4 text-[17px] text-[var(--sub)]" style={{ animationDelay: '70ms' }}>
          {p.what}
        </p>

        <div className="rise mt-5 flex flex-wrap gap-2" style={{ animationDelay: '140ms' }}>
          <a
            href={p.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-10 items-center rounded-[9px] bg-[var(--ink)] px-4 text-sm font-medium text-white transition-colors hover:bg-[#2E2E2B]"
          >
            {o.repo}
          </a>
          {p.homepage && (
            <a
              href={p.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-10 items-center rounded-[9px] border border-[#D9D9D5] bg-white px-4 text-sm font-medium transition-colors hover:border-[var(--ink)]"
            >
              {o.site}
            </a>
          )}
        </div>

        {fit && (
          <section className="rise mt-9" style={{ animationDelay: '210ms' }}>
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
          </section>
        )}

        {shot && (
          <figure className="rise mt-8" style={{ animationDelay: `${fit ? 280 : 210}ms` }}>
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
        )}

        <dl className="mt-9 rounded-[14px] border border-[var(--line)] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)] [overflow:clip]">
          {rows.map(({ key, question, fact }, i) => {
            return (
              <div
                key={key}
                className={cn('rise grid grid-cols-1 gap-x-8 gap-y-1.5 p-[18px] sm:grid-cols-[9rem_1fr] sm:p-5', i > 0 && 'border-t border-[var(--line)]')}
                style={{ animationDelay: `${rowsDelay + i * 45}ms` }}
              >
                <dt className="text-[13px] text-[var(--sub)] sm:pt-0.5">{question}</dt>
                <dd className="min-w-0">
                  <span className="flex items-center gap-2 text-base font-semibold">
                    <Dot verdict={fact.verdict} />
                    {fact.label}
                  </span>
                  {fact.detail && <p className="mt-1.5 leading-[1.75] text-[#2E2E2B]">{fact.detail}</p>}
                  {fact.sources.length > 0 && (
                    <p className="mt-2 flex flex-wrap gap-x-3.5 gap-y-1 text-[13px]">
                      {fact.sources.map((s) => (
                        <a key={s.url} href={s.url} target="_blank" rel="noopener noreferrer" className={SOURCE_LINK}>
                          {s.label}
                        </a>
                      ))}
                    </p>
                  )}
                </dd>
              </div>
            );
          })}
        </dl>

        <p className="mt-4 text-[13px] text-[var(--sub)]">
          {p.handsOn && `${o.basisHandsOn}${lang === 'zh' ? '' : ' '}`}
          {o.checked}
          {lang === 'zh' ? '：' : ': '}
          <time dateTime={p.checkedAt}>{p.checkedAt}</time>
          {lang === 'zh' ? '。' : '.'}
        </p>

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

        <OssCta />
      </main>

      <SiteFooter />
    </div>
  );
};
