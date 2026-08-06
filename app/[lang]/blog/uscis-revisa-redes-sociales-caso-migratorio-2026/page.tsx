import type { Metadata } from 'next';
import BlogArticleLayout from '../../../components/blogs/BlogArticleLayout';
import { buildArticleMetadata } from '../../../components/blogs/articleMetadata';
import { ARTICLE_UI, type BlogArticleContent } from '../../../components/blogs/articleModel';

const SLUG = 'uscis-revisa-redes-sociales-caso-migratorio-2026';
const ISO_DATE = '2026-08-06';
// TODO(portada): sustituir cuando marketing entregue la imagen definitiva.
const IMAGE = '/og-default.jpg';

const content: Record<'es' | 'en', BlogArticleContent> = {
  es: {
    metaTitle: 'USCIS revisa tus redes: qué daña tu caso',
    metaDesc:
      'USCIS revisa redes sociales en más trámites y pide sus identificadores en los formularios. Qué buscan, qué daña su caso y qué nunca debe hacer.',
    title: 'USCIS revisa tus redes sociales: publicaciones que pueden dañar tu caso',
    displayDate: '06 Ago, 2026',
    readTime: '9 min',
    categoryLabel: 'Procesos Migratorios',
    lastUpdated: '6 de agosto de 2026',
    summary: {
      title: 'Resumen inicial',
      text: 'Sí: el gobierno mira sus redes sociales, y desde 2025 ese escrutinio alcanza a <strong>más tipos de beneficio migratorio</strong>, con formularios que piden los identificadores de sus cuentas. Pero el problema casi nunca es una publicación aislada: lo que hunde casos es la <strong>contradicción</strong> entre lo que usted firmó bajo pena de perjurio y lo que su perfil cuenta de su vida. Una foto con fecha, un estado civil sin actualizar o una broma leída literalmente pueden abrir una acusación de falsa representación. Aquí explicamos qué buscan los oficiales, cómo sus redes también pueden <strong>ayudarle</strong> a probar un matrimonio de buena fe, y los errores que jamás debe cometer con sus cuentas.',
    },
    intro: [
      'Es de las preguntas que más se repiten en nuestras consultas este año: «¿de verdad USCIS mira mi Facebook?». La respuesta corta es sí. La revisión de redes dejó de ser algo excepcional de los casos de seguridad y hoy forma parte del examen ordinario de muchos trámites, además de que varios formularios piden que usted declare los identificadores de sus cuentas.',
      'La respuesta larga importa más, porque el pánico hace tanto daño como el descuido. Hay quien borra ocho años de perfil la víspera de una entrevista y llega en peor posición de la que tenía. Hay quien jura que no usa redes cuando su nombre aparece en tres plataformas. Y hay casos sólidos que se complican por una broma de hace cinco años que un oficial leyó literalmente.',
      'Aquí explicamos qué se revisa, qué buscan los oficiales, cómo las redes pueden incluso <strong>ayudarle</strong> a probar que su matrimonio es real, y qué no debe hacer nunca con sus cuentas. No es una guía para esconder nada: es una guía para que lo verdadero de su vida se lea como lo que es.',
    ],
    sections: [
      {
        icon: 'search',
        title: 'Qué revisa el gobierno y en qué trámites',
        subtitle: 'El alcance del escrutinio',
        blocks: [
          {
            kind: 'text',
            text: 'La revisión de redes no es una sola cosa: son verificaciones que ocurren en momentos distintos del proceso y que pueden alimentarse entre sí. Conviene entenderlas por separado, porque cada una tiene su propia lógica.',
          },
          {
            kind: 'list',
            items: [
              '<strong>Los identificadores que usted declara.</strong> Varios formularios piden los nombres de usuario de las plataformas que ha usado. Lo que escribe ahí es una declaración formal, no un dato de relleno.',
              '<strong>La búsqueda del propio oficial.</strong> El adjudicador puede consultar información públicamente disponible sobre usted mientras revisa el expediente, sobre todo si algo no cuadra.',
              '<strong>Las unidades de detección de fraude.</strong> Cuando un caso se marca para revisión profunda —típico en peticiones matrimoniales—, el rastro digital entra al análisis junto con visitas domiciliarias y entrevistas separadas.',
              '<strong>Lo que aportan terceros.</strong> Una expareja o un familiar molesto pueden enviar capturas de pantalla. El expediente no distingue entre lo que encontró el oficial y lo que alguien le entregó.',
              '<strong>Los procesos consulares.</strong> Pedir identificadores de redes en trámites de visa lleva años siendo parte del procedimiento, y esa información viaja con el caso.',
            ],
          },
          {
            kind: 'text',
            text: 'La tendencia desde 2025 ha sido de <strong>expansión</strong>: el escrutinio, antes asociado sobre todo a visas y revisiones de seguridad, alcanza hoy a más categorías de beneficio. Si su caso implica probar una relación, una residencia, una identidad o un temor fundado, asuma que su huella digital es parte del expediente.',
          },
          {
            kind: 'note',
            text: 'El alcance exacto cambia con el tiempo y varía de un formulario a otro. Antes de firmar cualquier solicitud, verifique la <strong>edición vigente del formulario y sus instrucciones oficiales</strong> en el sitio de USCIS a la fecha en que va a presentar, y confirme con su abogado qué se le está pidiendo en su caso.',
          },
        ],
      },
      {
        icon: 'balance',
        title: 'Lo que usted firma: perjurio y falsa representación',
        subtitle: 'Por qué una publicación pesa tanto',
        blocks: [
          {
            kind: 'text',
            text: 'Para entender el riesgo hay que entender qué firma usted. Las solicitudes migratorias se firman <strong>bajo pena de perjurio</strong>: usted declara que el formulario y la evidencia que lo acompaña son verdaderos según su conocimiento. Esa firma cubre su identidad, su historial marital, sus entradas y salidas, su trabajo y —cuando se los piden— sus identificadores de redes sociales.',
          },
          {
            kind: 'text',
            text: 'Sobre esa base opera una de las causales de inadmisibilidad más severas de la ley: la <strong>sección 212(a)(6)(C) de la INA</strong>, que declara inadmisible a quien, mediante fraude o tergiversación deliberada de un hecho material, busca obtener o ha obtenido una visa, la admisión al país u otro beneficio migratorio. Dos palabras cargan todo el peso. <strong>Deliberada</strong>: no se castiga el error honesto ni el olvido genuino. <strong>Material</strong>: el dato debe ser capaz de influir en la decisión, no un detalle trivial.',
          },
          {
            kind: 'text',
            text: 'Las consecuencias son duras y duraderas: una determinación de fraude puede cerrar la puerta a beneficios futuros. Existe una exención (waiver) cuando un familiar calificado sufriría dificultad extrema, pero no es automática ni está al alcance de todos, y la falsa afirmación de ser ciudadano estadounidense se trata con severidad aún mayor.',
          },
          {
            kind: 'warning',
            text: 'Una publicación por sí sola rara vez decide un caso. Lo que sí lo cambia es la <strong>contradicción</strong>: cuando lo que se ve en la pantalla no se puede reconciliar con lo declarado por escrito. Ahí la discusión deja de ser sobre la foto y pasa a ser sobre su credibilidad, que es lo que sostiene todo lo demás.',
          },
        ],
      },
      {
        icon: 'alert',
        title: 'Qué buscan exactamente los oficiales',
        subtitle: 'Cuatro patrones que levantan banderas',
        blocks: [
          {
            kind: 'text',
            text: 'Nadie lee su perfil para juzgar su gusto musical ni sus opiniones cotidianas. La revisión persigue objetivos concretos, y casi todos se reducen a verificar que lo declarado y lo vivido sean la misma historia.',
          },
          {
            kind: 'cards',
            items: [
              {
                title: 'Fraude matrimonial',
                desc: 'La prioridad número uno en peticiones familiares. Estados civiles que no coinciden, ausencia total de fotos juntos, publicaciones que muestran vidas separadas o una relación pública con otra persona en el mismo periodo.',
              },
              {
                title: 'Contradicciones con lo declarado',
                desc: 'Fechas y lugares que chocan con la presencia física declarada, viajes que no aparecen en el formulario, domicilios distintos al informado o un historial de relaciones que no coincide con lo escrito.',
              },
              {
                title: 'Trabajo no autorizado en público',
                desc: 'Anuncios de servicios, páginas de negocio o publicaciones celebrando un empleo cuando no había autorización de trabajo. El empleo no autorizado afecta la elegibilidad en ciertas vías de ajuste.',
              },
              {
                title: 'Contenido violento o de riesgo',
                desc: 'Amenazas, apología de la violencia, símbolos o vínculos con pandillas y grupos criminales, y contenido asociado a actividad terrorista. Aquí el análisis es de seguridad y la tolerancia es mínima.',
              },
            ],
          },
          {
            kind: 'text',
            text: 'A esto se suma un quinto elemento que no es una categoría sino un tono general: los indicios sobre el <strong>buen carácter moral</strong>. En la naturalización, donde ese requisito es explícito, publicaciones sobre conducir tomado, sobre no pagar impuestos o sobre burlar a la autoridad abren preguntas que usted no esperaba responder.',
          },
        ],
      },
      {
        icon: 'file',
        title: 'Casos típicos: cuando la foto contradice el formulario',
        subtitle: 'Lo que vemos en consulta',
        blocks: [
          {
            kind: 'text',
            text: 'Los problemas reales casi nunca vienen de contenido escandaloso. Vienen de detalles cotidianos que nadie publicó pensando en un expediente migratorio.',
          },
          {
            kind: 'list',
            items: [
              '<strong>El estado civil sin actualizar.</strong> Un perfil que dice «soltero» mientras se tramita una petición matrimonial. Casi siempre es descuido, pero en la entrevista es la primera pregunta incómoda.',
              '<strong>Fotos con fecha que contradicen lo declarado.</strong> Una celebración etiquetada en un lugar donde, según el formulario, usted no estaba ese mes.',
              '<strong>Direcciones que no coinciden.</strong> Etiquetas de lugar o comentarios de amigos que apuntan a que la pareja no vivía junta en el periodo declarado.',
              '<strong>La vida anterior que nunca se limpió.</strong> Fotos con una expareja que se solapan en el tiempo con la relación que hoy sostiene la petición.',
              '<strong>El negocio anunciado.</strong> Una página que ofrece jardinería, uñas, construcción o transporte, con teléfono y horarios, en un periodo sin autorización de trabajo.',
              '<strong>La broma leída literalmente.</strong> «Me caso por los papeles», dicho entre amigos en tono de burla, no lleva una nota al pie que explique el sarcasmo cuando se imprime en un expediente.',
            ],
          },
          {
            kind: 'text',
            text: 'El denominador común es la <strong>literalidad</strong>. El sarcasmo no sobrevive a una captura de pantalla, y el oficial que la lee puede no compartir su idioma ni las claves culturales que hacían obvio que aquello era una broma entre primos.',
          },
          {
            kind: 'note',
            text: 'Casi todo esto tiene explicación, y se puede dar. Pero el contexto que usted ofrecería en una entrevista no viene adjunto a la captura: hay que aportarlo, y es mucho mejor prepararlo con su abogado que improvisarlo cuando ya se lo están preguntando.',
          },
        ],
      },
      {
        icon: 'heart',
        title: 'Matrimonio de buena fe: las redes también pueden ayudarle',
        subtitle: 'La otra cara del escrutinio',
        blocks: [
          {
            kind: 'text',
            text: 'Casi toda la conversación sobre redes es defensiva, y eso deja fuera la mitad útil. Probar un matrimonio de buena fe consiste en demostrar que dos personas se casaron para construir una vida juntas y no para obtener un beneficio migratorio. Esa prueba se hace con evidencia de vida compartida a lo largo del tiempo, y las redes tienen una virtud que pocos documentos tienen: son <strong>contemporáneas y llevan fecha</strong>.',
          },
          {
            kind: 'list',
            items: [
              'Publicaciones fechadas que muestran la relación <strong>a lo largo de los años</strong>, no solo alrededor de la boda.',
              'Fotos con la <strong>familia de ambos lados</strong>: cumpleaños, bautizos, graduaciones, Navidades, funerales.',
              'Comentarios y etiquetas de amigos que <strong>tratan la relación como algo conocido</strong> por el círculo cercano.',
              'Anuncios del compromiso, de la boda, de un embarazo, de una mudanza o de un viaje juntos.',
              'Publicaciones desde el <strong>domicilio común</strong>, con el mismo fondo reconocible a lo largo del tiempo.',
            ],
          },
          {
            kind: 'text',
            text: 'Ahora bien, esto <strong>complementa, no sustituye</strong>. La columna vertebral de un caso matrimonial sigue siendo la evidencia documental: arrendamiento o escritura a ambos nombres, cuentas bancarias conjuntas, seguros con el cónyuge como beneficiario, impuestos presentados en conjunto, actas de nacimiento de los hijos y correspondencia al mismo domicilio.',
          },
          {
            kind: 'note',
            text: 'Lo que convence no es el volumen, es la <strong>coherencia</strong>. Una historia digital que corre en paralelo a los documentos vale más que cien fotos subidas la semana anterior a la entrevista. Guarde capturas con fecha visible de lo que ya existe.',
          },
        ],
      },
      {
        icon: 'lock',
        title: 'Lo que NUNCA debe hacer con sus cuentas',
        subtitle: 'Los errores que convierten un problema en dos',
        blocks: [
          {
            kind: 'text',
            text: 'Aquí es donde más daño se hace, y casi siempre por miedo. Los tres errores siguientes tienen algo en común: convierten una situación explicable en una conducta que parece encubrimiento.',
          },
          {
            kind: 'cards',
            items: [
              {
                title: 'Borrar en pánico',
                desc: 'Vaciar años de historial la víspera de una entrevista no hace desaparecer nada: quedan copias, capturas y publicaciones espejo en cuentas ajenas. Y un perfil vacío justo antes de la cita cuenta su propia historia.',
              },
              {
                title: 'Mentir sobre sus cuentas',
                desc: 'Omitir un identificador que se le pidió declarar, o decir que no usa redes cuando sí las usa, es el tipo de afirmación falsa fácil de comprobar y difícil de explicar. La omisión suele costar más que el contenido omitido.',
              },
              {
                title: 'Perfiles falsos o evidencia fabricada',
                desc: 'Abrir cuentas nuevas «limpias», publicar fotos montadas para el expediente o pedir a familiares que suban contenido inventado no es estrategia: es fabricar evidencia, y descubrirla contamina todo el caso.',
              },
            ],
          },
          {
            kind: 'warning',
            text: 'Si su caso ya está ante una corte, hay una investigación abierta o usted recibió un requerimiento formal de información, <strong>no toque nada sin hablar antes con su abogado</strong>. Destruir material que puede ser evidencia tiene consecuencias propias, adicionales al problema que intentaba resolver.',
          },
        ],
      },
      {
        icon: 'clipboard',
        title: 'Cómo auditar su huella digital antes de aplicar',
        subtitle: 'Lo que sí es legal y ordenado hacer',
        blocks: [
          {
            kind: 'text',
            text: 'Existe una forma correcta de prepararse, y no consiste en desaparecer de internet: consiste en saber qué hay, entenderlo y poder explicarlo. Idealmente se hace <strong>antes</strong> de firmar el formulario, no después de recibir una pregunta.',
          },
          {
            kind: 'steps',
            items: [
              '<strong>Haga la lista completa de sus cuentas</strong>, incluidas las que ya no usa, las abiertas con apodos y las que creó hace años y olvidó.',
              '<strong>Búsquese a usted mismo.</strong> Escriba su nombre, sus apodos y sus nombres de usuario en un buscador y mire lo que aparece, como lo vería un desconocido.',
              '<strong>Revise lo que otros publicaron de usted.</strong> Etiquetas, fotos en perfiles ajenos y comentarios forman parte de su huella aunque no los haya subido usted.',
              '<strong>Ajuste la privacidad hacia adelante.</strong> Decidir quién ve sus publicaciones futuras, quién puede etiquetarlo y quién comenta es una decisión legítima en cualquier momento.',
              '<strong>Deje de publicar sobre el caso.</strong> Nada sobre la entrevista, la estrategia, lo que le dijo su abogado ni el resultado esperado.',
              '<strong>Anote lo que se puede leer mal</strong> y llévelo a su consulta con fecha y contexto. Un dato explicado por adelantado es un párrafo de su declaración; descubierto por un oficial, es una sospecha.',
              '<strong>Guarde lo que le ayuda.</strong> Capturas con fecha visible de las publicaciones que prueban su relación, su domicilio o su historia. Las plataformas cambian y las cuentas se pierden.',
            ],
          },
          {
            kind: 'note',
            text: 'Ajustar la privacidad hacia el futuro no es lo mismo que destruir contenido existente, y tampoco es garantía: lo que ya se compartió pudo quedar guardado por otras personas. Trate la privacidad como buena práctica, nunca como escudo legal.',
          },
        ],
      },
      {
        icon: 'globe',
        title: 'Asilo y redes sociales: aquí el riesgo es doble',
        subtitle: 'Lo que se ve aquí también se ve allá',
        blocks: [
          {
            kind: 'text',
            text: 'En un caso de asilo la credibilidad no es un aspecto del caso: es el caso. Cuando la prueba documental del país de origen es escasa, la decisión se apoya en la consistencia entre la declaración escrita, el testimonio y todo lo demás que exista sobre usted, incluido su rastro digital.',
          },
          {
            kind: 'text',
            text: 'Pero hay un segundo riesgo que casi nadie considera, y es el más grave: <strong>lo que usted publica aquí también se ve allá</strong>. Una foto con ubicación, la etiqueta de un familiar que sigue en el país o el nombre de un pueblo pueden llegar exactamente a quien usted teme.',
          },
          {
            kind: 'list',
            items: [
              'Evite <strong>revelar la ubicación de familiares</strong> que permanecen en el país de origen o el lugar donde se refugiaron.',
              'Tenga presente que un <strong>viaje de regreso</strong>, aunque haya sido por una emergencia familiar, plantea preguntas difíciles sobre el temor alegado; es mejor abordarlas con su abogado.',
              'Considere el efecto de la <strong>actividad pública</strong> —denuncias, activismo, entrevistas— en su seguridad y en la de quienes siguen allá.',
              'La prueba también corre a su favor: <strong>las amenazas que usted recibió</strong> pueden ser evidencia valiosa de la persecución que alega.',
            ],
          },
          {
            kind: 'warning',
            text: 'Nunca borre las amenazas, los insultos o el acoso que haya recibido en línea. Eso <strong>no es contenido dañino: es su evidencia</strong>. Guárdelo con captura completa, fecha visible y nombre de la cuenta que lo envió, y entrégueselo a su abogado.',
          },
        ],
      },
    ],
    faq: {
      title: 'Preguntas frecuentes',
      items: [
        {
          q: '¿Pueden ver mis cuentas si están en privado?',
          a: 'Lo público es lo más fácil de revisar, y la configuración de privacidad reduce ese riesgo. Pero no es un escudo: una publicación privada puede llegar al expediente si alguien la comparte o la entrega. Piense en la privacidad como una medida razonable, no como una garantía.',
        },
        {
          q: '¿Tengo que dar mis contraseñas?',
          a: 'Los formularios piden <strong>identificadores</strong>, es decir, nombres de usuario, no contraseñas. Si alguien lo contacta diciendo ser de una agencia y le exige acceso a sus cuentas, es casi con seguridad un fraude. No entregue credenciales y consulte con su abogado antes de responder.',
        },
        {
          q: 'Ya borré publicaciones antes de leer esto. ¿Qué hago?',
          a: 'No lo oculte y no siga borrando. Dígaselo a su abogado con detalle: qué borró, cuándo y por qué. En muchos casos es contenido irrelevante eliminado por nervios, y eso se puede explicar. Lo que no se repara es que la omisión aparezca después por otra vía.',
        },
        {
          q: 'Mi perfil dice «soltero» aunque estoy casado. ¿Me van a negar el caso?',
          a: 'Por sí solo, un estado civil desactualizado no decide nada: es un descuido común. Lo importante es que el resto de la evidencia sea sólida y coherente y que usted pueda explicar la incongruencia con naturalidad. Coméntelo con su abogado antes de la entrevista.',
        },
        {
          q: '¿Me conviene cerrar todas mis redes antes de aplicar?',
          a: 'Normalmente no. Desaparecer de golpe llama la atención y destruye evidencia que podría beneficiarle, sobre todo en casos matrimoniales. Es mejor auditar lo que hay, ajustar la privacidad hacia adelante y preparar las explicaciones necesarias.',
        },
        {
          q: '¿Me pueden perjudicar publicaciones de otras personas?',
          a: 'Pueden aparecer en el expediente, porque las fotos, etiquetas y comentarios ajenos también forman parte de lo que se ve sobre usted. Usted no responde por las opiniones de otros, pero sí puede tener que explicar una foto suya publicada por un tercero.',
        },
      ],
    },
    conclusion: {
      title: 'Su perfil no vive en un mundo aparte de su expediente',
      text: 'La regla práctica es sencilla: publique pensando en que un desconocido, sin su idioma ni su contexto, leerá eso dentro de un expediente oficial en cinco años. No se trata de vivir con miedo, sino de que la historia que usted firma bajo pena de perjurio y la que cuenta su perfil sean la misma. Cuando lo son, el escrutinio deja de ser una amenaza y se vuelve una confirmación.',
      advice: 'Antes de firmar cualquier formulario, revise su huella digital con su abogado y explíquele con honestidad lo que pueda leerse mal. Aclarar un contexto a tiempo es un trámite; explicarlo después de una acusación de falsa representación es otro problema.',
    },
    sources: {
      title: 'Fuentes y referencias',
      list: [
        'INA § 212(a)(6)(C) — Inadmisibilidad por fraude o tergiversación deliberada de un hecho material',
        'INA § 212(i) — Exención (waiver) por fraude o falsa representación para ciertos familiares',
        'USCIS — Instrucciones oficiales de los formularios de beneficios migratorios, edición vigente en uscis.gov',
        'USCIS Policy Manual — Inadmisibilidad, buen carácter moral y evidencia de matrimonio de buena fe',
        'Departamento de Estado — Recolección de identificadores de redes sociales en solicitudes de visa',
      ],
    },
    ui: ARTICLE_UI.es,
  },
  en: {
    metaTitle: 'USCIS Social Media Review: What Hurts You',
    metaDesc:
      'USCIS reviews social media in more filings and asks for your account identifiers on forms. What officers look for and what you must never do.',
    title: 'USCIS Reviews Your Social Media: Posts That Can Damage Your Case',
    displayDate: 'Aug 06, 2026',
    readTime: '9 min',
    categoryLabel: 'Immigration Process',
    lastUpdated: 'August 6, 2026',
    summary: {
      title: 'Initial Summary',
      text: 'Yes: the government looks at your social media, and since 2025 that scrutiny reaches <strong>more types of immigration benefit</strong>, with forms that ask for your account identifiers. But the problem is almost never a single post: what sinks cases is the <strong>contradiction</strong> between what you signed under penalty of perjury and what your profile says about your life. A dated photo, an outdated relationship status, or a joke read literally can open a misrepresentation finding. Here is what officers look for, how your accounts can also <strong>help</strong> you prove a good-faith marriage, and the mistakes you must never make with your profiles.',
    },
    intro: [
      'It is one of the most repeated questions in our consultations this year: "does USCIS really look at my Facebook?" The short answer is yes. Social media review stopped being exceptional, reserved for security screening, and today it is part of the ordinary examination of many filings — on top of which several forms ask you to declare your own account identifiers.',
      'The long answer matters more, because panic does as much damage as carelessness. Some people delete eight years of history the night before an interview and arrive in a worse position than they were in. Some swear they do not use social media when their name appears on three platforms. And strong cases get complicated by a joke from five years ago that an officer read literally.',
      'Here we explain what gets reviewed, what officers look for, how your accounts can actually <strong>help</strong> you prove your marriage is real, and what you must never do with your profiles. This is not a guide to hiding anything: it is a guide to making the true parts of your life read as what they are.',
    ],
    sections: [
      {
        icon: 'search',
        title: 'What the government reviews, and in which filings',
        subtitle: 'The scope of the scrutiny',
        blocks: [
          {
            kind: 'text',
            text: 'Social media review is not one single thing: it is a set of checks that happen at different moments of the process and that can feed one another. It helps to understand them separately, because each has its own logic.',
          },
          {
            kind: 'list',
            items: [
              '<strong>The identifiers you declare.</strong> Several forms ask for the usernames of platforms you have used. What you write there is a formal statement, not filler.',
              '<strong>The officer’s own search.</strong> The adjudicator can look at publicly available information about you while reviewing the file, especially if something does not add up.',
              '<strong>Fraud detection units.</strong> When a case is flagged for deeper review — typical in marriage petitions — the digital trail enters the analysis alongside site visits and separate interviews.',
              '<strong>What third parties send in.</strong> A former partner or an angry relative can submit screenshots. The file does not distinguish between what the officer found and what somebody handed over.',
              '<strong>Consular processing.</strong> Requesting social media identifiers in visa applications has been part of the procedure for years, and that information travels with the case.',
            ],
          },
          {
            kind: 'text',
            text: 'As for which filings, the trend since 2025 has been <strong>expansion</strong>: scrutiny once associated mainly with visas and security vetting now reaches more benefit categories. If your case involves proving a relationship, a residence, an identity, or a well-founded fear, assume your digital footprint is part of the record.',
          },
          {
            kind: 'note',
            text: 'The exact scope changes over time and varies from form to form. Before signing any application, verify the <strong>current form edition and its official instructions</strong> on the USCIS site as of the date you will file, and confirm with your attorney what is being asked in your case.',
          },
        ],
      },
      {
        icon: 'balance',
        title: 'What you are signing: perjury and misrepresentation',
        subtitle: 'Why a single post carries so much weight',
        blocks: [
          {
            kind: 'text',
            text: 'To understand the risk you have to understand what you sign. Immigration applications are signed <strong>under penalty of perjury</strong>: you declare that the form and the evidence submitted with it are true to the best of your knowledge. That signature covers your identity, your marital history, your entries and departures, your employment and — when they are requested — your social media identifiers.',
          },
          {
            kind: 'text',
            text: 'Built on that foundation is one of the harshest grounds of inadmissibility in the law: <strong>INA section 212(a)(6)(C)</strong>, which makes inadmissible anyone who, by fraud or willful misrepresentation of a material fact, seeks to obtain or has obtained a visa, admission to the country, or another immigration benefit. Two words carry all the weight. <strong>Willful</strong>: honest mistakes and genuine oversights are not what this punishes. <strong>Material</strong>: the fact must be capable of influencing the decision, not a trivial detail.',
          },
          {
            kind: 'text',
            text: 'The consequences are severe and long-lasting. A fraud finding can close the door to future benefits and, although in certain cases a waiver exists where a qualifying relative would suffer extreme hardship, it is neither automatic nor within everyone’s reach. A false claim to United States citizenship is treated with even greater severity.',
          },
          {
            kind: 'warning',
            text: 'A post on its own rarely decides a case. What does change a case is the <strong>contradiction</strong>: when what is on the screen cannot be reconciled with what was declared in writing. At that point the discussion stops being about the photo and becomes about your credibility, which is what holds everything else up.',
          },
        ],
      },
      {
        icon: 'alert',
        title: 'What officers are actually looking for',
        subtitle: 'Four patterns that raise flags',
        blocks: [
          {
            kind: 'text',
            text: 'Nobody is reading your profile to judge your taste in music or your everyday opinions. The review chases specific objectives, and nearly all of them come down to verifying that what was declared and what was lived are the same story.',
          },
          {
            kind: 'cards',
            items: [
              {
                title: 'Marriage fraud',
                desc: 'The number one priority in family petitions. Relationship statuses that do not match, a total absence of photos together, posts showing separate lives, or a public relationship with someone else in the same period.',
              },
              {
                title: 'Contradictions with what was declared',
                desc: 'Dates and places that clash with declared physical presence, trips that never appear on the form, addresses different from the one reported, or a relationship history that does not match the paperwork.',
              },
              {
                title: 'Unauthorized work announced in public',
                desc: 'Service ads, business pages, or posts celebrating a job during a period without work authorization. Unauthorized employment affects eligibility on certain adjustment paths.',
              },
              {
                title: 'Violent or high-risk content',
                desc: 'Threats, glorification of violence, symbols or ties to gangs and criminal groups, and content associated with terrorist activity. Here the analysis is a security one and the tolerance is minimal.',
              },
            ],
          },
          {
            kind: 'text',
            text: 'To this add a fifth element that is not a category but a general tone: indications about <strong>good moral character</strong>. In naturalization, where that requirement is explicit, posts about drinking and driving, about not paying taxes, or about outsmarting the authorities open questions you never expected to answer.',
          },
        ],
      },
      {
        icon: 'file',
        title: 'Typical cases: when the photo contradicts the form',
        subtitle: 'What we see in consultations',
        blocks: [
          {
            kind: 'text',
            text: 'Real problems almost never come from scandalous content. They come from everyday details that nobody posted with an immigration file in mind.',
          },
          {
            kind: 'list',
            items: [
              '<strong>The outdated relationship status.</strong> A profile that says "single" while a marriage petition is pending. It is almost always an oversight, but in the interview it is the first uncomfortable question.',
              '<strong>Dated photos that contradict what was declared.</strong> A celebration tagged in a place where, according to the form, you were not that month.',
              '<strong>Addresses that do not match.</strong> Location tags or friends’ comments suggesting the couple was not living together during the declared period.',
              '<strong>The previous life that was never cleaned up.</strong> Photos with a former partner that overlap in time with the relationship now supporting the petition.',
              '<strong>The advertised business.</strong> A page offering landscaping, nails, construction, or transport, with a phone number and hours, during a period without work authorization.',
              '<strong>The joke read literally.</strong> "I am marrying for the papers," said among friends as a joke, comes with no footnote explaining the sarcasm when it is printed inside a file.',
            ],
          },
          {
            kind: 'text',
            text: 'The common denominator is <strong>literalness</strong>. Sarcasm does not survive a screenshot, and the officer reading it may not share your language or the cultural cues that made it obvious the line was a joke among cousins.',
          },
          {
            kind: 'note',
            text: 'Almost all of this has an explanation, and it can be given. But the context you would offer in an interview does not come attached to the screenshot: it has to be supplied, and it is far better to prepare it with your attorney than to improvise once you are already being asked.',
          },
        ],
      },
      {
        icon: 'heart',
        title: 'Good-faith marriage: your accounts can help you too',
        subtitle: 'The other side of the scrutiny',
        blocks: [
          {
            kind: 'text',
            text: 'Almost the entire conversation about social media is defensive, and that leaves out the useful half. Proving a good-faith marriage means showing that two people married to build a life together and not to obtain an immigration benefit. That proof is made with evidence of a shared life over time, and social media has a virtue few documents have: it is <strong>contemporaneous and dated</strong>.',
          },
          {
            kind: 'list',
            items: [
              'Dated posts showing the relationship <strong>across years</strong>, not only around the wedding.',
              'Photos with <strong>family from both sides</strong>: birthdays, baptisms, graduations, Christmases, funerals.',
              'Comments and tags from friends who <strong>treat the relationship as known</strong> to the inner circle.',
              'Announcements of the engagement, the wedding, a pregnancy, a move, or a trip together.',
              'Posts from the <strong>shared home</strong>, with the same recognizable background over time.',
            ],
          },
          {
            kind: 'text',
            text: 'That said, this <strong>complements, it does not replace</strong>. The backbone of a marriage case remains documentary evidence: a lease or deed in both names, joint bank accounts, insurance naming the spouse as beneficiary, jointly filed tax returns, children’s birth certificates, and mail to the same address.',
          },
          {
            kind: 'note',
            text: 'What convinces is not volume, it is <strong>consistency</strong>. A digital history that runs parallel to the documents is worth more than a hundred photos uploaded the week before the interview. Save screenshots with the date visible of what already exists.',
          },
        ],
      },
      {
        icon: 'lock',
        title: 'What you must NEVER do with your accounts',
        subtitle: 'The mistakes that turn one problem into two',
        blocks: [
          {
            kind: 'text',
            text: 'This is where the most damage is done, and almost always out of fear. The three mistakes below share one trait: they turn an explainable situation into conduct that looks like a cover-up.',
          },
          {
            kind: 'cards',
            items: [
              {
                title: 'Deleting in a panic',
                desc: 'Wiping years of history the night before an interview makes nothing disappear: copies, screenshots, and mirrored posts on other accounts remain. And a profile emptied right before the appointment tells a story of its own.',
              },
              {
                title: 'Lying about your accounts',
                desc: 'Omitting an identifier you were asked to declare, or saying you do not use social media when you do, is the kind of false statement that is easy to verify and hard to explain. The omission usually costs more than the content omitted.',
              },
              {
                title: 'Fake profiles or fabricated evidence',
                desc: 'Opening new "clean" accounts, posting staged photos for the file, or asking relatives to upload invented content is not strategy: it is fabricating evidence, and discovering it contaminates the entire case.',
              },
            ],
          },
          {
            kind: 'warning',
            text: 'If your case is already before a court, an investigation is open, or you received a formal request for information, <strong>do not touch anything without speaking to your attorney first</strong>. Destroying material that may be evidence carries its own consequences, on top of the problem you were trying to solve.',
          },
        ],
      },
      {
        icon: 'clipboard',
        title: 'How to audit your digital footprint before filing',
        subtitle: 'What is legal and orderly to do',
        blocks: [
          {
            kind: 'text',
            text: 'There is a right way to prepare, and it does not involve disappearing from the internet: it involves knowing what is there, understanding it, and being able to explain it. Ideally this happens <strong>before</strong> you sign the form, not after a question arrives.',
          },
          {
            kind: 'steps',
            items: [
              '<strong>Make the full list of your accounts</strong>, including ones you no longer use, ones opened under nicknames, and ones you created years ago and forgot.',
              '<strong>Search for yourself.</strong> Type your name, your nicknames, and your usernames into a search engine and look at what comes up, as a stranger would see it.',
              '<strong>Review what others posted about you.</strong> Tags, photos on other profiles, and comments are part of your footprint even though you did not upload them.',
              '<strong>Adjust privacy going forward.</strong> Deciding who sees your future posts, who can tag you, and who can comment is a legitimate decision at any time.',
              '<strong>Stop posting about the case.</strong> Nothing about the interview, the strategy, what your attorney told you, or the expected outcome.',
              '<strong>Write down whatever can be misread</strong> and bring it to your consultation with the date and the context. A fact explained in advance is a paragraph of your declaration; discovered by an officer, it is a suspicion.',
              '<strong>Save what helps you.</strong> Screenshots with the date visible of posts that prove your relationship, your address, or your history. Platforms change and accounts get lost.',
            ],
          },
          {
            kind: 'note',
            text: 'Adjusting privacy going forward is not the same as destroying existing content, and it is no guarantee either: whatever was already shared may have been saved by other people. Treat privacy as good practice, never as a legal shield.',
          },
        ],
      },
      {
        icon: 'globe',
        title: 'Asylum and social media: here the risk is double',
        subtitle: 'What is seen here is also seen back home',
        blocks: [
          {
            kind: 'text',
            text: 'In an asylum case credibility is not one aspect of the case: it is the case. When documentary proof from the country of origin is scarce, the decision rests on consistency between the written declaration, the testimony, and everything else that exists about you, including your digital trail.',
          },
          {
            kind: 'text',
            text: 'But there is a second risk almost nobody weighs, and it is the gravest: <strong>what you post here is also seen back there</strong>. A photo with a location, the tag of a relative still in the country, or the name of a town can reach precisely the person you fear.',
          },
          {
            kind: 'list',
            items: [
              'Avoid <strong>revealing the location of relatives</strong> who remain in the country of origin or the place where they took shelter.',
              'Keep in mind that a <strong>return trip</strong>, even for a family emergency, raises hard questions about the fear you claim; it is better to address them with your attorney.',
              'Consider the effect of <strong>public activity</strong> — complaints, activism, interviews — on your safety and on the safety of those still there.',
              'The evidence also runs in your favor: <strong>the threats you received</strong> can be valuable proof of the persecution you allege.',
            ],
          },
          {
            kind: 'warning',
            text: 'Never delete the threats, insults, or harassment you received online. That <strong>is not harmful content: it is your evidence</strong>. Preserve it with a full screenshot, the date visible, and the name of the account that sent it, and hand it to your attorney.',
          },
        ],
      },
    ],
    faq: {
      title: 'Frequently asked questions',
      items: [
        {
          q: 'Can they see my accounts if they are private?',
          a: 'What is public is the easiest to review, and privacy settings reduce that exposure. But they are not a shield: a private post can reach the file if someone shares it or hands it over. Treat privacy as a reasonable measure, not as a guarantee.',
        },
        {
          q: 'Do I have to give my passwords?',
          a: 'Forms ask for <strong>identifiers</strong> — that is, usernames, not passwords. If someone contacts you claiming to be from an agency and demands access to your accounts, it is almost certainly a scam. Do not hand over credentials and consult your attorney before responding.',
        },
        {
          q: 'I already deleted posts before reading this. What now?',
          a: 'Do not hide it and do not keep deleting. Tell your attorney in detail: what you deleted, when, and why. In many cases it is irrelevant content removed out of nerves, and that can be explained. What cannot be repaired is the omission surfacing later through another route.',
        },
        {
          q: 'My profile says "single" even though I am married. Will my case be denied?',
          a: 'On its own, an outdated relationship status decides nothing: it is a common oversight. What matters is that the rest of your evidence is solid and consistent and that you can explain the discrepancy naturally. Raise it with your attorney before the interview.',
        },
        {
          q: 'Should I close all my accounts before filing?',
          a: 'Usually not. Vanishing all at once draws attention and destroys evidence that could help you, especially in marriage cases. It is better to audit what exists, adjust privacy going forward, and prepare the necessary explanations.',
        },
        {
          q: 'Can other people’s posts hurt me?',
          a: 'They can end up in the file, because photos, tags, and comments posted by others are also part of what is visible about you. You are not answerable for other people’s opinions, but you may have to explain a photo of yourself posted by someone else.',
        },
      ],
    },
    conclusion: {
      title: 'Your profile does not live in a world apart from your file',
      text: 'The practical rule is simple: post as if a stranger, without your language or your context, will read it inside an official file five years from now. This is not about living in fear or pretending to a life that is not yours, but about making the story you sign under penalty of perjury and the story your profile tells be, effortlessly, the same one. When they are, scrutiny stops being a threat and becomes a confirmation.',
      advice: 'Before signing any form, review your digital footprint with your attorney and be honest about whatever could be misread. Clarifying context in time is a routine step; explaining it after a misrepresentation finding is a different problem.',
    },
    sources: {
      title: 'Sources and references',
      list: [
        'INA § 212(a)(6)(C) — Inadmissibility for fraud or willful misrepresentation of a material fact',
        'INA § 212(i) — Waiver of fraud or misrepresentation for certain qualifying relatives',
        'USCIS — Official instructions for immigration benefit forms, current edition at uscis.gov',
        'USCIS Policy Manual — Inadmissibility, good moral character, and bona fide marriage evidence',
        'U.S. Department of State — Collection of social media identifiers in visa applications',
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
          ? 'Persona revisando sus redes sociales antes de presentar un trámite migratorio'
          : 'Person reviewing their social media before filing an immigration case'
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
