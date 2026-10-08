import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { SECURITY_HEADERS } from '../app/lib/securityHeaders';
import { validHyrosSrc } from '../app/lib/hyros';

/**
 * Guardas de la integración de Hyros (atribución publicitaria, 2026-10-08).
 *
 * Como con CallRail, el modo de fallo es silencioso: si la CSP bloquea el
 * script o su sesión, el sitio funciona igual y Hyros simplemente deja de
 * atribuir. Y si el script lee un campo que no es de un lead, ensucia los
 * datos sin que nada falle. Ver docs/HYROS.md.
 */

const root = path.join(__dirname, '..');
const read = (rel: string) => readFileSync(path.join(root, rel), 'utf-8');

function directive(name: string): string {
  const csp = SECURITY_HEADERS.find((h) => h.key === 'Content-Security-Policy');
  if (!csp) throw new Error('No hay Content-Security-Policy en SECURITY_HEADERS');
  const found = csp.value.split(';').map((d) => d.trim()).find((d) => d.startsWith(`${name} `));
  if (!found) throw new Error(`La CSP no declara la directiva ${name}`);
  return found;
}

const REAL_SRC =
  'https://222869.t.hyros.com/v1/lst/universal-script?ph=7827bb0550d51f1d8ee0d543616ec2c61e1b074299c121b6587ca4b6ea476a9e&tag=!clicked&spa=true&embed=true';

describe('CSP', () => {
  it('permite el universal script', () => {
    expect(directive('script-src')).toContain('https://*.t.hyros.com');
  });

  // Los clics, page views y datos del lead salen por fetch/XHR/sendBeacon a
  // <id>.t.hyros.com, y la sesión se abre contra lg.hyr.so. Sin cualquiera de
  // los dos el script carga y no atribuye nada.
  it('permite el envío de eventos y la sesión', () => {
    expect(directive('connect-src')).toContain('https://*.t.hyros.com');
    expect(directive('connect-src')).toContain('https://lg.hyr.so');
  });
});

describe('validación de la URL del script', () => {
  it('acepta el universal script tal como lo da el panel de Hyros', () => {
    expect(validHyrosSrc(REAL_SRC)).toBe(REAL_SRC);
    expect(validHyrosSrc(`  ${REAL_SRC}  `)).toBe(REAL_SRC);
  });

  it('rechaza cualquier otro origen o forma', () => {
    for (const bad of [
      undefined,
      '',
      'no es una url',
      REAL_SRC.replace('https:', 'http:'),
      REAL_SRC.replace('222869.t.hyros.com', 'evil.com'),
      REAL_SRC.replace('222869.t.hyros.com', '222869.t.hyros.com.evil.com'),
      REAL_SRC.replace('222869.t.hyros.com', 'x.t.hyros.com'),
      REAL_SRC.replace('222869.t.hyros.com', '222869.t.hyros.com:8443'),
      REAL_SRC.replace('/v1/lst/universal-script', '/otra-ruta.js'),
      REAL_SRC.replace(/ph=[^&]+&/, ''),
      // ref_url se añade en el navegador con la URL real de aterrizaje.
      `${REAL_SRC}&ref_url=https://www.manuelsolis.com/`,
    ]) {
      expect(validHyrosSrc(bad), String(bad)).toBeNull();
    }
  });
});

describe('carga del script', () => {
  const src = read('app/components/PageViewTracker.tsx');

  // Hyros pide cargar lo antes posible: con lazyOnload se perderían los
  // primeros clics de quien entra y sale rápido de la landing.
  it('usa afterInteractive y añade ref_url en el navegador', () => {
    const idx = src.indexOf('id="hyros-universal"');
    expect(idx).toBeGreaterThan(-1);
    const block = src.slice(idx, idx + 700);
    expect(block).toContain('afterInteractive');
    expect(block).not.toContain('lazyOnload');
    expect(block).toContain("'&ref_url=' + encodeURI(document.URL)");
  });

  it('solo se monta con una URL validada', () => {
    expect(src).toContain('validHyrosSrc(HYROS_SRC)');
  });
});

describe('qué campos lee', () => {
  // El script toma cualquier input de correo o texto al salir del campo. Los
  // correos del boletín, de la baja y del panel no son leads: si los leyera,
  // Hyros contaría suscriptores como consultas.
  it('los formularios que no son de un lead llevan hyros-ignore', () => {
    const newsletter = read('app/components/NewsletterSignup.tsx');
    expect(newsletter.match(/type="email"/g)?.length).toBe(3);
    // Los tres correos más el nombre de la variante con nombre.
    expect(newsletter.match(/className="hyros-ignore /g)?.length).toBe(4);
    expect(read('app/[lang]/newsletter/unsubscribe/page.tsx')).toContain('hyros-ignore');
    expect(read('app/[lang]/admin/newsletter/AdminClient.tsx')).toContain('hyros-ignore');
    // El nombre del boletín tampoco: Hyros reconoce campos de nombre.
    expect(newsletter).toContain('autoComplete="given-name"\n                    className="hyros-ignore');
  });

  // La política dice que Hyros solo recibe lo que se escribe en el formulario
  // de consulta. Un correo escrito en el chat o en el buscador del blog no
  // puede acabar en Hyros.
  it('el chat y el buscador no los lee', () => {
    const chat = read('app/components/AIChatButton.tsx');
    const ta = chat.indexOf('ref={inputRef}');
    expect(chat.slice(ta, ta + 1500)).toContain('hyros-ignore');
    expect(read('app/components/blogs/SearchBar.tsx')).toContain('hyros-ignore');
  });

  it('el formulario de consulta marca nombre, apellido y teléfono, e ignora el campo trampa', () => {
    const form = read('app/components/ContactFormClient.tsx');
    expect(form).toContain('trackingClass="hyros-first-name"');
    expect(form).toContain('trackingClass="hyros-last-name"');
    expect(form).toContain('trackingClass="hyros-phone"');
    const honeypot = form.slice(form.indexOf('id={HONEYPOT_FIELD}'), form.indexOf('id={HONEYPOT_FIELD}') + 400);
    expect(honeypot).toContain('hyros-ignore');
  });
});

describe('divulgación', () => {
  // Hyros es el único tercero que recibe nombre, correo y teléfono: la política
  // tiene que decirlo, y ya no puede afirmar que ninguna plataforma los recibe.
  it('la política de privacidad declara Hyros y qué recibe', () => {
    const src = read('app/[lang]/privacidad/PrivacidadClient.tsx');
    expect(src).toContain('Hyros (atribución publicitaria)');
    expect(src).toContain('Hyros (advertising attribution)');
    expect(src).not.toContain('—no su nombre, correo electrónico ni teléfono—');
    expect(src).not.toContain('— not your name, email address, or phone number —');
  });
});
