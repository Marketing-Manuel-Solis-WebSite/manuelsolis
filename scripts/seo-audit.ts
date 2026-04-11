/**
 * SEO Audit Script for manuelsolis.com
 *
 * Validates title, description, canonical, hreflang, H1, and HTML lang
 * for every URL in the sitemap.
 *
 * Usage:
 *   npx tsx scripts/seo-audit.ts [base-url]
 *
 * Default base URL: http://localhost:3000
 * Production:       npx tsx scripts/seo-audit.ts https://www.manuelsolis.com
 */

const BASE = process.argv[2] || 'http://localhost:3000';
const MAX_TITLE = 60;
const MIN_DESC = 70;
const MAX_DESC = 160;

interface AuditResult {
  url: string;
  status: number;
  title: string;
  titleLen: number;
  desc: string;
  descLen: number;
  canonical: string;
  canonicalInHead: boolean;
  hreflangCount: number;
  h1Count: number;
  h1Text: string;
  htmlLang: string;
  issues: string[];
}

async function fetchSitemapUrls(): Promise<string[]> {
  const res = await fetch(`${BASE}/sitemap.xml`);
  const xml = await res.text();
  const urls: string[] = [];
  const regex = /<loc>([^<]+)<\/loc>/g;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(xml)) !== null) {
    urls.push(match[1]);
  }
  return urls;
}

async function auditUrl(url: string): Promise<AuditResult> {
  const issues: string[] = [];
  let status = 0;

  try {
    const res = await fetch(url, { redirect: 'manual' });
    status = res.status;

    if (status >= 300 && status < 400) {
      return {
        url, status, title: '', titleLen: 0, desc: '', descLen: 0,
        canonical: '', canonicalInHead: false, hreflangCount: 0,
        h1Count: 0, h1Text: '', htmlLang: '',
        issues: [`REDIRECT_${status} → ${res.headers.get('location') || '?'}`],
      };
    }

    if (status !== 200) {
      return {
        url, status, title: '', titleLen: 0, desc: '', descLen: 0,
        canonical: '', canonicalInHead: false, hreflangCount: 0,
        h1Count: 0, h1Text: '', htmlLang: '',
        issues: [`HTTP_${status}`],
      };
    }

    const html = await res.text();

    // Title
    const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
    const title = titleMatch?.[1]?.trim() || '';
    const titleLen = title.length;
    if (!title) issues.push('MISSING_TITLE');
    else if (titleLen > MAX_TITLE) issues.push(`TITLE_LONG(${titleLen})`);

    // Description
    const descMatch = html.match(/<meta\s+name="description"\s+content="([^"]*)"/i)
      || html.match(/<meta\s+content="([^"]*)"\s+name="description"/i);
    const desc = descMatch?.[1]?.trim() || '';
    const descLen = desc.length;
    if (!desc) issues.push('MISSING_DESC');
    else {
      if (descLen < MIN_DESC) issues.push(`DESC_SHORT(${descLen})`);
      if (descLen > MAX_DESC) issues.push(`DESC_LONG(${descLen})`);
    }

    // Canonical
    const canonMatch = html.match(/<link[^>]+rel="canonical"[^>]+href="([^"]*)"/i)
      || html.match(/<link[^>]+href="([^"]*)"[^>]+rel="canonical"/i);
    const canonical = canonMatch?.[1] || '';
    if (!canonical) issues.push('MISSING_CANONICAL');

    // Canonical position check (inside <head>)
    const headSection = html.match(/<head[^>]*>([\s\S]*?)<\/head>/i)?.[1] || '';
    const canonicalInHead = headSection.includes('rel="canonical"');
    if (canonical && !canonicalInHead) issues.push('CANONICAL_OUTSIDE_HEAD');

    // Hreflang
    const hreflangMatches = html.match(/hreflang="/g) || [];
    const hreflangCount = hreflangMatches.length;

    // H1
    const h1Matches = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
    const h1Count = h1Matches.length;
    const h1Text = h1Matches[0]?.replace(/<[^>]+>/g, '').trim().substring(0, 80) || '';
    if (h1Count === 0) issues.push('MISSING_H1');
    if (h1Count > 1) issues.push(`MULTIPLE_H1(${h1Count})`);

    // HTML lang
    const langMatch = html.match(/<html[^>]+lang="([^"]*)"/i);
    const htmlLang = langMatch?.[1] || '';
    if (!htmlLang) issues.push('MISSING_HTML_LANG');

    return {
      url, status, title, titleLen, desc, descLen,
      canonical, canonicalInHead, hreflangCount,
      h1Count, h1Text, htmlLang, issues,
    };
  } catch (err) {
    return {
      url, status, title: '', titleLen: 0, desc: '', descLen: 0,
      canonical: '', canonicalInHead: false, hreflangCount: 0,
      h1Count: 0, h1Text: '', htmlLang: '',
      issues: [`FETCH_ERROR: ${(err as Error).message}`],
    };
  }
}

