/**
 * Enlaces contextuales dentro del cuerpo de un artículo.
 *
 * La auditoría pedía enlazar desde el texto hacia las páginas de servicio y no
 * solo desde un módulo lateral: un enlace dentro de la frase que habla del tema
 * lo sigue quien está leyendo, y el bloque genérico del final no.
 *
 * **Se hace al renderizar, no editando los artículos.** Tocar el contenido de 55
 * posts para meter etiquetas `<a>` a mano es irreversible, imposible de revisar
 * de un vistazo y una ocasión perfecta para corromper el HTML de un párrafo.
 * Aquí es una función con reglas, se prueba, y quitarla no deja rastro.
 *
 * **Se aplica en los dos caminos de plantilla que tiene el blog.** Al entrar solo
 * cubría `BlogArticleLayout` —los posts que son datos—, así que los 35 escritos
 * a mano en JSX quedaban fuera por arquitectura, no por decisión: 13 de los 55
 * artículos recibían enlace. Los 35 también renderizan sus párrafos desde
 * strings HTML, así que reciben la misma función en su bloque `t.intro`, que en
 * ellos no es un lede de una línea sino el cuerpo de apertura (6 a 10 párrafos).
 *
 * Las reglas existen para que esto no se convierta en una granja de enlaces:
 *
 *   · Solo en bloques `text`. Nunca en títulos, listas, tablas ni avisos.
 *   · Solo la PRIMERA aparición de cada término, y solo una vez por destino.
 *   · Máximo `MAX_POR_ARTICULO` en total.
 *   · Nunca dentro de un `<a>` que ya exista, ni dentro de una etiqueta.
 *   · Solo términos que son el nombre de un área de práctica con página propia.
 *     No se enlazan ciudades: enlazar cada "Houston" del texto a una ficha de
 *     oficina no ayuda a quien lee y se lee como relleno para buscadores.
 */

export type InlineLinkState = {
  /** Destinos ya enlazados en este artículo. */
  usados: Set<string>;
};

export function createInlineLinkState(): InlineLinkState {
  return { usados: new Set() };
}

const MAX_POR_ARTICULO = 3;

