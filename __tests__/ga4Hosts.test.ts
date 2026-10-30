import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { GA4_ALLOWED_HOSTS, isGa4AllowedHost } from '../app/lib/ga4Hosts';

describe('isGa4AllowedHost', () => {
  it('permite solo los dominios de producción', () => {
    expect(GA4_ALLOWED_HOSTS).toEqual(['www.manuelsolis.com', 'manuelsolis.com']);
    expect(isGa4AllowedHost('www.manuelsolis.com')).toBe(true);
    expect(isGa4AllowedHost('manuelsolis.com')).toBe(true);
    expect(isGa4AllowedHost('WWW.ManuelSolis.com')).toBe(true);
    expect(isGa4AllowedHost('www.manuelsolis.com.')).toBe(true);
  });

  it.each([
    'localhost',
    '127.0.0.1',
    '0.0.0.0',
    'manuelsolis.local',
    'mi-mac.local',
    'manuelsolis.pages.dev',
    'abc123.manuelsolis.pages.dev',
    'manuelsolis.vercel.app',
    'manuelsolis-git-main-adminmanuelsolis-projects.vercel.app',
    'mm.manuelsolis.com',
    'staging.manuelsolis.com',
    'www.manuelsolis.com.evil.com',
    'evilmanuelsolis.com',
    '',
  ])('bloquea %s', (host) => {
    expect(isGa4AllowedHost(host)).toBe(false);
  });
});

describe('cableado de GA4', () => {
  const read = (rel: string) => readFileSync(path.join(__dirname, '..', rel), 'utf8');

  it('los scripts de GA4 solo se montan en hosts permitidos', () => {
    const src = read('app/components/PageViewTracker.tsx');
    expect(src).toContain('{GA_ID && ga4Allowed && (');
    expect(src.match(/gtag\('config'/g)).toHaveLength(1);
  });

  it("gtag('event') sale solo tras comprobar el host", () => {
    const src = read('app/lib/tracking.ts');
    const gate = src.indexOf('if (!isGa4AllowedLocation()) return;');
    const call = src.indexOf("gtag('event', event, params)");
    expect(gate).toBeGreaterThan(-1);
    expect(call).toBeGreaterThan(gate);
  });
});
