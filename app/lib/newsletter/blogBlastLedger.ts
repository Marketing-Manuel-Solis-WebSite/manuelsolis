import { del, list, put } from '@vercel/blob';

/**
 * Registro de qué artículos ya se anunciaron por correo.
 *
 * Existe por una sola razón: **mandar dos veces el mismo boletín a toda la
 * lista no se puede deshacer.** Vercel Cron garantiza al menos una entrega, no
 * exactamente una, así que un disparo repetido —o un redespliegue, o alguien
 * llamando al endpoint a mano— tiene que encontrar la puerta cerrada.
 *
 * Es un blob por artículo y no un JSON con la lista entera a propósito:
 *
 * - `put` con `allowOverwrite: false` falla si el archivo ya existe. Eso da un
 *   "crear o fallar" atómico, que es un cerrojo de verdad. Un único JSON
 *   obligaría a leer-modificar-escribir, y dos ejecuciones simultáneas leerían
 *   el mismo estado y las dos se creerían las primeras.
 * - `list()` consulta la API, no el CDN. El contenido de un blob se sirve
 *   cacheado un mínimo de un minuto, así que releer el JSON recién escrito
 *   podría devolver la versión anterior — justo en el escenario del que uno se
 *   quiere proteger.
 *
 * Aquí no se guarda **nada personal**: solo slugs, fechas y contadores. El
 * store de Blob es público (v2 no ofrece otra cosa) y las direcciones de los
 * suscriptores no tienen por qué estar al alcance de una URL.
 */

const PREFIX = 'blog-newsletter/';

export interface BlastClaim {
  slug: string;
  language: string;
  /** ISO. Cuándo se reservó el envío, antes de mandar nada. */
  claimedAt: string;
  /** ISO. Cuándo terminó. Si falta, el envío se quedó a medias. */
  sentAt?: string;
  processed?: number;
  errors?: number;
}

function pathFor(slug: string): string {
  return `${PREFIX}${slug}.json`;
}

/** Slugs que ya tienen (o tuvieron) envío. Lectura fresca: va contra la API. */
export async function listClaimedSlugs(): Promise<Set<string>> {
  const claimed = new Set<string>();
  let cursor: string | undefined;

  do {
    const page = await list({ prefix: PREFIX, cursor, limit: 1000 });
    for (const blob of page.blobs) {
      const name = blob.pathname.slice(PREFIX.length);
      if (name.endsWith('.json')) claimed.add(name.slice(0, -'.json'.length));
    }
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor);

  return claimed;
}

/**
 * Reserva el envío de un artículo. Devuelve false si ya estaba reservado.
 *
 * Se reserva **antes** de mandar, no después. Si el proceso se cae a mitad del
 * envío, el peor caso es un boletín que no sale (se ve porque el registro se
 * queda sin `sentAt`) en lugar de la lista entera recibiendo el correo dos
 * veces.
 */
export async function claimBlast(slug: string, language: string): Promise<boolean> {
  const claim: BlastClaim = { slug, language, claimedAt: new Date().toISOString() };
  try {
    await put(pathFor(slug), JSON.stringify(claim, null, 2), {
      access: 'public',
      addRandomSuffix: false,
      allowOverwrite: false,
      contentType: 'application/json',
      cacheControlMaxAge: 60,
    });
    return true;
  } catch {
    // El único fallo esperado es "ya existe", que es la respuesta que se busca.
    // Cualquier otro (store caído, token inválido) también acaba aquí y también
    // debe impedir el envío: sin registro no hay forma de evitar el duplicado.
    return false;
  }
}

/**
 * Suelta una reserva. **Solo si consta que no salió ni un correo.**
 *
 * Sin esto, un fallo antes de empezar a mandar —el endpoint devuelve 401, o el
 * artículo no aparece— dejaría la reserva puesta para siempre y ese boletín no
 * se enviaría nunca, en silencio. Con la reserva suelta, la ejecución del día
 * siguiente lo reintenta.
 *
 * Lo que no se puede soltar es un envío que ya empezó: reintentarlo mandaría el
 * correo por segunda vez a todos los que sí lo recibieron.
 */
export async function releaseClaim(slug: string): Promise<void> {
  await del(pathFor(slug));
}

/** Cierra el registro con el resultado. Que esto falle no invalida el envío. */
export async function recordBlastResult(
  slug: string,
  language: string,
  result: { processed: number; errors: number },
): Promise<void> {
  const claim: BlastClaim = {
    slug,
    language,
    claimedAt: new Date().toISOString(),
    sentAt: new Date().toISOString(),
    processed: result.processed,
    errors: result.errors,
  };
  await put(pathFor(slug), JSON.stringify(claim, null, 2), {
    access: 'public',
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: 'application/json',
    cacheControlMaxAge: 60,
  });
}
