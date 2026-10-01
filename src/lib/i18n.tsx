'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'zh';

// 你的 X (Twitter) 用户名，点击将直接唤起一键关注
export const X_HANDLE = 'dceniac';

export const DICTIONARY = {
  en: {
    nav: {
      tagline: 'Curated for Solo Builders & Creators',
      searchPlaceholder: 'Search tools, alts (Zapier, Notion)...',
      submit: 'Submit Tool',
      submitAlert: 'Tool Submission: Form coming soon with 24h featured review!',
      edgeLive: 'Edge Live',
      followX: `Follow @${X_HANDLE}`,
    },
    hero: {
      badge: 'AI-POWERED SOLOPRENEUR STACK',
      badgeSub: '2026 Curated Stack',
      titleLine1: 'No Expensive Team Needed.',
      titleLine2: 'Build Your Solo AI Production Loop.',
      subtitle:
        'Curated open-source alternatives, AI workflows, and indie builder stacks. Stop paying unnecessary SaaS taxes. Take full control of your data and code.',
      metricTools: 'Curated Tools',
      metricLockin: 'Zero Vendor Lock-in',
      metricEdge: 'Global Edge Distributed',
    },
    filter: {
      label: 'Tags:',
      allTags: 'All Tags',
      showing: 'Showing',
      toolsUnit: 'tools',
      hint: 'Click any card to view pain-point breakdown & Docker self-host commands',
      emptyTitle: 'No tools found under this tag',
      emptyClear: 'Clear tag filter',
    },
    card: {
      featured: 'Featured',
      altTo: '⚡ Alt to:',
      selfHost: 'Self-host',
      visit: 'Visit website',
    },
    modal: {
      altAim: '⚡ Target Alternative:',
      breakthrough: 'CORE VALUE & BREAKTHROUGH',
      oneClickSelfHost: 'ONE-CLICK DOCKER / LOCAL RUN',
      copyCode: 'Copy Command',
      copied: 'Copied!',
      visitSite: 'Visit Website',
    },
    search: {
      placeholder: 'Search tools, alts (e.g. Zapier, Notion), tags (Docker, Local AI)...',
      noResult: 'No tools found matching',
      trySearching: 'You can try searching for "Notion" or "Docker"',
    },
    footer: {
      copyright: 'BuilderStack © 2026. Made for Solo Creators.',
    },
  },
  zh: {
    nav: {
      tagline: '一人公司与独立创造者武器库',
      searchPlaceholder: '快搜开源替代、工具...',
      submit: '提交收录',
      submitAlert: '提交收录：后续可接入表单，支持免费提交或付费 24 小时极速审核置顶！',
      edgeLive: '全球边缘在线',
      followX: `关注 @${X_HANDLE}`,
    },
    hero: {
      badge: 'AI-POWERED SOLOPRENEUR STACK',
      badgeSub: '2026 独立创造者精选',
      titleLine1: '不用昂贵团队，',
      titleLine2: '一人搭建全自动 AI 生产力闭环',
      subtitle:
        '严选开源平替、AI 自动化工作流与出海全栈工具链。拒绝高昂 SaaS 订阅税，掌控数据隐私、代码自主与自由分发。',
      metricTools: '标杆工具',
      metricLockin: '100% 拒绝捆绑',
      metricEdge: 'Cloudflare 全球边缘分发',
    },
    filter: {
      label: '标签:',
      allTags: '全部标签',
      showing: '显示',
      toolsUnit: '个神器',
      hint: '点击卡片可查看详细痛点分析与 Docker 命令',
      emptyTitle: '当前标签下暂无收录',
      emptyClear: '清空标签筛选',
    },
    card: {
      featured: '精选',
      altTo: '⚡ Alt to:',
      selfHost: 'Self-host',
      visit: '直达官网',
    },
    modal: {
      altAim: '⚡ 瞄准商业替代:',
      breakthrough: '核心价值与痛点突破',
      oneClickSelfHost: '一键本地 / Docker 跑起',
      copyCode: '复制代码',
      copied: '已复制!',
      visitSite: '直达官网',
    },
    search: {
      placeholder: '搜索任何工具、替代对象（如 Zapier, Notion）、或标签（Docker, Local AI）...',
      noResult: '未找到与此相关的工具',
      trySearching: '你可以试着搜索 "Notion" 或 "Docker"',
    },
    footer: {
      copyright: 'BuilderStack © 2026. 专为超级个体与创造者打造。',
    },
  },
};

interface I18nContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (typeof DICTIONARY)['en'];
}

const I18nContext = createContext<I18nContextType | null>(null);

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>('en');

  useEffect(() => {
    const saved = localStorage.getItem('builderstack_lang') as Language;
    if (saved && (saved === 'en' || saved === 'zh')) {
      setLangState(saved);
      return;
    }
    if (typeof navigator !== 'undefined') {
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.startsWith('zh')) {
        setLangState('zh');
      } else {
        setLangState('en');
      }
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('builderstack_lang', newLang);
  };

  const t = DICTIONARY[lang];

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};
