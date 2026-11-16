import React from 'react';
import type { Metadata } from 'next';
import { AboutPage } from '@/components/AboutPage';
import type { Language } from '@/lib/i18n-path';
import { pageMetadata } from '@/lib/site-meta';

export const ABOUT_META: Record<Language, { title: string; description: string }> = {
  en: {
    title: 'Verification Methodology & Commercial Disclosure',
    description:
      'How BuilderStack verifies open-source licenses, self-hosted RAM baselines, and SaaS seat pricing from primary sources, plus our AI boundary and affiliate firewall.',
  },
  zh: {
    title: '核验口径与商业披露说明',
    description:
      '说明 BuilderStack 如何依据许可证原文、提交记录与官方部署文档核验每个开源项目，以及 AI 辅助边界与官方返佣防火墙。',
  },
};

export function aboutMetadata(lang: Language): Metadata {
  return pageMetadata(lang, '/about/', ABOUT_META[lang]);
}

export function renderAboutPage(lang: Language) {
  const meta = ABOUT_META[lang];
  return <AboutPage pageTitle={`${meta.title} — BuilderStack`} pageDescription={meta.description} />;
}
