'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Star, ArrowRight } from 'lucide-react';
import { ToolItem } from '@/types/tool';
import { useI18n } from '@/lib/i18n';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  tools: ToolItem[];
  onSelectTool: (tool: ToolItem) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  tools,
  onSelectTool,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { lang, t } = useI18n();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // 快捷键监听
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filtered = tools.filter((tool) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      tool.name.toLowerCase().includes(q) ||
      tool.tagline.toLowerCase().includes(q) ||
      (tool.taglineEn && tool.taglineEn.toLowerCase().includes(q)) ||
      tool.description.toLowerCase().includes(q) ||
      (tool.descriptionEn && tool.descriptionEn.toLowerCase().includes(q)) ||
      (tool.alternativeTo && tool.alternativeTo.toLowerCase().includes(q)) ||
      tool.stage.toLowerCase().includes(q) ||
      tool.stageEn.toLowerCase().includes(q) ||
      tool.tags.some(
        (tag) =>
          tag.zh.toLowerCase().includes(q) || tag.en.toLowerCase().includes(q)
      )
    );
  });

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
        {/* 背景遮罩 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* 搜索框主体 */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: -20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: -20 }}
          className="relative z-10 w-full max-w-2xl rounded-2xl bg-zinc-950 border border-white/10 shadow-2xl overflow-hidden text-zinc-100"
        >
          {/* 搜索输入行 */}
          <div className="flex items-center px-4 py-3.5 border-b border-zinc-900 gap-3">
            <Search className="w-5 h-5 text-amber-500" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.search.placeholder}
              className="flex-1 bg-transparent text-sm text-zinc-100 placeholder-zinc-500 outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="p-1 rounded text-zinc-500 hover:text-zinc-300"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <kbd className="hidden sm:inline-block rounded bg-zinc-900 border border-zinc-800 px-2 py-0.5 text-[10px] font-mono text-zinc-400">
              ESC
            </kbd>
          </div>

          {/* 搜索结果列表 */}
          <div className="max-h-[60vh] overflow-y-auto p-2 divide-y divide-zinc-900/60">
            {filtered.length === 0 ? (
              <div className="p-8 text-center text-sm text-zinc-500">
                {t.search.noResult} &quot;{query}&quot;。{t.search.trySearching}
              </div>
            ) : (
              filtered.map((item) => {
                const tagline = lang === 'en' ? (item.taglineEn || item.tagline) : item.tagline;
                const stage = lang === 'en' ? item.stageEn : item.stage;
                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      onSelectTool(item);
                      onClose();
                    }}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-zinc-900/80 cursor-pointer transition-colors group"
                  >
                    <div className="flex-1 min-w-0 pr-4">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-1.5 py-0.2 rounded border border-amber-500/20">
                          {stage}
                        </span>
                        <span className="font-semibold text-zinc-100 group-hover:text-amber-400 text-sm">
                          {item.name}
                        </span>
                        {item.alternativeTo && (
                          <span className="text-[10px] font-mono text-zinc-400 bg-zinc-900 px-1.5 py-0.2 rounded border border-zinc-800">
                            Alt: {item.alternativeTo}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-zinc-400 truncate">
                        {tagline}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      {item.stars && (
                        <span className="hidden sm:flex items-center gap-1 text-[11px] font-mono text-zinc-500">
                          <Star className="w-3 h-3 text-amber-500 fill-amber-500/20" />
                          {item.stars}
                        </span>
                      )}
                      <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-zinc-200 transition-colors" />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
