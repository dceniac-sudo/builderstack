'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, Terminal, Copy, Check, Star, Shield } from 'lucide-react';
import { ToolItem } from '@/types/tool';
import { useI18n } from '@/lib/i18n';

interface ToolDetailModalProps {
  tool: ToolItem | null;
  onClose: () => void;
}

export const ToolDetailModal: React.FC<ToolDetailModalProps> = ({ tool, onClose }) => {
  const [copied, setCopied] = useState(false);
  const { lang, t } = useI18n();

  if (!tool) return null;

  const handleCopyCommand = () => {
    if (!tool.selfHostCommand) return;
    navigator.clipboard.writeText(tool.selfHostCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const description = lang === 'en' ? (tool.descriptionEn || tool.description) : tool.description;
  const stage = lang === 'en' ? tool.stageEn : tool.stage;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
        {/* 背景遮罩 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* 弹窗主体 */}
        <motion.div
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative z-10 w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-t-3xl sm:rounded-2xl bg-zinc-950 border border-white/10 p-6 sm:p-8 text-zinc-100 shadow-2xl shadow-black"
        >
          {/* 关闭按钮 */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-900 border border-transparent hover:border-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* 头部信息 */}
          <div className="flex items-start gap-4 mb-6 pr-8">
            <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-amber-500 font-bold font-mono text-xl shadow-inner shrink-0">
              {tool.name.slice(0, 1)}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className="font-mono text-[10px] uppercase tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded">
                  {stage}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                  {tool.name}
                </h2>
                {tool.pricing && (
                  <span className="rounded-md bg-zinc-900 border border-zinc-800 px-2 py-0.5 text-xs font-mono text-zinc-400">
                    {tool.pricing}
                  </span>
                )}
              </div>
              {tool.alternativeTo && (
                <div className="text-xs font-mono text-amber-400">
                  {t.modal.altAim} {tool.alternativeTo}
                </div>
              )}
            </div>
          </div>

          {/* 场景标签列表 */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {tool.tags.map((tagObj) => {
              const tagText = lang === 'en' ? tagObj.en : tagObj.zh;
              return (
                <span
                  key={tagObj.en}
                  className="rounded-md bg-zinc-900 px-2.5 py-1 text-xs font-mono text-zinc-300 border border-zinc-800"
                >
                  #{tagText}
                </span>
              );
            })}
          </div>

          {/* 详细痛点解决与介绍 */}
          <div className="space-y-4 mb-6">
            <div>
              <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2 font-mono">
                {t.modal.breakthrough}
              </h4>
              <p className="text-sm text-zinc-300 leading-relaxed bg-zinc-900/50 p-4 rounded-xl border border-zinc-900">
                {description}
              </p>
            </div>

            {/* Docker 一键自托管命令 */}
            {tool.selfHostCommand && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5 font-mono">
                    <Terminal className="w-3.5 h-3.5" />
                    {t.modal.oneClickSelfHost}
                  </h4>
                  <button
                    onClick={handleCopyCommand}
                    className="flex items-center gap-1 text-xs text-zinc-400 hover:text-white font-mono transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">{t.modal.copied}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>{t.modal.copyCode}</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-3.5 rounded-xl bg-black/90 border border-zinc-800 font-mono text-xs text-emerald-300/90 overflow-x-auto select-all">
                  {tool.selfHostCommand}
                </pre>
              </div>
            )}
          </div>

          {/* 底部按钮栏 */}
          <div className="pt-4 border-t border-zinc-900 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 text-xs text-zinc-400 font-mono">
              {tool.stars && (
                <span className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500/20" />
                  {tool.stars}
                </span>
              )}
              {tool.license && (
                <span className="flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5 text-zinc-500" />
                  {tool.license}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {tool.githubUrl && (
                <a
                  href={tool.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-xs font-medium text-zinc-200 border border-zinc-800 transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
              )}
              <a
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-semibold transition-transform active:scale-95 shadow-md shadow-amber-500/20"
              >
                <span>{t.modal.visitSite}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
