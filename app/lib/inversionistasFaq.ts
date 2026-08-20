/**
 * Preguntas frecuentes de /inversionistas (Visa E-2).
 *
 * Vivían dentro de InversionistasClient.tsx, que es `'use client'`, así que la
 * página servidor no podía leerlas y la sección se renderizaba visible SIN
 * `FAQPage`. La auditoría de schema de 2026-08 la listó entre las 20 URLs con
 * FAQ a la vista y sin marcar (9 pares de blog + este par).
 *
 * Al vivir aquí, el texto que pinta la página y el que va al JSON-LD salen del
 * MISMO array: no pueden divergir, que es justo lo que convierte una FAQPage en
 * un hallazgo de contenido no coincidente.
 *
 * Nota de expectativa: Google restringió los resultados enriquecidos de FAQ a
 * sitios de gobierno y salud en agosto de 2023, así que esto no busca un adorno
 * en la SERP. Declara como datos una sección que ya existe en la página, para
 * que la lean los buscadores con IA y los extractores.
 */

export type BiText = { es: string; en: string };

export interface InversionistasFaq {
  q: BiText;
  a: BiText;
}

export const inversionistasFaqs: InversionistasFaq[] = [
  {
    q: { es: '¿Cuánto dinero necesito invertir?', en: 'How much money do I need to invest?' },
    a: {
      es: 'No hay un mínimo legal fijo, pero la inversión debe ser "sustancial". En la práctica, recomendamos montos a partir de $100,000 USD para tener un caso sólido, aunque montos menores pueden funcionar según el tipo de negocio.',
      en: 'There is no fixed legal minimum, but the investment must be "substantial". In practice, we recommend amounts starting at $100,000 USD to have a strong case, although smaller amounts may work depending on the business type.',
    },
  },
  {
    q: { es: '¿La Visa E-2 da Residencia (Green Card)?', en: 'Does the E-2 Visa give Residency (Green Card)?' },
    a: {
      es: 'No directamente. Es una visa de no inmigrante. Sin embargo, puede renovarse indefinidamente y existen estrategias legales para transicionar a otras visas que sí otorgan residencia.',
      en: 'Not directly. It is a non-immigrant visa. However, it can be renewed indefinitely and there are legal strategies to transition to other visas that do grant residency.',
    },
  },
  {
    q: { es: '¿Puede trabajar mi esposa/o?', en: 'Can my spouse work?' },
    a: {
      es: 'Sí. El cónyuge del titular obtiene un permiso de trabajo general que le permite trabajar en cualquier lugar de EE.UU. sin restricciones.',
      en: "Yes. The holder's spouse obtains a general work permit allowing them to work anywhere in the U.S. without restrictions.",
    },
  },
  {
    q: { es: '¿Puedo comprar un negocio existente?', en: 'Can I buy an existing business?' },
    a: {
      es: 'Sí, y a menudo es recomendable. Comprar un negocio con historial operativo facilita demostrar que la inversión no es marginal y que el negocio es real.',
      en: 'Yes, and it is often recommended. Buying a business with operational history makes it easier to demonstrate that the investment is not marginal and the business is real.',
    },
  },
];
