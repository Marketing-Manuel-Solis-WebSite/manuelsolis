#!/usr/bin/env node
/**
 * Envía las URLs del sitemap a IndexNow (Bing, Yandex, Seznam, Naver…).
 *
 * Por defecto es un DRY-RUN: lee el sitemap, cuenta y enseña una muestra, pero
 * no envía nada. El envío real solo ocurre con --send. No está conectado a CI,
 * deploy ni cron a propósito: se lanza a mano cuando hace falta.
 *
 *   npm run indexnow                          # dry-run contra producción
 *   npm run indexnow -- --sitemap http://localhost:3123/sitemap.xml
 *   npm run indexnow -- --sitemap ./sitemap.xml   # archivo local
 *   npm run indexnow -- --send                # envío real
 *
 * La clave es el único public/<32 hex>.txt cuyo contenido es su propio nombre;
 * IndexNow la valida descargando https://www.manuelsolis.com/<clave>.txt.
 * Ver docs/INDEXNOW.md.
 */

import { readdirSync, readFileSync, existsSync } from 'node:fs'
import path from 'node:path'

// Host canónico: el mismo que SITE_URL (app/[lang]/layout.tsx, app/robots.ts)
// y BASE_URL (app/lib/sitemapData.ts). IndexNow solo acepta URLs de este host.
const SITE_URL = 'https://www.manuelsolis.com'
const HOST = new URL(SITE_URL).host
const ENDPOINT = 'https://api.indexnow.org/indexnow'
const BATCH_SIZE = 10_000 // máximo del protocolo por petición
const SAMPLE_SIZE = 10
const MAX_DEPTH = 3 // índice → sub-sitemap; más es un bucle o un error
const USER_AGENT = 'Mozilla/5.0 (compatible; manuelsolis-indexnow/1.0)'

// ── argumentos ─────────────────────────────────────────────────────────────
const args = process.argv.slice(2)
const send = args.includes('--send')
if (send && args.includes('--dry-run')) fail('--send y --dry-run son incompatibles.')
const sitemapIdx = args.indexOf('--sitemap')
const sitemapArg = sitemapIdx === -1 ? `${SITE_URL}/sitemap.xml` : args[sitemapIdx + 1]
if (!sitemapArg || sitemapArg.startsWith('--')) fail('--sitemap necesita una URL o una ruta de archivo.')
const unknown = args.filter(
  (a, i) => !['--send', '--dry-run', '--sitemap'].includes(a) && (sitemapIdx === -1 || i !== sitemapIdx + 1),
)
if (unknown.length) fail(`Opción desconocida: ${unknown.join(' ')}`)

function fail(msg) {
  console.error(`✖ ${msg}`)
  process.exit(1)
}

// ── clave ──────────────────────────────────────────────────────────────────
function findKey() {
  const publicDir = path.join(process.cwd(), 'public')
  const keys = readdirSync(publicDir)
    .filter((f) => /^[0-9a-f]{32}\.txt$/.test(f))
    .filter((f) => readFileSync(path.join(publicDir, f), 'utf8').trim() === f.slice(0, -4))
  if (keys.length !== 1) fail(`Se esperaba exactamente un public/<clave>.txt de IndexNow y hay ${keys.length}.`)
  return keys[0].slice(0, -4)
}

// ── sitemap ────────────────────────────────────────────────────────────────
const isUrl = (s) => /^https?:\/\//i.test(s)
const sourceOrigin = isUrl(sitemapArg) ? new URL(sitemapArg).origin : null

const decode = (s) =>
  s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&apos;/g, "'")

const locsIn = (xml, tag) =>
  [...xml.matchAll(new RegExp(`<${tag}\\b[^>]*>([\\s\\S]*?)</${tag}>`, 'g'))]
    .map((m) => m[1].match(/<loc>\s*([\s\S]*?)\s*<\/loc>/)?.[1])
    .filter(Boolean)
    .map(decode)

/**
 * Los sub-sitemaps del índice apuntan siempre al host canónico. Si el índice
 * vino de otro origen (p. ej. el servidor local), se piden a ese mismo origen;
 * si vino de un archivo, se busca un archivo hermano con el mismo nombre.
 */
