import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { registerHooks } from 'node:module';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath, pathToFileURL } from 'node:url';

const SRC_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../src');

registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier.startsWith('@/')) {
      const base = path.join(SRC_DIR, specifier.slice(2));
      for (const ext of ['.ts', '.tsx', '/index.ts', '/index.tsx']) {
        if (existsSync(base + ext)) {
          return nextResolve(pathToFileURL(base + ext).href, context);
        }
      }
    }
    return nextResolve(specifier, context);
  },
});

const { evaluateVsCalculator, ossVsComparison } = await import('@/data/oss-vs');
const { ossProject } = await import('@/data/oss');
const { ossExtras } = await import('@/data/oss-extras');

const CJK_RE = /[\u4e00-\u9fff]/;

function assertNoCjk(value: unknown, label: string): void {
  const text = typeof value === 'string' ? value : JSON.stringify(value);
  assert.equal(CJK_RE.test(text), false, `${label} unexpectedly contained CJK characters: ${text}`);
}

test('BS-01: Appsmith vs Retool separates Audit Logs (Business) from Granular Custom Roles (Enterprise)', () => {
  for (const lang of ['en', 'zh'] as const) {
    const view = ossVsComparison('appsmith-vs-retool', lang);
    assert.ok(view, 'appsmith-vs-retool comparison must exist');
    assert.equal(view.checkedAt, '2026-11-17');

    const toggleKeys = view.calc.toggles.map((t) => t.key);
    assert.deepEqual(toggleKeys, ['auditLogs', 'customRoles', 'sso', 'selfhost']);
    assert.equal(view.calc.presets.find((p) => p.id === 'audit40')?.toggles.auditLogs, true);
    assert.equal(view.calc.presets.find((p) => p.id === 'audit40')?.toggles.customRoles, false);

    // 1) Audit Logs ON, Custom Roles OFF, SSO OFF -> Retool Business annual rate ($550/mo at 25 staff)
    const auditOnly = evaluateVsCalculator('appsmith-vs-retool', 25, { auditLogs: true, customRoles: false, sso: false, selfhost: true }, lang);
    const rtAudit = auditOnly.bars.find((b) => b.id === 'rt')!;
    assert.ok(rtAudit.costLabel.includes('$550'), `${lang} auditOnly costLabel should compute $550: ${rtAudit.costLabel}`);
    assert.ok(/annual|年付|按年/i.test(rtAudit.costLabel), `${lang} auditOnly must state annual basis`);

    // 2) Custom Roles ON, SSO OFF -> Appsmith Business vs Retool Enterprise custom quote
    const customOnly = evaluateVsCalculator('appsmith-vs-retool', 25, { auditLogs: false, customRoles: true, sso: false, selfhost: true }, lang);
    const asCustom = customOnly.bars.find((b) => b.id === 'as')!;
    const rtCustom = customOnly.bars.find((b) => b.id === 'rt')!;
    const expectedQuote = lang === 'zh' ? 'Enterprise 另行报价' : 'Enterprise (Custom quote)';
    assert.ok(asCustom.costLabel.includes('$415'), `Appsmith should stay on $415 Business: ${asCustom.costLabel}`);
    assert.equal(rtCustom.costLabel, expectedQuote);
    assert.ok(customOnly.deltaText.includes(expectedQuote), `deltaText missing ${expectedQuote}: ${customOnly.deltaText}`);
    assert.ok(customOnly.copyText.includes(expectedQuote), `copyText missing ${expectedQuote}: ${customOnly.copyText}`);

    // 3) SSO ON -> Retool Enterprise custom quote (no fabricated ~$2,500 floor)
    const ssoRes = evaluateVsCalculator('appsmith-vs-retool', 80, { auditLogs: true, customRoles: true, sso: true, selfhost: true }, lang);
    const rtSso = ssoRes.bars.find((b) => b.id === 'rt')!;
    assert.equal(rtSso.costLabel, expectedQuote);
    assert.ok(ssoRes.deltaText.includes(expectedQuote));
    assert.ok(ssoRes.copyText.includes(expectedQuote));
    assert.equal(/\$(2,000|2000)\/mo\+/.test(rtSso.costLabel), false);

    if (lang === 'en') {
      assertNoCjk(view, 'appsmith-vs-retool EN view');
      assertNoCjk(auditOnly, 'appsmith-vs-retool auditOnly EN calc');
      assertNoCjk(customOnly, 'appsmith-vs-retool customOnly EN calc');
      assertNoCjk(ssoRes, 'appsmith-vs-retool ssoRes EN calc');
    }
  }
});

