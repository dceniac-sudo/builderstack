'use client';

import React, { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { OssCard, OssProjectView } from '@/components/OssParts';
import { useI18n } from '@/lib/i18n';
import { cn } from '@/lib/utils';

interface OssBrowserProps {
  projects: OssProjectView[];
  pills?: { id: string; label: string }[];   // 行业页传用途；首页不传
  showIndustry?: boolean;                    // 卡片上显示行业名（首页混着多个行业时用）
}

// 搜索框、筛选和项目卡片列表。首页和行业页共用。
export const OssBrowser: React.FC<OssBrowserProps> = ({ projects, pills = [], showIndustry }) => {
  const { t } = useI18n();
  const o = t.oss;
  const [query, setQuery] = useState('');
  const [pill, setPill] = useState('all');
  const [onlyCommercial, setOnlyCommercial] = useState(false);

  // 筛选按钮上的数字跟着搜索词和“只看可以直接商用的”变
  const groups = useMemo(() => {
    const q = query.trim().toLowerCase();
    const base = projects.filter(
      (p) =>
        (!onlyCommercial || p.facts.commercial.verdict === 'good') &&
        (!q || p.name.toLowerCase().includes(q) || p.what.toLowerCase().includes(q) || p.industryLabel.toLowerCase().includes(q))
    );
    const used = pills.filter((u) => projects.some((p) => p.uses.includes(u.id)));
    return [
      { id: 'all', label: o.all, shown: base },
      ...used.map((u) => ({ ...u, shown: base.filter((p) => p.uses.includes(u.id)) })),
    ];
  }, [projects, pills, query, onlyCommercial, o.all]);

  const shown = groups.find((g) => g.id === pill)?.shown ?? [];

  return (
    <div>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
        <label className="flex min-h-12 min-w-0 flex-[1_1_320px] items-center gap-3 rounded-full border border-[#D9DCE2] bg-white px-5 focus-within:border-[#0E1116]">
          <Search aria-hidden="true" className="h-4 w-4 shrink-0 text-[#6B7280]" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={o.searchPlaceholder}
            aria-label={o.searchPlaceholder}
            className="min-w-0 flex-1 bg-transparent text-[15px] outline-none placeholder:text-[#6B7280]"
          />
        </label>
        <label className="inline-flex min-h-11 cursor-pointer items-center gap-2.5 text-[15px]">
          <input
            type="checkbox"
            checked={onlyCommercial}
            onChange={(e) => setOnlyCommercial(e.target.checked)}
            className="h-[18px] w-[18px] accent-[#0E1116]"
          />
          {o.only}
        </label>
      </div>

      {groups.length > 2 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {groups.map((g) => {
            const active = pill === g.id;
            return (
              <button
                key={g.id}
                type="button"
                onClick={() => setPill(g.id)}
                aria-pressed={active}
                className={cn(
                  'inline-flex min-h-11 items-center gap-2 rounded-full border px-[18px] text-[15px] font-medium transition-colors duration-150',
                  active
                    ? 'border-[#0E1116] bg-[#0E1116] text-white'
                    : 'border-[#D9DCE2] bg-white text-[#0E1116] hover:border-[#0E1116]'
                )}
              >
                {g.label}
                <span className={cn('text-[13px] font-normal', active ? 'text-[#C9CDD4]' : 'text-[#6B7280]')}>{g.shown.length}</span>
              </button>
            );
          })}
        </div>
      )}

      <p className="mt-4 text-sm text-[#535A66]">{o.count(shown.length)}</p>

      <div className="mt-3 grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
        {shown.map((p) => (
          <OssCard key={`${p.industry}-${p.id}`} project={p} showIndustry={showIndustry} />
        ))}
      </div>

      {shown.length === 0 && (
        <div className="rounded-[20px] border border-dashed border-[#D9DCE2] px-6 py-12 text-center text-[15px] text-[#535A66]">
          {o.empty}
        </div>
      )}
    </div>
  );
};
