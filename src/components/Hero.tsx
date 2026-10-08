'use client';

import React from 'react';
import { useI18n, X_HANDLE } from '@/lib/i18n';

export const Hero: React.FC = () => {
  const { t } = useI18n();

  return (
    <section className="relative pt-10 pb-8 sm:pt-16 sm:pb-12 text-center overflow-hidden">
      {/* 背景微弱光晕效果 */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-gradient-to-tr from-amber-500/10 via-amber-600/5 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* 作者署名 */}
        <a
          href={`https://twitter.com/${X_HANDLE}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/5 hover:bg-amber-500/10 px-3 py-1 mb-6 text-xs text-zinc-300 transition-colors shadow-sm group"
        >
          <img
            src="/avatar.jpg"
            alt={X_HANDLE}
            className="w-5 h-5 rounded-full object-cover border border-amber-500/40 shrink-0"
          />
          <span className="text-zinc-300">{t.hero.badge}</span>
          <span className="w-1 h-1 rounded-full bg-zinc-600" />
          <span className="font-mono text-amber-400 group-hover:underline">{t.hero.curator}</span>
        </a>

        {/* 主标题 */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-100 leading-tight sm:leading-tight mb-5">
          {t.hero.titleLine1}
          <br className="hidden sm:inline" />{' '}
          <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 bg-clip-text text-transparent">
            {t.hero.titleLine2}
          </span>
        </h1>

        {/* 副标题 */}
        <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          {t.hero.subtitle}
        </p>
      </div>
    </section>
  );
};
