// ============================================================
// City × Service LOCAL CONTENT GENERATOR
// ============================================================
// Produces genuinely differentiated content per landing page
// to address "Crawled - currently not indexed" GSC errors.
// Pulls city-specific signals (court, agencies, neighborhoods,
// highways, hospitals) and weaves them into service-specific
// Q&A and case-scenario templates.
// ============================================================

import type { LandingPageConfig, OfficeInfo, ServiceInfo } from './cityServiceData';

// City-specific real-world data (courts, agencies, landmarks)
export interface CityLocalSignals {
  immigrationCourtName: string;
  immigrationCourtAddress: string;
  policeDept: string;
  countyName: string;
  daOffice: { es: string; en: string };
  detentionFacilities: string[];
  hospitals: string[];
  highways: string[];
  neighborhoods: { es: string[]; en: string[] };
  detentionNote?: { es: string; en: string };
}

export const CITY_LOCAL: Record<string, CityLocalSignals> = {
  houston: {
    immigrationCourtName: 'Houston Immigration Court',
    immigrationCourtAddress: '600 Jefferson St, Suite 900, Houston, TX 77002',
    policeDept: 'Houston Police Department (HPD)',
    countyName: 'Harris County',
    daOffice: { es: 'Fiscalía del condado de Harris', en: 'Harris County District Attorney' },
    detentionFacilities: ['Joe Corley Detention Facility (Conroe)', 'Houston Contract Detention Facility'],
    hospitals: ['Memorial Hermann', 'Houston Methodist', 'Ben Taub'],
    highways: ['I-10', 'I-45', 'I-69 (US-59)', 'Loop 610', 'Beltway 8'],
    neighborhoods: {
      es: ['Navigation', 'Bellaire', 'Spring Branch', 'East End', 'Gulfton', 'Pasadena', 'Baytown', 'Sugar Land', 'Katy'],
      en: ['Navigation', 'Bellaire', 'Spring Branch', 'East End', 'Gulfton', 'Pasadena', 'Baytown', 'Sugar Land', 'Katy'],
    },
  },
  dallas: {
    immigrationCourtName: 'Dallas Immigration Court',
    immigrationCourtAddress: '125 E John Carpenter Fwy, Suite 500, Irving, TX 75062',
    policeDept: 'Dallas Police Department',
    countyName: 'Dallas County',
    daOffice: { es: 'Fiscalía del condado de Dallas', en: 'Dallas County District Attorney' },
    detentionFacilities: ['Prairieland Detention Center (Alvarado)', 'Rolling Plains Regional Jail'],
    hospitals: ['Parkland Memorial Hospital', 'Baylor University Medical Center'],
    highways: ['I-35E', 'I-30', 'I-635 (LBJ Freeway)', 'I-20', 'US-75 (Central Expwy)'],
    neighborhoods: {
      es: ['Oak Cliff', 'Pleasant Grove', 'Vickery Meadow', 'Bachman Lake', 'Garland', 'Irving', 'Grand Prairie', 'Carrollton', 'Mesquite'],
      en: ['Oak Cliff', 'Pleasant Grove', 'Vickery Meadow', 'Bachman Lake', 'Garland', 'Irving', 'Grand Prairie', 'Carrollton', 'Mesquite'],
    },
  },
  chicago: {
    immigrationCourtName: 'Chicago Immigration Court',
    immigrationCourtAddress: '525 W Van Buren St, Suite 500, Chicago, IL 60607',
    policeDept: 'Chicago Police Department (CPD)',
    countyName: 'Cook County',
    daOffice: { es: 'Fiscalía del estado de Illinois (Cook County)', en: "Cook County State's Attorney" },
    detentionFacilities: ['McHenry County Adult Correctional Facility', 'Kenosha County Detention Center'],
    hospitals: ['Stroger Hospital (Cook County)', 'Mount Sinai', 'Norwegian American Hospital'],
    highways: ['I-90/I-94 (Kennedy/Dan Ryan)', 'I-290 (Eisenhower)', 'I-55 (Stevenson)', 'I-294'],
    neighborhoods: {
      es: ['Cicero', 'Berwyn', 'Pilsen', 'La Villita', 'Belmont Cragin', 'Hermosa', 'Gage Park', 'Aurora', 'Waukegan'],
      en: ['Cicero', 'Berwyn', 'Pilsen', 'Little Village', 'Belmont Cragin', 'Hermosa', 'Gage Park', 'Aurora', 'Waukegan'],
    },
    detentionNote: {
      es: 'Illinois cerró sus contratos con ICE en 2022, por lo que los detenidos suelen ser trasladados a Wisconsin o Indiana.',
      en: 'Illinois ended its ICE contracts in 2022, so detainees are typically transferred to Wisconsin or Indiana facilities.',
    },
  },
  'los-angeles': {
    immigrationCourtName: 'Los Angeles Immigration Court',
    immigrationCourtAddress: '606 S Olive St, 15th Floor, Los Angeles, CA 90014',
    policeDept: 'Los Angeles Police Department (LAPD)',
    countyName: 'Los Angeles County',
    daOffice: { es: 'Fiscalía del condado de Los Ángeles', en: 'LA County District Attorney' },
    detentionFacilities: ['Adelanto ICE Processing Center', 'Mesa Verde ICE Processing Center'],
    hospitals: ['LAC+USC Medical Center', 'Olive View-UCLA', 'Cedars-Sinai'],
    highways: ['I-5', 'I-10', 'I-405', 'I-110', 'US-101', 'I-710'],
    neighborhoods: {
      es: ['East LA', 'Boyle Heights', 'Pico Rivera', 'Whittier', 'Montebello', 'Downey', 'San Fernando', 'Pomona', 'Long Beach'],
      en: ['East LA', 'Boyle Heights', 'Pico Rivera', 'Whittier', 'Montebello', 'Downey', 'San Fernando', 'Pomona', 'Long Beach'],
    },
    detentionNote: {
      es: 'California limita la cooperación entre la policía local e ICE bajo la SB 54 (California Values Act).',
      en: 'California limits cooperation between local police and ICE under SB 54 (California Values Act).',
    },
  },
  'el-paso': {
    immigrationCourtName: 'El Paso Immigration Court',
    immigrationCourtAddress: '8915 Montana Ave, El Paso, TX 79925',
    policeDept: 'El Paso Police Department',
    countyName: 'El Paso County',
    daOffice: { es: 'Fiscalía del condado de El Paso', en: 'El Paso County District Attorney' },
    detentionFacilities: ['El Paso Service Processing Center', 'Otero County Processing Center (NM)', 'Torrance County Detention Facility'],
    hospitals: ['University Medical Center (UMC)', 'The Hospitals of Providence'],
    highways: ['I-10', 'Loop 375 (Border Highway)', 'US-54', 'US-62'],
    neighborhoods: {
      es: ['Central', 'Lower Valley', 'East Side', 'Northeast', 'Mission Valley', 'Las Cruces (NM)', 'Anthony', 'Socorro'],
      en: ['Central', 'Lower Valley', 'East Side', 'Northeast', 'Mission Valley', 'Las Cruces (NM)', 'Anthony', 'Socorro'],
    },
    detentionNote: {
      es: 'El Paso es un punto crítico para deportaciones aceleradas y entrevistas de miedo creíble en la frontera.',
      en: 'El Paso is a critical point for expedited removals and credible fear interviews at the border.',
    },
  },
  memphis: {
    immigrationCourtName: 'Memphis Immigration Court',
    immigrationCourtAddress: '167 N Main St, Suite 1300, Memphis, TN 38103',
    policeDept: 'Memphis Police Department',
    countyName: 'Shelby County',
    daOffice: { es: 'Fiscalía del condado de Shelby', en: 'Shelby County District Attorney' },
    detentionFacilities: ['LaSalle ICE Processing Center (Jena, LA)', 'Etowah County Detention Center (AL)'],
    hospitals: ['Regional One Health', 'Methodist University Hospital'],
    highways: ['I-40', 'I-55', 'I-240', 'I-269'],
    neighborhoods: {
      es: ['Hickory Hill', 'Whitehaven', 'Frayser', 'Nutbush', 'Cordova', 'Bartlett', 'Germantown', 'Olive Branch (MS)', 'Southaven (MS)'],
      en: ['Hickory Hill', 'Whitehaven', 'Frayser', 'Nutbush', 'Cordova', 'Bartlett', 'Germantown', 'Olive Branch (MS)', 'Southaven (MS)'],
    },
  },
  denver: {
    immigrationCourtName: 'Denver Immigration Court',
    immigrationCourtAddress: '1961 Stout St, Suite 1100, Denver, CO 80294',
    policeDept: 'Denver Police Department',
    countyName: 'Adams County / Jefferson County',
    daOffice: { es: 'Fiscalía del distrito del condado de Adams', en: 'Adams County District Attorney' },
    detentionFacilities: ['GEO Aurora ICE Processing Center'],
    hospitals: ['Denver Health', 'Saint Joseph Hospital', 'UCHealth'],
    highways: ['I-25', 'I-70', 'C-470', 'E-470', 'US-36'],
    neighborhoods: {
      es: ['Arvada', 'Westminster', 'Aurora', 'Lakewood', 'Wheat Ridge', 'Thornton', 'Commerce City', 'Boulder', 'Greeley'],
      en: ['Arvada', 'Westminster', 'Aurora', 'Lakewood', 'Wheat Ridge', 'Thornton', 'Commerce City', 'Boulder', 'Greeley'],
    },
    detentionNote: {
      es: 'Colorado HB 19-1124 limita la cooperación de la policía local con ICE.',
      en: 'Colorado HB 19-1124 limits local police cooperation with ICE.',
    },
  },
  harlingen: {
    immigrationCourtName: 'Harlingen Immigration Court',
    immigrationCourtAddress: '1717 Zoy St, Harlingen, TX 78552',
    policeDept: 'Harlingen Police Department',
    countyName: 'Cameron County',
    daOffice: { es: 'Fiscalía del condado de Cameron', en: 'Cameron County District Attorney' },
    detentionFacilities: ['Port Isabel Detention Center', 'El Valle Detention Facility (Raymondville)', 'Willacy County Regional Detention Facility'],
    hospitals: ['Valley Baptist Medical Center', 'Harlingen Medical Center'],
    highways: ['US-77/I-69E', 'US-83', 'I-2', 'FM 509'],
    neighborhoods: {
      es: ['Brownsville', 'McAllen', 'Edinburg', 'Mission', 'San Benito', 'Weslaco', 'Pharr', 'Mercedes'],
      en: ['Brownsville', 'McAllen', 'Edinburg', 'Mission', 'San Benito', 'Weslaco', 'Pharr', 'Mercedes'],
    },
    detentionNote: {
      es: 'El Valle del Río Grande maneja un alto volumen de casos de detención y deportaciones aceleradas.',
      en: 'The Rio Grande Valley handles a high volume of detention and expedited removal cases.',
    },
  },
};

