import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface NewsletterBlogCtaEmailProps {
  firstName: string;
  language: 'es' | 'en';
  blogTitle: string;
  blogExcerpt: string;
  blogSlug: string;
  blogImage: string;
  blogCategory: string;
  blogAuthor: string;
  blogDate: string;
  blogReadTime: string;
}

const SITE_URL = 'https://www.manuelsolis.com';

const copy = {
  es: {
    preview: 'Nuevo artículo en el blog · Oficinas Legales de Manuel Solis',
    eyebrow: 'Nuevo en el blog',
    greeting: (name: string) => (name ? `Hola ${name},` : 'Hola,'),
    intro: 'Acabamos de publicar un nuevo artículo que puede ayudarte:',
    metaBy: 'Por',
    metaRead: 'de lectura',
    readArticle: 'Leer el artículo completo',
    ctaLead: '¿Necesitas asesoría sobre tu caso?',
    ctaButton: 'Agenda tu consulta',
    ctaSub: 'Respuesta en menos de 24 horas · Atención personalizada',
    footerNote: 'Recibes este correo porque te suscribiste a nuestro newsletter.',
    unsubscribe: 'Cancelar suscripción',
  },
  en: {
    preview: 'New blog article · Manuel Solis Law Offices',
    eyebrow: 'New on the blog',
    greeting: (name: string) => (name ? `Hello ${name},` : 'Hello,'),
    intro: 'We just published a new article that may help you:',
    metaBy: 'By',
    metaRead: 'read',
    readArticle: 'Read the full article',
    ctaLead: 'Need legal advice on your case?',
    ctaButton: 'Schedule your consultation',
    ctaSub: 'Response in under 24 hours · Personalized attention',
    footerNote: 'You are receiving this email because you subscribed to our newsletter.',
    unsubscribe: 'Unsubscribe',
  },
};

function formatDate(iso: string, language: 'es' | 'en'): string {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString(language === 'es' ? 'es-MX' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return iso;
  }
}

function absoluteImage(image: string): string {
  if (image.startsWith('http://') || image.startsWith('https://')) return image;
  return `${SITE_URL}${image.startsWith('/') ? '' : '/'}${image}`;
}

