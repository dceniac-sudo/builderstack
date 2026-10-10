import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { OssDirectory } from '@/components/OssDirectory';
import { OssIndustriesPage } from '@/components/OssIndustriesPage';
import { OssProjectPage } from '@/components/OssProjectPage';
import type { OssFactView, OssIndustryView, OssProjectView } from '@/components/OssParts';
import { IndustryCopy, OSS_INDUSTRIES, OSS_PROJECTS, OSS_USES, ossIndustry, ossProjectsOf } from '@/data/oss';
import { localePath, type Language } from '@/lib/i18n-path';
import { pageMetadata } from '@/lib/site-meta';
import type { OssFact, OssFactKey, OssProject } from '@/types/oss';

// 英文和中文的“按行业找开源项目”页面共用这里的逻辑：首页、行业列表、行业页、项目详情页。
// 数据里中英文各一份，这里按页面语言取出一份再交给页面，另一种语言的文字不进浏览器。

function factView(fact: OssFact, lang: Language): OssFactView {
  const en = lang === 'en';
  return {
    verdict: fact.verdict,
    label: en ? fact.labelEn : fact.label,
    short: en ? fact.shortEn : fact.short,
    detail: en ? fact.detailEn : fact.detail,
    sources: (fact.sources ?? []).map((s) => ({ label: en ? s.labelEn : s.label, url: s.url })),
  };
}

function projectView(p: OssProject, lang: Language): OssProjectView {
  const en = lang === 'en';
  const industry = ossIndustry(p.industry);
  const facts = {} as Record<OssFactKey, OssFactView>;
  (Object.keys(p.facts) as OssFactKey[]).forEach((key) => {
    facts[key] = factView(p.facts[key], lang);
  });
  return {
    id: p.id,
    name: en ? p.nameEn ?? p.name : p.name,
    logo: p.logo,
    what: en ? p.whatEn : p.what,
    industry: p.industry,
    industryLabel: industry ? (en ? industry.labelEn : industry.label) : p.industry,
    uses: p.uses,
    href: localePath(lang, `/oss/${p.industry}/${p.id}/`),
    repoUrl: p.repoUrl,
    homepage: p.homepage,
    facts,
    checkedAt: p.checkedAt,
    confirmed: p.confirmed,
  };
}

function industryView(i: IndustryCopy, lang: Language): OssIndustryView {
  const en = lang === 'en';
  const count = ossProjectsOf(i.id).length;
  return {
    id: i.id,
    label: en ? i.labelEn : i.label,
    description: en ? i.descriptionEn : i.description,
    count,
    href: count > 0 ? localePath(lang, `/oss/${i.id}/`) : undefined,
    uses: OSS_USES[i.id].map((u) => ({ id: u.id, label: en ? u.labelEn : u.label })),
  };
}

// ---------- 静态路径：只为有可显示项目的行业和项目生成页面 ----------

export function ossIndustryParams() {
  return OSS_INDUSTRIES.filter((i) => ossProjectsOf(i.id).length > 0).map((i) => ({ industry: i.id }));
}

export function ossProjectParams() {
  return OSS_PROJECTS.map((p) => ({ industry: p.industry, id: p.id }));
}

// ---------- 标题和简介 ----------

export function ossIndustriesMetadata(lang: Language): Metadata {
  return pageMetadata(
    lang,
    '/oss/',
    lang === 'en'
      ? { title: 'Open-source software by industry', description: 'Pick an industry to see open-source projects reviewed for commercial use, maintenance, deployment, cost and caveats.' }
      : { title: '按行业找开源项目：全部行业', description: '选一个行业，看这个行业里评估过的开源项目：能不能商用、还活不活着、部署难不难、成本多少、注意事项。' }
  );
}

export function ossIndustryMetadata(lang: Language, industryId: string): Metadata {
  const copy = ossIndustry(industryId);
  if (!copy) return {};
  return pageMetadata(lang, `/oss/${copy.id}/`, {
    title: lang === 'en' ? copy.titleEn : copy.title,
    description: lang === 'en' ? copy.descriptionEn : copy.description,
  });
}

export function ossProjectMetadata(lang: Language, industryId: string, id: string): Metadata {
  const p = OSS_PROJECTS.find((x) => x.industry === industryId && x.id === id);
  if (!p) return {};
  const en = lang === 'en';
  const name = en ? p.nameEn ?? p.name : p.name;
  return pageMetadata(lang, `/oss/${p.industry}/${p.id}/`, {
    title: en ? `${name}: commercial use, deployment and cost` : `${name}：能不能商用、部署难不难、成本多少`,
    description: en ? p.whatEn : p.what,
  });
}

// ---------- 页面 ----------

// 首页和行业页是同一个目录，只是打开时选中的行业和标题不同。项目始终传全部行业的，搜索时可以跨行业找。
function directory(lang: Language, industryId: string, title: string, sub: string, active?: 'industries') {
  return (
    <OssDirectory
      title={title}
      sub={sub}
      industries={OSS_INDUSTRIES.map((i) => industryView(i, lang))}
      projects={OSS_PROJECTS.map((p) => projectView(p, lang))}
      initialIndustry={industryId}
      active={active}
    />
  );
}

const HOME_COPY = {
  en: {
    title: 'Can you actually use that open-source software?',
    sub: 'Sorted by industry. Each project answers four things first: commercial use, maintenance, setup and cost.',
  },
  zh: {
    title: '开源的系统，能不能直接拿来用？',
    sub: '按行业整理，每个项目先告诉你四件事：让不让商用、有没有人维护、好不好装、要花多少钱。',
  },
};

export function renderOssHome(lang: Language) {
  // 默认选中第一个有项目的行业
  const first = OSS_INDUSTRIES.find((i) => ossProjectsOf(i.id).length > 0);
  if (!first) notFound();
  return directory(lang, first.id, HOME_COPY[lang].title, HOME_COPY[lang].sub);
}

export function renderOssIndustries(lang: Language) {
  return <OssIndustriesPage industries={OSS_INDUSTRIES.map((i) => industryView(i, lang))} />;
}

export function renderOssIndustry(lang: Language, industryId: string) {
  const copy = ossIndustry(industryId);
  if (!copy || ossProjectsOf(copy.id).length === 0) notFound();
  return directory(lang, copy.id, lang === 'en' ? copy.titleEn : copy.title, HOME_COPY[lang].sub, 'industries');
}

export function renderOssProject(lang: Language, industryId: string, id: string) {
  const p = OSS_PROJECTS.find((x) => x.industry === industryId && x.id === id);
  if (!p) notFound();
  return <OssProjectPage project={projectView(p, lang)} />;
}
