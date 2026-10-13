import fs from 'node:fs';
import path from 'node:path';
import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NoteArticle } from '@/components/NoteArticle';
import { NOTES_DATA } from '@/data/notes';
import { pageMetadata } from '@/lib/site-meta';

// 文章页只有英文版。正文放在 content/notes/<id>.en.md，构建时读入。
// 2026-10-11 定：文章只有英文版，中文文章页下线，不要再加 <id>.zh.md。
const CONTENT_DIR = path.join(process.cwd(), 'content', 'notes');

function readBody(id: string) {
  const file = path.join(CONTENT_DIR, `${id}.en.md`);
  return fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : null;
}

export function noteStaticParams() {
  return NOTES_DATA.filter((n) => readBody(n.id)).map((n) => ({ slug: n.id }));
}

export function noteMetadata(slug: string): Metadata {
  const note = NOTES_DATA.find((n) => n.id === slug);
  if (!note) return {};
  return pageMetadata('en', `/notes/${note.id}/`, {
    title: note.title,
    description: note.summary,
    article: true,
    enOnly: true,
  });
}

export function renderNotePage(slug: string) {
  const note = NOTES_DATA.find((n) => n.id === slug);
  const body = note && readBody(note.id);
  if (!note || !body) notFound();
  return <NoteArticle note={note} body={body} />;
}
