'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { SiteFooter } from '@/components/SiteFooter';
import { OssBrowser } from '@/components/OssBrowser';
import { Dot, OssCta, OssProjectView } from '@/components/OssParts';
import { OssVerdict } from '@/types/oss';
import { useI18n, localePath } from '@/lib/i18n';

interface OssIndustryPageProps {
  label: string;               // 行业名
  title: string;
  tagline: string;             // 标题后面灰色的那半句
  uses: { id: string; label: string }[];
  projects: OssProjectView[];
}

const SummaryTile: React.FC<{ count: number; verdict: OssVerdict; caption: string }> = ({ count, verdict, caption }) => (
  <div className="flex-1 basis-0 rounded-2xl bg-[#F5F6F8] px-3 py-[18px] sm:px-5">
    <div className="text-[40px] leading-none font-bold">{count}</div>
    <div className="mt-2.5 flex items-start gap-1.5 text-[13px] leading-snug text-[#3A404B]">
      <span className="mt-[5px] inline-flex shrink-0">
        <Dot verdict={verdict} />
      </span>
      {caption}
    </div>
  </div>
);

// 一个行业的页面：三个结论数字，按用途筛选的项目卡片
export const OssIndustryPage: React.FC<OssIndustryPageProps> = ({ label, title, tagline, uses, projects }) => {
  const { lang, t } = useI18n();
  const o = t.oss;
  const countOf = (v: OssVerdict) => projects.filter((p) => p.facts.commercial.verdict === v).length;
  const checkedAt = projects.map((p) => p.checkedAt).sort().pop();

  return (
    <div className="flex-1 flex flex-col text-base leading-[1.6]">
      <Navbar active="industries" />

      <main className="mx-auto w-full max-w-[1120px] flex-1 px-5 pt-10 sm:px-10 sm:pt-16">
        <section>
          <p className="mb-4 text-sm font-medium text-[#535A66]">
            <Link href={localePath(lang, '/')} className="hover:text-[#0E1116]">
              {o.crumb}
            </Link>
            {' / '}
            <Link href={localePath(lang, '/oss/')} className="hover:text-[#0E1116]">
              {t.nav.industries}
            </Link>
            {' / '}
            {label}
          </p>
          <h1 className="text-[clamp(30px,5vw,52px)] font-bold leading-[1.18] tracking-[-0.01em]">
            <span className="block">{title}</span>
            <span className="block text-[#8A909C]">{tagline}</span>
          </h1>
          <p className="mt-5 text-[15px] text-[#535A66]">
            {o.basis}
            {checkedAt && (
              <>
                {lang === 'zh' ? '' : ' '}
                {o.checked}
                {lang === 'zh' ? '：' : ': '}
                <time dateTime={checkedAt}>{checkedAt}</time>
                {lang === 'zh' ? '。' : '.'}
              </>
            )}
          </p>

          <div className="mt-8 flex max-w-[720px] gap-2.5 sm:gap-3">
            <SummaryTile count={countOf('good')} verdict="good" caption={o.sum.good} />
            <SummaryTile count={countOf('caution')} verdict="caution" caption={o.sum.caution} />
            <SummaryTile count={countOf('bad')} verdict="bad" caption={o.sum.bad} />
          </div>
        </section>

        <section className="mt-9 sm:mt-14">
          <h2 className="mb-3.5 text-lg font-semibold">{o.pick}</h2>
          <OssBrowser projects={projects} pills={uses} />
        </section>

        <OssCta />
      </main>

      <SiteFooter />
    </div>
  );
};
