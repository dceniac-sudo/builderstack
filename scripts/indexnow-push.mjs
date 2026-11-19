#!/usr/bin/env node
/**
 * Bing / IndexNow post-deploy URL submission helper for BuilderStack (dceniac.com).
 *
 * Usage (run ONLY after Cloudflare Pages deployment finishes):
 *   node scripts/indexnow-push.mjs --dry-run
 *   node scripts/indexnow-push.mjs
 *   node scripts/indexnow-push.mjs /oss/n8n/ /oss/vs/n8n-vs-activepieces/
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SITE_HOST = 'dceniac.com';
const SITE_ORIGIN = `https://${SITE_HOST}`;
const ENDPOINT = 'https://api.indexnow.org/indexnow';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = path.join(rootDir, 'public');
const sitemapPath = path.join(rootDir, 'out', 'sitemap.xml');

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const urlArgs = args.filter((a) => !a.startsWith('--'));

function findIndexNowKey() {
  if (!fs.existsSync(publicDir)) {
    throw new Error(`Missing public directory: ${publicDir}`);
  }
  const candidates = fs
    .readdirSync(publicDir)
    .filter((name) => /^[a-f0-9]{32}\.txt$/.test(name));
  if (candidates.length !== 1) {
    throw new Error(
      `Expected exactly 1 32-char hex IndexNow key file in public/, found ${candidates.length}: ${candidates.join(', ')}`
    );
  }
  const file = candidates[0];
  const expectedKey = file.replace(/\.txt$/, '');
  const content = fs.readFileSync(path.join(publicDir, file), 'utf8').trim();
  if (content !== expectedKey) {
    throw new Error(`IndexNow key file ${file} content does not match filename.`);
  }
  return expectedKey;
}

function readUrlsFromSitemap() {
  if (!fs.existsSync(sitemapPath)) {
    throw new Error(`Missing ${sitemapPath}. Run "npm run build" first.`);
  }
  const xml = fs.readFileSync(sitemapPath, 'utf8');
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/gi)]
    .map((m) => m[1].trim())
    .filter((u) => u.startsWith(`${SITE_ORIGIN}/`));
}

function normalizeUrl(input) {
  if (input.startsWith('https://') || input.startsWith('http://')) {
    const u = new URL(input);
    if (u.hostname !== SITE_HOST) {
      throw new Error(`Refusing to submit non-${SITE_HOST} URL: ${input}`);
    }
    return u.toString();
  }
  const clean = input.startsWith('/') ? input : `/${input}`;
  return `${SITE_ORIGIN}${clean}`;
}

async function main() {
  const key = findIndexNowKey();
  const urlList = Array.from(
    new Set(urlArgs.length > 0 ? urlArgs.map(normalizeUrl) : readUrlsFromSitemap())
  );

  if (urlList.length === 0) {
    throw new Error('No URLs to submit.');
  }

  const payload = {
    host: SITE_HOST,
    key,
    keyLocation: `${SITE_ORIGIN}/${key}.txt`,
    urlList,
  };

  if (dryRun) {
    console.log(`[IndexNow DRY RUN] Endpoint: ${ENDPOINT}`);
    console.log(`[IndexNow DRY RUN] Key URL : ${payload.keyLocation}`);
    console.log(`[IndexNow DRY RUN] URLs    : ${urlList.length}`);
    console.log(JSON.stringify({ ...payload, urlList: urlList.slice(0, 8), totalUrls: urlList.length }, null, 2));
    return;
  }

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload),
  });
  const body = await res.text();
  console.log(`[IndexNow] HTTP ${res.status} (${urlList.length} URLs submitted)`);
  if (body) console.log(body);
  if (!res.ok) {
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(`[IndexNow ERROR] ${err.message}`);
  process.exit(1);
});