test('BS-01: Appsmith paid seat limits apply to cloud and self-hosted custom roles', () => {
  for (const lang of ['en', 'zh'] as const) {
    const comparison = ossVsComparison('appsmith-vs-retool', lang)!;
    assert.equal(comparison.calc.step, 1, 'The slider must let users select the 99-seat Business limit');
    for (const selfhost of [false, true]) {
      const at99 = evaluateVsCalculator('appsmith-vs-retool', 99, { customRoles: true, selfhost }, lang);
      const at100 = evaluateVsCalculator('appsmith-vs-retool', 100, { customRoles: true, selfhost }, lang);
      const price99 = selfhost ? '$1,525' : '$1,485';
      assert.ok(at99.bars[0].costLabel.includes(price99));
      assert.ok(at100.bars[0].costLabel.includes(selfhost ? '$2,540' : '$2,500'));
      for (const output of [at100.bars[0].planBadge, at100.deltaText, at100.copyText]) {
        assert.match(output, /Enterprise.*\$2,500/);
        assert.doesNotMatch(output, /\$1,5(?:00|40)/);
      }
    }
    const cloud = evaluateVsCalculator('appsmith-vs-retool', 100, { selfhost: false }, lang);
    assert.match(cloud.bars[0].planBadge, /Enterprise/);
    const community = evaluateVsCalculator('appsmith-vs-retool', 100, { selfhost: true }, lang);
    assert.match(community.bars[0].planBadge, /CE/);
    assert.match(community.bars[0].costLabel, /\$40/);
  }
});

test('BS-02: n8n places External Secrets, log streaming and multi-main HA on Enterprise (not Business)', () => {
  const enView = ossVsComparison('n8n-vs-activepieces', 'en')!;
  const zhView = ossVsComparison('n8n-vs-activepieces', 'zh')!;
  assert.equal(enView.checkedAt, '2026-11-17');
  assert.equal(zhView.checkedAt, '2026-11-17');

  const enSecretRow = enView.matrix.find((r) => /External Secrets/i.test(r.dimension))!;
  const zhSecretRow = zhView.matrix.find((r) => /外部密钥/.test(r.dimension))!;
  assert.ok(enSecretRow, 'EN External Secrets row must exist');
  assert.ok(zhSecretRow, 'ZH 外部密钥 row must exist');
  assert.ok(/External secrets.*Enterprise/i.test(enSecretRow.leftHeadline));
  assert.ok(/Enterprise \(contact sales\)/i.test(enSecretRow.leftDetail));
  assert.ok(/外部密钥.*Enterprise/.test(zhSecretRow.leftDetail));
  assertNoCjk(enView, 'n8n-vs-activepieces EN view');

  const n8n = ossProject('n8n')!;
  assert.equal(n8n.checkedAt, '2026-11-17');
  assert.ok(/SSO.*Business/i.test(n8n.facts.caveats.detailEn));
  assert.ok(/external secrets.*Enterprise-only/i.test(n8n.facts.caveats.detailEn));
  assert.ok(/外部密钥库.*Enterprise 企业版/.test(n8n.facts.caveats.detail));
  assertNoCjk({ ...n8n.facts.caveats, detail: '', label: '', sources: n8n.facts.caveats.sources.map((s) => s.labelEn) }, 'n8n EN caveats');
});

