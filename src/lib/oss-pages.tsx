import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { OssDirectory } from '@/components/OssDirectory';
import { OssIndustriesPage } from '@/components/OssIndustriesPage';
import { OssProjectPage } from '@/components/OssProjectPage';
import type { OssCategoryView, OssFactView, OssProjectView } from '@/components/OssParts';
import {
  IndustryCopy,
  OSS_INDUSTRIES,
  OSS_PROJECTS,
  OSS_USES,
  UseCopy,
  ossIndustry,
  ossProject,
  ossProjectsOfIndustry,
  ossProjectsOfUse,
  ossUse,
} from '@/data/oss';
import { ossExtras, ossSearchSummaryEn, ossSearchTitleEn } from '@/data/oss-extras';
import { localePath, type Language } from '@/lib/i18n-path';
import { pageMetadata } from '@/lib/site-meta';
import type { OssFact, OssFactKey, OssProject } from '@/types/oss';

// 英文和中文的开源项目页面共用这里的逻辑：首页、分类列表、用途页、行业页、项目详情页。
// 地址（2026-10-16 起）：用途页和项目页在 /oss/<id>/，行业页在 /for/<行业>/。旧地址在 public/_redirects 里 301 到新地址。
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
  const use = ossUse(p.use);
  const facts = {} as Record<OssFactKey, OssFactView>;
  (Object.keys(p.facts) as OssFactKey[]).forEach((key) => {
    facts[key] = factView(p.facts[key], lang);
  });
  return {
    id: p.id,
    name: en ? p.nameEn ?? p.name : p.name,
    logo: p.logo,
    what: en ? p.whatEn : p.what,
    use: p.use,
    useLabel: use ? (en ? use.labelEn : use.label) : p.use,
    useHref: localePath(lang, `/oss/${p.use}/`),
    industries: p.industries.map((i) => i.id),
    scenarios: p.industries.flatMap((i) => {
      const text = en ? i.scenarioEn : i.scenario;
      const industry = ossIndustry(i.id);
      return text && industry ? [{ id: i.id, label: en ? industry.labelEn : industry.label, text }] : [];
    }),
    href: localePath(lang, `/oss/${p.id}/`),
    repoUrl: p.repoUrl,
    homepage: p.homepage,
    facts,
    needs: p.needs ? factView(p.needs, lang) : undefined,
    handsOn: !!p.handsOn,
    checkedAt: p.checkedAt,
    confirmed: p.confirmed,
  };
}

function useView(u: UseCopy, lang: Language): OssCategoryView {
  const en = lang === 'en';
  return {
    id: u.id,
    label: en ? u.labelEn : u.label,
    title: en ? u.titleEn : u.title,
    description: en ? u.descriptionEn : u.description,
    count: ossProjectsOfUse(u.id).length,
    href: localePath(lang, `/oss/${u.id}/`),
  };
}

function industryView(i: IndustryCopy, lang: Language): OssCategoryView {
  const en = lang === 'en';
  return {
    id: i.id,
    label: en ? i.labelEn : i.label,
    title: en ? i.titleEn : i.title,
    description: en ? i.descriptionEn : i.description,
    count: ossProjectsOfIndustry(i.id).length,
    href: localePath(lang, `/for/${i.id}/`),
  };
}

// ---------- 静态路径 ----------

// /oss/<id>/：有项目的用途页，加上每个可显示的项目页
export function ossSlugParams() {
  return [...OSS_USES.filter((u) => ossProjectsOfUse(u.id).length > 0).map((u) => ({ slug: u.id })), ...OSS_PROJECTS.map((p) => ({ slug: p.id }))];
}

// /for/<行业>/：有项目的行业
export function ossIndustryParams() {
  return OSS_INDUSTRIES.filter((i) => ossProjectsOfIndustry(i.id).length > 0).map((i) => ({ industry: i.id }));
}

// ---------- 标题和简介 ----------

export function ossIndustriesMetadata(lang: Language): Metadata {
  return pageMetadata(
    lang,
    '/oss/',
    lang === 'en'
      ? { title: 'Open-source software by need and by industry', description: 'Pick what you need solved, or your industry, to see open-source projects reviewed for commercial use, maintenance, deployment, cost and caveats.' }
      : { title: '开源项目：全部分类', description: '按要解决的事或者按行业，看评估过的开源项目：能不能商用、还活不活着、部署难不难、成本多少、注意事项。' }
  );
}

