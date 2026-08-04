import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { isSameOriginRequest } from '../../../lib/newsletter/auth';
import type { Language } from '../../../lib/newsletter/types';
import {
  isUnsubscribeSigningConfigured,
  normalizeUnsubscribeEmail,
  verifyUnsubscribeToken,
} from '../../../lib/newsletter/unsubscribeToken';

export const runtime = 'nodejs';

// Value the mail provider posts in the body when the reader uses the native
// unsubscribe button (RFC 8058).
const ONE_CLICK_BODY_VALUE = 'One-Click';

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

type ResendContactRaw = {
  id: string;
  email: string;
};

async function unsubscribeEmail(email: string): Promise<void> {
  const resend = getResend();
  const audienceId = getAudienceId();

  // Find contact by email and unsubscribe
  const contacts = await resend.contacts.list({ audienceId });
  const raw = (contacts.data?.data ?? []) as ResendContactRaw[];
  const contact = raw.find((c) => normalizeUnsubscribeEmail(c.email) === email);

  if (contact) {
    await resend.contacts.update({
      id: contact.id,
      audienceId,
      unsubscribed: true,
    });
  }
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function readLanguage(value: string | null): Language {
  return value === 'en' ? 'en' : 'es';
}

function textResponse(body: string, status: number): Response {
  return new Response(body, {
    status,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Robots-Tag': 'noindex, nofollow',
    },
  });
}

function pageRedirect(
  language: Language,
  state: string,
  email: string,
  token: string,
): Response {
  const params = new URLSearchParams({ state });
  if (email) params.set('email', email);
  if (token) params.set('t', token);

  return new Response(null, {
    status: 303,
    headers: {
      Location: `/${language}/newsletter/unsubscribe?${params.toString()}`,
      'Cache-Control': 'no-store',
      'X-Robots-Tag': 'noindex, nofollow',
    },
  });
}

// A reader whose client does not support one-click may simply open the
// List-Unsubscribe URL: never unsubscribe on GET (scanners and prefetchers do
// it too), hand them the confirmation page instead.
export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  return pageRedirect(
    readLanguage(params.get('lang')),
    'confirm',
    normalizeUnsubscribeEmail(params.get('email') ?? ''),
    params.get('t') ?? '',
  );
}

export async function POST(request: NextRequest) {
  const contentType = request.headers.get('content-type') ?? '';
  const isFormBody =
    contentType.includes('application/x-www-form-urlencoded') ||
    contentType.includes('multipart/form-data');

  if (isFormBody) return handleFormPost(request);

  if (!contentType.includes('application/json')) {
    // RFC 8058 mandates a form body, but a provider that skips it still gets
    // honored as long as the signed link proves the request is ours.
    const query = request.nextUrl.searchParams;
    const email = normalizeUnsubscribeEmail(query.get('email') ?? '');
    if (email && verifyUnsubscribeToken(email, query.get('t'))) {
      return oneClickUnsubscribe(email);
    }
  }

  return handleJsonPost(request);
}

async function oneClickUnsubscribe(email: string): Promise<Response> {
  try {
    await unsubscribeEmail(email);
  } catch (error) {
    console.error('Newsletter unsubscribe error:', error);
    return textResponse('Failed to unsubscribe.', 500);
  }

  console.log(`[unsubscribe] ${email} unsubscribed via one-click`);
  return textResponse('Unsubscribed', 200);
}

async function handleFormPost(request: NextRequest) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return textResponse('Invalid form body', 400);
  }

  const query = request.nextUrl.searchParams;
  const oneClick =
    String(form.get('List-Unsubscribe') ?? '') === ONE_CLICK_BODY_VALUE;
  const email = normalizeUnsubscribeEmail(
    String(form.get('email') ?? query.get('email') ?? ''),
  );
  const token = String(form.get('t') ?? query.get('t') ?? '');
  const language = readLanguage(
    String(form.get('lang') ?? query.get('lang') ?? ''),
  );
  const signed = verifyUnsubscribeToken(email, token);

  if (oneClick) {
    if (!email) return textResponse('Missing email', 400);
    // Nobody sees this request: the signed token is the only evidence it came
    // from an email we sent. Emails sent before signing existed carry no token,
    // but their header pointed elsewhere — those readers land on the page.
    if (!signed && isUnsubscribeSigningConfigured()) {
      return textResponse('Invalid unsubscribe token', 403);
    }
    return oneClickUnsubscribe(email);
  }

  if (!email) return pageRedirect(language, 'missing', '', token);
  if (!isValidEmail(email)) return pageRedirect(language, 'invalid', '', token);

  // The page always sends confirm=1, so a submission without it is not a
  // deliberate opt-out.
  if (String(form.get('confirm') ?? '') !== '1') {
    return pageRedirect(language, 'confirm', email, token);
  }

  if (
    !isSameOriginRequest(
      request.headers.get('origin'),
      request.headers.get('host'),
    )
  ) {
    return textResponse('Cross-origin requests are not allowed', 403);
  }

  try {
    await unsubscribeEmail(email);
  } catch (error) {
    console.error('Newsletter unsubscribe error:', error);
    return pageRedirect(language, 'error', email, token);
  }

  console.log(
    `[unsubscribe] ${email} unsubscribed via page` +
      (signed ? '' : ' (unsigned link)'),
  );
  return pageRedirect(language, 'done', '', '');
}

async function handleJsonPost(request: NextRequest) {
  let payload: { email?: unknown; token?: unknown };
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid JSON body.' },
      { status: 400 },
    );
  }

  const email = normalizeUnsubscribeEmail(
    typeof payload.email === 'string' ? payload.email : '',
  );

  if (!email) {
    return NextResponse.json(
      { success: false, error: 'Email is required.' },
      { status: 400 },
    );
  }

  const token =
    typeof payload.token === 'string'
      ? payload.token
      : (request.nextUrl.searchParams.get('t') ?? '');
  const signed = verifyUnsubscribeToken(email, token);

  // Without a signed token this is an unauthenticated mutation on any known
  // address, so at least refuse requests a third-party site triggered.
  if (
    !signed &&
    !isSameOriginRequest(
      request.headers.get('origin'),
      request.headers.get('host'),
    )
  ) {
    return NextResponse.json(
      { success: false, error: 'Cross-origin requests are not allowed.' },
      { status: 403 },
    );
  }

  try {
    await unsubscribeEmail(email);
  } catch (error) {
    console.error('Newsletter unsubscribe error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to unsubscribe.' },
      { status: 500 },
    );
  }

  console.log(
    `[unsubscribe] ${email} unsubscribed via api` +
      (signed ? '' : ' (unsigned request)'),
  );
  return NextResponse.json({ success: true });
}
