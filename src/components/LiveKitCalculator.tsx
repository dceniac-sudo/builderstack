'use client';

import React, { useState } from 'react';
import { Dot } from '@/components/OssParts';
import { cn } from '@/lib/utils';

// LiveKit 详情页英文版的带宽和账单估算器，放在五件事下面，地址带 #calculator（发 Show HN、Reddit 时直接链到这里）。
// 2026-11-04 用户看过三个静态版式后定了这一版：紧凑表格 + 三个预设场景 + 一句“哪个更划算”。只在英文页显示。
// 价格来自 https://livekit.com/pricing（2026-11-04 核对），Egress 的规格来自官方自托管文档，和 oss.ts 里 LiveKit 的成本一项一致；
// 那边的价格改了，这里要一起改。码率是按最坏情况估的（不开 simulcast、每人收所有人），不是官方数字，页面上写明了。
// 自建一侧不放流量单价：各家云厂商不一样，给不出有出处的数，所以用 Cloud 的价格当门槛来比。

type Mode = 'meeting' | 'webinar';
type Quality = '1080' | '720' | 'audio';
interface Inputs {
  mode: Mode;
  q: Quality;
  n: number;
  rooms: number;
  hours: number;
  rec: number;
}

const RATE: Record<Quality, number> = { '1080': 3, '720': 1.5, audio: 0.06 }; // 每路 Mbps
const QUALITY_LABEL: Record<Quality, string> = { '1080': '1080p', '720': '720p', audio: 'Audio only' };

interface Tier {
  name: string;
  base: number;
  min: number;
  gb: number;
  tc: number;
  conc: number;
  maxRec: number;            // 同时导出 / 录制上限（Concurrent exports）
  minRate?: number;
  gbRate?: number;
  tcVideoRate?: number;      // 视频转码超额单价
  tcAudioRate?: number;      // 纯音频转码超额单价
  free?: boolean;
}
const TIERS: Tier[] = [
  { name: 'Build', base: 0, min: 5000, gb: 50, tc: 60, conc: 100, maxRec: 2, free: true },
  { name: 'Ship', base: 50, min: 150000, minRate: 0.0005, gb: 250, gbRate: 0.12, tc: 600, tcVideoRate: 0.02, tcAudioRate: 0.005, conc: 1000, maxRec: 100 },
  { name: 'Scale', base: 500, min: 1500000, minRate: 0.0004, gb: 3000, gbRate: 0.1, tc: 8000, tcVideoRate: 0.015, tcAudioRate: 0.004, conc: 5000, maxRec: 500 },
];
const PIPES = [10, 100, 1000];

const PRESETS: { id: string; label: string; inputs: Inputs }[] = [
  { id: 'call', label: '3-person 1080p call on a 10 Mbps VM', inputs: { mode: 'meeting', q: '1080', n: 3, rooms: 1, hours: 40, rec: 0 } },
  { id: 'class', label: '20-student class, one host, recorded', inputs: { mode: 'webinar', q: '720', n: 20, rooms: 1, hours: 60, rec: 1 } },
  { id: 'sale', label: '100 viewers on a live sale', inputs: { mode: 'webinar', q: '1080', n: 100, rooms: 1, hours: 30, rec: 0 } },
];

const NUMBER_FIELDS: { key: 'n' | 'rooms' | 'hours' | 'rec'; label: string; min: number; max: number }[] = [
  { key: 'n', label: 'People per room', min: 2, max: 1000 },
  { key: 'rooms', label: 'Rooms at once', min: 1, max: 500 },
  { key: 'hours', label: 'Hours / room / month', min: 1, max: 744 },
  { key: 'rec', label: 'Rooms recorded at once', min: 0, max: 500 },
];

