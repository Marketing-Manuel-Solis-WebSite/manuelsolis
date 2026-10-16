import { describe, it, expect } from 'vitest';
import {
  ACCESO_CLIENTES_PAGE_VIDEOS,
  HOME_PAGE_VIDEOS,
  buildPageVideoSchemas,
} from '../app/lib/videoSchema';
import { SECURITY_HEADERS } from '../app/lib/securityHeaders';

/**
 * El tutorial de /acceso-clientes es el primer vídeo que no está en YouTube.
 * Lo que vigilan estas pruebas es que el VideoObject de Bunny apunte al
 * reproductor y NO declare un contentUrl (los archivos del CDN responden 403 a
 * Googlebot), y que el vídeo pueda incrustarse sin que la CSP lo bloquee.
 */
describe('VideoObject de Bunny Stream', () => {
  const [es] = buildPageVideoSchemas({
    videos: ACCESO_CLIENTES_PAGE_VIDEOS,
    lang: 'es',
    pagePath: '/es/acceso-clientes',
  });

  it('se emite con el embedUrl del reproductor de Bunny y sin contentUrl', () => {
    expect(es).toBeDefined();
    expect(es.embedUrl).toBe(
      'https://player.mediadelivery.net/embed/743829/cb7e7023-9886-4d12-9c42-4f9671837d45'
    );
    expect(es).not.toHaveProperty('contentUrl');
    expect(es.uploadDate).toBe('2026-10-12');
    expect(es.duration).toBe('PT41S');
    expect(es.url).toBe('https://www.manuelsolis.com/es/acceso-clientes');
  });

  it('la miniatura sale de public/, no del CDN restringido de Bunny', () => {
    expect(es.thumbnailUrl).toEqual(['https://www.manuelsolis.com/videos/tutorial-portal-clientes.jpg']);
  });

  it('la CSP deja incrustar el reproductor de Bunny', () => {
    const csp = SECURITY_HEADERS.find((h) => h.key === 'Content-Security-Policy')?.value ?? '';
    const frameSrc = csp.split(';').find((d) => d.trim().startsWith('frame-src')) ?? '';
    expect(frameSrc).toContain('https://player.mediadelivery.net');
  });
});

describe('VideoObject de YouTube (sin cambios)', () => {
  it('sigue declarando embedUrl y contentUrl de YouTube', () => {
    const [ep5] = buildPageVideoSchemas({ videos: HOME_PAGE_VIDEOS, lang: 'es', pagePath: '/es' });
    expect(ep5.embedUrl).toBe('https://www.youtube.com/embed/E4scFUVVHJo');
    expect(ep5.contentUrl).toBe('https://www.youtube.com/watch?v=E4scFUVVHJo');
  });
});