async function main() {
  console.log(`\nSEO Audit for ${BASE}\n${'='.repeat(60)}\n`);

  console.log('Fetching sitemap...');
  const urls = await fetchSitemapUrls();
  console.log(`Found ${urls.length} URLs in sitemap.\n`);

  const results: AuditResult[] = [];
  const batchSize = 5;

  for (let i = 0; i < urls.length; i += batchSize) {
    const batch = urls.slice(i, i + batchSize);
    const batchResults = await Promise.all(batch.map(auditUrl));
    results.push(...batchResults);
    process.stdout.write(`  Audited ${Math.min(i + batchSize, urls.length)}/${urls.length}\r`);
  }

  console.log('\n');

  // Summary
  const withIssues = results.filter((r) => r.issues.length > 0);
  const clean = results.filter((r) => r.issues.length === 0);

  console.log(`RESULTS: ${clean.length} clean, ${withIssues.length} with issues\n`);

  // Issue breakdown
  const issueCounts: Record<string, number> = {};
  for (const r of results) {
    for (const issue of r.issues) {
      const key = issue.replace(/\(.*\)/, '');
      issueCounts[key] = (issueCounts[key] || 0) + 1;
    }
  }

  if (Object.keys(issueCounts).length > 0) {
    console.log('ISSUE BREAKDOWN:');
    for (const [issue, count] of Object.entries(issueCounts).sort((a, b) => b[1] - a[1])) {
      console.log(`  ${count.toString().padStart(4)} × ${issue}`);
    }
    console.log('');
  }

  // Detailed issues
  if (withIssues.length > 0) {
    console.log('DETAILED ISSUES:');
    for (const r of withIssues) {
      console.log(`  ${r.url}`);
      for (const issue of r.issues) {
        console.log(`    - ${issue}`);
      }
    }
  }

  // Stats
  const titles = results.filter((r) => r.status === 200);
  const avgTitle = titles.reduce((a, r) => a + r.titleLen, 0) / (titles.length || 1);
  const avgDesc = titles.reduce((a, r) => a + r.descLen, 0) / (titles.length || 1);
  console.log(`\nSTATS:`);
  console.log(`  Avg title length: ${avgTitle.toFixed(0)} chars`);
  console.log(`  Avg description length: ${avgDesc.toFixed(0)} chars`);
  console.log(`  Pages with hreflang: ${titles.filter((r) => r.hreflangCount > 0).length}/${titles.length}`);
  console.log(`  Pages with canonical: ${titles.filter((r) => r.canonical).length}/${titles.length}`);
  console.log(`  Pages with H1: ${titles.filter((r) => r.h1Count > 0).length}/${titles.length}`);
  console.log(`  Pages with HTML lang: ${titles.filter((r) => r.htmlLang).length}/${titles.length}`);
}

main().catch(console.error);
