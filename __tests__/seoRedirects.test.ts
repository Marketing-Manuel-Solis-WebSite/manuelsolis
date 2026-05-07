import { describe, expect, it } from 'vitest';
import { seoRedirects } from '../app/lib/seoRedirects';

/**
 * Contract test for the historical 301 inventory.
 *
 * The redirects in app/lib/seoRedirects.ts represent ~1,030 legacy
 * URLs reported as 404 by Google Search Console. Losing entries
 * silently means losing link equity and inviting fresh 404s.
 *
 * This test guards against accidental deletion. If you intentionally
 * remove a stale redirect, lower MIN_REDIRECT_COUNT in the SAME PR
 * and explain in the commit message why the removal is safe.
 */

// Baseline floor — actual count is higher. If a refactor drops below
// this number, fail loudly.
const MIN_REDIRECT_COUNT = 270;

describe('seoRedirects contract', () => {
  it('keeps at least the baseline number of redirects', () => {
    expect(seoRedirects.length).toBeGreaterThanOrEqual(MIN_REDIRECT_COUNT);
  });

  it('every redirect is a permanent 301', () => {
    for (const redirect of seoRedirects) {
      expect(redirect.permanent).toBe(true);
    }
  });

  it('no two entries share the same source', () => {
    const sources = seoRedirects.map((r) => r.source);
    const unique = new Set(sources);
    expect(unique.size).toBe(sources.length);
  });

  it('every source starts with a slash', () => {
    for (const redirect of seoRedirects) {
      expect(redirect.source.startsWith('/')).toBe(true);
    }
  });

  it('every destination starts with a slash or http(s)://', () => {
    for (const redirect of seoRedirects) {
      const dest = redirect.destination;
      const isAbsolutePath = dest.startsWith('/');
      const isExternal = dest.startsWith('http://') || dest.startsWith('https://');
      expect(isAbsolutePath || isExternal).toBe(true);
    }
  });
});
