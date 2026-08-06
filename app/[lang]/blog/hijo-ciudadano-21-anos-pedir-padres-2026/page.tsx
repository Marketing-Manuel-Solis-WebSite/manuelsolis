import type { Metadata } from 'next';
import BlogArticleLayout from '../../../components/blogs/BlogArticleLayout';
import { buildArticleMetadata } from '../../../components/blogs/articleMetadata';
import { ARTICLE_UI, type BlogArticleContent } from '../../../components/blogs/articleModel';

const SLUG = 'hijo-ciudadano-21-anos-pedir-padres-2026';
const ISO_DATE = '2026-08-06';
const IMAGE = '/blog/covers/hijo-ciudadano-21-anos-pedir-padres-2026.jpg';

const content: Record<'es' | 'en', BlogArticleContent> = {
  es: {
    metaTitle: 'Hijo ciudadano cumplió 21: cómo pedir a padres',
    metaDesc:
      'Su hijo ciudadano cumplió 21 y quiere pedirle la residencia. Cómo cambia todo según su forma de entrada, qué es el perdón I-601A y el error que cierra casos.',
    title: 'Mi hijo ciudadano cumplió 21: cómo puede pedirme y qué pasa si entré sin papeles',
    displayDate: '06 Ago, 2026',
    readTime: '23 min',
    categoryLabel: 'Procesos Migratorios',
    summary: {
      title: 'Resumen inicial',
      text: 'El día en que su hijo o su hija cumple 21 años se abre una de las pocas puertas que la ley migratoria deja abiertas de par en par: puede pedirlo a usted como <strong>familiar inmediato</strong>, una categoría sin cuota anual ni fila de espera. Pero abrir la puerta no es cruzarla. Lo que decide su caso no es la petición, sino <strong>cómo entró usted al país</strong>: si entró con visa y se quedó, casi siempre se arregla sin salir; si entró sin inspección, hay que ir a una entrevista consular fuera y casi siempre hace falta un perdón. Y ahí está el detalle que casi nadie explica a tiempo: <strong>ese perdón no se apoya en su hijo ciudadano</strong>.',
    },
    intro: [
      'Es una de las llamadas más comunes que recibe nuestra oficina y casi siempre llega con la misma mezcla de esperanza y prisa: «mi hijo ya cumplió 21, ya puede arreglarme». La primera parte es cierta y es buena noticia. La segunda depende de algo que ocurrió hace diez, veinte o treinta años, casi siempre en un solo día: el día en que usted entró.',
      'En 2026 esa conversación ya no es un simple trámite. Miles de familias de estatus mixto en Houston y en todo Texas están tratando de blindar a los papás mientras se pueda, y esa urgencia empuja a firmar solicitudes que no se entienden.',
      'Aquí va la explicación sin adornos: qué hace la petición y qué no, los dos escenarios de entrada, el requisito que rompe casos enteros y qué revisar antes de mandar el primer formulario.',
    ],
    sections: [
      {
        icon: 'users',
        title: 'La regla básica: a los 21 su hijo se convierte en peticionario',
        subtitle: 'Familiar inmediato, sin fila de espera',
        blocks: [
          {
            kind: 'text',
            text: 'La ley divide a los familiares de un ciudadano en dos grupos. Unos caen en categorías con cuota anual y esperan años por un número de visa. Otros son <strong>familiares inmediatos</strong> y están exentos de esos límites: no hay fila ni boletín que esperar. Los padres de un ciudadano mayor de 21 años están en ese segundo grupo.',
          },
          {
            kind: 'list',
            items: [
              'El hijo debe tener <strong>21 años cumplidos</strong> el día en que se presenta la petición.',
              'Debe ser <strong>ciudadano</strong>, por nacimiento o naturalización; un hijo residente no puede pedir a sus padres.',
              'Debe <strong>probar el parentesco</strong>: su acta de nacimiento con el nombre del padre o la madre y prueba de su ciudadanía.',
              'Si los padres no estaban casados, el <strong>padre</strong> suele tener que probar una relación real de padre e hijo.',
              'El peticionario firma la <strong>declaración de sostenimiento</strong>, el Formulario I-864, y asume un compromiso económico.',
            ],
          },
          {
            kind: 'note',
            text: 'Una petición aprobada NO es la residencia: no da permiso de trabajo y, por sí sola, no detiene una deportación. Solo reconoce que el parentesco existe. La residencia se decide en la segunda etapa, y esa etapa depende de cómo entró usted.',
          },
        ],
      },
      {
        icon: 'home',
        title: 'Escenario A: entró con visa y se quedó',
        subtitle: 'Ajuste de estatus sin salir del país',
        blocks: [
          {
            kind: 'text',
            text: 'Si usted entró con una visa —turista, trabajo, estudiante— o fue admitido o recibió permiso condicional de entrada, la ley permite pedir la residencia <strong>desde dentro del país</strong>. Es el ajuste de estatus y su requisito clave es que la entrada haya sido inspeccionada. Aquí viene lo que sorprende: para los familiares inmediatos de un ciudadano, la ley <strong>perdona la estadía vencida</strong> y el trabajo sin autorización. Que su visa venciera hace quince años no cierra esta puerta.',
          },
          {
            kind: 'steps',
            items: [
              'Su hijo presenta la <strong>petición familiar</strong> y, casi siempre, la solicitud de residencia se presenta a la vez.',
              'Usted acude a la cita de <strong>datos biométricos</strong>: huellas, foto y verificación de antecedentes.',
              'Completa el <strong>examen médico</strong> con un médico autorizado, con las vacunas requeridas.',
              'Se presenta el <strong>apoyo económico</strong> de su hijo o el de un copatrocinador.',
              'Acude a la <strong>entrevista</strong> en la oficina local y se decide el caso.',
            ],
          },
          {
            kind: 'warning',
            text: 'Entrar con documentos de otra persona o declarando algo falso ante un oficial no es lo mismo que entrar con su propia visa: abre un problema de fraude que necesita su propio perdón y exige el mismo familiar calificado. Dígaselo a su abogado en la primera cita.',
          },
        ],
      },
      {
        icon: 'plane',
        title: 'Escenario B: entró sin inspección',
        subtitle: 'Proceso consular y perdón provisional',
        blocks: [
          {
            kind: 'text',
            text: 'Si usted cruzó sin ser inspeccionado, la ley normalmente no le permite ajustar dentro del país aunque su hijo sea ciudadano: la residencia se otorgaría en un <strong>consulado en su país de origen</strong>. El problema es lo que ocurre al salir. Quien acumuló más de 180 días de presencia ilegal y se va queda sujeto a una <strong>barra de tres años</strong>; quien acumuló un año o más, a una de <strong>diez años</strong>. La barra no se activa adentro: se activa con la salida.',
          },
          {
            kind: 'text',
            text: 'Para eso existe el <strong>perdón provisional por presencia ilegal, el Formulario I-601A</strong>: permite pedir el perdón de esas barras <strong>antes de salir</strong>, estando aún aquí con la familia, para que la separación dure semanas y no años.',
          },
          {
            kind: 'steps',
            items: [
              'Se presenta y se <strong>aprueba la petición familiar</strong> de su hijo ciudadano.',
              'El caso pasa al <strong>Centro Nacional de Visas</strong>, se abre el expediente de visa y se pagan las cuotas.',
              'Estando todavía aquí se presenta el <strong>Formulario I-601A</strong> con la evidencia de sufrimiento extremo.',
              'Con el perdón <strong>ya aprobado</strong> se completa la solicitud y se agenda la entrevista consular.',
              'Usted viaja, asiste a la <strong>entrevista</strong> y, si todo procede, regresa como residente.',
            ],
          },
          {
            kind: 'warning',
            text: 'Nunca salga del país porque «ya está aprobada la petición». La petición aprobada no es el perdón. Salir antes de tiempo puede activar la barra completa y convertir un caso de meses en uno de diez años.',
          },
        ],
      },
      {
        icon: 'alert',
        title: 'El punto crítico: su hijo ciudadano no sirve para el perdón',
        subtitle: 'Qué es un familiar calificado',
        blocks: [
          {
            kind: 'text',
            text: 'El perdón no se concede porque su familia lo necesite en general, sino si usted demuestra que un <strong>familiar calificado</strong> sufriría un daño extremo en caso de negarse. Y la ley define de forma muy estrecha quién es ese familiar.',
          },
          {
            kind: 'cards',
            items: [
              {
                title: 'Sí califica: su cónyuge',
                desc: 'Su esposo o esposa, si es ciudadano o residente permanente. Es el caso más común.',
              },
              {
                title: 'Sí califica: su padre o su madre',
                desc: 'Su propio papá o mamá, si es ciudadano o residente, aunque sean mayores y usted los cuide.',
              },
              {
                title: 'NO califica: su hijo',
                desc: 'Aunque sea ciudadano y aunque sea exactamente quien está presentando la petición por usted.',
              },
              {
                title: 'NO califican: los demás',
                desc: 'Nietos, hermanos, sobrinos, suegros o parejas sin matrimonio legal. Dan contexto, no sostienen el perdón.',
              },
            ],
          },
          {
            kind: 'text',
            text: 'Léalo con calma, porque es contraintuitivo: <strong>el mismo hijo ciudadano que puede pedirlo no puede sostener el perdón</strong>. Una madre puede tener una petición aprobada por su hija de 24 años y aun así no tener manera de obtenerlo. Si alguien le promete que «con el hijo ciudadano basta», le está mintiendo. Cuando no hay cónyuge ni padre que califique, revise estas otras puertas antes de gastar dinero:',
          },
          {
            kind: 'list',
            items: [
              'Revise si hay un <strong>cónyuge o un padre ciudadano o residente</strong> que la familia no había considerado, o alguien por naturalizarse.',
              'Averigüe si lo alcanza una <strong>petición presentada a su favor en o antes del 30 de abril de 2001</strong>, que en ciertos casos permite ajustar aquí pagando una multa de ley.',
              'Considere una base <strong>independiente</strong> de la petición: violencia doméstica, ser víctima de un delito, temor de persecución o trata.',
              'Si ya está en <strong>corte de inmigración</strong>, ahí un hijo ciudadano sí puede ser el familiar cuyo sufrimiento se evalúa.',
            ],
          },
        ],
      },
      {
        icon: 'heart',
        title: 'Qué es el «sufrimiento extremo» y cómo se prueba',
        subtitle: 'No basta con decir que la familia va a sufrir',
        blocks: [
          {
            kind: 'text',
            text: 'La separación familiar duele siempre y el gobierno lo sabe. Por eso el estándar no es el sufrimiento normal de cualquier familia, sino un <strong>sufrimiento extremo</strong>. Además, se analizan dos escenarios que hay que documentar por separado: qué le pasaría al familiar calificado <strong>si se queda aquí sin usted</strong> y qué le pasaría <strong>si se va con usted</strong>. Los dos tienen que doler.',
          },
          {
            kind: 'list',
            items: [
              '<strong>Salud:</strong> diagnósticos, tratamientos, medicamentos y qué atención existe en el país de destino.',
              '<strong>Economía:</strong> quién sostiene el hogar, deudas, renta y la caída real de ingresos.',
              '<strong>Cuidado de otros:</strong> hijos pequeños, un familiar enfermo o un adulto mayor que depende de usted.',
              '<strong>Educación:</strong> interrupción escolar, necesidades especiales y servicios que allá no existirían.',
              '<strong>Condiciones del país:</strong> seguridad, acceso a medicina, idioma y economía, con informes reconocidos.',
              '<strong>Salud emocional:</strong> evaluación psicológica profesional cuando corresponda, no una carta genérica.',
            ],
          },
          {
            kind: 'text',
            text: 'El sufrimiento de sus hijos importa de forma indirecta: cuenta en la medida en que afecta al familiar calificado. Por eso un buen expediente explica cómo todo ese peso cae sobre los hombros del cónyuge o del padre que califica.',
          },
          {
            kind: 'note',
            text: 'El perdón es discrecional: aun con el sufrimiento probado, el oficial pesa lo positivo y lo negativo de su historia. Antecedentes limpios, impuestos pagados y trabajo estable son parte del caso.',
          },
        ],
      },
      {
        icon: 'gavel',
        title: 'Si hubo deportación previa o reingresos',
        subtitle: 'Cuando el caso deja de ser sencillo',
        blocks: [
          {
            kind: 'text',
            text: 'Muchas personas cruzaron más de una vez, fueron devueltas en la frontera o firmaron papeles que nunca entendieron. Todo eso deja huella en los sistemas del gobierno y cambia la estrategia.',
          },
          {
            kind: 'cards',
            items: [
              {
                title: 'Orden de deportación previa',
                desc: 'Sigue viva hasta que se resuelva, incluida la dictada en ausencia porque usted nunca supo de la audiencia.',
              },
              {
                title: 'Permiso para volver a solicitar',
                desc: 'Quien fue removido necesita el Formulario I-212, un trámite aparte del perdón por presencia ilegal.',
              },
              {
                title: 'La llamada barra permanente',
                desc: 'Si acumuló un año o más de presencia ilegal, o fue removido, y volvió a entrar sin ser admitido, aplica una barra que el perdón provisional no cubre.',
              },
              {
                title: 'Retornos en la frontera',
                desc: 'Un retorno voluntario no es una orden de deportación, pero puede contar como salida para las barras.',
              },
            ],
          },
          {
            kind: 'text',
            text: 'La barra permanente es la más severa y la peor entendida: en la mayoría de estos casos la persona debe permanecer <strong>fuera de Estados Unidos durante diez años</strong> antes de pedir permiso para solicitar admisión de nuevo.',
          },
          {
            kind: 'warning',
            text: 'Si alguna vez lo detuvieron en la frontera, firmó documentos que no leyó o pasó por una corte de inmigración, no asuma nada. Aplicar sin saber qué dice su expediente puede activar consecuencias dormidas.',
          },
        ],
      },
      {
        icon: 'clock',
        title: 'Cuánto tarda y cuánto cuesta',
        subtitle: 'La respuesta honesta: depende y las cifras cambian',
        blocks: [
          {
            kind: 'text',
            text: 'Ningún abogado serio le dará un número exacto de meses ni un precio de gobierno grabado en piedra: los tiempos varían por formulario, oficina y consulado, y las cuotas se actualizan. Lo que sí podemos darle es el mapa de las etapas.',
          },
          {
            kind: 'table',
            headers: ['Etapa', 'Qué se presenta', 'Dónde verificar plazo y costo'],
            rows: [
              ['Petición familiar', 'Formulario I-130 y prueba del parentesco', 'Tiempos y tarifas publicados por USCIS'],
              ['Ajuste dentro de EE.UU.', 'Formulario I-485, examen médico y apoyo I-864', 'Tiempos de la oficina local de USCIS'],
              ['Perdón provisional', 'Formulario I-601A con la evidencia de sufrimiento', 'Tiempos de USCIS para ese formulario'],
              ['Etapa consular', 'Solicitud de visa, documentos civiles y cuotas del Departamento de Estado', 'Página de su consulado y del Centro Nacional de Visas'],
            ],
          },
          {
            kind: 'list',
            items: [
              'Cuotas oficiales de cada formulario, que se pagan aparte y no se devuelven.',
              'Examen médico con médico autorizado y las vacunas que falten.',
              'Actas, antecedentes certificados y <strong>traducciones</strong> al inglés.',
              'Viaje, hospedaje y días sin trabajar si su caso pasa por el consulado.',
              'Honorarios legales, por escrito en un contrato que usted entienda.',
            ],
          },
          {
            kind: 'note',
            text: 'Antes de pagar, verifique el monto vigente en la fuente oficial: las tarifas y los tiempos cambian, y una cuota equivocada hace que le rechacen el paquete completo. Exija siempre recibo y copia.',
          },
        ],
      },
      {
        icon: 'search',
        title: 'Antes de aplicar: pida su expediente',
        subtitle: 'Primero saber, después solicitar',
        blocks: [
          {
            kind: 'text',
            text: 'Aplicar a ciegas es el riesgo más subestimado del proceso. Cuando usted presenta una solicitud le entrega al gobierno su dirección, su historia y su huella, y le pide que revise su pasado completo. Si ahí hay algo que usted no recuerda o que nunca le explicaron, se entera en el peor momento. Por eso, ante cualquier duda sobre entradas, detenciones o cortes, lo primero es <strong>pedir su propio expediente</strong>.',
          },
          {
            kind: 'list',
            items: [
              'El <strong>expediente de inmigración</strong> con las solicitudes anteriores a su nombre y sus decisiones.',
              'El <strong>registro de la corte de inmigración</strong>, para saber si existe una orden y de qué tipo.',
              'Los <strong>registros de entradas y encuentros</strong> con autoridades fronterizas, con los papeles que firmó.',
              'Sus <strong>antecedentes penales</strong> con la disposición final certificada de cada caso.',
              'Los <strong>formularios I-9</strong> que llenó a lo largo de los años.',
            ],
          },
          {
            kind: 'warning',
            text: 'Revise con especial cuidado si alguna vez se declaró ciudadano estadounidense para conseguir empleo, un beneficio o para votar, incluso marcando la casilla equivocada en un formulario I-9. Es uno de los pocos problemas para los que la ley no ofrece un perdón general.',
          },
          {
            kind: 'note',
            text: 'Las reglas, las cuotas y las prioridades de aplicación cambian con frecuencia. Antes de presentar nada, confirme con su abogado el estado vigente del trámite y de su expediente.',
          },
        ],
      },
      {
        icon: 'clipboard',
        title: 'Checklist de evidencia para la entrevista',
        subtitle: 'Lo que se arma desde hoy',
        blocks: [
          {
            kind: 'text',
            text: 'La entrevista no se prepara en tres días. Los casos que salen bien llevan meses de juntar, ordenar y traducir papeles. Empiece hoy y guarde todo en una carpeta.',
          },
          {
            kind: 'list',
            items: [
              'Acta de nacimiento de su hijo con su nombre como padre o madre, y su propia acta.',
              'Prueba de la ciudadanía de su hijo, y acta de matrimonio de los padres o prueba de la relación real.',
              'Su pasaporte, cualquier visa y el registro de entrada, si entró con inspección.',
              'Impuestos y comprobantes de ingreso de su hijo y del copatrocinador, si lo hay.',
              'Comprobantes de domicilio y de tiempo aquí: recibos, contratos de renta, cartas del trabajo.',
              'Documentos de cualquier arresto con la disposición certificada, y traducciones al inglés de todo.',
            ],
          },
          {
            kind: 'steps',
            items: [
              'Revise que <strong>los datos coincidan</strong> en todos los formularios: nombres, fechas y direcciones.',
              'Lleve los <strong>originales</strong> el día de la entrevista, además de las copias.',
              'Conteste con la <strong>verdad</strong>: una mentira detectada cierra puertas que el hecho original no cerraba.',
              'Pida <strong>intérprete</strong> y no firme nada que no entienda.',
            ],
          },
          {
            kind: 'note',
            text: 'Si un abogado lleva su caso debe estar registrado formalmente en su expediente y puede acompañarlo a la entrevista. Si alguien le cobró por «llenar los papeles» pero no aparece por escrito como su representante, usted está solo.',
          },
        ],
      },
    ],
    faq: {
      title: 'Preguntas frecuentes',
      items: [
        {
          q: 'Mi hijo cumplió 21 pero gana poco. ¿Puede pedirme?',
          a: 'Sí. Debe demostrar ingresos de al menos el 125% de las guías federales de pobreza según el tamaño del hogar. Si no alcanza, la ley permite sumar bienes o presentar un copatrocinador que sí cumpla.',
        },
        {
          q: 'Si la petición está aprobada, ¿ya no me pueden deportar?',
          a: 'Sí pueden. Una petición aprobada solo reconoce el parentesco: no da estatus ni protege por sí sola frente a un procedimiento de remoción. En algunos casos sirve como elemento dentro de una defensa, pero eso se evalúa con el expediente completo.',
        },
        {
          q: 'Llevo más de veinte años aquí. ¿No me toca «la ley de los diez años»?',
          a: 'Eso es una defensa que solo existe dentro de un caso en corte de inmigración, no un trámite que se pida en una oficina, y tiene requisitos muy estrictos.',
        },
        {
          q: '¿Puedo salir del país mientras mi caso está en trámite?',
          a: 'No salga sin consultarlo antes. En un ajuste dentro del país, salir sin el permiso de viaje puede tomarse como abandono de la solicitud. En la vía consular, la salida es justamente lo que activa las barras.',
        },
        {
          q: 'Mi hijo es ciudadano pero vive fuera del país. ¿Puede pedirme?',
          a: 'Puede presentarla, pero para firmar la declaración de sostenimiento debe tener su domicilio en Estados Unidos o demostrar que lo está restableciendo. Conviene resolverlo desde el principio.',
        },
        {
          q: '¿Puedo trabajar legalmente mientras se resuelve?',
          a: 'Depende del camino. En el ajuste dentro del país normalmente se puede pedir un permiso de trabajo mientras el caso está pendiente. En la vía consular no: la autorización llega con la residencia.',
        },
      ],
    },
    conclusion: {
      title: 'La puerta se abre a los 21, pero la llave es su historia de entrada',
      text: 'Que su hijo cumpla 21 años es una oportunidad real y, para muchas familias en Texas, la mejor que van a tener. Pero el resultado no lo decide la petición: lo deciden cómo entró usted, si hubo salidas o deportaciones y si hay un cónyuge o un padre que sostenga el perdón. Averiguarlo antes cuesta una consulta; averiguarlo después de salir del país puede costar diez años.',
      advice: 'Antes de firmar el primer formulario, pida que revisen su expediente y le expliquen cuál de los dos escenarios es el suyo.',
    },
    sources: {
      title: 'Fuentes y referencias',
      list: [
        'Ley de Inmigración y Nacionalidad (INA) 201(b) — familiares inmediatos exentos de límites numéricos de visa',
        'INA 245(a) y 245(c) — requisitos del ajuste de estatus y excepciones para familiares inmediatos',
        'INA 212(a)(9)(B) y 212(a)(9)(C) — barras de tres y diez años y barra por reingreso',
        'USCIS — Formulario I-601A, perdón provisional por presencia ilegal, y sus instrucciones oficiales',
        'INA 213A y Formulario I-864 — declaración jurada de sostenimiento económico del peticionario',
      ],
    },
    ui: ARTICLE_UI.es,
  },
  en: {
    metaTitle: 'U.S. Citizen Child Turned 21: Petition Parents',
    metaDesc:
      'Your U.S. citizen child turned 21 and wants to petition for you. How everything turns on the way you entered, the I-601A waiver, and the mistake that ends cases.',
    title: 'My U.S. Citizen Child Turned 21: How They Can Petition for Me',
    displayDate: 'Aug 06, 2026',
    readTime: '23 min',
    categoryLabel: 'Immigration Process',
    summary: {
      title: 'Initial Summary',
      text: 'The day your son or daughter turns 21, one of the few doors immigration law leaves wide open finally opens: they can petition for you as an <strong>immediate relative</strong>, a category with no annual cap and no waiting line. But opening the door is not the same as walking through it. What decides your case is not the petition but <strong>how you entered the country</strong>: if you came on a visa and stayed, it can usually be fixed without leaving; if you entered without inspection, you must attend a consular interview abroad and will almost always need a waiver. And there is the detail almost nobody explains in time: <strong>that waiver does not rest on your citizen child</strong>.',
    },
    intro: [
      'It is one of the most common calls our office receives, and it almost always arrives with the same mix of hope and hurry: «my child just turned 21, they can fix my papers now.» The first part is true and it is good news. The second depends on something that happened ten, twenty or thirty years ago, almost always on a single day: the day you entered.',
      'In 2026 that conversation is no longer simple paperwork. Thousands of mixed-status families in Houston and across Texas are trying to protect their parents while they still can, and that urgency pushes people to sign applications they do not understand.',
      'Here is the explanation with nothing dressed up: what the petition does and does not do, the two entry scenarios, the requirement that breaks entire cases, and what to review before mailing the first form.',
    ],
    sections: [
      {
        icon: 'users',
        title: 'The basic rule: at 21, your child becomes a petitioner',
        subtitle: 'Immediate relative, no waiting line',
        blocks: [
          {
            kind: 'text',
            text: 'Immigration law sorts the relatives of a citizen into two groups. Some fall into categories with annual caps and wait years for a visa number. Others are <strong>immediate relatives</strong> and are exempt from those limits: no line and no visa bulletin to wait on. Parents of a citizen who is at least 21 belong to that second group.',
          },
          {
            kind: 'list',
            items: [
              'The child must have <strong>already turned 21</strong> on the day the petition is filed.',
              'They must be a <strong>citizen</strong>, by birth or naturalization; a child who is only a resident cannot petition for parents.',
              'They must <strong>prove the relationship</strong>: their birth certificate showing the parent’s name and proof of their own citizenship.',
              'If the parents were not married, the <strong>father</strong> usually must also prove a genuine parent-child relationship.',
              'The petitioner signs the <strong>affidavit of support</strong>, Form I-864, taking on a financial commitment.',
            ],
          },
          {
            kind: 'note',
            text: 'An approved petition is NOT residency: it grants no work permit and, on its own, does not stop a deportation. It only recognizes that the family relationship exists. Residency is decided in the second stage, and that stage depends on how you entered.',
          },
        ],
      },
      {
        icon: 'home',
        title: 'Scenario A: you entered on a visa and stayed',
        subtitle: 'Adjustment of status without leaving the country',
        blocks: [
          {
            kind: 'text',
            text: 'If you entered on a visa — tourist, work, student — or were admitted or paroled in by an officer, the law lets you seek residency <strong>from inside the country</strong>. That is adjustment of status, and its key requirement is that the entry was inspected. Here is what surprises people: for immediate relatives of a citizen, the law <strong>forgives the overstay</strong> and the unauthorized work. A visa that expired fifteen years ago does not close this door.',
          },
          {
            kind: 'steps',
            items: [
              'Your child files the <strong>family petition</strong> and, in most cases, the residency application is filed at the same time.',
              'You attend the <strong>biometrics appointment</strong>: fingerprints, photo and background checks.',
              'You complete the <strong>medical exam</strong> with an authorized physician, with the required vaccinations.',
              'Your child files the <strong>financial support</strong>, or a joint sponsor does.',
              'You attend the <strong>interview</strong> at the local office and the case is decided.',
            ],
          },
          {
            kind: 'warning',
            text: 'Entering with someone else’s documents or by telling an officer something false is not the same as entering on your own visa: it opens a fraud problem that needs its own waiver and demands the same qualifying relative. Tell your attorney at the first meeting.',
          },
        ],
      },
      {
        icon: 'plane',
        title: 'Scenario B: you entered without inspection',
        subtitle: 'Consular processing and the provisional waiver',
        blocks: [
          {
            kind: 'text',
            text: 'If you crossed without being inspected, the law normally does not let you adjust inside the country even with a citizen child: residency would be granted at a <strong>consulate in your home country</strong>. The problem is what happens on departure. Someone who accumulated more than 180 days of unlawful presence and leaves becomes subject to a <strong>three-year bar</strong>; someone with a year or more, to a <strong>ten-year bar</strong>. The bar does not trigger inside: it triggers when you leave.',
          },
          {
            kind: 'text',
            text: 'That is why the <strong>provisional unlawful presence waiver, Form I-601A</strong>, exists: it lets you request forgiveness of those bars <strong>before departing</strong>, while still here with your family, so the separation lasts weeks instead of years.',
          },
          {
            kind: 'steps',
            items: [
              'The <strong>family petition</strong> filed by your citizen child is submitted and approved.',
              'The case moves to the <strong>National Visa Center</strong>, the immigrant visa file is opened and fees are paid.',
              'While still here, <strong>Form I-601A</strong> is filed with the extreme hardship evidence.',
              'With the waiver <strong>already approved</strong>, the visa application is completed and the interview is scheduled.',
              'You travel, attend the <strong>interview</strong> and, if all is in order, return as a resident.',
            ],
          },
          {
            kind: 'warning',
            text: 'Never leave the country because «the petition is already approved.» An approved petition is not the waiver. Leaving too early can trigger the full bar and turn a case of months into one of ten years.',
          },
        ],
      },
      {
        icon: 'alert',
        title: 'The critical point: your citizen child does not count for the waiver',
        subtitle: 'What a qualifying relative is',
        blocks: [
          {
            kind: 'text',
            text: 'The waiver is not granted because your family needs it in general, but because you prove that a <strong>qualifying relative</strong> would suffer extreme hardship if it were denied. And the law defines that relative very narrowly.',
          },
          {
            kind: 'cards',
            items: [
              {
                title: 'Counts: your spouse',
                desc: 'Your husband or wife, if they are a citizen or lawful permanent resident. This is the most common case.',
              },
              {
                title: 'Counts: your mother or father',
                desc: 'Your own parent, if they are a citizen or resident, even if they are elderly and you care for them.',
              },
              {
                title: 'Does NOT count: your child',
                desc: 'Even if they are a citizen and even if they are exactly the person filing the petition for you.',
              },
              {
                title: 'Do NOT count: the rest',
                desc: 'Grandchildren, siblings, nieces and nephews, in-laws, partners without a legal marriage. They add context, not support.',
              },
            ],
          },
          {
            kind: 'text',
            text: 'Read that slowly, because it is counterintuitive: <strong>the very citizen child who can petition for you cannot support the waiver</strong>. A mother can hold an approved petition filed by her 24-year-old daughter and still have no way to obtain it. If someone promises you that «the citizen child is enough,» they are lying to you. When there is no qualifying spouse or parent, review these other doors before spending money:',
          },
          {
            kind: 'list',
            items: [
              'Check whether there is a <strong>citizen or resident spouse or parent</strong> the family had not considered, or someone about to naturalize.',
              'Find out whether you are covered by a <strong>petition filed for you on or before April 30, 2001</strong>, which in certain cases allows adjustment here upon paying a penalty set by law.',
              'Consider a basis <strong>independent</strong> of the petition: domestic violence, being a crime victim, fear of persecution, or trafficking.',
              'If you are already in <strong>immigration court</strong>, there a citizen child can be the relative whose hardship is weighed.',
            ],
          },
        ],
      },
      {
        icon: 'heart',
        title: 'What «extreme hardship» means and how it is proven',
        subtitle: 'Saying the family will suffer is not enough',
        blocks: [
          {
            kind: 'text',
            text: 'Family separation always hurts, and the government knows it. That is why the standard is not the ordinary suffering of any family but <strong>extreme hardship</strong>. The analysis also covers two scenarios that must be documented separately: what would happen to the qualifying relative <strong>if they stay here without you</strong> and what would happen <strong>if they go with you</strong>. Both must hurt.',
          },
          {
            kind: 'list',
            items: [
              '<strong>Health:</strong> diagnoses, treatment, medications, and what care exists in the destination country.',
              '<strong>Finances:</strong> who supports the household, debts, rent, and the real drop in income.',
              '<strong>Care for others:</strong> young children, a sick relative, or an older adult who depends on you.',
              '<strong>Education:</strong> interrupted schooling, special needs, and services that would not exist there.',
              '<strong>Country conditions:</strong> safety, access to medicine, language and the economy, backed by recognized reports.',
              '<strong>Emotional health:</strong> a professional psychological evaluation where appropriate, not a generic letter.',
            ],
          },
          {
            kind: 'text',
            text: 'Your children’s suffering matters indirectly: it counts to the extent it affects the qualifying relative. That is why a strong file explains how all that weight lands on the shoulders of the spouse or parent who qualifies.',
          },
          {
            kind: 'note',
            text: 'The waiver is discretionary: even with hardship proven, the officer weighs the positives and negatives of your history. A clean record, taxes paid and steady work are part of the case.',
          },
        ],
      },
      {
        icon: 'gavel',
        title: 'If there were prior removals or re-entries',
        subtitle: 'When the case stops being simple',
        blocks: [
          {
            kind: 'text',
            text: 'Many people crossed more than once, were turned back at the border, or signed papers they never understood. All of that leaves a trace in government systems and changes the strategy.',
          },
          {
            kind: 'cards',
            items: [
              {
                title: 'A prior removal order',
                desc: 'It stays alive until it is resolved, including one entered in absentia because you never learned of the hearing.',
              },
              {
                title: 'Permission to reapply',
                desc: 'Someone who was removed needs Form I-212, a separate filing from the unlawful presence waiver.',
              },
              {
                title: 'The so-called permanent bar',
                desc: 'If you accumulated a year or more of unlawful presence, or were removed, and then entered again without being admitted, a bar applies that the provisional waiver does not cover.',
              },
              {
                title: 'Turnarounds at the border',
                desc: 'A voluntary return is not a removal order, but it can count as a departure for purposes of the bars.',
              },
            ],
          },
          {
            kind: 'text',
            text: 'The permanent bar is the harshest and most misunderstood: in most of these cases the person must remain <strong>outside the United States for ten years</strong> before requesting permission to seek admission again.',
          },
          {
            kind: 'warning',
            text: 'If you were ever detained at the border, signed documents you did not read, or went through immigration court, do not assume anything. Applying without knowing what your record says can trigger dormant consequences.',
          },
        ],
      },
      {
        icon: 'clock',
        title: 'How long it takes and what it costs',
        subtitle: 'The honest answer: it depends and the numbers change',
        blocks: [
          {
            kind: 'text',
            text: 'No serious attorney will give you an exact number of months or a government price carved in stone: timelines vary by form, office and consulate, and official fees are updated. What we can give you is the map of the stages.',
          },
          {
            kind: 'table',
            headers: ['Stage', 'What is filed', 'Where to verify timing and cost'],
            rows: [
              ['Family petition', 'Form I-130 and proof of the relationship', 'Processing times and fees published by USCIS'],
              ['Adjustment inside the U.S.', 'Form I-485, medical exam and Form I-864 support', 'Processing times for the local USCIS office'],
              ['Provisional waiver', 'Form I-601A with the hardship evidence', 'USCIS processing times for that form'],
              ['Consular stage', 'Visa application, civil documents and Department of State fees', 'Your consulate page and the National Visa Center'],
            ],
          },
          {
            kind: 'list',
            items: [
              'Official filing fees for each form, paid separately and generally non-refundable.',
              'The medical exam with an authorized physician and any missing vaccinations.',
              'Certificates, certified records and <strong>translations</strong> into English.',
              'Travel, lodging and days off work if your case goes through the consulate.',
              'Legal fees, set out in writing in a contract you understand.',
            ],
          },
          {
            kind: 'note',
            text: 'Before paying, verify the current amount at the official source: fees and timelines change, and a wrong fee gets the whole package rejected. Always demand a receipt and a copy.',
          },
        ],
      },
      {
        icon: 'search',
        title: 'Before you apply: request your own record',
        subtitle: 'First know, then file',
        blocks: [
          {
            kind: 'text',
            text: 'Applying blind is the most underestimated risk in the process. When you file, you hand the government your address, your history and your fingerprints, and ask them to review your entire past. If something there is something you do not remember or were never told, you find out at the worst moment. So with any doubt about entries, detentions or courts, the first step is to <strong>request your own record</strong>.',
          },
          {
            kind: 'list',
            items: [
              'The <strong>immigration file</strong> with prior applications in your name and the decisions on them.',
              'The <strong>immigration court record</strong>, to learn whether an order exists and of what kind.',
              'Records of <strong>entries and encounters</strong> with border authorities, with the papers you signed.',
              'Your <strong>criminal history</strong> with the certified final disposition of every case.',
              'The <strong>Form I-9</strong> paperwork you completed over the years.',
            ],
          },
          {
            kind: 'warning',
            text: 'Review with particular care whether you ever claimed to be a U.S. citizen to get a job, a benefit, or to vote, including by checking the wrong box on a Form I-9. It is one of the few problems for which the law offers no general waiver.',
          },
          {
            kind: 'note',
            text: 'Rules, fees and enforcement priorities change often. Before filing anything, confirm with your attorney the current status of the process and of your record.',
          },
        ],
      },
      {
        icon: 'clipboard',
        title: 'Evidence checklist for the interview',
        subtitle: 'Built starting today',
        blocks: [
          {
            kind: 'text',
            text: 'An interview is not prepared in three days. Cases that go well took months of collecting, organizing and translating paperwork. Start today and keep everything in one folder.',
          },
          {
            kind: 'list',
            items: [
              'Your child’s birth certificate showing your name as the parent, plus your own certificate.',
              'Proof of your child’s citizenship, and the parents’ marriage certificate or proof of the real relationship.',
              'Your passport, any visa and your entry record, if you were inspected.',
              'Tax returns and proof of income for your child and the joint sponsor, if there is one.',
              'Proof of address and time here: bills, leases, letters from work.',
              'Documents for any arrest with the certified disposition, and English translations of everything.',
            ],
          },
          {
            kind: 'steps',
            items: [
              'Check that <strong>the data matches</strong> across every form: names, dates and addresses.',
              'Bring the <strong>originals</strong> on interview day, along with the copies.',
              'Answer <strong>truthfully</strong>: a detected lie closes doors the underlying fact did not.',
              'Ask for an <strong>interpreter</strong> and do not sign anything you do not understand.',
            ],
          },
          {
            kind: 'note',
            text: 'If an attorney handles your case, they must be formally on record in your file and can accompany you to the interview. If someone charged you to «fill out the papers» but is not on record as your representative, you stand alone.',
          },
        ],
      },
    ],
    faq: {
      title: 'Frequently asked questions',
      items: [
        {
          q: 'My child turned 21 but earns very little. Can they petition for me?',
          a: 'Yes. The petitioner signs the affidavit of support and must show income of at least 125% of the federal poverty guidelines for the household size. If that falls short, the law allows counting assets or presenting a joint sponsor.',
        },
        {
          q: 'If the petition is approved, can I still be deported?',
          a: 'Yes, you can. An approved petition only recognizes the family relationship: it grants no status and does not by itself protect you from removal proceedings. In some cases it serves as one element within a defense, evaluated with the full record.',
        },
        {
          q: 'I have been here over twenty years. Does the «ten-year law» apply to me?',
          a: 'What people call that is a defense that exists only inside a case in immigration court, not something you file at an office. It has very strict requirements and an even higher hardship standard.',
        },
        {
          q: 'Can I travel outside the country while my case is pending?',
          a: 'Do not leave without asking first. In an adjustment inside the country, leaving without the travel document can be treated as abandoning the application. On the consular path, departure is precisely what triggers the bars.',
        },
        {
          q: 'My child is a citizen but lives abroad. Can they petition for me?',
          a: 'They can file the petition, but to sign the affidavit of support the petitioner must be domiciled in the United States or show they are reestablishing that domicile. It is worth resolving early.',
        },
        {
          q: 'Can I work legally while the case is pending?',
          a: 'It depends on the path. In adjustment inside the country you can normally request a work permit while the case is pending. On the consular path you cannot: authorization arrives with residency, after the interview.',
        },
      ],
    },
    conclusion: {
      title: 'The door opens at 21, but the key is your entry history',
      text: 'Your child turning 21 is a real opportunity and, for many families in Texas, the best one they will ever get. But the outcome is not decided by the petition: it is decided by how you entered, whether there were departures or removals, and whether a citizen or resident spouse or parent exists to support the waiver. Finding that out first costs a consultation; finding it out after leaving the country can cost ten years.',
      advice: 'Before signing the first form, have your record reviewed and get a clear answer on which of the two scenarios is yours.',
    },
    sources: {
      title: 'Sources and references',
      list: [
        'Immigration and Nationality Act (INA) 201(b) — immediate relatives exempt from numerical visa limits',
        'INA 245(a) and 245(c) — adjustment of status requirements and the exceptions for immediate relatives',
        'INA 212(a)(9)(B) and 212(a)(9)(C) — three- and ten-year unlawful presence bars and the re-entry bar',
        'USCIS — Form I-601A, provisional unlawful presence waiver, and its official instructions',
        'INA 213A and Form I-864 — affidavit of support signed by the petitioner',
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
          ? 'Hijo ciudadano estadounidense de 21 años acompañando a sus padres a una cita de inmigración'
          : 'U.S. citizen child of 21 accompanying their parents to an immigration appointment'
      }
      isoDate={ISO_DATE}
      servicePath="/servicios/familia"
      trackerCategory="Procesos Migratorios"
    />
  );
}

export function generateStaticParams() {
  return [{ lang: 'es' }, { lang: 'en' }];
}
