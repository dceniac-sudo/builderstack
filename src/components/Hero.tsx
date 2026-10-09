'use client';

import React from 'react';
import { useI18n, X_HANDLE } from '@/lib/i18n';

// “笔记”页的开头。版式和首页一致：左对齐、黑灰两段的大标题。
export const Hero: React.FC = () => {
  const { t } = useI18n();

  return (
    <section className="pt-10 pb-10 sm:pt-16 sm:pb-14 lg:pt-20">
      {/* 作者署名 */}
      <a
        href={`https://twitter.com/${X_HANDLE}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-full bg-[#F5F6F8] hover:bg-[#ECEEF2] px-3 py-1.5 mb-5 text-sm text-[#2B303A] transition-colors"
      >
        <img src="/avatar.jpg" alt={X_HANDLE} className="w-5 h-5 rounded-full object-cover shrink-0" />
        <span>{t.hero.badge}</span>
        <span className="text-[#6B7280]">{t.hero.curator}</span>
      </a>

      {/* 主标题 */}
      <h1 className="text-[clamp(30px,5vw,52px)] font-bold leading-[1.18] tracking-[-0.01em] text-[#0E1116]">
        <span className="block">{t.hero.titleLine1}</span>
        <span className="block text-[#8A909C]">{t.hero.titleLine2}</span>
      </h1>

      {/* 副标题 */}
      <p className="mt-5 text-[15px] text-[#535A66]">{t.hero.subtitle}</p>
    </section>
  );
};
