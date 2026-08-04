import { NextRequest, NextResponse } from 'next/server';
import { checkBotId } from 'botid/server';
import { Resend } from 'resend';
import { rateLimit } from '../../../lib/rateLimit';
import { WelcomeEmail } from '../../../../emails/welcome';
import {
  buildUnsubscribeApiUrl,
  buildUnsubscribePageUrl,
} from '../../../lib/newsletter/unsubscribeToken';

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error('RESEND_API_KEY is not configured');
  return new Resend(key);
}

function getAudienceId() {
  const id = process.env.RESEND_AUDIENCE_ID;
  if (!id) throw new Error('RESEND_AUDIENCE_ID is not configured');
  return id;
}

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      'anonymous';

    const { success: rateLimitOk } = rateLimit(`newsletter:${ip}`, 3, 60000);
    if (!rateLimitOk) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please wait.' },
        { status: 429, headers: { 'Retry-After': '60' } },
      );
    }

    // Vercel BotID — Basic Detection in report-only mode by default.
    // Promote to BOTID_MODE=block after 7 days if false-positive rate is OK.
    //
    // Bloquear exige que el cliente esté inicializado
    // (NEXT_PUBLIC_BOTID_CLIENT_ENABLED, ver instrumentation-client.ts): sin
    // él el fetch del navegador no lleva challenge y checkBotId() marca como
    // bot al tráfico legítimo, así que BOTID_MODE=block a solas devolvería 403
    // al 100% de las altas. En esa configuración se registra pero no bloquea.
    const botidClientEnabled = process.env.NEXT_PUBLIC_BOTID_CLIENT_ENABLED === 'true';
    const configuredBotMode = process.env.BOTID_MODE ?? 'report-only';
    const botBlockDowngraded = configuredBotMode === 'block' && !botidClientEnabled;
    const botMode = botBlockDowngraded ? 'report-only' : configuredBotMode;
    const verification = await checkBotId();
    if (verification.isBot) {
      const detection = JSON.stringify({
        event: 'botid_detected',
        endpoint: '/api/newsletter/subscribe',
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

    const { email, firstName, language = 'es' } = await request.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email address.' },
        { status: 400 },
      );
    }

    const resend = getResend();
    const audienceId = getAudienceId();

    // Add contact to Resend audience
    await resend.contacts.create({
      email,
      firstName: firstName || '',
      unsubscribed: false,
      audienceId,
    });

    // Send welcome email. Lleva los mismos encabezados de baja que el blast:
    // Gmail y Yahoo los exigen en todo correo masivo, incluido el de alta.
    await resend.emails.send({
      from: 'Manuel Solis Law <newsletter@manuelsolis.com>',
      to: email,
      subject:
        language === 'es'
          ? '¡Bienvenido al Newsletter de Manuel Solis!'
          : 'Welcome to the Manuel Solis Newsletter!',
      react: WelcomeEmail({
        firstName: firstName || '',
        language,
        unsubscribeUrl: buildUnsubscribePageUrl(language, email),
      }),
      headers: {
        'List-Unsubscribe': `<${buildUnsubscribeApiUrl(language, email)}>`,
        'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
      },
    });

    // Traza de la alta para conciliar el funnel de suscripción. El evento de
    // conversión lo dispara el cliente con fireConversion() tras el response.ok
    // (el ledger propio se alimenta desde ahí, no desde aquí, para no contar
    // dos veces la misma suscripción). Sin correo: es PII y no hace falta.
    console.log(
      JSON.stringify({
        event: 'newsletter_subscribed',
        language: language === 'en' ? 'en' : 'es',
        has_name: Boolean(firstName),
        timestamp: new Date().toISOString(),
      }),
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Newsletter subscribe error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to subscribe. Please try again.' },
      { status: 500 },
    );
  }
}
