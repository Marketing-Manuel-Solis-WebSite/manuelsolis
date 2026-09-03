#!/usr/bin/env node
/**
 * verify-prod.mjs — Comprobar el HTML que producción sirve de verdad,
 * saltándose el reto de Vercel Attack Challenge Mode.
 *
 * ── El problema que resuelve ──
 * El firewall devuelve `429` con `x-vercel-mitigated: challenge` a cualquier
 * petición que no venga de un navegador, así que `curl` no sirve para verificar
 * nada en vivo. Durante semanas eso nos dejó auditando solo el build local y
 * pidiéndole a eSEOspace que nos dijera cómo rastreaba ella el sitio.
 *
 * ── Cómo lo salta ──
 * El reto se emite UNA VEZ por sesión de navegador. Así que:
 *   1. Lanzar Chrome headless con puerto de depuración y perfil limpio.
 *   2. Navegar al origen y esperar a que `document.title` deje de ser el
 *      checkpoint (tarda entre 3 y 6 segundos).
 *   3. Pedir el resto de URLs con `fetch()` DESDE ESE CONTEXTO, vía
 *      `Runtime.evaluate` de CDP.
 *
 * Eso devuelve el cuerpo servido, no el DOM post-hidratación, que es lo que
 * necesita una auditoría: el sitio tiene un script en línea que corrige el
 * atributo `lang` antes del primer pintado, así que el inspector enseña `en`
 * donde un crawler lee `es`.
 *
 * No hace falta ninguna dependencia: Node 22+ trae `WebSocket` nativo.
 *
 * ── Uso ──
 *   npm run verify:prod
 *   node scripts/verify-prod.mjs --base https://manuelsolis-xxxx.vercel.app
 *
 * Sale con código 1 si alguna comprobación falla, para poder encadenarlo.
 *
 * ── Qué comprueba hoy ──
 * Las siete correcciones desplegadas el 2026-09-03 (commit 0786c1d) a partir de
 * la contraverificación de las auditorías de eSEOspace. Son asserts de
 * regresión CONTRA PRODUCCIÓN: los tests de vitest cubren la lógica y el build
 * cubre el HTML generado, pero solo esto prueba que lo desplegado es lo medido.
 * Al añadir una corrección nueva, añadir aquí su assert.
 */

import { spawn } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const args = process.argv.slice(2);
const BASE = (args[args.indexOf('--base') + 1] || '').startsWith('http')
  ? args[args.indexOf('--base') + 1].replace(/\/$/, '')
  : 'https://www.manuelsolis.com';

const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
].filter(Boolean);

const CHROME = CHROME_CANDIDATES.find((p) => fs.existsSync(p));
if (!CHROME) {
  console.error('No se encontró Chrome. Indica la ruta con CHROME_PATH=... npm run verify:prod');
  process.exit(2);
}

const PORT = 9222 + Math.floor(Math.random() * 500);
const PROFILE = fs.mkdtempSync(path.join(os.tmpdir(), 'verify-prod-'));
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const chrome = spawn(
  CHROME,
  [
    '--headless=new',
    `--remote-debugging-port=${PORT}`,
    `--user-data-dir=${PROFILE}`,
    '--no-first-run',
    '--disable-gpu',
    '--window-size=1280,900',
    `${BASE}/es`,
  ],
  { stdio: 'ignore' },
);

/**
 * La limpieza NUNCA puede cambiar el resultado del script.
 *
 * Chrome sigue escribiendo su perfil unos milisegundos después del `kill`, así
 * que borrar el temporal en el handler de `exit` daba `ENOTEMPTY` y el proceso
 * terminaba con un stack trace y código distinto de cero **aunque las 34
 * comprobaciones hubieran pasado**. Un fallo al borrar un directorio temporal
 * no es un fallo de verificación: se reintenta y, si no se puede, se deja al
 * sistema operativo.
 */
