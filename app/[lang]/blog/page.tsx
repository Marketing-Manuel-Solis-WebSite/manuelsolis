import React from 'react';
import type { Metadata } from 'next';
import Script from 'next/script';

// Utilidades
import { generateBreadcrumbSchema } from '../../lib/breadcrumbSchema';

// Componentes
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import BlogFeed from '../../components/blogs/BlogFeed';

// ISR: regenerar la página cada hora para reflejar nuevos blogs sin redeploy
export const revalidate = 3600;

// --- CONFIGURACIÓN DEL SITIO ---
const SITE_URL = 'https://www.manuelsolis.com';
const DEFAULT_OG_IMAGE = `${SITE_URL}/blog/visa-u.png`;

// --- DATOS CENTRALIZADOS DEL BLOG (CMS Simulado) ---
export const BLOG_DATA = {
  posts: [
    // --- BLOG 30 - TPS 2026 ---
    {
      id: 'tps_2026_paises_elegibles_renovacion',
      slug: 'tps-2026-paises-elegibles-renovacion',
      title: {
        es: 'TPS 2026: países elegibles, cómo renovar y qué pasa si se cancela',
        en: 'TPS 2026: Eligible Countries, How to Renew, and What Happens If It Is Canceled'
      },
      excerpt: {
        es: 'Guía actualizada sobre el Estatus de Protección Temporal en 2026: países vigentes, terminados y en litigio. Qué hacer con tu EAD y tus opciones si pierdes TPS.',
        en: 'Updated guide on Temporary Protected Status in 2026: active countries, terminated and in litigation. What to do with your EAD and your options if you lose TPS.'
      },
      categoryId: 'procesos-migratorios',
      category: { es: 'Procesos Migratorios', en: 'Immigration Process' },
      author: 'Manuel Solís',
      date: '2025-04-10',
      readTime: '12 min',
      image: '/blog/blog_21/B1_CR1.jpg',
      featured: false
    },
    // --- BLOG 29 - CRÍMENES DEPORTACIÓN ---
    {
      id: 'crimenes_deportacion_vileza_moral',
      slug: 'crimenes-deportacion-vileza-moral',
      title: {
        es: 'Crímenes que causan deportación: la guía más útil sobre delitos de vileza moral',
        en: 'Crimes That Cause Deportation: The Most Useful Guide on Crimes of Moral Turpitude'
      },
      excerpt: {
        es: 'Conoce cómo afectan los delitos a tu caso migratorio: vileza moral, excepciones, drogas, DUI y por qué el análisis depende del estatuto penal exacto.',
        en: 'Learn how crimes affect your immigration case: moral turpitude, exceptions, drugs, DUI, and why the analysis depends on the exact penal statute.'
      },
      categoryId: 'defensa-deportacion',
      category: { es: 'Defensa contra Deportación', en: 'Deportation Defense' },
      author: 'Manuel Solís',
      date: '2025-04-14',
      readTime: '11 min',
      image: '/blog/blog_22/B2_CR1.jpg',
      featured: false
    },
    // --- BLOG 28 - RFE ---
    {
      id: 'rfe_responder_evidencia_uscis',
      slug: 'rfe-responder-evidencia-uscis',
      title: {
        es: 'Request for Evidence (RFE): cómo responder sin que te nieguen el caso',
        en: 'Request for Evidence (RFE): How to Respond Without Getting Your Case Denied'
      },
      excerpt: {
        es: 'Recibiste un RFE de USCIS y no sabes qué hacer. Aprende cómo armar una respuesta completa, los errores que hunden casos y cuándo necesitas estrategia legal.',
        en: 'You received an RFE from USCIS and don\'t know what to do. Learn how to build a complete response, mistakes that sink cases, and when you need legal strategy.'
      },
      categoryId: 'procesos-migratorios',
      category: { es: 'Procesos Migratorios', en: 'Immigration Process' },
      author: 'Manuel Solís',
      date: '2025-04-18',
      readTime: '10 min',
      image: '/blog/blog_23/B3_CR1.jpg',
      featured: false
    },
    // --- BLOG 27 - BARRAS 3 Y 10 AÑOS ---
    {
      id: 'barras_3_10_anos_presencia_ilegal',
      slug: 'barras-3-10-anos-presencia-ilegal',
      title: {
        es: 'Barras de 3 y 10 años: ¿puedo regresar a EE.UU. si me fui o me deportaron?',
        en: '3 and 10 Year Bars: Can I Return to the U.S. If I Left or Was Deported?'
      },
      excerpt: {
        es: 'Entiende las barras de 3 años, 10 años y la barra permanente por presencia ilegal. Conoce cuándo aplica el perdón I-601A y cuándo necesitas un I-212.',
        en: 'Understand the 3-year, 10-year, and permanent bars for unlawful presence. Learn when the I-601A waiver applies and when you need an I-212.'
      },
      categoryId: 'procesos-migratorios',
      category: { es: 'Procesos Migratorios', en: 'Immigration Process' },
      author: 'Manuel Solís',
      date: '2025-04-22',
      readTime: '11 min',
      image: '/blog/blog_24/B4_CR1.jpg',
      featured: false
    },
    // --- BLOG 26 - ACCIDENTE INDOCUMENTADO ---
    {
      id: 'accidente_auto_indocumentado_derechos',
      slug: 'accidente-auto-indocumentado-derechos',
      title: {
        es: 'Tuve un accidente de auto siendo indocumentado: ¿tengo derechos?',
        en: 'I Had a Car Accident While Undocumented: Do I Have Rights?'
      },
      excerpt: {
        es: 'Sí, tienes derechos después de un accidente sin importar tu estatus migratorio. Conoce qué hacer, qué NO hacer y cómo proteger tu caso y tu salud.',
        en: 'Yes, you have rights after an accident regardless of your immigration status. Learn what to do, what NOT to do, and how to protect your case and your health.'
      },
      categoryId: 'accidentes',
      category: { es: 'Accidentes', en: 'Accidents' },
      author: 'Manuel Solís',
      date: '2025-04-26',
      readTime: '10 min',
      image: '/blog/blog_25/B5_CR1.jpg',
      featured: false
    },
    // --- BLOG 25 - I-864 ---
    {
      id: 'i_864_patrocinador_ingreso_minimo',
      slug: 'i-864-patrocinador-ingreso-minimo',
      title: {
        es: 'Formulario I-864: quién puede ser patrocinador y cuánto ingreso necesita',
        en: 'Form I-864: Who Can Be a Sponsor and How Much Income Is Needed'
      },
      excerpt: {
        es: 'Guía completa del Affidavit of Support: quién firma, tabla de ingreso mínimo 2025, joint sponsors, errores comunes y la diferencia con el I-134.',
        en: 'Complete Affidavit of Support guide: who signs, 2025 minimum income table, joint sponsors, common errors, and the difference with the I-134.'
      },
      categoryId: 'procesos-migratorios',
      category: { es: 'Procesos Migratorios', en: 'Immigration Process' },
      author: 'Manuel Solís',
      date: '2025-04-30',
      readTime: '10 min',
      image: '/blog/blog_26/B6_CR1.jpg',
      featured: false
    },
    // --- BLOG 24 - VISA K-1 ---
    {
      id: 'visa_k1_prometido_requisitos',
      slug: 'visa-k1-prometido-requisitos',
      title: {
        es: 'Visa K-1 de prometido: requisitos, tiempos y errores que la retrasan',
        en: 'K-1 Fiancé Visa: Requirements, Timelines, and Mistakes That Delay It'
      },
      excerpt: {
        es: 'Todo sobre la visa de prometido K-1: quién puede pedirla, el proceso paso a paso, documentos para entrevista y cuándo conviene más casarse afuera.',
        en: 'Everything about the K-1 fiancé visa: who can petition, step-by-step process, interview documents, and when it\'s better to marry abroad.'
      },
      categoryId: 'procesos-migratorios',
      category: { es: 'Procesos Migratorios', en: 'Immigration Process' },
      author: 'Manuel Solís',
      date: '2025-05-04',
      readTime: '11 min',
      image: '/blog/blog_28/B7_CR1.jpg',
      featured: false
    },
    // --- BLOG 23 - ENTREVISTA ERRORES ---
    {
      id: 'entrevista_inmigracion_errores_evitar',
      slug: 'entrevista-inmigracion-errores-evitar',
      title: {
        es: 'Cómo prepararte para tu entrevista de inmigración: 10 errores que debes evitar',
        en: 'How to Prepare for Your Immigration Interview: 10 Mistakes to Avoid'
      },
      excerpt: {
        es: 'Consejos prácticos para entrevistas de inmigración: documentos, originales, traducciones, consistencia, intérprete y los 10 errores más comunes.',
        en: 'Practical tips for immigration interviews: documents, originals, translations, consistency, interpreter, and the 10 most common mistakes.'
      },
      categoryId: 'procesos-migratorios',
      category: { es: 'Procesos Migratorios', en: 'Immigration Process' },
      author: 'Manuel Solís',
      date: '2025-05-08',
      readTime: '10 min',
      image: '/blog/blog_27/B8_CR1.jpg',
      featured: false
    },
    // --- BLOG 22 - FAMILIAS ESTATUS MIXTO ---
    {
      id: 'familias_estatus_mixto_opciones',
      slug: 'familias-estatus-mixto-opciones',
      title: {
        es: 'Familias de estatus mixto: opciones legales cuando unos tienen papeles y otros no',
        en: 'Mixed-Status Families: Legal Options When Some Have Papers and Others Don\'t'
      },
      excerpt: {
        es: 'Guía para familias donde unos tienen papeles y otros no: peticiones, mitos sobre hijos ciudadanos, preparación ante emergencias y protecciones como VAWA.',
        en: 'Guide for families where some have papers and others don\'t: petitions, myths about citizen children, emergency preparation, and protections like VAWA.'
      },
      categoryId: 'procesos-migratorios',
      category: { es: 'Procesos Migratorios', en: 'Immigration Process' },
      author: 'Manuel Solís',
      date: '2025-05-12',
      readTime: '11 min',
      image: '/blog/blog_29/B9_CR1.jpg',
      featured: false
    },
    // --- BLOG 21 - FRAUDE NOTARIOS ---
    {
      id: 'fraude_notarios_inmigracion',
      slug: 'fraude-notarios-inmigracion',
      title: {
        es: 'Fraude de notarios: cómo saber si tu "abogado" es falso y qué hacer si te estafaron',
        en: 'Notary Fraud: How to Tell If Your "Lawyer" Is Fake and What to Do If You Were Scammed'
      },
      excerpt: {
        es: 'Un notario en EE.UU. no es abogado. Conoce las señales de fraude, cómo verificar credenciales y qué hacer si tu caso fue dañado por un consultor no autorizado.',
        en: 'A notary in the U.S. is not a lawyer. Learn the signs of fraud, how to verify credentials, and what to do if your case was damaged by an unauthorized consultant.'
      },
      categoryId: 'procesos-migratorios',
      category: { es: 'Procesos Migratorios', en: 'Immigration Process' },
      author: 'Manuel Solís',
      date: '2025-05-16',
      readTime: '9 min',
      image: '/blog/blog_30/B10_CR1.jpg',
      featured: false
    },
    // --- BLOG 20 - NUEVO ---
    {
      id: 'asilo_frontera_2026_puerto_entrada_vs_cruce',
      slug: 'asilo-frontera-2026-puerto-entrada-vs-cruce',
      title: {
        es: 'Asilo en la frontera 2026: diferencias entre entregarse, presentarse en un puerto de entrada y otros procesos vigentes',
        en: 'Asylum at the Border 2026: Differences Between Surrendering, Presenting at a Port of Entry, and Other Current Processes'
      },
      excerpt: {
        es: 'Las reglas de asilo en la frontera cambian constantemente. Conoce las diferencias entre cruzar sin autorización y presentarte en un puerto de entrada, el concepto de miedo creíble y los riesgos de la deportación expedita.',
        en: 'Asylum rules at the border change constantly. Learn the differences between unauthorized crossing and presenting at a port of entry, the concept of credible fear, and the risks of expedited removal.'
      },
      categoryId: 'visa-humanitaria',
      category: { es: 'Visa Humanitaria', en: 'Humanitarian Relief' },
      author: 'Manuel Solís',
      date: '2025-04-04',
      readTime: '11 min',
      image: '/blog/blog_20/BLOG10_CR1.png',
      featured: true
    },
    // --- BLOG 19 - NUEVO ---
    {
      id: 'entrevista_matrimonio_uscis_senales_alerta',
      slug: 'entrevista-matrimonio-uscis-senales-alerta',
      title: {
        es: 'Entrevista de matrimonio: señales de alerta que hacen sospechar a USCIS',
        en: 'Marriage Interview: Red Flags That Make USCIS Suspicious'
      },
      excerpt: {
        es: 'La entrevista de residencia por matrimonio es uno de los momentos más importantes del proceso. Conoce qué evidencia busca USCIS, qué señales podrían generar sospechas y qué ocurre en una entrevista Stokes.',
        en: 'The marriage-based residency interview is one of the most important moments in the process. Learn what evidence USCIS looks for, what red flags could raise suspicion, and what happens in a Stokes interview.'
      },
      categoryId: 'procesos-migratorios',
      category: { es: 'Procesos Migratorios', en: 'Immigration Process' },
      author: 'Manuel Solís',
      date: '2025-04-01',
      readTime: '10 min',
      image: '/blog/blog_19/BLOG09_CR1.png',
      featured: false
    },
    // --- BLOG 18 - NUEVO ---
    {
      id: 'ciudadania_en_espanol_reglas_50_20_55_15',
      slug: 'ciudadania-en-espanol-reglas-50-20-55-15',
      title: {
        es: 'Ciudadanía (N-400) en español: ¿quiénes califican por edad y tiempo?',
        en: 'Citizenship (N-400) in Spanish: Who Qualifies by Age and Time?'
      },
      excerpt: {
        es: 'Para muchos residentes permanentes, el idioma inglés es el mayor obstáculo para la ciudadanía. Descubre las reglas 50/20, 55/15 y la exención médica N-648 que podrían permitirte presentar el examen en español.',
        en: 'For many permanent residents, English is the biggest obstacle to citizenship. Discover the 50/20, 55/15 rules and the N-648 medical exemption that could allow you to take the exam in Spanish.'
      },
      categoryId: 'procesos-migratorios',
      category: { es: 'Procesos Migratorios', en: 'Immigration Process' },
      author: 'Manuel Solís',
      date: '2025-03-28',
      readTime: '9 min',
      image: '/blog/blog_18/BLOG08_CR1.png',
      featured: false
    },
    // --- BLOG 17 - NUEVO ---
    {
      id: 'marihuana_dui_buen_caracter_moral_inmigracion',
      slug: 'marihuana-dui-buen-caracter-moral-inmigracion',
      title: {
        es: 'Legal en mi estado, delito para Inmigración: marihuana, DUI y buen carácter moral',
        en: 'Legal in My State, a Crime for Immigration: Marijuana, DUI and Good Moral Character'
      },
      excerpt: {
        es: 'Con la legalización de la marihuana en muchos estados, muchos inmigrantes asumen que no tiene consecuencias migratorias. Descubre cómo la marihuana, un DUI y el buen carácter moral podrían afectar tu Green Card o ciudadanía.',
        en: 'With marijuana legalization in many states, many immigrants assume it has no immigration consequences. Learn how marijuana, a DUI, and good moral character could affect your Green Card or citizenship.'
      },
      categoryId: 'procesos-migratorios',
      category: { es: 'Procesos Migratorios', en: 'Immigration Process' },
      author: 'Manuel Solís',
      date: '2025-03-24',
      readTime: '10 min',
      image: '/blog/blog_17/BLOG07_CR1.png',
      featured: false
    },
    // --- BLOG 16 - NUEVO ---
    {
      id: 'perdon_i601a_arreglar_papeles_entrada_ilegal',
      slug: 'perdon-i601a-arreglar-papeles-entrada-ilegal',
      title: {
        es: 'Me casé con ciudadano pero entré "por el cerro": el Perdón I-601A explicado',
        en: 'I Married a Citizen but Entered Illegally: The I-601A Waiver Explained'
      },
      excerpt: {
        es: 'Casarse con un ciudadano no otorga residencia automática si entraste sin inspección. Descubre cómo el Perdón I-601A permite obtener la residencia evitando el castigo de los 10 años.',
        en: 'Marrying a citizen doesn\'t grant automatic residency if you entered without inspection. Discover how the I-601A Waiver helps obtain residency while avoiding the 10-year bar.'
      },
      categoryId: 'procesos-migratorios',
      category: { es: 'Procesos Migratorios', en: 'Immigration Process' },
      author: 'Manuel Solís',
      date: '2025-03-20',
      readTime: '11 min',
      image: '/blog/blog_16/BLOG06_CR1.png',
      featured: false
    },
    // --- BLOG 15 - NUEVO ---
    {
      id: 'estatus_juvenil_sijs_residencia_jovenes_abandonados',
      slug: 'estatus-juvenil-sijs-residencia-jovenes-abandonados',
      title: {
        es: 'Estatus Juvenil (SIJS): papeles para jóvenes abandonados por un solo padre',
        en: 'Juvenile Status (SIJS): Papers for Youth Abandoned by One Parent'
      },
      excerpt: {
        es: 'Muchos jóvenes que viven con su madre u otro familiar podrían calificar para el SIJS, incluso si sólo uno de sus padres estuvo ausente. Conoce qué es el SIJS y cómo podría abrir un camino a la residencia juvenil.',
        en: 'Many youth living with their mother or another relative could qualify for SIJS, even if only one parent was absent. Learn what SIJS is and how it could open a path to juvenile residency.'
      },
      categoryId: 'visa-humanitaria',
      category: { es: 'Visa Humanitaria', en: 'Humanitarian Relief' },
      author: 'Manuel Solís',
      date: '2025-03-17',
      readTime: '10 min',
      image: '/blog/blog_15/BLOG05_CR1.png',
      featured: false
    },
    // --- BLOG 14 - NUEVO ---
    {
      id: 'foia_migratoria_pedir_record_antes_de_aplicar',
      slug: 'foia-migratoria-pedir-record-antes-de-aplicar',
      title: {
        es: 'No apliques a ciegas: por qué pedir tu récord (FOIA) podría salvar tu caso',
        en: 'Don\'t Apply Blind: Why Requesting Your Record (FOIA) Could Save Your Case'
      },
      excerpt: {
        es: 'Muchos procesos migratorios se complican por información incompleta o mal recordada. Aprende qué es una FOIA, qué información podría revelar y por qué pedir tu récord antes de aplicar podría marcar la diferencia.',
        en: 'Many immigration processes get complicated due to incomplete or misremembered information. Learn what a FOIA is, what it could reveal, and why requesting your record before applying could make a big difference.'
      },
      categoryId: 'procesos-migratorios',
      category: { es: 'Procesos Migratorios', en: 'Immigration Process' },
      author: 'Manuel Solís',
      date: '2025-03-12',
      readTime: '9 min',
      image: '/blog/blog_14/BLOG04_CR1.png',
      featured: true
    },
    // --- BLOG 13 - NUEVO ---
    {
      id: 'residencia_laboral_eb3_ley_245i_entrada_indocumentada',
      slug: 'residencia-laboral-eb3-ley-245i-entrada-indocumentada',
      title: {
        es: '¿Puede mi patrón pedirme la residencia si entré indocumentado? Visas EB-3 y la Ley 245(i)',
        en: 'Can My Employer Sponsor My Residency If I Entered Undocumented? EB-3 Visas and Section 245(i)'
      },
      excerpt: {
        es: '¿Tu jefe quiere pedirte la residencia? Conoce si una visa laboral podría funcionar si entraste indocumentado, los riesgos del proceso consular y la excepción clave de la Ley 245(i).',
        en: 'Can your employer sponsor your green card? Learn if an employment visa could work if you entered undocumented, the risks of consular processing, and the key exception under Section 245(i).'
      },
      categoryId: 'procesos-migratorios',
      category: { es: 'Procesos Migratorios', en: 'Immigration Process' },
      author: 'Manuel Solís',
      date: '2025-03-08',
      readTime: '10 min',
      image: '/blog/blog_13/BLOG03_CR1.png',
      featured: true
    },
    // --- BLOG 12 - NUEVO ---
    {
      id: 'advance_parole_2026_viajar_con_daca_tps_visa_u',
      slug: 'advance-parole-2026-viajar-con-daca-tps-visa-u',
      title: {
        es: 'Advance Parole 2026: ¿Es seguro viajar a mi país con DACA, TPS o Visa U pendiente?',
        en: 'Advance Parole 2026: Is It Safe to Travel with DACA, TPS, or a Pending U Visa?'
      },
      excerpt: {
        es: '¿Tienes DACA o TPS y quieres viajar? Conoce los riesgos y posibles beneficios del Advance Parole en 2026 y cuándo podría ayudarte o cuándo podría ser peligroso.',
        en: 'Have DACA or TPS and want to travel? Learn the risks and possible benefits of Advance Parole in 2026 and when it could help you or when it could be dangerous.'
      },
      categoryId: 'procesos-migratorios',
      category: { es: 'Procesos Migratorios', en: 'Immigration Process' },
      author: 'Manuel Solís',
      date: '2025-03-05',
      readTime: '9 min',
      image: '/blog/blog_12/BLOG02_CR1.png',
      featured: false
    },
    // --- BLOG 11 - NUEVO ---
    {
      id: 'ley_de_los_10_anos_cancelacion_de_deportacion',
      slug: 'ley-de-los-10-anos-cancelacion-de-deportacion',
      title: {
        es: '¿Califico para la "Ley de los 10 años" solo por vivir aquí? Mitos de la Cancelación de Deportación',
        en: 'Do I Qualify for the "10-Year Rule" Just by Living Here? Myths of Cancellation of Removal'
      },
      excerpt: {
        es: '¿Crees que calificas por tener 10 años en EE. UU.? Conoce la verdad sobre la Cancelación de Deportación, por qué no es automática y los mitos más comunes de esta defensa legal.',
        en: 'Think you qualify just by living 10 years in the U.S.? Learn the truth about Cancellation of Removal, why it is not automatic, and the most common myths about this legal defense.'
      },
      categoryId: 'defensa-deportacion',
      category: { es: 'Defensa contra Deportación', en: 'Deportation Defense' },
      author: 'Manuel Solís',
      date: '2025-03-02',
      readTime: '10 min',
      image: '/blog/blog_11/BLOG01_CR1.png',
      featured: false
    },
    // --- BLOG 10 ---
    {
      id: 'Visa_U_y_VAWA_incluir_hijos_y_nuevos_esposos_derivados',
      slug: 'visa-u-y-vawa-incluir-hijos-y-nuevos-esposos-derivados',
      title: { 
        es: 'Visa U y VAWA: Incluir a hijos y nuevos esposos (Derivados)', 
        en: 'U Visa & VAWA: Including Children and New Spouses (Derivatives)' 
      },
      excerpt: { 
        es: '¿Solicitaste la Visa U o VAWA y te preocupa qué pasará con tus hijos o tu nueva pareja? Descubre cómo incluir a familiares como derivados en tu caso, los requisitos, los límites de edad y cómo reunificar a tu familia legalmente.', 
        en: 'Did you apply for a U Visa or VAWA and are worried about your children or new partner? Learn how to include family members as derivatives, the requirements, age limits, and how to legally reunify your family.' 
      },
      categoryId: 'visa-u',
      category: { es: 'Visa U & VAWA', en: 'U Visa & VAWA' },
      author: 'Manuel Solís',
      date: '2025-02-16',
      readTime: '8 min',
      image: '/blog/blog_10/B10_CR1.png', 
      featured: true
    },
    // --- BLOG 08 ---
    {
      id: 'Formulario_G28_Cambiar_Abogado_Inmigracion',
      slug: 'formulario-g28-cambiar-abogado-inmigracion',
      title: { 
        es: 'Cambiar de abogado en inmigración: cómo usar el Formulario G-28 sin dañar tu caso', 
        en: 'Changing Immigration Attorneys: How to Use Form G-28 Without Hurting Your Case' 
      },
      excerpt: { 
        es: '¿Quieres cambiar de abogado pero temes afectar tu proceso migratorio? Aprende para qué sirve el Formulario G-28 y cómo notificar correctamente a USCIS sin poner en riesgo tu caso.', 
        en: 'Thinking about changing attorneys but worried about your immigration case? Learn what Form G-28 does and how to properly notify USCIS without risking your process.' 
      },
      categoryId: 'procesos-migratorios',
      category: { es: 'Procesos Migratorios', en: 'Immigration Process' },
      author: 'Manuel Solís',
      date: '2025-02-12',
      readTime: '10 min',
      image: '/blog/blog_09/B9_CR1.png', 
      featured: true
    },
    {
      id: 'Frenar_deportacion_inminente_con_solicitud_de_Visa_Humanitaria',
      slug: 'frenar-deportacion-inminente-con-solicitud-de-visa-humanitaria',
      title: { 
        es: 'Parar deportación urgente: cómo frenarla con Visa U o VAWA pendiente (Stay of Removal)', 
        en: 'Stop an Urgent Deportation: How a Pending U Visa or VAWA Can Help (Stay of Removal)' 
      },
      excerpt: { 
        es: '¿Recibiste una orden de deportación y no sabes qué hacer? Aprende cómo podrías frenar una deportación inminente con una solicitud humanitaria pendiente (Visa U, VAWA u otras) mediante un Stay of Removal ante ICE.', 
        en: 'Have a final removal order and don\'t know what to do? Learn how a pending humanitarian petition (U Visa, VAWA, and others) may help pause an urgent deportation through a Stay of Removal with ICE.' 
      },
      categoryId: 'visa-humanitaria',
      category: { es: 'Visa Humanitaria', en: 'Humanitarian Relief' },
      author: 'Manuel Solís',
      date: '2025-02-10',
      readTime: '7 min',
      image: '/blog/blog_08/B8_CR1.png', 
      featured: false
    },
    // --- BLOG 07 ---
    {
      id: 'Visa_T_trabajo_forzado_por_deuda_con_coyote',
      slug: 'visa-t-trabajo-forzado-por-deuda-con-coyote',
      title: { 
        es: 'Visa T: papeles para víctimas de coyotes y trabajo forzado por deuda', 
        en: 'T Visa: Immigration Relief for Victims of Forced Labor and Smuggling Debt' 
      },
      excerpt: { 
        es: '¿Te obligaron a trabajar para pagarle a un coyote bajo amenazas o coerción? Esa experiencia podría calificarte para la Visa T, una protección legal para víctimas de trata laboral que permite vivir y trabajar legalmente en EE. UU.', 
        en: 'Were you forced to work to repay a smuggler under threats or coercion? That experience may qualify you for a T Visa, a form of immigration protection for victims of labor trafficking in the United States.' 
      },
      categoryId: 'visa-T',
      category: { es: 'Visa T', en: 'T Visa' },
      author: 'Manuel Solís',
      date: '2025-02-03',
      readTime: '9 min',
      image: '/blog/blog_07/B7_CR1.png', 
      featured: false
    },
    // --- BLOG 06 ---
    {
      id: 'VAWA_para_hombres_maltratados_por_pareja_ciudadana_o_residente',
      slug: 'vawa-para-hombres-maltratados-por-pareja-ciudadana-o-residente',
      title: { 
        es: 'VAWA para hombres: protección migratoria por abuso de pareja ciudadana o residente', 
        en: 'VAWA for Men: Immigration Protection from Abuse by a Citizen or Resident Spouse' 
      },
      excerpt: { 
        es: '¿Eres hombre y estás siendo maltratado por tu esposa ciudadana o residente permanente? Conoce cómo VAWA puede protegerte y permitirte solicitar la residencia sin depender de tu agresora.', 
        en: 'Are you a man being abused by your U.S. citizen or permanent resident spouse? Learn how VAWA can protect you and allow you to apply for residency without relying on your abuser.' 
      },
      categoryId: 'visa-VAWA',
      category: { es: 'Visa VAWA', en: 'VAWA Visa' },
      author: 'Manuel Solís',
      date: '2025-01-30',
      readTime: '8 min',
      image: '/blog/blog_06/B6_CR1.png', 
      featured: false
    },
    // --- BLOG 05 ---
    {
      id: 'VAWA_para_padres_Maltrato_de_hijos_ciudadanos_estadounidenses',
      slug: 'vawa-para-padres-maltrato-de-hijos-ciudadanos-estadounidenses',
      title: { 
        es: 'VAWA para padres: maltrato de hijos ciudadanos estadounidenses', 
        en: 'VAWA for Parents: Abuse by U.S. Citizen Children' 
      },
      excerpt: { 
        es: '¿Te sientes maltratado por tu hijo ciudadano estadounidense y no sabes qué hacer? Descubre cómo la ley VAWA podría ayudarte a protegerte y obtener la residencia legal sin depender del hijo que te agrede.', 
        en: 'Are you being abused by your U.S. citizen child and don\'t know what to do? Learn how VAWA may help you protect yourself and obtain legal residency without relying on the abusive child.' 
      },
      categoryId: 'visa-VAWA',
      category: { es: 'Visa VAWA', en: 'VAWA Visa' },
      author: 'Manuel Solís',
      date: '2025-01-28',
      readTime: '10 min',
      image: '/blog/blog_05/B5_CR1.png', 
      featured: false
    },
    // --- BLOG 03 ---
    {
      id: 'perdon_i_192_como_arreglar_con_la_visa_u_si_tienes_deportaciones_previas',
      slug: 'perdon-i-192-como-arreglar-con-la-visa-u-si-tienes-deportaciones-previas',
      title: { 
        es: 'Perdón I-192: cómo arreglar con la Visa U si tienes deportaciones previas', 
        en: 'I-192 Waiver: How to Fix Your U Visa Case with Prior Deportations' 
      },
      excerpt: { 
        es: '¿Tienes deportaciones previas, reingresos ilegales o un historial migratorio complicado? Descubre como el perdon I-192 puede permitirte arreglar con la Visa U incluso cuando otros caminos estan cerrados.', 
        en: 'Do you have prior deportations, illegal reentries, or a complicated immigration history? Learn how the I-192 waiver may allow you to fix your U Visa case even when other options are closed.' 
      },
      categoryId: 'visa-u',
      category: { es: 'Visa U', en: 'U Visa' },
      author: 'Manuel Solís',
      date: '2025-01-23',
      readTime: '10 min',
      image: '/blog/blog_03/B3_CR1.png', 
      featured: false
    },
    // --- BLOG 02 ---
    {
      id: 'que-hacer-si-la-policia-no-firma',
      slug: 'que-hacer-si-la-policia-no-firma-la-certificacion-visa-u',
      title: { 
        es: '¿Qué hacer si la policía no firma la certificación Visa U?', 
        en: 'What to do if the police refuse to sign the U Visa certification?' 
      },
      excerpt: { 
        es: '¿La policía se negó a firmar tu certificación para la Visa U? No todo está perdido. Descubre qué hacer y quién más podría firmar el suplemento B.', 
        en: 'Did the police refuse to sign your certification for the U Visa? All is not lost. Discover what to do and who else could sign Supplement B.' 
      },
      categoryId: 'visa-u',
      category: { es: 'Visa U', en: 'U Visa' },
      author: 'Manuel Solís',
      date: '2025-01-20',
      readTime: '6 min',
      image: '/blog/blog_02/B2_CR1.png', 
      featured: false
    },
    // --- BLOG 01 ---
    {
      id: 'permiso_de_trabajo_visa_u',
      slug: 'permiso-de-trabajo-visa-u',
      title: { 
        es: 'Permiso de trabajo Visa U (Bona Fide) antes de la aprobación final', 
        en: 'U Visa Work Permit (Bona Fide) Before Final Approval' 
      },
      excerpt: { 
        es: '¿Solicitaste la Visa U y esperas sin poder trabajar? Descubre cómo obtener un permiso de trabajo bajo la determinación Bona Fide y asegura tu estabilidad económica.', 
        en: 'Did you apply for the U Visa and are waiting without being able to work? Discover how to obtain a work permit under Bona Fide determination and secure your financial stability.' 
      },
      categoryId: 'visa-u',
      category: { es: 'Visa U', en: 'U Visa' },
      author: 'Manuel Solís',
      date: '2025-01-16',
      readTime: '8 min',
      image: '/blog/visa-u.png', 
      featured: false
    }
  ],
  categories: [
    { id: 'all', es: 'Todos', en: 'All' },
    { id: 'visa-u', es: 'Visa U', en: 'U Visa' },
    { id: 'procesos-migratorios', es: 'Procesos Migratorios', en: 'Immigration Process' },
    { id: 'defensa-deportacion', es: 'Defensa contra Deportación', en: 'Deportation Defense' },
    { id: 'visa-humanitaria', es: 'Visa Humanitaria', en: 'Humanitarian Relief' },
    { id: 'visa-T', es: 'Visa T', en: 'T Visa' },
    { id: 'visa-VAWA', es: 'Visa VAWA', en: 'VAWA Visa' },
    { id: 'accidentes', es: 'Accidentes', en: 'Accidents' }
  ],
  uiText: {
    hero: {
      badge: { es: 'BLOG LEGAL', en: 'LEGAL BLOG' },
      title: { es: 'Noticias de Inmigración y Consejos Legales', en: 'Immigration News & Legal Advice' },
      subtitle: { es: 'Recursos confiables sobre la Visa U, residencia, defensa contra deportación y más, escritos por expertos.', en: 'Reliable resources on U Visa, residency, deportation defense, and more, written by experts.' }
    },
    featured: { es: 'Artículo Destacado', en: 'Featured Article' },
    latest: { es: 'Últimos Artículos', en: 'Latest Articles' },
    noResults: { es: 'No se encontraron artículos', en: 'No articles found' }
  }
};