/** Término visible → página de servicio. El orden importa: primero el más específico. */
const TERMINOS: { re: RegExp; path: string }[] = [
  // Los más específicos primero, para que "Visa U" no lo capture "visa".
  { re: /\bVisa U\b/, path: '/servicios/visa-u' },
  { re: /\bVAWA\b/, path: '/servicios/vawa' },
  { re: /\bVisa E-2\b/, path: '/servicios/visa-e2' },
  { re: /\bdefensa contra la deportaci[oó]n\b/i, path: '/servicios/defensa-deportacion' },
  { re: /\bdeportation defense\b/i, path: '/servicios/defensa-deportacion' },
  { re: /\bcorte de inmigraci[oó]n\b/i, path: '/servicios/defensa-deportacion' },
  { re: /\bsolicitud de asilo\b/i, path: '/servicios/asilo' },
  { re: /\basylum application\b/i, path: '/servicios/asilo' },
  { re: /\bpetici[oó]n familiar\b/i, path: '/servicios/familia' },
  { re: /\bfamily petition\b/i, path: '/servicios/familia' },
  { re: /\blesiones personales\b/i, path: '/servicios/accidentes' },
  { re: /\bpersonal injury\b/i, path: '/servicios/accidentes' },
  { re: /\bcompensaci[oó]n laboral\b/i, path: '/servicios/accidentes' },
  { re: /\bdefensa criminal\b/i, path: '/servicios/ley-criminal' },
  { re: /\bcriminal defense\b/i, path: '/servicios/ley-criminal' },

  // ── El inglés no es el español con otras palabras: es otro orden ──
  // `Visa U` es sensible a mayúsculas y en inglés se escribe "U visa", así que
  // los cuatro artículos de Visa U no recibían enlace en /en. Lo mismo pasaba
  // con temas que no tenían ningún término: ciudadanía, residencia familiar,
  // DACA/TPS y camiones. Van aquí, entre los específicos, para que ganen a los
  // genéricos del final.
  { re: /\bU visa\b/i, path: '/servicios/visa-u' },
  // El nombre del área va antes que el del formulario: "family-based immigration"
  // le dice al lector a dónde llega y "I-130 petition" no.
  { re: /\binmigraci[oó]n familiar\b/i, path: '/servicios/inmigracion' },
  { re: /\bfamily-based immigration\b/i, path: '/servicios/inmigracion' },
  { re: /\bpetici[oó]n I-130\b/i, path: '/servicios/inmigracion' },
  { re: /\bI-130 petition\b/i, path: '/servicios/inmigracion' },
  { re: /\bajuste de estatus\b/i, path: '/servicios/inmigracion' },
  { re: /\badjustment of status\b/i, path: '/servicios/inmigracion' },
  { re: /\bresidencia permanente\b/i, path: '/servicios/inmigracion' },
  { re: /\bpermanent residen(?:cy|ce|t|ts)\b/i, path: '/servicios/inmigracion' },
  { re: /\bparole humanitario\b/i, path: '/servicios/inmigracion' },
  { re: /\bhumanitarian parole\b/i, path: '/servicios/inmigracion' },
  { re: /\bautodeportaci[oó]n\b/i, path: '/servicios/defensa-deportacion' },
  { re: /\bself-deportation\b/i, path: '/servicios/defensa-deportacion' },
  { re: /\bsalida voluntaria\b/i, path: '/servicios/defensa-deportacion' },
  { re: /\bvoluntary departure\b/i, path: '/servicios/defensa-deportacion' },
  { re: /\baccidente de cami[oó]n\b/i, path: '/servicios/accidentes' },
  { re: /\btruck accident\b/i, path: '/servicios/accidentes' },
  { re: /\b18-wheeler\b/i, path: '/servicios/accidentes' },
  { re: /\bcami[oó]n de 18 ruedas\b/i, path: '/servicios/accidentes' },
  { re: /\bcompensaci[oó]n de trabajadores\b/i, path: '/servicios/accidentes' },
  { re: /\bworkers'? compensation\b/i, path: '/servicios/accidentes' },

  // ── Términos más frecuentes, al final a propósito ──
  // Van después de los específicos para que "solicitud de asilo" gane a "asilo"
  // y "defensa contra la deportación" gane a "deportación". Con solo los
  // específicos, 7 de los 20 artículos con plantilla de datos recibían enlace:
  // estos términos son los que la gente escribe de verdad, y su destino sigue
  // siendo el correcto.
  { re: /\bfianza migratoria\b/i, path: '/servicios/defensa-deportacion' },
  { re: /\bimmigration bond\b/i, path: '/servicios/defensa-deportacion' },
  { re: /\borden de deportaci[oó]n\b/i, path: '/servicios/defensa-deportacion' },
  { re: /\bproceso de deportaci[oó]n\b/i, path: '/servicios/defensa-deportacion' },
  { re: /\bremoval proceedings\b/i, path: '/servicios/defensa-deportacion' },
  { re: /\bdeportaci[oó]n\b/i, path: '/servicios/defensa-deportacion' },
  { re: /\bdeportation\b/i, path: '/servicios/defensa-deportacion' },
  { re: /\basilo\b/i, path: '/servicios/asilo' },
  { re: /\basylum\b/i, path: '/servicios/asilo' },
  { re: /\bpermiso de trabajo\b/i, path: '/servicios/inmigracion' },
  { re: /\bwork permit\b/i, path: '/servicios/inmigracion' },
  { re: /\babogado de inmigraci[oó]n\b/i, path: '/servicios/inmigracion' },
  { re: /\bimmigration attorney\b/i, path: '/servicios/inmigracion' },
  { re: /\baccidente de trabajo\b/i, path: '/servicios/accidentes' },
  { re: /\bworkplace accident\b/i, path: '/servicios/accidentes' },

  // Ciudadanía, DACA y TPS apuntan al pilar de inmigración porque hoy no tienen
  // página propia. Cuando existan los hubs, se cambia el `path` aquí y los
  // artículos siguen al destino sin tocar ni un artículo.
  { re: /\bnaturalizaci[oó]n\b/i, path: '/servicios/inmigracion' },
  { re: /\bnaturalization\b/i, path: '/servicios/inmigracion' },
  { re: /\bciudadan[íi]a\b/i, path: '/servicios/inmigracion' },
  { re: /\bcitizenship\b/i, path: '/servicios/inmigracion' },
  { re: /\bgreen card\b/i, path: '/servicios/inmigracion' },
  { re: /\bDACA\b/, path: '/servicios/inmigracion' },
  { re: /\bTPS\b/, path: '/servicios/inmigracion' },
  { re: /\btr[aá]mite de inmigraci[oó]n\b/i, path: '/servicios/inmigracion' },
  { re: /\bimmigration process\b/i, path: '/servicios/inmigracion' },
];

/**
 * Divide el HTML en trozos, marcando los que NO se pueden tocar: el interior de
 * una etiqueta y el interior de un `<a>` existente. Sin esto, una sustitución
 * puede caer dentro de un atributo y romper el marcado.
 */
function segmentar(html: string): { texto: string; editable: boolean }[] {
  const out: { texto: string; editable: boolean }[] = [];
  let i = 0;
  let dentroDeAnchor = false;

  while (i < html.length) {
    const abre = html.indexOf('<', i);
    if (abre === -1) {
      out.push({ texto: html.slice(i), editable: !dentroDeAnchor });
      break;
    }
    if (abre > i) out.push({ texto: html.slice(i, abre), editable: !dentroDeAnchor });

    const cierra = html.indexOf('>', abre);
    if (cierra === -1) {
      out.push({ texto: html.slice(abre), editable: false });
      break;
    }
    const etiqueta = html.slice(abre, cierra + 1);
    if (/^<a[\s>]/i.test(etiqueta)) dentroDeAnchor = true;
    else if (/^<\/a\s*>/i.test(etiqueta)) dentroDeAnchor = false;
    out.push({ texto: etiqueta, editable: false });
    i = cierra + 1;
  }
  return out;
}

/**
 * Devuelve el HTML con los enlaces contextuales insertados.
 * Muta `state` para no repetir destino entre bloques del mismo artículo.
 */
export function addInlineLinks(
  html: string,
  lang: 'es' | 'en',
  state: InlineLinkState,
): string {
  if (state.usados.size >= MAX_POR_ARTICULO) return html;

  const segmentos = segmentar(html);

  for (const { re, path } of TERMINOS) {
    if (state.usados.size >= MAX_POR_ARTICULO) break;
    if (state.usados.has(path)) continue;

    for (const seg of segmentos) {
      if (!seg.editable) continue;
      const m = re.exec(seg.texto);
      if (!m) continue;
      const href = `/${lang}${path}`;
      seg.texto =
        seg.texto.slice(0, m.index) +
        `<a href="${href}" class="text-[#B2904D] underline decoration-[#B2904D]/40 hover:decoration-[#B2904D] underline-offset-2">${m[0]}</a>` +
        seg.texto.slice(m.index + m[0].length);
      // Marcado como no editable para que otro término no vuelva a entrar aquí.
      seg.editable = false;
      state.usados.add(path);
      break;
    }
  }

  return segmentos.map((s) => s.texto).join('');
}
