import { after, NextRequest, NextResponse } from 'next/server';
import { checkBotId } from 'botid/server';
import { rateLimit } from '../../lib/rateLimit';
import {
  detectDeviceTypeFromUA,
  LeadValidationError,
  mapFormToPayload,
  postLead,
  sendLeadFallbackEmail,
  type LeadFormInput,
} from '../../lib/leadCapture';

/**
 * POST /api/lead-capture
 *
 * Replaces the legacy /api/zapier-contact endpoint (the route name
 * was misleading — it never used Zapier; it forwarded to
 * bos.manuelsolis.com/lead/manuelsolis).
 *
 * Pipeline:
 *   1. Rate-limit by IP (5 submissions/minute).
 *   2. Vercel BotID — Basic Detection (report-only by default).
 *   3. Validate + normalize the input via mapFormToPayload (pure).
 *   4. POST to LEAD_CAPTURE_ENDPOINT via postLead: retry/backoff acotado por
 *      timeout y con Idempotency-Key estable para que el reintento no
 *      duplique el lead.
 *   5. Si el POST no llegó a entregarse, email de respaldo con el lead
 *      completo (opt-in vía LEAD_FALLBACK_EMAIL) para que no se pierda.
 *
 * The destination URL is configurable via env so Phase 3b's Solislead
 * cutover is a one-variable change in Vercel — no code change.
 */
export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      'anonymous';

    const { success: rateLimitOk } = rateLimit(`contact:${ip}`, 5, 60000);
    if (!rateLimitOk) {
      return NextResponse.json(
        {
          success: false,
          error: 'Too many requests. Please wait before submitting again.',
        },
        { status: 429, headers: { 'Retry-After': '60' } },
      );
    }

    // Vercel BotID — Basic Detection in report-only mode by default.
    //
    // Bloquear exige que el cliente esté inicializado
    // (NEXT_PUBLIC_BOTID_CLIENT_ENABLED, ver instrumentation-client.ts): sin
    // él el fetch del navegador no lleva challenge y checkBotId() marca como
    // bot al tráfico legítimo, así que BOTID_MODE=block a solas devolvería 403
    // al 100% de los envíos. En esa configuración se registra pero no bloquea.
    const botidClientEnabled = process.env.NEXT_PUBLIC_BOTID_CLIENT_ENABLED === 'true';
    const configuredBotMode = process.env.BOTID_MODE ?? 'report-only';
    const botBlockDowngraded = configuredBotMode === 'block' && !botidClientEnabled;
    const botMode = botBlockDowngraded ? 'report-only' : configuredBotMode;
    const verification = await checkBotId();
    if (verification.isBot) {
      const detection = JSON.stringify({
        event: 'botid_detected',
        endpoint: '/api/lead-capture',
        mode: botMode,
        configured_mode: configuredBotMode,
        client_enabled: botidClientEnabled,
        downgraded: botBlockDowngraded,
        timestamp: new Date().toISOString(),
        ip,
        ua: request.headers.get('user-agent') ?? null,
      });
      if (botBlockDowngraded) console.error(detection);
      else console.warn(detection);
      if (botMode === 'block') {
        return NextResponse.json(
          { success: false, error: 'Access denied' },
          { status: 403 },
        );
      }
    }

    const body = (await request.json()) as Partial<LeadFormInput> & {
      website?: unknown;
    };

    // Honeypot: el campo `website` está oculto en el formulario, así que un
    // humano nunca lo rellena. Se responde 200 sin entregar el lead — decirle
    // al bot que fue detectado solo le enseña a evitar la trampa.
    const honeypot = typeof body.website === 'string' ? body.website.trim() : '';
    if (honeypot) {
      console.warn(
        JSON.stringify({
          event: 'honeypot_triggered',
          endpoint: '/api/lead-capture',
          timestamp: new Date().toISOString(),
          ip,
          ua: request.headers.get('user-agent') ?? null,
        }),
      );
      return NextResponse.json({ success: true }, { status: 200 });
    }

    // Server-side enrichment: derive device_type from UA and country
    // from Vercel/CDN headers, so the client doesn't need to fingerprint.
    const userAgent = request.headers.get('user-agent');
    const country =
      request.headers.get('x-vercel-ip-country') ||
      request.headers.get('cf-ipcountry') ||
      null;

    // Build the input. Required fields trip mapFormToPayload's validate().
    const input: LeadFormInput = {
      first_name: body.first_name ?? '',
      last_name: body.last_name,
      phone: body.phone ?? '',
      email: body.email ?? '',
      enquiry_detail: body.enquiry_detail,
      acceptedTerms: body.acceptedTerms === true,
      marketingConsent: body.marketingConsent === true,
      page_url: body.page_url ?? '',
      language: body.language === 'en' ? 'en' : 'es',
      utm_source: body.utm_source,
      utm_medium: body.utm_medium,
      utm_campaign: body.utm_campaign,
      utm_content: body.utm_content,
      utm_term: body.utm_term,
      gclid: body.gclid,
      fbclid: body.fbclid,
      fbp: body.fbp,
      fbc: body.fbc,
      session_id: body.session_id,
      device_type: detectDeviceTypeFromUA(userAgent),
      country,
      // Match keys de Meta CAPI: la IP y el UA del LEAD en el submit —
      // los eventos Lead Qualified/Purchase los dispara luego un agente
      // desde BOS, y su IP no sirve para el matching (reparo de Oscar).
      client_ip: ip !== 'anonymous' ? ip : null,
      client_user_agent: userAgent,
    };

    let payload;
    try {
      payload = mapFormToPayload(input);
    } catch (err) {
      if (err instanceof LeadValidationError) {
        return NextResponse.json(
          { success: false, error: err.message, field: err.field },
          { status: 400 },
        );
      }
      throw err;
    }

    const result = await postLead(payload);

    if (result.ok) {
      return NextResponse.json({
        success: true,
        attempts: result.attempts,
      });
    }

    // El lead ya no llegó a su destino: el correo de respaldo es la única
    // vía de recuperación. after() lo envía tras responder, para no sumar
    // latencia al formulario.
    after(() => sendLeadFallbackEmail(payload, result));

    // Surface upstream status when present so the client can decide
    // whether to show a retry-friendly message.
    return NextResponse.json(
      {
        success: false,
        error: result.error ?? 'Lead capture failed',
        attempts: result.attempts,
      },
      { status: result.status && result.status >= 400 ? result.status : 502 },
    );
  } catch (err) {
    console.error(
      JSON.stringify({
        event: 'lead_capture_route_error',
        error: err instanceof Error ? err.message : String(err),
        timestamp: new Date().toISOString(),
      }),
    );
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
