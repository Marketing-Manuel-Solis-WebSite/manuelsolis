/**
 * Rutas donde no se carga ni se dispara ningún rastreo (píxeles, Hyros,
 * analítica, conversiones):
 *   - el panel interno: /admin, /es/admin, /en/admin y cualquier subruta;
 *   - la baja del boletín (/es|en/newsletter/unsubscribe): su URL lleva el
 *     correo del suscriptor y el token de baja (?email=…&t=…), y cualquier
 *     evento de esa página viajaría con la URL completa.
 *
 * Se aplica al pathname, así que el query string no afecta a la decisión.
 */
export function isUntrackedPath(pathname: string): boolean {
  return /\/admin(\/|$)/.test(pathname) || /\/newsletter\/unsubscribe(\/|$)/.test(pathname);
}

/** Lo mismo, leído del navegador. false en el servidor. */
export function isUntrackedLocation(): boolean {
  return typeof window !== 'undefined' && isUntrackedPath(window.location.pathname);
}