function limpiar() {
  try { chrome.kill(); } catch { /* ya estaba muerto */ }
  try {
    fs.rmSync(PROFILE, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  } catch { /* el SO lo recoge; no es un fallo de verificación */ }
}
process.on('exit', limpiar);
process.on('SIGINT', () => { limpiar(); process.exit(130); });

/** Espera a que Chrome exponga una pestaña por CDP. */
async function esperarPestana() {
  for (let i = 0; i < 60; i++) {
    try {
      const r = await fetch(`http://127.0.0.1:${PORT}/json/list`);
      const tabs = await r.json();
      const page = tabs.find((t) => t.type === 'page' && t.webSocketDebuggerUrl);
      if (page) return page;
    } catch {
      /* Chrome aún no levantó el puerto */
    }
    await sleep(500);
  }
  throw new Error('Chrome no expuso el puerto de depuración');
}

const page = await esperarPestana();
const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((res, rej) => {
  ws.addEventListener('open', res, { once: true });
  ws.addEventListener('error', rej, { once: true });
});

let seq = 0;
const pendientes = new Map();
ws.addEventListener('message', (e) => {
  const m = JSON.parse(e.data);
  const resolver = pendientes.get(m.id);
  if (resolver) { resolver(m); pendientes.delete(m.id); }
});
const cdp = (method, params = {}) =>
  new Promise((res) => {
    const id = ++seq;
    pendientes.set(id, res);
    ws.send(JSON.stringify({ id, method, params }));
  });

const evaluar = async (expr) => {
  const r = await cdp('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true });
  return r.result?.result?.value;
};

// ── Resolver el reto ──
let resuelto = false;
for (let i = 0; i < 45; i++) {
  const titulo = await evaluar('document.title');
  if (titulo && !/Security Checkpoint|Just a moment|Attention Required/i.test(titulo)) {
    console.log(`Reto resuelto en ~${i}s · título: ${JSON.stringify(titulo)}\n`);
    resuelto = true;
    break;
  }
  await sleep(1000);
}
if (!resuelto) {
  console.error('El reto de Vercel no se resolvió. ¿Cambió Attack Mode?');
  process.exit(2);
}

/** Pide una URL desde el contexto ya autorizado. ~250 ms entre peticiones. */
async function traer(ruta) {
  const html = await evaluar(
    `fetch(${JSON.stringify(BASE + ruta)},{credentials:'include'}).then(r=>r.text())`,
  );
  await sleep(250);
  return html || '';
}

const checks = [];
const check = (nombre, ok) => checks.push([nombre, ok]);

// ── Defecto 1 (crítico): las diez sedes sin atención presencial emiten Place ──
const SIN_PERSONAL = [
  'chicago-wall', 'chicago-wacker', 'chicago-prospect', 'chicago-martingale',
  'chicago-burr-ridge', 'kirby', 'league-city', 'main-st', 'north-loop', 'northchase',
];
for (const slug of SIN_PERSONAL) {
  for (const lang of ['es', 'en']) {
    const h = await traer(`/${lang}/oficinas/${slug}`);
    check(
      `${lang}/oficinas/${slug} → Place, no LegalService`,
      h.includes(`/oficinas/${slug}#place`) && !h.includes(`/oficinas/${slug}#localbusiness`),
    );
  }
}
// Y las atendidas siguen intactas: el arreglo no debe tocarlas.
for (const slug of ['dallas', 'houston-principal']) {
  for (const lang of ['es', 'en']) {
    const h = await traer(`/${lang}/oficinas/${slug}`);
    check(
      `${lang}/oficinas/${slug} → LegalService con horario (intacta)`,
      h.includes(`/oficinas/${slug}#localbusiness`) && h.includes('openingHoursSpecification'),
    );
  }
}

// ── Paso 05: las 35 landings de ciudad en el pie ──
const FAMILIAS = {
  'asilo-politico': 8, vawa: 8, 'abogado-inmigracion': 8,
  'defensa-deportacion': 5, 'visa-u': 4, 'abogado-accidentes': 2,
};
for (const lang of ['es', 'en']) {
  const h = await traer(`/${lang}`);
  const pie = h.slice(h.lastIndexOf('<footer'));
  let total = 0;
  for (const fam of Object.keys(FAMILIAS)) {
    total += new Set(
      [...pie.matchAll(new RegExp(`href="/${lang}/(${fam}-[a-z-]+)"`, 'g'))].map((m) => m[1]),
    ).size;
  }
  check(`/${lang} → 35 landings en el pie (${total})`, total === 35);
}

// ── Paso 06: articleSection, traducido según el idioma ──
for (const [lang, esperado] of [['es', 'Procesos Migratorios'], ['en', 'Immigration Processes']]) {
  const h = await traer(`/${lang}/blog/rfe-responder-evidencia-uscis`);
  const m = h.match(/"articleSection":"([^"]+)"/);
  check(`/${lang}/blog/… → articleSection "${m ? m[1] : 'ausente'}"`, m?.[1] === esperado);
}

// ── Paso 02: ningún anchor de petición familiar cae en derecho de familia ──
for (const lang of ['es', 'en']) {
  const h = await traer(`/${lang}/blog/rfe-responder-evidencia-uscis`);
  const malos = [...h.matchAll(/<a[^>]*href="\/[a-z]{2}\/servicios\/familia"[^>]*>([^<]*)<\/a>/g)]
    .filter((m) => /petici|petition/i.test(m[1]));
  check(`/${lang}/blog/… → 0 anchors de petición hacia /servicios/familia`, malos.length === 0);
}

// ── Paso 03: sin bloque de recursos donde no hay artículos del área ──
const BLOQUE = /Recursos Legales Relacionados|Related Legal Resources|Recursos Legales de Inmigraci|Immigration Legal Resources/;
for (const [servicio, debeEstar] of [['ley-criminal', false], ['visa-e2', false], ['accidentes', true]]) {
  const h = await traer(`/es/servicios/${servicio}`);
  check(
    `/es/servicios/${servicio} → bloque de recursos ${debeEstar ? 'presente' : 'ausente'}`,
    BLOQUE.test(h) === debeEstar,
  );
}

// ── Sanidad: no estamos midiendo la página del reto ──
const home = await traer('/es');
check('/es devuelve HTML real, no el checkpoint', home.includes('<footer') && home.length > 50000);

// ── Resultado ──
console.log('════ VERIFICACIÓN EN PRODUCCIÓN ════');
console.log(`Base: ${BASE}\n`);
let ok = 0;
for (const [nombre, pasa] of checks) {
  console.log(`  ${pasa ? '✅' : '❌'}  ${nombre}`);
  if (pasa) ok++;
}
console.log(`\n${ok} de ${checks.length} comprobaciones pasan`);

ws.close();
process.exit(ok === checks.length ? 0 : 1);
