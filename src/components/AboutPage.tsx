'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { SiteFooter } from '@/components/SiteFooter';
import { Dot, OssCta } from '@/components/OssParts';
import { FadeUp, ReadingProgressBar } from '@/components/motion/MotionPrimitives';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { localePath, SPONSOR_EMAIL, useI18n, X_HANDLE, type Language } from '@/lib/i18n';
import { OFFICIAL_CHANNELS, ORG_ID, ORGANIZATION_NODE, SITE_URL, webPageNode } from '@/lib/schema';
import type { OssVerdict } from '@/types/oss';
import { cn } from '@/lib/utils';

interface AboutPageProps {
  pageTitle: string;
  pageDescription: string;
}

interface ComparisonRow {
  dimension: string;
  generic: string;
  builderstack: string;
}

interface PrimaryCheck {
  code: string;
  dimensionKey: string;
  title: string;
  description: string;
}

interface VerdictRule {
  verdict: OssVerdict;
  label: string;
  meaning: string;
}

interface ProofExample {
  project: string;
  href: string;
  partnerStatus: string;
  verdict: OssVerdict;
  verdictLabel: string;
  publishedCaveat: string;
}

interface AboutCopy {
  crumb: string;
  kicker: string;
  h1: string;
  abstract: string;
  railMeta: { doc: string; updated: string; status: string };
  railNavTitle: string;
  quickCardTitle: string;
  sections: { id: string; nav: string; tag: string; heading: string }[];
  sec1Intro: string;
  sec1Cols: [string, string, string];
  sec1Rows: ComparisonRow[];
  sec2Intro: string;
  sec2Checks: PrimaryCheck[];
  sec3Intro: string;
  sec3Verdicts: VerdictRule[];
  sec3BoxTitle: string;
  sec3Rules: { label: string; text: string }[];
  sec4Intro: string;
  sec4FirewallTitle: string;
  sec4FirewallPoints: { label: string; text: string }[];
  sec4ProofTitle: string;
  sec4ProofCols: [string, string, string, string];
  sec4ProofRows: ProofExample[];
  sec5Intro: string;
  sec5ChannelsIntro: string;
  sec5Cols: [string, string, string];
}

