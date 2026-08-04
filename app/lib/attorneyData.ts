// Shared attorney data used across the site
// Extracted from AbogadosClient.tsx for reuse in individual profile pages

export type TranslatableString = string | { es: string; en: string };

// Área de práctica que la propia bio del abogado declara. `label` titula su
// página de perfil y `topics` alimenta `knowsAbout` del Person JSON-LD.
// Se omite cuando la bio no declara especialidad: en YMYL legal es incorrecto
// atribuir a un litigante civil un área que no ejerce, así que el perfil cae al
// término genérico de `role`.
export interface AttorneyPractice {
  label: { es: string; en: string };
  topics: string[];
}

export interface Attorney {
  id: string;
  name: string;
  image: string;
  role: { es: string; en: string };
  practice?: AttorneyPractice;
  bio: { es: string[]; en: string[] };
  quote: { es: string; en: string };
  education: TranslatableString[];
  admissions: TranslatableString[];
}

// Helper to resolve translatable strings
export function getText(obj: TranslatableString, language: 'es' | 'en'): string {
  if (typeof obj === 'string') return obj;
  return obj[language] || obj.es || '';
}

// Attorney location groups
export const locationGroups: { label: { es: string; en: string }; ids: string[] }[] = [
  { label: { es: 'Houston, Texas', en: 'Houston, Texas' }, ids: ['manuel-solis', 'manuel-solis-iii', 'juan-solis', 'gregory-finney', 'alejandro-manzano', 'austen-gunnels', 'gabriel-perez', 'alexis-alvarez'] },
  { label: { es: 'Bellaire, Texas', en: 'Bellaire, Texas' }, ids: ['ni-yan'] },
  { label: { es: 'Dallas, Texas', en: 'Dallas, Texas' }, ids: ['mark-mcbroom', 'stephanie-l-garcia-vidal'] },
  { label: { es: 'El Paso, Texas', en: 'El Paso, Texas' }, ids: ['victor-rojas'] },
  { label: { es: 'Chicago, Illinois', en: 'Chicago, Illinois' }, ids: ['andrew-fink', 'ana-patricia-rueda', 'eduardo-garcia'] },
  { label: { es: 'Memphis, Tennessee', en: 'Memphis, Tennessee' }, ids: ['sara-james', 'lupita-valenzuela-martinez', 'roberto-garcia'] },
  { label: { es: 'Arvada, Colorado', en: 'Arvada, Colorado' }, ids: ['edwin-zavala'] },
  { label: { es: 'Los Angeles, California', en: 'Los Angeles, California' }, ids: ['edward-s-reisman'] },
];

// Get the location group for a given attorney ID
export function getAttorneyLocation(attorneyId: string): { es: string; en: string } | null {
  const group = locationGroups.find(g => g.ids.includes(attorneyId));
  return group ? group.label : null;
}

// Get related attorneys (same location group, excluding the current one)
export function getRelatedAttorneys(attorneyId: string): Attorney[] {
  const group = locationGroups.find(g => g.ids.includes(attorneyId));
  if (!group) return [];
  return group.ids
    .filter(id => id !== attorneyId)
    .map(id => attorneys.find(a => a.id === id))
    .filter((a): a is Attorney => a !== undefined);
}

