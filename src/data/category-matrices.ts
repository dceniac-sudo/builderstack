import type { Language } from '@/lib/i18n-path';
import type { OssVerdict } from '@/types/oss';

export interface CategoryMatrixRowView {
  id: string;
  name: string;
  href: string;
  verdict: OssVerdict;
  rowTint?: 'none' | 'good' | 'bad';
  microBadge?: { text: string; tone: 'good' | 'warn' | 'bad' };
  license: string;
  licenseNote: string;
  minStack: string;
  freeCeiling: string;
  paidFloor: string;
  bestFor: string;
}

export interface CategoryMatrixView {
  heading: string;
  columns: [string, string, string, string, string, string];
  compareHref?: string;
  compareLabel?: string;
  guideHref?: string;
  guideLabel?: string;
  rows: CategoryMatrixRowView[];
}

interface BilingualText {
  en: string;
  zh: string;
}

interface CategoryMatrixRowRaw {
  id: string;
  name: string;
  verdict: OssVerdict;
  rowTint?: 'none' | 'good' | 'bad';
  microBadge?: { text: BilingualText; tone: 'good' | 'warn' | 'bad' };
  license: BilingualText;
  licenseNote: BilingualText;
  minStack: BilingualText;
  freeCeiling: BilingualText;
  paidFloor: BilingualText;
  bestFor: BilingualText;
}

interface CategoryMatrixRaw {
  heading: BilingualText;
  compareHref?: string;
  compareLabel?: BilingualText;
  guideHref?: string;
  guideLabel?: BilingualText;
  rows: CategoryMatrixRowRaw[];
}

