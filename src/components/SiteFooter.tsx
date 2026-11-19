'use client';

import React from 'react';
import Link from 'next/link';
import { Logo } from '@/components/Logo';
import { useI18n, localePath, SPONSOR_EMAIL, X_HANDLE } from '@/lib/i18n';

// 全站共用的页脚。联系入口为 sponsor@dceniac.com 与 X，另挂 /about/ 方法论、/guides/ 与 /rss.xml。
export const SiteFooter: React.FC = () => {
  const { lang, t } = useI18n();

  return (
    <footer className="mt-16 border-t border-[#E6E6E2] sm:mt-20">
      <div className="mx-auto flex max-w-[1140px] flex-wrap items-start justify-between gap-x-8 gap-y-4 px-5 py-9 text-[13px] text-[#6F6F6A] sm:px-10">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 font-medium text-[#141414]">
            <Logo size={20} />
            <span>{t.footer.copyright}</span>
          </div>
          <p className="max-w-[460px] text-[12px] leading-[1.5] text-[#737370]">{t.footer.disclaimer}</p>
        </div>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-0.5">
          <Link href={localePath(lang, '/about/')} className="hover:text-[#141414]">
            {t.footer.about}
          </Link>
          <Link href={localePath(lang, '/guides/')} className="hover:text-[#141414]">
            {t.footer.guides}
          </Link>
          <a href="/rss.xml" className="hover:text-[#141414]">
            {t.footer.rss}
          </a>
          <a href={`mailto:${SPONSOR_EMAIL}`} className="hover:text-[#141414]">
            {SPONSOR_EMAIL}
          </a>
          <a href={`https://x.com/${X_HANDLE}`} target="_blank" rel="noopener noreferrer" className="hover:text-[#141414]">
            X @{X_HANDLE}
          </a>
        </div>
      </div>
    </footer>
  );
};
