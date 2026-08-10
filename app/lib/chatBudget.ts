import { head, put } from '@vercel/blob';
import { firmToday } from './blogSchedule';

/**
 * Techo diario de uso del chat, compartido entre todas las instancias.
 *
 * ⚠️ **Qué protege y qué no.** Esto limita el gasto que se puede provocar
 * *a través de este sitio*. NO protege la clave: quien tenga la clave llama a
 * Anthropic directamente y este archivo le da igual. Para eso solo hay dos
 * cosas, y las dos están fuera del código: rotar la clave, o poner un límite de
 * gasto en la consola de Anthropic. Que exista este techo no sustituye a
 * ninguna de las dos.
 *
 * Por qué hacía falta de todos modos: los límites que ya había son por IP y
 * viven en la memoria de cada instancia (ver app/lib/rateLimit.ts). Eso frena a
 * un visitante insistente y no frena nada más — mil IPs distintas, o un ataque
 * que las rote, pasaban sin tope alguno. No existía ningún límite global.
 *
 * Cómo cuenta, y por qué así:
 *
 *   · El contador vive en Vercel Blob para que lo compartan todas las
 *     instancias. Un contador en memoria no sirve: hay varias instancias vivas
 *     y cada una creería tener el presupuesto entero.
 *   · No se escribe en Blob en cada mensaje. Cada instancia cuenta en memoria y
 *     vuelca cada 10 mensajes o cada 60 segundos. Un ida y vuelta a Blob por
 *     mensaje añadiría cientos de milisegundos a la primera palabra de la
 *     respuesta, que es justo donde se nota.
 *   · El recuento es aproximado por ese motivo: entre volcados se puede pasar
 *     por unos pocos mensajes por instancia. Da igual — esto es una red de
 *     seguridad para que una factura no se vaya a mil dólares, no contabilidad.
 *
 * Coste de referencia, medido en producción: ~2.150 tokens de entrada y hasta
 * 700 de salida por mensaje, unos 0,0035 USD. Con el techo por defecto de 2.000
 * mensajes al día, el peor caso ronda los 7 USD diarios.
 */

const STATE_PATH = 'chat-budget/daily.json';

/** Techo por defecto. Se sube con CHAT_DAILY_MESSAGE_BUDGET sin tocar código. */
const DEFAULT_DAILY_BUDGET = 2000;

/** Cada cuántos mensajes se vuelca el contador local al almacén compartido. */
const FLUSH_EVERY_MESSAGES = 10;

/** …o cada cuánto, si el tráfico es tan bajo que no se llega a esa cuenta. */
const FLUSH_EVERY_MS = 60_000;

/**
 * Cuánto puede gastar UNA instancia cuando el almacén no responde.
 *
 * Si Blob se cae, negar todo el chat dejaría al sitio sin su canal de contacto
 * por una avería ajena, y dejarlo pasar sin tope quitaría el techo justo en el
 * momento en que nadie lo vigila. Así que se sigue atendiendo, pero cada
 * instancia se autolimita a esta fracción del presupuesto.
 */
const OFFLINE_FRACTION = 0.25;

function dailyBudget(): number {
  const raw = Number(process.env.CHAT_DAILY_MESSAGE_BUDGET);
  return Number.isFinite(raw) && raw > 0 ? Math.floor(raw) : DEFAULT_DAILY_BUDGET;
}

// ── Estado en memoria de ESTA instancia ──
let day = '';
/** Último total conocido del almacén compartido. */
let syncedTotal = 0;
/** Mensajes contados aquí y aún no volcados. */
let pendingLocal = 0;
/** Mensajes atendidos por esta instancia hoy, volcados o no. */
let servedHere = 0;
let lastFlush = 0;
let storeOffline = false;

type BudgetState = { day: string; count: number };

/**
 * Lectura del contador compartido.
 *
 * Distingue tres cosas que NO son lo mismo, y confundir dos de ellas fue un
 * error real: **que el archivo no exista todavía es lo normal**, pasa en el
 * primer mensaje de cada día. Tratarlo como avería metía al sistema en modo
 * degradado a diario, o sea que el techo efectivo pasaba a ser la cuarta parte
 * del configurado todas las mañanas. Solo un almacén que no responde es avería.
 */
type SharedRead =
  | { kind: 'ok'; count: number }
  | { kind: 'missing' }
  | { kind: 'error' };