const MATRICES: Record<string, CategoryMatrixRaw> = {
  automation: {
    heading: {
      en: 'n8n vs Activepieces vs Windmill at a Glance',
      zh: 'n8n · Activepieces · Windmill 三强横向裁决',
    },
    compareHref: '/oss/vs/n8n-vs-activepieces/',
    compareLabel: {
      en: 'Open interactive n8n vs Activepieces TCO calculator',
      zh: '打开 n8n vs Activepieces 交互算账台',
    },
    guideHref: '/guides/self-hosting-n8n-vps-ram-benchmark/',
    guideLabel: {
      en: 'Self-Hosting n8n in Production (2026): Real RAM Limits & Cloud Crossover',
      zh: 'n8n 生产自托管实测（2026）：内存底线、Queue Mode 与 Cloud 拐点',
    },
    rows: [
      {
        id: 'n8n',
        name: 'n8n',
        verdict: 'caution',
        rowTint: 'bad',
        microBadge: { text: { en: '€667 CLIFF', zh: '€667 断层' }, tone: 'bad' },
        license: { en: 'Sustainable Use (Fair-code)', zh: 'Sustainable Use（源码可用）' },
        licenseNote: { en: 'Internal use; no multi-tenant resale', zh: '限内部使用，禁转售多租户 SaaS' },
        minStack: { en: '2 vCPU · 4 GB RAM · Postgres', zh: '2 核 · 4 GB 内存 · Postgres' },
        freeCeiling: { en: 'Unlimited runs; single-owner workflows (no shared projects/SSO)', zh: '不限运行次数；仅单人所有，无共享项目与 SSO' },
        paidFloor: { en: 'Cloud €20/mo · Self-host €667/mo (Startup Plan ≈ €333.50)', zh: 'Cloud €20/月 · 自建 Business €667/月（Startup Plan ≈ €333.50）' },
        bestFor: { en: 'Visual AI agent workflows & 400+ app connectors', zh: '可视化 AI 节点与 400+ 接口编排' },
      },
      {
        id: 'activepieces',
        name: 'Activepieces',
        verdict: 'good',
        rowTint: 'good',
        microBadge: { text: { en: 'MIT CORE', zh: 'MIT 核心' }, tone: 'good' },
        license: { en: 'MIT Core + ee/ Enterprise', zh: 'MIT 核心 + ee/ 商业目录' },
        licenseNote: { en: 'Permissive core; paid ee/ for SSO & embed', zh: '核心宽松；SSO/白标嵌入需商业授权' },
        minStack: { en: 'Postgres + Redis + S3 (prod)', zh: 'Postgres + Redis + S3（生产）' },
        freeCeiling: { en: 'Unlimited CE runs; multi-project & SSO in Team; audit logs, SCIM & Git Sync in Ultimate', zh: '社区版不限次数；多项目与 SSO 在 Team，审计日志/SCIM/Git Sync 在 Ultimate' },
        paidFloor: { en: 'Team $200/mo · 50k credits + $0.007/credit', zh: 'Team $200/月 · 含 5 万积分，超出 $0.007/积分' },
        bestFor: { en: 'Lower-cost Zapier replacement for up to 25 team users', zh: '25 人内低成本的 Zapier 替代' },
      },
      {
        id: 'windmill',
        name: 'Windmill',
        verdict: 'caution',
        rowTint: 'none',
        microBadge: { text: { en: '10-USER OAUTH', zh: '10 人 OAuth' }, tone: 'warn' },
        license: { en: 'AGPLv3 source + proprietary CE builds', zh: 'AGPLv3 源码 + 专有 CE 构建' },
        licenseNote: { en: 'Official CE images bundle non-public code; pure AGPL = build w/o enterprise flag', zh: '官方 CE 镜像含非公开代码；纯 AGPL 需不带 enterprise 开关自行编译' },
        minStack: { en: 'Postgres only · 2 GB/worker', zh: '仅需 Postgres · 单 Worker 2 GB' },
        freeCeiling: { en: '3 workspaces, 50 users, 10 GiB; OAuth SSO ≤10 users, no SAML/SCIM', zh: '3 工作区、50 用户、10 GiB；OAuth SSO ≤10 人，无 SAML/SCIM' },
        paidFloor: { en: 'EE $120/mo (1 builder + 2 workers)', zh: '企业版 $120/月（1 Builder + 2 Worker）' },
        bestFor: { en: 'Engineers running versioned Python, TS & SQL scripts', zh: '偏代码的 Python / TS / SQL 工程团队' },
      },
    ],
  },
  headless: {
    heading: {
      en: 'Medusa vs Saleor Headless Commerce Verdict',
      zh: 'Medusa 对比 Saleor 无头电商核心裁决',
    },
    compareHref: '/oss/vs/medusa-vs-saleor/',
    compareLabel: {
      en: 'Open Medusa vs Saleor stack & Cloud calculator',
      zh: '打开 Medusa vs Saleor 成本对比台',
    },
    rows: [
      {
        id: 'medusa',
        name: 'Medusa',
        verdict: 'good',
        rowTint: 'good',
        microBadge: { text: { en: 'MIT TS', zh: 'MIT / TS' }, tone: 'good' },
        license: { en: 'MIT Core', zh: 'MIT 核心' },
        licenseNote: { en: 'Staff RBAC & SSO require Enterprise', zh: '员工角色权限与 SSO 需企业协议' },
        minStack: { en: '2 GB+ RAM · Node · Postgres · Redis', zh: '2 GB+ 内存 · Node · PG · Redis' },
        freeCeiling: { en: 'Full headless commerce engine; no GMV fee', zh: '完整电商后端与管理台，零交易抽成' },
        paidFloor: { en: 'Cloud from $29/mo', zh: '官方云 $29/月起' },
        bestFor: { en: 'TypeScript teams building custom storefronts fast', zh: '熟悉 TypeScript 的中小开发团队' },
      },
      {
        id: 'saleor',
        name: 'Saleor',
        verdict: 'good',
        rowTint: 'none',
        license: { en: 'BSD-3-Clause', zh: 'BSD-3-Clause' },
        licenseNote: { en: 'Single open edition; no feature paywalls', zh: '单一完整开源版，无商业阉割' },
        minStack: { en: '6 services · Python/Django · GraphQL', zh: '6 个服务组装 · Python · GraphQL' },
        freeCeiling: { en: 'All core features unlocked in self-hosted repo', zh: '自建版功能全开，无商业限制' },
        paidFloor: { en: 'Commercial Cloud from $1,599/mo', zh: '商用托管 $1,599/月起' },
        bestFor: { en: 'Larger Python/GraphQL orgs needing zero license locks', zh: '有专职运维且追求零功能锁的工程团队' },
      },
    ],
  },
  lms: {
    heading: {
      en: 'Moodle vs Canvas LMS vs Kolibri at a Glance',
      zh: 'Moodle · Canvas LMS · Kolibri 开源网校横向裁决',
    },
    rows: [
      {
        id: 'moodle',
        name: 'Moodle',
        verdict: 'good',
        rowTint: 'good',
        license: { en: 'GPL-3.0', zh: 'GPL-3.0' },
        licenseNote: { en: 'Trademark restricts selling "Moodle" hosting', zh: '商标限制以 Moodle 名义对外卖托管' },
        minStack: { en: '2 vCPU · 1 GB+ RAM · PHP + DB', zh: '双核 · 1 GB+ 内存 · PHP + 数据库' },
        freeCeiling: { en: 'Full quizzes, SCORM & plugin ecosystem', zh: '完整测验、作业与海量插件生态' },
        paidFloor: { en: 'MoodleCloud ~$170–$2,110/yr', zh: 'MoodleCloud 年付约 $170–$2,110' },
        bestFor: { en: 'Training teams wanting light hosting & plugins', zh: '追求低机房开销与成熟题库插件的机构' },
      },
      {
        id: 'canvas-lms',
        name: 'Canvas LMS',
        verdict: 'caution',
        rowTint: 'none',
        license: { en: 'AGPL-3.0', zh: 'AGPL-3.0' },
        licenseNote: { en: 'Master branch quiet since 2026-04-30', zh: '默认 master 自 2026-04-30 无新提交' },
        minStack: { en: '8 GB+ RAM · Ruby/Node/PG/Redis', zh: '8 GB+ 内存 · 19 节生产安装流程' },
        freeCeiling: { en: 'Full university-grade LMS core', zh: '海外高校主流标准课程平台核心' },
        paidFloor: { en: '$0 self-host (heavy DevOps)', zh: '自建免授权费（运维成本高）' },
        bestFor: { en: 'Institutions with dedicated Rails/DevOps engineers', zh: '具备专职运维团队的院校机构' },
      },
      {
        id: 'kolibri',
        name: 'Kolibri',
        verdict: 'good',
        rowTint: 'none',
        license: { en: 'MIT License', zh: 'MIT 许可' },
        licenseNote: { en: 'Permissive commercial & offline use', zh: '宽松商用与离线教室友好' },
        minStack: { en: 'Raspberry Pi / Windows / Linux', zh: '普通电脑或树莓派即可安装' },
        freeCeiling: { en: '100% free offline learning server', zh: '完全免费离线教学分发平台' },
        paidFloor: { en: '$0', zh: '$0' },
        bestFor: { en: 'Low-connectivity or offline classrooms', zh: '弱网或离线教学场景（非卖课站）' },
      },
    ],
  },
  'live-video': {
    heading: {
      en: 'BigBlueButton vs LiveKit: Classroom App vs WebRTC Infrastructure',
      zh: 'BigBlueButton 对比 LiveKit：成品教室 vs 音视频底座',
    },
    rows: [
      {
        id: 'livekit',
        name: 'LiveKit',
        verdict: 'good',
        rowTint: 'good',
        license: { en: 'Apache-2.0', zh: 'Apache-2.0' },
        licenseNote: { en: 'Permissive SFU, Egress & AI Agents SDK', zh: '服务端、录制与 AI 语音 SDK 全宽松开源' },
        minStack: { en: 'Domain + UDP 50000-60000 + Redis', zh: '域名 + UDP 端口段 + Redis（录制加 4C4G）' },
        freeCeiling: { en: 'Unlimited self-hosted WebRTC rooms (build own UI)', zh: '自建不限分钟数，但会议界面需自研' },
        paidFloor: { en: 'Cloud free tier, then $50/mo', zh: '官方云免费档起，付费 $50/月起' },
        bestFor: { en: 'Developers embedding live video or voice AI agents', zh: '把实时音视频或 AI 语音集成进自家产品' },
      },
      {
        id: 'bigbluebutton',
        name: 'BigBlueButton',
        verdict: 'caution',
        rowTint: 'none',
        license: { en: 'LGPL-3.0', zh: 'LGPL-3.0' },
        licenseNote: { en: 'Paid classes allowed out of the box', zh: '开箱支持收费直播课与白板' },
        minStack: { en: '8 vCPU · 16 GB RAM · 250 Mbps', zh: '专用 8 核 · 16 GB 内存 · 250M 对称带宽' },
        freeCeiling: { en: 'Ready-made classroom UI, whiteboard & breakouts', zh: '装上即用的直播教室、白板与分组讨论' },
        paidFloor: { en: '$0 software (dedicated server cost)', zh: '免软件费（需专用高配服务器）' },
        bestFor: { en: 'Schools needing turnkey live classrooms', zh: '不想开发前端、直接开直播课的学校' },
      },
    ],
  },
  store: {
    heading: {
      en: 'WooCommerce vs PrestaShop vs Bagisto vs Shopware at a Glance',
      zh: 'WooCommerce · PrestaShop · Bagisto · Shopware 独立站网店横向裁决',
    },
    rows: [
      {
        id: 'woocommerce',
        name: 'WooCommerce',
        verdict: 'good',
        rowTint: 'good',
        license: { en: 'GPL-3.0', zh: 'GPL-3.0' },
        licenseNote: { en: 'Zero GMV cut or platform fee', zh: '零平台抽成，依赖 WordPress 生态' },
        minStack: { en: 'PHP + MySQL + WordPress host', zh: '普通 PHP + MySQL 主机即可运行' },
        freeCeiling: { en: 'Full store core; paid add-ons $29–$299/yr', zh: '完整商城核心；扩展插件年付 $29–$299' },
        paidFloor: { en: '$25–$350/mo host estimate', zh: '主机月估 $25–$350' },
        bestFor: { en: 'Content-heavy stores already on WordPress', zh: '已有 WordPress 官网或依赖插件生态的商家' },
      },
      {
        id: 'prestashop',
        name: 'PrestaShop',
        verdict: 'caution',
        rowTint: 'none',
        license: { en: 'OSL-3.0', zh: 'OSL-3.0' },
        licenseNote: { en: 'Modified public stores must publish changes', zh: '改核心并公网开店须沿用 OSL-3.0 开源' },
        minStack: { en: 'PHP + MySQL/MariaDB', zh: 'PHP + MySQL/MariaDB 虚拟主机或 VPS' },
        freeCeiling: { en: 'Standalone e-commerce CMS with EU catalog tools', zh: '独立建站系统，多币种与欧洲本地化完善' },
        paidFloor: { en: 'Hosted from €24/mo ex VAT', zh: '官方托管 €24/月起（不含税）' },
        bestFor: { en: 'European merchants wanting standalone PHP stores', zh: '专注欧洲市场、不绑定 WordPress 的商家' },
      },
      {
        id: 'bagisto',
        name: 'Bagisto',
        verdict: 'good',
        rowTint: 'none',
        license: { en: 'MIT License', zh: 'MIT 许可' },
        licenseNote: { en: 'Permissive Laravel core; paid marketplace add-on', zh: '核心宽松开源；多商户扩展一次性收费' },
        minStack: { en: 'One Docker command · Laravel + DB', zh: '一条 Docker 命令启动 · Laravel + 数据库' },
        freeCeiling: { en: 'Single-merchant store & admin panel', zh: '单店完整功能与后台管理' },
        paidFloor: { en: 'Cloud $25/mo · Multi-vendor $449', zh: '官方云 $25/月 · 多商户插件 $449' },
        bestFor: { en: 'Laravel shops wanting fast Docker setup & MIT code', zh: '熟悉 Laravel、需要宽松 MIT 协议的团队' },
      },
      {
        id: 'shopware',
        name: 'Shopware',
        verdict: 'caution',
        rowTint: 'bad',
        microBadge: { text: { en: '€1M GMV RULE', zh: '€100万 门槛' }, tone: 'warn' },
        license: { en: 'MIT Community', zh: 'MIT 社区版' },
        licenseNote: { en: 'Above €1M yearly GMV requires paid plan for store updates', zh: '年流水超 100 万欧元后买/更插件须购商业版' },
        minStack: { en: 'PHP 8.2+ · MySQL · Composer/Docker', zh: 'PHP 8.2+ · MySQL · Composer/Docker' },
        freeCeiling: { en: 'Free CE under €1M annual GMV', zh: '年流水 100 万欧元内免费社区版' },
        paidFloor: { en: 'Rise from €600/mo', zh: '商业 Rise 档 €600/月起' },
        bestFor: { en: 'Mid-market B2B/D2C stores ready for €600+/mo scale', zh: '中大型 B2B/D2C 品牌且预算匹配商业档' },
      },
    ],
  },
};

