import type { Metadata } from 'next';
import type { Language } from '@/lib/i18n';

const SITE = 'https://dceniac.com';

const COPY = {
  en: {
    title: 'BuilderStack — What I use to build with AI agents, and what broke',
    description:
      'Notes from one indie developer. Every tool here is one I use, and every note is something I tried myself.',
    locale: 'en_US',
  },
  zh: {
    title: 'BuilderStack — 我用 AI Agent 干活时真正在用的东西，以及翻过的车',
    description: '一个独立开发者的笔记。这里的每个工具我都在用，每条笔记都是我亲手试过的。',
    locale: 'zh_CN',
  },
};

// path 是不带语言前缀的路径，比如 '/' 或 '/notes/xxx/'
export function pageMetadata(lang: Language, path: string, override?: { title: string; description: string }): Metadata {
  const copy = COPY[lang];
  const title = override ? `${override.title} — BuilderStack` : copy.title;
  const description = override?.description ?? copy.description;
  const url = (lang === 'zh' ? '/zh' : '') + path;

  return {
    metadataBase: new URL(SITE),
    title,
    description,
    keywords: ['AI coding agents', 'Claude Code', 'Codex', 'multi-agent workflows', 'solo builder'],
    authors: [{ name: 'dceniac', url: SITE }],
    creator: '@dceniac',
    alternates: {
      canonical: url,
      languages: { en: path, 'zh-CN': `/zh${path}` },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'BuilderStack',
      locale: copy.locale,
      type: override ? 'article' : 'website',
      images: [{ url: '/og.png', width: 1200, height: 630, alt: 'BuilderStack: what I use, and what I learned' }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: '@dceniac',
      images: ['/og.png'],
    },
  };
}
