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
        className="inline-flex items-center gap-2 rounded-full bg-[#F5F5F2] hover:bg-[#EFEFEB] px-3 py-1.5 mb-5 text-sm text-[#2E2E2B] transition-colors"
      >
        <img src="/avatar.jpg" alt={X_HANDLE} className="w-5 h-5 rounded-full object-cover shrink-0" />
        <span>{t.hero.badge}</span>
        <span className="text-[#6F6F6A]">{t.hero.curator}</span>
      </a>

      {/* 主标题 */}
      <h1 className="text-[clamp(30px,5vw,52px)] font-bold leading-[1.18] tracking-[-0.01em] text-[#141414]">
        <span className="block">{t.hero.titleLine1}</span>
        <span className="block text-[#8C8C88]">{t.hero.titleLine2}</span>
      </h1>

      {/* 副标题 */}
      <p className="mt-5 text-[15px] text-[#5E5E5A]">{t.hero.subtitle}</p>
    </section>
  );
};
