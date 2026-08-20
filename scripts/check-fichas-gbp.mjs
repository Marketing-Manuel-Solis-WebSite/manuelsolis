#!/usr/bin/env node
/**
 * check-fichas-gbp.mjs — Monitor de visibilidad pública de las fichas GBP
 * vía Google Places API (New). SIN OAuth, SIN aprobación del GBP API.
 *
 * Detecta:      🔴 ficha desaparecida de Google Maps (suspensión dura / borrado)
 *               🟠 ficha marcada "cerrada permanentemente" (vector de ataque de terceros)
 *               🟡 ficha marcada "cerrada temporalmente"
 *               🟢 ficha visible y operativa (con rating y # de reseñas)
 * NO detecta:   suspensiones suaves (ficha visible pero sin control del panel).
 *               Eso solo se ve en business.google.com o con el GBP API.
 *
 * Setup (2 min) desde la raíz del repo de manuelsolis.com:
 *   1. Copia este archivo a  scripts/  y  oficinas-gbp.json  a la raíz.
 *   2. Completa oficinas-gbp.json con las ~22 oficinas (nombre + query "marca, ciudad, estado").
 *   3. Key en .env.local:  GOOGLE_PLACES_API_KEY=...
 *      (sirve la del sync de ratings SI no tiene restricción de referrer HTTP;
 *       si la tiene, crea una key nueva de servidor en el mismo proyecto GCP — 2 min).
 *   4. node scripts/check-fichas-gbp.mjs        → tabla + CSV
 *      node scripts/check-fichas-gbp.mjs --json → salida JSON
 *
 * La primera corrida descubre los place_id y los guarda de vuelta en oficinas-gbp.json;
 * las siguientes verifican por place_id exacto (un 404 = ficha borrada = 🔴).
 *
 * Exit codes para cron/CI:  2 = hay 🔴  ·  1 = hay 🟠/🟡  ·  0 = todo 🟢  ·  3 = error
 * Costo: ~22 llamadas por corrida — dentro del tier gratuito mensual de Places. $0.
 */

import fs from 'node:fs';
import path from 'node:path';

const MODO_JSON = process.argv.includes('--json');
const RUTA_CONFIG = buscarConfig();

cargarEnv('.env.local');
cargarEnv('.env');

const KEY =
  process.env.GOOGLE_PLACES_API_KEY ||
  process.env.GOOGLE_MAPS_API_KEY ||
  process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

const FIELDS_LUGAR = 'id,displayName,formattedAddress,businessStatus,rating,userRatingCount,googleMapsUri';
const FIELDS_BUSQUEDA = FIELDS_LUGAR.split(',').map((f) => 'places.' + f).join(',');

main().catch((e) => {
  console.error('\nERROR FATAL:', e.message);
  process.exit(3);
});