async function readShared(today: string): Promise<SharedRead> {
  let url: string;
  try {
    // `head` consulta la API y devuelve la URL; el contenido se baja del CDN,
    // que cachea un mínimo de 60 s. Con volcados cada 60 s ese desfase es del
    // mismo orden que la propia cadencia, así que no se corrige: corregirlo
    // costaría una escritura por mensaje.
    const meta = await head(STATE_PATH);
    url = meta.url;
  } catch (error) {
    // BlobNotFoundError significa "aún no hay contador de hoy", no "avería".
    // Se compara por nombre para no acoplar esto a la clase concreta del SDK.
    const name = error instanceof Error ? error.name : '';
    const msg = error instanceof Error ? error.message : '';
    if (/NotFound|not found|no existe/i.test(`${name} ${msg}`)) return { kind: 'missing' };
    return { kind: 'error' };
  }

  try {
    const res = await fetch(`${url}?t=${Date.now()}`, { cache: 'no-store' });
    if (!res.ok) return res.status === 404 ? { kind: 'missing' } : { kind: 'error' };
    const state = (await res.json()) as BudgetState;
    // Un contador de ayer vale cero: el presupuesto es diario.
    return { kind: 'ok', count: state.day === today ? state.count : 0 };
  } catch {
    return { kind: 'error' };
  }
}

async function writeShared(today: string, count: number): Promise<boolean> {
  try {
    await put(STATE_PATH, JSON.stringify({ day: today, count } satisfies BudgetState), {
      access: 'public',
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: 'application/json',
      cacheControlMaxAge: 60,
    });
    return true;
  } catch {
    return false;
  }
}

async function flush(today: string): Promise<void> {
  if (pendingLocal === 0) return;
  const shared = await readShared(today);
  // Si no se pudo leer, se parte del último total conocido en vez de perderlo:
  // subestimar el consumo es lo único que no se puede permitir aquí.
  const base = shared.kind === 'ok' ? shared.count : shared.kind === 'missing' ? 0 : syncedTotal;
  const total = base + pendingLocal;
  const ok = await writeShared(today, total);
  if (ok) {
    syncedTotal = total;
    pendingLocal = 0;
    storeOffline = false;
  } else {
    storeOffline = true;
  }
  lastFlush = Date.now();
}

export type BudgetDecision = {
  allowed: boolean;
  /** Total conocido tras contar este mensaje. Aproximado; ver el docblock. */
  used: number;
  budget: number;
  /** true cuando el almacén compartido no responde y se aplica el tope local. */
  degraded: boolean;
};

/**
 * Cuenta un mensaje y dice si se puede atender.
 *
 * Se llama DESPUÉS de los límites por IP —que son gratis— y antes de hablar con
 * Anthropic, que es lo que cuesta dinero.
 */
export async function reserveChatMessage(now: Date = new Date()): Promise<BudgetDecision> {
  const today = firmToday(now);
  const budget = dailyBudget();

  // Día nuevo: se reinicia todo, incluido el recuerdo de que el almacén fallaba.
  if (today !== day) {
    day = today;
    syncedTotal = 0;
    pendingLocal = 0;
    servedHere = 0;
    lastFlush = 0;
    storeOffline = false;
    const shared = await readShared(today);
    // 'missing' es el caso normal del primer mensaje del día: se empieza en cero.
    // Solo 'error' es avería.
    if (shared.kind === 'error') storeOffline = true;
    else if (shared.kind === 'ok') syncedTotal = shared.count;
  }

  // Con el almacén caído se aplica el tope de esta instancia y no el global:
  // es lo único que se puede saber con certeza sin él.
  if (storeOffline) {
    const localCap = Math.floor(budget * OFFLINE_FRACTION);
    if (servedHere >= localCap) {
      return { allowed: false, used: servedHere, budget: localCap, degraded: true };
    }
    servedHere++;
    pendingLocal++;
    // Se reintenta el volcado de vez en cuando por si el almacén ya volvió.
    if (Date.now() - lastFlush > FLUSH_EVERY_MS) await flush(today);
    return { allowed: true, used: servedHere, budget: localCap, degraded: true };
  }

  const usedNow = syncedTotal + pendingLocal;
  if (usedNow >= budget) {
    // Antes de negar, una última sincronización: puede que el total conocido
    // esté viejo por otra instancia, o que el día acabe de cambiar.
    await flush(today);
    if (syncedTotal + pendingLocal >= budget) {
      return { allowed: false, used: syncedTotal + pendingLocal, budget, degraded: false };
    }
  }

  servedHere++;
  pendingLocal++;
  if (pendingLocal >= FLUSH_EVERY_MESSAGES || Date.now() - lastFlush > FLUSH_EVERY_MS) {
    await flush(today);
  }

  return { allowed: true, used: syncedTotal + pendingLocal, budget, degraded: false };
}

/** Solo para las pruebas: vacía el estado en memoria. */
export function __resetChatBudgetForTests(): void {
  day = '';
  syncedTotal = 0;
  pendingLocal = 0;
  servedHere = 0;
  lastFlush = 0;
  storeOffline = false;
}
