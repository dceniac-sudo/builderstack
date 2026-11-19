import { guideArticle, guideSummaries } from '@/data/guides';
import {
  OSS_INDUSTRIES,
  OSS_PROJECTS,
  OSS_USES,
  ossProjectsOfIndustry,
  ossProjectsOfUse,
  ossUse,
} from '@/data/oss';
import { ossPriceAnswerEn, ossSearchSummaryEn } from '@/data/oss-extras';
import { ossVsComparison, ossVsSummaries } from '@/data/oss-vs';
import { SITE_URL } from '@/lib/schema';

const CALCULATOR_PAGES: { slug: string; title: string; summary: string }[] = [
  {
    slug: 'chatwoot',
    title: 'Chatwoot Self-Hosted vs Cloud Seat Cost Calculator',
    summary:
      'Compare Chatwoot Community Edition (MIT) vs self-hosted Premium/Enterprise seat fees and Chatwoot Cloud tiers, plus Postgres/Sidekiq RAM sizing.',
  },
  {
    slug: 'jupyterhub',
    title: 'JupyterHub Classroom RAM, CPU & Cloud Cost Calculator',
    summary:
      'Estimate concurrent student notebook memory, CPU cores, and monthly VM costs for The Littlest JupyterHub (TLJH) vs Zero to JupyterHub (Z2JH).',
  },
  {
    slug: 'livekit',
    title: 'LiveKit WebRTC SFU Outbound Bandwidth & Egress Calculator',
    summary:
      'Calculate N*(N-1) WebRTC video egress bandwidth (Mbps), monthly traffic transfer, and headless Chrome Egress recording CPU requirements.',
  },
];

