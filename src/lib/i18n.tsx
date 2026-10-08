'use client';

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

export type Language = 'en' | 'zh';

// 你的 X (Twitter) 用户名，点击将直接唤起一键关注
export const X_HANDLE = 'dceniac';
export const GITHUB_URL = 'https://github.com/dceniac-sudo';

export const DICTIONARY = {
  en: {
    nav: {
      tagline: 'What I use, and what I learned',
      searchPlaceholder: 'Search tools and notes...',
      followX: `Follow @${X_HANDLE}`,
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
      copyright: 'BuilderStack © 2026. Written by one person, for people who build alone.',
      wechat: '',
      wechatButton: '',
    },
  },
  zh: {
    nav: {
      tagline: '我在用什么，学到了什么',
      searchPlaceholder: '搜工具和笔记…',
      followX: `关注 @${X_HANDLE}`,
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
      copyright: 'BuilderStack © 2026. 一个人写的，给一个人干活的人看。',
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

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>('en');
  // 访客实际需要的语言；确定之前为 null
  const wanted = useRef<Language | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('builderstack_lang') as Language;
    if (saved === 'en' || saved === 'zh') {
      wanted.current = saved;
    } else {
      wanted.current = navigator.language.toLowerCase().startsWith('zh') ? 'zh' : 'en';
    }
    setLangState(wanted.current);
  }, []);

  // 页面声明的语言跟着实际显示的语言走；显示的语言和访客需要的一致后，再放出正文
  useEffect(() => {
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    if (wanted.current === lang) {
      document.documentElement.classList.remove('i18n-pending');
    }
  }, [lang]);

  const setLang = (newLang: Language) => {
    wanted.current = newLang;
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
