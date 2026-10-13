'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { SiteFooter } from '@/components/SiteFooter';
import { NoteItem } from '@/types/note';
import { useI18n, localePath } from '@/lib/i18n';
import { cn } from '@/lib/utils';

// “文章”页：一张表，一行一篇，新的在前。有站内正文的可以点进去读全文。
// 文章列表由页面传进来，这样没确认的草稿不会被打进浏览器端的脚本。
export function NotesHome({ notes }: { notes: NoteItem[] }) {
  const { lang, t } = useI18n();
  const row = 'flex items-center justify-between gap-4 px-[18px] py-4';

  return (
    <div className="flex-1 flex flex-col text-[15px] leading-[1.6]">
      <Navbar active="notes" />

      <main className="mx-auto w-full max-w-[860px] flex-1 px-5 pt-10 sm:px-10 sm:pt-16">
        <h1 className="rise text-[clamp(28px,4.2vw,44px)] font-semibold leading-[1.16] tracking-[-0.02em]">{t.notes.heading}</h1>
        <p className="rise mt-3 text-[var(--sub)]" style={{ animationDelay: '70ms' }}>
          {t.notes.sub}
        </p>

        <div className="mt-8 rounded-[14px] border border-[var(--line)] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)] [overflow:clip]">
          {notes.map((note, i) => {
            const body = (
              <>
                <span className="min-w-0">
                  <time className="block text-[12.5px] tabular-nums text-[var(--sub)]" dateTime={note.date}>
                    {note.date}
                  </time>
                  <span className="mt-0.5 block text-[16px] font-semibold leading-[1.4]">{note.title}</span>
                  <span className="mt-1 block text-[14px] text-[var(--sub)]">{note.summary}</span>
                </span>
                {note.hasPage && <ChevronRight aria-hidden="true" className="h-4 w-4 shrink-0 text-[var(--sub)]" />}
              </>
            );
            return (
              <div key={note.id} className={cn('rise', i > 0 && 'border-t border-[var(--line)]')} style={{ animationDelay: `${140 + i * 40}ms` }}>
                {note.hasPage ? (
                  <Link href={localePath(lang, `/notes/${note.id}/`)} className={cn(row, 'transition-colors hover:bg-[var(--wash)]')}>
                    {body}
                  </Link>
                ) : (
                  <div className={row}>{body}</div>
                )}
              </div>
            );
          })}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
