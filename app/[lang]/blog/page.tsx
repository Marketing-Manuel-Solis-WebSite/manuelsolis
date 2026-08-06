import React from 'react';
import type { Metadata } from 'next';

// Utilidades
import { generateBreadcrumbSchema } from '../../lib/breadcrumbSchema';
import { buildSocialMetadata } from '../../lib/seoMetadata';

// Componentes
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import BlogFeed from '../../components/blogs/BlogFeed';

// ISR: regenerar la página cada hora para reflejar nuevos blogs sin redeploy
export const revalidate = 3600;

// --- CONFIGURACIÓN DEL SITIO ---
const SITE_URL = 'https://www.manuelsolis.com';
// Imagen genérica del sitio (1200x630, las dimensiones que declara el OG): la
// portada del índice no debe ser la imagen de un post concreto.
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-default.jpg`;

// --- DATOS CENTRALIZADOS DEL BLOG (CMS Simulado) ---
export const BLOG_DATA = {
  posts: [
    {
      id: 'ley_laken_riley_detencion_obligatoria_2026',
      slug: 'ley-laken-riley-detencion-obligatoria-2026',
      title: {
        es: 'Ley Laken Riley: por qué un cargo de robo puede dejarte detenido sin fianza',
        en: 'The Laken Riley Act: Why a Theft Charge Can Leave You Detained Without Bond'
      },
      excerpt: {
        es: 'La ley obliga a detener a personas indocumentadas con ciertos cargos aunque no haya condena. Quién está en riesgo, qué dicen las cortes y qué defensas existen.',
        en: 'The law requires detaining undocumented people with certain charges even without a conviction. Who is at risk, what courts are saying, and what defenses exist.'
      },
      categoryId: 'defensa-deportacion',
      category: { es: 'Defensa contra Deportación', en: 'Deportation Defense' },
      author: 'Manuel Solís',
      date: '2026-08-06',
      readTime: '20 min',
      image: '/og-default.jpg',
      featured: false
    },
    {
      id: 'impuesto_1_por_ciento_remesas_2026_como_evitarlo',
      slug: 'impuesto-1-por-ciento-remesas-2026-como-evitarlo',
      title: {
        es: 'Impuesto del 1% a las remesas: quién lo paga y cómo enviar dinero sin pagarlo',
        en: 'The 1% Remittance Tax: Who Pays It and How to Send Money Without It'
      },
      excerpt: {
        es: 'Desde enero de 2026 hay un impuesto del 1% a remesas pagadas en efectivo. Quién lo paga, quién queda exento y las formas 100% legales de evitarlo.',
        en: 'Since January 2026 there is a 1% tax on remittances funded with cash. Who pays, who is exempt, and the fully legal ways to avoid it.'
      },
      categoryId: 'procesos-migratorios',
      category: { es: 'Procesos Migratorios', en: 'Immigration Process' },
      author: 'Manuel Solís',
      date: '2026-08-06',
      readTime: '16 min',
      image: '/og-default.jpg',
      featured: false
    },
    {
      id: 'cuanto_cuesta_arreglar_papeles_tarifas_uscis_2026',
      slug: 'cuanto-cuesta-arreglar-papeles-tarifas-uscis-2026',
      title: {
        es: '¿Cuánto cuesta arreglar papeles en 2026? La tabla real de tarifas de USCIS',
        en: 'What Does It Cost to Fix Your Papers in 2026? The Real USCIS Fee Table'
      },
      excerpt: {
        es: 'Tarifas de inmigración 2026: residencia, ciudadanía, permisos de trabajo y las nuevas tarifas de asilo, TPS y parole que no se pueden exonerar.',
        en: '2026 immigration fees: residency, citizenship, work permits, and the new asylum, TPS and parole fees that cannot be waived.'
      },
      categoryId: 'procesos-migratorios',
      category: { es: 'Procesos Migratorios', en: 'Immigration Process' },
      author: 'Manuel Solís',
      date: '2026-08-06',
      readTime: '21 min',
      image: '/og-default.jpg',
      featured: false
    },
    {
      id: 'autodeportacion_salida_voluntaria_riesgos_2026',
      slug: 'autodeportacion-salida-voluntaria-riesgos-2026',
      title: {
        es: '"Autodeportación": lo que el gobierno no te dice antes de que firmes tu salida',
        en: 'Self-Deportation: What the Government Does Not Tell You Before You Sign'
      },
      excerpt: {
        es: 'Antes de aceptar dinero por irte solo, entiende qué pierdes: barras de reingreso, casos pendientes cancelados y derechos que no regresan.',
        en: 'Before accepting money to leave on your own, understand what you lose: reentry bars, cancelled pending cases, and rights that do not come back.'
      },
      categoryId: 'defensa-deportacion',
      category: { es: 'Defensa contra Deportación', en: 'Deportation Defense' },
      author: 'Manuel Solís',
      date: '2026-08-06',
      readTime: '19 min',
      image: '/og-default.jpg',
      featured: false
    },
    {
      id: 'parole_humanitario_terminado_opciones_2026',
      slug: 'parole-humanitario-terminado-opciones-2026',
      title: {
        es: 'Mi parole humanitario terminó: opciones legales antes de quedarte sin estatus',
        en: 'My Humanitarian Parole Ended: Legal Options Before You Lose Status'
      },
      excerpt: {
        es: 'Miles perdieron el permiso y el estatus al terminar los programas de parole. Qué opciones reales existen y qué plazos no puedes dejar pasar.',
        en: 'Thousands lost permission and status when parole programs ended. What real options exist and which deadlines you cannot let slip.'
      },
      categoryId: 'visa-humanitaria',
      category: { es: 'Visa Humanitaria', en: 'Humanitarian Relief' },
      author: 'Manuel Solís',
      date: '2026-08-06',
      readTime: '20 min',
      image: '/og-default.jpg',
      featured: false
    },
    {
      id: 'perdi_el_tps_opciones_legales_2026',
      slug: 'perdi-el-tps-opciones-legales-2026',
      title: {
        es: 'Perdí el TPS: 5 caminos legales que podrían mantenerte en Estados Unidos',
        en: 'I Lost TPS: 5 Legal Paths That Could Keep You in the United States'
      },
      excerpt: {
        es: 'Con las designaciones terminadas, miles perdieron estatus y permiso de trabajo. Estas son las 5 rutas que un abogado revisa primero.',
        en: 'With designations ended, thousands lost status and work permits. These are the 5 routes an attorney reviews first.'
      },
      categoryId: 'visa-humanitaria',
      category: { es: 'Visa Humanitaria', en: 'Humanitarian Relief' },
      author: 'Manuel Solís',
      date: '2026-08-06',
      readTime: '23 min',
      image: '/og-default.jpg',
      featured: false
    },
    {
      id: 'caso_desestimado_corte_inmigracion_trampa_deportacion_expedita',
      slug: 'caso-desestimado-corte-inmigracion-trampa-deportacion-expedita',
      title: {
        es: '"Desestimaron" mi caso en la corte de inmigración: por qué puede ser una trampa',
        en: 'They "Dismissed" My Immigration Court Case: Why That Can Be a Trap'
      },
      excerpt: {
        es: 'Que el gobierno cierre tu caso suena a buena noticia, pero puede dejarte expuesto a deportación expedita sin ver a un juez. Cómo oponerte.',
        en: 'The government closing your case sounds like good news, but it can expose you to expedited removal without seeing a judge. How to oppose it.'
      },
      categoryId: 'defensa-deportacion',
      category: { es: 'Defensa contra Deportación', en: 'Deportation Defense' },
      author: 'Manuel Solís',
      date: '2026-08-06',
      readTime: '19 min',
      image: '/og-default.jpg',
      featured: false
    },
    {
      id: 'cita_supervision_ice_check_in_riesgo_arresto_2026',
      slug: 'cita-supervision-ice-check-in-riesgo-arresto-2026',
      title: {
        es: 'Cita de supervisión con ICE: cómo prepararte y qué hacer ante el riesgo de arresto',
        en: 'ICE Check-In: How to Prepare and What to Do If You Are Arrested'
      },
      excerpt: {
        es: 'Debes ir a tu check-in, pero no debes ir sin plan: documentos, abogado, poder notarial para tus hijos y estrategia antes de la cita.',
        en: 'You must attend your check-in, but not without a plan: documents, attorney, power of attorney for your children, and strategy beforehand.'
      },
      categoryId: 'defensa-deportacion',
      category: { es: 'Defensa contra Deportación', en: 'Deportation Defense' },
      author: 'Manuel Solís',
      date: '2026-08-06',
      readTime: '20 min',
      image: '/og-default.jpg',
      featured: false
    },
    {
      id: 'muerte_accidente_trabajo_texas_derechos_familia',
      slug: 'muerte-accidente-trabajo-texas-derechos-familia',
      title: {
        es: 'Murió mi familiar en un accidente de trabajo en Texas: los derechos de la familia',
        en: 'My Relative Died in a Workplace Accident in Texas: The Family Rights'
      },
      excerpt: {
        es: 'En Texas la familia puede tener derecho a compensación por muerte injusta sin importar el estatus migratorio de nadie. Quién puede reclamar y qué plazos corren.',
        en: 'In Texas the family may have a wrongful death claim regardless of anyone immigration status. Who can claim and what deadlines apply.'
      },
      categoryId: 'accidentes',
      category: { es: 'Accidentes', en: 'Accidents' },
      author: 'Manuel Solís',
      date: '2026-08-06',
      readTime: '21 min',
      image: '/og-default.jpg',
      featured: false
    },
    {
      id: 'hijo_ciudadano_21_anos_pedir_padres_2026',
      slug: 'hijo-ciudadano-21-anos-pedir-padres-2026',
      title: {
        es: 'Mi hijo ciudadano cumplió 21: cómo puede pedirme y qué pasa si entré sin papeles',
        en: 'My Citizen Child Turned 21: How They Can Petition and What If I Entered Illegally'
      },
      excerpt: {
        es: 'El proceso real: quién califica de inmediato, qué cambia si entraste sin inspección y cuándo necesitas el perdón I-601A.',
        en: 'The real process: who qualifies immediately, what changes if you entered without inspection, and when you need the I-601A waiver.'
      },
      categoryId: 'procesos-migratorios',
      category: { es: 'Procesos Migratorios', en: 'Immigration Process' },
      author: 'Manuel Solís',
      date: '2026-08-06',
      readTime: '23 min',
      image: '/og-default.jpg',
      featured: false
    },
    {
      id: 'uscis_revisa_redes_sociales_caso_migratorio_2026',
      slug: 'uscis-revisa-redes-sociales-caso-migratorio-2026',
      title: {
        es: 'USCIS revisa tus redes sociales: publicaciones que pueden dañar tu caso',
        en: 'USCIS Reviews Your Social Media: Posts That Can Damage Your Case'
      },
      excerpt: {
        es: 'Qué buscan exactamente en visas, residencia, asilo y ciudadanía, qué publicaciones hunden casos y cómo proteger tu proceso sin mentir.',
        en: 'What they look for in visa, residency, asylum and citizenship cases, which posts sink cases, and how to protect yours without lying.'
      },
      categoryId: 'procesos-migratorios',
      category: { es: 'Procesos Migratorios', en: 'Immigration Process' },
      author: 'Manuel Solís',
      date: '2026-08-06',
      readTime: '19 min',
      image: '/og-default.jpg',
      featured: false
    },
    {
      id: 'ciudadania_2026_nuevo_examen_buen_caracter_moral',
      slug: 'ciudadania-2026-nuevo-examen-buen-caracter-moral',
      title: {
        es: 'Ciudadanía en 2026: el examen más largo y la revisión más estricta',
        en: 'Citizenship in 2026: A Longer Test and a Stricter Review'
      },
      excerpt: {
        es: 'El examen cívico volvió a la versión de 128 preguntas y el "buen carácter moral" se revisa con más dureza. Cómo llegar blindado al N-400.',
        en: 'The civics test returned to the 128-question version and "good moral character" is reviewed more strictly. How to arrive prepared for the N-400.'
      },
      categoryId: 'procesos-migratorios',
      category: { es: 'Procesos Migratorios', en: 'Immigration Process' },
      author: 'Manuel Solís',
      date: '2026-08-06',
      readTime: '19 min',
      image: '/og-default.jpg',
      featured: false
    },
    {
      id: 'auditoria_i9_redada_trabajo_derechos_2026',
      slug: 'auditoria-i9-redada-trabajo-derechos-2026',
      title: {
        es: 'Auditorías I-9 y operativos en el trabajo: derechos del trabajador',
        en: 'I-9 Audits and Worksite Operations: Workers Rights'
      },
      excerpt: {
        es: 'Qué puede pedir el gobierno, qué derechos tienes como trabajador y qué errores de tu patrón te ponen en riesgo durante una inspección.',
        en: 'What the government can request, what rights you have as a worker, and which employer mistakes put you at risk during an inspection.'
      },
      categoryId: 'defensa-deportacion',
      category: { es: 'Defensa contra Deportación', en: 'Deportation Defense' },
      author: 'Manuel Solís',
      date: '2026-08-06',
      readTime: '21 min',
      image: '/og-default.jpg',
      featured: false
    },
    {
      id: 'accidente_conductor_sin_seguro_fuga_texas',
      slug: 'accidente-conductor-sin-seguro-fuga-texas',
      title: {
        es: 'Me chocó un conductor sin seguro o se dio a la fuga en Texas: cómo cobrar',
        en: 'Hit by an Uninsured or Hit-and-Run Driver in Texas: How to Recover'
      },
      excerpt: {
        es: 'Si te chocaron y huyeron o no tienen póliza, aún hay formas de cobrar: cobertura UM/UIM, PIP y demandas directas. Guía completa.',
        en: 'If you were hit by someone who fled or has no policy, there are still ways to recover: UM/UIM coverage, PIP and direct claims.'
      },
      categoryId: 'accidentes',
      category: { es: 'Accidentes', en: 'Accidents' },
      author: 'Manuel Solís',
      date: '2026-08-06',
      readTime: '22 min',
      image: '/og-default.jpg',
      featured: false
    },
    {
      id: 'registro_obligatorio_extranjeros_g325r_2026',
      slug: 'registro-obligatorio-extranjeros-g325r-2026',
      title: {
        es: 'Registro obligatorio de extranjeros (G-325R): quién debe registrarse y qué riesgos tiene',
        en: 'Alien Registration (G-325R): Who Must Register and What the Risks Are'
      },
      excerpt: {
        es: 'El gobierno exige que extranjeros con 30 días o más en EE.UU. se registren con el formulario G-325R. Quién ya está registrado, quién debe hacerlo y el dilema real de registrarse.',
        en: 'The government requires noncitizens present 30 days or more to register using Form G-325R. Who is already registered, who must file, and the real dilemma of registering.'
      },
      categoryId: 'procesos-migratorios',
      category: { es: 'Procesos Migratorios', en: 'Immigration Process' },
      author: 'Manuel Solís',
      date: '2026-08-04',
      readTime: '12 min',
      image: '/og-default.jpg',
      featured: false
    },
    {
      id: 'audiencia_fianza_90_dias_quinto_circuito_texas_2026',
      slug: 'audiencia-fianza-90-dias-quinto-circuito-texas-2026',
      title: {
        es: 'Detenido por ICE en Texas: el fallo que obliga a una audiencia de fianza en 90 días',
        en: 'Detained by ICE in Texas: The Ruling Requiring a Bond Hearing Within 90 Days'
      },
      excerpt: {
        es: 'El Quinto Circuito decidió que el gobierno no puede detenerte indefinidamente sin audiencia de fianza en Texas, Luisiana y Misisipi. Qué significa si tu familiar está detenido.',
        en: 'The Fifth Circuit held the government cannot detain you indefinitely without a bond hearing in Texas, Louisiana and Mississippi. What it means if your relative is detained.'
      },
      categoryId: 'defensa-deportacion',
      category: { es: 'Defensa contra Deportación', en: 'Deportation Defense' },
      author: 'Manuel Solís',
      date: '2026-08-05',
      readTime: '9 min',
      image: '/og-default.jpg',
      featured: false
    },
    {
      id: 'tarifa_anual_asilo_100_dolares_regla_2026',
      slug: 'tarifa-anual-asilo-100-dolares-regla-2026',
      title: {
        es: 'Tarifa Anual de Asilo de $100: el pago de 30 días que puede costarte el caso',
        en: 'The $100 Asylum Annual Fee: The 30-Day Payment That Can Cost You Your Case'
      },
      excerpt: {
        es: 'No pagar la Tarifa Anual de Asilo dentro de 30 días puede significar el rechazo del I-589, la cancelación del permiso de trabajo y riesgo de deportación. Cómo protegerte.',
        en: 'Failing to pay the Asylum Annual Fee within 30 days can mean rejection of your I-589, cancellation of your work permit and exposure to removal. How to protect yourself.'
      },
      categoryId: 'visa-humanitaria',
      category: { es: 'Visa Humanitaria', en: 'Humanitarian Relief' },
      author: 'Manuel Solís',
      date: '2026-08-06',
      readTime: '9 min',
      image: '/og-default.jpg',
      featured: false
    },
    {
      id: 'arrestos_ice_corte_inmigracion_fallo_2026',
      slug: 'arrestos-ice-corte-inmigracion-fallo-2026',
      title: {
        es: '¿Te pueden arrestar al salir de tu audiencia? Lo que cambió con el fallo de junio 2026',
        en: 'Can ICE Arrest You Leaving Your Hearing? What Changed With the June 2026 Ruling'
      },
      excerpt: {
        es: 'Un juez federal anuló la política que permitía a ICE arrestar personas al salir de la corte de inmigración. Qué significa, qué no significa y cómo prepararte para tu audiencia.',
        en: 'A federal judge vacated the policy allowing ICE to arrest people leaving immigration court. What it means, what it does not mean, and how to prepare for your hearing.'
      },
      categoryId: 'defensa-deportacion',
      category: { es: 'Defensa contra Deportación', en: 'Deportation Defense' },
      author: 'Manuel Solís',
      date: '2026-08-06',
      readTime: '9 min',
      image: '/og-default.jpg',
      featured: false
    },
    {
      id: 'green_card_detenido_aeropuerto_viajar_2026',
      slug: 'green-card-detenido-aeropuerto-viajar-2026',
      title: {
        es: 'Tengo green card y me detuvieron en el aeropuerto: el nuevo riesgo al viajar',
        en: 'Green Card Holder Detained at the Airport: The New Risk for Residents Who Travel'
      },
      excerpt: {
        es: 'CBP puede tratar a residentes acusados de ciertos delitos como solicitantes de admisión al regresar. Quién está en riesgo, qué nunca firmar y qué revisar antes de viajar.',
        en: 'CBP may treat residents accused of certain crimes as applicants for admission on return. Who is at risk, what never to sign, and what to review before traveling.'
      },
      categoryId: 'procesos-migratorios',
      category: { es: 'Procesos Migratorios', en: 'Immigration Process' },
      author: 'Manuel Solís',
      date: '2026-08-06',
      readTime: '11 min',
      image: '/og-default.jpg',
      featured: false
    },
    {
      id: 'golpe_de_calor_trabajo_texas_derechos',
      slug: 'golpe-de-calor-trabajo-texas-derechos',
      title: {
        es: 'Golpe de calor en el trabajo: los derechos de los trabajadores en Texas',
        en: 'Heat Stroke at Work: The Rights Texas Workers Are Never Told About'
      },
      excerpt: {
        es: 'Construcción, techos, bodegas sin clima: el calor de Texas lesiona y mata cada verano. Si sufriste un golpe de calor trabajando puedes tener un caso, sin importar tu estatus.',
        en: 'Construction, roofing, warehouses with no AC: Texas heat injures and kills every summer. If heat hurt you at work you may have a case, regardless of your status.'
      },
      categoryId: 'accidentes',
      category: { es: 'Accidentes', en: 'Accidents' },
      author: 'Manuel Solís',
      date: '2026-08-06',
      readTime: '10 min',
      image: '/og-default.jpg',
      featured: false
    },
    {
      id: 'ciudadania_por_nacimiento_2026_hijos_padres_indocumentados',
      slug: 'ciudadania-por-nacimiento-2026-hijos-padres-indocumentados',
      title: {
        es: 'La Corte Suprema confirma la ciudadanía por nacimiento: qué significa para tu familia',
        en: 'The Supreme Court Upholds Birthright Citizenship: What It Means for Your Family'
      },
      excerpt: {
        es: 'El 30 de junio de 2026 la Corte Suprema anuló la orden que negaba la ciudadanía a bebés de padres indocumentados. Qué dice el fallo, a quién protege y qué opciones abre para tu familia.',
        en: 'On June 30, 2026 the Supreme Court struck down the order denying citizenship to babies of undocumented parents. What the ruling says, who it protects, and what options it opens.'
      },
      categoryId: 'procesos-migratorios',
      category: { es: 'Procesos Migratorios', en: 'Immigration Process' },
      author: 'Manuel Solís',
      date: '2026-07-03',
      readTime: '10 min',
      image: '/blog/blog_36/JUL_B5.png',
      featured: true
    },
    // ---
    {
      id: 'redadas_ice_2026_derechos_plan_emergencia_familiar',
      slug: 'redadas-ice-2026-derechos-plan-emergencia-familiar',
      title: {
        es: 'Redadas de ICE en 2026: tus derechos en casa, en el trabajo y en la calle',
        en: 'ICE Raids in 2026: Your Rights at Home, at Work and on the Street'
      },
      excerpt: {
        es: 'ICE necesita una orden judicial para entrar a tu casa. Conoce tus derechos en una redada, qué no firmar, y cómo preparar un plan de emergencia familiar paso a paso.',
        en: 'ICE needs a judicial warrant to enter your home. Know your rights during a raid, what not to sign, and how to prepare a family emergency plan step by step.'
      },
      categoryId: 'defensa-deportacion',
      category: { es: 'Defensa contra Deportación', en: 'Deportation Defense' },
      author: 'Manuel Solís',
      date: '2026-07-02',
      readTime: '12 min',
      image: '/blog/blog_35/JUL_B4.png',
      featured: false
    },
    // ---
    {
      id: 'como_encontrar_detenido_ice_localizador_pasos',
      slug: 'como-encontrar-detenido-ice-localizador-pasos',
      title: {
        es: 'Cómo encontrar a un familiar detenido por ICE: localizador, número A y primeros pasos',
        en: 'How to Find a Family Member Detained by ICE: Locator, A-Number and First Steps'
      },
      excerpt: {
        es: 'Guía paso a paso para localizar a un ser querido detenido por inmigración: cómo usar el localizador de ICE, qué es el número A, y qué hacer (y no firmar) en las primeras 48 horas.',
        en: 'Step-by-step guide to locating a loved one detained by immigration: how to use the ICE locator, what the A-number is, and what to do (and not sign) in the first 48 hours.'
      },
      categoryId: 'defensa-deportacion',
      category: { es: 'Defensa contra Deportación', en: 'Deportation Defense' },
      author: 'Manuel Solís',
      date: '2026-07-01',
      readTime: '10 min',
      image: '/blog/blog_34/JUL_B3.png',
      featured: false
    },
    // ---
    {
      id: 'accidente_trabajo_indocumentado_texas_compensacion',
      slug: 'accidente-trabajo-indocumentado-texas-compensacion',
      title: {
        es: 'Accidente de trabajo siendo indocumentado en Texas: tus derechos reales',
        en: 'Work Injury While Undocumented in Texas: Your Real Rights'
      },
      excerpt: {
        es: 'Sí tienes derechos si te lesionaste trabajando sin papeles en Texas: compensación laboral, demandas contra patrones sin seguro y protección contra represalias. Guía completa.',
        en: 'You do have rights if you were injured at work without papers in Texas: workers\' comp, lawsuits against uninsured employers, and protection from retaliation.'
      },
      categoryId: 'accidentes',
      category: { es: 'Accidentes', en: 'Accidents' },
      author: 'Manuel Solís',
      date: '2026-06-30',
      readTime: '11 min',
      image: '/blog/blog_33/JUL_B2.png',
      featured: false
    },
    // ---
    {
      id: 'accidente_camion_18_ruedas_texas_compensacion',
      slug: 'accidente-camion-18-ruedas-texas-compensacion',
      title: {
        es: 'Accidente con tráiler de 18 ruedas en Texas: quién paga y cuánto vale tu caso',
        en: '18-Wheeler Accidents in Texas: Who Pays and What Your Case Is Worth'
      },
      excerpt: {
        es: 'Los choques con camiones comerciales son los casos de mayor valor en lesiones personales. Conoce quién es responsable, por qué la evidencia desaparece rápido y qué hacer desde el primer día.',
        en: 'Commercial truck crashes are the highest-value personal injury cases. Learn who is liable, why evidence disappears fast, and what to do from day one.'
      },
      categoryId: 'accidentes',
      category: { es: 'Accidentes', en: 'Accidents' },
      author: 'Manuel Solís',
      date: '2026-06-29',
      readTime: '11 min',
      image: '/blog/blog_32/JUL_B1.png',
      featured: false
    },
    // ---
    // --- BLOG 31 - DACA 2026 ---
    {
      id: 'daca_2026_estado_legal_tribunales',
      slug: 'daca-2026-estado-legal-tribunales',
      title: {
        es: 'DACA 2026: ¿qué pasa con mi caso mientras sigue en los tribunales?',
        en: 'DACA 2026: What Happens to My Case While It Is Still in the Courts?'
      },
      excerpt: {
        es: 'DACA no está cancelado, pero sigue bajo litigio. Te explicamos qué dicen las cortes, cómo renovar, qué hacer si tu permiso venció y qué alternativas tienen los dreamers en 2026.',
        en: 'DACA is not canceled but remains in active litigation. Learn what the courts have said, how to renew, what to do if your permit expired, and what alternatives dreamers have in 2026.'
      },
      categoryId: 'procesos-migratorios',
      category: { es: 'Procesos Migratorios', en: 'Immigration Process' },
      author: 'Manuel Solís',
      date: '2026-05-13',
      readTime: '11 min',
      image: '/blog/blog_31/MAY_B1.png',
      featured: false
    },
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
      date: '2026-04-10',
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
      date: '2026-04-14',
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
      date: '2026-04-18',
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
      date: '2026-04-22',
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
      date: '2026-04-26',
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
      date: '2026-04-30',
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
      date: '2026-05-04',
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
      date: '2026-05-08',
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
      date: '2026-05-12',
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
      date: '2026-05-16',
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
      date: '2026-04-04',
      readTime: '11 min',
      image: '/blog/blog_20/BLOG10_CR1.png',
      featured: false
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
      date: '2026-04-01',
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
      date: '2026-03-28',
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
      date: '2026-03-24',
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
      date: '2026-03-20',
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
      date: '2026-03-17',
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
      date: '2026-03-12',
      readTime: '9 min',
      image: '/blog/blog_14/BLOG04_CR1.png',
      featured: false
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
      date: '2026-03-08',
      readTime: '10 min',
      image: '/blog/blog_13/BLOG03_CR1.png',
      featured: false
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
      date: '2026-03-05',
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
      date: '2026-03-02',
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
      date: '2026-02-16',
      readTime: '8 min',
      image: '/blog/blog_10/B10_CR1.png', 
      featured: false
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
      date: '2026-02-12',
      readTime: '10 min',
      image: '/blog/blog_09/B9_CR1.png', 
      featured: false
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
      date: '2026-02-10',
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
      date: '2026-02-03',
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
      date: '2026-01-30',
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
      date: '2026-01-28',
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
      date: '2026-01-23',
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
      date: '2026-01-20',
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
      date: '2026-01-16',
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

/**
 * BLOG_DATA.posts está en el orden en que se fueron añadiendo (con posts de mayo
 * intercalados entre los de abril): cualquier superficie que muestre "lo último"
 * —feed, schema del índice, RSS— debe consumir esta lista ya ordenada de la
 * fecha más reciente a la más antigua. `date` es ISO ('2026-07-03'), así que
 * comparar como texto ordena igual que por fecha.
 */
export const BLOG_POSTS_BY_DATE_DESC = [...BLOG_DATA.posts].sort((a, b) =>
  b.date.localeCompare(a.date)
);

// --- METADATA SEO POTENCIADA ---
export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const isEs = lang === 'es';

  // Sin "Noticias": /informacion/noticias cubre la actualidad y con ambos
  // títulos hablando de noticias legales las dos páginas competían por la misma
  // consulta. Este índice es el de guías y trámites explicados.
  const title = isEs
    ? 'Blog de Inmigración: Guías y Trámites'
    : 'Immigration Blog: Guides & Filings';
  
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
    ...buildSocialMetadata({
      lang: isEs ? 'es' : 'en',
      path: `/${lang}/blog`,
      title,
      description,
      images: [{ url: DEFAULT_OG_IMAGE, alt: title }],
    }),
    keywords: isEs
      ? ['blog inmigración', 'noticias visa u', 'abogado manuel solis', 'permiso trabajo', 'noticias legales usa', 'bona fide visa u']
      : ['immigration blog', 'u visa news', 'attorney manuel solis', 'work permit', 'legal news usa', 'bona fide u visa'],
  };
}

// --- SCHEMA.ORG (JSON-LD) PARA BLOG ---
// Nombre del autor → slug de su ficha en /abogados. Solo los abogados del
// despacho tienen perfil: cualquier otro nombre queda como Person sin url.
const AUTHOR_PROFILES: Record<string, string> = {
  'Manuel Solís': 'manuel-solis',
};

// El @id y la url replican los que emite /abogados/[slug]: así el autor de cada
// post y su ficha son la misma entidad para Google (E-E-A-T en contenido YMYL).
const getPostAuthor = (name: string, lang: string) => {
  const slug = AUTHOR_PROFILES[name];
  if (!slug) return { "@type": "Person", "name": name };
  return {
    "@type": "Person",
    "@id": `${SITE_URL}/#person-${slug}`,
    "name": name,
    "url": `${SITE_URL}/${lang}/abogados/${slug}`,
  };
};

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
    "blogPost": BLOG_POSTS_BY_DATE_DESC.map(post => ({
      "@type": "BlogPosting",
      "headline": post.title[lang as 'es'|'en'],
      "description": post.excerpt[lang as 'es'|'en'],
      "datePublished": post.date,
      "author": getPostAuthor(post.author, lang),
      "url": `${SITE_URL}/${lang}/blog/${post.slug}`,
      "image": `${SITE_URL}${post.image}`
    }))
  };
};

