/**
 * Hyros — validación de la URL del universal script (alta 2026-10-08).
 *
 * La URL llega por NEXT_PUBLIC_HYROS_SRC y se interpola en un <script>, así que
 * solo se acepta si es exactamente un universal script de Hyros: https, host
 * `<id-numérico>.t.hyros.com` (el que autoriza la CSP), la ruta oficial y sin
 * `ref_url`, que se añade en el navegador con la URL de aterrizaje. Cualquier
 * otra cosa devuelve null y el script no se monta.
 */
export function validHyrosSrc(raw: string | undefined | null): string | null {
  if (!raw) return null;
  try {
    const url = new URL(raw.trim());
    const ok =
      url.protocol === 'https:' &&
      /^[0-9]+\.t\.hyros\.com$/.test(url.hostname) &&
      url.port === '' &&
      url.username === '' &&
      url.password === '' &&
      url.pathname === '/v1/lst/universal-script' &&
      url.searchParams.has('ph') &&
      !url.searchParams.has('ref_url') &&
      url.hash === '';
    return ok ? url.toString() : null;
  } catch {
    return null;
  }
}
