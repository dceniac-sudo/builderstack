'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { SiteFooter } from '@/components/SiteFooter';
import { ALL_FACTS, Dot, OssCta, OssLogo, OssProjectView } from '@/components/OssParts';
import { useI18n, localePath } from '@/lib/i18n';
import { cn } from '@/lib/utils';

// 一个项目的详情页：五件事各一行，每行有结论、依据和出处
export const OssProjectPage: React.FC<{ project: OssProjectView }> = ({ project: p }) => {
  const { lang, t } = useI18n();
  const o = t.oss;

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
            {!p.confirmed && <span className="ml-3 align-middle text-sm font-normal text-[var(--sub)]">{o.draft}</span>}
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

        <dl className="mt-9 rounded-[14px] border border-[var(--line)] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)] [overflow:clip]">
          {ALL_FACTS.map((key, i) => {
            const fact = p.facts[key];
            return (
              <div
                key={key}
                className={cn('rise grid grid-cols-1 gap-x-8 gap-y-1.5 p-[18px] sm:grid-cols-[9rem_1fr] sm:p-5', i > 0 && 'border-t border-[var(--line)]')}
                style={{ animationDelay: `${210 + i * 45}ms` }}
              >
                <dt className="text-[13px] text-[var(--sub)] sm:pt-0.5">{o.questions[key]}</dt>
                <dd className="min-w-0">
                  <span className="flex items-center gap-2 text-base font-semibold">
                    <Dot verdict={fact.verdict} />
                    {fact.label}
                  </span>
                  {fact.detail && <p className="mt-1.5 leading-[1.75] text-[#2E2E2B]">{fact.detail}</p>}
                  {fact.sources.length > 0 && (
                    <p className="mt-2 flex flex-wrap gap-x-3.5 gap-y-1 text-[13px]">
                      {fact.sources.map((s) => (
                        <a
                          key={s.url}
                          href={s.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[var(--sub)] underline decoration-[#CFCFCA] underline-offset-[3px] transition-colors hover:text-[var(--ink)] hover:decoration-[var(--ink)]"
                        >
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
          {o.basis}
          {lang === 'zh' ? '' : ' '}
          {o.checked}
          {lang === 'zh' ? '：' : ': '}
          <time dateTime={p.checkedAt}>{p.checkedAt}</time>
          {lang === 'zh' ? '。' : '.'}
        </p>

        <OssCta />
      </main>

      <SiteFooter />
    </div>
  );
};