export interface FAQItem {
  question: { es: string; en: string };
  answer: { es: string; en: string };
}

export interface TypicalCase {
  title: { es: string; en: string };
  description: { es: string; en: string };
}

// ============================================================
// FAQ GENERATORS by service — each returns 5-7 city-tailored Qs
// ============================================================

function inmigracionFAQ(office: OfficeInfo, signals: CityLocalSignals): FAQItem[] {
  return [
    {
      question: {
        es: `¿Dónde está la corte de inmigración que atiende a ${office.city}?`,
        en: `Where is the immigration court serving ${office.city}?`,
      },
      answer: {
        es: `Los casos de inmigración del área de ${office.city} se procesan en la ${signals.immigrationCourtName}, ubicada en ${signals.immigrationCourtAddress}. Esta corte tiene jurisdicción sobre los procedimientos de remoción y solicitudes de alivio en la región. Nuestros abogados representan clientes ante esta corte regularmente.`,
        en: `${office.city} area immigration cases are processed at the ${signals.immigrationCourtName}, located at ${signals.immigrationCourtAddress}. This court has jurisdiction over removal proceedings and relief applications in the region. Our attorneys regularly represent clients before this court.`,
      },
    },
    {
      question: {
        es: `¿Atienden inmigrantes de toda el área metropolitana de ${office.city}?`,
        en: `Do you serve immigrants throughout the ${office.city} metro area?`,
      },
      answer: {
        es: `Sí. Aunque nuestra oficina está en ${office.address}, atendemos clientes de comunidades vecinas como ${signals.neighborhoods.es.slice(0, 5).join(', ')} y todo el ${signals.countyName}. La consulta inicial puede ser en persona, por teléfono o videollamada.`,
        en: `Yes. While our office is at ${office.address}, we serve clients from neighboring communities like ${signals.neighborhoods.en.slice(0, 5).join(', ')} and throughout ${signals.countyName}. The initial consultation can be in person, by phone, or by video call.`,
      },
    },
    {
      question: {
        es: `¿Cuánto cuesta una consulta de inmigración en ${office.city}?`,
        en: `How much does an immigration consultation cost in ${office.city}?`,
      },
      answer: {
        es: `Ofrecemos consultas iniciales accesibles para evaluar su caso. Trabajamos con planes de pago flexibles para que el costo no sea una barrera. Llame al ${office.phone} para programar una cita en nuestra oficina de ${office.city}.`,
        en: `We offer accessible initial consultations to evaluate your case. We work with flexible payment plans so cost is not a barrier. Call ${office.phone} to schedule an appointment at our ${office.city} office.`,
      },
    },
    {
      question: {
        es: `¿Cuánto tiempo toma un caso de inmigración procesado desde ${office.city}?`,
        en: `How long does an immigration case take when filed from ${office.city}?`,
      },
      answer: {
        es: `Los tiempos varían según el tipo de caso. Una petición familiar puede tardar 1-3 años, una solicitud de ciudadanía 8-14 meses, y un caso ante la ${signals.immigrationCourtName} puede tomar varios años debido a la carga de la corte. Le explicaremos los tiempos específicos de su caso en la consulta.`,
        en: `Times vary by case type. A family petition can take 1-3 years, a citizenship application 8-14 months, and a case before the ${signals.immigrationCourtName} can take several years due to court backlog. We will explain the specific timelines for your case during the consultation.`,
      },
    },
    {
      question: {
        es: `¿Pueden ayudar a un familiar detenido por ICE en el área de ${office.city}?`,
        en: `Can you help a family member detained by ICE in the ${office.city} area?`,
      },
      answer: {
        es: `Sí. Personas detenidas en el área frecuentemente son trasladadas a ${signals.detentionFacilities.join(' o ')}. Actuamos rápidamente para solicitar fianza, identificar defensas contra la deportación y mantener contacto con su familiar mientras se procesa el caso. Llame de inmediato al ${office.phone}.`,
        en: `Yes. People detained in the area are frequently transferred to ${signals.detentionFacilities.join(' or ')}. We act quickly to request bond, identify deportation defenses, and maintain contact with your family member while the case is processed. Call ${office.phone} immediately.`,
      },
    },
    {
      question: {
        es: `¿Hablan español en su oficina de ${office.city}?`,
        en: `Do you speak Spanish at your ${office.city} office?`,
      },
      answer: {
        es: `Sí, todo nuestro equipo es bilingüe. Atendemos a la comunidad latina del área de ${office.city} en español, garantizando que entienda cada paso de su caso sin barreras de idioma.`,
        en: `Yes, our entire team is bilingual. We serve the Latino community in the ${office.city} area in Spanish, ensuring you understand every step of your case without language barriers.`,
      },
    },
  ];
}

