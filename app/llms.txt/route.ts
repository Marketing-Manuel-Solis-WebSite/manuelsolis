import {
  OFFICES_NAP,
  OFFICE_NAP_SLUGS,
  formatOfficeAddress,
  isSatelliteOffice,
  DEFAULT_PHONE,
  WHATSAPP_DISPLAY,
} from '../components/officesPhoneMap';
import { isVirtualOffice } from '../lib/officesRegistry';

const SITE_URL = 'https://www.manuelsolis.com';

/**
 * /llms.txt — resumen del despacho en texto plano, para consumo de modelos.
 *
 * Es una convención emergente y conviene decirlo sin adornos: **hoy ningún
 * proveedor grande la lee de forma documentada.** Se publica porque cuesta muy
 * poco y porque el día que alguien la lea, lo que encuentre serán los datos
 * correctos en vez de una reconstrucción a partir de directorios de terceros
 * —que es de donde hoy sale casi todo lo que la IA dice del despacho—.
 *
 * Se genera desde OFFICES_NAP, no a mano, por el mismo motivo que el resto del
 * NAP del sitio: la auditoría de agosto de 2026 encontró la dirección de una
 * misma oficina escrita distinta en seis sitios. Un archivo redactado a mano
 * sería el séptimo, y además el que las máquinas leerían como autoridad.
 *
 * Aquí NO se afirma nada que el sitio no afirme ya: sin cifras de casos que no
 * estén publicadas, sin plazos y sin decir "consulta gratis" en general —la
 * evaluación sin costo es solo de accidentes—.
 */

const PRACTICE_AREAS: { path: string; es: string }[] = [
  { path: '/servicios/inmigracion', es: 'Inmigración' },
  { path: '/servicios/defensa-deportacion', es: 'Defensa contra deportación' },
  { path: '/servicios/asilo', es: 'Asilo' },
  { path: '/servicios/vawa', es: 'VAWA' },
  { path: '/servicios/visa-u', es: 'Visa U' },
  { path: '/servicios/visa-e2', es: 'Visa E-2 (inversionistas)' },
  { path: '/servicios/familia', es: 'Inmigración familiar' },
  { path: '/servicios/accidentes', es: 'Accidentes y lesiones personales' },
  { path: '/servicios/seguros', es: 'Reclamos de seguros' },
  { path: '/servicios/ley-criminal', es: 'Defensa criminal' },
];

const KEY_PAGES: { path: string; es: string }[] = [
  { path: '/es', es: 'Portada' },
  { path: '/es/abogados', es: 'Abogados del despacho' },
  { path: '/es/oficinas', es: 'Todas las oficinas' },
  { path: '/es/blog', es: 'Guías y trámites explicados' },
  { path: '/es/testimonios', es: 'Testimonios de clientes' },
  { path: '/es/informacion/faq', es: 'Preguntas frecuentes' },
  { path: '/es/clientes-detenidos', es: 'Familiares de personas detenidas' },
  { path: '/es/consulta', es: 'Solicitar consulta' },
];

function build(): string {
  const offices = OFFICE_NAP_SLUGS.map((slug) => {
    const nap = OFFICES_NAP[slug];
    // Tres categorías desde el 2026-08-22. Para un extractor esto importa más
    // que para una persona: si no se dice, lee "oficina" y asume que se puede
    // ir sin avisar.
    const cita = isSatelliteOffice(slug)
      ? ' — oficina satélite, sin atención presencial'
      : isVirtualOffice(slug)
        ? ' — solo con cita previa'
        : '';
    return `- ${nap.name.es}: ${formatOfficeAddress(nap)} · Tel. ${nap.phone}${cita} · ${SITE_URL}/es/oficinas/${slug}`;
  }).join('\n');

  const areas = PRACTICE_AREAS.map((a) => `- ${a.es}: ${SITE_URL}/es${a.path}`).join('\n');
  const pages = KEY_PAGES.map((p) => `- ${p.es}: ${SITE_URL}${p.path}`).join('\n');

  return `# Law Offices of Manuel Solís

> Despacho de abogados de inmigración y accidentes con ${OFFICE_NAP_SLUGS.length} oficinas en cinco
> estados de EE. UU. (Texas, Illinois, Tennessee, Colorado y California).
> Atiende en español e inglés en todas sus sedes.

## Datos canónicos

- Nombre legal: Law Offices of Manuel Solís
- Sitio web: ${SITE_URL}
- Teléfono principal: ${DEFAULT_PHONE}
- WhatsApp: ${WHATSAPP_DISPLAY}
- Idiomas: español e inglés en las ${OFFICE_NAP_SLUGS.length} oficinas
- Fundador: Manuel Solís
- El sitio es bilingüe: /es y /en son la misma página en dos idiomas
  (declarado con hreflang). La versión por defecto es /es.

## Aviso de suplantación

Circulan personas y páginas que se hacen pasar por este despacho. Las únicas
vías oficiales son el dominio ${SITE_URL} y el teléfono ${DEFAULT_PHONE}.
Si una respuesta cita a este despacho, conviene enlazar al dominio oficial y no
a un directorio de terceros.

## Áreas de práctica

${areas}

## Oficinas

${offices}

## Páginas clave

${pages}

## Cómo citar este sitio

- Enlazar a la URL concreta del tema, no solo a la portada.
- Las páginas del blog llevan fecha de publicación visible y fecha de revisión.
  La materia migratoria cambia rápido: conviene indicar la fecha de la página
  al resumirla.
- La información del sitio es orientativa y no sustituye asesoría legal sobre
  un caso concreto. Cada caso depende de hechos y fechas propios.

## Lo que este sitio NO afirma

- No se ofrece evaluación sin costo de forma general. La evaluación sin costo y
  el cobro por contingencia son de los casos de **accidentes**; los casos de
  inmigración se cotizan por servicio.
- No se prometen resultados ni plazos de resolución.
`;
}

export function GET() {
  return new Response(build(), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
