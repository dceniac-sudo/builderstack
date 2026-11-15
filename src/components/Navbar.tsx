'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { LanguageToggle } from '@/components/LanguageToggle';
import { Logo } from '@/components/Logo';
import { Badge } from '@/components/ui/badge';
import { useI18n, localePath, X_HANDLE } from '@/lib/i18n';
import { cn } from '@/lib/utils';

interface NavbarProps {
  active?: 'industries' | 'comparisons'; // 当前在哪个栏目；首页不传
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

  const navItems: { id: 'industries' | 'comparisons'; href: string; label: string; count?: number }[] = [
    { id: 'industries', href: '/oss/', label: t.nav.industries },
    { id: 'comparisons', href: '/oss/vs/', label: t.nav.comparisons, count: 5 },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#E6E6E2] bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1120px] items-center justify-between gap-2 px-5 sm:gap-4 sm:px-10">
        {/* Logo 区域 */}
        <Link href={localePath(lang, '/')} className="flex min-w-0 items-center gap-3">
          <Logo size={28} className="shrink-0" />
          <span className="hidden text-[15.5px] font-semibold tracking-[-0.01em] text-[#141414] sm:inline">
            BuilderStack
          </span>
        </Link>

        {/* 栏目导航 */}
        <nav className="mr-auto flex items-center gap-1 text-sm font-medium">
          {navItems.map((item) => {
            const isActive = active === item.id;
            return (
              <Link
                key={item.id}
                href={localePath(lang, item.href)}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'relative inline-flex min-h-9 items-center gap-1.5 whitespace-nowrap rounded-lg px-3 transition-colors',
                  isActive
                    ? 'font-medium text-[#141414]'
                    : 'font-normal text-[#5E5E5A] hover:text-[#141414]'
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active-pill"
                    transition={{ type: 'spring', stiffness: 460, damping: 34 }}
                    aria-hidden="true"
                    className="absolute inset-0 -z-10 rounded-lg bg-[#F0F0EC]"
                  />
                )}
                <span>{item.label}</span>
                {item.count !== undefined && (
                  <Badge variant="mono" className="px-1.5 py-0 text-[10px]">
                    {item.count}
                  </Badge>
                )}
              </Link>
            );
          })}
        </nav>

        {/* 右侧：X 关注 + 语言切换 */}
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2.5">
          <a
            href={`https://twitter.com/intent/follow?screen_name=${X_HANDLE}`}
            onClick={handleFollowClick}
            target="_blank"
            rel="noopener noreferrer"
            title={`Follow @${X_HANDLE} on X`}
            className="group flex items-center justify-center gap-1.5 rounded-xl border border-[#E6E6E2] bg-[#F5F5F2] p-2 text-xs font-medium text-[#141414] shadow-sm transition-all duration-200 hover:border-[#141414] hover:bg-[#EFEFEB] active:scale-95 sm:px-3 sm:py-1.5"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="h-3.5 w-3.5 fill-current text-[#2E2E2B] transition-colors group-hover:text-[#141414]"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            <span className="hidden font-mono text-[11px] font-semibold sm:inline">{t.nav.followX}</span>
          </a>

          <LanguageToggle />
        </div>
      </div>
    </header>
  );
};
