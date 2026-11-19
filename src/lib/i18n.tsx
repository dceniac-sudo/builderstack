'use client';

import React, { createContext, useContext } from 'react';

import { localePath, type Language } from '@/lib/i18n-path';

export { localePath };
export type { Language };

// 你的 X (Twitter) 用户名，点击将直接唤起一键关注
export const X_HANDLE = 'dceniac';
export const SPONSOR_EMAIL = 'sponsor@dceniac.com';
export const SUBSTACK_URL = 'https://builderstackoss.substack.com';

export const DICTIONARY = {
  en: {
    nav: {
      followX: `Follow @${X_HANDLE}`,
      industries: 'Categories',
      comparisons: 'Comparisons',
      guides: 'Guides',
      methodology: 'Methodology',
      watch: 'License Watch',
    },
    watch: {
      kicker: 'Open-Core License & Pricing Watch',
      title: 'Track license switches, Enterprise paywall jumps & new RAM benchmarks',
      body: 'One primary-source dispatch per month via Substack or RSS. Direct diffs of changed vendor terms, newly gated ee/ directories, and real infrastructure crossover math. Zero spam, zero paid placements.',
      subscribeButton: 'Subscribe via Substack',
      rssButton: 'RSS /rss.xml',
    },
    guides: {
      hubBadge: (n: number, date: string) => `${n} primary-source benchmark reports · Updated ${date}`,
      hubTitle: 'Open-source & AI engineering benchmarks',
      hubSub:
        'Long-form license audits, self-hosted RAM footprints, and SaaS paywall crossover reports verified directly from repository source trees and official pricing tables.',
      basisHandsOn: 'Hands-on benchmark',
      basisPrimary: 'Primary-source audit',
      readReport: 'Read report',
      indexJump: 'Index jump',
      sec01Tag: 'Section 01 / Executive Verdicts',
      inspectRow: 'Inspect',
      legendGood: 'Permissive / Free Core',
      legendWarn: 'Open-Core Conditions',
      legendBad: 'Enterprise Paywall Cliff',
      faqKicker: 'Verified Factual Inquiries',
      schemaSynced: 'Schema Verified',
      moreGuidesTitle: 'More BuilderStack benchmark reports',
      allGuidesLink: 'All guides',
      relatedGuideKicker: 'Deep-Dive Benchmark Report',
      readGuideCta: 'Read full benchmark',
    },
    categoryMatrix: {
      kicker: 'Category Verdict Matrix · Quick-Compare',
      compareLink: 'Open interactive TCO calculator',
      guidePrefix: 'Deep-dive guide:',
    },
    oss: {
      crumb: 'Open source',
      homeBadge: (n: number, m: number, date: string) => `${n} projects in ${m} ${m === 1 ? 'category' : 'categories'} checked, ${date}`,
      basisItems: ['License text', 'Commit history', 'Official deployment docs'],
      colProject: 'Project',
      hint: 'Open a row for the reasoning',
      seeSources: 'See sources',
      industriesTitle: 'Categories',
      industriesSub: 'Find your industry, then what you need solved.',
      searchPlaceholder: 'Search a project, or what you need, like “exams”',
      projectCount: (n: number) => `${n} ${n === 1 ? 'project' : 'projects'}`,
      checked: 'Last checked',
      sum: { good: 'Free to use commercially', caution: 'Commercial use with conditions', bad: 'Paid license needed' },
      pick: 'What you need',
      all: 'All',
      only: 'Free for commercial use only',
      count: (n: number) => `${n} ${n === 1 ? 'project' : 'projects'}. Open one for the reasoning and sources.`,
      empty: 'Nothing matches. Try another word, or turn the switch off.',
      emptyCategory: 'No projects in this category yet.',
      cols: { commercial: 'Commercial use', alive: 'Maintained', deploy: 'Setup', cost: 'Cost' },
      questions: {
        commercial: 'Can you use it commercially?',
        alive: 'Is it still maintained?',
        deploy: 'How hard is it to deploy?',
        cost: 'What does it cost?',
        caveats: 'What to watch out for',
      },
      short: {
        commercial: { good: 'Yes', caution: 'Conditions', bad: 'Paid license', pending: 'Unverified' },
        alive: { good: 'Active', caution: 'Slowing', bad: 'Stalled', pending: 'Unverified' },
        deploy: { good: 'Easy', caution: 'Moderate', bad: 'Hard', pending: 'Unverified' },
        cost: { good: 'Low', caution: 'Moderate', bad: 'High', pending: 'Unverified' },
      },
      needs: 'What else you need',
      basisHandsOn: 'The author has run this project. The points above are based on the license text, commit history and official docs.',
      handsOn: 'Tried by the author',
      repo: 'Open the repository',
      site: 'Website',
      draft: 'Draft',
      fitTitle: 'Does it fit your team?',
      priceAnswer: 'Pricing',
      considerIf: 'Consider it if',
      lookElsewhereIf: 'Look elsewhere if',
      pickProject: (name: string) => `Pick ${name}`,
      altTitle: 'If your priority is different',
      inIndustries: 'How each industry uses it',
      ctaTitle: 'Your industry is not here?',
      ctaBody: 'Tell me the industry and what you need solved. I will look at it next.',
      ctaButton: `Message @${X_HANDLE} on X`,
      compareTag: 'Compare',
      compareHeadToHead: 'Head-to-head comparison & calculator',
      compareOpenPage: 'Open split comparison',
      checkedPrefix: 'Checked',
      primarySourcesLabel: 'Primary sources',
      jumpToCalc: 'Jump to calculator',
      copyEstimate: 'Copy estimate',
      copiedEstimate: 'Copied',
      matrixTitle: '6-Dimension Audit Matrix',
      matrixSub: 'Hover any source pill to inspect exact primary quotes & verification URLs.',
      tabAllDimensions: 'All 6 Dimensions',
      tabLicenseSelfHost: 'License & Self-Host',
      tabPricingEnterprise: 'Pricing & Enterprise',
      matrixColDimension: 'Dimension',
      faqTitle: 'Frequently Asked Questions',
      faqSub: 'Verified against primary license texts, docs, and current pricing tables.',
      moreComparisonsTitle: 'Other verified head-to-head comparisons',
      allComparisonsLink: 'All comparisons',
      chooseIfPrefix: (name: string) => `Choose ${name} if...`,
      watchOutPrefix: 'Watch out for...',
      vsHubBadge: '5 verified head-to-head audits · Interactive cost calculators',
      vsHubTitle: 'Open-source vs SaaS comparisons',
      vsHubSub: 'Side-by-side audits of commercial license traps, self-hosted RAM footprints, and real seat-cost math before you commit.',
      vsMethodTitle: 'How we audit head-to-head comparisons',
      howWeVerifyLink: 'How we verify & commercial disclosure',
    },
    footer: {
      copyright: 'BuilderStack © 2026',
      disclaimer: 'Primary-source open-source audits · Affiliate links marked rel="sponsored" & firewalled from verdicts.',
      about: 'Methodology & Disclosure',
      guides: 'Guides',
      rss: 'RSS Feed',
    },
  },
  zh: {
    nav: {
      followX: `关注 @${X_HANDLE}`,
      industries: '分类',
      comparisons: '选型对比',
      guides: '深度指南',
      methodology: '核验口径',
      watch: '协议与涨价追踪',
    },
    watch: {
      kicker: 'Open-Core 协议与定价追踪',
      title: '追踪开源协议变更、企业版付费墙跃升与最新内存实测',
      body: '每月通过 Substack 或 RSS 发送一期一手核验简报：汇总热门开源商业工具的协议变动、新增闭源 ee/ 模块与自建成本拐点。零垃圾营销，编辑裁决独立。',
      subscribeButton: '在 Substack 订阅',
      rssButton: 'RSS /rss.xml',
    },
    guides: {
      hubBadge: (n: number, date: string) => `${n} 篇一手实证深度报告 · 更新于 ${date}`,
      hubTitle: '开源商业与 AI 工具深度拆解报告',
      hubSub: '直接对照仓库源码目录、许可证原文与官方价格表撰写的付费墙横向矩阵、自托管内存预算与 SaaS 替代算账报告。',
      basisHandsOn: '含实机基准采样',
      basisPrimary: '一手源码与定价核验',
      readReport: '阅读全文',
      indexJump: '目录跳转',
      sec01Tag: '第 01 节 / 核心结论',
      inspectRow: '查看详情',
      legendGood: '宽松协议 / 免费核心',
      legendWarn: 'Open-Core 商用有条件',
      legendBad: '企业版高危付费墙',
      faqKicker: '一手核验常见问题',
      schemaSynced: '结构化数据同源',
      moreGuidesTitle: '更多 BuilderStack 深度报告',
      allGuidesLink: '全部深度指南',
      relatedGuideKicker: '关联深度实证报告',
      readGuideCta: '阅读深度报告',
    },
    categoryMatrix: {
      kicker: '品类横向裁决矩阵 · 一表选型',
      compareLink: '打开交互式 TCO 算账器',
      guidePrefix: '深度实证长文：',
    },
    oss: {
      crumb: '开源项目',
      homeBadge: (n: number, m: number, date: string) => `${m} 个分类 ${n} 个项目已核对，${date}`,
      basisItems: ['许可证原文', '仓库提交记录', '官方部署文档'],
      colProject: '项目',
      hint: '点一行看依据',
      seeSources: '看出处',
      industriesTitle: '全部分类',
      industriesSub: '先找到你的行业，再挑要解决的事。',
      searchPlaceholder: '搜项目名，或者你想解决的事，比如“考试”',
      projectCount: (n: number) => `${n} 个项目`,
      checked: '最近核对',
      sum: { good: '可直接商用', caution: '商用有条件', bad: '要买授权' },
      pick: '想解决的事',
      all: '全部',
      only: '只看能直接商用的',
      count: (n: number) => `共 ${n} 个，点开看依据和出处`,
      empty: '没有符合的项目，换个词或者关掉开关再看。',
      emptyCategory: '这个分类下暂时还没有项目。',
      cols: { commercial: '让不让商用', alive: '有没有人维护', deploy: '好不好装', cost: '要花多少钱' },
      questions: {
        commercial: '让不让商用',
        alive: '有没有人维护',
        deploy: '好不好装',
        cost: '要花多少钱',
        caveats: '要留神',
      },
      short: {
        commercial: { good: '可以', caution: '有条件', bad: '要买授权', pending: '待核对' },
        alive: { good: '在更新', caution: '放缓', bad: '停更', pending: '待核对' },
        deploy: { good: '容易', caution: '中等', bad: '门槛高', pending: '待核对' },
        cost: { good: '低', caution: '中等', bad: '高', pending: '待核对' },
      },
      needs: '还要另外准备什么',
      basisHandsOn: '作者实践过这个项目。上面各项的依据是许可证原文、仓库提交记录和官方文档。',
      handsOn: '作者实践过',
      repo: '打开仓库',
      site: '官网',
      draft: '草稿',
      fitTitle: '适不适合你的团队',
      priceAnswer: '价格',
      considerIf: '可以考虑',
      lookElsewhereIf: '另找别的',
      pickProject: (name: string) => `选 ${name}`,
      altTitle: '如果你更看重别的',
      inIndustries: '各行业怎么用',
      ctaTitle: '没有你的行业？',
      ctaBody: '告诉我行业和想解决的事，下一个就评估它。',
      ctaButton: `在 X 上私信 @${X_HANDLE}`,
      compareTag: '对比',
      compareHeadToHead: '直接对比与成本试算器',
      compareOpenPage: '打开双栏裁决对比',
      checkedPrefix: '核对于',
      primarySourcesLabel: '一手出处',
      jumpToCalc: '跳到计算器',
      copyEstimate: '复制测算结论',
      copiedEstimate: '已复制',
      matrixTitle: '六维一手实测矩阵',
      matrixSub: '鼠标悬停或点击出处徽标，可核对一手原文与验证链接。',
      tabAllDimensions: '全部六项',
      tabLicenseSelfHost: '协议与自建',
      tabPricingEnterprise: '定价与企业门槛',
      matrixColDimension: '评估维度',
      faqTitle: '常见问题解答',
      faqSub: '每一条均依据仓库许可证原文、官方部署文档与当前标价撰写。',
      moreComparisonsTitle: '更多选型对比与试算',
      allComparisonsLink: '全部对比',
      chooseIfPrefix: (name: string) => `适合选 ${name} 的情况`,
      watchOutPrefix: '需留神',
      vsHubBadge: '5 组一手核对选型对比 · 内置真实价格试算器',
      vsHubTitle: '开源方案对比商业 SaaS',
      vsHubSub: '并排拆解许可证坑点、自建服务器门槛与按人数/用量计费的真实拐点。',
      vsMethodTitle: '选型对比核对口径说明',
      howWeVerifyLink: '核验口径与商业披露',
    },
    footer: {
      copyright: 'BuilderStack © 2026',
      disclaimer: '一手仓库核验目录 · 商业返佣链接均标 rel="sponsored" 并与编辑裁决严格隔离。',
      about: '核验口径与披露',
      guides: '深度指南',
      rss: 'RSS 订阅',
    },
  },
};

interface I18nContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (typeof DICTIONARY)['en'];
}

const I18nContext = createContext<I18nContextType | null>(null);

export const I18nProvider: React.FC<{ lang: Language; children: React.ReactNode }> = ({ lang, children }) => {
  // 切换语言就是跳到另一种语言的同一个页面，并记住这次选择
  const setLang = (newLang: Language) => {
    if (newLang === lang) return;
    try {
      localStorage.setItem('builderstack_lang', newLang);
    } catch {}
    const { pathname, search, hash } = window.location;
    const base = pathname.replace(/^\/zh(?=\/|$)/, '') || '/';
    window.location.assign(localePath(newLang, base) + search + hash);
  };

  return (
    <I18nContext.Provider value={{ lang, setLang, t: DICTIONARY[lang] }}>{children}</I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};
