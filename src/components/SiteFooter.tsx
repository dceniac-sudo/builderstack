'use client';

import React from 'react';
import { WechatQr } from '@/components/WechatQr';
import { useI18n, X_HANDLE, GITHUB_URL } from '@/lib/i18n';

// 全站共用的页脚
export const SiteFooter: React.FC = () => {
  const { lang, t } = useI18n();

  return (
    <footer className="border-t border-[#E6E6E2] mt-16 sm:mt-20">
      <div className="max-w-[1120px] mx-auto px-5 sm:px-10 py-8 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 text-[13px] text-[#6F6F6A]">
        <span>{t.footer.copyright}</span>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <a href={`https://twitter.com/${X_HANDLE}`} target="_blank" rel="noopener noreferrer" className="hover:text-[#141414]">
            X @{X_HANDLE}
          </a>
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="hover:text-[#141414]">
            GitHub
          </a>
          {lang === 'zh' && <WechatQr />}
        </div>
      </div>
    </footer>
  );
};
