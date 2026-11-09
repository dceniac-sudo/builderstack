'use client';

import React, { useState } from 'react';
import { Dot } from '@/components/OssParts';
import { cn } from '@/lib/utils';

// JupyterHub 详情页英文版的班级服务器内存估算器，放在五件事下面，地址带 #calculator。
// 2026-11-09 用户拍板版式 A。完全按官方小型发行版 The Little JupyterHub (TLJH) 的资源估算文档计算：
// 内存 = 同时在线人数 × 每人内存上限 + 128 MB（最低 1 GB 才能安装），同时在线人数按班级人数的 40% 到 60% 起算，或者全班实验课 100% 同时在线。

type Pattern = 'homework' | 'lab';

interface Inputs {
  students: number;
  ramPerUser: number;
  pattern: Pattern;
}

const RAM_OPTIONS = [0.5, 1, 2, 4, 8];

const PRESETS: { id: string; label: string; inputs: Inputs }[] = [
  { id: 'intro', label: '30-student intro Python class (1 GB/student)', inputs: { students: 30, ramPerUser: 1, pattern: 'homework' } },
  { id: 'data', label: '60-student data science class (2 GB/student)', inputs: { students: 60, ramPerUser: 2, pattern: 'homework' } },
  { id: 'lab', label: '25 students all in a live lab at once (100% online)', inputs: { students: 25, ramPerUser: 2, pattern: 'lab' } },
];

const fmt = (x: number, d = 0) => x.toLocaleString('en-US', { maximumFractionDigits: d, minimumFractionDigits: d });
const fmtGb = (x: number) => `${fmt(x, x % 1 ? 1 : 0)} GB`;
const plural = (n: number, word: string) => `${fmt(n)} ${word}${n === 1 ? '' : 's'}`;

function estimate(s: Inputs) {
  const loUsers = s.pattern === 'lab' ? s.students : Math.max(1, Math.round(s.students * 0.4));
  const hiUsers = s.pattern === 'lab' ? s.students : Math.max(loUsers, Math.round(s.students * 0.6));
  const loGb = Math.max(1, Math.round((loUsers * s.ramPerUser + 0.125) * 10) / 10);
  const hiGb = Math.max(1, Math.round((hiUsers * s.ramPerUser + 0.125) * 10) / 10);
  const verdict: 'good' | 'caution' | 'bad' = hiGb <= 8 ? 'good' : hiGb <= 32 ? 'caution' : 'bad';
  return { loUsers, hiUsers, loGb, hiGb, verdict };
}

const ROW = 'grid grid-cols-1 gap-x-8 gap-y-1.5 border-t border-[var(--line)] p-[18px] sm:grid-cols-[9rem_1fr] sm:p-5';
const CTL = 'grid grid-cols-1 items-center gap-x-8 gap-y-2 border-t border-[var(--line)] px-[18px] py-3 sm:grid-cols-[9rem_1fr] sm:px-5';
const Q = 'text-[13px] text-[var(--sub)] sm:pt-0.5';
const PILL = 'rounded-lg border px-[11px] py-1 text-[13.5px] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--ink)]';
const pill = (on: boolean) => cn(PILL, on ? 'border-[var(--ink)] bg-[var(--ink)] text-white' : 'border-[#D9D9D5] bg-white hover:border-[var(--ink)]');
const SOURCE_LINK = 'underline decoration-[#CFCFCA] underline-offset-[3px] transition-colors hover:text-[var(--ink)] hover:decoration-[var(--ink)]';