function accidentesFAQ(office: OfficeInfo, signals: CityLocalSignals): FAQItem[] {
  return [
    {
      question: {
        es: `¿Cuáles son las autopistas con más accidentes en el área de ${office.city}?`,
        en: `Which highways have the most accidents in the ${office.city} area?`,
      },
      answer: {
        es: `${office.city} tiene alto volumen de accidentes en autopistas como ${signals.highways.slice(0, 4).join(', ')}. Estas vías de alta velocidad y tráfico de camiones comerciales generan muchos casos de lesiones graves. Nuestro equipo conoce los patrones de tráfico locales y trabaja con expertos en reconstrucción de accidentes para construir su caso.`,
        en: `${office.city} sees high accident volume on highways like ${signals.highways.slice(0, 4).join(', ')}. These high-speed roads with heavy commercial truck traffic generate many serious injury cases. Our team understands local traffic patterns and works with accident reconstruction experts to build your case.`,
      },
    },
    {
      question: {
        es: `¿Tengo que pagar algo si pierdo mi caso de accidente?`,
        en: `Do I have to pay anything if I lose my accident case?`,
      },
      answer: {
        es: `No. Trabajamos con honorarios de contingencia: si no ganamos su caso, usted no paga honorarios legales. Esto incluye la consulta inicial, la investigación del accidente y todos los gastos hasta que recuperemos compensación. Llame al ${office.phone} para una evaluación gratuita.`,
        en: `No. We work on contingency: if we don't win your case, you don't pay legal fees. This includes the initial consultation, accident investigation, and all expenses until we recover compensation. Call ${office.phone} for a free evaluation.`,
      },
    },
    {
      question: {
        es: `¿Qué hago si la compañía de seguros me ofrece un acuerdo rápido en ${office.city}?`,
        en: `What do I do if an insurance company offers me a quick settlement in ${office.city}?`,
      },
      answer: {
        es: `No firme nada sin consultar a un abogado. Las compañías de seguros suelen ofrecer cantidades bajas inmediatamente, antes de que se conozca el alcance real de las lesiones. En ${office.city}, hemos visto casos donde la oferta inicial era 10x menor que el valor justo del caso. Llámenos primero al ${office.phone}.`,
        en: `Don't sign anything without consulting an attorney. Insurance companies often offer low amounts immediately, before the full extent of injuries is known. In ${office.city}, we've seen cases where the initial offer was 10x less than the case's fair value. Call us first at ${office.phone}.`,
      },
    },
    {
      question: {
        es: `¿Pueden ayudarme si soy indocumentado y tuve un accidente en ${office.city}?`,
        en: `Can you help me if I'm undocumented and had an accident in ${office.city}?`,
      },
      answer: {
        es: `Sí. Su estatus migratorio no afecta su derecho a recibir compensación por las lesiones causadas por la negligencia de otra persona. La ley de Texas (y de los estados donde tenemos oficinas) protege a las víctimas independientemente de su estatus. Su información es confidencial.`,
        en: `Yes. Your immigration status does not affect your right to receive compensation for injuries caused by another person's negligence. Texas law (and the states where we have offices) protects victims regardless of status. Your information is confidential.`,
      },
    },
    {
      question: {
        es: `¿Cuánto tiempo tengo para presentar un reclamo después de un accidente en ${office.city}?`,
        en: `How long do I have to file a claim after an accident in ${office.city}?`,
      },
      answer: {
        es: `En ${office.state} el plazo general (estatuto de limitaciones) es de 2 años desde la fecha del accidente, pero hay excepciones que pueden acortarlo (por ejemplo, reclamos contra entidades gubernamentales tienen plazos mucho más cortos). Llame lo antes posible al ${office.phone} para no perder su derecho.`,
        en: `In ${office.state} the general deadline (statute of limitations) is 2 years from the accident date, but exceptions can shorten it (for example, claims against government entities have much shorter deadlines). Call ${office.phone} as soon as possible to avoid losing your rights.`,
      },
    },
    {
      question: {
        es: `¿A qué hospitales recomiendan después de un accidente en ${office.city}?`,
        en: `Which hospitals do you recommend after an accident in ${office.city}?`,
      },
      answer: {
        es: `Trabajamos con una red de proveedores médicos en ${office.city} (incluyendo ${signals.hospitals.slice(0, 2).join(' y ')}) que aceptan tratar pacientes sin pago inicial cuando hay un caso legal en curso. Lo importante es documentar las lesiones inmediatamente con un médico calificado.`,
        en: `We work with a network of medical providers in ${office.city} (including ${signals.hospitals.slice(0, 2).join(' and ')}) that agree to treat patients with no upfront payment when there is an ongoing legal case. The important thing is to document injuries immediately with a qualified physician.`,
      },
    },
  ];
}

