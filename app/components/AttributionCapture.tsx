'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { captureAttribution } from '../lib/attribution';

/**
 * Captura de atribución (first_touch + last_touch).
 *
 * Se monta una sola vez en el layout (`app/[lang]/layout.tsx`) y corre
 * en el cliente cada vez que cambia la ruta o el query string. Esto
 * garantiza que:
 *   - Un visitante que llega con `?utm_source=newsletter` queda
 *     atribuido en cookie ANTES de la primera conversión.
 *   - Una navegación interna posterior NO pisa el first_touch.
 *   - Si en la misma sesión recibe otro UTM (raro pero posible: abre
 *     un email desde otra pestaña), el last_touch se actualiza.
 *
 * Componente invisible. No renderiza nada.
 */
export default function AttributionCapture() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    try {
      captureAttribution();
    } catch {
      // Tracking nunca debe romper la página.
    }
    // Dependemos del par (pathname, searchParams) para reaccionar tanto
    // a navegación de ruta como a cambios de query string del mismo path.
  }, [pathname, searchParams]);

  return null;
}