export function NewsletterBlogCtaEmail({
  firstName,
  language = 'es',
  blogTitle,
  blogExcerpt,
  blogSlug,
  blogImage,
  blogCategory,
  blogAuthor,
  blogDate,
  blogReadTime,
}: NewsletterBlogCtaEmailProps) {
  const t = copy[language] || copy.es;
  const articleUrl = `${SITE_URL}/${language}/blog/${blogSlug}`;
  const bookUrl = `${SITE_URL}/${language}/consulta`;
  const heroImage = absoluteImage(blogImage);

  return (
    <Html>
      <Head />
      <Preview>{t.preview}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={headerSection}>
            <Img
              src={`${SITE_URL}/logo-manuel-solis.png`}
              width="220"
              height="66"
              alt="Manuel Solis Law Firm"
              style={logo}
            />
          </Section>

          <Hr style={goldLine} />

          <Section style={contentSection}>
            <Text style={eyebrow}>{t.eyebrow}</Text>
            <Text style={greeting}>{t.greeting(firstName)}</Text>
            <Text style={paragraph}>{t.intro}</Text>

            <Link href={articleUrl} style={imageLink}>
              <Img
                src={heroImage}
                alt={blogTitle}
                width="600"
                height="315"
                style={heroImg}
              />
            </Link>

            <Text style={categoryBadge}>{blogCategory}</Text>

            <Heading style={heading}>
              <Link href={articleUrl} style={titleLink}>
                {blogTitle}
              </Link>
            </Heading>

            <Text style={metaLine}>
              {t.metaBy} <strong>{blogAuthor}</strong> · {formatDate(blogDate, language)} · {blogReadTime} {t.metaRead}
            </Text>

            <Text style={paragraph}>{blogExcerpt}</Text>

            <Section style={readMoreSection}>
              <Link href={articleUrl} style={readMoreButton}>
                {t.readArticle} →
              </Link>
            </Section>

            <Hr style={thinRule} />

            <Section style={ctaBlock}>
              <Text style={ctaLead}>{t.ctaLead}</Text>
              <Link href={bookUrl} style={ctaButton}>
                {t.ctaButton}
              </Link>
              <Text style={ctaSub}>{t.ctaSub}</Text>
            </Section>
          </Section>

          <Hr style={goldLine} />

          <Section style={footerSection}>
            <Text style={footerText}>{t.footerNote}</Text>
            <Link
              href={`${SITE_URL}/${language}/newsletter/unsubscribe`}
              style={unsubscribeLink}
            >
              {t.unsubscribe}
            </Link>
            <Text style={footerText}>
              © {new Date().getFullYear()} Manuel Solis Law Firm
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export default NewsletterBlogCtaEmail;

const main: React.CSSProperties = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, sans-serif',
};
const container: React.CSSProperties = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  maxWidth: '600px',
  borderRadius: '8px',
  overflow: 'hidden',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)',
};
const headerSection: React.CSSProperties = {
  backgroundColor: '#001540',
  padding: '32px 40px',
  textAlign: 'center' as const,
};
const logo: React.CSSProperties = { margin: '0 auto' };
const goldLine: React.CSSProperties = {
  border: 'none',
  borderTop: '3px solid #B2904D',
  margin: '0',
};
const thinRule: React.CSSProperties = {
  border: 'none',
  borderTop: '1px solid #e5e7eb',
  margin: '28px 0',
};
const contentSection: React.CSSProperties = { padding: '40px' };
const eyebrow: React.CSSProperties = {
  fontSize: '12px',
  letterSpacing: '2px',
  textTransform: 'uppercase' as const,
  color: '#B2904D',
  fontWeight: 700,
  marginBottom: '12px',
  marginTop: 0,
};
const greeting: React.CSSProperties = {
  fontSize: '16px',
  color: '#001540',
  fontWeight: 600,
  marginBottom: '8px',
  marginTop: 0,
};
const heading: React.CSSProperties = {
  fontSize: '24px',
  fontWeight: 700,
  color: '#001540',
  marginTop: '8px',
  marginBottom: '12px',
  lineHeight: '1.3',
};
const titleLink: React.CSSProperties = {
  color: '#001540',
  textDecoration: 'none',
};
const paragraph: React.CSSProperties = {
  fontSize: '15px',
  lineHeight: '1.7',
  color: '#374151',
  marginBottom: '14px',
};
const imageLink: React.CSSProperties = {
  display: 'block',
  marginTop: '16px',
  marginBottom: '20px',
  textDecoration: 'none',
};
const heroImg: React.CSSProperties = {
  display: 'block',
  width: '100%',
  height: 'auto',
  borderRadius: '8px',
  border: '1px solid #e5e7eb',
};
const categoryBadge: React.CSSProperties = {
  display: 'inline-block',
  fontSize: '11px',
  fontWeight: 700,
  letterSpacing: '1px',
  textTransform: 'uppercase' as const,
  color: '#ffffff',
  backgroundColor: '#001540',
  padding: '4px 10px',
  borderRadius: '999px',
  marginBottom: '12px',
  marginTop: 0,
};
const metaLine: React.CSSProperties = {
  fontSize: '13px',
  color: '#6b7280',
  marginTop: 0,
  marginBottom: '16px',
};
const readMoreSection: React.CSSProperties = {
  marginTop: '8px',
  marginBottom: '8px',
  textAlign: 'left' as const,
};
const readMoreButton: React.CSSProperties = {
  display: 'inline-block',
  fontSize: '14px',
  color: '#001540',
  fontWeight: 700,
  textDecoration: 'none',
  borderBottom: '2px solid #B2904D',
  paddingBottom: '2px',
};
const ctaBlock: React.CSSProperties = {
  textAlign: 'center' as const,
  backgroundColor: '#fbf7ef',
  padding: '24px 20px',
  borderRadius: '6px',
  marginTop: '8px',
};
const ctaLead: React.CSSProperties = {
  fontSize: '15px',
  color: '#001540',
  marginBottom: '14px',
  fontWeight: 700,
  marginTop: 0,
};
const ctaButton: React.CSSProperties = {
  backgroundColor: '#B2904D',
  color: '#ffffff',
  padding: '14px 28px',
  borderRadius: '8px',
  fontSize: '15px',
  fontWeight: 700,
  textDecoration: 'none',
  display: 'inline-block',
};
const ctaSub: React.CSSProperties = {
  fontSize: '12px',
  color: '#6b7280',
  marginTop: '12px',
  marginBottom: 0,
};
const footerSection: React.CSSProperties = {
  padding: '24px 40px',
  textAlign: 'center' as const,
  backgroundColor: '#f9fafb',
};
const footerText: React.CSSProperties = {
  fontSize: '13px',
  color: '#9ca3af',
  marginBottom: '8px',
};
const unsubscribeLink: React.CSSProperties = {
  fontSize: '13px',
  color: '#B2904D',
  textDecoration: 'underline',
};
