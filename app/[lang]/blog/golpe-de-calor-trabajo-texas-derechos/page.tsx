import type { Metadata } from 'next';
import BlogArticleLayout from '../../../components/blogs/BlogArticleLayout';
import { buildArticleMetadata } from '../../../components/blogs/articleMetadata';
import { ARTICLE_UI, type BlogArticleContent } from '../../../components/blogs/articleModel';

const SLUG = 'golpe-de-calor-trabajo-texas-derechos';
const ISO_DATE = '2026-08-06';
// TODO(portada): sustituir cuando marketing entregue la imagen definitiva.
const IMAGE = '/og-default.jpg';

const content: Record<'es' | 'en', BlogArticleContent> = {
  es: {
    metaTitle: 'Golpe de calor en el trabajo: tus derechos',
    metaDesc:
      'Si el calor te lesionó trabajando en Texas puedes tener un caso, sin importar tu estatus migratorio. Las dos rutas de compensación y qué hacer el mismo día.',
    title: 'Golpe de calor en el trabajo: los derechos de los trabajadores en Texas que nadie les explica',
    displayDate: '06 Ago, 2026',
    readTime: '9 min',
    categoryLabel: 'Accidentes',
    summary: {
      title: 'Resumen inicial',
      text: 'Cada verano, en Texas, hay trabajadores que se desmayan en un techo, en una zanja o en una bodega sin clima, y a los que se les dice que "aguanten" o que "tomen agua y sigan". El golpe de calor no es cansancio: es una <strong>emergencia médica</strong> que puede dejar daño renal permanente o matar en horas. Si le ocurrió trabajando, es muy posible que tenga derecho a compensación —<strong>sin importar su estatus migratorio</strong>— y la ruta depende de un detalle que casi nadie conoce: si su patrón tiene o no seguro de compensación laboral. Aquí le explicamos las dos rutas, qué hacer el mismo día y qué evidencia se pierde si espera.',
    },
    intro: [
      'En Texas el calor no es una molestia del verano: es un riesgo laboral documentado que cada año deja lesionados y muertos, y golpea con más fuerza a quienes trabajan al aire libre en construcción, techos, jardinería, carreteras y campos, o adentro en bodegas y cocinas sin ventilación.',
      'A esa realidad se suma una confusión legal real. Durante años, algunas ciudades de Texas tenían ordenanzas que obligaban a dar descansos con agua y sombra. Una ley estatal posterior limitó la capacidad de los gobiernos locales para imponer ese tipo de reglas, y desde entonces mucha gente cree que <strong>ya no le queda ningún derecho</strong>. Eso es falso.',
      'Este artículo separa lo que cambió de lo que sigue vigente, y explica cómo se construye un caso por lesión por calor en Texas: qué hacer el mismo día, qué documentar y por qué el estatus migratorio no le quita derechos.',
    ],
    sections: [
      {
        icon: 'thermometer',
        title: 'No es "aguantar el calor": son lesiones médicas reales',
        subtitle: 'Lo que le está pasando a su cuerpo',
        blocks: [
          {
            kind: 'text',
            text: 'Confundir el agotamiento por calor con el golpe de calor es peligroso, porque el segundo es una emergencia. Y hay una tercera lesión, menos conocida, que aparece con frecuencia en trabajo físico bajo calor extremo y que puede destruir los riñones.',
          },
          {
            kind: 'cards',
            items: [
              {
                title: 'Agotamiento por calor',
                desc: 'Sudor abundante, piel fría y húmeda, debilidad, náusea, mareo, calambres. Requiere parar de inmediato, sombra, líquidos y vigilancia.',
              },
              {
                title: 'Golpe de calor',
                desc: 'Emergencia médica. Temperatura corporal muy alta, confusión, habla incoherente, convulsiones, piel caliente que puede dejar de sudar, pérdida del conocimiento. Llame al 911.',
              },
              {
                title: 'Rabdomiólisis',
                desc: 'El músculo se rompe y libera sustancias que dañan el riñón. Orina oscura como refresco de cola, dolor muscular intenso, debilidad. Puede requerir diálisis.',
              },
              {
                title: 'Consecuencias tardías',
                desc: 'Un golpe de calor puede dejar daño renal, cardíaco o neurológico que aparece o se confirma semanas después. Por eso el seguimiento médico importa.',
              },
            ],
          },
          {
            kind: 'warning',
            text: 'Si un compañero está confundido, deja de sudar o pierde el conocimiento con calor, no lo lleve "a descansar al carro". Llame al 911 y comience a enfriarlo. El tiempo que pasa antes de bajar la temperatura corporal determina si queda daño permanente.',
          },
        ],
      },
      {
        icon: 'balance',
        title: '¿Hay ley de descansos en Texas? Qué cambió y qué sigue',
        subtitle: 'La confusión que deja a la gente creyendo que no tiene derechos',
        blocks: [
          {
            kind: 'text',
            text: 'Varias ciudades texanas habían aprobado ordenanzas locales que obligaban a dar descansos pagados con agua y sombra en trabajos de construcción. Una ley estatal posterior restringió la facultad de las ciudades para imponer ese tipo de obligaciones laborales, y esas ordenanzas dejaron de operar como antes.',
          },
          {
            kind: 'text',
            text: 'Ahora bien, que no exista hoy una regla local de descansos <strong>no significa que el patrón pueda hacer lo que quiera</strong>. Siguen vigentes dos cosas muy concretas:',
          },
          {
            kind: 'list',
            items: [
              '<strong>La obligación federal general de seguridad.</strong> La ley federal exige a los patrones mantener un centro de trabajo libre de riesgos reconocidos que puedan causar muerte o daño grave. El calor extremo es un riesgo reconocido, y se han sancionado empresas por no atenderlo.',
              '<strong>La responsabilidad civil por negligencia.</strong> Aunque no exista una ordenanza que diga "descanso cada hora", un patrón que manda a trabajar bajo calor extremo sin agua, sin sombra y sin pausas puede responder por negligencia si alguien se lesiona.',
            ],
          },
          {
            kind: 'note',
            text: 'La ausencia de una regla específica no es una licencia. En un caso por negligencia lo que se juzga es si el patrón actuó como habría actuado alguien razonable ante un riesgo conocido, y el calor de Texas en agosto es un riesgo perfectamente conocido.',
          },
        ],
      },
      {
        icon: 'wallet',
        title: 'Las dos rutas de compensación en Texas',
        subtitle: 'Todo depende de si el patrón tiene o no workers comp',
        blocks: [
          {
            kind: 'text',
            text: 'Texas es un caso raro en el país: <strong>el seguro de compensación laboral es opcional</strong> para la mayoría de los patrones privados. Esa decisión de su empresa determina qué puede reclamar usted y cuánto.',
          },
          {
            kind: 'cards',
            items: [
              {
                title: 'Si el patrón SÍ tiene workers comp',
                desc: 'Cubre atención médica y una parte del salario perdido sin necesidad de probar culpa. A cambio, normalmente no se puede demandar al patrón por negligencia.',
              },
              {
                title: 'Si el patrón NO tiene (non-subscriber)',
                desc: 'Se le puede demandar directamente por negligencia. Y aquí está la clave: el patrón sin seguro pierde defensas clásicas, lo que suele hacer estos casos más favorables y de mayor valor.',
              },
            ],
          },
          {
            kind: 'text',
            text: 'Hay una tercera vía que se pasa por alto: si quien creó el riesgo fue <strong>otra empresa</strong> presente en la obra —el contratista general, otro subcontratista, el dueño del sitio—, puede existir una reclamación contra ese tercero aunque su patrón directo sí tenga seguro.',
          },
          {
            kind: 'note',
            text: 'Averiguar si su patrón tiene o no compensación laboral no es tarea suya: es de las primeras cosas que verifica un abogado, y cambia por completo la estrategia del caso.',
          },
        ],
      },
      {
        icon: 'shield',
        title: 'Su estatus migratorio no le quita estos derechos',
        subtitle: 'El miedo que hace que la gente no reclame',
        blocks: [
          {
            kind: 'text',
            text: 'Es la pregunta que aparece siempre, y la respuesta es clara: en Texas, <strong>un trabajador lesionado puede reclamar compensación sin importar su estatus migratorio</strong>. Ni la compensación laboral ni una demanda por negligencia exigen ser ciudadano o residente.',
          },
          {
            kind: 'list',
            items: [
              'Puede recibir <strong>atención médica</strong> y reclamar su costo.',
              'Puede reclamar <strong>salarios perdidos</strong> por el tiempo que no pudo trabajar.',
              'En una demanda por negligencia puede reclamar además <strong>dolor y sufrimiento</strong>.',
              'Las <strong>represalias</strong> por reportar una lesión o reclamar son ilegales.',
            ],
          },
          {
            kind: 'warning',
            text: 'Si su patrón lo amenaza con "llamar a inmigración" porque usted reportó una lesión, eso no es una advertencia: es una señal de alarma que debe contarle a un abogado el mismo día. Ese tipo de amenaza puede tener consecuencias legales para quien la hace.',
          },
        ],
      },
      {
        icon: 'clipboard',
        title: 'Qué hacer HOY si le pasó',
        subtitle: 'La evidencia desaparece en días',
        blocks: [
          {
            kind: 'steps',
            items: [
              '<strong>Busque atención médica</strong> y diga expresamente que la lesión ocurrió trabajando y por el calor. Que quede escrito en el expediente clínico.',
              '<strong>Reporte la lesión por escrito</strong> a su patrón. Un mensaje de texto o un correo sirven y dejan huella con fecha; una conversación de pasillo no.',
              '<strong>Anote los nombres de los testigos</strong> y sus teléfonos personales, no solo los de la empresa. Los compañeros cambian de obra y desaparecen.',
              '<strong>Tome fotos y video</strong> del lugar: dónde estaba el agua, si había sombra, la hora, el termómetro si lo hay.',
              '<strong>Guarde todo</strong>: recibos médicos, incapacidades, mensajes con supervisores, su horario y sus recibos de pago.',
              '<strong>No firme documentos en inglés</strong> que no entienda, ni acuerdos rápidos con la aseguradora o el patrón.',
              '<strong>Hable con un abogado</strong> antes de dar declaración grabada a cualquier aseguradora.',
            ],
          },
          {
            kind: 'note',
            text: 'Las cámaras de una obra suelen sobrescribirse en días o semanas, y los registros de temperatura y de asistencia se archivan. Un abogado puede exigir que se conserven, pero solo si lo pide a tiempo.',
          },
        ],
      },
      {
        icon: 'alert',
        title: 'Señales de que el patrón fue negligente',
        subtitle: 'Lo que un caso busca demostrar',
        blocks: [
          {
            kind: 'list',
            items: [
              'No había <strong>agua potable accesible</strong> cerca del área de trabajo.',
              'No había <strong>sombra ni área de descanso</strong> para bajar la temperatura.',
              'No se permitían <strong>pausas</strong>, o se descontaban del pago o de la producción.',
              'Se impusieron <strong>cuotas o ritmos imposibles</strong> en las horas de más calor.',
              'No hubo <strong>aclimatación</strong> para trabajadores nuevos o que volvían tras una ausencia; los primeros días son los de mayor riesgo.',
              'No hubo <strong>capacitación</strong> sobre síntomas de golpe de calor ni un plan de emergencia.',
              'Cuando alguien se sintió mal, la respuesta fue <strong>"aguántate"</strong> en lugar de parar y atenderlo.',
            ],
          },
          {
            kind: 'text',
            text: 'No hace falta que se cumplan todas. Cada una de estas circunstancias es un elemento que suma, y en conjunto construyen la imagen de un patrón que conocía el riesgo y decidió no gastar en prevenirlo.',
          },
        ],
      },
    ],
    faq: {
      title: 'Preguntas frecuentes',
      items: [
        {
          q: 'Me desmayé por el calor pero al día siguiente volví a trabajar. ¿Todavía tengo caso?',
          a: 'Puede tenerlo. Que haya vuelto a trabajar no borra la lesión ni la negligencia. Lo que sí complica el caso es la falta de registro médico: si no fue al doctor entonces, vaya ahora y explique con exactitud cuándo ocurrió y qué síntomas tuvo.',
        },
        {
          q: 'Mi patrón dice que no tiene seguro. ¿Eso me deja sin nada?',
          a: 'Al contrario. En Texas, un patrón sin compensación laboral puede ser demandado directamente por negligencia y pierde defensas legales que sí tendría si estuviera asegurado. Suelen ser casos de mayor valor, no de menor.',
        },
        {
          q: 'Me pagan en efectivo y no tengo contrato. ¿Cambia algo?',
          a: 'No le quita el derecho a reclamar. Sí hace más importante reunir prueba de que trabajaba ahí: mensajes con el supervisor, fotos en el sitio, testigos, transferencias, o el testimonio de compañeros.',
        },
        {
          q: '¿Cuánto tiempo tengo para reclamar?',
          a: 'Los plazos en Texas son estrictos y varían según la vía. Esperar es el error más común y el más caro, porque mientras tanto se pierden testigos, videos y registros. Consulte cuanto antes.',
        },
        {
          q: '¿Cuánto puede valer un caso de lesión por calor?',
          a: 'Depende de la gravedad de la lesión, del daño permanente, de los ingresos perdidos y de qué tan clara sea la negligencia. Un caso con daño renal permanente no se parece en nada a uno con recuperación completa en una semana. Un abogado se lo evalúa sin costo.',
        },
      ],
    },
    conclusion: {
      title: 'El calor de agosto no es una excusa: es un riesgo conocido',
      text: 'Los patrones de Texas saben perfectamente cuánto calor hace en agosto y qué le pasa a un cuerpo trabajando ocho horas bajo el sol sin agua ni sombra. Cuando alguien se lesiona en esas condiciones, no fue mala suerte: fue una decisión de no gastar en prevención.',
      advice: 'Si el calor lo lesionó este verano, la evaluación de su caso no le cuesta nada y no depende de su estatus migratorio.',
    },
    sources: {
      title: 'Fuentes y referencias',
      list: [
        'Ley federal de seguridad y salud ocupacional — cláusula de deber general del patrón',
        'OSHA — Prevención de enfermedades por calor en centros de trabajo',
        'Texas Department of Insurance, División de Compensación de Trabajadores — carácter opcional del seguro y patrones non-subscriber',
        'CDC / NIOSH — Signos de agotamiento por calor, golpe de calor y rabdomiólisis',
      ],
    },
    ui: ARTICLE_UI.es,
  },
  en: {
    metaTitle: 'Heat Stroke at Work: Texas Workers Rights',
    metaDesc:
      'If heat injured you working in Texas you may have a case, regardless of immigration status. The two compensation routes and what to do the same day.',
    title: 'Heat Stroke at Work: The Rights Texas Workers Are Never Told About',
    displayDate: 'Aug 06, 2026',
    readTime: '9 min',
    categoryLabel: 'Accidents',
    summary: {
      title: 'Initial Summary',
      text: 'Every summer in Texas, workers collapse on a roof, in a trench, or in a warehouse with no air conditioning, and are told to "tough it out" or "drink water and keep going." Heat stroke is not tiredness: it is a <strong>medical emergency</strong> that can cause permanent kidney damage or kill within hours. If it happened to you at work, you may well have a right to compensation — <strong>regardless of your immigration status</strong> — and the route depends on a detail almost nobody knows: whether your employer carries workers’ compensation insurance. Here are the two routes, what to do the same day, and what evidence disappears if you wait.',
    },
    intro: [
      'In Texas, heat is not a summer annoyance: it is a documented workplace hazard that injures and kills every year, and it hits hardest among people working outdoors in construction, roofing, landscaping, road work and fields, or indoors in warehouses and kitchens with no ventilation.',
      'On top of that reality sits a genuine legal confusion. For years some Texas cities had ordinances requiring paid water-and-shade breaks. A later state law limited local governments’ ability to impose that kind of rule, and since then many people believe they <strong>have no rights left at all</strong>. That is false.',
      'This article separates what changed from what still applies, and explains how a heat injury case is built in Texas: what to do the same day, what to document, and why immigration status does not take your rights away.',
    ],
    sections: [
      {
        icon: 'thermometer',
        title: 'This is not "handling the heat": these are real medical injuries',
        subtitle: 'What is happening to your body',
        blocks: [
          {
            kind: 'text',
            text: 'Confusing heat exhaustion with heat stroke is dangerous, because the second is an emergency. And there is a third, less known injury that appears often in physical work under extreme heat and can destroy the kidneys.',
          },
          {
            kind: 'cards',
            items: [
              {
                title: 'Heat exhaustion',
                desc: 'Heavy sweating, cool clammy skin, weakness, nausea, dizziness, cramps. Requires stopping immediately, shade, fluids and monitoring.',
              },
              {
                title: 'Heat stroke',
                desc: 'A medical emergency. Very high body temperature, confusion, slurred speech, seizures, hot skin that may stop sweating, loss of consciousness. Call 911.',
              },
              {
                title: 'Rhabdomyolysis',
                desc: 'Muscle breaks down and releases substances that damage the kidneys. Cola-colored urine, severe muscle pain, weakness. May require dialysis.',
              },
              {
                title: 'Delayed consequences',
                desc: 'Heat stroke can leave kidney, cardiac or neurological damage that appears or is confirmed weeks later. That is why medical follow-up matters.',
              },
            ],
          },
          {
            kind: 'warning',
            text: 'If a coworker is confused, stops sweating, or loses consciousness in the heat, do not take them "to rest in the car." Call 911 and start cooling them. How long it takes to bring body temperature down determines whether damage becomes permanent.',
          },
        ],
      },
      {
        icon: 'balance',
        title: 'Is there a break law in Texas? What changed and what remains',
        subtitle: 'The confusion that leaves people believing they have no rights',
        blocks: [
          {
            kind: 'text',
            text: 'Several Texas cities had passed local ordinances requiring paid water-and-shade breaks on construction work. A later state law restricted cities’ authority to impose that kind of employment obligation, and those ordinances stopped operating as before.',
          },
          {
            kind: 'text',
            text: 'That said, the absence of a local break rule today <strong>does not mean an employer can do whatever it wants</strong>. Two very concrete things still apply:',
          },
          {
            kind: 'list',
            items: [
              '<strong>The general federal safety duty.</strong> Federal law requires employers to keep a workplace free from recognized hazards likely to cause death or serious harm. Extreme heat is a recognized hazard, and companies have been cited for failing to address it.',
              '<strong>Civil liability for negligence.</strong> Even without an ordinance saying "a break every hour," an employer who sends people to work in extreme heat with no water, no shade and no pauses can be liable in negligence if someone is injured.',
            ],
          },
          {
            kind: 'note',
            text: 'The absence of a specific rule is not a license. A negligence case asks whether the employer acted as a reasonable person would in the face of a known risk — and Texas heat in August is a thoroughly known risk.',
          },
        ],
      },
      {
        icon: 'wallet',
        title: 'The two compensation routes in Texas',
        subtitle: 'Everything turns on whether the employer carries workers’ comp',
        blocks: [
          {
            kind: 'text',
            text: 'Texas is unusual in the country: <strong>workers’ compensation insurance is optional</strong> for most private employers. Your company’s choice determines what you can claim and how much.',
          },
          {
            kind: 'cards',
            items: [
              {
                title: 'If the employer DOES have workers’ comp',
                desc: 'It covers medical care and part of lost wages without proving fault. In exchange, you generally cannot sue the employer for negligence.',
              },
              {
                title: 'If the employer does NOT (non-subscriber)',
                desc: 'They can be sued directly for negligence. And here is the key: an uninsured employer loses classic legal defenses, which tends to make these cases stronger and more valuable.',
              },
            ],
          },
          {
            kind: 'text',
            text: 'There is a third route people overlook: if the risk was created by <strong>another company</strong> on site — the general contractor, another subcontractor, the property owner — there may be a claim against that third party even if your direct employer is insured.',
          },
          {
            kind: 'note',
            text: 'Finding out whether your employer carries comp is not your job: it is one of the first things an attorney verifies, and it changes the entire case strategy.',
          },
        ],
      },
      {
        icon: 'shield',
        title: 'Your immigration status does not take these rights away',
        subtitle: 'The fear that keeps people from claiming',
        blocks: [
          {
            kind: 'text',
            text: 'It is the question that always comes up, and the answer is clear: in Texas, <strong>an injured worker can claim compensation regardless of immigration status</strong>. Neither workers’ compensation nor a negligence lawsuit requires being a citizen or resident.',
          },
          {
            kind: 'list',
            items: [
              'You can receive <strong>medical care</strong> and claim its cost.',
              'You can claim <strong>lost wages</strong> for the time you could not work.',
              'In a negligence case you can also claim <strong>pain and suffering</strong>.',
              '<strong>Retaliation</strong> for reporting an injury or making a claim is illegal.',
            ],
          },
          {
            kind: 'warning',
            text: 'If your employer threatens to "call immigration" because you reported an injury, that is not a warning: it is a red flag to tell an attorney the same day. That kind of threat can carry legal consequences for the person making it.',
          },
        ],
      },
      {
        icon: 'clipboard',
        title: 'What to do TODAY if it happened to you',
        subtitle: 'Evidence disappears within days',
        blocks: [
          {
            kind: 'steps',
            items: [
              '<strong>Get medical care</strong> and say explicitly that the injury happened at work and from the heat. Make sure it is written in the medical record.',
              '<strong>Report the injury in writing</strong> to your employer. A text or an email works and leaves a dated trail; a hallway conversation does not.',
              '<strong>Write down witnesses’ names</strong> and personal phone numbers, not just company ones. Coworkers move to other jobs and vanish.',
              '<strong>Take photos and video</strong> of the site: where the water was, whether there was shade, the time, the thermometer if there is one.',
              '<strong>Keep everything</strong>: medical bills, work restrictions, messages with supervisors, your schedule and your pay stubs.',
              '<strong>Do not sign documents in English</strong> you do not understand, nor quick settlements with the insurer or employer.',
              '<strong>Talk to an attorney</strong> before giving a recorded statement to any insurance company.',
            ],
          },
          {
            kind: 'note',
            text: 'Jobsite cameras are usually overwritten within days or weeks, and temperature and attendance logs get archived. An attorney can demand they be preserved — but only if the request comes in time.',
          },
        ],
      },
      {
        icon: 'alert',
        title: 'Signs the employer was negligent',
        subtitle: 'What a case sets out to prove',
        blocks: [
          {
            kind: 'list',
            items: [
              'There was no <strong>accessible drinking water</strong> near the work area.',
              'There was no <strong>shade or rest area</strong> to cool down.',
              '<strong>Breaks</strong> were not allowed, or were deducted from pay or production.',
              '<strong>Impossible quotas or pace</strong> were imposed during the hottest hours.',
              'There was no <strong>acclimatization</strong> for new workers or those returning after time away; the first days carry the highest risk.',
              'There was no <strong>training</strong> on heat stroke symptoms and no emergency plan.',
              'When someone felt ill, the answer was <strong>"tough it out"</strong> instead of stopping and helping.',
            ],
          },
          {
            kind: 'text',
            text: 'Not all of them need to be true. Each of these is an element that adds up, and together they build the picture of an employer who knew the risk and chose not to spend on preventing it.',
          },
        ],
      },
    ],
    faq: {
      title: 'Frequently asked questions',
      items: [
        {
          q: 'I passed out from the heat but went back to work the next day. Do I still have a case?',
          a: 'You may. Returning to work does not erase the injury or the negligence. What does complicate a case is the lack of a medical record: if you did not see a doctor then, go now and explain exactly when it happened and what symptoms you had.',
        },
        {
          q: 'My employer says they have no insurance. Does that leave me with nothing?',
          a: 'The opposite. In Texas, an employer without workers’ compensation can be sued directly for negligence and loses legal defenses they would have if insured. These tend to be higher-value cases, not lower.',
        },
        {
          q: 'I get paid in cash and have no contract. Does that change anything?',
          a: 'It does not remove your right to claim. It does make it more important to gather proof that you worked there: messages with the supervisor, photos on site, witnesses, transfers, or coworkers’ testimony.',
        },
        {
          q: 'How long do I have to file a claim?',
          a: 'Texas deadlines are strict and vary by route. Waiting is the most common and most expensive mistake, because witnesses, video and records disappear meanwhile. Consult as soon as possible.',
        },
        {
          q: 'What can a heat injury case be worth?',
          a: 'It depends on the severity, permanent damage, lost income, and how clear the negligence is. A case with permanent kidney damage looks nothing like one with full recovery in a week. An attorney will evaluate it at no cost.',
        },
      ],
    },
    conclusion: {
      title: 'August heat is not an excuse: it is a known hazard',
      text: 'Texas employers know exactly how hot August gets and what happens to a body working eight hours in the sun with no water and no shade. When someone is injured in those conditions, it was not bad luck: it was a decision not to spend on prevention.',
      advice: 'If heat injured you this summer, the evaluation of your case costs nothing and does not depend on your immigration status.',
    },
    sources: {
      title: 'Sources and references',
      list: [
        'Federal occupational safety and health law — employer general duty clause',
        'OSHA — Heat illness prevention in the workplace',
        'Texas Department of Insurance, Division of Workers’ Compensation — optional coverage and non-subscriber employers',
        'CDC / NIOSH — Signs of heat exhaustion, heat stroke and rhabdomyolysis',
      ],
    },
    ui: ARTICLE_UI.en,
  },
};

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const currentLang: 'es' | 'en' = lang === 'en' ? 'en' : 'es';
  return buildArticleMetadata({
    slug: SLUG,
    lang: currentLang,
    content: content[currentLang],
    image: IMAGE,
    isoDate: ISO_DATE,
  });
}

export default async function Page({ params }: Props) {
  const { lang } = await params;
  const currentLang: 'es' | 'en' = lang === 'en' ? 'en' : 'es';

  return (
    <BlogArticleLayout
      slug={SLUG}
      lang={currentLang}
      content={content[currentLang]}
      image={IMAGE}
      imageAlt={
        currentLang === 'es'
          ? 'Trabajador con golpe de calor en una obra en Texas'
          : 'Worker suffering heat illness on a Texas jobsite'
      }
      isoDate={ISO_DATE}
      servicePath="/servicios/accidentes"
      trackerCategory="Accidentes"
    />
  );
}

export function generateStaticParams() {
  return [{ lang: 'es' }, { lang: 'en' }];
}
