/**
 * Las 35 landings de ciudad × servicio, para el bloque de enlaces del pie.
 *
 * ── Por qué existe este módulo y no se importa LANDING_PAGES ──
 * `app/lib/cityServiceData.ts` es la fuente de verdad de estas páginas, pero
 * son ~1 200 líneas de prosa (intro, metaDescription, whyChooseUs por sede) y
 * `Footer.tsx` es `'use client'`: importarlo desde ahí metería ese texto en el
 * bundle de cliente de TODAS las páginas del sitio para pintar 35 enlaces.
 * Este módulo es una hoja —solo slug y etiqueta— igual que officesPhoneMap.
 *
 * ── Por qué no puede desincronizarse ──
 * `__tests__/cityFooterLinks.test.ts` compara este conjunto de slugs contra
 * `LANDING_PAGES` y falla si sobra o falta uno. Añadir una landing sin añadirla
 * aquí rompe el build de tests, no el pie en silencio.
 *
 * ── Qué arregla ──
 * La lista estaba escrita a mano en Footer.tsx con 25 de las 35: entraban las 8
 * de inmigración, las 5 de deportación, las 4 de Visa U y las 2 de accidentes,
 * pero solo 3 de las 8 de asilo y 3 de las 8 de VAWA. Las 10 excluidas son la
 * misma plantilla a la misma profundidad (1 043–1 158 palabras) y no había
 * criterio editorial que las separara: era una lista a medio terminar. Medido,
 * las que están en el pie tienen 174 enlaces entrantes y las excluidas entre 11
 * y 14 (guía de pilar y clúster, 26-ago-2026, paso 05).
 */

export type CityFooterLink = {
  slug: string;
  es: string;
  en: string;
};

/** Orden: agrupado por servicio, y dentro por ciudad, como se lee en el pie. */
export const CITY_FOOTER_LINKS: readonly CityFooterLink[] = [
  // Inmigración (8)
  { slug: 'abogado-inmigracion-houston', es: 'Inmigración Houston', en: 'Immigration Houston' },
  { slug: 'abogado-inmigracion-dallas', es: 'Inmigración Dallas', en: 'Immigration Dallas' },
  { slug: 'abogado-inmigracion-chicago', es: 'Inmigración Chicago', en: 'Immigration Chicago' },
  { slug: 'abogado-inmigracion-los-angeles', es: 'Inmigración Los Ángeles', en: 'Immigration Los Angeles' },
  { slug: 'abogado-inmigracion-el-paso', es: 'Inmigración El Paso', en: 'Immigration El Paso' },
  { slug: 'abogado-inmigracion-memphis', es: 'Inmigración Memphis', en: 'Immigration Memphis' },
  { slug: 'abogado-inmigracion-denver', es: 'Inmigración Denver', en: 'Immigration Denver' },
  { slug: 'abogado-inmigracion-harlingen', es: 'Inmigración Harlingen', en: 'Immigration Harlingen' },

  // Accidentes (2)
  { slug: 'abogado-accidentes-houston', es: 'Accidentes Houston', en: 'Accidents Houston' },
  { slug: 'abogado-accidentes-dallas', es: 'Accidentes Dallas', en: 'Accidents Dallas' },

  // Defensa contra deportación (5)
  { slug: 'defensa-deportacion-houston', es: 'Deportación Houston', en: 'Deportation Houston' },
  { slug: 'defensa-deportacion-dallas', es: 'Deportación Dallas', en: 'Deportation Dallas' },
  { slug: 'defensa-deportacion-chicago', es: 'Deportación Chicago', en: 'Deportation Chicago' },
  { slug: 'defensa-deportacion-los-angeles', es: 'Deportación Los Ángeles', en: 'Deportation Los Angeles' },
  { slug: 'defensa-deportacion-el-paso', es: 'Deportación El Paso', en: 'Deportation El Paso' },

  // Visa U (4)
  { slug: 'visa-u-houston', es: 'Visa U Houston', en: 'U Visa Houston' },
  { slug: 'visa-u-dallas', es: 'Visa U Dallas', en: 'U Visa Dallas' },
  { slug: 'visa-u-chicago', es: 'Visa U Chicago', en: 'U Visa Chicago' },
  { slug: 'visa-u-los-angeles', es: 'Visa U Los Ángeles', en: 'U Visa Los Angeles' },

  // VAWA (8) — cinco eran nuevas en el pie
  { slug: 'vawa-houston', es: 'VAWA Houston', en: 'VAWA Houston' },
  { slug: 'vawa-dallas', es: 'VAWA Dallas', en: 'VAWA Dallas' },
  { slug: 'vawa-chicago', es: 'VAWA Chicago', en: 'VAWA Chicago' },
  { slug: 'vawa-los-angeles', es: 'VAWA Los Ángeles', en: 'VAWA Los Angeles' },
  { slug: 'vawa-el-paso', es: 'VAWA El Paso', en: 'VAWA El Paso' },
  { slug: 'vawa-denver', es: 'VAWA Denver', en: 'VAWA Denver' },
  { slug: 'vawa-harlingen', es: 'VAWA Harlingen', en: 'VAWA Harlingen' },
  { slug: 'vawa-memphis', es: 'VAWA Memphis', en: 'VAWA Memphis' },

  // Asilo político (8) — cinco eran nuevas en el pie
  { slug: 'asilo-politico-houston', es: 'Asilo Houston', en: 'Asylum Houston' },
  { slug: 'asilo-politico-dallas', es: 'Asilo Dallas', en: 'Asylum Dallas' },
  { slug: 'asilo-politico-chicago', es: 'Asilo Chicago', en: 'Asylum Chicago' },
  { slug: 'asilo-politico-los-angeles', es: 'Asilo Los Ángeles', en: 'Asylum Los Angeles' },
  { slug: 'asilo-politico-el-paso', es: 'Asilo El Paso', en: 'Asylum El Paso' },
  { slug: 'asilo-politico-denver', es: 'Asilo Denver', en: 'Asylum Denver' },
  { slug: 'asilo-politico-harlingen', es: 'Asilo Harlingen', en: 'Asylum Harlingen' },
  { slug: 'asilo-politico-memphis', es: 'Asilo Memphis', en: 'Asylum Memphis' },
];
