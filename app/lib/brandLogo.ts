/**
 * Logo de marca — fuente única de la imagen y sus proporciones.
 *
 * ─────────────────────────────────────────────────────────────────
 *  CAMBIO TEMPORAL — 2026-09-01, previsto revertir el 2026-09-02
 * ─────────────────────────────────────────────────────────────────
 * Para volver al logo permanente basta con cambiar este objeto por:
 *
 *   export const BRAND_LOGO = {
 *     src: '/logo-manuel-solis.png',
 *     width: 276,
 *     height: 100,
 *   } as const;
 *
 * El archivo permanente NO se ha tocado: sigue en public/logo-manuel-solis.png.
 *
 * Por qué existe este módulo en vez de editar cada `<Image>`: el logo se pinta
 * en cuatro sitios (Header, Footer y dos veces en /inversionistas) y cada uno
 * traía sus propios `width`/`height` a mano. Esas medidas NO son decorativas:
 * next/image las usa para fijar la proporción del hueco, y dos de los cuatro
 * usos no llevan `object-contain`, así que una proporción equivocada NO deja
 * espacio en blanco — estira la imagen. El logo temporal es 4.29:1 y el
 * permanente 2.76:1, de modo que dejar las medidas viejas habría deformado el
 * logo del footer y el de /inversionistas.
 *
 * Lo que este módulo NO controla, a propósito: el logo del JSON-LD
 * (`Organization.logo` en el layout y `ORG_LOGO` en officeSchema.ts) y el del
 * canal RSS. Esos apuntan al logo permanente y se quedan ahí. Es la identidad
 * de la empresa para Google: cambiarla ida y vuelta en 24 h no aporta nada
 * visible y sí mete ruido en el panel de conocimiento.
 */
export const BRAND_LOGO = {
  src: '/logo-temporal-abogado-inmigracion.png',
  width: 1200,
  height: 280,
} as const;
