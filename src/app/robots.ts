import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

// 构建时生成 /robots.txt：允许抓取全站，并告诉搜索引擎站点地图在哪。
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://dceniac.com/sitemap.xml',
  };
}