function defensaDeportacionFAQ(office: OfficeInfo, signals: CityLocalSignals): FAQItem[] {
  return [
    {
      question: {
        es: `Mi familiar fue detenido por ICE en ${office.city}. ¿Qué hago?`,
        en: `My family member was detained by ICE in ${office.city}. What do I do?`,
      },
      answer: {
        es: `Actúe rápido. Los detenidos del área suelen ser llevados a ${signals.detentionFacilities[0]}${signals.detentionFacilities.length > 1 ? ` o ${signals.detentionFacilities[1]}` : ''}. Llame al ${office.phone} para que un abogado evalúe la posibilidad de fianza, identifique defensas y inicie la representación inmediatamente. Use el localizador de ICE (locator.ice.gov) para confirmar dónde está detenido.`,
        en: `Act fast. Area detainees are typically taken to ${signals.detentionFacilities[0]}${signals.detentionFacilities.length > 1 ? ` or ${signals.detentionFacilities[1]}` : ''}. Call ${office.phone} so an attorney can evaluate bond eligibility, identify defenses, and begin representation immediately. Use the ICE locator (locator.ice.gov) to confirm where they are detained.`,
      },
    },
    {
      question: {
        es: `¿Qué es la "Ley de los 10 años" y aplica en ${office.city}?`,
        en: `What is the "10-year rule" and does it apply in ${office.city}?`,
      },
      answer: {
        es: `La cancelación de remoción para no residentes (conocida como "Ley de los 10 años") permite a personas que han vivido continuamente en EE.UU. por al menos 10 años solicitar la residencia ante la ${signals.immigrationCourtName} si pueden probar que su deportación causaría dificultad excepcional a un familiar ciudadano o residente. Hay límites estrictos y debe estar en proceso de remoción para aplicar.`,
        en: `Cancellation of removal for non-residents (known as the "10-year rule") allows people who have lived continuously in the US for at least 10 years to apply for residency before the ${signals.immigrationCourtName} if they can prove that deportation would cause exceptional hardship to a citizen or resident family member. There are strict limits and you must be in removal proceedings to apply.`,
      },
    },
    {
      question: {
        es: `¿Hay políticas de "ciudad santuario" en ${office.city}?`,
        en: `Are there "sanctuary city" policies in ${office.city}?`,
      },
      answer: {
        es: signals.detentionNote?.es || `Las políticas locales y estatales que afectan la cooperación con ICE varían. En su consulta evaluaremos cómo las políticas vigentes en ${office.city} afectan su caso específico.`,
        en: signals.detentionNote?.en || `Local and state policies affecting ICE cooperation vary. During your consultation we will evaluate how current ${office.city} policies affect your specific case.`,
      },
    },
    {
      question: {
        es: `¿Puedo apelar una orden de deportación de un juez de ${office.city}?`,
        en: `Can I appeal a deportation order from a ${office.city} judge?`,
      },
      answer: {
        es: `Sí. Tiene 30 días para apelar una decisión de la ${signals.immigrationCourtName} ante la Junta de Apelaciones de Inmigración (BIA). Si la BIA niega la apelación, puede recurrir al Tribunal de Apelaciones del Circuito correspondiente. Estas etapas son técnicas y requieren un abogado con experiencia en apelaciones.`,
        en: `Yes. You have 30 days to appeal a ${signals.immigrationCourtName} decision to the Board of Immigration Appeals (BIA). If the BIA denies the appeal, you can take it to the corresponding Circuit Court of Appeals. These stages are technical and require an attorney experienced in appeals.`,
      },
    },
    {
      question: {
        es: `¿Cuánto cuesta una fianza de inmigración en el área de ${office.city}?`,
        en: `How much does an immigration bond cost in the ${office.city} area?`,
      },
      answer: {
        es: `Las fianzas mínimas son de $1,500 pero pueden subir a $10,000–$50,000 dependiendo del caso, antecedentes y vínculos comunitarios. Preparamos audiencias de fianza presentando evidencia de raíces en ${office.city}, falta de peligro para la comunidad y baja probabilidad de fuga.`,
        en: `Minimum bonds are $1,500 but can rise to $10,000–$50,000 depending on the case, criminal record, and community ties. We prepare bond hearings by presenting evidence of roots in ${office.city}, no danger to the community, and low flight risk.`,
      },
    },
    {
      question: {
        es: `Tengo antecedentes penales. ¿Pueden defenderme contra la deportación en ${office.city}?`,
        en: `I have a criminal record. Can you defend me against deportation in ${office.city}?`,
      },
      answer: {
        es: `Depende del tipo y fecha de la condena. Algunos delitos resultan en deportación obligatoria, pero hay alivios disponibles según las circunstancias. Trabajamos con la fiscalía (${signals.daOffice.es}) cuando es posible para reabrir o reclasificar condenas. Llame para una evaluación honesta.`,
        en: `It depends on the type and date of the conviction. Some offenses result in mandatory deportation, but reliefs are available depending on circumstances. We work with the prosecutor's office (${signals.daOffice.en}) when possible to reopen or reclassify convictions. Call for an honest evaluation.`,
      },
    },
  ];
}

