import { NextRequest } from 'next/server';
import { newsletters } from '../../../lib/newsletterData';
import { extractBearer, verifyBlastSecret } from '../../../lib/newsletter/auth';
import {
  BosRateLimiter,
  lookupPersonByEmail,
} from '../../../lib/newsletter/bosClient';
import {
  bosLookupFailedFallback,
  classify,
} from '../../../lib/newsletter/classify';
import {
  fetchActiveSubscribers,
  getResend,
} from '../../../lib/newsletter/resendAudience';
import type {
  BlastProgressEvent,
  BlastVariant,
  Language,
  ResendContact,
} from '../../../lib/newsletter/types';
import { NewsletterCtaEmail } from '../../../../emails/newsletterCta';
import { NewsletterNoCtaEmail } from '../../../../emails/newsletterNoCta';

export const runtime = 'nodejs';
export const maxDuration = 300;
export const dynamic = 'force-dynamic';

const FROM_ADDRESS = 'Manuel Solis Law <newsletter@manuelsolis.com>';
const DEFAULT_MAX_PER_RUN = 250;

let activeBlast = false;

interface BlastRequestBody {
  slug?: string;
  language?: Language;
  dryRun?: boolean;
  testEmails?: string[];
}

export async function POST(request: NextRequest) {
  const token = extractBearer(request.headers.get('authorization'));
  if (!verifyBlastSecret(token)) {
    return new Response(
      JSON.stringify({ ok: false, error: 'Unauthorized' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } },
    );
  }

  if (activeBlast) {
    return new Response(
      JSON.stringify({ ok: false, error: 'Another blast is already running' }),
      { status: 409, headers: { 'Content-Type': 'application/json' } },
    );
  }

  let body: BlastRequestBody;
  try {
    body = (await request.json()) as BlastRequestBody;
  } catch {
    return new Response(
      JSON.stringify({ ok: false, error: 'Invalid JSON body' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } },
    );
  }

  const slug = body.slug?.trim();
  const language: Language = body.language === 'en' ? 'en' : 'es';
  const dryRun = Boolean(body.dryRun);
  const testEmails = Array.isArray(body.testEmails)
    ? body.testEmails.map((e) => String(e).trim().toLowerCase()).filter(Boolean)
    : null;

  if (!slug) {
    return new Response(
      JSON.stringify({ ok: false, error: 'Missing slug' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } },
    );
  }

  const edition = newsletters.find((n) => n.slug === slug);
  if (!edition) {
    return new Response(
      JSON.stringify({ ok: false, error: `Edition not found: ${slug}` }),
      { status: 404, headers: { 'Content-Type': 'application/json' } },
    );
  }

  activeBlast = true;

  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();
      const send = (event: BlastProgressEvent) => {
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify(event)}\n\n`),
        );
      };

      const counters = { processed: 0, total: 0, withCta: 0, withoutCta: 0, errors: 0 };
      const maxPerRun = Number(process.env.BLAST_MAX_PER_RUN || DEFAULT_MAX_PER_RUN);

      try {
        let subscribers: ResendContact[];

        if (testEmails && testEmails.length > 0) {
          subscribers = testEmails.map((email) => ({
            id: `test-${email}`,
            email,
            first_name: undefined,
            last_name: undefined,
            unsubscribed: false,
          }));
        } else {
          subscribers = await fetchActiveSubscribers();
        }

        if (subscribers.length === 0) {
          counters.total = 0;
          send({ type: 'summary', ...counters, message: 'No active subscribers' });
          controller.close();
          return;
        }

        if (subscribers.length > maxPerRun) {
          send({
            type: 'error',
            ...counters,
            message: `Audience (${subscribers.length}) exceeds BLAST_MAX_PER_RUN (${maxPerRun}). Increase the env var or migrate to chunked mode.`,
          });
          controller.close();
          return;
        }

        counters.total = subscribers.length;
        send({
          type: 'started',
          ...counters,
          message: dryRun ? 'Dry run started' : 'Blast started',
        });

        const resend = dryRun ? null : getResend();
        const limiter = new BosRateLimiter(55, 60_000);

        for (const subscriber of subscribers) {
          counters.processed += 1;

          let variant: BlastVariant;
          let lookupFailed = false;

          try {
            await limiter.acquire();
            const result = await lookupPersonByEmail(subscriber.email);
            lookupFailed = result.failed;
            variant = lookupFailed
              ? bosLookupFailedFallback()
              : classify(result.person);

            if (!subscriber.first_name && result.person?.first_name) {
              subscriber.first_name = prettyName(result.person.first_name);
            }
          } catch {
            lookupFailed = true;
            variant = bosLookupFailedFallback();
          }

          if (variant === 'cta') counters.withCta += 1;
          else counters.withoutCta += 1;

          try {
            if (!dryRun && resend) {
              const subject = buildSubject(edition.title[language], language);
              const react = renderVariant(variant, {
                firstName: prettyName(subscriber.first_name || ''),
                language,
                editionTitle: edition.title[language],
                editionDescription: edition.description[language],
                editionSlug: edition.slug,
                sections: edition.content[language].map((s) => ({
                  heading: s.heading,
                  body: s.body,
                })),
              });

              await resend.emails.send({
                from: FROM_ADDRESS,
                to: subscriber.email,
                subject,
                react,
                headers: {
                  'List-Unsubscribe': `<https://www.manuelsolis.com/${language}/newsletter/unsubscribe?email=${encodeURIComponent(
                    subscriber.email,
                  )}>`,
                  'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
                },
              });
            }
          } catch {
            counters.errors += 1;
            if (variant === 'cta') counters.withCta -= 1;
            else counters.withoutCta -= 1;
          }

          send({
            type: 'progress',
            ...counters,
            currentEmail: maskEmail(subscriber.email),
            message: lookupFailed ? 'BOS lookup failed, defaulted to CTA' : undefined,
          });
        }

        send({
          type: 'summary',
          ...counters,
          message: dryRun ? 'Dry run finished' : 'Blast finished',
        });
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        send({ type: 'error', ...counters, message });
      } finally {
        activeBlast = false;
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
      'X-Accel-Buffering': 'no',
      'X-Robots-Tag': 'noindex, nofollow',
    },
  });
}

function buildSubject(title: string, language: Language): string {
  const prefix = language === 'es' ? 'Newsletter · ' : 'Newsletter · ';
  return `${prefix}${title}`;
}

function renderVariant(
  variant: BlastVariant,
  props: {
    firstName: string;
    language: Language;
    editionTitle: string;
    editionDescription: string;
    editionSlug: string;
    sections: Array<{ heading: string; body: string }>;
  },
): React.ReactElement {
  if (variant === 'no-cta') {
    return NewsletterNoCtaEmail(props);
  }
  return NewsletterCtaEmail(props);
}

function prettyName(raw: string): string {
  if (!raw) return '';
  const first = raw.split(/\s+/)[0] || '';
  return first.charAt(0).toUpperCase() + first.slice(1).toLowerCase();
}

function maskEmail(email: string): string {
  const [user, domain] = email.split('@');
  if (!domain) return email;
  const masked = user.length <= 2 ? user[0] + '*' : user[0] + '***' + user[user.length - 1];
  return `${masked}@${domain}`;
}
