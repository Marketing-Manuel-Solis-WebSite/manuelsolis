import { NextRequest } from 'next/server';
import { render } from '@react-email/render';
import { newsletters } from '../../../lib/newsletterData';
import {
  ADMIN_COOKIE_NAME,
  isSameOriginRequest,
  verifySessionToken,
} from '../../../lib/newsletter/auth';
import { getBlogPostBySlug } from '../../../lib/newsletter/blogIndex';
import type { BlastVariant, Language } from '../../../lib/newsletter/types';
import { NewsletterCtaEmail } from '../../../../emails/newsletterCta';
import { NewsletterNoCtaEmail } from '../../../../emails/newsletterNoCta';
import { NewsletterBlogCtaEmail } from '../../../../emails/newsletterBlogCta';
import { NewsletterBlogNoCtaEmail } from '../../../../emails/newsletterBlogNoCta';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type ContentType = 'edition' | 'blog';

function unauthorized() {
  return new Response(JSON.stringify({ ok: false, error: 'Unauthorized' }), {
    status: 401,
    headers: { 'Content-Type': 'application/json' },
  });
}

function buildSubject(title: string, language: Language, kind: ContentType): string {
  if (kind === 'blog') {
    return language === 'es' ? `Nuevo en el blog · ${title}` : `New on the blog · ${title}`;
  }
  return `Newsletter · ${title}`;
}

export async function GET(request: NextRequest) {
  const cookieToken = request.cookies.get(ADMIN_COOKIE_NAME)?.value ?? null;
  if (!verifySessionToken(cookieToken)) return unauthorized();

  const origin = request.headers.get('origin');
  const host = request.headers.get('host');
  if (origin && !isSameOriginRequest(origin, host)) {
    return new Response(JSON.stringify({ ok: false, error: 'Cross-origin not allowed' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const params = request.nextUrl.searchParams;
  const slug = params.get('slug')?.trim() ?? '';
  const language: Language = params.get('language') === 'en' ? 'en' : 'es';
  const contentType: ContentType = params.get('contentType') === 'blog' ? 'blog' : 'edition';
  const variant: BlastVariant = params.get('variant') === 'no-cta' ? 'no-cta' : 'cta';
  const firstName = (params.get('firstName') ?? '').trim().slice(0, 60);
  const format = params.get('format') === 'json' ? 'json' : 'html';

  if (!slug) {
    return new Response(JSON.stringify({ ok: false, error: 'Missing slug' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let element: React.ReactElement;
  let subject: string;

  if (contentType === 'blog') {
    const blog = getBlogPostBySlug(slug);
    if (!blog) {
      return new Response(JSON.stringify({ ok: false, error: `Blog post not found: ${slug}` }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    const props = {
      firstName,
      language,
      blogTitle: blog.title[language],
      blogExcerpt: blog.excerpt[language],
      blogSlug: blog.slug,
      blogImage: blog.image,
      blogCategory: blog.category[language],
      blogAuthor: blog.author,
      blogDate: blog.date,
      blogReadTime: blog.readTime,
    };
    element =
      variant === 'no-cta' ? NewsletterBlogNoCtaEmail(props) : NewsletterBlogCtaEmail(props);
    subject = buildSubject(blog.title[language], language, 'blog');
  } else {
    const edition = newsletters.find((n) => n.slug === slug);
    if (!edition) {
      return new Response(JSON.stringify({ ok: false, error: `Edition not found: ${slug}` }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    const props = {
      firstName,
      language,
      editionTitle: edition.title[language],
      editionDescription: edition.description[language],
      editionSlug: edition.slug,
      sections: edition.content[language].map((s) => ({ heading: s.heading, body: s.body })),
    };
    element = variant === 'no-cta' ? NewsletterNoCtaEmail(props) : NewsletterCtaEmail(props);
    subject = buildSubject(edition.title[language], language, 'edition');
  }

  const html = await render(element, { pretty: false });

  if (format === 'json') {
    return new Response(JSON.stringify({ ok: true, subject, html }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-store',
        'X-Robots-Tag': 'noindex, nofollow',
      },
    });
  }

  return new Response(html, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Robots-Tag': 'noindex, nofollow',
      'Content-Security-Policy': "frame-ancestors 'self'",
    },
  });
}
