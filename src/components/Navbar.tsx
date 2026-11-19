'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Rss } from 'lucide-react';
import { LanguageToggle } from '@/components/LanguageToggle';
import { Logo } from '@/components/Logo';
import { Badge } from '@/components/ui/badge';
import { useI18n, localePath, SUBSTACK_URL } from '@/lib/i18n';
import { cn } from '@/lib/utils';

interface NavbarProps {
  active?: 'industries' | 'comparisons' | 'guides' | 'about'; // 当前在哪个栏目；首页不传
}

export const Navbar: React.FC<NavbarProps> = ({ active }) => {
  const { lang, t } = useI18n();

  const navItems: { id: 'industries' | 'comparisons' | 'guides' | 'about'; href: string; label: string; count?: number }[] = [
    { id: 'industries', href: '/oss/', label: t.nav.industries },
    { id: 'comparisons', href: '/oss/vs/', label: t.nav.comparisons, count: 5 },
    { id: 'guides', href: '/guides/', label: t.nav.guides, count: 2 },
    { id: 'about', href: '/about/', label: t.nav.methodology },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#E6E6E2] bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1140px] items-center justify-between gap-2 px-5 sm:gap-4 sm:px-10">
        {/* Logo 区域 */}
        <Link href={localePath(lang, '/')} className="flex min-w-0 items-center gap-2.5">
          <Logo size={28} className="shrink-0" />
          <span className="hidden text-[15.5px] font-semibold tracking-[-0.015em] text-[#141414] sm:inline">
            BuilderStack
          </span>
        </Link>

        {/* 栏目导航 */}
        <nav className="mr-auto flex items-center gap-1 text-[14px] font-medium">
          {navItems.map((item) => {
            const isActive = active === item.id;
            return (
              <Link
                key={item.id}
                href={localePath(lang, item.href)}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'relative inline-flex min-h-9 items-center gap-1.5 whitespace-nowrap rounded-lg px-3 transition-colors',
                  item.id === 'about' && 'hidden md:inline-flex',
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
                  <Badge variant="mono" className="px-1.5 py-0 text-[10.5px]">
                    {item.count}
                  </Badge>
                )}
              </Link>
            );
          })}
        </nav>

        {/* 右侧：RSS + 语言切换 + License Watch */}
        <div className="flex shrink-0 items-center gap-2">
          <a
            href="/rss.xml"
            title="BuilderStack RSS Feed"
            className="hidden items-center gap-1.5 rounded-lg border border-[#E6E6E2] bg-white px-2.5 py-1.5 font-mono text-[11px] font-medium text-[#5E5E5A] transition-colors hover:border-[#141414] hover:text-[#141414] sm:inline-flex"
          >
            <Rss aria-hidden="true" className="h-3 w-3 text-[#F59E0B]" />
            <span>RSS</span>
          </a>

          <LanguageToggle />

          <a
            href={SUBSTACK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1.5 rounded-lg border border-[#141414] bg-white px-3 py-1.5 text-[12px] font-medium text-[#141414] transition-colors hover:bg-[#141414] hover:text-white lg:inline-flex"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#F59E0B]" />
            <span>{t.nav.watch}</span>
          </a>
        </div>
      </div>
    </header>
  );
};
