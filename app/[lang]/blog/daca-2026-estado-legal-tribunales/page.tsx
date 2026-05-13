import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';
import {
  Calendar, Clock, ArrowLeft, Sparkles, CheckCircle2, AlertCircle,
  Lightbulb, TrendingUp, MessageCircle,
  Send, ArrowUpRight, ShieldCheck, FileText, Gavel,
  Users, AlertTriangle, Scale
} from 'lucide-react';

// IMPORTACIONES
import { generateBreadcrumbSchema } from '../../../lib/breadcrumbSchema';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import BlogBackground from '../../../components/blogs/BlogBackground';
import ShareButtons from '../../../components/blogs/ShareButtons';
import ContactForm from '../../../components/ContactForm';
import BlogTracker from '../../../components/blogs/BlogTracker';
import ReadingProgress from '../../../components/blogs/ReadingProgress';
import RelatedContent from '../../../components/blogs/RelatedContent';
import { getRelatedArticles } from '../../../lib/blogRelations';
import BlogSchema from '../../../components/blogs/BlogSchema';


const SITE_URL = 'https://www.manuelsolis.com';

const IMAGES = {
  article: '/blog/blog_31/MAY_B1.png',
  inside1: '/blog/blog_31/MAY_B1.png',
  inside2: '/blog/blog_31/MAY_B1.png',
  author: '/abogado-manuel-solis.jpg'
};

