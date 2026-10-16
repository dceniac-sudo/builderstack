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

// path 是不带语言前缀的路径，比如 '/' 或 '/oss/education/'
export function pageMetadata(
  lang: Language,
  path: string,
  override?: { title: string; description: string }
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
      type: 'website',
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