async function main() {
  if (!KEY) {
    throw new Error(
      'No encontré la API key. Define GOOGLE_PLACES_API_KEY en .env.local ' +
      '(o GOOGLE_MAPS_API_KEY / NEXT_PUBLIC_GOOGLE_MAPS_API_KEY).'
    );
  }
  if (!RUTA_CONFIG) {
    throw new Error('No encontré oficinas-gbp.json (búscalo en la raíz del repo o junto al script).');
  }

  const oficinas = JSON.parse(fs.readFileSync(RUTA_CONFIG, 'utf8'));
  if (!Array.isArray(oficinas) || !oficinas.length) {
    throw new Error('oficinas-gbp.json debe ser un array con al menos una oficina.');
  }

  log(`Auditando ${oficinas.length} fichas...\n`);

  const resultados = [];
  let configCambio = false;

  for (const of_ of oficinas) {
    let r;
    if (of_.placeId) {
      r = await verificarPorPlaceId(of_);
    } else {
      r = await descubrirPorBusqueda(of_);
      if (r.placeIdDescubierto) {
        of_.placeId = r.placeIdDescubierto; // se persiste para corridas futuras
        configCambio = true;
      }
    }
    resultados.push(r);
    await pausa(150);
  }

  if (configCambio) {
    fs.writeFileSync(RUTA_CONFIG, JSON.stringify(oficinas, null, 2) + '\n');
    log(`(place_id descubiertos guardados en ${path.basename(RUTA_CONFIG)})\n`);
  }

  const peso = { ROJO: 0, NARANJA: 1, AMARILLO: 2, GRIS: 3, VERDE: 4 };
  resultados.sort((a, b) => peso[a.estado] - peso[b.estado] || a.nombre.localeCompare(b.nombre));

  const n = (x) => resultados.filter((r) => r.estado === x).length;

  if (MODO_JSON) {
    console.log(JSON.stringify({ fecha: hoy(), total: resultados.length, resumen: { rojo: n('ROJO'), naranja: n('NARANJA'), amarillo: n('AMARILLO'), verde: n('VERDE'), gris: n('GRIS') }, fichas: resultados }, null, 2));
  } else {
    imprimirTabla(resultados);
    console.log(
      `\nRESUMEN ${hoy()}:  🔴 ${n('ROJO')} no visibles/borradas · 🟠 ${n('NARANJA')} "cerrada permanentemente" · ` +
      `🟡 ${n('AMARILLO')} "cerrada temporalmente" · 🟢 ${n('VERDE')} visibles y operativas`
    );
    console.log('Recuerda: 🟢 visible ≠ sana. Las suspensiones SUAVES solo se ven en business.google.com.');
  }

  const archivo = path.join(process.cwd(), `fichas_gbp_${hoy()}.csv`);
  fs.writeFileSync(archivo, aCsv(resultados), 'utf8');
  log(`\nCSV: ${archivo}`);

  process.exitCode = n('ROJO') > 0 ? 2 : n('NARANJA') + n('AMARILLO') > 0 ? 1 : 0;
}

/* ------------------------- verificación por place_id ------------------------ */

async function verificarPorPlaceId(of_) {
  const r = await fetch(`https://places.googleapis.com/v1/places/${encodeURIComponent(of_.placeId)}`, {
    headers: { 'X-Goog-Api-Key': KEY, 'X-Goog-FieldMask': FIELDS_LUGAR },
  });

  if (r.status === 404) {
    return fila(of_, 'ROJO', '🔴', 'La ficha YA NO EXISTE en Google Maps (borrada o suspensión dura)');
  }
  await validarRespuesta(r);
  const p = await r.json();
  return clasificarLugar(of_, p);
}

/* ------------------------ descubrimiento por búsqueda ----------------------- */

async function descubrirPorBusqueda(of_) {
  const r = await fetch('https://places.googleapis.com/v1/places:searchText', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': KEY,
      'X-Goog-FieldMask': FIELDS_BUSQUEDA,
    },
    body: JSON.stringify({ textQuery: of_.query, languageCode: 'es' }),
  });
  await validarRespuesta(r);

  const data = await r.json();
  const lugares = data.places || [];
  const match = lugares.find((p) => esNuestra(p.displayName?.text)) || null;

  // Sedes que SABEMOS que no tienen ficha (las cinco del área de Chicago): no
  // encontrarlas es el resultado esperado, no una alarma. Lo que sí es noticia
  // es lo contrario — que alguien haya dado una de alta sin avisar.
  const sinFichaEsperada = !of_.storeCode && !of_.direccionPanel;

  if (!match) {
    return sinFichaEsperada
      ? fila(of_, 'GRIS', '⚪', 'Sin ficha en Google — esperado (pendiente de decisión sobre oficinas virtuales)')
      : fila(of_, 'ROJO', '🔴', 'NO aparece en Maps con esta búsqueda (posible borrado/suspensión dura — confirmar en el panel)');
  }
  if (sinFichaEsperada) {
    const res = clasificarLugar(of_, match);
    res.estado = 'NARANJA';
    res.icono = '🟠';
    res.detalle = 'FICHA NUEVA NO AUTORIZADA: esta sede no debía tener ficha · ' + res.detalle;
    res.placeIdDescubierto = match.id;
    return res;
  }
  const res = clasificarLugar(of_, match);
  res.placeIdDescubierto = match.id;
  return res;
}

function esNuestra(nombre) {
  if (!nombre) return false;
  const n = nombre.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  return n.includes('manuel sol') || n.includes('manual sol'); // cubre el typo real detectado en Bellaire
}

/* -------------------------------- clasificación ----------------------------- */

