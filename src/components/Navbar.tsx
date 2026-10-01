'use client';

import React from 'react';
import { Search, Github, Twitter, Sparkles } from 'lucide-react';
import { LanguageToggle } from '@/components/LanguageToggle';
import { useI18n } from '@/lib/i18n';

interface NavbarProps {
  onOpenSearch: () => void;
  totalTools: number;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSearch }) => {
  const { t } = useI18n();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/5 bg-zinc-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3 sm:gap-4">
        {/* Logo 区域 */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 text-zinc-950 font-black font-mono text-base shadow-lg shadow-amber-500/20">
            B
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-zinc-100 text-sm sm:text-base tracking-tight">
                BuilderStack
              </span>
              <div className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2 py-0.5 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] font-mono text-emerald-400 font-medium hidden sm:inline">
                  {t.nav.edgeLive}
                </span>
              </div>
            </div>
            <p className="text-[10px] font-mono text-zinc-500 hidden md:block">
              {t.nav.tagline}
            </p>
          </div>
        </div>

        {/* 中间搜索触发器 */}
        <button
          onClick={onOpenSearch}
          className="flex items-center gap-2 sm:gap-3 rounded-xl bg-zinc-900/90 border border-zinc-800/80 px-3 py-1.5 text-xs text-zinc-400 hover:text-zinc-200 hover:border-zinc-700 transition-all w-36 sm:w-60 md:w-80 shadow-inner group"
        >
          <Search className="w-3.5 h-3.5 text-zinc-500 group-hover:text-amber-400 transition-colors shrink-0" />
          <span className="flex-1 text-left truncate text-xs">{t.nav.searchPlaceholder}</span>
          <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded bg-zinc-800/80 px-1.5 py-0.5 text-[10px] font-mono text-zinc-400 border border-zinc-700">
            ⌘K
          </kbd>
        </button>

        {/* 右侧：多语言切换器 + 外链与提交 */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* 多语言切换按钮 */}
          <LanguageToggle />

          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            title="Follow on X / Twitter"
            className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 border border-transparent hover:border-zinc-800 transition-colors hidden xs:flex"
          >
            <Twitter className="w-4 h-4" />
          </a>
          <a
            href="https://github.com/dceniac-sudo/builderstack"
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub Repository"
            className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 border border-transparent hover:border-zinc-800 transition-colors"
          >
            <Github className="w-4 h-4" />
          </a>

          {/* 提交收录按钮 */}
          <a
            href="#submit"
            onClick={(e) => {
              e.preventDefault();
              alert(t.nav.submitAlert);
            }}
            className="hidden sm:inline-flex items-center gap-1.5 rounded-lg bg-zinc-100 hover:bg-white text-zinc-950 font-medium px-3 py-1.5 text-xs transition-transform active:scale-95 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>{t.nav.submit}</span>
          </a>
        </div>
      </div>
    </header>
  );
};
