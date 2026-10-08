'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { NotesSection } from '@/components/NotesSection';
import { BuiltSection } from '@/components/BuiltSection';
import { CategoryFilter } from '@/components/CategoryFilter';
import { SpotlightCard } from '@/components/SpotlightCard';
import { ToolDetailModal } from '@/components/ToolDetailModal';
import { SearchModal } from '@/components/SearchModal';
import { WechatQr } from '@/components/WechatQr';
import { CATEGORIES, TOOLS_DATA } from '@/data/tools';
import { NOTES_DATA } from '@/data/notes';
import { BUILT_DATA } from '@/data/built';
import { CategoryType, ToolItem } from '@/types/tool';
import { useI18n, X_HANDLE, GITHUB_URL } from '@/lib/i18n';
import { Layers } from 'lucide-react';

function inCategory(tool: ToolItem, category: CategoryType) {
  if (category === 'all') return true;
  if (category === 'dropped') return tool.status === 'dropped';
  return tool.category === category && tool.status !== 'dropped';
}

export default function HomePage() {
  const { lang, t } = useI18n();
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');
  const [selectedTool, setSelectedTool] = useState<ToolItem | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // 只显示有内容的分类
  const { categories, toolCounts } = useMemo(() => {
    const counts = {} as Record<CategoryType, number>;
    CATEGORIES.forEach((c) => {
      counts[c.id] = TOOLS_DATA.filter((tool) => inCategory(tool, c.id)).length;
    });
    return { categories: CATEGORIES.filter((c) => counts[c.id] > 0), toolCounts: counts };
  }, []);

  const filteredTools = useMemo(
    () => TOOLS_DATA.filter((tool) => inCategory(tool, selectedCategory)),
    [selectedCategory]
  );

  // 支持 #工具id 直达某一条，方便分享
  useEffect(() => {
    const openFromHash = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      const found = TOOLS_DATA.find((tool) => tool.id === id);
      if (found) setSelectedTool(found);
    };
    openFromHash();
    window.addEventListener('hashchange', openFromHash);
    return () => window.removeEventListener('hashchange', openFromHash);
  }, []);

  // ⌘K / Ctrl+K 打开搜索
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const closeTool = () => {
    setSelectedTool(null);
    if (window.location.hash) {
      history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between">
      <Navbar onOpenSearch={() => setIsSearchOpen(true)} />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-20">
        <Hero />

        {/* 学到了什么 */}
        <NotesSection notes={NOTES_DATA} />

        {/* 做过什么：没有内容时不显示 */}
        <BuiltSection items={BUILT_DATA} />

        {/* 在用什么 */}
        <section id="stack">
          <div className="mb-4 px-1">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-100">{t.stack.heading}</h2>
            <p className="text-sm text-zinc-500 mt-1">{t.stack.sub}</p>
          </div>

          {categories.length > 2 && (
            <div className="sticky top-16 z-30 bg-zinc-950/90 backdrop-blur-xl py-3 border-b border-white/5">
              <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                toolCounts={toolCounts}
              />
            </div>
          )}

          <div className="flex items-center gap-2 text-xs text-zinc-500 font-mono mt-5 mb-4 px-1">
            <Layers className="w-3.5 h-3.5 text-zinc-400" />
            <span>
              {t.stack.showing} {filteredTools.length} {t.stack.toolsUnit}
            </span>
          </div>

          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {filteredTools.map((tool) => (
              <motion.div
                key={tool.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <SpotlightCard tool={tool} onSelect={setSelectedTool} />
              </motion.div>
            ))}
          </motion.div>

          {filteredTools.length === 0 && (
            <div className="text-center py-16 border border-dashed border-zinc-800 rounded-2xl bg-zinc-950/40 text-sm text-zinc-500">
              {t.stack.empty}
            </div>
          )}
        </section>
      </main>

      <footer className="border-t border-white/5 bg-zinc-950/80 py-8 text-xs text-zinc-500 text-center">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-3">
          <div className="flex items-center gap-4 font-mono">
            <a
              href={`https://twitter.com/${X_HANDLE}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-400"
            >
              X @{X_HANDLE}
            </a>
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="hover:text-amber-400">
              GitHub
            </a>
          </div>
          <span>{t.footer.copyright}</span>
          {lang === 'zh' && <WechatQr />}
        </div>
      </footer>

      <ToolDetailModal tool={selectedTool} onClose={closeTool} />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        tools={TOOLS_DATA}
        onSelectTool={(tool) => setSelectedTool(tool)}
      />
    </div>
  );
}
