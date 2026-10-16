// ============================================================
// VideoObject JSON-LD — vídeos de YouTube que el sitio ya publica
// ============================================================
// El sitio incrusta 7 vídeos reales de YouTube (6 testimonios de cliente en
// /testimonios y el episodio de "Uniendo Familias" de la portada) sin ningún
// dato estructurado, así que no son elegibles para el carrusel de vídeo de
// Google ni para la miniatura con reproductor en los resultados.
//
// `uploadDate` es propiedad OBLIGATORIA del VideoObject para Google y no está
// en ningún dato del repo: solo la conoce el canal. Las que hay en el catálogo
// se leyeron del `itemprop="uploadDate"` que YouTube publica en el HTML de cada
// vídeo, así que son las reales — no estimaciones ni fechas de commit. Si algún
// día se añade un vídeo sin ella, el emisor devuelve null y ese vídeo no se
// marca: es preferible no ser elegible a declarar una fecha falsa.
//
// Bunny Stream (alta 2026-10-16): el tutorial de /acceso-clientes no está en
// YouTube sino en Bunny (ver app/lib/bunnyStream.ts). Esos vídeos solo llevan
// `embedUrl`: los archivos del CDN están restringidos por dominio y Googlebot
// recibiría 403 en un `contentUrl`. Google exige uno de los dos, no ambos.
// ============================================================

import { ORG_REF } from './schemaOrg';
import { bunnyEmbedUrl, PORTAL_TUTORIAL_VIDEO, type BunnyVideoRef } from './bunnyStream';

const SITE_URL = 'https://www.manuelsolis.com';

export type VideoLang = 'es' | 'en';

interface LocalizedText {
  es: string;
  en: string;
}

/**
 * Dónde está alojado el vídeo: de ahí salen embedUrl y, en YouTube, contentUrl.
 * Exactamente uno de los dos.
 */
export type VideoHost =
  | { youtubeId: string; bunny?: undefined }
  | { bunny: BunnyVideoRef; youtubeId?: undefined };

function hostUrls(host: VideoHost): { embedUrl: string; contentUrl?: string } {
  if (host.bunny) return { embedUrl: bunnyEmbedUrl(host.bunny) };
  return {
    embedUrl: `https://www.youtube.com/embed/${host.youtubeId}`,
    contentUrl: `https://www.youtube.com/watch?v=${host.youtubeId}`,
  };
}

export type VideoObjectInput = VideoHost & {
  name: string;
  description: string;
  /**
   * Ruta en public/ ('/testimonials/YV01.png') o URL absoluta
   * (img.youtube.com). Las rutas de public/ las verifica el test
   * "toda ruta de asset del código existe en public/" de contentHygiene.
   */
  thumbnailUrl: string;
  /** Fecha de subida REAL a la plataforma, ISO 8601. Sin ella no se emite schema. */
  uploadDate: string | null;
  /** Duración ISO 8601 ('PT4M12S'). Se omite mientras no se conozca. */
  duration?: string;
  /** Página del sitio donde el vídeo se reproduce: '/es/testimonios'. */
  pagePath?: string;
  /** Idioma del audio, no de la página. Solo si está documentado. */
  inLanguage?: string;
};

/** Fecha o fecha-hora ISO 8601: '2026-03-14' o '2026-03-14T10:00:00-05:00'. */
const ISO_DATE = /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}(:\d{2})?(\.\d+)?(Z|[+-]\d{2}:\d{2})?)?$/;

function absolute(url: string): string {
  return url.startsWith('http') ? url : `${SITE_URL}${url.startsWith('/') ? '' : '/'}${url}`;
}

/**
 * VideoObject de un vídeo de YouTube o de Bunny Stream.
 *
 * Devuelve `null` cuando falta `uploadDate` o no es una fecha ISO: es la única
 * salida honesta, porque un VideoObject sin uploadDate lo descarta Google y uno
 * con fecha inventada es peor que no tener marcado.
 */
export function buildVideoObjectSchema(input: VideoObjectInput): Record<string, unknown> | null {
  if (!input.uploadDate || !ISO_DATE.test(input.uploadDate)) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: input.name,
    description: input.description,
    thumbnailUrl: [absolute(input.thumbnailUrl)],
    uploadDate: input.uploadDate,
    ...hostUrls(input),
    ...(input.duration ? { duration: input.duration } : {}),
    ...(input.inLanguage ? { inLanguage: input.inLanguage } : {}),
    ...(input.pagePath
      ? {
          url: absolute(input.pagePath),
          mainEntityOfPage: { '@type': 'WebPage', '@id': absolute(input.pagePath) },
        }
      : {}),
    // @id pelado: el nodo de la firma ya lo define el layout en esta página.
    // Repetir aquí `@type: Organization` la declaraba por segunda vez con un
    // tipo más genérico que el canónico. Ver app/lib/schemaOrg.ts.
    publisher: ORG_REF,
  };
}