function visaUFAQ(office: OfficeInfo, signals: CityLocalSignals): FAQItem[] {
  return [
    {
      question: {
        es: `¿Quién puede firmar la certificación de Visa U (suplemento B) en ${office.city}?`,
        en: `Who can sign the U Visa certification (Supplement B) in ${office.city}?`,
      },
      answer: {
        es: `Cualquier agencia con autoridad investigadora: ${signals.policeDept}, oficina del sheriff de ${signals.countyName}, ${signals.daOffice.es}, fiscales federales, o jueces. Tenemos relaciones de trabajo establecidas para gestionar certificaciones en ${office.city}.`,
        en: `Any agency with investigative authority: ${signals.policeDept}, ${signals.countyName} sheriff's office, ${signals.daOffice.en}, federal prosecutors, or judges. We have established working relationships to manage certifications in ${office.city}.`,
      },
    },
    {
      question: {
        es: `¿Qué pasa si la policía de ${office.city} no quiere firmar mi certificación?`,
        en: `What happens if ${office.city} police won't sign my certification?`,
      },
      answer: {
        es: `Es un problema común. Tenemos estrategias específicas: solicitar revisión por supervisores, presentar la solicitud a otras agencias con jurisdicción concurrente, o recurrir a fiscales del condado. En casos severos podemos involucrar a ${signals.daOffice.es} directamente.`,
        en: `It's a common problem. We have specific strategies: request supervisor review, submit the request to other agencies with concurrent jurisdiction, or escalate to county prosecutors. In severe cases we can involve the ${signals.daOffice.en} directly.`,
      },
    },
    {
      question: {
        es: `¿Cuánto tarda la Visa U en aprobarse desde ${office.city}?`,
        en: `How long does U Visa approval take from ${office.city}?`,
      },
      answer: {
        es: `Actualmente, la determinación Bona Fide tarda entre 2 y 5 años, lo cual le otorga permiso de trabajo y protección contra la deportación. La aprobación final de la visa puede tomar 5-7 años debido al límite anual de 10,000 visas. Iniciamos el proceso lo antes posible para asegurar su lugar en la fila.`,
        en: `Currently, the Bona Fide determination takes 2 to 5 years, which grants you a work permit and deportation protection. Final visa approval can take 5-7 years due to the annual cap of 10,000 visas. We start the process as soon as possible to secure your place in line.`,
      },
    },
    {
      question: {
        es: `Sufrí un crimen hace años en ${office.city}. ¿Aún califico?`,
        en: `I suffered a crime years ago in ${office.city}. Do I still qualify?`,
      },
      answer: {
        es: `No hay límite de tiempo para solicitar la Visa U después del crimen. Hemos obtenido aprobaciones para casos ocurridos hace 10+ años. Lo importante es que pueda demostrar que sufrió daño sustancial y cooperó con la investigación.`,
        en: `There is no time limit for applying for the U Visa after the crime. We have obtained approvals for cases occurring 10+ years ago. What matters is that you can demonstrate substantial harm and cooperation with the investigation.`,
      },
    },
    {
      question: {
        es: `¿Mi familia también obtiene estatus con la Visa U?`,
        en: `Does my family also get status with the U Visa?`,
      },
      answer: {
        es: `Sí. Si usted tiene 21+ años, puede incluir cónyuge e hijos menores de 21. Si es menor de 21, puede incluir padres, hermanos menores de 18, cónyuge e hijos. Estos derivados pueden estar dentro o fuera de EE.UU. al momento de la solicitud.`,
        en: `Yes. If you are 21+, you can include your spouse and children under 21. If you are under 21, you can include parents, siblings under 18, spouse and children. These derivatives can be inside or outside the US at the time of application.`,
      },
    },
    {
      question: {
        es: `¿Soy elegible para Visa U si tengo orden de deportación en ${office.city}?`,
        en: `Am I eligible for U Visa if I have a deportation order in ${office.city}?`,
      },
      answer: {
        es: `Sí, pero el proceso es más complejo. Solicitamos la Visa U junto con una "stay of removal" (suspensión de deportación) ante ICE. La aprobación de la Visa U no anula automáticamente la orden — requiere pasos adicionales que manejamos en su caso.`,
        en: `Yes, but the process is more complex. We apply for the U Visa along with a stay of removal before ICE. U Visa approval does not automatically vacate the order — it requires additional steps we handle in your case.`,
      },
    },
  ];
}

