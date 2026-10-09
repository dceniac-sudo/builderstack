'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { SiteFooter } from '@/components/SiteFooter';
import { ALL_FACTS, Dot, OssCta, OssProjectView } from '@/components/OssParts';
import { useI18n, localePath } from '@/lib/i18n';

// 一个项目的详情页：五件事各一行，每行有结论、依据和出处
export const OssProjectPage: React.FC<{ project: OssProjectView }> = ({ project: p }) => {
  const { lang, t } = useI18n();
  const o = t.oss;

  return (
    <div className="flex-1 flex flex-col text-base leading-[1.6]">
      <Navbar active="industries" />

      <main className="mx-auto w-full max-w-[860px] flex-1 px-5 pt-10 sm:px-10 sm:pt-16">
        <p className="mb-4 text-sm font-medium text-[#535A66]">
          <Link href={localePath(lang, '/')} className="hover:text-[#0E1116]">
            {o.crumb}
          </Link>
          {' / '}
          <Link href={localePath(lang, `/oss/${p.industry}/`)} className="hover:text-[#0E1116]">
            {p.industryLabel}
          </Link>
        </p>

        <h1 className="text-[clamp(30px,5vw,48px)] font-bold leading-[1.18] tracking-[-0.01em]">
          {p.name}
          {!p.confirmed && <span className="ml-3 align-middle text-sm font-normal text-[#6B7280]">{o.draft}</span>}
        </h1>
        <p className="mt-4 text-[17px] text-[#535A66]">{p.what}</p>

        <div className="mt-6 flex flex-wrap gap-x-3 gap-y-2">
          <a
            href={p.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center rounded-full bg-[#0E1116] px-[18px] text-sm font-medium text-white hover:bg-[#2B303A]"
          >
            {o.repo}
          </a>
          {p.homepage && (
            <a
              href={p.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center rounded-full border border-[#D9DCE2] bg-white px-[18px] text-sm font-medium hover:border-[#0E1116]"
            >
              {o.site}
            </a>
          )}
        </div>

        <dl className="mt-10 overflow-hidden rounded-[20px] border border-[#E6E8EC]">
          {ALL_FACTS.map((key, i) => {
            const fact = p.facts[key];
            return (
              <div
                key={key}
                className={`grid grid-cols-1 gap-x-8 gap-y-2 p-5 sm:grid-cols-[10rem_1fr] sm:p-6 ${i > 0 ? 'border-t border-[#E6E8EC]' : ''}`}
              >
                <dt className="text-sm text-[#6B7280] sm:pt-0.5">{o.questions[key]}</dt>
                <dd className="min-w-0">
                  <span className="flex items-center gap-2 text-[17px] font-semibold">
                    <Dot verdict={fact.verdict} />
                    {fact.label}
                  </span>
                  {fact.detail && <p className="mt-2 text-[15px] leading-[1.75] text-[#2B303A]">{fact.detail}</p>}
                  {fact.sources.length > 0 && (
                    <p className="mt-2 flex flex-wrap gap-x-3.5 gap-y-1 text-[13px]">
                      {fact.sources.map((s) => (
                        <a
                          key={s.url}
                          href={s.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#535A66] underline underline-offset-2 hover:text-[#C2410C]"
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

        <p className="mt-5 text-sm text-[#6B7280]">
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
