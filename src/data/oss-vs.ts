import type { OssVerdict } from '@/types/oss';
import type { Language } from '@/lib/i18n-path';
import type { SourceCitationData } from '@/components/motion/MotionPrimitives';

export type AuditGroup = 'all' | 'license' | 'pricing';

export interface VsPreset {
  id: string;
  labelEn: string;
  labelZh: string;
  sliderValue: number;
  toggles: Record<string, boolean>;
}

export interface VsToggleDef {
  key: string;
  labelEn: string;
  labelZh: string;
  hintEn: string;
  hintZh: string;
  defaultValue: boolean;
}

export interface VsCalcBarView {
  id: string;
  name: string;
  planBadge: string;
  costLabel: string;
  note: string;
  percent: number;
  dot: OssVerdict;
  tone: 'ink' | 'muted' | 'good' | 'warn';
  mutedCard?: boolean;
  statusBadge?: { text: string; variant: 'good' | 'warn' | 'bad' | 'mono' };
}

export interface VsCalcResult {
  sliderFormatted: string;
  bars: VsCalcBarView[];
  deltaText: string;
  copyText: string;
}

export interface VsSideView {
  id: string;
  name: string;
  monogram: string;
  projectId?: string;
  winnerBadge: string;
  tagline: string;
  highlighted?: boolean;
  pricePills: string[];
  chooseIf: string[];
  watchOut: string[];
  ctaLabel: string;
  ctaUrl: string;
  ctaSponsored?: boolean;
  secondaryLabel: string;
  secondaryUrl: string;
  disclosure: string;
}

export interface VsMatrixRowView {
  group: 'license' | 'pricing';
  dimension: string;
  citations: SourceCitationData[];
  leftVerdict: OssVerdict;
  leftHeadline: string;
  leftDetail: string;
  rightVerdict: OssVerdict;
  rightHeadline: string;
  rightDetail: string;
}

export interface VsComparisonSummary {
  slug: string;
  href: string;
  title: string;
  subtitle: string;
  categoryId: string;
  categoryLabel: string;
  checkedAt: string;
  leftName: string;
  rightName: string;
  winnerTag: string;
  pricingHighlight: string;
  linkedProjectIds: string[];
}

export interface VsComparisonView extends VsComparisonSummary {
  metaTitle: string;
  metaDescription: string;
  starsBadge: string;
  stickyWinnerBadge: string;
  stickyCtaLabel: string;
  stickyCtaUrl: string;
  stickyCtaSponsored?: boolean;
  left: VsSideView;
  right: VsSideView;
  trap: {
    title: string;
    body: string;
    citation: SourceCitationData;
  };
  calc: {
    title: string;
    subtitle: string;
    sliderLabel: string;
    min: number;
    max: number;
    step: number;
    defaultSlider: number;
    scaleTicks: string[];
    presets: { id: string; label: string; sliderValue: number; toggles: Record<string, boolean> }[];
    toggles: { key: string; label: string; hint: string; defaultValue: boolean }[];
  };
  matrix: VsMatrixRowView[];
  faqs: { q: string; a: string }[];
}

interface BilingualText {
  en: string;
  zh: string;
}

interface VsSideRaw {
  id: string;
  name: string;
  monogram: string;
  projectId?: string;
  highlighted?: boolean;
  winnerBadge: BilingualText;
  tagline: BilingualText;
  pricePills: { en: string[]; zh: string[] };
  chooseIf: { en: string[]; zh: string[] };
  watchOut: { en: string[]; zh: string[] };
  ctaLabel: BilingualText;
  ctaUrl: string;
  ctaSponsored?: boolean;
  secondaryLabel: BilingualText;
  secondaryUrl: string;
  disclosure: BilingualText;
}

interface VsCitationRaw {
  label: string;
  url: string;
  date: string;
  quote: string | BilingualText;
  sponsored?: boolean;
}

interface VsMatrixRowRaw {
  group: 'license' | 'pricing';
  dimension: BilingualText;
  citations: VsCitationRaw[];
  leftVerdict: OssVerdict;
  leftHeadline: BilingualText;
  leftDetail: BilingualText;
  rightVerdict: OssVerdict;
  rightHeadline: BilingualText;
  rightDetail: BilingualText;
}

interface VsPairRaw {
  slug: string;
  categoryId: string;
  categoryLabel: BilingualText;
  checkedAt: string;
  metaTitle: BilingualText;
  metaDescription: BilingualText;
  title: BilingualText;
  subtitle: BilingualText;
  winnerTag: BilingualText;
  pricingHighlight: BilingualText;
  starsBadge: string;
  stickyWinnerBadge: BilingualText;
  stickyCtaLabel: BilingualText;
  stickyCtaUrl: string;
  stickyCtaSponsored?: boolean;
  linkedProjectIds: string[];
  left: VsSideRaw;
  right: VsSideRaw;
  trap: {
    title: BilingualText;
    body: BilingualText;
    citation: VsCitationRaw;
  };
  calcMeta: {
    title: BilingualText;
    subtitle: BilingualText;
    sliderLabel: BilingualText;
    min: number;
    max: number;
    step: number;
    defaultSlider: number;
    scaleTicks: { en: string[]; zh: string[] };
    presets: VsPreset[];
    toggles: VsToggleDef[];
  };
  matrix: VsMatrixRowRaw[];
  faqs: { q: BilingualText; a: BilingualText }[];
}