// Array de abogados con URLs actualizadas de Vercel Blob
export const attorneys: Attorney[] = [
  // --- FUNDADORES Y SOCIOS PRINCIPALES ---
  {
    id: 'manuel-solis',
    name: 'Manuel Solis',
    image: 'https://uenjwzjx3vckezns.public.blob.vercel-storage.com/Manuel%20Solis.png',
    role: {
      es: 'Abogado Principal y Fundador',
      en: 'Principal Attorney and Founder'
    },
    practice: {
      label: { es: 'Abogado de Inmigración y Fundador', en: 'Immigration Attorney and Founder' },
      topics: ['Immigration Law', 'Deportation Defense', 'Family-Based Immigration']
    },
    bio: {
      es: [
        "Durante las casi tres décadas que han pasado desde que empecé a trabajar como abogado, he llegado a conocer bien a los inmigrantes. Sobretodo he podido ser testigo del impresionante coraje y valentía que muestran muchos de ellos.",
        "Muchos inmigrantes arriesgan sus propias vidas con el objeto de luchar por el bienestar de sus familias. Me siento enormemente bendecido por servir de herramienta para cumplir sus sueños y metas en este gran país de oportunidades."
      ],
      en: [
        "During the nearly three decades since I started working as a lawyer, I have come to know immigrants well. Above all, I have witnessed the impressive courage and bravery that many of them display.",
        "Many immigrants risk their own lives in order to fight for the well-being of their families. I feel enormously blessed to serve as a tool to fulfill their dreams and goals in this great country of opportunity."
      ]
    },
    quote: {
      es: "Me siento enormemente bendecido por servir de herramienta para cumplir sus sueños.",
      en: "I feel enormously blessed to serve as a tool to fulfill their dreams."
    },
    education: ["Juris Doctor", { es: "30+ Años de Experiencia", en: "30+ Years of Experience" }],
    admissions: ["Texas", { es: "Cortes Federales", en: "Federal Courts" }]
  },
  {
    id: 'manuel-solis-iii',
    name: 'Manuel E. Solis III',
    image: 'https://uenjwzjx3vckezns.public.blob.vercel-storage.com/Manuel%20E%20Solis%20III.png',
    role: { es: 'Abogado', en: 'Attorney' },
    practice: {
      label: { es: 'Abogado de Inmigración', en: 'Immigration Attorney' },
      topics: ['Immigration Law']
    },
    bio: {
      es: [
        "Manuel E. Solís III se ocupa principalmente de la ley de inmigración en las Oficinas Legales de Manuel Solís. Se graduó de la Universidad de Houston Downtown y completó su licenciatura en derecho en South Texas College of Law Houston.",
        "El Abogado Manuel Solís III es un apasionado de ayudar a la comunidad y a las personas necesitadas."
      ],
      en: [
        "Manuel E. Solís III primarily handles immigration law at the Law Offices of Manuel Solís. He graduated from the University of Houston Downtown and completed his law degree at South Texas College of Law Houston.",
        "Manuel E. Solís III is passionate about helping the community and people in need."
      ]
    },
    education: ["Universidad de Houston Downtown", "South Texas College of Law Houston"],
    admissions: ["Texas"],
    quote: {
      es: "Me apasiona ayudar a la comunidad y a las personas necesitadas.",
      en: "I am passionate about helping the community and people in need."
    }
  },
  {
    id: 'juan-solis',
    name: 'Juan Solis',
    image: 'https://uenjwzjx3vckezns.public.blob.vercel-storage.com/Juan%20Solis.png',
    role: { es: 'Abogado', en: 'Attorney' },
    practice: {
      label: { es: 'Abogado de Litigio Civil e Inmigración', en: 'Civil Litigation and Immigration Attorney' },
      topics: ['Civil Litigation', 'Insurance Litigation', 'Immigration Law']
    },
    bio: {
      es: [
        "Juan representa clientes en casos que van desde Inmigración hasta Litigios Civiles, y está muy involucrado en el departamento de Litigios de Seguros.",
        "Se graduó de Point Loma Nazarene University y de South Texas College of Law. Además, completó su MBA en Bauer College of Business."
      ],
      en: [
        "Juan represents clients in cases ranging from Immigration to Civil Litigation, and is heavily involved in the Insurance Litigation department.",
        "He graduated from Point Loma Nazarene University and South Texas College of Law. He also completed his MBA at Bauer College of Business."
      ]
    },
    education: ["Point Loma Nazarene University", "South Texas College of Law", "MBA - Univ. of Houston"],
    admissions: ["Texas", "Colorado", { es: "Cortes de Distrito de EE. UU.", en: "U.S. District Courts" }],
    quote: {
      es: "Saber no es suficiente; debemos aplicar. Estar dispuesto no es suficiente; debemos hacer.",
      en: "Knowing is not enough; we must apply. Being willing is not enough; we must do."
    }
  },

  // --- SOCIOS Y ABOGADOS PRINCIPALES DE LITIGIO ---
  {
    id: 'andrew-fink',
    name: 'Andrew Fink',
    image: 'https://uenjwzjx3vckezns.public.blob.vercel-storage.com/Andrew%20Fink.png',
    role: { es: 'Abogado', en: 'Attorney' },
    practice: {
      label: { es: 'Abogado de Lesiones Personales y Litigio', en: 'Personal Injury and Litigation Attorney' },
      topics: ['Personal Injury Law', 'Medical Malpractice', 'Civil Litigation']
    },
    bio: {
      es: [
        "Socio de litigio a nivel nacional. Centra su práctica en lesiones personales, accidentes y negligencia médica. Ha sido el abogado principal en aproximadamente 50 juicios con jurado.",
        "Cree en la integridad, trabajo duro, pasión, competencia y humildad."
      ],
      en: [
        "National litigation partner. Focuses his practice on personal injury, accidents, and medical malpractice. He has been lead counsel in approximately 50 jury trials.",
        "He believes in integrity, hard work, passion, competence, and humility."
      ]
    },
    education: ["Juris Doctor - Marquette University (1994)", "MBA Lake Superior State Univ"],
    admissions: ["Illinois", "Wisconsin", "American Association of Justice"],
    quote: {
      es: "Integridad, trabajo duro, pasión, competencia y humildad.",
      en: "Integrity, hard work, passion, competence, and humility."
    }
  },
  {
    id: 'gregory-finney',
    name: 'Gregory Finney',
    image: 'https://uenjwzjx3vckezns.public.blob.vercel-storage.com/Gregory%20Finney.png',
    role: { es: 'Abogado', en: 'Attorney' },
    practice: {
      label: { es: 'Director de Litigio Civil', en: 'Director of Civil Litigation' },
      topics: ['Civil Litigation', 'Commercial Litigation', 'Catastrophic Injury Law']
    },
    bio: {
      es: [
        "Gregory Finney es el Director de Litigio Civil. Su experiencia incluye litigios comerciales complejos, fraude, energía y accidentes catastróficos.",
        "Antes de ser abogado, fue profesor de ciencias y sirvió en la Marina de los EE. UU."
      ],
      en: [
        "Gregory Finney is the Director of Civil Litigation. His experience includes complex commercial litigation, fraud, energy, and catastrophic accidents.",
        "Before becoming an attorney, he was a science teacher and served in the U.S. Navy."
      ]
    },
    education: ["University of Houston Law Center", "Texas State University"],
    admissions: [
      { es: "Corte Suprema de los Estados Unidos", en: "Supreme Court of the United States" },
      { es: "Tribunales Federales de Distrito", en: "Federal District Courts" }
    ],
    quote: {
      es: "Mantente curioso.",
      en: "Stay curious."
    }
  },
  {
    id: 'ni-yan',
    name: 'Ni Yan',
    image: 'https://uenjwzjx3vckezns.public.blob.vercel-storage.com/Ni%20Yan.png',
    role: { es: 'Abogada', en: 'Attorney' },
    practice: {
      label: { es: 'Abogada de Inmigración', en: 'Immigration Attorney' },
      topics: ['Immigration Law']
    },
    bio: {
      es: [
        "Nacida en la República de China, Yan se especializa en ayudar a la comunidad asiática en casos de inmigración. Ha representado a más de 5,000 casos.",
        "Es columnista en dos periódicos y conduce un programa de radio semanal."
      ],
      en: [
        "Born in the Republic of China, Yan specializes in helping the Asian community with immigration cases. She has represented over 5,000 cases.",
        "She is a columnist for two newspapers and hosts a weekly radio show."
      ]
    },
    education: ["Central University for Nationalities (Beijing)", "University of Houston Law Center"],
    admissions: ["Texas"],
    quote: {
      es: "Orgullosa de ayudar a las personas a alcanzar el sueño americano.",
      en: "Proud to help people achieve the American dream."
    }
  },
  {
    id: 'mark-mcbroom',
    name: 'Mark McBroom',
    image: 'https://uenjwzjx3vckezns.public.blob.vercel-storage.com/Mark%20McBroom.png',
    role: { es: 'Abogado', en: 'Attorney' },
    practice: {
      label: { es: 'Abogado de Inmigración', en: 'Immigration Attorney' },
      topics: ['Immigration Law', 'Family-Based Immigration', 'Deportation Defense']
    },
    bio: {
      es: [
        "El Sr. McBroom obtuvo su Doctorado en Jurisprudencia de la Universidad Metodista del Sur. Se dio cuenta de su pasión por las leyes de inmigración mientras era estudiante.",
        "Su enfoque se centra en la inmigración basada en la familia y la defensa contra la deportación."
      ],
      en: [
        "Mr. McBroom obtained his Juris Doctor from Southern Methodist University. He discovered his passion for immigration law while a student.",
        "His focus is on family-based immigration and defense against deportation."
      ]
    },
    education: ["Southern Methodist University Dedman School of Law", "University of North Texas"],
    admissions: ["Texas"],
    quote: {
      es: "Representación eficiente y precisa con compasión y comprensión.",
      en: "Efficient and accurate representation with compassion and understanding."
    }
  },
  {
    id: 'ana-patricia-rueda',
    name: 'Ana Patricia Rueda',
    image: 'https://uenjwzjx3vckezns.public.blob.vercel-storage.com/Ana%20Patricia%20Rueda.png',
    role: { es: 'Abogada', en: 'Attorney' },
    practice: {
      label: { es: 'Abogada de Inmigración', en: 'Immigration Attorney' },
      topics: ['Immigration Law', 'Deportation Defense', 'Inadmissibility Waivers']
    },
    bio: {
      es: [
        "La abogada Rueda nació en Zacatecas, México, e inmigró a los 7 años. Descubrió su pasión por la justicia durante sus estudios universitarios.",
        "Se graduó de Chicago-Kent College of Law en 2016. Trabaja principalmente en defensa de remoción (deportación) y exenciones de inadmisibilidad (waivers)."
      ],
      en: [
        "Attorney Rueda was born in Zacatecas, Mexico, and immigrated at age 7. She discovered her passion for justice during her undergraduate studies.",
        "She graduated from Chicago-Kent College of Law in 2016. She primarily works on removal defense (deportation) and inadmissibility waivers."
      ]
    },
    education: ["Chicago - Kent College of Law", "University of Illinois - Chicago"],
    admissions: ["Illinois"],
    quote: {
      es: "El mejor premio que la vida tiene para ofrecer es trabajar duro en un trabajo que valga la pena.",
      en: "The best prize life has to offer is to work hard at work worth doing."
    }
  },
  {
    id: 'edwin-zavala',
    name: 'Edwin Zavala',
    image: 'https://uenjwzjx3vckezns.public.blob.vercel-storage.com/Edwin%20Zavala.png',
    role: { es: 'Abogado', en: 'Attorney' },
    practice: {
      label: { es: 'Abogado de Inmigración', en: 'Immigration Attorney' },
      topics: ['Immigration Law', 'Deportation Defense']
    },
    bio: {
      es: [
        "Edwin Zavala nació y creció en Metairie, Louisiana. Obtuvo su título de Juris Doctor de la Facultad de Derecho de la Universidad de Loyola en Nueva Orleans, graduándose cum laude.",
        "Practica principalmente en inmigración y deportación en la oficina de Arvada, en el área metropolitana de Denver. Se toma el tiempo para dar una evaluación honesta de cada situación."
      ],
      en: [
        "Edwin Zavala was born and raised in Metairie, Louisiana. He obtained his Juris Doctor degree from Loyola University New Orleans College of Law, graduating cum laude.",
        "He primarily practices immigration and deportation law in the Arvada office, in the Denver metro area. He takes the time to give an honest assessment of each situation."
      ]
    },
    education: ["Loyola University New Orleans College of Law", "Louisiana State University"],
    admissions: ["Colorado Bar Association", { es: "Tribunal de Distrito de EE. UU. (Colorado)", en: "United States District Court (Colorado)" }],
    quote: {
      es: "Soy hijo de un inmigrante... realmente creo que estamos cambiando el mundo.",
      en: "I am the son of an immigrant... I truly believe we are changing the world."
    }
  },
  {
    id: 'alejandro-manzano',
    name: 'Alejandro Manzano',
    image: 'https://uenjwzjx3vckezns.public.blob.vercel-storage.com/Alejandro.png',
    role: { es: 'Abogado', en: 'Attorney' },
    practice: {
      label: { es: 'Abogado de Inmigración', en: 'Immigration Attorney' },
      topics: ['Immigration Law', 'Deportation Defense']
    },
    bio: {
      es: [
        "Comprometido con la comunidad inmigrante, Alejandro ejerce en la oficina de Houston. Creció en el Valle del Río Grande, fortaleciendo su conexión con las comunidades que defiende.",
        "Obtuvo su título en South Texas College of Law en 2017. Su práctica se enfoca principalmente en Derecho de Inmigración y defensa ante la EOIR."
      ],
      en: [
        "Committed to the immigrant community, Alejandro practices in the Houston office. He grew up in the Rio Grande Valley, strengthening his connection to the communities he defends.",
        "He obtained his degree from South Texas College of Law in 2017. His practice focuses primarily on Immigration Law and defense before the EOIR."
      ]
    },
    education: [
      "South Texas College of Law (2017)",
      { es: "Licenciatura en Artes (Inglés y Arte)", en: "Bachelor of Arts (English and Art)" }
    ],
    admissions: [
      { es: "Corte Suprema de Texas", en: "Supreme Court of Texas" },
      { es: "Tribunales Federales (Distritos Este, Sur y Oeste)", en: "Federal Courts (Eastern, Southern, and Western Districts)" }
    ],
    quote: {
      es: "Un acompañamiento legal claro y humano.",
      en: "Clear and humane legal representation."
    }
  },

  // --- ABOGADOS ASOCIADOS ---
  {
    id: 'victor-rojas',
    name: 'Victor Rojas',
    image: 'https://uenjwzjx3vckezns.public.blob.vercel-storage.com/Victor%20Rojas.png',
    role: { es: 'Abogado', en: 'Attorney' },
    practice: {
      label: { es: 'Abogado de Litigio Penal e Inmigración', en: 'Criminal Litigation and Immigration Attorney' },
      topics: ['Criminal Defense', 'Immigration Law']
    },
    bio: {
      es: [
        "Rojas se graduó de la Facultad de Derecho La Interamericana de Puerto Rico en 2003. Fue Defensor Público por varios años, luchando día tras día para que las ruedas de la Justicia no se descarrilen.",
        "Se incorporó a la firma en 2019, aportando una vasta experiencia en litigio penal y defensa de derechos."
      ],
      en: [
        "Rojas graduated from La Interamericana Law School of Puerto Rico in 2003. He was a Public Defender for several years, fighting day after day to keep the wheels of Justice on track.",
        "He joined the firm in 2019, bringing extensive experience in criminal litigation and rights defense."
      ]
    },
    education: ["La Interamericana Law School of Puerto Rico (2003)"],
    admissions: [
      { es: "Puerto Rico (Litigante)", en: "Puerto Rico (Litigator)" },
      { es: "Práctica Federal de Inmigración", en: "Federal Immigration Practice" }
    ],
    quote: {
      es: "Luchando para que los derechos de los imputados no se descarrilen.",
      en: "Fighting to keep the rights of the accused on track."
    }
  },
  {
    id: 'austen-gunnels',
    name: 'Austen Gunnels',
    image: 'https://uenjwzjx3vckezns.public.blob.vercel-storage.com/Austen%20Gunnels.png',
    role: { es: 'Abogado', en: 'Attorney' },
    practice: {
      label: { es: 'Abogado Marítimo y de Accidentes', en: 'Maritime and Accident Attorney' },
      topics: ['Maritime Law', 'Personal Injury Law', 'Civil Litigation']
    },
    bio: {
      es: [
        "Su práctica se enfoca en representar heridos en accidentes marítimos y de vehículos de motor. Tiene experiencia previa en defensa de seguros, lo que le da una ventaja estratégica al negociar.",
        "Conocimiento profundo del derecho marítimo y litigio civil."
      ],
      en: [
        "His practice focuses on representing those injured in maritime and motor vehicle accidents. He has prior experience in insurance defense, which gives him a strategic advantage in negotiations.",
        "Deep knowledge of maritime law and civil litigation."
      ]
    },
    education: [
      { es: "Doctor en Jurisprudencia - South Texas College of Law Houston", en: "Juris Doctor - South Texas College of Law Houston" },
      { es: "Licenciatura en Ciencias Políticas - Univ. Lenoir Rhyne", en: "Bachelor of Science in Political Science - Lenoir Rhyne Univ." }
    ],
    admissions: [
      "Texas",
      { es: "Tribunal de Distrito (Sur de Texas)", en: "District Court (Southern District of Texas)" },
      { es: "Tribunal de Apelaciones (Quinto Circuito)", en: "Court of Appeals (Fifth Circuit)" }
    ],
    quote: {
      es: "Abogando incansablemente para garantizar la mejor resolución posible.",
      en: "Advocating tirelessly to ensure the best possible resolution."
    }
  },
  {
    id: 'gabriel-perez',
    name: 'Gabriel Perez',
    image: 'https://uenjwzjx3vckezns.public.blob.vercel-storage.com/Gabriel%20Perez.png',
    role: { es: 'Abogado', en: 'Attorney' },
    practice: {
      label: { es: 'Abogado de Lesiones Personales e Inmigración', en: 'Personal Injury and Immigration Attorney' },
      topics: ['Personal Injury Law', 'Insurance Litigation', 'Immigration Law']
    },
    bio: {
      es: [
        "Nacido en Houston, Texas. Comenzó como asistente legal en la firma y su pasión lo llevó a convertirse en abogado.",
        "Se graduó de South Texas College of Law en 2019. Se especializa en lesiones personales, seguros e inmigración."
      ],
      en: [
        "Born in Houston, Texas. He started as a legal assistant at the firm and his passion led him to become an attorney.",
        "He graduated from South Texas College of Law in 2019. He specializes in personal injury, insurance, and immigration."
      ]
    },
    education: [
      "South Texas College of Law Houston (2019)",
      { es: "Universidad de Houston", en: "University of Houston" }
    ],
    admissions: ["Texas"],
    quote: {
      es: "No hay excusa para que nadie trabaje más duro que tú.",
      en: "There's no excuse for anyone to work harder than you."
    }
  },
  {
    id: 'sara-james',
    name: 'Sara James',
    image: 'https://uenjwzjx3vckezns.public.blob.vercel-storage.com/Sara%20James.png',
    role: { es: 'Abogada', en: 'Attorney' },
    bio: {
      es: [
        "Ejerce en Memphis con pasión por la comunidad hispana. Fue Presidenta de la Hispanic Law Student Association y ganadora del premio Champion of Justice 2021.",
        "Su vocación nace del deseo de brindar representación a quienes no pueden defenderse por sí mismos."
      ],
      en: [
        "She practices in Memphis with a passion for the Hispanic community. She was President of the Hispanic Law Student Association and winner of the 2021 Champion of Justice award.",
        "Her vocation stems from the desire to provide representation to those who cannot defend themselves."
      ]
    },
    education: [
      "University of Memphis Cecil C. Humphreys School of Law (JD)",
      "University of Memphis (BA)"
    ],
    admissions: ["Tennessee", "Missouri", "Hispanic National Bar Association"],
    quote: {
      es: "Apoyarlos a alcanzar su sueño americano es un honor y un privilegio.",
      en: "Supporting them to achieve their American dream is an honor and a privilege."
    }
  },
  {
    id: 'eduardo-garcia',
    name: 'Eduardo Garcia',
    image: 'https://uenjwzjx3vckezns.public.blob.vercel-storage.com/Eduardo.png',
    role: { es: 'Abogado', en: 'Attorney' },
    bio: {
      es: [
        "Antes de ser abogado, fue profesor de Historia. Tiene una Maestría en Historia con enfoque en Borderlands.",
        "Fue becario de Equal Justice Works, comprometido con servir a comunidades históricamente marginadas."
      ],
      en: [
        "Before becoming a lawyer, he was a History teacher. He has a Master's degree in History with a focus on Borderlands.",
        "He was an Equal Justice Works Fellow, committed to serving historically marginalized communities."
      ]
    },
    education: [
      "University of New Mexico School of Law (JD)",
      "University of Texas at El Paso (UTEP)"
    ],
    admissions: ["Illinois", { es: "Nuevo México", en: "New Mexico" }],
    quote: {
      es: "Utilizar el derecho como herramienta para la equidad y la justicia.",
      en: "Using law as a tool for equity and justice."
    }
  },
  {
    id: 'alexis-alvarez',
    name: 'Alexis Alvarez',
    image: 'https://uenjwzjx3vckezns.public.blob.vercel-storage.com/Alexis-Alvarez.png',
    role: { es: 'Abogada', en: 'Attorney' },
    bio: {
      es: [
        "Originaria del Valle del Río Grande, Texas. Hija de trabajadores agrícolas migrantes. Esta historia familiar le dio una profunda admiración por la comunidad inmigrante.",
        "Obtuvo su JD de la Facultad de Derecho Sturm de la Universidad de Denver."
      ],
      en: [
        "Native of the Rio Grande Valley, Texas. Daughter of migrant farm workers. This family history gave her a deep admiration for the immigrant community.",
        "She obtained her JD from the University of Denver Sturm College of Law."
      ]
    },
    education: [
      { es: "Universidad de Denver (Sturm College of Law)", en: "University of Denver (Sturm College of Law)" },
      { es: "Universidad Texas A&M", en: "Texas A&M University" }
    ],
    admissions: ["Colorado"],
    quote: {
      es: "Cree firmemente en el principio de retribuir a la comunidad.",
      en: "She firmly believes in the principle of giving back to the community."
    }
  },
  {
    id: 'edward-s-reisman',
    name: 'Edward S. Reisman',
    image: 'https://uenjwzjx3vckezns.public.blob.vercel-storage.com/Edward-Steven-Reisman.png',
    role: { es: 'Abogado', en: 'Attorney' },
    practice: {
      label: { es: 'Abogado de Inmigración', en: 'Immigration Attorney' },
      topics: ['Immigration Law']
    },
    bio: {
      es: [
        "Ejerce en Los Ángeles. Tiene un JD de Georgetown University Law Center. Su experiencia previa en el Servicio de Inmigración y Naturalización (INS) le da una visión única del sistema.",
        "Es licenciado en Historia y Estudios Rusos."
      ],
      en: [
        "He practices in Los Angeles. He has a JD from Georgetown University Law Center. His prior experience at the Immigration and Naturalization Service (INS) gives him unique insight into the system.",
        "He holds a degree in History and Russian Studies."
      ]
    },
    education: [
      "Georgetown University Law Center (JD)",
      "University of Rochester"
    ],
    admissions: ["California", "Maryland"],
    quote: {
      es: "Guiando a sus clientes con conocimiento, responsabilidad y humanidad.",
      en: "Guiding his clients with knowledge, responsibility, and humanity."
    }
  },
  {
    id: 'stephanie-l-garcia-vidal',
    name: 'Stephanie L. Garcia Vidal',
    image: 'https://uenjwzjx3vckezns.public.blob.vercel-storage.com/Stephanie.png',
    role: { es: 'Abogada', en: 'Attorney' },
    practice: {
      label: { es: 'Abogada de Inmigración y Litigio Civil', en: 'Immigration and Civil Litigation Attorney' },
      topics: ['Immigration Law', 'Civil Litigation', 'Family Law']
    },
    bio: {
      es: [
        "Ejerce en la oficina de Dallas del Bufete de Abogados Manuel Solís, donde brinda representación legal comprometida y empática a personas y familias inmigrantes. Su pasión por la abogacía nace del deseo de apoyar a quienes emprendieron un viaje transformador para construir un futuro más seguro y digno.",
        "Obtuvo su Licenciatura en Ciencias Políticas con una concentración menor en Estudios Legales en la University of Rochester, y su título de Juris Doctor en la Escuela de Derecho de la Universidad Interamericana de Puerto Rico en 2006. Durante sus estudios, se destacó como directora de Relaciones Públicas del capítulo estudiantil de la Federal Bar Association.",
        "Con más de 17 años de experiencia en litigios civiles, administrativos y de derecho de familia, la abogada García Vidal también cuenta con más de dos años de especialización en derecho migratorio. Su enfoque es estratégico y humano, brindando apoyo eficaz a quienes enfrentan procesos legales complejos.",
        "Está admitida en el Colegio de Abogados de Puerto Rico y tiene autorización para ejercer ante el Tribunal Federal de Distrito para el Distrito de Puerto Rico.",
        "Stephanie representa a sus clientes con dedicación, sabiendo que cada caso representa una historia, una familia y un futuro lleno de posibilidades. Su vocación es luchar por quienes necesitan una voz firme a su lado."
      ],
      en: [
        "She practices at the Dallas office of the Law Offices of Manuel Solís, where she provides committed and empathetic legal representation to immigrant individuals and families. Her passion for advocacy stems from the desire to support those who have embarked on a transformative journey to build a safer and more dignified future.",
        "She obtained her Bachelor's degree in Political Science with a minor in Legal Studies from the University of Rochester, and her Juris Doctor degree from the Interamerican University of Puerto Rico School of Law in 2006. During her studies, she served as Public Relations Director for the student chapter of the Federal Bar Association.",
        "With over 17 years of experience in civil, administrative, and family law litigation, Attorney García Vidal also has over two years of specialization in immigration law. Her approach is strategic and humane, providing effective support to those facing complex legal processes.",
        "She is admitted to the Puerto Rico Bar and is authorized to practice before the U.S. District Court for the District of Puerto Rico.",
        "Stephanie represents her clients with dedication, knowing that each case represents a story, a family, and a future full of possibilities. Her vocation is to fight for those who need a firm voice by their side."
      ]
    },
    education: [
      { es: "University of Rochester (Licenciatura en Ciencias Políticas con concentración en Estudios Legales)", en: "University of Rochester (Bachelor's in Political Science with concentration in Legal Studies)" },
      { es: "Universidad Interamericana de Puerto Rico - Escuela de Derecho (JD, 2006)", en: "Interamerican University of Puerto Rico - School of Law (JD, 2006)" }
    ],
    admissions: [
      "Puerto Rico Bar",
      { es: "Tribunal de Distrito de EE. UU. (Puerto Rico)", en: "U.S. District Court (Puerto Rico)" }
    ],
    quote: {
      es: "Un compromiso con la esperanza.",
      en: "A commitment to hope."
    }
  },
  {
    id: 'lupita-valenzuela-martinez',
    name: 'Lupita Valenzuela Martinez',
    image: 'https://uenjwzjx3vckezns.public.blob.vercel-storage.com/Lupita.png',
    role: { es: 'Abogada', en: 'Attorney' },
    bio: {
      es: [
        "Ejerce la abogacía con pasión y entrega desde nuestra oficina de Memphis. Su mayor inspiración proviene de ayudar a quienes no pueden defenderse por sí mismos, y su misión es asegurar que todos reciban la representación comprometida y valiente que merecen. Su trabajo está profundamente guiado por el deseo de servir a la comunidad hispana, motor que alimenta su vocación día a día.",
        "Se graduó de la University of Memphis Cecil C. Humphreys School of Law, donde obtuvo su título de Juris Doctor y un Certificado en Abogacía. Durante su paso por la facultad, fue presidenta de la Hispanic Law Student Association, miembro del Moot Court, Student Justice del Honor Council y recibió el prestigioso premio Champion of Justice otorgado por la Memphis Bar Association en 2021.",
        "También fue reconocida como Líder Nacional Estudiantil de la Región X por la Hispanic National Bar Association y apareció en la edición de verano 2022 de la revista Memphis Law Magazine.",
        "Está autorizada para ejercer la abogacía en Tennessee y Missouri. Es miembro activo de la Tennessee Bar Association, Missouri Bar Association, Hispanic National Bar Association y American Bar Association.",
        "Combina su formación jurídica con una sensibilidad especial hacia las necesidades de sus clientes. Su enfoque cálido y estratégico convierte cada representación en una verdadera alianza en busca de justicia."
      ],
      en: [
        "She practices law with passion and dedication from our Memphis office. Her greatest inspiration comes from helping those who cannot defend themselves, and her mission is to ensure that everyone receives the committed and courageous representation they deserve. Her work is deeply guided by the desire to serve the Hispanic community, a driving force that fuels her vocation every day.",
        "She graduated from the University of Memphis Cecil C. Humphreys School of Law, where she obtained her Juris Doctor degree and a Certificate in Advocacy. During her time at law school, she was president of the Hispanic Law Student Association, a member of Moot Court, Student Justice of the Honor Council, and received the prestigious Champion of Justice award from the Memphis Bar Association in 2021.",
        "She was also recognized as Region X National Student Leader by the Hispanic National Bar Association and was featured in the summer 2022 edition of Memphis Law Magazine.",
        "She is licensed to practice law in Tennessee and Missouri. She is an active member of the Tennessee Bar Association, Missouri Bar Association, Hispanic National Bar Association, and American Bar Association.",
        "She combines her legal training with a special sensitivity to her clients' needs. Her warm and strategic approach turns each representation into a true alliance in pursuit of justice."
      ]
    },
    education: [
      { es: "University of Memphis Cecil C. Humphreys School of Law (JD y Certificado en Abogacía)", en: "University of Memphis Cecil C. Humphreys School of Law (JD and Certificate in Advocacy)" }
    ],
    admissions: [
      "Tennessee Bar Association",
      "Missouri Bar Association",
      "Hispanic National Bar Association",
      "American Bar Association"
    ],
    quote: {
      es: "Una defensora impulsada por un propósito.",
      en: "An advocate driven by purpose."
    }
  },
  {
    id: 'roberto-garcia',
    name: 'Roberto García',
    image: '/Roberto%20Garcia.png',
    role: { es: 'Abogado', en: 'Attorney' },
    bio: {
      es: [
        "Roberto García nació y creció en Memphis, Tennessee, en un hogar de inmigrantes. Esa experiencia marcó su vocación legal y lo motivó a dedicar su carrera a las familias que buscan estabilidad y un lugar al cual llamar hogar en Estados Unidos.",
        "Se graduó de la Cecil C. Humphreys School of Law y comenzó a ejercer la abogacía en 2019. Espera ayudar a tantas personas como sea posible a permanecer donde se sienten seguras y en casa."
      ],
      en: [
        "Roberto García was born and raised in Memphis, Tennessee, in an immigrant household. That experience shaped his calling and led him to dedicate his career to families seeking stability and a place to call home in the United States.",
        "He graduated from Cecil C. Humphreys School of Law and began practicing law in 2019. He hopes to help as many people as he can to remain where they feel safe and at home."
      ]
    },
    quote: {
      es: "Es un privilegio acompañarte a alcanzar tu sueño americano.",
      en: "Happy for the privilege in assisting you achieve your American Dream."
    },
    education: ["Cecil C. Humphreys School of Law"],
    admissions: [
      { es: "Tennessee", en: "Tennessee" }
    ]
  },
];
