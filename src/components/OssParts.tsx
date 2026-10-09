'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
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
  count: number;               // 能显示出来的项目数
  href?: string;               // 没有可显示的项目时为空，卡片显示“评估中”且不能点
}

export type RowFactKey = Exclude<OssFactKey, 'caveats'>;
export const ROW_FACTS: RowFactKey[] = ['commercial', 'alive', 'deploy', 'cost'];
export const ALL_FACTS: OssFactKey[] = ['commercial', 'alive', 'deploy', 'cost', 'caveats'];

const DOT: Record<OssVerdict, string> = {
  good: 'bg-[#1F8A4C]',
  caution: 'bg-[#D97706]',
  bad: 'bg-[#C62828]',
  pending: 'bg-[#9CA3AF]',
};

export const Dot: React.FC<{ verdict: OssVerdict }> = ({ verdict }) => (
  <span className={cn('inline-block w-2 h-2 rounded-full shrink-0', DOT[verdict])} />
);

// 项目卡片：名字、一句话、四个结论。整张卡片点进详情页。
export const OssCard: React.FC<{ project: OssProjectView; showIndustry?: boolean }> = ({ project: p, showIndustry }) => {
  const { t } = useI18n();
  const o = t.oss;

  return (
    <Link
      href={p.href}
      className="group flex h-full flex-col rounded-[20px] border border-[#E6E8EC] bg-white p-5 transition-colors duration-150 hover:border-[#0E1116] sm:p-6"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="min-w-0 text-lg font-semibold leading-[1.35]">
          {p.name}
          {!p.confirmed && <span className="ml-2 align-middle text-xs font-normal text-[#6B7280]">{o.draft}</span>}
        </h3>
        {showIndustry && (
          <span className="shrink-0 rounded-full bg-[#F5F6F8] px-2.5 py-1 text-xs text-[#535A66]">{p.industryLabel}</span>
        )}
      </div>
      <p className="mt-2 text-sm leading-[1.6] text-[#535A66]">{p.what}</p>

      <div className="mt-auto grid grid-cols-2 gap-x-4 gap-y-3 pt-5">
        {ROW_FACTS.map((key) => {
          const fact = p.facts[key];
          return (
            <span key={key} className="flex flex-col gap-1">
              <span className="text-xs text-[#6B7280]">{o.cols[key]}</span>
              <span className="flex items-center gap-2 text-[15px] font-medium">
                <Dot verdict={fact.verdict} />
                {fact.short ?? o.short[key][fact.verdict]}
              </span>
            </span>
          );
        })}
      </div>
    </Link>
  );
};

// 行业卡片。还没有项目的行业显示“评估中”，不能点。
export const OssIndustryCard: React.FC<{ industry: OssIndustryView }> = ({ industry }) => {
  const { t } = useI18n();
  const o = t.oss;
  const body = (
    <>
      <span className="flex items-center justify-between gap-3">
        <span className="text-lg font-semibold leading-[1.35]">{industry.label}</span>
        <span className={cn('shrink-0 text-[13px]', industry.href ? 'text-[#0E1116]' : 'text-[#6B7280]')}>
          {industry.href ? o.projectCount(industry.count) : o.evaluating}
        </span>
      </span>
      <span className="mt-1.5 block text-sm leading-[1.6] text-[#535A66]">{industry.description}</span>
    </>
  );

  if (!industry.href) {
    return <div className="rounded-[20px] border border-dashed border-[#D9DCE2] bg-white p-5">{body}</div>;
  }
  return (
    <Link
      href={industry.href}
      className="block rounded-[20px] border border-[#E6E8EC] bg-white p-5 transition-colors duration-150 hover:border-[#0E1116]"
    >
      {body}
    </Link>
  );
};

// 页面底部的联系入口。中文是公众号二维码（微信不支持网页一键关注，只能扫码），英文是 X。
export const OssCta: React.FC = () => {
  const { lang, t } = useI18n();
  const o = t.oss;
  const [showQr, setShowQr] = useState(false);
  const button =
    'inline-flex min-h-12 items-center rounded-full bg-[#0E1116] px-6 text-[15px] font-medium text-white hover:bg-[#2B303A]';

  useEffect(() => {
    if (!showQr) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowQr(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [showQr]);

  return (
    <section className="mt-12 flex flex-wrap items-center justify-between gap-x-10 gap-y-5 rounded-[20px] bg-[#F5F6F8] p-7 sm:mt-[72px] sm:p-12">
      <div className="min-w-0 flex-[1_1_320px]">
        <h2 className="text-[clamp(22px,3vw,30px)] font-bold leading-[1.3]">{o.ctaTitle}</h2>
        <p className="mt-2 text-[15px] text-[#535A66]">{o.ctaBody}</p>
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
          <div className="fixed inset-0 bg-[#0E1116]/50" onClick={() => setShowQr(false)} />
          <div className="relative z-10 w-full max-w-xs rounded-[20px] bg-white p-6 text-center shadow-2xl">
            <button
              type="button"
              onClick={() => setShowQr(false)}
              aria-label="Close"
              className="absolute top-2 right-2 flex h-11 w-11 items-center justify-center rounded-full text-[#535A66] hover:bg-[#F5F6F8]"
            >
              <X className="w-4 h-4" />
            </button>
            <img src="/wechat-qr.png" alt={o.qrText} width={200} height={200} className="mx-auto mt-4 rounded-xl" />
            <p className="mt-4 text-sm text-[#2B303A]">{o.qrText}</p>
          </div>
        </div>
      )}
    </section>
  );
};
