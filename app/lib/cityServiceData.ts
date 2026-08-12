// ============================================================
// City × Service Landing Page Data
// All real data from Manuel Solis Law Firm
// ============================================================

export const SITE_URL = 'https://www.manuelsolis.com';

// ---------- OFFICE DATA ----------
/** Franja horaria en el formato que consume schema.org/OpeningHoursSpecification. */
export interface OfficeOpeningHoursSpec {
  dayOfWeek: string | string[];
  opens: string;
  closes: string;
}

export interface OfficeInfo {
  city: string;
  citySlug: string;
  state: string;
  stateCode: string;
  address: string;
  phone: string;
  zip: string;
  coordinates: { lat: number; lng: number };
  /**
   * Horario visible de la sede. Copiado literalmente de la ficha canónica
   * /oficinas/<officeSlug> (OfficeClient → `hours`): esa ficha es la fuente,
   * aquí solo se replica para que la landing no publique un horario distinto.
   * El separador ' | ' se renderiza como salto de línea en la landing.
   */
  hours: { es: string; en: string };
  /** El mismo horario en forma estructurada, para el JSON-LD de la landing. */
  openingHours: OfficeOpeningHoursSpec[];
  /** Ciudad postal real cuando difiere del mercado (Cicero/Pico Rivera/Arvada). */
  locality?: string;
  /** Slug de la ficha canónica en /oficinas/<slug> (enlazado landing→oficina). */
  officeSlug?: string;
  /**
   * Otras sedes FÍSICAS de la misma ciudad. No incluir aquí las direcciones
   * virtuales listadas en officesRegistry.VIRTUAL_OFFICE_SLUGS: la landing las
   * presenta como oficinas atendidas y ahí no hay personal del despacho.
   */
  additionalOffices?: { name: string; address: string; phone: string }[];
}

const WEEKDAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const EVERY_DAY = [...WEEKDAYS, 'Saturday', 'Sunday'];

export const OFFICES: Record<string, OfficeInfo> = {
  houston: {
    city: 'Houston',
    citySlug: 'houston',
    state: 'Texas',
    stateCode: 'TX',
    address: '6705 Navigation Blvd, Houston, TX 77011',
    officeSlug: 'houston-accidentes',
    phone: '(713) 231-5384',
    zip: '77011',
    // Alineadas con /oficinas/houston-accidentes (misma cuadra que el 6657).
    coordinates: { lat: 29.7426, lng: -95.3156 },
    hours: { es: 'Abierto las 24 horas', en: 'Open 24 hours' },
    openingHours: [{ dayOfWeek: EVERY_DAY, opens: '00:00', closes: '23:59' }],
    additionalOffices: [
      { name: 'Houston Principal', address: '6657 Navigation Blvd, Houston, TX 77011', phone: '(713) 701-1731' },
      { name: 'Houston Bellaire', address: '9188 Bellaire Blvd E, Houston, TX 77036', phone: '(713) 903-7875' },
    ],
  },
  // Oficina PRINCIPAL de Houston (6657 Navigation Blvd). La usan las landings de
  // inmigración/deportación/asilo/visa-u/vawa de Houston (cuyas reseñas ya apuntan
  // a houston-principal). NAP alineada con /oficinas/houston-principal +
  // officesPhoneMap. La clave `houston` de arriba mantiene la oficina de ACCIDENTES.
  'houston-principal': {
    city: 'Houston',
    citySlug: 'houston',
    state: 'Texas',
    stateCode: 'TX',
    address: '6657 Navigation Blvd, Houston, TX 77011',
    officeSlug: 'houston-principal',
    phone: '(713) 701-1731',
    zip: '77011',
    coordinates: { lat: 29.7426, lng: -95.3156 },
    hours: {
      es: 'Lun - Vie 9:00 AM - 7:00 PM | Sáb 9:00 AM - 4:00 PM',
      en: 'Mon - Fri 9:00 AM - 7:00 PM | Sat 9:00 AM - 4:00 PM',
    },
    openingHours: [
      { dayOfWeek: WEEKDAYS, opens: '09:00', closes: '19:00' },
      { dayOfWeek: 'Saturday', opens: '09:00', closes: '16:00' },
    ],
    additionalOffices: [
      { name: 'Houston Bellaire', address: '9188 Bellaire Blvd E, Houston, TX 77036', phone: '(713) 903-7875' },
      { name: 'Houston Accidentes', address: '6705 Navigation Blvd, Houston, TX 77011', phone: '(713) 231-5384' },
    ],
  },
  dallas: {
    city: 'Dallas',
    citySlug: 'dallas',
    state: 'Texas',
    stateCode: 'TX',
    address: '1120 Empire Central Pl, Dallas, TX 75247',
    officeSlug: 'dallas',
    phone: '(214) 753-8315',
    zip: '75247',
    coordinates: { lat: 32.8140, lng: -96.8591 },
    hours: {
      es: 'Lun - Vie 9:00 AM - 7:00 PM | Sáb 8:00 AM - 4:00 PM',
      en: 'Mon - Fri 9:00 AM - 7:00 PM | Sat 8:00 AM - 4:00 PM',
    },
    openingHours: [
      { dayOfWeek: WEEKDAYS, opens: '09:00', closes: '19:00' },
      { dayOfWeek: 'Saturday', opens: '08:00', closes: '16:00' },
    ],
  },
  chicago: {
    city: 'Chicago',
    citySlug: 'chicago',
    state: 'Illinois',
    stateCode: 'IL',
    address: '6000 W Cermak Rd, Cicero, IL 60804',
    officeSlug: 'chicago',
    phone: '(312) 477-0389',
    zip: '60804',
    coordinates: { lat: 41.8517, lng: -87.7445 },
    hours: {
      es: 'Lun - Vie 9:00 AM - 6:00 PM | Sáb 8:00 AM - 4:00 PM',
      en: 'Mon - Fri 9:00 AM - 6:00 PM | Sat 8:00 AM - 4:00 PM',
    },
    openingHours: [
      { dayOfWeek: WEEKDAYS, opens: '09:00', closes: '18:00' },
      { dayOfWeek: 'Saturday', opens: '08:00', closes: '16:00' },
    ],
    locality: 'Cicero',
  },
  'los-angeles': {
    city: 'Los Angeles',
    citySlug: 'los-angeles',
    state: 'California',
    stateCode: 'CA',
    address: '8337 Telegraph Rd Ste 115, Pico Rivera, CA 90660',
    officeSlug: 'losangeles',
    phone: '(213) 784-1554',
    zip: '90660',
    coordinates: { lat: 33.9900, lng: -118.0739 },
    hours: {
      es: 'Lun - Vie 9:00 AM - 6:00 PM | Sáb 9:00 AM - 2:00 PM',
      en: 'Mon - Fri 9:00 AM - 6:00 PM | Sat 9:00 AM - 2:00 PM',
    },
    openingHours: [
      { dayOfWeek: WEEKDAYS, opens: '09:00', closes: '18:00' },
      { dayOfWeek: 'Saturday', opens: '09:00', closes: '14:00' },
    ],
    locality: 'Pico Rivera',
  },
  'el-paso': {
    city: 'El Paso',
    citySlug: 'el-paso',
    state: 'Texas',
    stateCode: 'TX',
    address: '3632 Admiral St, El Paso, TX 79925',
    officeSlug: 'el-paso',
    phone: '(915) 233-7127',
    zip: '79925',
    coordinates: { lat: 31.7700, lng: -106.3801 },
    hours: {
      es: 'Lun - Vie 9:00 AM - 5:00 PM | Sáb 9:00 AM - 2:00 PM',
      en: 'Mon - Fri 9:00 AM - 5:00 PM | Sat 9:00 AM - 2:00 PM',
    },
    openingHours: [
      { dayOfWeek: WEEKDAYS, opens: '09:00', closes: '17:00' },
      { dayOfWeek: 'Saturday', opens: '09:00', closes: '14:00' },
    ],
  },
  memphis: {
    city: 'Memphis',
    citySlug: 'memphis',
    state: 'Tennessee',
    stateCode: 'TN',
    address: '3385 Airways Blvd Suite 320, Memphis, TN 38116',
    officeSlug: 'memphis',
    phone: '(901) 557-8357',
    zip: '38116',
    coordinates: { lat: 35.0726, lng: -89.9848 },
    hours: {
      es: 'Lun - Vie 9:00 AM - 5:00 PM | Sáb 9:00 AM - 1:00 PM',
      en: 'Mon - Fri 9:00 AM - 5:00 PM | Sat 9:00 AM - 1:00 PM',
    },
    openingHours: [
      { dayOfWeek: WEEKDAYS, opens: '09:00', closes: '17:00' },
      { dayOfWeek: 'Saturday', opens: '09:00', closes: '13:00' },
    ],
  },
  denver: {
    city: 'Denver',
    citySlug: 'denver',
    state: 'Colorado',
    stateCode: 'CO',
    address: '5400 Ward Rd BLDG IV, Arvada, CO 80002',
    officeSlug: 'arvada',
    phone: '(720) 358-8973',
    zip: '80002',
    coordinates: { lat: 39.8097, lng: -105.0997 },
    hours: {
      es: 'Lun - Vie 9:00 AM - 7:00 PM | Sáb 9:00 AM - 2:00 PM',
      en: 'Mon - Fri 9:00 AM - 7:00 PM | Sat 9:00 AM - 2:00 PM',
    },
    openingHours: [
      { dayOfWeek: WEEKDAYS, opens: '09:00', closes: '19:00' },
      { dayOfWeek: 'Saturday', opens: '09:00', closes: '14:00' },
    ],
    locality: 'Arvada',
  },
  harlingen: {
    city: 'Harlingen',
    citySlug: 'harlingen',
    state: 'Texas',
    stateCode: 'TX',
    address: '320 E Jackson St, Harlingen, TX 78550',
    officeSlug: 'harlingen',
    phone: '(956) 597-7090',
    zip: '78550',
    coordinates: { lat: 26.1906, lng: -97.6961 },
    // La ficha canónica no publica horario de sábado en Harlingen.
    hours: { es: 'Lun - Vie 9:00 AM - 6:00 PM', en: 'Mon - Fri 9:00 AM - 6:00 PM' },
    openingHours: [{ dayOfWeek: WEEKDAYS, opens: '09:00', closes: '18:00' }],
  },
};

// ---------- SERVICE DATA ----------
export interface ServiceInfo {
  serviceKey: string;
  serviceSlug: string;
  title: { es: string; en: string };
  shortTitle: { es: string; en: string };
  description: { es: string; en: string };
  keywords: { es: string[]; en: string[] };
  relatedServices: { es: string[]; en: string[] };
}