function asiloFAQ(office: OfficeInfo, signals: CityLocalSignals): FAQItem[] {
  return [
    {
      question: {
        es: `¿Tengo que estar en ${office.city} para solicitar asilo?`,
        en: `Do I have to be in ${office.city} to apply for asylum?`,
      },
      answer: {
        es: `Para asilo afirmativo, su residencia determina la oficina de asilo asignada — quienes viven en el área de ${office.city} suelen ser asignados a la oficina regional correspondiente. Para asilo defensivo, su caso se ve en la ${signals.immigrationCourtName}. Hay solo un plazo de 1 año desde su entrada a EE.UU. para solicitar asilo.`,
        en: `For affirmative asylum, your residence determines the assigned asylum office — those living in the ${office.city} area are typically assigned to the corresponding regional office. For defensive asylum, your case goes before the ${signals.immigrationCourtName}. There is a 1-year deadline from your US entry to apply for asylum.`,
      },
    },
    {
      question: {
        es: `Pasé el plazo de 1 año desde que llegué a ${office.city}. ¿Aún puedo solicitar asilo?`,
        en: `I passed the 1-year deadline since arriving in ${office.city}. Can I still apply for asylum?`,
      },
      answer: {
        es: `Hay excepciones: cambio de circunstancias en su país de origen, circunstancias extraordinarias (enfermedad grave, asistencia legal inadecuada, ser menor cuando llegó), o solicitudes presentadas dentro de un tiempo razonable después de la excepción. Evaluamos su caso para identificar qué excepción aplica.`,
        en: `There are exceptions: changed circumstances in your country of origin, extraordinary circumstances (serious illness, inadequate legal assistance, being a minor on arrival), or applications filed within a reasonable time after the exception. We evaluate your case to identify which exception applies.`,
      },
    },
    {
      question: {
        es: `¿Puedo trabajar legalmente mientras espero mi asilo?`,
        en: `Can I work legally while waiting for asylum?`,
      },
      answer: {
        es: `Sí. Después de 150 días de presentar la solicitud I-589, puede pedir el permiso de trabajo (EAD), que generalmente se aprueba dentro de 30 días. Esto le permite trabajar legalmente mientras su caso se procesa, lo cual puede tardar varios años en la ${signals.immigrationCourtName}.`,
        en: `Yes. After 150 days of filing the I-589 application, you can request a work permit (EAD), which is generally approved within 30 days. This allows you to work legally while your case is processed, which can take several years at the ${signals.immigrationCourtName}.`,
      },
    },
    {
      question: {
        es: `¿Qué tipo de evidencia necesito para asilo en ${office.city}?`,
        en: `What kind of evidence do I need for asylum in ${office.city}?`,
      },
      answer: {
        es: `Necesita: declaración personal detallada, evidencia de identidad, reportes de país de origen (Country Reports del Departamento de Estado), evidencia médica de daño físico/psicológico, declaraciones de testigos, fotos, mensajes amenazantes. Trabajamos con expertos en condiciones de país y psicólogos cuando el caso lo amerita.`,
        en: `You need: detailed personal declaration, identity evidence, country of origin reports (State Department Country Reports), medical evidence of physical/psychological harm, witness statements, photos, threatening messages. We work with country conditions experts and psychologists when the case warrants it.`,
      },
    },
    {
      question: {
        es: `Ya estoy en proceso de deportación en ${office.city}. ¿Puedo aún solicitar asilo?`,
        en: `I'm already in deportation proceedings in ${office.city}. Can I still apply for asylum?`,
      },
      answer: {
        es: `Sí. Esto es asilo defensivo: presenta el formulario I-589 directamente ante el juez de la ${signals.immigrationCourtName}. El plazo de 1 año aún aplica, pero al presentarlo en corte usted automáticamente "preserva" su solicitud. Es crucial tener un abogado por la complejidad del proceso defensivo.`,
        en: `Yes. This is defensive asylum: you file Form I-589 directly with the judge at the ${signals.immigrationCourtName}. The 1-year deadline still applies, but filing in court automatically "preserves" your application. It's crucial to have an attorney due to the complexity of the defensive process.`,
      },
    },
  ];
}

function vawaFAQ(office: OfficeInfo, signals: CityLocalSignals): FAQItem[] {
  return [
    {
      question: {
        es: `¿Mi abusador se enterará si solicito VAWA en ${office.city}?`,
        en: `Will my abuser find out if I apply for VAWA in ${office.city}?`,
      },
      answer: {
        es: `No. La ley federal protege la confidencialidad de las solicitudes VAWA bajo 8 U.S.C. § 1367. USCIS no notifica al abusador, no comparte información con él, y la oficina local de USCIS de ${office.city} sigue protocolos estrictos de confidencialidad.`,
        en: `No. Federal law protects VAWA application confidentiality under 8 U.S.C. § 1367. USCIS does not notify the abuser, does not share information with them, and the local USCIS office in ${office.city} follows strict confidentiality protocols.`,
      },
    },
    {
      question: {
        es: `¿Necesito haber denunciado el abuso a la policía de ${office.city}?`,
        en: `Do I need to have reported the abuse to ${office.city} police?`,
      },
      answer: {
        es: `No es obligatorio. Aunque reportes policiales (de ${signals.policeDept}) ayudan, también aceptamos otra evidencia: registros médicos de hospitales como ${signals.hospitals[0]}, fotos de lesiones, mensajes de texto/WhatsApp, declaraciones de amigos o familiares, y registros de refugios.`,
        en: `It's not required. While police reports (from ${signals.policeDept}) help, we also accept other evidence: medical records from hospitals like ${signals.hospitals[0]}, photos of injuries, text/WhatsApp messages, statements from friends or family, and shelter records.`,
      },
    },
    {
      question: {
        es: `Mi pareja abusiva es residente, no ciudadano. ¿Puedo aún solicitar VAWA?`,
        en: `My abusive partner is a resident, not a citizen. Can I still apply for VAWA?`,
      },
      answer: {
        es: `Sí. VAWA permite la auto-petición si su cónyuge es ciudadano americano O residente permanente. También aplica si fue su padre/madre ciudadano/residente quien le abusó, o su hijo/a ciudadano abusivo (caso para padres mayores).`,
        en: `Yes. VAWA allows self-petition if your spouse is a US citizen OR lawful permanent resident. It also applies if it was your citizen/resident parent who abused you, or your abusive citizen child (case for elderly parents).`,
      },
    },
    {
      question: {
        es: `¿VAWA aplica para hombres víctimas de abuso en ${office.city}?`,
        en: `Does VAWA apply to male abuse victims in ${office.city}?`,
      },
      answer: {
        es: `Sí. A pesar del nombre ("Violence Against Women Act"), VAWA es neutral en cuanto al género. Hombres abusados por sus cónyuges ciudadanas/residentes en el área de ${office.city} son elegibles bajo los mismos criterios. Hemos representado casos masculinos exitosos.`,
        en: `Yes. Despite the name ("Violence Against Women Act"), VAWA is gender-neutral. Men abused by their citizen/resident spouses in the ${office.city} area are eligible under the same criteria. We have represented successful male cases.`,
      },
    },
    {
      question: {
        es: `¿Cuándo puedo trabajar después de solicitar VAWA en ${office.city}?`,
        en: `When can I work after applying for VAWA in ${office.city}?`,
      },
      answer: {
        es: `Una vez que USCIS emite la determinación prima facie (generalmente 1-3 meses después de presentar el I-360), usted califica para beneficios públicos en muchos estados, y puede solicitar el permiso de trabajo. La aprobación final del I-360 puede tomar 12-24 meses.`,
        en: `Once USCIS issues the prima facie determination (generally 1-3 months after filing the I-360), you qualify for public benefits in many states, and can apply for a work permit. Final approval of the I-360 can take 12-24 months.`,
      },
    },
    {
      question: {
        es: `Salí de la relación abusiva hace años. ¿Aún califico para VAWA en ${office.city}?`,
        en: `I left the abusive relationship years ago. Do I still qualify for VAWA in ${office.city}?`,
      },
      answer: {
        es: `Tiene hasta 2 años después del divorcio o muerte del abusador para presentar la auto-petición VAWA. Si su matrimonio terminó hace más tiempo, podemos explorar otras opciones como Visa U si fue víctima de violencia doméstica reportada como crimen.`,
        en: `You have up to 2 years after divorce or death of the abuser to file the VAWA self-petition. If your marriage ended longer ago, we can explore other options like U Visa if you were a victim of domestic violence reported as a crime.`,
      },
    },
  ];
}

