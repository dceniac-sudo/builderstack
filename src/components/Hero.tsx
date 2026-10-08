'use client';

import React from 'react';
import { ShieldCheck, Zap, Globe, Sparkles } from 'lucide-react';
import { useI18n, X_HANDLE } from '@/lib/i18n';

interface HeroProps {
  totalTools: number;
}

export const Hero: React.FC<HeroProps> = ({ totalTools }) => {
  const { t } = useI18n();

  return (
    <section className="relative pt-10 pb-6 sm:pt-16 sm:pb-12 text-center overflow-hidden">
      {/* 背景微弱光晕效果 */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-gradient-to-tr from-amber-500/10 via-amber-600/5 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* 顶部标语胶囊与独立策展人背书 */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-zinc-900/80 px-3 py-1 text-xs text-zinc-300 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="font-mono text-[11px] text-zinc-400">
              {t.hero.badge}
            </span>
            <span className="w-1 h-1 rounded-full bg-zinc-600" />
            <span className="text-zinc-200">{t.hero.badgeSub}</span>
          </div>

          <a
            href={`https://twitter.com/${X_HANDLE}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/20 bg-amber-500/5 hover:bg-amber-500/10 px-3 py-1 text-xs text-zinc-300 transition-colors shadow-sm group"
          >
            <img
              src="/avatar.jpg"
              alt={X_HANDLE}
              className="w-4 h-4 rounded-full object-cover border border-amber-500/40 shrink-0"
            />
            <span className="text-[11px] font-mono text-amber-400 group-hover:underline">
              {t.hero.curator}
            </span>
            <span className="text-[10px] text-zinc-500 font-mono hidden sm:inline">
              · {t.hero.curatorNote}
            </span>
          </a>
        </div>

        {/* 主标题 */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-100 leading-tight sm:leading-tight mb-4">
          {t.hero.titleLine1}
          <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 bg-clip-text text-transparent">
            {t.hero.titleLine2}
          </span>
        </h1>

        {/* 副标题 */}
        <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-8">
          {t.hero.subtitle}
        </p>

        {/* 3 个极客信任指标 */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-zinc-400 font-mono">
          <div className="flex items-center gap-1.5 bg-zinc-900/60 border border-zinc-800/80 rounded-lg px-3 py-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>{totalTools}+ {t.hero.metricTools}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-zinc-900/60 border border-zinc-800/80 rounded-lg px-3 py-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>{t.hero.metricLockin}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-zinc-900/60 border border-zinc-800/80 rounded-lg px-3 py-1.5">
            <Globe className="w-3.5 h-3.5 text-sky-400" />
            <span>{t.hero.metricEdge}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
