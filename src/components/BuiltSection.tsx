'use client';

import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { BuiltItem } from '@/types/tool';
import { useI18n } from '@/lib/i18n';

interface BuiltSectionProps {
  items: BuiltItem[];
}

// 没有内容时整个模块不渲染，避免线上出现空标题
export const BuiltSection: React.FC<BuiltSectionProps> = ({ items }) => {
  const { lang, t } = useI18n();

  if (items.length === 0) return null;

  return (
    <section id="built" className="pb-12">
      <div className="mb-5 px-1">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-100">{t.built.heading}</h2>
        <p className="text-sm text-zinc-500 mt-1">{t.built.sub}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {items.map((item) => {
          const links = [
            { href: item.url, label: t.built.visit },
            { href: item.repoUrl, label: t.built.repo },
          ].filter((l) => l.href);

          return (
            <article
              key={item.id}
              id={`built-${item.id}`}
              className="flex flex-col rounded-2xl bg-zinc-950/80 border border-white/10 p-6"
            >
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-lg font-semibold text-zinc-100">
                  {lang === 'zh' && item.nameZh ? item.nameZh : item.name}
                </h3>
                <span className="font-mono text-[11px] px-2 py-0.5 rounded border text-emerald-300 bg-emerald-500/10 border-emerald-500/20">
                  {t.built.status[item.status]}
                </span>
              </div>
              <p className="mt-3 text-[15px] leading-relaxed text-zinc-300">
                {lang === 'en' ? item.descEn : item.desc}
              </p>

              {links.length > 0 && (
                <div className="mt-auto pt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm">
                  {links.map((l) => (
                    <a
                      key={l.label}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-amber-400 hover:text-amber-300 hover:underline"
                    >
                      {l.label}
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  ))}
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
};
