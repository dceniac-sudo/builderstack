'use client';

import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { NoteItem } from '@/types/tool';
import { useI18n } from '@/lib/i18n';

interface NotesSectionProps {
  notes: NoteItem[];
}

export const NotesSection: React.FC<NotesSectionProps> = ({ notes }) => {
  const { lang, t } = useI18n();

  if (notes.length === 0) return null;

  return (
    <section id="notes" className="pb-12">
      <div className="mb-5 px-1">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-100">{t.notes.heading}</h2>
        <p className="text-sm text-zinc-500 mt-1">{t.notes.sub}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
        {notes.map((note) => {
          const links = [
            { href: note.xUrl, label: t.notes.readOnX },
            { href: note.repoUrl, label: t.notes.repo },
            { href: note.wechatUrl, label: t.notes.readWechat },
          ].filter((l) => l.href);

          return (
            <article
              key={note.id}
              id={`note-${note.id}`}
              className="flex flex-col rounded-2xl bg-zinc-950/80 border border-amber-500/15 p-6"
            >
              <time className="font-mono text-xs text-amber-400/90" dateTime={note.date}>
                {note.date}
              </time>
              <h3 className="mt-2 text-lg font-semibold leading-snug text-zinc-100">
                {lang === 'en' ? note.titleEn : note.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-zinc-300">
                {lang === 'en' ? note.summaryEn : note.summary}
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
