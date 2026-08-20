import { SITE_URL } from './seoMetadata';

/**
 * Referencia canónica a la entidad de la firma en JSON-LD.
 *
 * QUÉ PROBLEMA RESUELVE. El nodo real de la firma lo emite
 * app/[lang]/layout.tsx en TODAS las páginas, tipado como
 * `['LegalService','LawFirm']` y con el `@id` de abajo. Pero cinco sitios
 * distintos —blogSchema, videoSchema, el índice del blog y las dos páginas de
 * boletín— volvían a declarar ese mismo `@id` como un `Organization` pelado con
 * su propio `name` y a veces su propio `logo`.
 *
 * Eso no es una referencia: es una segunda declaración de la misma entidad con
 * un tipo más genérico. La auditoría de schema de 2026-08 lo midió en 124 URLs
 * (BlogPosting, Article, VideoObject, Blog y CollectionPage) y lo describió
 * como bifurcar una segunda entidad de organización. El índice del blog era el
 * peor caso: emitía el `Organization` SIN `@id`, o sea una empresa anónima
 * distinta de la firma.
 *
 * CÓMO SE USA. Cuando un nodo necesita apuntar a la firma —`publisher`,
 * `author` del boletín, `parentOrganization`— se referencia por `@id` pelado y
 * nada más:
 *
 *     publisher: ORG_REF
 *
 * El grafo se resuelve porque el nodo completo ya está definido en la misma
 * página por el layout: nombre, logo, dirección, teléfono y `sameAs` salen de
 * ahí. Repetirlos aquí no añade información y sí crea el conflicto.
 *
 * NO añadas `@type` ni `name` a este objeto "para que se entienda mejor". Es
 * justo lo que había antes y es lo que la auditoría marcó.
 */
export const ORG_ID = `${SITE_URL}/#organization`;

/** Referencia por `@id` pelado al nodo de la firma. Ver la nota de arriba. */
export const ORG_REF = { '@id': ORG_ID } as const;
