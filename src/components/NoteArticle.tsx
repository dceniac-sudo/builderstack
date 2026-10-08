'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { WechatQr } from '@/components/WechatQr';
import { NoteItem } from '@/types/tool';
import { useI18n, X_HANDLE } from '@/lib/i18n';
import { renderMarkdown } from '@/lib/markdown';

interface NoteArticleProps {
  note: NoteItem;
  bodyEn: string;
  bodyZh: string;
}

export const NoteArticle: React.FC<NoteArticleProps> = ({ note, bodyEn, bodyZh }) => {
  const { lang, t } = useI18n();
  const title = lang === 'en' ? note.titleEn : note.title;
  const body = lang === 'en' ? bodyEn : bodyZh;

  return (
    <div className="flex-1 flex flex-col">
      <Navbar />

      <main className="flex-1 w-full max-w-2xl mx-auto px-5 sm:px-6 pt-8 pb-20">
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-amber-400">
          <ArrowLeft className="w-4 h-4" />
          {t.article.back}
        </Link>

        <header className="mt-8 mb-8">
          <time className="font-mono text-sm text-amber-400/90" dateTime={note.date}>
            {note.date}
          </time>
          <h1 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight leading-tight text-zinc-100">{title}</h1>
        </header>

        <article className="text-[17px] leading-[1.8] text-zinc-300">{renderMarkdown(body)}</article>

        <div className="mt-14 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-6 text-center">
          <p className="text-zinc-300">{t.article.cta}</p>
          <a
            href={`https://twitter.com/intent/follow?screen_name=${X_HANDLE}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-400 px-5 py-2.5 text-sm font-semibold text-zinc-950"
          >
            {t.nav.followX}
          </a>
        </div>

        {lang === 'zh' && (
          <div className="mt-8 flex justify-center">
            <WechatQr />
          </div>
        )}
      </main>
    </div>
  );
};