export default async function BlogPageIndex({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const currentLang = (lang === 'es' || lang === 'en') ? lang : 'en';
  const schemaData = getBlogSchema(currentLang);

  // Resolve to the active locale on the server (enfoque b → the inactive
  // locale never reaches the BlogFeed island). BLOG_DATA stays bilingual
  // (consumed elsewhere, e.g. newsletter/blogIndex).
  const resolvedPosts = BLOG_POSTS_BY_DATE_DESC.map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title[currentLang],
    excerpt: p.excerpt[currentLang],
    category: p.category[currentLang],
    categoryId: p.categoryId,
    author: p.author,
    date: p.date,
    readTime: p.readTime,
    image: p.image,
    featured: p.featured,
  }));
  const resolvedCategories = BLOG_DATA.categories.map((c) => ({ id: c.id, label: c[currentLang] }));
  const resolvedUiText = {
    hero: {
      badge: BLOG_DATA.uiText.hero.badge[currentLang],
      title: BLOG_DATA.uiText.hero.title[currentLang],
      subtitle: BLOG_DATA.uiText.hero.subtitle[currentLang],
    },
    featured: BLOG_DATA.uiText.featured[currentLang],
    latest: BLOG_DATA.uiText.latest[currentLang],
    noResults: BLOG_DATA.uiText.noResults[currentLang],
  };

  const breadcrumbData = generateBreadcrumbSchema([
    { name: currentLang === 'es' ? 'Inicio' : 'Home', url: `/${currentLang}` },
    { name: 'Blog', url: `/${currentLang}/blog` },
  ]);

  return (
    <>
      <script
        id="blog-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />

      <Header />
      
      <main id="main-content" tabIndex={-1}>
        <BlogFeed
          initialPosts={resolvedPosts}
          categories={resolvedCategories}
          uiText={resolvedUiText}
          lang={currentLang}
        />
      </main>

      <Footer />
    </>
  );
}

export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'es' }];
}