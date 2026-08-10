import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

/**
 * El techo diario del chat.
 *
 * Se prueba con Vercel Blob simulado porque lo que importa aquí no es Blob: es
 * que el tope **cierre** cuando se agota, que **reinicie** al cambiar el día, y
 * sobre todo que una caída del almacén no deje el gasto sin límite ni tumbe el
 * chat entero. Ese último caso es el que no se puede probar en producción.
 */

let stored: { day: string; count: number } | null = null;
let failStore = false;
let putCalls = 0;

/** Imita BlobNotFoundError: el SDK lanza un error con ese nombre. */
class NotFound extends Error {
  constructor() {
    super('The requested blob does not exist');
    this.name = 'BlobNotFoundError';
  }
}

vi.mock('@vercel/blob', () => ({
  head: async () => {
    // Una avería del almacén y un contador que aún no existe son cosas
    // distintas, y el módulo tiene que distinguirlas: si confunde "todavía no
    // hay contador de hoy" con "Blob caído", entra en modo degradado cada
    // mañana y el techo real pasa a ser la cuarta parte del configurado.
    if (failStore) throw new Error('blob caído: ECONNREFUSED');
    if (!stored) throw new NotFound();
    return { url: 'https://blob.test/chat-budget/daily.json', etag: 'x' };
  },
  put: async (_path: string, body: string) => {
    putCalls++;
    if (failStore) throw new Error('blob caído');
    stored = JSON.parse(body);
    return { url: 'https://blob.test/chat-budget/daily.json' };
  },
}));

// `readShared` baja el contenido con fetch desde la URL del blob.
const realFetch = globalThis.fetch;
beforeEach(async () => {
  stored = null;
  failStore = false;
  putCalls = 0;
  process.env.CHAT_DAILY_MESSAGE_BUDGET = '20';
  globalThis.fetch = (async () => {
    if (failStore || !stored) return { ok: false } as Response;
    return { ok: true, json: async () => stored } as unknown as Response;
  }) as typeof fetch;
  const mod = await import('../app/lib/chatBudget');
  mod.__resetChatBudgetForTests();
});

afterEach(() => {
  globalThis.fetch = realFetch;
  delete process.env.CHAT_DAILY_MESSAGE_BUDGET;
});

/** Mediodía en Houston, para que firmToday() no dependa del huso del CI. */
function alMediodia(dia: string): Date {
  return new Date(`${dia}T18:00:00Z`);
}

describe('techo diario del chat', () => {
  it('deja pasar mientras haya presupuesto', async () => {
    const { reserveChatMessage } = await import('../app/lib/chatBudget');
    const hoy = alMediodia('2026-08-10');
    for (let i = 0; i < 20; i++) {
      const d = await reserveChatMessage(hoy);
      expect(d.allowed, `mensaje ${i + 1} de 20`).toBe(true);
      expect(d.budget).toBe(20);
    }
  });

  it('cierra al agotarlo', async () => {
    const { reserveChatMessage } = await import('../app/lib/chatBudget');
    const hoy = alMediodia('2026-08-10');
    for (let i = 0; i < 20; i++) await reserveChatMessage(hoy);

    const d = await reserveChatMessage(hoy);
    expect(d.allowed).toBe(false);
    expect(d.used).toBeGreaterThanOrEqual(20);
    expect(d.degraded).toBe(false);
  });

  it('sigue cerrado en los intentos siguientes, no solo en el primero', async () => {
    const { reserveChatMessage } = await import('../app/lib/chatBudget');
    const hoy = alMediodia('2026-08-10');
    for (let i = 0; i < 25; i++) await reserveChatMessage(hoy);
    for (let i = 0; i < 3; i++) {
      expect((await reserveChatMessage(hoy)).allowed).toBe(false);
    }
  });

  it('reinicia al cambiar el día', async () => {
    const { reserveChatMessage } = await import('../app/lib/chatBudget');
    for (let i = 0; i < 25; i++) await reserveChatMessage(alMediodia('2026-08-10'));
    expect((await reserveChatMessage(alMediodia('2026-08-10'))).allowed).toBe(false);

    const manana = await reserveChatMessage(alMediodia('2026-08-11'));
    expect(manana.allowed).toBe(true);
    expect(manana.used).toBe(1);
  });

  it('no escribe en el almacén en cada mensaje', async () => {
    // Un ida y vuelta por mensaje añadiría cientos de ms a la primera palabra
    // de la respuesta. Con volcado cada 10, veinte mensajes son 2 escrituras.
    const { reserveChatMessage } = await import('../app/lib/chatBudget');
    const hoy = alMediodia('2026-08-10');
    for (let i = 0; i < 20; i++) await reserveChatMessage(hoy);
    expect(putCalls).toBeLessThanOrEqual(3);
    expect(putCalls).toBeGreaterThan(0);
  });

  it('comparte la cuenta entre instancias a través del almacén', async () => {
    const { reserveChatMessage, __resetChatBudgetForTests } = await import('../app/lib/chatBudget');
    const hoy = alMediodia('2026-08-10');
    // Instancia A gasta 15 y vuelca.
    for (let i = 0; i < 15; i++) await reserveChatMessage(hoy);
    expect(stored?.count).toBeGreaterThanOrEqual(10);

    // Instancia B arranca en frío: debe heredar lo gastado, no empezar de cero.
    __resetChatBudgetForTests();
    const d = await reserveChatMessage(hoy);
    expect(d.used).toBeGreaterThan(10);
  });
});

describe('cuando el almacén no responde', () => {
  it('no tumba el chat: sigue atendiendo', async () => {
    const { reserveChatMessage } = await import('../app/lib/chatBudget');
    failStore = true;
    const d = await reserveChatMessage(alMediodia('2026-08-10'));
    expect(d.allowed).toBe(true);
    expect(d.degraded).toBe(true);
  });

  it('pero tampoco deja el gasto sin tope', async () => {
    // Sin almacén no se puede saber el total global, así que cada instancia se
    // autolimita a una cuarta parte del presupuesto (20 * 0,25 = 5).
    const { reserveChatMessage } = await import('../app/lib/chatBudget');
    failStore = true;
    const hoy = alMediodia('2026-08-10');
    for (let i = 0; i < 5; i++) {
      expect((await reserveChatMessage(hoy)).allowed, `mensaje ${i + 1}`).toBe(true);
    }
    const d = await reserveChatMessage(hoy);
    expect(d.allowed).toBe(false);
    expect(d.degraded).toBe(true);
    expect(d.budget).toBe(5);
  });
});

describe('configuración', () => {
  it('respeta CHAT_DAILY_MESSAGE_BUDGET', async () => {
    process.env.CHAT_DAILY_MESSAGE_BUDGET = '3';
    const { reserveChatMessage, __resetChatBudgetForTests } = await import('../app/lib/chatBudget');
    __resetChatBudgetForTests();
    const hoy = alMediodia('2026-08-10');
    for (let i = 0; i < 3; i++) expect((await reserveChatMessage(hoy)).allowed).toBe(true);
    expect((await reserveChatMessage(hoy)).allowed).toBe(false);
  });

  it('con un valor basura cae al de por defecto en vez de quedarse sin tope', async () => {
    for (const basura of ['', 'abc', '0', '-5']) {
      process.env.CHAT_DAILY_MESSAGE_BUDGET = basura;
      const { reserveChatMessage, __resetChatBudgetForTests } = await import('../app/lib/chatBudget');
      __resetChatBudgetForTests();
      const d = await reserveChatMessage(alMediodia('2026-08-10'));
      expect(d.budget, `con "${basura}"`).toBe(2000);
    }
  });
});
