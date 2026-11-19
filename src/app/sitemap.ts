import type { MetadataRoute } from 'next';
import { guideSummaries, guidesForProject } from '@/data/guides';
import { OSS_INDUSTRIES, OSS_PROJECTS, OSS_USES, ossProjectsOfIndustry, ossProjectsOfUse } from '@/data/oss';
import { ossVsPairForProject, ossVsSummaries } from '@/data/oss-vs';
import type { OssProject } from '@/types/oss';

export const dynamic = 'force-static';

const SITE = 'https://dceniac.com';

// /about/ is the only hand-written page without an underlying dataset date.
// Bump this when AboutPage.tsx (methodology, channels, disclosure) changes.
const ABOUT_UPDATED_AT = '2026-11-19';

function latest(dates: (string | undefined)[]): string | undefined {
  return dates.filter((d): d is string => Boolean(d)).sort().pop();
}

// 站点地图，构建时生成 /sitemap.xml，给搜索引擎看全站有哪些页面。
// 只列线上真有内容的页面：还没有项目的用途和行业不列，草稿不列。
// 只列英文页面（作者 2026-10-13 定）：站点做给英文读者，中文页面照常能打开，但不放进站点地图。
// lastModified 全部由数据推导（项目 checkedAt、对比页 checkedAt、指南 updatedAt），不再手写日期。
export default function sitemap(): MetadataRoute.Sitemap {
  const guides = guideSummaries('en');
  const vsPairs = ossVsSummaries('en');

  // A project page renders its own facts plus its linked comparison and related guides,
  // so its last meaningful change is the latest of those three dates.
  const projectUpdatedAt = (p: OssProject): string =>
    latest([
      p.checkedAt,
      ossVsPairForProject(p.id, 'en')?.checkedAt,
      ...guidesForProject(p.id, 'en').map((g) => g.updatedAt),
    ]) ?? p.checkedAt;

  const guidesUpdatedAt = latest(guides.map((g) => g.updatedAt));
  const vsUpdatedAt = latest(vsPairs.map((v) => v.checkedAt));
  const projectsUpdatedAt = latest(OSS_PROJECTS.map((p) => p.checkedAt));
  const siteUpdatedAt = latest([guidesUpdatedAt, vsUpdatedAt, projectsUpdatedAt]);

  const page = (path: string, lastModified: string | undefined) => ({
    url: `${SITE}${path}`,
    lastModified: lastModified ?? siteUpdatedAt,
  });

  return [
    page('/', siteUpdatedAt),
    page('/about/', ABOUT_UPDATED_AT),
    page('/guides/', guidesUpdatedAt),
    ...guides.map((g) => page(g.href, g.updatedAt)),
    page('/oss/', projectsUpdatedAt),
    page('/oss/vs/', vsUpdatedAt),
    ...vsPairs.map((v) => page(`/oss/vs/${v.slug}/`, v.checkedAt)),
    ...OSS_USES.filter((u) => ossProjectsOfUse(u.id).length > 0).map((u) =>
      page(
        `/oss/${u.id}/`,
        latest([
          ...ossProjectsOfUse(u.id).map((p) => p.checkedAt),
          ...vsPairs.filter((v) => v.categoryId === u.id).map((v) => v.checkedAt),
        ]),
      ),
    ),
    ...OSS_INDUSTRIES.filter((i) => ossProjectsOfIndustry(i.id).length > 0).map((i) =>
      page(`/for/${i.id}/`, latest(ossProjectsOfIndustry(i.id).map((p) => p.checkedAt))),
    ),
    ...OSS_PROJECTS.map((p) => page(`/oss/${p.id}/`, projectUpdatedAt(p))),
  ];
}
