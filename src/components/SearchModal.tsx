'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight } from 'lucide-react';
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
      (tool.nameZh && tool.nameZh.toLowerCase().includes(q)) ||
      tool.note.toLowerCase().includes(q) ||
      tool.noteEn.toLowerCase().includes(q) ||
      t.status[tool.status].toLowerCase().includes(q) ||
      tool.status.includes(q)
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
          className="fixed inset-0 bg-[#0E1116]/50"
        />

        {/* 搜索框主体 */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: -20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: -20 }}
          className="relative z-10 w-full max-w-2xl rounded-2xl bg-white border border-[#E6E8EC] shadow-2xl overflow-hidden text-[#0E1116]"
        >
          {/* 搜索输入行 */}
          <div className="flex items-center px-4 py-3.5 border-b border-[#E6E8EC] gap-3">
            <Search className="w-5 h-5 text-[#C2410C]" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.search.placeholder}
              className="flex-1 bg-transparent text-sm text-[#0E1116] placeholder-[#6B7280] outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="p-1 rounded text-[#6B7280] hover:text-[#2B303A]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <kbd className="hidden sm:inline-block rounded bg-[#F5F6F8] border border-[#E6E8EC] px-2 py-0.5 text-[10px] font-mono text-[#535A66]">
              ESC
            </kbd>
          </div>

          {/* 搜索结果列表 */}
          <div className="max-h-[60vh] overflow-y-auto p-2 divide-y divide-[#E6E8EC]">
            {filtered.length === 0 ? (
              <div className="p-8 text-center text-sm text-[#6B7280]">
                {t.search.noResult} &quot;{query}&quot;. {t.search.trySearching}
              </div>
            ) : (
              filtered.map((item) => {
                const note = lang === 'en' ? item.noteEn : item.note;
                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      onSelectTool(item);
                      onClose();
                    }}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-[#F5F6F8] cursor-pointer transition-colors group"
                  >
                    <div className="flex-1 min-w-0 pr-4">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-mono text-[#C2410C] bg-[#F5F6F8] px-1.5 py-0.2 rounded border border-[#E6E8EC]">
                          {t.status[item.status]}
                        </span>
                        <span className="font-semibold text-[#0E1116] group-hover:text-[#C2410C] text-sm">
                          {lang === 'zh' && item.nameZh ? item.nameZh : item.name}
                        </span>
                      </div>
                      <p className="text-xs text-[#535A66] truncate">
                        {note}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <ArrowRight className="w-4 h-4 text-[#6B7280] group-hover:text-[#0E1116] transition-colors" />
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
