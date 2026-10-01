'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { CategoryFilter } from '@/components/CategoryFilter';
import { SpotlightCard } from '@/components/SpotlightCard';
import { ToolDetailModal } from '@/components/ToolDetailModal';
import { SearchModal } from '@/components/SearchModal';
import { CATEGORIES, TOOLS_DATA } from '@/data/tools';
import { CategoryType, ToolItem } from '@/types/tool';
import { I18nProvider, useI18n } from '@/lib/i18n';
import { Filter, Layers, Zap } from 'lucide-react';

function HomeContent() {
  const { lang, t } = useI18n();
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');
  const [activeFilterTag, setActiveFilterTag] = useState<string>('all');
  const [selectedTool, setSelectedTool] = useState<ToolItem | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // 统计每个分类下的数量
  const toolCounts = useMemo(() => {
    const counts: Record<CategoryType, number> = {
      all: TOOLS_DATA.length,
      'open-source': 0,
      'ai-workflow': 0,
      'indie-dev': 0,
      'media-growth': 0,
    };
    TOOLS_DATA.forEach((tool) => {
      if (counts[tool.category] !== undefined) {
        counts[tool.category] += 1;
      }
    });
    return counts;
  }, []);

  // 提取当前分类下出现的所有热门标签
  const availableTags = useMemo(() => {
    const currentList =
      selectedCategory === 'all'
        ? TOOLS_DATA
        : TOOLS_DATA.filter((t) => t.category === selectedCategory);
    const tagSet = new Set<string>();
    currentList.forEach((t) => t.tags.forEach((tag) => tagSet.add(tag)));
    return ['all', ...Array.from(tagSet).slice(0, 8)];
  }, [selectedCategory]);

  // 根据分类和标签过滤
  const filteredTools = useMemo(() => {
    return TOOLS_DATA.filter((tool) => {
      const matchCat =
        selectedCategory === 'all' || tool.category === selectedCategory;
      const matchTag =
        activeFilterTag === 'all' || tool.tags.includes(activeFilterTag);
      return matchCat && matchTag;
    });
  }, [selectedCategory, activeFilterTag]);

  const currentCategoryLabel = useMemo(() => {
    const found = CATEGORIES.find((c) => c.id === selectedCategory);
    if (!found) return '';
    return lang === 'en' ? found.labelEn : found.label;
  }, [selectedCategory, lang]);

  return (
    <div className="flex-1 flex flex-col justify-between">
      {/* 顶部导航 */}
      <Navbar
        onOpenSearch={() => setIsSearchOpen(true)}
        totalTools={TOOLS_DATA.length}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-20">
        {/* Hero 主视觉 */}
        <Hero totalTools={TOOLS_DATA.length} />

        {/* 交互过滤条 */}
        <div className="sticky top-16 z-30 bg-zinc-950/90 backdrop-blur-xl py-4 border-b border-white/5 space-y-3">
          <CategoryFilter
            categories={CATEGORIES}
            selectedCategory={selectedCategory}
            onSelectCategory={(id) => {
              setSelectedCategory(id);
              setActiveFilterTag('all');
            }}
            toolCounts={toolCounts}
          />

          {/* 二级极客标签快捷筛选 */}
          {availableTags.length > 2 && (
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1 text-xs">
              <span className="text-zinc-500 font-mono text-[11px] flex items-center gap-1 shrink-0 pl-1 mr-1">
                <Filter className="w-3 h-3" />
                {t.filter.label}
              </span>
              {availableTags.map((tag) => {
                const isActive = activeFilterTag === tag;
                return (
                  <button
                    key={tag}
                    onClick={() => setActiveFilterTag(tag)}
                    className={`rounded-lg px-2.5 py-1 font-mono text-[11px] transition-all whitespace-nowrap border ${
                      isActive
                        ? 'bg-amber-500/10 text-amber-300 border-amber-500/30 font-medium'
                        : 'bg-zinc-900/60 text-zinc-400 border-zinc-800/80 hover:text-zinc-200 hover:bg-zinc-800/60'
                    }`}
                  >
                    {tag === 'all' ? t.filter.allTags : `#${tag}`}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* 数量与当前视图状态提示 */}
        <div className="flex items-center justify-between text-xs text-zinc-500 font-mono mt-6 mb-4 px-1">
          <div className="flex items-center gap-2">
            <Layers className="w-3.5 h-3.5 text-zinc-400" />
            <span>
              {t.filter.showing} {filteredTools.length} {t.filter.toolsUnit}
              {selectedCategory !== 'all' && ` · ${currentCategoryLabel}`}
            </span>
          </div>
          <span className="hidden sm:inline">{t.filter.hint}</span>
        </div>

        {/* 响应式网格 (Bento Grid) */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {filteredTools.map((tool) => (
            <motion.div
              key={tool.id}
              layout
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <SpotlightCard
                tool={tool}
                onSelect={(selected) => setSelectedTool(selected)}
              />
            </motion.div>
          ))}
        </motion.div>

        {filteredTools.length === 0 && (
          <div className="text-center py-20 border border-dashed border-zinc-800 rounded-2xl bg-zinc-950/40">
            <Zap className="w-8 h-8 text-zinc-600 mx-auto mb-3" />
            <p className="text-sm text-zinc-400 font-medium">{t.filter.emptyTitle}</p>
            <button
              onClick={() => setActiveFilterTag('all')}
              className="mt-3 text-xs text-amber-400 underline font-mono"
            >
              {t.filter.emptyClear}
            </button>
          </div>
        )}
      </main>

      {/* 底部 Footer */}
      <footer className="border-t border-white/5 bg-zinc-950 py-10 text-xs text-zinc-500 font-mono">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500/80" />
            <span>{t.footer.copyright}</span>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="https://pages.cloudflare.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-300 transition-colors"
            >
              {t.footer.hostedOn}
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-400 transition-colors"
            >
              {t.footer.followX}
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-red-400 transition-colors"
            >
              {t.footer.youtube}
            </a>
          </div>
        </div>
      </footer>

      {/* 详情弹窗 */}
      <ToolDetailModal
        tool={selectedTool}
        onClose={() => setSelectedTool(null)}
      />

      {/* ⌘K 全局搜索对话框 */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        tools={TOOLS_DATA}
        onSelectTool={(tool) => setSelectedTool(tool)}
      />
    </div>
  );
}

export default function HomePage() {
  return (
    <I18nProvider>
      <HomeContent />
    </I18nProvider>
  );
}
