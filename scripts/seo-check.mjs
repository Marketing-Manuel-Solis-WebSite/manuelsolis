#!/usr/bin/env node
/**
 * Auditor de metadatos SEO sobre el HTML que `next build` prerenderiza.
 *
 * Se ejecuta DESPUÉS del build (`npm run build && npm run seo:check`) porque lee
 * `.next/server/app/**\/*.html`: así comprueba lo que de verdad recibe Google, no
 * lo que el código pretende emitir.
 *
 * Nació de la ronda SEO de agosto de 2026, que midió sobre 295 páginas: 167 sin
 * `og:locale` ni `og:site_name`, 27 sin `og:url`, 50 títulos y 56 descripciones
 * truncados. La causa del bloque social era una sola: en el App Router el
 * `openGraph` de una página REEMPLAZA al del layout en vez de fusionarse. Este
 * script existe para que eso no vuelva sin que nadie se entere.
 *
 * Salida: código 1 si hay fallos (metadato ausente o duplicado), 0 si solo hay
 * avisos de longitud.
 */

import { readdirSync, readFileSync, existsSync } from 'node:fs'
import path from 'node:path'

const APP_DIR = path.join(process.cwd(), '.next/server/app')

// Rutas internas de Next: no son URLs públicas ni se indexan, así que no se les
// exige canonical, hreflang ni bloque social.
const INTERNAL = /^\/(index|_not-found|_global-error)$/

const TITLE_MAX = 62
const DESC_MAX = 165
const DESC_MIN = 70

if (!existsSync(APP_DIR)) {
  console.error('No existe .next/server/app — ejecuta `npm run build` antes de este script.')
  process.exit(1)
}

const files = []
;(function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(full)
    else if (entry.name.endsWith('.html')) files.push(full)
  }
})(APP_DIR)

const first = (re, src) => {
  const m = src.match(re)
  return m ? m[1].trim() : null
}

const pages = files.map((file) => {
  const src = readFileSync(file, 'utf8')
  const url = '/' + path.relative(APP_DIR, file).split(path.sep).join('/').replace(/\.html$/, '')
  return {
    url,
    internal: INTERNAL.test(url),
    title: first(/<title>(.*?)<\/title>/s, src),
    description: first(/<meta name="description" content="([^"]*)"/, src),
    canonical: first(/<link rel="canonical" href="([^"]*)"/, src),
    ogLocale: first(/<meta property="og:locale" content="([^"]*)"/, src),
    ogSiteName: first(/<meta property="og:site_name" content="([^"]*)"/, src),
    ogUrl: first(/<meta property="og:url" content="([^"]*)"/, src),
    ogImage: first(/<meta property="og:image" content="([^"]*)"/, src),
    // El atributo `type` no siempre es el primero del <script>: exigirlo daba
    // falsos "sin JSON-LD" en páginas que sí lo emitían.
    jsonLd: /<script[^>]*type="application\/ld\+json"[^>]*>/.test(src),
    hreflang: /<link rel="alternate" hreflang=/i.test(src),
  }
})

const publicPages = pages.filter((p) => !p.internal)
const errors = []
const warnings = []

const require_ = (field, label) => {
  const missing = publicPages.filter((p) => !p[field]).map((p) => p.url)
  if (missing.length) errors.push(`${missing.length} páginas sin ${label}: ${missing.slice(0, 5).join(', ')}${missing.length > 5 ? '…' : ''}`)
}

require_('title', '<title>')
require_('description', 'meta description')
require_('canonical', 'canonical')
require_('ogLocale', 'og:locale')
require_('ogSiteName', 'og:site_name')
require_('ogUrl', 'og:url')
require_('ogImage', 'og:image')
require_('jsonLd', 'JSON-LD')
require_('hreflang', 'hreflang')

const dupes = (field, label) => {
  const seen = new Map()
  for (const p of publicPages) {
    const value = p[field]
    if (!value) continue
    if (!seen.has(value)) seen.set(value, [])
    seen.get(value).push(p.url)
  }
  for (const [value, urls] of seen) {
    if (urls.length > 1) errors.push(`${label} duplicado en ${urls.length} páginas ("${value.slice(0, 60)}…"): ${urls.join(', ')}`)
  }
}

dupes('title', 'title')
dupes('description', 'description')

for (const p of publicPages) {
  if (p.title && p.title.length > TITLE_MAX) warnings.push(`title de ${p.url} mide ${p.title.length} (Google trunca sobre ${TITLE_MAX})`)
  if (p.description && p.description.length > DESC_MAX) warnings.push(`description de ${p.url} mide ${p.description.length} (se trunca sobre ${DESC_MAX})`)
  if (p.description && p.description.length < DESC_MIN) warnings.push(`description de ${p.url} mide solo ${p.description.length} (aprovecha hasta 160)`)
}

console.log(`Páginas analizadas: ${pages.length} (${publicPages.length} públicas, ${pages.length - publicPages.length} internas de Next)`)

if (warnings.length) {
  console.log(`\n⚠ ${warnings.length} avisos de longitud:`)
  for (const w of warnings.slice(0, 20)) console.log(`  · ${w}`)
  if (warnings.length > 20) console.log(`  … y ${warnings.length - 20} más`)
}

if (errors.length) {
  console.error(`\n✖ ${errors.length} fallos:`)
  for (const e of errors) console.error(`  · ${e}`)
  process.exit(1)
}

console.log(`\n✓ Sin fallos: las ${publicPages.length} páginas públicas tienen title, description, canonical, hreflang, JSON-LD y bloque social completos, y ninguna repite title ni description.`)
