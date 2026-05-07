'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { trackPageView } from '../lib/tracking';

/**
 * Dispara `trackPageView` en el primer render y en cada cambio de
 * pathname o querystring (porque las UTMs viven en el querystring y
 * deben quedar registradas en /api/conversions).
 *
 * Excluye explícitamente el panel /admin y rutas de API/sitemap.
 */
export default function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname) return;
    if (pathname.startsWith('/api')) return;
    // /es/admin, /en/admin, /admin etc.
    if (/\/admin(\/|$)/.test(pathname)) return;
    if (pathname.endsWith('.xml') || pathname.endsWith('.txt')) return;
    trackPageView();
  }, [pathname, searchParams]);

  return null;
}
