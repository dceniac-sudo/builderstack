import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { GuidesHubPage } from '@/components/GuidesHubPage';
import { GuideArticlePage } from '@/components/GuideArticlePage';
import { guideArticle, guideSlugs, guideSummaries } from '@/data/guides';
import type { Language } from '@/lib/i18n-path';
import { pageMetadata } from '@/lib/site-meta';

export function guideParams() {
  return guideSlugs().map((slug) => ({ slug }));
}

export function guidesHubMetadata(lang: Language): Metadata {
  return pageMetadata(
    lang,
    '/guides/',
    lang === 'en'
      ? {
          title: 'Open-Source & AI Engineering Benchmarks',
          description:
            'Primary-source open-core paywall matrices, hands-on self-hosting RAM benchmarks, and SaaS cost crossover reports.',
        }
      : {
          title: '开源商业与 AI 工具深度拆解报告',
          description: '一线核对开源商业工具的付费墙矩阵、自托管内存实测与 SaaS 替代成本拆解报告。',
        }
  );
}

export function guideArticleMetadata(lang: Language, slug: string): Metadata {
  const data = guideArticle(slug, lang);
  if (!data) return {};
  return pageMetadata(lang, `/guides/${data.slug}/`, {
    title: data.metaTitle,
    description: data.metaDescription,
  });
}

export function renderGuidesHub(lang: Language) {
  return <GuidesHubPage guides={guideSummaries(lang)} />;
}

export function renderGuideArticle(lang: Language, slug: string) {
  const data = guideArticle(slug, lang);
  if (!data) notFound();
  const peers = guideSummaries(lang).filter((p) => p.slug !== data.slug);
  return <GuideArticlePage guide={data} peers={peers} />;
}
