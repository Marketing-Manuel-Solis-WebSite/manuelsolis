import type { Metadata } from 'next';
import BlogArticleLayout from '../../../components/blogs/BlogArticleLayout';
import { buildArticleMetadata } from '../../../components/blogs/articleMetadata';
import { ARTICLE_UI, type BlogArticleContent } from '../../../components/blogs/articleModel';

const SLUG = 'registro-obligatorio-extranjeros-g325r-2026';
const ISO_DATE = '2026-08-04';
// TODO(portada): sustituir por la imagen definitiva en /blog/blog_37/ cuando la
// entregue marketing. Mientras tanto se usa la imagen social de marca, que
// existe en public/ y es válida para compartir en redes.
const IMAGE = '/og-default.jpg';

const content: Record<'es' | 'en', BlogArticleContent> = {
  es: {
    metaTitle: 'Registro obligatorio G-325R: quién debe hacerlo',
    metaDesc:
      'Quién debe registrarse con el formulario G-325R, quién ya está registrado y no necesita hacer nada, y el dilema real de registrarse si está indocumentado.',
    title:
      'Registro obligatorio de extranjeros (G-325R): quién debe registrarse, cómo hacerlo y qué riesgos tiene',
    displayDate: '04 Ago, 2026',
    readTime: '12 min',
    categoryLabel: 'Procesos Migratorios',
    lastUpdated: '4 de agosto de 2026',
    summary: {
      title: 'Resumen inicial',
      text: 'La ley de inmigración exige desde hace décadas que ciertos extranjeros se registren ante el gobierno, pero durante años casi nadie tuvo que hacer nada por separado: el trámite quedaba cubierto al pedir una visa, una residencia o un permiso de trabajo. Eso cambió. Hoy existe un <strong>formulario específico, el G-325R</strong>, y una obligación que se aplica activamente. La buena noticia es que <strong>la mayoría de las personas ya están registradas y no tienen que hacer nada</strong>. La difícil es que quienes no lo están enfrentan una decisión real: registrarse significa decirle al gobierno dónde vive, y no hacerlo es un delito menor. Esta guía explica quién está en cada grupo y por qué esta decisión no debería tomarse sin hablar antes con un abogado.',
    },
    intro: [
      'Si en las últimas semanas ha escuchado que "todos los inmigrantes tienen que registrarse", la primera cosa que debe saber es que esa frase, así de simple, no es cierta. El requisito de registro existe en la Sección 262 de la Ley de Inmigración y Nacionalidad y aplica a personas de 14 años o más que permanezcan en Estados Unidos <strong>30 días o más</strong> y que no hayan sido registradas ya por otra vía.',
      'La parte que la mayoría de las notas periodísticas se salta es precisamente esa última: <strong>"que no hayan sido registradas ya"</strong>. Millones de personas ya cumplen el requisito sin saberlo, porque el registro ocurrió automáticamente cuando recibieron su residencia, su permiso de trabajo, su I-94 al entrar o cuando fueron puestas en proceso de corte.',
      'Este artículo separa los dos grupos con claridad, explica el trámite paso a paso para quien sí tiene que hacerlo, y —sobre todo— es honesto sobre el dilema que enfrenta quien está indocumentado y sin registrar. No hay una respuesta única que sirva para todos, y desconfíe de quien se la dé sin conocer su historia.',
    ],
    sections: [
      {
        icon: 'balance',
        title: 'Qué es el requisito de registro y de dónde sale',
        subtitle: 'No es una ley nueva, es una ley que se volvió a activar',
        blocks: [
          {
            kind: 'text',
            text: 'La obligación de registrarse no se inventó en 2026. Vive en la <strong>Sección 262 de la Ley de Inmigración y Nacionalidad (INA)</strong> desde hace décadas, junto con dos obligaciones hermanas: la Sección 264, que exige llevar consigo el comprobante de registro, y la Sección 266, que convierte el incumplimiento intencional en un delito menor.',
          },
          {
            kind: 'text',
            text: 'Durante muchos años ese requisito funcionó en piloto automático. Nadie llenaba un "formulario de registro" porque el registro se completaba dentro de otros trámites. Lo que cambió es que el gobierno creó un procedimiento independiente y un formulario propio —el <strong>G-325R</strong>— para las personas que no quedaban cubiertas por ningún otro trámite, y empezó a aplicar el requisito de forma activa.',
          },
          {
            kind: 'list',
            items: [
              '<strong>Sección 262 (INA):</strong> obliga a registrarse a los extranjeros de 14 años o más que estén 30 días o más en el país y no estén ya registrados.',
              '<strong>Sección 264 (INA):</strong> quien está registrado debe portar su comprobante y mostrarlo si una autoridad se lo pide.',
              '<strong>Sección 266 (INA):</strong> el incumplimiento intencional es un delito menor, con multa y posible arresto.',
              '<strong>Menores de 14 años:</strong> el padre, madre o tutor es responsable de registrarlos, y al cumplir 14 años deben registrarse de nuevo dentro de los 30 días siguientes.',
            ],
          },
          {
            kind: 'note',
            text: 'El registro <strong>no otorga ningún estatus migratorio</strong>. No es un permiso, no da derecho a trabajar y no protege de la deportación. Es únicamente un trámite de identificación ante el gobierno.',
          },
        ],
      },
      {
        icon: 'check',
        title: 'Quién YA está registrado y no tiene que hacer nada',
        subtitle: 'Empiece por aquí antes de llenar cualquier cosa',
        blocks: [
          {
            kind: 'text',
            text: 'Esta es la sección más importante del artículo. Antes de considerar enviar un G-325R, revise si usted ya está registrado. Si lo está, presentar el formulario es innecesario y solo agrega ruido a su expediente. En términos generales, <strong>el registro ya ocurrió</strong> si el gobierno le entregó alguno de estos documentos o si su caso pasó por alguno de estos procesos:',
          },
          {
            kind: 'list',
            items: [
              'Tiene <strong>residencia permanente</strong> (green card), incluida la residencia condicional de dos años.',
              'Tiene un <strong>permiso de trabajo (EAD)</strong> vigente o vencido, de cualquier categoría.',
              'Le entregaron un <strong>I-94</strong> al entrar al país, aunque ya haya vencido.',
              'Entró con <strong>visa de inmigrante o de no inmigrante</strong> emitida por un consulado.',
              'Está o estuvo <strong>en proceso de corte de inmigración</strong> (recibió una Notice to Appear).',
              'Fue <strong>admitido con parole</strong> y le dieron documentación de esa entrada.',
              'Tiene una <strong>tarjeta de cruce fronterizo</strong> vigente.',
              'Solicitó algún beneficio migratorio en el que <strong>le tomaron huellas</strong> y datos biométricos.',
            ],
          },
          {
            kind: 'note',
            text: 'Si no está seguro de en qué grupo cae —por ejemplo, porque entró hace años y no recuerda si le dieron papel alguno—, existe una forma de averiguarlo sin adivinar: pedir su expediente completo al gobierno mediante una solicitud FOIA. Es más lento, pero es la única manera de decidir con información real en la mano.',
          },
        ],
      },
      {
        icon: 'clipboard',
        title: 'Quién sí tiene que registrarse con el G-325R',
        subtitle: 'El grupo que la ley no había alcanzado hasta ahora',
        blocks: [
          {
            kind: 'text',
            text: 'Por descarte, el requisito recae sobre las personas que <strong>nunca pasaron por un trámite que las registrara</strong>. En la práctica se trata sobre todo de dos perfiles:',
          },
          {
            kind: 'cards',
            items: [
              {
                title: 'Entrada sin inspección',
                desc: 'Personas que cruzaron sin ser inspeccionadas por un oficial, que nunca recibieron un I-94 y que jamás han solicitado un beneficio migratorio con toma de huellas.',
              },
              {
                title: 'Menores que cumplen 14 años',
                desc: 'Un menor registrado por sus padres debe volver a registrarse dentro de los 30 días de cumplir 14 años, esta vez con sus propios datos biométricos.',
              },
            ],
          },
          {
            kind: 'text',
            text: 'También quedan alcanzadas personas que entraron con alguna forma de permiso pero a las que nunca se les emitió documentación de registro. Cada caso hay que mirarlo por separado: el hecho de estar indocumentado hoy no dice nada sobre si usted fue registrado en el pasado.',
          },
          {
            kind: 'warning',
            text: 'No asuma que necesita registrarse solo porque no tiene papeles. Y no asuma lo contrario tampoco. La respuesta depende de su historia migratoria completa, no de su situación actual.',
          },
        ],
      },
      {
        icon: 'file',
        title: 'Cómo es el trámite, paso a paso',
        subtitle: 'Qué pide el gobierno y en qué orden',
        blocks: [
          {
            kind: 'steps',
            items: [
              'Crear una <strong>cuenta en línea de USCIS</strong> (myUSCIS). Cada persona que se registra necesita su propia cuenta, incluidos los menores, cuya cuenta administra el padre o tutor.',
              'Llenar y enviar el <strong>formulario G-325R</strong> en línea. Pide datos personales, historial de direcciones, historial migratorio y, en su caso, antecedentes penales.',
              'Esperar la <strong>cita de datos biométricos</strong>, si el gobierno la programa: huellas, fotografía y firma en un centro de servicio.',
              'Descargar y conservar el <strong>comprobante de registro</strong> que queda en su cuenta una vez completado el proceso.',
              'Llevar el comprobante consigo, porque la Sección 264 exige poder mostrarlo si una autoridad lo pide.',
              'Reportar cualquier <strong>cambio de dirección dentro de los 10 días</strong> siguientes, con el formulario AR-11.',
            ],
          },
          {
            kind: 'note',
            text: 'El formulario se responde bajo pena de perjurio. Una respuesta inexacta sobre entradas, salidas o antecedentes no es un detalle administrativo: puede convertirse en un problema de credibilidad que lo persiga en cualquier caso futuro.',
          },
        ],
      },
      {
        icon: 'alert',
        title: 'El dilema real: registrarse o no registrarse',
        subtitle: 'Aquí es donde hay que ser honestos',
        blocks: [
          {
            kind: 'text',
            text: 'Para una persona indocumentada que no está registrada, esta no es una decisión trivial y cualquiera que se la presente como obvia le está haciendo un flaco favor. Los dos lados tienen consecuencias reales.',
          },
          {
            kind: 'cards',
            items: [
              {
                title: 'Si se registra',
                desc: 'Cumple con la ley y evita la exposición penal de la Sección 266. Pero entrega al gobierno su nombre, su domicilio actual y su historial, y queda obligado a mantener esa dirección actualizada.',
              },
              {
                title: 'Si no se registra',
                desc: 'No entrega esa información, pero el incumplimiento intencional es un delito menor con multa y posible arresto, y ese antecedente puede complicar solicitudes migratorias posteriores.',
              },
            ],
          },
          {
            kind: 'text',
            text: 'La respuesta correcta depende de factores que solo se ven mirando el caso completo: si usted tiene alguna solicitud pendiente, si califica para algún alivio migratorio, si tiene una orden de deportación previa, si hay antecedentes penales de por medio, y qué tan expuesto está ya en los sistemas del gobierno. Para muchas personas el registro no cambia gran cosa porque ya están plenamente identificadas. Para otras sí cambia mucho.',
          },
          {
            kind: 'warning',
            text: 'No tome esta decisión a partir de un video, de un mensaje reenviado por WhatsApp o del consejo de alguien que no es abogado. Y desconfíe de quien le cobre por "registrarlo" prometiéndole que con eso arregla su situación: el registro no da estatus.',
          },
        ],
      },
      {
        icon: 'map',
        title: 'Obligaciones que siguen después de registrarse',
        subtitle: 'El trámite no termina cuando envía el formulario',
        blocks: [
          {
            kind: 'text',
            text: 'Registrarse abre dos obligaciones permanentes que mucha gente pasa por alto y que son fáciles de incumplir sin darse cuenta.',
          },
          {
            kind: 'list',
            items: [
              '<strong>Portar el comprobante.</strong> Guarde una copia impresa y otra en el teléfono. Es lo que la ley pide mostrar si una autoridad se lo requiere.',
              '<strong>Reportar cambios de domicilio en 10 días</strong> con el AR-11. Este plazo es mucho más corto de lo que la gente cree y aplica cada vez que se muda.',
            ],
          },
          {
            kind: 'note',
            text: 'Mantener su dirección actualizada no es burocracia: es lo que hace que las notificaciones del gobierno le lleguen. Una carta enviada a una dirección vieja se considera entregada, y perderla puede costarle un plazo, una audiencia o un caso entero.',
          },
        ],
      },
      {
        icon: 'shield',
        title: 'Por qué conviene hablar con un abogado antes de enviar nada',
        subtitle: 'Lo que se revisa en una consulta',
        blocks: [
          {
            kind: 'text',
            text: 'Una consulta antes de registrarse no es un gasto defensivo, es lo que le permite decidir con datos. Estos son los puntos que un abogado revisa:',
          },
          {
            kind: 'list',
            items: [
              'Si usted <strong>ya está registrado</strong> por alguna vía y por lo tanto no necesita hacer nada.',
              'Si tiene alguna <strong>orden de deportación previa</strong> o un caso abierto que cambie por completo el cálculo.',
              'Si califica para algún <strong>alivio migratorio</strong> que convenga presentar antes o en paralelo.',
              'Si hay <strong>antecedentes penales</strong> que deban analizarse antes de declarar nada por escrito.',
              'Qué dice su <strong>expediente real</strong> ante el gobierno, que muchas veces no coincide con lo que la persona recuerda.',
            ],
          },
          {
            kind: 'text',
            text: 'Esa última es la más subestimada. Pedir el expediente por FOIA antes de firmar un documento bajo pena de perjurio evita contradicciones que después son muy difíciles de explicar.',
          },
        ],
      },
    ],
    faq: {
      title: 'Preguntas frecuentes',
      items: [
        {
          q: '¿Registrarme me da algún permiso o me protege de la deportación?',
          a: 'No. El registro es únicamente un trámite de identificación. No otorga estatus, no da permiso de trabajo y no impide un proceso de deportación. Cualquiera que le diga lo contrario le está mintiendo o le está vendiendo algo.',
        },
        {
          q: 'Tengo permiso de trabajo pero no residencia. ¿Debo registrarme?',
          a: 'Si USCIS le emitió un permiso de trabajo, en general ya está registrado y no necesita presentar el G-325R. Aun así, conviene confirmarlo con un abogado antes de descartar el trámite, porque la respuesta depende de cómo se generó ese permiso.',
        },
        {
          q: '¿Mis hijos nacidos en Estados Unidos tienen que registrarse?',
          a: 'No. El requisito aplica a extranjeros. Sus hijos ciudadanos estadounidenses quedan fuera por completo, sin importar el estatus de los padres.',
        },
        {
          q: 'Entré sin papeles hace quince años y nunca he pedido nada. ¿Qué hago?',
          a: 'Ese es exactamente el perfil que la ley alcanza y también el que más necesita asesoría antes de actuar. Antes de enviar cualquier formulario, lo sensato es revisar si califica para algún alivio y qué información tiene ya el gobierno sobre usted.',
        },
        {
          q: '¿Qué pasa si me mudo después de registrarme?',
          a: 'Tiene 10 días para reportar el cambio de dirección con el formulario AR-11. Es un plazo corto y se incumple con facilidad. Ponerse un recordatorio el día de la mudanza es la forma más simple de no fallar.',
        },
        {
          q: '¿Un notario puede hacerme el registro?',
          a: 'En Estados Unidos un notario público no es abogado y no puede dar asesoría legal migratoria. Pagarle a alguien para que llene por usted un formulario que se firma bajo pena de perjurio, sin analizar su caso, es una de las formas más comunes de terminar con un expediente dañado.',
        },
      ],
    },
    conclusion: {
      title: 'Antes de enviar el G-325R, sepa en qué grupo está',
      text: 'La mayoría de las personas ya están registradas y no tienen que hacer nada. Para quienes no lo están, la decisión de registrarse tiene consecuencias reales en los dos sentidos y depende por completo de su historia migratoria: si hay órdenes previas, si hay antecedentes, si hay algún alivio disponible y qué sabe ya el gobierno de usted.',
      advice: 'Una consulta antes de enviar el formulario puede revelar que usted ya está registrado, o que hay un camino mejor que empezar por aquí.',
    },
    sources: {
      title: 'Fuentes y referencias',
      list: [
        'Ley de Inmigración y Nacionalidad (INA), Secciones 262, 263, 264 y 266 — obligación de registro, comprobante y sanciones',
        'USCIS — Requisito de registro de extranjeros y formulario G-325R',
        'USCIS — Formulario AR-11, cambio de domicilio',
        'USCIS — Solicitudes FOIA de expediente migratorio',
      ],
    },
    ui: ARTICLE_UI.es,
  },
  en: {
    metaTitle: 'Alien Registration G-325R: Who Must Register',
    metaDesc:
      'Who must register using Form G-325R, who is already registered and need do nothing, and the real dilemma of registering if you are undocumented.',
    title: 'Alien Registration Requirement (G-325R): Who Must Register, How to Do It, and the Risks Involved',
    displayDate: 'Aug 04, 2026',
    readTime: '12 min',
    categoryLabel: 'Immigration Process',
    lastUpdated: 'August 4, 2026',
    summary: {
      title: 'Initial Summary',
      text: 'Immigration law has required certain noncitizens to register with the government for decades, but for years almost nobody had to do anything separately: the requirement was satisfied inside other applications for a visa, a green card, or a work permit. That changed. There is now a <strong>dedicated form, the G-325R</strong>, and the requirement is being actively enforced. The good news is that <strong>most people are already registered and need to do nothing</strong>. The hard part is that those who are not face a real decision: registering means telling the government where you live, and failing to register is a misdemeanor. This guide explains who falls into each group and why this decision should not be made without speaking to an attorney first.',
    },
    intro: [
      'If you have heard recently that "all immigrants have to register," the first thing to know is that, stated that plainly, it is not true. The registration requirement lives in Section 262 of the Immigration and Nationality Act and applies to people 14 or older who remain in the United States <strong>30 days or more</strong> and who have not already been registered another way.',
      'The part most news coverage skips is that last clause: <strong>"have not already been registered."</strong> Millions of people already satisfy the requirement without knowing it, because registration happened automatically when they received their green card, their work permit, their I-94 at entry, or when they were placed in removal proceedings.',
      'This article separates the two groups clearly, walks through the process for those who do have to file, and — above all — is honest about the dilemma facing someone who is undocumented and unregistered. There is no single answer that fits everyone, and you should distrust anyone who gives you one without knowing your history.',
    ],
    sections: [
      {
        icon: 'balance',
        title: 'What the registration requirement is and where it comes from',
        subtitle: 'Not a new law — a law that was switched back on',
        blocks: [
          {
            kind: 'text',
            text: 'The duty to register was not invented in 2026. It has lived in <strong>Section 262 of the Immigration and Nationality Act (INA)</strong> for decades, alongside two sibling duties: Section 264, which requires carrying proof of registration, and Section 266, which makes willful failure a misdemeanor.',
          },
          {
            kind: 'text',
            text: 'For many years the requirement ran on autopilot. Nobody filled out a "registration form" because registration was completed inside other filings. What changed is that the government created a standalone process and its own form — the <strong>G-325R</strong> — for people not covered by any other filing, and began enforcing the requirement actively.',
          },
          {
            kind: 'list',
            items: [
              '<strong>INA § 262:</strong> requires registration of noncitizens 14 or older who are present 30 days or more and are not already registered.',
              '<strong>INA § 264:</strong> anyone registered must carry their proof and show it if an official asks.',
              '<strong>INA § 266:</strong> willful failure is a misdemeanor, carrying a fine and possible arrest.',
              '<strong>Children under 14:</strong> a parent or guardian is responsible for registering them, and upon turning 14 they must register again within 30 days.',
            ],
          },
          {
            kind: 'note',
            text: 'Registration <strong>grants no immigration status whatsoever</strong>. It is not a permit, it does not authorize work, and it does not protect against deportation. It is purely an identification filing.',
          },
        ],
      },
      {
        icon: 'check',
        title: 'Who is ALREADY registered and needs to do nothing',
        subtitle: 'Start here before filling anything out',
        blocks: [
          {
            kind: 'text',
            text: 'This is the most important section of the article. Before considering a G-325R, check whether you are already registered. If you are, filing is unnecessary and only adds noise to your record. Generally speaking, <strong>registration already happened</strong> if the government issued you one of these documents or your case went through one of these processes:',
          },
          {
            kind: 'list',
            items: [
              'You have <strong>lawful permanent residence</strong> (a green card), including two-year conditional residence.',
              'You have an <strong>employment authorization document (EAD)</strong>, current or expired, in any category.',
              'You were issued an <strong>I-94</strong> when you entered, even if it has expired.',
              'You entered on an <strong>immigrant or nonimmigrant visa</strong> issued by a consulate.',
              'You are or were <strong>in immigration court proceedings</strong> (you received a Notice to Appear).',
              'You were <strong>paroled in</strong> and given documentation of that entry.',
              'You hold a valid <strong>border crossing card</strong>.',
              'You applied for an immigration benefit where <strong>biometrics were taken</strong>.',
            ],
          },
          {
            kind: 'note',
            text: 'If you are not sure which group you fall into — because you entered years ago and cannot recall whether you were given any paperwork — there is a way to find out instead of guessing: request your full government file through a FOIA request. It is slower, but it is the only way to decide with real information in hand.',
          },
        ],
      },
      {
        icon: 'clipboard',
        title: 'Who does have to register with the G-325R',
        subtitle: 'The group the law had not reached until now',
        blocks: [
          {
            kind: 'text',
            text: 'By elimination, the requirement falls on people who <strong>never went through a filing that registered them</strong>. In practice that is mainly two profiles:',
          },
          {
            kind: 'cards',
            items: [
              {
                title: 'Entry without inspection',
                desc: 'People who crossed without being inspected by an officer, never received an I-94, and have never applied for a benefit involving fingerprints.',
              },
              {
                title: 'Children turning 14',
                desc: 'A child registered by their parents must register again within 30 days of turning 14, this time with their own biometrics.',
              },
            ],
          },
          {
            kind: 'text',
            text: 'People who entered with some form of permission but were never issued registration documentation may also be covered. Each case has to be looked at separately: being undocumented today says nothing about whether you were registered in the past.',
          },
          {
            kind: 'warning',
            text: 'Do not assume you need to register just because you lack status. And do not assume the opposite either. The answer depends on your complete immigration history, not on your situation today.',
          },
        ],
      },
      {
        icon: 'file',
        title: 'How the process works, step by step',
        subtitle: 'What the government asks for and in what order',
        blocks: [
          {
            kind: 'steps',
            items: [
              'Create a <strong>USCIS online account</strong> (myUSCIS). Everyone registering needs their own account, including minors, whose account is managed by a parent or guardian.',
              'Complete and submit <strong>Form G-325R</strong> online. It asks for personal information, address history, immigration history and, where applicable, criminal history.',
              'Wait for the <strong>biometrics appointment</strong>, if one is scheduled: fingerprints, photograph and signature at a service center.',
              'Download and keep the <strong>proof of registration</strong> that appears in your account once the process is complete.',
              'Carry that proof with you, because Section 264 requires being able to show it if an official asks.',
              'Report any <strong>change of address within 10 days</strong> using Form AR-11.',
            ],
          },
          {
            kind: 'note',
            text: 'The form is answered under penalty of perjury. An inaccurate answer about entries, departures or criminal history is not an administrative detail: it can become a credibility problem that follows you into any future case.',
          },
        ],
      },
      {
        icon: 'alert',
        title: 'The real dilemma: to register or not',
        subtitle: 'This is where honesty matters',
        blocks: [
          {
            kind: 'text',
            text: 'For an undocumented person who is not registered, this is not a trivial decision, and anyone who presents it as obvious is doing you a disservice. Both sides carry real consequences.',
          },
          {
            kind: 'cards',
            items: [
              {
                title: 'If you register',
                desc: 'You comply with the law and avoid the criminal exposure of Section 266. But you hand the government your name, your current address and your history, and you take on the duty to keep that address current.',
              },
              {
                title: 'If you do not register',
                desc: 'You do not hand over that information, but willful failure is a misdemeanor with a fine and possible arrest, and that record can complicate later immigration filings.',
              },
            ],
          },
          {
            kind: 'text',
            text: 'The right answer depends on factors visible only when the whole case is reviewed: whether you have a pending application, whether you qualify for relief, whether there is a prior removal order, whether criminal history is involved, and how exposed you already are in government systems. For many people registration changes little because they are already fully identified. For others it changes a great deal.',
          },
          {
            kind: 'warning',
            text: 'Do not make this decision based on a video, a forwarded WhatsApp message, or advice from someone who is not an attorney. And be wary of anyone charging to "register you" while promising it fixes your situation: registration grants no status.',
          },
        ],
      },
      {
        icon: 'map',
        title: 'Duties that continue after you register',
        subtitle: 'The filing does not end when you hit submit',
        blocks: [
          {
            kind: 'text',
            text: 'Registering opens two ongoing duties that many people overlook and that are easy to breach without realizing it.',
          },
          {
            kind: 'list',
            items: [
              '<strong>Carry your proof.</strong> Keep a printed copy and one on your phone. That is what the law asks you to show if an official requires it.',
              '<strong>Report address changes within 10 days</strong> using the AR-11. This deadline is far shorter than people assume and applies every time you move.',
            ],
          },
          {
            kind: 'note',
            text: 'Keeping your address current is not paperwork for its own sake: it is what makes government notices reach you. A letter sent to an old address counts as delivered, and missing it can cost you a deadline, a hearing, or an entire case.',
          },
        ],
      },
      {
        icon: 'shield',
        title: 'Why to speak with an attorney before filing anything',
        subtitle: 'What gets reviewed in a consultation',
        blocks: [
          {
            kind: 'text',
            text: 'A consultation before registering is not defensive spending; it is what lets you decide with facts. These are the points an attorney reviews:',
          },
          {
            kind: 'list',
            items: [
              'Whether you are <strong>already registered</strong> through some route and therefore need to do nothing.',
              'Whether you have a <strong>prior removal order</strong> or an open case that changes the calculation entirely.',
              'Whether you qualify for <strong>immigration relief</strong> that should be filed first or in parallel.',
              'Whether there is <strong>criminal history</strong> that must be analyzed before declaring anything in writing.',
              'What your <strong>actual government file</strong> says, which often does not match what a person remembers.',
            ],
          },
          {
            kind: 'text',
            text: 'That last one is the most underrated. Requesting your file through FOIA before signing a document under penalty of perjury avoids contradictions that are very hard to explain later.',
          },
        ],
      },
    ],
    faq: {
      title: 'Frequently asked questions',
      items: [
        {
          q: 'Does registering give me any permit or protect me from deportation?',
          a: 'No. Registration is purely an identification filing. It grants no status, no work authorization, and does not prevent removal proceedings. Anyone telling you otherwise is either mistaken or selling something.',
        },
        {
          q: 'I have a work permit but not a green card. Do I need to register?',
          a: 'If USCIS issued you a work permit, you are generally already registered and do not need to file the G-325R. Even so, confirm it with an attorney before dismissing the requirement, because the answer depends on how that permit came about.',
        },
        {
          q: 'Do my U.S.-born children have to register?',
          a: 'No. The requirement applies to noncitizens. Your U.S. citizen children are entirely outside it, regardless of the parents’ status.',
        },
        {
          q: 'I entered without papers fifteen years ago and never applied for anything. What should I do?',
          a: 'That is exactly the profile the law reaches, and also the one that most needs advice before acting. Before filing anything, it makes sense to review whether you qualify for relief and what information the government already has about you.',
        },
        {
          q: 'What if I move after registering?',
          a: 'You have 10 days to report the change of address using Form AR-11. It is a short deadline and easy to miss. Setting a reminder on moving day is the simplest way not to fail it.',
        },
        {
          q: 'Can a notario handle my registration?',
          a: 'In the United States a notary public is not an attorney and cannot give immigration legal advice. Paying someone to fill out a form signed under penalty of perjury, without analyzing your case, is one of the most common ways to end up with a damaged record.',
        },
      ],
    },
    conclusion: {
      title: 'Before filing the G-325R, know which group you are in',
      text: 'Most people are already registered and need to do nothing. For those who are not, the decision to register carries real consequences either way and depends entirely on your immigration history: prior orders, criminal history, available relief, and what the government already knows about you.',
      advice: 'A consultation before filing may reveal that you are already registered, or that there is a better place to start than here.',
    },
    sources: {
      title: 'Sources and references',
      list: [
        'Immigration and Nationality Act (INA), Sections 262, 263, 264 and 266 — registration duty, proof and penalties',
        'USCIS — Alien Registration Requirement and Form G-325R',
        'USCIS — Form AR-11, change of address',
        'USCIS — FOIA requests for immigration records',
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
          ? 'Registro obligatorio de extranjeros con el formulario G-325R'
          : 'Alien registration requirement and Form G-325R'
      }
      isoDate={ISO_DATE}
      servicePath="/servicios/inmigracion"
      trackerCategory="Procesos Migratorios"
    />
  );
}

export function generateStaticParams() {
  return [{ lang: 'es' }, { lang: 'en' }];
}