const ALL_VS_RAW: VsPairRaw[] = [
  // =========================================================================
  // 1. Cal.com vs Calendly
  // =========================================================================
  {
    slug: 'cal-vs-calendly',
    categoryId: 'scheduling',
    categoryLabel: { en: 'Scheduling', zh: '预约排期' },
    checkedAt: '2026-11-15',
    metaTitle: {
      en: 'Cal.com vs Calendly: Pricing, cal.diy Trap & SSO Math',
      zh: 'Cal.com 对比 Calendly：定价与自建',
    },
    metaDescription: {
      en: 'Side-by-side audit of Cal.com vs Calendly in Nov 2026: $0 solo vs 1 event type, $12 vs $16/seat Teams, why MIT cal.diy excludes Teams/SSO, and SSO break-even.',
      zh: '2026年11月实测 Cal.com 与 Calendly 定价、MIT 仓库 cal.diy 自建限制，以及 Teams 到企业 SSO 坐席成本分界线。',
    },
    title: { en: 'Cal.com vs Calendly', zh: 'Cal.com 对比 Calendly' },
    subtitle: {
      en: 'Cal.com Cloud costs less across solo ($0 unlimited) and standard Teams ($12 vs $16/seat), and beats Calendly’s ~$15k/yr Enterprise SSO floor up to 44 seats — just do not count on MIT cal.diy for team self-hosting.',
      zh: 'Cal.com 托管云在个人版（$0 不限类型）、常规 Teams（年付 $12 对 $16/席）及 44 席以内的企业 SSO 场景均更省；但别指望靠开源 cal.diy 免费跑团队生产环境。',
    },
    winnerTag: { en: 'Solo, Teams & <45 SSO: Cal.com', zh: '个人/Teams及44席内SSO选 Cal.com' },
    pricingHighlight: { en: '$0 solo · $12 vs $16 Teams · $15k Calendly SSO floor', zh: '个人 $0 · Teams $12 对 $16 · SSO 门槛' },
    starsBadge: 'calcom/cal.diy · 50,053 ★ MIT',
    stickyWinnerBadge: { en: 'Cheaper on Teams & 1–44 SSO seats', zh: '常规 Teams 与 44 席内 SSO 更省' },
    stickyCtaLabel: { en: 'Check Cal.com Cloud', zh: '查看 Cal.com 方案' },
    stickyCtaUrl: 'https://cal.com/pricing',
    stickyCtaSponsored: false,
    linkedProjectIds: ['cal-com'],
    left: {
      id: 'cal-com',
      name: 'Cal.com',
      monogram: 'Cal',
      projectId: 'cal-com',
      highlighted: true,
      winnerBadge: { en: 'Winner: Teams & <45 SSO seats', zh: '常规 Teams 与 44 席内 SSO 胜出' },
      tagline: { en: 'Open-core Cloud + MIT personal repo (cal.diy)', zh: '开放核心托管云 + MIT 个人仓库 (cal.diy)' },
      pricePills: {
        en: ['Solo $0 unlimited', 'Teams $12/u', 'Org SSO $28/u'],
        zh: ['个人版 $0 不限量', 'Teams $12/人', 'Org SSO $28/人'],
      },
      chooseIf: {
        en: [
          'You want unlimited solo event types, multiple calendars & workflows for $0/month.',
          'Your multi-seat team needs round-robin & routing forms ($12/u vs Calendly $16 at any headcount).',
          'You need SAML SSO for up to 44 seats without a $15,000/yr contract floor.',
        ],
        zh: [
          '需要免费个人版就支持不限预约类型、多日历与自动化 Workflows。',
          '多人团队需要轮询排班和路由表单（年付 $12/人，任意席位数均低于 Calendly $16）。',
          '44 席以内想按人头自助开通 SAML SSO，不愿签每年 1.5 万美元保底合同。',
        ],
      },
      watchOut: {
        en: [
          'Public MIT repo cal.diy omits Teams, Routing & SSO; official README flags it for personal non-prod use.',
        ],
        zh: [
          '公开 MIT 仓库 cal.diy 移除了团队轮询与 SSO，官方注明仅限个人非生产环境。',
        ],
      },
      ctaLabel: { en: 'Try Cal.com Cloud Pricing', zh: '查看 Cal.com Cloud 定价' },
      ctaUrl: 'https://cal.com/pricing',
      ctaSponsored: false,
      secondaryLabel: { en: 'cal.diy repo', zh: 'cal.diy 仓库' },
      secondaryUrl: 'https://github.com/calcom/cal.diy',
      disclosure: {
        en: 'Standard reference link (no affiliate tracking) · Checked against cal.com/pricing (2026-11-15).',
        zh: '普通参考链接（无返佣追踪）· 价格核对自 cal.com/pricing（2026-11-15）。',
      },
    },
    right: {
      id: 'calendly',
      name: 'Calendly',
      monogram: 'CL',
      highlighted: false,
      winnerBadge: { en: 'Winner: 55+ SSO orgs', zh: '55+ 席位企业可比价' },
      tagline: { en: 'Closed-source incumbent SaaS', zh: '纯闭源成熟商业 SaaS' },
      pricePills: {
        en: ['Free: 1 event type', 'Teams $16/seat', 'Ent $15k/yr+'],
        zh: ['免费限 1 种预约', 'Teams $16/席', '企业 $1.5万/年起'],
      },
      chooseIf: {
        en: [
          'You run 55+ sales seats needing negotiated Enterprise SSO pricing (~$15k/yr floor).',
          'You want Calendly’s bundled meeting notes and calendar tooling on paid tiers.',
          'Procurement already approves Calendly as a turnkey SaaS vendor.',
        ],
        zh: [
          '团队达 55 人以上且走企业年度谈判价，每年 1.5 万美元保底分摊更划算。',
          '团队已深度习惯 Calendly 既有界面与销售工具插件生态。',
          '采购清单已白名单批准 Calendly，无需再走新供应商合规审批。',
        ],
      },
      watchOut: {
        en: [
          'Free plan limits you to 1 event type & 1 calendar; no self-hosted option exists at any tier.',
        ],
        zh: [
          '免费版仅限 1 个预约类型与 1 个日历；所有版本均不提供任何自建部署。',
        ],
      },
      ctaLabel: { en: 'View Calendly Official Pricing', zh: '查看 Calendly 官方报价' },
      ctaUrl: 'https://calendly.com/pricing',
      ctaSponsored: false,
      secondaryLabel: { en: 'BuilderStack Cal.com Audit', zh: '看 Cal.com 五项核对' },
      secondaryUrl: '/oss/cal-com/',
      disclosure: {
        en: 'Standard reference link · Checked against calendly.com/pricing (2026-11-15).',
        zh: '普通参考链接 · 核对自 calendly.com/pricing（2026-11-15）。',
      },
    },
    trap: {
      title: {
        en: 'Critical Self-Hosting Trap: Closed commercial core vs MIT cal.diy',
        zh: '关键避坑提示：商业主仓闭源 vs MIT 个人仓库 cal.diy',
      },
      body: {
        en: 'Many comparisons still claim Cal.com gives you free self-hosted team round-robin and workflows. In reality, Cal.com’s commercial codebase moved closed-source; the public MIT repo (calcom/cal.diy) leaves out Teams, Organizations, Routing Forms & SAML SSO and explicitly warns it is “strictly recommended for personal, non-production use.”',
        zh: '大量旧文章仍以为“自建开源 Cal.com 就能免费用上团队轮询排班和工作流”。实际情况是商业主库已闭源，公开 MIT 仓库（calcom/cal.diy）不含 Teams、Routing Forms、Workflows 与 SAML SSO，且 README 明文建议“严格限于个人、非生产环境”。',
      },
      citation: {
        label: 'cal.diy README',
        url: 'https://github.com/calcom/cal.diy#readme',
        date: '2026-11-15',
        quote: '“Cal.diy is the open source community edition... strictly recommended for personal, non-production use. For any commercial and enterprise-ready scheduling infrastructure, use Cal.com, not Cal.diy.”',
      },
    },
    calcMeta: {
      title: { en: 'Interactive Seat & License Calculator', zh: '坐席与企业 SSO 成本试算' },
      subtitle: {
        en: 'Compare Cal.com Cloud, Calendly SaaS, and cal.diy across team sizes, billing cycles, and SSO floors.',
        zh: '按团队人数、年付/月付、SAML SSO 需求及服务器成本实时对照两套云端方案与自建边界。',
      },
      sliderLabel: { en: 'Active team seats', zh: '团队席位数' },
      min: 1,
      max: 60,
      step: 1,
      defaultSlider: 10,
      scaleTicks: {
        en: ['1 (Solo)', '15', '30', '45', '60 (Org)'],
        zh: ['1 (个人)', '15', '30', '45', '60 (组织)'],
      },
      presets: [
        { id: 'solo', labelEn: '1 Solo', labelZh: '1 个人', sliderValue: 1, toggles: { annual: true, sso: false, vps: false } },
        { id: 'team5', labelEn: '5 Team', labelZh: '5 团队', sliderValue: 5, toggles: { annual: true, sso: false, vps: false } },
        { id: 'growth15', labelEn: '15 Growth', labelZh: '15 增长', sliderValue: 15, toggles: { annual: true, sso: false, vps: false } },
        { id: 'scale35', labelEn: '35 Scale', labelZh: '35 扩展', sliderValue: 35, toggles: { annual: true, sso: false, vps: false } },
        { id: 'sso55', labelEn: '55 Enterprise', labelZh: '55 企业SSO', sliderValue: 55, toggles: { annual: true, sso: true, vps: false } },
      ],
      toggles: [
        {
          key: 'annual',
          labelEn: 'Annual billing',
          labelZh: '按年计费',
          hintEn: 'Toggle off for monthly rates ($15 vs $12; $20 vs $16)',
          hintZh: '关闭则切换按月计费（$15 对 $12；$20 对 $16）',
          defaultValue: true,
        },
        {
          key: 'sso',
          labelEn: 'Require SAML SSO / SCIM',
          labelZh: '需要 SAML SSO / SCIM',
          hintEn: 'Switches to Cal.com Org ($28/u) vs Calendly $15k/yr floor',
          hintZh: '开启后按 Cal.com Org ($28/人) 对照 Calendly 年保底 $15,000',
          defaultValue: false,
        },
        {
          key: 'vps',
          labelEn: 'Include $12/mo Linux VPS',
          labelZh: '计入 $12/月 VPS 主机费',
          hintEn: 'Applies baseline server cost to cal.diy personal self-host',
          hintZh: '用于核算个人自建 cal.diy 的基础主机费用',
          defaultValue: false,
        },
      ],
    },
    matrix: [
      {
        group: 'license',
        dimension: { en: 'Open Source License', zh: '开源许可证与闭源边界' },
        citations: [
          {
            label: 'MIT License',
            url: 'https://github.com/calcom/cal.diy/blob/main/LICENSE',
            date: '2026-11-15',
            quote: 'calcom/cal.diy core is MIT-licensed; Teams, Organizations, Workflows & SSO moved to closed-source commercial Cal.com.',
          },
        ],
        leftVerdict: 'caution',
        leftHeadline: { en: 'MIT (cal.diy) + closed commercial Cloud', zh: 'MIT (cal.diy) + 闭源商业版' },
        leftDetail: {
          en: 'You can modify MIT cal.diy, but commercial team features (Teams, Routing, SSO) live exclusively in closed-source Cal.com Cloud or Enterprise.',
          zh: 'cal.diy 仓库代码为 MIT 可改写；但多人 Teams、路由与 SSO 等商用能力已独立于闭源主库与商业云中。',
        },
        rightVerdict: 'bad',
        rightHeadline: { en: '100% Closed-Source SaaS', zh: '100% 闭源商业 SaaS' },
        rightDetail: {
          en: 'No public repository or self-hosted source code at any pricing tier.',
          zh: '全线闭源订阅产品，没有任何公开代码仓库。',
        },
      },
      {
        group: 'license',
        dimension: { en: 'Self-Hosting Viability', zh: '自建生产可用性' },
        citations: [
          {
            label: 'Self-Host Docs',
            url: 'https://cal.com/docs/self-hosting/installation',
            date: '2026-11-15',
            quote: 'Requires Node.js >=18, PostgreSQL >=13, Yarn and OAuth credentials; README warns cal.diy is non-production.',
          },
        ],
        leftVerdict: 'caution',
        leftHeadline: { en: 'Personal / non-prod only (cal.diy)', zh: '仅个人/非生产可用 (cal.diy)' },
        leftDetail: {
          en: 'Requires Node >=18, PostgreSQL >=13 and Yarn; fine for single-person demos, not intended for team production.',
          zh: '需维护 Node >=18、PostgreSQL >=13 与 OAuth 密钥；官方明确不建议团队将 cal.diy 用于商用生产。',
        },
        rightVerdict: 'bad',
        rightHeadline: { en: 'Cloud only (no self-host)', zh: '不支持自建部署' },
        rightDetail: {
          en: 'Managed multi-tenant cloud only; custom data residency is handled inside vendor agreements.',
          zh: '仅支持官方多租户云端运行，无私有化镜像。',
        },
      },
      {
        group: 'pricing',
        dimension: { en: 'Solo Free Tier', zh: '个人免费档配额' },
        citations: [
          {
            label: 'Cal.com Pricing',
            url: 'https://cal.com/pricing',
            date: '2026-11-15',
            quote: 'Individuals: $0 forever — unlimited event types, multiple calendar connections, workflows and Stripe payments.',
          },
          {
            label: 'Calendly Pricing',
            url: 'https://calendly.com/pricing',
            date: '2026-11-15',
            quote: 'Calendly Free limits accounts to 1 active event type and 1 calendar connection.',
          },
        ],
        leftVerdict: 'good',
        leftHeadline: { en: '$0 — Unlimited event types', zh: '$0 — 不限预约类型与多日历' },
        leftDetail: {
          en: 'Multiple calendar connections, unlimited event types, basic workflows and Stripe booking payments are included free.',
          zh: '个人 0 美元起即不限预约类型，支持多日历同步、基础工作流及 Stripe 收款。',
        },
        rightVerdict: 'caution',
        rightHeadline: { en: '$0 — Capped at 1 event type', zh: '$0 — 限 1 种预约类型' },
        rightDetail: {
          en: 'More than one active event type or extra calendar requires upgrading to $10/seat/month Standard.',
          zh: '免费档只能开 1 种预约链接与 1 个日历，多链接需升 $10/席/月 Standard。',
        },
      },
      {
        group: 'pricing',
        dimension: { en: 'Team Round-Robin & Routing', zh: '团队轮询与路由表单' },
        citations: [
          {
            label: 'Teams Compare',
            url: 'https://cal.com/pricing',
            date: '2026-11-15',
            quote: 'Cal.com Teams $12/user/mo annual ($15 monthly) vs Calendly Teams $16/seat/mo annual ($20 monthly).',
          },
        ],
        leftVerdict: 'good',
        leftHeadline: { en: '$12/user/mo ($15 monthly)', zh: '$12/人/月（月付 $15）' },
        leftDetail: {
          en: 'Teams tier bundles round-robin assignments, collective scheduling, webhooks and routing forms from $12/u.',
          zh: 'Teams 档含团队轮询、联合排期、Webhook 与路由表单，每席年付比 Calendly 便宜 25%。',
        },
        rightVerdict: 'caution',
        rightHeadline: { en: '$16/seat/mo ($20 monthly)', zh: '$16/席/月（月付 $20）' },
        rightDetail: {
          en: 'Round-robin and Salesforce/HubSpot routing sit in Calendly Teams at 33% higher per-seat cost.',
          zh: '轮询排班和 CRM 路由仅在 $16/席/月 的 Teams 及以上档开放。',
        },
      },
      {
        group: 'pricing',
        dimension: { en: 'SAML SSO & SCIM Gate', zh: 'SAML SSO 与企业门禁门槛' },
        citations: [
          {
            label: 'Enterprise Floors',
            url: 'https://cal.com/pricing',
            date: '2026-11-15',
            quote: 'Cal.com Organizations $28/user/mo annual (self-serve SSO/SCIM). Calendly Enterprise SSO starts around $15,000/year.',
          },
        ],
        leftVerdict: 'good',
        leftHeadline: { en: '$28/u self-serve Org tier', zh: '$28/人/月自助开通 Org 档' },
        leftDetail: {
          en: 'Add SAML SSO, SCIM and sub-teams transparently per user — no minimum seat contract wall.',
          zh: '支持按人头自助升级 SAML SSO 与 SCIM，无需 50 人保底年起订额。',
        },
        rightVerdict: 'caution',
        rightHeadline: { en: '~$15,000/yr Enterprise floor', zh: '企业合同约 $15,000/年起' },
        rightDetail: {
          en: 'SSO and audit logs require Enterprise sales quote (starts around 50 seats / $1,250/mo equivalent).',
          zh: 'SSO 与审计日志须签企业版销售合同，按 50 席起步年度合同约 1.5 万美元。',
        },
      },
      {
        group: 'license',
        dimension: { en: 'API, Embeds & White-Label', zh: 'API、组件嵌入与去品牌' },
        citations: [
          {
            label: 'Cal.com Docs',
            url: 'https://cal.com/docs',
            date: '2026-11-15',
            quote: 'Cal.com offers Cal Platform atoms and white-label sub-teams on Organizations.',
          },
        ],
        leftVerdict: 'good',
        leftHeadline: { en: 'Custom subdomain & React Atoms', zh: '自定义二级域名与嵌入组件' },
        leftDetail: {
          en: 'Remove Cal branding on Organizations ($28/u) or embed scheduling flows natively via API/SDK.',
          zh: 'Org 档可彻底去品牌与自定义域名，且对 SaaS 内嵌排班场景开放专门 API。',
        },
        rightVerdict: 'caution',
        rightHeadline: { en: 'Hosted widget; minimal branding control', zh: '主要通过嵌入弹窗且保留品牌规范' },
        rightDetail: {
          en: 'Best suited for out-of-the-box links and embeds rather than custom-owned booking infrastructure.',
          zh: '更适合直接引流外链或弹出小窗，难以深度拆改白标架构。',
        },
      },
    ],
    faqs: [
      {
        q: { en: 'Can my team self-host Cal.com for free under the MIT license?', zh: '团队能按 MIT 协议免费自建 Cal.com 替代付费团队版吗？' },
        a: {
          en: 'No for production team workflows. While calcom/cal.diy is MIT-licensed, its official README warns it is strictly for personal, non-production use and removes Teams round-robin, Routing Forms, Workflows and SAML SSO.',
          zh: '不适合用于正式团队排班。虽然 calcom/cal.diy 仓库采用 MIT 协议，但官方 README 明确限制其仅用于个人非生产用途，且移除了多人轮询、路由表单和 SSO。',
        },
      },
      {
        q: { en: 'When is Cal.com Cloud cheaper than Calendly?', zh: '什么团队规模下 Cal.com Cloud 比 Calendly 更省钱？' },
        a: {
          en: 'Cal.com Cloud wins for 1 user ($0 unlimited event types vs Calendly 1-event cap) and across all standard team seat counts ($12/u vs $16/seat annual Teams). With SAML SSO enabled ($28/u), Cal.com stays cheaper than Calendly’s ~$15,000/yr Enterprise floor up to 44 annual seats.',
          zh: '1 人个人版（Cal.com 免费版不限预约类型）以及所有规模的常规团队版（年付 $12/人对比 $16/人）均是 Cal.com 更省。若需开启 SAML SSO，在 44 席以内 Cal.com Org（年付 $28/人）仍低于 Calendly 每年 1.5 万美元的企业保底门槛。',
        },
      },
      {
        q: { en: 'What does Calendly do better than Cal.com?', zh: 'Calendly 相对 Cal.com 有哪些优势？' },
        a: {
          en: 'Calendly requires zero setup, bundles meeting assistance tools on paid tiers, holds long-standing enterprise procurement approvals, and becomes price-competitive above ~55 seats on negotiated Enterprise contracts.',
          zh: 'Calendly 无需任何运维配置，销售工具与既有采购白名单普及度高；55 席以上走企业年度合同议价后，其大客户折扣往往具备竞争力。',
        },
      },
      {
        q: { en: 'Do I need PostgreSQL to test self-hosted cal.diy?', zh: '本地或自建测试 cal.diy 必须配 PostgreSQL 吗？' },
        a: {
          en: 'Yes. The calcom/cal.diy README specifies Node.js 18+, PostgreSQL 13+, Yarn, NEXTAUTH_SECRET, CALENDSO_ENCRYPTION_KEY and individual OAuth keys for calendar/video providers.',
          zh: '是的。cal.diy 仓库文档要求至少 Node.js 18+、PostgreSQL 13+ 与 Yarn，并须自备加密密钥及 Google/Microsoft/Zoom 等第三方 OAuth 凭据。',
        },
      },
    ],
  },

  // =========================================================================
  // 2. n8n vs Activepieces
  // =========================================================================
  {
    slug: 'n8n-vs-activepieces',
    categoryId: 'automation',
    categoryLabel: { en: 'Workflow automation', zh: '工作流自动化' },
    checkedAt: '2026-11-17',
    metaTitle: {
      en: 'n8n vs Activepieces: License, Sharing & Team Pricing',
      zh: 'n8n 对比 Activepieces：许可与价格',
    },
    metaDescription: {
      en: 'Compare n8n (Sustainable Use License, €667/mo self-hosted Business) vs Activepieces (MIT Expat core + $200/mo 25-user Team SSO) for internal and AI workflows.',
      zh: '2026年11月实测 n8n 与 Activepieces：SUL 源码可用协议对 MIT 核心，n8n 自建团队共享 €667/月对比 Activepieces $200/月包 25 人。',
    },
    title: { en: 'n8n vs Activepieces', zh: 'n8n 对比 Activepieces' },
    subtitle: {
      en: 'n8n wins for deep technical self-hosted internal pipelines; Activepieces wins on true MIT core licensing and $200/mo 25-user Team SSO (capped at 50,000 credits/mo).',
      zh: '重度技术流内部自建选 n8n；需要真正 MIT 开源核心、或不想为多人共享工作流与 SSO 付 €667/月大额年费选 Activepieces（Team $200/月，每月 5 万积分封顶）。',
    },
    winnerTag: { en: 'MIT & Team cost: Activepieces', zh: 'MIT 与 25 人团队价看 Activepieces' },
    pricingHighlight: { en: 'SUL (€667/mo Biz) vs MIT ($200/mo 25-seat Team)', zh: 'n8n SUL（€667/月）对 MIT 核心（$200/月包 25 人）' },
    starsBadge: 'n8n 211k+ ★ SUL · Activepieces 25,540 ★ MIT',
    stickyWinnerBadge: { en: 'SUL vs MIT · €667 vs $200 Team', zh: '协议与团队成本差异极大' },
    stickyCtaLabel: { en: 'Check n8n Review', zh: '查看 n8n 五项核对' },
    stickyCtaUrl: '/oss/n8n/',
    stickyCtaSponsored: false,
    linkedProjectIds: ['n8n', 'activepieces'],
    left: {
      id: 'n8n',
      name: 'n8n',
      monogram: 'N8',
      projectId: 'n8n',
      highlighted: true,
      winnerBadge: { en: 'Winner: Solo devs & complex logic', zh: '单人技术流 / 复杂节点胜出' },
      tagline: { en: 'Sustainable Use License 1.0 + node-based engine', zh: 'Sustainable Use License 1.0 + 成熟节点引擎' },
      pricePills: {
        en: ['Self-host $0 Community', 'Business €667/mo', 'Cloud €20 / €50'],
        zh: ['社区自建 $0', '自建 Business €667/月', '云端 €20 / €50'],
      },
      chooseIf: {
        en: [
          'Internal engineering ops run workflows on your own 4 GB RAM VPS with custom code/JS.',
          'An agency builds and hosts automations on its own instance while editing flows alone.',
          'Teams replacing expiring AI no-code builders (like Flowise Cloud EOL) want mature AI Agent + webhook nodes.',
        ],
        zh: [
          '内部开发/运维团队在 4 GB 内存 VPS 上自建自用，重度依赖 Code 节点与丰富集成。',
          '外包机构在自有实例内仅由内部员工配置并替客户跑自动化。',
          '团队迁移 AI 编排底座（如 Flowise Cloud 下线迁移），看重 n8n 成熟的 AI Agent 与重试机制。',
        ],
      },
      watchOut: {
        en: [
          'Community omits workflow/credential sharing, SSO & Git (€667/mo annual Business); SUL forbids letting external clients edit workflows.',
        ],
        zh: [
          '社区版砍掉了团队流程共享、凭据共享、SSO 与 Git（需升 €667/月年付）；SUL 禁外部客户登录配流程。',
        ],
      },
      ctaLabel: { en: 'View n8n Official Pricing', zh: '查看 n8n 官方报价' },
      ctaUrl: 'https://n8n.io/pricing/',
      ctaSponsored: false,
      secondaryLabel: { en: 'BuilderStack n8n Audit', zh: '看 n8n 五项核对' },
      secondaryUrl: '/oss/n8n/',
      disclosure: {
        en: 'Reference link · Pricing & SUL checked Nov 2026.',
        zh: '普通参考链接 · SUL 许可与价格核对于 2026 年 11 月。',
      },
    },
    right: {
      id: 'activepieces',
      name: 'Activepieces',
      monogram: 'AP',
      highlighted: false,
      winnerBadge: { en: 'Winner: MIT core & Team SSO value', zh: 'MIT 商业自由度 & 团队平价胜出' },
      tagline: { en: 'MIT Expat core + commercial packages/ee/', zh: 'MIT Expat 开源核心 + packages/ee 商业目录' },
      pricePills: {
        en: ['MIT core $0', 'Plus $20 ($16.67 ann, 5u)', 'Team $200 ($166.67 ann, 25u)'],
        zh: ['MIT 核心自建 $0', 'Plus $20/月(年付$16.67,5人)', 'Team $200/月(年付$166.67,25人)'],
      },
      chooseIf: {
        en: [
          'You require true OSI-approved MIT core licensing outside enterprise directories.',
          'A 5–25 person team wants shared projects, SSO & standard roles at $200/mo (Cloud or on-prem, 50,000 credits/mo included).',
          'You want clean AI Agents, Tables & MCPs bundled inside Plus ($20/mo) or Team plans.',
        ],
        zh: [
          '法务要求 OSI 认证的 MIT 宽松开源核心（剥离 packages/ee/ 商业目录）。',
          '5–25 人团队需要共享项目、标准角色与 SSO，预算锁定在 $200/月（云端或自建同价，每月含 5 万积分）。',
          '希望在一个后台顺带用上 AI Agents、Tables 与 MCP 协议接口。',
        ],
      },
      watchOut: {
        en: [
          'Team is capped at 50,000 credits/mo (+$0.007/credit overage), not unlimited flat; audit logs, custom RBAC, SCIM & Git Sync need custom Ultimate; production self-hosting requires S3 object storage; white-label Embed starts at $36k/year.',
        ],
        zh: [
          'Team 每月封顶 5 万积分（超出 $0.007/积分），并非无限扁平价；审计日志、自定义 RBAC、SCIM 与 Git 同步需 Ultimate 定制报价；生产自建强依赖 S3 对象存储；SaaS 贴牌 Embed 年度合同 $36,000 起。',
        ],
      },
      ctaLabel: { en: 'View Activepieces Pricing', zh: '查看 Activepieces 官方报价' },
      ctaUrl: 'https://www.activepieces.com/pricing',
      ctaSponsored: false,
      secondaryLabel: { en: 'BuilderStack Activepieces Audit', zh: '看 Activepieces 五项核对' },
      secondaryUrl: '/oss/activepieces/',
      disclosure: {
        en: 'Standard reference link · Checked against activepieces.com/pricing (2026-11-15).',
        zh: '普通参考链接 · 核对自 activepieces.com/pricing（2026-11-15）。',
      },
    },
    trap: {
      title: {
        en: 'Critical Cost & License Cliff: Shared workflows + SSO (€667/mo vs $200/mo)',
        zh: '最关键分水岭：多人共享流程 + SSO 的断崖式定价（€667 对 $200）',
      },
      body: {
        en: 'Most teams start self-hosting n8n Community for $0, then discover two walls: Community omits Projects, workflow/credential sharing, Git & SSO (jumping to €667/month annual Business, or about €333.50/month on the Startup Plan for companies under 20 staff), AND Sustainable Use License 1.0 forbids external clients editing workflows. Activepieces separates MIT core cleanly and bundles 25 users + SSO on its $200/mo Team tier (Cloud or on-prem), capped at 50,000 credits/mo with $0.007/credit overage; production self-hosting also needs S3 object storage.',
        zh: '很多团队 $0 自建 n8n 社区版后才发现两个坎：一是社区版没有跨成员项目隔离、凭据共享与 SSO，一跨过这个需求自建 Business 就跳到每月 667 欧元（年付；员工少于 20 人可申请 Startup Plan，约每月 333.50 欧元）；二是 SUL 禁止外部客户自己登录配置流程。而 Activepieces 核心代码是正宗 MIT，Team $200/月（云端或自建同价）即可含 25 人、共享项目与 SSO，但每月封顶 5 万积分、超出 $0.007/积分，生产自建另需 S3 对象存储。',
      },
      citation: {
        label: 'n8n Community vs Activepieces',
        url: 'https://docs.n8n.io/deploy/host-n8n/community-edition-features',
        date: '2026-11-15',
        quote: 'n8n Community leaves out Projects, workflow/credential sharing, SAML SSO and Git version control (unlocked on Business at €667/mo annual). Activepieces Team is $200/mo for 25 users with SSO, including 50,000 credits/mo.',
      },
    },
    calcMeta: {
      title: { en: 'Team Automation & SSO Cost Estimator', zh: '团队成员与 SSO 月成本对照试算' },
      subtitle: {
        en: 'Compares monthly-equivalent cost across n8n (EUR € billed annually ≈ USD at 1 EUR ≈ $1.08, with cloud execution tiers) and Activepieces (USD monthly list rates vs annual).',
        zh: '按月等效成本对照（按 €1 ≈ $1.08 换算 n8n 年付欧元标价，并与 Activepieces 美元月付/年付及云端高执行量档联动），观察费用跳变点。',
      },
      sliderLabel: { en: 'Team builders & automation users', zh: '参与搭建/使用人数' },
      min: 1,
      max: 30,
      step: 1,
      defaultSlider: 8,
      scaleTicks: {
        en: ['1 Solo', '5', '15', '25 Team', '30'],
        zh: ['1 单人', '5', '15', '25 人', '30'],
      },
      presets: [
        { id: 'solo', labelEn: '1 Solo Dev', labelZh: '1 个人开发者', sliderValue: 1, toggles: { sharing: false, selfhost: true, highExec: false } },
        { id: 'small5', labelEn: '5 Team Cloud', labelZh: '5 人云端', sliderValue: 5, toggles: { sharing: false, selfhost: false, highExec: false } },
        { id: 'shared10', labelEn: '10 Shared + SSO', labelZh: '10 人共享+SSO', sliderValue: 10, toggles: { sharing: true, selfhost: true, highExec: false } },
        { id: 'scale25', labelEn: '25 Ops Team', labelZh: '25 人团队', sliderValue: 25, toggles: { sharing: true, selfhost: false, highExec: true } },
      ],
      toggles: [
        {
          key: 'sharing',
          labelEn: 'Require team workflow sharing & SSO',
          labelZh: '需要跨成员工作流共享与 SSO',
          hintEn: 'n8n SSO uses self-hosted Business or Cloud Enterprise (quote). Activepieces Team covers up to 25 users.',
          hintZh: 'n8n SSO 使用自建 Business 或云端 Enterprise（询价）。Activepieces Team 支持最多 25 人。',
          defaultValue: false,
        },
        {
          key: 'selfhost',
          labelEn: 'Self-host on $24/mo Linux VPS (4 GB)',
          labelZh: '部署在自有 $24/月 4GB 服务器',
          hintEn: 'Turn off to compare managed Cloud plans instead of a $24/mo 4 GB VPS',
          hintZh: '关闭后切换为双方官方托管云套餐对比',
          defaultValue: true,
        },
        {
          key: 'highExec',
          labelEn: 'High cloud volume (>2,500 workflow runs/mo)',
          labelZh: '高频云端执行（月超 2,500 次运行）',
          hintEn: 'For cloud without SSO, moves from Starter (€20/mo, 2.5k runs) to Pro (€50/mo, 10k runs).',
          hintZh: '无需 SSO 的云端用户，月执行超过 2,500 次时由 Starter（€20）升至 Pro（€50）。',
          defaultValue: false,
        },
      ],
    },
    matrix: [
      {
        group: 'license',
        dimension: { en: 'License & External Use Rules', zh: '协议性质与对外商用限制' },
        citations: [
          {
            label: 'Activepieces MIT',
            url: 'https://github.com/activepieces/activepieces/blob/main/LICENSE',
            date: '2026-11-15',
            quote: 'Code outside packages/ee/ is MIT Expat. n8n uses Sustainable Use License 1.0 barring external user workflow config.',
          },
        ],
        leftVerdict: 'caution',
        leftHeadline: { en: 'Sustainable Use License 1.0 (fair-code)', zh: 'Sustainable Use License 1.0（源码可用）' },
        leftDetail: {
          en: 'Internal use allowed. External users cannot configure workflows/AI agents via UI or API without a commercial license.',
          zh: '内部自用免费，但禁止外部客户自行配置工作流或转售托管 SaaS。',
        },
        rightVerdict: 'good',
        rightHeadline: { en: 'MIT Expat core + packages/ee/', zh: '核心 MIT Expat + ee 商业目录' },
        rightDetail: {
          en: 'OSI-approved MIT for all non-ee packages; enterprise features reside separately under packages/ee/LICENSE.',
          zh: '剥离 ee 目录后的核心完全符合 OSI MIT 规范；企业功能单独置于商业目录。',
        },
      },
      {
        group: 'license',
        dimension: { en: 'Workflow & Credential Sharing', zh: '流程与凭据多人共享' },
        citations: [
          {
            label: 'n8n Community Limits',
            url: 'https://docs.n8n.io/deploy/host-n8n/community-edition-features',
            date: '2026-11-15',
            quote: 'n8n Community omits Projects and cross-user workflow/credential sharing; only creator & owner see credentials.',
          },
        ],
        leftVerdict: 'caution',
        leftHeadline: { en: 'Paid-only on self-hosted n8n (€667/mo)', zh: '自建社区版缺失（需 €667/月 Business）' },
        leftDetail: {
          en: 'Community restricts a workflow and credential to its creator and instance owner unless you license Business.',
          zh: '社区版无 Projects 权限隔离，凭据与流程仅创建人和实例所有者能改。',
        },
        rightVerdict: 'good',
        rightHeadline: { en: 'Included in $200/mo 25-user Team', zh: '$200/月 Team 版直接包含项目共享' },
        rightDetail: {
          en: 'Unlimited projects, global connections and standard roles bundle into the $200/mo Team plan (50,000 credits/mo included, $0.007/credit overage).',
          zh: '无限项目空间、全局凭据复用与标准角色包含在 $200/月 Team 套餐内（每月含 5 万积分，超出 $0.007/积分）。',
        },
      },
      {
        group: 'pricing',
        dimension: { en: 'Cloud Entry & Team Pricing', zh: '官方云端起步与团队价' },
        citations: [
          {
            label: 'Activepieces Pricing',
            url: 'https://www.activepieces.com/pricing',
            date: '2026-11-15',
            quote: 'Activepieces Free $0 (1k credits, 5u), Plus $20/mo ($16.67 ann, 10k credits, 5u), Team $200/mo ($166.67 ann, 50k credits + $0.007/credit overage, 25u + SSO).',
          },
        ],
        leftVerdict: 'good',
        leftHeadline: { en: '€20 Starter (2.5k exec) / €50 Pro', zh: '€20 Starter（2.5k次）/ €50 Pro' },
        leftDetail: {
          en: 'Billed per workflow execution count annually; queue workers require higher plans or self-hosting.',
          zh: '按工作流执行次数阶梯计价（年付 €20–€50/月），团队 SSO 跨档较贵。',
        },
        rightVerdict: 'good',
        rightHeadline: { en: '$0 Free / $20 Plus / $200 Team (25u)', zh: '$0 免费 / $20 Plus / $200 Team (25人)' },
        rightDetail: {
          en: 'Monthly plan prices ($16.67 / $166.67 billed annually) with BYO AI keys on Plus+; Team bundles 25 seats + SSO at $200/mo but caps usage at 50,000 credits/mo ($0.007/credit overage).',
          zh: '支持自带 AI Key；Plus $20/月（年付 $16.67）封顶 5 人，Team $200/月（年付 $166.67）涵盖 25 席与 SSO，但每月封顶 5 万积分（超出 $0.007/积分）。',
        },
      },
      {
        group: 'pricing',
        dimension: { en: 'Self-Hosted Hardware Baseline', zh: '自建服务器硬件门槛' },
        citations: [
          {
            label: 'n8n Docker Docs',
            url: 'https://docs.n8n.io/deploy/host-n8n/install-options/install-using-docker-compose',
            date: '2026-11-15',
            quote: 'n8n’s Docker Compose guide lists 2 vCPUs and 4 GB of RAM for a stack that includes the AI Assistant sandbox-runner-1 (Docker-in-Docker, dev/test); BuilderStack still recommends 4 GB in production for Node.js + Postgres + Queue Mode headroom.',
          },
        ],
        leftVerdict: 'good',
        leftHeadline: { en: '2 vCPU / 4 GB RAM (SQLite or Postgres)', zh: '2 核 4 GB 内存（Docker + Postgres）' },
        leftDetail: {
          en: 'Single Docker command boots locally on SQLite; production Compose template uses Postgres + Redis workers.',
          zh: '本地一条命令即可跑起，生产环境推荐 Postgres 与队列 Worker 模式。',
        },
        rightVerdict: 'caution',
        rightHeadline: { en: 'Postgres + Redis + S3 (production)', zh: 'Postgres + Redis + S3（生产必需）' },
        rightDetail: {
          en: 'A hobby container boots on a 2 vCPU / 4 GB VPS, but the official Production Setup requires PostgreSQL, Redis and S3-compatible object storage (billed outside the VPS).',
          zh: '体验单容器可在 2 核 4 GB 主机拉起，但官方 Production Setup 要求 PostgreSQL、Redis 与 S3 兼容对象存储（存储费用另计）。',
        },
      },
      {
        group: 'pricing',
        dimension: { en: 'SSO, Git Sync, External Secrets & Embed', zh: 'SSO、Git 同步、外部密钥与白标嵌入' },
        citations: [
          {
            label: 'n8n Pricing',
            url: 'https://n8n.io/pricing/',
            date: '2026-11-17',
            quote: 'n8n self-hosted Business €667/mo annual unlocks SSO & Git (<100 staff); External secrets, log streaming & multi-main HA require n8n Enterprise (contact sales); Activepieces Embed starts at $36k/year.',
          },
        ],
        leftVerdict: 'caution',
        leftHeadline: { en: '€667/mo Business (SSO/Git) · External secrets: Enterprise', zh: '€667/月 Business 含 SSO/Git · 外部密钥须签企业版' },
        leftDetail: {
          en: 'SAML/LDAP SSO and Git version control unlock at €667/month annual Business; External secrets, log streaming and multi-main HA require n8n Enterprise (contact sales).',
          zh: 'SAML/LDAP SSO 与 Git 版本控制于 Business（€667/月年付）解锁；外部密钥库（External secrets）、日志流推送与多主节点高可用则须联系销售采购 n8n Enterprise。',
        },
        rightVerdict: 'caution',
        rightHeadline: { en: '$200/mo SSO · Audit/SCIM/Git: Ultimate · Embed $36k/yr', zh: '$200/月含 SSO · 审计/SCIM/Git 需 Ultimate · OEM 嵌入 $3.6万/年' },
        rightDetail: {
          en: 'Standard roles + SSO unlock early at $200/mo Team; audit logs, custom RBAC, SCIM and Git Sync move to custom-quoted Ultimate; Embed starts at $36k/year.',
          zh: '标准角色与 SSO $200/月 Team 即得；审计日志、自定义 RBAC、SCIM 与 Git 同步需定制报价的 Ultimate，OEM 嵌入年度合同 $3.6 万美元起。',
        },
      },
      {
        group: 'license',
        dimension: { en: 'AI Agents & Ecosystem Maturity', zh: 'AI Agent 与生态节点成熟度' },
        citations: [
          {
            label: 'n8n Repo',
            url: 'https://github.com/n8n-io/n8n',
            date: '2026-11-15',
            quote: 'n8n ships extensive native nodes & LangChain AI agents; Activepieces advertises 770+ integrations, Flows, Tables & MCP.',
          },
        ],
        leftVerdict: 'good',
        leftHeadline: { en: 'Richest node library & debugging UI', zh: '节点库最全，调试重试面板极成熟' },
        leftDetail: {
          en: 'Unmatched long-tail SaaS nodes, inline JS/Python scripting and LangChain agent tooling.',
          zh: '长尾 SaaS 集成多、单步 pin 数据调试强，工程复杂流程首选。',
        },
        rightVerdict: 'good',
        rightHeadline: { en: '770+ integrations, Tables & MCP native', zh: '770+ 集成，原生带 Tables 与 MCP' },
        rightDetail: {
          en: 'Modern TypeScript piece SDK makes writing custom TypeScript connectors fast alongside built-in Tables & MCP.',
          zh: '基于 TypeScript 的 Piece 插件体系写新节点极快，内置表格与 MCP 工具调用。',
        },
      },
    ],
    faqs: [
      {
        q: { en: 'Is n8n truly open source compared to Activepieces?', zh: 'n8n 和 Activepieces 在开源协议上有什么本质区别？' },
        a: {
          en: 'Activepieces releases its core (everything outside packages/ee/) under the OSI-approved MIT Expat license. n8n uses the Sustainable Use License 1.0 (fair-code), which allows internal business use and agency-operated flows but restricts letting external paying customers build workflows.',
          zh: 'Activepieces 在剥离 packages/ee/ 商业目录后全部采用 OSI 认可的 MIT Expat 协议；而 n8n 采用源码可用的 Sustainable Use License 1.0，允许内部及机构托管代跑，但禁止外部付费客户自行配置工作流。',
        },
      },
      {
        q: { en: 'Which is cheaper for a 10-person team needing shared workflows and SSO?', zh: '10 人团队需要工作流共享和 SSO 时谁更便宜？' },
        a: {
          en: 'Activepieces is far cheaper: its Team plan is $200/month (Cloud or on-prem) including 25 users, unlimited shared projects, global connections and SSO, capped at 50,000 credits/month with $0.007/credit overage. n8n Community omits project sharing and SSO, requiring Business at €667/month billed annually (about €333.50/month on the Startup Plan for companies under 20 staff).',
          zh: 'Activepieces 便宜得多：Team 档 $200/月（云端或自建同价）即含 25 人、无限共享项目与 SSO，但每月封顶 5 万积分、超出 $0.007/积分；而 n8n 社区版不支持跨人流程共享与 SSO，自建或上 Business 需每月 667 欧元（年付；员工少于 20 人可申请 Startup Plan，约每月 333.50 欧元）。',
        },
      },
      {
        q: { en: 'Should teams migrating from hosted AI agent builders pick n8n or Activepieces?', zh: '从早期 AI 流程编排工具迁移时该选 n8n 还是 Activepieces？' },
        a: {
          en: 'Pick self-hosted n8n Community when one or two engineers run complex webhook + AI agent pipelines internally and want $0 execution caps. Pick Activepieces if non-technical teammates need shared workspaces or you require an MIT codebase.',
          zh: '若只有 1–2 名工程师维护复杂后端管道与 AI Agent，零执行次数限制的 n8n 社区自建最稳妥；若业务同学需多人协作面板或要求纯粹 MIT 核心，选 Activepieces。',
        },
      },
      {
        q: { en: 'What hardware does self-hosted n8n need vs Activepieces?', zh: '自建 n8n 和 Activepieces 对服务器配置要求一样吗？' },
        a: {
          en: 'n8n fits on a 2 vCPU, 4 GB RAM Linux VPS running Docker Compose with PostgreSQL (plus Redis for Queue Mode). Activepieces’ official Production Setup additionally makes S3-compatible object storage mandatory alongside PostgreSQL and Redis.',
          zh: 'n8n 生产环境建议至少 2 核 4 GB 内存的 Linux 服务器（Docker Compose 配 PostgreSQL，Queue Mode 再加 Redis）；Activepieces 官方 Production Setup 则在 PostgreSQL 与 Redis 之外强制要求 S3 兼容对象存储。',
        },
      },
    ],
  },

  // =========================================================================
  // 3. Papermark vs DocSend
  // =========================================================================
  {
    slug: 'papermark-vs-docsend',
    categoryId: 'data-room',
    categoryLabel: { en: 'Document sharing & data rooms', zh: '文档追踪与资料室' },
    checkedAt: '2026-11-15',
    metaTitle: {
      en: 'Papermark vs DocSend: Self-Host Stack & Seat Pricing',
      zh: 'Papermark 对比 DocSend：价格与自建',
    },
    metaDescription: {
      en: 'Papermark vs DocSend breakdown in Nov 2026: €24 Pro & €99 Data Rooms vs DocSend $45/seat & $180 Data Rooms, plus Papermark Postgres + S3 + Tinybird reality.',
      zh: '2026年11月实测 Papermark 对比 DocSend：云端 €24–€99 对比 $45/席及 $180 资料室，揭秘 Papermark 自建所需的 Tinybird/S3 组件。',
    },
    title: { en: 'Papermark vs DocSend', zh: 'Papermark 对比 DocSend' },
    subtitle: {
      en: 'Papermark Cloud undercuts DocSend sharply on custom domains and data rooms (€59–€99 vs $150–$180+); just note self-hosting Papermark still requires S3 and Tinybird.',
      zh: '想省掉 DocSend 高昂按人月费直接选 Papermark Cloud（€59–€99 含 3 人对比 $150–$180+）；但自建开源版仍需串起 Postgres、S3 和 Tinybird 四个云组件。',
    },
    winnerTag: { en: 'Value & custom domain: Papermark Cloud', zh: '性价比首选 Papermark 云端' },
    pricingHighlight: { en: '€24–€99/mo vs DocSend $45–$180+/mo', zh: '€24–€99/月 对 $45–$180+/月' },
    starsBadge: 'papermark/papermark · 9,367 ★ AGPLv3 + ee/',
    stickyWinnerBadge: { en: 'Papermark Cloud ~45–60% lower', zh: 'Papermark 云端总价显著更低' },
    stickyCtaLabel: { en: 'Check Papermark Pricing', zh: '查看 Papermark 方案' },
    stickyCtaUrl: 'https://www.papermark.com/pricing',
    stickyCtaSponsored: false,
    linkedProjectIds: ['papermark'],
    left: {
      id: 'papermark',
      name: 'Papermark',
      monogram: 'PM',
      projectId: 'papermark',
      highlighted: true,
      winnerBadge: { en: 'Winner: Cost & startups', zh: '高性价比与初创融资胜出' },
      tagline: { en: 'AGPLv3 core + commercial ee/ directory', zh: 'AGPLv3 核心 + ee 商业目录' },
      pricePills: {
        en: ['Pro €24/mo (1u)', 'Business €59 (3u)', 'Data Rooms €99 (3u)'],
        zh: ['Pro €24/月(1人)', 'Business €59(3人)', 'Data Rooms €99(3人)'],
      },
      chooseIf: {
        en: [
          'You want unlimited data rooms, unlimited visitors & custom branding starting at €24–€59/mo.',
          'You need Virtual Data Rooms with NDA agreements & dynamic watermarks at €99/mo for 3 seats.',
          'You want an inspectable AGPL codebase plus API / MCP / CLI automation.',
        ],
        zh: [
          '融资路演或 B2B 获客需要逐页阅读统计、去品牌与自定义域名（Pro €24 / Business €59 起）。',
          '尽调阶段需要 NDA、动态水印与精细权限资料室（€99/月含 3 席）。',
          '看重代码可审计（AGPLv3），同时需要 REST API / CLI 与 MCP 接口。',
        ],
      },
      watchOut: {
        en: [
          'Self-hosting requires PostgreSQL, S3/Vercel Blob, Resend email AND Tinybird CLI; white-label sits under ee/.',
        ],
        zh: [
          '自建强依赖外部 S3、Resend 邮件与 Tinybird 数据管线；企业全白标代码位于商业目录 ee/。',
        ],
      },
      ctaLabel: { en: 'Try Papermark Pricing', zh: '查看 Papermark 定价' },
      ctaUrl: 'https://www.papermark.com/pricing',
      ctaSponsored: false,
      secondaryLabel: { en: 'GitHub Repository', zh: 'GitHub 仓库' },
      secondaryUrl: 'https://github.com/papermark/papermark',
      disclosure: {
        en: 'Standard reference link (no affiliate tracking) · Annual rates checked against papermark.com/pricing (2026-11-15).',
        zh: '普通参考链接（无返佣追踪）· 按年计费价格核对自 papermark.com/pricing（2026-11-15）。',
      },
    },
    right: {
      id: 'docsend',
      name: 'DocSend',
      monogram: 'DS',
      highlighted: false,
      winnerBadge: { en: 'Winner: Dropbox M&A procurement', zh: '大厂 M&A 尽调体系内' },
      tagline: { en: 'Dropbox-owned closed SaaS', zh: 'Dropbox 旗下老牌闭源资料室' },
      pricePills: {
        en: ['Personal $10/u', 'Standard $45/u', 'Data Rooms $180 (3u)'],
        zh: ['Personal $10/人', 'Standard $45/人', 'Data Rooms $180(3人)'],
      },
      chooseIf: {
        en: [
          'Institutional LP/M&A counterparties expect DocSend links under existing Dropbox contracts.',
          'You only need single-user basic pitch tracking ($10/mo Personal) without branding or custom domain.',
          'You rely heavily on built-in eSignatures bundled inside Standard ($45/seat).',
        ],
        zh: [
          '机构尽调或大企业法务明确要求延续原有 Dropbox / DocSend 采购账户。',
          '只需个人版最基础的单文件统计且不在意去品牌（年付 $10/人/月）。',
          '高频使用 Standard 档（$45/席/月）自带的无限电子签 eSignatures 功能。',
        ],
      },
      watchOut: {
        en: [
          'Zero self-hosting; multi-file sharing and custom branding jump straight to $45/user/month (annual).',
        ],
        zh: [
          '完全闭源无自建；多文件链接与自定义品牌起步即 $45/席/月（年付）。',
        ],
      },
      ctaLabel: { en: 'View DocSend Official Site', zh: '访问 DocSend 官网' },
      ctaUrl: 'https://www.docsend.com/',
      ctaSponsored: false,
      secondaryLabel: { en: 'BuilderStack Papermark Audit', zh: '看 Papermark 五项核对' },
      secondaryUrl: '/oss/papermark/',
      disclosure: {
        en: 'Standard reference link · Annual base tiers verified Nov 2026.',
        zh: '普通参考链接 · 按公开年付档位价格核对于 2026 年 11 月。',
      },
    },
    trap: {
      title: {
        en: 'Self-Hosting Reality Check: Papermark is NOT a single Docker container',
        zh: '自建避坑提醒：Papermark 并非单容器开箱即跑',
      },
      body: {
        en: 'Developers expecting to run one SQLite container to dodge DocSend subscriptions hit four required cloud services in Papermark’s README: Node.js + PostgreSQL, AWS S3 or Vercel Blob storage, Resend email, and Tinybird analytics pipelines initialized via Python tinybird-cli. Unless you need data residency, €59–€99/mo hosted Papermark saves ops cost.',
        zh: '不少研发以为拉起单个 Docker 容器就能零成本自建，但官方 README 明确要求配齐 Node + PostgreSQL、AWS S3 或 Vercel Blob 对象存储、Resend 发信服务，以及用 Python tinybird-cli 推送的 Tinybird 分析管线。小团队通常直接订 €59–€99/月托管比维护四家云账号更省。',
      },
      citation: {
        label: 'Papermark README',
        url: 'https://github.com/papermark/papermark#readme',
        date: '2026-11-15',
        quote: 'Prerequisites: Node.js >=18.17, PostgreSQL, AWS S3 or Vercel Blob, Resend email, plus Tinybird CLI datasources.',
      },
    },
    calcMeta: {
      title: { en: 'Pitch Deck & Data Room Cost Estimator', zh: '融资路演与资料室团队月费试算' },
      subtitle: {
        en: 'Compare Papermark Cloud, DocSend annual tiers, and self-hosted infrastructure across seats and VDR security needs.',
        zh: '按成员席位与是否需要 NDA/动态水印资料室，对照 Papermark、DocSend 与自建基础资源成本（1 EUR ≈ 1.08 USD 口径换算显示）。',
      },
      sliderLabel: { en: 'Team seats', zh: '团队席位数' },
      min: 1,
      max: 15,
      step: 1,
      defaultSlider: 5,
      scaleTicks: {
        en: ['1 Founder', '3 Included', '6', '10', '15 Team'],
        zh: ['1 创始人', '3 基准', '6', '10', '15 团队'],
      },
      presets: [
        { id: 'founder', labelEn: '1 Founder', labelZh: '1 创始人', sliderValue: 1, toggles: { vdr: false, customDomain: true } },
        { id: 'seed3', labelEn: '3 Fundraising VDR', labelZh: '3 融资资料室', sliderValue: 3, toggles: { vdr: true, customDomain: true } },
        { id: 'sales5', labelEn: '5 Sales Team', labelZh: '5 销售团队', sliderValue: 5, toggles: { vdr: false, customDomain: true } },
        { id: 'deal10', labelEn: '10 M&A Team', labelZh: '10 尽调团队', sliderValue: 10, toggles: { vdr: true, customDomain: true } },
      ],
      toggles: [
        {
          key: 'vdr',
          labelEn: 'Need Virtual Data Room + NDA + Dynamic Watermark',
          labelZh: '需要资料室（VDR）+ NDA + 动态水印',
          hintEn: 'Moves to Papermark Data Rooms (€99 + €33/u) vs DocSend $180 (3u)',
          hintZh: '开启后按双方 Data Room 安全档位对比计算',
          defaultValue: false,
        },
        {
          key: 'customDomain',
          labelEn: 'Remove vendor branding (custom logo)',
          labelZh: '去除官方标识 / 自定义品牌',
          hintEn: 'Moves 1-seat accounts from Free (€0) / Personal ($10) to Pro (€24) / Standard ($45)',
          hintZh: '开启后单人档从免费版 / Personal ($10) 升至去品牌的 Pro (€24) 与 Standard ($45)',
          defaultValue: true,
        },
      ],
    },
    matrix: [
      {
        group: 'license',
        dimension: { en: 'License Model', zh: '许可证架构' },
        citations: [
          {
            label: 'Papermark LICENSE',
            url: 'https://github.com/papermark/papermark/blob/main/LICENSE',
            date: '2026-11-15',
            quote: 'Files under ee/ and app/(ee) are licensed under ee/LICENSE.md; core outside those directories is AGPLv3.',
          },
        ],
        leftVerdict: 'caution',
        leftHeadline: { en: 'AGPLv3 core + commercial ee/', zh: 'AGPLv3 核心 + ee/ 商业目录' },
        leftDetail: {
          en: 'Inspectable core under AGPLv3; enterprise white-labeling & gated features sit under ee/LICENSE.md.',
          zh: '核心 AGPLv3 可审校，但商业与企业白标模块位于 ee/ 商业协议目录下。',
        },
        rightVerdict: 'bad',
        rightHeadline: { en: 'Closed-source SaaS', zh: '纯闭源商业 SaaS' },
        rightDetail: {
          en: 'Proprietary Dropbox service with zero source visibility or self-hosted option.',
          zh: '完全闭源，不开放源代码，也不允许私有部署。',
        },
      },
      {
        group: 'license',
        dimension: { en: 'Self-Hosting Requirements', zh: '自建依赖栈复杂度' },
        citations: [
          {
            label: 'Papermark README',
            url: 'https://github.com/papermark/papermark#readme',
            date: '2026-11-15',
            quote: 'Needs Node.js >=18.17, PostgreSQL, S3/Vercel Blob, Resend email and Tinybird CLI analytics setup.',
          },
        ],
        leftVerdict: 'bad',
        leftHeadline: { en: 'Hard (Postgres + S3 + Resend + Tinybird)', zh: '较重（Postgres + S3 + Resend + Tinybird）' },
        leftDetail: {
          en: 'Four external services needed even on self-host; no zero-external-dependency Docker image.',
          zh: '自建需同时接好四套基础设施组件（尤其 Tinybird 分析），非单机一键包。',
        },
        rightVerdict: 'bad',
        rightHeadline: { en: 'Unavailable (Cloud only)', zh: '不可自建（仅官网云）' },
        rightDetail: {
          en: 'Hosted solely on DocSend infrastructure.',
          zh: '仅可在官方云端使用。',
        },
      },
      {
        group: 'pricing',
        dimension: { en: 'Solo Branding Removal & Custom Links', zh: '个人去品牌与不限追踪链接' },
        citations: [
          {
            label: 'Papermark Pricing',
            url: 'https://www.papermark.com/pricing',
            date: '2026-11-15',
            quote: 'Papermark Free €0 (50 docs/links); Pro €24/mo (1 user, unlimited links, branding removed). DocSend Standard $45/u annual removes branding.',
          },
        ],
        leftVerdict: 'good',
        leftHeadline: { en: 'Free €0 / Pro €24/mo (no branding)', zh: '免费 €0 / Pro €24/月（去官方标）' },
        leftDetail: {
          en: 'Includes unlimited links, 100 docs and custom branding at €24/month (~$26).',
          zh: 'Pro 每月 €24 即去除 Papermark 标识，支持自定义 LOGO 与配色。',
        },
        rightVerdict: 'caution',
        rightHeadline: { en: 'Personal $10/u · Standard $45/u', zh: 'Personal $10/人 · 去品牌需 $45/人' },
        rightDetail: {
          en: 'Personal skips branding controls; multi-file & custom branding push solo founders to $45/mo Standard.',
          zh: '自定义品牌和多文件组合链接须上 Standard（年付 $45/人/月，约 €42）。',
        },
      },
      {
        group: 'pricing',
        dimension: { en: '3-Seat Business & Custom Domain', zh: '3 人团队与自定义域名' },
        citations: [
          {
            label: 'Papermark Business',
            url: 'https://www.papermark.com/pricing',
            date: '2026-11-15',
            quote: 'Papermark Business €59/mo includes 3 users (+€20/seat), 1,000 docs, custom domain, webhooks, MCP, API & CLI.',
          },
        ],
        leftVerdict: 'good',
        leftHeadline: { en: '€59/mo for 3 seats (+€20 extra)', zh: '€59/月含 3 席（超额 €20/人）' },
        leftDetail: {
          en: 'Bundles custom domain, screenshot protection, API, CLI & MCP at roughly a third of DocSend Advanced.',
          zh: '打包自定义域名、防截屏、Webhook、CLI 与 MCP 接口，3 人月成本明显更低。',
        },
        rightVerdict: 'caution',
        rightHeadline: { en: '$135/mo Standard × 3 · $150/mo Adv (3u)', zh: '3 人 Standard $135 · Advanced $150/月' },
        rightDetail: {
          en: 'Three Standard seats run $135/mo annual, or $150/mo for 3-seat Advanced Spaces.',
          zh: '3 个 Standard 席位年付约 $135/月，如需基础空间管控则升到 $150/月 Advanced。',
        },
      },
      {
        group: 'pricing',
        dimension: { en: 'Data Rooms, NDA & Dynamic Watermark', zh: '加密资料室、NDA 与动态水印' },
        citations: [
          {
            label: 'VDR Tiers',
            url: 'https://www.papermark.com/pricing',
            date: '2026-11-15',
            quote: 'Papermark Data Rooms Base Plus €99/mo (3 seats + €33/seat) includes NDA, dynamic watermark and granular permissions vs DocSend Advanced Data Rooms $180/mo (3 seats).',
          },
        ],
        leftVerdict: 'good',
        leftHeadline: { en: '€99/mo Base Plus (3 seats + €33/u)', zh: '€99/月含 3 席（加席 €33/人）' },
        leftDetail: {
          en: 'Unlimited data rooms, encrypted storage without file cap, custom VDR domain, NDA gating & dynamic watermarks.',
          zh: '不限资料室数量与单个文件体积上限，带 NDA 签署、水印及精细文件权限。',
        },
        rightVerdict: 'caution',
        rightHeadline: { en: '$180/mo Advanced Data Rooms (3u)', zh: '$180/月（含 3 席，加席另算）' },
        rightDetail: {
          en: 'Provides group visitor permissions and automatic file indexing at roughly double Papermark’s base fee.',
          zh: '包含文件自动编号、群组权限与审计记录，起步价接近 Papermark 的两倍。',
        },
      },
      {
        group: 'pricing',
        dimension: { en: 'APIs, Webhooks & Automation', zh: 'API、Webhook 与 MCP 自动化' },
        citations: [
          {
            label: 'Papermark Features',
            url: 'https://www.papermark.com/pricing',
            date: '2026-11-15',
            quote: 'Business and Data Rooms include webhooks, REST API, CLI and MCP access.',
          },
        ],
        leftVerdict: 'good',
        leftHeadline: { en: 'API, CLI, Webhooks & MCP from €59/mo', zh: '€59/月即含 Webhooks、API、CLI 与 MCP' },
        leftDetail: {
          en: 'Modern developer-friendly API plus Model Context Protocol server integration.',
          zh: '对开发团队极其友好，可直接在 Business 档里用 CLI 或 MCP 生成追踪链接。',
        },
        rightVerdict: 'caution',
        rightHeadline: { en: 'Enterprise custom for advanced API', zh: '高阶接口多绑定企业定制' },
        rightDetail: {
          en: 'Standard plans focus on web UI workflows and Dropbox integrations rather than open API scripting.',
          zh: '主攻常规网页交互及 Dropbox 原生协同，开放脚本集成空间有限。',
        },
      },
    ],
    faqs: [
      {
        q: { en: 'Can I self-host Papermark with one Docker container for free?', zh: 'Papermark 可以单机一条 Docker 命令零外链自建免费跑吗？' },
        a: {
          en: 'No. According to its GitHub README, self-hosting requires Node.js 18.17+, PostgreSQL, external object storage (AWS S3 or Vercel Blob), Resend email, and configuring a Tinybird analytics workspace with tinybird-cli.',
          zh: '不能纯离线单容器跑通统计。官方 README 说明自建除 Node.js 与 PostgreSQL 外，还依赖 S3/Vercel Blob 存储、Resend 邮件及用 Tinybird CLI 配置好的分析数据源。',
        },
      },
      {
        q: { en: 'How much cheaper is Papermark Cloud than DocSend for 3 to 5 users?', zh: '3–5 人团队买官方云，Papermark 比 DocSend 省多少？' },
        a: {
          en: 'At 3 seats for Data Rooms + NDA + dynamic watermarking, Papermark Base Plus is €99/month (~$107) versus DocSend Advanced Data Rooms at $180/month — over 40% less.',
          zh: '以 3 人需加密资料室+NDA+动态水印为例：Papermark Base Plus 为 €99/月（约 $107），对比 DocSend Advanced Data Rooms $180/月，省逾 40%。',
        },
      },
      {
        q: { en: 'Does Papermark remove all branding on paid plans?', zh: 'Papermark 商业云付多少钱才能彻底去掉官方标识与换域名？' },
        a: {
          en: 'Removing Papermark branding unlocks at Pro (€24/month for 1 user). Custom domain for documents unlocks at Business (€59/month for 3 users); custom data room domain unlocks at Data Rooms (€99/month).',
          zh: '去官方标在 Pro（€24/月）即可；绑定自定义文档域名在 Business（€59/月）；Data Rooms 专属域名在 €99/月档。',
        },
      },
      {
        q: { en: 'When should a team stay on DocSend instead of switching?', zh: '哪些团队仍然值得留在 DocSend？' },
        a: {
          en: 'Teams inside large Dropbox enterprise agreements, M&A advisors requiring automatic file indexing for institutional buyers, or solo founders needing integrated eSignatures on Standard ($45/mo).',
          zh: '已签 Dropbox 大企业采购协议的券商/律所、依赖 M&A 自动资料编号与传统机构合规背书，或重度依赖自带电子签（eSignatures）的用户。',
        },
      },
    ],
  },

  // =========================================================================
  // 4. Appsmith vs Retool
  // =========================================================================
  {
    slug: 'appsmith-vs-retool',
    categoryId: 'internal-tools',
    categoryLabel: { en: 'Internal tools', zh: '内部工具与后台' },
    checkedAt: '2026-11-17',
    metaTitle: {
      en: 'Appsmith vs Retool: Self-Host RAM, SSO & Seat Costs',
      zh: 'Appsmith 对比 Retool：自建与坐席价',
    },
    metaDescription: {
      en: 'Appsmith vs Retool pricing & self-hosting audit (Nov 2026): $0 Apache-2.0 self-host (8 GB RAM) vs Retool $10–$50/builder + $5–$15/end-user, plus SAML SSO cliffs.',
      zh: '2026年11月实测 Appsmith 对比 Retool：Apache-2.0 免费自建（需 8 GB 内存）对 Retool 按搭建者+内部使用人员双端计费及 SSO 门槛。',
    },
    title: { en: 'Appsmith vs Retool', zh: 'Appsmith 对比 Retool' },
    subtitle: {
      en: 'Self-hosted Appsmith CE eliminates per-end-user SaaS taxes on an 8 GB RAM server — just watch Appsmith’s $2,500/mo SAML SSO cliff vs Retool’s $5–$15/user pricing.',
      zh: '自建 Apache-2.0 版 Appsmith-CE 能让几十名运营/客服零软件费使用内部后台（需 8 GB 内存主机）；但如需 SAML SSO，Appsmith 起步跃升至 $2,500/月。',
    },
    winnerTag: { en: 'Standard self-host: Appsmith CE', zh: '常规内网后台首选 Appsmith CE' },
    pricingHighlight: { en: '$0 CE self-host (8 GB RAM) vs $5–$15/user Retool', zh: 'CE 自建 $0（8 GB 内存）对 $5–$15/人 Retool' },
    starsBadge: 'appsmithorg/appsmith · 41,253 ★ Apache-2.0',
    stickyWinnerBadge: { en: 'Zero per-user cost on Appsmith CE', zh: 'Appsmith CE 自建零按人头税' },
    stickyCtaLabel: { en: 'Check Appsmith Plans', zh: '查看 Appsmith 方案' },
    stickyCtaUrl: 'https://www.appsmith.com/pricing',
    stickyCtaSponsored: false,
    linkedProjectIds: ['appsmith'],
    left: {
      id: 'appsmith',
      name: 'Appsmith',
      monogram: 'AS',
      projectId: 'appsmith',
      highlighted: true,
      winnerBadge: { en: 'Winner: Zero per-user tax', zh: '自建无按人头税胜出' },
      tagline: { en: 'Apache-2.0 CE + Docker EE commercial image', zh: 'Apache-2.0 社区版 + 商业镜像' },
      pricePills: {
        en: ['CE Self-Host $0 unlimited', 'Business $15/user', 'Ent SSO $2,500/mo'],
        zh: ['CE 自建 $0 不限人数', 'Business $15/人', '企业 SSO $2,500/月'],
      },
      chooseIf: {
        en: [
          'You have 15–100+ internal staff viewing ops panels and refuse $5–$15/end-user monthly fees.',
          'You want OSI-approved Apache-2.0 code via the appsmith-ce Docker image.',
          'Google OAuth / standard 3-role access control is enough on your 8 GB RAM host.',
        ],
        zh: [
          '公司有几十上百名客服/财务要使用内部后台，不想给每位查看员工每月交 $5–$15 费用。',
          '需要正宗 Apache-2.0 宽松开源协议（部署 appsmith-ce 镜像）。',
          '有 8 GB 内存以上 Docker 主机，且内置 Google 登录与标准角色已够用。',
        ],
      },
      watchOut: {
        en: [
          'All-in-one Docker requires 8 GB RAM; SAML / OIDC SSO & SCIM jump straight to $2,500/month (100 users).',
        ],
        zh: [
          '默认一体容器需至少 8 GB 内存；SAML / OIDC SSO 和 SCIM 直接锁在 $2,500/月（100 人）企业版。',
        ],
      },
      ctaLabel: { en: 'Try Appsmith Pricing', zh: '查看 Appsmith 官方定价' },
      ctaUrl: 'https://www.appsmith.com/pricing',
      ctaSponsored: false,
      secondaryLabel: { en: 'Docker Install Docs', zh: 'Docker 安装指南' },
      secondaryUrl: 'https://docs.appsmith.com/getting-started/setup/installation-guides/docker',
      disclosure: {
        en: 'Standard reference link (no affiliate tracking) · Checked against appsmith.com/pricing (2026-11-15).',
        zh: '普通参考链接（无返佣追踪）· 核对自 appsmith.com/pricing（2026-11-15）。',
      },
    },
    right: {
      id: 'retool',
      name: 'Retool',
      monogram: 'RT',
      highlighted: false,
      winnerBadge: { en: 'Winner: Rapid Dev SaaS <15 users', zh: '15人内极速云开发 / 企业生态' },
      tagline: { en: 'Closed-source market leader (per-builder + per-user)', zh: '闭源标杆（按搭建者 + 普通使用员双计费）' },
      pricePills: {
        en: ['Team $10 builder + $5 user', 'Biz $50 + $15', 'Ent SSO Custom'],
        zh: ['Team $10+$5/人', 'Business $50+$15', '企业 SSO 面议'],
      },
      chooseIf: {
        en: [
          'You have a small team (<15 total staff) willing to pay $5–$15/user for Retool’s polished component suite.',
          'You need Retool Workflows, Mobile, external portals & Audit Logs without managing MongoDB/Redis.',
          'You already have an Enterprise budget for air-gapped self-hosting with SAML SSO + Git sync.',
        ],
        zh: [
          '15 人以内小团队不想自维服务器，看重 Retool 开箱即用的桌面/移动端与表格组件细腻度。',
          '需要零运维云端运行并按 Business 价使用 Retool Workflows、移动端、外部门户与审计日志。',
          '需要私有化、气隙隔离、Git、完整管理员角色权限或 SSO 时评估 Retool Enterprise。',
        ],
      },
      watchOut: {
        en: [
          'Business includes audit logs and app/data permissions. Full admin role scopes, Git and SSO require Enterprise.',
        ],
        zh: [
          'Business 包含审计日志与应用和数据权限。完整管理员角色权限、Git 同步与 SSO 需 Enterprise。',
        ],
      },
      ctaLabel: { en: 'View Retool Official Pricing', zh: '查看 Retool 官方定价' },
      ctaUrl: 'https://retool.com/pricing',
      ctaSponsored: false,
      secondaryLabel: { en: 'BuilderStack Appsmith Audit', zh: '看 Appsmith 五项核对' },
      secondaryUrl: '/oss/appsmith/',
      disclosure: {
        en: 'Standard reference link · Checked against retool.com/pricing (2026-11-15).',
        zh: '普通参考链接 · 核对自 retool.com/pricing（2026-11-15）。',
      },
    },
    trap: {
      title: {
        en: 'Two Pricing Cliffs Most Teams Miss: Appsmith $2,500 SSO & Retool End-User Billing',
        zh: '两个易踩坑的价格断层：Appsmith $2,500 企业 SSO 门槛 vs Retool 日常使用人员按席计费',
      },
      body: {
        en: 'Retool bills separately for Builders ($10 Team / $50 Business) AND daily Internal Users ($5 Team / $15 Business), which quietly turns a 40-person ops tool into a hefty SaaS bill — AND omits Git + SAML SSO below Enterprise. Appsmith CE self-hosts for $0 unlimited users on 8 GB RAM, but SAML/OIDC SSO sits in Appsmith’s $2,500/mo Enterprise plan.',
        zh: 'Retool 采用“搭建者（$10/$50）+ 日常使用者（$5/$15）”双端计费，团队一上 30–50 名运营就会产生高额年费，且 Git 控制与 SAML SSO 仍仅开放给企业版；Appsmith 社区自建 $0 不限人数，但须备 8 GB 内存，且若强要求 SAML SSO 会立刻跳到每月 2,500 美元（100 席）起订。',
      },
      citation: {
        label: 'Appsmith vs Retool Pricing',
        url: 'https://retool.com/pricing',
        date: '2026-11-15',
        quote: 'Retool Team $10/builder + $5/user, Business $50/builder + $15/user (Git & SSO in Enterprise). Appsmith Business $15/user (no SAML), Enterprise $2,500/mo (100 users).',
      },
    },
    calcMeta: {
      title: { en: 'Internal Tooling TCO Estimator (~20% builders / 80% end-users)', zh: '内部员工规模与权限月费试算（按 20% 研发搭建 / 80% 业务使用）' },
      subtitle: {
        en: 'Test how Appsmith CE self-hosting compares to Retool Team/Business as internal headcount and compliance grow.',
        zh: '拖动公司内部使用后台的总员工数，开关审计日志/权限或 SAML SSO，对比真实月成本。',
      },
      sliderLabel: { en: 'Total internal staff (builders + daily viewers)', zh: '总内部用户数（搭建者 + 业务使用人员）' },
      min: 5,
      max: 100,
      step: 1,
      defaultSlider: 25,
      scaleTicks: {
        en: ['5 Free cap', '25', '50', '75', '100 Ent'],
        zh: ['5 免费上限', '25', '50', '75', '100 企业'],
      },
      presets: [
        { id: 'small5', labelEn: '5 Cloud Free', labelZh: '5 人云免费', sliderValue: 5, toggles: { auditLogs: false, customRoles: false, sso: false, selfhost: false } },
        { id: 'ops25', labelEn: '25 Ops Staff', labelZh: '25 人运营后台', sliderValue: 25, toggles: { auditLogs: false, customRoles: false, sso: false, selfhost: true } },
        { id: 'audit40', labelEn: '40 + Audit Logs', labelZh: '40 人需审计日志', sliderValue: 40, toggles: { auditLogs: true, customRoles: false, sso: false, selfhost: false } },
        { id: 'sso80', labelEn: '80 + SAML SSO', labelZh: '80 人需 SAML SSO', sliderValue: 80, toggles: { auditLogs: true, customRoles: true, sso: true, selfhost: true } },
      ],
      toggles: [
        {
          key: 'auditLogs',
          labelEn: 'Require Audit Logs',
          labelZh: '需要操作审计日志（Audit Logs）',
          hintEn: 'Moves to Appsmith Business ($15/u) & Retool Business ($50+$15 annual)',
          hintZh: '开启后双方切至 Business 档（Appsmith $15/人；Retool 年付 $50+$15）',
          defaultValue: false,
        },
        {
          key: 'customRoles',
          labelEn: 'Require full organization role scopes',
          labelZh: '需要完整的组织管理员权限范围',
          hintEn: 'Appsmith Business offers custom roles up to 99 users. Retool quotes Enterprise for full organization role scopes.',
          hintZh: 'Appsmith Business 为 99 人以内提供自定义角色。Retool 的完整管理员权限需 Enterprise 询价。',
          defaultValue: false,
        },
        {
          key: 'sso',
          labelEn: 'Require SAML / OIDC SSO & SCIM',
          labelZh: '强制要求 SAML / OIDC SSO 与 SCIM',
          hintEn: 'Appsmith requires $2,500/mo Enterprise; Retool Enterprise custom quote',
          hintZh: 'Appsmith 跳至 $2,500/月（100人）；Retool 须走企业谈判报价',
          defaultValue: false,
        },
        {
          key: 'selfhost',
          labelEn: 'Self-host Appsmith ($40/mo 8 GB VM)',
          labelZh: '自建 Appsmith（计入 $40/月 8GB 服务器）',
          hintEn: 'Adds the estimated single-VM cost to the applicable Appsmith license.',
          hintZh: '在匹配的 Appsmith 授权价上计入单台云主机的估算费用。',
          defaultValue: true,
        },
      ],
    },
    matrix: [
      {
        group: 'license',
        dimension: { en: 'Open Source License', zh: '开源协议与源码掌控' },
        citations: [
          {
            label: 'Apache-2.0',
            url: 'https://github.com/appsmithorg/appsmith/blob/release/LICENSE',
            date: '2026-11-15',
            quote: 'appsmithorg/appsmith core Community Edition (appsmith-ce) is Apache-2.0 licensed.',
          },
        ],
        leftVerdict: 'good',
        leftHeadline: { en: 'Apache-2.0 (appsmith-ce image)', zh: 'Apache-2.0（appsmith-ce 镜像）' },
        leftDetail: {
          en: 'Permissive OSI open source with zero copyleft obligations when you run appsmith-ce.',
          zh: '切换至 appsmith-ce 镜像即遵循纯正 Apache-2.0 协议，可内部深度改造无传染义务。',
        },
        rightVerdict: 'bad',
        rightHeadline: { en: '100% Proprietary / Closed-Source', zh: '100% 商业闭源软件' },
        rightDetail: {
          en: 'Closed-source product; self-hosting is strictly a commercial enterprise/team license.',
          zh: '全部代码闭源，自建版本亦为闭源商业授权。',
        },
      },
      {
        group: 'license',
        dimension: { en: 'Self-Host Infrastructure & RAM', zh: '自建服务器与内存要求' },
        citations: [
          {
            label: 'Appsmith Docker',
            url: 'https://docs.appsmith.com/getting-started/setup/installation-guides/docker',
            date: '2026-11-15',
            quote: 'Default all-in-one Docker container runs MongoDB, Redis & Postgres internally; requires at least 8 GB RAM + access to cs.appsmith.com.',
          },
        ],
        leftVerdict: 'caution',
        leftHeadline: { en: 'Single Docker Compose (8 GB RAM min)', zh: '单容器快速起服，硬要求 8 GB 内存' },
        leftDetail: {
          en: 'Easy to boot, but embeds MongoDB, Redis and PostgreSQL together — plan 8 GB+ RAM unless externalizing DBs.',
          zh: 'Docker 镜像自带数据库与 Redis，官方明确要求至少 8 GB 宿主机内存并放行 cs.appsmith.com。',
        },
        rightVerdict: 'caution',
        rightHeadline: { en: 'Multi-container licensed Enterprise only', zh: '仅付费企业档开放自建部署' },
        rightDetail: {
          en: 'Team & Business run on Retool Cloud; self-hosted / air-gapped containers unlock on Enterprise.',
          zh: '日常付费档默认跑在 Retool 云端，私有与离线容器部署绑定企业合同。',
        },
      },
      {
        group: 'pricing',
        dimension: { en: 'Seat & User Billing Model', zh: '计费模式与内部用户单价' },
        citations: [
          {
            label: 'Retool Pricing',
            url: 'https://retool.com/pricing',
            date: '2026-11-15',
            quote: 'Retool bills $10/builder + $5/internal user on Team (annual) and $50/builder + $15/internal user on Business.',
          },
        ],
        leftVerdict: 'good',
        leftHeadline: { en: 'Free unlimited CE / $15 uniform Business', zh: '自建社区版不限人 / Business 统一 $15/人' },
        leftDetail: {
          en: 'One flat per-user tier on Business ($15/u, up to 99 users) — no separate builder vs viewer penalties.',
          zh: 'Appsmith 自建免费版零席位限制；Business 档统一 $15/人/月（99人内），不区分开发或普通查看者。',
        },
        rightVerdict: 'caution',
        rightHeadline: { en: 'Two-part: Builders ($10–$50) + Users ($5–$15)', zh: '双轨税：搭建者 $10–$50 + 使用者 $5–$15' },
        rightDetail: {
          en: 'Every employee who opens an app monthly adds $5 (Team) or $15 (Business) on top of builder seats.',
          zh: '每位日常点开管理后台的运营同事都算作内部用户，Team 档加 $5/人，Business 档加 $15/人。',
        },
      },
      {
        group: 'pricing',
        dimension: { en: 'Git, Custom Roles & Audit Logs', zh: 'Git 同步、自定义角色与审计日志' },
        citations: [
          {
            label: 'Appsmith Pricing',
            url: 'https://www.appsmith.com/pricing',
            date: '2026-11-17',
            quote: 'Appsmith Free includes 3 Git repos; Business ($15/u) unlocks unlimited Git, audit logs, custom roles & white-label.',
          },
          {
            label: 'Retool Permissions Quickstart',
            url: 'https://docs.retool.com/permissions/quickstart',
            date: '2026-11-18',
            quote: 'Business supports custom groups and access scopes. Enterprise adds sensitive organization-wide scopes.',
          },
        ],
        leftVerdict: 'good',
        leftHeadline: { en: '3 Git repos Free · Custom roles & Audit $15/u Biz', zh: '免费版带 3 Git · 自定义角色与审计在 $15/人' },
        leftDetail: {
          en: 'Even Free gives Git sync (up to 3 repos); Business ($15/u) unlocks audit logs, workflows & Granular Custom Roles (RBAC).',
          zh: '免费版即体验 3 个 Git 同步；商业合规所需审计日志与细粒度自定义角色（Granular Custom Roles）仅需 $15/人 Business。',
        },
        rightVerdict: 'caution',
        rightHeadline: { en: 'Business audit logs and access controls · Full admin scopes on Enterprise', zh: 'Business 提供审计和访问控制 · 完整管理员权限在 Enterprise' },
        rightDetail: {
          en: 'Business ($50/$15 per month billed annually) adds audit logs, custom groups and app/data access controls. Full administrative scopes, Git and SSO require Enterprise.',
          zh: 'Business（按年计费的月价 $50/$15）包含审计日志、自定义组和应用及数据访问权限。完整管理员角色权限、Git 和 SSO 需 Enterprise。',
        },
      },
      {
        group: 'pricing',
        dimension: { en: 'SAML / OIDC SSO & SCIM', zh: 'SAML / OIDC 单点登录与 SCIM' },
        citations: [
          {
            label: 'Enterprise SSO Gate',
            url: 'https://www.appsmith.com/pricing',
            date: '2026-11-15',
            quote: 'Appsmith SAML/OIDC SSO & SCIM start at Enterprise ($2,500/month for 100 users); Retool lists SSO/SCIM under Enterprise.',
          },
        ],
        leftVerdict: 'caution',
        leftHeadline: { en: 'Locked in $2,500/mo Enterprise (100u)', zh: '锁死在 $2,500/月企业档（含 100 人）' },
        leftDetail: {
          en: 'Free offers Google OAuth only; SAML/OIDC & group sync jump straight from $15/u Business to $2,500/mo.',
          zh: '免费与 Business 只带 Google SSO 等基础登录，SAML/OIDC 一跳即每月 2,500 美元。',
        },
        rightVerdict: 'caution',
        rightHeadline: { en: 'Locked in Custom Enterprise quote', zh: '同样锁在定制 Enterprise 企业档' },
        rightDetail: {
          en: 'Both Team and Business explicitly exclude SSO, SCIM and 2FA enforcement; requires Enterprise deal.',
          zh: 'Retool 价格表写明 Team 与 Business 均不含 SSO/SCIM，需签企业协议。',
        },
      },
      {
        group: 'license',
        dimension: { en: 'AI Credits & Workflow Engine', zh: 'AI 额度与内置后端工作流' },
        citations: [
          {
            label: 'Retool AI Credits',
            url: 'https://retool.com/pricing',
            date: '2026-11-15',
            quote: 'Retool pools 250 / 1,000 / 3,000 AI credits/mo across Free/Team/Business; BYO AI key only on Enterprise.',
          },
        ],
        leftVerdict: 'good',
        leftHeadline: { en: 'Workflows in Business · Self-managed integrations', zh: 'Workflows 在 Business · 可直连自有 AI Key' },
        leftDetail: {
          en: 'Connect any LLM API endpoint via REST datasource directly without rigid credit-pack throttling.',
          zh: '通过 REST 数据源自由调任何模型 API，不受 SaaS 按次积分墙卡脖子。',
        },
        rightVerdict: 'good',
        rightHeadline: { en: 'Polished Retool Workflows + 1k–3k AI credits', zh: '原生 Retool Workflows，月送 1k–3k AI 点数' },
        rightDetail: {
          en: 'Tightly integrated JS/SQL workflows and UI components; BYO AI provider keys require Enterprise.',
          zh: '云端组件库和后台定时任务体验最顺滑，自带 AI Key 需企业版。',
        },
      },
    ],
    faqs: [
      {
        q: { en: 'How much RAM does self-hosted Appsmith really need?', zh: '自建 Appsmith 到底要多大内存的服务器？' },
        a: {
          en: 'Appsmith’s official Docker installation documentation states at least 8 GB of host RAM for the default all-in-one container because it bundles MongoDB, Redis and PostgreSQL inside the container.',
          zh: '官方文档明文要求至少 8 GB 宿主机内存，因为默认一体容器里同时打包了 Appsmith、MongoDB、Redis 和 PostgreSQL。',
        },
      },
      {
        q: { en: 'Is Appsmith completely Apache-2.0 open source?', zh: 'Appsmith 默认安装就全都是 Apache-2.0 吗？' },
        a: {
          en: 'Not automatically unless you check the image tag. The Docker install docs pull appsmith-ee (the free Commercial image) by default; replace appsmith-ee with appsmith-ce in docker-compose.yml for pure Apache-2.0 code.',
          zh: '不是默认全 Apache-2.0——Docker 教程默认拉的是免费商业版镜像 appsmith-ee，若要纯正 Apache-2.0 需手动改为 appsmith-ce。',
        },
      },
      {
        q: { en: 'When does Appsmith cost less than Retool?', zh: '什么情况下用 Appsmith 比 Retool 省钱？' },
        a: {
          en: 'Whenever you have 15+ daily internal viewers and standard auth (no SAML SSO) suffices: self-hosted Appsmith CE charges $0 per user, whereas Retool Team/Business charges $5 to $15 per internal user every month.',
          zh: '只要日常使用后台的员工超过 15 人且无需 SAML SSO，自建 Appsmith CE 按 0 美元人头计费能立刻省下 Retool 每月 $5–$15/人的端到端坐席成本。',
        },
      },
      {
        q: { en: 'Does Retool Business include Git source control or SAML SSO?', zh: '买到 Retool $50+$15 的 Business 档就能用 Git 管理和 SSO 吗？' },
        a: {
          en: 'No. Retool’s November 2026 pricing matrix explicitly marks both Git source control and SSO/SCIM/2FA as “Not included” on Team and Business; both require Retool Enterprise.',
          zh: '不能。Retool 定价矩阵写明 Team 与 Business 档均不含 Git 版本同步和 SSO/SCIM/2FA，必须升到定制报价的 Enterprise。',
        },
      },
    ],
  },

  // =========================================================================
  // 5. Medusa vs Saleor
  // =========================================================================
  {
    slug: 'medusa-vs-saleor',
    categoryId: 'headless',
    categoryLabel: { en: 'Headless commerce', zh: '电商后端' },
    checkedAt: '2026-11-15',
    metaTitle: {
      en: 'Medusa vs Saleor: License, Stack Sizing & Cloud Cost',
      zh: 'Medusa 对比 Saleor：许可与云端定价',
    },
    metaDescription: {
      en: 'Headless commerce comparison: Medusa (TypeScript, MIT core + Enterprise RBAC/SSO, $29–$299 Cloud) vs Saleor (Python GraphQL, BSD-3 single edition, $1,599 Cloud).',
      zh: '2026实测无头电商引擎 Medusa 与 Saleor：TS 对 Python/GraphQL，MIT 核心锁 RBAC/SSO 对比 BSD-3 单版本全解锁但 6 服务重自建。',
    },
    title: { en: 'Medusa vs Saleor', zh: 'Medusa 对比 Saleor' },
    subtitle: {
      en: 'Medusa wins on lighter TypeScript ops and affordable $29–$299 Cloud hosting; Saleor wins if you must avoid any Enterprise RBAC/SSO license wall on self-hosting.',
      zh: '中小开发团队图省心选 TypeScript 架构且官方云 $99–$299/月（开发档 $29）的 Medusa；只要能运维 6 服务集群且彻底不想被 RBAC/SSO 企业授权卡住选 BSD-3 单版本 Saleor。',
    },
    winnerTag: { en: 'Lighter ops & Cloud: Medusa', zh: '轻量化部署与托管推荐 Medusa' },
    pricingHighlight: { en: '$29–$299 Cloud vs $1,599/mo + 0.8% Saleor', zh: '$29–$299 云托管 对 $1,599/月 + 0.8%' },
    starsBadge: 'Medusa MIT+Ent · Saleor BSD-3-Clause',
    stickyWinnerBadge: { en: 'TS 4-piece ($29–$299) vs Python 6-piece ($1,599+)', zh: 'TS 四件套对 Python 六服务' },
    stickyCtaLabel: { en: 'View Medusa Review', zh: '查看 Medusa 五项核对' },
    stickyCtaUrl: '/oss/medusa/',
    stickyCtaSponsored: false,
    linkedProjectIds: ['medusa', 'saleor'],
    left: {
      id: 'medusa',
      name: 'Medusa',
      monogram: 'MD',
      projectId: 'medusa',
      highlighted: true,
      winnerBadge: { en: 'Winner: Small TS dev teams & Cloud', zh: 'TS 团队与中小云托管胜出' },
      tagline: { en: 'TypeScript + Next.js starter · MIT core + Enterprise RBAC/SSO', zh: 'TypeScript + Next.js 模板 · MIT 核心 + 企业 RBAC/SSO' },
      pricePills: {
        en: ['2 GB RAM self-host', 'Cloud $29 / $99 / $299', '0% GMV fee'],
        zh: ['2 GB 内存起自建', '云 $29 / $99 / $299', '成交额 0 抽成'],
      },
      chooseIf: {
        en: [
          'Your frontend and backend devs already work in TypeScript and Next.js.',
          'You want lighter self-hosting (4 pieces: server, worker, Postgres, Redis on 2 GB+ RAM).',
          'You prefer predictable Medusa Cloud tiers ($29, $99, $299/mo) with zero GMV commission.',
        ],
        zh: [
          '全栈团队主打 TypeScript / Node.js，想与 Next.js 店面共用技术栈。',
          '运维预算轻量：官方仅需 2 GB+ 内存服务器配 Postgres、Redis、应用与 Worker 四件套。',
          '不想自维运维时，Medusa Cloud 每月 29/99/299 美元且零成交额抽佣。',
        ],
      },
      watchOut: {
        en: [
          'Staff role-based access control (RBAC) and SAML SSO sit under ENTERPRISE-LICENSE.md (commercial deal required).',
        ],
        zh: [
          '员工分级权限（RBAC）与单点登录（SSO）属企业许可，未签约不得擅自开启企业开关。',
        ],
      },
      ctaLabel: { en: 'View Medusa Pricing', zh: '查看 Medusa 官方定价' },
      ctaUrl: 'https://medusajs.com/pricing/',
      ctaSponsored: false,
      secondaryLabel: { en: 'BuilderStack Medusa Audit', zh: '看 Medusa 五项核对' },
      secondaryUrl: '/oss/medusa/',
      disclosure: {
        en: 'Reference link · Verified against ENTERPRISE-LICENSE.md & medusajs.com/pricing.',
        zh: '普通参考链接 · 核对自仓库 ENTERPRISE-LICENSE.md 与官网报价。',
      },
    },
    right: {
      id: 'saleor',
      name: 'Saleor',
      monogram: 'SL',
      projectId: 'saleor',
      highlighted: false,
      winnerBadge: { en: 'Winner: Zero feature paywall', zh: '全开源无任何功能分级' },
      tagline: { en: 'Python GraphQL-only · BSD-3-Clause single edition', zh: 'Python 纯 GraphQL 架构 · BSD-3-Clause 单一开源版本' },
      pricePills: {
        en: ['BSD-3 single edition', '5 GB+ Docker local', 'Cloud $1,599/mo + 0.8%'],
        zh: ['BSD-3 全无阉割', '本机需 5 GB 内存', '云端 $1,599/月+0.8%'],
      },
      chooseIf: {
        en: [
          'You demand 100% BSD-3-Clause licensing with zero enterprise RBAC or SSO paywalls.',
          'Your engineering team runs Python / GraphQL microservices comfortably across 6 components.',
          'You prefer extending commerce via external webhook apps rather than monolithic plugins.',
        ],
        zh: [
          '法务或业务要求一个完全不拆社区版/企业版、RBAC 全开源放行的 BSD-3 引擎。',
          '资深 Python / GraphQL 团队具备运维六组件容器集群（含对象存储与调度器）能力。',
          '倾向于用 Webhook 外挂微服务应用做扩展。',
        ],
      },
      watchOut: {
        en: [
          'Heavy 6-piece production stack (5 GB+ Docker local); commercial Saleor Cloud starts at $1,599/mo + 0.8% over $200k.',
        ],
        zh: [
          '官方提醒对 1–2 人小微团队偏重（本地即需 5 GB Docker 内存）；官网商用云每月 $1,599 起外加超额 0.8% 抽佣。',
        ],
      },
      ctaLabel: { en: 'View Saleor Pricing', zh: '查看 Saleor 官方定价' },
      ctaUrl: 'https://saleor.io/pricing',
      ctaSponsored: false,
      secondaryLabel: { en: 'BuilderStack Saleor Audit', zh: '看 Saleor 五项核对' },
      secondaryUrl: '/oss/saleor/',
      disclosure: {
        en: 'Reference link · Verified against saleor/saleor README & docs.saleor.io.',
        zh: '普通参考链接 · 核对自 saleor/saleor README 及官方文档。',
      },
    },
    trap: {
      title: {
        en: 'Hidden Trade-Off: Medusa’s Enterprise RBAC Lock vs Saleor’s 6-Service Ops & $1,599 Cloud Floor',
        zh: '选型核心矛盾：Medusa 把员工分权放进企业协议 vs Saleor 全免费开源但运维与托管门槛极高',
      },
      body: {
        en: 'Both Medusa and Saleor are developer-only headless backends (neither ships a non-coder storefront). Medusa stays easy to deploy (2 GB RAM) and cheap to host ($29–$299/mo), yet locks staff RBAC and SSO under a commercial Enterprise agreement. Saleor ships a single unrestricted BSD-3 codebase, but self-hosting requires 6 moving pieces and its commercial Cloud jumps to $1,599/mo + 0.8% GMV.',
        zh: '两者都没有无需编程即可直接开店的成品主题。Medusa 胜在 TS 轻便（2 GB 内存 + $29–$299 托管），但把公司内部最常用的员工分级权限（RBAC）与 SSO 放进了闭源商业条款；Saleor 是真正的 BSD-3-Clause 全开放单一版本，但生产级自建涉及六大服务组件，且官网商业云 $1,599/月起步。',
      },
      citation: {
        label: 'Medusa Ent License',
        url: 'https://github.com/medusajs/medusa/blob/develop/ENTERPRISE-LICENSE.md',
        date: '2026-11-15',
        quote: 'Medusa ENTERPRISE-LICENSE.md governs RBAC and SSO feature flags. Saleor README notes a single BSD-3 version, recommending simpler tools for solo low-traffic shops.',
      },
    },
    calcMeta: {
      title: { en: 'Monthly Store Volume & Hosting TCO Estimator', zh: '月营业额与无头部署成本试算' },
      subtitle: {
        en: 'Compare official Cloud vs self-hosting across GMV volume (testing Saleor Cloud’s $200k threshold) and Staff RBAC needs.',
        zh: '拖动预计月交易额（GMV），测试托管免运维或要求员工 RBAC 权限下两套引擎的成本走向。',
      },
      sliderLabel: { en: 'Monthly store GMV ($ USD)', zh: '预计月成交额 GMV（美元）' },
      min: 10000,
      max: 500000,
      step: 10000,
      defaultSlider: 80000,
      scaleTicks: {
        en: ['$10k', '$100k', '$200k cap', '$350k', '$500k'],
        zh: ['$1万', '$10万', '$20万封顶', '$35万', '$50万'],
      },
      presets: [
        { id: 'indie', labelEn: '$20k Launch', labelZh: '$2万 起步', sliderValue: 20000, toggles: { cloud: false, rbac: false } },
        { id: 'mid80', labelEn: '$80k Cloud', labelZh: '$8万 托管云', sliderValue: 80000, toggles: { cloud: true, rbac: false } },
        { id: 'rbac150', labelEn: '$150k + RBAC', labelZh: '$15万 需分权', sliderValue: 150000, toggles: { cloud: false, rbac: true } },
        { id: 'high350', labelEn: '$350k Cloud', labelZh: '$35万 超20万阈值', sliderValue: 350000, toggles: { cloud: true, rbac: true } },
      ],
      toggles: [
        {
          key: 'cloud',
          labelEn: 'Use Official Managed Cloud (zero DevOps)',
          labelZh: '使用官方托管云（免自维集群）',
          hintEn: 'Medusa Cloud $99–$299 (0% GMV) vs Saleor Cloud $1,599 + 0.8% >$200k',
          hintZh: 'Medusa 云 $99–$299 零抽成对 Saleor 云 $1,599+0.8% 超额抽成',
          defaultValue: true,
        },
        {
          key: 'rbac',
          labelEn: 'Require multi-staff RBAC & SSO without Enterprise contract',
          labelZh: '不买企业合同仍要求完整员工分权与 SSO',
          hintEn: 'Medusa requires an Enterprise agreement; Saleor BSD-3 includes it free',
          hintZh: '开启后 Medusa 社区版受限需谈企业合同；Saleor BSD-3 原生包含',
          defaultValue: false,
        },
      ],
    },
    matrix: [
      {
        group: 'license',
        dimension: { en: 'License & Enterprise Walls', zh: '开源协议与功能分级墙' },
        citations: [
          {
            label: 'Saleor BSD-3',
            url: 'https://github.com/saleor/saleor/blob/main/LICENSE',
            date: '2026-11-15',
            quote: 'Saleor is single-edition BSD-3-Clause with zero gated features. Medusa core is MIT with ENTERPRISE-LICENSE.md covering RBAC & SSO.',
          },
        ],
        leftVerdict: 'caution',
        leftHeadline: { en: 'MIT core + Enterprise RBAC / SSO', zh: 'MIT 核心 + 企业许可锁 RBAC/SSO' },
        leftDetail: {
          en: 'Enabling Enterprise feature flags in Medusa constitutes claiming a paid agreement for RBAC and SSO.',
          zh: '核心免费可用可改，但打开仓库内 RBAC/SSO 企业开关须持 Medusa 官方商业合同。',
        },
        rightVerdict: 'good',
        rightHeadline: { en: 'BSD-3-Clause (Single edition)', zh: 'BSD-3-Clause（单版本全功能开放）' },
        rightDetail: {
          en: 'Zero enterprise edition split; full permissions and core commerce features ship in one codebase.',
          zh: '明确声明“只有一个版本”，没有社区/企业版功能切割。',
        },
      },
      {
        group: 'license',
        dimension: { en: 'Tech Stack & Extensibility', zh: '开发栈与扩展架构' },
        citations: [
          {
            label: 'Saleor Architecture',
            url: 'https://docs.saleor.io/setup/architecture',
            date: '2026-11-15',
            quote: 'Saleor splits core API, dashboard and storefront across repos using Python & GraphQL. Medusa provides TypeScript plugins + Next.js starter.',
          },
        ],
        leftVerdict: 'good',
        leftHeadline: { en: 'TypeScript + REST/Admin + Next.js starter', zh: 'TypeScript 全栈 + Next.js 店面模板' },
        leftDetail: {
          en: 'create-medusa-app scaffolds backend, admin UI and Next.js storefront starter in one TS ecosystem.',
          zh: '脚手架一站生成 TS 后端、管理界面与 Next.js 店面模板，插件扩展门槛较低。',
        },
        rightVerdict: 'caution',
        rightHeadline: { en: 'Python + GraphQL-only + Webhook apps', zh: 'Python + 纯 GraphQL + 外置 Webhook App' },
        rightDetail: {
          en: 'Extensions are built as separate HTTP/webhook microservices; dashboard and storefront live in separate repos.',
          zh: '扩展靠独立部署应用与 Webhook，管理后台、核心接口和店面分属三个仓库。',
        },
      },
      {
        group: 'license',
        dimension: { en: 'Self-Hosting Footprint', zh: '自建生产部署复杂度' },
        citations: [
          {
            label: 'Medusa Deploy',
            url: 'https://docs.medusajs.com/learn/deployment/general',
            date: '2026-11-15',
            quote: 'Medusa prod needs 2 GB+ RAM running Postgres, Redis, server and worker; Saleor local Docker needs 5 GB+ and prod needs 6 components.',
          },
        ],
        leftVerdict: 'good',
        leftHeadline: { en: 'Moderate: 4 services (2 GB+ RAM)', zh: '中等：4 个服务（2 GB+ 内存）' },
        leftDetail: {
          en: 'Server mode + worker mode + PostgreSQL + Redis with explicit 2 GB RAM minimum guideline.',
          zh: '服务端、后台 Worker、Postgres 与 Redis，官方起跑仅需 2 GB 内存。',
        },
        rightVerdict: 'bad',
        rightHeadline: { en: 'Hard: 6 services (5 GB+ local Docker)', zh: '门槛高：6 大组件（本机需 5 GB+ 内存）' },
        rightDetail: {
          en: 'API, background worker, task scheduler, Postgres, Redis & object storage assembled manually + separate dashboard.',
          zh: '须自行编排接口、Worker、定时调度、Postgres、Redis 与对象存储，另起后台和店面。',
        },
      },
      {
        group: 'pricing',
        dimension: { en: 'Managed Official Cloud Price', zh: '官方托管 Cloud 价格台阶' },
        citations: [
          {
            label: 'Cloud Pricing',
            url: 'https://saleor.io/pricing',
            date: '2026-11-15',
            quote: 'Medusa Cloud starts at $29, $99 and $299/mo (0% sales fee). Saleor commercial Cloud starts at $1,599/mo ($200k GMV cap + 0.8% overage).',
          },
        ],
        leftVerdict: 'good',
        leftHeadline: { en: '$29 / $99 / $299/mo (0% GMV fee)', zh: '$29 / $99 / $299/月（零营业额抽成）' },
        leftDetail: {
          en: 'Approachable startup pricing on Medusa Cloud without percentage cuts on monthly sales.',
          zh: '起步仅 $29/月，增长档 $99–$299/月，均不按 GMV 比例抽取佣金。',
        },
        rightVerdict: 'caution',
        rightHeadline: { en: '$1,599/mo ($200k cap + 0.8% overage)', zh: '$1,599/月起（含 20 万额 + 超额 0.8%）' },
        rightDetail: {
          en: 'Free sandbox is non-commercial only; lowest commercial tier jumps straight to $1,599/mo or $3,999/mo.',
          zh: '免费沙盒禁商用，商业起跳门槛即每月 $1,599（含 20 万美元成交额，超额再抽 0.8%）。',
        },
      },
      {
        group: 'pricing',
        dimension: { en: 'Telemetry & Operational Control', zh: '遥测统计与隐私控制' },
        citations: [
          {
            label: 'Saleor Telemetry',
            url: 'https://docs.saleor.io/setup/usage-telemetry',
            date: '2026-11-15',
            quote: 'Self-hosted Saleor reports anonymous usage stats by default unless SEND_USAGE_TELEMETRY=false is set.',
          },
        ],
        leftVerdict: 'good',
        leftHeadline: { en: 'Self-contained TS runtime', zh: '自包含 TS 运行时，社区文档集中' },
        leftDetail: {
          en: 'Clear separation between MIT codebase and documented Enterprise license flags.',
          zh: 'MIT 模块与商业授权界线标注清楚，部署可完全私有化控制。',
        },
        rightVerdict: 'caution',
        rightHeadline: { en: 'Opt-out telemetry via env flag', zh: '自建默认开启匿名遥测（可环境变量关闭）' },
        rightDetail: {
          en: 'Set SEND_USAGE_TELEMETRY=false in production if strict outbound silence is required.',
          zh: '对内网出站敏感的环境记得显式设置 SEND_USAGE_TELEMETRY=false 关闭统计回传。',
        },
      },
      {
        group: 'pricing',
        dimension: { en: 'Small-Team Viability (1–2 Devs)', zh: '1–2 人小研发团队适用性' },
        citations: [
          {
            label: 'Saleor README',
            url: 'https://github.com/saleor/saleor#readme',
            date: '2026-11-15',
            quote: 'Saleor README acknowledges small single-developer low-traffic shops will find its multi-service model heavier than WordPress-style monoliths.',
          },
        ],
        leftVerdict: 'good',
        leftHeadline: { en: 'Practical with 1–2 TypeScript engineers', zh: '1–2 名 TS 工程师可落地掌控' },
        leftDetail: {
          en: 'Still heavier than WooCommerce, yet manageable cleanly for custom headless storefronts.',
          zh: '相比 WooCommerce 仍属定制后端，但在 TypeScript 生态里小团队最容易上手。',
        },
        rightVerdict: 'bad',
        rightHeadline: { en: 'Overbuilt for 1–2 person low-traffic stores', zh: '官方自承：不适合人手少的小店面' },
        rightDetail: {
          en: 'Best reserved for multi-engineer Python orgs running dedicated DevOps pipelines.',
          zh: '更适合拥有专职 DevOps 与多工程师配额的中大型品牌独立站。',
        },
      },
    ],
    faqs: [
      {
        q: { en: 'Which has the more permissive open-source license: Medusa or Saleor?', zh: 'Medusa 和 Saleor 谁的开源许可限制更少？' },
        a: {
          en: 'Saleor has fewer licensing walls: its entire codebase ships as a single BSD-3-Clause edition with no locked Enterprise features. Medusa uses MIT for its core, but reserves staff RBAC and SSO under a commercial Enterprise license.',
          zh: 'Saleor 授权更彻底：只有一个 BSD-3-Clause 版本，没有社区/企业版功能锁。Medusa 核心为 MIT，但员工 RBAC 分权和 SSO 属于企业版授权范围。',
        },
      },
      {
        q: { en: 'Why is Saleor Cloud $1,599/month when Medusa Cloud starts at $29?', zh: '为什么同样是无头电商官方托管，Saleor 要 $1,599/月而 Medusa 仅 $29 起？' },
        a: {
          en: 'Medusa Cloud targets small and mid-market developer teams with $29, $99 and $299 monthly plans and 0% GMV commission. Saleor Cloud targets mid-to-enterprise merchants at $1,599/mo covering $200,000 in monthly sales plus 0.8% overage.',
          zh: '两者市场定位不同：Medusa Cloud 主打开发创业团队，按基础设施梯次月付 $29/$99/$299 且 0 抽佣；Saleor Cloud 瞄准年销百万美元级商业客户，$1,599/月含 20 万月销配额且超额收 0.8%。',
        },
      },
      {
        q: { en: 'Can a solo developer self-host either platform easily?', zh: '独立开发者适合自己托管这两套中的哪一套？' },
        a: {
          en: 'Medusa is much lighter (4 services on 2 GB+ RAM in TypeScript). Even Saleor’s own README warns single developers running smaller shops that its 6-service GraphQL stack is heavier than WooCommerce or monolith stores.',
          zh: '能选的话 Medusa 轻得多（TS 架构 4 组件、2 GB 内存起）；Saleor 官方 README 甚至提醒单人维护的小流量店面慎选多服务拆件模式。',
        },
      },
      {
        q: { en: 'Does either Medusa or Saleor include a plug-and-play storefront?', zh: '这两套系统带现成给老板装完就能卖货的前台商城吗？' },
        a: {
          en: 'No. Both are headless commerce back ends requiring developers to build and deploy the customer-facing storefront (though Medusa provides an official Next.js starter template).',
          zh: '都不自带傻瓜式免开发店面，前端都由开发者自建并对接接口（但 Medusa 官方提供现成的 Next.js 店面模板可加速起步）。',
        },
      },
    ],
  },
];

