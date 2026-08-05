import { describe, it, expect } from 'vitest';
import { buildOfficeFaqs, buildOfficeFaqSchema } from '../app/lib/officeFaq';
import { OFFICE_NAP_SLUGS, OFFICES_NAP } from '../app/components/officesPhoneMap';

/**
 * Estas preguntas existen para bajar la duplicación de las 15 fichas de
 * /servicios/accidentes/oficinas/*, así que lo que hay que vigilar no es que
 * "haya" FAQ: es que digan cosas DISTINTAS entre oficinas y que lo que dicen
 * sea verdad según el registro NAP. Si alguien las reescribe con una plantilla
 * genérica, el problema vuelve sin que falle nada más.
 */
describe('buildOfficeFaqs — cobertura', () => {
  it('devuelve preguntas para las 15 oficinas del registro, en ambos idiomas', () => {
    for (const slug of OFFICE_NAP_SLUGS) {
      for (const lang of ['es', 'en'] as const) {
        const faqs = buildOfficeFaqs(slug, lang);
        expect(faqs.length, `${slug}/${lang}`).toBe(3);
        for (const f of faqs) {
          expect(f.q.length, `${slug}/${lang} pregunta`).toBeGreaterThan(15);
          expect(f.a.length, `${slug}/${lang} respuesta`).toBeGreaterThan(30);
        }
      }
    }
  });

  it('devuelve vacío para un slug que no existe, sin lanzar', () => {
    expect(buildOfficeFaqs('oficina-inventada', 'es')).toEqual([]);
    expect(buildOfficeFaqSchema('oficina-inventada', 'es', 'https://x/y')).toBeNull();
  });
});

describe('buildOfficeFaqs — dice la verdad sobre cada oficina', () => {
  it('avisa de que las direcciones con cita previa no tienen personal', () => {
    // Las cinco direcciones Regus/IWG. Que el visitante se plante ahí sin avisar
    // y lo encuentre cerrado es el fallo que esto evita.
    const conCita = OFFICE_NAP_SLUGS.filter((s) => OFFICES_NAP[s].hours.kind === 'appointment');
    expect(conCita.length).toBeGreaterThanOrEqual(5);
    for (const slug of conCita) {
      const [walkIn] = buildOfficeFaqs(slug, 'es');
      expect(walkIn.a, slug).toMatch(/cita previa/i);
      expect(walkIn.a, slug).toMatch(/no hay personal/i);
    }
  });

  it('no dice "con cita previa" en una oficina que sí atiende sin cita', () => {
    const [walkIn] = buildOfficeFaqs('dallas', 'es');
    expect(walkIn.a).toMatch(/sin cita/i);
    expect(walkIn.a).not.toMatch(/no hay personal/i);
  });

  it('dice que el centro de accidentes abre 24 horas', () => {
    const [walkIn] = buildOfficeFaqs('houston-accidentes', 'es');
    expect(walkIn.a).toMatch(/24 horas/i);
  });

  it('menciona el huso solo donde difiere del de la sede', () => {
    // El Paso y Arvada van en hora de montaña; mandar a alguien a las 9:00
    // "de Houston" a una oficina que abre a las 9:00 locales es una hora de error.
    expect(buildOfficeFaqs('el-paso', 'es')[1].a).toMatch(/hora de la montaña/i);
    expect(buildOfficeFaqs('arvada', 'es')[1].a).toMatch(/hora de la montaña/i);
    expect(buildOfficeFaqs('losangeles', 'es')[1].a).toMatch(/hora del Pacífico/i);
    // Houston es la referencia: no tiene sentido advertir de su propio huso.
    expect(buildOfficeFaqs('houston-principal', 'es')[1].a).not.toMatch(/huso/i);
  });

  it('usa el teléfono y la dirección reales de cada oficina', () => {
    for (const slug of OFFICE_NAP_SLUGS) {
      const nap = OFFICES_NAP[slug];
      const [, , phone] = buildOfficeFaqs(slug, 'es');
      expect(phone.a, slug).toContain(nap.phone);
      expect(phone.a, slug).toContain(nap.street);
      expect(phone.a, slug).toContain(nap.zip);
    }
  });
});

describe('buildOfficeFaqs — diferencia unas oficinas de otras', () => {
  it('ninguna oficina comparte su juego de preguntas con otra', () => {
    // El punto de todo esto. Si dos fichas generan el mismo texto, vuelven a ser
    // la misma página a ojos de un buscador.
    for (const lang of ['es', 'en'] as const) {
      const vistos = new Map<string, string>();
      for (const slug of OFFICE_NAP_SLUGS) {
        const huella = buildOfficeFaqs(slug, lang)
          .map((f) => `${f.q}|${f.a}`)
          .join('||');
        const previo = vistos.get(huella);
        expect(previo, `${slug} genera el mismo texto que ${previo} (${lang})`).toBeUndefined();
        vistos.set(huella, slug);
      }
    }
  });

  it('distingue por barrio las cuatro direcciones con cita de Houston', () => {
    // kirby, main-st, north-loop y northchase estan las cuatro en Houston y
    // comparten horario: sin la zona fina sus preguntas salian calcadas.
    const zonas: Record<string, string> = {
      kirby: 'Upper Kirby, Houston',
      'main-st': 'Downtown Houston',
      'north-loop': 'North Loop, Houston',
      northchase: 'Northchase, Houston',
    };
    const preguntas = new Set<string>();
    for (const [slug, zona] of Object.entries(zonas)) {
      const faqs = buildOfficeFaqs(slug, 'es', zona);
      expect(faqs[0].q, slug).toContain(zona);
      preguntas.add(faqs[0].q);
    }
    expect(preguntas.size).toBe(Object.keys(zonas).length);
  });
});

describe('buildOfficeFaqSchema', () => {
  it('emite FAQPage con una Question por pregunta visible', () => {
    const url = 'https://www.manuelsolis.com/es/servicios/accidentes/oficinas/dallas';
    const schema = buildOfficeFaqSchema('dallas', 'es', url);
    expect(schema).not.toBeNull();
    expect(schema!['@type']).toBe('FAQPage');
    expect(schema!['@id']).toBe(`${url}#faq`);
    expect(schema!.mainEntity).toHaveLength(3);
    for (const q of schema!.mainEntity) {
      expect(q['@type']).toBe('Question');
      expect(q.acceptedAnswer['@type']).toBe('Answer');
      expect(q.acceptedAnswer.text.length).toBeGreaterThan(30);
    }
  });

  it('el texto del schema coincide con el visible, sin versión aparte', () => {
    const faqs = buildOfficeFaqs('chicago', 'en');
    const schema = buildOfficeFaqSchema('chicago', 'en', 'https://x/y');
    expect(schema!.mainEntity.map((q) => q.name)).toEqual(faqs.map((f) => f.q));
    expect(schema!.mainEntity.map((q) => q.acceptedAnswer.text)).toEqual(faqs.map((f) => f.a));
  });
});
