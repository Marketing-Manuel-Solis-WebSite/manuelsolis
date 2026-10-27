import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

/**
 * Política de caché de getPlaceData(): solo los resultados válidos se guardan
 * 24h; un fallo devuelve null sin quedar en la caché de datos y solo se
 * recuerda 5 minutos en memoria. Antes el null se cacheaba 24h y un 403
 * pasajero dejaba el sitio un día entero sin rating.
 *
 * unstable_cache se sustituye por un doble con la semántica que importa aquí:
 * guarda lo que resuelve y NO guarda lo que lanza, igual que Next.
 */

const store = vi.hoisted(() => new Map<string, unknown>());

vi.mock('next/cache', () => ({
  unstable_cache:
    <A extends unknown[], R>(fn: (...args: A) => Promise<R>, keyParts: string[]) =>
    async (...args: A): Promise<R> => {
      const key = JSON.stringify([keyParts, args]);
      if (store.has(key)) return store.get(key) as R;
      const value = await fn(...args);
      store.set(key, value);
      return value;
    },
  revalidateTag: () => {},
  revalidatePath: () => {},
}));

const OK = {
  ok: true,
  status: 200,
  json: () => Promise.resolve({ id: 'p', rating: 4.6, userRatingCount: 900, reviews: [] }),
} as unknown as Response;
const FORBIDDEN = { ok: false, status: 403, json: () => Promise.resolve({}) } as unknown as Response;

const ORIGINAL_KEY = process.env.GOOGLE_PLACES_API_KEY;

async function load() {
  vi.resetModules();
  return import('../app/lib/googleReviews');
}

beforeEach(() => {
  store.clear();
  process.env.GOOGLE_PLACES_API_KEY = 'test-key';
  vi.spyOn(console, 'warn').mockImplementation(() => {});
  vi.useFakeTimers({ toFake: ['Date'] });
  vi.setSystemTime(new Date('2026-10-27T12:00:00Z'));
});

afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  process.env.GOOGLE_PLACES_API_KEY = ORIGINAL_KEY;
});

describe('getPlaceData — caché', () => {
  it('cachea un resultado válido: la segunda llamada no vuelve a Google', async () => {
    const fetchMock = vi.fn().mockResolvedValue(OK);
    vi.stubGlobal('fetch', fetchMock);
    const { getPlaceData } = await load();

    expect((await getPlaceData('ChIJ_ok'))?.rating).toBe(4.6);
    expect((await getPlaceData('ChIJ_ok'))?.rating).toBe(4.6);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('un fallo no se cachea: pasados 5 minutos se reintenta y el éxito sí entra', async () => {
    const fetchMock = vi.fn().mockResolvedValueOnce(FORBIDDEN).mockResolvedValue(OK);
    vi.stubGlobal('fetch', fetchMock);
    const { getPlaceData } = await load();

    expect(await getPlaceData('ChIJ_flaky')).toBeNull();
    expect(store.size).toBe(0);

    // Dentro de la ventana de 5 min: null de memoria, sin pedir otra vez.
    vi.setSystemTime(new Date('2026-10-27T12:04:59Z'));
    expect(await getPlaceData('ChIJ_flaky')).toBeNull();
    expect(fetchMock).toHaveBeenCalledTimes(1);

    vi.setSystemTime(new Date('2026-10-27T12:05:00Z'));
    expect((await getPlaceData('ChIJ_flaky'))?.userRatingCount).toBe(900);
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(store.size).toBe(1);

    expect((await getPlaceData('ChIJ_flaky'))?.userRatingCount).toBe(900);
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it('sin clave devuelve null sin lanzar y sin cachear (el build sigue funcionando)', async () => {
    delete process.env.GOOGLE_PLACES_API_KEY;
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
    const { getPlaceData, getAggregatedRating } = await load();

    await expect(getPlaceData('ChIJ_nokey')).resolves.toBeNull();
    await expect(getAggregatedRating(['ChIJ_a', 'ChIJ_b'])).resolves.toBeNull();
    expect(fetchMock).not.toHaveBeenCalled();
    expect(store.size).toBe(0);
  });

  it('el fallo de un Place ID no afecta al resto', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockImplementation(async (url: string) => (url.endsWith('ChIJ_bad') ? FORBIDDEN : OK)),
    );
    const { getPlaceData } = await load();

    expect(await getPlaceData('ChIJ_bad')).toBeNull();
    expect((await getPlaceData('ChIJ_good'))?.rating).toBe(4.6);
  });
});
