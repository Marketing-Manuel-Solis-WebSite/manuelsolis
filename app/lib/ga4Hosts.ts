/**
 * Hosts donde se configura GA4 (propiedad 395596942). Los filtros de datos
 * de GA4 no filtran por hostname, así que el corte se hace aquí: en
 * cualquier otro host —localhost, 127.0.0.1, *.local, *.pages.dev,
 * *.vercel.app (previews)— ni se carga gtag.js ni sale gtag('event', …).
 *
 * El apex va en la lista por si algo carga antes de la redirección a www.
 * Solo afecta a GA4: Meta, TikTok, CallRail, Hyros y BoSpot no miran el host.
 */
export const GA4_ALLOWED_HOSTS: readonly string[] = [
  'www.manuelsolis.com',
  'manuelsolis.com',
];

export function isGa4AllowedHost(hostname: string): boolean {
  return GA4_ALLOWED_HOSTS.includes(hostname.toLowerCase().replace(/\.$/, ''));
}

/** Lo mismo, leído del navegador. false en el servidor. */
export function isGa4AllowedLocation(): boolean {
  return typeof window !== 'undefined' && isGa4AllowedHost(window.location.hostname);
}
