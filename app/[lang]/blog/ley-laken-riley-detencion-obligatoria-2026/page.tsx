import type { Metadata } from 'next';
import BlogArticleLayout from '../../../components/blogs/BlogArticleLayout';
import { buildArticleMetadata } from '../../../components/blogs/articleMetadata';
import { ARTICLE_UI, type BlogArticleContent } from '../../../components/blogs/articleModel';

const SLUG = 'ley-laken-riley-detencion-obligatoria-2026';
const ISO_DATE = '2026-08-06';
// TODO(portada): sustituir cuando marketing entregue la imagen definitiva.
const IMAGE = '/og-default.jpg';

const content: Record<'es' | 'en', BlogArticleContent> = {
  es: {
    metaTitle: 'Ley Laken Riley: detención sin fianza 2026',
    metaDesc:
      'Basta un cargo de robo en tienda, no una condena, para activar la detención obligatoria. Qué dice la Ley Laken Riley y qué están resolviendo las cortes.',
    title: 'Ley Laken Riley: por qué un cargo de robo en tienda puede dejarte detenido sin fianza',
    displayDate: '06 Ago, 2026',
    readTime: '20 min',
    categoryLabel: 'Defensa contra Deportación',
    lastUpdated: '6 de agosto de 2026',
    summary: {
      title: 'Resumen inicial',
      text: 'Desde 2025, una <strong>acusación</strong> —no una condena— por robo, hurto o delitos relacionados puede colocar a una persona no ciudadana dentro de la <strong>detención obligatoria</strong> mientras su caso migratorio avanza. Alguien acusado de sacar mercancía de una tienda, sin juicio y sin sentencia, puede pasar meses encerrado y escuchar siempre la misma frase: «no hay fianza». Aquí explicamos qué hace la Ley Laken Riley, por qué la diferencia entre cargo y condena lo cambia todo, qué están resolviendo las cortes sobre debido proceso y retroactividad, cómo se cruza con la audiencia de custodia de 90 días en Texas y qué debe hacer una familia en los primeros días.',
    },
    intro: [
      'Hay una escena que se repite cada semana en Texas. Una persona es detenida por un cargo menor —una acusación de robo en tienda, un problema con mercancía que ni siquiera salió del local— y en lugar de volver a casa tras pagar la fianza del condado, termina bajo custodia de inmigración durante meses.',
      'La razón tiene nombre. La <strong>Ley Laken Riley</strong> fue promulgada a inicios de 2025 y durante 2026 se ha aplicado de forma intensiva. Amplió la detención obligatoria a personas <strong>acusadas</strong> de robo, hurto y delitos relacionados. No dice «condenadas». Dice acusadas. Y esa sola palabra cambia por completo lo que le puede pasar a una familia.',
      'Este artículo explica qué significa eso en la práctica, qué límites le están poniendo los tribunales, cómo encaja con la audiencia de custodia dentro de 90 días que rige en Texas y qué puede hacer usted hoy para proteger a su familiar. Aquí no se prometen resultados: se explica el terreno.',
    ],
    sections: [
      {
        icon: 'gavel',
        title: 'Qué es la Ley Laken Riley y a quién le aplica',
        subtitle: 'El marco que cambió en 2025',
        blocks: [
          {
            kind: 'text',
            text: 'Antes de 2025, la detención obligatoria en la ley migratoria giraba sobre todo alrededor de <strong>condenas</strong>: ciertos delitos ya juzgados colocaban a la persona en una categoría donde el juez de inmigración no tiene autoridad para fijar una fianza ordinaria. La Ley Laken Riley movió esa línea hacia atrás en el tiempo: llevó el disparador desde la sentencia hasta la <strong>acusación</strong>.',
          },
          {
            kind: 'text',
            text: 'En la práctica, el gobierno sostiene que una persona no ciudadana a la que la ley trata como inadmisible y que es arrestada o acusada por alguno de los delitos cubiertos debe permanecer bajo custodia migratoria mientras se resuelve su caso. No importa que el caso penal siga abierto. La categoría se activa con el papel de la acusación.',
          },
          {
            kind: 'list',
            items: [
              '<strong>Qué cambió:</strong> el disparador pasó de la condena firme a la acusación o el arresto.',
              '<strong>A quién alcanza:</strong> a personas no ciudadanas que la ley trata como inadmisibles, incluidas muchas que llevan años trabajando aquí y tienen hijos ciudadanos.',
              '<strong>Qué NO cambió:</strong> la presunción de inocencia en la corte penal sigue intacta; lo que cambió es la consecuencia migratoria que corre en paralelo.',
              '<strong>Quién la aplica primero:</strong> ICE. La clasificación inicial la hace la agencia al momento del arresto, no un juez que haya escuchado a las dos partes.',
            ],
          },
          {
            kind: 'note',
            text: 'Esta es materia en movimiento: la ley es de 2025, su aplicación se intensificó en 2026 y hay litigio abierto sobre su alcance. <strong>Verifique el estado vigente de estas reglas con un abogado antes de tomar cualquier decisión</strong>.',
          },
        ],
      },
      {
        icon: 'alert',
        title: 'La clave que casi nadie entiende: un cargo no es una condena',
        subtitle: 'Y aquí basta el cargo',
        blocks: [
          {
            kind: 'text',
            text: 'Esta es la parte que más daño hace cuando se entiende tarde. En la corte penal, una persona es inocente hasta que se demuestre lo contrario y un cargo desechado no deja condena. En el sistema migratorio, en cambio, la detención no se considera un castigo sino una medida civil, y el Congreso puede fijar sus disparadores donde decida. Bajo esta ley los fijó en la acusación.',
          },
          {
            kind: 'cards',
            items: [
              {
                title: 'Cargo (acusación)',
                desc: 'Es la afirmación del Estado de que usted cometió un delito. No hay juicio ni sentencia. Bajo esta ley, basta para activar la detención migratoria obligatoria.',
              },
              {
                title: 'Condena',
                desc: 'Es el resultado formal del caso penal. En materia migratoria el concepto es más amplio: incluye arreglos con declaración de culpabilidad aunque el juez difiera el fallo.',
              },
              {
                title: 'Detención migratoria',
                desc: 'No es la cárcel del condado. Es una custodia civil paralela: se puede pagar la fianza del condado y aun así no salir, porque ICE mantiene una retención.',
              },
            ],
          },
          {
            kind: 'text',
            text: 'De ahí viene el golpe que muchas familias no ven venir: reúnen con esfuerzo la fianza del condado y no les entregan a su familiar, porque hay una retención de inmigración —un <strong>detainer</strong>— y la persona pasa de una custodia a la otra.',
          },
          {
            kind: 'warning',
            text: 'Que el fiscal desestime el cargo no significa que ICE libere a la persona esa misma tarde. La desestimación es un hecho enormemente favorable, pero alguien tiene que documentarla, llevarla al expediente migratorio y pedir la revisión de custodia. No ocurre solo.',
          },
        ],
      },
      {
        icon: 'clipboard',
        title: 'Qué delitos activan la detención obligatoria',
        subtitle: 'La familia de delitos contra la propiedad',
        blocks: [
          {
            kind: 'text',
            text: 'La ley se enfoca en delitos relacionados con la apropiación de bienes ajenos. Son figuras que la corte penal suele tratar como casos menores, y por eso el contraste resulta tan duro: consecuencias migratorias graves a partir de acusaciones que en el mundo penal se consideran leves.',
          },
          {
            kind: 'list',
            items: [
              '<strong>Robo</strong> y <strong>hurto</strong> en sus distintas modalidades.',
              '<strong>Hurto en tienda</strong> (shoplifting), incluido el de mercancía de bajo valor.',
              '<strong>Robo con allanamiento</strong> y figuras de entrada a un inmueble para sustraer bienes.',
              'Otros <strong>delitos relacionados</strong> con la apropiación indebida de bienes, según la clasificación de cada jurisdicción.',
            ],
          },
          {
            kind: 'text',
            text: 'El nombre exacto del delito cambia de estado a estado, y esa es una de las discusiones vivas: si un cargo estatal encaja dentro de la categoría federal se litiga caso por caso, comparando sus elementos con la definición federal. No es automático, aunque se aplique como si lo fuera.',
          },
          {
            kind: 'table',
            headers: ['Lo que creen las familias', 'Lo que ocurre en la práctica'],
            rows: [
              ['«Es solo una falta»', 'La gravedad penal del cargo no determina por sí sola la consecuencia migratoria.'],
              ['«No lo condenaron, no cuenta»', 'La acusación puede bastar para activar la detención obligatoria.'],
              ['«Pagué la fianza, hoy sale»', 'Si hay retención de inmigración, pasa a custodia de ICE al salir.'],
            ],
          },
          {
            kind: 'note',
            text: 'Los <strong>expedientes viejos</strong> importan. Un cargo de hace años que la persona creía cerrado puede reaparecer en la clasificación que hace ICE. Pedir el récord penal completo y el expediente migratorio es parte del trabajo inicial de cualquier defensa seria.',
          },
        ],
      },
      {
        icon: 'balance',
        title: 'Qué están diciendo las cortes',
        subtitle: 'Debido proceso y límites a la retroactividad',
        blocks: [
          {
            kind: 'text',
            text: 'La ley no se aplica en el vacío. Desde que entró en vigor hay litigio, y dos preguntas se repiten ante los tribunales: hasta dónde puede llegar una detención sin revisión individual, y si la ley alcanza arrestos ocurridos antes de su entrada en vigor.',
          },
          {
            kind: 'text',
            text: '<strong>Primer frente: la duración.</strong> Al menos una corte ha ordenado la liberación de una persona por detención prolongada cuando lo que la mantenía encerrada era una alegación menor de robo en tienda. El razonamiento va por el debido proceso: una cosa es detener a alguien mientras su caso avanza y otra mantenerlo encerrado mes tras mes sobre una acusación que nunca se ha probado.',
          },
          {
            kind: 'text',
            text: '<strong>Segundo frente: la retroactividad.</strong> Hay disputa sobre si la ley puede aplicarse a arrestos ocurridos antes de su promulgación. No es un tecnicismo: de la respuesta depende que muchas personas queden dentro o fuera de la categoría por hechos que ya creían resueltos.',
          },
          {
            kind: 'list',
            items: [
              'Un fallo favorable en otro caso <strong>no libera automáticamente</strong> a su familiar: hay que invocarlo en el expediente concreto.',
              'El alcance de cada decisión depende del tribunal que la dicta y de su jurisdicción; lo que sirve en un lugar puede no aplicar en otro.',
              'Documentar <strong>cuánto tiempo</strong> lleva detenida la persona y <strong>qué tan menor</strong> es la acusación es lo que alimenta el argumento de debido proceso.',
            ],
          },
          {
            kind: 'note',
            text: 'No se apoye en jurisprudencia de oídas. Este artículo describe el panorama a la fecha de su última actualización; <strong>antes de actuar, confirme con un abogado el estado vigente de estas decisiones</strong> en su jurisdicción.',
          },
        ],
      },
      {
        icon: 'clock',
        title: 'Cómo se cruza con la audiencia de fianza en 90 días',
        subtitle: 'Texas, Luisiana y Misisipi',
        blocks: [
          {
            kind: 'text',
            text: 'Si su caso está en Texas, Luisiana o Misisipi hay una segunda pieza que encaja aquí. En julio de 2026, el Quinto Circuito resolvió que, aun bajo la etiqueta de detención obligatoria, el gobierno no puede mantener detenida a una persona indefinidamente sin darle una <strong>audiencia individualizada de custodia dentro de 90 días</strong>, y que en esa audiencia le toca al gobierno demostrar peligro concreto o riesgo de fuga. A ese fallo le dedicamos un artículo completo en este blog.',
          },
          {
            kind: 'text',
            text: 'Puestas las dos piezas juntas: la Ley Laken Riley puede meter a alguien en la categoría de detención obligatoria con una simple acusación, pero esa categoría <strong>no es un cheque en blanco</strong> para tenerlo encerrado sin que nadie revise su situación individual.',
          },
          {
            kind: 'list',
            items: [
              'La etiqueta de detención obligatoria <strong>no equivale</strong> a detención sin límite de tiempo.',
              'La audiencia no garantiza la salida: garantiza que un juez mire el caso concreto y que el gobierno justifique por qué esa persona debe seguir encerrada.',
              'Preparar bien esa audiencia toma semanas de reunir documentos y cartas. Empezar el día 85 es empezar tarde.',
            ],
          },
          {
            kind: 'note',
            text: 'Marque en un calendario la fecha exacta en que empezó la detención y cuente los días. Muchas familias descubren tarde que su familiar lleva bastante más de 90 días encerrado y nadie ha pedido nada. El tiempo corre desde el primer día de custodia.',
          },
        ],
      },
      {
        icon: 'users',
        title: 'Por qué el abogado penal y el de inmigración tienen que hablar',
        subtitle: 'El error más caro y el más evitable',
        blocks: [
          {
            kind: 'text',
            text: 'Cuando alguien que no es ciudadano enfrenta un cargo penal hay dos casos abiertos al mismo tiempo, y las decisiones de uno determinan el resultado del otro. Si los dos abogados no hablan, la persona puede «ganar» el caso penal y perder la vida que construyó aquí. Bajo esta ley eso se volvió más urgente, porque la sola existencia del cargo ya tiene efectos.',
          },
          {
            kind: 'text',
            text: 'La ley reconoce esto desde hace años: el abogado de defensa penal tiene el <strong>deber de advertir sobre las consecuencias migratorias</strong> de declararse culpable. No es una cortesía; es parte de la defensa efectiva a la que la persona tiene derecho. Y deshacer después un arreglo es mucho más difícil que hacerlo bien la primera vez.',
          },
          {
            kind: 'cards',
            items: [
              {
                title: '«Declárate culpable y sales hoy»',
                desc: 'Salir del condado esa tarde puede costar una condena que en materia migratoria cierra puertas por años. La prisa es el peor consejero.',
              },
              {
                title: '«Es adjudicación diferida, no cuenta»',
                desc: 'En la corte penal quizá no. En materia migratoria, una declaración de culpabilidad con alguna sanción suele contar como condena aunque el juez difiera el fallo.',
              },
              {
                title: '«Es un cargo menor, no pasa nada»',
                desc: 'Bajo esta ley, la gravedad penal y la gravedad migratoria dejaron de ir de la mano. Un cargo menor puede tener una consecuencia mayor.',
              },
            ],
          },
          {
            kind: 'list',
            items: [
              'Que su abogado penal sepa que usted <strong>no es ciudadano</strong> antes de negociar nada.',
              'Que consulte con un abogado de inmigración <strong>antes</strong> de aceptar cualquier arreglo, no después de firmarlo.',
              'Que busque la <strong>desestimación</strong> del cargo o su reclasificación hacia una figura sin consecuencia migratoria.',
              'Que le entregue copia de todo: acusación, acuerdo, sentencia y constancia de la disposición final.',
            ],
          },
          {
            kind: 'warning',
            text: 'Nunca acepte un arreglo penal el mismo día que se lo ofrecen si no es ciudadano y nadie ha revisado el impacto migratorio. Salir rápido del condado para pasar después un año detenido por inmigración no es un buen intercambio.',
          },
        ],
      },
      {
        icon: 'shield',
        title: 'Qué hacer si ICE detiene a un familiar por un cargo menor',
        subtitle: 'Las primeras 72 horas',
        blocks: [
          {
            kind: 'text',
            text: 'Si su familiar ya está detenido, las primeras horas valen más que las siguientes semanas. Esto es lo que sirve, en orden, y se puede empezar hoy desde su casa.',
          },
          {
            kind: 'steps',
            items: [
              'Consiga el <strong>número A</strong> y la fecha exacta en que empezó la detención. Sin ese número casi nada avanza.',
              'Ubíquelo con el <strong>localizador de detenidos de ICE</strong> en línea y anote el centro de detención y su teléfono.',
              'Contrate abogado y firme el <strong>formulario G-28</strong> para que quede acreditado en el expediente y pueda recibir información oficial.',
              'Reúna el <strong>expediente penal completo</strong>: acusación, fechas, resultado y cualquier constancia de desestimación o reducción del cargo.',
              'Empiece a armar el <strong>paquete de arraigo</strong> desde el primer día, sin esperar fecha de audiencia; toma semanas quedar bien.',
              'Ponga <strong>fondos en la cuenta telefónica</strong> del detenido y acuerden una hora fija de llamada. Las llamadas se graban: nada de detalles del caso por teléfono.',
              'Deje por escrito un <strong>plan de cuidado</strong> para los hijos y guarde en un solo lugar pasaportes, actas, contrato de renta y declaraciones de impuestos.',
            ],
          },
          {
            kind: 'warning',
            text: 'No permita que su familiar firme una <strong>salida voluntaria</strong> ni una renuncia a su audiencia solo para terminar con el encierro. Esa decisión se toma con un abogado y con toda la información, nunca bajo presión.',
          },
        ],
      },
      {
        icon: 'file',
        title: 'Evidencia de arraigo: el paquete que decide una custodia',
        subtitle: 'Documentos, no discursos',
        blocks: [
          {
            kind: 'text',
            text: 'Cuando llegue la revisión de custodia, la pregunta del juez será sencilla: ¿es esta persona un peligro concreto y va a presentarse a sus audiencias? Con la carga de la prueba del lado del gobierno, el trabajo de la defensa es hacer visible una vida entera con documentos. Las buenas intenciones no se archivan; un contrato de renta sí.',
          },
          {
            kind: 'list',
            items: [
              '<strong>Arraigo familiar:</strong> actas de nacimiento de los hijos, acta de matrimonio y prueba de dependencia económica.',
              '<strong>Tiempo en el país:</strong> registros escolares y médicos, recibos, contratos de renta y declaraciones de impuestos de varios años.',
              '<strong>Empleo:</strong> carta del patrón con puesto, antigüedad, salario y disposición de recontratarlo al salir.',
              '<strong>Domicilio estable:</strong> contrato de arrendamiento o escritura y carta firmada de quien lo recibirá.',
              '<strong>Cartas de apoyo:</strong> de la iglesia, vecinos, compañeros de trabajo y maestros, firmadas y con datos de contacto.',
              '<strong>El caso penal completo:</strong> incluida la desestimación si la hubo, y constancias de haber asistido a citas y audiencias previas.',
            ],
          },
          {
            kind: 'note',
            text: 'Un expediente ordenado, con documentos legibles y cartas firmadas, comunica algo que ninguna declaración puede: que afuera hay una red real esperando a esta persona.',
          },
        ],
      },
    ],
    faq: {
      title: 'Preguntas frecuentes',
      items: [
        {
          q: '¿De verdad pueden detener a mi esposo solo por una acusación, sin condena?',
          a: 'Bajo la Ley Laken Riley el gobierno sostiene que sí: la acusación o el arresto por los delitos cubiertos basta para colocarlo en la categoría de detención obligatoria. No hace falta que un juez penal lo haya declarado culpable. Eso no significa que no haya nada que hacer, pero sí que hay que actuar rápido.',
        },
        {
          q: 'Si desestiman el cargo penal, ¿lo sueltan automáticamente?',
          a: 'No de forma automática. La desestimación es un hecho muy favorable, pero alguien tiene que documentarla, presentarla en el expediente migratorio y pedir que se revise la custodia. Si nadie lo hace, la persona puede seguir detenida semanas después de que su caso penal terminó.',
        },
        {
          q: 'Pagué la fianza del condado y no me lo entregaron. ¿Por qué?',
          a: 'Lo más probable es que exista una retención de inmigración sobre él. La fianza del condado resuelve el caso penal, no la custodia migratoria, y al salir la persona pasa directamente a manos de ICE. Son dos sistemas distintos que corren en paralelo.',
        },
        {
          q: '¿La ley aplica a un arresto anterior a su aprobación?',
          a: 'Ese es uno de los puntos en disputa en los tribunales. Hay litigio abierto sobre si la ley alcanza arrestos anteriores a su promulgación, y la respuesta puede variar según la jurisdicción y el momento. Pregunte específicamente por este punto y verifique el criterio vigente donde está su caso.',
        },
        {
          q: 'Me dijeron que es detención obligatoria. ¿Sirve pedir revisión de custodia?',
          a: 'Sí, por dos razones. Primero, se puede discutir que la categoría no aplica a los hechos de su caso. Segundo, en Texas, Luisiana y Misisipi rige la exigencia de una audiencia individualizada dentro de 90 días incluso bajo esa etiqueta. «No hay fianza» es la posición del gobierno, no una sentencia.',
        },
        {
          q: '¿Cuánto tiempo puede estar detenido mi familiar?',
          a: 'Depende del caso, de la jurisdicción y de qué tan pronto se pidan las revisiones que correspondan. Lo que sí sabemos es que la detención prolongada sin revisión individual es precisamente lo que están cuestionando las cortes.',
        },
      ],
    },
    conclusion: {
      title: 'Una acusación no es una sentencia',
      text: 'La Ley Laken Riley movió una línea que la mayoría de la gente no sabía que existía, y hoy hay personas encerradas durante meses por acusaciones que la corte penal considera menores. Entender que basta el cargo no sirve para asustarse: sirve para actuar distinto. Significa cuidar cada paso del caso penal, contar los días de detención, reunir la evidencia de arraigo antes de que la pidan y no aceptar «no hay fianza» como respuesta final.',
      advice: 'Si a un familiar suyo lo detuvieron por un cargo menor, reúna hoy el número A, el expediente penal y los documentos de arraigo, y busque asesoría antes de que nadie firme nada.',
    },
    sources: {
      title: 'Fuentes y referencias',
      list: [
        'Ley Laken Riley (2025) — ampliación de las causales de detención obligatoria en materia migratoria',
        'Ley de Inmigración y Nacionalidad (INA) — disposiciones sobre detención obligatoria, custodia y definición de condena',
        'Padilla v. Kentucky — deber del abogado de defensa penal de advertir las consecuencias migratorias de una declaración de culpabilidad',
        'ICE — Sistema en línea de localización de detenidos (Online Detainee Locator System)',
        'EOIR, Oficina Ejecutiva de Revisión de Casos de Inmigración — procedimientos de custodia y fianza ante el juez de inmigración',
      ],
    },
    ui: ARTICLE_UI.es,
  },
  en: {
    metaTitle: 'Laken Riley Act: Detained Without Bond 2026',
    metaDesc:
      'A charge for shoplifting, not a conviction, can trigger mandatory detention. What the Laken Riley Act does and what the courts are now deciding.',
    title: 'The Laken Riley Act: Why a Shoplifting Charge Can Leave You Detained Without Bond',
    displayDate: 'Aug 06, 2026',
    readTime: '20 min',
    categoryLabel: 'Deportation Defense',
    lastUpdated: 'August 6, 2026',
    summary: {
      title: 'Initial Summary',
      text: 'Since 2025, a <strong>charge</strong> — not a conviction — for theft, larceny or related offenses can place a non-citizen inside <strong>mandatory detention</strong> while their immigration case moves forward. Someone accused of taking merchandise from a store, with no trial and no judgment, can spend months locked up hearing the same sentence over and over: “there is no bond.” Here we explain what the Laken Riley Act does, why the difference between a charge and a conviction changes everything, what courts are deciding about due process and retroactivity, how it intersects with the 90-day custody hearing rule in Texas, and what a family should do in the first days.',
    },
    intro: [
      'There is a scene that repeats every week in Texas. Someone is arrested on a minor charge — a shoplifting allegation, a dispute over merchandise that never left the store — and instead of going home after the county bond is posted, they end up in immigration custody for months.',
      'The reason has a name. The <strong>Laken Riley Act</strong> was enacted in early 2025 and has been applied intensively through 2026. It expanded mandatory detention to people who are <strong>charged</strong> with theft, larceny and related offenses. It does not say “convicted.” It says charged. And that single word completely changes what can happen to a family.',
      'This article explains what that means in practice, what limits the courts are setting, how it fits with the 90-day custody hearing rule that applies in Texas, and what you can do today to protect your family member. Nothing here promises results: it maps the terrain.',
    ],
    sections: [
      {
        icon: 'gavel',
        title: 'What the Laken Riley Act is and who it applies to',
        subtitle: 'The framework that changed in 2025',
        blocks: [
          {
            kind: 'text',
            text: 'Before 2025, mandatory detention in immigration law turned mostly on <strong>convictions</strong>: certain offenses, already tried and sentenced, placed a person in a category where the immigration judge has no authority to set an ordinary bond. The Laken Riley Act moved that line earlier in time: it shifted the trigger from the judgment to the <strong>accusation</strong>.',
          },
          {
            kind: 'text',
            text: 'In practice, the government maintains that a non-citizen whom the law treats as inadmissible and who is arrested for or charged with one of the covered offenses must remain in immigration custody while the case is resolved. It does not matter that the criminal case is still open. The category is triggered by the charging paper itself.',
          },
          {
            kind: 'list',
            items: [
              '<strong>What changed:</strong> the trigger moved from a final conviction to a charge or an arrest.',
              '<strong>Who it reaches:</strong> non-citizens the law treats as inadmissible, including many who have worked here for years and have U.S.-citizen children.',
              '<strong>What did NOT change:</strong> the presumption of innocence in criminal court remains intact; what changed is the immigration consequence running in parallel.',
              '<strong>Who applies it first:</strong> ICE. The initial classification is made by the agency at the moment of arrest, not by a judge who has heard both sides.',
            ],
          },
          {
            kind: 'note',
            text: 'This is moving ground: the law dates from 2025, enforcement intensified in 2026, and there is open litigation over its scope. <strong>Verify the current state of these rules with an attorney before making any decision</strong>.',
          },
        ],
      },
      {
        icon: 'alert',
        title: 'The key almost nobody understands: a charge is not a conviction',
        subtitle: 'And here the charge is enough',
        blocks: [
          {
            kind: 'text',
            text: 'This is the part that does the most damage when it is understood too late. In criminal court, a person is innocent until proven otherwise and a dismissed charge leaves no conviction. In the immigration system, by contrast, detention is not treated as punishment but as a civil measure, and Congress can place its triggers where it chooses. Under this law it placed them at the accusation.',
          },
          {
            kind: 'cards',
            items: [
              {
                title: 'Charge (accusation)',
                desc: 'It is the State’s assertion that you committed an offense. No trial, no judgment. Under this law, it is enough to trigger mandatory immigration detention.',
              },
              {
                title: 'Conviction',
                desc: 'It is the formal outcome of the criminal case. In immigration law the concept is broader: it includes arrangements with a guilty plea even when the judge defers adjudication.',
              },
              {
                title: 'Immigration detention',
                desc: 'It is not the county jail. It is parallel civil custody: the county bond can be paid and the person still does not walk out, because ICE holds them.',
              },
            ],
          },
          {
            kind: 'text',
            text: 'That is where the blow so many families never see coming lands: they scrape together the county bond and their relative is still not released, because there is an immigration hold — a <strong>detainer</strong> — and the person moves from one custody to the other.',
          },
          {
            kind: 'warning',
            text: 'A prosecutor dismissing the charge does not mean ICE releases the person that same afternoon. The dismissal is an enormously favorable fact, but someone has to document it, put it in the immigration record and request custody review. It does not happen on its own.',
          },
        ],
      },
      {
        icon: 'clipboard',
        title: 'Which offenses trigger mandatory detention',
        subtitle: 'The property-offense family',
        blocks: [
          {
            kind: 'text',
            text: 'The law focuses on offenses involving taking someone else’s property. These are charges criminal courts usually treat as minor matters, and that is why the contrast is so harsh: serious immigration consequences flowing from accusations the criminal world considers light.',
          },
          {
            kind: 'list',
            items: [
              '<strong>Theft</strong> and <strong>larceny</strong> in their various forms.',
              '<strong>Shoplifting</strong>, including merchandise of low value.',
              '<strong>Burglary</strong> and related offenses involving entering a property to take goods.',
              'Other <strong>related offenses</strong> involving the improper taking of property, depending on how each jurisdiction classifies them.',
            ],
          },
          {
            kind: 'text',
            text: 'The exact name of the offense changes from state to state, and that is one of the live disputes: whether a state charge fits within the federal category is litigated case by case, comparing its elements with the federal definition. It is not automatic, even when applied as if it were.',
          },
          {
            kind: 'table',
            headers: ['What families believe', 'What actually happens'],
            rows: [
              ['“It is only a misdemeanor”', 'The criminal severity of the charge alone does not determine the immigration consequence.'],
              ['“He was never convicted, so it does not count”', 'The accusation alone can be enough to trigger mandatory detention.'],
              ['“I posted the bond, he gets out today”', 'If there is an immigration hold, he passes into ICE custody upon release.'],
            ],
          },
          {
            kind: 'note',
            text: '<strong>Old records matter.</strong> A charge from years ago that the person believed was closed can resurface in the classification ICE makes. Pulling the complete criminal record and the immigration file is part of the initial work of any serious defense.',
          },
        ],
      },
      {
        icon: 'balance',
        title: 'What the courts are saying',
        subtitle: 'Due process and limits on retroactivity',
        blocks: [
          {
            kind: 'text',
            text: 'The law is not applied in a vacuum. Litigation has been ongoing since it took effect, and two questions keep returning to the courts: how far detention can go without individual review, and whether the law reaches arrests that occurred before it took effect.',
          },
          {
            kind: 'text',
            text: '<strong>First front: duration.</strong> At least one court has ordered a person released because of prolonged detention where what kept them locked up was a minor shoplifting allegation. The reasoning runs through due process: it is one thing to detain someone while a case moves along, and another to keep them confined month after month on an accusation that has never been proven.',
          },
          {
            kind: 'text',
            text: '<strong>Second front: retroactivity.</strong> There is a dispute over whether the law can be applied to arrests that occurred before it was enacted. This is no technicality: the answer determines whether many people fall inside or outside the category over events they believed were already resolved.',
          },
          {
            kind: 'list',
            items: [
              'A favorable ruling in another case <strong>does not automatically release</strong> your relative: it has to be raised in the specific file.',
              'The reach of each decision depends on the court issuing it and on your jurisdiction; what works in one place may not apply in another.',
              'Documenting <strong>how long</strong> the person has been detained and <strong>how minor</strong> the accusation is feeds the due process argument.',
            ],
          },
          {
            kind: 'note',
            text: 'Do not rely on secondhand case law. This article describes the landscape as of its last update; <strong>before acting, confirm with an attorney the current state of these decisions</strong> in your jurisdiction.',
          },
        ],
      },
      {
        icon: 'clock',
        title: 'How it intersects with the 90-day bond hearing',
        subtitle: 'Texas, Louisiana and Mississippi',
        blocks: [
          {
            kind: 'text',
            text: 'If your case is in Texas, Louisiana or Mississippi, a second piece fits here. In July 2026, the Fifth Circuit held that, even under the mandatory detention label, the government cannot keep a person detained indefinitely without an <strong>individualized custody hearing within 90 days</strong>, and that at that hearing it is the government that must show concrete danger or flight risk. We devoted a full article to that ruling on this blog.',
          },
          {
            kind: 'text',
            text: 'Put the two pieces together: the Laken Riley Act can place someone in the mandatory detention category on a mere accusation, but that category <strong>is not a blank check</strong> to keep them confined with nobody reviewing their individual situation.',
          },
          {
            kind: 'list',
            items: [
              'The mandatory detention label <strong>is not the same</strong> as detention without a time limit.',
              'The hearing does not guarantee release: it guarantees a judge looks at the specific case and the government justifies why this person should stay confined.',
              'Preparing that hearing well takes weeks of gathering documents and letters. Starting on day 85 is starting late.',
            ],
          },
          {
            kind: 'note',
            text: 'Mark the exact date detention began on a calendar and count the days. Many families find out too late that their relative has been locked up well past 90 days and nobody has requested anything. The clock runs from the first day of custody.',
          },
        ],
      },
      {
        icon: 'users',
        title: 'Why the criminal and immigration attorneys have to talk',
        subtitle: 'The costliest and most avoidable mistake',
        blocks: [
          {
            kind: 'text',
            text: 'When someone who is not a citizen faces a criminal charge there are two cases open at the same time, and decisions in one determine the outcome of the other. If the two attorneys do not talk, the person can “win” the criminal case and lose the life they built here. Under this law that became more urgent, because the mere existence of the charge already has effects.',
          },
          {
            kind: 'text',
            text: 'The law has recognized this for years: criminal defense counsel has a <strong>duty to advise about the immigration consequences</strong> of pleading guilty. It is not a courtesy; it is part of the effective defense the person is entitled to. And undoing a deal later is far harder than getting it right the first time.',
          },
          {
            kind: 'cards',
            items: [
              {
                title: '“Plead guilty and you go home today”',
                desc: 'Walking out of the county jail that afternoon can cost a conviction that closes immigration doors for years. Haste is the worst adviser.',
              },
              {
                title: '“It is deferred adjudication, it does not count”',
                desc: 'In criminal court it may not. In immigration law, a guilty plea with some penalty imposed usually counts as a conviction even when the judge defers the finding.',
              },
              {
                title: '“It is a minor charge, nothing will happen”',
                desc: 'Under this law, criminal severity and immigration severity stopped moving together. A minor charge can carry a major consequence.',
              },
            ],
          },
          {
            kind: 'list',
            items: [
              'Make sure your criminal attorney knows you are <strong>not a citizen</strong> before negotiating anything.',
              'Make sure they consult an immigration attorney <strong>before</strong> accepting any deal, not after signing it.',
              'Make sure they seek <strong>dismissal</strong> of the charge or reclassification to an offense without immigration consequences.',
              'Make sure they give you copies of everything: charging document, agreement, judgment and proof of final disposition.',
            ],
          },
          {
            kind: 'warning',
            text: 'Never accept a criminal plea deal the same day it is offered if you are not a citizen and nobody has reviewed the immigration impact. Getting out of the county jail quickly only to spend a year in immigration detention is not a good trade.',
          },
        ],
      },
      {
        icon: 'shield',
        title: 'What to do if ICE detains a relative over a minor charge',
        subtitle: 'The first 72 hours',
        blocks: [
          {
            kind: 'text',
            text: 'If your relative is already detained, the first hours are worth more than the following weeks. This is what actually helps, in order, and you can start today from home.',
          },
          {
            kind: 'steps',
            items: [
              'Get the <strong>A-number</strong> and the exact date detention began. Almost nothing moves forward without that number.',
              'Locate them through the <strong>ICE online detainee locator</strong> and write down the detention center and its phone number.',
              'Hire an attorney and sign <strong>Form G-28</strong> so counsel is on the record and can receive official information.',
              'Gather the <strong>complete criminal file</strong>: charging document, dates, outcome, and any proof of dismissal or reduction of the charge.',
              'Start building the <strong>equities package</strong> from day one, without waiting for a hearing date; it takes weeks to do well.',
              'Put <strong>funds in the detainee’s phone account</strong> and agree on a fixed call time. Calls are recorded: no case details over the phone.',
              'Put a <strong>care plan</strong> for the children in writing and keep passports, birth certificates, the lease and tax returns in one place.',
            ],
          },
          {
            kind: 'warning',
            text: 'Do not let your relative sign a <strong>voluntary departure</strong> or a waiver of their hearing simply to end the confinement. That decision is made with an attorney and with all the information, never under pressure.',
          },
        ],
      },
      {
        icon: 'file',
        title: 'Equities evidence: the package that decides a custody case',
        subtitle: 'Documents, not speeches',
        blocks: [
          {
            kind: 'text',
            text: 'When custody review comes, the judge’s question will be simple: is this person a concrete danger, and will they appear at their hearings? With the burden of proof on the government, the defense’s job is to make an entire life visible through documents. Good intentions cannot be filed; a lease can.',
          },
          {
            kind: 'list',
            items: [
              '<strong>Family ties:</strong> children’s birth certificates, marriage certificate and proof of financial dependence.',
              '<strong>Time in the country:</strong> school and medical records, receipts, leases and tax returns across several years.',
              '<strong>Employment:</strong> employer letter with position, seniority, wage and willingness to rehire upon release.',
              '<strong>Stable housing:</strong> lease or deed and a signed letter from whoever will take the person in.',
              '<strong>Support letters:</strong> from the church, neighbors, coworkers and teachers, signed and with contact information.',
              '<strong>The complete criminal case:</strong> including the dismissal if there was one, and proof of attending prior appointments and hearings.',
            ],
          },
          {
            kind: 'note',
            text: 'An organized file, with legible documents and signed letters, communicates something no statement can: that outside there is a real network waiting for this person.',
          },
        ],
      },
    ],
    faq: {
      title: 'Frequently asked questions',
      items: [
        {
          q: 'Can they really detain my husband on an accusation alone, with no conviction?',
          a: 'Under the Laken Riley Act the government maintains that it can: the charge or arrest for a covered offense is enough to place him in the mandatory detention category. No criminal judge needs to have found him guilty. That does not mean nothing can be done, but it does mean you must act quickly.',
        },
        {
          q: 'If the criminal charge is dismissed, is he released automatically?',
          a: 'Not automatically. Dismissal is a very favorable fact, but someone has to document it, present it in the immigration record and ask for custody review. If nobody does that, a person can remain detained weeks after their criminal case is over.',
        },
        {
          q: 'I posted the county bond and they did not release him. Why?',
          a: 'Most likely there is an immigration hold on him. The county bond resolves the criminal case, not immigration custody, and upon release the person passes straight into ICE hands. These are two separate systems running in parallel.',
        },
        {
          q: 'Does the law apply to an arrest that happened before it passed?',
          a: 'That is one of the points in dispute in the courts. There is open litigation over whether the law reaches arrests predating its enactment, and the answer may vary by jurisdiction and over time. Ask about this point specifically and verify the current standard where your case sits.',
        },
        {
          q: 'They told me it is mandatory detention. Is it worth asking for custody review?',
          a: 'Yes, for two reasons. First, it can be argued that the category does not apply to the facts of your case. Second, in Texas, Louisiana and Mississippi the requirement of an individualized hearing within 90 days applies even under that label. “There is no bond” is the government’s position, not a ruling.',
        },
        {
          q: 'How long can my relative be detained?',
          a: 'It depends on the case, the jurisdiction and how soon the appropriate reviews are requested. What we do know is that prolonged detention without individual review is exactly what the courts are questioning.',
        },
      ],
    },
    conclusion: {
      title: 'An accusation is not a judgment',
      text: 'The Laken Riley Act moved a line most people did not know existed, and today there are people confined for months over accusations criminal courts consider minor. Understanding that the charge alone is enough is not a reason to panic: it is a reason to act differently. It means guarding every step of the criminal case, counting the days of detention, gathering equities evidence before anyone asks for it, and refusing to accept “there is no bond” as a final answer.',
      advice: 'If a relative of yours was detained over a minor charge, gather the A-number, the criminal file and the equities documents today, and get advice before anyone signs anything.',
    },
    sources: {
      title: 'Sources and references',
      list: [
        'Laken Riley Act (2025) — expansion of the grounds for mandatory immigration detention',
        'Immigration and Nationality Act (INA) — provisions on mandatory detention, custody and the definition of conviction',
        'Padilla v. Kentucky — criminal defense counsel’s duty to advise on the immigration consequences of a guilty plea',
        'ICE — Online Detainee Locator System',
        'EOIR, Executive Office for Immigration Review — custody and bond procedures before the immigration judge',
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
          ? 'Persona detenida por ICE tras un cargo menor bajo la Ley Laken Riley'
          : 'Person detained by ICE after a minor charge under the Laken Riley Act'
      }
      isoDate={ISO_DATE}
      servicePath="/servicios/ley-criminal"
      trackerCategory="Defensa contra Deportación"
    />
  );
}

export function generateStaticParams() {
  return [{ lang: 'es' }, { lang: 'en' }];
}
