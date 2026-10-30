#!/usr/bin/env node
/**
 * check-legacy-urls.mjs — Seguir, salto a salto, las URLs viejas que Search
 * Console aún muestra con impresiones y que no están en el sitemap.
 *
 * ── Por qué en local ──
 * Producción tiene el reto de Vercel y `curl` recibe 429, así que esto corre
 * contra `npm run build && npm run start`. El apex → www lo hace Vercel a
 * nivel dominio, por eso cada URL se normaliza a www antes de pedirla: el
 * primer salto que medimos es el de la app, no el del dominio.
 *
 * ── Qué mide ──
 * Pide cada ruta con `Host: www.manuelsolis.com` y sin seguir redirecciones,
 * y sigue la cadena a mano: código del primer salto, destino, saltos hasta el
 * 200 y código final. User-Agent de Googlebot por defecto: el proxy da 301 al
 * crawler y 307 (por idioma) al navegador, y lo que se consolida es lo primero.
 *
 * Los subdominios (mm., mme., detainees., bos., v2.…) NO se normalizan a www:
 * son otras propiedades (landings de pago con su propio CallRail, portales);
 * salen en el CSV como `otro_host` y no se piden.
 *
 * ── Uso ──
 *   npm run build && npm run start            # en otra terminal
 *   node scripts/check-legacy-urls.mjs urls-viejas-fuera-sitemap.csv
 *   node scripts/check-legacy-urls.mjs entrada.csv --base http://localhost:3100 \
 *     --out /tmp/resultados-urls-viejas.csv --ua browser
 *
 * Entrada: CSV con columnas url,impresiones_12m,clics_12m.
 */

import { readFileSync, writeFileSync } from 'node:fs';
import http from 'node:http';

const CANONICAL_HOST = 'www.manuelsolis.com';
const SITE_HOSTS = new Set(['manuelsolis.com', 'www.manuelsolis.com']);
const MAX_HOPS = 10;
const UAS = {
  googlebot: 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
  browser: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36',
};

const args = process.argv.slice(2);
const opt = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : fallback;
};
const input = args.find((a, i) => !a.startsWith('--') && !args[i - 1]?.startsWith('--'));
if (!input) {
  console.error('Uso: node scripts/check-legacy-urls.mjs <entrada.csv> [--base URL] [--out CSV] [--ua googlebot|browser]');
  process.exit(1);
}
const base = new URL(opt('base', 'http://localhost:3000'));
const out = opt('out', '/tmp/resultados-urls-viejas.csv');
const ua = UAS[opt('ua', 'googlebot')] ?? opt('ua');
const concurrency = Number(opt('concurrency', '8'));

function parseCsv(text) {
  const [header, ...lines] = text.trim().split(/\r?\n/);
  const cols = header.split(',');
  return lines.filter(Boolean).map((line) => {
    // La URL puede llevar comas en la query: las dos últimas columnas son números.
    const parts = line.split(',');
    const row = {};
    row[cols[2]] = parts.pop();
    row[cols[1]] = parts.pop();
    row[cols[0]] = parts.join(',');
    return row;
  });
}

function request(path) {
  return new Promise((resolve, reject) => {
    const req = http.request(
      {
        host: base.hostname,
        port: base.port || 80,
        path,
        method: 'GET',
        headers: { host: CANONICAL_HOST, 'user-agent': ua, 'accept-language': 'es' },
      },
      (res) => {
        res.resume();
        resolve({ status: res.statusCode, location: res.headers.location ?? null });
      },
    );
    req.setTimeout(30_000, () => req.destroy(new Error('timeout')));
    req.on('error', reject);
    req.end();
  });
}

/** Ruta + query de un Location; null si sale del sitio. */
function nextPath(location, currentPath) {
  const u = new URL(location, `https://${CANONICAL_HOST}${currentPath}`);
  if (!SITE_HOSTS.has(u.hostname)) return { external: u.href };
  return { path: u.pathname + u.search };
}

