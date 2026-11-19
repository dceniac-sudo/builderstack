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
import type { GuideArticleView } from '@/types/guide';

const CALCULATOR_PAGES: { slug: string; title: string; summary: string; controls: string }[] = [
  {
    slug: 'chatwoot',
    title: 'Chatwoot Self-Hosted vs Cloud Seat Cost Calculator',
    summary:
      'Compare Chatwoot Community Edition (MIT) vs self-hosted Premium/Enterprise seat fees and Chatwoot Cloud tiers, plus Postgres/Sidekiq RAM sizing.',
    controls: 'inputs for support agents (1–500) and conversations/month; channel-mode and paid-feature toggles; 3 presets',
  },
  {
    slug: 'jupyterhub',
    title: 'JupyterHub Classroom RAM, CPU & Cloud Cost Calculator',
    summary:
      'Estimate concurrent student notebook memory, CPU cores, and monthly VM costs for The Littlest JupyterHub (TLJH) vs Zero to JupyterHub (Z2JH).',
    controls: 'inputs for students (1–2,000) and RAM per student; homework vs live-lab usage toggle; 3 presets',
  },
  {
    slug: 'livekit',
    title: 'LiveKit WebRTC SFU Outbound Bandwidth & Egress Calculator',
    summary:
      'Calculate N*(N-1) WebRTC video egress bandwidth (Mbps), monthly traffic transfer, and headless Chrome Egress recording CPU requirements.',
    controls: 'inputs for people per room, rooms, hours/month and recorded rooms; meeting vs webinar and 1080p/720p/audio toggles; 3 presets',
  },
];

const PAYWALL_GUIDE_SLUG = 'open-core-paywall-matrix-2026';

