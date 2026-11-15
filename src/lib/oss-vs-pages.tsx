import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { OssVsHubPage } from '@/components/OssVsHubPage';
import { OssVsPage } from '@/components/OssVsPage';
import { ossVsComparison, ossVsSlugs, ossVsSummaries } from '@/data/oss-vs';
import type { Language } from '@/lib/i18n-path';
import { pageMetadata } from '@/lib/site-meta';

export function ossVsParams() {
  return ossVsSlugs().map((pair) => ({ pair }));
}

export function ossVsHubMetadata(lang: Language): Metadata {
  return pageMetadata(
    lang,
    '/oss/vs/',
    lang === 'en'
      ? {
          title: 'Open-Source vs SaaS Comparisons & TCO Calculators',
          description:
            'Primary-source comparisons of open-source software vs commercial SaaS: pricing tiers, license traps, RAM sizing, and seat calculators.',
        }
      : {
          title: '开源软件对比与成本试算',
          description: '一线核对开源软件与商业 SaaS 的许可证差异、自建门槛、坐席定价拐点与成本计算器。',
        }
  );
}

export function ossVsPairMetadata(lang: Language, pair: string): Metadata {
  const data = ossVsComparison(pair, lang);
  if (!data) return {};
  return pageMetadata(lang, `/oss/vs/${data.slug}/`, {
    title: data.metaTitle,
    description: data.metaDescription,
  });
}

export function renderOssVsHub(lang: Language) {
  return <OssVsHubPage pairs={ossVsSummaries(lang)} />;
}

export function renderOssVsPair(lang: Language, pair: string) {
  const data = ossVsComparison(pair, lang);
  if (!data) notFound();
  const peers = ossVsSummaries(lang).filter((p) => p.slug !== data.slug);
  return <OssVsPage data={data} peers={peers} />;
}