test('BS-03: n8n vs Activepieces calculator keeps chart, verdict and copyText 100% consistent across all modes', () => {
  for (const lang of ['en', 'zh'] as const) {
    const view = ossVsComparison('n8n-vs-activepieces', lang)!;
    assert.deepEqual(view.calc.toggles.map((t) => t.key), ['sharing', 'selfhost', 'highExec']);

    // Case A: 5 users on Cloud, standard volume -> n8n Starter €20 (~$22) vs Activepieces Plus $20
    const cloud5 = evaluateVsCalculator('n8n-vs-activepieces', 5, { sharing: false, selfhost: false, highExec: false }, lang);
    const n8nCloud5 = cloud5.bars.find((b) => b.id === 'n8n')!;
    const apCloud5 = cloud5.bars.find((b) => b.id === 'ap')!;
    assert.ok(n8nCloud5.planBadge.includes('Starter') && n8nCloud5.planBadge.includes('€20'));
    assert.ok(apCloud5.planBadge.includes('Plus') && apCloud5.planBadge.includes('$20'));
    assert.ok(cloud5.deltaText.includes('Starter') && cloud5.deltaText.includes('Plus'));
    assert.ok(cloud5.copyText.includes('Starter') && cloud5.copyText.includes('Plus'));

    // Case B: High execution toggle bumps Cloud to Pro (€50)
    const cloud5High = evaluateVsCalculator('n8n-vs-activepieces', 5, { sharing: false, selfhost: false, highExec: true }, lang);
    const n8nHigh = cloud5High.bars.find((b) => b.id === 'n8n')!;
    assert.ok(n8nHigh.planBadge.includes('Pro') && n8nHigh.planBadge.includes('€50'));
    assert.ok(cloud5High.deltaText.includes('Pro'));
    assert.ok(cloud5High.copyText.includes('Pro'));

    // Case C: 26 users (>25 cap) -> Custom ($200+/mo) across bar, deltaText, and copyText (never exact $200/mo)
    const over25 = evaluateVsCalculator('n8n-vs-activepieces', 26, { sharing: true, selfhost: false, highExec: true }, lang);
    const ap26 = over25.bars.find((b) => b.id === 'ap')!;
    const customToken = lang === 'zh' ? 'Custom ($200+/月)' : 'Custom ($200+/mo)';
    assert.equal(ap26.costLabel, customToken);
    assert.ok(over25.deltaText.includes(customToken), `${lang} deltaText missing ${customToken}: ${over25.deltaText}`);
    assert.ok(over25.copyText.includes('Custom ($200+/'), `${lang} copyText missing Custom ($200+/: ${over25.copyText}`);
    assert.equal(/Activepieces \$200\/mo/.test(over25.copyText), false, `copyText must not say exact Activepieces $200/mo: ${over25.copyText}`);

    if (lang === 'en') {
      assertNoCjk(cloud5, 'n8n-vs-ap cloud5 EN');
      assertNoCjk(cloud5High, 'n8n-vs-ap cloud5High EN');
      assertNoCjk(over25, 'n8n-vs-ap over25 EN');
    }
  }
});