export const JupyterHubCalculator: React.FC = () => {
  const [s, setS] = useState<Inputs>(PRESETS[0].inputs);
  const [draft, setDraft] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const r = estimate(s);
  const set = (patch: Partial<Inputs>) => setS((prev) => ({ ...prev, ...patch }));

  const ramRangeText = r.loGb === r.hiGb ? `about ${fmtGb(r.loGb)} of RAM` : `${fmtGb(r.loGb)} to ${fmtGb(r.hiGb)} of RAM`;

  const copy = () => {
    const concText = r.loUsers === r.hiUsers ? `${fmt(r.loUsers)} concurrent users (100%)` : `${fmt(r.loUsers)}–${fmt(r.hiUsers)} concurrent users (40%–60%)`;
    const line = `JupyterHub, ${plural(s.students, 'student')} × ${s.ramPerUser} GB limit (${concText}): ${ramRangeText} using the TLJH formula (concurrent users × limit + 128 MB). https://dceniac.com/oss/jupyterhub/#calculator`;
    navigator.clipboard?.writeText(line).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    });
  };

  return (
    <section id="calculator" className="mt-12 scroll-mt-24">
      <h2 className="text-[19px] font-semibold tracking-[-0.01em]">Estimate server memory</h2>
      <p className="mt-1 text-[var(--sub)]">Pick a class scenario or enter your student count. Uses the official The Little JupyterHub (TLJH) sizing formula.</p>

      <div className="mt-3 rounded-[14px] border border-[var(--line)] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)] [overflow:clip]">
        <div className="flex flex-wrap items-center gap-2 bg-[var(--wash)] px-[18px] py-3.5 sm:px-5">
          <span className="mr-1 text-[13px] text-[var(--sub)]">Try</span>
          {PRESETS.map((p) => {
            const on = (Object.keys(p.inputs) as (keyof Inputs)[]).every((k) => p.inputs[k] === s[k]);
            return (
              <button
                key={p.id}
                type="button"
                aria-pressed={on}
                onClick={() => { setS(p.inputs); setDraft(null); }}
                className={cn(
                  'rounded-full border bg-white px-3 py-1 text-[13.5px] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--ink)]',
                  on ? 'border-[var(--ink)] shadow-[inset_0_0_0_1px_var(--ink)]' : 'border-[#D9D9D5] hover:border-[var(--ink)]'
                )}
              >
                {p.label}
              </button>
            );
          })}
        </div>

        <div className={CTL}>
          <span className={Q}>Class size</span>
          <label className="flex flex-col gap-[3px] text-xs text-[var(--sub)]">
            Total enrolled students
            <input
              type="number"
              inputMode="numeric"
              min={1}
              max={2000}
              value={draft ?? String(s.students)}
              onChange={(e) => {
                const raw = e.target.value;
                setDraft(raw);
                const parsed = Math.floor(Number(raw));
                if (raw !== '' && Number.isFinite(parsed) && parsed >= 1) {
                  set({ students: Math.min(parsed, 2000) });
                }
              }}
              onBlur={() => setDraft(null)}
              className="w-full rounded-lg border border-[#D9D9D5] px-[9px] py-[5px] text-[14.5px] tabular-nums text-[var(--ink)] focus:outline focus:outline-2 focus:outline-offset-1 focus:outline-[var(--ink)] sm:w-[132px]"
            />
          </label>
        </div>

        <div className={CTL}>
          <span className={Q}>RAM limit / student</span>
          <div className="flex flex-wrap gap-1.5">
            {RAM_OPTIONS.map((v) => (
              <button key={v} type="button" aria-pressed={s.ramPerUser === v} onClick={() => set({ ramPerUser: v })} className={pill(s.ramPerUser === v)}>
                {v} GB
              </button>
            ))}
          </div>
        </div>

        <div className={CTL}>
          <span className={Q}>When students log in</span>
          <div className="flex flex-wrap gap-1.5">
            {([
              ['homework', 'Homework / async (40%–60% online at once)'],
              ['lab', 'In-person lab or exam (100% online at once)'],
            ] as [Pattern, string][]).map(([v, label]) => (
              <button key={v} type="button" aria-pressed={s.pattern === v} onClick={() => set({ pattern: v })} className={pill(s.pattern === v)}>
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-[var(--wash)]" aria-live="polite">
          <div className={ROW}>
            <div className={Q}>Concurrent users</div>
            <div className="min-w-0">
              <span className="text-base font-semibold tabular-nums">
                {r.loUsers === r.hiUsers
                  ? `All ${plural(r.loUsers, 'student')} online at once`
                  : `${fmt(r.loUsers)} to ${fmt(r.hiUsers)} students online at once`}
              </span>
              <p className="mt-1.5 leading-[1.75] text-[#2E2E2B]">
                {s.pattern === 'homework'
                  ? `The official sizing guide suggests starting from 40% to 60% of class size (${plural(s.students, 'student')}) as your concurrent user estimate.`
                  : 'In a live lab or timed exam where the whole class runs notebooks together, size for 100% of enrolled students.'}
              </p>
            </div>
          </div>

          <div className={ROW}>
            <div className={Q}>Minimum server RAM</div>
            <div className="min-w-0">
              <span className="flex items-center gap-2 text-base font-semibold tabular-nums">
                <Dot verdict={r.verdict} />
                {r.loGb === r.hiGb ? `About ${fmtGb(r.loGb)} of RAM` : `${fmtGb(r.loGb)} to ${fmtGb(r.hiGb)} of RAM`}
              </span>
              <p className="mt-1.5 leading-[1.75] text-[#2E2E2B]">
                Formula: <code>{r.loUsers === r.hiUsers ? fmt(r.loUsers) : `${fmt(r.loUsers)}–${fmt(r.hiUsers)}`} concurrent users × {s.ramPerUser} GB limit + 128 MB</code> for JupyterHub itself (minimum 1 GB of RAM to install). The software is free under BSD-3-Clause; you pay only for the Linux server.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--line)] px-[18px] py-3 text-[12.5px] text-[var(--sub)] sm:px-5">
          <span>Add headroom if students load large datasets without a hard per-user memory cap configured.</span>
          <button type="button" onClick={copy} className="rounded-lg border border-[#D9D9D5] bg-white px-3 py-[5px] text-[13px] text-[var(--ink)] transition-colors hover:border-[var(--ink)]">
            {copied ? 'Copied' : 'Copy result'}
          </button>
        </div>
      </div>

      <p className="mt-3 text-[12.5px] leading-[1.7] text-[var(--sub)]">
        How it’s calculated: memory = concurrent users × memory limit per user + 128 MB overhead, with at least 1 GB of RAM required to install. Source:{' '}
        <a href="https://tljh.jupyter.org/en/latest/howto/admin/resource-estimation.html" target="_blank" rel="noopener noreferrer" className={SOURCE_LINK}>The Little JupyterHub — Resource estimation</a> (checked 2026-10-09).
      </p>
    </section>
  );
};
