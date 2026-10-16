'use client';

import React from 'react';
import { OssFactKey, OssVerdict } from '@/types/oss';
import { useI18n, X_HANDLE } from '@/lib/i18n';
import { cn } from '@/lib/utils';

// 开源项目各页面共用的小部件和数据形状。
// 页面拿到的是已经按当前语言取好文字的数据（见 src/lib/oss-pages.tsx），另一种语言的文字不进页面。

export interface OssFactView {
  verdict: OssVerdict;
  label: string;
  short?: string;
  detail?: string;
  sources: { label: string; url: string }[];
}

export interface OssProjectView {
  id: string;
  name: string;
  logo?: string;
  what: string;
  use: string;                 // 所属用途
  useLabel: string;
  useHref: string;             // 用途页
  industries: string[];        // 出现在哪些行业里
  scenarios: { id: string; label: string; text: string }[];   // 在各行业里拿它做什么，只有写了场景的行业
  href: string;                // 项目详情页
  repoUrl: string;
  homepage?: string;
  facts: Record<OssFactKey, OssFactView>;
  needs?: OssFactView;         // 还要另外准备什么
  handsOn: boolean;            // 作者自己实践过
  checkedAt: string;
  confirmed: boolean;
}

// 用途和行业共用的形状
export interface OssCategoryView {
  id: string;
  label: string;
  title: string;               // 用途页或行业页的大标题
  description: string;
  count: number;               // 能显示出来的项目数
  href: string;                // 用途页 /oss/<用途>/ 或行业页 /for/<行业>/
}

export type RowFactKey = Exclude<OssFactKey, 'caveats'>;
export const ROW_FACTS: RowFactKey[] = ['commercial', 'alive', 'deploy', 'cost'];
export const ALL_FACTS: OssFactKey[] = ['commercial', 'alive', 'deploy', 'cost', 'caveats'];

// 结论的小圆点是全站唯一用颜色的地方；“还没查到”是虚线空心圈
export const Dot: React.FC<{ verdict: OssVerdict }> = ({ verdict }) => (
  <span
    className={cn(
      'inline-block w-2 h-2 rounded-full shrink-0',
      verdict === 'good' && 'bg-[var(--good)]',
      verdict === 'caution' && 'bg-[var(--warn)]',
      verdict === 'bad' && 'bg-[var(--bad)]',
      verdict === 'pending' && 'border-[1.5px] border-dashed border-[#9A9A96]'
    )}
  />
);

// 项目图标：有官方图标用图标，没有就用名字的第一个字
export const OssLogo: React.FC<{ project: Pick<OssProjectView, 'name' | 'logo'>; size?: number }> = ({ project, size = 34 }) =>
  project.logo ? (
    <img
      src={project.logo}
      alt=""
      width={size}
      height={size}
      className="shrink-0 rounded-[9px] border border-[var(--line)] bg-white object-cover"
      style={{ width: size, height: size }}
    />
  ) : (
    <span
      aria-hidden="true"
      className="grid shrink-0 place-items-center rounded-[9px] border border-[var(--line)] bg-[var(--wash)] font-semibold text-[var(--sub)]"
      style={{ width: size, height: size, fontSize: Math.round(size * 0.44) }}
    >
      {project.name.charAt(0)}
    </span>
  );

// 页面底部的联系入口，中英文都是 X。
// 2026-10-11 定：站上的联系入口只有 X，不放其他渠道的名字和二维码，不要再加回来。
export const OssCta: React.FC = () => {
  const { t } = useI18n();
  const o = t.oss;

  return (
    <section className="mt-12 flex flex-wrap items-center justify-between gap-x-8 gap-y-4 rounded-2xl border border-[var(--line)] bg-gradient-to-b from-white to-[var(--wash)] p-6 sm:p-8">
      <div className="min-w-0 flex-[1_1_320px]">
        <h2 className="text-[clamp(19px,2.2vw,24px)] font-semibold tracking-[-0.01em]">{o.ctaTitle}</h2>
        <p className="mt-1 text-[15px] text-[var(--sub)]">{o.ctaBody}</p>
      </div>
      <a
        href={`https://x.com/${X_HANDLE}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-11 items-center rounded-[10px] bg-[var(--ink)] px-[18px] text-[14.5px] font-medium text-white transition-colors hover:bg-[#2E2E2B]"
      >
        {o.ctaButton}
      </a>
    </section>
  );
};