// --- METADATA SEO POTENCIADA ---
export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const isEs = lang === 'es';

  const title = isEs
    ? 'Blog de Inmigración y Noticias Legales'
    : 'Immigration Blog & Legal News';
  
  const description = isEs
    ? 'Manténgase informado con las últimas noticias de inmigración, cambios en la Visa U, consejos para la residencia y guías legales del Abogado Manuel Solís.'
    : 'Stay informed with the latest immigration news, U Visa updates, residency tips, and legal guides from Attorney Manuel Solis.';

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${lang}/blog`,
      languages: {
        'en': `${SITE_URL}/en/blog`,
        'es': `${SITE_URL}/es/blog`,
        'x-default': `${SITE_URL}/es/blog`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${lang}/blog`,
      type: 'website',
      siteName: 'Manuel Solís Law Firm',
      locale: isEs ? 'es_US' : 'en_US',
      images: [{
        url: DEFAULT_OG_IMAGE, 
        width: 1200,
        height: 630,
        alt: title
      }]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [DEFAULT_OG_IMAGE], 
      creator: '@AbogadoMSolis'
    },
    keywords: isEs 
      ? ['blog inmigración', 'noticias visa u', 'abogado manuel solis', 'permiso trabajo', 'noticias legales usa', 'bona fide visa u']
      : ['immigration blog', 'u visa news', 'attorney manuel solis', 'work permit', 'legal news usa', 'bona fide u visa'],
  };
}

