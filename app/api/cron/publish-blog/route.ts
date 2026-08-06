import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

import { ALL_BLOG_POSTS } from '../../../[lang]/blog/page';
import { firmToday, isPublished, newsletterDue, newsletterDateOf } from '../../../lib/blogSchedule';
import { verifyCronSecret } from '../../../lib/newsletter/auth';
import { claimBlast, listClaimedSlugs, recordBlastResult } from '../../../lib/newsletter/blogBlastLedger';
import type { BlastProgressEvent, Language } from '../../../lib/newsletter/types';
import { POST as runBlast } from '../../newsletter/blast/route';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
/** Un blast a la lista entera va a ~120 ms por destinatario. */
export const maxDuration = 300;

/**
 * Publicación programada del blog + aviso al newsletter.
 *
 * Corre una vez al día. El horario está en vercel.json como "0 14 * * *", que
 * es **UTC** —Vercel no admite zona horaria en el cron—: las 9 de la mañana en
 * Houston en verano y las 8 en invierno. Que baile una hora dos veces al año no
 * importa; lo que no puede pasar es que caiga de madrugada, y por eso no se
 * dejó a las 0:00.
 *
 * Hace dos cosas independientes:
 *
 * 1. **Publicar.** Los artículos ya están construidos en el sitio; lo que los
 *    esconde es el filtro por fecha de BLOG_DATA. Como las páginas son
 *    estáticas, hay que revalidar las rutas afectadas el día que a un artículo
 *    le toca salir, o seguiría sirviéndose el HTML anterior hasta el próximo
 *    despliegue.
 * 2. **Avisar.** Manda **un solo** artículo por ejecución al newsletter. Uno,
 *    no todos los pendientes: si por lo que sea se acumulan cinco, mandar cinco
 *    correos seguidos el mismo día es la forma más rápida de que la gente se
 *    dé de baja.
 *
 * Las dos partes están separadas a propósito. Un fallo mandando el correo no
 * debe impedir que el artículo salga, que es lo que le importa al SEO.
 */

/** Margen para que una ejecución perdida no deje un artículo sirviendo HTML viejo. */
const REVALIDATE_WINDOW_DAYS = 3;

/**
 * Idioma del envío automático.
 *
 * Los suscriptores no tienen idioma guardado en Resend, así que no hay nada que
 * elegir por persona: se manda en uno y punto. Español por defecto, que es el
 * de la mayoría de la lista, con variable de entorno por si eso cambia.
 */
function newsletterLanguage(): Language {
  return process.env.NEWSLETTER_DEFAULT_LANGUAGE === 'en' ? 'en' : 'es';
}

function daysBefore(day: string, n: number): string {
  return new Date(new Date(`${day}T12:00:00Z`).getTime() - n * 86400000).toISOString().slice(0, 10);
}

/** Rutas que dejan de ser válidas cuando un artículo entra o sale del índice. */
function pathsFor(slug: string): string[] {
  return [
    `/es/blog/${slug}`,
    `/en/blog/${slug}`,
    '/es/blog',
    '/en/blog',
    '/sitemap.xml',
    '/sitemap-blog.xml',
    '/rss/blog',
  ];
}

/**
 * Lanza el blast llamando al handler directamente en lugar de por HTTP.
 *
 * Una petición del servidor a su propio dominio público pasa por el firewall de
 * Vercel, que responde 429 a lo que no parece un navegador — ya ha dado falsos
 * negativos en este proyecto. Llamando a la función no hay red de por medio, ni
 * segunda invocación que pueda agotar su propio tiempo. El bearer se manda
 * igualmente: el endpoint conserva su comprobación de siempre y no se le abre
 * una puerta trasera.
 */