const isPermanent = (s) => s === 301 || s === 308;
const isRedirect = (s) => s >= 300 && s < 400;
const isHome = (p) => /^\/(es|en)?\/?$/.test(p.split('?')[0]);

async function trace(path) {
  const hops = [];
  let current = path;
  for (let i = 0; i <= MAX_HOPS; i++) {
    const { status, location } = await request(current);
    if (!isRedirect(status) || !location) return { hops, finalStatus: status, finalPath: current };
    const next = nextPath(location, current);
    hops.push({ status, to: next.path ?? next.external });
    if (next.external) return { hops, finalStatus: null, finalPath: next.external };
    current = next.path;
  }
  return { hops, finalStatus: 'loop', finalPath: current };
}

function classify(path, t) {
  const first = t.hops[0];
  if (t.finalStatus === 'loop') return 'bucle';
  if (t.finalStatus === null) return 'externo';
  if (t.finalStatus === 404 || t.finalStatus === 410) return '404';
  if (t.finalStatus !== 200) return `final_${t.finalStatus}`;
  if (t.hops.length === 0) return 'sirve_200_sin_redireccion';
  if (t.hops.length > 1) return 'cadena';
  if (!isPermanent(first.status)) return 'temporal';
  if (isHome(t.finalPath) && !isHome(path)) return 'home_sin_ser_home';
  return 'ok_un_salto';
}

const rows = parseCsv(readFileSync(input, 'utf8'));
const results = new Array(rows.length);
let cursor = 0;

async function worker() {
  while (cursor < rows.length) {
    const i = cursor++;
    const row = rows[i];
    let u;
    try {
      u = new URL(row.url);
    } catch {
      results[i] = { ...row, path: '', categoria: 'url_invalida', hops: [] };
      continue;
    }
    if (!SITE_HOSTS.has(u.hostname)) {
      results[i] = { ...row, path: u.pathname + u.search, categoria: 'otro_host', hops: [] };
      continue;
    }
    const path = (u.pathname || '/') + u.search;
    try {
      const t = await trace(path);
      results[i] = { ...row, path, ...t, categoria: classify(path, t) };
    } catch (err) {
      results[i] = { ...row, path, categoria: 'error', error: String(err.message), hops: [] };
    }
  }
}

await Promise.all(Array.from({ length: concurrency }, worker));

const esc = (v) => (v == null ? '' : /[",\n]/.test(String(v)) ? `"${String(v).replaceAll('"', '""')}"` : String(v));
const header = ['url', 'impresiones_12m', 'clics_12m', 'ruta_www', 'codigo', 'destino', 'saltos', 'codigo_final', 'destino_final', 'cadena', 'categoria'];
const lines = results.map((r) =>
  [
    r.url,
    r.impresiones_12m,
    r.clics_12m,
    r.path,
    r.hops[0]?.status ?? r.finalStatus ?? '',
    r.hops[0]?.to ?? '',
    r.hops.length,
    r.finalStatus ?? '',
    r.finalPath ?? '',
    r.hops.map((h) => `${h.status} ${h.to}`).join(' → '),
    r.categoria,
  ].map(esc).join(','),
);
writeFileSync(out, [header.join(','), ...lines].join('\n') + '\n');

const summary = {};
for (const r of results) {
  summary[r.categoria] ??= { urls: 0, impresiones: 0 };
  summary[r.categoria].urls++;
  summary[r.categoria].impresiones += Number(r.impresiones_12m) || 0;
}
console.log(`\n${results.length} URLs · base ${base.origin} · UA ${opt('ua', 'googlebot')} · CSV → ${out}\n`);
console.table(Object.fromEntries(Object.entries(summary).sort((a, b) => b[1].urls - a[1].urls)));

const bad = results.filter((r) => ['404', 'cadena', 'home_sin_ser_home', 'temporal', 'bucle', 'error'].includes(r.categoria) || r.categoria.startsWith('final_'));
process.exitCode = bad.length ? 1 : 0;
