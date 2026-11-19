'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Menu, Rss, X } from 'lucide-react';
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
  const [open, setOpen] = React.useState(false);

  const navItems: { id: 'industries' | 'comparisons' | 'guides' | 'about'; href: string; label: string; count?: number }[] = [
    { id: 'industries', href: '/oss/', label: t.nav.industries },
    { id: 'comparisons', href: '/oss/vs/', label: t.nav.comparisons, count: 5 },
    { id: 'guides', href: '/guides/', label: t.nav.guides, count: 2 },
    { id: 'about', href: '/about/', label: t.nav.methodology },
  ];

  // Escape 关闭移动端菜单
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  // 切到桌面宽度时自动收起
  React.useEffect(() => {
    if (!open) return;
    const mq = window.matchMedia('(min-width: 768px)');
    const onChange = () => {
      if (mq.matches) setOpen(false);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [open]);

  const close = () => setOpen(false);
  const menuLabel = lang === 'zh' ? (open ? '关闭菜单' : '打开菜单') : open ? 'Close menu' : 'Open menu';

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#E6E6E2] bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1140px] items-center justify-between gap-2 px-5 sm:gap-4 sm:px-10">
        {/* Logo 区域 */}
        <Link href={localePath(lang, '/')} className="flex shrink-0 items-center gap-2.5" onClick={close}>
          <Logo size={28} className="shrink-0" />
          <span className="hidden text-[15.5px] font-semibold tracking-[-0.015em] text-[#141414] sm:inline">
            BuilderStack
          </span>
        </Link>

        {/* 栏目导航（桌面端；移动端 hidden 但仍在 SSR HTML 中） */}
        <nav aria-label="Primary" className="mr-auto hidden min-w-0 items-center gap-1 text-[14px] font-medium md:flex">
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
                  <Badge variant="mono" className="px-1.5 py-0 text-[10.5px] tabular-nums">
                    {item.count}
                  </Badge>
                )}
              </Link>
            );
          })}
        </nav>

        {/* 右侧：RSS + 语言切换 + License Watch（桌面）/ 语言切换 + 菜单按钮（移动） */}
        <div className="flex shrink-0 items-center gap-2">
          <a
            href="/rss.xml"
            title="BuilderStack RSS Feed"
            className="hidden items-center gap-1.5 rounded-lg border border-[#E6E6E2] bg-white px-2.5 py-1.5 font-mono text-[11px] font-medium text-[#5E5E5A] transition-colors hover:border-[#141414] hover:text-[#141414] md:inline-flex"
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

          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-nav-panel"
            aria-label={menuLabel}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-[#141414] transition-colors hover:bg-[#F0F0EC] md:hidden"
          >
            {open ? <X aria-hidden="true" className="h-5 w-5" /> : <Menu aria-hidden="true" className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* 移动端折叠面板 */}
      <div
        id="mobile-nav-panel"
        hidden={!open}
        className="border-t border-[#E6E6E2] bg-white md:hidden"
      >
        <nav aria-label="Mobile" className="mx-auto max-w-[1140px] px-5 sm:px-10">
          <ul className="divide-y divide-[#E6E6E2]">
            {navItems.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <Link
                    href={localePath(lang, item.href)}
                    aria-current={isActive ? 'page' : undefined}
                    onClick={close}
                    className={cn(
                      'flex min-h-[48px] items-center justify-between gap-3 text-[15px] transition-colors',
                      isActive ? 'font-medium text-[#141414]' : 'text-[#5E5E5A] hover:text-[#141414]'
                    )}
                  >
                    <span>{item.label}</span>
                    {item.count !== undefined && (
                      <span className="font-mono text-[12px] tabular-nums text-[#8A8A85]">({item.count})</span>
                    )}
                  </Link>
                </li>
              );
            })}
            <li>
              <a
                href="/rss.xml"
                onClick={close}
                className="flex min-h-[48px] items-center gap-2 font-mono text-[13px] text-[#5E5E5A] transition-colors hover:text-[#141414]"
              >
                <Rss aria-hidden="true" className="h-3.5 w-3.5 text-[#F59E0B]" />
                <span>RSS</span>
              </a>
            </li>
            <li>
              <a
                href={SUBSTACK_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={close}
                className="flex min-h-[48px] items-center gap-2 text-[15px] font-medium text-[#141414]"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#F59E0B]" />
                <span>{t.nav.watch}</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
