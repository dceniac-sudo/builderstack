'use client';

import React, { useState } from 'react';
import { Dot } from '@/components/OssParts';
import { cn } from '@/lib/utils';

// Chatwoot 详情页英文版的坐席与自托管/云服务账单估算器，放在五件事下面，地址带 #calculator。
// 2026-11-09 用户从三套静态预览里拍板版式 A（与 LiveKitCalculator 同构）。只在英文页显示。
// 价格与功能划分来自 https://www.chatwoot.com/pricing 与 https://www.chatwoot.com/pricing/self-hosted-plans（2026-11-09 复核），
// 服务器配置来自 https://developers.chatwoot.com/self-hosted，与 oss.ts 里 Chatwoot 的成本和注意事项一致。

type ChannelMode = 'basic' | 'all' | 'teams';
type PaidFeature = 'none' | 'premium' | 'enterprise';

interface Inputs {
  agents: number;
  convs: number;
  channel: ChannelMode;
  feature: PaidFeature;
}

const PRESETS: { id: string; label: string; inputs: Inputs }[] = [
  { id: 'free', label: '2 agents, live chat only', inputs: { agents: 2, convs: 400, channel: 'basic', feature: 'none' } },
  { id: 'roles', label: '6 agents, need roles & custom branding', inputs: { agents: 6, convs: 2000, channel: 'teams', feature: 'premium' } },
  { id: 'sso', label: '15 agents, need SSO / SAML & SLAs', inputs: { agents: 15, convs: 8000, channel: 'teams', feature: 'enterprise' } },
];

const NUMBER_FIELDS: { key: 'agents' | 'convs'; label: string; min: number; max: number }[] = [
  { key: 'agents', label: 'Support agents', min: 1, max: 500 },
  { key: 'convs', label: 'Conversations / month', min: 1, max: 500000 },
];

const fmt = (x: number) => x.toLocaleString('en-US', { maximumFractionDigits: 0 });
const usd = (x: number) => '$' + fmt(x);
const plural = (n: number, word: string) => `${fmt(n)} ${word}${n === 1 ? '' : 's'}`;

function estimate(s: Inputs) {
  const selfRate = s.feature === 'enterprise' ? 99 : s.feature === 'premium' ? 19 : 0;
  const selfTotal = s.agents * selfRate;
  const selfPlan = s.feature === 'enterprise' ? 'Self-hosted Enterprise' : s.feature === 'premium' ? 'Premium Support' : 'Community edition (-ce)';

  let cloudPlan: 'Hacker' | 'Startups' | 'Business' | 'Enterprise' = 'Hacker';
  let cloudRate = 0;
  if (s.feature === 'enterprise') {
    cloudPlan = 'Enterprise';
    cloudRate = 99;
  } else if (s.channel === 'teams' || s.feature === 'premium') {
    cloudPlan = 'Business';
    cloudRate = 39;
  } else if (s.agents > 2 || s.convs > 500 || s.channel === 'all') {
    cloudPlan = 'Startups';
    cloudRate = 19;
  }
  const cloudTotal = s.agents * cloudRate;

  return { selfRate, selfTotal, selfPlan, cloudPlan, cloudRate, cloudTotal };
}

const ROW = 'grid grid-cols-1 gap-x-8 gap-y-1.5 border-t border-[var(--line)] p-[18px] sm:grid-cols-[9rem_1fr] sm:p-5';
const CTL = 'grid grid-cols-1 items-center gap-x-8 gap-y-2 border-t border-[var(--line)] px-[18px] py-3 sm:grid-cols-[9rem_1fr] sm:px-5';
const Q = 'text-[13px] text-[var(--sub)] sm:pt-0.5';
const PILL = 'rounded-lg border px-[11px] py-1 text-[13.5px] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--ink)]';
const pill = (on: boolean) => cn(PILL, on ? 'border-[var(--ink)] bg-[var(--ink)] text-white' : 'border-[#D9D9D5] bg-white hover:border-[var(--ink)]');
const SOURCE_LINK = 'underline decoration-[#CFCFCA] underline-offset-[3px] transition-colors hover:text-[var(--ink)] hover:decoration-[var(--ink)]';