export type SiteVideo = VideoHost & {
  name: LocalizedText;
  description: LocalizedText;
  thumbnailUrl: string;
  /** null = fecha de subida pendiente de confirmar en la plataforma. */
  uploadDate: string | null;
  duration?: string;
  inLanguage?: string;
};

// ===== Catálogo =====
// Copia tomada literalmente de lo que ya se publica en la página, sin reescribir
// nada: `name` es la etiqueta con la que la página presenta el vídeo (el mismo
// texto del `title` del iframe) y `description` es la cita del cliente seguida
// de su frase de caso, las dos tal cual están en TestimoniosClient.tsx.
/** Los 6 testimonios de /testimonios, en el orden en que los pinta la página. */
export const TESTIMONIOS_PAGE_VIDEOS: readonly SiteVideo[] = [
  {
    youtubeId: 'dtKRXVMxcHU',
    name: { es: 'Testimonio de Luis Gutierrez', en: "Luis Gutierrez's testimonial" },
    description: {
      es: 'Puedes conseguir una vida mejor, un trabajo mejor y saber que puedes regresar a ver a tu familia. Descubre cómo ayudamos a nuestros clientes a alcanzar sus objetivos legales.',
      en: 'You can get a better life, a better job, and know that you can return to see your family. Discover how we help our clients achieve their legal goals.',
    },
    thumbnailUrl: '/testimonials/YV01.png',
    uploadDate: '2025-06-24',
  },
  {
    youtubeId: 'y5BwL3Owhzg',
    name: {
      es: 'Testimonio de José Aguilar y Laura Lechuga',
      en: "José Aguilar and Laura Lechuga's testimonial",
    },
    description: {
      es: 'Estuvieron al pendiente e hicieron todo con tiempo para agilizar el proceso. Conoce más sobre los resultados exitosos que hemos logrado.',
      en: 'They stayed on top of everything and did everything in a timely manner to speed up the process. Learn more about the successful results we have achieved.',
    },
    thumbnailUrl: '/testimonials/YV02.png',
    uploadDate: '2025-05-20',
  },
  {
    youtubeId: 'wZ7uJ0mHZjk',
    name: { es: 'Testimonio de Alejandra Espinoza', en: "Alejandra Espinoza's testimonial" },
    description: {
      es: 'Se siente uno en confianza para preguntar cualquier cosa. Testimonios que reflejan nuestro trabajo y pasión por ayudar.',
      en: 'You feel comfortable and confident asking anything. Testimonials that reflect our work and passion to help.',
    },
    thumbnailUrl: '/testimonials/YV03.png',
    uploadDate: '2025-08-19',
  },
  {
    youtubeId: 'QXOZHRpSjSA',
    name: { es: 'Testimonio de Yesenia Zavala', en: "Yesenia Zavala's testimonial" },
    description: {
      es: 'Resultados que hablan por sí mismos. En menos de un mes estuve de regreso con mi familia después de 2 años.',
      en: 'Results that speak for themselves. In less than a month, I was back with my family after two years.',
    },
    thumbnailUrl: '/testimonials/YV04.png',
    uploadDate: '2025-03-21',
  },
  {
    youtubeId: 'kT9ZXCFW5KM',
    name: { es: 'Testimonio de Ivonne Hernández', en: "Ivonne Hernández's testimonial" },
    description: {
      es: 'Confianza y profesionalismo garantizado. Hace 4 años pedimos la solicitud de residencia por petición de mi hija.',
      en: 'Trust and professionalism guaranteed. Four years ago, we applied for permanent residence through a petition filed by my daughter.',
    },
    thumbnailUrl: '/testimonials/YV05.png',
    uploadDate: '2025-04-24',
  },
  {
    youtubeId: 'cTJ9M5PT-S4',
    name: { es: 'Testimonio de Octavio Varela', en: "Octavio Varela's testimonial" },
    description: {
      es: 'Venía con inseguridades, pero ya estando aquí te das cuenta que el proceso te va guiando. Testimonios reales de personas que confiaron en nosotros.',
      en: "I came in feeling uncertain, but once you're here, you realize that the process guides you step by step. Real testimonials from people who trusted us.",
    },
    thumbnailUrl: '/testimonials/YV06.png',
    uploadDate: '2024-10-21',
  },
];