const fmt = (x: number, d = 0) => x.toLocaleString('en-US', { maximumFractionDigits: d, minimumFractionDigits: d });
const fmtGb = (x: number) => fmt(x, x < 1 && x % 1 ? 2 : x % 1 ? 1 : 0);
const usd = (x: number) => '$' + (Math.round(x * 100) % 100 ? fmt(x, 2) : fmt(x));
const mbps = (x: number) => (x >= 1000 ? `${fmt(x / 1000, 2)} Gbps` : `${fmt(x, x < 10 ? 2 : 1)} Mbps`);
const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? '' : 's'}`;

function estimate(s: Inputs) {
  const b = RATE[s.q];
  const perRoom = s.mode === 'meeting' ? s.n * (s.n - 1) * b : (s.n - 1) * b;
  const peak = perRoom * s.rooms;
  const rawGb = (s.rooms * s.hours * perRoom * 3600) / 8 / 1000;
  // 先把流量按页面显示的粒度取整再算超额，避免页面上出现“520 GB × $0.12 = $62.34”这种乘法对不上的情况
  const gb = rawGb < 1 ? Math.round(rawGb * 100) / 100 : rawGb < 10 ? Math.round(rawGb * 10) / 10 : Math.round(rawGb);
  const mins = s.rooms * s.n * s.hours * 60;
  const tc = s.rec * s.hours * 60;
  const conc = s.rooms * s.n;
  const bills = TIERS.flatMap((t) => {
    if (conc > t.conc || s.rec > t.maxRec) return [];
    if (t.free) return mins <= t.min && gb <= t.gb && tc <= t.tc ? [{ tier: t, total: 0, overage: [] as string[] }] : [];
    const overage: string[] = [];
    let total = t.base;
    if (mins > t.min && t.minRate) {
      const extra = mins - t.min;
      overage.push(`${fmt(extra)} extra participant minutes × $${t.minRate} = ${usd(extra * t.minRate)}`);
      total += extra * t.minRate;
    }
    if (gb > t.gb && t.gbRate) {
      const extra = Math.round((gb - t.gb) * 100) / 100;
      overage.push(`${fmtGb(extra)} GB extra transfer × $${t.gbRate} = ${usd(extra * t.gbRate)}`);
      total += extra * t.gbRate;
    }
    const tcRate = s.q === 'audio' ? t.tcAudioRate : t.tcVideoRate;
    if (tc > t.tc && tcRate) {
      const extra = tc - t.tc;
      overage.push(`${fmt(extra)} extra ${s.q === 'audio' ? 'audio ' : ''}transcode minutes × $${tcRate} = ${usd(extra * tcRate)}`);
      total += extra * tcRate;
    }
    return [{ tier: t, total, overage }];
  });
  const best = bills.length ? bills.reduce((a, c) => (c.total < a.total ? c : a)) : null;
  return { peak, gb, mins, tc, conc, best };
}

// 一条上行带宽够不够；不够时说清楚第几个人进来会卡
function pipeFit(s: Inputs, peak: number, pipe: number) {
  const used = peak / pipe;
  const verdict = used < 0.7 ? 'good' : used < 1 ? 'caution' : 'bad';
  let text = verdict === 'good' ? 'enough' : verdict === 'caution' ? `tight (${Math.round(used * 100)}% used)` : 'not enough';
  if (verdict === 'bad') {
    const b = RATE[s.q];
    const cap = pipe / s.rooms;
    const per = s.rooms > 1 ? ' per room' : '';
    if (s.mode === 'meeting') {
      const max = Math.floor((1 + Math.sqrt(1 + (4 * cap) / b)) / 2);
      text += max < 2 ? ` — even 2 people stall${per}` : ` — stalls when person #${max + 1} joins${per}`;
    } else {
      text += ` — fits about ${fmt(Math.floor(cap / b))} viewers${per}`;
    }
  }
  return { verdict: verdict as 'good' | 'caution' | 'bad', label: `${pipe >= 1000 ? '1 Gbps' : `${pipe} Mbps`} uplink: ${text}` };
}

const ROW = 'grid grid-cols-1 gap-x-8 gap-y-1.5 border-t border-[var(--line)] p-[18px] sm:grid-cols-[9rem_1fr] sm:p-5';
const CTL = 'grid grid-cols-1 items-center gap-x-8 gap-y-2 border-t border-[var(--line)] px-[18px] py-3 sm:grid-cols-[9rem_1fr] sm:px-5';
const Q = 'text-[13px] text-[var(--sub)] sm:pt-0.5';
const PILL = 'rounded-lg border px-[11px] py-1 text-[13.5px] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--ink)]';
const pill = (on: boolean) => cn(PILL, on ? 'border-[var(--ink)] bg-[var(--ink)] text-white' : 'border-[#D9D9D5] bg-white hover:border-[var(--ink)]');
const SOURCE_LINK = 'underline decoration-[#CFCFCA] underline-offset-[3px] transition-colors hover:text-[var(--ink)] hover:decoration-[var(--ink)]';