const EN_COPY: AboutCopy = {
  crumb: 'Methodology & Disclosure',
  kicker: 'Technical Specification · Verification & Commercial Disclosure',
  h1: 'How BuilderStack Audits Software & Discloses Revenue',
  abstract:
    'BuilderStack (dceniac.com) is an independent open-source software audit directory operated under a strict primary-source specification. Every verdict across our 25 evaluated projects and 5 head-to-head TCO calculators is grounded in repository files and official docs—never vendor marketing copy—and commercial links remain isolated from editorial ratings.',
  railMeta: { doc: 'EDITORIAL-SPEC', updated: '2026-11-16', status: 'NORMATIVE' },
  railNavTitle: 'Specification',
  quickCardTitle: 'Entity Quick-Card',
  sections: [
    {
      id: 'sec-01',
      nav: '§01 Mandate',
      tag: '§01 / MANDATE',
      heading: 'Primary-Source Standard vs. Generic Directories',
    },
    {
      id: 'sec-02',
      nav: '§02 Five Primary Checks',
      tag: '§02 / VERIFICATION PROTOCOL',
      heading: 'Five Primary Checks Per Project',
    },
    {
      id: 'sec-03',
      nav: '§03 Verdict & AI Boundary',
      tag: '§03 / PROVENANCE & AI BOUNDARY',
      heading: 'Four-State Verdicts, Hands-On Proof & AI Boundary',
    },
    {
      id: 'sec-04',
      nav: '§04 Affiliate Firewall',
      tag: '§04 / COMMERCIAL FIREWALL',
      heading: 'Affiliate Disclosure & Published Independence Proof',
    },
    {
      id: 'sec-05',
      nav: '§05 Corrections & Entity',
      tag: '§05 / GOVERNANCE & ENTITY',
      heading: 'Corrections SLA & Official Verified Channels',
    },
  ],
  sec1Intro:
    'Small-team operators evaluating open-source business tools face hidden traps: source-available repos marketed as "free", multi-container RAM floors omitted from quickstarts, and SSO walls gated to Enterprise plans. The baseline below defines how BuilderStack differs from generic software directories.',
  sec1Cols: ['Audit Dimension', 'Generic Software Directories', 'BuilderStack Primary Audit'],
  sec1Rows: [
    {
      dimension: 'Source Material',
      generic: 'Vendor marketing blurbs, rewritten launch copy, and unverified user taglines.',
      builderstack: 'Raw repository LICENSE files, commit logs, Docker/Helm manifests, and official pricing tables.',
    },
    {
      dimension: 'Self-Host Costing',
      generic: 'Labels tools "Free / Open Source" without RAM minimums or backing-service overhead.',
      builderstack: 'Measures mandatory dependencies (PostgreSQL, Redis, Elasticsearch, S3, Tinybird) and production VM specs.',
    },
    {
      dimension: 'Enterprise Traps',
      generic: 'Omits SAML SSO, RBAC, audit logs, and SaaS-resale bans hidden in Community repos.',
      builderstack: 'Audits ee/ and enterprise/ trees, AGPL network triggers, and source-available embedding clauses.',
    },
    {
      dimension: 'AI & Affiliate Hygiene',
      generic: 'Publishes unverified AI summaries and blends paid placements into organic rankings.',
      builderstack: 'Human-verified facts (confirmed: true), zero invented figures, and mandatory rel="sponsored" tags.',
    },
  ],
  sec2Intro:
    'Every BuilderStack entry answers the same five operational questions in uniform order. Any claim without an inspectable primary upstream URL is omitted or marked Unverified.',
  sec2Checks: [
    {
      code: 'CHK-01',
      dimensionKey: 'commercial',
      title: 'Commercial License & ee/ Boundaries',
      description:
        'Inspect root LICENSE files and proprietary sub-directories (such as ee/ or enterprise/) to separate permissive cores (MIT, Apache-2.0, BSD-3-Clause) and copyleft (GPLv3, AGPLv3) from source-available terms (Elastic License 2.0, Sustainable Use License).',
    },
    {
      code: 'CHK-02',
      dimensionKey: 'alive',
      title: 'Commit Velocity & Maintainer Pulse',
      description:
        'Review recent git commits, release tags, and unresolved licensing or model-weight issues to verify whether maintenance is active, slowing, or stalled.',
    },
    {
      code: 'CHK-03',
      dimensionKey: 'deploy',
      title: 'Production RAM & Runtime Dependencies',
      description:
        'Extract minimum CPU, RAM, GPU VRAM, and required external services from official install guides—such as Appsmith requiring an 8 GB RAM Docker host or Zammad requiring 6 GB RAM plus 4 GB for Elasticsearch.',
    },
    {
      code: 'CHK-04',
      dimensionKey: 'cost',
      title: 'Multi-Year TCO vs. SaaS Seat Math',
      description:
        'Reconcile real VM hosting overhead and per-seat self-hosted Enterprise unlocks (SSO, RBAC, branding removal) against official managed Cloud and SaaS pricing tables.',
    },
    {
      code: 'CHK-05',
      dimensionKey: 'caveats',
      title: 'Operational Caveats & Lock-In Traps',
      description:
        'Surface production edge cases before deployment: AGPLv3 network source-sharing obligations, mandatory attribution footers, UDP port ranges, or personal-use repo restrictions like cal.diy.',
    },
  ],
  sec3Intro:
    'Every audit row uses a deterministic four-state verdict scale paired with explicit provenance rules answering Google’s Who, How, and Why quality framework.',
  sec3Verdicts: [
    {
      verdict: 'good',
      label: 'Clear / Low friction',
      meaning: 'Verified against primary docs or runtime testing with permissive terms, active maintenance, or low operational cost.',
    },
    {
      verdict: 'caution',
      label: 'Conditions / Moderate',
      meaning: 'Usable commercially with documented caveats: AGPL/source-available limits, 4–8 GB+ RAM stacks, or paid team tiers.',
    },
    {
      verdict: 'bad',
      label: 'Paid / High bar',
      meaning: 'Requires a commercial license, demands heavy dedicated hardware (e.g., 16 GB+ RAM or GPU), or shows stalled upstream commits.',
    },
    {
      verdict: 'pending',
      label: 'Unverified',
      meaning: 'Upstream documentation is missing or ambiguous at audit time; BuilderStack leaves the field marked Unverified rather than guessing.',
    },
  ],
  sec3BoxTitle: 'Who / How / Why Governance & AI Boundary',
  sec3Rules: [
    {
      label: 'Who (Publication Entity)',
      text: 'Operated independently as the BuilderStack publication entity (dceniac.com), directly reachable for corrections or sponsorship inquiries at sponsor@dceniac.com and X @dceniac.',
    },
    {
      label: 'How — Hands-On Runs ("Tried by the author")',
      text: 'Displayed strictly on projects that BuilderStack personally deployed and exercised end-to-end. Entries verified solely through repository code and official docs do not carry this badge.',
    },
    {
      label: 'How — AI Assistance & Human Confirmation Boundary',
      text: 'AI tools are restricted strictly to layout formatting and bilingual copy translation—never as a source of facts, hardware metrics, or pricing numbers. Every license clause, RAM baseline, price tier, and verdict dot requires manual primary-source verification (confirmed: true) before shipping; unverified items remain Unverified.',
    },
    {
      label: 'Why & Dated Freshness ("Last checked: YYYY-MM-DD")',
      text: 'Built to prevent small teams from adopting incompatible licenses or under-sizing production servers. Each project and comparison displays an ISO-8601 check date; records older than 180 days are queued for re-verification.',
    },
  ],
  sec4Intro:
    'BuilderStack keeps all technical evaluations and cost calculators free without intrusive tracking ads. Revenue comes exclusively from two transparent channels walled off from editorial ratings.',
  sec4FirewallTitle: 'Active Revenue Channels & Editorial Firewall',
  sec4FirewallPoints: [
    {
      label: 'Managed-Cloud Affiliate Partnerships',
      text: 'Outbound referral links to official managed Cloud plans—such as n8n Cloud and Chatwoot Cloud—may earn an affiliate commission. Every commercial referral link explicitly carries rel="sponsored" in HTML.',
    },
    {
      label: 'Direct Commercial Sponsorships',
      text: 'Sponsorship placements are booked exclusively via sponsor@dceniac.com, clearly labeled as sponsored, and separated from five-point audit cards and TCO math.',
    },
    {
      label: 'Non-Negotiable Firewall',
      text: 'No vendor, sponsor, or affiliate partner can purchase inclusion, buy a green verdict dot, suppress an ee/ restriction, or alter server RAM minimums and pricing calculators.',
    },
  ],
  sec4ProofTitle: 'Published Proof of Independence (Live On-Site Examples)',
  sec4ProofCols: ['Project', 'Commercial Relationship', 'Published Verdict', 'Documented Caveats Kept Live'],
  sec4ProofRows: [
    {
      project: 'n8n',
      href: '/oss/n8n/',
      partnerStatus: 'Official Cloud affiliate (30% commission)',
      verdict: 'caution',
      verdictLabel: 'Caution',
      publishedCaveat:
        'Flags Sustainable Use License limits prohibiting multi-tenant SaaS embedding or external user credentials without a commercial license, plus €667/mo Business tier jumps.',
    },
    {
      project: 'Chatwoot',
      href: '/oss/chatwoot/',
      partnerStatus: 'Official Cloud affiliate (20% commission)',
      verdict: 'caution',
      verdictLabel: 'Caution',
      publishedCaveat:
        'Highlights the proprietary enterprise/ directory boundary, $19–$99/agent self-hosted Enterprise tiers, and 4 GB RAM Sidekiq + Postgres minimum.',
    },
    {
      project: 'Cal.com',
      href: '/oss/cal-com/',
      partnerStatus: 'No paid relationship',
      verdict: 'caution',
      verdictLabel: 'Caution',
      publishedCaveat:
        'Documents that the public MIT cal.diy repository is flagged for personal non-production use only and omits Teams scheduling and SAML SSO.',
    },
  ],
  sec5Intro:
    'Licenses, hardware minimums, and SaaS tiers shift regularly. If you spot a stale price, changed LICENSE clause, or broken source link, email sponsor@dceniac.com or message @dceniac on X with the primary upstream URL. Verified corrections are applied within 48 hours alongside an updated Last checked date.',
  sec5ChannelsIntro:
    'To prevent impersonation, only the six public profiles listed below belong to the BuilderStack publication entity:',
  sec5Cols: ['Platform', 'Role', 'Verified Official URL'],
};

