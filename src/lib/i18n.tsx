'use client';

import React, { createContext, useContext } from 'react';

import { localePath, type Language } from '@/lib/i18n-path';

export { localePath };
export type { Language };

// 你的 X (Twitter) 用户名，点击将直接唤起一键关注
export const X_HANDLE = 'dceniac';
export const GITHUB_URL = 'https://github.com/dceniac-sudo';

export const DICTIONARY = {
  en: {
    nav: {
      searchPlaceholder: 'Search tools and notes...',
      followX: `Follow @${X_HANDLE}`,
      industries: 'Industries',
      notes: 'Notes',
    },
    oss: {
      crumb: 'Open source by industry',
      homeBadge: (n: number, m: number, date: string) => `${n} projects in ${m} ${m === 1 ? 'industry' : 'industries'} checked, ${date}`,
      basisItems: ['License text', 'Commit history', 'Official deployment docs'],
      colProject: 'Project',
      hint: 'Open a row for the reasoning',
      seeSources: 'See sources',
      industriesTitle: 'Industries',
      industriesSub: 'Industries marked “In review” have no reviewed projects yet.',
      searchPlaceholder: 'Search a project, or what you need, like “exams”',
      evaluating: 'In review',
      projectCount: (n: number) => `${n} ${n === 1 ? 'project' : 'projects'}`,
      basis: 'Based on license texts, commit history and official deployment docs. I have not deployed each one myself.',
      checked: 'Last checked',
      sum: { good: 'Free to use commercially', caution: 'Commercial use with conditions', bad: 'Paid license needed' },
      pick: 'What you need',
      all: 'All',
      only: 'Free for commercial use only',
      count: (n: number) => `${n} ${n === 1 ? 'project' : 'projects'}. Open one for the reasoning and sources.`,
      empty: 'Nothing matches. Try another word, or turn the switch off.',
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
      repo: 'Open the repository',
      site: 'Website',
      draft: 'Draft',
      ctaTitle: 'Your industry is not here?',
      ctaBody: 'Tell me the industry and what you need solved. I will look at it next.',
      ctaButton: `Message @${X_HANDLE} on X`,
      qrText: '',
    },
    hero: {
      badge: 'Notes from one indie developer',
      curator: `by @${X_HANDLE}`,
      titleLine1: 'What I actually use to build with AI agents.',
      titleLine2: 'And what broke.',
      subtitle:
        'Every tool here is one I use, and every note is something I tried myself.',
    },
    notes: {
      heading: 'What I learned',
      sub: 'Things I tried myself, newest first.',
      read: 'Read the full note',
      readOnX: 'Thread on X',
      readWechat: 'Article (Chinese)',
      repo: 'Code',
    },
    built: {
      heading: 'What I built',
      sub: 'Tools and projects I made myself.',
      visit: 'Open',
      repo: 'Code',
      status: { live: 'Live', 'open-source': 'Open source', private: 'Private, for my own use' },
    },
    stack: {
      heading: 'What I use',
      sub: 'Each one with my own note. The dropped ones stay, with the reason.',
      showing: 'Showing',
      toolsUnit: 'items',
      empty: 'Nothing here yet.',
    },
    status: {
      daily: 'Daily',
      sometimes: 'Sometimes',
      dropped: 'Dropped',
    },
    card: {
      visit: 'Visit website',
    },
    modal: {
      myNote: 'MY NOTE',
      command: 'COMMAND',
      copyCode: 'Copy',
      copied: 'Copied!',
      visitSite: 'Visit Website',
      copyLink: 'Copy link',
    },
    article: {
      back: 'All notes',
      cta: 'I post hands-on notes like this on X.',
    },
    search: {
      placeholder: 'Search by name or by anything in my notes...',
      noResult: 'Nothing matches',
      trySearching: 'Try “Claude” or “dropped”.',
    },
    footer: {
      copyright: 'BuilderStack © 2026',
      wechat: '',
      wechatButton: '',
    },
  },
  zh: {
    nav: {
      searchPlaceholder: '搜工具和笔记…',
      followX: `关注 @${X_HANDLE}`,
      industries: '行业',
      notes: '笔记',
    },
    oss: {
      crumb: '按行业找开源项目',
      homeBadge: (n: number, m: number, date: string) => `${m} 个行业 ${n} 个项目已核对，${date}`,
      basisItems: ['许可证原文', '仓库提交记录', '官方部署文档'],
      colProject: '项目',
      hint: '点一行看依据',
      seeSources: '看依据和出处',
      industriesTitle: '全部行业',
      industriesSub: '标着“评估中”的行业还没有评估完的项目。',
      searchPlaceholder: '搜项目名，或者你想解决的事，比如“考试”',
      evaluating: '评估中',
      projectCount: (n: number) => `${n} 个项目`,
      basis: '依据是许可证原文、仓库提交记录和官方部署文档，没有逐个亲自部署。',
      checked: '最近核对',
      sum: { good: '可直接商用', caution: '商用有条件', bad: '要买授权' },
      pick: '想解决的事',
      all: '全部',
      only: '只看能直接商用的',
      count: (n: number) => `共 ${n} 个，点开看依据和出处`,
      empty: '没有符合的项目，换个词或者关掉开关再看。',
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
      repo: '打开仓库',
      site: '官网',
      draft: '草稿',
      ctaTitle: '没有你的行业？',
      ctaBody: '告诉我行业和想解决的事，下一个就评估它。',
      ctaButton: '在公众号“老孙不会AI”留言',
      qrText: '微信扫码关注公众号“老孙不会AI”，在后台留言',
    },
    hero: {
      badge: '一个独立开发者的笔记',
      curator: `@${X_HANDLE}`,
      titleLine1: '我用 AI Agent 干活时真正在用的东西，',
      titleLine2: '以及翻过的车',
      subtitle: '这里的每个工具我都在用，每条笔记都是我亲手试过的。',
    },
    notes: {
      heading: '学到了什么',
      sub: '都是自己动手试过的事，新的在前。',
      read: '读全文',
      readOnX: 'X 上的帖子',
      readWechat: '公众号文章',
      repo: '代码',
    },
    built: {
      heading: '做过什么',
      sub: '我自己做的工具和项目。',
      visit: '打开',
      repo: '代码',
      status: { live: '已上线', 'open-source': '已开源', private: '自用，未公开' },
    },
    stack: {
      heading: '在用什么',
      sub: '每个都带一句我自己的话。弃用的也留着，写明原因。',
      showing: '显示',
      toolsUnit: '项',
      empty: '这里还没有内容。',
    },
    status: {
      daily: '每天用',
      sometimes: '偶尔用',
      dropped: '已弃用',
    },
    card: {
      visit: '访问官网',
    },
    modal: {
      myNote: '我的评语',
      command: '命令',
      copyCode: '复制',
      copied: '已复制',
      visitSite: '访问官网',
      copyLink: '复制链接',
    },
    article: {
      back: '全部笔记',
      cta: '我在 X 上持续发这类亲手试过的笔记。',
    },
    search: {
      placeholder: '按名字搜，或者搜评语里的任何词…',
      noResult: '没有找到',
      trySearching: '可以试试“Claude”或“弃用”。',
    },
    footer: {
      copyright: 'BuilderStack © 2026',
      wechat: '微信扫码关注公众号【老孙不会AI】',
      wechatButton: '微信公众号【老孙不会AI】',
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
