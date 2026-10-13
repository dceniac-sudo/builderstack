import type { MetadataRoute } from 'next';
import { NOTES_DATA } from '@/data/notes';
import { OSS_INDUSTRIES, OSS_PROJECTS, ossProjectsOf } from '@/data/oss';

export const dynamic = 'force-static';

const SITE = 'https://dceniac.com';

// 站点地图，构建时生成 /sitemap.xml，给搜索引擎看全站有哪些页面。
// 只列线上真有内容的页面：还没有项目的分类页不列，草稿不列。文章只有英文版。
export default function sitemap(): MetadataRoute.Sitemap {
  // 中英文都有的页面：两个地址各列一条，并互相标明是对方的另一种语言
  const both = (path: string, lastModified?: string): MetadataRoute.Sitemap =>
    ['', '/zh'].map((prefix) => ({
      url: `${SITE}${prefix}${path}`,
      lastModified,
      alternates: { languages: { en: `${SITE}${path}`, 'zh-CN': `${SITE}/zh${path}` } },
    }));

  return [
    ...both('/'),
    ...both('/oss/'),
    ...OSS_INDUSTRIES.filter((i) => ossProjectsOf(i.id).length > 0).flatMap((i) => both(`/oss/${i.id}/`)),
    ...OSS_PROJECTS.flatMap((p) => both(`/oss/${p.industry}/${p.id}/`, p.checkedAt)),
    { url: `${SITE}/notes/` },
    ...NOTES_DATA.filter((n) => n.hasPage).map((n) => ({ url: `${SITE}/notes/${n.id}/`, lastModified: n.date })),
  ];
}