export function ossIndustryMetadata(lang: Language, industryId: string): Metadata {
  const copy = ossIndustry(industryId);
  if (!copy) return {};
  return pageMetadata(lang, `/for/${copy.id}/`, {
    title: lang === 'en' ? copy.titleEn : copy.title,
    description: lang === 'en' ? copy.descriptionEn : copy.description,
  });
}

export function ossSlugMetadata(lang: Language, slug: string): Metadata {
  const en = lang === 'en';
  const use = ossUse(slug);
  if (use) {
    return pageMetadata(lang, `/oss/${use.id}/`, {
      title: en ? use.titleEn : use.title,
      description: en ? use.descriptionEn : use.description,
    });
  }
  const p = ossProject(slug);
  if (!p) return {};
  const name = en ? p.nameEn ?? p.name : p.name;
  return pageMetadata(lang, `/oss/${p.id}/`, {
    title: en ? ossSearchTitleEn(p.id, name) : `${name}：能不能商用、部署难不难、成本多少`,
    description: en ? ossSearchSummaryEn(p.id) ?? p.whatEn : p.what,
  });
}

// ---------- 页面 ----------

const HOME_COPY = {
  en: {
    title: 'Can you actually use that open-source software?',
    sub: 'Sorted by what you need and by industry. Each project answers four things first: commercial use, maintenance, setup and cost.',
  },
  zh: {
    title: '开源的系统，能不能直接拿来用？',
    sub: '按要解决的事和行业整理，每个项目先告诉你四件事：让不让商用、有没有人维护、好不好装、要花多少钱。',
  },
};

// 首页、用途页和行业页是同一个目录，只是打开时选中的行业、用途和标题不同。项目始终传全部的，搜索时可以跨分类找。
function directory(lang: Language, industryId: string, useId: string, active?: 'industries') {
  return (
    <OssDirectory
      title={HOME_COPY[lang].title}
      homeHref={localePath(lang, '/')}
      sub={HOME_COPY[lang].sub}
      industries={OSS_INDUSTRIES.map((i) => industryView(i, lang))}
      uses={OSS_USES.map((u) => useView(u, lang))}
      projects={OSS_PROJECTS.map((p) => projectView(p, lang))}
      initialIndustry={industryId}
      initialUse={useId}
      active={active}
    />
  );
}

export function renderOssHome(lang: Language) {
  return directory(lang, 'all', 'all');
}

export function renderOssIndustries(lang: Language) {
  return (
    <OssIndustriesPage
      uses={OSS_USES.map((u) => useView(u, lang)).filter((u) => u.count > 0)}
      industries={OSS_INDUSTRIES.map((i) => industryView(i, lang)).filter((i) => i.count > 0)}
    />
  );
}

export function renderOssIndustry(lang: Language, industryId: string) {
  const copy = ossIndustry(industryId);
  if (!copy) notFound();
  return directory(lang, copy.id, 'all', 'industries');
}

// /oss/<id>/ 是用途页或者项目页
export function renderOssSlug(lang: Language, slug: string) {
  const use = ossUse(slug);
  if (use) return directory(lang, 'all', use.id, 'industries');
  return renderOssProject(lang, slug);
}

function renderOssProject(lang: Language, id: string) {
  const p = ossProject(id);
  if (!p) notFound();
  const en = lang === 'en';
  const { fit, shot } = ossExtras(p.id);
  // “别的选择”：同一个用途下的其他项目
  const alternatives = ossProjectsOfUse(p.use).filter((x) => x.id !== p.id);
  return (
    <OssProjectPage
      project={projectView(p, lang)}
      fit={fit && { considerIf: en ? fit.considerIfEn : fit.considerIf, lookElsewhereIf: en ? fit.lookElsewhereIfEn : fit.lookElsewhereIf, confirmed: fit.confirmed }}
      shot={
        shot && {
          src: shot.src,
          width: shot.width,
          height: shot.height,
          alt: en ? shot.altEn : shot.alt,
          caption: en ? shot.captionEn : shot.caption,
          sourceUrl: shot.sourceUrl,
          sourceLabel: en ? shot.sourceLabelEn : shot.sourceLabel,
          confirmed: shot.confirmed,
        }
      }
      alternatives={alternatives.map((x) => projectView(x, lang))}
    />
  );
}