// =========================================================================
// Pure Cost Calculation Engine for Each Comparison Pair
// =========================================================================
export function evaluateVsCalculator(
  slug: string,
  sliderValue: number,
  toggles: Record<string, boolean>,
  lang: Language
): VsCalcResult {
  const zh = lang === 'zh';

  if (slug === 'cal-vs-calendly') {
    const seats = sliderValue;
    const annual = toggles.annual ?? true;
    const sso = toggles.sso ?? false;
    const vps = toggles.vps ?? false;

    let calCost = 0;
    let calPlan = '';
    let calNote = '';
    if (sso) {
      const rate = annual ? 28 : 37;
      calCost = seats * rate;
      calPlan = zh ? `Organizations ($${rate}/人)` : `Organizations ($${rate}/u)`;
      calNote = zh ? '含 SAML SSO、SCIM、子团队管理与去品牌。' : 'Includes SAML SSO, SCIM provisioning & custom subdomain.';
    } else if (seats === 1) {
      calCost = 0;
      calPlan = zh ? 'Individuals 个人免费' : 'Individuals Free';
      calNote = zh ? '1 人不限预约类型、多日历同步与 Stripe。' : 'Unlimited event types, multiple calendars & Stripe at $0.';
    } else {
      const rate = annual ? 12 : 15;
      calCost = seats * rate;
      calPlan = zh ? `Teams ($${rate}/人)` : `Teams ($${rate}/u)`;
      calNote = zh ? '含多人轮询排班、联合预约与路由表单。' : 'Round-robin assignments, collective events & routing forms.';
    }

    let clyCost = 0;
    let clyPlan = '';
    let clyNote = '';
    if (sso) {
      clyCost = seats > 50 ? Math.round((seats / 50) * 1250) : 1250;
      clyPlan = zh ? 'Enterprise ($15k/年起)' : 'Enterprise ($15k/yr floor)';
      clyNote = zh
        ? 'SAML SSO 须签企业年度合同，折合每月约 $1,250 保底（50 席起步）。'
        : 'SAML SSO & audit logs require ~$15,000/yr Enterprise contract (~50-seat floor).';
    } else if (seats === 1) {
      clyCost = annual ? 10 : 12;
      clyPlan = zh ? `Standard ($${clyCost}/人)` : `Standard ($${clyCost}/u)`;
      clyNote = zh ? 'Calendly 免费版限 1 种预约类型，对等多类型需升 Standard。' : 'Calendly Free caps at 1 event type; Standard unlocks multiple.';
    } else {
      const rate = annual ? 16 : 20;
      clyCost = seats * rate;
      clyPlan = zh ? `Teams ($${rate}/席)` : `Teams ($${rate}/seat)`;
      clyNote = zh ? '团队轮询与 CRM 路由须购买 Teams 档。' : 'Teams tier required for round-robin routing & forms.';
    }

    const diyViable = seats === 1 && !sso;
    const diyCost = vps ? 12 : 0;
    const maxVal = Math.max(calCost, clyCost, 120);
    const diff = clyCost - calCost;

    const deltaText =
      diff > 0
        ? zh
          ? `选 Cal.com Cloud 每月省 $${diff.toLocaleString()}（每年省 $${(diff * 12).toLocaleString()}）`
          : `Save $${diff.toLocaleString()}/mo ($${(diff * 12).toLocaleString()}/yr) on Cal.com Cloud`
        : diff < 0
          ? zh
            ? `此规模 Calendly 企业保底折算低 $${Math.abs(diff).toLocaleString()}/月（需谈约）`
            : `Calendly Enterprise floor runs ~$${Math.abs(diff).toLocaleString()}/mo lower above ${annual ? 44 : 33} SSO seats`
          : zh
            ? '两套方案当前档位月费接近'
            : 'Monthly baseline is tied';

    return {
      sliderFormatted: zh ? `${seats} 席位` : `${seats} ${seats === 1 ? 'seat' : 'seats'}`,
      bars: [
        {
          id: 'cal',
          name: 'Cal.com Cloud',
          planBadge: calPlan,
          costLabel: `$${calCost.toLocaleString()}/mo`,
          note: calNote,
          percent: Math.max(6, (calCost / maxVal) * 100),
          dot: 'good',
          tone: 'ink',
        },
        {
          id: 'cly',
          name: 'Calendly SaaS',
          planBadge: clyPlan,
          costLabel: sso && seats > 50 ? `~$${clyCost.toLocaleString()}/mo+` : `$${clyCost.toLocaleString()}/mo`,
          note: clyNote,
          percent: Math.max(6, (clyCost / maxVal) * 100),
          dot: diff > 0 ? 'caution' : 'good',
          tone: 'muted',
        },
        {
          id: 'diy',
          name: zh ? 'cal.diy MIT 自建' : 'cal.diy MIT Self-Host',
          planBadge: diyViable ? (zh ? '仅个人非生产' : 'Personal non-prod') : zh ? '不支持团队/SSO' : 'Omitted for teams',
          costLabel: diyViable ? `$${diyCost}/mo` : zh ? '不可行' : 'Not viable',
          note: diyViable
            ? zh
              ? '个人单用免授权费，仅计入 Linux VPS 成本；正式生产请谨慎评估维护。'
              : 'MIT self-host has $0 license fee for personal testing only.'
            : zh
              ? '官方 README 说明 cal.diy 移除了 Teams 轮询、路由及 SSO 且不建议用于团队生产。'
              : 'README warns cal.diy is personal/non-prod and strips Teams, Routing & SSO.',
          percent: diyViable ? Math.max(6, (diyCost / maxVal) * 100) : 0,
          dot: diyViable ? 'caution' : 'bad',
          tone: 'warn',
          mutedCard: true,
          statusBadge: {
            text: diyViable ? (zh ? '限个人测试' : 'Solo test only') : zh ? '团队缺特性' : 'Blocked for teams',
            variant: diyViable ? 'warn' : 'bad',
          },
        },
      ],
      deltaText,
      copyText: `Cal.com vs Calendly (${seats} seats, ${annual ? 'annual' : 'monthly'}${sso ? ', SAML SSO' : ''}): Cal.com Cloud $${calCost}/mo vs Calendly $${clyCost}/mo — ${deltaText}. https://dceniac.com/oss/vs/cal-vs-calendly/`,
    };
  }

  if (slug === 'n8n-vs-activepieces') {
    const users = sliderValue;
    const sharing = toggles.sharing ?? false;
    const selfhost = toggles.selfhost ?? true;
    const highExec = toggles.highExec ?? false;

    const vpsCost = 24;
    let n8nCost: number | null = vpsCost;
    let n8nPlan = '';
    let n8nCostLabel = '';
    let n8nCopyLabel = '';
    let n8nNote = '';

    if (sharing && !selfhost) {
      n8nCost = null;
      n8nPlan = zh ? 'Cloud Enterprise（询价）' : 'Cloud Enterprise (custom quote)';
      n8nCostLabel = n8nPlan;
      n8nCopyLabel = n8nPlan;
      n8nNote = zh
        ? '云端 SSO 使用 Enterprise，需联系销售。Business 是自建套餐。'
        : 'Managed n8n with SSO requires an Enterprise quote. Business is available for self-hosting.';
    } else if (sharing) {
      n8nCost = 720 + vpsCost; // €667/mo annual license at an assumed 1.08 USD/EUR plus the VPS.
      n8nPlan = zh ? 'Business 自建 (€667/月年付 + VPS)' : 'Business Self-Hosted (€667/mo annual + VPS)';
      n8nCostLabel = zh ? `~$${n8nCost}/月（含 $24 VPS）` : `~$${n8nCost}/mo (incl. $24 VPS)`;
      n8nCopyLabel = `${n8nPlan} ${n8nCostLabel}`;
      n8nNote = zh
        ? '自建 Business €667/月（按年付）提供 6 个共享项目及 SSO。外部密钥库使用 Enterprise。'
        : 'Self-hosted Business at €667/mo billed annually includes six shared projects and SSO. External secrets require Enterprise.';
    } else if (selfhost) {
      n8nCost = vpsCost;
      n8nPlan = zh ? 'Community 社区自建 ($24 VPS)' : 'Community ($24 VPS)';
      n8nCostLabel = zh ? '$24/月 (VPS)' : '$24/mo (VPS)';
      n8nCopyLabel = zh ? '$24/月 ($24 VPS)' : '$24/mo ($24 VPS)';
      n8nNote = zh
        ? '社区版仅创建者与管理员看管流程，外部客户不得配置流程（SUL）。'
        : 'Community limits edits to creator & owner; unlimited runs for internal SUL flows.';
    } else if (highExec) {
      n8nCost = 54; // Cloud Pro €50 annual
      n8nPlan = zh ? 'Cloud Pro (€50/月年付 ≈ $54)' : 'Cloud Pro (€50/mo ann ≈ $54)';
      n8nCostLabel = zh ? '~$54/月 (€50 年付)' : '~$54/mo (€50 ann)';
      n8nCopyLabel = zh ? 'Cloud Pro ~$54/月 (€50/月年付)' : 'Cloud Pro ~$54/mo (€50/mo annual)';
      n8nNote = zh
        ? 'n8n 云 Pro（€50/月年付）含 10,000 次月执行和 3 个共享项目。云端 SAML SSO 需 Enterprise。'
        : 'n8n Cloud Pro (€50/mo annual) includes 10k runs/mo and 3 shared projects. Cloud SAML SSO requires Enterprise.';
    } else {
      n8nCost = 22; // Cloud Starter €20 annual
      n8nPlan = zh ? 'Cloud Starter (€20/月年付 ≈ $22)' : 'Cloud Starter (€20/mo ann ≈ $22)';
      n8nCostLabel = zh ? '~$22/月 (€20 年付)' : '~$22/mo (€20 ann)';
      n8nCopyLabel = zh ? 'Cloud Starter ~$22/月 (€20/月年付)' : 'Cloud Starter ~$22/mo (€20/mo annual)';
      n8nNote = zh
        ? 'n8n 云 Starter（€20/月年付）含 2,500 次月执行和 1 个共享项目。云端 SAML SSO 需 Enterprise。'
        : 'n8n Cloud Starter (€20/mo annual) includes 2.5k runs/mo and 1 shared project. Cloud SAML SSO requires Enterprise.';
    }

    const apOver25 = (sharing || !selfhost) && users > 25;
    let apCost = vpsCost;
    let apPlan = '';
    let apCostLabel = '';
    let apCopyLabel = '';
    let apNote = '';

    if (selfhost && !sharing) {
      apCost = vpsCost;
      apPlan = zh ? 'MIT 核心自建 ($24 VPS)' : 'MIT Self-Host ($24 VPS)';
      apCostLabel = zh ? '$24/月 (VPS)' : '$24/mo (VPS)';
      apCopyLabel = zh ? '$24/月 ($24 VPS)' : '$24/mo ($24 VPS)';
      apNote = zh
        ? '剥离 packages/ee 后采用纯 MIT Expat；可自由部署内部商业流程（生产环境另需 S3 对象存储）。'
        : 'OSI MIT core outside packages/ee; unlimited internal workflows on your 4 GB host (production also needs S3 object storage).';
    } else if (apOver25) {
      apCost = 200; // bar baseline only; labels never print exact $200/mo
      apPlan = zh ? '企业定制 Custom ($200+/月 · 超25人)' : 'Custom ($200+/mo · >25u)';
      apCostLabel = zh ? 'Custom ($200+/月)' : 'Custom ($200+/mo)';
      apCopyLabel = zh ? 'Custom ($200+/月，超25人)' : 'Custom ($200+/mo, >25 users)';
      apNote = zh
        ? 'Team 每月 $200（年付 $166.67）最多包干 25 人、每月 5 万积分；第 26 人起须联系销售签企业定制 Custom 合同。'
        : 'Team ($200/mo monthly · $166.67 annual) caps at 25 users and 50k credits/mo; 26+ users require Custom Enterprise pricing.';
    } else if (sharing || users > 5) {
      apCost = 200 + (selfhost ? vpsCost : 0);
      apPlan = selfhost
        ? zh ? 'Team 自建 ($200/月 + VPS)' : 'Team Self-Hosted ($200/mo + VPS)'
        : zh ? 'Team ($200/月 · 年付 $166.67)' : 'Team ($200/mo · $166.67 ann)';
      apCostLabel = selfhost
        ? zh ? `$${apCost}/月（含 $${vpsCost} VPS）` : `$${apCost}/mo (incl. $${vpsCost} VPS)`
        : zh ? '$200/月 (年付 $166.67)' : '$200/mo ($166.67 ann)';
      apCopyLabel = selfhost
        ? `${apPlan} ${apCostLabel}`
        : zh ? 'Team $200/月 (年付 $166.67/月)' : 'Team $200/mo ($166.67/mo annual)';
      apNote = zh
        ? 'Team 每月 $200（年付 $166.67）含 25 用户、无限共享项目、标准角色与 SSO，每月封顶 5 万积分（超出 $0.007/积分）；自建另需 S3 存储，超出 25 人须谈企业定制。'
        : 'Team $200/mo monthly ($166.67/mo annual) covers up to 25 users, shared projects & SSO, capped at 50k credits/mo ($0.007/credit overage); self-hosting also needs S3 storage. Custom pricing above 25 users.';
    } else {
      apCost = 20;
      apPlan = zh ? 'Plus ($20/月 · 年付 $16.67 · 5人)' : 'Plus ($20/mo · $16.67 ann · 5u)';
      apCostLabel = zh ? '$20/月 (年付 $16.67)' : '$20/mo ($16.67 ann)';
      apCopyLabel = zh ? 'Plus $20/月 (年付 $16.67/月)' : 'Plus $20/mo ($16.67/mo annual)';
      apNote = zh
        ? '云端 Plus 每月 $20（年付 $16.67）封顶 5 用户、每月 1 万积分，支持自带 AI Key。'
        : 'Cloud Plus is $20/mo monthly ($16.67/mo annual) for up to 5 users and 10k credits/mo with BYO AI key.';
    }

    const maxVal = Math.max(n8nCost ?? 0, apCost, 220);
    let deltaText: string;
    if (n8nCost === null) {
      const apEstimate = apOver25 ? apCostLabel : apCopyLabel;
      deltaText = zh
        ? `云端 SSO 使用 n8n ${n8nCostLabel}。Activepieces ${apEstimate}。`
        : `Cloud SSO requires n8n ${n8nCostLabel}. Activepieces: ${apEstimate}.`;
    } else if (sharing) {
      deltaText = apOver25
        ? zh
          ? `n8n 自建 Business ${n8nCostLabel}。Activepieces 超过 25 人使用 ${apCostLabel}。`
          : `n8n self-hosted Business: ${n8nCostLabel}. Activepieces requires ${apCostLabel} above 25 users.`
        : zh
          ? `两家均计入自建 VPS。n8n ${n8nCostLabel} 对 Activepieces ${apCostLabel}，每月估计相差 $${n8nCost - apCost}。`
          : `With a VPS for each tool, n8n ${n8nCostLabel} costs about $${n8nCost - apCost} more per month than Activepieces ${apCostLabel}.`;
    } else {
      deltaText = selfhost
        ? zh
          ? '无 SSO 与跨人协作要求时，两者 4 GB VPS 自建均约 $24/月服务器成本'
          : 'On a self-hosted 4 GB VPS without team SSO, both cost only ~$24/mo infra'
        : apOver25
          ? zh
            ? `云端超 25 人时 Activepieces 须转企业定制 Custom ($200+/月)；无共享/SSO 的 n8n ${n8nCopyLabel}`
            : `Above 25 users on Cloud, Activepieces requires Custom ($200+/mo) vs n8n ${n8nCopyLabel}`
          : users <= 5
            ? zh
              ? `云端 5 人以内无共享时：n8n ${n8nCopyLabel} 对比 Activepieces ${apCopyLabel}`
              : `Under 5 users on Cloud without SSO: n8n ${n8nCopyLabel} vs Activepieces ${apCopyLabel}`
            : zh
              ? `无需共享与 SSO 时，n8n ${n8nCopyLabel} 低于 Activepieces ${apCopyLabel}`
              : `Without an SSO requirement, n8n ${n8nCopyLabel} costs less than Activepieces ${apCopyLabel}`;
    }

    return {
      sliderFormatted: zh ? `${users} 名成员` : `${users} ${users === 1 ? 'user' : 'users'}`,
      bars: [
        {
          id: 'n8n',
          name: 'n8n',
          planBadge: n8nPlan,
          costLabel: n8nCostLabel,
          note: n8nNote,
          percent: n8nCost === null ? 0 : Math.max(6, (n8nCost / maxVal) * 100),
          dot: sharing ? 'caution' : 'good',
          tone: sharing ? 'warn' : 'ink',
        },
        {
          id: 'ap',
          name: 'Activepieces',
          planBadge: apPlan,
          costLabel: apCostLabel,
          note: apNote,
          percent: Math.max(6, (apCost / maxVal) * 100),
          dot: apOver25 ? 'caution' : 'good',
          tone: apOver25 ? 'warn' : 'good',
        },
      ],
      deltaText,
      copyText: zh
        ? `n8n 对比 Activepieces（${users} 人${sharing ? '，共享+SSO' : ''}${!selfhost ? '，云端' : ''}${!selfhost && highExec ? '，高频执行' : ''}）：n8n ${n8nCopyLabel} 对 Activepieces ${apCopyLabel}。https://dceniac.com/zh/oss/vs/n8n-vs-activepieces/`
        : `n8n vs Activepieces (${users} users${sharing ? ', Team sharing + SSO' : ''}${!selfhost ? ', Cloud' : ''}${!selfhost && highExec ? ', >2.5k runs/mo' : ''}): n8n ${n8nCopyLabel} vs Activepieces ${apCopyLabel}. https://dceniac.com/oss/vs/n8n-vs-activepieces/`,
    };
  }

  if (slug === 'papermark-vs-docsend') {
    const seats = sliderValue;
    const vdr = toggles.vdr ?? false;
    const customDomain = toggles.customDomain ?? true;

    const eurToUsd = 1.08;
    let pmEur = 0;
    let pmPlan = '';
    if (vdr) {
      const extra = Math.max(0, seats - 3);
      pmEur = 99 + extra * 33;
      pmPlan =
        extra > 0
          ? `Data Rooms (€99 + €33×${extra})`
          : zh
            ? 'Data Rooms (€99 · 含3席)'
            : 'Data Rooms (€99 · 3 seats)';
    } else if (seats === 1 && !customDomain) {
      pmEur = 0;
      pmPlan = zh ? 'Free (€0 · 限50份文档)' : 'Free (€0 · 50 docs)';
    } else if (seats === 1) {
      pmEur = 24;
      pmPlan = zh ? 'Pro (€24 · 含1席)' : 'Pro (€24 · 1 seat)';
    } else {
      const extra = Math.max(0, seats - 3);
      pmEur = 59 + extra * 20;
      pmPlan =
        extra > 0
          ? `Business (€59 + €20×${extra})`
          : zh
            ? 'Business (€59 · 含3席)'
            : 'Business (€59 · 3 seats)';
    }
    const pmUsd = Math.round(pmEur * eurToUsd);

    let dsUsd = 0;
    let dsPlan = '';
    if (vdr) {
      const extra = Math.max(0, seats - 3);
      dsUsd = 180 + extra * 60;
      dsPlan =
        extra > 0
          ? zh
            ? `Advanced Data Rooms ($180 + ~$60×${extra})`
            : `Adv. Data Rooms ($180 + ~$60×${extra})`
          : zh
            ? 'Advanced Data Rooms ($180 · 含3席)'
            : 'Adv. Data Rooms ($180 · 3 seats)';
    } else if (seats === 1 && !customDomain) {
      dsUsd = 10;
      dsPlan = zh ? 'Personal ($10/人)' : 'Personal ($10/u)';
    } else if (seats <= 2) {
      dsUsd = seats * 45;
      dsPlan = zh ? 'Standard ($45/人)' : 'Standard ($45/u)';
    } else {
      const extra = Math.max(0, seats - 3);
      dsUsd = 150 + extra * 50;
      dsPlan =
        extra > 0
          ? `Advanced ($150 + ~$50×${extra})`
          : zh
            ? 'Advanced ($150 · 含3席)'
            : 'Advanced ($150 · 3 seats)';
    }

    const selfInfraUsd = 35;
    const maxVal = Math.max(pmUsd, dsUsd, 120);
    const diff = dsUsd - pmUsd;
    const deltaText =
      diff > 0
        ? zh
          ? `Papermark Cloud 每月省约 $${diff}（按 1 EUR ≈ 1.08 USD 换算）`
          : `Papermark Cloud saves ~$${diff}/mo ($${(diff * 12).toLocaleString()}/yr vs DocSend)`
        : zh
          ? '若无需去品牌且仅 1 人，DocSend Personal ($10) 起步低'
          : 'Solo links without branding removal favor DocSend $10 Personal or Papermark €0 Free';

    return {
      sliderFormatted: zh ? `${seats} 名成员` : `${seats} ${seats === 1 ? 'seat' : 'seats'}`,
      bars: [
        {
          id: 'pm',
          name: 'Papermark Cloud',
          planBadge: pmPlan,
          costLabel: pmEur === 0 ? '€0/mo ($0)' : `€${pmEur}/mo (~$${pmUsd})`,
          note: vdr
            ? zh
              ? '含无限资料室、NDA、动态水印及精细文件权限（按年计费口径）。'
              : 'Unlimited data rooms, NDA gating, dynamic watermarks & permissions (annual rate).'
            : pmEur === 0
              ? zh
                ? '免费版含 1 席、最多 50 份文档，带默认 Papermark 标识。'
                : 'Free tier covers 1 seat and up to 50 docs with default branding.'
              : zh
                ? 'Pro 去官方标；Business 起含自定义域名、Webhook 与 MCP。'
                : 'Branding removed on Pro; custom domain, webhooks & MCP from Business.',
          percent: Math.max(6, (pmUsd / maxVal) * 100),
          dot: 'good',
          tone: 'ink',
        },
        {
          id: 'ds',
          name: 'DocSend (Annual)',
          planBadge: dsPlan,
          costLabel: `$${dsUsd}/mo`,
          note: vdr
            ? zh
              ? '含 3 人基础配额，超额席位按人月加收，支持 M&A 自动编号。'
              : 'Includes 3 users + extra seat fees; M&A file indexing & group visitor perms.'
            : zh
              ? '自定义品牌与多文件分享须升 Standard ($45/人/月) 起。'
              : 'Custom branding & multi-file sharing push past Personal to $45/u Standard.',
          percent: Math.max(6, (dsUsd / maxVal) * 100),
          dot: diff > 0 ? 'caution' : 'good',
          tone: 'muted',
        },
        {
          id: 'pm-self',
          name: zh ? 'Papermark AGPL 自建' : 'Papermark AGPL Self-Host',
          planBadge: zh ? '多云组件基础成本' : 'External cloud stack',
          costLabel: `~$${selfInfraUsd}/mo`,
          note: zh
            ? '需自配 Postgres、S3/Blob、Resend 邮件与 Tinybird 数据分析（ee/ 目录仍闭源）。'
            : 'Requires Postgres, AWS S3/Vercel Blob, Resend email & Tinybird CLI.',
          percent: Math.max(6, (selfInfraUsd / maxVal) * 100),
          dot: 'caution',
          tone: 'warn',
          mutedCard: true,
          statusBadge: { text: zh ? '运维门槛高' : '4 external deps', variant: 'warn' },
        },
      ],
      deltaText,
      copyText: `Papermark vs DocSend (${seats} seats${vdr ? ', VDR + NDA' : ''}): Papermark Cloud €${pmEur}/mo (~$${pmUsd}) vs DocSend ~$${dsUsd}/mo. https://dceniac.com/oss/vs/papermark-vs-docsend/`,
    };
  }

  if (slug === 'appsmith-vs-retool') {
    const staff = sliderValue;
    const builders = Math.max(2, Math.round(staff * 0.2));
    const viewers = staff - builders;
    const auditLogs = toggles.auditLogs ?? toggles.biz ?? false;
    const customRoles = toggles.customRoles ?? false;
    const sso = toggles.sso ?? false;
    const selfhost = toggles.selfhost ?? true;

    const asNeedsBiz = auditLogs || customRoles;
    const asNeedsEnt = sso || (staff > 99 && (asNeedsBiz || !selfhost));
    const rtNeedsEnt = sso || customRoles;

    let asCost = 0;
    let asPlan = '';
    if (asNeedsEnt) {
      asCost = 2500 + (selfhost ? 40 : 0);
      asPlan = selfhost
        ? zh ? 'Enterprise 自建 ($2,500/月 + $40 主机)' : 'Enterprise Self-Hosted ($2,500/mo + $40 VM)'
        : zh ? 'Enterprise ($2,500/月 100人)' : 'Enterprise ($2,500/mo · 100u)';
    } else if (asNeedsBiz) {
      asCost = staff * 15 + (selfhost ? 40 : 0);
      asPlan = selfhost
        ? zh
          ? `Business 自建 ($15×${staff} + $40主机)`
          : `Biz Self-Host ($15×${staff} + $40 VM)`
        : zh
          ? `Business ($15 × ${staff})`
          : `Business ($15/u × ${staff})`;
    } else if (selfhost) {
      asCost = 40;
      asPlan = zh ? 'CE 自建 ($40 · 8GB 主机)' : 'CE Self-Host ($40 8 GB VM)';
    } else {
      asCost = staff <= 5 ? 0 : staff * 15;
      asPlan = staff <= 5 ? (zh ? 'Cloud Free ($0)' : 'Cloud Free ($0)') : zh ? `Business ($15 × ${staff})` : `Business ($15/u × ${staff})`;
    }
    const asCostLabel = zh ? `$${asCost.toLocaleString()}/月` : `$${asCost.toLocaleString()}/mo`;

    let rtCost: number | null = null;
    let rtPlan = '';
    let rtCostLabel = '';
    if (rtNeedsEnt) {
      rtPlan = 'Enterprise';
      rtCostLabel = zh ? 'Enterprise 另行报价' : 'Enterprise (Custom quote)';
    } else if (auditLogs) {
      rtCost = builders * 50 + viewers * 15;
      rtPlan = zh ? `Business 年付 ($50×${builders} + $15×${viewers})` : `Biz Annual ($50×${builders}b + $15×${viewers}u)`;
      rtCostLabel = zh ? `$${rtCost.toLocaleString()}/月 (按年计费)` : `$${rtCost.toLocaleString()}/mo (annual)`;
    } else if (staff <= 5) {
      rtCost = 0;
      rtPlan = zh ? 'Free ($0 限5人)' : 'Free ($0 up to 5u)';
      rtCostLabel = zh ? '$0/月' : '$0/mo';
    } else {
      rtCost = builders * 10 + viewers * 5;
      rtPlan = zh ? `Team 年付 ($10×${builders} + $5×${viewers})` : `Team Annual ($10×${builders}b + $5×${viewers}u)`;
      rtCostLabel = zh ? `$${rtCost.toLocaleString()}/月 (按年计费)` : `$${rtCost.toLocaleString()}/mo (annual)`;
    }

    const maxVal = Math.max(asCost, rtCost ?? 0, 300);
    const difference = rtCost === null ? null : rtCost - asCost;
    const appsmithEstimate = asNeedsEnt
      ? `Appsmith Enterprise ${asCostLabel}${selfhost ? (zh ? '（$2,500 授权 + $40 主机）' : ' ($2,500 license + $40 VM)') : ''}`
      : `Appsmith ${asCostLabel}`;
    const estimates = zh ? `${appsmithEstimate}，Retool ${rtCostLabel}。` : `${appsmithEstimate}. Retool ${rtCostLabel}.`;
    const planContext = sso
      ? (zh ? '启用 SAML SSO 时，' : 'With SAML SSO, ')
      : asNeedsEnt
        ? (zh ? 'Appsmith Business 最多 99 人。' : 'Appsmith Business caps at 99 staff. ')
        : '';

    let deltaText = `${planContext}${estimates}`;
    if (asCost === 0 && rtCost === 0) {
      deltaText = zh ? '两家云端免费档均为 $0/月，最多 5 人。' : 'Both cloud plans cost $0/mo for up to 5 staff.';
    } else if (difference === 0) {
      deltaText += zh ? '两家的月均估算相同。' : ' Both have the same monthly estimate.';
    } else if (difference !== null) {
      const cheaper = difference > 0 ? 'Appsmith' : 'Retool';
      const savings = `$${Math.abs(difference).toLocaleString()}`;
      deltaText += zh ? `${cheaper} 每月少花 ${savings}。` : ` ${cheaper} costs ${savings} less per month.`;
    }
    const retoolCopy = rtCost === null ? rtCostLabel : zh ? `${rtCostLabel}（${rtPlan}）` : `${rtCostLabel} (${rtPlan})`;

    return {
      sliderFormatted: zh ? `${staff} 人（${builders}搭建/${viewers}使用）` : `${staff} staff (${builders} builders / ${viewers} users)`,
      bars: [
        {
          id: 'as',
          name: 'Appsmith',
          planBadge: asPlan,
          costLabel: asCostLabel,
          note: sso
            ? zh
              ? 'SAML/OIDC SSO 与 SCIM 只开放给每月 2,500 美元（含 100 人）的企业版。'
              : 'SAML/OIDC SSO & SCIM sit in the $2,500/mo Enterprise tier (100 users included).'
            : asNeedsEnt
              ? zh
                ? 'Business 最多 99 人，100 人起使用 Enterprise，订阅费从 $2,500/月起。'
                : 'Business caps at 99 users. Enterprise starts at $2,500/mo for 100 users.'
            : selfhost && !asNeedsBiz
              ? zh
                ? '使用 appsmith-ce Apache-2.0 镜像不限人头数，仅需 8 GB 内存服务器费用。'
                : 'Apache-2.0 appsmith-ce self-hosting removes seat fees on an 8 GB RAM host.'
              : !asNeedsBiz && !selfhost && staff <= 5
                ? zh
                  ? 'Appsmith 官方云免费档支持最多 5 人与 3 个 Git 仓库。'
                  : 'Appsmith Cloud Free covers up to 5 users and 3 Git repos at $0.'
                : zh
                  ? 'Business 每人 $15 统一价含操作审计日志、Git 无限仓库与细粒度自定义角色（Granular Custom Roles）。'
                  : 'Business at $15/user adds Audit Logs, unlimited Git & Granular Custom Roles (RBAC).',
          percent: Math.max(6, (asCost / maxVal) * 100),
          dot: asNeedsEnt ? 'caution' : 'good',
          tone: 'ink',
        },
        {
          id: 'rt',
          name: 'Retool (Annual)',
          planBadge: rtPlan,
          costLabel: rtCostLabel,
          note: rtNeedsEnt
            ? zh
              ? '完整管理员角色权限、Git 版本管理与 SAML SSO/SCIM 使用 Enterprise。Business 已提供应用和数据权限。'
              : 'Enterprise covers full admin role scopes, Git and SAML SSO/SCIM. App and data permissions are available on Business.'
            : auditLogs
              ? zh
                ? 'Retool Business（搭建者 $50 + 使用者 $15，按年计费）包含审计日志与应用和数据权限。'
                : 'Retool Business ($50/builder + $15/end-user, billed annually) includes audit logs and app/data permissions.'
              : zh
                ? '按搭建者（$10/$50）+ 日常使用者（$5/$15）按年计费报价叠加扣费（月付单价更高）。'
                : 'Annual billing rates combine builders ($10/$50) and daily end-users ($5/$15); monthly billing is higher.',
          percent: rtCost === null ? 0 : Math.max(6, (rtCost / maxVal) * 100),
          dot: difference === null || difference > 0 ? 'caution' : 'good',
          tone: 'muted',
        },
      ],
      deltaText,
      copyText: zh
        ? `Appsmith 对比 Retool（${staff} 人）：Appsmith ${asCostLabel}（${asPlan}）对 Retool ${retoolCopy}。https://dceniac.com/zh/oss/vs/appsmith-vs-retool/`
        : `Appsmith vs Retool (${staff} staff): Appsmith ${asCostLabel} (${asPlan}) vs Retool ${retoolCopy}. https://dceniac.com/oss/vs/appsmith-vs-retool/`,
    };
  }

  // =========================================================================
  // 5. Medusa vs Saleor
  // =========================================================================
  const gmv = sliderValue;
  const cloud = toggles.cloud ?? true;
  const rbac = toggles.rbac ?? false;

  const medusaCost = cloud ? (gmv > 150000 ? 299 : 99) : 35;
  const medusaPlan = rbac
    ? zh
      ? '需 Enterprise 协议（RBAC/SSO）'
      : 'Needs Enterprise Contract'
    : cloud
      ? gmv > 150000
        ? zh
          ? 'Scale ($299 · 0%抽成)'
          : 'Scale ($299 · 0% GMV)'
        : zh
          ? 'Launch ($99 · 0%抽成)'
          : 'Launch ($99 · 0% GMV)'
      : zh
        ? 'MIT 自建 (~$35 主机)'
        : 'MIT Self-Host (~$35 VM)';

  const saleorOverage = gmv > 200000 ? Math.round((gmv - 200000) * 0.008) : 0;
  const saleorCost = cloud ? 1599 + saleorOverage : 85;
  const saleorPlan = cloud
    ? zh
      ? `Saleor Cloud ($1,599${saleorOverage > 0 ? `+$${saleorOverage}` : ''})`
      : `Saleor Cloud ($1,599${saleorOverage > 0 ? ` + $${saleorOverage}` : ''})`
    : zh
      ? 'BSD-3 自建 (~$85 六服务集群)'
      : 'BSD-3 Self-Host (~$85 6-service)';

  const maxVal = Math.max(medusaCost, saleorCost, 300);
  const diff = saleorCost - medusaCost;
  const deltaText = rbac
    ? zh
      ? '提示：若不签商业合同仍坚持原生 RBAC/SSO，只能选 BSD-3 单版本全开放的 Saleor 自建'
      : 'RBAC/SSO without an Enterprise agreement blocks Medusa Core — Saleor BSD-3 unlocks permissions free'
    : cloud
      ? zh
        ? `托管云模式 Medusa Cloud 每月便宜 $${diff.toLocaleString()} 且无 GMV 抽成`
        : `Medusa Cloud costs $${diff.toLocaleString()}/mo less at $${(gmv / 1000).toFixed(0)}k GMV (0% commission)`
      : zh
        ? '全自建模式下两者软件费均为 $0；Medusa 四件套运维显著轻于 Saleor 六服务'
        : 'Both are $0 software fee when self-hosted; Medusa runs lighter (4 services vs 6)';

  return {
    sliderFormatted: zh ? `月 GMV $${gmv.toLocaleString()}` : `$${gmv.toLocaleString()}/mo GMV`,
    bars: [
      {
        id: 'medusa',
        name: 'Medusa',
        planBadge: medusaPlan,
        costLabel: rbac ? (zh ? 'Enterprise 议价' : 'Ent Required') : `$${medusaCost}/mo`,
        note: rbac
          ? zh
            ? 'ENTERPRISE-LICENSE.md 规定员工分级权限与 SSO 不属 MIT，须与 MedusaJS 签约。'
            : 'RBAC & SSO are commercial-only under ENTERPRISE-LICENSE.md; requires MedusaJS agreement.'
          : cloud
            ? zh
              ? '正式线上商店按 Launch ($99) 或 Scale ($299) 档计算（另有 $29 开发测试档），成交额零抽佣。'
              : 'Live stores run Launch ($99) or Scale ($299) with 0% GMV fee ($29 Develop is for staging).'
            : zh
              ? '2 GB+ 内存服务器即可运行：服务端 + Worker + Postgres + Redis 四组件。'
              : '2 GB+ RAM minimum across server, worker, PostgreSQL and Redis.',
        percent: rbac ? 18 : Math.max(6, (medusaCost / maxVal) * 100),
        dot: rbac ? 'bad' : 'good',
        tone: rbac ? 'warn' : 'ink',
        statusBadge: rbac ? { text: zh ? '受商业条款锁定' : 'RBAC paywalled', variant: 'bad' } : undefined,
      },
      {
        id: 'saleor',
        name: 'Saleor',
        planBadge: saleorPlan,
        costLabel: `$${saleorCost.toLocaleString()}/mo`,
        note: cloud
          ? zh
            ? '商业托管最低 $1,599/月含 20 万美金月成交额，超额部分抽 0.8%。'
            : 'Commercial Cloud starts at $1,599/mo covering $200k monthly sales + 0.8% on overage.'
          : zh
            ? 'BSD-3 单版本全解锁权限无限制，但须自行搭建六套容器服务（本机约需 5 GB+ 内存）。'
            : 'BSD-3 single edition omits all feature walls, at the cost of running a 6-service stack.',
        percent: Math.max(6, (saleorCost / maxVal) * 100),
        dot: cloud && gmv < 200000 ? 'caution' : 'good',
        tone: cloud ? 'muted' : 'good',
      },
    ],
    deltaText,
    copyText: `Medusa vs Saleor ($${gmv.toLocaleString()}/mo GMV${cloud ? ', Cloud' : ', Self-Host'}${rbac ? ', RBAC needed' : ''}): Medusa ${rbac ? 'Enterprise quote' : `$${medusaCost}/mo`} vs Saleor $${saleorCost}/mo. https://dceniac.com/oss/vs/medusa-vs-saleor/`,
  };
}