function clasificarLugar(of_, p) {
  const status = p.businessStatus || 'DESCONOCIDO';
  const rating = p.rating != null ? `${p.rating}★ (${p.userRatingCount ?? 0})` : '—';
  const nombreGoogle = p.displayName?.text || '';

  let nivel, icono, detalle;
  if (status === 'OPERATIONAL') {
    nivel = 'VERDE'; icono = '🟢'; detalle = `Visible y operativa · ${rating}`;
  } else if (status === 'CLOSED_TEMPORARILY') {
    nivel = 'AMARILLO'; icono = '🟡'; detalle = `Marcada "cerrada temporalmente" · ${rating}`;
  } else if (status === 'CLOSED_PERMANENTLY') {
    nivel = 'NARANJA'; icono = '🟠'; detalle = `Marcada "CERRADA PERMANENTEMENTE" (posible edición maliciosa de terceros) · ${rating}`;
  } else {
    nivel = 'GRIS'; icono = '⚪'; detalle = `Estado ${status} · ${rating}`;
  }

  const avisos = [riesgoNombre(nombreGoogle), derivaDireccion(of_, p.formattedAddress)].filter(Boolean);

  return {
    ...fila(of_, nivel, icono, detalle + avisos.map((a) => ' · ' + a).join('')),
    nombreGoogle,
    rating: p.rating ?? null,
    resenas: p.userRatingCount ?? null,
    direccion: p.formattedAddress || '',
    avisos: avisos.join(' | '),
    mapsUri: p.googleMapsUri || '',
    placeId: p.id || of_.placeId || '',
  };
}

/**
 * Nombre del negocio: politica de Google, no gusto propio.
 *
 * La guia exige que el nombre de la ficha sea el nombre REAL del negocio —el de
 * la senalizacion y los documentos legales—, sin descriptores de servicio ni
 * ciudades pegadas. "Abogado de Inmigracion Manuel Solis" mete el servicio
 * dentro del nombre, y eso es keyword stuffing: en la vertical legal es la
 * violacion mas reportada por la competencia, y Google la castiga con reset de
 * nombre o con suspension si viene acompanada de otra —por ejemplo direccion en
 * centro de negocios sin personal, que es el caso de cinco de nuestras sedes.
 *
 * Panel del 2026-08-18: 14 de 15 fichas llevan el nombre con keyword. La unica
 * con el nombre limpio es Amarillo, que ademas es la que esta cerrada.
 */
const NOMBRES_APROBADOS = ['law offices of manuel solis', 'abogados manuel solis'];
const DESCRIPTORES_PROHIBIDOS =
  /\b(abogad[oa]s?|attorney|lawyer|law firm|inmigracion|immigration|accidentes?|accident|criminal|familia|family)\b/i;

function riesgoNombre(nombre) {
  if (!nombre) return '';
  const n = normalizar(nombre);
  if (NOMBRES_APROBADOS.includes(n)) return '';

  // "Abogados Manuel Solis" esta aprobado, asi que el descriptor solo es
  // problema cuando aparece ADEMAS de la marca, no como parte del nombre legal.
  const sinMarca = n.replace(/manuel sol[ii]s?/g, '').trim();
  if (DESCRIPTORES_PROHIBIDOS.test(sinMarca)) {
    return `KEYWORD STUFFING en el nombre: "${nombre}" — viola la guia de nombre de negocio, reportable por cualquier competidor`;
  }
  return `nombre fuera del aprobado: "${nombre}"`;
}

/**
 * Deriva de direccion a tres bandas: lo que devuelve Google hoy, lo que
 * publicaba el panel cuando se levanto este registro, y lo que publica el sitio
 * (OFFICES_NAP). Las tres tienen que decir lo mismo o el NAP local se degrada.
 */
function derivaDireccion(of_, direccionGoogle) {
  if (!direccionGoogle) return '';
  const g = normalizarDireccion(direccionGoogle);
  const avisos = [];

  if (of_.direccionSitio && normalizarDireccion(of_.direccionSitio) !== g) {
    avisos.push(`NAP ROTO: sitio dice "${of_.direccionSitio}" · Google dice "${direccionGoogle}"`);
  }
  if (of_.direccionPanel && normalizarDireccion(of_.direccionPanel) !== g) {
    avisos.push(`cambio desde el panel del 2026-08-18 (era "${of_.direccionPanel}")`);
  }
  if (!of_.direccionSitio) {
    avisos.push('SEDE FANTASMA: ficha sin pagina en el sitio');
  }
  return avisos.join(' · ');
}

