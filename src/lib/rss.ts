import { guideSummaries } from '@/data/guides';
import { OSS_PROJECTS } from '@/data/oss';
import { ossSearchSummaryEn } from '@/data/oss-extras';
import { ossVsSummaries } from '@/data/oss-vs';
import { SITE_URL } from '@/lib/schema';

function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function toRfc822(isoDate: string): string {
  const d = new Date(`${isoDate}T00:00:00Z`);
  return Number.isNaN(d.getTime()) ? new Date('2026-11-19T00:00:00Z').toUTCString() : d.toUTCString();
}

export function buildRssXml(): string {
  const guides = guideSummaries('en').map((g) => ({
    title: g.title,
    link: `${SITE_URL}${g.href}`,
    description: g.subtitle,
    date: g.updatedAt,
    category: 'Benchmark Guide',
  }));

  const vsItems = ossVsSummaries('en').map((v) => ({
    title: `${v.title} — Open-Source vs SaaS TCO Audit`,
    link: `${SITE_URL}${v.href}`,
    description: `${v.subtitle} (${v.pricingHighlight})`,
    date: v.checkedAt,
    category: 'Head-to-Head Comparison',
  }));

  const recentProjects = [...OSS_PROJECTS]
    .sort((a, b) => b.checkedAt.localeCompare(a.checkedAt))
    .slice(0, 12)
    .map((p) => ({
      title: `${p.nameEn ?? p.name} — Commercial License & Self-Hosting Audit`,
      link: `${SITE_URL}/oss/${p.id}/`,
      description: ossSearchSummaryEn(p.id) ?? p.whatEn,
      date: p.checkedAt,
      category: 'Project Audit',
    }));

  const items = [...guides, ...vsItems, ...recentProjects].sort((a, b) => b.date.localeCompare(a.date));
  const lastBuildDate = toRfc822(items[0]?.date ?? '2026-11-19');

  const itemsXml = items
    .map(
      (item) => `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${escapeXml(item.link)}</link>
      <guid isPermaLink="true">${escapeXml(item.link)}</guid>
      <pubDate>${toRfc822(item.date)}</pubDate>
      <category>${escapeXml(item.category)}</category>
      <description>${escapeXml(item.description)}</description>
    </item>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>BuilderStack — Open-Source License Audits &amp; SaaS TCO Benchmarks</title>
    <link>${SITE_URL}/</link>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    <description>Primary-source open-core paywall matrices, hands-on self-hosting RAM benchmarks, and SaaS pricing crossover audits.</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
${itemsXml}
  </channel>
</rss>
`;
}
