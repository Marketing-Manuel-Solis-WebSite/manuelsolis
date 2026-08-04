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
    const botMode = process.env.BOTID_MODE ?? 'report-only';
    const verification = await checkBotId();
    if (verification.isBot) {
      console.warn(JSON.stringify({
        event: 'botid_detected',
        endpoint: '/api/newsletter/subscribe',
        mode: botMode,
        timestamp: new Date().toISOString(),
        ip,
        ua: request.headers.get('user-agent') ?? null,
      }));
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

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Newsletter subscribe error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to subscribe. Please try again.' },
      { status: 500 },
    );
  }
}