/** Compara direcciones ignorando ruido de formato: puntuacion, ste/suite, estado largo vs corto. */
function normalizarDireccion(s) {
  const ESTADOS = { texas: 'tx', california: 'ca', illinois: 'il', colorado: 'co', tennessee: 'tn' };
  let n = normalizar(s)
    .replace(/,/g, ' ')
    .replace(/\./g, '')
    .replace(/#/g, 'ste ')
    .replace(/\b(suite|ste|bldg|building)\b/g, 'ste')
    .replace(/\bunited states\b/g, '');
  for (const [largo, corto] of Object.entries(ESTADOS)) {
    n = n.replace(new RegExp(`\\b${largo}\\b`, 'g'), corto);
  }
  return n.replace(/\s+/g, ' ').trim();
}

function normalizar(s) {
  return String(s ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
}

function fila(of_, estado, icono, detalle) {
  return {
    estado,
    icono,
    nombre: of_.nombre,
    storeCode: of_.storeCode || '-',
    slug: of_.slug || '',
    query: of_.query || '',
    nota: of_.nota || '',
    detalle,
  };
}

/* --------------------------------- helpers ---------------------------------- */

async function validarRespuesta(r) {
  if (r.ok) return;
  const cuerpo = await r.text();
  let pista = '';
  if (r.status === 403 || /REQUEST_DENIED|PERMISSION_DENIED/i.test(cuerpo)) {
    pista =
      '\nPista: (a) la key tiene restricción de referrer HTTP (crea una key de SERVIDOR nueva en el mismo proyecto), ' +
      'o (b) falta habilitar "Places API (New)" en el proyecto GCP — es un clic, sin aprobación.';
  }
  throw new Error(`HTTP ${r.status}: ${cuerpo}${pista}`);
}

function imprimirTabla(filas) {
  const cab = ['', 'ESTADO', 'CODIGO', 'OFICINA', 'DETALLE'];
  const datos = filas.map((f) => [f.icono, f.estado, f.storeCode, recortar(f.nombre, 32), recortar(f.detalle, 96)]);
  const anchos = cab.map((c, i) => Math.max(c.length, ...datos.map((d) => [...d[i]].length)));
  const linea = (cols) => cols.map((c, i) => c.padEnd(anchos[i])).join('  ');
  console.log(linea(cab));
  console.log(anchos.map((a) => '-'.repeat(a)).join('  '));
  for (const d of datos) console.log(linea(d));
}

function aCsv(filas) {
  const esc = (v) => '"' + String(v ?? '').replace(/"/g, '""') + '"';
  const cab = ['estado', 'storeCode', 'slug', 'nombre', 'nombreGoogle', 'direccion', 'avisos', 'detalle', 'rating', 'resenas', 'placeId', 'mapsUri', 'nota'];
  return '\uFEFF' + cab.join(',') + '\n' + filas.map((f) => cab.map((c) => esc(f[c])).join(',')).join('\n') + '\n';
}

function buscarConfig() {
  const candidatos = [
    path.join(process.cwd(), 'oficinas-gbp.json'),
    path.join(path.dirname(new URL(import.meta.url).pathname), 'oficinas-gbp.json'),
  ];
  return candidatos.find((p) => fs.existsSync(p)) || null;
}

function cargarEnv(nombre) {
  const p = path.join(process.cwd(), nombre);
  if (!fs.existsSync(p)) return;
  for (const linea of fs.readFileSync(p, 'utf8').split(/\r?\n/)) {
    const m = linea.match(/^\s*([A-Za-z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !(m[1] in process.env)) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
}

function recortar(s, max) {
  s = String(s ?? '');
  return [...s].length > max ? [...s].slice(0, max - 1).join('') + '…' : s;
}
function hoy() { return new Date().toISOString().slice(0, 10); }
function pausa(ms) { return new Promise((res) => setTimeout(res, ms)); }
function log(m) { if (!MODO_JSON) console.log(m); }
