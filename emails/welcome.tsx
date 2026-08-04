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

interface WelcomeEmailProps {
  firstName: string;
  language: 'es' | 'en';
  /** Signed unsubscribe URL for this recipient. Falls back to the bare page. */
  unsubscribeUrl?: string;
}

const SITE_URL = 'https://www.manuelsolis.com';

const content = {
  es: {
    preview: 'Bienvenido al Newsletter de las Oficinas Legales de Manuel Solis',
    greeting: (name: string) =>
      name ? `¡Hola ${name}!` : '¡Bienvenido!',
    title: 'Gracias por suscribirte',
    body1:
      'Ahora recibirás las últimas noticias sobre leyes de inmigración, cambios de política migratoria, consejos legales y actualizaciones importantes directamente en tu bandeja de entrada.',
    body2:
      'Nuestro equipo de abogados con más de 35 años de experiencia y más de 50,000 casos ganados comparte información valiosa que puede marcar la diferencia en tu proceso legal.',
    whatYouGet: 'Lo que recibirás:',
    benefits: [
      'Actualizaciones sobre cambios en leyes migratorias',
      'Consejos legales prácticos para tu caso',
      'Noticias sobre TPS, DACA, VAWA y más',
      'Guías gratuitas y recursos legales',
      'Invitaciones a consultas y eventos',
    ],
    cta: 'Visitar Nuestro Blog',
    footer:
      'Si no te suscribiste a este newsletter, puedes ignorar este mensaje.',
    unsubscribe: 'Cancelar suscripción',
  },
  en: {
    preview: 'Welcome to the Manuel Solis Law Offices Newsletter',
    greeting: (name: string) =>
      name ? `Hello ${name}!` : 'Welcome!',
    title: 'Thank you for subscribing',
    body1:
      "You'll now receive the latest immigration law news, policy changes, legal tips, and important updates directly in your inbox.",
    body2:
      'Our team of attorneys with over 35 years of experience and 50,000+ cases won shares valuable information that can make a difference in your legal journey.',
    whatYouGet: "What you'll receive:",
    benefits: [
      'Updates on immigration law changes',
      'Practical legal advice for your case',
      'News about TPS, DACA, VAWA and more',
      'Free guides and legal resources',
      'Invitations to consultations and events',
    ],
    cta: 'Visit Our Blog',
    footer:
      "If you didn't subscribe to this newsletter, you can ignore this message.",
    unsubscribe: 'Unsubscribe',
  },
};

export function WelcomeEmail({
  firstName,
  language = 'es',
  unsubscribeUrl,
}: WelcomeEmailProps) {
  const t = content[language] || content.es;
  const unsubscribeHref =
    unsubscribeUrl || `${SITE_URL}/${language}/newsletter/unsubscribe`;

  return (
    <Html>
      <Head />
      <Preview>{t.preview}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={headerSection}>
            <Img
              src={`${SITE_URL}/logo-manuel-solis.png`}
              width="220"
              height="66"
              alt="Manuel Solis Law Firm"
              style={logo}
            />
          </Section>

          {/* Gold accent line */}
          <Hr style={goldLine} />

          {/* Content */}
          <Section style={contentSection}>
            <Text style={greetingStyle}>{t.greeting(firstName)}</Text>
            <Heading style={heading}>{t.title}</Heading>
            <Text style={paragraph}>{t.body1}</Text>
            <Text style={paragraph}>{t.body2}</Text>

            {/* Benefits */}
            <Text style={benefitsTitle}>{t.whatYouGet}</Text>
            {t.benefits.map((benefit, i) => (
              <Text key={i} style={benefitItem}>
                ✦ {benefit}
              </Text>
            ))}

            {/* CTA */}
            <Section style={ctaSection}>
              <Link href={`${SITE_URL}/${language}/blog`} style={ctaButton}>
                {t.cta}
              </Link>
            </Section>
          </Section>

          <Hr style={goldLine} />

          {/* Footer */}
          <Section style={footerSection}>
            <Text style={footerText}>{t.footer}</Text>
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

export default WelcomeEmail;

// --- Styles ---
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

const logo: React.CSSProperties = {
  margin: '0 auto',
};

const goldLine: React.CSSProperties = {
  border: 'none',
  borderTop: '3px solid #B2904D',
  margin: '0',
};

const contentSection: React.CSSProperties = {
  padding: '40px',
};

const greetingStyle: React.CSSProperties = {
  fontSize: '16px',
  color: '#B2904D',
  fontWeight: '600',
  marginBottom: '4px',
};

const heading: React.CSSProperties = {
  fontSize: '28px',
  fontWeight: '700',
  color: '#001540',
  marginTop: '0',
  marginBottom: '24px',
  lineHeight: '1.3',
};

const paragraph: React.CSSProperties = {
  fontSize: '16px',
  lineHeight: '1.7',
  color: '#374151',
  marginBottom: '16px',
};

const benefitsTitle: React.CSSProperties = {
  fontSize: '18px',
  fontWeight: '600',
  color: '#001540',
  marginTop: '24px',
  marginBottom: '12px',
};

const benefitItem: React.CSSProperties = {
  fontSize: '15px',
  color: '#374151',
  lineHeight: '1.6',
  marginBottom: '4px',
  paddingLeft: '8px',
};

const ctaSection: React.CSSProperties = {
  textAlign: 'center' as const,
  marginTop: '32px',
  marginBottom: '8px',
};

const ctaButton: React.CSSProperties = {
  backgroundColor: '#B2904D',
  color: '#ffffff',
  padding: '14px 32px',
  borderRadius: '8px',
  fontSize: '16px',
  fontWeight: '600',
  textDecoration: 'none',
  display: 'inline-block',
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
