import fs from 'node:fs';
import path from 'node:path';
import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NoteArticle } from '@/components/NoteArticle';
import { NOTES_DATA } from '@/data/notes';
import type { Language } from '@/lib/i18n';
import { pageMetadata } from '@/lib/site-meta';

// 英文和中文的文章页共用这里的逻辑。正文放在 content/notes/<id>.en.md 和 <id>.zh.md，构建时读入。
// 只有两份正文都在的笔记才会生成页面，保证两种语言的地址一一对应。
const CONTENT_DIR = path.join(process.cwd(), 'content', 'notes');

function readBody(id: string, lang: Language) {
  const file = path.join(CONTENT_DIR, `${id}.${lang}.md`);
  return fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : null;
}

export function noteStaticParams() {
  return NOTES_DATA.filter((n) => readBody(n.id, 'en') && readBody(n.id, 'zh')).map((n) => ({ slug: n.id }));
}

export function noteMetadata(slug: string, lang: Language): Metadata {
  const note = NOTES_DATA.find((n) => n.id === slug);
  if (!note) return {};
  return pageMetadata(lang, `/notes/${note.id}/`, {
    title: lang === 'zh' ? note.title : note.titleEn,
    description: lang === 'zh' ? note.summary : note.summaryEn,
    article: true,
  });
}

export function renderNotePage(slug: string, lang: Language) {
  const note = NOTES_DATA.find((n) => n.id === slug);
  const body = note && readBody(note.id, lang);
  if (!note || !body) notFound();
  return <NoteArticle note={note} body={body} />;
}
