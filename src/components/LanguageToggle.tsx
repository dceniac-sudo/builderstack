'use client';

import React from 'react';
import { Globe } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { cn } from '@/lib/utils';

export const LanguageToggle: React.FC = () => {
  const { lang, setLang } = useI18n();

  return (
    <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-lg p-0.5 text-xs font-mono">
      <button
        onClick={() => setLang('en')}
        className={cn(
          'px-2 py-1 rounded-md transition-all font-medium text-[11px]',
          lang === 'en'
            ? 'bg-zinc-800 text-amber-400 shadow-sm border border-white/10'
            : 'text-zinc-500 hover:text-zinc-300'
        )}
      >
        EN
      </button>
      <button
        onClick={() => setLang('zh')}
        className={cn(
          'px-2 py-1 rounded-md transition-all font-medium text-[11px]',
          lang === 'zh'
            ? 'bg-zinc-800 text-amber-400 shadow-sm border border-white/10'
            : 'text-zinc-500 hover:text-zinc-300'
        )}
      >
        中文
      </button>
    </div>
  );
};
