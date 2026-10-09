'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { SiteFooter } from '@/components/SiteFooter';
import { OssCta, OssIndustryCard, OssIndustryView } from '@/components/OssParts';
import { useI18n, localePath } from '@/lib/i18n';

// 行业列表页
export const OssIndustriesPage: React.FC<{ industries: OssIndustryView[] }> = ({ industries }) => {
  const { lang, t } = useI18n();
  const o = t.oss;

  return (
    <div className="flex-1 flex flex-col text-base leading-[1.6]">
      <Navbar active="industries" />

      <main className="mx-auto w-full max-w-[1120px] flex-1 px-5 pt-10 sm:px-10 sm:pt-16">
        <p className="mb-4 text-sm font-medium text-[#535A66]">
          <Link href={localePath(lang, '/')} className="hover:text-[#0E1116]">
            {o.crumb}
          </Link>
          {' / '}
          {t.nav.industries}
        </p>
        <h1 className="text-[clamp(30px,5vw,52px)] font-bold leading-[1.18] tracking-[-0.01em]">{o.industriesTitle}</h1>
        <p className="mt-4 text-[15px] text-[#535A66]">{o.industriesSub}</p>

        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {industries.map((industry) => (
            <OssIndustryCard key={industry.id} industry={industry} />
          ))}
        </div>

        <OssCta />
      </main>

      <SiteFooter />
    </div>
  );
};
