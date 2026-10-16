'use client';

import React, { createContext, useContext } from 'react';

import { localePath, type Language } from '@/lib/i18n-path';

export { localePath };
export type { Language };

// 你的 X (Twitter) 用户名，点击将直接唤起一键关注
export const X_HANDLE = 'dceniac';

export const DICTIONARY = {
  en: {
    nav: {
      followX: `Follow @${X_HANDLE}`,
      industries: 'Categories',
    },
    oss: {
      crumb: 'Open source',
      homeBadge: (n: number, m: number, date: string) => `${n} projects in ${m} ${m === 1 ? 'category' : 'categories'} checked, ${date}`,
      basisItems: ['License text', 'Commit history', 'Official deployment docs'],
      colProject: 'Project',
      hint: 'Open a row for the reasoning',
      seeSources: 'See sources',
      industriesTitle: 'Categories',
      industriesSub: 'Start from what you need solved, or from your industry.',
      byUse: 'By what you need',
      byIndustry: 'By industry',
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
      considerIf: 'Consider it if',
      lookElsewhereIf: 'Look elsewhere if',
      altTitle: 'If your priority is different',
      inIndustries: 'How each industry uses it',
      ctaTitle: 'Your industry is not here?',
      ctaBody: 'Tell me the industry and what you need solved. I will look at it next.',
      ctaButton: `Message @${X_HANDLE} on X`,
    },
    footer: {
      copyright: 'BuilderStack © 2026',
    },
  },
  zh: {
    nav: {
      followX: `关注 @${X_HANDLE}`,
      industries: '分类',
    },
    oss: {
      crumb: '开源项目',
      homeBadge: (n: number, m: number, date: string) => `${m} 个分类 ${n} 个项目已核对，${date}`,
      basisItems: ['许可证原文', '仓库提交记录', '官方部署文档'],
      colProject: '项目',
      hint: '点一行看依据',
      seeSources: '看出处',
      industriesTitle: '全部分类',
      industriesSub: '从要解决的事找，或者从你的行业找。',
      byUse: '按要解决的事',
      byIndustry: '按行业',
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
      considerIf: '可以考虑',
      lookElsewhereIf: '另找别的',
      altTitle: '如果你更看重别的',
      inIndustries: '各行业怎么用',
      ctaTitle: '没有你的行业？',
      ctaBody: '告诉我行业和想解决的事，下一个就评估它。',
      ctaButton: `在 X 上私信 @${X_HANDLE}`,
    },
    footer: {
      copyright: 'BuilderStack © 2026',
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