export const SERVICES: Record<string, ServiceInfo> = {
  inmigracion: {
    serviceKey: 'inmigracion',
    serviceSlug: 'inmigracion',
    title: { es: 'Inmigración y Defensa de Deportación', en: 'Immigration & Deportation Defense' },
    shortTitle: { es: 'Inmigración', en: 'Immigration' },
    description: {
      es: 'Servicios completos de inmigración que incluyen residencia permanente, ciudadanía, permisos de trabajo, peticiones familiares, visas humanitarias y defensa contra deportación.',
      en: 'Comprehensive immigration services including permanent residency, citizenship, work permits, family petitions, humanitarian visas, and deportation defense.',
    },
    keywords: {
      es: [
        'abogado de inmigración',
        'abogado de inmigración cerca de mí',
        'abogado migratorio',
        'residencia permanente',
        'green card',
        'ciudadanía americana',
        'permiso de trabajo',
        'peticiones familiares',
        'abogado bilingüe',
        'abogado hispano',
        'ajuste de estatus'
      ],
      en: [
        'immigration lawyer',
        'immigration attorney near me',
        'immigration attorney',
        'green card lawyer',
        'permanent residency',
        'US citizenship',
        'work permit',
        'family petition',
        'bilingual attorney',
        'Spanish-speaking lawyer',
        'adjustment of status'
      ],
    },
    relatedServices: {
      es: ['Residencia permanente (Green Card)', 'Ciudadanía y naturalización', 'Permisos de trabajo', 'Peticiones familiares', 'Visa U para víctimas de crimen', 'VAWA para víctimas de violencia doméstica', 'Asilo político', 'Defensa contra deportación', 'DACA y TPS', 'Visa de inversionista E-2'],
      en: ['Permanent residency (Green Card)', 'Citizenship & naturalization', 'Work permits', 'Family petitions', 'U Visa for crime victims', 'VAWA for domestic violence victims', 'Political asylum', 'Deportation defense', 'DACA & TPS', 'E-2 investor visa'],
    },
  },
  accidentes: {
    serviceKey: 'accidentes',
    serviceSlug: 'accidentes',
    title: { es: 'Accidentes y Lesiones Personales', en: 'Accidents & Personal Injury' },
    shortTitle: { es: 'Accidentes', en: 'Accidents' },
    description: {
      es: 'Representación legal en casos de accidentes automovilísticos, accidentes de camión, accidentes laborales y negligencia médica. Luchamos por la compensación máxima para nuestros clientes.',
      en: 'Legal representation in car accidents, truck accidents, workplace injuries, and medical negligence cases. We fight for maximum compensation for our clients.',
    },
    keywords: {
      es: [
        'abogado de accidentes',
        'abogado de accidentes de auto',
        'abogado de accidentes cerca de mí',
        'accidente de auto',
        'accidente de trabajo',
        'lesiones personales',
        'abogado de choques',
        'compensación por accidente',
        'abogado 18 ruedas',
        'negligencia médica',
        'no ganamos no cobramos',
        'abogado hispano accidentes'
      ],
      en: [
        'accident lawyer',
        'accident attorney near me',
        'car accident attorney',
        'car accident lawyer',
        'personal injury lawyer',
        'truck accident lawyer',
        '18-wheeler accident attorney',
        'workplace injury lawyer',
        'medical malpractice attorney',
        'no fee unless we win',
        'compensation claim',
        'Hispanic accident lawyer'
      ],
    },
    relatedServices: {
      es: ['Accidentes automovilísticos', 'Accidentes de camión (18 ruedas)', 'Accidentes laborales', 'Negligencia médica', 'Accidentes de motocicleta', 'Atropellamiento de peatones', 'Reclamos de seguros', 'Muerte por negligencia'],
      en: ['Car accidents', 'Truck accidents (18-wheeler)', 'Workplace injuries', 'Medical negligence', 'Motorcycle accidents', 'Pedestrian accidents', 'Insurance claims', 'Wrongful death'],
    },
  },
  'defensa-deportacion': {
    serviceKey: 'defensa-deportacion',
    serviceSlug: 'defensa-deportacion',
    title: { es: 'Defensa Contra Deportación', en: 'Deportation Defense' },
    shortTitle: { es: 'Defensa de Deportación', en: 'Deportation Defense' },
    description: {
      es: 'Defensa legal experta en corte de inmigración contra órdenes de deportación. Incluye cancelación de deportación, apelaciones ante la BIA y representación ante jueces de inmigración.',
      en: 'Expert legal defense in immigration court against deportation orders. Includes cancellation of removal, BIA appeals, and representation before immigration judges.',
    },
    keywords: {
      es: [
        'defensa deportación',
        'abogado de deportación',
        'cancelación de deportación',
        'ley de los 10 años',
        'corte de inmigración',
        'orden de deportación',
        'fianza de inmigración',
        'detenido por ICE',
        'apelación BIA',
        'suspensión de deportación',
        'reapertura de caso inmigración',
        'asilo defensivo'
      ],
      en: [
        'deportation defense',
        'deportation lawyer',
        'cancellation of removal',
        '10-year rule immigration',
        'immigration court attorney',
        'removal order lawyer',
        'immigration bond attorney',
        'ICE detainee lawyer',
        'BIA appeal',
        'withholding of removal',
        'motion to reopen immigration',
        'defensive asylum'
      ],
    },
    relatedServices: {
      es: ['Cancelación de deportación', 'Apelaciones ante la BIA', 'Representación en corte de inmigración', 'Fianzas de inmigración', 'Reapertura de casos', 'Suspensión de deportación', 'Asilo defensivo', 'Ajuste de estatus'],
      en: ['Cancellation of removal', 'BIA appeals', 'Immigration court representation', 'Immigration bonds', 'Motion to reopen', 'Withholding of removal', 'Defensive asylum', 'Adjustment of status'],
    },
  },
  'visa-u': {
    serviceKey: 'visa-u',
    serviceSlug: 'visa-u',
    title: { es: 'Visa U para Víctimas de Crimen', en: 'U Visa for Crime Victims' },
    shortTitle: { es: 'Visa U', en: 'U Visa' },
    description: {
      es: 'La Visa U protege a víctimas de crímenes graves que han cooperado con las autoridades. Otorga estatus legal, permiso de trabajo y un camino hacia la residencia permanente.',
      en: 'The U Visa protects victims of serious crimes who have cooperated with law enforcement. It grants legal status, work authorization, and a path to permanent residency.',
    },
    keywords: {
      es: [
        'visa u',
        'abogado visa u',
        'visa u para víctimas de crimen',
        'visa u requisitos',
        'visa u permiso de trabajo',
        'formulario I-918',
        'suplemento B visa u',
        'Bona Fide visa u',
        'certificación policial visa u',
        'perdón I-192 visa u',
        'ajuste de estatus visa u',
        'derivados visa u'
      ],
      en: [
        'u visa',
        'u visa lawyer',
        'u visa for crime victims',
        'u visa requirements',
        'u visa work permit',
        'form I-918',
        'u visa supplement B',
        'Bona Fide determination u visa',
        'u visa police certification',
        'I-192 waiver u visa',
        'u visa adjustment of status',
        'u visa derivatives'
      ],
    },
    relatedServices: {
      es: ['Solicitud de Visa U (Formulario I-918)', 'Certificación policial', 'Determinación de buena fe (Bona Fide)', 'Permiso de trabajo', 'Ajuste de estatus a residente', 'Peticiones para familiares', 'Visa T para víctimas de trata', 'Exenciones de inadmisibilidad'],
      en: ['U Visa application (Form I-918)', 'Law enforcement certification', 'Bona Fide Determination', 'Work authorization', 'Adjustment to permanent resident', 'Family member petitions', 'T Visa for trafficking victims', 'Waivers of inadmissibility'],
    },
  },
  asilo: {
    serviceKey: 'asilo',
    serviceSlug: 'asilo',
    title: { es: 'Asilo Político', en: 'Political Asylum' },
    shortTitle: { es: 'Asilo', en: 'Asylum' },
    description: {
      es: 'Representación legal para solicitudes de asilo político basadas en persecución por raza, religión, nacionalidad, opinión política o pertenencia a un grupo social.',
      en: 'Legal representation for political asylum applications based on persecution due to race, religion, nationality, political opinion, or membership in a social group.',
    },
    keywords: {
      es: [
        'asilo político',
        'abogado de asilo',
        'solicitud de asilo',
        'asilo afirmativo',
        'asilo defensivo',
        'miedo creíble',
        'miedo razonable',
        'persecución política',
        'refugiado',
        'formulario I-589',
        'asilo en la frontera',
        'protección CAT convención contra la tortura'
      ],
      en: [
        'political asylum',
        'asylum lawyer',
        'asylum application',
        'affirmative asylum',
        'defensive asylum',
        'credible fear interview',
        'reasonable fear interview',
        'persecution',
        'refugee',
        'form I-589',
        'border asylum',
        'CAT Convention Against Torture protection'
      ],
    },
    relatedServices: {
      es: ['Asilo afirmativo', 'Asilo defensivo (en corte)', 'Entrevista de miedo creíble', 'Suspensión de deportación', 'Protección bajo la Convención contra la Tortura (CAT)', 'Permiso de trabajo para asilados', 'Residencia para asilados', 'Reunificación familiar'],
      en: ['Affirmative asylum', 'Defensive asylum (in court)', 'Credible fear interview', 'Withholding of removal', 'Convention Against Torture (CAT) protection', 'Asylum work authorization', 'Asylee permanent residency', 'Family reunification'],
    },
  },
  vawa: {
    serviceKey: 'vawa',
    serviceSlug: 'vawa',
    title: { es: 'VAWA para Víctimas de Violencia Doméstica', en: 'VAWA for Domestic Violence Victims' },
    shortTitle: { es: 'VAWA', en: 'VAWA' },
    description: {
      es: 'La ley VAWA (Violence Against Women Act) permite a víctimas de violencia doméstica solicitar estatus legal de manera independiente, sin depender de su abusador para obtener residencia.',
      en: 'VAWA (Violence Against Women Act) allows domestic violence victims to independently petition for legal status without depending on their abuser for residency.',
    },
    keywords: {
      es: [
        'vawa',
        'abogado vawa',
        'auto-petición vawa',
        'vawa para hombres',
        'vawa para padres',
        'vawa para esposa',
        'violencia doméstica inmigración',
        'formulario I-360',
        'residencia por violencia doméstica',
        'determinación prima facie vawa',
        'permiso de trabajo vawa',
        'protección confidencial inmigración'
      ],
      en: [
        'vawa',
        'vawa lawyer',
        'vawa self-petition',
        'vawa for men',
        'vawa for parents',
        'vawa for spouse',
        'domestic violence immigration',
        'form I-360',
        'domestic violence green card',
        'vawa prima facie determination',
        'vawa work permit',
        'confidential immigration protection'
      ],
    },
    relatedServices: {
      es: ['Auto-petición VAWA (Formulario I-360)', 'Permiso de trabajo', 'Determinación prima facie', 'Ajuste de estatus', 'Exenciones de inadmisibilidad', 'Beneficios públicos para víctimas', 'Orden de protección', 'Residencia permanente'],
      en: ['VAWA Self-Petition (Form I-360)', 'Work authorization', 'Prima facie determination', 'Adjustment of status', 'Waivers of inadmissibility', 'Public benefits for victims', 'Protection order', 'Permanent residency'],
    },
  },
};

// ---------- PAGE CONFIGURATIONS ----------
export interface LandingPageConfig {
  slug: string;
  officeKey: string;
  serviceKey: string;
  h1: { es: string; en: string };
  metaTitle: { es: string; en: string };
  metaDescription: { es: string; en: string };
  intro: { es: string; en: string };
  whyChooseUs: { es: string[]; en: string[] };
}

