// ============================================================
// Bunny Stream — vídeos alojados fuera de YouTube
// ============================================================
// El tutorial del portal de clientes no está en YouTube: vive en una
// biblioteca de Bunny Stream (player.mediadelivery.net). Este módulo es la
// única fuente de sus IDs, para que el reproductor (<BunnyVideo>) y el
// VideoObject (videoSchema.ts) no puedan apuntar a vídeos distintos.
//
// La biblioteca restringe por dominio (Security → Allowed Domains): los
// archivos del CDN (vz-*.b-cdn.net) responden 403 a quien no venga de un
// dominio permitido. Por eso la portada NO se carga desde Bunny sino desde
// public/videos/: next/image y Googlebot la piden sin Referer y la recibirían
// como 403. Si se cambia la portada en Bunny, hay que volver a descargarla.
//
// No activar "Token Authentication" en la biblioteca: el embed necesitaría
// una URL firmada en servidor y la página dejaría de ser estática.
// ============================================================

export interface BunnyVideoRef {
  /** ID numérico de la biblioteca de Bunny Stream. */
  libraryId: string;
  /** GUID del vídeo dentro de la biblioteca. */
  videoId: string;
}

/** URL del reproductor de Bunny, sin parámetros: la canónica para el schema. */
export function bunnyEmbedUrl({ libraryId, videoId }: BunnyVideoRef): string {
  return `https://player.mediadelivery.net/embed/${libraryId}/${videoId}`;
}

/** "01_Portal_del_cliente.mp4": tutorial de 41 s del portal de clientes. */
export const PORTAL_TUTORIAL_VIDEO: BunnyVideoRef = {
  libraryId: '743829',
  videoId: 'cb7e7023-9886-4d12-9c42-4f9671837d45',
};