// Episodio de la portada (app/components/AboutVideo.tsx + About.tsx): el 5,
// "Una familia, una esperanza" (Jexis), que sustituyó al 4 el 2026-10-09 a
// pedido del despacho. El título y la sinopsis son los oficiales de YouTube que ya renderiza About.tsx, aquí en
// texto plano. `inLanguage: 'es'` está documentado en la propia página ("El
// episodio se grabó en español" / "Episode in Spanish."), a diferencia de los
// testimonios, donde el idioma del audio no consta en ningún dato.
const UNIENDO_FAMILIAS_EP5: SiteVideo = {
  youtubeId: 'E4scFUVVHJo',
  name: {
    es: 'Uniendo Familias | Episodio 5 — Una familia, una esperanza',
    en: 'Uniendo Familias | Episode 5 — One Family, One Hope',
  },
  description: {
    es: 'Después de un mes de detención, y gracias a la estrategia legal de un habeas corpus, Jexis logró recuperar su libertad con el apoyo del abogado de inmigración Manuel Solís. Hoy, su experiencia se convierte en un mensaje de esperanza para quienes sienten que ya no tienen opciones.',
    en: 'After a month in detention, and thanks to the legal strategy of a habeas corpus petition, Jexis was released with the help of immigration attorney Manuel Solís. Today, Jexis\'s story becomes a message of hope for those who feel they have run out of options.',
  },
  // Portada oficial del episodio, 1280x720. YouTube no tiene maxresdefault de
  // este vídeo (404) y su sddefault es 4:3 con franjas negras.
  thumbnailUrl: '/videos/uniendo-familias-ep5.jpg',
  // Fecha real del itemprop="uploadDate" del vídeo (2026-05-26T15:21:44-07:00)
  // y duración real (lengthSeconds 370 = 6 min 10 s).
  uploadDate: '2026-05-26',
  duration: 'PT6M10S',
  inLanguage: 'es',
};

/**
 * Vídeos de la portada: el episodio de "Uniendo Familias" (<AboutVideo>) y el
 * testimonio de Octavio Varela (<TestimonialsVideo>), que es el MISMO vídeo de
 * YouTube que la sexta tarjeta de /testimonios — de ahí que se reutilice su
 * entrada en vez de duplicarla con otra copia.
 */
export const HOME_PAGE_VIDEOS: readonly SiteVideo[] = [
  UNIENDO_FAMILIAS_EP5,
  ...TESTIMONIOS_PAGE_VIDEOS.filter((video) => video.youtubeId === 'cTJ9M5PT-S4'),
];

// Tutorial del portal de clientes (Bunny Stream, no YouTube). `name` es el
// mismo texto del `title` del iframe en AccesoClientesClient.tsx y
// `description` resume la descripción del hero de esa página. Fecha y duración
// reales, leídas del JSON-LD que publica el propio reproductor de Bunny
// ("uploadDate":"2026-10-12T21:41:09.143Z", "duration":"PT41S"). Sin
// `inLanguage`: el idioma del audio no consta en ningún dato.
const PORTAL_TUTORIAL: SiteVideo = {
  bunny: PORTAL_TUTORIAL_VIDEO,
  name: {
    es: 'Tutorial del Portal de Clientes | Manuel Solís',
    en: 'Client Portal Tutorial | Manuel Solís',
  },
  description: {
    es: 'Video tutorial del nuevo portal de clientes de Law Offices of Manuel Solís, donde podrá dar seguimiento a su caso y mantenerse informado de cada avance.',
    en: 'Video tutorial of the new client portal of the Law Offices of Manuel Solís, where you can track your case and stay informed of every update.',
  },
  // La misma portada que muestra el reproductor de Bunny, descargada a
  // public/ porque el CDN de Bunny responde 403 sin Referer permitido.
  thumbnailUrl: '/videos/tutorial-portal-clientes.jpg',
  uploadDate: '2026-10-12',
  duration: 'PT41S',
};

/** Vídeo de /acceso-clientes: el tutorial del portal (<BunnyVideo>). */
export const ACCESO_CLIENTES_PAGE_VIDEOS: readonly SiteVideo[] = [PORTAL_TUTORIAL];

/**
 * VideoObjects listos para inyectar en una página, en el idioma de la página.
 *
 * Devuelve un array (JSON-LD admite un array en la raíz) que HOY SALE VACÍO
 * porque ningún vídeo tiene `uploadDate`. La página que lo use debe comprobar
 * `length` antes de renderizar el <script>, para no emitir "[]" en el HTML.
 */
export function buildPageVideoSchemas(input: {
  videos: readonly SiteVideo[];
  lang: VideoLang;
  pagePath: string;
}): Record<string, unknown>[] {
  const { videos, lang, pagePath } = input;
  return videos
    .map((video) =>
      buildVideoObjectSchema({
        ...video,
        name: video.name[lang],
        description: video.description[lang],
        pagePath,
      })
    )
    .filter((schema): schema is Record<string, unknown> => schema !== null);
}

/** Vídeos del catálogo a los que les falta la fecha de subida real. */
export function videosPendingUploadDate(): string[] {
  return [...TESTIMONIOS_PAGE_VIDEOS, UNIENDO_FAMILIAS_EP5, PORTAL_TUTORIAL]
    .filter((video) => !video.uploadDate)
    .map((video) => (video.bunny ? video.bunny.videoId : video.youtubeId));
}
