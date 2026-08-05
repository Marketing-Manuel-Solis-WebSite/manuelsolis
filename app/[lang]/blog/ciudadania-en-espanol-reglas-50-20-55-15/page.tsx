import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  Calendar, Clock, ArrowLeft, Sparkles, CheckCircle2, AlertCircle,
  Lightbulb, Quote, TrendingUp, Award, Heart, Star, MessageCircle,
  Send, ArrowUpRight, ShieldCheck, FileText, User, Gavel, Search, Building2,
  AlertTriangle, Users, Scale, BookOpen, Flag, GraduationCap
} from 'lucide-react';

// IMPORTACIONES
import { generateBreadcrumbSchema } from '../../../lib/breadcrumbSchema';
import { buildSocialMetadata } from '../../../lib/seoMetadata';
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
  article: '/blog/blog_18/BLOG08_CR1.png',
  inside1: '/blog/blog_18/BLOG08_CR2.png',
  inside2: '/blog/blog_18/BLOG08_CR2.png',
  author: '/abogado-manuel-solis.jpg'
};

const blogContent = {
  es: {
    metaTitle: 'Ciudadanía en español: reglas 50/20 y 55/15',
    metaDesc: '¿Miedo al inglés? Descubre si podrías hacer el examen de ciudadanía en español por edad, tiempo como residente o exención médica.',
    ui: {
      back: 'Volver al blog',
      share: 'Compartir artículo',
      writtenBy: 'Escrito por',
      published: 'Publicado',
      readTime: '9 min de lectura',
      tags: 'Procesos Migratorios',
      date: '28 Mar, 2026',
      time: '9 min',
      authorRole: 'Fundador & Abogado Principal',
      ctaButton: 'Consultar con un Abogado Ahora'
    },
    title: 'Ciudadanía (N-400) en español: ¿quiénes califican por edad y tiempo?',
    summary: {
      title: 'Resumen inicial',
      text: 'El miedo al inglés es una de las razones más frecuentes por las que residentes permanentes posponen o abandonan la idea de hacerse ciudadanos. Sin embargo, la ley contempla excepciones importantes. En este artículo explicamos las <strong>reglas 50/20 y 55/15</strong>, la exención médica <strong>N-648</strong> y cómo determinar si podrías calificar para tomar el examen de ciudadanía en español.'
    },
    intro: [
      '<strong>"Yo quisiera hacerme ciudadano, pero no hablo inglés"</strong>. Esta frase se repite en miles de hogares hispanos en Estados Unidos, y es quizás el obstáculo más mencionado al hablar de naturalización.',
      'Lo que muchas personas no saben es que <strong>el idioma inglés no siempre es un requisito absoluto</strong>. Existen exenciones establecidas por ley que permiten a ciertos residentes permanentes tomar el examen de ciudadanía en su propio idioma, incluyendo español.',
      'Estas exenciones están basadas en la edad, el tiempo como residente permanente y, en algunos casos, en condiciones médicas documentadas. Conocerlas podría ser el primer paso para dejar de postergar un trámite que podría cambiar tu vida.'
    ],
    sections: {
      whatIsN400: {
        title: '¿Qué es el formulario N-400 y qué papel juega el idioma?',
        quote: 'El inglés es parte del proceso, pero no siempre es un requisito infranqueable.',
        text: 'El formulario N-400 es la solicitud oficial para la naturalización como ciudadano estadounidense. Uno de los componentes clave del proceso es la entrevista con un oficial de USCIS, donde normalmente se evalúan dos cosas:',
        requirements: [
          'Capacidad de leer, escribir y hablar en inglés básico.',
          'Conocimiento de la historia y gobierno de Estados Unidos (examen cívico).'
        ],
        text2: 'Para la mayoría de los solicitantes, ambas pruebas se realizan en inglés. Sin embargo, la ley federal reconoce que para ciertas personas, especialmente mayores de edad con muchos años de residencia, exigir el dominio del inglés podría ser injusto o desproporcionado.',
        note: 'Las exenciones de idioma no son un beneficio discrecional: están establecidas por ley.'
      },
      rule5020: {
        title: 'La regla 50/20: examen en español si tienes 50 años y 20 de residente',
        quote: 'Si tienes 50 años o más y has sido residente permanente por al menos 20 años, podrías calificar.',
        text: 'Esta es una de las exenciones más conocidas. Bajo la regla 50/20, un residente permanente podría tomar el examen de ciudadanía en español (o en su idioma nativo) si cumple con <strong>ambos requisitos</strong>:',
        requirements: [
          'Tener al menos 50 años de edad al momento de presentar la solicitud N-400.',
          'Haber sido residente permanente legal (green card) por al menos 20 años.'
        ],
        details: [
          'El examen cívico (las preguntas sobre historia y gobierno) se realiza en español.',
          'No se requiere demostrar capacidad de leer o escribir en inglés.',
          'Se puede llevar un intérprete a la entrevista.',
          'Las preguntas del examen cívico se reducen de 10 a 10, pero de un grupo más pequeño de 20 preguntas designadas.'
        ],
        note: 'Los 20 años como residente permanente no necesitan ser consecutivos, pero sí deben sumar al menos 20 años en total.'
      },
      rule5515: {
        title: 'La regla 55/15: otra opción para residentes mayores',
        quote: 'Si tienes 55 años o más y llevas 15 como residente, también podrías calificar.',
        text: 'La regla 55/15 funciona de manera similar a la 50/20, pero con umbrales diferentes. Un residente permanente podría calificar si cumple con:',
        requirements: [
          'Tener al menos 55 años de edad al momento de presentar la solicitud.',
          'Haber sido residente permanente legal por al menos 15 años.'
        ],
        text2: 'Los beneficios son los mismos que bajo la regla 50/20:',
        benefits: [
          'Examen cívico en español (o idioma nativo).',
          'Sin prueba de lectura, escritura o habla en inglés.',
          'Derecho a llevar intérprete a la entrevista.',
          'Preguntas del examen cívico tomadas del grupo designado de 20.'
        ],
        note: 'Muchas personas no saben que califican bajo esta regla. Si obtuviste tu green card a los 40 años y ahora tienes 55, podrías ser elegible.'
      },
      otherOptions: {
        title: '¿Qué pasa si no cumples con la regla 50/20 ni la 55/15?',
        subtitle: 'Podría existir otra opción',
        text: 'No todos los residentes permanentes mayores cumplen con los requisitos de edad y tiempo combinados. Por ejemplo, alguien de 52 años con solo 12 años de residencia no calificaría bajo ninguna de las dos reglas.',
        text2: 'Sin embargo, existe una tercera posibilidad que muchas personas desconocen: la <strong>exención médica mediante el formulario N-648</strong>. Esta exención no depende de la edad ni del tiempo como residente, sino de una condición médica documentada que impida aprender inglés o comprender el material cívico.',
        note: 'No descartes la ciudadanía solo porque no cumples con 50/20 o 55/15. La exención médica podría ser una alternativa viable.'
      },
      n648Exemption: {
        title: 'La exención médica N-648: cuando una condición impide aprender inglés',
        quote: 'La N-648 reconoce que ciertas condiciones médicas pueden hacer imposible aprender un nuevo idioma.',
        text: 'El formulario N-648 es una certificación médica que un doctor autorizado completa para solicitar que el aplicante sea eximido de los requisitos de inglés y/o del examen cívico. Las condiciones que podrían calificar incluyen:',
        conditions: [
          'Deterioro cognitivo o pérdida de memoria relacionada con la edad.',
          'Discapacidades intelectuales o del desarrollo diagnosticadas.',
          'Trastorno de estrés postraumático (PTSD) severo.',
          'Efectos de accidentes cerebrovasculares o traumatismos craneoencefálicos.',
          'Condiciones de aprendizaje documentadas que impidan adquirir un nuevo idioma.',
          'Enfermedades neurodegenerativas como Alzheimer o demencia.'
        ],
        note: 'La condición debe ser permanente o de duración prolongada. Dificultades comunes como nerviosismo o falta de práctica no suelen calificar por sí solas.'
      },
      doctorRole: {
        title: 'El papel del doctor en la N-648',
        subtitle: 'El formulario médico es la pieza central',
        text: 'El éxito de la exención N-648 depende en gran medida de la calidad del certificado médico. El doctor que completa el formulario debe:',
        responsibilities: [
          'Ser un médico, osteópata o psicólogo clínico con licencia válida.',
          'Describir con detalle la condición médica del paciente.',
          'Explicar específicamente cómo la condición impide aprender inglés o comprender el material cívico.',
          'Indicar si la condición es permanente o de duración prolongada.',
          'Basar su certificación en un examen directo del paciente, no solo en reportes de terceros.'
        ],
        text2: 'USCIS revisa estas certificaciones con mucho cuidado. Un formulario N-648 mal completado, vago o que no establezca una conexión clara entre la condición y la incapacidad de aprender podría ser rechazado.',
        note: 'No cualquier carta médica sirve. El formulario N-648 tiene un formato específico y debe completarse de acuerdo con las instrucciones de USCIS.'
      },
      hypothetical: {
        title: 'Ejemplos hipotéticos',
        scenario1: {
          label: 'Caso 1: Regla 55/15',
          text: 'Imagina a doña María, una residente permanente de 58 años que obtuvo su green card hace 16 años. Nunca aprendió inglés porque trabajó durante décadas en ambientes donde solo se hablaba español. Bajo la regla 55/15, María podría calificar para tomar el examen cívico en español y llevar intérprete a su entrevista de ciudadanía.'
        },
        scenario2: {
          label: 'Caso 2: Exención médica N-648',
          text: 'Ahora imagina a don Roberto, de 45 años, con solo 8 años como residente permanente. No califica bajo la regla 50/20 ni la 55/15. Sin embargo, Roberto sufrió un accidente hace años que le dejó problemas severos de memoria y concentración. Su médico podría completar un formulario N-648 certificando que su condición le impide aprender inglés de manera efectiva, lo que podría eximirlo de esos requisitos.'
        },
        note: 'Estos son ejemplos ilustrativos. Cada caso es diferente y requiere una evaluación individual.'
      },
      clarifications: {
        title: 'Aclaraciones importantes: lo que las exenciones no eliminan',
        subtitle: 'Las exenciones de idioma no son un pase libre',
        text: 'Es fundamental entender que calificar para una exención de idioma no significa que la ciudadanía esté garantizada. Aun con la exención, el solicitante debe cumplir con todos los demás requisitos de naturalización:',
        requirements: [
          'Demostrar buen carácter moral durante el período requerido.',
          'Haber mantenido residencia continua y presencia física en Estados Unidos.',
          'No tener problemas pendientes con la ley que pudieran afectar la elegibilidad.',
          'Completar correctamente el formulario N-400 y presentar toda la documentación.',
          'Asistir a la entrevista y responder verazmente a todas las preguntas del oficial.'
        ],
        text2: 'Además, cada caso se evalúa individualmente. USCIS tiene la autoridad de verificar la autenticidad de la certificación médica N-648 y podría solicitar evaluaciones adicionales si tiene dudas.',
        note: 'La exención de idioma facilita una parte del proceso, pero no reemplaza los demás requisitos legales.'
      },
      conclusion: {
        title: 'Conclusión',
        text: 'El idioma inglés no siempre tiene que ser un obstáculo definitivo para la ciudadanía. Las reglas 50/20 y 55/15 existen precisamente para reconocer que muchos residentes permanentes han contribuido a este país durante décadas sin necesariamente dominar el inglés. Y la exención médica N-648 ofrece una alternativa para quienes enfrentan condiciones que les impiden aprender.',
        advice: 'Si tú o alguien de tu familia ha pospuesto la ciudadanía por miedo al examen en inglés, informarse sobre estas opciones podría ser el primer paso. Un abogado de inmigración podría ayudarte a evaluar cuál exención aplica a tu situación y preparar tu caso de la manera más sólida posible.'
      },
      sources: {
        title: 'Fuentes Citadas',
        list: [
          'USCIS – Exceptions and Accommodations for the English and Civics Tests',
          'USCIS – Form N-648, Medical Certification for Disability Exceptions',
          'INA § 312(b)(2) – Language Exemptions for Naturalization',
          'USCIS Policy Manual, Vol. 12, Part E – English and Civics Testing'
        ]
      }
    }
  },
  en: {
    metaTitle: 'Citizenship in Spanish: Rules 50/20 and 55/15',
    metaDesc: 'Afraid of English? Find out if you could take the citizenship exam in Spanish based on age, residency time, or medical exemption.',
    ui: {
      back: 'Back to blog',
      share: 'Share article',
      writtenBy: 'Written by',
      published: 'Published',
      readTime: '9 min read',
      tags: 'Immigration Process',
      date: 'Mar 28, 2026',
      time: '9 min',
      authorRole: 'Founder & Lead Attorney',
      ctaButton: 'Consult with an Attorney Now'
    },
    title: 'Citizenship (N-400) in Spanish: Who Qualifies by Age and Time?',
    summary: {
      title: 'Initial Summary',
      text: 'Fear of English is one of the most common reasons permanent residents postpone or abandon the idea of becoming citizens. However, the law provides important exceptions. In this article we explain the <strong>50/20 and 55/15 rules</strong>, the <strong>N-648</strong> medical exemption, and how to determine if you could qualify to take the citizenship exam in Spanish.'
    },
    intro: [
      '<strong>"I would like to become a citizen, but I don\'t speak English"</strong>. This phrase is repeated in thousands of Hispanic households across the United States, and it is perhaps the most mentioned obstacle when discussing naturalization.',
      'What many people do not know is that <strong>the English language is not always an absolute requirement</strong>. There are exemptions established by law that allow certain permanent residents to take the citizenship exam in their own language, including Spanish.',
      'These exemptions are based on age, time as a permanent resident, and in some cases, documented medical conditions. Understanding them could be the first step toward no longer postponing a process that could change your life.'
    ],
    sections: {
      whatIsN400: {
        title: 'What Is Form N-400 and What Role Does Language Play?',
        quote: 'English is part of the process, but it is not always an insurmountable requirement.',
        text: 'Form N-400 is the official application for naturalization as a U.S. citizen. One of the key components of the process is the interview with a USCIS officer, where two things are typically evaluated:',
        requirements: [
          'Ability to read, write, and speak basic English.',
          'Knowledge of U.S. history and government (civics exam).'
        ],
        text2: 'For most applicants, both tests are conducted in English. However, federal law recognizes that for certain individuals, especially older adults with many years of residency, requiring English proficiency could be unfair or disproportionate.',
        note: 'Language exemptions are not a discretionary benefit: they are established by law.'
      },
      rule5020: {
        title: 'The 50/20 Rule: Exam in Spanish If You Are 50+ with 20+ Years as a Resident',
        quote: 'If you are 50 or older and have been a permanent resident for at least 20 years, you could qualify.',
        text: 'This is one of the most well-known exemptions. Under the 50/20 rule, a permanent resident could take the citizenship exam in Spanish (or their native language) if they meet <strong>both requirements</strong>:',
        requirements: [
          'Be at least 50 years old at the time of filing the N-400 application.',
          'Have been a legal permanent resident (green card holder) for at least 20 years.'
        ],
        details: [
          'The civics exam (questions about history and government) is conducted in Spanish.',
          'No need to demonstrate the ability to read or write in English.',
          'An interpreter may be brought to the interview.',
          'The civics exam questions are drawn from a designated group of 20 questions instead of the full set.'
        ],
        note: 'The 20 years as a permanent resident do not need to be consecutive, but they must total at least 20 years.'
      },
      rule5515: {
        title: 'The 55/15 Rule: Another Option for Older Residents',
        quote: 'If you are 55 or older and have been a resident for 15 years, you could also qualify.',
        text: 'The 55/15 rule works similarly to the 50/20, but with different thresholds. A permanent resident could qualify if they meet:',
        requirements: [
          'Be at least 55 years old at the time of filing the application.',
          'Have been a legal permanent resident for at least 15 years.'
        ],
        text2: 'The benefits are the same as under the 50/20 rule:',
        benefits: [
          'Civics exam in Spanish (or native language).',
          'No English reading, writing, or speaking test.',
          'Right to bring an interpreter to the interview.',
          'Civics exam questions drawn from the designated group of 20.'
        ],
        note: 'Many people do not realize they qualify under this rule. If you received your green card at age 40 and are now 55, you could be eligible.'
      },
      otherOptions: {
        title: 'What If You Don\'t Meet the 50/20 or 55/15 Rule?',
        subtitle: 'There could be another option',
        text: 'Not all older permanent residents meet the combined age and time requirements. For example, someone who is 52 years old with only 12 years of residency would not qualify under either rule.',
        text2: 'However, there is a third possibility that many people are unaware of: the <strong>medical exemption through Form N-648</strong>. This exemption does not depend on age or time as a resident, but rather on a documented medical condition that prevents learning English or understanding civics material.',
        note: 'Do not rule out citizenship just because you don\'t meet the 50/20 or 55/15 rules. The medical exemption could be a viable alternative.'
      },
      n648Exemption: {
        title: 'The N-648 Medical Exemption: When a Condition Prevents Learning English',
        quote: 'The N-648 recognizes that certain medical conditions can make it impossible to learn a new language.',
        text: 'Form N-648 is a medical certification that an authorized doctor completes to request that the applicant be exempt from the English requirements and/or the civics exam. Conditions that could qualify include:',
        conditions: [
          'Cognitive decline or age-related memory loss.',
          'Diagnosed intellectual or developmental disabilities.',
          'Severe post-traumatic stress disorder (PTSD).',
          'Effects of strokes or traumatic brain injuries.',
          'Documented learning conditions that prevent acquiring a new language.',
          'Neurodegenerative diseases such as Alzheimer\'s or dementia.'
        ],
        note: 'The condition must be permanent or long-lasting. Common difficulties such as nervousness or lack of practice typically do not qualify on their own.'
      },
      doctorRole: {
        title: 'The Doctor\'s Role in the N-648',
        subtitle: 'The medical form is the centerpiece',
        text: 'The success of the N-648 exemption depends largely on the quality of the medical certificate. The doctor who completes the form must:',
        responsibilities: [
          'Be a licensed physician, osteopath, or clinical psychologist.',
          'Describe the patient\'s medical condition in detail.',
          'Specifically explain how the condition prevents learning English or understanding civics material.',
          'Indicate whether the condition is permanent or long-lasting.',
          'Base the certification on a direct examination of the patient, not solely on third-party reports.'
        ],
        text2: 'USCIS reviews these certifications very carefully. A poorly completed, vague N-648 form that does not clearly establish a connection between the condition and the inability to learn could be denied.',
        note: 'Not just any medical letter will do. Form N-648 has a specific format and must be completed according to USCIS instructions.'
      },
      hypothetical: {
        title: 'Hypothetical Examples',
        scenario1: {
          label: 'Case 1: 55/15 Rule',
          text: 'Imagine Maria, a 58-year-old permanent resident who obtained her green card 16 years ago. She never learned English because she worked for decades in environments where only Spanish was spoken. Under the 55/15 rule, Maria could qualify to take the civics exam in Spanish and bring an interpreter to her citizenship interview.'
        },
        scenario2: {
          label: 'Case 2: N-648 Medical Exemption',
          text: 'Now imagine Roberto, age 45, with only 8 years as a permanent resident. He does not qualify under the 50/20 or 55/15 rules. However, Roberto suffered an accident years ago that left him with severe memory and concentration problems. His doctor could complete an N-648 form certifying that his condition prevents him from effectively learning English, which could exempt him from those requirements.'
        },
        note: 'These are illustrative examples. Every case is different and requires an individual evaluation.'
      },
      clarifications: {
        title: 'Important Clarifications: What Exemptions Do Not Eliminate',
        subtitle: 'Language exemptions are not a free pass',
        text: 'It is essential to understand that qualifying for a language exemption does not mean citizenship is guaranteed. Even with the exemption, the applicant must meet all other naturalization requirements:',
        requirements: [
          'Demonstrate good moral character during the required period.',
          'Have maintained continuous residence and physical presence in the United States.',
          'Have no pending legal issues that could affect eligibility.',
          'Correctly complete Form N-400 and submit all documentation.',
          'Attend the interview and truthfully answer all questions from the officer.'
        ],
        text2: 'Additionally, each case is evaluated individually. USCIS has the authority to verify the authenticity of the N-648 medical certification and could request additional evaluations if it has concerns.',
        note: 'The language exemption facilitates one part of the process, but it does not replace the other legal requirements.'
      },
      conclusion: {
        title: 'Conclusion',
        text: 'The English language does not always have to be a definitive obstacle to citizenship. The 50/20 and 55/15 rules exist precisely to recognize that many permanent residents have contributed to this country for decades without necessarily mastering English. And the N-648 medical exemption offers an alternative for those facing conditions that prevent them from learning.',
        advice: 'If you or a family member has postponed citizenship out of fear of the English exam, learning about these options could be the first step. An immigration attorney could help you evaluate which exemption applies to your situation and prepare your case in the strongest way possible.'
      },
      sources: {
        title: 'Sources Cited',
        list: [
          'USCIS – Exceptions and Accommodations for the English and Civics Tests',
          'USCIS – Form N-648, Medical Certification for Disability Exceptions',
          'INA § 312(b)(2) – Language Exemptions for Naturalization',
          'USCIS Policy Manual, Vol. 12, Part E – English and Civics Testing'
        ]
      }
    }
  }
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const t = blogContent[lang as 'es' | 'en'] || blogContent.es;

  const social = buildSocialMetadata({
    lang: lang === 'en' ? 'en' : 'es',
    path: `/${lang}/blog/ciudadania-en-espanol-reglas-50-20-55-15`,
    title: t.title,
    description: t.metaDesc,
    images: [{ url: IMAGES.article, alt: t.title }],
    type: 'article',
    publishedTime: '2026-03-28T08:00:00.000Z',
  });

  return {
    title: { absolute: t.metaTitle },
    description: t.metaDesc,
    openGraph: {
      ...social.openGraph,
      // Campos article:* que buildSocialMetadata no cubre.
      type: 'article',
      authors: ['Manuel Solís'],
      section: 'Inmigración',
      tags: ['Ciudadanía en español','N-400','Regla 50/20','Regla 55/15','N-648','Exención médica','Naturalización'],
    },
    twitter: social.twitter,
    alternates: {
      canonical: `${SITE_URL}/${lang}/blog/ciudadania-en-espanol-reglas-50-20-55-15`,
      languages: {
        'es': `${SITE_URL}/es/blog/ciudadania-en-espanol-reglas-50-20-55-15`,
        'en': `${SITE_URL}/en/blog/ciudadania-en-espanol-reglas-50-20-55-15`,
        'x-default': `${SITE_URL}/es/blog/ciudadania-en-espanol-reglas-50-20-55-15`,
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
    { name: t.title, url: `/${lang}/blog/ciudadania-en-espanol-reglas-50-20-55-15` },
  ]);

  return (
    <>
      <BlogSchema
        title={blogContent[lang as 'es' | 'en']?.metaTitle || blogContent.es.metaTitle}
        description={blogContent[lang as 'es' | 'en']?.metaDesc || blogContent.es.metaDesc}
        slug="ciudadania-en-espanol-reglas-50-20-55-15"
        date="2026-03-28"
        image={IMAGES.article}
        lang={lang as string}
        readTime="9"
      />
      <script
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

        <main id="main-content" tabIndex={-1} className="relative z-10 pt-32 pb-20">

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
                    fill sizes="56px"
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
                     alt="Ciudadanía en español reglas 50/20 y 55/15"
                     fill
                     sizes="(max-width: 1024px) 100vw, 760px"
                     className="object-cover transition-transform duration-1000 group-hover:scale-105"
                     priority
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-[#001540] via-transparent to-transparent opacity-30" />
                </div>

                {/* Resumen */}
                <div className="p-8 rounded-3xl bg-gradient-to-br from-[#B2904D]/20 to-transparent border border-[#B2904D]/30 mb-10 shadow-2xl">
                   <h2 className="text-[#B2904D] font-bold text-xl mb-4 flex items-center gap-2">
                     <Sparkles size={20} /> {t.summary.title}
                   </h2>
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

                  {/* Sección 1: ¿Qué es el N-400? */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mt-0 mb-6 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><FileText size={24} className="text-[#B2904D]" /></div>
                      {t.sections.whatIsN400.title}
                    </h2>
                    <p className="text-xl text-white italic mb-6 border-l-4 border-[#B2904D] pl-6 py-2">
                      {t.sections.whatIsN400.quote}
                    </p>
                    <p className="mb-4">{t.sections.whatIsN400.text}</p>
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.whatIsN400.requirements.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <CheckCircle2 size={24} className="text-green-400 shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="mb-4">{t.sections.whatIsN400.text2}</p>
                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.whatIsN400.note}
                    </div>
                  </section>

                  {/* Sección 2: Regla 50/20 */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mb-2 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><Flag size={24} className="text-[#B2904D]" /></div>
                      {t.sections.rule5020.title}
                    </h2>
                    <p className="text-xl text-white italic mb-6 border-l-4 border-[#B2904D] pl-6 py-2">
                      {t.sections.rule5020.quote}
                    </p>
                    <p className="mb-4">{t.sections.rule5020.text}</p>
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.rule5020.requirements.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <CheckCircle2 size={24} className="text-green-400 shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="grid md:grid-cols-2 gap-4 my-8">
                      {t.sections.rule5020.details.map((item, i) => (
                        <div key={i} className="p-5 bg-[#000a20] rounded-xl border border-white/10 flex items-start gap-3 hover:border-[#B2904D]/50 transition-colors">
                          <Star size={18} className="text-[#B2904D] shrink-0 mt-1" />
                          <span className="text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.rule5020.note}
                    </div>
                  </section>

                  {/* Sección 3: Regla 55/15 */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mb-2 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><Award size={24} className="text-[#B2904D]" /></div>
                      {t.sections.rule5515.title}
                    </h2>
                    <p className="text-xl text-white italic mb-6 border-l-4 border-[#B2904D] pl-6 py-2">
                      {t.sections.rule5515.quote}
                    </p>
                    <p className="mb-4">{t.sections.rule5515.text}</p>
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.rule5515.requirements.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <CheckCircle2 size={24} className="text-green-400 shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="mb-4">{t.sections.rule5515.text2}</p>
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.rule5515.benefits.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <Star size={24} className="text-[#B2904D] shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <Lightbulb size={16} className="inline mr-2" />
                      {t.sections.rule5515.note}
                    </div>
                  </section>

                  {/* Imagen interior 1 */}
                  <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-xl group">
                     <Image
                       src={IMAGES.inside1}
                       alt="Examen de ciudadanía en español N-400"
                       fill
                       className="object-cover transition-transform duration-1000 group-hover:scale-105"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-[#001540] via-transparent to-transparent opacity-20" />
                  </div>

                  {/* Sección 4: Otras opciones */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mb-2 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><Search size={24} className="text-[#B2904D]" /></div>
                      {t.sections.otherOptions.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.otherOptions.subtitle}</p>
                    <p className="mb-4">{t.sections.otherOptions.text}</p>
                    <p className="mb-4" dangerouslySetInnerHTML={{ __html: t.sections.otherOptions.text2 }} />
                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <Lightbulb size={16} className="inline mr-2" />
                      {t.sections.otherOptions.note}
                    </div>
                  </section>

                  {/* Sección 5: Exención N-648 */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mb-2 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><ShieldCheck size={24} className="text-[#B2904D]" /></div>
                      {t.sections.n648Exemption.title}
                    </h2>
                    <p className="text-xl text-white italic mb-6 border-l-4 border-[#B2904D] pl-6 py-2">
                      {t.sections.n648Exemption.quote}
                    </p>
                    <p className="mb-4">{t.sections.n648Exemption.text}</p>
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.n648Exemption.conditions.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <AlertTriangle size={24} className="text-yellow-400 shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.n648Exemption.note}
                    </div>
                  </section>

                  {/* Sección 6: Papel del doctor */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mb-2 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><GraduationCap size={24} className="text-[#B2904D]" /></div>
                      {t.sections.doctorRole.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.doctorRole.subtitle}</p>
                    <p className="mb-4">{t.sections.doctorRole.text}</p>
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.doctorRole.responsibilities.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <CheckCircle2 size={24} className="text-green-400 shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="mb-4">{t.sections.doctorRole.text2}</p>
                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.doctorRole.note}
                    </div>
                  </section>

                  {/* Imagen interior 2 */}
                  <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-xl group">
                     <Image
                       src={IMAGES.inside2}
                       alt="Exención médica N-648 ciudadanía"
                       fill
                       className="object-cover transition-transform duration-1000 group-hover:scale-105"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-[#001540] via-transparent to-transparent opacity-20" />
                  </div>

                  {/* Sección 7: Ejemplos hipotéticos */}
                  <section className="relative my-12">
                    <div className="absolute -left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-[#B2904D] to-transparent hidden md:block" />
                    <h2 className="text-3xl font-serif text-white mb-8 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><User size={24} className="text-[#B2904D]" /></div>
                      {t.sections.hypothetical.title}
                    </h2>

                    <div className="space-y-6">
                      {/* Caso 1 */}
                      <div className="bg-[#000a20] p-8 rounded-2xl border border-white/10 shadow-xl relative overflow-hidden group hover:border-[#B2904D]/30 transition-all">
                         <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Quote size={120} />
                         </div>
                         <span className="inline-block px-3 py-1 bg-[#B2904D]/20 text-[#B2904D] text-xs font-bold uppercase tracking-widest rounded-full mb-4">
                           {t.sections.hypothetical.scenario1.label}
                         </span>
                         <p className="italic text-white/90 text-lg">
                           {t.sections.hypothetical.scenario1.text}
                         </p>
                      </div>

                      {/* Caso 2 */}
                      <div className="bg-[#000a20] p-8 rounded-2xl border border-white/10 shadow-xl relative overflow-hidden group hover:border-[#B2904D]/30 transition-all">
                         <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Quote size={120} />
                         </div>
                         <span className="inline-block px-3 py-1 bg-[#B2904D]/20 text-[#B2904D] text-xs font-bold uppercase tracking-widest rounded-full mb-4">
                           {t.sections.hypothetical.scenario2.label}
                         </span>
                         <p className="italic text-white/90 text-lg">
                           {t.sections.hypothetical.scenario2.text}
                         </p>
                      </div>
                    </div>

                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D] mt-6">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.hypothetical.note}
                    </div>
                  </section>

                  {/* Sección 8: Aclaraciones */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mb-2 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><Scale size={24} className="text-[#B2904D]" /></div>
                      {t.sections.clarifications.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.clarifications.subtitle}</p>
                    <p className="mb-4">{t.sections.clarifications.text}</p>
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.clarifications.requirements.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <Gavel size={24} className="text-red-400 shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="mb-4">{t.sections.clarifications.text2}</p>
                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.clarifications.note}
                    </div>
                  </section>

                  {/* Conclusión CTA */}
                  <div className="p-8 bg-gradient-to-r from-[#B2904D] to-[#8a6e36] rounded-3xl text-[#001540] shadow-lg mt-12">
                      <h2 className="text-2xl font-bold font-serif mb-4 flex items-center gap-2">
                         <MessageCircle size={28} /> {t.sections.conclusion.title}
                      </h2>
                      <p className="font-medium text-lg mb-6 leading-relaxed">
                        {t.sections.conclusion.text}
                      </p>
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
                          <Image src={IMAGES.author} alt="Manuel Solis" fill sizes="96px" className="object-cover" />
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
            articles={getRelatedArticles('ciudadania-en-espanol-reglas-50-20-55-15', (lang as 'es' | 'en') || 'es')}
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
