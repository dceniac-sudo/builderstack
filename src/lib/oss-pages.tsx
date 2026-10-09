import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { OssHome } from '@/components/OssHome';
import { OssIndustriesPage } from '@/components/OssIndustriesPage';
import { OssIndustryPage } from '@/components/OssIndustryPage';
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

export function renderOssHome(lang: Language) {
  return (
    <OssHome
      industries={OSS_INDUSTRIES.map((i) => industryView(i, lang))}
      projects={OSS_PROJECTS.map((p) => projectView(p, lang))}
    />
  );
}

export function renderOssIndustries(lang: Language) {
  return <OssIndustriesPage industries={OSS_INDUSTRIES.map((i) => industryView(i, lang))} />;
}

export function renderOssIndustry(lang: Language, industryId: string) {
  const copy = ossIndustry(industryId);
  const projects = copy ? ossProjectsOf(copy.id) : [];
  if (!copy || projects.length === 0) notFound();
  const en = lang === 'en';
  return (
    <OssIndustryPage
      label={en ? copy.labelEn : copy.label}
      title={en ? `${copy.titleEn}.` : `${copy.title}。`}
      tagline={en ? copy.taglineEn : copy.tagline}
      uses={OSS_USES[copy.id].map((u) => ({ id: u.id, label: en ? u.labelEn : u.label }))}
      projects={projects.map((p) => projectView(p, lang))}
    />
  );
}

export function renderOssProject(lang: Language, industryId: string, id: string) {
  const p = OSS_PROJECTS.find((x) => x.industry === industryId && x.id === id);
  if (!p) notFound();
  return <OssProjectPage project={projectView(p, lang)} />;
}