export function buildLlmsTxt(): string {
  const vsPairs = ossVsSummaries('en');
  const guides = guideSummaries('en');
  const activeUses = OSS_USES.filter((u) => ossProjectsOfUse(u.id).length > 0);
  const activeIndustries = OSS_INDUSTRIES.filter((i) => ossProjectsOfIndustry(i.id).length > 0);
  const latestChecked = OSS_PROJECTS.map((p) => p.checkedAt).sort().pop() ?? '2026-11-19';

  const lines: string[] = [
    '# BuilderStack (dceniac.com)',
    '',
    `> BuilderStack is an independent commercial evaluation publication covering ${OSS_PROJECTS.length} primary-source verified open-source business software projects, ${vsPairs.length} head-to-head self-hosted vs SaaS TCO comparison workbenches, and ${guides.length} long-form benchmark reports (latest audit: ${latestChecked}). Every review verifies five operational facts from repository LICENSE files, commit history, and official deployment/pricing docs: commercial license boundaries, maintenance status, server/RAM requirements, total cost of ownership vs SaaS pricing, and production pitfalls.`,
    '',
    '## Core Hubs & Methodology',
    '',
    `- [BuilderStack Home](${SITE_URL}/): Open-source business software you can actually run in production, verified with primary license texts and server requirements.`,
    `- [Engineering Benchmark Guides](${SITE_URL}/guides/): Long-form primary-source open-core paywall matrices and hands-on self-hosting RAM benchmarks.`,
    `- [Verification Methodology, AI Boundary & Commercial Disclosure](${SITE_URL}/about/): Primary-source 5-check audit rules, human confirmation & AI boundary policy, affiliate firewall, and official entity channels.`,
    `- [All Open-Source Categories](${SITE_URL}/oss/): Browse ${OSS_PROJECTS.length} verified open-source projects by use case and industry.`,
    `- [Head-to-Head Comparisons & TCO Calculators](${SITE_URL}/oss/vs/): Interactive TCO calculators, 6-dimension primary-source audits, and license comparisons across ${vsPairs.length} open-source vs SaaS pairs.`,
    `- [RSS Feed](${SITE_URL}/rss.xml): Subscribe to new benchmark reports, license audits, and TCO updates.`,
    `- [Full Primary-Source Reference](${SITE_URL}/llms-full.txt): Complete structured licensing, RAM sizing, pricing, and source URL dataset for all ${OSS_PROJECTS.length} projects, ${vsPairs.length} comparisons, and ${guides.length} benchmark guides.`,
    '',
    '## Benchmark Guides & Paywall Matrices',
    '',
    ...guides.map(
      (g) => `- [${g.title}](${SITE_URL}${g.href}) (${g.docId} · ${g.sampleLabel} · Updated ${g.updatedAt}): ${g.subtitle}`
    ),
    '',
    '## Head-to-Head Open-Source vs SaaS Comparisons',
    '',
    ...vsPairs.map(
      (v) => `- [${v.title}](${SITE_URL}${v.href}): ${v.subtitle} (${v.pricingHighlight}; checked ${v.checkedAt}).`
    ),
    '',
    '## Interactive Self-Hosting Cost & Sizing Calculators',
    '',
    ...CALCULATOR_PAGES.map(
      (c) => `- [${c.title}](${SITE_URL}/oss/${c.slug}/#calculator): ${c.summary}`
    ),
    `- [All Head-to-Head TCO Calculators](${SITE_URL}/oss/vs/): Interactive sliders and toggles for ${vsPairs.map((v) => v.title).join(', ')}.`,
    '',
    `## Audited Open-Source Projects (${OSS_PROJECTS.length})`,
    '',
    ...OSS_PROJECTS.map((p) => {
      const name = p.nameEn ?? p.name;
      const useLabel = ossUse(p.use)?.labelEn ?? p.use;
      const summary = ossSearchSummaryEn(p.id) ?? p.whatEn;
      return `- [${name}](${SITE_URL}/oss/${p.id}/) (${useLabel} · Checked ${p.checkedAt}): ${summary}`;
    }),
    '',
    '## Category & Industry Views',
    '',
    ...activeUses.map((u) => {
      const names = ossProjectsOfUse(u.id)
        .map((p) => p.nameEn ?? p.name)
        .join(', ');
      return `- [${u.labelEn}](${SITE_URL}/oss/${u.id}/): ${u.descriptionEn} Audited projects: ${names}.`;
    }),
    ...activeIndustries.map((i) => {
      const names = ossProjectsOfIndustry(i.id)
        .map((p) => p.nameEn ?? p.name)
        .join(', ');
      return `- [${i.labelEn} Open-Source Stack](${SITE_URL}/for/${i.id}/): ${i.descriptionEn} Audited projects: ${names}.`;
    }),
    '',
  ];

  return lines.join('\n');
}

