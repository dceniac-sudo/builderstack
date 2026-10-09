'use client';

import React from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { LanguageToggle } from '@/components/LanguageToggle';
import { Logo } from '@/components/Logo';
import { useI18n, localePath, X_HANDLE } from '@/lib/i18n';

interface NavbarProps {
  onOpenSearch?: () => void;          // 不传就不显示搜索（只有“笔记”页有搜索）
  active?: 'industries' | 'notes';    // 当前在哪个栏目；首页不传
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSearch, active }) => {
  const { lang, t } = useI18n();

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
    <header className="sticky top-0 z-40 w-full border-b border-[#E6E8EC] bg-white backdrop-blur-xl">
      <div className="max-w-[1120px] mx-auto px-5 sm:px-10 h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Logo 区域 */}
        <Link href={localePath(lang, '/')} className="flex items-center gap-3 min-w-0">
          <Logo size={32} className="shrink-0" />
          <span className="hidden sm:inline font-semibold text-[#0E1116] text-base tracking-tight">
            BuilderStack
          </span>
        </Link>

        {/* 两个栏目 */}
        <nav className="flex items-center gap-1 text-sm font-medium mr-auto">
          {([
            { id: 'industries', href: '/oss/', label: t.nav.industries },
            { id: 'notes', href: '/notes/', label: t.nav.notes },
          ] as const).map((item) => (
            <Link
              key={item.id}
              href={localePath(lang, item.href)}
              aria-current={active === item.id ? 'page' : undefined}
              className={
                active === item.id
                  ? 'inline-flex items-center min-h-11 px-3 rounded-full text-[#0E1116] bg-[#F5F6F8] whitespace-nowrap'
                  : 'inline-flex items-center min-h-11 px-3 rounded-full text-[#535A66] hover:text-[#0E1116] whitespace-nowrap'
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* 中间搜索触发器 */}
        {onOpenSearch && (
        <button
          onClick={onOpenSearch}
          className="hidden sm:flex items-center gap-2 sm:gap-3 rounded-xl bg-[#F5F6F8] border border-[#E6E8EC] px-2.5 sm:px-3 py-1.5 text-xs text-[#535A66] hover:text-[#0E1116] hover:border-[#D9DCE2] transition-all flex-1 min-w-0 max-w-[40px] sm:max-w-[240px] md:max-w-xs group"
          aria-label={t.nav.searchPlaceholder}
        >
          <Search className="w-3.5 h-3.5 text-[#6B7280] group-hover:text-[#0E1116] transition-colors shrink-0" />
          <span className="flex-1 text-left truncate text-xs hidden sm:inline">{t.nav.searchPlaceholder}</span>
          <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded bg-[#ECEEF2] px-1.5 py-0.5 text-[10px] font-mono text-[#535A66] border border-[#D9DCE2]">
            ⌘K
          </kbd>
        </button>
        )}

        {/* 右侧：X 关注 + 语言切换 */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          <a
            href={`https://twitter.com/intent/follow?screen_name=${X_HANDLE}`}
            onClick={handleFollowClick}
            target="_blank"
            rel="noopener noreferrer"
            title={`Follow @${X_HANDLE} on X`}
            className="flex items-center justify-center gap-1.5 rounded-xl bg-[#F5F6F8] hover:bg-[#ECEEF2] text-[#0E1116] hover:text-[#0E1116] p-2 sm:px-3 sm:py-1.5 text-xs font-medium border border-[#E6E8EC] hover:border-[#0E1116] shadow-sm transition-all duration-200 group active:scale-95"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="w-3.5 h-3.5 fill-current text-[#2B303A] group-hover:text-[#0E1116] transition-colors"
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
