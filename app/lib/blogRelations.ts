// Cross-linking map for blog posts — defines related articles for each post
// This improves internal linking and topical authority signals

export interface RelatedArticle {
  title: { es: string; en: string };
  slug: string;
  image: string;
  category: { es: string; en: string };
}

const allArticles: Record<string, RelatedArticle> = {
  permiso_de_trabajo_visa_u: {
    title: { es: 'Permiso de Trabajo con Visa U (Bona Fide)', en: 'U Visa Work Permit (Bona Fide)' },
    slug: 'permiso_de_trabajo_visa_u',
    image: '/blog/visa-u.png',
    category: { es: 'Visa U', en: 'U Visa' },
  },
  que_hacer_si_la_policia_no_firma_la_certificacion_visa_u: {
    title: { es: 'Qué hacer si la policía no firma la certificación Visa U', en: 'What to Do if Police Won\'t Sign U Visa Certification' },
    slug: 'que_hacer_si_la_policia_no_firma_la_certificacion_visa_u',
    image: '/blog/visa-u.png',
    category: { es: 'Visa U', en: 'U Visa' },
  },
  perdon_i_192_como_arreglar_con_la_visa_u_si_tienes_deportaciones_previas: {
    title: { es: 'Perdón I-192: cómo arreglar con la Visa U si tienes deportaciones', en: 'I-192 Waiver: How to Fix Your Case with U Visa After Deportation' },
    slug: 'perdon_i_192_como_arreglar_con_la_visa_u_si_tienes_deportaciones_previas',
    image: '/blog/visa-u.png',
    category: { es: 'Visa U', en: 'U Visa' },
  },
  Visa_U_y_VAWA_incluir_hijos_y_nuevos_esposos_derivados: {
    title: { es: 'Visa U y VAWA: incluir hijos y nuevos esposos derivados', en: 'U Visa & VAWA: Including Children and New Spouse Derivatives' },
    slug: 'Visa_U_y_VAWA_incluir_hijos_y_nuevos_esposos_derivados',
    image: '/blog/visa-u.png',
    category: { es: 'Visa U', en: 'U Visa' },
  },
  Frenar_deportacion_inminente_con_solicitud_de_Visa_Humanitaria: {
    title: { es: 'Frenar deportación inminente con solicitud de Visa Humanitaria', en: 'Stop Imminent Deportation with Humanitarian Visa Request' },
    slug: 'Frenar_deportacion_inminente_con_solicitud_de_Visa_Humanitaria',
    image: '/blog/visa-u.png',
    category: { es: 'Alivio Humanitario', en: 'Humanitarian Relief' },
  },
  VAWA_para_hombres_maltratados_por_pareja_ciudadana_o_residente: {
    title: { es: 'VAWA para hombres maltratados por pareja ciudadana o residente', en: 'VAWA for Men Abused by Citizen or Resident Partner' },
    slug: 'VAWA_para_hombres_maltratados_por_pareja_ciudadana_o_residente',
    image: '/blog/visa-u.png',
    category: { es: 'VAWA', en: 'VAWA' },
  },
  VAWA_para_padres_Maltrato_de_hijos_ciudadanos_estadounidenses: {
    title: { es: 'VAWA para padres: maltrato de hijos ciudadanos estadounidenses', en: 'VAWA for Parents: Abuse by U.S. Citizen Children' },
    slug: 'VAWA_para_padres_Maltrato_de_hijos_ciudadanos_estadounidenses',
    image: '/blog/visa-u.png',
    category: { es: 'VAWA', en: 'VAWA' },
  },
  Visa_T_trabajo_forzado_por_deuda_con_coyote: {
    title: { es: 'Visa T: trabajo forzado por deuda con coyote', en: 'T Visa: Forced Labor Due to Smuggler Debt' },
    slug: 'Visa_T_trabajo_forzado_por_deuda_con_coyote',
    image: '/blog/visa-u.png',
    category: { es: 'Visa T', en: 'T Visa' },
  },
  ley_de_los_10_anos_cancelacion_de_deportacion: {
    title: { es: 'Ley de los 10 años: cancelación de deportación', en: '10-Year Rule: Cancellation of Removal' },
    slug: 'ley_de_los_10_anos_cancelacion_de_deportacion',
    image: '/blog/blog_11/BLOG01_CR1.png',
    category: { es: 'Defensa contra Deportación', en: 'Deportation Defense' },
  },
  advance_parole_2026_viajar_con_daca_tps_visa_u: {
    title: { es: 'Advance Parole 2026: viajar con DACA, TPS o Visa U', en: 'Advance Parole 2026: Travel with DACA, TPS or U Visa' },
    slug: 'advance_parole_2026_viajar_con_daca_tps_visa_u',
    image: '/blog/visa-u.png',
    category: { es: 'Proceso Migratorio', en: 'Immigration Process' },
  },
  Formulario_G28_Cambiar_Abogado_Inmigracion: {
    title: { es: 'Formulario G-28: cómo cambiar de abogado de inmigración', en: 'Form G-28: How to Change Immigration Attorney' },
    slug: 'Formulario_G28_Cambiar_Abogado_Inmigracion',
    image: '/blog/visa-u.png',
    category: { es: 'Proceso Migratorio', en: 'Immigration Process' },
  },
  residencia_laboral_eb3_ley_245i_entrada_indocumentada: {
    title: { es: 'Residencia laboral EB-3 y Ley 245(i): entrada indocumentada', en: 'EB-3 Work Residency & Section 245(i): Undocumented Entry' },
    slug: 'residencia_laboral_eb3_ley_245i_entrada_indocumentada',
    image: '/blog/visa-u.png',
    category: { es: 'Proceso Migratorio', en: 'Immigration Process' },
  },
  foia_migratoria_pedir_record_antes_de_aplicar: {
    title: { es: 'FOIA migratoria: pedir record antes de aplicar', en: 'Immigration FOIA: Request Records Before Applying' },
    slug: 'foia_migratoria_pedir_record_antes_de_aplicar',
    image: '/blog/visa-u.png',
    category: { es: 'Proceso Migratorio', en: 'Immigration Process' },
  },
};