export function buildLlmsFullTxt(): string {
  const vsPairs = ossVsSummaries('en');
  const guides = guideSummaries('en');
  const latestChecked = OSS_PROJECTS.map((p) => p.checkedAt).sort().pop() ?? '2026-11-19';

  const lines: string[] = [
    '# BuilderStack (dceniac.com) — Full Primary-Source Technical & Commercial Licensing Reference',
    '',
    `> Auto-generated directly from BuilderStack's confirmed primary-source dataset (${OSS_PROJECTS.length} audited projects, ${vsPairs.length} head-to-head TCO comparisons, ${guides.length} benchmark guides; latest check: ${latestChecked}). Verification standard and commercial firewall: ${SITE_URL}/about/`,
    '',
    '## Part 0: Flagship Benchmark Guides & Paywall Matrices',
    '',
  ];

  for (const gs of guides) {
    const full = guideArticle(gs.slug, 'en');
    if (!full) continue;
    lines.push(`### ${full.title} — ${SITE_URL}${full.href}`);
    lines.push(`- **Doc ID**: ${full.docId} · **Updated**: ${full.updatedAt} · **Basis**: ${full.auditBasis}`);
    lines.push(`- **Summary**: ${full.subtitle}`);
    for (const v of full.verdictCards) {
      lines.push(`  - **${v.metricPrimary}${v.metricSub ? ' ' + v.metricSub : ''} (${v.title})**: ${v.body}`);
    }
    lines.push('');
  }

  lines.push('---', '', '## Part 1: Head-to-Head Open-Source vs SaaS Verdict Workbenches', '');

  for (const summary of vsPairs) {
    const full = ossVsComparison(summary.slug, 'en');
    if (!full) continue;
    lines.push(`### ${full.title} — ${SITE_URL}${full.href}`);
    lines.push(`- **Checked**: ${full.checkedAt} · **Category**: ${full.categoryLabel} · **Repo pulse**: ${full.starsBadge}`);
    lines.push(`- **Summary**: ${full.subtitle}`);
    lines.push(`- **Key Trap (${full.trap.title})**: ${full.trap.body} (Source: ${full.trap.citation.url})`);
    lines.push(`- **${full.left.name}**: ${full.left.winnerBadge} · Pricing: ${full.left.pricePills.join(' | ')}`);
    lines.push(`- **${full.right.name}**: ${full.right.winnerBadge} · Pricing: ${full.right.pricePills.join(' | ')}`);
    for (const row of full.matrix) {
      lines.push(
        `  - **${row.dimension}**: ${full.left.name} = ${row.leftHeadline} (${row.leftDetail}) | ${full.right.name} = ${row.rightHeadline} (${row.rightDetail})`
      );
    }
    lines.push('');
  }

  lines.push('---', '', `## Part 2: Audited Open-Source Projects (${OSS_PROJECTS.length})`, '');

  for (const p of OSS_PROJECTS) {
    const name = p.nameEn ?? p.name;
    const useLabel = ossUse(p.use)?.labelEn ?? p.use;
    const priceAnswer = ossPriceAnswerEn(p.id);
    const sourceUrls = Array.from(
      new Set(
        [
          p.repoUrl,
          ...(p.homepage ? [p.homepage] : []),
          ...(p.facts.commercial.sources ?? []).map((s) => s.url),
          ...(p.facts.deploy.sources ?? []).map((s) => s.url),
          ...(p.facts.cost.sources ?? []).map((s) => s.url),
          ...(p.facts.caveats.sources ?? []).map((s) => s.url),
        ].filter(Boolean)
      )
    );

    lines.push(`### ${name} — ${SITE_URL}/oss/${p.id}/`);
    lines.push(`- **Category**: ${useLabel} · **Last Checked**: ${p.checkedAt} · **Hands-On Tested**: ${p.handsOn ? 'Yes' : 'No (primary-source docs/repo audit)'}`);
    lines.push(`- **What it does**: ${p.whatEn}`);
    if (priceAnswer) {
      lines.push(`- **Direct Pricing Answer**: ${priceAnswer}`);
    }
    lines.push(`- **Commercial License (${p.facts.commercial.labelEn})**: ${p.facts.commercial.detailEn ?? p.facts.commercial.labelEn}`);
    lines.push(`- **Maintenance (${p.facts.alive.labelEn})**: ${p.facts.alive.detailEn ?? p.facts.alive.labelEn}`);
    lines.push(`- **Deployment & Sizing (${p.facts.deploy.labelEn})**: ${p.facts.deploy.detailEn ?? p.facts.deploy.labelEn}`);
    if (p.needs) {
      lines.push(`- **Additional Requirements**: ${p.needs.detailEn ?? p.needs.labelEn}`);
    }
    lines.push(`- **Cost (${p.facts.cost.labelEn})**: ${p.facts.cost.detailEn ?? p.facts.cost.labelEn}`);
    lines.push(`- **Caveats (${p.facts.caveats.labelEn})**: ${p.facts.caveats.detailEn ?? p.facts.caveats.labelEn}`);
    lines.push(`- **Primary Sources**: ${sourceUrls.slice(0, 6).join(' | ')}`);
    lines.push('');
  }

  return lines.join('\n');
}