export const ChatwootCalculator: React.FC = () => {
  const [s, setS] = useState<Inputs>(PRESETS[0].inputs);
  const [draft, setDraft] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);
  const r = estimate(s);
  const set = (patch: Partial<Inputs>) => setS((prev) => ({ ...prev, ...patch }));

  const copy = () => {
    const line = `Chatwoot, ${plural(s.agents, 'agent')}, ${fmt(s.convs)} conversations/month: self-hosted ${r.selfPlan} = ${usd(r.selfTotal)}/month (+ Linux VM), Chatwoot Cloud ${r.cloudPlan} = ${usd(r.cloudTotal)}/month. https://dceniac.com/oss/chatwoot/#calculator`;
    navigator.clipboard?.writeText(line).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    });
  };

  return (
    <section id="calculator" className="mt-12 scroll-mt-24">
      <h2 className="text-[19px] font-semibold tracking-[-0.01em]">Estimate your bill</h2>
      <p className="mt-1 text-[var(--sub)]">Pick a scenario or enter your team size. Uses Chatwoot’s published self-hosted and Cloud prices.</p>

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
          <span className={Q}>Team size</span>
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
                      set({ [f.key]: Math.min(parsed, f.max) });
                    }
                  }}
                  onBlur={() => setDraft((d) => { const next = { ...d }; delete next[f.key]; return next; })}
                  className="w-full rounded-lg border border-[#D9D9D5] px-[9px] py-[5px] text-[14.5px] tabular-nums text-[var(--ink)] focus:outline focus:outline-2 focus:outline-offset-1 focus:outline-[var(--ink)] sm:w-[132px]"
                />
              </label>
            ))}
          </div>
        </div>

        <div className={CTL}>
          <span className={Q}>Channels &amp; routing</span>
          <div className="flex flex-wrap gap-1.5">
            {([
              ['basic', 'Live chat only'],
              ['all', 'Email, social & help center'],
              ['teams', '+ Teams & automation rules'],
            ] as [ChannelMode, string][]).map(([v, label]) => (
              <button key={v} type="button" aria-pressed={s.channel === v} onClick={() => set({ channel: v })} className={pill(s.channel === v)}>
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className={CTL}>
          <span className={Q}>Paid-only features</span>
          <div className="flex flex-wrap gap-1.5">
            {([
              ['none', 'None (Community features only)'],
              ['premium', 'Roles, custom branding, capacity or Captain AI'],
              ['enterprise', 'SSO / SAML or SLA policies'],
            ] as [PaidFeature, string][]).map(([v, label]) => (
              <button key={v} type="button" aria-pressed={s.feature === v} onClick={() => set({ feature: v })} className={pill(s.feature === v)}>
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-[var(--wash)]" aria-live="polite">
          <div className={ROW}>
            <div className={Q}>To self-host</div>
            <div className="min-w-0">
              <span className="flex items-center gap-2 text-base font-semibold tabular-nums">
                <Dot verdict={r.selfRate === 0 ? 'good' : 'caution'} />
                {r.selfRate === 0
                  ? 'Community edition (-ce) · $0 in license fees'
                  : `${r.selfPlan} · ${usd(r.selfTotal)} a month + your server`}
              </span>
              <p className="mt-1.5 leading-[1.75] text-[#2E2E2B]">
                {r.selfRate === 0 ? (
                  <>
                    Runs under MIT with the <code>-ce</code> Docker image. You provide a Linux server (stated minimum 2 cores, 4 GB RAM and 20 GB SSD; 4+ cores, 8+ GB RAM and 50+ GB SSD recommended for production) plus PostgreSQL 12+, Redis 6+ and your own SMTP server.
                  </>
                ) : r.selfRate === 19 ? (
                  <>
                    Roles and permissions, custom branding, agent capacity, Captain AI and voice calls are not in the free Community edition. Unlocking them on your own server costs <b className="tabular-nums">{plural(s.agents, 'agent')} × $19 = {usd(r.selfTotal)} a month</b>, plus your Linux server (4+ cores and 8+ GB RAM recommended for production), PostgreSQL 12+, Redis 6+ and SMTP.
                  </>
                ) : (
                  <>
                    SSO / SAML and SLA policies require the Enterprise license on your own server: <b className="tabular-nums">{plural(s.agents, 'agent')} × $99 = {usd(r.selfTotal)} a month</b>, plus your Linux server, PostgreSQL 12+, Redis 6+ and SMTP.
                  </>
                )}
              </p>
            </div>
          </div>

          <div className={ROW}>
            <div className={Q}>On Chatwoot Cloud</div>
            <div className="min-w-0">
              <span className="flex items-center gap-2 text-base font-semibold tabular-nums">
                <Dot verdict={r.cloudRate === 0 ? 'good' : 'caution'} />
                {r.cloudRate === 0
                  ? 'Free on the Hacker plan ($0 a month)'
                  : `${r.cloudPlan} plan · ${usd(r.cloudTotal)} a month (${plural(s.agents, 'agent')} × $${r.cloudRate})`}
              </span>
              <p className="mt-1.5 leading-[1.75] text-[#2E2E2B]">
                {r.cloudPlan === 'Hacker' && 'Fits within the Hacker plan’s 2-agent and 500-conversation monthly limits (live chat only, 30-day data retention).'}
                {r.cloudPlan === 'Startups' && 'Includes all channels (email, social and live chat), the help center, 300 Captain AI credits a month and 1-year data retention. Teams and automation rules require the Business plan ($39 per agent a month).'}
                {r.cloudPlan === 'Business' && `Includes all channels, teams, automation rules, voice, 500 Captain AI credits a month and 2-year data retention. (Startups is ${usd(s.agents * 19)} a month at $19 per agent, without teams or automation rules.)`}
                {r.cloudPlan === 'Enterprise' && 'Includes SSO / SAML, SLA policies, audit logs, 800 Captain AI credits a month and 3-year data retention.'}
              </p>
            </div>
          </div>

          <div className={ROW}>
            <div className={Q}>Which is cheaper?</div>
            <p className="min-w-0 leading-[1.75] text-[#2E2E2B]">
              {r.selfRate === 0 && r.cloudRate === 0 ? (
                'Both routes are $0 in software fees. Start on Chatwoot Cloud’s free Hacker plan unless you need more than 500 conversations a month, email/social channels or more than 30 days of history — in which case self-hosting the Community edition costs only your Linux VM.'
              ) : r.selfRate === 0 ? (
                <>
                  Chatwoot Cloud comes to <b className="tabular-nums">{usd(r.cloudTotal)}</b> a month on the {r.cloudPlan} plan. Because you do not need features locked in the <code>enterprise/</code> directory (roles, custom branding, agent capacity, SSO or SLAs), self-hosting the MIT Community edition (<code>-ce</code>) is <b>$0 in license fees</b> — cheaper as long as a 4 GB to 8 GB Linux server, SMTP and your own ops time cost less than {usd(r.cloudTotal)} a month.
                </>
              ) : r.selfRate === 19 ? (
                <>
                  Once you need roles and permissions, custom branding, agent capacity or Captain AI, self-hosting is no longer free: Premium Support costs <b className="tabular-nums">{usd(r.selfTotal)}</b> a month ($19 per agent) on top of your own server. Chatwoot Cloud Startups is the same <b className="tabular-nums">{usd(s.agents * 19)}</b> a month with hosting included, while Cloud Business (with teams and automation rules) is <b className="tabular-nums">{usd(s.agents * 39)}</b> a month.
                </>
              ) : (
                <>
                  Both self-hosted Enterprise and Chatwoot Cloud Enterprise list at <b className="tabular-nums">{usd(r.selfTotal)}</b> a month ($99 per agent) once you require SSO / SAML or SLA policies. Choose self-hosting here for infrastructure control rather than software savings.
                </>
              )}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--line)] px-[18px] py-3 text-[12.5px] text-[var(--sub)] sm:px-5">
          <span>Self-hosted server cost is not fixed: compare Cloud against what you pay your own VM and SMTP provider.</span>
          <button type="button" onClick={copy} className="rounded-lg border border-[#D9D9D5] bg-white px-3 py-[5px] text-[13px] text-[var(--ink)] transition-colors hover:border-[var(--ink)]">
            {copied ? 'Copied' : 'Copy result'}
          </button>
        </div>
      </div>

      <p className="mt-3 text-[12.5px] leading-[1.7] text-[var(--sub)]">
        How it’s calculated: the self-hosted Community edition (<code>-ce</code> Docker tag) is free under MIT for any number of agents, but excludes the <code>enterprise/</code> directory (Captain AI, voice calls, custom branding, agent capacity, roles &amp; permissions, SSO / SAML and SLA policies). Adding roles, custom branding, capacity or Captain AI on your own server requires Premium Support ($19 per agent a month); SSO / SAML and SLAs require Enterprise ($99 per agent a month). On Chatwoot Cloud, Hacker is free up to 2 agents and 500 conversations a month (live chat only); Startups is $19 per agent a month; Business is $39 per agent a month; Enterprise is $99 per agent a month. Sources:{' '}
        <a href="https://www.chatwoot.com/pricing/self-hosted-plans" target="_blank" rel="noopener noreferrer" className={SOURCE_LINK}>Self-hosted plans</a> ·{' '}
        <a href="https://www.chatwoot.com/pricing" target="_blank" rel="noopener noreferrer" className={SOURCE_LINK}>Cloud pricing</a> ·{' '}
        <a href="https://developers.chatwoot.com/self-hosted" target="_blank" rel="noopener noreferrer" className={SOURCE_LINK}>Self-hosted overview</a> (checked 2026-11-09).
      </p>
    </section>
  );
};
