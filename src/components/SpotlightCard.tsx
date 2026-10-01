'use client';

import React, { useRef, useState } from 'react';
import { ExternalLink, Star, Terminal, Sparkles } from 'lucide-react';
import { ToolItem } from '@/types/tool';
import { useI18n } from '@/lib/i18n';
import { cn } from '@/lib/utils';

interface SpotlightCardProps {
  tool: ToolItem;
  onSelect: (tool: ToolItem) => void;
}

export const SpotlightCard: React.FC<SpotlightCardProps> = ({ tool, onSelect }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const { lang, t } = useI18n();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const tagline = lang === 'en' ? (tool.taglineEn || tool.tagline) : tool.tagline;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect(tool)}
      className={cn(
        'group relative rounded-2xl bg-zinc-950/80 p-6 text-zinc-100 backdrop-blur-md',
        'border border-white/10 transition-all duration-300 ease-out',
        'hover:-translate-y-1 hover:border-white/20 hover:shadow-2xl hover:shadow-black/60',
        'cursor-pointer flex flex-col justify-between overflow-hidden'
      )}
    >
      {/* RareUI 风格: 鼠标跟随径向微光 (Radial Spotlight) */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: isHovered
            ? `radial-gradient(400px circle at ${coords.x}px ${coords.y}px, rgba(246, 130, 31, 0.12), transparent 80%)`
            : undefined,
        }}
      />

      {/* 边框高光线条跟随 */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: isHovered
            ? `radial-gradient(200px circle at ${coords.x}px ${coords.y}px, rgba(255, 255, 255, 0.25), transparent 70%)`
            : undefined,
          maskImage: 'linear-gradient(black, black) content-box, linear-gradient(black, black)',
          WebkitMaskImage: 'linear-gradient(black, black) content-box, linear-gradient(black, black)',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
          padding: '1px',
        }}
      />

      <div className="relative z-10 flex flex-col h-full">
        {/* 顶部 Header: 标题、替代标签与外链 */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <h3 className="text-lg font-semibold text-zinc-100 tracking-tight group-hover:text-amber-400 transition-colors">
                {tool.name}
              </h3>
              {tool.featured && (
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-[11px] font-medium text-amber-400 border border-amber-500/20">
                  <Sparkles className="w-2.5 h-2.5" />
                  {t.card.featured}
                </span>
              )}
            </div>

            {/* 核心杀手锏：商业替代标注 (Alt Badge) */}
            {tool.alternativeTo && (
              <div className="inline-flex items-center gap-1 text-[11px] font-mono text-zinc-400 bg-zinc-900/90 border border-zinc-800 rounded-md px-2 py-0.5">
                <span className="text-amber-500 font-semibold">{t.card.altTo}</span>
                <span className="text-zinc-200">{tool.alternativeTo}</span>
              </div>
            )}
          </div>

          {/* 直达官网图标 */}
          <a
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            title={t.card.visit}
            className="rounded-lg p-2 text-zinc-400 hover:text-white hover:bg-zinc-800/80 transition-colors border border-transparent hover:border-zinc-700"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* 中部介绍 */}
        <p className="text-sm text-zinc-400 leading-relaxed mb-4 line-clamp-2">
          {tagline}
        </p>

        {/* 底部元数据: 标签、Stars 与定价模式 */}
        <div className="mt-auto pt-3 border-t border-zinc-900/80 flex items-center justify-between gap-2 flex-wrap text-xs">
          {/* Tags */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {tool.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-zinc-900 px-2 py-0.5 text-zinc-400 text-[11px] font-mono border border-zinc-800"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* 右侧：Stars 或自托管标识 */}
          <div className="flex items-center gap-2.5 text-zinc-400 font-mono text-[11px]">
            {tool.stars && (
              <span className="inline-flex items-center gap-1">
                <Star className="w-3 h-3 text-amber-500 fill-amber-500/20" />
                {tool.stars}
              </span>
            )}
            {tool.selfHostCommand && (
              <span className="inline-flex items-center gap-0.5 text-emerald-400/90" title="Self-hostable via Docker">
                <Terminal className="w-3 h-3" />
                {t.card.selfHost}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
