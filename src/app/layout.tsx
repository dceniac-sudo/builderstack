import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '@/components/Providers';

const TITLE = 'BuilderStack — What I use to build with AI agents, and what broke';
const DESCRIPTION =
  'Notes from one indie developer. Every tool here is one I use, and every note is something I tried myself.';

export const metadata: Metadata = {
  metadataBase: new URL('https://dceniac.com'),
  title: TITLE,
  description: DESCRIPTION,
  keywords: ['AI coding agents', 'Claude Code', 'Codex', 'multi-agent workflows', 'solo builder'],
  authors: [{ name: 'dceniac', url: 'https://dceniac.com' }],
  creator: '@dceniac',
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: 'https://dceniac.com',
    siteName: 'BuilderStack',
    locale: 'en_US',
    type: 'website',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'BuilderStack: what I use, and what I learned' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    creator: '@dceniac',
    images: ['/og.png'],
  },
};

// 在页面绘制之前运行：如果访客需要中文（手动选过，或浏览器是中文），先把正文藏起来，
// 等 I18nProvider 切到中文后再显示，避免“先英文、再跳成中文”的闪动。英文访客不受影响。
// 1.5 秒后无论如何都会显示，防止脚本出错时页面一直空白。
const LANG_BOOTSTRAP = `(function(){try{var s=localStorage.getItem('builderstack_lang');var zh=s?s==='zh':(navigator.language||'').toLowerCase().indexOf('zh')===0;if(zh){var d=document.documentElement;d.classList.add('i18n-pending');d.lang='zh-CN';setTimeout(function(){d.classList.remove('i18n-pending')},1500);}}catch(e){}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: LANG_BOOTSTRAP }} />
      </head>
      <body className="bg-zinc-950 text-zinc-100 antialiased selection:bg-amber-500 selection:text-black min-h-screen flex flex-col bg-grid-pattern">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
