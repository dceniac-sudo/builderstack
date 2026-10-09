import type { Metadata } from 'next';
import type { Language } from '@/lib/i18n';

const SITE = 'https://dceniac.com';

// 首页现在是“按行业找开源项目”，站点默认的标题和简介跟着它走
const COPY = {
  en: {
    title: 'BuilderStack — Open-source software you can actually use, by industry',
    description:
      'For small-team owners and managers. Each project answers five questions: commercial use, maintenance, deployment, cost and caveats, with sources.',
    locale: 'en_US',
  },
  zh: {
    title: 'BuilderStack — 按行业找能拿来用的开源项目',
    description:
      '给小团队的老板和技术负责人。每个项目回答五件事：能不能商用、还活不活着、部署难不难、成本多少、注意事项，每条都带出处。',
    locale: 'zh_CN',
  },
};

// “笔记”页（旧首页的内容）的标题和简介
export const NOTES_COPY = {
  en: {
    title: 'Notes: what I use to build with AI agents, and what broke',
    description: 'Notes from one indie developer. Every tool here is one I use, and every note is something I tried myself.',
  },
  zh: {
    title: '笔记：我用 AI Agent 干活时真正在用的东西，以及翻过的车',
    description: '一个独立开发者的笔记。这里的每个工具我都在用，每条笔记都是我亲手试过的。',
  },
};

// path 是不带语言前缀的路径，比如 '/' 或 '/notes/xxx/'
export function pageMetadata(
  lang: Language,
  path: string,
  override?: { title: string; description: string; article?: boolean }
): Metadata {
  const copy = COPY[lang];
  const title = override ? `${override.title} — BuilderStack` : copy.title;
  const description = override?.description ?? copy.description;
  const url = (lang === 'zh' ? '/zh' : '') + path;

  return {
    metadataBase: new URL(SITE),
    title,
    description,
    keywords: ['open source', 'self-hosted', 'open source for small business', 'education software', '开源项目', '开源商用'],
    authors: [{ name: 'dceniac', url: SITE }],
    creator: '@dceniac',
    icons: { icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }] },
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
      type: override?.article ? 'article' : 'website',
      images: [{ url: '/og.png', width: 1200, height: 630, alt: 'BuilderStack' }],
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
