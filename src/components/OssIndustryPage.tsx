'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import { ChevronDown, X } from 'lucide-react';
import { OssFact, OssFactKey, OssProject, OssUse, OssVerdict } from '@/types/oss';
import { cn } from '@/lib/utils';

interface OssIndustryPageProps {
  path: string;                // 这一页自己的地址。左上角的标志留在本页，不跳去面向工程师的主站首页
  label: string;               // 行业名
  title: string;
  tagline: string;             // 标题后面灰色的那半句
  uses: { id: OssUse; label: string }[];   // 全部用途，由页面传入，数据文件不进浏览器端的包
  projects: OssProject[];
}

type RowFactKey = Exclude<OssFactKey, 'caveats'>;

// 列表行里显示前四件事，每格一个词；展开后五件事都显示
const ROW_FACTS: { key: RowFactKey; short: string }[] = [
  { key: 'commercial', short: '商用' },
  { key: 'alive', short: '更新' },
  { key: 'deploy', short: '部署' },
  { key: 'cost', short: '成本' },
];

const FACT_ROWS: { key: OssFactKey; question: string }[] = [
  { key: 'commercial', question: '能不能商用' },
  { key: 'alive', question: '还活不活着' },
  { key: 'deploy', question: '部署难不难' },
  { key: 'cost', question: '成本多少' },
  { key: 'caveats', question: '注意事项' },
];

// 数据里写了 short 的用数据里的，没写的按结论轻重取这里的默认词
const SHORT_LABEL: Record<RowFactKey, Record<OssVerdict, string>> = {
  commercial: { good: '可以', caution: '有条件', bad: '要买授权', pending: '待核对' },
  alive: { good: '在更新', caution: '放缓', bad: '停更', pending: '待核对' },
  deploy: { good: '容易', caution: '中等', bad: '门槛高', pending: '待核对' },
  cost: { good: '低', caution: '中等', bad: '高', pending: '待核对' },
};

const DOT: Record<OssVerdict, string> = {
  good: 'bg-[#1F8A4C]',
  caution: 'bg-[#D97706]',
  bad: 'bg-[#C62828]',
  pending: 'bg-[#9CA3AF]',
};

const Dot: React.FC<{ verdict: OssVerdict }> = ({ verdict }) => (
  <span className={cn('w-2 h-2 rounded-full shrink-0', DOT[verdict])} />
);

const SummaryTile: React.FC<{ count: number; verdict: OssVerdict; caption: string }> = ({ count, verdict, caption }) => (
  <div className="flex-1 basis-0 rounded-2xl bg-[#F5F6F8] px-3 py-[18px] sm:px-5">
    <div className="text-[40px] leading-none font-bold">{count}</div>
    <div className="mt-2.5 flex items-center gap-1.5 text-[13px] text-[#3A404B]">
      <Dot verdict={verdict} />
      {caption}
    </div>
  </div>
);

const FactBlock: React.FC<{ question: string; fact: OssFact }> = ({ question, fact }) => (
  <div className="flex flex-col gap-1.5">
    <span className="text-xs text-[#6B7280]">{question}</span>
    <span className="flex items-center gap-2 text-base font-semibold">
      <Dot verdict={fact.verdict} />
      {fact.label}
    </span>
    {fact.detail && <span className="text-[14.5px] leading-[1.7] text-[#2B303A]">{fact.detail}</span>}
    {fact.sources && fact.sources.length > 0 && (
      <span className="flex flex-wrap gap-x-3.5 gap-y-1 text-[13px]">
        {fact.sources.map((s) => (
          <a
            key={s.url}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#535A66] underline underline-offset-2 hover:text-[#C2410C]"
          >
            {s.label}
          </a>
        ))}
      </span>
    )}
  </div>
);

// 微信不支持网页一键关注，点击后弹出二维码让读者扫码
const WechatDialog: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="公众号二维码">
      <div className="fixed inset-0 bg-[#0E1116]/50" onClick={onClose} />
      <div className="relative z-10 w-full max-w-xs rounded-[20px] bg-white p-6 text-center shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          aria-label="关闭"
          className="absolute top-2 right-2 flex h-11 w-11 items-center justify-center rounded-full text-[#535A66] hover:bg-[#F5F6F8]"
        >
          <X className="w-4 h-4" />
        </button>
        <img src="/wechat-qr.png" alt="公众号“老孙不会AI”的二维码" width={200} height={200} className="mx-auto mt-4 rounded-xl" />
        <p className="mt-4 text-sm text-[#2B303A]">微信扫码关注公众号“老孙不会AI”，在后台留言</p>
      </div>
    </div>
  );
};

