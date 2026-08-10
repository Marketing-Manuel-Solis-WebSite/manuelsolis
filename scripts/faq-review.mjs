import { readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

/**
 * Genera docs/REVISION-FAQ-SERVICIOS.md desde app/lib/serviceFaq.ts.
 *
 * Existe para que la revisión jurídica se haga leyendo un documento y no
 * abriendo catorce páginas del sitio, y para que el revisor vea el español y el
 * inglés de cada respuesta uno junto al otro: el riesgo real no es que la
 * traducción suene raro, es que diga algo distinto.
 *
 * Se genera, no se escribe a mano, para que no pueda quedar desfasado respecto
 * al texto que se publicaría.
 *
 *   npm run faq:review
 */

const SRC = 'app/lib/serviceFaq.ts';
const OUT = 'docs/REVISION-FAQ-SERVICIOS.md';

// Se importa el módulo real (vía scripts/faq-dump.ts) en vez de parsear el
// TypeScript: así el documento sale de la misma fuente que la web y no de un
// lector propio que podría interpretarla distinto.
const json = execFileSync('npx', ['--yes', 'tsx', 'scripts/faq-dump.ts'], {
  encoding: 'utf8',
  shell: process.platform === 'win32',
  maxBuffer: 20 * 1024 * 1024,
});

const sets = JSON.parse(json.slice(json.indexOf('[')));

const TITULOS = {
  inmigracion: 'Inmigración (página pilar)',
  asilo: 'Asilo',
  vawa: 'VAWA',
  familia: 'Inmigración familiar',
  'ley-criminal': 'Defensa criminal',
  accidentes: 'Accidentes y lesiones personales',
  seguros: 'Reclamos de seguros',
};

const totalPreguntas = sets.reduce((n, s) => n + s.faqs.length, 0);
const aprobados = sets.filter((s) => s.approved);

const partes = [];

partes.push(`# Revisión jurídica — Preguntas frecuentes de las páginas de servicio

> **Documento generado.** No editar a mano: sale de \`app/lib/serviceFaq.ts\`
> con \`npm run faq:review\`. Para cambiar una respuesta, se cambia ahí y se
> vuelve a generar.

## Qué hay que hacer con esto

${totalPreguntas} preguntas en ${sets.length} páginas de servicio, cada una en español e inglés.
**Nada de esto está publicado todavía.** Cada bloque tiene \`approved: false\` en
\`app/lib/serviceFaq.ts\`; mientras esté en false la página no muestra la sección
ni emite el marcado FAQPage.

Para publicar un servicio revisado: poner \`approved: true\` en su bloque. Se
aprueban de uno en uno — no hace falta esperar a tener los siete.

Estado actual: **${aprobados.length} de ${sets.length} aprobados**${aprobados.length ? ` (${aprobados.map((s) => s.service).join(', ')})` : ''}.

## Cómo está escrito

- Solo derecho estable: nada que dependa de una norma en litigio o de una política que cambie con la administración.
- Ni un nombre de caso, monto, plazo ni tribunal sin verificar. Los pocos que hay están listados como **puntos a confirmar** en cada sección.
- Ningún resultado prometido. Donde la respuesta honesta es "depende", se explica de qué depende.
- La evaluación sin costo y el cobro por contingencia se mencionan **solo en accidentes**. En inmigración se dice que se cotiza por trámite.
- Las respuestas contestan la pregunta. Si algo cambia con frecuencia (el plazo del permiso de trabajo en asilo, el paso por terceros países) se dice expresamente que hay que confirmar la regla vigente en vez de dar una cifra que caduque.

## Índice

${sets.map((s) => `- [${TITULOS[s.service] ?? s.service}](#${s.service}) — ${s.faqs.length} preguntas · ${s.approved ? '✅ aprobado' : '⏳ pendiente'}`).join('\n')}

---
`);

for (const set of sets) {
  partes.push(`
<a id="${set.service}"></a>

## ${TITULOS[set.service] ?? set.service}

\`/es/servicios/${set.service}\` · \`/en/servicios/${set.service}\`
**Estado:** ${set.approved ? '✅ aprobado — publicado' : '⏳ pendiente de revisión — no publicado'}

### Puntos a confirmar

${set.verificar.map((v) => `- [ ] ${v}`).join('\n')}
`);

  set.faqs.forEach((f, i) => {
    partes.push(`
#### ${i + 1}. ${f.q.es}

**Respuesta (ES)**

> ${f.a.es}

**Pregunta (EN):** ${f.q.en}

**Respuesta (EN)**

> ${f.a.en}
`);
  });

  partes.push('\n---\n');
}

partes.push(`
## Después de aprobar

1. Poner \`approved: true\` en el bloque correspondiente de \`app/lib/serviceFaq.ts\`.
2. \`npm run faq:review\` para que este documento refleje el nuevo estado.
3. \`npm test\` — hay pruebas que comprueban que las dos versiones tienen las mismas preguntas, que no se prometen resultados y que "sin costo" solo aparece en accidentes.
4. \`npm run build\` y verificar con el script de FAQ que cada pregunta y cada respuesta marcadas estén en el HTML visible: Google trata como contenido oculto lo que se marca y no se muestra.
`);

writeFileSync(OUT, partes.join(''));
console.log(`${OUT} generado — ${totalPreguntas} preguntas en ${sets.length} servicios, ${aprobados.length} aprobados`);
