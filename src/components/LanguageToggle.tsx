'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useI18n, type Language } from '@/lib/i18n';
import { cn } from '@/lib/utils';

export const LanguageToggle: React.FC = () => {
  const { lang, setLang } = useI18n();
  const options: { id: Language; label: string; ariaLabel: string }[] = [
    { id: 'en', label: 'EN', ariaLabel: 'English' },
    { id: 'zh', label: lang === 'zh' ? '中文' : 'ZH', ariaLabel: 'Chinese' },
  ];

  return (
    <div
      role="group"
      aria-label="Language switch"
      className="relative flex items-center rounded-lg border border-[#E6E6E2] bg-[#F5F5F2] p-0.5 font-mono text-xs"
    >
      {options.map((opt) => {
        const active = lang === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => setLang(opt.id)}
            aria-pressed={active}
            aria-label={opt.ariaLabel}
            className={cn(
              'relative z-10 rounded-md px-2 py-1 text-[11px] font-medium transition-colors',
              active ? 'text-[#141414]' : 'text-[#6F6F6A] hover:text-[#2E2E2B]'
            )}
          >
            {active && (
              <motion.span
                layoutId="lang-toggle-pill"
                transition={{ type: 'spring', stiffness: 480, damping: 35 }}
                aria-hidden="true"
                className="absolute inset-0 -z-10 rounded-md border border-[#E6E6E2] bg-white shadow-sm"
              />
            )}
            {opt.label}
          </button>
        );
      })}
    </div>
  );
};
