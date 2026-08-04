/**
 * `fetch` con tope de tiempo, compatible con los navegadores que de verdad usan
 * los clientes del despacho.
 *
 * NO se usa `AbortSignal.timeout()`: llegó en Safari 16 / iOS 16 (2022) y en
 * Chrome 103, así que en un iPhone con iOS 15 la llamada lanza TypeError ANTES
 * de construir la petición. En el formulario de captación eso significaba que el
 * envío no salía y el lead se perdía entero, no que expirara. `AbortController`
 * existe desde Safari 12.1 y cubre todo el parque real de dispositivos.
 */

/** Se distingue de un fallo de red para poder avisar al usuario de otra forma. */
export class FetchTimeoutError extends Error {
  constructor(timeoutMs: number) {
    super(`La petición superó ${timeoutMs} ms`);
    this.name = 'FetchTimeoutError';
  }
}

export async function fetchWithTimeout(
  input: string,
  init: RequestInit,
  timeoutMs: number,
): Promise<Response> {
  if (typeof AbortController === 'undefined') {
    // Sin AbortController no hay forma de cortar, pero enviar sin tope es mucho
    // mejor que no enviar: el usuario conserva la vía de recuperación del CRM.
    return fetch(input, init);
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(input, { ...init, signal: controller.signal });
  } catch (error) {
    if (controller.signal.aborted) throw new FetchTimeoutError(timeoutMs);
    throw error;
  } finally {
    clearTimeout(timer);
  }
}