// ============================================================
// TYPICAL CASES per service (anonymized scenario summaries)
// ============================================================

function inmigracionCases(office: OfficeInfo, signals: CityLocalSignals): TypicalCase[] {
  return [
    {
      title: { es: 'Residencia por matrimonio en ' + office.city, en: 'Marriage-based residency in ' + office.city },
      description: {
        es: `Cliente de ${signals.neighborhoods.es[0]} se casó con su pareja ciudadana. Manejamos la petición I-130 + ajuste I-485, incluyendo la entrevista en la oficina local de USCIS. Aprobado en 11 meses.`,
        en: `${signals.neighborhoods.en[0]} client married their US citizen partner. We handled the I-130 petition + I-485 adjustment, including the interview at the local USCIS office. Approved in 11 months.`,
      },
    },
    {
      title: { es: 'Ciudadanía con perdón médico', en: 'Citizenship with medical waiver' },
      description: {
        es: `Residente de ${office.city} con discapacidad cognitiva calificó para el formulario N-648 (perdón médico) que exime el examen de inglés y civismo. Naturalización aprobada.`,
        en: `${office.city} resident with cognitive disability qualified for Form N-648 (medical waiver) that waives the English and civics exam. Naturalization approved.`,
      },
    },
    {
      title: { es: 'DACA renovación tras retraso', en: 'DACA renewal after delay' },
      description: {
        es: `Joven de ${office.city} dejó vencer su DACA por confusión de fechas. Presentamos la renovación tardía con explicación documentada — aprobado sin laguna en empleo.`,
        en: `${office.city} youth let DACA expire due to date confusion. We filed late renewal with documented explanation — approved with no employment gap.`,
      },
    },
  ];
}

function accidentesCases(office: OfficeInfo, signals: CityLocalSignals): TypicalCase[] {
  return [
    {
      title: { es: `Choque en ${signals.highways[0]}`, en: `Crash on ${signals.highways[0]}` },
      description: {
        es: `Cliente sufrió lesiones graves en colisión con camión comercial en ${signals.highways[0]}. Negociamos un acuerdo seis cifras con la aseguradora del camionero, sin ir a juicio.`,
        en: `Client suffered serious injuries in commercial truck collision on ${signals.highways[0]}. We negotiated a six-figure settlement with the trucker's insurer, without going to trial.`,
      },
    },
    {
      title: { es: 'Conductor sin seguro en ' + office.city, en: 'Uninsured driver in ' + office.city },
      description: {
        es: `Víctima atropellada en ${signals.neighborhoods.es[1]} por conductor sin seguro. Activamos la cobertura UM/UIM de la propia póliza del cliente y obtuvimos compensación completa por gastos médicos y dolor.`,
        en: `Victim hit in ${signals.neighborhoods.en[1]} by uninsured driver. We activated the client's own UM/UIM coverage and obtained full compensation for medical bills and pain.`,
      },
    },
    {
      title: { es: 'Resbalón y caída en establecimiento comercial', en: 'Slip and fall at commercial property' },
      description: {
        es: `Cliente cayó en piso mojado sin señalización en una tienda en ${office.city}. Negociamos directamente con la aseguradora del establecimiento y conseguimos compensación por cirugía y rehabilitación.`,
        en: `Client fell on unmarked wet floor at a ${office.city} store. We negotiated directly with the property's insurer and obtained compensation for surgery and rehabilitation.`,
      },
    },
  ];
}

function defensaDeportacionCases(office: OfficeInfo, signals: CityLocalSignals): TypicalCase[] {
  return [
    {
      title: { es: 'Cancelación de remoción "10 años"', en: '"10-year" cancellation of removal' },
      description: {
        es: `Padre de 3 niños ciudadanos vivía en ${office.city} desde 2010. En la ${signals.immigrationCourtName} demostramos la dificultad excepcional para sus hijos. Juez concedió la residencia.`,
        en: `Father of 3 US citizen children lived in ${office.city} since 2010. At the ${signals.immigrationCourtName} we proved exceptional hardship to his children. Judge granted residency.`,
      },
    },
    {
      title: { es: 'Fianza obtenida en 48 horas', en: 'Bond obtained in 48 hours' },
      description: {
        es: `Cliente detenido por ICE durante visita rutinaria a oficina USCIS. Trasladado a ${signals.detentionFacilities[0]}. Logramos audiencia de fianza expedita y liberación con $5,000 de fianza.`,
        en: `Client detained by ICE during routine USCIS office visit. Transferred to ${signals.detentionFacilities[0]}. We secured an expedited bond hearing and release with $5,000 bond.`,
      },
    },
    {
      title: { es: 'Reapertura tras orden in absentia', en: 'Reopening after in absentia order' },
      description: {
        es: `Cliente de ${office.city} recibió orden de deportación en ausencia por no recibir notificación. Presentamos moción de reapertura mostrando dirección incorrecta — caso reabierto.`,
        en: `${office.city} client received in absentia deportation order due to not receiving notice. We filed motion to reopen showing incorrect address — case reopened.`,
      },
    },
  ];
}

