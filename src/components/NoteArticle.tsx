'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { SiteFooter } from '@/components/SiteFooter';
import { NoteItem } from '@/types/tool';
import { useI18n, localePath, X_HANDLE } from '@/lib/i18n';
import { renderMarkdown } from '@/lib/markdown';

interface NoteArticleProps {
  note: NoteItem;
  body: string;                // 当前页面语言的正文
}

export const NoteArticle: React.FC<NoteArticleProps> = ({ note, body }) => {
  const { lang, t } = useI18n();
  const title = lang === 'en' ? note.titleEn : note.title;

  return (
    <div className="flex-1 flex flex-col">
      <Navbar active="notes" />

      <main className="flex-1 w-full max-w-2xl mx-auto px-5 sm:px-6 pt-8">
        <Link href={localePath(lang, '/notes/')} className="inline-flex items-center gap-1.5 text-sm text-[#6B7280] hover:text-[#0E1116]">
          <ArrowLeft className="w-4 h-4" />
          {t.article.back}
        </Link>

        <header className="mt-8 mb-8">
          <time className="font-mono text-sm text-[#C2410C]" dateTime={note.date}>
            {note.date}
          </time>
          <h1 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight leading-tight text-[#0E1116]">{title}</h1>
        </header>

        <article className="text-[17px] leading-[1.8] text-[#2B303A]">{renderMarkdown(body)}</article>

        <div className="mt-14 rounded-2xl border border-[#E6E8EC] bg-[#F5F6F8] p-6 text-center">
          <p className="text-[#2B303A]">{t.article.cta}</p>
          <a
            href={`https://twitter.com/intent/follow?screen_name=${X_HANDLE}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#0E1116] hover:bg-[#2B303A] px-5 py-2.5 text-sm font-semibold text-white"
          >
            {t.nav.followX}
          </a>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
};