const ZH_COPY: AboutCopy = {
  crumb: '核验口径与商业披露',
  kicker: '技术编辑规范 · 一手核验口径与商业披露',
  h1: 'BuilderStack 如何核验开源软件与披露商业关系',
  abstract:
    'BuilderStack（dceniac.com）是由独立工程编辑实体维护的开源商业软件核验目录。全站 25 个已核验项目与 5 组 SaaS 成本裁决台均直接对照仓库许可证原文、提交记录与官方部署文档撰写——拒绝搬运厂商宣传页，并将联盟返佣与内容裁决物理隔离。',
  railMeta: { doc: 'EDITORIAL-SPEC', updated: '2026-11-16', status: '现行规范' },
  railNavTitle: '规范目录',
  quickCardTitle: '发布主体联络',
  sections: [
    {
      id: 'sec-01',
      nav: '§01 核验定位',
      tag: '§01 / 核验定位',
      heading: '一手仓库核验标准对比普通软件目录',
    },
    {
      id: 'sec-02',
      nav: '§02 五项核查协议',
      tag: '§02 / 核验协议',
      heading: '每个项目的五项一手核查',
    },
    {
      id: 'sec-03',
      nav: '§03 裁决与 AI 边界',
      tag: '§03 / 实测溯源与 AI 边界',
      heading: '四态裁决、实测徽标与 AI 辅助边界',
    },
    {
      id: 'sec-04',
      nav: '§04 返佣防火墙与实证',
      tag: '§04 / 商业利益防火墙',
      heading: '官方返佣披露与站内独立实证',
    },
    {
      id: 'sec-05',
      nav: '§05 纠错与官方阵地',
      tag: '§05 / 纠错与认证实体',
      heading: '48 小时纠错机制与官方认证渠道',
    },
  ],
  sec1Intro:
    '小团队在选用开源系统时常踩中隐形坑：标榜免费开源却在企业目录闭源、快速开始不提内存底线、或把团队与单点登录锁进高价企业版。下表界定了本站与普通软件榜单的核心差异。',
  sec1Cols: ['评估维度', '普通软件目录 / 榜单', 'BuilderStack 一手核验'],
  sec1Rows: [
    {
      dimension: '参考信源',
      generic: '复述厂商官网宣传语、新闻通稿与未核实的社区口碑。',
      builderstack: '逐条核对仓库 LICENSE 原文、提交记录、Docker/Helm 配置与官方标价表。',
    },
    {
      dimension: '自建硬件算账',
      generic: '只写“开源免费”，忽略运行内存底线与外部依赖组件开销。',
      builderstack: '明确列出必需依赖（Postgres / Redis / Elasticsearch / S3 / Tinybird）与最小机器规格。',
    },
    {
      dimension: '企业版门槛',
      generic: '回避社区版缺失 SAML SSO、权限分级或禁止转售为 SaaS 的限制。',
      builderstack: '逐项拆解 ee/、enterprise/ 专有目录、AGPL 传染范围与源码可用许可条款。',
    },
    {
      dimension: 'AI 与返佣透明',
      generic: '直接由 AI 批量生成评测套话，或将付费推荐混入自然排序。',
      builderstack: '强制人工核对一手链接（confirmed: true）、严禁 AI 编数，返佣外链均标 rel="sponsored"。',
    },
  ],
  sec2Intro:
    '全站所有项目与对比工作台均按统一顺序回答以下五个工程问题；找不到一手官方出处的条目一律不予编造。',
  sec2Checks: [
    {
      code: 'CHK-01',
      dimensionKey: 'commercial',
      title: '商用许可证与 ee/ 专有目录边界',
      description:
        '逐字检查仓库根目录 LICENSE 及 enterprise/、ee/ 等子目录声明，区分宽松许可（MIT / Apache-2.0 / BSD-3-Clause）、传染型许可（GPLv3 / AGPLv3）与限制型源码可用协议（ELv2 / Sustainable Use License）。',
    },
    {
      code: 'CHK-02',
      dimensionKey: 'alive',
      title: '仓库提交活跃度与维护状态',
      description:
        '核对最近提交日期、版本发布频率及开放中的许可争议 Issue（例如 AI 模型权重的多重授权未决事项），判断项目处于活跃维护、放缓还是停更状态。',
    },
    {
      code: 'CHK-03',
      dimensionKey: 'deploy',
      title: '生产部署最小硬件与外部依赖',
      description:
        '从官方生产部署文档提取最低 CPU、内存、GPU 显存与外部服务需求——例如 Appsmith 要求 8 GB 内存服务器、Zammad 要求 6 GB 内存另加 4 GB Elasticsearch 内存。',
    },
    {
      code: 'CHK-04',
      dimensionKey: 'cost',
      title: '自建总成本对比 SaaS 按人头计费',
      description:
        '把自建服务器带宽/内存开销、自建企业授权（SSO / RBAC / 去品牌）与官方托管及商业 SaaS 坐席标价放到同一算账模型中对照。',
    },
    {
      code: 'CHK-05',
      dimensionKey: 'caveats',
      title: '生产踩坑与隐形限制提示',
      description:
        '提前预警上线后会卡脖子的条款：如 AGPLv3 网络修改开源义务、前端页脚强制保留版权、WebRTC UDP 端口需求或 cal.diy 仅限个人非生产使用提示。',
    },
  ],
  sec3Intro:
    '每行结论严格遵循四态圆点标尺，并对照 Google 的 Who / How / Why 内容质量框架公开实测与 AI 协作边界。',
  sec3Verdicts: [
    {
      verdict: 'good',
      label: '明确可用 / 低门槛',
      meaning: '已在一手文档或实机运行中核实：允许常规商用、近期持续更新或硬件/费用门槛较低。',
    },
    {
      verdict: 'caution',
      label: '有条件 / 中等门槛',
      meaning: '可商用但附带明确限制：例如 AGPL/源码可用条款、需 4–8 GB 以上内存或团队协作需另付费。',
    },
    {
      verdict: 'bad',
      label: '需买授权 / 高门槛',
      meaning: '商用或核心场景需购买企业授权、依赖重型服务器/独立显卡，或公开仓库长期停更。',
    },
    {
      verdict: 'pending',
      label: '待核对（Unverified）',
      meaning: '官方公开文档表述缺失或未给出明确数字时直接保留虚线待核对标记，绝不靠猜补全。',
    },
  ],
  sec3BoxTitle: 'Who / How / Why 透明度与 AI 辅助边界',
  sec3Rules: [
    {
      label: 'Who（发布主体）',
      text: '本站由独立工程出版实体 BuilderStack（dceniac.com）维护，纠错与商业联系统一通过 sponsor@dceniac.com 与 X @dceniac 受理。',
    },
    {
      label: 'How — 实机部署验证（“作者实践过”）',
      text: '仅在 BuilderStack 亲自跑通安装与核心流程的项目页展示“作者实践过”徽标；仅依据仓库代码与官方文档核对的条目绝不虚标此项。',
    },
    {
      label: 'How — AI 辅助边界与人工确认门槛（confirmed: true）',
      text: 'AI 仅用于页面结构整理与双语文字润色，严禁作为任何事实、硬件数值或实测经历的来源。每条许可证边界、内存底线、价格数字与圆点裁决均须人工对照一手链接核对确认（confirmed: true）后才允许上线；未核实项一律标为待核对。',
    },
    {
      label: 'Why 与时间戳制度（“最近核对：YYYY-MM-DD”）',
      text: '避免小团队因忽略协议条款或低估服务器成本而误选技术栈。每页均附 ISO 日期核对戳，超过 180 天的条目将排期复核。',
    },
  ],
  sec4Intro:
    '为保证所有项目核验与成本试算器免费开放且不植入广告追踪脚本，BuilderStack 通过以下两类透明渠道维持运营，并与内容判断彻底隔离。',
  sec4FirewallTitle: '营收渠道与编辑独立防火墙',
  sec4FirewallPoints: [
    {
      label: '官方托管 Cloud 联盟返佣',
      text: '指向部分官方托管服务（例如 n8n Cloud、Chatwoot Cloud）的出站链接可能包含联盟返佣参数；所有商业推广链接均在 HTML 中显式标注 rel="sponsored"。',
    },
    {
      label: '显式标注的商业赞助位',
      text: '商业赞助仅通过 sponsor@dceniac.com 接洽并明确标为赞助内容，与五维核验卡片及算账公式完全分离。',
    },
    {
      label: '不可突破的编辑底线',
      text: '任何赞助商或返佣合作方均无法付费购买绿点评价、隐藏 ee/ 闭源限制或修改服务器内存与 TCO 计算假设。',
    },
  ],
  sec4ProofTitle: '站内独立裁决实证（已上线项目公开案例）',
  sec4ProofCols: ['项目', '商业合作状态', '站内公布结论', '如实披露的限制与坑点'],
  sec4ProofRows: [
    {
      project: 'n8n',
      href: '/oss/n8n/',
      partnerStatus: '官方 Cloud 返佣通道（30% 分成）',
      verdict: 'caution',
      verdictLabel: '有条件',
      publishedCaveat:
        '首页与对比台均明确标黄提醒 Sustainable Use License 禁止面向外部客户的多租户 SaaS 嵌入，以及 Business 档 €667/月的价格断层。',
    },
    {
      project: 'Chatwoot',
      href: '/oss/chatwoot/',
      partnerStatus: '官方 Cloud 返佣通道（20% 分成）',
      verdict: 'caution',
      verdictLabel: '有条件',
      publishedCaveat:
        '明确指出 enterprise/ 目录属于商业专有代码、自建企业版需按坐席支付 $19–$99/人/月，以及 Sidekiq + Postgres 至少需 4 GB 内存。',
    },
    {
      project: 'Cal.com',
      href: '/oss/cal-com/',
      partnerStatus: '无付费商业合作',
      verdict: 'caution',
      verdictLabel: '有条件',
      publishedCaveat:
        '公开提示 MIT 仓 cal.diy 官方标明仅建议个人非生产用途，团队排班、路由表单与 SAML SSO 均位于闭源商业版中。',
    },
  ],
  sec5Intro:
    '开源协议、最低硬件要求与 SaaS 定价会随版本迭代变化。如发现页面数字过期或条款解读偏差，请附带一手官方链接发送至 sponsor@dceniac.com 或私信 X @dceniac，核实后将在 48 小时内修正并刷新核对日期。',
  sec5ChannelsIntro: '为防仿冒，仅以下六个公开阵地属于 BuilderStack 官方发布实体：',
  sec5Cols: ['平台', '定位与用途', '官方认证地址'],
};