/** Keeps whole sentences up to `max` characters; hard-cuts on a word boundary only when the first sentence is longer. */
function tighten(text: string | undefined, max: number): string {
  if (!text) return '';
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  const sentences = clean.split(/(?<=[.!?])\s+(?=[A-Z0-9$€"“(])/);
  let out = '';
  for (const s of sentences) {
    const next = out ? `${out} ${s}` : s;
    if (next.length > max) break;
    out = next;
  }
  if (out) return out;
  const cut = clean.slice(0, max);
  return `${cut.slice(0, Math.max(cut.lastIndexOf(' '), max - 20)).replace(/[,;:\s]+$/, '')}…`;
}

/** Markdown table cell: no pipes or line breaks. */
function cell(text: string): string {
  return text.replace(/\|/g, '/').replace(/\s+/g, ' ').trim();
}

function row(cells: string[]): string {
  return `| ${cells.map(cell).join(' | ')} |`;
}

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
    `- [Head-to-Head Comparisons & TCO Calculators](${SITE_URL}/oss/vs/): Interactive TCO calculators, primary-source audit matrices, and license comparisons across ${vsPairs.length} open-source vs SaaS pairs.`,
    `- [RSS Feed](${SITE_URL}/rss.xml): Subscribe to new benchmark reports, license audits, and TCO updates.`,
    `- [Full Primary-Source Reference](${SITE_URL}/llms-full.txt): Compact citation-ready dataset: flagship paywall matrix and n8n telemetry tables, ${vsPairs.length} TCO snapshots, and ${OSS_PROJECTS.length} project audit dossiers with primary source URLs.`,
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
    'All calculators run client-side in the page; every estimate can be copied as plain text and cites the pricing page it was computed from.',
    '',
    ...CALCULATOR_PAGES.map(
      (c) => `- [${c.title}](${SITE_URL}/oss/${c.slug}/#calculator): ${c.summary} Controls: ${c.controls}.`
    ),
    ...vsPairs.map((v) => {
      const full = ossVsComparison(v.slug, 'en');
      if (!full) return `- [${v.title} TCO Calculator](${SITE_URL}${v.href}#tco-section)`;
      const c = full.calc;
      return `- [${v.title} TCO Calculator](${SITE_URL}${v.href}#tco-section): slider "${c.sliderLabel}" (${c.min}–${c.max}); toggles: ${c.toggles.map((tg) => tg.label).join(', ')}; ${c.presets.length} presets.`;
    }),
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

function guideBlock(full: GuideArticleView): string[] {
  const out: string[] = [
    `### ${full.title} — ${SITE_URL}${full.href}`,
    `- **Doc ID**: ${full.docId} · **Updated**: ${full.updatedAt} · **Basis**: ${full.auditBasis} · **Sample**: ${full.sampleLabel}`,
    '',
    '**Verdicts**',
    '',
    ...full.verdictCards.map(
      (v) => `- **${v.metricPrimary}${v.metricSub ? ' ' + v.metricSub : ''} — ${v.title}**: ${v.body}`
    ),
    '',
  ];

  // Hands-on guides: surface the measured telemetry bullets verbatim (these are the primary data).
  if (full.auditBasis === 'hands-on') {
    const bench = full.proseSections[0];
    if (bench?.bullets?.length) {
      out.push(`**Measured telemetry (${bench.heading})**`, '');
      if (bench.intro) out.push(tighten(bench.intro, 240), '');
      for (const b of bench.bullets) out.push(`- **${b.lead}**: ${b.text}`);
      if (bench.callout) out.push(`- **${bench.callout.title}**: ${tighten(bench.callout.body, 260)}`);
      out.push('');
    }
  }

  const m = full.matrixSection;
  if (m) {
    const isPaywall = full.slug === PAYWALL_GUIDE_SLUG;
    out.push(`**${m.heading}** (${m.rows.length} rows; ${m.legendNote})`, '');
    out.push(
      isPaywall
        ? row(['Tool', 'License', 'Locked in ee/', 'Min Stack', 'Self-Hosted Paid Floor', 'Source'])
        : row([...m.columns.slice(0, 5), 'Source'])
    );
    out.push(row(['---', '---', '---', '---', '---', '---']));
    for (const r of m.rows) {
      out.push(
        isPaywall
          ? row([
              r.projectName,
              `${r.licenseTitle} (${r.licenseNote})`,
              r.lockedSummary,
              r.minStackTitle,
              `${r.paidFloorTitle} (${r.paidFloorNote})`,
              r.sourceUrl,
            ])
          : row([
              `${r.projectName} (${r.category})`,
              `${r.licenseTitle}: ${r.licenseNote}`,
              r.lockedSummary,
              `${r.minStackTitle} (${r.minStackNote})`,
              `${r.paidFloorTitle} (${r.paidFloorNote})`,
              r.sourceUrl,
            ])
      );
    }
    out.push('');
  }

  const tco = full.tcoSection;
  if (tco) {
    out.push(`**TCO breakdown: ${tco.heading}**`, '', tighten(tco.summary, 320), '');
    out.push(row(tco.tableColumns), row(['---', '---', '---', '---']));
    for (const r of tco.tableRows) out.push(row([r.component, r.col1, r.col2, r.col3]));
    out.push('');
    const calcLinks = [
      ...(full.relatedVsSlugs.includes('n8n-vs-activepieces') && full.auditBasis === 'hands-on'
        ? [`n8n vs Activepieces team/SSO/VPS TCO calculator: ${SITE_URL}/oss/vs/n8n-vs-activepieces/#tco-section`]
        : []),
      ...tco.quickLinks
        .filter((l) => l.href.startsWith('/oss/vs/'))
        .map((l) => `${l.label}: ${SITE_URL}${l.href}#tco-section`),
    ];
    const uniqueLinks = Array.from(new Set(calcLinks));
    if (uniqueLinks.length > 0) out.push(`- **Interactive calculators**: ${uniqueLinks.join(' | ')}`);
    out.push('');
  }

  return out;
}

export function buildLlmsFullTxt(): string {
  const vsPairs = ossVsSummaries('en');
  const guides = guideSummaries('en');
  const latestChecked = OSS_PROJECTS.map((p) => p.checkedAt).sort().pop() ?? '2026-11-19';

  const lines: string[] = [
    '# BuilderStack (dceniac.com) — Primary-Source Licensing, Sizing & TCO Reference',
    '',
    `> Auto-generated from BuilderStack's confirmed primary-source dataset (${OSS_PROJECTS.length} audited projects, ${vsPairs.length} head-to-head TCO comparisons, ${guides.length} benchmark guides; latest check: ${latestChecked}). Compact by design: each entry keeps the verdict, the numbers, and the primary source URLs; full narrative lives on the linked page. Verification standard and commercial firewall: ${SITE_URL}/about/ · RSS: ${SITE_URL}/rss.xml`,
    '',
    '## Part 0: Flagship Benchmark Guides (Primary-Source Tables)',
    '',
  ];

  for (const gs of guides) {
    const full = guideArticle(gs.slug, 'en');
    if (!full) continue;
    lines.push(...guideBlock(full));
  }

  lines.push('---', '', `## Part 1: Head-to-Head Open-Source vs SaaS TCO Snapshots (${vsPairs.length})`, '');

  for (const summary of vsPairs) {
    const full = ossVsComparison(summary.slug, 'en');
    if (!full) continue;
    lines.push(`### ${full.title} — ${SITE_URL}${full.href}`);
    lines.push(`- **Checked**: ${full.checkedAt} · **Category**: ${full.categoryLabel} · **Repo**: ${full.starsBadge}`);
    lines.push(`- **Verdict**: ${full.winnerTag} — ${full.pricingHighlight}`);
    lines.push(`- **Trap — ${full.trap.title}**: ${tighten(full.trap.body, 400)} (Source: ${full.trap.citation.url})`);
    lines.push(`- **${full.left.name}**: ${full.left.winnerBadge} · ${full.left.pricePills.join(' | ')}`);
    lines.push(`- **${full.right.name}**: ${full.right.winnerBadge} · ${full.right.pricePills.join(' | ')}`);
    for (const r of full.matrix) {
      lines.push(`  - ${r.dimension}: ${full.left.name} = ${r.leftHeadline} | ${full.right.name} = ${r.rightHeadline}`);
    }
    lines.push(`- **Interactive team/SSO/VPS TCO Calculator**: ${SITE_URL}${full.href}#tco-section`);
    lines.push('');
  }

  lines.push('---', '', `## Part 2: Audited Open-Source Project Dossiers (${OSS_PROJECTS.length})`, '');

  for (const p of OSS_PROJECTS) {
    const name = p.nameEn ?? p.name;
    const useLabel = ossUse(p.use)?.labelEn ?? p.use;
    const priceAnswer = ossPriceAnswerEn(p.id);
    const sourceUrls = Array.from(
      new Set(
        [
          ...(p.facts.commercial.sources ?? []).map((s) => s.url),
          ...(p.facts.cost.sources ?? []).map((s) => s.url),
          ...(p.facts.deploy.sources ?? []).map((s) => s.url),
          ...(p.facts.caveats.sources ?? []).map((s) => s.url),
          p.repoUrl,
        ].filter(Boolean)
      )
    );
    const f = p.facts;

    lines.push(`### ${name} — ${SITE_URL}/oss/${p.id}/`);
    lines.push(`- ${useLabel} · Checked ${p.checkedAt} · ${p.handsOn ? 'Hands-on tested' : 'Primary-source audit'} · Repo: ${p.repoUrl}`);
    lines.push(priceAnswer ? `- **Price**: ${tighten(priceAnswer, 210)}` : `- **What**: ${tighten(p.whatEn, 160)}`);
    if (!priceAnswer && f.cost.detailEn) lines.push(`- **Cost & sizing**: ${tighten(f.cost.detailEn, 170)}`);
    lines.push(`- **Commercial use (${f.commercial.labelEn})**: ${tighten(f.commercial.detailEn ?? f.commercial.labelEn, 210)}`);
    lines.push(
      `- **Deploy**: ${f.deploy.labelEn} · **Cost**: ${f.cost.labelEn} · **Maintenance**: ${f.alive.labelEn} · **Caveat**: ${f.caveats.labelEn}`
    );
    lines.push(`- **Sources**: ${sourceUrls.slice(0, 3).join(' | ')}`);
    lines.push('');
  }

  lines.push(
    '---',
    '',
    '## Calculators & Watch',
    '',
    ...CALCULATOR_PAGES.map((c) => `- ${c.title}: ${SITE_URL}/oss/${c.slug}/#calculator`),
    `- All head-to-head TCO calculators: ${SITE_URL}/oss/vs/`,
    `- RSS Watch (new audits, license and pricing changes): ${SITE_URL}/rss.xml`,
    ''
  );

  return lines.join('\n');
}
