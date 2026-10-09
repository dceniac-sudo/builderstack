'use client';

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { SiteFooter } from '@/components/SiteFooter';
import { OssBrowser } from '@/components/OssBrowser';
import { OssCta, OssIndustryCard, OssIndustryView, OssProjectView } from '@/components/OssParts';
import { useI18n } from '@/lib/i18n';

interface OssHomeProps {
  industries: OssIndustryView[];
  projects: OssProjectView[];  // 所有行业的项目
}

// 首页：先选行业，下面是全部项目的目录
export const OssHome: React.FC<OssHomeProps> = ({ industries, projects }) => {
  const { t } = useI18n();
  const o = t.oss;
  const live = industries.filter((i) => i.href).length;

  return (
    <div className="flex-1 flex flex-col text-base leading-[1.6]">
      <Navbar />

      <main className="mx-auto w-full max-w-[1120px] flex-1 px-5 sm:px-10">
        <section className="mx-auto max-w-[860px] pb-10 pt-12 text-center sm:pb-14 sm:pt-20">
          <p className="mb-5 inline-flex items-center rounded-full bg-[#F5F6F8] px-3.5 py-1.5 text-[13px] text-[#3A404B]">
            {o.homeBadge(projects.length, live)}
          </p>
          <h1 className="text-[clamp(30px,5vw,54px)] font-bold leading-[1.16] tracking-[-0.01em]">
            <span className="block">{o.homeTitle}</span>
            <span className="block text-[#8A909C]">{o.homeTagline}</span>
          </h1>
          <p className="mx-auto mt-5 max-w-[620px] text-base text-[#535A66] sm:text-[17px]">{o.homeSub}</p>
        </section>

        <section>
          <h2 className="mb-3.5 text-lg font-semibold">{o.industriesHeading}</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
            {industries.map((industry) => (
              <OssIndustryCard key={industry.id} industry={industry} />
            ))}
          </div>
        </section>

        <section className="mt-12 sm:mt-16">
          <h2 className="mb-3.5 text-lg font-semibold">{o.allHeading}</h2>
          <OssBrowser projects={projects} showIndustry />
        </section>

        <OssCta />
      </main>

      <SiteFooter />
    </div>
  );
};
