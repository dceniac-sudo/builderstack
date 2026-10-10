'use client';

import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { OssFactKey, OssVerdict } from '@/types/oss';
import { useI18n, X_HANDLE } from '@/lib/i18n';
import { cn } from '@/lib/utils';

// “按行业找开源项目”各页面共用的小部件和数据形状。
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
  industry: string;
  industryLabel: string;
  uses: string[];
  href: string;                // 项目详情页
  repoUrl: string;
  homepage?: string;
  facts: Record<OssFactKey, OssFactView>;
  checkedAt: string;
  confirmed: boolean;
}

export interface OssIndustryView {
  id: string;
  label: string;
  description: string;
  count: number;               // 能显示出来的项目数；0 表示还在评估，不能选
  href?: string;               // 行业页；没有可显示的项目时为空
  uses: { id: string; label: string }[];
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

// 页面底部的联系入口。中文是公众号二维码（微信不支持网页一键关注，只能扫码），英文是 X。
export const OssCta: React.FC = () => {
  const { lang, t } = useI18n();
  const o = t.oss;
  const [showQr, setShowQr] = useState(false);
  const button =
    'inline-flex min-h-11 items-center rounded-[10px] bg-[var(--ink)] px-[18px] text-[14.5px] font-medium text-white transition-colors hover:bg-[#2E2E2B]';

  useEffect(() => {
    if (!showQr) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowQr(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [showQr]);

  return (
    <section className="mt-12 flex flex-wrap items-center justify-between gap-x-8 gap-y-4 rounded-2xl border border-[var(--line)] bg-gradient-to-b from-white to-[var(--wash)] p-6 sm:p-8">
      <div className="min-w-0 flex-[1_1_320px]">
        <h2 className="text-[clamp(19px,2.2vw,24px)] font-semibold tracking-[-0.01em]">{o.ctaTitle}</h2>
        <p className="mt-1 text-[15px] text-[var(--sub)]">{o.ctaBody}</p>
      </div>
      {lang === 'zh' ? (
        <button type="button" onClick={() => setShowQr(true)} className={button}>
          {o.ctaButton}
        </button>
      ) : (
        <a href={`https://x.com/${X_HANDLE}`} target="_blank" rel="noopener noreferrer" className={button}>
          {o.ctaButton}
        </a>
      )}

      {showQr && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={o.qrText}>
          <div className="fixed inset-0 bg-[#141414]/50" onClick={() => setShowQr(false)} />
          <div className="swap-in relative z-10 w-full max-w-xs rounded-2xl bg-white p-6 text-center shadow-2xl">
            <button
              type="button"
              onClick={() => setShowQr(false)}
              aria-label="Close"
              className="absolute top-2 right-2 flex h-11 w-11 items-center justify-center rounded-full text-[var(--sub)] hover:bg-[var(--wash)]"
            >
              <X className="w-4 h-4" />
            </button>
            <img src="/wechat-qr.png" alt={o.qrText} width={200} height={200} className="mx-auto mt-4 rounded-xl" />
            <p className="mt-4 text-sm text-[#2E2E2B]">{o.qrText}</p>
          </div>
        </div>
      )}
    </section>
  );
};
