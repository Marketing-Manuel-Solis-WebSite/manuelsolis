export interface NewsletterEdition {
  slug: string;
  date: string; // ISO date
  title: { es: string; en: string };
  description: { es: string; en: string };
  image: string;
  topics: { es: string[]; en: string[] };
  content: {
    es: NewsletterSection[];
    en: NewsletterSection[];
  };
}

export interface NewsletterSection {
  heading: string;
  body: string;
  cta?: { text: string; href: string };
}

export const newsletters: NewsletterEdition[] = [
  {
    slug: 'abril-2026-actualizaciones-migratorias',
    date: '2026-04-01',
    title: {
      es: 'Actualizaciones Migratorias Abril 2026: Nuevos Cambios en TPS y DACA',
      en: 'Immigration Updates April 2026: New TPS and DACA Changes',
    },
    description: {
      es: 'Entérate de los últimos cambios en políticas migratorias, extensiones de TPS, actualizaciones de DACA y consejos legales para proteger tu estatus en Estados Unidos.',
      en: 'Learn about the latest immigration policy changes, TPS extensions, DACA updates, and legal tips to protect your status in the United States.',
    },
    image: '/newsletter/april-2026.jpg',
    topics: {
      es: ['TPS', 'DACA', 'Política Migratoria', 'Derechos de Inmigrantes'],
      en: ['TPS', 'DACA', 'Immigration Policy', 'Immigrant Rights'],
    },
    content: {
      es: [
        {
          heading: 'Extensión de TPS para Países Clave',
          body: 'El gobierno ha anunciado extensiones importantes del Estatus de Protección Temporal (TPS) para varios países. Los beneficiarios de Venezuela, Honduras, El Salvador y Haití deben tomar acción antes de las fechas límite. Es crucial que los titulares actuales de TPS re-registren su estatus dentro del período designado para mantener su autorización de empleo y protección contra la deportación. Nuestros abogados están disponibles para asistirle con el proceso de re-registro y asegurar que no pierda su cobertura.',
          cta: { text: 'Más sobre TPS', href: '/es/blog/tps-2026-paises-elegibles-renovacion' },
        },
        {
          heading: 'Actualizaciones Importantes sobre DACA',
          body: 'El programa de Acción Diferida para los Llegados en la Infancia (DACA) continúa enfrentando desafíos legales. Aunque las renovaciones siguen siendo procesadas, nuevas solicitudes permanecen suspendidas por orden judicial. Si usted es un beneficiario actual de DACA, es imperativo que envíe su renovación al menos 150 días antes del vencimiento de su permiso actual. No espere hasta el último momento — un retraso podría significar la pérdida de su estatus de empleo.',
        },
        {
          heading: 'Consejos para Proteger tu Estatus',
          body: 'En el entorno migratorio actual, es fundamental tomar medidas proactivas: mantenga copias de todos sus documentos migratorios, no viaje sin consultar primero con un abogado, reporte cualquier cambio de dirección a USCIS dentro de 10 días, y evite cualquier contacto con el sistema de justicia penal. Si enfrenta cualquier procedimiento legal, contacte a un abogado de inmigración inmediatamente antes de tomar cualquier decisión.',
          cta: { text: 'Consulta Gratuita', href: '/es/contacto' },
        },
      ],
      en: [
        {
          heading: 'TPS Extensions for Key Countries',
          body: 'The government has announced important Temporary Protected Status (TPS) extensions for several countries. Beneficiaries from Venezuela, Honduras, El Salvador, and Haiti must take action before the deadlines. It is crucial that current TPS holders re-register their status within the designated period to maintain their employment authorization and protection from deportation. Our attorneys are available to assist you with the re-registration process.',
          cta: { text: 'More about TPS', href: '/en/blog/tps-2026-paises-elegibles-renovacion' },
        },
        {
          heading: 'Important DACA Updates',
          body: 'The Deferred Action for Childhood Arrivals (DACA) program continues to face legal challenges. While renewals are still being processed, new applications remain suspended by court order. If you are a current DACA beneficiary, it is imperative that you submit your renewal at least 150 days before your current permit expires. Do not wait until the last moment — a delay could mean losing your employment status.',
        },
        {
          heading: 'Tips to Protect Your Status',
          body: 'In the current immigration environment, it is essential to take proactive steps: keep copies of all your immigration documents, do not travel without first consulting an attorney, report any change of address to USCIS within 10 days, and avoid any contact with the criminal justice system. If you face any legal proceedings, contact an immigration attorney immediately before making any decisions.',
          cta: { text: 'Free Consultation', href: '/en/contacto' },
        },
      ],
    },
  },
  {
    slug: 'marzo-2026-derechos-laborales-inmigrantes',
    date: '2026-03-01',
    title: {
      es: 'Derechos Laborales para Inmigrantes: Lo que Necesitas Saber en 2026',
      en: 'Labor Rights for Immigrants: What You Need to Know in 2026',
    },
    description: {
      es: 'Conoce tus derechos laborales como inmigrante en Estados Unidos. Información sobre permisos de trabajo, protecciones contra abuso laboral y cómo reportar violaciones.',
      en: 'Know your labor rights as an immigrant in the United States. Information about work permits, protections against workplace abuse, and how to report violations.',
    },
    image: '/newsletter/march-2026.jpg',
    topics: {
      es: ['Derechos Laborales', 'Permisos de Trabajo', 'Abuso Laboral', 'USCIS'],
      en: ['Labor Rights', 'Work Permits', 'Workplace Abuse', 'USCIS'],
    },
    content: {
      es: [
        {
          heading: 'Tus Derechos Laborales Son Válidos Sin Importar Tu Estatus',
          body: 'Las leyes laborales de Estados Unidos protegen a todos los trabajadores, independientemente de su estatus migratorio. Esto incluye el derecho a recibir el salario mínimo, pago por horas extras, un ambiente de trabajo seguro y libre de discriminación. Si su empleador le está pagando por debajo del salario mínimo o le niega el pago de horas extras, usted tiene derecho a presentar una queja ante el Departamento de Trabajo sin temor a represalias relacionadas con su estatus migratorio.',
        },
        {
          heading: 'Cómo Obtener o Renovar tu Permiso de Trabajo',
          body: 'El Documento de Autorización de Empleo (EAD) es esencial para trabajar legalmente en Estados Unidos. Los tiempos de procesamiento actuales varían entre 3 y 8 meses, dependiendo de la categoría. Recomendamos iniciar el proceso de renovación al menos 180 días antes del vencimiento. Nuestro equipo puede ayudarle a determinar si califica para un permiso de trabajo basado en su solicitud de asilo, ajuste de estatus, TPS u otra base legal.',
          cta: { text: 'Ayuda con Permisos', href: '/es/servicios/inmigracion' },
        },
        {
          heading: 'Reporta el Abuso Laboral',
          body: 'Si usted está siendo víctima de abuso laboral — incluyendo robo de salario, amenazas relacionadas con su estatus migratorio, condiciones peligrosas o acoso — existen protecciones legales disponibles. En algunos casos, las víctimas de crímenes laborales pueden calificar para una Visa U o una Visa T. No permita que el miedo le impida buscar justicia. Todas las consultas con nuestros abogados son completamente confidenciales.',
          cta: { text: 'Consulta Confidencial', href: '/es/contacto' },
        },
      ],
      en: [
        {
          heading: 'Your Labor Rights Are Valid Regardless of Status',
          body: 'U.S. labor laws protect all workers, regardless of immigration status. This includes the right to receive minimum wage, overtime pay, a safe work environment, and freedom from discrimination. If your employer is paying you below minimum wage or denying overtime pay, you have the right to file a complaint with the Department of Labor without fear of retaliation related to your immigration status.',
        },
        {
          heading: 'How to Obtain or Renew Your Work Permit',
          body: 'The Employment Authorization Document (EAD) is essential for working legally in the United States. Current processing times range from 3 to 8 months, depending on the category. We recommend starting the renewal process at least 180 days before expiration. Our team can help you determine if you qualify for a work permit based on your asylum application, adjustment of status, TPS, or other legal basis.',
          cta: { text: 'Work Permit Help', href: '/en/servicios/inmigracion' },
        },
        {
          heading: 'Report Workplace Abuse',
          body: 'If you are experiencing workplace abuse — including wage theft, threats related to your immigration status, dangerous conditions, or harassment — legal protections are available. In some cases, victims of workplace crimes may qualify for a U Visa or T Visa. Do not let fear prevent you from seeking justice. All consultations with our attorneys are completely confidential.',
          cta: { text: 'Confidential Consultation', href: '/en/contacto' },
        },
      ],
    },
  },
  {
    slug: 'febrero-2026-visa-u-vawa-protecciones',
    date: '2026-02-01',
    title: {
      es: 'Visa U y VAWA: Protecciones para Víctimas de Crímenes y Violencia Doméstica',
      en: 'U Visa and VAWA: Protections for Crime and Domestic Violence Victims',
    },
    description: {
      es: 'Guía completa sobre la Visa U y VAWA en 2026. Conoce los requisitos, el proceso de solicitud y cómo estas protecciones pueden ayudarte a obtener estatus legal.',
      en: 'Complete guide to U Visa and VAWA in 2026. Learn about requirements, the application process, and how these protections can help you obtain legal status.',
    },
    image: '/newsletter/feb-2026.jpg',
    topics: {
      es: ['Visa U', 'VAWA', 'Violencia Doméstica', 'Protecciones Legales'],
      en: ['U Visa', 'VAWA', 'Domestic Violence', 'Legal Protections'],
    },
    content: {
      es: [
        {
          heading: '¿Qué es la Visa U y Quién Califica?',
          body: 'La Visa U es un recurso migratorio diseñado para víctimas de ciertos crímenes que han sufrido abuso mental o físico y que ayudan a las autoridades en la investigación o enjuiciamiento del delito. Los crímenes que califican incluyen violencia doméstica, asalto sexual, trata de personas, secuestro, extorsión y muchos más. El beneficio principal de la Visa U es que otorga estatus legal temporal, autorización de empleo y, después de 3 años, la posibilidad de solicitar la residencia permanente.',
          cta: { text: 'Más sobre Visa U', href: '/es/servicios/visa-u' },
        },
        {
          heading: 'VAWA: Protección para Víctimas de Violencia Doméstica',
          body: 'La Ley de Violencia Contra la Mujer (VAWA) permite que ciertos cónyuges, hijos y padres abusados de ciudadanos estadounidenses o residentes permanentes soliciten estatus legal por sí mismos, sin necesidad de que el abusador participe. Esto es fundamental porque muchos abusadores utilizan el estatus migratorio como herramienta de control. Bajo VAWA, usted puede obtener autorización de empleo, acceso a beneficios públicos y eventualmente la residencia permanente.',
          cta: { text: 'Más sobre VAWA', href: '/es/servicios/vawa' },
        },
        {
          heading: 'Pasos para Solicitar Estas Protecciones',
          body: 'El proceso para solicitar una Visa U o VAWA requiere documentación cuidadosa y presentación estratégica. Para la Visa U, necesitará una certificación policial (Formulario I-918B) y evidencia del crimen y sus efectos. Para VAWA, necesitará evidencia de la relación, el abuso y su buen carácter moral. En ambos casos, contar con un abogado experimentado aumenta significativamente sus posibilidades de aprobación. Nuestro equipo ha manejado miles de estos casos exitosamente.',
          cta: { text: 'Comience Su Caso Hoy', href: '/es/contacto' },
        },
      ],
      en: [
        {
          heading: 'What is the U Visa and Who Qualifies?',
          body: 'The U Visa is an immigration resource designed for victims of certain crimes who have suffered mental or physical abuse and who assist authorities in the investigation or prosecution of the crime. Qualifying crimes include domestic violence, sexual assault, human trafficking, kidnapping, extortion, and many more. The main benefit of the U Visa is that it grants temporary legal status, employment authorization, and after 3 years, the possibility of applying for permanent residence.',
          cta: { text: 'More about U Visa', href: '/en/servicios/visa-u' },
        },
        {
          heading: 'VAWA: Protection for Domestic Violence Victims',
          body: 'The Violence Against Women Act (VAWA) allows certain abused spouses, children, and parents of U.S. citizens or permanent residents to apply for legal status on their own, without the abuser needing to participate. This is crucial because many abusers use immigration status as a tool of control. Under VAWA, you can obtain employment authorization, access to public benefits, and eventually permanent residence.',
          cta: { text: 'More about VAWA', href: '/en/servicios/vawa' },
        },
        {
          heading: 'Steps to Apply for These Protections',
          body: 'The process of applying for a U Visa or VAWA requires careful documentation and strategic presentation. For the U Visa, you will need a law enforcement certification (Form I-918B) and evidence of the crime and its effects. For VAWA, you will need evidence of the relationship, the abuse, and your good moral character. In both cases, having an experienced attorney significantly increases your chances of approval. Our team has successfully handled thousands of these cases.',
          cta: { text: 'Start Your Case Today', href: '/en/contacto' },
        },
      ],
    },
  },
];

export function getNewsletterBySlug(slug: string): NewsletterEdition | undefined {
  return newsletters.find((n) => n.slug === slug);
}

export function getAllNewsletterSlugs(): string[] {
  return newsletters.map((n) => n.slug);
}