export const LANDING_PAGES: LandingPageConfig[] = [
  // === IMMIGRATION (8 cities) ===
  {
    slug: 'abogado-inmigracion-houston',
    officeKey: 'houston-principal',
    serviceKey: 'inmigracion',
    h1: { es: 'Abogado de Inmigración en Houston, TX', en: 'Immigration Lawyer in Houston, TX' },
    metaTitle: { es: 'Abogado de Inmigración en Houston, TX', en: 'Immigration Lawyer in Houston, TX' },
    metaDescription: {
      es: 'Abogados de inmigración en Houston: residencia, ciudadanía, deportación, Visa U, VAWA y asilo. 3 oficinas propias y 35+ años. Llame: (713) 701-1731.',
      en: 'Immigration lawyers in Houston: residency, citizenship, deportation, U Visa, VAWA and asylum. 3 offices, 35+ years of experience. Call: (713) 701-1731.',
    },
    intro: {
      es: 'Houston es el hogar de una de las comunidades inmigrantes más grandes de Estados Unidos. En Manuel Solís, hemos representado a miles de familias del área metropolitana de Houston desde 1990. Con tres oficinas propias en la ciudad —dos en Navigation Blvd y una en Bellaire Blvd— estamos cerca de usted para ofrecer asesoría legal migratoria personalizada. Nuestro equipo bilingüe entiende los desafíos únicos que enfrentan los inmigrantes en el área de Houston y trabaja incansablemente para proteger sus derechos.',
      en: 'Houston is home to one of the largest immigrant communities in the United States. At Manuel Solis, we have represented thousands of families in the Houston metropolitan area since 1990. With three of our own offices in the city — two on Navigation Blvd and one on Bellaire Blvd — we are close to you to provide personalized immigration legal advice. Our bilingual team understands the unique challenges immigrants face in the Houston area and works tirelessly to protect their rights.',
    },
    whyChooseUs: {
      es: ['3 oficinas en Houston para su conveniencia', 'Equipo bilingüe con experiencia en cortes de inmigración de Houston', 'Historial comprobado: miles de casos de inmigración ganados en el área', 'Relaciones establecidas con agencias locales y consulados', 'Atención personalizada y confidencial'],
      en: ['3 offices in Houston for your convenience', 'Bilingual team experienced in Houston immigration courts', 'Proven track record: thousands of immigration cases won in the area', 'Established relationships with local agencies and consulates', 'Personalized and confidential attention'],
    },
  },
  {
    slug: 'abogado-inmigracion-dallas',
    officeKey: 'dallas',
    serviceKey: 'inmigracion',
    h1: { es: 'Abogado de Inmigración en Dallas, TX', en: 'Immigration Lawyer in Dallas, TX' },
    metaTitle: { es: 'Abogado de Inmigración en Dallas, TX', en: 'Immigration Lawyer in Dallas, TX' },
    metaDescription: {
      es: 'Abogados de inmigración en Dallas con 35+ años de experiencia. Residencia, ciudadanía, deportación, asilo y más. Oficina en Empire Central. Llame: (214) 753-8315.',
      en: 'Immigration lawyers in Dallas with 35+ years of experience. Residency, citizenship, deportation, asylum and more. Office on Empire Central. Call: (214) 753-8315.',
    },
    intro: {
      es: 'Dallas y el área de DFW albergan una comunidad latina vibrante y en crecimiento. Nuestra oficina de Dallas, ubicada en Empire Central, atiende a familias inmigrantes del norte de Texas incluyendo Fort Worth, Arlington, Irving y Plano. Con décadas de experiencia ante la corte de inmigración de Dallas, nuestros abogados conocen a fondo los procedimientos locales y luchan agresivamente para proteger a nuestros clientes contra la deportación y asegurar sus beneficios migratorios.',
      en: 'Dallas and the DFW area are home to a vibrant and growing Latino community. Our Dallas office, located on Empire Central, serves immigrant families across North Texas including Fort Worth, Arlington, Irving, and Plano. With decades of experience before the Dallas immigration court, our attorneys thoroughly understand local procedures and fight aggressively to protect our clients against deportation and secure their immigration benefits.',
    },
    whyChooseUs: {
      es: ['Experiencia directa en la corte de inmigración de Dallas', 'Atención a todo el norte de Texas incluyendo Fort Worth y Arlington', 'Ubicación accesible en Empire Central Place', 'Abogados que hablan español con fluidez', 'Más de 50,000 casos ganados a nivel nacional'],
      en: ['Direct experience in Dallas immigration court', 'Serving all of North Texas including Fort Worth and Arlington', 'Accessible location on Empire Central Place', 'Fluent Spanish-speaking attorneys', 'Over 50,000 cases won nationwide'],
    },
  },
  {
    slug: 'abogado-inmigracion-chicago',
    officeKey: 'chicago',
    serviceKey: 'inmigracion',
    h1: { es: 'Abogado de Inmigración en Chicago, IL', en: 'Immigration Lawyer in Chicago, IL' },
    metaTitle: { es: 'Abogado de Inmigración en Chicago, IL', en: 'Immigration Lawyer in Chicago, IL' },
    metaDescription: {
      es: 'Abogados de inmigración en Chicago con 35+ años de experiencia. Residencia, ciudadanía, asilo, Visa U y VAWA. Oficina en Cicero. Llame: (312) 477-0389.',
      en: 'Immigration lawyers in Chicago with 35+ years of experience. Residency, citizenship, asylum, U Visa and VAWA. Office in Cicero. Call: (312) 477-0389.',
    },
    intro: {
      es: 'Chicago tiene una de las comunidades mexicanas y centroamericanas más grandes fuera de la frontera sur. Nuestra oficina en Cicero, sobre Cermak Road, está en el corazón de la comunidad latina del área metropolitana. Atendemos a familias inmigrantes de Chicago, Cicero, Berwyn, Aurora y todos los suburbios del área. Nuestros abogados están familiarizados con la corte de inmigración de Chicago y trabajamos de cerca con organizaciones comunitarias locales para servir mejor a nuestros clientes.',
      en: 'Chicago has one of the largest Mexican and Central American communities outside the southern border. Our office in Cicero, on Cermak Road, is in the heart of the metropolitan area\'s Latino community. We serve immigrant families from Chicago, Cicero, Berwyn, Aurora, and all surrounding suburbs. Our attorneys are familiar with the Chicago immigration court and work closely with local community organizations to better serve our clients.',
    },
    whyChooseUs: {
      es: ['Oficina en el corazón de la comunidad latina de Cicero', 'Experiencia ante la corte de inmigración de Chicago', 'Colaboración con organizaciones comunitarias del área', 'Atención bilingüe dedicada para la comunidad del Midwest', 'Firma nacional con recursos locales'],
      en: ['Office in the heart of Cicero\'s Latino community', 'Experience before the Chicago immigration court', 'Collaboration with area community organizations', 'Dedicated bilingual service for the Midwest community', 'National firm with local resources'],
    },
  },
  {
    slug: 'abogado-inmigracion-los-angeles',
    officeKey: 'los-angeles',
    serviceKey: 'inmigracion',
    h1: { es: 'Abogado de Inmigración en Los Ángeles, CA', en: 'Immigration Lawyer in Los Angeles, CA' },
    metaTitle: { es: 'Abogado de Inmigración en Los Ángeles, CA', en: 'Immigration Lawyer in Los Angeles, CA' },
    metaDescription: {
      es: 'Abogados de inmigración en Los Ángeles con 35+ años de experiencia. Residencia, ciudadanía, asilo, Visa U y VAWA. Oficina en Pico Rivera. Llame: (213) 784-1554.',
      en: 'Immigration lawyers in Los Angeles with 35+ years of experience. Residency, citizenship, asylum, U Visa and VAWA. Office in Pico Rivera. Call: (213) 784-1554.',
    },
    intro: {
      es: 'Los Ángeles y el sur de California son hogar de millones de inmigrantes que necesitan representación legal confiable. Nuestra oficina en Pico Rivera, sobre Telegraph Road, atiende a clientes de todo el condado de Los Ángeles, incluyendo East LA, Downey, Whittier, Montebello y el Valle de San Gabriel. California tiene leyes que protegen a los inmigrantes de manera especial, y nuestros abogados están preparados para aprovechar cada recurso legal disponible para su caso.',
      en: 'Los Angeles and Southern California are home to millions of immigrants who need reliable legal representation. Our office in Pico Rivera, on Telegraph Road, serves clients throughout Los Angeles County, including East LA, Downey, Whittier, Montebello, and the San Gabriel Valley. California has laws that specially protect immigrants, and our attorneys are prepared to leverage every available legal resource for your case.',
    },
    whyChooseUs: {
      es: ['Experiencia ante la corte de inmigración de Los Ángeles', 'Oficina accesible en Pico Rivera con servicio a todo el condado de LA', 'Conocimiento de las leyes de protección al inmigrante de California', 'Equipo que entiende la diversidad de la comunidad angelina', 'Consulta confidencial y personalizada'],
      en: ['Experience before the Los Angeles immigration court', 'Accessible office in Pico Rivera serving all of LA County', 'Knowledge of California\'s immigrant protection laws', 'Team that understands the diversity of the LA community', 'Confidential and personalized consultation'],
    },
  },
  {
    slug: 'abogado-inmigracion-el-paso',
    officeKey: 'el-paso',
    serviceKey: 'inmigracion',
    h1: { es: 'Abogado de Inmigración en El Paso, TX', en: 'Immigration Lawyer in El Paso, TX' },
    metaTitle: { es: 'Abogado de Inmigración en El Paso, TX', en: 'Immigration Lawyer in El Paso, TX' },
    metaDescription: {
      es: 'Abogados de inmigración en El Paso con 35+ años de experiencia. Deportación, asilo, residencia y cruce de frontera. Oficina en Admiral St. Llame: (915) 233-7127.',
      en: 'Immigration lawyers in El Paso with 35+ years of experience. Deportation, asylum, residency and border crossing. Office on Admiral St. Call: (915) 233-7127.',
    },
    intro: {
      es: 'El Paso es una ciudad fronteriza donde los asuntos migratorios son parte de la vida diaria de miles de familias. Nuestra oficina en Admiral Street atiende a residentes de El Paso, Las Cruces, y familias que enfrentan procedimientos en la corte de inmigración de El Paso, una de las más activas del país. Entendemos la realidad única de vivir en la frontera y la complejidad de los casos que involucran cruces fronterizos, detenciones y procedimientos acelerados de deportación.',
      en: 'El Paso is a border city where immigration matters are part of daily life for thousands of families. Our office on Admiral Street serves residents of El Paso, Las Cruces, and families facing proceedings in the El Paso immigration court, one of the most active in the country. We understand the unique reality of living on the border and the complexity of cases involving border crossings, detentions, and expedited removal proceedings.',
    },
    whyChooseUs: {
      es: ['Conocimiento profundo de los procedimientos fronterizos', 'Experiencia en la corte de inmigración de El Paso', 'Atención a detenidos en centros de detención cercanos', 'Manejo de casos de asilo y miedo creíble en la frontera', 'Oficina accesible con horarios flexibles'],
      en: ['Deep knowledge of border procedures', 'Experience in El Paso immigration court', 'Assistance to detainees in nearby detention centers', 'Handling asylum and credible fear cases at the border', 'Accessible office with flexible hours'],
    },
  },
  {
    slug: 'abogado-inmigracion-memphis',
    officeKey: 'memphis',
    serviceKey: 'inmigracion',
    h1: { es: 'Abogado de Inmigración en Memphis, TN', en: 'Immigration Lawyer in Memphis, TN' },
    metaTitle: { es: 'Abogado de Inmigración en Memphis, TN', en: 'Immigration Lawyer in Memphis, TN' },
    metaDescription: {
      es: 'Abogados de inmigración en Memphis con 35+ años de experiencia. Residencia, ciudadanía, deportación y Visa U. Oficina en Airways Blvd. Llame: (901) 557-8357.',
      en: 'Immigration lawyers in Memphis with 35+ years of experience. Residency, citizenship, deportation and U Visa. Office on Airways Blvd. Call: (901) 557-8357.',
    },
    intro: {
      es: 'Memphis y el área del medio sur están experimentando un crecimiento significativo de la comunidad latina. Nuestra oficina en Airways Boulevard atiende a familias inmigrantes de Memphis, Nashville, y todo el estado de Tennessee, así como áreas cercanas de Mississippi y Arkansas. Siendo una de las pocas firmas de inmigración con presencia en Memphis, ofrecemos representación legal accesible en una región donde los recursos legales en español son limitados.',
      en: 'Memphis and the Mid-South area are experiencing significant growth in the Latino community. Our office on Airways Boulevard serves immigrant families from Memphis, Nashville, and all of Tennessee, as well as nearby areas of Mississippi and Arkansas. As one of the few immigration firms with a presence in Memphis, we offer accessible legal representation in a region where Spanish-language legal resources are limited.',
    },
    whyChooseUs: {
      es: ['Una de las pocas firmas de inmigración con oficina en Memphis', 'Atención a comunidades de Tennessee, Mississippi y Arkansas', 'Respaldo de una firma nacional con 35+ años de experiencia', 'Equipo bilingüe dedicado a la comunidad del medio sur', 'Planes de pago accesibles'],
      en: ['One of the few immigration firms with a Memphis office', 'Serving communities in Tennessee, Mississippi and Arkansas', 'Backed by a national firm with 35+ years of experience', 'Bilingual team dedicated to the Mid-South community', 'Accessible payment plans'],
    },
  },
  {
    slug: 'abogado-inmigracion-denver',
    officeKey: 'denver',
    serviceKey: 'inmigracion',
    h1: { es: 'Abogado de Inmigración en Denver, CO', en: 'Immigration Lawyer in Denver, CO' },
    metaTitle: { es: 'Abogado de Inmigración en Denver, CO', en: 'Immigration Lawyer in Denver, CO' },
    metaDescription: {
      es: 'Abogados de inmigración en Denver con 35+ años de experiencia. Residencia, ciudadanía, deportación, asilo y VAWA. Oficina en Arvada. Llame: (720) 358-8973.',
      en: 'Immigration lawyers in Denver with 35+ years of experience. Residency, citizenship, deportation, asylum and VAWA. Office in Arvada. Call: (720) 358-8973.',
    },
    intro: {
      es: 'Denver y el área metropolitana de Colorado están viendo un crecimiento acelerado de la comunidad latina. Nuestra oficina en Arvada, sobre Ward Road, atiende a familias inmigrantes de todo el Front Range incluyendo Denver, Aurora, Lakewood, Boulder y Colorado Springs. Colorado ofrece ciertas protecciones a los inmigrantes, y nuestros abogados conocen tanto la legislación estatal como los procedimientos ante la corte de inmigración de Denver para brindarle la mejor defensa posible.',
      en: 'Denver and the Colorado metropolitan area are seeing accelerated growth in the Latino community. Our office in Arvada, on Ward Road, serves immigrant families throughout the Front Range including Denver, Aurora, Lakewood, Boulder, and Colorado Springs. Colorado offers certain protections to immigrants, and our attorneys are versed in both state legislation and Denver immigration court procedures to provide you with the best possible defense.',
    },
    whyChooseUs: {
      es: ['Atención al Front Range de Colorado: Denver, Aurora, Boulder y más', 'Conocimiento de las leyes de protección al inmigrante de Colorado', 'Experiencia ante la corte de inmigración de Denver', 'Oficina accesible en Arvada con amplio estacionamiento', 'Parte de una firma nacional con más de 50,000 casos ganados'],
      en: ['Serving Colorado\'s Front Range: Denver, Aurora, Boulder and more', 'Knowledge of Colorado\'s immigrant protection laws', 'Experience before the Denver immigration court', 'Accessible office in Arvada with ample parking', 'Part of a national firm with over 50,000 cases won'],
    },
  },
  {
    slug: 'abogado-inmigracion-harlingen',
    officeKey: 'harlingen',
    serviceKey: 'inmigracion',
    h1: { es: 'Abogado de Inmigración en Harlingen, TX', en: 'Immigration Lawyer in Harlingen, TX' },
    metaTitle: { es: 'Abogado de Inmigración en Harlingen, TX', en: 'Immigration Lawyer in Harlingen, TX' },
    metaDescription: {
      es: 'Abogados de inmigración en Harlingen, Valle del Río Grande, con 35+ años de experiencia. Deportación, asilo, residencia y más. Llame: (956) 597-7090.',
      en: 'Immigration lawyers in Harlingen, Rio Grande Valley, with 35+ years of experience. Deportation, asylum, residency and more. Call: (956) 597-7090.',
    },
    intro: {
      es: 'El Valle del Río Grande es una región donde la inmigración impacta a casi todas las familias. Nuestra oficina en Harlingen, sobre Jackson Avenue, sirve a las comunidades de Brownsville, McAllen, Edinburg, Mission y todo el sur de Texas. Con la cercanía de la frontera y la alta actividad de la corte de inmigración de Harlingen, nuestros abogados manejan casos complejos que incluyen detenciones fronterizas, asilo y reunificación familiar en una de las zonas más afectadas por las políticas migratorias del país.',
      en: 'The Rio Grande Valley is a region where immigration impacts nearly every family. Our office in Harlingen, on Jackson Avenue, serves the communities of Brownsville, McAllen, Edinburg, Mission, and all of South Texas. With the proximity of the border and the high activity of the Harlingen immigration court, our attorneys handle complex cases including border detentions, asylum, and family reunification in one of the areas most affected by the country\'s immigration policies.',
    },
    whyChooseUs: {
      es: ['Presencia local en el Valle del Río Grande', 'Experiencia en la corte de inmigración de Harlingen', 'Manejo de casos de detención fronteriza y asilo', 'Servicio a Brownsville, McAllen, Edinburg y todo el sur de Texas', 'Atención personalizada en español'],
      en: ['Local presence in the Rio Grande Valley', 'Experience in the Harlingen immigration court', 'Handling border detention and asylum cases', 'Serving Brownsville, McAllen, Edinburg and all of South Texas', 'Personalized service in Spanish'],
    },
  },

  // === ACCIDENTS (2 cities) ===
  {
    slug: 'abogado-accidentes-houston',
    officeKey: 'houston',
    serviceKey: 'accidentes',
    h1: { es: 'Abogado de Accidentes en Houston, TX', en: 'Accident Lawyer in Houston, TX' },
    metaTitle: { es: 'Abogado de Accidentes en Houston, TX', en: 'Accident Lawyer in Houston, TX' },
    metaDescription: {
      es: 'Abogados de accidentes en Houston con 35+ años de experiencia. Choques de auto, camión, accidentes de trabajo y negligencia médica. Llame: (713) 231-5384.',
      en: 'Accident lawyers in Houston with 35+ years of experience. Car, truck, workplace accidents and medical negligence. Call: (713) 231-5384.',
    },
    intro: {
      es: 'Houston es una de las ciudades con más accidentes de tránsito en Texas debido a su extenso sistema de autopistas y el alto volumen de tráfico de camiones comerciales. Si usted o un ser querido ha sido víctima de un accidente en el área de Houston, nuestro equipo legal está listo para luchar por la compensación que merece. No cobramos a menos que ganemos su caso. Con tres oficinas en Houston, estamos cerca de usted cuando más nos necesita.',
      en: 'Houston is one of the cities with the most traffic accidents in Texas due to its extensive highway system and high volume of commercial truck traffic. If you or a loved one has been a victim of an accident in the Houston area, our legal team is ready to fight for the compensation you deserve. We don\'t charge unless we win your case. With three offices in Houston, we are close to you when you need us most.',
    },
    whyChooseUs: {
      es: ['No cobramos a menos que ganemos su caso', 'Experiencia en accidentes de auto, camión y trabajo en Houston', 'Luchamos por la compensación máxima para nuestros clientes', 'Atención médica inmediata coordinada sin costo inicial', 'Equipo bilingüe que lo acompaña en cada paso del proceso'],
      en: ['We don\'t charge unless we win your case', 'Experience in car, truck and workplace accidents in Houston', 'We fight for maximum compensation for our clients', 'Immediate medical care coordinated at no upfront cost', 'Bilingual team that accompanies you every step of the way'],
    },
  },
  {
    slug: 'abogado-accidentes-dallas',
    officeKey: 'dallas',
    serviceKey: 'accidentes',
    h1: { es: 'Abogado de Accidentes en Dallas, TX', en: 'Accident Lawyer in Dallas, TX' },
    metaTitle: { es: 'Abogado de Accidentes en Dallas, TX', en: 'Accident Lawyer in Dallas, TX' },
    metaDescription: {
      es: 'Abogados de accidentes en Dallas con 35+ años de experiencia. Choques de auto, camión, lesiones laborales. Sin cobro si no ganamos. Llame: (214) 753-8315.',
      en: 'Accident lawyers in Dallas with 35+ years of experience. Car, truck accidents, workplace injuries. No charge if we don\'t win. Call: (214) 753-8315.',
    },
    intro: {
      es: 'El área de Dallas-Fort Worth es una de las zonas metropolitanas con mayor número de accidentes vehiculares en Texas, especialmente en las autopistas I-35, I-30 y la I-635 (LBJ Freeway). Nuestros abogados de accidentes en Dallas tienen amplia experiencia representando a víctimas de choques automovilísticos, accidentes de camión y lesiones laborales en todo el norte de Texas. Trabajamos bajo el principio de que usted no paga a menos que obtengamos resultados.',
      en: 'The Dallas-Fort Worth area is one of the metropolitan zones with the highest number of vehicle accidents in Texas, especially on I-35, I-30, and I-635 (LBJ Freeway). Our accident lawyers in Dallas have extensive experience representing victims of car crashes, truck accidents, and workplace injuries throughout North Texas. We work on the principle that you don\'t pay unless we get results.',
    },
    whyChooseUs: {
      es: ['Sin cobro si no ganamos su caso — cero riesgo para usted', 'Conocimiento de las autopistas y puntos de accidentes del área DFW', 'Manejo de casos contra compañías de seguros grandes', 'Atención inmediata las 24 horas para emergencias', 'Coordinación con médicos especializados en lesiones'],
      en: ['No charge if we don\'t win — zero risk for you', 'Knowledge of DFW area highways and accident hotspots', 'Handling cases against major insurance companies', 'Immediate 24-hour assistance for emergencies', 'Coordination with physicians specialized in injuries'],
    },
  },

  // === DEPORTATION DEFENSE (5 cities) ===
  {
    slug: 'defensa-deportacion-houston',
    officeKey: 'houston-principal',
    serviceKey: 'defensa-deportacion',
    h1: { es: 'Defensa Contra Deportación en Houston, TX', en: 'Deportation Defense in Houston, TX' },
    metaTitle: { es: 'Defensa Contra Deportación en Houston, TX', en: 'Deportation Defense in Houston, TX' },
    metaDescription: {
      es: 'Abogados de defensa contra deportación en Houston. Cancelación de deportación, apelaciones, fianzas de inmigración. 35+ años de experiencia. Llame: (713) 701-1731.',
      en: 'Deportation defense attorneys in Houston. Cancellation of removal, appeals, immigration bonds. 35+ years of experience. Call: (713) 701-1731.',
    },
    intro: {
      es: 'Houston alberga una de las cortes de inmigración más ocupadas del país. Si usted o un familiar enfrenta una orden de deportación, cada día cuenta. Nuestros abogados tienen décadas de experiencia defendiendo a familias en la corte de inmigración de Houston, logrando cancelaciones de deportación, fianzas para detenidos y apelaciones exitosas ante la BIA. Con tres oficinas en Houston, respondemos rápidamente a emergencias de deportación.',
      en: 'Houston houses one of the busiest immigration courts in the country. If you or a family member faces a deportation order, every day counts. Our attorneys have decades of experience defending families in Houston immigration court, achieving cancellations of removal, bonds for detainees, and successful appeals before the BIA. With three offices in Houston, we respond quickly to deportation emergencies.',
    },
    whyChooseUs: {
      es: ['Décadas de experiencia en la corte de inmigración de Houston', 'Respuesta inmediata en emergencias de deportación', 'Experiencia en cancelación de deportación y apelaciones ante la BIA', 'Asistencia a detenidos en centros de detención de Texas', 'Historial de resultados positivos en casos complejos'],
      en: ['Decades of experience in Houston immigration court', 'Immediate response to deportation emergencies', 'Experience in cancellation of removal and BIA appeals', 'Assistance to detainees in Texas detention centers', 'Track record of positive results in complex cases'],
    },
  },
  {
    slug: 'defensa-deportacion-dallas',
    officeKey: 'dallas',
    serviceKey: 'defensa-deportacion',
    h1: { es: 'Defensa Contra Deportación en Dallas, TX', en: 'Deportation Defense in Dallas, TX' },
    metaTitle: { es: 'Defensa Contra Deportación en Dallas, TX', en: 'Deportation Defense in Dallas, TX' },
    metaDescription: {
      es: 'Defensa contra deportación en Dallas. Cancelación de deportación, fianzas, apelaciones. 35+ años protegiendo familias inmigrantes. Llame: (214) 753-8315.',
      en: 'Deportation defense in Dallas. Cancellation of removal, bonds, appeals. 35+ years protecting immigrant families. Call: (214) 753-8315.',
    },
    intro: {
      es: 'La corte de inmigración de Dallas maneja miles de casos de deportación cada año. Si enfrenta un proceso de remoción, necesita un abogado con experiencia real ante los jueces de inmigración de Dallas. Nuestro equipo ha representado a cientos de familias en procedimientos de deportación en el norte de Texas, incluyendo personas detenidas en centros de ICE. Conocemos las estrategias que funcionan y actuamos con la urgencia que su caso requiere.',
      en: 'The Dallas immigration court handles thousands of deportation cases every year. If you face removal proceedings, you need an attorney with real experience before Dallas immigration judges. Our team has represented hundreds of families in deportation proceedings in North Texas, including individuals detained in ICE facilities. We know the strategies that work and act with the urgency your case requires.',
    },
    whyChooseUs: {
      es: ['Experiencia real ante los jueces de inmigración de Dallas', 'Manejo de casos de personas detenidas por ICE', 'Estrategias agresivas de cancelación de deportación', 'Atención urgente disponible para situaciones de emergencia', 'Conocimiento profundo de los recursos legales en Texas'],
      en: ['Real experience before Dallas immigration judges', 'Handling cases of individuals detained by ICE', 'Aggressive cancellation of removal strategies', 'Urgent attention available for emergency situations', 'Deep knowledge of legal resources in Texas'],
    },
  },
  {
    slug: 'defensa-deportacion-chicago',
    officeKey: 'chicago',
    serviceKey: 'defensa-deportacion',
    h1: { es: 'Defensa Contra Deportación en Chicago, IL', en: 'Deportation Defense in Chicago, IL' },
    metaTitle: { es: 'Defensa Contra Deportación en Chicago, IL', en: 'Deportation Defense in Chicago, IL' },
    metaDescription: {
      es: 'Abogados de defensa contra deportación en Chicago. Cancelación de deportación, apelaciones y fianzas. Illinois es estado santuario. Llame: (312) 477-0389.',
      en: 'Deportation defense attorneys in Chicago. Cancellation of removal, appeals and bonds. Illinois is a sanctuary state. Call: (312) 477-0389.',
    },
    intro: {
      es: 'Illinois tiene políticas de estado santuario que ofrecen protecciones adicionales a los inmigrantes. Sin embargo, el gobierno federal continúa procesando casos de deportación en la corte de inmigración de Chicago. Nuestros abogados están capacitados para usar tanto las protecciones estatales de Illinois como las defensas federales disponibles para detener la deportación de nuestros clientes. Desde nuestra oficina en Cicero, atendemos a familias de todo el área metropolitana de Chicago.',
      en: 'Illinois has sanctuary state policies that offer additional protections to immigrants. However, the federal government continues to process deportation cases in Chicago immigration court. Our attorneys are equipped to use both Illinois state protections and available federal defenses to stop the deportation of our clients. From our office in Cicero, we serve families throughout the Chicago metropolitan area.',
    },
    whyChooseUs: {
      es: ['Conocimiento de las protecciones de estado santuario de Illinois', 'Experiencia ante la corte de inmigración de Chicago', 'Servicio a toda el área metropolitana desde nuestra oficina en Cicero', 'Capacidad para manejar casos complejos con antecedentes penales', 'Red de apoyo con organizaciones comunitarias en Chicago'],
      en: ['Knowledge of Illinois sanctuary state protections', 'Experience before Chicago immigration court', 'Serving the entire metropolitan area from our Cicero office', 'Ability to handle complex cases with criminal records', 'Support network with community organizations in Chicago'],
    },
  },
  {
    slug: 'defensa-deportacion-los-angeles',
    officeKey: 'los-angeles',
    serviceKey: 'defensa-deportacion',
    h1: { es: 'Defensa Contra Deportación en Los Ángeles, CA', en: 'Deportation Defense in Los Angeles, CA' },
    metaTitle: { es: 'Defensa Deportación en Los Ángeles, CA', en: 'Deportation Defense in Los Angeles, CA' },
    metaDescription: {
      es: 'Defensa contra deportación en Los Ángeles. California es estado santuario. Cancelación de deportación, asilo, apelaciones. Llame: (213) 784-1554.',
      en: 'Deportation defense in Los Angeles. California is a sanctuary state. Cancellation of removal, asylum, appeals. Call: (213) 784-1554.',
    },
    intro: {
      es: 'California ofrece algunas de las protecciones más fuertes del país para los inmigrantes, incluyendo leyes como la SB 54 (California Values Act) que limitan la cooperación entre policía local e ICE. Los Ángeles es hogar de una enorme comunidad inmigrante que necesita abogados que conozcan tanto las protecciones estatales como las defensas federales. Nuestra oficina en Pico Rivera atiende casos de deportación para familias de todo el condado de Los Ángeles y el sur de California.',
      en: 'California offers some of the strongest immigrant protections in the country, including laws like SB 54 (California Values Act) that limit cooperation between local police and ICE. Los Angeles is home to a massive immigrant community that needs attorneys who know both state protections and federal defenses. Our office in Pico Rivera handles deportation cases for families throughout Los Angeles County and Southern California.',
    },
    whyChooseUs: {
      es: ['Conocimiento de las leyes de protección al inmigrante de California', 'Experiencia ante la corte de inmigración de Los Ángeles', 'Uso estratégico de la SB 54 y otras leyes californianas', 'Servicio a todo el condado de LA y sur de California', 'Equipo experimentado en casos de deportación complejos'],
      en: ['Knowledge of California\'s immigrant protection laws', 'Experience before the Los Angeles immigration court', 'Strategic use of SB 54 and other California laws', 'Serving all of LA County and Southern California', 'Team experienced in complex deportation cases'],
    },
  },
  {
    slug: 'defensa-deportacion-el-paso',
    officeKey: 'el-paso',
    serviceKey: 'defensa-deportacion',
    h1: { es: 'Defensa Contra Deportación en El Paso, TX', en: 'Deportation Defense in El Paso, TX' },
    metaTitle: { es: 'Defensa Contra Deportación en El Paso, TX', en: 'Deportation Defense in El Paso, TX' },
    metaDescription: {
      es: 'Defensa contra deportación en El Paso, ciudad fronteriza. Cancelación de deportación, asilo, fianzas. Experiencia en casos fronterizos. Llame: (915) 233-7127.',
      en: 'Deportation defense in El Paso, border city. Cancellation of removal, asylum, bonds. Experience in border cases. Call: (915) 233-7127.',
    },
    intro: {
      es: 'El Paso es una ciudad fronteriza donde los casos de deportación tienen características únicas. La corte de inmigración de El Paso maneja un alto volumen de casos que incluyen deportaciones aceleradas, cruces fronterizos y detenciones. Nuestros abogados tienen experiencia específica en los procedimientos de la frontera entre Texas y México, incluyendo representación de personas detenidas en centros cercanos a El Paso. Entendemos la urgencia que requieren estos casos y actuamos de inmediato.',
      en: 'El Paso is a border city where deportation cases have unique characteristics. The El Paso immigration court handles a high volume of cases including expedited removals, border crossings, and detentions. Our attorneys have specific experience in Texas-Mexico border proceedings, including representation of individuals detained in facilities near El Paso. We understand the urgency these cases require and act immediately.',
    },
    whyChooseUs: {
      es: ['Experiencia específica en procedimientos fronterizos de El Paso', 'Representación de detenidos en centros de detención de la frontera', 'Manejo de deportaciones aceleradas y reingresos', 'Conocimiento de la corte de inmigración de El Paso', 'Respuesta inmediata en emergencias de detención'],
      en: ['Specific experience in El Paso border proceedings', 'Representation of detainees in border detention centers', 'Handling expedited removals and re-entries', 'Knowledge of El Paso immigration court', 'Immediate response to detention emergencies'],
    },
  },

  // === U VISA (4 cities) ===
  {
    slug: 'visa-u-houston',
    officeKey: 'houston-principal',
    serviceKey: 'visa-u',
    h1: { es: 'Visa U en Houston, TX', en: 'U Visa in Houston, TX' },
    metaTitle: { es: 'Visa U en Houston, TX', en: 'U Visa in Houston, TX' },
    metaDescription: {
      es: 'Abogados de Visa U en Houston. Ayudamos a víctimas de crímenes a obtener estatus legal, permiso de trabajo y residencia permanente. Llame: (713) 701-1731.',
      en: 'U Visa attorneys in Houston. We help crime victims obtain legal status, work authorization and permanent residency. Call: (713) 701-1731.',
    },
    intro: {
      es: 'Si usted ha sido víctima de un crimen en el área de Houston y ha cooperado con las autoridades, puede calificar para la Visa U. Este beneficio migratorio le otorga estatus legal, permiso de trabajo y un camino hacia la residencia permanente. Nuestros abogados en Houston han ayudado a cientos de víctimas a obtener la Visa U, trabajando de cerca con la policía de Houston, el sheriff del condado de Harris y la fiscalía del distrito para obtener las certificaciones necesarias.',
      en: 'If you have been a victim of a crime in the Houston area and have cooperated with authorities, you may qualify for the U Visa. This immigration benefit grants legal status, work authorization, and a path to permanent residency. Our attorneys in Houston have helped hundreds of victims obtain the U Visa, working closely with the Houston police, Harris County Sheriff, and the district attorney to obtain the necessary certifications.',
    },
    whyChooseUs: {
      es: ['Cientos de casos de Visa U aprobados en Houston', 'Relaciones establecidas con la policía de Houston y la fiscalía', 'Manejo completo del proceso: desde la certificación hasta la residencia', 'Confidencialidad absoluta para proteger a las víctimas', 'Experiencia en obtener determinaciones de buena fe (Bona Fide)'],
      en: ['Hundreds of approved U Visa cases in Houston', 'Established relationships with Houston police and district attorney', 'Complete process management: from certification to residency', 'Absolute confidentiality to protect victims', 'Experience obtaining Bona Fide Determinations'],
    },
  },
  {
    slug: 'visa-u-chicago',
    officeKey: 'chicago',
    serviceKey: 'visa-u',
    h1: { es: 'Visa U en Chicago, IL', en: 'U Visa in Chicago, IL' },
    metaTitle: { es: 'Visa U en Chicago, IL', en: 'U Visa in Chicago, IL' },
    metaDescription: {
      es: 'Abogados de Visa U en Chicago. Protección para víctimas de crímenes. Estatus legal y permiso de trabajo. Illinois estado santuario. Llame: (312) 477-0389.',
      en: 'U Visa attorneys in Chicago. Protection for crime victims. Legal status and work authorization. Illinois sanctuary state. Call: (312) 477-0389.',
    },
    intro: {
      es: 'Chicago y el estado de Illinois ofrecen un entorno favorable para las víctimas de crímenes que buscan protección migratoria a través de la Visa U. Como estado santuario, Illinois tiene políticas que facilitan la cooperación entre las víctimas y las autoridades sin temor a consecuencias migratorias. Nuestros abogados en Chicago trabajan con el departamento de policía de Chicago y las autoridades del condado de Cook para asegurar las certificaciones necesarias y guiar a las víctimas a través de todo el proceso.',
      en: 'Chicago and the state of Illinois offer a favorable environment for crime victims seeking immigration protection through the U Visa. As a sanctuary state, Illinois has policies that facilitate cooperation between victims and authorities without fear of immigration consequences. Our attorneys in Chicago work with the Chicago Police Department and Cook County authorities to secure necessary certifications and guide victims through the entire process.',
    },
    whyChooseUs: {
      es: ['Illinois como estado santuario facilita el proceso de Visa U', 'Trabajo coordinado con la policía de Chicago y autoridades de Cook County', 'Experiencia en proteger los derechos de víctimas inmigrantes', 'Proceso confidencial y seguro para todas las víctimas', 'Oficina accesible en el corazón de la comunidad latina'],
      en: ['Illinois as a sanctuary state facilitates the U Visa process', 'Coordinated work with Chicago police and Cook County authorities', 'Experience protecting the rights of immigrant victims', 'Confidential and safe process for all victims', 'Accessible office in the heart of the Latino community'],
    },
  },
  {
    slug: 'visa-u-los-angeles',
    officeKey: 'los-angeles',
    serviceKey: 'visa-u',
    h1: { es: 'Visa U en Los Ángeles, CA', en: 'U Visa in Los Angeles, CA' },
    metaTitle: { es: 'Visa U en Los Ángeles, CA', en: 'U Visa in Los Angeles, CA' },
    metaDescription: {
      es: 'Abogados de Visa U en Los Ángeles. California protege a víctimas de crimen inmigrantes. Estatus legal y residencia permanente. Llame: (213) 784-1554.',
      en: 'U Visa attorneys in Los Angeles. California protects immigrant crime victims. Legal status and permanent residency. Call: (213) 784-1554.',
    },
    intro: {
      es: 'California tiene leyes especialmente favorables para víctimas de crímenes que solicitan la Visa U. La ley estatal requiere que las agencias policiales respondan a solicitudes de certificación dentro de plazos específicos, lo que agiliza el proceso. Nuestros abogados en Los Ángeles aprovechan estas protecciones californianas para maximizar las posibilidades de aprobación de Visa U para nuestros clientes en todo el condado de Los Ángeles, desde East LA hasta el Valle de San Fernando.',
      en: 'California has laws that are especially favorable for crime victims applying for the U Visa. State law requires law enforcement agencies to respond to certification requests within specific timeframes, which streamlines the process. Our attorneys in Los Angeles leverage these California protections to maximize U Visa approval chances for our clients throughout Los Angeles County, from East LA to the San Fernando Valley.',
    },
    whyChooseUs: {
      es: ['Aprovechamos las leyes favorables de California para víctimas', 'Experiencia con el LAPD y agencias policiales del condado de LA', 'Proceso acelerado gracias a las protecciones californianas', 'Atención a todo el condado de Los Ángeles y sur de California', 'Equipo con historial de aprobaciones exitosas de Visa U'],
      en: ['We leverage California\'s favorable laws for victims', 'Experience with LAPD and LA County law enforcement agencies', 'Accelerated process thanks to California protections', 'Serving all of Los Angeles County and Southern California', 'Team with a track record of successful U Visa approvals'],
    },
  },
  {
    slug: 'visa-u-dallas',
    officeKey: 'dallas',
    serviceKey: 'visa-u',
    h1: { es: 'Visa U en Dallas, TX', en: 'U Visa in Dallas, TX' },
    metaTitle: { es: 'Visa U en Dallas, TX', en: 'U Visa in Dallas, TX' },
    metaDescription: {
      es: 'Abogados de Visa U en Dallas. Ayudamos a víctimas de crímenes a obtener estatus legal y protección. 35+ años de experiencia. Llame: (214) 753-8315.',
      en: 'U Visa attorneys in Dallas. We help crime victims obtain legal status and protection. 35+ years of experience. Call: (214) 753-8315.',
    },
    intro: {
      es: 'Dallas es una ciudad grande donde lamentablemente muchos inmigrantes son víctimas de crímenes y no denuncian por miedo a las consecuencias migratorias. La Visa U fue creada para proteger a estas víctimas y animarlas a colaborar con la justicia. Nuestros abogados en Dallas trabajan con el departamento de policía de Dallas, la policía de Fort Worth y las autoridades del condado de Dallas para obtener las certificaciones y presentar solicitudes sólidas ante USCIS.',
      en: 'Dallas is a large city where unfortunately many immigrants are crime victims and don\'t report out of fear of immigration consequences. The U Visa was created to protect these victims and encourage them to cooperate with law enforcement. Our attorneys in Dallas work with the Dallas Police Department, Fort Worth Police, and Dallas County authorities to obtain certifications and file strong applications with USCIS.',
    },
    whyChooseUs: {
      es: ['Experiencia con las autoridades policiales de Dallas y Fort Worth', 'Manejo de casos de Visa U en todo el norte de Texas', 'Proceso confidencial que protege la seguridad de la víctima', 'Coordinación completa: certificación, solicitud y seguimiento', 'Evaluación confidencial de su elegibilidad'],
      en: ['Experience with Dallas and Fort Worth law enforcement', 'Handling U Visa cases throughout North Texas', 'Confidential process that protects victim safety', 'Complete coordination: certification, application and follow-up', 'Confidential eligibility evaluation'],
    },
  },

  // === ASYLUM (3 cities) ===
  {
    slug: 'asilo-politico-houston',
    officeKey: 'houston-principal',
    serviceKey: 'asilo',
    h1: { es: 'Asilo Político en Houston, TX', en: 'Political Asylum in Houston, TX' },
    metaTitle: { es: 'Asilo Político en Houston, TX', en: 'Political Asylum in Houston, TX' },
    metaDescription: {
      es: 'Abogados de asilo político en Houston. Asilo afirmativo, defensivo, miedo creíble y protección contra la tortura. 35+ años de experiencia. Llame: (713) 701-1731.',
      en: 'Political asylum attorneys in Houston. Affirmative, defensive asylum, credible fear and torture protection. 35+ years of experience. Call: (713) 701-1731.',
    },
    intro: {
      es: 'Houston recibe a miles de personas cada año que huyen de la persecución en sus países de origen. Como la ciudad más grande de Texas y un destino principal para refugiados y solicitantes de asilo, Houston tiene una de las cortes de inmigración con mayor carga de casos de asilo. Nuestros abogados tienen amplia experiencia preparando casos de asilo tanto afirmativo (ante USCIS) como defensivo (ante la corte de inmigración), incluyendo entrevistas de miedo creíble para personas recién llegadas.',
      en: 'Houston receives thousands of people every year who are fleeing persecution in their home countries. As the largest city in Texas and a primary destination for refugees and asylum seekers, Houston has one of the immigration courts with the highest asylum caseload. Our attorneys have extensive experience preparing both affirmative asylum cases (before USCIS) and defensive asylum (before immigration court), including credible fear interviews for newly arrived individuals.',
    },
    whyChooseUs: {
      es: ['Amplia experiencia en casos de asilo en la corte de Houston', 'Preparación exhaustiva de declaraciones y evidencia de persecución', 'Manejo de entrevistas de miedo creíble y miedo razonable', 'Conocimiento de las condiciones en países de origen', 'Coordinación con expertos en derechos humanos cuando es necesario'],
      en: ['Extensive experience in asylum cases in Houston court', 'Thorough preparation of statements and persecution evidence', 'Handling credible fear and reasonable fear interviews', 'Knowledge of conditions in countries of origin', 'Coordination with human rights experts when needed'],
    },
  },
  {
    slug: 'asilo-politico-chicago',
    officeKey: 'chicago',
    serviceKey: 'asilo',
    h1: { es: 'Asilo Político en Chicago, IL', en: 'Political Asylum in Chicago, IL' },
    metaTitle: { es: 'Asilo Político en Chicago, IL', en: 'Political Asylum in Chicago, IL' },
    metaDescription: {
      es: 'Abogados de asilo político en Chicago, Illinois. Asilo afirmativo y defensivo. Illinois ofrece protecciones adicionales como estado santuario. Llame: (312) 477-0389.',
      en: 'Political asylum attorneys in Chicago, Illinois. Affirmative and defensive asylum. Illinois offers additional protections as a sanctuary state. Call: (312) 477-0389.',
    },
    intro: {
      es: 'Chicago ha sido históricamente una ciudad de acogida para inmigrantes y refugiados de todo el mundo. Illinois, como estado santuario, brinda protecciones adicionales a los solicitantes de asilo. Nuestra oficina en Cicero atiende a personas que huyen de la persecución en Centroamérica, Sudamérica, y otras regiones. Preparamos casos sólidos que documentan la persecución sufrida y presentamos argumentos convincentes ante los oficiales de asilo y los jueces de inmigración de Chicago.',
      en: 'Chicago has historically been a welcoming city for immigrants and refugees from around the world. Illinois, as a sanctuary state, provides additional protections for asylum seekers. Our office in Cicero serves people fleeing persecution from Central America, South America, and other regions. We prepare strong cases documenting the persecution suffered and present compelling arguments before asylum officers and Chicago immigration judges.',
    },
    whyChooseUs: {
      es: ['Chicago como ciudad de acogida con ambiente favorable para solicitantes de asilo', 'Protecciones adicionales de Illinois como estado santuario', 'Preparación detallada de casos con documentación exhaustiva', 'Experiencia con solicitantes de asilo de diversas regiones', 'Colaboración con organizaciones de refugiados en el área'],
      en: ['Chicago as a welcoming city with a favorable environment for asylum seekers', 'Additional protections from Illinois as a sanctuary state', 'Detailed case preparation with exhaustive documentation', 'Experience with asylum seekers from diverse regions', 'Collaboration with refugee organizations in the area'],
    },
  },
  {
    slug: 'asilo-politico-los-angeles',
    officeKey: 'los-angeles',
    serviceKey: 'asilo',
    h1: { es: 'Asilo Político en Los Ángeles, CA', en: 'Political Asylum in Los Angeles, CA' },
    metaTitle: { es: 'Asilo Político en Los Ángeles, CA', en: 'Political Asylum in Los Angeles, CA' },
    metaDescription: {
      es: 'Abogados de asilo político en Los Ángeles. California ofrece protecciones fuertes para solicitantes de asilo. Asilo afirmativo y defensivo. Llame: (213) 784-1554.',
      en: 'Political asylum attorneys in Los Angeles. California offers strong protections for asylum seekers. Affirmative and defensive asylum. Call: (213) 784-1554.',
    },
    intro: {
      es: 'Los Ángeles es uno de los principales destinos para solicitantes de asilo en Estados Unidos, con una comunidad diversa de personas que han huido de la persecución en México, Centroamérica, Sudamérica y otras regiones. California ofrece protecciones robustas para solicitantes de asilo, incluyendo acceso a servicios sociales y protecciones laborales. Nuestros abogados en Pico Rivera manejan casos de asilo afirmativo ante la oficina de asilo de Los Ángeles y casos defensivos ante la corte de inmigración.',
      en: 'Los Angeles is one of the top destinations for asylum seekers in the United States, with a diverse community of people who have fled persecution from Mexico, Central America, South America, and other regions. California offers robust protections for asylum seekers, including access to social services and labor protections. Our attorneys in Pico Rivera handle affirmative asylum cases before the Los Angeles Asylum Office and defensive cases before immigration court.',
    },
    whyChooseUs: {
      es: ['Experiencia ante la oficina de asilo de Los Ángeles', 'Conocimiento de las protecciones californianas para solicitantes de asilo', 'Manejo de casos de diversas nacionalidades y tipos de persecución', 'Red de apoyo con organizaciones de derechos humanos en LA', 'Preparación completa incluyendo declaraciones, evidencia y testigos'],
      en: ['Experience before the Los Angeles Asylum Office', 'Knowledge of California protections for asylum seekers', 'Handling cases from diverse nationalities and persecution types', 'Support network with human rights organizations in LA', 'Complete preparation including statements, evidence and witnesses'],
    },
  },

  // === VAWA (3 cities) ===
  {
    slug: 'vawa-houston',
    officeKey: 'houston-principal',
    serviceKey: 'vawa',
    h1: { es: 'VAWA en Houston, TX — Protección para Víctimas de Violencia Doméstica', en: 'VAWA in Houston, TX — Protection for Domestic Violence Victims' },
    metaTitle: { es: 'VAWA en Houston, TX', en: 'VAWA in Houston, TX' },
    metaDescription: {
      es: 'Abogados de VAWA en Houston. Auto-petición independiente para víctimas de violencia doméstica. Estatus legal sin depender del abusador. Llame: (713) 701-1731.',
      en: 'VAWA attorneys in Houston. Independent self-petition for domestic violence victims. Legal status without depending on the abuser. Call: (713) 701-1731.',
    },
    intro: {
      es: 'En Houston, demasiadas víctimas de violencia doméstica permanecen en situaciones peligrosas porque creen que su estatus migratorio depende de su abusador. La ley VAWA le permite solicitar residencia de manera independiente, sin que su abusador lo sepa. Nuestros abogados en Houston han ayudado a cientos de víctimas a liberarse del ciclo de abuso obteniendo estatus legal propio. Su caso es completamente confidencial y trabajamos con refugios y organizaciones de apoyo en el área de Houston.',
      en: 'In Houston, too many domestic violence victims remain in dangerous situations because they believe their immigration status depends on their abuser. VAWA allows you to petition for residency independently, without your abuser knowing. Our attorneys in Houston have helped hundreds of victims break free from the cycle of abuse by obtaining their own legal status. Your case is completely confidential and we work with shelters and support organizations in the Houston area.',
    },
    whyChooseUs: {
      es: ['Proceso completamente confidencial — su abusador no será notificado', 'Cientos de casos VAWA aprobados en Houston', 'Coordinación con refugios y organizaciones de apoyo para víctimas', 'Auto-petición independiente: no necesita la cooperación del abusador', 'Permiso de trabajo y acceso a beneficios durante el proceso'],
      en: ['Completely confidential process — your abuser will not be notified', 'Hundreds of approved VAWA cases in Houston', 'Coordination with shelters and victim support organizations', 'Independent self-petition: no abuser cooperation needed', 'Work permit and access to benefits during the process'],
    },
  },
  {
    slug: 'vawa-chicago',
    officeKey: 'chicago',
    serviceKey: 'vawa',
    h1: { es: 'VAWA en Chicago, IL — Protección para Víctimas de Violencia Doméstica', en: 'VAWA in Chicago, IL — Protection for Domestic Violence Victims' },
    metaTitle: { es: 'VAWA en Chicago, IL', en: 'VAWA in Chicago, IL' },
    metaDescription: {
      es: 'Abogados de VAWA en Chicago. Illinois ofrece protecciones fuertes para víctimas de violencia doméstica. Auto-petición confidencial. Llame: (312) 477-0389.',
      en: 'VAWA attorneys in Chicago. Illinois offers strong protections for domestic violence victims. Confidential self-petition. Call: (312) 477-0389.',
    },
    intro: {
      es: 'Illinois tiene algunas de las leyes más protectoras del país para víctimas de violencia doméstica, complementando las protecciones federales de VAWA. En Chicago, nuestros abogados combinan las protecciones de la ley estatal de Illinois con la auto-petición federal VAWA para brindar la máxima protección a nuestros clientes. Trabajamos de cerca con el Departamento de Servicios a la Familia del condado de Cook y organizaciones de apoyo como la Red Nacional de Violencia Doméstica para asegurar que nuestros clientes estén seguros durante todo el proceso.',
      en: 'Illinois has some of the most protective laws in the country for domestic violence victims, complementing federal VAWA protections. In Chicago, our attorneys combine Illinois state law protections with the federal VAWA self-petition to provide maximum protection for our clients. We work closely with Cook County Family Services and support organizations like the National Domestic Violence Hotline to ensure our clients are safe throughout the process.',
    },
    whyChooseUs: {
      es: ['Protecciones combinadas de Illinois y la ley federal VAWA', 'Trabajo con servicios de protección del condado de Cook', 'Proceso 100% confidencial y seguro para la víctima', 'Acceso a servicios de apoyo y refugios en el área de Chicago', 'Determinación prima facie que le da acceso inmediato a beneficios'],
      en: ['Combined protections from Illinois and federal VAWA law', 'Working with Cook County protective services', '100% confidential and safe process for the victim', 'Access to support services and shelters in the Chicago area', 'Prima facie determination giving immediate access to benefits'],
    },
  },
  {
    slug: 'vawa-dallas',
    officeKey: 'dallas',
    serviceKey: 'vawa',
    h1: { es: 'VAWA en Dallas, TX — Protección para Víctimas de Violencia Doméstica', en: 'VAWA in Dallas, TX — Protection for Domestic Violence Victims' },
    metaTitle: { es: 'VAWA en Dallas, TX', en: 'VAWA in Dallas, TX' },
    metaDescription: {
      es: 'Abogados de VAWA en Dallas. Auto-petición para víctimas de violencia doméstica. Estatus legal independiente del abusador. Confidencial. Llame: (214) 753-8315.',
      en: 'VAWA attorneys in Dallas. Self-petition for domestic violence victims. Legal status independent from the abuser. Confidential. Call: (214) 753-8315.',
    },
    intro: {
      es: 'Dallas tiene una población inmigrante significativa donde muchas víctimas de violencia doméstica desconocen que pueden obtener estatus legal de manera independiente bajo la ley VAWA. Usted no necesita que su pareja abusiva patrocine su caso de inmigración. Nuestros abogados en Dallas preparan auto-peticiones VAWA completas que documentan el abuso sufrido y demuestran su elegibilidad ante USCIS. Todo el proceso es confidencial — su abusador no recibirá ninguna notificación.',
      en: 'Dallas has a significant immigrant population where many domestic violence victims are unaware they can obtain legal status independently under VAWA. You do not need your abusive partner to sponsor your immigration case. Our attorneys in Dallas prepare complete VAWA self-petitions that document the abuse suffered and demonstrate your eligibility to USCIS. The entire process is confidential — your abuser will not receive any notification.',
    },
    whyChooseUs: {
      es: ['Auto-petición que no requiere la participación ni conocimiento del abusador', 'Documentación completa del caso con evidencia de abuso', 'Trabajo con centros de crisis y refugios del área de Dallas', 'Permiso de trabajo obtenido durante el proceso', 'Camino claro hacia la residencia permanente para víctimas'],
      en: ['Self-petition that does not require abuser\'s participation or knowledge', 'Complete case documentation with evidence of abuse', 'Working with crisis centers and shelters in the Dallas area', 'Work permit obtained during the process', 'Clear path to permanent residency for victims'],
    },
  },

  // ── Ampliación de la matriz ciudad × servicio (2026-08-12) ──
  {
    slug: 'vawa-memphis',
    officeKey: 'memphis',
    serviceKey: 'vawa',
    h1: { es: 'VAWA en Memphis, TN — Protección para Víctimas de Violencia Doméstica', en: 'VAWA in Memphis, TN — Protection for Domestic Violence Victims' },
    metaTitle: { es: 'VAWA en Memphis, TN', en: 'VAWA in Memphis, TN' },
    metaDescription: {
      es: 'Abogados de VAWA en Memphis. Auto-petición confidencial sin que su agresor lo sepa.',
      en: 'VAWA attorneys in Memphis. Confidential self-petition without your abuser knowing.',
    },
    intro: {
      es: 'En Memphis, la auto-petición de VAWA se presenta sin que su cónyuge, padre o hijo agresor participe ni sea notificado: es usted quien pide, no él. Nuestro equipo del condado de Shelby trabaja el caso teniendo en cuenta dos cosas que aquí pesan mucho. La primera es la confidencialidad práctica —a qué dirección llega el correo de USCIS y quién más tiene acceso a ella—, porque en un hogar compartido eso decide si el proceso es seguro o no. La segunda es que los casos de Tennessee que llegan a corte se ven en la Memphis Immigration Court, en 167 N Main St, y que las personas detenidas de esta zona suelen acabar lejos, en LaSalle (Luisiana) o en Etowah (Alabama): si hay una detención de por medio, el plan tiene que contemplar la distancia desde el primer día.',
      en: 'In Memphis, the VAWA self-petition is filed without your abusive spouse, parent, or child taking part or being notified: you are the one petitioning, not them. Our Shelby County team builds the case around two things that matter especially here. The first is practical confidentiality — which address USCIS mail goes to and who else can reach it — because in a shared home that is what decides whether the process is safe. The second is that Tennessee cases reaching court are heard at the Memphis Immigration Court, at 167 N Main St, and that people detained from this area often end up far away, at LaSalle (Louisiana) or Etowah (Alabama): if detention is involved, the plan has to account for that distance from day one.',
    },
    whyChooseUs: {
      es: ['Auto-petición sin participación ni aviso al agresor', 'Atención en español e inglés en la oficina de Memphis', 'Planificación de la correspondencia para que el proceso sea seguro en casa', 'Experiencia con casos que se ven en la Memphis Immigration Court', 'Coordinación cuando el familiar está detenido fuera del estado (LaSalle, Etowah)'],
      en: ['Self-petition with no participation or notice to the abuser', 'Service in Spanish and English at the Memphis office', 'Mail planning so the process stays safe at home', 'Experience with cases heard at the Memphis Immigration Court', 'Coordination when the relative is detained out of state (LaSalle, Etowah)'],
    },
  },
  {
    slug: 'vawa-denver',
    officeKey: 'denver',
    serviceKey: 'vawa',
    h1: { es: 'VAWA en Denver, CO — Protección para Víctimas de Violencia Doméstica', en: 'VAWA in Denver, CO — Protection for Domestic Violence Victims' },
    metaTitle: { es: 'VAWA en Denver, CO', en: 'VAWA in Denver, CO' },
    metaDescription: {
      es: 'Abogados de VAWA en el área de Denver. Auto-petición confidencial, sin aviso al agresor.',
      en: 'VAWA attorneys in the Denver area. Confidential self-petition, no notice to the abuser.',
    },
    intro: {
      es: 'Nuestra oficina del área de Denver está en Arvada y atiende los condados de Adams y Jefferson, además del propio Denver. En VAWA lo primero que preguntan casi todos es si el agresor se va a enterar, y la respuesta es que no: la solicitud la presenta usted y la ley protege esa confidencialidad de forma expresa. Lo segundo que hay que planear en esta zona es la detención. El GEO Aurora ICE Processing Center está a menos de media hora de la oficina, y los casos que llegan a corte se ven en la Denver Immigration Court, en 1961 Stout St: esa cercanía juega a favor cuando hay que actuar rápido para pedir una fianza o presentar pruebas.',
      en: 'Our Denver-area office is in Arvada and serves Adams and Jefferson counties along with Denver itself. With VAWA, almost everyone first asks whether the abuser will find out, and the answer is no: you file the petition and the law expressly protects that confidentiality. The second thing to plan for in this area is detention. The GEO Aurora ICE Processing Center is less than half an hour from the office, and cases reaching court are heard at the Denver Immigration Court, at 1961 Stout St: that proximity works in your favor when you need to move quickly on a bond or file evidence.',
    },
    whyChooseUs: {
      es: ['Auto-petición confidencial: el agresor no participa ni es notificado', 'Oficina en Arvada para los condados de Adams, Jefferson y Denver', 'Respuesta rápida cuando hay detención en Aurora, a media hora', 'Casos ante la Denver Immigration Court', 'Atención en español e inglés'],
      en: ['Confidential self-petition: the abuser neither participates nor is notified', 'Arvada office serving Adams, Jefferson, and Denver counties', 'Fast response when detention happens in Aurora, half an hour away', 'Cases before the Denver Immigration Court', 'Service in Spanish and English'],
    },
  },
  {
    slug: 'vawa-harlingen',
    officeKey: 'harlingen',
    serviceKey: 'vawa',
    h1: { es: 'VAWA en Harlingen, TX — Protección para Víctimas de Violencia Doméstica', en: 'VAWA in Harlingen, TX — Protection for Domestic Violence Victims' },
    metaTitle: { es: 'VAWA en Harlingen, TX', en: 'VAWA in Harlingen, TX' },
    metaDescription: {
      es: 'Abogados de VAWA en Harlingen y el Valle. Auto-petición confidencial, sin aviso al agresor.',
      en: 'VAWA attorneys in Harlingen and the Valley. Confidential self-petition, no notice to the abuser.',
    },
    intro: {
      es: 'En el Valle del Río Grande, VAWA tiene una particularidad práctica: la corte de inmigración y los centros de detención están aquí mismo. La Harlingen Immigration Court está en 1717 Zoy St, y Port Isabel, El Valle (Raymondville) y el centro del condado de Willacy quedan a poca distancia. Eso significa que un caso puede moverse rápido, y también que conviene tener la estrategia lista antes de que se mueva. La auto-petición de VAWA la presenta usted sin que su agresor participe ni sea notificado, y en el condado de Cameron trabajamos el expediente contando con que las pruebas y los testigos suelen estar en la misma comunidad — algo que ayuda a documentar el caso y que a la vez obliga a cuidar la confidencialidad.',
      en: 'In the Rio Grande Valley, VAWA has a practical peculiarity: the immigration court and the detention centers are right here. The Harlingen Immigration Court is at 1717 Zoy St, and Port Isabel, El Valle (Raymondville), and the Willacy County facility are all nearby. That means a case can move fast, and also that the strategy should be ready before it does. You file the VAWA self-petition without your abuser taking part or being notified, and in Cameron County we build the file knowing that the evidence and witnesses are usually in the same community — which helps document the case and at the same time makes confidentiality more delicate.',
    },
    whyChooseUs: {
      es: ['Auto-petición sin participación ni aviso al agresor', 'Oficina en Harlingen, en el condado de Cameron', 'Cercanía a la Harlingen Immigration Court', 'Experiencia con detenciones en Port Isabel, El Valle y Willacy', 'Atención en español, con conocimiento de la comunidad del Valle'],
      en: ['Self-petition with no participation or notice to the abuser', 'Harlingen office, in Cameron County', 'Close to the Harlingen Immigration Court', 'Experience with detention at Port Isabel, El Valle, and Willacy', 'Service in Spanish, with knowledge of the Valley community'],
    },
  },
  {
    slug: 'asilo-politico-dallas',
    officeKey: 'dallas',
    serviceKey: 'asilo',
    h1: { es: 'Asilo Político en Dallas, TX — Abogados de Asilo', en: 'Political Asylum in Dallas, TX — Asylum Attorneys' },
    metaTitle: { es: 'Asilo Político en Dallas, TX', en: 'Political Asylum in Dallas, TX' },
    metaDescription: {
      es: 'Abogados de asilo en Dallas. Plazo de un año desde la llegada, con excepciones. Consulte su caso.',
      en: 'Asylum attorneys in Dallas. One-year filing deadline from arrival, with exceptions. Ask about your case.',
    },
    intro: {
      es: 'El asilo no depende de haber sufrido pobreza o violencia general, por grave que sea: la ley exige persecución o temor fundado por raza, religión, nacionalidad, opinión política o pertenencia a un grupo social determinado. Ahí se gana o se pierde el caso, y por eso importa cómo se cuenta la historia. En Dallas trabajamos las dos vías: la afirmativa ante USCIS, cuando no hay proceso abierto, y la defensiva ante la Dallas Immigration Court, que se encuentra en 125 E John Carpenter Fwy, en Irving. Si hay detención de por medio, en esta zona suele ser Prairieland (Alvarado), y eso cambia los plazos y la preparación. La regla general es presentar dentro del primer año desde la última entrada, con excepciones que hay que acreditar.',
      en: 'Asylum does not turn on having suffered poverty or generalized violence, however severe: the law requires persecution or a well-founded fear based on race, religion, nationality, political opinion, or membership in a particular social group. That is where a case is won or lost, which is why how the story is told matters. In Dallas we handle both routes: affirmative before USCIS, when there are no proceedings, and defensive before the Dallas Immigration Court, located at 125 E John Carpenter Fwy in Irving. If detention is involved, in this area it is usually Prairieland (Alvarado), and that changes deadlines and preparation. The general rule is to file within one year of your last entry, with exceptions that must be proven.',
    },
    whyChooseUs: {
      es: ['Los cinco motivos protegidos, explicados sobre su caso concreto', 'Asilo afirmativo ante USCIS y defensivo ante la Dallas Immigration Court', 'Preparación de la entrevista y de la audiencia en español', 'Experiencia con casos detenidos en Prairieland (Alvarado)', 'Revisión del plazo de un año y de sus excepciones'],
      en: ['The five protected grounds, explained against your actual facts', 'Affirmative asylum before USCIS and defensive before the Dallas Immigration Court', 'Interview and hearing preparation in Spanish', 'Experience with detained cases at Prairieland (Alvarado)', 'Review of the one-year deadline and its exceptions'],
    },
  },
  {
    slug: 'asilo-politico-memphis',
    officeKey: 'memphis',
    serviceKey: 'asilo',
    h1: { es: 'Asilo Político en Memphis, TN — Abogados de Asilo', en: 'Political Asylum in Memphis, TN — Asylum Attorneys' },
    metaTitle: { es: 'Asilo Político en Memphis, TN', en: 'Political Asylum in Memphis, TN' },
    metaDescription: {
      es: 'Abogados de asilo en Memphis. Plazo de un año desde la llegada, con excepciones. Consulte su caso.',
      en: 'Asylum attorneys in Memphis. One-year filing deadline from arrival, with exceptions. Ask about your case.',
    },
    intro: {
      es: 'Para pedir asilo hay que acreditar persecución o temor fundado por uno de cinco motivos —raza, religión, nacionalidad, opinión política o pertenencia a un grupo social determinado—, y el peligro puede venir de alguien que no sea el gobierno si el gobierno no puede o no quiere protegerle. En Memphis los casos que llegan a corte se ven en la Memphis Immigration Court, en 167 N Main St, y hay un detalle logístico que conviene saber desde el principio: las personas detenidas de Tennessee suelen ser trasladadas fuera del estado, a LaSalle (Luisiana) o Etowah (Alabama). Preparar el expediente contando con esa distancia evita perder semanas. La regla general es presentar dentro del primer año desde la última entrada.',
      en: 'To seek asylum you must show persecution or a well-founded fear on one of five grounds — race, religion, nationality, political opinion, or membership in a particular social group — and the danger can come from someone who is not the government, if the government cannot or will not protect you. In Memphis, cases reaching court are heard at the Memphis Immigration Court, at 167 N Main St, and there is one logistical detail worth knowing from the start: people detained in Tennessee are often transferred out of state, to LaSalle (Louisiana) or Etowah (Alabama). Preparing the file with that distance in mind avoids losing weeks. The general rule is to file within one year of your last entry.',
    },
    whyChooseUs: {
      es: ['Los cinco motivos protegidos, aplicados a sus hechos', 'Casos ante la Memphis Immigration Court', 'Coordinación cuando hay traslado a LaSalle o Etowah', 'Preparación de entrevista y audiencia en español', 'Revisión del plazo de un año y de sus excepciones'],
      en: ['The five protected grounds, applied to your facts', 'Cases before the Memphis Immigration Court', 'Coordination when there is a transfer to LaSalle or Etowah', 'Interview and hearing preparation in Spanish', 'Review of the one-year deadline and its exceptions'],
    },
  },
  {
    slug: 'asilo-politico-denver',
    officeKey: 'denver',
    serviceKey: 'asilo',
    h1: { es: 'Asilo Político en Denver, CO — Abogados de Asilo', en: 'Political Asylum in Denver, CO — Asylum Attorneys' },
    metaTitle: { es: 'Asilo Político en Denver, CO', en: 'Political Asylum in Denver, CO' },
    metaDescription: {
      es: 'Abogados de asilo en el área de Denver. Plazo de un año desde la llegada, con excepciones.',
      en: 'Asylum attorneys in the Denver area. One-year filing deadline from arrival, with exceptions.',
    },
    intro: {
      es: 'Nuestra oficina del área de Denver está en Arvada. En asilo, lo que decide el caso no es la gravedad de lo que pasó sino que encaje en uno de los cinco motivos que la ley protege: raza, religión, nacionalidad, opinión política o pertenencia a un grupo social determinado. Los casos que llegan a corte se ven en la Denver Immigration Court, en 1961 Stout St, y las detenciones de esta zona pasan por el GEO Aurora ICE Processing Center, a media hora de la oficina — una cercanía que ayuda cuando hay que preparar una audiencia con poco margen. La regla general es presentar dentro del primer año desde la última entrada, con excepciones que hay que probar.',
      en: 'Our Denver-area office is in Arvada. In asylum, what decides the case is not how severe what happened was, but whether it fits one of the five grounds the law protects: race, religion, nationality, political opinion, or membership in a particular social group. Cases reaching court are heard at the Denver Immigration Court, at 1961 Stout St, and detentions in this area go through the GEO Aurora ICE Processing Center, half an hour from the office — proximity that helps when a hearing has to be prepared on short notice. The general rule is to file within one year of your last entry, with exceptions that must be proven.',
    },
    whyChooseUs: {
      es: ['Los cinco motivos protegidos, aplicados a sus hechos', 'Casos ante la Denver Immigration Court', 'Respuesta rápida en detenciones en Aurora', 'Preparación de entrevista y audiencia en español', 'Revisión del plazo de un año y de sus excepciones'],
      en: ['The five protected grounds, applied to your facts', 'Cases before the Denver Immigration Court', 'Fast response for detentions in Aurora', 'Interview and hearing preparation in Spanish', 'Review of the one-year deadline and its exceptions'],
    },
  },
  {
    slug: 'asilo-politico-harlingen',
    officeKey: 'harlingen',
    serviceKey: 'asilo',
    h1: { es: 'Asilo Político en Harlingen, TX — Abogados de Asilo', en: 'Political Asylum in Harlingen, TX — Asylum Attorneys' },
    metaTitle: { es: 'Asilo Político en Harlingen, TX', en: 'Political Asylum in Harlingen, TX' },
    metaDescription: {
      es: 'Abogados de asilo en Harlingen y el Valle. Corte y centros de detención en la zona.',
      en: 'Asylum attorneys in Harlingen and the Valley. Court and detention centers in the area.',
    },
    intro: {
      es: 'Harlingen es una de las plazas donde el asilo se decide más rápido, porque la corte y la detención están en la misma zona: la Harlingen Immigration Court está en 1717 Zoy St, y Port Isabel, El Valle (Raymondville) y el centro del condado de Willacy quedan a poca distancia. Eso obliga a llegar con el caso armado. Lo que la ley exige no cambia por estar en el Valle: persecución o temor fundado por raza, religión, nacionalidad, opinión política o pertenencia a un grupo social determinado, y presentar por regla general dentro del primer año desde la última entrada. Lo que sí cambia es el ritmo, y con él la preparación del testimonio y de las pruebas del país de origen.',
      en: 'Harlingen is one of the places where asylum is decided fastest, because the court and detention are in the same area: the Harlingen Immigration Court is at 1717 Zoy St, and Port Isabel, El Valle (Raymondville), and the Willacy County facility are all nearby. That means arriving with the case already built. What the law requires does not change because you are in the Valley: persecution or a well-founded fear based on race, religion, nationality, political opinion, or membership in a particular social group, and filing as a general rule within one year of your last entry. What does change is the pace, and with it the preparation of testimony and country-condition evidence.',
    },
    whyChooseUs: {
      es: ['Los cinco motivos protegidos, aplicados a sus hechos', 'Cercanía a la Harlingen Immigration Court', 'Experiencia con Port Isabel, El Valle y Willacy', 'Preparación de testimonio y pruebas del país de origen', 'Revisión del plazo de un año y de sus excepciones'],
      en: ['The five protected grounds, applied to your facts', 'Close to the Harlingen Immigration Court', 'Experience with Port Isabel, El Valle, and Willacy', 'Testimony and country-condition evidence preparation', 'Review of the one-year deadline and its exceptions'],
    },
  },
  {
    slug: 'vawa-los-angeles',
    officeKey: 'los-angeles',
    serviceKey: 'vawa',
    h1: { es: 'VAWA en Los Ángeles, CA — Protección para Víctimas de Violencia Doméstica', en: 'VAWA in Los Angeles, CA — Protection for Domestic Violence Victims' },
    metaTitle: { es: 'VAWA en Los Ángeles, CA', en: 'VAWA in Los Angeles, CA' },
    metaDescription: {
      es: 'Abogados de VAWA en Los Ángeles. Auto-petición confidencial, sin aviso al agresor.',
      en: 'VAWA attorneys in Los Angeles. Confidential self-petition, no notice to the abuser.',
    },
    intro: {
      es: 'California añade a VAWA una capa de protección que no existe en todos los estados, y en el condado de Los Ángeles eso se nota en la práctica: hay órdenes de protección que pueden pedirse sin depender del estatus migratorio, y programas del condado que atienden a víctimas independientemente de su situación. Sobre esa base, la auto-petición federal de VAWA la presenta usted, sin que su cónyuge, padre o hijo agresor participe ni sea notificado. Los casos que llegan a corte se ven en la Los Angeles Immigration Court, en 606 S Olive St, y las detenciones de esta zona pasan por Adelanto o Mesa Verde, ambas a horas de distancia: si hay un familiar detenido, la logística entra en el plan desde el primer día.',
      en: 'California adds a layer of protection to VAWA that not every state has, and in Los Angeles County that shows up in practice: protective orders can be sought without depending on immigration status, and county programs serve victims regardless of their situation. On that foundation, you file the federal VAWA self-petition yourself, without your abusive spouse, parent, or child taking part or being notified. Cases reaching court are heard at the Los Angeles Immigration Court, at 606 S Olive St, and detentions in this area go through Adelanto or Mesa Verde, both hours away: if a relative is detained, logistics become part of the plan from day one.',
    },
    whyChooseUs: {
      es: ['Protecciones de California combinadas con la auto-petición federal', 'Auto-petición sin participación ni aviso al agresor', 'Casos ante la Los Angeles Immigration Court', 'Coordinación cuando hay detención en Adelanto o Mesa Verde', 'Atención en español en el condado de Los Ángeles'],
      en: ['California protections combined with the federal self-petition', 'Self-petition with no participation or notice to the abuser', 'Cases before the Los Angeles Immigration Court', 'Coordination when detention happens at Adelanto or Mesa Verde', 'Service in Spanish in Los Angeles County'],
    },
  },
  {
    slug: 'vawa-el-paso',
    officeKey: 'el-paso',
    serviceKey: 'vawa',
    h1: { es: 'VAWA en El Paso, TX — Protección para Víctimas de Violencia Doméstica', en: 'VAWA in El Paso, TX — Protection for Domestic Violence Victims' },
    metaTitle: { es: 'VAWA en El Paso, TX', en: 'VAWA in El Paso, TX' },
    metaDescription: {
      es: 'Abogados de VAWA en El Paso. Auto-petición confidencial, sin aviso al agresor.',
      en: 'VAWA attorneys in El Paso. Confidential self-petition, no notice to the abuser.',
    },
    intro: {
      es: 'En El Paso hay un factor que no aparece en otras ciudades: la frontera está a minutos, y muchas familias viven partidas entre los dos lados. Eso importa en VAWA porque el agresor a veces amenaza con impedir el cruce, con quedarse con los hijos del otro lado o con retirar una petición que él controla. La respuesta legal es la misma y no depende de él: la auto-petición de VAWA la presenta usted, y su cónyuge, padre o hijo agresor no participa ni es notificado. En el condado de El Paso los casos que van a corte se ven en la El Paso Immigration Court, en 8915 Montana Ave, y las detenciones pasan por el El Paso Service Processing Center o cruzan a Otero y Torrance, en Nuevo México.',
      en: 'El Paso has a factor other cities do not: the border is minutes away, and many families live split across both sides. That matters in VAWA because abusers sometimes threaten to block a crossing, to keep the children on the other side, or to withdraw a petition they control. The legal answer is the same and does not depend on them: you file the VAWA self-petition, and your abusive spouse, parent, or child neither participates nor is notified. In El Paso County, cases going to court are heard at the El Paso Immigration Court, at 8915 Montana Ave, and detentions go through the El Paso Service Processing Center or cross into Otero and Torrance, in New Mexico.',
    },
    whyChooseUs: {
      es: ['Auto-petición sin participación ni aviso al agresor', 'Experiencia con familias divididas por la frontera', 'Casos ante la El Paso Immigration Court', 'Detenciones en El Paso, Otero (NM) y Torrance (NM)', 'Atención en español en el condado de El Paso'],
      en: ['Self-petition with no participation or notice to the abuser', 'Experience with families split by the border', 'Cases before the El Paso Immigration Court', 'Detention at El Paso, Otero (NM), and Torrance (NM)', 'Service in Spanish in El Paso County'],
    },
  },
  {
    slug: 'asilo-politico-el-paso',
    officeKey: 'el-paso',
    serviceKey: 'asilo',
    h1: { es: 'Asilo Político en El Paso, TX — Abogados de Asilo', en: 'Political Asylum in El Paso, TX — Asylum Attorneys' },
    metaTitle: { es: 'Asilo Político en El Paso, TX', en: 'Political Asylum in El Paso, TX' },
    metaDescription: {
      es: 'Abogados de asilo en El Paso. Corte y centros de detención en la zona fronteriza.',
      en: 'Asylum attorneys in El Paso. Court and detention centers in the border area.',
    },
    intro: {
      es: 'El Paso es una de las plazas donde más casos de asilo se resuelven del país, y eso tiene dos caras. La buena: los plazos se mueven. La que hay que anticipar: se mueven con o sin usted preparado. Lo que la ley pide no cambia por estar en la frontera — persecución o temor fundado por raza, religión, nacionalidad, opinión política o pertenencia a un grupo social determinado, y presentar por regla general dentro del primer año desde la última entrada. Los casos se ven en la El Paso Immigration Court, en 8915 Montana Ave, y quien está detenido suele estar en el El Paso Service Processing Center o cruzado a Otero o Torrance, en Nuevo México, lo que cambia por completo el calendario de una audiencia.',
      en: 'El Paso is one of the busiest asylum jurisdictions in the country, and that cuts two ways. The good side: deadlines move. The side to anticipate: they move whether or not you are ready. What the law requires does not change because you are at the border — persecution or a well-founded fear based on race, religion, nationality, political opinion, or membership in a particular social group, and filing as a general rule within one year of your last entry. Cases are heard at the El Paso Immigration Court, at 8915 Montana Ave, and anyone detained is usually at the El Paso Service Processing Center or moved to Otero or Torrance in New Mexico, which changes a hearing calendar entirely.',
    },
    whyChooseUs: {
      es: ['Los cinco motivos protegidos, aplicados a sus hechos', 'Casos ante la El Paso Immigration Court', 'Casos detenidos en El Paso, Otero (NM) y Torrance (NM)', 'Preparación de testimonio y pruebas del país de origen', 'Revisión del plazo de un año y de sus excepciones'],
      en: ['The five protected grounds, applied to your facts', 'Cases before the El Paso Immigration Court', 'Detained cases at El Paso, Otero (NM), and Torrance (NM)', 'Testimony and country-condition evidence preparation', 'Review of the one-year deadline and its exceptions'],
    },
  },
];