// Topical clusters for cross-linking
const clusters: Record<string, string[]> = {
  visa_u: [
    'permiso_de_trabajo_visa_u',
    'que_hacer_si_la_policia_no_firma_la_certificacion_visa_u',
    'perdon_i_192_como_arreglar_con_la_visa_u_si_tienes_deportaciones_previas',
    'Visa_U_y_VAWA_incluir_hijos_y_nuevos_esposos_derivados',
    'Frenar_deportacion_inminente_con_solicitud_de_Visa_Humanitaria',
  ],
  vawa: [
    'VAWA_para_hombres_maltratados_por_pareja_ciudadana_o_residente',
    'VAWA_para_padres_Maltrato_de_hijos_ciudadanos_estadounidenses',
    'Visa_U_y_VAWA_incluir_hijos_y_nuevos_esposos_derivados',
  ],
  deportation: [
    'ley_de_los_10_anos_cancelacion_de_deportacion',
    'Frenar_deportacion_inminente_con_solicitud_de_Visa_Humanitaria',
    'advance_parole_2026_viajar_con_daca_tps_visa_u',
  ],
  process: [
    'Formulario_G28_Cambiar_Abogado_Inmigracion',
    'residencia_laboral_eb3_ley_245i_entrada_indocumentada',
    'foia_migratoria_pedir_record_antes_de_aplicar',
    'advance_parole_2026_viajar_con_daca_tps_visa_u',
  ],
  humanitarian: [
    'Visa_T_trabajo_forzado_por_deuda_con_coyote',
    'Frenar_deportacion_inminente_con_solicitud_de_Visa_Humanitaria',
    'VAWA_para_hombres_maltratados_por_pareja_ciudadana_o_residente',
    'VAWA_para_padres_Maltrato_de_hijos_ciudadanos_estadounidenses',
  ],
};

/**
 * Get 3 related articles for a given blog slug.
 * Finds articles in the same cluster, excluding the current one.
 */
export function getRelatedArticles(currentSlug: string, lang: 'es' | 'en'): { title: string; slug: string; image: string; category: string }[] {
  const related = new Set<string>();

  // Find clusters this post belongs to
  for (const clusterSlugs of Object.values(clusters)) {
    if (clusterSlugs.includes(currentSlug)) {
      for (const slug of clusterSlugs) {
        if (slug !== currentSlug) related.add(slug);
      }
    }
  }

  // If less than 3, add from other clusters
  if (related.size < 3) {
    for (const slug of Object.keys(allArticles)) {
      if (slug !== currentSlug && !related.has(slug)) {
        related.add(slug);
        if (related.size >= 3) break;
      }
    }
  }

  return Array.from(related).slice(0, 3).map(slug => {
    const article = allArticles[slug];
    return {
      title: article.title[lang],
      slug: article.slug,
      image: article.image,
      category: article.category[lang],
    };
  });
}