// =========================================================================
// Public Selectors (Localized clean slices — Zero CJK leaks on EN)
// =========================================================================
export function ossVsSlugs(): string[] {
  return ALL_VS_RAW.map((x) => x.slug);
}

export function ossVsPairForProject(projectId: string, lang: Language): VsComparisonSummary | undefined {
  const raw = ALL_VS_RAW.find((x) => x.linkedProjectIds.includes(projectId));
  return raw ? toSummary(raw, lang) : undefined;
}

export function ossVsSummaries(lang: Language): VsComparisonSummary[] {
  return ALL_VS_RAW.map((x) => toSummary(x, lang));
}

export function ossVsComparison(slug: string, lang: Language): VsComparisonView | undefined {
  const raw = ALL_VS_RAW.find((x) => x.slug === slug);
  if (!raw) return undefined;
  const t = (b: string | BilingualText) => (typeof b === 'string' ? b : lang === 'zh' ? b.zh : b.en);
  const en = lang === 'en';
  const summary = toSummary(raw, lang);

  return {
    ...summary,
    metaTitle: t(raw.metaTitle),
    metaDescription: t(raw.metaDescription),
    starsBadge: raw.starsBadge,
    stickyWinnerBadge: t(raw.stickyWinnerBadge),
    stickyCtaLabel: t(raw.stickyCtaLabel),
    stickyCtaUrl: raw.stickyCtaUrl,
    stickyCtaSponsored: raw.stickyCtaSponsored,
    left: {
      id: raw.left.id,
      name: raw.left.name,
      monogram: raw.left.monogram,
      projectId: raw.left.projectId,
      highlighted: raw.left.highlighted,
      winnerBadge: t(raw.left.winnerBadge),
      tagline: t(raw.left.tagline),
      pricePills: en ? raw.left.pricePills.en : raw.left.pricePills.zh,
      chooseIf: en ? raw.left.chooseIf.en : raw.left.chooseIf.zh,
      watchOut: en ? raw.left.watchOut.en : raw.left.watchOut.zh,
      ctaLabel: t(raw.left.ctaLabel),
      ctaUrl: raw.left.ctaUrl,
      ctaSponsored: raw.left.ctaSponsored,
      secondaryLabel: t(raw.left.secondaryLabel),
      secondaryUrl: raw.left.secondaryUrl,
      disclosure: t(raw.left.disclosure),
    },
    right: {
      id: raw.right.id,
      name: raw.right.name,
      monogram: raw.right.monogram,
      projectId: raw.right.projectId,
      highlighted: raw.right.highlighted,
      winnerBadge: t(raw.right.winnerBadge),
      tagline: t(raw.right.tagline),
      pricePills: en ? raw.right.pricePills.en : raw.right.pricePills.zh,
      chooseIf: en ? raw.right.chooseIf.en : raw.right.chooseIf.zh,
      watchOut: en ? raw.right.watchOut.en : raw.right.watchOut.zh,
      ctaLabel: t(raw.right.ctaLabel),
      ctaUrl: raw.right.ctaUrl,
      ctaSponsored: raw.right.ctaSponsored,
      secondaryLabel: t(raw.right.secondaryLabel),
      secondaryUrl: raw.right.secondaryUrl,
      disclosure: t(raw.right.disclosure),
    },
    trap: {
      title: t(raw.trap.title),
      body: t(raw.trap.body),
      citation: {
        label: raw.trap.citation.label,
        url: raw.trap.citation.url,
        date: raw.trap.citation.date,
        quote: t(raw.trap.citation.quote),
        sponsored: raw.trap.citation.sponsored,
      },
    },
    calc: {
      title: t(raw.calcMeta.title),
      subtitle: t(raw.calcMeta.subtitle),
      sliderLabel: t(raw.calcMeta.sliderLabel),
      min: raw.calcMeta.min,
      max: raw.calcMeta.max,
      step: raw.calcMeta.step,
      defaultSlider: raw.calcMeta.defaultSlider,
      scaleTicks: en ? raw.calcMeta.scaleTicks.en : raw.calcMeta.scaleTicks.zh,
      presets: raw.calcMeta.presets.map((p) => ({
        id: p.id,
        label: en ? p.labelEn : p.labelZh,
        sliderValue: p.sliderValue,
        toggles: p.toggles,
      })),
      toggles: raw.calcMeta.toggles.map((tg) => ({
        key: tg.key,
        label: en ? tg.labelEn : tg.labelZh,
        hint: en ? tg.hintEn : tg.hintZh,
        defaultValue: tg.defaultValue,
      })),
    },
    matrix: raw.matrix.map((row) => ({
      group: row.group,
      dimension: t(row.dimension),
      citations: row.citations.map((c) => ({
        label: c.label,
        url: c.url,
        date: c.date,
        quote: t(c.quote),
        sponsored: c.sponsored,
      })),
      leftVerdict: row.leftVerdict,
      leftHeadline: t(row.leftHeadline),
      leftDetail: t(row.leftDetail),
      rightVerdict: row.rightVerdict,
      rightHeadline: t(row.rightHeadline),
      rightDetail: t(row.rightDetail),
    })),
    faqs: raw.faqs.map((f) => ({ q: t(f.q), a: t(f.a) })),
  };
}

function toSummary(raw: VsPairRaw, lang: Language): VsComparisonSummary {
  const t = (b: BilingualText) => (lang === 'zh' ? b.zh : b.en);
  const prefix = lang === 'zh' ? '/zh' : '';
  return {
    slug: raw.slug,
    href: `${prefix}/oss/vs/${raw.slug}/`,
    title: t(raw.title),
    subtitle: t(raw.subtitle),
    categoryId: raw.categoryId,
    categoryLabel: t(raw.categoryLabel),
    checkedAt: raw.checkedAt,
    leftName: raw.left.name,
    rightName: raw.right.name,
    winnerTag: t(raw.winnerTag),
    pricingHighlight: t(raw.pricingHighlight),
    linkedProjectIds: raw.linkedProjectIds,
  };
}
