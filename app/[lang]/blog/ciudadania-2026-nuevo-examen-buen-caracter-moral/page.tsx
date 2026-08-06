import type { Metadata } from 'next';
import BlogArticleLayout from '../../../components/blogs/BlogArticleLayout';
import { buildArticleMetadata } from '../../../components/blogs/articleMetadata';
import { ARTICLE_UI, type BlogArticleContent } from '../../../components/blogs/articleModel';

const SLUG = 'ciudadania-2026-nuevo-examen-buen-caracter-moral';
const ISO_DATE = '2026-08-06';
const IMAGE = '/blog/covers/ciudadania-2026-nuevo-examen-buen-caracter-moral.jpg';

const content: Record<'es' | 'en', BlogArticleContent> = {
  es: {
    metaTitle: 'Ciudadanía 2026: examen de 128 y carácter',
    metaDesc:
      'Desde finales de 2025 rige el examen cívico con banco de 128 preguntas y USCIS revisa el buen carácter moral con más dureza. Qué sigue vigente en 2026.',
    title: 'Ciudadanía en 2026: el examen más largo y la revisión más estricta',
    displayDate: '06 Ago, 2026',
    readTime: '19 min',
    categoryLabel: 'Procesos Migratorios',
    lastUpdated: '6 de agosto de 2026',
    summary: {
      title: 'Resumen inicial',
      text: 'Presentar el N-400 en 2026 no se parece a presentarlo hace tres años. Desde finales de 2025 se aplica la <strong>versión 2025 del examen cívico</strong>, con un banco de <strong>128 preguntas</strong> y más aciertos exigidos para aprobar, y USCIS endureció la forma de evaluar el <strong>buen carácter moral</strong>: ya no basta con no tener delitos, porque el oficial pesa el expediente completo. Parte de esa guía interna fue <strong>anulada por una corte federal el 5 de junio de 2026</strong>, así que hoy conviven una ley que no cambió y unas instrucciones administrativas en movimiento. Aquí le explicamos qué examen le toca, qué mira de verdad un oficial, qué sigue aplicando después del fallo y cuándo conviene esperar.',
    },
    intro: [
      'Durante años, la naturalización se vivió como el trámite tranquilo al final del camino: usted ya era residente, ya había pasado lo difícil, y el N-400 era casi una formalidad con examen de historia. Esa idea ya no describe la realidad de 2026.',
      'Cambiaron dos cosas a la vez y conviene no confundirlas. La primera es el <strong>examen</strong>: desde finales de 2025 se aplica la versión 2025 del examen de civismo, con un banco de preguntas más grande y un umbral de aprobación más alto. La segunda, la que más casos está costando, es la <strong>revisión del buen carácter moral</strong>: USCIS instruyó a sus oficiales a hacer una evaluación holística, es decir, a mirar la conducta completa del solicitante y no solo si aparece una condena en el sistema.',
      'Hay un tercer elemento que obliga a desconfiar de lo que encuentre en internet: <strong>parte de esos memorandos fue anulada por una corte federal el 5 de junio de 2026</strong>. La ley no cambió, pero la guía interna sí se movió y puede seguir moviéndose. Este artículo separa lo estable de lo que está en disputa.',
    ],
    sections: [
      {
        icon: 'calendar',
        title: 'Qué versión del examen le toca según su fecha de solicitud',
        subtitle: 'No manda la fecha de la entrevista',
        blocks: [
          {
            kind: 'text',
            text: 'La primera pregunta no es qué estudiar, sino <strong>cuál examen le corresponde</strong>. Lo que manda es la fecha en que su N-400 quedó presentado: desde finales de 2025 las solicitudes nuevas se examinan con la versión 2025, y las anteriores siguen bajo la versión previa, aunque la entrevista sea ya entrado 2026.',
          },
          {
            kind: 'list',
            items: [
              'Si presentó su N-400 <strong>antes</strong> de que entrara en vigor la versión 2025, le corresponde el examen anterior, aunque lo entrevisten meses después.',
              'Si lo presentó <strong>después</strong>, estudia el banco de 128 preguntas de la versión 2025.',
              'Si retiró y volvió a presentar, o presentó de nuevo tras una negativa, cuenta <strong>la fecha de la presentación nueva</strong>.',
              'Si reprobó una parte, la segunda oportunidad normalmente se examina sobre <strong>la misma versión</strong>.',
            ],
          },
          {
            kind: 'text',
            text: 'El documento que resuelve la duda ya lo tiene usted: el <strong>aviso de recibo</strong> de USCIS trae la fecha de recepción, y esa fecha determina la versión del examen y el periodo de buen carácter moral que se le revisará.',
          },
          {
            kind: 'note',
            text: 'Antes de comprar materiales o pagar clases, confirme qué versión le toca: estudiar el banco equivocado es un error caro y perfectamente evitable.',
          },
        ],
      },
      {
        icon: 'clipboard',
        title: 'Cómo es el examen de la versión 2025',
        subtitle: 'Banco de 128, veinte preguntas, doce aciertos',
        blocks: [
          {
            kind: 'text',
            text: 'El examen de naturalización tiene dos partes que la gente suele mezclar: el <strong>examen de inglés</strong> (leer, escribir y hablar) y el <strong>examen de civismo</strong> (historia y gobierno). Lo que cambió con la versión 2025 es sobre todo el civismo.',
          },
          {
            kind: 'table',
            headers: ['Elemento', 'Cómo funciona en la versión 2025'],
            rows: [
              ['Banco de preguntas', 'USCIS publica 128 preguntas de historia y gobierno; todas las de la entrevista salen de ahí.'],
              ['Preguntas en la entrevista', 'El oficial pregunta hasta 20, en voz alta y en inglés, sin opciones múltiples.'],
              ['Aciertos para aprobar', 'Hay que responder 12 correctamente.'],
              ['Cuándo se detiene', 'El oficial deja de preguntar en cuanto usted llega a 12 aciertos o cuando ya es imposible alcanzarlos.'],
              ['65 años o más con 20 de residencia', 'Consideración especial: lista reducida marcada por USCIS, menos preguntas y menos aciertos exigidos.'],
            ],
          },
          {
            kind: 'text',
            text: 'El examen de inglés no desapareció: se le pide <strong>leer una oración en voz alta</strong> y <strong>escribir otra al dictado</strong>, y la parte hablada se evalúa durante toda la entrevista. Por eso quien memorizó las 128 respuestas pero no entiende las preguntas del N-400 puede tener problemas.',
          },
          {
            kind: 'note',
            text: 'El formato del examen y sus materiales pueden ajustarse de un año a otro. Verifique con USCIS o con su abogado qué versión y qué materiales están vigentes en la fecha de su caso.',
          },
        ],
      },
      {
        icon: 'balance',
        title: 'El buen carácter moral en 2026 es mucho más que no tener delitos',
        subtitle: 'Qué significa la evaluación holística',
        blocks: [
          {
            kind: 'text',
            text: 'La ley exige <strong>buen carácter moral</strong> durante todo el periodo estatutario: por regla general los <strong>cinco años</strong> anteriores a la solicitud, o <strong>tres</strong> si aplica como cónyuge de un ciudadano y cumple los demás requisitos. La sección 101(f) de la Ley de Inmigración y Nacionalidad enumera conductas que lo impiden, y esa lista no es exhaustiva.',
          },
          {
            kind: 'cards',
            items: [
              {
                title: 'Impedimentos permanentes',
                desc: 'Una condena por homicidio, y una condena por delito agravado dictada a partir del 29 de noviembre de 1990, impiden establecer buen carácter moral de forma permanente.',
              },
              {
                title: 'Impedimentos temporales',
                desc: 'Bloquean mientras estén dentro del periodo estatutario: ciertas condenas y encarcelamientos, infracciones de sustancias controladas, testimonio falso para obtener un beneficio migratorio o no sostener a los dependientes deliberadamente.',
              },
              {
                title: 'Actos ilícitos sin condena',
                desc: 'El oficial puede tomar en cuenta conducta que nunca llegó a condena. Un caso desestimado no siempre es un caso irrelevante para USCIS.',
              },
              {
                title: 'Evaluación holística',
                desc: 'Fuera de los impedimentos legales, el oficial pesa lo negativo contra lo positivo: estabilidad laboral y familiar, impuestos al día, tiempo transcurrido y evidencia de rehabilitación.',
              },
            ],
          },
          {
            kind: 'text',
            text: 'Eso significa «holístico»: el oficial arma un retrato del solicitante con todo el expediente. Un incidente aislado hace ocho años, con impuestos al día y una vida estable después, no pesa igual que tres incidentes en dos años. La ley incluso permite mirar conducta <strong>anterior</strong> al periodo estatutario como contexto.',
          },
          {
            kind: 'warning',
            text: 'Mentir u omitir en el formulario suele hacer más daño que el hecho original: muchas negativas no se deben al arresto de hace seis años, sino a haber contestado «no» a la pregunta que preguntaba por él. El testimonio falso es, por sí solo, un impedimento.',
          },
        ],
      },
      {
        icon: 'alert',
        title: 'Los clásicos que hunden un N-400',
        subtitle: 'Lo que más aparece en las negativas',
        blocks: [
          {
            kind: 'text',
            text: 'En la práctica, la mayoría de los problemas no vienen de delitos graves, sino de asuntos ordinarios que el solicitante creía resueltos, olvidados o irrelevantes.',
          },
          {
            kind: 'cards',
            items: [
              {
                title: 'Impuestos sin declarar o deuda con el IRS',
                desc: 'No haber presentado declaraciones que le correspondían, o declararse «soltero» estando casado, son señales que el oficial toma en serio. Una deuda con plan de pagos al corriente es muy distinta a una deuda ignorada.',
              },
              {
                title: 'Manutención de hijos atrasada',
                desc: 'El incumplimiento deliberado del sostenimiento de los dependientes es un problema clásico. Lleve comprobantes, la orden judicial y, si hubo atrasos, prueba de que ya está al corriente.',
              },
              {
                title: 'DUI',
                desc: 'Un solo DUI no es automáticamente un impedimento legal, pero pesa; varios DUI o uno reciente con agravantes pueden hundir el caso. Traiga las disposiciones certificadas de cada incidente.',
              },
              {
                title: 'Omisiones en el formulario',
                desc: 'Contestar «no» de corrido a las preguntas de conducta es el error más común. Arrestos sin cargos, citaciones y casos desestimados o expurgados normalmente se declaran aunque no hubo condena.',
              },
            ],
          },
          {
            kind: 'list',
            items: [
              '<strong>Ausencias largas.</strong> Un viaje de más de seis meses puede romper la presunción de residencia continua; una ausencia de un año o más normalmente la rompe.',
              '<strong>Servicio Selectivo.</strong> A los hombres que vivieron en el país dentro del rango de edad exigido se les pregunta por ese registro; no haberlo hecho requiere explicación.',
              '<strong>Sustancias controladas.</strong> Las infracciones de drogas siguen pesando en el análisis federal aunque la conducta fuera legal bajo la ley del estado.',
              '<strong>Datos que no coinciden.</strong> Domicilios, empleos y estados civiles distintos entre su expediente antiguo y el N-400 generan preguntas incómodas.',
            ],
          },
          {
            kind: 'warning',
            text: 'El N-400 no revisa solo los últimos cinco años: es una auditoría de todo su expediente, incluida la forma en que obtuvo la residencia. Si en su solicitud original hubo un dato inexacto, la entrevista es donde sale a la luz.',
          },
        ],
      },
      {
        icon: 'gavel',
        title: 'Qué anuló la corte en junio de 2026 y qué sigue aplicando',
        subtitle: 'La ley no se movió; la guía interna sí',
        blocks: [
          {
            kind: 'text',
            text: 'USCIS emitió memorandos que endurecieron la evaluación del buen carácter moral. El <strong>5 de junio de 2026</strong>, una corte federal <strong>anuló parte de esa guía</strong>. Conviene entender qué significa eso, porque circula mucha confusión.',
          },
          {
            kind: 'text',
            text: 'Cuando un tribunal anula un memorando, lo que cae es la <strong>instrucción administrativa</strong>, no el requisito legal. El buen carácter moral no lo inventó USCIS: está en la ley y sigue siendo obligatorio para naturalizarse. Lo que puede cambiar es cómo se le pide al oficial evaluarlo.',
          },
          {
            kind: 'list',
            items: [
              '<strong>Sigue vigente</strong> el requisito legal de buen carácter moral durante el periodo estatutario.',
              '<strong>Siguen vigentes</strong> los impedimentos permanentes y temporales que enumera la ley.',
              '<strong>Sigue vigente</strong> la facultad del oficial de valorar el expediente completo y pedir evidencia adicional.',
              '<strong>Sigue vigente</strong> su obligación de declarar con exactitud todo lo que el formulario pregunta.',
              '<strong>Puede haber cambiado</strong> el detalle de las instrucciones internas que regían esa valoración.',
            ],
          },
          {
            kind: 'text',
            text: 'En la práctica, una anulación así no se siente igual en todas las oficinas ni de inmediato: las agencias tardan en ajustar instrucciones y la decisión puede apelarse. Lo prudente no es apostar a qué guía regirá el día de su entrevista, sino <strong>preparar un expediente que se sostenga bajo cualquiera de las dos</strong>.',
          },
          {
            kind: 'note',
            text: 'Este es un tema en movimiento. Antes de presentar, retirar o retomar una solicitud con base en el fallo del 5 de junio de 2026, verifique con un abogado cuál es el estado vigente de esa guía en la fecha en que vaya a actuar.',
          },
        ],
      },
      {
        icon: 'globe',
        title: 'Las exenciones de idioma siguen vivas',
        subtitle: '50/20, 55/15 y la certificación médica N-648',
        blocks: [
          {
            kind: 'text',
            text: 'Desde que cambió el examen, muchos preguntan si desaparecieron las exenciones de inglés. <strong>No desaparecieron.</strong> Siguen en el marco legal de la naturalización y benefician sobre todo a residentes mayores y a personas con discapacidades médicas.',
          },
          {
            kind: 'cards',
            items: [
              {
                title: 'Regla 50/20',
                desc: 'Residentes de 50 años o más con al menos 20 como residentes permanentes pueden quedar exentos del examen de inglés y entrevistarse en su idioma, con intérprete.',
              },
              {
                title: 'Regla 55/15',
                desc: 'Residentes de 55 años o más con al menos 15 como residentes permanentes tienen la misma posibilidad de examinarse en su idioma.',
              },
              {
                title: 'Consideración especial 65/20',
                desc: 'Quien tiene 65 años o más y 20 como residente permanente, además, estudia una lista reducida de preguntas de civismo marcada por USCIS.',
              },
              {
                title: 'Certificación médica N-648',
                desc: 'Cuando una discapacidad física o mental impide aprender inglés o civismo, un profesional médico autorizado puede certificarlo en el formulario N-648 y pedir la exención.',
              },
            ],
          },
          {
            kind: 'text',
            text: 'Estas reglas se cuentan con la fecha de presentación del N-400, no con la de la entrevista, así que unos meses cambian si califica o no. En el blog hay un artículo dedicado a las reglas 50/20 y 55/15 y a cómo se documenta bien una N-648.',
          },
          {
            kind: 'note',
            text: 'La exención de inglés no exenta del resto: aunque se examine en su idioma, sigue teniendo que demostrar buen carácter moral, residencia continua, presencia física y apego a la Constitución, y casi siempre sigue habiendo civismo.',
          },
        ],
      },
      {
        icon: 'clock',
        title: '¿Aplicar ahora o esperar? Cuando hay antecedentes',
        subtitle: 'La decisión con más consecuencias',
        blocks: [
          {
            kind: 'text',
            text: 'Hay una diferencia enorme entre un N-400 que se niega y uno que abre una puerta cerrada. Una negativa se apela o se vuelve a presentar. Pero si el expediente revela que la persona es removible, USCIS puede referir el caso a remoción, y entonces lo que estaba en juego no era la ciudadanía: era la residencia.',
          },
          {
            kind: 'cards',
            items: [
              {
                title: 'Suele tener sentido aplicar ahora',
                desc: 'Expediente limpio, impuestos al día, ausencias cortas y documentadas, residencia obtenida sin complicaciones y ninguna pregunta del formulario que le genere dudas.',
              },
              {
                title: 'Conviene analizarlo primero',
                desc: 'Arrestos sin condena, deudas fiscales, atrasos de manutención, viajes largos o un DUI dentro del periodo estatutario. Nada de esto cierra el caso, pero todo requiere estrategia y documentos.',
              },
              {
                title: 'Conviene esperar o revisar a fondo',
                desc: 'Condenas dentro del periodo estatutario que van a salir del cálculo con el tiempo, o cualquier duda sobre cómo se obtuvo la residencia.',
              },
            ],
          },
          {
            kind: 'text',
            text: 'La lógica del tiempo es sencilla: muchos impedimentos son <strong>temporales</strong> y dejan de bloquear cuando la conducta sale del periodo estatutario. Esperar unos meses puede convertir un caso difícil en uno normal. Pero <strong>esperar no borra nada</strong> cuando el impedimento es permanente.',
          },
          {
            kind: 'warning',
            text: 'No presente un N-400 «a ver qué pasa» si hay cualquier antecedente penal, aunque sea antiguo, desestimado o de otro estado. Un abogado puede pedir sus registros judiciales y su expediente migratorio antes de presentar nada: esa revisión previa evita las sorpresas caras.',
          },
        ],
      },
      {
        icon: 'users',
        title: 'El simulacro de entrevista con el abogado',
        subtitle: 'Ensayar es la mejor preparación',
        blocks: [
          {
            kind: 'text',
            text: 'El banco de 128 preguntas se estudia solo; la entrevista, no. Lo que más gente falla no es la historia de Estados Unidos: es responder con claridad, en inglés y bajo juramento, preguntas sobre su propia vida.',
          },
          {
            kind: 'steps',
            items: [
              '<strong>Revise el N-400 línea por línea</strong> contra la realidad de hoy: direcciones, empleos, viajes, hijos y estado civil cambian entre la presentación y la entrevista, y hay que reportarlo.',
              '<strong>Reúna el expediente completo</strong>: declaraciones de impuestos, comprobantes de manutención, disposiciones judiciales certificadas de cualquier arresto y el pasaporte con todos los sellos.',
              '<strong>Repase el banco correcto</strong>, el que corresponde a su fecha de presentación.',
              '<strong>Ensaye en voz alta las preguntas de carácter moral</strong>, que son las que ponen nervioso a todo el mundo. Se contestan con la verdad, en corto y sin adornos.',
              '<strong>Practique cómo pedir aclaración</strong> en inglés. Decir que no entendió no es reprobar; contestar al azar algo que no entendió sí puede costar caro.',
              '<strong>Decida por adelantado qué lleva</strong> el día de la cita y en qué orden, para no buscar papeles frente al oficial.',
              '<strong>Confirme quién puede acompañarlo</strong>: intérprete cuando corresponde una exención de idioma, o su abogado.',
            ],
          },
          {
            kind: 'note',
            text: 'Si en el ensayo aparece un tema incómodo, eso es exactamente lo que se buscaba: mejor descubrirlo en la oficina de su abogado, con tiempo para documentarlo, que frente al oficial de USCIS.',
          },
        ],
      },
    ],
    faq: {
      title: 'Preguntas frecuentes',
      items: [
        {
          q: 'Presenté mi N-400 antes del cambio. ¿Me van a examinar con las 128 preguntas?',
          a: 'Por regla general, no. La versión se determina por la fecha en que USCIS recibió su solicitud, no por la de la entrevista. Revise su aviso de recibo antes de comprar materiales de estudio.',
        },
        {
          q: 'Tengo un DUI de hace cuatro años. ¿Me niegan la ciudadanía?',
          a: 'No automáticamente. Un solo DUI no figura entre los impedimentos permanentes, pero sí pesa en la evaluación, sobre todo dentro del periodo estatutario. La forma de presentarlo importa: disposiciones certificadas, cumplimiento de la sentencia y evidencia de estabilidad posterior.',
        },
        {
          q: 'Debo impuestos. ¿Espero a pagar todo antes de aplicar?',
          a: 'No siempre hace falta pagar todo, pero sí que la deuda esté formalizada y al corriente. Un plan de pagos vigente con el IRS, con comprobantes, se ve muy distinto a una deuda ignorada. Un abogado le dirá si conviene resolverlo primero.',
        },
        {
          q: 'La corte anuló parte de las reglas en junio de 2026. ¿Ya no revisan el carácter moral?',
          a: 'Sí lo revisan. Lo que anuló la corte fue parte de la guía interna de USCIS, no el requisito legal, que viene de la ley y sigue en pie. Este tipo de decisiones puede apelarse o modificarse, así que verifique el estado vigente antes de actuar.',
        },
        {
          q: 'Tengo 57 años y 16 como residente. ¿Puedo hacer la entrevista en español?',
          a: 'Con esos números encajaría en la regla 55/15, que permite quedar exento del examen de inglés y entrevistarse en su idioma con intérprete. Se cuenta con la fecha de presentación del N-400.',
        },
        {
          q: '¿Qué pasa si repruebo el examen?',
          a: 'Normalmente se le da una segunda oportunidad para la parte que reprobó, sobre la misma versión del examen. Si tampoco la aprueba, la solicitud se niega y tendría que volver a presentar y pagar de nuevo.',
        },
      ],
    },
    conclusion: {
      title: 'La ciudadanía sigue siendo alcanzable; la improvisación ya no',
      text: 'Nada de lo que cambió en 2025 y 2026 cierra la puerta de la naturalización. Lo que cambió es el margen de error: un banco más grande, un umbral más alto y una revisión que mira el expediente entero en lugar de una casilla. Quien llega con impuestos al día, papeles ordenados y respuestas honestas sigue naturalizándose con normalidad.',
      advice: 'Si tiene cualquier antecedente, ausencia larga o duda sobre cómo obtuvo su residencia, revise su caso con un abogado antes de presentar el N-400, no después de recibir la cita.',
    },
    sources: {
      title: 'Fuentes y referencias',
      list: [
        'Ley de Inmigración y Nacionalidad (INA), sección 101(f) — definición de buen carácter moral e impedimentos',
        'Ley de Inmigración y Nacionalidad (INA), sección 316 — residencia continua, presencia física y buen carácter moral',
        'USCIS — Formulario N-400, Solicitud de Naturalización, e instrucciones oficiales',
        'USCIS — Materiales de estudio del examen de civismo y del examen de inglés',
        'USCIS — Formulario N-648, Certificación Médica para Excepciones por Discapacidad',
      ],
    },
    ui: ARTICLE_UI.es,
  },
  en: {
    metaTitle: 'Citizenship 2026: 128 Questions, New Review',
    metaDesc:
      'Since late 2025 the civics test draws on a 128-question bank and USCIS reviews good moral character far more strictly. What still applies in 2026.',
    title: 'Citizenship in 2026: A Longer Civics Test and Stricter Review',
    displayDate: 'Aug 06, 2026',
    readTime: '19 min',
    categoryLabel: 'Immigration Process',
    lastUpdated: 'August 6, 2026',
    summary: {
      title: 'Initial Summary',
      text: 'Filing an N-400 in 2026 is not what it was three years ago. Since late 2025 the <strong>2025 version of the civics test</strong> applies, with a bank of <strong>128 questions</strong> and more correct answers required to pass, and USCIS tightened how it evaluates <strong>good moral character</strong>: having no criminal record is no longer enough, because the officer weighs the entire file. Part of that internal guidance was <strong>vacated by a federal court on June 5, 2026</strong>, so a statute that never changed now sits alongside administrative instructions still in motion. Here we explain which test applies based on your filing date, what an officer really looks at, what still applies after the ruling, and when waiting beats filing.',
    },
    intro: [
      'For years, naturalization felt like the calm step at the end of the road: you were already a resident, the hard part was behind you, and the N-400 was almost a formality with a history quiz attached. That picture no longer describes 2026.',
      'Two things changed at once, and they should not be confused. The first is the <strong>test</strong>: since late 2025 the 2025 version of the civics exam applies, with a larger question bank and a higher passing threshold. The second, the one costing more cases, is the <strong>good moral character review</strong>: USCIS instructed its officers to make a holistic evaluation — to look at an applicant’s full conduct, not just whether a conviction shows up in the system.',
      'A third element should make you cautious about almost anything you read online on this topic: <strong>part of those memos was vacated by a federal court on June 5, 2026</strong>. The statute did not change, but the internal guidance did move and may keep moving. This article separates what is stable from what is in dispute.',
    ],
    sections: [
      {
        icon: 'calendar',
        title: 'Which test version applies, based on your filing date',
        subtitle: 'The interview date does not control',
        blocks: [
          {
            kind: 'text',
            text: 'The first question is not what to study; it is <strong>which test applies to you</strong>. USCIS does not switch versions for everyone on the same day: what controls is the date your N-400 was filed. Since late 2025, new applications are tested under the 2025 version; earlier ones stay under the previous version, even if the interview falls well into 2026.',
          },
          {
            kind: 'list',
            items: [
              'If you filed your N-400 <strong>before</strong> the 2025 version took effect, the earlier test applies, even if you are interviewed months later.',
              'If you filed <strong>after</strong>, you study the 128-question bank of the 2025 version.',
              'If you withdrew and refiled, or filed again after a denial, what counts is <strong>the new filing date</strong>.',
              'If you failed a portion, the second attempt is normally tested on <strong>the same version</strong>.',
            ],
          },
          {
            kind: 'text',
            text: 'The document that settles the question is already in your hands: the <strong>receipt notice</strong> from USCIS carries the received date, and that date sets the test version and the good moral character period that will be reviewed.',
          },
          {
            kind: 'note',
            text: 'Before buying study materials or paying for classes, confirm which version applies: studying the wrong bank is an expensive and entirely avoidable mistake.',
          },
        ],
      },
      {
        icon: 'clipboard',
        title: 'How the 2025 version of the test works',
        subtitle: 'A bank of 128, twenty questions, twelve correct',
        blocks: [
          {
            kind: 'text',
            text: 'The naturalization exam has two parts people often blend together: the <strong>English test</strong> (reading, writing and speaking) and the <strong>civics test</strong> (U.S. history and government). What the 2025 version changed is mainly the civics side.',
          },
          {
            kind: 'table',
            headers: ['Element', 'How it works in the 2025 version'],
            rows: [
              ['Question bank', 'USCIS publishes 128 history and government questions; everything asked at the interview comes from that list.'],
              ['Questions at the interview', 'The officer asks up to 20, out loud and in English, with no multiple choice.'],
              ['Correct answers to pass', 'You must answer 12 correctly.'],
              ['When it stops', 'The officer stops asking once you reach 12 correct answers, or once reaching 12 has become impossible.'],
              ['Age 65 or older with 20 years as a resident', 'Special consideration: a reduced list marked by USCIS, fewer questions and fewer correct answers required.'],
            ],
          },
          {
            kind: 'text',
            text: 'The English test did not go away: you are asked to <strong>read a sentence aloud</strong> and <strong>write another from dictation</strong>, and the speaking portion is assessed throughout the interview. That is why someone who memorized all 128 answers but cannot follow the N-400 questions can still run into trouble.',
          },
          {
            kind: 'note',
            text: 'Test format and study materials can be adjusted from one year to the next. Verify with USCIS or your attorney which version and which materials are in effect as of your case date.',
          },
        ],
      },
      {
        icon: 'balance',
        title: 'Good moral character in 2026 is far more than having no crimes',
        subtitle: 'What holistic review actually means',
        blocks: [
          {
            kind: 'text',
            text: 'The law requires <strong>good moral character</strong> throughout the statutory period: as a general rule the <strong>five years</strong> before filing, or <strong>three</strong> for someone applying as the spouse of a citizen who meets the other requirements. Section 101(f) of the Immigration and Nationality Act lists conduct that prevents such a finding, and that list is not exhaustive.',
          },
          {
            kind: 'cards',
            items: [
              {
                title: 'Permanent bars',
                desc: 'A murder conviction, and an aggravated felony conviction entered on or after November 29, 1990, permanently prevent a finding of good moral character.',
              },
              {
                title: 'Temporary bars',
                desc: 'They block while they fall inside the statutory period: certain convictions and periods of confinement, controlled substance violations, false testimony to obtain an immigration benefit, or willfully failing to support dependents.',
              },
              {
                title: 'Unlawful acts without a conviction',
                desc: 'An officer may consider conduct that never resulted in a conviction. A dismissed case is not always an irrelevant case for USCIS.',
              },
              {
                title: 'Holistic evaluation',
                desc: 'Beyond the statutory bars, the officer weighs the negative against the positive: work and family stability, taxes current, time elapsed, and evidence of rehabilitation.',
              },
            ],
          },
          {
            kind: 'text',
            text: 'That is what “holistic” means: the officer builds a portrait of the applicant from the whole file. An isolated incident eight years ago, followed by current taxes and a stable life, does not weigh the same as three incidents in two years. The law even allows conduct from <strong>before</strong> the statutory period to be weighed as context.',
          },
          {
            kind: 'warning',
            text: 'Lying or leaving something out on the form usually does more damage than the underlying event: many denials are caused not by an arrest six years ago, but by answering “no” to the question that asked about it. False testimony is, on its own, a bar.',
          },
        ],
      },
      {
        icon: 'alert',
        title: 'The classic problems that sink an N-400',
        subtitle: 'What shows up most often in denials',
        blocks: [
          {
            kind: 'text',
            text: 'In practice, most problems do not come from serious crimes, but from ordinary matters the applicant believed were resolved, forgotten, or irrelevant.',
          },
          {
            kind: 'cards',
            items: [
              {
                title: 'Unfiled taxes or IRS debt',
                desc: 'Failing to file returns you owed, or filing as “single” while married, are signals officers take seriously. A debt under a formal, current payment plan is very different from a debt that was ignored.',
              },
              {
                title: 'Child support arrears',
                desc: 'Willful failure to support dependents is a classic problem. Bring payment records, the court order and, if there were arrears, proof that you are now current.',
              },
              {
                title: 'DUI',
                desc: 'A single DUI is not automatically a statutory bar, but it weighs; multiple DUIs or a recent one with aggravating facts can sink a case. Bring certified dispositions for every incident.',
              },
              {
                title: 'Omissions on the form',
                desc: 'Answering “no” straight down the conduct questions is the most common mistake. Arrests without charges, citations, and dismissed or expunged cases generally must be disclosed even without a conviction.',
              },
            ],
          },
          {
            kind: 'list',
            items: [
              '<strong>Long absences.</strong> A trip longer than six months can break the presumption of continuous residence; an absence of a year or more normally breaks it outright.',
              '<strong>Selective Service.</strong> Men who lived in the country within the required age range are asked about that registration; not having done it calls for an explanation.',
              '<strong>Controlled substances.</strong> Drug violations still weigh in the federal analysis even when the conduct was legal under state law.',
              '<strong>Details that do not match.</strong> Addresses, jobs and marital status that differ between your older file and the N-400 create uncomfortable questions.',
            ],
          },
          {
            kind: 'warning',
            text: 'The N-400 does not review only the last five years: it is an audit of your entire file, including how you obtained residency. If your original petition contained an inaccuracy, the interview is where it surfaces.',
          },
        ],
      },
      {
        icon: 'gavel',
        title: 'What the court vacated in June 2026 and what still applies',
        subtitle: 'The statute did not move; the guidance did',
        blocks: [
          {
            kind: 'text',
            text: 'USCIS issued memos that tightened how good moral character is evaluated. On <strong>June 5, 2026</strong>, a federal court <strong>vacated part of that guidance</strong>. It is worth understanding what that means, because a great deal of confusion is circulating.',
          },
          {
            kind: 'text',
            text: 'When a court vacates a memo, what falls is the <strong>administrative instruction</strong>, not the legal requirement. Good moral character was not invented by USCIS: it is written into the statute and remains mandatory for naturalizing. What can change is how an officer is told to evaluate it.',
          },
          {
            kind: 'list',
            items: [
              '<strong>Still in effect:</strong> the statutory requirement of good moral character during the statutory period.',
              '<strong>Still in effect:</strong> the permanent and temporary bars listed in the statute.',
              '<strong>Still in effect:</strong> the officer’s authority to weigh the full record and request more evidence.',
              '<strong>Still in effect:</strong> your obligation to disclose accurately everything the form asks.',
              '<strong>May have changed:</strong> the detail of the internal instructions that governed that weighing.',
            ],
          },
          {
            kind: 'text',
            text: 'On the ground, a vacatur like this is not felt identically at every office, and not immediately: agencies take time to adjust instructions, and the decision can be appealed. The prudent move is not to bet on which guidance governs the day of your interview, but to <strong>build a file that holds up under either one</strong>.',
          },
          {
            kind: 'note',
            text: 'This is a moving topic. Before filing, withdrawing, or reviving an application based on the June 5, 2026 ruling, verify with an attorney what the current status of that guidance is on the date you plan to act.',
          },
        ],
      },
      {
        icon: 'globe',
        title: 'The language exemptions are still alive',
        subtitle: '50/20, 55/15 and the N-648 medical certification',
        blocks: [
          {
            kind: 'text',
            text: 'Since the test changed, many people ask whether the English exemptions disappeared. <strong>They did not.</strong> They remain in the legal framework of naturalization and mainly benefit older residents and people with medical disabilities.',
          },
          {
            kind: 'cards',
            items: [
              {
                title: 'The 50/20 rule',
                desc: 'Residents 50 or older with at least 20 years as permanent residents may be exempt from the English test and interview in their own language, with an interpreter.',
              },
              {
                title: 'The 55/15 rule',
                desc: 'Residents 55 or older with at least 15 years as permanent residents have the same option to be examined in their own language.',
              },
              {
                title: '65/20 special consideration',
                desc: 'Someone 65 or older with 20 years as a permanent resident also studies a reduced civics list designated by USCIS.',
              },
              {
                title: 'N-648 medical certification',
                desc: 'When a physical or mental disability prevents learning English or civics, an authorized medical professional can certify it on Form N-648 and request the exception.',
              },
            ],
          },
          {
            kind: 'text',
            text: 'These rules are measured as of the N-400 filing date, not the interview date, so a few months can decide whether you qualify. Our blog has an article devoted to the 50/20 and 55/15 rules and to how a well-documented N-648 is put together.',
          },
          {
            kind: 'note',
            text: 'An English exemption does not exempt you from the rest: even testing in your own language, you must still show good moral character, continuous residence, physical presence and attachment to the Constitution, and civics almost always remains.',
          },
        ],
      },
      {
        icon: 'clock',
        title: 'File now or wait? When there is a record',
        subtitle: 'The decision with the biggest consequences',
        blocks: [
          {
            kind: 'text',
            text: 'There is an enormous difference between an N-400 that gets denied and one that opens a door that had been closed. A denial can be appealed or refiled. But if the file reveals that the person is removable, USCIS can refer the case to removal — and then what was at stake was never citizenship: it was the green card.',
          },
          {
            kind: 'cards',
            items: [
              {
                title: 'Filing now usually makes sense',
                desc: 'Clean record, taxes current, short and documented absences, residency obtained without complications, and no question on the form that gives you pause.',
              },
              {
                title: 'Analyze it first',
                desc: 'Arrests without convictions, tax debt, support arrears, long trips, or a DUI inside the statutory period. None of this ends a case, but all of it needs strategy and documents.',
              },
              {
                title: 'Wait or review in depth',
                desc: 'Convictions inside the statutory period that will fall out of the calculation with time, or any doubt about how residency was obtained.',
              },
            ],
          },
          {
            kind: 'text',
            text: 'The logic of time is simple: many bars are <strong>temporary</strong> and stop blocking once the conduct falls outside the five-year or three-year statutory period. Waiting a few months can turn a difficult case into an ordinary one. But <strong>waiting erases nothing</strong> when the bar is permanent.',
          },
          {
            kind: 'warning',
            text: 'Do not file an N-400 “just to see what happens” if there is any criminal history, even old, dismissed, or from another state. An attorney can obtain your court records and your immigration file before anything is filed: that advance review prevents the expensive surprises.',
          },
        ],
      },
      {
        icon: 'users',
        title: 'The mock interview with your attorney',
        subtitle: 'Rehearsing is the best preparation',
        blocks: [
          {
            kind: 'text',
            text: 'The 128-question bank can be studied alone; the interview cannot. What most people struggle with is not U.S. history — it is answering clearly, in English and under oath, questions about their own life they have not reviewed in years.',
          },
          {
            kind: 'steps',
            items: [
              '<strong>Review the N-400 line by line</strong> against today’s reality: addresses, jobs, travel, children and marital status change between filing and interview, and that has to be reported.',
              '<strong>Gather the complete file</strong>: tax returns, child support records, certified court dispositions for any arrest, and the passport with every stamp.',
              '<strong>Study the correct question bank</strong> — the one matching your filing date.',
              '<strong>Rehearse the moral character questions out loud</strong>, because those are the ones that make everyone nervous. They are answered truthfully, briefly, without embellishment.',
              '<strong>Practice asking for clarification</strong> in English. Saying you did not understand is not failing; guessing at something you did not understand can be costly.',
              '<strong>Decide in advance what you will bring</strong> on the day and in what order, so you are not hunting for papers in front of the officer.',
              '<strong>Confirm who may accompany you</strong>: an interpreter where a language exemption applies, or your attorney.',
            ],
          },
          {
            kind: 'note',
            text: 'If an uncomfortable topic surfaces during the rehearsal, that is exactly the point: better to find it in your attorney’s office, with time to document it, than in front of a USCIS officer.',
          },
        ],
      },
    ],
    faq: {
      title: 'Frequently asked questions',
      items: [
        {
          q: 'I filed my N-400 before the change. Will I be tested on the 128 questions?',
          a: 'As a general rule, no. The version is set by the date USCIS received your application, not by your interview date. Check your receipt notice before buying any study materials.',
        },
        {
          q: 'I have a DUI from four years ago. Will citizenship be denied?',
          a: 'Not automatically. A single DUI is not among the permanent bars, but it does weigh in the evaluation, especially inside the statutory period. How it is presented matters: certified dispositions, proof the sentence was completed, and evidence of stability since.',
        },
        {
          q: 'I owe taxes. Should I pay everything off before applying?',
          a: 'You do not always need to pay it all, but the debt does need to be formalized and current. An active IRS payment plan with receipts looks very different from a debt that was ignored. An attorney can tell you whether to resolve it first.',
        },
        {
          q: 'The court vacated part of the rules in June 2026. Is moral character no longer reviewed?',
          a: 'It is still reviewed. What the court vacated was part of the USCIS internal guidance, not the legal requirement, which comes from the statute and remains in place. Decisions like this can be appealed or modified, so verify the current status before acting.',
        },
        {
          q: 'I am 57 with 16 years as a resident. Can I interview in Spanish?',
          a: 'Those numbers would fit the 55/15 rule, which allows an exemption from the English test and an interview in your own language with an interpreter. It is measured as of the N-400 filing date.',
        },
        {
          q: 'What happens if I fail the test?',
          a: 'You are normally given a second chance at the portion you failed, on the same test version. If you do not pass that one either, the application is denied and you would have to file and pay again.',
        },
      ],
    },
    conclusion: {
      title: 'Citizenship is still reachable; improvising is not',
      text: 'Nothing that changed in 2025 and 2026 closes the door to naturalization. What changed is the margin for error: a larger bank, a higher threshold, and a review that looks at the whole file instead of a single box. People who arrive with taxes current, papers in order and honest answers still naturalize routinely.',
      advice: 'If you have any record, any long absence, or any doubt about how you obtained your residency, review your case with an attorney before filing the N-400 — not after the interview notice arrives.',
    },
    sources: {
      title: 'Sources and references',
      list: [
        'Immigration and Nationality Act (INA), section 101(f) — definition of good moral character and its bars',
        'Immigration and Nationality Act (INA), section 316 — continuous residence, physical presence and good moral character',
        'USCIS — Form N-400, Application for Naturalization, and official instructions',
        'USCIS — Civics and English test study materials for naturalization',
        'USCIS — Form N-648, Medical Certification for Disability Exceptions',
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
          ? 'Solicitante de ciudadanía estadounidense en su entrevista de naturalización'
          : 'U.S. citizenship applicant at a naturalization interview'
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
