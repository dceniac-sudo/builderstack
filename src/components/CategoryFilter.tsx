'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LayoutGrid, ShieldCheck, Cpu, Terminal, Flame, Palette } from 'lucide-react';
import { CategoryType, CategoryInfo } from '@/types/tool';
import { useI18n } from '@/lib/i18n';
import { cn } from '@/lib/utils';

interface CategoryFilterProps {
  categories: CategoryInfo[];
  selectedCategory: CategoryType;
  onSelectCategory: (id: CategoryType) => void;
  toolCounts: Record<CategoryType, number>;
}

const ICON_MAP: Record<string, React.ElementType> = {
  LayoutGrid,
  ShieldCheck,
  Cpu,
  Terminal,
  Palette,
  Flame,
};

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  toolCounts,
}) => {
  const { lang } = useI18n();

  return (
    <div className="w-full">
      {/* 滚动容器 */}
      <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 pt-1 no-scrollbar sm:justify-center -mx-4 px-4 sm:mx-0 sm:px-0">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          const Icon = ICON_MAP[cat.iconName] || LayoutGrid;
          const count = toolCounts[cat.id] || 0;
          const displayName = lang === 'en' ? cat.labelEn : cat.label;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={cn(
                'relative flex items-center gap-2 rounded-xl px-3 py-1.5 sm:px-4 sm:py-2 text-xs font-medium transition-colors whitespace-nowrap',
                'border outline-none select-none',
                isSelected
                  ? 'text-white border-transparent'
                  : 'text-zinc-400 border-zinc-900 bg-zinc-950/60 hover:text-zinc-200 hover:border-zinc-800'
              )}
            >
              {/* Framer Motion 驱动的丝滑背光胶囊滑块 */}
              {isSelected && (
                <motion.div
                  layoutId="activeCategoryPill"
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-zinc-800 via-zinc-800/90 to-zinc-800/60 border border-white/20 shadow-md shadow-black/50"
                  transition={{ type: 'spring', bounce: 0.18, duration: 0.5 }}
                />
              )}

              <span className="relative z-10 flex items-center gap-2">
                <Icon
                  className={cn(
                    'w-3.5 h-3.5 transition-colors',
                    isSelected ? 'text-amber-400' : 'text-zinc-500'
                  )}
                />
                <span>{displayName}</span>
                <span
                  className={cn(
                    'font-mono text-[10px] rounded-full px-1.5 py-0.2',
                    isSelected
                      ? 'bg-amber-500/20 text-amber-300 font-semibold'
                      : 'bg-zinc-900 text-zinc-500'
                  )}
                >
                  {count}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
