import React from 'react';
import { Providers } from '@/components/Providers';
import type { Language } from '@/lib/i18n';

// 只放在英文页面里，在页面绘制之前运行：访客上次选了中文，或者从没选过而浏览器是中文，
// 就直接换到同一页面的中文地址。英文访客什么都不会发生。
const REDIRECT_TO_ZH = `(function(){try{var s=localStorage.getItem('builderstack_lang');var zh=s?s==='zh':(navigator.language||'').toLowerCase().indexOf('zh')===0;if(zh){document.documentElement.style.visibility='hidden';location.replace('/zh'+location.pathname+location.search+location.hash);}}catch(e){}})();`;

// 英文和中文各有一套根布局，都用这个外壳。两套根布局之间跳转时浏览器会整页加载，
// 所以切换语言等于打开另一个语言的页面，不存在页面内容中途变化的问题。
export function RootShell({ lang, children }: { lang: Language; children: React.ReactNode }) {
  return (
    <html lang={lang === 'zh' ? 'zh-CN' : 'en'} className="dark">
      {lang === 'en' && (
        <head>
          <script dangerouslySetInnerHTML={{ __html: REDIRECT_TO_ZH }} />
        </head>
      )}
      <body className="bg-zinc-950 text-zinc-100 antialiased selection:bg-amber-500 selection:text-black min-h-screen flex flex-col bg-grid-pattern">
        <Providers lang={lang}>{children}</Providers>
      </body>
    </html>
  );
}
