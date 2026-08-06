/**
 * Publicación programada del blog.
 *
 * La regla es una sola y no necesita ningún campo nuevo: **un post con `date`
 * en el futuro todavía no está publicado**. Así, la fecha que el editor pone es
 * a la vez la fecha de salida y la que se muestra, y no hay dos fechas que
 * puedan desincronizarse.
 *
 * Mientras el post está programado no existe para nadie: ni en el índice, ni en
 * el sitemap, ni en el RSS, ni en los artículos relacionados, ni en el correo.
 * Su URL responde 404. El día que llega su fecha, el cron de
 * /api/cron/publish-blog revalida las rutas afectadas y aparece.
 *
 * `newsletterAt` es opcional y sirve para separar dos cosas que no tienen por
 * qué coincidir: cuándo sale el artículo y cuándo se avisa a los suscriptores.
 * Se añadió porque los 20 artículos del plan editorial de agosto de 2026 se
 * publicaron todos el mismo día —ya estaban indexados cuando se montó este
 * sistema, y esconderlos para reintroducirlos habría sido peor que dejarlos—,
 * pero mandar 20 correos de golpe habría quemado la lista. Sin `newsletterAt`,
 * el aviso sale el día de publicación.
 */

/** Zona del despacho: un post fechado el 1 de septiembre sale a medianoche en Houston. */
const FIRM_TIME_ZONE = 'America/Chicago';

export interface SchedulablePost {
  slug: string;
  /** YYYY-MM-DD. Fecha de publicación y la que se muestra. */
  date: string;
  /** YYYY-MM-DD opcional: cuándo avisar a los suscriptores. Por defecto, `date`. */
  newsletterAt?: string;
}

/**
 * "Hoy" en la zona del despacho, como YYYY-MM-DD.
 *
 * No se usa UTC: en Houston, medianoche UTC son las 7 de la tarde del día
 * anterior, así que un post fechado el día 1 aparecería la tarde del día 31.
 */
export function firmToday(now: Date = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: FIRM_TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(now);
}

/** Un post está publicado cuando su fecha ya llegó. Las cadenas YYYY-MM-DD se comparan bien lexicográficamente. */
export function isPublished<T extends SchedulablePost>(post: T, today: string = firmToday()): boolean {
  return post.date <= today;
}

/** Fecha en la que toca avisar a los suscriptores. */
export function newsletterDateOf<T extends SchedulablePost>(post: T): string {
  return post.newsletterAt ?? post.date;
}

/**
 * Fecha en la que arranca el envío automático.
 *
 * Todo lo anterior se da por anunciado. Sin esto, al encender el cron los 35
 * artículos de antes de agosto de 2026 —que nunca tuvieron correo— pasarían a
 * estar "pendientes" y la lista recibiría un artículo viejo cada día hasta
 * agotarlos. Es una fecha y no una marca en la base de datos a propósito: no
 * hay que sembrar nada para estrenar el sistema, y si mañana se borra el
 * almacén de idempotencia no se reenvía el archivo entero.
 */
export const NEWSLETTER_EPOCH = '2026-08-07';

/**
 * Posts a los que ya les tocaba el correo, del más antiguo al más reciente.
 *
 * Nunca devuelve un post sin publicar: avisar de un artículo cuya URL responde
 * 404 mandaría a toda la lista a una página de error.
 */
export function newsletterDue<T extends SchedulablePost>(posts: T[], today: string = firmToday()): T[] {
  return posts
    .filter((p) => {
      const due = newsletterDateOf(p);
      return isPublished(p, today) && due >= NEWSLETTER_EPOCH && due <= today;
    })
    .sort((a, b) => newsletterDateOf(a).localeCompare(newsletterDateOf(b)));
}

/** Posts programados que aún no han salido, del más próximo al más lejano. */
export function upcoming<T extends SchedulablePost>(posts: T[], today: string = firmToday()): T[] {
  return posts.filter((p) => !isPublished(p, today)).sort((a, b) => a.date.localeCompare(b.date));
}

/**
 * Reparte fechas cada `everyDays` días a partir de `start`.
 * Utilidad para planificar una tanda; no se usa en tiempo de ejecución.
 */
export function spreadDates(start: string, count: number, everyDays = 3): string[] {
  const out: string[] = [];
  const base = new Date(`${start}T12:00:00Z`);
  for (let i = 0; i < count; i++) {
    const d = new Date(base.getTime() + i * everyDays * 86400000);
    out.push(d.toISOString().slice(0, 10));
  }
  return out;
}