export const LiveKitCalculator: React.FC = () => {
  const [s, setS] = useState<Inputs>(PRESETS[0].inputs);
  const [draft, setDraft] = useState<Record<string, string>>({});   // 输入框里正在打的字，打到一半（比如清空）时不立刻改算式
  const [copied, setCopied] = useState(false);
  const r = estimate(s);
  const set = (patch: Partial<Inputs>) => setS((prev) => ({ ...prev, ...patch }));
  const egress = s.rec > 0 ? plural(s.rec, 'Egress instance') : '';

  const copy = () => {
    const line = `LiveKit, ${s.n} people/room × ${plural(s.rooms, 'room')}, ${s.mode === 'meeting' ? 'everyone on camera' : 'one host'}, ${QUALITY_LABEL[s.q]}: peak ${mbps(r.peak)} outbound, ${fmtGb(r.gb)} GB/month, LiveKit Cloud ≈ ${r.best ? `${usd(r.best.total)}/month` : 'Enterprise quote'}. https://dceniac.com/oss/livekit/#calculator`;
    navigator.clipboard?.writeText(line).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    });
  };

  return (
    <section id="calculator" className="mt-12 scroll-mt-24">
      <h2 className="text-[19px] font-semibold tracking-[-0.01em]">Estimate your bill</h2>
      <p className="mt-1 text-[var(--sub)]">Pick a scenario or enter your own numbers. Uses LiveKit’s published Cloud prices and self-hosting docs.</p>

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
                onClick={() => { setS(p.inputs); setDraft({}); }}
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
          <span className={Q}>Room type</span>
          <div className="flex flex-wrap gap-1.5">
            {([['meeting', 'Everyone on camera'], ['webinar', 'One host, others watch']] as [Mode, string][]).map(([v, label]) => (
              <button key={v} type="button" aria-pressed={s.mode === v} onClick={() => set({ mode: v })} className={pill(s.mode === v)}>{label}</button>
            ))}
          </div>
        </div>
        <div className={CTL}>
          <span className={Q}>Video quality</span>
          <div className="flex flex-wrap gap-1.5">
            {(['1080', '720', 'audio'] as Quality[]).map((v) => (
              <button key={v} type="button" aria-pressed={s.q === v} onClick={() => set({ q: v })} className={pill(s.q === v)}>{QUALITY_LABEL[v]}</button>
            ))}
          </div>
        </div>
        <div className={CTL}>
          <span className={Q}>Usage</span>
          <div className="grid grid-cols-2 gap-x-4 gap-y-3 sm:flex sm:flex-wrap sm:gap-x-[18px]">
            {NUMBER_FIELDS.map((f) => (
              <label key={f.key} className="flex flex-col gap-[3px] text-xs text-[var(--sub)]">
                {f.label}
                <input
                  type="number"
                  inputMode="numeric"
                  min={f.min}
                  max={f.max}
                  value={draft[f.key] ?? String(s[f.key])}
                  onChange={(e) => {
                    const raw = e.target.value;
                    setDraft((d) => ({ ...d, [f.key]: raw }));
                    const parsed = Math.floor(Number(raw));
                    if (raw !== '' && Number.isFinite(parsed) && parsed >= f.min) {
                      const v = Math.min(parsed, f.max);
                      setS((prev) => {
                        if (f.key === 'rooms' && prev.rec > v) {
                          setDraft((d) => { const next = { ...d }; delete next.rec; return next; });
                          return { ...prev, rooms: v, rec: v };
                        }
                        if (f.key === 'rec' && v > prev.rooms) {
                          setDraft((d) => { const next = { ...d }; delete next.rooms; return next; });
                          return { ...prev, rec: v, rooms: v };
                        }
                        return { ...prev, [f.key]: v };
                      });
                    }
                  }}
                  onBlur={() => setDraft((d) => { const next = { ...d }; delete next[f.key]; return next; })}
                  className="w-full rounded-lg border border-[#D9D9D5] px-[9px] py-[5px] text-[14.5px] tabular-nums text-[var(--ink)] focus:outline focus:outline-2 focus:outline-offset-1 focus:outline-[var(--ink)] sm:w-[108px]"
                />
              </label>
            ))}
          </div>
        </div>

        <div className="bg-[var(--wash)]" aria-live="polite">
          <div className={ROW}>
            <div className={Q}>Peak outbound bandwidth</div>
            <div className="min-w-0">
              <span className="text-base font-semibold tabular-nums">{mbps(r.peak)}</span>
              <ul className="mt-2 space-y-0.5 text-sm">
                {PIPES.map((pipe) => {
                  const f = pipeFit(s, r.peak, pipe);
                  return (
                    <li key={pipe} className="flex items-center gap-2">
                      <Dot verdict={f.verdict} />
                      {f.label}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <div className={ROW}>
            <div className={Q}>To self-host</div>
            <div className="min-w-0">
              <span className="flex items-center gap-2 text-base font-semibold">
                <Dot verdict={s.rec > 0 ? 'caution' : 'good'} />
                LiveKit Server + Redis{egress && ` + ${egress}`}
              </span>
              <p className="mt-1.5 leading-[1.75] text-[#2E2E2B]">
                About <b className="tabular-nums">{fmtGb(r.gb)} GB</b> of outbound transfer a month.{' '}
                {s.rec > 0
                  ? `Each recorded room needs its own Egress instance (at least 4 CPUs and 4 GB; a full-room recording uses 2 to 6 CPUs), so recording ${plural(s.rec, 'room')} at once takes ${plural(s.rec, 'instance')}.`
                  : 'No recording, so no Egress needed.'}
              </p>
            </div>
          </div>

          <div className={ROW}>
            <div className={Q}>On LiveKit Cloud</div>
            <div className="min-w-0">
              {r.best ? (
                <>
                  <span className="flex items-center gap-2 text-base font-semibold">
                    <Dot verdict={r.best.total === 0 ? 'good' : 'caution'} />
                    {r.best.total === 0 ? 'Free on the Build plan' : `${r.best.tier.name} plan · about ${usd(r.best.total)} a month`}
                  </span>
                  <p className="mt-1.5 leading-[1.75] text-[#2E2E2B]">
                    {fmt(r.mins)} participant minutes, {fmtGb(r.gb)} GB downstream transfer{r.tc > 0 && `, ${fmt(r.tc)} transcode minutes`}, {fmt(r.conc)} concurrent connections.
                    {r.best.total > 0 && ` ${r.best.tier.name} base: ${usd(r.best.tier.base)}.`}
                    {r.best.overage.length > 0 && ` Overage: ${r.best.overage.join('; ')}.`}
                  </p>
                </>
              ) : (
                <>
                  <span className="flex items-center gap-2 text-base font-semibold">
                    <Dot verdict="bad" />
                    {r.conc > 5000 && s.rec > 500
                      ? 'Above the Scale plan’s 5,000 concurrent connections and 500 concurrent recordings'
                      : r.conc > 5000
                        ? 'Above the Scale plan’s 5,000 concurrent connections'
                        : 'Above the Scale plan’s 500 concurrent recordings'}
                  </span>
                  <p className="mt-1.5 leading-[1.75] text-[#2E2E2B]">You would need a custom Enterprise quote from LiveKit.</p>
                </>
              )}
            </div>
          </div>

          <div className={ROW}>
            <div className={Q}>Which is cheaper?</div>
            <p className="min-w-0 leading-[1.75] text-[#2E2E2B]">
              {!r.best
                ? 'At this scale both routes need a conversation: an Enterprise quote from LiveKit, or a multi-node self-hosted cluster.'
                : r.best.total === 0
                  ? 'This usage fits LiveKit Cloud’s free plan. Start there; self-hosting only adds servers and ops work.'
                  : (
                    <>
                      LiveKit Cloud comes to about <b className="tabular-nums">{usd(r.best.total)}</b> a month. Self-hosting is cheaper only if your
                      {s.rec > 0 ? ` servers, ${egress}` : ' server'}, {fmtGb(r.gb)} GB of bandwidth and your own ops time cost less than that.
                    </>
                  )}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--line)] px-[18px] py-3 text-[12.5px] text-[var(--sub)] sm:px-5">
          <span>Worst case: simulcast off, everyone receives everyone. Real usage is usually lower.</span>
          <button type="button" onClick={copy} className="rounded-lg border border-[#D9D9D5] bg-white px-3 py-[5px] text-[13px] text-[var(--ink)] transition-colors hover:border-[var(--ink)]">
            {copied ? 'Copied' : 'Copy result'}
          </button>
        </div>
      </div>

      <p className="mt-3 text-[12.5px] leading-[1.7] text-[var(--sub)]">
        How it’s calculated: server outbound = people × (people − 1) × bitrate for an everyone-on-camera room, (people − 1) × bitrate with one host. Bitrates
        assumed: 1080p 3 Mbps, 720p 1.5 Mbps, audio 0.06 Mbps. Cloud usage is billed as participant minutes, downstream transfer (GB) and transcode minutes, the
        same units as your LiveKit dashboard. Sources:{' '}
        <a href="https://livekit.com/pricing" target="_blank" rel="noopener noreferrer" className={SOURCE_LINK}>LiveKit Cloud pricing</a> (checked 2026-11-04) ·{' '}
        <a href="https://docs.livekit.io/transport/self-hosting/egress/" target="_blank" rel="noopener noreferrer" className={SOURCE_LINK}>Self-hosting Egress</a> ·{' '}
        <a href="https://docs.livekit.io/transport/self-hosting/benchmark/" target="_blank" rel="noopener noreferrer" className={SOURCE_LINK}>Benchmarks</a>.
      </p>
    </section>
  );
};
