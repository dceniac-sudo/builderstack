'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, Terminal, Copy, Check, Link2 } from 'lucide-react';
import { ToolItem } from '@/types/tool';
import { useI18n } from '@/lib/i18n';

interface ToolDetailModalProps {
  tool: ToolItem | null;
  onClose: () => void;
}

export const ToolDetailModal: React.FC<ToolDetailModalProps> = ({ tool, onClose }) => {
  const [copied, setCopied] = useState<'command' | 'link' | null>(null);
  const { lang, t } = useI18n();

  if (!tool) return null;

  const copy = (what: 'command' | 'link', text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(what);
    setTimeout(() => setCopied(null), 2000);
  };

  const note = lang === 'en' ? tool.noteEn : tool.note;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
        {/* 背景遮罩 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#141414]/50"
        />

        {/* 弹窗主体 */}
        <motion.div
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative z-10 w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-t-3xl sm:rounded-2xl bg-white border border-[#E6E6E2] p-6 sm:p-8 text-[#141414] shadow-2xl"
        >
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-5 right-5 p-2 rounded-xl text-[#5E5E5A] hover:text-[#141414] hover:bg-[#F5F5F2] border border-transparent hover:border-[#E6E6E2] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* 头部信息 */}
          <div className="flex items-center gap-3 flex-wrap mb-6 pr-10">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#141414]">{lang === 'zh' && tool.nameZh ? tool.nameZh : tool.name}</h2>
            <span className="rounded-md bg-[#F5F5F2] border border-[#E6E6E2] px-2 py-0.5 text-xs font-mono text-[#5E5E5A]">
              {t.status[tool.status]}
            </span>
          </div>

          <div className="space-y-5 mb-6">
            <div>
              <h4 className="text-xs font-semibold text-[#6F6F6A] tracking-wider mb-2 font-mono">
                {t.modal.myNote}
              </h4>
              <p className="text-base text-[#141414] leading-relaxed bg-[#F5F5F2] p-4 rounded-xl border border-[#E6E6E2]">
                {note}
              </p>
            </div>

            {tool.command && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-semibold text-[#1F8A4C] tracking-wider flex items-center gap-1.5 font-mono">
                    <Terminal className="w-3.5 h-3.5" />
                    {t.modal.command}
                  </h4>
                  <button
                    onClick={() => copy('command', tool.command!)}
                    className="flex items-center gap-1 text-xs text-[#5E5E5A] hover:text-[#141414] font-mono transition-colors"
                  >
                    {copied === 'command' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#1F8A4C]" />
                        <span className="text-[#1F8A4C]">{t.modal.copied}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>{t.modal.copyCode}</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-3.5 rounded-xl bg-[#141414] border border-[#E6E6E2] font-mono text-xs text-emerald-300/90 overflow-x-auto select-all">
                  {tool.command}
                </pre>
              </div>
            )}
          </div>

          {/* 底部按钮栏 */}
          <div className="pt-4 border-t border-[#E6E6E2] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <button
              onClick={() => copy('link', `${window.location.origin}${window.location.pathname}#${tool.id}`)}
              className="flex items-center justify-center gap-1.5 text-xs text-[#5E5E5A] hover:text-[#141414] font-mono transition-colors"
            >
              {copied === 'link' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#1F8A4C]" />
                  <span className="text-[#1F8A4C]">{t.modal.copied}</span>
                </>
              ) : (
                <>
                  <Link2 className="w-3.5 h-3.5" />
                  <span>{t.modal.copyLink}</span>
                </>
              )}
            </button>

            <div className="flex items-center gap-2">
              {tool.githubUrl && (
                <a
                  href={tool.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3.5 py-2.5 sm:py-2 rounded-xl bg-[#F5F5F2] hover:bg-[#EFEFEB] text-xs font-medium text-[#141414] border border-[#E6E6E2] transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
              )}
              {tool.url && (
                <a
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2.5 sm:py-2 rounded-xl bg-[#141414] hover:bg-[#2E2E2B] text-white text-xs font-semibold transition-transform active:scale-95 shadow-md shadow-amber-500/20"
                >
                  <span>{t.modal.visitSite}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
