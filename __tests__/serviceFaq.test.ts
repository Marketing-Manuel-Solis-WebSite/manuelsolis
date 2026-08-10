import { existsSync, readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { describe, it, expect } from 'vitest';
import { ALL_SERVICE_FAQ_SETS, getServiceFaqs } from '../app/lib/serviceFaq';
import { buildFaqPageSchema } from '../app/lib/faqSchema';

/**
 * Estas pruebas existen porque el riesgo de este contenido no es que se rompa
 * el build: es que se publique algo jurídicamente incorrecto en un sitio de
 * abogados, o que se publique **antes de que un abogado lo apruebe**.
 *
 * Lo que vigilan, en orden de gravedad:
 *   1. Que la puerta de aprobación cierre de verdad, y que cierre a la vez el
 *      texto visible y el marcado.
 *   2. Que "sin costo" y "contingencia" no se cuelen fuera de accidentes. Es un
 *      error que ya se cometió una vez en este proyecto —el chat del sitio
 *      ofreció evaluación gratis para un caso migratorio— y las dos veces que
 *      se ha escrito copy nuevo ha estado a punto de repetirse.
 *   3. Que no se prometan resultados, que es lo que convierte una FAQ útil en
 *      publicidad engañosa.
 *   4. Que las dos versiones tengan las MISMAS preguntas. El peligro de una
 *      traducción no es que suene rara: es que diga algo distinto.
 */

const SERVICIOS_ESPERADOS = [
  'inmigracion',
  'asilo',
  'vawa',
  'familia',
  'ley-criminal',
  'accidentes',
  'seguros',
];

describe('cobertura', () => {
  it('cubre los 7 servicios que no tenían FAQ, sin repetir ninguno', () => {
    const slugs = ALL_SERVICE_FAQ_SETS.map((s) => s.service);
    expect([...slugs].sort()).toEqual([...SERVICIOS_ESPERADOS].sort());
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('cada servicio existe de verdad como página', () => {
    for (const set of ALL_SERVICE_FAQ_SETS) {
      const dir = path.join(process.cwd(), 'app', '[lang]', 'servicios', set.service);
      expect(existsSync(path.join(dir, 'page.tsx')), `${set.service} no tiene page.tsx`).toBe(true);
    }
  });

  it('cada servicio trae entre 4 y 8 preguntas', () => {
    for (const set of ALL_SERVICE_FAQ_SETS) {
      expect(set.faqs.length, set.service).toBeGreaterThanOrEqual(4);
      expect(set.faqs.length, set.service).toBeLessThanOrEqual(8);
    }
  });

  it('cada servicio declara qué hay que confirmar en la revisión', () => {
    for (const set of ALL_SERVICE_FAQ_SETS) {
      expect(set.verificar.length, `${set.service} sin puntos a confirmar`).toBeGreaterThan(0);
    }
  });
});

describe('la puerta de aprobación', () => {
  it('no publica nada mientras approved sea false', () => {
    for (const set of ALL_SERVICE_FAQ_SETS) {
      if (set.approved) continue;
      expect(getServiceFaqs(set.service, 'es'), set.service).toEqual([]);
      expect(getServiceFaqs(set.service, 'en'), set.service).toEqual([]);
    }
  });

  it('cierra el texto visible y el marcado a la vez', () => {
    // Sin preguntas no hay FAQPage: no se puede publicar el schema de un texto
    // que la página no muestra, ni al revés.
    for (const set of ALL_SERVICE_FAQ_SETS) {
      const faqs = getServiceFaqs(set.service, 'es');
      const schema = buildFaqPageSchema(faqs, `https://www.manuelsolis.com/es/servicios/${set.service}`);
      if (set.approved) {
        expect(faqs.length, set.service).toBeGreaterThan(0);
        expect(schema, set.service).not.toBeNull();
      } else {
        expect(schema, set.service).toBeNull();
      }
    }
  });

  it('un servicio desconocido devuelve vacío en lugar de fallar', () => {
    expect(getServiceFaqs('no-existe', 'es')).toEqual([]);
  });
});

describe('reglas de contenido', () => {
  const todas = ALL_SERVICE_FAQ_SETS.flatMap((s) =>
    s.faqs.flatMap((f) => [
      { servicio: s.service, texto: f.a.es, lang: 'es' as const },
      { servicio: s.service, texto: f.a.en, lang: 'en' as const },
    ]),
  );

  it('"sin costo" y "contingencia" solo aparecen en accidentes', () => {
    // La evaluación sin costo y el cobro por contingencia son de accidentes.
    // En inmigración se cotiza por trámite, y prometer lo contrario en una
    // página de inmigración es la clase de error que llega al cliente.
    const GRATIS = /sin costo|gratis|gratuit|contingencia|free of charge|no cost|contingency/i;
    for (const { servicio, texto, lang } of todas) {
      if (servicio === 'accidentes') continue;
      expect(
        GRATIS.test(texto),
        `${servicio} (${lang}) menciona gratuidad o contingencia fuera de accidentes: "${texto.slice(0, 90)}…"`,
      ).toBe(false);
    }
  });

  it('accidentes sí lo dice, que es el punto', () => {
    const set = ALL_SERVICE_FAQ_SETS.find((s) => s.service === 'accidentes')!;
    const junto = set.faqs.map((f) => f.a.es).join(' ');
    expect(junto).toMatch(/no tiene costo|sin costo/i);
    expect(junto).toMatch(/contingencia/i);
    // Y aclara que la gratuidad NO se extiende a inmigración, que es la
    // confusión concreta que hay que evitar.
    expect(junto).toMatch(/inmigración/i);
  });

  it('no promete resultados', () => {
    const PROMESAS = [
      /\bgarantiz/i,
      /\ble aseguramos\b/i,
      /\bsiempre gana/i,
      /\bwe guarantee\b/i,
      /\bguaranteed\b/i,
      /\b100 ?% de éxito/i,
      /\bnunca pierde/i,
    ];
    for (const { servicio, texto, lang } of todas) {
      for (const re of PROMESAS) {
        expect(re.test(texto), `${servicio} (${lang}) promete un resultado: ${re}`).toBe(false);
      }
    }
  });

  it('no llama abogado a un notario', () => {
    // Al contrario: la respuesta de inmigración advierte de que en EE. UU. un
    // notario NO es abogado, que es una de las estafas que más golpea a esta
    // clientela. Si alguien reescribe eso, esta prueba lo caza.
    const inm = ALL_SERVICE_FAQ_SETS.find((s) => s.service === 'inmigracion')!;
    const junto = inm.faqs.map((f) => f.a.es).join(' ');
    expect(junto).toMatch(/notario/i);
    expect(junto).toMatch(/NO es abogado/i);
  });

  it('no inventa montos en dólares', () => {
    for (const { servicio, texto, lang } of todas) {
      const montos = texto.match(/\$\s?[\d,.]+/g);
      expect(montos, `${servicio} (${lang}) trae un monto: ${montos?.join(', ')}`).toBeNull();
    }
  });

  it('los tres plazos legales que se afirman están marcados para confirmar', () => {
    // Son las únicas cifras jurídicas del archivo, y son las que más daño hacen
    // si están mal: quien lee un plazo equivocado deja pasar el suyo. Cada una
    // tiene que estar declarada en `verificar` para que el revisor la coteje.
    const PLAZOS: { servicio: string; enTexto: RegExp; enVerificar: RegExp }[] = [
      { servicio: 'accidentes', enTexto: /dos años desde la fecha del accidente/i, enVerificar: /dos años/i },
      { servicio: 'vawa', enTexto: /dentro de los dos años siguientes al divorcio/i, enVerificar: /DOS AÑOS/i },
      { servicio: 'asilo', enTexto: /dentro del primer año desde la última entrada/i, enVerificar: /un año/i },
    ];

    for (const { servicio, enTexto, enVerificar } of PLAZOS) {
      const set = ALL_SERVICE_FAQ_SETS.find((s) => s.service === servicio)!;
      const junto = set.faqs.map((f) => f.a.es).join(' ');
      expect(enTexto.test(junto), `${servicio}: no encuentro el plazo en el texto`).toBe(true);
      expect(
        set.verificar.some((v) => enVerificar.test(v)),
        `${servicio}: el plazo no está declarado en verificar[]`,
      ).toBe(true);
    }
  });

  it('ningún otro servicio afirma un plazo legal en años', () => {
    // Si mañana alguien añade "tiene tres años para…" en seguros o en familia,
    // esta prueba lo caza y obliga a declararlo en verificar[] como los otros.
    const CIFRA_DE_PLAZO = /\b(un|dos|tres|cuatro|cinco|seis|diez)\s+años?\b/i;
    const CON_PLAZO = new Set(['accidentes', 'vawa', 'asilo']);
    for (const { servicio, texto, lang } of todas) {
      if (CON_PLAZO.has(servicio) || lang === 'en') continue;
      expect(
        CIFRA_DE_PLAZO.test(texto),
        `${servicio} afirma un plazo sin declararlo: "${texto.slice(0, 90)}…"`,
      ).toBe(false);
    }
  });
});

describe('paridad entre idiomas', () => {
  it('cada pregunta y cada respuesta existen en los dos idiomas', () => {
    for (const set of ALL_SERVICE_FAQ_SETS) {
      set.faqs.forEach((f, i) => {
        for (const campo of ['q', 'a'] as const) {
          for (const lang of ['es', 'en'] as const) {
            const v = f[campo][lang];
            expect(v?.trim(), `${set.service}[${i}].${campo}.${lang} vacío`).toBeTruthy();
            expect(v.length, `${set.service}[${i}].${campo}.${lang} demasiado corto`).toBeGreaterThan(20);
          }
        }
      });
    }
  });

  it('la traducción no se queda a medias respecto al español', () => {
    // No se compara palabra por palabra —son idiomas distintos—, pero una
    // respuesta inglesa que mide la mitad que la española casi siempre significa
    // que se perdió una frase, y con ella una condición o una advertencia.
    for (const set of ALL_SERVICE_FAQ_SETS) {
      set.faqs.forEach((f, i) => {
        const ratio = f.a.en.length / f.a.es.length;
        expect(ratio, `${set.service}[${i}] ES ${f.a.es.length} vs EN ${f.a.en.length}`).toBeGreaterThan(0.6);
        expect(ratio, `${set.service}[${i}] ES ${f.a.es.length} vs EN ${f.a.en.length}`).toBeLessThan(1.7);
      });
    }
  });

  it('las preguntas terminan en signo de interrogación', () => {
    for (const set of ALL_SERVICE_FAQ_SETS) {
      for (const f of set.faqs) {
        expect(f.q.es.trim().endsWith('?'), `${set.service}: "${f.q.es}"`).toBe(true);
        expect(f.q.en.trim().endsWith('?'), `${set.service}: "${f.q.en}"`).toBe(true);
      }
    }
  });

  it('no hay preguntas repetidas dentro de un servicio ni entre servicios', () => {
    const vistas = new Map<string, string>();
    for (const set of ALL_SERVICE_FAQ_SETS) {
      for (const f of set.faqs) {
        const clave = f.q.es.toLowerCase().replace(/[¿?.,]/g, '').trim();
        expect(vistas.has(clave), `"${f.q.es}" repetida en ${set.service} y ${vistas.get(clave)}`).toBe(false);
        vistas.set(clave, set.service);
      }
    }
  });
});

describe('cableado en las páginas', () => {
  it('los 7 page.tsx resuelven las preguntas y el schema', () => {
    for (const set of ALL_SERVICE_FAQ_SETS) {
      const file = path.join(process.cwd(), 'app', '[lang]', 'servicios', set.service, 'page.tsx');
      const src = readFileSync(file, 'utf8');
      expect(src, `${set.service}: no llama a getServiceFaqs`).toContain(`getServiceFaqs('${set.service}'`);
      expect(src, `${set.service}: no construye el FAQPage`).toContain('buildFaqPageSchema');
      expect(src, `${set.service}: no pasa las preguntas al cliente`).toContain('faqs={serviceFaqs}');
    }
  });

  it('la sección se renderiza DENTRO del <main>, antes del footer', () => {
    // El primer intento con las oficinas colgó la sección después del componente
    // que incluye el <Footer />, así que aparecía debajo del pie de página.
    for (const set of ALL_SERVICE_FAQ_SETS) {
      const dir = path.join(process.cwd(), 'app', '[lang]', 'servicios', set.service);
      const cliente = readdirSync(dir).find((f) => /Client\.tsx$/.test(f));
      expect(cliente, `${set.service} sin componente cliente`).toBeTruthy();
      const src = readFileSync(path.join(dir, cliente!), 'utf8');

      const faq = src.indexOf('<FaqSection');
      const main = src.indexOf('</main>');
      const footer = src.indexOf('<Footer');
      expect(faq, `${set.service}: no renderiza FaqSection`).toBeGreaterThan(-1);
      expect(faq, `${set.service}: FaqSection fuera del <main>`).toBeLessThan(main);
      expect(faq, `${set.service}: FaqSection después del Footer`).toBeLessThan(footer);
    }
  });
});
