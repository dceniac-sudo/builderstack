import React from 'react';
import { Providers } from '@/components/Providers';
import type { Language } from '@/lib/i18n';

// 只放在英文页面里，在页面绘制之前运行：访客上次自己选了中文，就直接换到同一页面的中文地址。
// 没选过的访客一律看英文，不按浏览器语言猜（作者 2026-10-11 定：默认是英文页面）。
// 文章页（/notes/）只有英文版，不跳。
const REDIRECT_TO_ZH = `(function(){try{if(localStorage.getItem('builderstack_lang')==='zh'&&!/^\\/notes(\\/|$)/.test(location.pathname)){document.documentElement.style.visibility='hidden';location.replace('/zh'+location.pathname+location.search+location.hash);}}catch(e){}})();`;

// 英文和中文各有一套根布局，都用这个外壳。两套根布局之间跳转时浏览器会整页加载，
// 所以切换语言等于打开另一个语言的页面，不存在页面内容中途变化的问题。
export function RootShell({ lang, children }: { lang: Language; children: React.ReactNode }) {
  return (
    <html lang={lang === 'zh' ? 'zh-CN' : 'en'}>
      {lang === 'en' && (
        <head>
          <script dangerouslySetInnerHTML={{ __html: REDIRECT_TO_ZH }} />
        </head>
      )}
      <body className="bg-white text-[#141414] antialiased min-h-screen flex flex-col">
        <Providers lang={lang}>{children}</Providers>
      </body>
    </html>
  );
}
