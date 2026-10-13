'use client';

import React from 'react';
import { useI18n, X_HANDLE } from '@/lib/i18n';

// 全站共用的页脚。联系入口只有 X（2026-10-11 定），这里不放其他渠道的入口。
export const SiteFooter: React.FC = () => {
  const { t } = useI18n();

  return (
    <footer className="border-t border-[#E6E6E2] mt-16 sm:mt-20">
      <div className="max-w-[1120px] mx-auto px-5 sm:px-10 py-8 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 text-[13px] text-[#6F6F6A]">
        <span>{t.footer.copyright}</span>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <a href={`https://twitter.com/${X_HANDLE}`} target="_blank" rel="noopener noreferrer" className="hover:text-[#141414]">
            X @{X_HANDLE}
          </a>
        </div>
      </div>
    </footer>
  );
};