export const AboutPage: React.FC<AboutPageProps> = ({ pageTitle, pageDescription }) => {
  const { lang, t } = useI18n();
  const o = t.oss;
  const copy = lang === 'zh' ? ZH_COPY : EN_COPY;
  const [activeId, setActiveId] = useState<string>('sec-01');

  useEffect(() => {
    const ids = copy.sections.map((s) => s.id);
    const els = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => Boolean(el));
    if (!('IntersectionObserver' in window) || els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length === 0) return;
        visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        setActiveId(visible[0].target.id);
      },
      { rootMargin: '-14% 0px -64% 0px', threshold: [0, 0.25, 0.5] }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [copy.sections]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: o.crumb, item: `${SITE_URL}${localePath(lang, '/')}` },
          { '@type': 'ListItem', position: 2, name: copy.crumb, item: `${SITE_URL}${localePath(lang, '/about/')}` },
        ],
      },
      ORGANIZATION_NODE,
      {
        ...webPageNode({
          path: localePath(lang, '/about/'),
          name: pageTitle,
          description: pageDescription,
          lang: lang as Language,
          dateModified: '2026-11-16',
          type: 'AboutPage',
        }),
        mainEntity: { '@id': ORG_ID },
      },
    ],
  };

  return (
    <div className="flex flex-1 flex-col text-[15px] leading-[1.6]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <ReadingProgressBar />
      <Navbar />

      <main className="mx-auto w-full max-w-[1060px] flex-1 px-5 pb-12 pt-10 sm:px-10 sm:pt-14">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-12">
          {/* Left Sticky Rail */}
          <aside className="space-y-4 lg:sticky lg:top-24" aria-label={copy.railNavTitle}>
            <div className="rounded-lg border border-[var(--line)] bg-[var(--wash)] px-3.5 py-3 font-mono text-[11.5px]">
              <div className="flex items-center justify-between gap-2 py-0.5">
                <span className="text-[#6F6F6A]">DOC</span>
                <span className="font-medium text-[var(--ink)]">{copy.railMeta.doc}</span>
              </div>
              <div className="flex items-center justify-between gap-2 py-0.5">
                <span className="text-[#6F6F6A]">UPDATED</span>
                <span className="font-medium text-[var(--ink)]">{copy.railMeta.updated}</span>
              </div>
              <div className="flex items-center justify-between gap-2 py-0.5">
                <span className="text-[#6F6F6A]">STATUS</span>
                <span className="font-medium text-[var(--ink)]">{copy.railMeta.status}</span>
              </div>
            </div>

            <nav className="max-lg:flex max-lg:flex-wrap max-lg:gap-1.5 max-lg:border-y max-lg:border-[var(--line)] max-lg:py-3 lg:flex lg:flex-col lg:border-l lg:border-[var(--line)]">
              <span className="hidden px-3.5 pb-1.5 font-mono text-[11px] uppercase tracking-wider text-[#6F6F6A] lg:block">
                {copy.railNavTitle}
              </span>
              {copy.sections.map((sec) => {
                const isActive = activeId === sec.id;
                return (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    onClick={() => setActiveId(sec.id)}
                    className={cn(
                      'text-[13px] transition-colors max-lg:rounded-md max-lg:border max-lg:px-2.5 max-lg:py-1 lg:-ml-px lg:border-l-2 lg:px-3.5 lg:py-1.5',
                      isActive
                        ? 'max-lg:border-[var(--ink)] max-lg:bg-[var(--ink)] max-lg:text-white lg:border-[var(--ink)] lg:font-semibold lg:text-[var(--ink)]'
                        : 'border-transparent text-[var(--sub)] hover:text-[var(--ink)] max-lg:border-[var(--line)]'
                    )}
                  >
                    {sec.nav}
                  </a>
                );
              })}
            </nav>

            <div className="rounded-lg border border-[var(--line)] bg-white px-3.5 py-3 text-[12.5px]">
              <div className="font-mono text-[10.5px] uppercase tracking-wider text-[#6F6F6A]">
                {copy.quickCardTitle}
              </div>
              <div className="mt-2 space-y-1.5">
                <a
                  href={`mailto:${SPONSOR_EMAIL}`}
                  className="block truncate font-mono text-[12px] text-[var(--ink)] underline decoration-[#CFCFCA] underline-offset-[3px] hover:decoration-[var(--ink)]"
                >
                  {SPONSOR_EMAIL}
                </a>
                <a
                  href={`https://x.com/${X_HANDLE}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-mono text-[12px] text-[var(--sub)] hover:text-[var(--ink)]"
                >
                  <span>X @{X_HANDLE}</span>
                  <ExternalLink aria-hidden="true" className="h-3 w-3 opacity-70" />
                </a>
              </div>
            </div>
          </aside>

          {/* Right Specification Column */}
          <article className="min-w-0 space-y-11">
            <FadeUp>
              <header className="border-b border-[var(--line)] pb-7">
                <p className="mb-3 text-sm text-[var(--sub)]">
                  <Link href={localePath(lang, '/')} className="hover:text-[var(--ink)]">
                    {o.crumb}
                  </Link>
                  {' / '}
                  {copy.crumb}
                </p>
                <p className="font-mono text-[11.5px] uppercase tracking-wider text-[#6F6F6A]">{copy.kicker}</p>
                <h1 className="mt-2 text-[clamp(26px,3.8vw,38px)] font-semibold leading-[1.16] tracking-[-0.02em] text-[var(--ink)]">
                  {copy.h1}
                </h1>
                <p className="mt-3.5 text-[16px] leading-[1.65] text-[var(--sub)]">{copy.abstract}</p>
              </header>
            </FadeUp>

            {/* §01 Mandate */}
            <section id="sec-01" className="scroll-mt-24 space-y-4">
              <div className="font-mono text-[11px] uppercase tracking-wider text-[#6F6F6A]">
                {copy.sections[0].tag}
              </div>
              <h2 className="text-[20px] font-semibold tracking-[-0.015em] text-[var(--ink)]">
                {copy.sections[0].heading}
              </h2>
              <p className="text-[15px] leading-[1.65] text-[var(--sub)]">{copy.sec1Intro}</p>
              <Card className="overflow-hidden">
                <Table>
                  <TableHeader className="bg-[var(--wash)]">
                    <TableRow className="hover:bg-[var(--wash)]">
                      {copy.sec1Cols.map((col) => (
                        <TableHead key={col} className="whitespace-nowrap font-semibold text-[var(--ink)]">
                          {col}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {copy.sec1Rows.map((row) => (
                      <TableRow key={row.dimension}>
                        <TableCell className="whitespace-nowrap font-mono text-[12px] font-medium text-[var(--ink)]">
                          {row.dimension}
                        </TableCell>
                        <TableCell className="text-[13.5px] text-[var(--sub)]">{row.generic}</TableCell>
                        <TableCell className="bg-[var(--wash)]/60 text-[13.5px] text-[var(--ink)]">
                          {row.builderstack}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </section>

            {/* §02 Five Primary Checks */}
            <section id="sec-02" className="scroll-mt-24 space-y-4 border-t border-[var(--line)] pt-9">
              <div className="font-mono text-[11px] uppercase tracking-wider text-[#6F6F6A]">
                {copy.sections[1].tag}
              </div>
              <h2 className="text-[20px] font-semibold tracking-[-0.015em] text-[var(--ink)]">
                {copy.sections[1].heading}
              </h2>
              <p className="text-[15px] leading-[1.65] text-[var(--sub)]">{copy.sec2Intro}</p>
              <Card className="overflow-hidden">
                <ol className="divide-y divide-[var(--line)]">
                  {copy.sec2Checks.map((chk) => (
                    <li
                      key={chk.code}
                      className="grid grid-cols-1 gap-2 px-5 py-4 sm:grid-cols-[72px_minmax(0,1fr)] sm:gap-4"
                    >
                      <span className="font-mono text-[12px] font-semibold text-[var(--ink)] sm:pt-0.5">
                        {chk.code}
                      </span>
                      <div>
                        <h3 className="text-[15px] font-semibold text-[var(--ink)]">{chk.title}</h3>
                        <p className="mt-1 text-[13.8px] leading-[1.6] text-[var(--sub)]">{chk.description}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </Card>
            </section>

            {/* §03 Verdict, Hands-On & AI Boundary */}
            <section id="sec-03" className="scroll-mt-24 space-y-4 border-t border-[var(--line)] pt-9">
              <div className="font-mono text-[11px] uppercase tracking-wider text-[#6F6F6A]">
                {copy.sections[2].tag}
              </div>
              <h2 className="text-[20px] font-semibold tracking-[-0.015em] text-[var(--ink)]">
                {copy.sections[2].heading}
              </h2>
              <p className="text-[15px] leading-[1.65] text-[var(--sub)]">{copy.sec3Intro}</p>

              <div className="divide-y divide-[var(--line)] rounded-lg border border-[var(--line)] bg-[var(--wash)]">
                {copy.sec3Verdicts.map((v) => (
                  <div
                    key={v.verdict}
                    className="grid grid-cols-1 gap-1.5 px-4 py-3.5 sm:grid-cols-[185px_minmax(0,1fr)] sm:items-start sm:gap-4"
                  >
                    <span className="inline-flex items-center gap-2 text-[13.5px] font-semibold text-[var(--ink)]">
                      <Dot verdict={v.verdict} />
                      <span>{v.label}</span>
                    </span>
                    <span className="text-[13.5px] text-[var(--sub)]">{v.meaning}</span>
                  </div>
                ))}
              </div>

              <div className="rounded-lg border border-[var(--line)] bg-[var(--wash)] p-5">
                <div className="font-mono text-[11px] uppercase tracking-wider text-[#6F6F6A]">
                  {copy.sec3BoxTitle}
                </div>
                <ul className="mt-3 space-y-2.5 text-[14px] leading-[1.65] text-[var(--sub)]">
                  {copy.sec3Rules.map((rule) => (
                    <li key={rule.label}>
                      <strong className="font-semibold text-[var(--ink)]">{rule.label}: </strong>
                      <span>{rule.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* §04 Affiliate Firewall & Published Proof */}
            <section id="sec-04" className="scroll-mt-24 space-y-4 border-t border-[var(--line)] pt-9">
              <div className="font-mono text-[11px] uppercase tracking-wider text-[#6F6F6A]">
                {copy.sections[3].tag}
              </div>
              <h2 className="text-[20px] font-semibold tracking-[-0.015em] text-[var(--ink)]">
                {copy.sections[3].heading}
              </h2>
              <p className="text-[15px] leading-[1.65] text-[var(--sub)]">{copy.sec4Intro}</p>

              <div className="rounded-lg border border-[var(--line)] bg-[var(--wash)] p-5">
                <div className="font-mono text-[11px] uppercase tracking-wider text-[#6F6F6A]">
                  {copy.sec4FirewallTitle}
                </div>
                <ul className="mt-3 space-y-2.5 text-[14px] leading-[1.65] text-[var(--sub)]">
                  {copy.sec4FirewallPoints.map((pt) => (
                    <li key={pt.label}>
                      <strong className="font-semibold text-[var(--ink)]">{pt.label}: </strong>
                      <span>{pt.text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2">
                <h3 className="mb-3 text-[16px] font-semibold text-[var(--ink)]">{copy.sec4ProofTitle}</h3>
                <Card className="overflow-hidden">
                  <Table>
                    <TableHeader className="bg-[var(--wash)]">
                      <TableRow className="hover:bg-[var(--wash)]">
                        {copy.sec4ProofCols.map((col) => (
                          <TableHead key={col} className="whitespace-nowrap font-semibold text-[var(--ink)]">
                            {col}
                          </TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {copy.sec4ProofRows.map((row) => (
                        <TableRow key={row.project}>
                          <TableCell className="whitespace-nowrap font-semibold">
                            <Link
                              href={localePath(lang, row.href)}
                              className="text-[var(--ink)] underline decoration-[#CFCFCA] underline-offset-[3px] hover:decoration-[var(--ink)]"
                            >
                              {row.project}
                            </Link>
                          </TableCell>
                          <TableCell className="text-[13px] text-[var(--sub)]">{row.partnerStatus}</TableCell>
                          <TableCell className="whitespace-nowrap">
                            <Badge variant={row.verdict === 'caution' ? 'warn' : 'good'}>
                              <Dot verdict={row.verdict} />
                              <span>{row.verdictLabel}</span>
                            </Badge>
                          </TableCell>
                          <TableCell className="text-[13.5px] text-[var(--ink)]">{row.publishedCaveat}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
              </div>
            </section>

            {/* §05 Corrections & Official Channels */}
            <section id="sec-05" className="scroll-mt-24 space-y-4 border-t border-[var(--line)] pt-9">
              <div className="font-mono text-[11px] uppercase tracking-wider text-[#6F6F6A]">
                {copy.sections[4].tag}
              </div>
              <h2 className="text-[20px] font-semibold tracking-[-0.015em] text-[var(--ink)]">
                {copy.sections[4].heading}
              </h2>
              <p className="text-[15px] leading-[1.65] text-[var(--sub)]">{copy.sec5Intro}</p>
              <p className="text-[14.5px] leading-[1.6] text-[var(--sub)]">{copy.sec5ChannelsIntro}</p>

              <Card className="overflow-hidden">
                <Table>
                  <TableHeader className="bg-[var(--wash)]">
                    <TableRow className="hover:bg-[var(--wash)]">
                      {copy.sec5Cols.map((col) => (
                        <TableHead key={col} className="whitespace-nowrap font-semibold text-[var(--ink)]">
                          {col}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {OFFICIAL_CHANNELS.map((ch) => (
                      <TableRow key={ch.url}>
                        <TableCell className="whitespace-nowrap font-mono text-[12.5px] font-medium text-[var(--ink)]">
                          {lang === 'zh' ? ch.platformZh : ch.platform}
                        </TableCell>
                        <TableCell className="text-[13.5px] text-[var(--sub)]">
                          {lang === 'zh' ? ch.roleZh : ch.roleEn}
                        </TableCell>
                        <TableCell className="text-[13px]">
                          <a
                            href={ch.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 break-all font-mono text-[12px] text-[var(--ink)] underline decoration-[#CFCFCA] underline-offset-[3px] hover:decoration-[var(--ink)]"
                          >
                            <span>{ch.url}</span>
                            <ExternalLink aria-hidden="true" className="h-3 w-3 shrink-0 opacity-70" />
                          </a>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </section>
          </article>
        </div>

        <OssCta />
      </main>

      <SiteFooter />
    </div>
  );
};
