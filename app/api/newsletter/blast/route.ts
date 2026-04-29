import { NextRequest } from 'next/server';
import { newsletters } from '../../../lib/newsletterData';
import {
  ADMIN_COOKIE_NAME,
  extractBearer,
  isSameOriginRequest,
  verifyBlastSecret,
  verifySessionToken,
} from '../../../lib/newsletter/auth';
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
import { NewsletterBlogCtaEmail } from '../../../../emails/newsletterBlogCta';
import { NewsletterBlogNoCtaEmail } from '../../../../emails/newsletterBlogNoCta';
import {
  getBlogPostBySlug,
  type BlogPostMeta,
} from '../../../lib/newsletter/blogIndex';

export const runtime = 'nodejs';
export const maxDuration = 300;
export const dynamic = 'force-dynamic';

const DEFAULT_FROM_ADDRESS = 'Manuel Solis Law <newsletter@manuelsolis.com>';
const DEFAULT_MAX_PER_RUN = 1000;
const DEFAULT_SEND_DELAY_MS = 120;

function getFromAddress(): string {
  return process.env.NEWSLETTER_FROM_ADDRESS || DEFAULT_FROM_ADDRESS;
}

let activeBlast = false;

type ContentType = 'edition' | 'blog';

interface BlastRequestBody {
  slug?: string;
  language?: Language;
  dryRun?: boolean;
  testEmails?: string[];
  contentType?: ContentType;
  variant?: BlastVariant;
}

type ResolvedContent =
  | {
      kind: 'edition';
      slug: string;
      title: string;
      description: string;
      sections: Array<{ heading: string; body: string }>;
    }
  | {
      kind: 'blog';
      slug: string;
      title: string;
      excerpt: string;
      image: string;
      category: string;
      author: string;
      date: string;
      readTime: string;
    };