function resolveChild(loc, parent) {
  const url = new URL(loc)
  if (sourceOrigin && url.host === HOST) return sourceOrigin + url.pathname + url.search
  if (!isUrl(parent)) {
    const sibling = path.join(path.dirname(parent), path.basename(url.pathname))
    if (existsSync(sibling)) return sibling
  }
  return loc
}

async function load(source) {
  if (!isUrl(source)) {
    if (!existsSync(source)) fail(`No existe el archivo ${source}`)
    return readFileSync(source, 'utf8')
  }
  const res = await fetch(source, { headers: { 'user-agent': USER_AGENT, accept: 'application/xml,text/xml' } })
  if (!res.ok) {
    fail(
      `GET ${source} → ${res.status}.` +
        (res.status === 429 || res.status === 403
          ? ' El firewall de Vercel bloquea peticiones que no son de navegador; prueba con --sitemap contra un servidor local o un archivo.'
          : ''),
    )
  }
  return res.text()
}

async function collect(source, seen = new Set(), depth = 0) {
  if (depth > MAX_DEPTH) fail(`Demasiados niveles de sitemap en ${source}`)
  const xml = await load(source)
  const urls = locsIn(xml, 'url')
  for (const child of locsIn(xml, 'sitemap')) {
    const resolved = resolveChild(child, source)
    if (seen.has(resolved)) continue
    seen.add(resolved)
    console.log(`  · sub-sitemap ${resolved}`)
    urls.push(...(await collect(resolved, seen, depth + 1)))
  }
  return urls
}

// ── main ───────────────────────────────────────────────────────────────────
const key = findKey()
const keyLocation = `${SITE_URL}/${key}.txt`

console.log(`IndexNow ${send ? 'ENVÍO REAL' : 'dry-run (usa --send para enviar)'}`)
console.log(`  host:        ${HOST}`)
console.log(`  keyLocation: ${keyLocation}`)
console.log(`  sitemap:     ${sitemapArg}`)

const all = await collect(sitemapArg)
const unique = [...new Set(all)]
const foreign = unique.filter((u) => new URL(u).host !== HOST)
const urlList = unique.filter((u) => new URL(u).host === HOST)

if (foreign.length) console.log(`  ⚠ ${foreign.length} URLs de otro host descartadas (p. ej. ${foreign[0]})`)
if (urlList.length === 0) fail('El sitemap no devolvió ninguna URL del host canónico.')

const batches = []
for (let i = 0; i < urlList.length; i += BATCH_SIZE) batches.push(urlList.slice(i, i + BATCH_SIZE))

console.log(`\nURLs: ${urlList.length} únicas (${all.length - unique.length} duplicadas descartadas) en ${batches.length} lote(s) de ≤${BATCH_SIZE}`)
console.log(`Muestra:`)
for (const u of urlList.slice(0, SAMPLE_SIZE)) console.log(`  ${u}`)
if (urlList.length > SAMPLE_SIZE) console.log(`  … y ${urlList.length - SAMPLE_SIZE} más`)

if (!send) {
  console.log(`\nDry-run: no se envió nada. POST ${ENDPOINT} con {host, key, keyLocation, urlList}.`)
  process.exit(0)
}

// IndexNow descarga keyLocation para validar la clave: si no responde, el envío
// fallaría con 403. Se avisa pero no se aborta, porque el firewall puede
// bloquear esta comprobación sin bloquear al validador de IndexNow.
try {
  const res = await fetch(keyLocation, { headers: { 'user-agent': USER_AGENT } })
  const body = res.ok ? (await res.text()).trim() : ''
  if (body !== key) console.warn(`⚠ ${keyLocation} → ${res.status}; no devuelve la clave. ¿Está desplegado?`)
} catch (err) {
  console.warn(`⚠ No se pudo comprobar ${keyLocation}: ${err.message}`)
}

let failed = 0
for (const [i, batch] of batches.entries()) {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'content-type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: HOST, key, keyLocation, urlList: batch }),
  })
  const ok = res.status === 200 || res.status === 202
  if (!ok) failed++
  const detail = ok ? '' : ` ${(await res.text()).slice(0, 300)}`
  console.log(`Lote ${i + 1}/${batches.length} (${batch.length} URLs): HTTP ${res.status}${detail}`)
}
process.exit(failed ? 1 : 0)