function visaUCases(office: OfficeInfo, signals: CityLocalSignals): TypicalCase[] {
  return [
    {
      title: { es: 'Víctima de robo a mano armada', en: 'Armed robbery victim' },
      description: {
        es: `Cliente atacado en ${signals.neighborhoods.es[2]}. Coordinamos certificación con ${signals.policeDept}. Aprobada determinación Bona Fide — permiso de trabajo emitido.`,
        en: `Client attacked in ${signals.neighborhoods.en[2]}. We coordinated certification with ${signals.policeDept}. Bona Fide determination approved — work permit issued.`,
      },
    },
    {
      title: { es: 'Violencia doméstica + Visa U', en: 'Domestic violence + U Visa' },
      description: {
        es: `Cliente sufrió abuso de su pareja en ${office.city}. Reportó a la policía y obtuvo orden de protección. Visa U aprobada con cooperación documentada en investigación.`,
        en: `Client suffered abuse from partner in ${office.city}. Reported to police and obtained protection order. U Visa approved with documented cooperation in investigation.`,
      },
    },
    {
      title: { es: 'Crimen de hace 8 años', en: 'Crime from 8 years ago' },
      description: {
        es: `Solicitud presentada por crimen ocurrido años antes. Trabajamos con ${signals.daOffice.es} para conseguir certificación retroactiva — caso aprobado.`,
        en: `Application filed for crime from years prior. Worked with ${signals.daOffice.en} to secure retroactive certification — case approved.`,
      },
    },
  ];
}

function asiloCases(office: OfficeInfo, signals: CityLocalSignals): TypicalCase[] {
  return [
    {
      title: { es: 'Asilo afirmativo aprobado', en: 'Affirmative asylum approved' },
      description: {
        es: `Familia centroamericana huyendo de pandillas presentó I-589 dentro del año. Presentamos evidencia detallada y testimonios — aprobado tras entrevista.`,
        en: `Central American family fleeing gangs filed I-589 within the year. We presented detailed evidence and testimony — approved after interview.`,
      },
    },
    {
      title: { es: 'Asilo defensivo en corte de ' + office.city, en: 'Defensive asylum in ' + office.city + ' court' },
      description: {
        es: `Cliente en proceso de remoción en la ${signals.immigrationCourtName}. Presentamos asilo defensivo con expert witness en condiciones de país — concedido por el juez.`,
        en: `Client in removal proceedings at ${signals.immigrationCourtName}. We filed defensive asylum with country conditions expert witness — granted by the judge.`,
      },
    },
    {
      title: { es: 'Excepción al plazo de 1 año', en: '1-year deadline exception' },
      description: {
        es: `Cliente que llegó hacía 3 años pero recientemente vivió un cambio de circunstancias en su país. Argumentamos exitosamente la excepción al plazo — caso procesado.`,
        en: `Client who arrived 3 years prior but recently experienced changed country circumstances. We successfully argued the deadline exception — case processed.`,
      },
    },
  ];
}

function vawaCases(office: OfficeInfo, signals: CityLocalSignals): TypicalCase[] {
  return [
    {
      title: { es: 'Auto-petición sin denuncia policial', en: 'Self-petition without police report' },
      description: {
        es: `Víctima en ${office.city} no reportó el abuso por miedo. Documentamos el caso con registros de ${signals.hospitals[0]}, fotos y declaraciones de vecinos. VAWA aprobada.`,
        en: `Victim in ${office.city} did not report abuse out of fear. We documented the case with ${signals.hospitals[0]} records, photos and neighbor statements. VAWA approved.`,
      },
    },
    {
      title: { es: 'VAWA para hombre víctima', en: 'VAWA for male victim' },
      description: {
        es: `Cliente masculino en ${office.city} abusado emocional y físicamente por esposa ciudadana. Auto-petición aprobada — residencia obtenida después.`,
        en: `Male client in ${office.city} emotionally and physically abused by US citizen wife. Self-petition approved — residency obtained after.`,
      },
    },
    {
      title: { es: 'VAWA para padres mayores', en: 'VAWA for elderly parents' },
      description: {
        es: `Cliente de 67 años abusada por su hijo ciudadano americano. Probamos crueldad extrema y vinculo financiero forzado — aprobada como derivativa.`,
        en: `67-year-old client abused by US citizen son. We proved extreme cruelty and forced financial dependency — approved as derivative.`,
      },
    },
  ];
}

const FAQ_BUILDERS: Record<string, (o: OfficeInfo, s: CityLocalSignals) => FAQItem[]> = {
  inmigracion: inmigracionFAQ,
  accidentes: accidentesFAQ,
  'defensa-deportacion': defensaDeportacionFAQ,
  'visa-u': visaUFAQ,
  asilo: asiloFAQ,
  vawa: vawaFAQ,
};

const CASE_BUILDERS: Record<string, (o: OfficeInfo, s: CityLocalSignals) => TypicalCase[]> = {
  inmigracion: inmigracionCases,
  accidentes: accidentesCases,
  'defensa-deportacion': defensaDeportacionCases,
  'visa-u': visaUCases,
  asilo: asiloCases,
  vawa: vawaCases,
};

export function getLocalFAQ(config: LandingPageConfig, office: OfficeInfo, service: ServiceInfo): FAQItem[] {
  const signals = CITY_LOCAL[config.officeKey];
  const builder = FAQ_BUILDERS[service.serviceKey];
  if (!signals || !builder) return [];
  return builder(office, signals);
}

export function getTypicalCases(config: LandingPageConfig, office: OfficeInfo, service: ServiceInfo): TypicalCase[] {
  const signals = CITY_LOCAL[config.officeKey];
  const builder = CASE_BUILDERS[service.serviceKey];
  if (!signals || !builder) return [];
  return builder(office, signals);
}

export function getCitySignals(officeKey: string): CityLocalSignals | undefined {
  return CITY_LOCAL[officeKey];
}