export async function POST(request: NextRequest) {
  const bearer = extractBearer(request.headers.get('authorization'));
  const cookieToken = request.cookies.get(ADMIN_COOKIE_NAME)?.value ?? null;
  const bearerOk = verifyBlastSecret(bearer);
  const cookieOk = verifySessionToken(cookieToken);

  if (!bearerOk && !cookieOk) {
    return new Response(
      JSON.stringify({ ok: false, error: 'Unauthorized' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } },
    );
  }

  if (cookieOk && !bearerOk) {
    const origin = request.headers.get('origin');
    const host = request.headers.get('host');
    if (!isSameOriginRequest(origin, host)) {
      return new Response(
        JSON.stringify({ ok: false, error: 'Cross-origin requests are not allowed for cookie auth' }),
        { status: 403, headers: { 'Content-Type': 'application/json' } },
      );
    }
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
  const contentType: ContentType = body.contentType === 'blog' ? 'blog' : 'edition';
  const variant: BlastVariant = body.variant === 'no-cta' ? 'no-cta' : 'cta';
  const testEmails = Array.isArray(body.testEmails)
    ? body.testEmails.map((e) => String(e).trim().toLowerCase()).filter(Boolean)
    : null;

  if (!slug) {
    return new Response(
      JSON.stringify({ ok: false, error: 'Missing slug' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } },
    );
  }

  let content: ResolvedContent;
  if (contentType === 'blog') {
    const blog = getBlogPostBySlug(slug);
    if (!blog) {
      return new Response(
        JSON.stringify({ ok: false, error: `Blog post not found: ${slug}` }),
        { status: 404, headers: { 'Content-Type': 'application/json' } },
      );
    }
    content = blogToContent(blog, language);
  } else {
    const edition = newsletters.find((n) => n.slug === slug);
    if (!edition) {
      return new Response(
        JSON.stringify({ ok: false, error: `Edition not found: ${slug}` }),
        { status: 404, headers: { 'Content-Type': 'application/json' } },
      );
    }
    content = {
      kind: 'edition',
      slug: edition.slug,
      title: edition.title[language],
      description: edition.description[language],
      sections: edition.content[language].map((s) => ({
        heading: s.heading,
        body: s.body,
      })),
    };
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

      const counters = {
        processed: 0,
        total: 0,
        sent: 0,
        errors: 0,
        // Legacy fields kept in BlastProgressEvent for backward-compat with the
        // SSE consumer; we leave them at 0 since BOS classification is gone.
        withCta: 0,
        withoutCta: 0,
      };
      const maxPerRun = Number(process.env.BLAST_MAX_PER_RUN || DEFAULT_MAX_PER_RUN);
      const sendDelayMs = Number(process.env.BLAST_SEND_DELAY_MS || DEFAULT_SEND_DELAY_MS);

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
          send({
            type: 'summary',
            processed: 0,
            total: 0,
            withCta: 0,
            withoutCta: 0,
            errors: 0,
            message: 'No active subscribers',
          });
          controller.close();
          return;
        }

        if (subscribers.length > maxPerRun) {
          send({
            type: 'error',
            processed: 0,
            total: subscribers.length,
            withCta: 0,
            withoutCta: 0,
            errors: 0,
            message: `Audience (${subscribers.length}) exceeds BLAST_MAX_PER_RUN (${maxPerRun}). Increase the env var or migrate to chunked mode.`,
          });
          controller.close();
          return;
        }

        counters.total = subscribers.length;
        send({
          type: 'started',
          processed: counters.processed,
          total: counters.total,
          withCta: 0,
          withoutCta: 0,
          errors: counters.errors,
          message: dryRun ? 'Dry run started' : 'Blast started',
        });

        const resend = dryRun ? null : getResend();

        for (const subscriber of subscribers) {
          counters.processed += 1;

          let sendErrorMessage: string | null = null;
          try {
            if (!dryRun && resend) {
              const subject = buildSubject(content.title, language, content.kind);
              const react = renderEmail(
                variant,
                content,
                prettyName(subscriber.first_name || ''),
                language,
              );

              const result = await resend.emails.send({
                from: getFromAddress(),
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

              if (result?.error) {
                const err = result.error as { name?: string; message?: string };
                sendErrorMessage = `Resend ${err.name ?? 'error'}: ${err.message ?? JSON.stringify(result.error)}`;
              } else {
                const id = (result?.data as { id?: string } | undefined)?.id;
                console.log(
                  `[blast] sent to ${subscriber.email}` + (id ? ` (resend id=${id})` : ''),
                );
              }
            }
          } catch (sendErr) {
            sendErrorMessage =
              sendErr instanceof Error ? sendErr.message : 'Unknown send error';
          }

          if (sendErrorMessage) {
            counters.errors += 1;
            console.error(
              `[blast] send failed for ${subscriber.email}: ${sendErrorMessage}`,
            );
          } else {
            counters.sent += 1;
          }

          send({
            type: 'progress',
            processed: counters.processed,
            total: counters.total,
            withCta: counters.sent,
            withoutCta: 0,
            errors: counters.errors,
            currentEmail: maskEmail(subscriber.email),
            message: sendErrorMessage ?? undefined,
          });

          // Small pause between sends to stay under Resend's per-second rate
          // limit. Skipped on dry-run so previews are instant.
          if (!dryRun && sendDelayMs > 0) {
            await sleep(sendDelayMs);
          }
        }

        send({
          type: 'summary',
          processed: counters.processed,
          total: counters.total,
          withCta: counters.sent,
          withoutCta: 0,
          errors: counters.errors,
          message: dryRun ? 'Dry run finished' : 'Blast finished',
        });
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        send({
          type: 'error',
          processed: counters.processed,
          total: counters.total,
          withCta: counters.sent,
          withoutCta: 0,
          errors: counters.errors,
          message,
        });
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

function buildSubject(title: string, language: Language, kind: 'edition' | 'blog'): string {
  if (kind === 'blog') {
    return language === 'es' ? `Nuevo en el blog · ${title}` : `New on the blog · ${title}`;
  }
  return `Newsletter · ${title}`;
}

function renderEmail(
  variant: BlastVariant,
  content: ResolvedContent,
  firstName: string,
  language: Language,
): React.ReactElement {
  if (content.kind === 'blog') {
    const props = {
      firstName,
      language,
      blogTitle: content.title,
      blogExcerpt: content.excerpt,
      blogSlug: content.slug,
      blogImage: content.image,
      blogCategory: content.category,
      blogAuthor: content.author,
      blogDate: content.date,
      blogReadTime: content.readTime,
    };
    return variant === 'no-cta'
      ? NewsletterBlogNoCtaEmail(props)
      : NewsletterBlogCtaEmail(props);
  }

  const props = {
    firstName,
    language,
    editionTitle: content.title,
    editionDescription: content.description,
    editionSlug: content.slug,
    sections: content.sections,
  };
  return variant === 'no-cta'
    ? NewsletterNoCtaEmail(props)
    : NewsletterCtaEmail(props);
}

function blogToContent(blog: BlogPostMeta, language: Language): ResolvedContent {
  return {
    kind: 'blog',
    slug: blog.slug,
    title: blog.title[language],
    excerpt: blog.excerpt[language],
    image: blog.image,
    category: blog.category[language],
    author: blog.author,
    date: blog.date,
    readTime: blog.readTime,
  };
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

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
