import type { Metadata } from 'next';
import BlogArticleLayout from '../../../components/blogs/BlogArticleLayout';
import { buildArticleMetadata } from '../../../components/blogs/articleMetadata';
import { ARTICLE_UI, type BlogArticleContent } from '../../../components/blogs/articleModel';

const SLUG = 'hijo-ciudadano-21-anos-pedir-padres-2026';
const ISO_DATE = '2026-08-06';
// TODO(portada): sustituir cuando marketing entregue la imagen definitiva.
const IMAGE = '/og-default.jpg';

const content: Record<'es' | 'en', BlogArticleContent> = {
  es: {
    metaTitle: 'Hijo ciudadano cumplió 21: cómo pedir a padres',
    metaDesc:
      'Su hijo ciudadano cumplió 21 y quiere pedirle la residencia. Cómo cambia todo según su forma de entrada, qué es el perdón I-601A y el error que cierra casos.',
    title: 'Mi hijo ciudadano cumplió 21: cómo puede pedirme y qué pasa si entré sin papeles',
    displayDate: '06 Ago, 2026',
    readTime: '11 min',
    categoryLabel: 'Procesos Migratorios',
    summary: {
      title: 'Resumen inicial',
      text: 'El día en que su hijo o su hija cumple 21 años se abre una de las pocas puertas que la ley migratoria deja abiertas de par en par: puede presentar una petición por usted como <strong>familiar inmediato</strong>, una categoría sin cuota anual ni fila de espera. Pero abrir la puerta no es cruzarla. Lo que decide su caso no es la petición, sino <strong>cómo entró usted al país</strong>: si entró con visa y se quedó, en la mayoría de los casos se arregla sin salir; si entró sin inspección, hay que ir a una entrevista consular fuera y casi siempre hace falta un perdón. Y ahí está el detalle que casi nadie explica a tiempo: <strong>ese perdón no se apoya en su hijo ciudadano</strong>, por mucho que sea él quien lo está pidiendo.',
    },
    intro: [
      'Es una de las llamadas más comunes que recibe nuestra oficina y casi siempre llega con la misma mezcla de esperanza y prisa: «mi hijo ya cumplió 21, ya puede arreglarme». La primera parte es cierta y es una buena noticia. La segunda depende de algo que ocurrió hace diez, veinte o treinta años, casi siempre en un solo día: el día en que usted entró.',
      'En 2026 esa conversación ya no es un simple trámite. Miles de familias de estatus mixto en Houston y en todo Texas están tratando de blindar a los papás mientras se pueda, y esa urgencia empuja a firmar solicitudes que no se entienden, muchas veces con alguien que no es abogado.',
      'Aquí va la explicación sin adornos: qué hace la petición y qué no hace, los dos escenarios de entrada, el requisito que rompe casos enteros, qué pasa si hubo una deportación y qué debe revisar antes de mandar el primer formulario.',
    ],
    sections: [
      {
        icon: 'users',
        title: 'La regla básica: a los 21 su hijo se convierte en peticionario',
        subtitle: 'Familiar inmediato, sin fila de espera',
        blocks: [
          {
            kind: 'text',
            text: 'La ley divide a los familiares de un ciudadano en dos grupos. Unos caen en categorías con cuota anual y esperan años a que les toque un número de visa. Otros son <strong>familiares inmediatos</strong> y están exentos de esos límites numéricos: no hay fila ni boletín de visas que esperar. Los padres de un ciudadano mayor de 21 años están en ese segundo grupo, y por eso esta es la petición más buscada por las familias latinas en Texas.',
          },
          {
            kind: 'list',
            items: [
              'El hijo debe tener <strong>21 años cumplidos</strong> el día en que se presenta la petición, ni un día antes.',
              'Debe ser <strong>ciudadano estadounidense</strong>, por nacimiento o por naturalización; un hijo residente no puede pedir a sus padres.',
              'Debe <strong>probar el parentesco</strong>: su acta de nacimiento con el nombre del padre o la madre, más prueba de su propia ciudadanía.',
              'Si los padres no estaban casados entre sí, el <strong>padre</strong> suele tener que probar además una relación real de padre e hijo.',
              'El peticionario asume un compromiso económico formal con la <strong>declaración de sostenimiento</strong>, el Formulario I-864.',
            ],
          },
          {
            kind: 'note',
            text: 'Una petición aprobada NO es la residencia: no da permiso de trabajo y, por sí sola, no detiene una deportación. Solo reconoce oficialmente que el parentesco existe. La residencia se decide en la segunda etapa, y esa etapa depende por completo de cómo entró usted al país.',
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
            text: 'Si usted entró con una visa —de turista, de trabajo, de estudiante— o fue admitido o recibió permiso condicional de entrada de un oficial, la ley permite pedir la residencia <strong>desde dentro del país</strong>. Es el ajuste de estatus, y su requisito clave es que la entrada haya sido inspeccionada. Aquí viene lo que sorprende a mucha gente: para los familiares inmediatos de un ciudadano, la ley <strong>perdona la estadía vencida</strong> y también el haber trabajado sin autorización. Que su visa venciera hace quince años no cierra esta puerta.',
          },
          {
            kind: 'steps',
            items: [
              'Su hijo presenta la <strong>petición familiar</strong> y, en la mayoría de estos casos, la solicitud de residencia se presenta al mismo tiempo.',
              'Usted acude a la cita de <strong>datos biométricos</strong>: huellas, foto y verificación de antecedentes.',
              'Completa el <strong>examen médico</strong> con un médico autorizado, incluidas las vacunas requeridas.',
              'Se presenta el <strong>apoyo económico</strong> de su hijo y, si su ingreso no alcanza, el de un copatrocinador.',
              'Acude a la <strong>entrevista</strong> en la oficina local que le corresponde y se decide el caso.',
            ],
          },
          {
            kind: 'warning',
            text: 'Entrar con documentos de otra persona o declarando algo falso ante un oficial no es lo mismo que entrar con su propia visa: abre un problema distinto, de fraude o falsa representación, que necesita su propio perdón y exige el mismo familiar calificado del que hablamos más abajo. Dígaselo a su abogado en la primera cita, no en la entrevista.',
          },
          {
            kind: 'note',
            text: 'Si entró con inspección pero perdió el pasaporte y el registro de entrada, no dé el caso por perdido: ese registro suele existir en los sistemas del gobierno y se puede recuperar.',
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
            text: 'Si usted cruzó sin ser inspeccionado, la ley normalmente no le permite ajustar dentro del país aunque su hijo sea ciudadano y la petición esté aprobada: la residencia tendría que otorgarse en un <strong>consulado estadounidense en su país de origen</strong>. El problema es lo que ocurre al salir. Quien acumuló más de 180 días de presencia ilegal y se va queda sujeto a una <strong>barra de tres años</strong>; quien acumuló un año o más, a una <strong>barra de diez años</strong>. La barra no se activa mientras usted está adentro: se activa con la salida.',
          },
          {
            kind: 'text',
            text: 'Para eso existe el <strong>perdón provisional por presencia ilegal, el Formulario I-601A</strong>. Permite pedir el perdón de esas barras <strong>antes de salir</strong>, estando todavía aquí con la familia, para que el viaje ocurra con el perdón ya aprobado y la separación dure semanas en lugar de años.',
          },
          {
            kind: 'steps',
            items: [
              'Se presenta y se <strong>aprueba la petición familiar</strong> que hizo su hijo ciudadano.',
              'El caso pasa al <strong>Centro Nacional de Visas</strong>, donde se abre el expediente de visa de inmigrante y se pagan las cuotas.',
              'Estando todavía en Estados Unidos se presenta el <strong>Formulario I-601A</strong> con la evidencia de sufrimiento extremo.',
              'Con el perdón <strong>ya aprobado</strong>, se completa la solicitud de visa y se agenda la entrevista consular.',
              'Usted viaja, asiste a la <strong>entrevista</strong> con su examen médico y sus documentos, y si todo procede regresa como residente.',
            ],
          },
          {
            kind: 'warning',
            text: 'Nunca compre un boleto ni salga del país porque «ya está aprobada la petición». La petición aprobada no es el perdón. Salir antes de tiempo puede activar la barra completa y convertir un caso de meses en un caso de diez años.',
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
            text: 'El perdón no se concede porque su familia lo necesite en general, sino si usted demuestra que un <strong>familiar calificado</strong> sufriría un daño extremo en caso de negarse. Y la ley define de forma muy estrecha quién es ese familiar. Léalo con calma, porque es contraintuitivo: <strong>el mismo hijo ciudadano que puede pedirlo no puede sostener el perdón</strong>. Una madre puede tener una petición perfectamente aprobada por su hija de 24 años y aun así no tener manera de obtener el perdón. Ser elegible para la residencia y ser elegible para el perdón son dos preguntas distintas.',
          },
          {
            kind: 'cards',
            items: [
              {
                title: 'Sí califica: su cónyuge',
                desc: 'Su esposo o esposa, si es ciudadano o residente permanente. Es el familiar calificado más común en estos casos.',
              },
              {
                title: 'Sí califica: su padre o su madre',
                desc: 'Su propio papá o mamá, si es ciudadano o residente permanente, aunque sean mayores y usted sea quien los cuida.',
              },
              {
                title: 'NO califica: su hijo',
                desc: 'Aunque sea ciudadano estadounidense y aunque sea exactamente quien está presentando la petición por usted.',
              },
              {
                title: 'NO califican: los demás',
                desc: 'Nietos, hermanos, sobrinos, suegros o parejas sin matrimonio legal. Su situación puede dar contexto, pero no sostiene el perdón.',
              },
            ],
          },
          {
            kind: 'list',
            items: [
              'Si existe un <strong>cónyuge o un padre residente</strong> que la familia no había considerado, o alguien por naturalizarse.',
              'Si a usted lo alcanza una <strong>petición vieja presentada a su favor en o antes del 30 de abril de 2001</strong>, que en ciertos casos permite ajustar dentro del país pagando una multa establecida por ley.',
              'Si hay una base <strong>independiente</strong> de la petición familiar: violencia doméstica, ser víctima de un delito, temor de persecución, trata de personas.',
              'Si ya está en <strong>corte de inmigración</strong>, donde existen defensas que una oficina no puede otorgar y donde un hijo ciudadano sí puede ser el familiar cuyo sufrimiento se evalúa.',
            ],
          },
          {
            kind: 'warning',
            text: 'Si alguien le promete que «con el hijo ciudadano basta» para el perdón provisional, esa persona no sabe lo que hace o le está mintiendo. Es una de las señales más claras de fraude de notarios en esta materia.',
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
            text: 'La separación familiar duele siempre, y el gobierno lo sabe. Por eso el estándar no es el sufrimiento normal de cualquier familia, sino un <strong>sufrimiento extremo</strong>, por encima de lo que se espera cuando alguien se va. Además, el análisis se hace en dos escenarios que hay que documentar por separado: qué le pasaría al familiar calificado <strong>si se queda aquí sin usted</strong> y qué le pasaría <strong>si se va con usted</strong>. Los dos tienen que doler, y por razones concretas.',
          },
          {
            kind: 'list',
            items: [
              '<strong>Salud:</strong> diagnósticos, tratamientos en curso, medicamentos, discapacidad y qué atención existe o no en el país de destino.',
              '<strong>Economía:</strong> quién sostiene el hogar, deudas, renta o hipoteca y la caída real de ingresos si usted falta.',
              '<strong>Cuidado de otras personas:</strong> hijos pequeños, un familiar enfermo o un adulto mayor que depende de usted a diario.',
              '<strong>Educación:</strong> interrupción escolar, necesidades especiales y servicios que allá no existirían.',
              '<strong>Condiciones del país:</strong> seguridad, acceso a medicina, idioma y economía, con informes reconocidos.',
              '<strong>Salud emocional:</strong> evaluación psicológica profesional cuando corresponda, no una carta genérica.',
            ],
          },
          {
            kind: 'text',
            text: 'El sufrimiento de sus hijos sí importa, pero de forma indirecta: cuenta en la medida en que afecta al familiar calificado. Por eso un buen expediente no narra la historia de cada quien por separado, sino que explica cómo todo ese peso cae sobre los hombros del cónyuge o del padre que califica.',
          },
          {
            kind: 'note',
            text: 'El perdón es discrecional: incluso con el sufrimiento probado, el oficial pesa lo positivo y lo negativo de su historia. Antecedentes limpios, impuestos pagados y años de trabajo estable no son adornos, son parte del caso.',
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
            text: 'Muchas personas cruzaron más de una vez, fueron devueltas en la frontera o firmaron papeles que nunca entendieron. Todo eso deja huella en los sistemas del gobierno y cambia la estrategia por completo.',
          },
          {
            kind: 'cards',
            items: [
              {
                title: 'Orden de deportación previa',
                desc: 'Sigue viva hasta que se resuelva, incluida la dictada en ausencia porque usted nunca supo de la audiencia. Hay que atenderla antes de cualquier otro paso.',
              },
              {
                title: 'Permiso para volver a solicitar',
                desc: 'Quien fue removido necesita además el Formulario I-212, un permiso específico para pedir admisión otra vez. Es un trámite aparte del perdón.',
              },
              {
                title: 'La llamada barra permanente',
                desc: 'Si acumuló un año o más de presencia ilegal en total, o fue removido, y después volvió a entrar sin ser admitido, aplica una barra que el perdón provisional no cubre.',
              },
              {
                title: 'Retornos en la frontera',
                desc: 'Un retorno voluntario no es una orden de deportación, pero puede contar como salida para efectos de las barras. Solo el expediente dice qué pasó.',
              },
            ],
          },
          {
            kind: 'text',
            text: 'La barra permanente es la más severa y la peor entendida. En la mayoría de estos casos la persona tiene que permanecer <strong>fuera de Estados Unidos durante diez años</strong> antes de poder pedir permiso para solicitar admisión de nuevo. Descubrirlo después de haber salido del país es una tragedia evitable.',
          },
          {
            kind: 'warning',
            text: 'Si alguna vez lo detuvieron en la frontera, firmó documentos que no leyó, pasó por una corte de inmigración o le tomaron huellas, no asuma nada. Aplicar sin saber qué dice su expediente puede activar consecuencias que hoy están dormidas.',
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
            text: 'Ningún abogado serio le va a dar un número exacto de meses ni un precio de gobierno grabado en piedra: los tiempos varían por formulario, por oficina y por consulado, y las cuotas oficiales se actualizan. Lo que sí podemos darle es el mapa de las etapas, para que sepa qué preguntar y dónde verificar la cifra vigente el día que aplique.',
          },
          {
            kind: 'table',
            headers: ['Etapa', 'Qué se presenta', 'Dónde verificar plazo y costo vigentes'],
            rows: [
              ['Petición familiar', 'Formulario I-130 y prueba del parentesco', 'Tiempos y tabla de tarifas publicados por USCIS'],
              ['Ajuste dentro de EE.UU.', 'Formulario I-485, examen médico y apoyo I-864', 'Tiempos de la oficina local de USCIS que le toca'],
              ['Perdón provisional', 'Formulario I-601A con la evidencia de sufrimiento', 'Tiempos publicados por USCIS para ese formulario'],
              ['Etapa consular', 'Solicitud de visa, documentos civiles y cuotas del Departamento de Estado', 'Página de su consulado y del Centro Nacional de Visas'],
            ],
          },
          {
            kind: 'list',
            items: [
              'Cuotas oficiales de cada formulario, que se pagan por separado y no se devuelven.',
              'Examen médico con un médico autorizado y las vacunas que falten.',
              'Actas, antecedentes certificados y <strong>traducciones</strong> de todo documento que no esté en inglés.',
              'Viaje, hospedaje y días sin trabajar si su caso pasa por la etapa consular.',
              'Honorarios legales, que deben constar por escrito en un contrato que usted entienda.',
            ],
          },
          {
            kind: 'note',
            text: 'Antes de pagar, verifique el monto vigente en la fuente oficial: las tarifas y los tiempos cambian, y una cuota equivocada hace que le rechacen el paquete completo. Exija siempre recibo y copia de todo lo que se presente a su nombre.',
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
            text: 'Aplicar a ciegas es el riesgo más subestimado de todo el proceso. Cuando usted presenta una solicitud le entrega al gobierno su dirección actual, su historia y su huella, y le pide que revise su pasado completo. Si en ese pasado hay algo que usted no recuerda o que nunca le explicaron, se entera en el peor momento. Por eso, en cualquier caso con dudas sobre entradas, detenciones o cortes, lo primero no es el formulario: es <strong>pedir su propio expediente</strong> al gobierno y ver qué consta ahí.',
          },
          {
            kind: 'list',
            items: [
              'El <strong>expediente de inmigración</strong> con las solicitudes anteriores a su nombre y las decisiones que se tomaron.',
              'El <strong>registro de la corte de inmigración</strong>, para saber si existe una orden y de qué tipo.',
              'Los <strong>registros de entradas y encuentros</strong> con autoridades fronterizas, incluidos los papeles que firmó.',
              'Sus <strong>antecedentes penales</strong> completos, con la disposición final certificada de cada caso.',
              'Su historial de empleo y los <strong>formularios I-9</strong> que llenó a lo largo de los años.',
            ],
          },
          {
            kind: 'warning',
            text: 'Revise con especial cuidado si alguna vez se declaró ciudadano estadounidense para conseguir empleo, un beneficio o para votar, incluso marcando la casilla equivocada en un formulario I-9. Una falsa declaración de ciudadanía es uno de los pocos problemas para los que la ley no ofrece un perdón general.',
          },
          {
            kind: 'note',
            text: 'Las reglas, las cuotas y las prioridades de aplicación cambian con frecuencia. Antes de presentar nada, confirme con su abogado el estado vigente del trámite y de su expediente: lo que era cierto hace seis meses puede no serlo hoy.',
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
            text: 'La entrevista no se prepara en tres días. Los casos que salen bien llevan meses de juntar, ordenar y traducir papeles. Empiece hoy, guarde todo en una sola carpeta y haga copias.',
          },
          {
            kind: 'list',
            items: [
              'Acta de nacimiento de su hijo con su nombre como padre o madre, y su propia acta.',
              'Prueba de la ciudadanía de su hijo: acta estadounidense, pasaporte o certificado de naturalización.',
              'Acta de matrimonio de los padres, o prueba de la relación real si no hubo matrimonio.',
              'Su pasaporte, cualquier visa y el registro de su entrada, si entró con inspección.',
              'Declaraciones de impuestos y comprobantes de ingreso de su hijo y del copatrocinador, si lo hay.',
              'Comprobantes de domicilio y de tiempo en la comunidad: recibos, contratos de renta, cartas de la iglesia o del trabajo.',
              'Documentos completos de cualquier arresto, con la disposición final certificada por la corte.',
              'Expedientes médicos y evaluaciones que sostengan el sufrimiento extremo, si su caso lleva perdón.',
              'Traducciones certificadas al inglés de todo documento en otro idioma.',
            ],
          },
          {
            kind: 'steps',
            items: [
              'Revise que <strong>los datos coincidan</strong> en todos los formularios: nombres, fechas y direcciones. Las contradicciones son lo que más daño hace.',
              'Lleve los <strong>originales</strong> el día de la entrevista, además del juego de copias.',
              'Conteste con la <strong>verdad</strong>, aunque complique: una mentira detectada cierra puertas que el hecho original no cerraba.',
              'Pida <strong>intérprete</strong> si no domina el inglés; es su derecho a entender lo que firma.',
              'No firme <strong>nada</strong> que no entienda y guarde copia de todo lo que entregue.',
            ],
          },
          {
            kind: 'note',
            text: 'Si un abogado lleva su caso, debe estar registrado formalmente en su expediente y puede acompañarlo a la entrevista. Si alguien le cobró por «llenarle los papeles» pero no aparece por escrito como su representante, usted está solo frente al gobierno.',
          },
        ],
      },
    ],
    faq: {
      title: 'Preguntas frecuentes',
      items: [
        {
          q: 'Mi hijo cumplió 21 pero gana poco. ¿Puede pedirme de todos modos?',
          a: 'Sí. El peticionario firma la declaración de sostenimiento y debe demostrar ingresos de al menos el 125% de las guías federales de pobreza según el tamaño del hogar. Si no alcanza, la ley permite sumar bienes o presentar un copatrocinador que sí cumpla.',
        },
        {
          q: 'Si la petición está aprobada, ¿ya no me pueden deportar?',
          a: 'Sí pueden. Una petición aprobada solo reconoce el parentesco: no da estatus ni protege por sí sola frente a un procedimiento de remoción. En algunos casos sirve como elemento dentro de una defensa, pero eso se evalúa con el expediente completo.',
        },
        {
          q: 'Llevo más de veinte años aquí. ¿No me toca «la ley de los diez años»?',
          a: 'Lo que la gente llama así es una defensa que solo existe dentro de un caso en corte de inmigración, no un trámite que se pida en una oficina. Tiene requisitos muy estrictos y un estándar de sufrimiento todavía más alto, aunque ahí sí puede contar un hijo ciudadano.',
        },
        {
          q: '¿Puedo salir del país mientras mi caso está en trámite?',
          a: 'No salga sin consultarlo antes. En un ajuste dentro del país, salir sin el permiso de viaje correspondiente puede tomarse como abandono de la solicitud. En la vía consular, la salida es justamente lo que activa las barras. La fecha se planea con el abogado.',
        },
        {
          q: 'Mi hijo es ciudadano pero vive fuera del país. ¿Puede pedirme?',
          a: 'Puede presentar la petición, pero para firmar la declaración de sostenimiento el peticionario debe tener su domicilio en Estados Unidos o demostrar que lo está restableciendo. Conviene resolverlo desde el principio porque detiene el caso en la etapa consular.',
        },
        {
          q: '¿Puedo trabajar legalmente mientras se resuelve?',
          a: 'Depende del camino. En el ajuste dentro del país normalmente se puede solicitar un permiso de trabajo mientras el caso está pendiente. En la vía consular no existe esa posibilidad: la autorización llega con la residencia, después de la entrevista.',
        },
      ],
    },
    conclusion: {
      title: 'La puerta se abre a los 21, pero la llave es su historia de entrada',
      text: 'Que su hijo cumpla 21 años es una oportunidad real y, para muchas familias en Texas, la mejor que van a tener. Pero el resultado no lo decide la petición: lo deciden cómo entró usted, si hubo salidas o deportaciones y si existe un cónyuge o un padre ciudadano o residente que sostenga el perdón. Averiguarlo antes de aplicar cuesta una consulta; averiguarlo después de salir del país puede costar diez años.',
      advice: 'Antes de firmar el primer formulario, pida que revisen su expediente completo y le expliquen cuál de los dos escenarios es el suyo.',
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
    readTime: '11 min',
    categoryLabel: 'Immigration Process',
    summary: {
      title: 'Initial Summary',
      text: 'The day your son or daughter turns 21, one of the few doors immigration law leaves wide open finally opens: they can petition for you as an <strong>immediate relative</strong>, a category with no annual cap and no waiting line. But opening the door is not the same as walking through it. What decides your case is not the petition but <strong>how you entered the country</strong>: if you came on a visa and stayed, in most cases it can be fixed without leaving; if you entered without inspection, you must attend a consular interview abroad and will almost always need a waiver. And there is the detail almost nobody explains in time: <strong>that waiver does not rest on your citizen child</strong>, no matter that they are the one filing for you.',
    },
    intro: [
      'It is one of the most common calls our office receives, and it almost always arrives with the same mix of hope and hurry: «my child just turned 21, they can fix my papers now.» The first part is true and it is good news. The second depends on something that happened ten, twenty or thirty years ago, almost always on a single day: the day you entered.',
      'In 2026 that conversation is no longer simple paperwork. Thousands of mixed-status families in Houston and across Texas are trying to protect their parents while they still can, and that urgency pushes people to sign applications they do not understand, often with someone who is not an attorney.',
      'Here is the explanation with nothing dressed up: what the petition does and does not do, the two entry scenarios, the requirement that breaks entire cases, what happens if there was a removal, and what to review before mailing the first form.',
    ],
    sections: [
      {
        icon: 'users',
        title: 'The basic rule: at 21, your child becomes a petitioner',
        subtitle: 'Immediate relative, no waiting line',
        blocks: [
          {
            kind: 'text',
            text: 'Immigration law sorts the relatives of a citizen into two groups. Some fall into categories with annual caps and wait years for a visa number. Others are <strong>immediate relatives</strong> and are exempt from those numerical limits: no line and no visa bulletin to wait on. Parents of a citizen who is at least 21 belong to that second group, and that is why this is the most sought-after petition among Latino families in Texas.',
          },
          {
            kind: 'list',
            items: [
              'The child must have <strong>already turned 21</strong> on the day the petition is filed, not one day earlier.',
              'They must be a <strong>U.S. citizen</strong>, by birth or naturalization; a child who is only a resident cannot petition for parents.',
              'They must <strong>prove the relationship</strong>: their birth certificate showing the parent’s name, plus proof of their own citizenship.',
              'If the parents were not married to each other, the <strong>father</strong> usually must also prove a genuine parent-child relationship.',
              'The petitioner takes on a formal financial commitment through the <strong>affidavit of support</strong>, Form I-864.',
            ],
          },
          {
            kind: 'note',
            text: 'An approved petition is NOT residency: it grants no work permit and, on its own, does not stop a deportation. It only officially recognizes that the family relationship exists. Residency is decided in the second stage, and that stage depends entirely on how you entered the country.',
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
            text: 'If you entered on a visa — tourist, work, student — or were admitted or paroled in by an officer, the law lets you seek residency <strong>from inside the country</strong>. That is adjustment of status, and its key requirement is that the entry was inspected. Here is what surprises many people: for immediate relatives of a citizen, the law <strong>forgives the overstay</strong> and also forgives having worked without authorization. A visa that expired fifteen years ago does not close this door.',
          },
          {
            kind: 'steps',
            items: [
              'Your child files the <strong>family petition</strong> and, in most of these cases, the residency application is filed at the same time.',
              'You attend the <strong>biometrics appointment</strong>: fingerprints, photo and background checks.',
              'You complete the <strong>medical exam</strong> with an authorized physician, including required vaccinations.',
              'Your child files the <strong>financial support</strong> and, if their income falls short, that of a joint sponsor.',
              'You attend the <strong>interview</strong> at the local office with jurisdiction and the case is decided.',
            ],
          },
          {
            kind: 'warning',
            text: 'Entering with someone else’s documents or by telling an officer something false is not the same as entering on your own visa: it opens a separate problem, fraud or misrepresentation, that needs its own waiver and demands the same qualifying relative discussed below. Tell your attorney at the first meeting, not at the interview.',
          },
          {
            kind: 'note',
            text: 'If you entered with inspection but lost the passport and the entry record, do not give the case up: that record often still exists in government systems and can be recovered.',
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
            text: 'If you crossed without being inspected, the law normally does not let you adjust inside the country even with a citizen child and an approved petition: residency would have to be granted at a <strong>U.S. consulate in your home country</strong>. The problem is what happens on departure. Someone who accumulated more than 180 days of unlawful presence and leaves becomes subject to a <strong>three-year bar</strong>; someone with a year or more, to a <strong>ten-year bar</strong>. The bar does not trigger while you are inside: it triggers when you leave.',
          },
          {
            kind: 'text',
            text: 'That is why the <strong>provisional unlawful presence waiver, Form I-601A</strong>, exists. It lets you request forgiveness of those bars <strong>before departing</strong>, while still here with your family, so the trip happens with the waiver already approved and the separation lasts weeks instead of years.',
          },
          {
            kind: 'steps',
            items: [
              'The <strong>family petition</strong> filed by your citizen child is submitted and approved.',
              'The case moves to the <strong>National Visa Center</strong>, where the immigrant visa file is opened and fees are paid.',
              'While still in the United States, <strong>Form I-601A</strong> is filed with the extreme hardship evidence.',
              'With the waiver <strong>already approved</strong>, the visa application is completed and the consular interview is scheduled.',
              'You travel, attend the <strong>interview</strong> with your medical exam and documents, and if all is in order you return as a resident.',
            ],
          },
          {
            kind: 'warning',
            text: 'Never buy a ticket or leave the country because «the petition is already approved.» An approved petition is not the waiver. Leaving too early can trigger the full bar and turn a case of months into a case of ten years.',
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
            text: 'The waiver is not granted because your family needs it in general, but because you prove that a <strong>qualifying relative</strong> would suffer extreme hardship if it were denied. And the law defines that relative very narrowly. Read this slowly, because it is counterintuitive: <strong>the very citizen child who can petition for you cannot support the waiver</strong>. A mother can hold a perfectly approved petition filed by her 24-year-old daughter and still have no way to obtain the waiver. Being eligible for residency and being eligible for the waiver are two different questions.',
          },
          {
            kind: 'cards',
            items: [
              {
                title: 'Counts: your spouse',
                desc: 'Your husband or wife, if they are a citizen or lawful permanent resident. This is the most common qualifying relative in these cases.',
              },
              {
                title: 'Counts: your mother or father',
                desc: 'Your own parent, if they are a citizen or permanent resident, even if they are elderly and you are the one caring for them.',
              },
              {
                title: 'Does NOT count: your child',
                desc: 'Even if they are a U.S. citizen and even if they are exactly the person filing the petition for you.',
              },
              {
                title: 'Do NOT count: the rest',
                desc: 'Grandchildren, siblings, nieces and nephews, in-laws, partners without a legal marriage. Their situation adds context but cannot carry the waiver.',
              },
            ],
          },
          {
            kind: 'list',
            items: [
              'Whether there is a <strong>spouse or resident parent</strong> the family had not considered, or someone about to naturalize.',
              'Whether you are covered by an <strong>old petition filed for you on or before April 30, 2001</strong>, which in certain cases allows adjustment inside the country upon paying a penalty set by law.',
              'Whether there is a basis <strong>independent</strong> of the family petition: domestic violence, being a crime victim, fear of persecution, human trafficking.',
              'Whether you are already in <strong>immigration court</strong>, where defenses exist that an office cannot grant and where a citizen child can be the relative whose hardship is weighed.',
            ],
          },
          {
            kind: 'warning',
            text: 'If someone promises you that «the citizen child is enough» for the provisional waiver, that person does not know what they are doing or is lying to you. It is one of the clearest signs of notario fraud in this area.',
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
            text: 'Family separation always hurts, and the government knows it. That is why the standard is not the ordinary suffering of any family but <strong>extreme hardship</strong>, beyond what is expected when someone leaves. The analysis also covers two scenarios that must be documented separately: what would happen to the qualifying relative <strong>if they stay here without you</strong> and what would happen <strong>if they go with you</strong>. Both must hurt, for concrete reasons.',
          },
          {
            kind: 'list',
            items: [
              '<strong>Health:</strong> diagnoses, ongoing treatment, medications, disability, and what care exists or does not in the destination country.',
              '<strong>Finances:</strong> who supports the household, debts, rent or mortgage, and the real drop in income if you are gone.',
              '<strong>Care for others:</strong> young children, a sick relative, or an older adult who depends on you daily.',
              '<strong>Education:</strong> interrupted schooling, special needs, and services that would not exist there.',
              '<strong>Country conditions:</strong> safety, access to medicine, language and the economy, backed by recognized reports.',
              '<strong>Emotional health:</strong> a professional psychological evaluation where appropriate, not a generic letter.',
            ],
          },
          {
            kind: 'text',
            text: 'Your children’s suffering does matter, but indirectly: it counts to the extent it affects the qualifying relative. That is why a strong file does not tell each person’s story separately; it explains how all that weight lands on the shoulders of the spouse or parent who qualifies.',
          },
          {
            kind: 'note',
            text: 'The waiver is discretionary: even with hardship proven, the officer weighs the positives and negatives of your history. A clean record, taxes paid and years of steady work are not decoration, they are part of the case.',
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
            text: 'Many people crossed more than once, were turned back at the border, or signed papers they never understood. All of that leaves a trace in government systems and changes the strategy completely.',
          },
          {
            kind: 'cards',
            items: [
              {
                title: 'A prior removal order',
                desc: 'It stays alive until it is resolved, including one entered in absentia because you never learned of the hearing. It must be addressed before any other step.',
              },
              {
                title: 'Permission to reapply',
                desc: 'Someone who was removed also needs Form I-212, a specific permission to seek admission again. It is a separate filing from the waiver.',
              },
              {
                title: 'The so-called permanent bar',
                desc: 'If you accumulated a year or more of unlawful presence in total, or were removed, and then entered again without being admitted, a bar applies that the provisional waiver does not cover.',
              },
              {
                title: 'Turnarounds at the border',
                desc: 'A voluntary return is not a removal order, but it can count as a departure for purposes of the bars. Only the record shows what happened.',
              },
            ],
          },
          {
            kind: 'text',
            text: 'The permanent bar is the harshest and the most misunderstood. In most of these cases the person must remain <strong>outside the United States for ten years</strong> before being able to request permission to seek admission again. Discovering that after leaving the country is an avoidable tragedy.',
          },
          {
            kind: 'warning',
            text: 'If you were ever detained at the border, signed documents you did not read, went through immigration court, or were fingerprinted, do not assume anything. Applying without knowing what your record says can trigger consequences that are currently dormant.',
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
            text: 'No serious attorney will give you an exact number of months or a government price carved in stone: timelines vary by form, by office and by consulate, and official fees are updated. What we can give you is the map of the stages, so you know what to ask and where to verify the current figure on the day you apply.',
          },
          {
            kind: 'table',
            headers: ['Stage', 'What is filed', 'Where to verify current timing and cost'],
            rows: [
              ['Family petition', 'Form I-130 and proof of the relationship', 'Processing times and fee schedule published by USCIS'],
              ['Adjustment inside the U.S.', 'Form I-485, medical exam and Form I-864 support', 'Processing times for the local USCIS office with jurisdiction'],
              ['Provisional waiver', 'Form I-601A with the hardship evidence', 'Processing times published by USCIS for that form'],
              ['Consular stage', 'Visa application, civil documents and Department of State fees', 'Your consulate page and the National Visa Center'],
            ],
          },
          {
            kind: 'list',
            items: [
              'Official filing fees for each form, paid separately and generally non-refundable.',
              'The medical exam with an authorized physician and any missing vaccinations.',
              'Certificates, certified records and <strong>translations</strong> of every document not in English.',
              'Travel, lodging and days off work if your case goes through the consular stage.',
              'Legal fees, which must be set out in writing in a contract you understand.',
            ],
          },
          {
            kind: 'note',
            text: 'Before paying, verify the current amount at the official source: fees and timelines change, and a wrong fee gets the whole package rejected. Always demand a receipt and a copy of everything filed in your name.',
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
            text: 'Applying blind is the most underestimated risk in this whole process. When you file, you hand the government your current address, your history and your fingerprints, and ask them to review your entire past. If something in that past is something you do not remember or were never told, you find out at the worst moment. So in any case with questions about entries, detentions or courts, the first step is not the form: it is <strong>requesting your own record</strong> from the government and seeing what it says.',
          },
          {
            kind: 'list',
            items: [
              'The <strong>immigration file</strong> with prior applications in your name and the decisions issued on them.',
              'The <strong>immigration court record</strong>, to learn whether an order exists and of what kind.',
              'Records of <strong>entries and encounters</strong> with border authorities, including the papers you signed.',
              'Your complete <strong>criminal history</strong>, with the certified final disposition of every case.',
              'Your employment history and the <strong>Form I-9</strong> paperwork you completed over the years.',
            ],
          },
          {
            kind: 'warning',
            text: 'Review with particular care whether you ever claimed to be a U.S. citizen to get a job, a benefit, or to vote, including by checking the wrong box on a Form I-9. A false claim to citizenship is one of the few problems for which the law offers no general waiver.',
          },
          {
            kind: 'note',
            text: 'Rules, fees and enforcement priorities change often. Before filing anything, confirm with your attorney the current status of the process and of your record: what was true six months ago may not be true today.',
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
            text: 'An interview is not prepared in three days. Cases that go well took months of collecting, organizing and translating paperwork. Start today, keep everything in one folder, and make copies.',
          },
          {
            kind: 'list',
            items: [
              'Your child’s birth certificate showing your name as the parent, plus your own certificate.',
              'Proof of your child’s citizenship: U.S. birth certificate, passport or naturalization certificate.',
              'The parents’ marriage certificate, or proof of the real relationship if there was no marriage.',
              'Your passport, any visa and your entry record, if you were inspected.',
              'Tax returns and proof of income for your child and for the joint sponsor, if there is one.',
              'Proof of address and time in the community: bills, leases, letters from church or work.',
              'Complete documents for any arrest, with the final disposition certified by the court.',
              'Medical records and evaluations supporting extreme hardship, if your case includes a waiver.',
              'Certified English translations of every document in another language.',
            ],
          },
          {
            kind: 'steps',
            items: [
              'Check that <strong>the data matches</strong> across every form: names, dates and addresses. Contradictions do the most damage.',
              'Bring the <strong>originals</strong> on interview day, along with the set of copies.',
              'Answer <strong>truthfully</strong>, even when it complicates things: a detected lie closes doors the underlying fact did not.',
              'Ask for an <strong>interpreter</strong> if you are not fluent in English; it is your right to understand what you sign.',
              'Do not sign <strong>anything</strong> you do not understand, and keep a copy of everything you hand over.',
            ],
          },
          {
            kind: 'note',
            text: 'If an attorney handles your case, they must be formally on record in your file and can accompany you to the interview. If someone charged you to «fill out the papers» but is not on record in writing as your representative, you stand before the government alone.',
          },
        ],
      },
    ],
    faq: {
      title: 'Frequently asked questions',
      items: [
        {
          q: 'My child turned 21 but earns very little. Can they still petition for me?',
          a: 'Yes. The petitioner signs the affidavit of support and must show income of at least 125% of the federal poverty guidelines for the household size. If that falls short, the law allows counting assets or presenting a joint sponsor who does meet it.',
        },
        {
          q: 'If the petition is approved, can I still be deported?',
          a: 'Yes, you can. An approved petition only recognizes the family relationship: it grants no status and does not by itself protect you from removal proceedings. In some cases it serves as one element within a defense, but that is evaluated with the full record.',
        },
        {
          q: 'I have been here over twenty years. Does the «ten-year law» apply to me?',
          a: 'What people call that is a defense that exists only inside a case in immigration court, not something you file at an office. It has very strict requirements and an even higher hardship standard, though there a citizen child can count as the qualifying relative.',
        },
        {
          q: 'Can I travel outside the country while my case is pending?',
          a: 'Do not leave without asking first. In an adjustment inside the country, leaving without the proper travel document can be treated as abandoning the application. On the consular path, departure is precisely what triggers the bars. The date is planned with your attorney.',
        },
        {
          q: 'My child is a citizen but lives abroad. Can they petition for me?',
          a: 'They can file the petition, but to sign the affidavit of support the petitioner must be domiciled in the United States or show they are reestablishing that domicile. It is worth resolving early because it stalls the case at the consular stage.',
        },
        {
          q: 'Can I work legally while the case is pending?',
          a: 'It depends on the path. In adjustment inside the country you can normally request a work permit while the case is pending. On the consular path there is no such option: authorization arrives with residency, after the interview.',
        },
      ],
    },
    conclusion: {
      title: 'The door opens at 21, but the key is your entry history',
      text: 'Your child turning 21 is a real opportunity and, for many families in Texas, the best one they will ever get. But the outcome is not decided by the petition: it is decided by how you entered, whether there were departures or removals, and whether a citizen or resident spouse or parent exists to support the waiver. Finding that out before you apply costs a consultation; finding it out after leaving the country can cost ten years.',
      advice: 'Before signing the first form, have your complete record reviewed and get a clear answer on which of the two scenarios is yours.',
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
