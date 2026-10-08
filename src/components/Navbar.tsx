'use client';

import React from 'react';
import { Search } from 'lucide-react';
import { LanguageToggle } from '@/components/LanguageToggle';
import { useI18n, X_HANDLE } from '@/lib/i18n';

interface NavbarProps {
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSearch }) => {
  const { t } = useI18n();

  // 触发 X 官方关注小弹窗
  const handleFollowClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const url = `https://twitter.com/intent/follow?screen_name=${X_HANDLE}`;
    const width = 550;
    const height = 650;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;
    window.open(
      url,
      'FollowOnX',
      `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, copyhistory=no, width=${width}, height=${height}, top=${top}, left=${left}`
    );
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/5 bg-zinc-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Logo 区域 */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 text-zinc-950 font-black font-mono text-base shadow-lg shadow-amber-500/20 shrink-0">
            B
          </div>
          <div className="min-w-0">
            <span className="font-semibold text-zinc-100 text-sm sm:text-base tracking-tight">
              BuilderStack
            </span>
            <p className="text-[11px] text-zinc-500 hidden md:block">{t.nav.tagline}</p>
          </div>
        </div>

        {/* 中间搜索触发器 */}
        <button
          onClick={onOpenSearch}
          className="flex items-center gap-2 sm:gap-3 rounded-xl bg-zinc-900/90 border border-zinc-800/80 px-2.5 sm:px-3 py-1.5 text-xs text-zinc-400 hover:text-zinc-200 hover:border-zinc-700 transition-all flex-1 min-w-0 max-w-[40px] sm:max-w-[240px] md:max-w-xs shadow-inner group"
          aria-label={t.nav.searchPlaceholder}
        >
          <Search className="w-3.5 h-3.5 text-zinc-500 group-hover:text-amber-400 transition-colors shrink-0" />
          <span className="flex-1 text-left truncate text-xs hidden sm:inline">{t.nav.searchPlaceholder}</span>
          <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded bg-zinc-800/80 px-1.5 py-0.5 text-[10px] font-mono text-zinc-400 border border-zinc-700">
            ⌘K
          </kbd>
        </button>

        {/* 右侧：X 关注 + 语言切换 */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          <a
            href={`https://twitter.com/intent/follow?screen_name=${X_HANDLE}`}
            onClick={handleFollowClick}
            target="_blank"
            rel="noopener noreferrer"
            title={`Follow @${X_HANDLE} on X`}
            className="flex items-center justify-center gap-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800/90 text-zinc-100 hover:text-white p-2 sm:px-3 sm:py-1.5 text-xs font-medium border border-white/10 hover:border-amber-500/40 shadow-sm transition-all duration-200 group active:scale-95"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="w-3.5 h-3.5 fill-current text-zinc-300 group-hover:text-amber-400 transition-colors"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            <span className="font-mono text-[11px] font-semibold hidden sm:inline">{t.nav.followX}</span>
          </a>

          <LanguageToggle />
        </div>
      </div>
    </header>
  );
};
