import type { Language } from '@/lib/i18n-path';

export const SITE_URL = 'https://dceniac.com';
export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const PRINCIPLES_URL = `${SITE_URL}/about/`;

export interface OfficialChannel {
  platform: string;
  platformZh: string;
  roleEn: string;
  roleZh: string;
  url: string;
}

export const OFFICIAL_CHANNELS: OfficialChannel[] = [
  {
    platform: 'X (Twitter)',
    platformZh: 'X (Twitter)',
    roleEn: 'Editorial updates & corrections',
    roleZh: '编辑更新与纠错联络',
    url: 'https://x.com/dceniac',
  },
  {
    platform: 'DEV Community',
    platformZh: 'DEV Community',
    roleEn: 'Technical notes & breakdowns',
    roleZh: '实测部署笔记与许可拆解',
    url: 'https://dev.to/dceniac',
  },
  {
    platform: 'SaaSHub',
    platformZh: 'SaaSHub',
    roleEn: 'Verified directory profile',
    roleZh: '官方认证产品目录档案',
    url: 'https://www.saashub.com/builderstack-alternatives',
  },
  {
    platform: 'GitBook',
    platformZh: 'GitBook',
    roleEn: 'Public methodology & docs mirror',
    roleZh: '公开核验手册与文档镜像',
    url: 'https://builderstack.gitbook.io/builderstack-docs',
  },
  {
    platform: 'Hashnode',
    platformZh: 'Hashnode',
    roleEn: 'Engineering blog & release logs',
    roleZh: '工程对比专栏与成本实测',
    url: 'https://builderstack.hashnode.dev',
  },
  {
    platform: 'Substack',
    platformZh: 'Substack',
    roleEn: 'OSS & self-hosting dispatch',
    roleZh: '自托管与商业许可通讯',
    url: 'https://builderstackoss.substack.com',
  },
];

export const ORGANIZATION_NODE = {
  '@type': 'Organization',
  '@id': ORG_ID,
  name: 'BuilderStack',
  url: `${SITE_URL}/`,
  logo: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/og.png`,
    width: 1200,
    height: 630,
  },
  email: 'sponsor@dceniac.com',
  publishingPrinciples: PRINCIPLES_URL,
  sameAs: OFFICIAL_CHANNELS.map((c) => c.url),
};

export const WEBSITE_NODE = {
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  name: 'BuilderStack',
  url: `${SITE_URL}/`,
  publisher: { '@id': ORG_ID },
};

export function webPageNode({
  path,
  name,
  description,
  lang,
  dateModified,
  type = 'WebPage',
}: {
  path: string;
  name: string;
  description: string;
  lang: Language;
  dateModified?: string;
  type?: 'WebPage' | 'AboutPage';
}) {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const fullUrl = `${SITE_URL}${cleanPath}`;
  return {
    '@type': type,
    '@id': `${fullUrl}#webpage`,
    url: fullUrl,
    name,
    description,
    inLanguage: lang === 'zh' ? 'zh-CN' : 'en-US',
    ...(dateModified ? { dateModified } : {}),
    isPartOf: { '@id': WEBSITE_ID },
    publisher: { '@id': ORG_ID },
    publishingPrinciples: PRINCIPLES_URL,
  };
}
