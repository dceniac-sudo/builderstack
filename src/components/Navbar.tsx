'use client';

import React from 'react';
import Link from 'next/link';
import { LanguageToggle } from '@/components/LanguageToggle';
import { Logo } from '@/components/Logo';
import { useI18n, localePath, X_HANDLE } from '@/lib/i18n';

interface NavbarProps {
  active?: 'industries' | 'notes';    // 当前在哪个栏目；首页不传
}

export const Navbar: React.FC<NavbarProps> = ({ active }) => {
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
    <header className="sticky top-0 z-40 w-full border-b border-[#E6E6E2] bg-white/90 backdrop-blur-xl">
      <div className="max-w-[1120px] mx-auto px-5 sm:px-10 h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Logo 区域 */}
        <Link href={localePath(lang, '/')} className="flex items-center gap-3 min-w-0">
          <Logo size={28} className="shrink-0" />
          <span className="hidden sm:inline font-semibold text-[#141414] text-[15.5px] tracking-[-0.01em]">
            BuilderStack
          </span>
        </Link>

        {/* 两个栏目。文章只有英文版，中文页面上不显示这一栏 */}
        <nav className="flex items-center gap-1 text-sm font-medium mr-auto">
          {([
            { id: 'industries', href: '/oss/', label: t.nav.industries },
            { id: 'notes', href: '/notes/', label: t.nav.notes },
          ] as const).filter((item) => item.id !== 'notes' || lang === 'en').map((item) => (
            <Link
              key={item.id}
              href={localePath(lang, item.href)}
              aria-current={active === item.id ? 'page' : undefined}
              className={
                active === item.id
                  ? 'inline-flex items-center min-h-9 px-3 rounded-lg text-[#141414] bg-[#F0F0EC] whitespace-nowrap'
                  : 'inline-flex items-center min-h-9 px-3 rounded-lg font-normal text-[#5E5E5A] hover:text-[#141414] transition-colors whitespace-nowrap'
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* 右侧：X 关注 + 语言切换 */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          <a
            href={`https://twitter.com/intent/follow?screen_name=${X_HANDLE}`}
            onClick={handleFollowClick}
            target="_blank"
            rel="noopener noreferrer"
            title={`Follow @${X_HANDLE} on X`}
            className="flex items-center justify-center gap-1.5 rounded-xl bg-[#F5F5F2] hover:bg-[#EFEFEB] text-[#141414] hover:text-[#141414] p-2 sm:px-3 sm:py-1.5 text-xs font-medium border border-[#E6E6E2] hover:border-[#141414] shadow-sm transition-all duration-200 group active:scale-95"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="w-3.5 h-3.5 fill-current text-[#2E2E2B] group-hover:text-[#141414] transition-colors"
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
