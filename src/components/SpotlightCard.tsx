'use client';

import React, { useRef, useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { ToolItem } from '@/types/tool';
import { useI18n } from '@/lib/i18n';
import { cn } from '@/lib/utils';

interface SpotlightCardProps {
  tool: ToolItem;
  onSelect: (tool: ToolItem) => void;
}

const STATUS_STYLE: Record<ToolItem['status'], string> = {
  daily: 'text-[#C2410C] bg-[#F5F6F8] border-[#E6E8EC]',
  sometimes: 'text-[#1D4ED8] bg-[#EEF3FF] border-[#D6E2FF]',
  dropped: 'text-[#535A66] bg-[#ECEEF2] border-[#D9DCE2]',
};

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

  const note = lang === 'en' ? tool.noteEn : tool.note;
  const displayName = lang === 'zh' && tool.nameZh ? tool.nameZh : tool.name;
  const dropped = tool.status === 'dropped';
  const link = tool.url || tool.githubUrl;

  return (
    <div
      ref={cardRef}
      id={`tool-${tool.id}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect(tool)}
      className={cn(
        'group relative h-full rounded-2xl bg-white p-6 text-[#0E1116] backdrop-blur-md',
        'border transition-all duration-300 ease-out',
        'hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/10',
        'cursor-pointer flex flex-col overflow-hidden',
        dropped ? 'border-dashed border-[#E6E8EC] hover:border-[#D9DCE2]' : 'border-[#E6E8EC] hover:border-[#E6E8EC]'
      )}
    >
      {/* 鼠标跟随径向微光 */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: isHovered
            ? `radial-gradient(400px circle at ${coords.x}px ${coords.y}px, rgba(14, 17, 22, 0.04), transparent 80%)`
            : undefined,
        }}
      />

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 flex-wrap min-w-0">
            <h3
              className={cn(
                'text-lg font-semibold tracking-tight transition-colors group-hover:text-[#C2410C]',
                dropped ? 'text-[#2B303A] line-through decoration-[#9CA3AF]' : 'text-[#0E1116]'
              )}
            >
              {displayName}
            </h3>
            <span
              className={cn(
                'font-mono text-[11px] tracking-wide px-2 py-0.5 rounded border',
                STATUS_STYLE[tool.status]
              )}
            >
              {t.status[tool.status]}
            </span>
          </div>

          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              title={t.card.visit}
              className="rounded-lg p-2 -mt-1 -mr-1 text-[#6B7280] hover:text-[#0E1116] hover:bg-[#ECEEF2] transition-colors shrink-0"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>

        {/* 作者自己的话，完整显示 */}
        <p className="text-[15px] text-[#2B303A] leading-relaxed">{note}</p>
      </div>
    </div>
  );
};