export function categoryMatrixForUse(useId: string, lang: Language): CategoryMatrixView | undefined {
  const raw = MATRICES[useId];
  if (!raw) return undefined;
  const pick = (b: BilingualText) => (lang === 'zh' ? b.zh : b.en);
  const columns: [string, string, string, string, string, string] =
    lang === 'zh'
      ? ['项目', '许可与商用规则', '自建最小架构', '免费自建上限', '付费起步价', '最适合的场景']
      : ['Tool', 'License & Resale Rule', 'Min Self-Host Stack', 'Free Self-Host Ceiling', 'Paid Floor', 'Best Pick When…'];

  return {
    heading: pick(raw.heading),
    columns,
    compareHref: raw.compareHref,
    compareLabel: raw.compareLabel ? pick(raw.compareLabel) : undefined,
    guideHref: raw.guideHref,
    guideLabel: raw.guideLabel ? pick(raw.guideLabel) : undefined,
    rows: raw.rows.map((r) => ({
      id: r.id,
      name: r.name,
      href: (lang === 'zh' ? '/zh' : '') + `/oss/${r.id}/`,
      verdict: r.verdict,
      rowTint: r.rowTint,
      microBadge: r.microBadge ? { text: pick(r.microBadge.text), tone: r.microBadge.tone } : undefined,
      license: pick(r.license),
      licenseNote: pick(r.licenseNote),
      minStack: pick(r.minStack),
      freeCeiling: pick(r.freeCeiling),
      paidFloor: pick(r.paidFloor),
      bestFor: pick(r.bestFor),
    })),
  };
}
