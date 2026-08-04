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

interface NewsletterCtaEmailProps {
  firstName: string;
  language: 'es' | 'en';
  editionTitle: string;
  editionDescription: string;
  editionSlug: string;
  sections: Array<{ heading: string; body: string }>;
  /** Signed unsubscribe URL for this recipient. Falls back to the bare page. */
  unsubscribeUrl?: string;
}

const SITE_URL = 'https://www.manuelsolis.com';

// TODO (Marketing): reemplazar el copy de lorem-ipsum con los textos oficiales
// de cada variante. Los placeholders marcan el largo sugerido; la estructura
// visual debe quedar igual.
const placeholderCopy = {
  es: {
    preview: 'Actualizaciones migratorias — Oficinas Legales de Manuel Solis',
    eyebrow: 'Newsletter',
    greeting: (name: string) => (name ? `Hola ${name},` : 'Hola,'),
    intro:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Estas son las actualizaciones más recientes en materia migratoria que pueden impactar tu caso o el de tu familia.',
    ctaLead: 'Si tu caso es urgente, no esperes:',
    ctaButton: 'Agenda tu consulta',
    ctaSub: 'Respuesta en menos de 24 horas · Atención personalizada',
    readMore: 'Ver edición completa',
    footerNote:
      'Recibes este correo porque te suscribiste a nuestro newsletter.',
    unsubscribe: 'Cancelar suscripción',
  },
  en: {
    preview: 'Immigration updates — Manuel Solis Law Offices',
    eyebrow: 'Newsletter',
    greeting: (name: string) => (name ? `Hello ${name},` : 'Hello,'),
    intro:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. These are the most recent immigration updates that may impact your case or your family.',
    ctaLead: 'If your case is urgent, do not wait:',
    ctaButton: 'Schedule your consultation',
    ctaSub: 'Response in under 24 hours · Personalized attention',
    readMore: 'Read the full edition',
    footerNote: 'You are receiving this email because you subscribed to our newsletter.',
    unsubscribe: 'Unsubscribe',
  },
};

export function NewsletterCtaEmail({
  firstName,
  language = 'es',
  editionTitle,
  editionDescription,
  editionSlug,
  sections,
  unsubscribeUrl,
}: NewsletterCtaEmailProps) {
  const t = placeholderCopy[language] || placeholderCopy.es;
  const editionUrl = `${SITE_URL}/${language}/newsletter/${editionSlug}`;
  const bookUrl = `${SITE_URL}/${language}/consulta`;
  const unsubscribeHref =
    unsubscribeUrl || `${SITE_URL}/${language}/newsletter/unsubscribe`;

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
            <Heading style={heading}>{editionTitle}</Heading>
            <Text style={greeting}>{t.greeting(firstName)}</Text>
            <Text style={paragraph}>{t.intro}</Text>
            <Text style={paragraph}>{editionDescription}</Text>

            {sections.slice(0, 3).map((s, i) => (
              <Section key={i} style={articleBlock}>
                <Heading as="h3" style={sectionHeading}>
                  {s.heading}
                </Heading>
                <Text style={paragraph}>{s.body}</Text>
              </Section>
            ))}

            <Section style={readMoreSection}>
              <Link href={editionUrl} style={readMoreLink}>
                {t.readMore} →
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
            <Link href={unsubscribeHref} style={unsubscribeLink}>
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

export default NewsletterCtaEmail;

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
  margin: '24px 0',
};
const contentSection: React.CSSProperties = { padding: '40px' };
const eyebrow: React.CSSProperties = {
  fontSize: '12px',
  letterSpacing: '2px',
  textTransform: 'uppercase' as const,
  color: '#B2904D',
  fontWeight: 700,
  marginBottom: '8px',
};
const heading: React.CSSProperties = {
  fontSize: '26px',
  fontWeight: 700,
  color: '#001540',
  marginTop: 0,
  marginBottom: '16px',
  lineHeight: '1.25',
};
const greeting: React.CSSProperties = {
  fontSize: '16px',
  color: '#001540',
  fontWeight: 600,
  marginBottom: '8px',
};
const paragraph: React.CSSProperties = {
  fontSize: '15px',
  lineHeight: '1.7',
  color: '#374151',
  marginBottom: '14px',
};
const articleBlock: React.CSSProperties = { marginTop: '20px' };
const sectionHeading: React.CSSProperties = {
  fontSize: '17px',
  fontWeight: 700,
  color: '#001540',
  marginBottom: '6px',
  marginTop: 0,
};
const readMoreSection: React.CSSProperties = {
  marginTop: '20px',
  marginBottom: '4px',
};
const readMoreLink: React.CSSProperties = {
  fontSize: '14px',
  color: '#B2904D',
  fontWeight: 600,
  textDecoration: 'none',
};
const ctaBlock: React.CSSProperties = {
  textAlign: 'center' as const,
  backgroundColor: '#fbf7ef',
  padding: '24px 20px',
  borderRadius: '6px',
  marginTop: '8px',
};
const ctaLead: React.CSSProperties = {
  fontSize: '14px',
  color: '#374151',
  marginBottom: '12px',
  fontWeight: 600,
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
