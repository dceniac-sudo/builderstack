import type { MetadataRoute } from 'next';
import { OSS_INDUSTRIES, OSS_PROJECTS, OSS_USES, ossProjectsOfIndustry, ossProjectsOfUse } from '@/data/oss';

export const dynamic = 'force-static';

const SITE = 'https://dceniac.com';

// 站点地图，构建时生成 /sitemap.xml，给搜索引擎看全站有哪些页面。
// 只列线上真有内容的页面：还没有项目的用途和行业不列，草稿不列。
// 只列英文页面（作者 2026-10-13 定）：站点做给英文读者，中文页面照常能打开，但不放进站点地图。
export default function sitemap(): MetadataRoute.Sitemap {
  const page = (path: string, lastModified?: string) => ({ url: `${SITE}${path}`, lastModified });

  return [
    page('/'),
    page('/oss/'),
    ...OSS_USES.filter((u) => ossProjectsOfUse(u.id).length > 0).map((u) => page(`/oss/${u.id}/`)),
    ...OSS_INDUSTRIES.filter((i) => ossProjectsOfIndustry(i.id).length > 0).map((i) => page(`/for/${i.id}/`)),
    ...OSS_PROJECTS.map((p) => page(`/oss/${p.id}/`, p.checkedAt)),
  ];
}
