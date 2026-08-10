/**
 * FAQPage a partir de las preguntas que la página YA muestra.
 *
 * Es deliberado que esto no reciba texto propio: solo envuelve preguntas que se
 * renderizan en el HTML. Google exige que el contenido marcado sea visible, y
 * marcar un Q&A que el visitante no puede leer es justo lo que su documentación
 * llama contenido oculto. Varias páginas de servicio de este sitio llevaban
 * meses con la FAQ escrita y visible, sin declararla — así que aquí no se
 * escribe nada nuevo, se declara lo que ya está.
 *
 * Sobre el valor: FAQPage dejó de dar resultados enriquecidos salvo para sitios
 * de gobierno y salud (Google lo restringió en agosto de 2023). La ganancia real
 * es que un par pregunta/respuesta es la forma en que los motores de respuesta
 * empaquetan una contestación, y declararlo les ahorra adivinar dónde acaba la
 * respuesta. No esperar un adorno en la SERP.
 */

export type FaqPair = { q: string; a: string };

/** Devuelve null si no hay preguntas, para no emitir un FAQPage vacío. */
export function buildFaqPageSchema(faqs: FaqPair[], pageUrl: string) {
  const limpias = faqs.filter((f) => f.q?.trim() && f.a?.trim());
  if (limpias.length === 0) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${pageUrl}#faq`,
    mainEntity: limpias.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}
