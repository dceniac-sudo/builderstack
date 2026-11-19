import type { MetadataRoute } from 'next';
import { guideSummaries } from '@/data/guides';
import { OSS_INDUSTRIES, OSS_PROJECTS, OSS_USES, ossProjectsOfIndustry, ossProjectsOfUse } from '@/data/oss';
import { ossVsSummaries } from '@/data/oss-vs';

export const dynamic = 'force-static';

const SITE = 'https://dceniac.com';
const PROJECT_UPDATES: Record<string, string> = { chatwoot: '2026-11-09', n8n: '2026-11-19' };

// 站点地图，构建时生成 /sitemap.xml，给搜索引擎看全站有哪些页面。
// 只列线上真有内容的页面：还没有项目的用途和行业不列，草稿不列。
// 只列英文页面（作者 2026-10-13 定）：站点做给英文读者，中文页面照常能打开，但不放进站点地图。
export default function sitemap(): MetadataRoute.Sitemap {
  const page = (path: string, lastModified?: string) => ({ url: `${SITE}${path}`, lastModified });

  return [
    page('/'),
    page('/about/', '2026-11-16'),
    page('/guides/', '2026-11-19'),
    ...guideSummaries('en').map((g) => page(g.href, g.updatedAt)),
    page('/oss/'),
    page('/oss/vs/', '2026-11-15'),
    ...ossVsSummaries('en').map((v) => page(`/oss/vs/${v.slug}/`, v.checkedAt)),
    ...OSS_USES.filter((u) => ossProjectsOfUse(u.id).length > 0).map((u) => page(`/oss/${u.id}/`)),
    ...OSS_INDUSTRIES.filter((i) => ossProjectsOfIndustry(i.id).length > 0).map((i) => page(`/for/${i.id}/`)),
    ...OSS_PROJECTS.map((p) => page(`/oss/${p.id}/`, PROJECT_UPDATES[p.id] ?? p.checkedAt)),
  ];
}