// Helper to find page config by slug
export function getPageConfig(slug: string): LandingPageConfig | undefined {
  return LANDING_PAGES.find(p => p.slug === slug);
}

// Helper to get office + service for a page
export function getPageData(slug: string) {
  const config = getPageConfig(slug);
  if (!config) return null;
  const office = OFFICES[config.officeKey];
  const service = SERVICES[config.serviceKey];
  if (!office || !service) return null;
  return { config, office, service };
}

export function getSiblingCities(slug: string): { slug: string; city: string; stateCode: string }[] {
  const config = getPageConfig(slug);
  if (!config) return [];
  return LANDING_PAGES
    .filter((p) => p.serviceKey === config.serviceKey && p.slug !== slug)
    .map((p) => {
      const office = OFFICES[p.officeKey];
      return { slug: p.slug, city: office.city, stateCode: office.stateCode };
    });
}

// Cross-links to other landings for the SAME city (different services).
// Compara por citySlug, no por officeKey: en Houston conviven las oficinas
// 'houston' (accidentes) y 'houston-principal' (inmigración) y sus landings
// deben enlazarse entre sí.
export function getRelatedServiceLinks(slug: string): { slug: string; title: { es: string; en: string } }[] {
  const config = getPageConfig(slug);
  if (!config) return [];
  const citySlug = OFFICES[config.officeKey]?.citySlug;
  return LANDING_PAGES
    .filter((p) => OFFICES[p.officeKey]?.citySlug === citySlug && p.slug !== slug)
    .map((p) => ({ slug: p.slug, title: p.h1 }));
}
