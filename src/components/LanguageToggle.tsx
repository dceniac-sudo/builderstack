'use client';

import React from 'react';
import { Globe } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { cn } from '@/lib/utils';

export const LanguageToggle: React.FC = () => {
  const { lang, setLang } = useI18n();

  return (
    <div className="flex items-center bg-[#F5F5F2] border border-[#E6E6E2] rounded-lg p-0.5 text-xs font-mono">
      <button
        onClick={() => setLang('en')}
        className={cn(
          'px-2 py-1 rounded-md transition-all font-medium text-[11px]',
          lang === 'en'
            ? 'bg-white text-[#141414] shadow-sm border border-[#E6E6E2]'
            : 'text-[#6F6F6A] hover:text-[#2E2E2B]'
        )}
      >
        EN
      </button>
      <button
        onClick={() => setLang('zh')}
        className={cn(
          'px-2 py-1 rounded-md transition-all font-medium text-[11px]',
          lang === 'zh'
            ? 'bg-white text-[#141414] shadow-sm border border-[#E6E6E2]'
            : 'text-[#6F6F6A] hover:text-[#2E2E2B]'
        )}
      >
        中文
      </button>
    </div>
  );
};