const blogContent = {
  es: {
    metaTitle: 'DACA 2026: qué está pasando, qué puedes hacer y qué esperar | Bufete Manuel Solís',
    metaDesc: 'El estado legal de DACA en 2026, explicado en español: qué dicen los tribunales, si puedes renovar, qué pasa si venció tu permiso y qué hacer ahora mismo.',
    ui: {
      back: 'Volver al blog',
      share: 'Compartir artículo',
      writtenBy: 'Escrito por',
      published: 'Publicado',
      readTime: '11 min de lectura',
      tags: 'DACA 2026',
      date: '13 May, 2026',
      time: '11 min',
      authorRole: 'Fundador & Abogado Principal',
      ctaButton: 'Habla con un Abogado de DACA Ahora'
    },
    title: 'DACA 2026: ¿qué pasa con mi caso mientras sigue en los tribunales?',
    summary: {
      title: 'Resumen inicial',
      text: 'DACA <strong>no está cancelado</strong>, pero tampoco está completamente a salvo. Mientras el caso <em>Texas v. USA</em> avanza por los tribunales, USCIS sigue aceptando <strong>renovaciones</strong> de beneficiarios previos, pero <strong>no nuevas aplicaciones</strong>. En este artículo te explicamos en lenguaje claro qué dicen las cortes, si puedes renovar, qué pasa si tu permiso ya venció y qué opciones tienes si DACA desaparece.'
    },
    intro: [
      'Si tienes DACA, eres familiar de un dreamer, o eres empleador de alguien con DACA, este 2026 está siendo uno de los años más confusos del programa. Las noticias cambian semana a semana: un tribunal dice una cosa, otro dice algo distinto, y muchos beneficiarios nos preguntan lo mismo: <strong>"¿Sigo siendo legal? ¿Puedo renovar? ¿Qué hago si se me venció?"</strong>.',
      'La realidad: DACA sigue vigente para quienes ya lo tenían, pero <strong>su futuro depende de decisiones que todavía no se han tomado</strong>. El programa lleva más de una década atrapado entre el Congreso, el Ejecutivo y los tribunales federales — y cada beneficiario debería tener un plan B.',
      'En esta guía te explicamos, sin alarmismos pero sin endulzar, qué está pasando con DACA en 2026 y qué <strong>puedes hacer hoy</strong> para proteger tu estatus, tu trabajo y a tu familia.'
    ],
    sections: {
      legalStatus: {
        title: '¿Cuál es el estado legal de DACA en 2026?',
        quote: 'DACA no está cancelado, pero sigue bajo litigio activo.',
        text: 'En enero de 2025, la <strong>Corte de Apelaciones del Quinto Circuito</strong> volvió a declarar que DACA fue creado de manera inválida por el Ejecutivo en 2012, pero permitió que <strong>las renovaciones de beneficiarios actuales continúen</strong> mientras el caso avanza. Esto es lo importante:',
        list: [
          'El caso original — Texas v. USA — fue iniciado por varios estados que argumentan que el programa nunca debió crearse sin aprobación del Congreso.',
          'Las cortes han dicho que el programa es legalmente cuestionable, pero también que cancelarlo de golpe causaría un daño masivo a beneficiarios y familias.',
          'Mientras el caso siga subiendo en apelaciones (y probablemente termine en la Corte Suprema), USCIS sigue procesando renovaciones.',
          'Las nuevas solicitudes — de personas que nunca han tenido DACA — siguen bloqueadas desde julio de 2021 por orden judicial.'
        ],
        note: 'En palabras simples: si ya tienes DACA, puedes renovarlo. Si nunca lo has tenido, hoy no puedes aplicar — aunque puedas demostrar que cumples todos los requisitos originales.'
      },
      renew: {
        title: '¿Puedo renovar mi DACA ahora mismo?',
        subtitle: 'Sí, si eres beneficiario previo',
        text: 'Si alguna vez te aprobaron DACA, puedes presentar tu renovación. USCIS continúa recibiendo y aprobando solicitudes de renovación bajo el formulario <strong>I-821D</strong> (junto con el I-765 para el permiso de trabajo y el I-765WS).',
        keyPoints: {
          title: 'Lo que necesitas saber para renovar',
          list: [
            'Formulario principal: I-821D (Consideración de Acción Diferida).',
            'Permiso de trabajo: I-765 + Hoja de Trabajo I-765WS.',
            'Costo combinado: actualmente $555 dólares ($85 DACA + $470 EAD).',
            'Tiempo recomendado: presentar entre 120 y 150 días antes del vencimiento.',
            'Documentos clave: copia de tu DACA anterior, EAD anterior, identificación con foto y prueba de residencia continua si la has cambiado.'
          ]
        },
        warning: 'No esperes al último momento. Si tu DACA vence en menos de 60 días, USCIS podría procesarte como solicitud tardía, y eso significa <strong>quedarte sin permiso de trabajo</strong> mientras esperas.',
        note: 'Renovar a tiempo es la diferencia entre seguir trabajando legalmente o tener que parar de un día para otro.'
      },
      expired: {
        title: '¿Qué pasa si mi DACA venció y no lo renové?',
        subtitle: 'Consecuencias reales y opciones',
        text: 'Si tu DACA venció hace meses o años, todavía puedes intentar una renovación tardía — pero las consecuencias mientras tanto son serias y debes entenderlas:',
        consequences: [
          'Pérdida inmediata del permiso de trabajo (EAD). Trabajar sin autorización puede afectar futuras solicitudes migratorias.',
          'Exposición a una eventual orden de deportación si tienes encuentros con ICE o policía local que coopere con migración.',
          'Pérdida de la licencia de conducir en estados que la ligan al estatus migratorio.',
          'Pérdida de acceso a beneficios estatales o universitarios que requieren DACA activo.'
        ],
        options: {
          title: 'Tus opciones si tu DACA venció',
          list: [
            'Renovación tardía: USCIS todavía acepta renovaciones tardías de beneficiarios previos en la mayoría de los casos.',
            'Revisar otras opciones migratorias antes de renovar (a veces conviene un análisis completo antes de presentar).',
            'Solicitar tu récord migratorio vía FOIA si dudas qué tiene USCIS sobre ti.'
          ]
        },
        note: 'Cada caso vencido es distinto. Antes de mandar el paquete, conviene revisar tu historial completo — un antecedente penal nuevo o un viaje no autorizado pueden cambiar la estrategia.'
      },
      newApplications: {
        title: '¿USCIS sigue aceptando nuevas aplicaciones de DACA?',
        subtitle: 'No, y esto es lo que necesitas entender',
        text: 'Desde <strong>julio de 2021</strong>, USCIS no procesa solicitudes <em>iniciales</em> de DACA por orden de un juez federal en Texas. Esto significa que aunque cumplas con todos los requisitos originales:',
        list: [
          'Haber llegado a EE. UU. antes de los 16 años.',
          'Haber vivido en EE. UU. continuamente desde junio de 2007.',
          'Tener menos de 31 años al 15 de junio de 2012.',
          'Estar estudiando, haberte graduado o ser veterano honorablemente dado de baja.',
          'No tener antecedentes penales graves.'
        ],
        reality: 'Tu solicitud puede ser <strong>recibida</strong>, pero <strong>no aprobada</strong>. USCIS la mantiene en espera. Para que se procesen nuevas solicitudes, se necesitaría:',
        whatNeeded: [
          'Que el Congreso apruebe una ley que regularice el programa (DREAM Act u otra legislación).',
          'Que la Corte Suprema decida a favor del Gobierno y permita reabrir nuevas solicitudes.',
          'Una nueva regulación administrativa que sobreviva el escrutinio judicial.'
        ],
        note: 'Hoy, presentar una nueva solicitud es básicamente quemar el dinero del trámite. Si nunca has tenido DACA, conviene explorar <strong>otras vías migratorias</strong> antes que insistir con un programa que no puede aprobarte.'
      },
      supremeCourt: {
        title: '¿Qué puede pasar si la Corte Suprema interviene?',
        subtitle: 'Tres escenarios posibles',
        text: 'Es muy probable que el caso Texas v. USA termine en la Corte Suprema de Estados Unidos en los próximos años. Estos son los tres escenarios que estamos analizando para nuestros clientes:',
        scenarios: [
          {
            title: 'Escenario 1: DACA declarado inválido',
            text: 'La Corte Suprema podría confirmar que el programa nunca debió crearse sin autorización del Congreso. En ese caso, podrían terminar las renovaciones, expirar gradualmente los permisos de trabajo activos y dejar a unos 530,000 beneficiarios sin protección.'
          },
          {
            title: 'Escenario 2: DACA confirmado o protegido temporalmente',
            text: 'La Corte podría permitir que el programa siga operando hasta que el Congreso actúe, manteniendo el statu quo de "solo renovaciones".'
          },
          {
            title: 'Escenario 3: El Congreso aprueba legislación',
            text: 'Sería el mejor escenario: una ley que convierta DACA en un camino real a la residencia. Ha estado sobre la mesa por más de una década, pero políticamente nunca ha cuajado.'
          }
        ],
        note: 'Esperar y rezar no es una estrategia legal. Quienes tienen un plan B — matrimonio, visa U, VAWA, asilo, ajuste laboral con 245(i) — están mucho mejor parados ante cualquier resultado.'
      },
      alternatives: {
        title: '¿Qué otras opciones tienen los dreamers si DACA desaparece?',
        subtitle: 'No es desesperanzador — hay salidas',
        text: 'Una de las cosas más importantes que decimos a nuestros clientes con DACA es: <strong>no eres "solo DACA"</strong>. Tu historia personal puede abrir otras puertas migratorias. Estas son las opciones más comunes que revisamos:',
        list: [
          {
            title: 'Matrimonio con ciudadano estadounidense',
            text: 'Si entraste con visa o inspección, podrías ajustar estatus directamente. Si entraste "por el cerro", el perdón I-601A puede abrir el camino.'
          },
          {
            title: 'Visa U (víctimas de crimen)',
            text: 'Si fuiste víctima de un crimen calificado (violencia doméstica, asalto, robo agravado, fraude grave) y cooperaste con la policía, podrías calificar.'
          },
          {
            title: 'VAWA',
            text: 'Si tu pareja ciudadana o residente te ha maltratado, puedes autopetitarte sin que el agresor se entere.'
          },
          {
            title: 'Cancelación de Deportación (Ley de los 10 años)',
            text: 'Si llevas más de 10 años en EE. UU., tienes familiares ciudadanos o residentes que sufrirían "hardship excepcional", y buen carácter moral, podrías calificar — pero solo en corte de inmigración.'
          },
          {
            title: 'Asilo',
            text: 'Si tu país de origen te persigue por motivos protegidos, todavía existe esa puerta — aunque las reglas se han endurecido.'
          },
          {
            title: 'Petición laboral (EB-3) con Ley 245(i)',
            text: 'Si tu patrón quiere pedirte la residencia y tienes derecho al 245(i) por una petición vieja, puede ser una vía real.'
          }
        ],
        note: 'Cada vía requiere análisis individual. No todas funcionan para todos, pero <strong>casi siempre hay algo</strong> que revisar antes de asumir que no hay salida.'
      },
      whyLawyer: {
        title: '¿Por qué necesito un abogado para mi renovación de DACA?',
        text: 'Muchos beneficiarios renuevan solos porque "el formulario es fácil". Lo entendemos. Pero un abogado con experiencia en DACA revisa cosas que el formulario no pregunta directamente:',
        list: [
          'Errores en preguntas sobre antecedentes (un DUI menor, una citación, un cargo retirado).',
          'Viajes al extranjero previos (incluso con Advance Parole pueden complicar futuros ajustes).',
          'Inconsistencias entre lo que pusiste en aplicaciones anteriores y lo que pondrías hoy.',
          'Otras opciones migratorias paralelas que conviene activar al mismo tiempo.',
          'Riesgo de que tu renovación dispare una revisión más profunda por algo que olvidaste mencionar.'
        ],
        note: 'Un buen abogado de DACA no solo "llena papeles". Identifica riesgos <strong>antes</strong> de que USCIS los encuentre — y eso puede salvar tu caso.'
      },
      conclusion: {
        title: 'Conclusión',
        text: 'DACA en 2026 sigue vivo, pero también sigue en el limbo. Si tienes el programa, <strong>renueva a tiempo y no dependas solo de él</strong>. Si lo perdiste, todavía hay opciones para volver a entrar. Y si nunca lo has tenido, hay otras vías legales que un análisis serio puede destapar.',
        advice: 'No te quedes esperando una noticia que tal vez nunca llegue. Habla con un abogado, revisa tu caso completo y arma un plan que no dependa de lo que decidan los tribunales el próximo año.'
      },
      sources: {
        title: 'Fuentes Citadas',
        list: [
          'USCIS – Consideración de Acción Diferida para los Llegados en la Infancia (DACA)',
          'Corte de Apelaciones del Quinto Circuito – Texas v. United States (2025)',
          'American Immigration Council – DACA at a Glance',
          'Migration Policy Institute – Profile of the Unauthorized Population: DACA-Eligible'
        ]
      }
    }
  },
  en: {
    metaTitle: 'DACA 2026: What\'s Happening, What You Can Do, and What to Expect | Manuel Solis Law',
    metaDesc: 'DACA\'s legal status in 2026, explained: what the courts are saying, whether you can renew, what happens if your permit expired, and what to do right now.',
    ui: {
      back: 'Back to blog',
      share: 'Share article',
      writtenBy: 'Written by',
      published: 'Published',
      readTime: '11 min read',
      tags: 'DACA 2026',
      date: 'May 13, 2026',
      time: '11 min',
      authorRole: 'Founder & Lead Attorney',
      ctaButton: 'Talk to a DACA Attorney Now'
    },
    title: 'DACA 2026: What Happens to My Case While It\'s Still in the Courts?',
    summary: {
      title: 'Initial Summary',
      text: 'DACA is <strong>not canceled</strong> — but it isn\'t fully safe either. While <em>Texas v. USA</em> moves through the courts, USCIS continues accepting <strong>renewals</strong> for prior beneficiaries, but <strong>not new applications</strong>. This guide explains in plain English what the courts have said, whether you can renew, what happens if your DACA expired, and what options you have if DACA disappears.'
    },
    intro: [
      'If you have DACA, are family to a dreamer, or employ one, 2026 has been one of the most confusing years of the program. The news shifts week to week — one court says one thing, another says something else, and beneficiaries keep asking us the same questions: <strong>"Am I still legal? Can I renew? What do I do if mine expired?"</strong>.',
      'The reality: DACA is still in force for those who already had it, but <strong>its future depends on decisions that have not yet been made</strong>. The program has been stuck for over a decade between Congress, the Executive, and the federal courts — and every beneficiary should have a Plan B.',
      'In this guide we explain, without panic but without sugarcoating, what is happening with DACA in 2026 and what you <strong>can do today</strong> to protect your status, your job, and your family.'
    ],
    sections: {
      legalStatus: {
        title: 'What Is DACA\'s Legal Status in 2026?',
        quote: 'DACA is not canceled — but it remains in active litigation.',
        text: 'In January 2025, the <strong>Fifth Circuit Court of Appeals</strong> once again ruled that DACA was created improperly by the Executive in 2012, but allowed <strong>renewals for current beneficiaries to continue</strong> while the case moves forward. The key points:',
        list: [
          'The original case — Texas v. USA — was brought by several states arguing the program never should have been created without Congressional approval.',
          'The courts have said the program is legally questionable, but that ending it abruptly would cause massive harm to beneficiaries and families.',
          'While the case keeps moving up on appeal (and likely ends up at the Supreme Court), USCIS continues processing renewals.',
          'Initial applications — from people who have never had DACA — remain blocked since July 2021 by court order.'
        ],
        note: 'In plain terms: if you already have DACA, you can renew. If you have never had it, you cannot apply today — even if you meet every original requirement.'
      },
      renew: {
        title: 'Can I Renew My DACA Right Now?',
        subtitle: 'Yes, if you are a prior beneficiary',
        text: 'If you have ever been approved for DACA, you can file a renewal. USCIS continues to receive and approve renewal applications under <strong>Form I-821D</strong> (alongside the I-765 for the work permit and the I-765WS).',
        keyPoints: {
          title: 'What you need to know to renew',
          list: [
            'Primary form: I-821D (Consideration of Deferred Action).',
            'Work permit: I-765 + Form I-765WS Worksheet.',
            'Combined cost: currently $555 ($85 DACA + $470 EAD).',
            'Recommended timing: file 120 to 150 days before expiration.',
            'Key documents: copy of prior DACA approval, prior EAD, photo ID, and proof of continuous residence if you have moved.'
          ]
        },
        warning: 'Do not wait until the last minute. If your DACA expires in less than 60 days, USCIS may treat your case as a late filing — meaning you could <strong>lose your work permit</strong> while you wait.',
        note: 'Renewing on time is the difference between continuing to work legally or stopping overnight.'
      },
      expired: {
        title: 'What Happens If My DACA Expired and I Did Not Renew?',
        subtitle: 'Real consequences and your options',
        text: 'If your DACA expired months or years ago, you can still try a late renewal — but the consequences in the meantime are serious and you need to understand them:',
        consequences: [
          'Immediate loss of the work permit (EAD). Working without authorization can affect future immigration applications.',
          'Exposure to a potential removal order if you have contact with ICE or local police that cooperate with immigration.',
          'Loss of driver\'s license in states that tie it to immigration status.',
          'Loss of access to state or university benefits that require active DACA.'
        ],
        options: {
          title: 'Your options if your DACA expired',
          list: [
            'Late renewal: USCIS still accepts late renewals from prior beneficiaries in most cases.',
            'Review other immigration options before renewing (sometimes a full analysis before filing is the smart move).',
            'Request your immigration record via FOIA if you are unsure what USCIS has on file about you.'
          ]
        },
        note: 'Every expired case is different. Before sending the package, it is worth reviewing your complete history — a new criminal record or an unauthorized trip can change the strategy.'
      },
      newApplications: {
        title: 'Is USCIS Still Accepting New DACA Applications?',
        subtitle: 'No — and here is what you need to understand',
        text: 'Since <strong>July 2021</strong>, USCIS has not processed <em>initial</em> DACA requests, due to a federal court order out of Texas. That means even if you meet every original requirement:',
        list: [
          'You arrived in the U.S. before age 16.',
          'You have lived in the U.S. continuously since June 2007.',
          'You were under 31 on June 15, 2012.',
          'You are in school, graduated, or were honorably discharged.',
          'You have no serious criminal record.'
        ],
        reality: 'Your application can be <strong>received</strong> but <strong>not approved</strong>. USCIS holds it. To restart new approvals would require:',
        whatNeeded: [
          'Congress passing a law that legalizes the program (DREAM Act or similar).',
          'The Supreme Court ruling in the government\'s favor and allowing new applications.',
          'A new administrative rule that survives judicial review.'
        ],
        note: 'Today, filing a new DACA application is basically burning the filing fee. If you have never had DACA, it is worth exploring <strong>other immigration paths</strong> rather than betting on a program that cannot approve you.'
      },
      supremeCourt: {
        title: 'What Could Happen If the Supreme Court Steps In?',
        subtitle: 'Three possible scenarios',
        text: 'Texas v. USA is very likely to reach the U.S. Supreme Court in the coming years. These are the three scenarios we walk through with clients:',
        scenarios: [
          {
            title: 'Scenario 1: DACA declared invalid',
            text: 'The Supreme Court could confirm the program never should have been created without Congressional authorization. Renewals could end, active work permits could gradually expire, and roughly 530,000 beneficiaries could be left without protection.'
          },
          {
            title: 'Scenario 2: DACA confirmed or temporarily protected',
            text: 'The Court could let the program continue until Congress acts, keeping the current "renewals only" status quo.'
          },
          {
            title: 'Scenario 3: Congress passes legislation',
            text: 'The best-case scenario: a law turning DACA into a real path to residency. It has been on the table for over a decade but has never made it through politically.'
          }
        ],
        note: 'Waiting and praying is not a legal strategy. Beneficiaries with a Plan B — marriage, U visa, VAWA, asylum, employment-based adjustment with 245(i) — are much better positioned for any outcome.'
      },
      alternatives: {
        title: 'What Other Options Do Dreamers Have If DACA Disappears?',
        subtitle: 'It is not hopeless — there are paths',
        text: 'One of the most important things we tell DACA clients is: <strong>you are not "only DACA"</strong>. Your personal story can open other doors. These are the options we most commonly review:',
        list: [
          {
            title: 'Marriage to a U.S. citizen',
            text: 'If you entered with a visa or inspection, you may adjust status directly. If you entered without inspection, the I-601A waiver can open the path.'
          },
          {
            title: 'U Visa (crime victims)',
            text: 'If you were the victim of a qualifying crime (domestic violence, assault, aggravated robbery, serious fraud) and cooperated with police, you may qualify.'
          },
          {
            title: 'VAWA',
            text: 'If your citizen or resident partner has abused you, you can self-petition without the abuser knowing.'
          },
          {
            title: 'Cancellation of Removal (10-Year Rule)',
            text: 'If you have more than 10 years in the U.S., citizen or resident relatives who would suffer "exceptional hardship," and good moral character, you may qualify — but only in immigration court.'
          },
          {
            title: 'Asylum',
            text: 'If your home country persecutes you on a protected ground, that door is still open — though the rules have tightened.'
          },
          {
            title: 'Employer petition (EB-3) with Section 245(i)',
            text: 'If your employer wants to sponsor you and you have 245(i) eligibility from an old petition, this can be a real path.'
          }
        ],
        note: 'Each path requires individual analysis. Not every option works for everyone, but <strong>there is almost always something</strong> worth reviewing before assuming there is no way out.'
      },
      whyLawyer: {
        title: 'Why Do I Need a Lawyer for My DACA Renewal?',
        text: 'Many beneficiaries renew on their own because "the form is easy." We get it. But an experienced DACA attorney reviews things the form does not directly ask about:',
        list: [
          'Errors on background questions (a minor DUI, a citation, a dismissed charge).',
          'Past foreign travel (even with Advance Parole, it can complicate future adjustments).',
          'Inconsistencies between what you said in prior applications and what you would say today.',
          'Other immigration options worth running in parallel.',
          'The risk that your renewal triggers a deeper review because of something you forgot to mention.'
        ],
        note: 'A good DACA attorney does more than "fill out paperwork." They spot risks <strong>before</strong> USCIS does — and that can save your case.'
      },
      conclusion: {
        title: 'Conclusion',
        text: 'DACA in 2026 is still alive — but still in limbo. If you have it, <strong>renew on time and do not rely on it alone</strong>. If you lost it, there are still options to come back. And if you never had it, a serious analysis can uncover other legal paths.',
        advice: 'Do not just wait for news that may never come. Talk to an attorney, review your full case, and build a plan that does not depend on what the courts decide next year.'
      },
      sources: {
        title: 'Sources Cited',
        list: [
          'USCIS – Consideration of Deferred Action for Childhood Arrivals (DACA)',
          'Fifth Circuit Court of Appeals – Texas v. United States (2025)',
          'American Immigration Council – DACA at a Glance',
          'Migration Policy Institute – Profile of the Unauthorized Population: DACA-Eligible'
        ]
      }
    }
  }
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const t = blogContent[lang as 'es' | 'en'] || blogContent.es;

  const imageUrl = `${SITE_URL}${IMAGES.article}`;

  return {
    title: { absolute: t.metaTitle },
    description: t.metaDesc,
    openGraph: {
      title: t.title,
      description: t.metaDesc,
      url: `${SITE_URL}/${lang}/blog/daca-2026-estado-legal-tribunales`,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: t.title,
        },
      ],
      type: 'article',
      publishedTime: '2026-05-13T08:00:00.000Z',
      authors: ['Manuel Solís'],
      section: 'Inmigración',
      tags: ['DACA','DACA 2026','Dreamers','Renovación DACA','Texas v USA','Inmigración 2026'],
    },
    twitter: {
      card: 'summary_large_image',
      title: t.title,
      description: t.metaDesc,
      images: [imageUrl],
      creator: '@AbogadoMSolis',
    },
    alternates: {
      canonical: `${SITE_URL}/${lang}/blog/daca-2026-estado-legal-tribunales`,
      languages: {
        'es': `${SITE_URL}/es/blog/daca-2026-estado-legal-tribunales`,
        'en': `${SITE_URL}/en/blog/daca-2026-estado-legal-tribunales`,
        'x-default': `${SITE_URL}/es/blog/daca-2026-estado-legal-tribunales`,
      },
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = blogContent[lang as 'es' | 'en'] || blogContent.es;

  const breadcrumbData = generateBreadcrumbSchema([
    { name: lang === 'es' ? 'Inicio' : 'Home', url: `/${lang}` },
    { name: 'Blog', url: `/${lang}/blog` },
    { name: t.title, url: `/${lang}/blog/daca-2026-estado-legal-tribunales` },
  ]);

  return (
    <>
      <BlogSchema
        title={blogContent[lang as 'es' | 'en']?.metaTitle || blogContent.es.metaTitle}
        description={blogContent[lang as 'es' | 'en']?.metaDesc || blogContent.es.metaDesc}
        slug="daca-2026-estado-legal-tribunales"
        date="2026-05-13"
        image={IMAGES.article}
        lang={lang as string}
        readTime="11"
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />

      <BlogTracker
        title={t.title}
        author="Manuel Solís"
        category="Inmigración"
      />

      <ReadingProgress />

      <div className={`min-h-screen bg-[#001540] text-white selection:bg-[#B2904D] selection:text-[#001540]`}>

        <Header />

        <BlogBackground />

        <main className="relative z-10 pt-32 pb-20">

          {/* HERO */}
          <section className="container mx-auto px-4 md:px-6 lg:px-8 mb-16">

            <div className="mb-10">
              <Link href={`/${lang}/blog`} className="inline-flex items-center gap-2 text-white/60 hover:text-[#B2904D] transition-colors group text-sm font-medium uppercase tracking-wider">
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                {t.ui.back}
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-4 mb-6 animate-fade-in-up">
              <span className="px-3 py-1 bg-[#B2904D] text-[#001540] text-xs font-bold uppercase tracking-widest rounded-full">
                {t.ui.tags}
              </span>
              <span className="flex items-center gap-2 text-white/60 text-sm">
                <Calendar size={14} /> {t.ui.date}
              </span>
              <span className="flex items-center gap-2 text-white/60 text-sm">
                <Clock size={14} /> {t.ui.time}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif font-medium text-white leading-[1.1] mb-8 max-w-5xl animate-fade-in-up delay-100">
              {t.title}
            </h1>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-t border-white/10 pt-8 animate-fade-in-up delay-200">
              <div className="flex items-center gap-4">
                <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[#B2904D] shadow-lg shadow-[#B2904D]/20">
                  <Image
                    src={IMAGES.author}
                    alt="Abogado Manuel Solis"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-white font-bold text-lg">Abogado Manuel Solís</p>
                  <p className="text-white/50 text-sm">{t.ui.authorRole}</p>
                </div>
              </div>

              <ShareButtons title={t.title} uiShareText={t.ui.share} />
            </div>
          </section>

          {/* CONTENIDO */}
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-12">

              <article className="lg:col-span-8 prose prose-lg prose-invert max-w-none">

                {/* Imagen principal */}
                <div className="mb-12 relative w-full aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl group">
                   <Image
                     src={IMAGES.article}
                     alt="DACA 2026 estado legal en los tribunales"
                     fill
                     className="object-cover transition-transform duration-1000 group-hover:scale-105"
                     priority
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-[#001540] via-transparent to-transparent opacity-30" />
                </div>

                {/* Resumen */}
                <div className="p-8 rounded-3xl bg-gradient-to-br from-[#B2904D]/20 to-transparent border border-[#B2904D]/30 mb-10 shadow-2xl">
                   <h3 className="text-[#B2904D] font-bold text-xl mb-4 flex items-center gap-2">
                     <Sparkles size={20} /> {t.summary.title}
                   </h3>
                   <p
                     className="text-lg text-white leading-relaxed font-light m-0"
                     dangerouslySetInnerHTML={{ __html: t.summary.text }}
                   />
                </div>

                <div className="space-y-12 text-blue-50/80 font-light text-lg leading-8">

                  {/* Introducción */}
                  <section>
                    {t.intro.map((paragraph, idx) => (
                      <p key={idx} dangerouslySetInnerHTML={{ __html: paragraph }} className="mb-6" />
                    ))}
                  </section>

                  {/* Sección 1: Estado legal de DACA */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mt-0 mb-6 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><Scale size={24} className="text-[#B2904D]" /></div>
                      {t.sections.legalStatus.title}
                    </h2>
                    <p className="text-xl text-white italic mb-6 border-l-4 border-[#B2904D] pl-6 py-2">
                      {t.sections.legalStatus.quote}
                    </p>
                    <p className="mb-4" dangerouslySetInnerHTML={{ __html: t.sections.legalStatus.text }} />
                    <ul className="grid gap-4 mt-6 list-none pl-0">
                      {t.sections.legalStatus.list.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <Gavel size={24} className="text-[#B2904D] shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.legalStatus.note}
                    </div>
                  </section>

                  {/* Sección 2: Renovar DACA */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mb-2 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><FileText size={24} className="text-[#B2904D]" /></div>
                      {t.sections.renew.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.renew.subtitle}</p>

                    <p className="mb-6" dangerouslySetInnerHTML={{ __html: t.sections.renew.text }} />

                    <div className="bg-white/5 p-8 rounded-3xl border border-white/10 mb-6">
                      <h4 className="text-[#B2904D] font-bold uppercase tracking-widest mb-4 text-sm">{t.sections.renew.keyPoints.title}</h4>
                      <ul className="grid gap-3 mt-4 list-none pl-0">
                        {t.sections.renew.keyPoints.list.map((item, i) => (
                          <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                            <CheckCircle2 size={24} className="text-green-400 shrink-0 mt-1" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-5 bg-amber-500/10 rounded-xl border border-amber-500/30 mb-6">
                      <p className="text-amber-200 m-0 flex items-start gap-3">
                        <AlertTriangle size={20} className="shrink-0 mt-1" />
                        <span dangerouslySetInnerHTML={{ __html: t.sections.renew.warning }} />
                      </p>
                    </div>

                    <p className="text-sm text-white/60">{t.sections.renew.note}</p>
                  </section>

                  {/* Imagen interior 1 */}
                  <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-xl group">
                     <Image
                       src={IMAGES.inside1}
                       alt="DACA renovacion vencida opciones"
                       fill
                       className="object-cover transition-transform duration-1000 group-hover:scale-105"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-[#001540] via-transparent to-transparent opacity-20" />
                  </div>

                  {/* Sección 3: DACA vencido */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mb-2 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><AlertTriangle size={24} className="text-[#B2904D]" /></div>
                      {t.sections.expired.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.expired.subtitle}</p>

                    <p className="mb-6">{t.sections.expired.text}</p>

                    <p className="mb-4 font-medium text-white">{lang === 'es' ? 'Consecuencias inmediatas:' : 'Immediate consequences:'}</p>
                    <ul className="grid gap-3 mt-4 mb-8 list-none pl-0">
                      {t.sections.expired.consequences.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <AlertCircle size={24} className="text-red-400 shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="bg-white/5 p-8 rounded-3xl border border-white/10 mb-6">
                      <h4 className="text-[#B2904D] font-bold uppercase tracking-widest mb-4 text-sm">{t.sections.expired.options.title}</h4>
                      <ul className="grid gap-3 mt-4 list-none pl-0">
                        {t.sections.expired.options.list.map((item, i) => (
                          <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                            <CheckCircle2 size={24} className="text-green-400 shrink-0 mt-1" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      <span>
                        {lang === 'es' ? (
                          <>Si tu DACA venció hace tiempo, revisa también las <Link href={`/${lang}/blog/barras-3-10-anos-presencia-ilegal`} className="underline font-medium">barras de 3 y 10 años</Link> antes de planear cualquier salida del país.</>
                        ) : (
                          <>If your DACA expired long ago, also review the <Link href={`/${lang}/blog/barras-3-10-anos-presencia-ilegal`} className="underline font-medium">3- and 10-year bars</Link> before planning any trip abroad.</>
                        )}
                      </span>
                    </div>

                    <p className="mt-4 text-sm text-white/60">{t.sections.expired.note}</p>
                  </section>

                  {/* Sección 4: Nuevas aplicaciones */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mb-2 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><ShieldCheck size={24} className="text-[#B2904D]" /></div>
                      {t.sections.newApplications.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.newApplications.subtitle}</p>

                    <p className="mb-6" dangerouslySetInnerHTML={{ __html: t.sections.newApplications.text }} />

                    <p className="mb-4 font-medium text-white">{lang === 'es' ? 'Requisitos originales que ya no bastan:' : 'Original requirements that are no longer enough:'}</p>
                    <ul className="grid gap-3 mt-4 mb-8 list-none pl-0">
                      {t.sections.newApplications.list.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <CheckCircle2 size={24} className="text-white/40 shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <p className="mb-4" dangerouslySetInnerHTML={{ __html: t.sections.newApplications.reality }} />

                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.newApplications.whatNeeded.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <Gavel size={24} className="text-[#B2904D] shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      <span dangerouslySetInnerHTML={{ __html: t.sections.newApplications.note }} />
                    </div>
                  </section>

                  {/* Imagen interior 2 */}
                  <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-xl group">
                     <Image
                       src={IMAGES.inside2}
                       alt="Corte Suprema DACA dreamers"
                       fill
                       className="object-cover transition-transform duration-1000 group-hover:scale-105"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-[#001540] via-transparent to-transparent opacity-20" />
                  </div>

                  {/* Sección 5: Corte Suprema */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mb-2 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><Gavel size={24} className="text-[#B2904D]" /></div>
                      {t.sections.supremeCourt.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.supremeCourt.subtitle}</p>

                    <p className="mb-6">{t.sections.supremeCourt.text}</p>

                    <div className="grid gap-6 mb-6">
                      {t.sections.supremeCourt.scenarios.map((s, i) => (
                        <div key={i} className="bg-white/5 p-6 rounded-3xl border border-white/10">
                          <h4 className="text-[#B2904D] font-bold mb-3 text-lg">{s.title}</h4>
                          <p className="m-0 text-blue-50/80">{s.text}</p>
                        </div>
                      ))}
                    </div>

                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.supremeCourt.note}
                    </div>
                  </section>

                  {/* Sección 6: Alternativas */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mb-2 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><Users size={24} className="text-[#B2904D]" /></div>
                      {t.sections.alternatives.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.alternatives.subtitle}</p>

                    <p className="mb-6" dangerouslySetInnerHTML={{ __html: t.sections.alternatives.text }} />

                    <div className="grid gap-4 mb-6">
                      {t.sections.alternatives.list.map((opt, i) => (
                        <div key={i} className="bg-white/5 p-6 rounded-2xl border border-white/10">
                          <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                            <CheckCircle2 size={20} className="text-green-400" />
                            {opt.title}
                          </h4>
                          <p className="m-0 text-blue-50/80 text-base">{opt.text}</p>
                        </div>
                      ))}
                    </div>

                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      <span dangerouslySetInnerHTML={{ __html: t.sections.alternatives.note }} />
                    </div>

                    <div className="mt-6 grid sm:grid-cols-2 gap-4">
                      <Link href={`/${lang}/blog/advance-parole-2026-viajar-con-daca-tps-visa-u`} className="block p-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors no-underline">
                        <p className="text-xs text-[#B2904D] uppercase tracking-wider mb-1 m-0">{lang === 'es' ? 'Lectura relacionada' : 'Related reading'}</p>
                        <p className="text-white font-medium m-0">{lang === 'es' ? 'Advance Parole 2026: viajar con DACA' : 'Advance Parole 2026: Traveling with DACA'}</p>
                      </Link>
                      <Link href={`/${lang}/blog/crimenes-deportacion-vileza-moral`} className="block p-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors no-underline">
                        <p className="text-xs text-[#B2904D] uppercase tracking-wider mb-1 m-0">{lang === 'es' ? 'Lectura relacionada' : 'Related reading'}</p>
                        <p className="text-white font-medium m-0">{lang === 'es' ? 'Crímenes que causan deportación' : 'Crimes That Cause Deportation'}</p>
                      </Link>
                      <Link href={`/${lang}/blog/perdon-i601a-arreglar-papeles-entrada-ilegal`} className="block p-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors no-underline">
                        <p className="text-xs text-[#B2904D] uppercase tracking-wider mb-1 m-0">{lang === 'es' ? 'Lectura relacionada' : 'Related reading'}</p>
                        <p className="text-white font-medium m-0">{lang === 'es' ? 'Perdón I-601A: arreglar por matrimonio' : 'I-601A Waiver: Marriage Path'}</p>
                      </Link>
                      <Link href={`/${lang}/blog/i-864-patrocinador-ingreso-minimo`} className="block p-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors no-underline">
                        <p className="text-xs text-[#B2904D] uppercase tracking-wider mb-1 m-0">{lang === 'es' ? 'Lectura relacionada' : 'Related reading'}</p>
                        <p className="text-white font-medium m-0">{lang === 'es' ? 'I-864: patrocinio e ingreso mínimo' : 'Form I-864: Sponsor & Income'}</p>
                      </Link>
                    </div>
                  </section>

                  {/* Sección 7: Por qué abogado */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mb-6 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><Lightbulb size={24} className="text-[#B2904D]" /></div>
                      {t.sections.whyLawyer.title}
                    </h2>
                    <p className="mb-6">{t.sections.whyLawyer.text}</p>
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.whyLawyer.list.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <TrendingUp size={24} className="text-[#B2904D] shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      <span dangerouslySetInnerHTML={{ __html: t.sections.whyLawyer.note }} />
                    </div>
                  </section>

                  {/* Conclusión CTA */}
                  <div className="p-8 bg-gradient-to-r from-[#B2904D] to-[#8a6e36] rounded-3xl text-[#001540] shadow-lg mt-12">
                      <h2 className="text-2xl font-bold font-serif mb-4 flex items-center gap-2">
                         <MessageCircle size={28} /> {t.sections.conclusion.title}
                      </h2>
                      <p className="font-medium text-lg mb-6 leading-relaxed" dangerouslySetInnerHTML={{ __html: t.sections.conclusion.text }} />
                      <p className="font-bold text-xl mb-8">
                        {t.sections.conclusion.advice}
                      </p>

                      <Link href="#contacto" className="inline-flex items-center justify-center w-full md:w-auto px-8 py-4 bg-[#001540] text-white font-bold rounded-xl hover:bg-white hover:text-[#001540] transition-all shadow-xl gap-2">
                         <Send size={18} />
                         {t.ui.ctaButton}
                      </Link>
                  </div>

                  {/* Fuentes */}
                  <div className="border-t border-white/10 pt-8 mt-12">
                      <h4 className="text-xs font-bold text-white/50 uppercase mb-4 tracking-widest">{t.sections.sources.title}</h4>
                      <ul className="space-y-2 text-sm text-white/50 list-none pl-0">
                         {t.sections.sources.list.map((source, idx) => (
                           <li key={idx} className="flex items-center gap-2 hover:text-[#B2904D] transition-colors"><ArrowUpRight size={12} /> {source}</li>
                         ))}
                      </ul>
                  </div>

                </div>
              </article>

              {/* SIDEBAR */}
              <aside className="lg:col-span-4 space-y-8">

                 <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md sticky top-32">
                    <h3 className="text-xs font-bold text-white mb-6 uppercase tracking-widest border-b border-white/10 pb-4">Sobre el Autor</h3>
                    <div className="flex flex-col items-center text-center">
                       <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-[#001540] shadow-[0_0_0_2px_#B2904D] mb-4">
                          <Image src={IMAGES.author} alt="Manuel Solis" fill className="object-cover" />
                       </div>
                       <h4 className="text-xl font-bold text-white">Manuel Solís</h4>
                       <p className="text-sm text-[#B2904D] mb-4">{t.ui.authorRole}</p>
                       <Link href={`/${lang}/abogados/manuel-solis`} className="text-sm font-bold text-white border border-white/20 px-6 py-2 rounded-full hover:bg-white hover:text-[#001540] transition-colors w-full">
                         {lang === 'es' ? 'Ver Perfil del Abogado' : 'View Attorney Profile'}
                       </Link>
                    </div>
                 </div>

              </aside>

            </div>
          </div>

        </main>

        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <RelatedContent
            articles={getRelatedArticles('daca-2026-estado-legal-tribunales', (lang as 'es' | 'en') || 'es')}
            lang={(lang as 'es' | 'en') || 'es'}
            servicePath="/servicios/inmigracion"
          />
        </div>

        <div id="contacto">
           <ContactForm />
        </div>

        <Footer />
      </div>
    </>
  );
}


export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'es' }];
}