export const OssIndustryPage: React.FC<OssIndustryPageProps> = ({ path, label, title, tagline, uses: allUses, projects }) => {
  const [use, setUse] = useState<OssUse | 'all'>('all');
  const [onlyCommercial, setOnlyCommercial] = useState(false);
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const [showQr, setShowQr] = useState(false);

  // 只显示有项目的用途；数字跟着“只看可以直接商用的”变
  const pills = useMemo(() => {
    const matches = (p: OssProject, u: OssUse | 'all') =>
      (u === 'all' || p.uses.includes(u)) && (!onlyCommercial || p.facts.commercial.verdict === 'good');
    return [{ id: 'all' as const, label: '全部' }, ...allUses.filter((u) => projects.some((p) => p.uses.includes(u.id)))].map(
      (u) => ({ ...u, shown: projects.filter((p) => matches(p, u.id)) })
    );
  }, [allUses, projects, onlyCommercial]);

  const shown = pills.find((u) => u.id === use)?.shown ?? [];
  const countOf = (v: OssVerdict) => projects.filter((p) => p.facts.commercial.verdict === v).length;
  const checkedAt = projects.map((p) => p.checkedAt).sort().pop();

  return (
    <MotionConfig reducedMotion="user">
      <div className="text-base leading-[1.6]">
        <header className="border-b border-[#E6E8EC]">
          <div className="mx-auto flex min-h-16 max-w-[1120px] items-center justify-between gap-4 px-5 sm:px-10">
            <a href={path} className="flex items-center gap-2.5 font-semibold">
              <span className="inline-block h-[22px] w-[22px] rounded-md bg-[#E8590C]" />
              BuilderStack
            </a>
            <button
              type="button"
              onClick={() => setShowQr(true)}
              className="inline-flex min-h-11 items-center rounded-full bg-[#F5F6F8] px-4 text-sm font-medium hover:bg-[#ECEEF2]"
            >
              公众号
            </button>
          </div>
        </header>

        <main className="mx-auto max-w-[1120px] px-5 pt-10 sm:px-10 sm:pt-16 lg:pt-20">
          <section>
            <p className="mb-4 text-sm font-medium text-[#535A66]">按行业找开源项目 / {label}</p>
            <h1 className="text-[clamp(30px,5vw,52px)] font-bold leading-[1.18] tracking-[-0.01em]">
              <span className="block">{title}。</span>
              <span className="block text-[#8A909C]">{tagline}</span>
            </h1>
            <p className="mt-5 text-[15px] text-[#535A66]">
              依据是许可证原文、仓库提交记录和官方部署文档，没有逐个亲自部署。
              {checkedAt && <>最近核对：<time dateTime={checkedAt}>{checkedAt}</time>。</>}
            </p>

            <div className="mt-8 flex max-w-[720px] gap-2.5 sm:gap-3">
              <SummaryTile count={countOf('good')} verdict="good" caption="可直接商用" />
              <SummaryTile count={countOf('caution')} verdict="caution" caption="商用有条件" />
              <SummaryTile count={countOf('bad')} verdict="bad" caption="要买授权" />
            </div>
          </section>

          <section className="mt-9 sm:mt-14">
            <h2 className="mb-3.5 text-lg font-semibold">你想解决哪件事</h2>
            <div className="flex flex-wrap gap-2">
              {pills.map((u) => {
                const active = use === u.id;
                return (
                  <button
                    key={u.id}
                    type="button"
                    onClick={() => setUse(u.id)}
                    aria-pressed={active}
                    className={cn(
                      'inline-flex min-h-11 items-center gap-2 rounded-full border px-[18px] text-[15px] font-medium transition-colors duration-150',
                      active
                        ? 'border-[#0E1116] bg-[#0E1116] text-white'
                        : 'border-[#D9DCE2] bg-white text-[#0E1116] hover:border-[#0E1116]'
                    )}
                  >
                    {u.label}
                    <span className={cn('text-[13px] font-normal', active ? 'text-[#C9CDD4]' : 'text-[#6B7280]')}>
                      {u.shown.length}
                    </span>
                  </button>
                );
              })}
            </div>
            <div className="mt-3.5 flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
              <label className="inline-flex min-h-11 cursor-pointer items-center gap-2.5 text-[15px]">
                <input
                  type="checkbox"
                  checked={onlyCommercial}
                  onChange={(e) => setOnlyCommercial(e.target.checked)}
                  className="h-[18px] w-[18px] accent-[#0E1116]"
                />
                只看可以直接商用的
              </label>
              <span className="text-sm text-[#535A66]">共 {shown.length} 个，点一行看依据和出处</span>
            </div>
          </section>

          <section className="mt-3 overflow-hidden rounded-[20px] border border-[#E6E8EC]">
            {shown.map((p, i) => {
              const isOpen = !!open[p.id];
              return (
                <div key={p.id} id={p.id} className={cn(i > 0 && 'border-t border-[#E6E8EC]')}>
                  <button
                    type="button"
                    onClick={() => setOpen((o) => ({ ...o, [p.id]: !isOpen }))}
                    aria-expanded={isOpen}
                    className="relative flex w-full flex-wrap items-center gap-x-10 gap-y-4 bg-white py-5 pl-5 pr-14 text-left hover:bg-[#FAFAFB] sm:pl-6"
                  >
                    <span className="flex min-w-0 flex-[2_1_260px] flex-col gap-1">
                      <span className="text-lg font-semibold leading-[1.35]">
                        {p.name}
                        {!p.confirmed && <span className="ml-2 align-middle text-xs font-normal text-[#6B7280]">草稿</span>}
                      </span>
                      <span className="text-sm leading-[1.55] text-[#535A66]">{p.what}</span>
                    </span>
                    <span className="grid flex-[3_1_300px] grid-cols-[repeat(auto-fit,minmax(112px,1fr))] gap-x-4 gap-y-3">
                      {ROW_FACTS.map((r) => {
                        const fact = p.facts[r.key];
                        return (
                          <span key={r.key} className="flex flex-col gap-1">
                            <span className="text-xs text-[#6B7280]">{r.short}</span>
                            <span className="flex items-center gap-2 text-[15px] font-medium">
                              <Dot verdict={fact.verdict} />
                              {fact.short ?? SHORT_LABEL[r.key][fact.verdict]}
                            </span>
                          </span>
                        );
                      })}
                    </span>
                    <ChevronDown
                      aria-hidden="true"
                      className={cn(
                        'absolute right-5 top-[26px] h-5 w-5 text-[#535A66] transition-transform duration-200',
                        isOpen && 'rotate-180'
                      )}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className="overflow-hidden bg-[#F5F6F8]"
                      >
                        <div className="p-5 sm:p-6">
                          <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-x-8 gap-y-6">
                            {FACT_ROWS.map((r) => (
                              <FactBlock key={r.key} question={r.question} fact={p.facts[r.key]} />
                            ))}
                          </div>
                          <div className="mt-5 flex flex-wrap gap-x-3 gap-y-2 border-t border-[#E0E3E8] pt-4">
                            <a
                              href={p.repoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex min-h-11 items-center rounded-full bg-[#0E1116] px-[18px] text-sm font-medium text-white hover:bg-[#2B303A]"
                            >
                              打开仓库
                            </a>
                            {p.homepage && (
                              <a
                                href={p.homepage}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex min-h-11 items-center rounded-full border border-[#D9DCE2] bg-white px-[18px] text-sm font-medium hover:border-[#0E1116]"
                              >
                                官网
                              </a>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}

            {shown.length === 0 && (
              <div className="px-6 py-12 text-center text-[15px] text-[#535A66]">
                这个用途下没有可以直接商用的项目，去掉上面的勾选再看。
              </div>
            )}
          </section>

          <section className="mt-10 flex flex-wrap items-center justify-between gap-x-10 gap-y-5 rounded-[20px] bg-[#F5F6F8] p-7 sm:mt-[72px] sm:p-12">
            <div className="min-w-0 flex-[1_1_320px]">
              <h2 className="text-[clamp(22px,3vw,30px)] font-bold leading-[1.3]">没有你的行业？</h2>
              <p className="mt-2 text-[15px] text-[#535A66]">告诉我行业和想解决的事，下一个就评估它。</p>
            </div>
            <button
              type="button"
              onClick={() => setShowQr(true)}
              className="min-h-12 rounded-full bg-[#0E1116] px-6 text-[15px] font-medium text-white hover:bg-[#2B303A]"
            >
              在公众号“老孙不会AI”留言
            </button>
          </section>
        </main>

        <footer className="mx-auto max-w-[1120px] px-5 pb-10 pt-8 text-[13px] text-[#6B7280] sm:px-10">BuilderStack © 2026</footer>

        {showQr && <WechatDialog onClose={() => setShowQr(false)} />}
      </div>
    </MotionConfig>
  );
};