test('BS-03: cloud SSO uses an Enterprise quote and preserves Starter and Pro project allowances', () => {
  for (const lang of ['en', 'zh'] as const) {
    const preset = ossVsComparison('n8n-vs-activepieces', lang)!.calc.presets.find((entry) => entry.id === 'scale25')!;
    const cloudSso = evaluateVsCalculator('n8n-vs-activepieces', preset.sliderValue, preset.toggles, lang);
    const [n8n, activepieces] = cloudSso.bars;
    const quote = lang === 'zh' ? 'Cloud Enterprise（询价）' : 'Cloud Enterprise (custom quote)';
    assert.equal(n8n.planBadge, quote);
    assert.equal(n8n.costLabel, quote);
    assert.equal(n8n.percent, 0);
    assert.match(activepieces.planBadge, /^Team/);
    for (const output of [cloudSso.deltaText, cloudSso.copyText]) {
      assert.ok(output.includes(quote));
      assert.doesNotMatch(output, /€667|\$720|\$744|saves|节省/);
    }

    const business = evaluateVsCalculator('n8n-vs-activepieces', 25, { sharing: true, selfhost: true }, lang);
    assert.match(business.bars[0].planBadge, /Business/);
    assert.match(business.bars[0].costLabel, /\$744/);
    assert.match(business.bars[1].costLabel, /\$224/);
    assert.match(business.deltaText, /\$520/);
    assert.match(business.copyText, /\$224/);
    const starter = evaluateVsCalculator('n8n-vs-activepieces', 5, { selfhost: false }, lang);
    const pro = evaluateVsCalculator('n8n-vs-activepieces', 5, { selfhost: false, highExec: true }, lang);
    assert.match(starter.bars[0].note, /1 shared project|1 个共享项目/);
    assert.match(pro.bars[0].note, /3 shared projects|3 个共享项目/);
  }
});

test('BS-04: Canvas LMS distinguishes default master branch (2026-04-30) from repo push activity (2026-11-10)', () => {
  const canvas = ossProject('canvas-lms')!;
  assert.equal(canvas.checkedAt, '2026-11-17');
  assert.equal(canvas.facts.alive.verdict, 'caution');
  assert.equal(canvas.facts.alive.short, '主分支放缓');
  assert.equal(canvas.facts.alive.shortEn, 'Master slowed');

  for (const field of [canvas.facts.alive.detail, canvas.facts.alive.detailEn, canvas.facts.caveats.detail, canvas.facts.caveats.detailEn]) {
    assert.ok(field.includes('2026-04-30'), `Missing 2026-04-30 master date in: ${field}`);
    assert.ok(field.includes('2026-11-10'), `Missing 2026-11-10 pushed_at date in: ${field}`);
  }
  assert.ok(canvas.facts.alive.sources.some((s) => s.url.includes('/commits/master')));
  assert.ok(canvas.facts.alive.sources.some((s) => s.url.includes('api.github.com/repos/instructure/canvas-lms')));

  const moodleExtras = ossExtras('moodle');
  const vsCanvas = moodleExtras.comparisons?.find((c) => c.otherId === 'canvas-lms')!;
  const canvasExtras = ossExtras('canvas-lms');
  assert.ok(vsCanvas.pickOther.includes('2026-04-30') && vsCanvas.pickOther.includes('2026-11-10'));
  assert.ok(vsCanvas.pickOtherEn.includes('2026-04-30') && vsCanvas.pickOtherEn.includes('2026-11-10'));
  assert.ok(canvasExtras.fit!.lookElsewhereIf.includes('2026-04-30') && canvasExtras.fit!.lookElsewhereIf.includes('2026-11-10'));
  assert.ok(canvasExtras.fit!.lookElsewhereIfEn.includes('2026-04-30') && canvasExtras.fit!.lookElsewhereIfEn.includes('2026-11-10'));

  const combined = JSON.stringify({ canvas, moodleExtras, canvasExtras });
  for (const banned of ['no pushes since late April 2026', '2026 年 4 月底之后没有新的推送', '公开仓库自 2026 年 4 月底起没有新推送', '仓库从 2026 年 4 月底起没有新的推送']) {
    assert.equal(combined.includes(banned), false, `Found stale un-scoped wording: ${banned}`);
  }

  assertNoCjk(
    {
      aliveEn: canvas.facts.alive.detailEn,
      caveatsEn: canvas.facts.caveats.detailEn,
      pickOtherEn: vsCanvas.pickOtherEn,
      lookElsewhereIfEn: canvasExtras.fit!.lookElsewhereIfEn,
    },
    'Canvas LMS EN fields',
  );
});
