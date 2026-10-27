/**
 * Remitente del boletín. Lo comparten el blast y el correo de bienvenida de
 * /api/newsletter/subscribe para que no puedan divergir.
 */
export const DEFAULT_FROM_ADDRESS = 'Manuel Solis Law <newsletter@manuelsolis.com>';

export function getFromAddress(): string {
  return process.env.NEWSLETTER_FROM_ADDRESS || DEFAULT_FROM_ADDRESS;
}