// --- SCHEMA.ORG (JSON-LD) PARA BLOG ---
const getBlogSchema = (lang: string) => {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": lang === 'es' ? "Blog Legal Manuel Solís" : "Manuel Solis Legal Blog",
    "description": lang === 'es' ? "Recursos y noticias legales de inmigración." : "Immigration legal resources and news.",
    "url": `${SITE_URL}/${lang}/blog`,
    "publisher": {
      "@type": "Organization",
      "name": "Manuel Solis Law Firm",
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE_URL}/logo-manuel-solis.png`
      }
    },
    "blogPost": BLOG_DATA.posts.map(post => ({
      "@type": "BlogPosting",
      "headline": post.title[lang as 'es'|'en'],
      "description": post.excerpt[lang as 'es'|'en'],
      "datePublished": post.date,
      "author": {
        "@type": "Person",
        "name": post.author
      },
      "url": `${SITE_URL}/${lang}/blog/${post.slug}`,
      "image": `${SITE_URL}${post.image}`
    }))
  };
};

export default async function BlogPageIndex({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const currentLang = (lang === 'es' || lang === 'en') ? lang : 'en';
  const schemaData = getBlogSchema(currentLang);

  const breadcrumbData = generateBreadcrumbSchema([
    { name: currentLang === 'es' ? 'Inicio' : 'Home', url: `/${currentLang}` },
    { name: 'Blog', url: `/${currentLang}/blog` },
  ]);

  return (
    <>
      <Script
        id="blog-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />

      <Header />
      
      <BlogFeed 
        initialPosts={BLOG_DATA.posts}
        categories={BLOG_DATA.categories}
        uiText={BLOG_DATA.uiText}
        lang={currentLang}
      />

      <Footer />
    </>
  );
}

export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'es' }];
}