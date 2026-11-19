import { buildRssXml } from '@/lib/rss';

export const dynamic = 'force-static';

export function GET() {
  return new Response(buildRssXml(), {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  });
}
