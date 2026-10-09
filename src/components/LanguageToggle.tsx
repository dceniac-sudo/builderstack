'use client';

import React from 'react';
import { Globe } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { cn } from '@/lib/utils';

export const LanguageToggle: React.FC = () => {
  const { lang, setLang } = useI18n();

  return (
    <div className="flex items-center bg-[#F5F6F8] border border-[#E6E8EC] rounded-lg p-0.5 text-xs font-mono">
      <button
        onClick={() => setLang('en')}
        className={cn(
          'px-2 py-1 rounded-md transition-all font-medium text-[11px]',
          lang === 'en'
            ? 'bg-white text-[#0E1116] shadow-sm border border-[#E6E8EC]'
            : 'text-[#6B7280] hover:text-[#2B303A]'
        )}
      >
        EN
      </button>
      <button
        onClick={() => setLang('zh')}
        className={cn(
          'px-2 py-1 rounded-md transition-all font-medium text-[11px]',
          lang === 'zh'
            ? 'bg-white text-[#0E1116] shadow-sm border border-[#E6E8EC]'
            : 'text-[#6B7280] hover:text-[#2B303A]'
        )}
      >
        中文
      </button>
    </div>
  );
};