async function sendBlast(slug: string, language: Language, origin: string) {
  const secret = process.env.NEWSLETTER_BLAST_SECRET;
  if (!secret) throw new Error('NEWSLETTER_BLAST_SECRET no está configurado');

  const request = new NextRequest(new URL('/api/newsletter/blast', origin), {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${secret}`,
    },
    body: JSON.stringify({ slug, language, contentType: 'blog', variant: 'cta' }),
  });

  const response = await runBlast(request);
  if (!response.ok || !response.body) {
    const detail = await response.text().catch(() => '');
    throw new Error(`blast respondió ${response.status}: ${detail.slice(0, 200)}`);
  }

  // El blast emite SSE ("data: {...}\n\n"). Interesa el último evento: es el
  // resumen, o el error si algo reventó a mitad del recorrido.
  const text = await new Response(response.body).text();
  let last: BlastProgressEvent | null = null;
  for (const line of text.split('\n')) {
    if (!line.startsWith('data: ')) continue;
    try {
      last = JSON.parse(line.slice(6)) as BlastProgressEvent;
    } catch {
      // Un fragmento suelto no invalida el resto del recorrido.
    }
  }

  if (!last) throw new Error('el blast no emitió ningún evento');
  if (last.type === 'error') throw new Error(last.message || 'el blast terminó en error');
  return { processed: last.processed, errors: last.errors };
}

export async function GET(request: NextRequest) {
  if (!verifyCronSecret(request.headers.get('authorization'))) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  const today = firmToday();
  const origin = new URL(request.url).origin;

  // --- 1. Publicar ---
  // Se revalida lo que ha salido en los últimos días, no solo lo de hoy: si el
  // cron no corrió ayer, el artículo de ayer seguiría oculto. revalidatePath es
  // idempotente, así que repetir no cuesta nada.
  const since = daysBefore(today, REVALIDATE_WINDOW_DAYS);
  const justPublished = ALL_BLOG_POSTS.filter(
    (post) => isPublished(post, today) && post.date >= since,
  );

  const revalidated: string[] = [];
  if (justPublished.length > 0) {
    const paths = new Set(justPublished.flatMap((post) => pathsFor(post.slug)));
    for (const path of paths) {
      revalidatePath(path);
      revalidated.push(path);
    }
  }

  // --- 2. Avisar al newsletter ---
  const language = newsletterLanguage();
  let newsletter: Record<string, unknown> = { sent: false, reason: 'nada pendiente' };

  try {
    const claimed = await listClaimedSlugs();
    const pending = newsletterDue(ALL_BLOG_POSTS, today).filter((post) => !claimed.has(post.slug));
    const next = pending[0];

    if (next) {
      // Reservar antes de mandar: ver blogBlastLedger.
      if (!(await claimBlast(next.slug, language))) {
        newsletter = { sent: false, slug: next.slug, reason: 'ya reservado por otra ejecución' };
      } else {
        const result = await sendBlast(next.slug, language, origin);
        await recordBlastResult(next.slug, language, result).catch(() => {
          // El correo ya salió; que no se pueda cerrar el registro no lo
          // deshace. La reserva sigue puesta, así que no se reenviará.
          console.error(JSON.stringify({ event: 'cron_ledger_write_failed', slug: next.slug }));
        });
        newsletter = {
          sent: true,
          slug: next.slug,
          language,
          scheduledFor: newsletterDateOf(next),
          ...result,
          remaining: pending.length - 1,
        };
      }
    }
  } catch (error) {
    // Que falle el correo no invalida la publicación, que ya está hecha.
    const message = error instanceof Error ? error.message : 'error desconocido';
    console.error(JSON.stringify({ event: 'cron_newsletter_failed', message }));
    newsletter = { sent: false, error: message };
  }

  const summary = {
    ok: true,
    today,
    published: ALL_BLOG_POSTS.filter((post) => isPublished(post, today)).length,
    scheduled: ALL_BLOG_POSTS.filter((post) => !isPublished(post, today)).length,
    revalidated: revalidated.length,
    newsletter,
  };
  console.log(JSON.stringify({ event: 'cron_publish_blog', ...summary }));
  return NextResponse.json(summary);
}
