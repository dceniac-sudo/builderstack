import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NoteArticle } from '@/components/NoteArticle';
import { NOTES_DATA } from '@/data/notes';

// 正文放在 content/notes/<id>.en.md 和 <id>.zh.md，构建时读入，两种语言都打进同一个页面，
// 由页面右上角的语言切换决定显示哪一个。只有两份正文都在的笔记才会生成页面。
const CONTENT_DIR = path.join(process.cwd(), 'content', 'notes');

function readBody(id: string, lang: 'en' | 'zh') {
  const file = path.join(CONTENT_DIR, `${id}.${lang}.md`);
  return fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : null;
}

export function generateStaticParams() {
  return NOTES_DATA.filter((n) => readBody(n.id, 'en') && readBody(n.id, 'zh')).map((n) => ({ slug: n.id }));
}

export const dynamicParams = false;

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const note = NOTES_DATA.find((n) => n.id === params.slug);
  if (!note) return {};
  const title = `${note.titleEn} — BuilderStack`;
  return {
    title,
    description: note.summaryEn,
    openGraph: { title, description: note.summaryEn, type: 'article', url: `/notes/${note.id}/` },
    twitter: { card: 'summary_large_image', title, description: note.summaryEn },
  };
}

export default function NotePage({ params }: { params: { slug: string } }) {
  const note = NOTES_DATA.find((n) => n.id === params.slug);
  const bodyEn = note && readBody(note.id, 'en');
  const bodyZh = note && readBody(note.id, 'zh');
  if (!note || !bodyEn || !bodyZh) notFound();

  return <NoteArticle note={note} bodyEn={bodyEn} bodyZh={bodyZh} />;
}
