import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';
import {
  Calendar, Clock, ArrowLeft, Sparkles, CheckCircle2, AlertCircle,
  Lightbulb, MessageCircle, Send, ArrowUpRight, ShieldCheck, FileText,
  User, DollarSign, Users, Scale, ClipboardList, AlertTriangle,
  HelpCircle, BookOpen, TrendingUp, BadgeDollarSign
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
  article: '/home-image.jpg',
  inside1: '/home-image.jpg',
  inside2: '/home-image.jpg',
  author: '/abogado-manuel-solis.jpg'
};

const blogContent = {
  es: {
    metaTitle: 'Formulario I-864: Patrocinador e Ingreso Minimo 2025',
    metaDesc: 'Guia completa del Affidavit of Support I-864. Quién puede firmar, tabla de ingreso mínimo 2025, co-patrocinador, errores comunes y diferencia con el I-134.',
    ui: {
      back: 'Volver al blog',
      share: 'Compartir artículo',
      writtenBy: 'Escrito por',
      published: 'Publicado',
      readTime: '10 min de lectura',
      tags: 'Procesos Migratorios',
      date: '30 Abr, 2025',
      time: '10 min',
      authorRole: 'Fundador & Abogado Principal',
      ctaButton: 'Consultar con un Abogado Ahora'
    },
    title: 'Formulario I-864: quién puede ser patrocinador y cuánto necesitas ganar',
    summary: {
      title: 'Resumen inicial',
      text: 'El Formulario I-864 (Affidavit of Support) es un requisito obligatorio en la mayoría de las peticiones familiares de residencia. El patrocinador se compromete legalmente a mantener económicamente al beneficiario. En esta guía explicamos <strong>quién puede firmar</strong>, cómo se calcula el tamaño del hogar, la <strong>tabla de ingreso mínimo vigente 2025</strong>, qué hacer si no ganas suficiente y la diferencia entre el I-864 y el I-134.'
    },
    intro: [
      'El proceso de inmigración por vía familiar no termina con la aprobación de la petición I-130. Uno de los pasos más importantes, y a menudo más confusos, es completar el Formulario I-864 (Affidavit of Support). Este documento es un contrato legal entre el patrocinador y el gobierno de Estados Unidos donde el peticionario se compromete a mantener económicamente al inmigrante que patrocina.',
      'USCIS exige este formulario para asegurar que la persona que inmigra no se convierta en una carga pública. Si el patrocinador no cumple con los requisitos de ingreso mínimo, el caso puede ser denegado o retrasado significativamente. Sin embargo, existen alternativas como el co-patrocinador (joint sponsor), la inclusión de miembros del hogar o el uso de activos para compensar el déficit de ingresos.',
      'Es fundamental entender que esta obligación financiera dura años y no termina con el divorcio ni con la separación. Solo se extingue cuando el beneficiario se convierte en ciudadano estadounidense o acumula 40 trimestres de trabajo calificado (aproximadamente 10 años).'
    ],
    sections: {
      whatIs: {
        title: '¿Qué es el I-864 y cuándo se usa?',
        subtitle: 'El contrato financiero detrás de cada petición familiar',
        text: 'El Formulario I-864, conocido como Affidavit of Support, es una declaración jurada de apoyo económico que debe presentar el peticionario (sponsor) en casi todas las peticiones de residencia basadas en relaciones familiares. Este formulario se exige tanto para el ajuste de estatus (dentro de EE.UU.) como para el procesamiento consular (en el extranjero).',
        list: [
          'Se requiere en peticiones familiares basadas en I-130 (cónyuge, padres, hijos).',
          'Se requiere en la etapa de ajuste de estatus (I-485) o en la entrevista consular.',
          'Es un contrato legalmente vinculante entre el patrocinador y el gobierno federal.',
          'El patrocinador se compromete a mantener al beneficiario al 125% del nivel de pobreza federal.',
          'No aplica para peticiones de empleo ni para la mayoría de visas humanitarias.',
          'El formulario debe estar firmado y actualizado al momento de la entrevista o adjudicación.'
        ],
        note: 'El I-864 no es una simple formalidad. Es un contrato ejecutable. El gobierno o el beneficiario podrían demandar al patrocinador si este no cumple con su obligación de manutención.'
      },
      whoCanSign: {
        title: '¿Quién puede ser patrocinador y quién no?',
        subtitle: 'Requisitos del sponsor principal, co-patrocinador y miembros del hogar',
        text: 'El patrocinador principal debe ser la persona que presentó la petición I-130. Debe ser ciudadano estadounidense o residente permanente, tener al menos 18 años y estar domiciliado en Estados Unidos. Sin embargo, no es la única persona que puede ayudar a cumplir con el requisito económico. Existen tres figuras clave en el sistema del I-864.',
        list: [
          'Patrocinador principal (petitioner): Es quien presentó el I-130. Siempre debe firmar el I-864, incluso si no cumple con el ingreso mínimo por sí solo.',
          'Co-patrocinador (joint sponsor): Cualquier ciudadano o residente con domicilio en EE.UU. que acepte asumir la misma obligación legal. No necesita tener relación familiar con el beneficiario. Firma un I-864 independiente.',
          'Miembro del hogar con I-864A: Persona que vive con el patrocinador principal y que combina sus ingresos. Debe completar el Formulario I-864A (Contract Between Sponsor and Household Member).',
          'El beneficiario puede contar sus propios ingresos solo si ya vive en EE.UU. y continuará la misma fuente de empleo después de obtener la residencia.',
          'El patrocinador debe tener domicilio en Estados Unidos. Si vive en el extranjero, debe demostrar intención de regresar antes de la inmigración del beneficiario.',
          'Personas con antecedentes de incumplimiento de I-864 anteriores podrían enfrentar mayor escrutinio.'
        ],
        note: 'Si eres residente permanente y no ganas suficiente, puedes tener un co-patrocinador ciudadano o residente que cumpla con el ingreso mínimo. No necesita ser familiar del beneficiario.'
      },
      incomeTable: {
        title: 'Tabla de ingreso mínimo vigente (2025)',
        subtitle: '125% de las Guías de Pobreza Federal — válida para la mayoría de los estados',
        text: 'El patrocinador debe demostrar un ingreso anual igual o superior al 125% del nivel de pobreza federal según el tamaño de su hogar. Esta tabla se actualiza cada año y se basa en las guías publicadas por el Departamento de Salud y Servicios Humanos (HHS). Para militares en servicio activo que patrocinan a su cónyuge o hijos, el requisito es solo el 100% del nivel de pobreza.',
        cards: {
          size2: { title: '2 personas', desc: '$26,437 anuales' },
          size3: { title: '3 personas', desc: '$33,312 anuales' },
          size4: { title: '4 personas', desc: '$40,187 anuales' },
          size5: { title: '5 personas', desc: '$47,062 anuales' },
          size6: { title: '6 personas', desc: '$53,937 anuales' },
          size7: { title: '7 personas', desc: '$60,812 anuales' },
          size8: { title: '8 personas', desc: '$67,687 anuales' },
          sizeExtra: { title: 'Cada persona adicional', desc: '+$6,875 anuales' }
        },
        note: 'El tamaño del hogar incluye al patrocinador, al beneficiario, a los dependientes del patrocinador, a cualquier persona ya patrocinada con un I-864 anterior, y a los derivados incluidos en la petición.'
      },
      notEnough: {
        title: '¿Qué hacer si no ganas suficiente?',
        subtitle: 'Alternativas legales cuando el ingreso del patrocinador no alcanza',
        text: 'Si el patrocinador principal no alcanza el ingreso mínimo requerido, existen varias opciones legales para cumplir con el requisito del I-864. No cumplir con este requisito no significa automáticamente que el caso será denegado, siempre que se utilice una de las siguientes alternativas aceptadas por USCIS.',
        list: [
          'Co-patrocinador (Joint Sponsor): Una segunda persona, ciudadano o residente permanente con domicilio en EE.UU., que cumple por sí sola con el ingreso mínimo. Firma su propio I-864 completo y asume la misma obligación legal que el patrocinador principal.',
          'Miembro del hogar (Household Member con I-864A): Una persona que vive con el patrocinador y que combina sus ingresos con los del sponsor. Debe completar el Formulario I-864A y aceptar la responsabilidad financiera compartida.',
          'Uso de activos: Si los ingresos no alcanzan, el patrocinador puede usar activos (ahorros, propiedades, inversiones) para cubrir la diferencia. Los activos deben valer al menos 3 veces la diferencia entre el ingreso actual y el ingreso requerido (5 veces si el beneficiario no es cónyuge o hijo).',
          'Ingreso del beneficiario: Si el beneficiario ya trabaja legalmente en EE.UU. y mantendrá el mismo empleo después de recibir la residencia, sus ingresos pueden contarse como parte del hogar.',
          'Combinar ingresos de múltiples miembros del hogar que presenten I-864A individuales.'
        ],
        note: 'No puedes tener más de un co-patrocinador por beneficiario. Si un co-patrocinador no cumple el 125%, necesitas buscar a otra persona. El co-patrocinador debe cumplir el requisito por sí solo, sin combinar con el patrocinador principal.'
      },
      commonErrors: {
        title: 'Errores comunes que causan retrasos o rechazos',
        subtitle: 'Problemas frecuentes al completar el I-864',
        text: 'El Formulario I-864 es uno de los documentos que más errores genera en los procesos migratorios familiares. Incluso errores menores pueden resultar en solicitudes de evidencia adicional (RFE) o en la denegación del caso. Estos son los problemas más frecuentes que nuestros abogados observan en la práctica.',
        list: [
          'Calcular mal el tamaño del hogar: Olvidar incluir a dependientes, al beneficiario, o a personas ya patrocinadas con un I-864 previo.',
          'No incluir las declaraciones de impuestos correctas: USCIS generalmente requiere las transcripciones del IRS (tax transcripts) del año fiscal más reciente, no solo copias de los tax returns.',
          'No actualizar el formulario: Si pasan meses entre la presentación y la entrevista, los datos de ingresos pueden quedar desactualizados.',
          'No firmar el formulario o enviar una versión incorrecta: USCIS rechaza formularios sin firma original o con versiones obsoletas.',
          'Confundir el I-864 con el I-864EZ: El formulario simplificado (I-864EZ) solo aplica cuando el patrocinador es el único contribuyente de ingresos y patrocina a una sola persona. Usarlo incorrectamente genera rechazos.',
          'No incluir evidencia de domicilio en EE.UU.: El patrocinador debe demostrar que vive en Estados Unidos al momento de firmar.',
          'Omitir la página de empleo o poner ingresos inconsistentes con los tax returns.',
          'Presentar un I-864 con datos del co-patrocinador pero sin que este firme su propio formulario completo.'
        ],
        note: 'Un solo error en el I-864 puede retrasar tu caso meses. Es recomendable que un abogado de inmigración revise el formulario antes de presentarlo.'
      },
      i864vs134: {
        title: 'Diferencia entre I-864 e I-134',
        subtitle: 'Cuándo se usa cada uno y qué nivel de compromiso implican',
        text: 'Muchas personas confunden el Formulario I-864 con el I-134 (Declaration of Financial Support). Aunque ambos son declaraciones de apoyo económico, tienen diferencias fundamentales en cuanto a cuándo se usan, qué nivel de obligación generan y qué estándar de ingreso aplican.',
        cards: {
          binding: { title: 'Naturaleza legal', desc: 'I-864: Contrato legalmente vinculante y ejecutable. I-134: Declaración de intención, generalmente no ejecutable en tribunales.' },
          when864: { title: 'Cuándo se usa el I-864', desc: 'En la etapa de ajuste de estatus (I-485) o procesamiento consular para residencia permanente basada en familia.' },
          when134: { title: 'Cuándo se usa el I-134', desc: 'En la etapa de visa K-1 (prometido), visa K-3, o como evidencia temporal de apoyo económico para otras visas.' },
          standard: { title: 'Estándar de ingreso', desc: 'I-864: 125% del nivel de pobreza. I-134: Generalmente 100% del nivel de pobreza (no hay requisito formal fijo).' },
          duration864: { title: 'Duración I-864', desc: 'Hasta que el beneficiario se naturalice o acumule 40 trimestres de trabajo. No termina con el divorcio.' },
          duration134: { title: 'Duración I-134', desc: 'Se considera temporal. Cubre únicamente la etapa para la cual fue presentado (ejemplo: la entrada con visa K-1).' }
        },
        note: 'Si patrocinas a un prometido(a) con visa K-1, primero presentarás el I-134 para el consulado. Después del matrimonio y al solicitar el ajuste de estatus, deberás presentar el I-864 con el estándar más alto del 125%.'
      },
      faq: {
        title: 'Preguntas Frecuentes',
        items: [
          {
            q: '¿Mi cónyuge necesita tener un trabajo fijo para poder patrocinarme?',
            a: 'No necesariamente. USCIS acepta ingresos de diferentes fuentes: empleo, autoempleo, inversiones, pensiones, seguro social, e incluso ingresos de otros miembros del hogar con I-864A. Lo importante es que el ingreso total del hogar alcance el 125% del nivel de pobreza. Sin embargo, si el patrocinador no tiene ingresos regulares, el caso será más difícil y probablemente necesitará un co-patrocinador o demostrar activos suficientes.'
          },
          {
            q: '¿Puede un amigo o conocido ser mi co-patrocinador?',
            a: 'Sí. El co-patrocinador (joint sponsor) no necesita tener relación familiar con el beneficiario ni con el patrocinador principal. Cualquier ciudadano estadounidense o residente permanente, mayor de 18 años, con domicilio en Estados Unidos y que cumpla con el ingreso mínimo por sí solo, puede firmar como co-patrocinador. Esa persona asumirá la misma obligación legal que el patrocinador principal.'
          },
          {
            q: '¿Cuántos co-patrocinadores puedo tener?',
            a: 'Solo puedes tener un co-patrocinador por beneficiario. Sin embargo, si tu petición incluye derivados (por ejemplo, hijos del beneficiario principal), puedes tener un co-patrocinador diferente para cada derivado. El co-patrocinador debe cumplir el requisito de ingreso mínimo de manera independiente, sin combinar ingresos con el patrocinador principal.'
          },
          {
            q: '¿Si el beneficiario ya trabaja en EE.UU., eso reemplaza el I-864?',
            a: 'No. El Formulario I-864 es obligatorio independientemente de los ingresos del beneficiario. Sin embargo, si el beneficiario ya trabaja legalmente en Estados Unidos y mantendrá la misma fuente de empleo después de obtener la residencia, sus ingresos pueden contarse como parte del ingreso del hogar del patrocinador. Esto puede ayudar a alcanzar el mínimo requerido, pero no elimina la necesidad de presentar el I-864.'
          },
          {
            q: '¿Cuánto tiempo dura la obligación del I-864?',
            a: 'La obligación del patrocinador bajo el I-864 dura hasta que ocurra uno de los siguientes eventos: el beneficiario se convierte en ciudadano estadounidense, el beneficiario acumula 40 trimestres de trabajo calificado bajo el Seguro Social (aproximadamente 10 años de trabajo), el beneficiario fallece, o el patrocinador fallece. Importante: la obligación NO termina con el divorcio. El patrocinador sigue siendo legalmente responsable incluso después de divorciarse del beneficiario.'
          }
        ]
      },
      conclusion: {
        title: 'Conclusión',
        text: 'El Formulario I-864 es mucho más que un trámite burocrático: es un contrato legal con consecuencias reales que pueden durar años. Entender quién puede firmar, cómo calcular correctamente el tamaño del hogar, qué hacer si el ingreso no alcanza y cuál es la diferencia entre el I-864 y el I-134 puede marcar la diferencia entre una aprobación sin problemas y un caso retrasado o denegado.',
        advice: 'Si estás por presentar un I-864 o necesitas encontrar un co-patrocinador, consulta con un abogado de inmigración que pueda revisar tu situación financiera, asegurar que todos los formularios estén correctos y evitar errores que podrían costar tiempo y dinero.'
      },
      sources: {
        title: 'Fuentes Citadas',
        list: [
          'USCIS – Form I-864P: HHS Poverty Guidelines for Affidavit of Support',
          'U.S. Department of State – Affidavit of Support FAQs',
          'U.S. Department of State – Affidavit of Support Overview',
          'USCIS – Instructions for Form I-864, Affidavit of Support'
        ]
      }
    }
  },
  en: {
    metaTitle: 'Form I-864: Sponsor & Minimum Income Requirements 2025',
    metaDesc: 'Complete guide to the Affidavit of Support I-864. Who can sign, 2025 income table, joint sponsor, common errors, and difference between I-864 and I-134.',
    ui: {
      back: 'Back to blog',
      share: 'Share article',
      writtenBy: 'Written by',
      published: 'Published',
      readTime: '10 min read',
      tags: 'Immigration Process',
      date: 'Apr 30, 2025',
      time: '10 min',
      authorRole: 'Founder & Lead Attorney',
      ctaButton: 'Consult with an Attorney Now'
    },
    title: 'Form I-864: Who Can Be a Sponsor and How Much Income You Need',
    summary: {
      title: 'Initial Summary',
      text: 'Form I-864 (Affidavit of Support) is a mandatory requirement in most family-based residency petitions. The sponsor legally commits to financially support the beneficiary. In this guide we explain <strong>who can sign</strong>, how to calculate household size, the <strong>current 2025 minimum income table</strong>, what to do if you don\'t earn enough, and the difference between the I-864 and the I-134.'
    },
    intro: [
      'The family-based immigration process does not end with the approval of the I-130 petition. One of the most important, and often most confusing steps, is completing Form I-864 (Affidavit of Support). This document is a legal contract between the sponsor and the United States government where the petitioner commits to financially supporting the immigrant they are sponsoring.',
      'USCIS requires this form to ensure that the person immigrating does not become a public charge. If the sponsor does not meet the minimum income requirements, the case can be denied or significantly delayed. However, there are alternatives such as a joint sponsor, including household members, or using assets to compensate for the income shortfall.',
      'It is crucial to understand that this financial obligation lasts for years and does not end with divorce or separation. It only terminates when the beneficiary becomes a U.S. citizen or accumulates 40 qualifying work quarters (approximately 10 years).'
    ],
    sections: {
      whatIs: {
        title: 'What Is the I-864 and When Is It Used?',
        subtitle: 'The financial contract behind every family petition',
        text: 'Form I-864, known as the Affidavit of Support, is a sworn statement of financial support that must be submitted by the petitioner (sponsor) in nearly all family-based residency petitions. This form is required for both adjustment of status (within the U.S.) and consular processing (abroad).',
        list: [
          'Required in family petitions based on I-130 (spouse, parents, children).',
          'Required at the adjustment of status (I-485) stage or at the consular interview.',
          'It is a legally binding contract between the sponsor and the federal government.',
          'The sponsor commits to maintaining the beneficiary at 125% of the federal poverty level.',
          'Does not apply to employment-based petitions or most humanitarian visas.',
          'The form must be signed and current at the time of the interview or adjudication.'
        ],
        note: 'The I-864 is not a mere formality. It is an enforceable contract. The government or the beneficiary could sue the sponsor if they fail to meet their support obligation.'
      },
      whoCanSign: {
        title: 'Who Can Be a Sponsor and Who Cannot?',
        subtitle: 'Requirements for the main sponsor, joint sponsor, and household members',
        text: 'The primary sponsor must be the person who filed the I-130 petition. They must be a U.S. citizen or permanent resident, at least 18 years old, and domiciled in the United States. However, they are not the only person who can help meet the financial requirement. There are three key figures in the I-864 system.',
        list: [
          'Primary Sponsor (petitioner): The person who filed the I-130. Must always sign the I-864, even if they cannot meet the minimum income requirement on their own.',
          'Joint Sponsor: Any U.S. citizen or permanent resident domiciled in the U.S. who agrees to assume the same legal obligation. Does not need to be related to the beneficiary. Signs a separate, independent I-864.',
          'Household Member with I-864A: A person who lives with the primary sponsor and combines their income. Must complete Form I-864A (Contract Between Sponsor and Household Member).',
          'The beneficiary can count their own income only if they already live in the U.S. and will continue the same source of employment after obtaining residency.',
          'The sponsor must be domiciled in the United States. If living abroad, they must demonstrate intent to return before the beneficiary\'s immigration.',
          'Individuals with a history of defaulting on previous I-864 obligations may face increased scrutiny.'
        ],
        note: 'If you are a permanent resident who does not earn enough, you can have a joint sponsor who is a citizen or resident and meets the minimum income. The joint sponsor does not need to be a relative of the beneficiary.'
      },
      incomeTable: {
        title: 'Current Minimum Income Table (2025)',
        subtitle: '125% of the Federal Poverty Guidelines — valid for most states',
        text: 'The sponsor must demonstrate an annual income equal to or greater than 125% of the federal poverty level based on their household size. This table is updated annually and is based on guidelines published by the Department of Health and Human Services (HHS). For active-duty military members sponsoring their spouse or children, the requirement is only 100% of the poverty level.',
        cards: {
          size2: { title: '2 persons', desc: '$26,437 per year' },
          size3: { title: '3 persons', desc: '$33,312 per year' },
          size4: { title: '4 persons', desc: '$40,187 per year' },
          size5: { title: '5 persons', desc: '$47,062 per year' },
          size6: { title: '6 persons', desc: '$53,937 per year' },
          size7: { title: '7 persons', desc: '$60,812 per year' },
          size8: { title: '8 persons', desc: '$67,687 per year' },
          sizeExtra: { title: 'Each additional person', desc: '+$6,875 per year' }
        },
        note: 'Household size includes the sponsor, the beneficiary, the sponsor\'s dependents, any person already sponsored under a previous I-864, and any derivatives included in the petition.'
      },
      notEnough: {
        title: 'What to Do If You Don\'t Earn Enough?',
        subtitle: 'Legal alternatives when the sponsor\'s income falls short',
        text: 'If the primary sponsor does not reach the required minimum income, there are several legal options to meet the I-864 requirement. Failing to meet this requirement does not automatically mean the case will be denied, as long as one of the following alternatives accepted by USCIS is used.',
        list: [
          'Joint Sponsor: A second person, a U.S. citizen or permanent resident domiciled in the U.S., who independently meets the minimum income. They sign their own complete I-864 and assume the same legal obligation as the primary sponsor.',
          'Household Member (with I-864A): A person who lives with the sponsor and combines their income with the sponsor\'s. Must complete Form I-864A and accept shared financial responsibility.',
          'Use of Assets: If income falls short, the sponsor can use assets (savings, property, investments) to cover the difference. Assets must be worth at least 3 times the difference between current income and required income (5 times if the beneficiary is not a spouse or child).',
          'Beneficiary\'s Income: If the beneficiary already works legally in the U.S. and will maintain the same employment after receiving residency, their income can be counted as part of the household.',
          'Combining income from multiple household members who each file individual I-864A forms.'
        ],
        note: 'You cannot have more than one joint sponsor per beneficiary. If one joint sponsor does not meet the 125%, you need to find another person. The joint sponsor must meet the requirement independently, without combining with the primary sponsor.'
      },
      commonErrors: {
        title: 'Common Errors That Cause Delays or Denials',
        subtitle: 'Frequent problems when completing the I-864',
        text: 'Form I-864 is one of the documents that generates the most errors in family-based immigration cases. Even minor mistakes can result in Requests for Evidence (RFE) or case denial. These are the most frequent problems our attorneys observe in practice.',
        list: [
          'Miscalculating household size: Forgetting to include dependents, the beneficiary, or persons already sponsored under a previous I-864.',
          'Not including the correct tax returns: USCIS generally requires IRS tax transcripts from the most recent tax year, not just copies of tax returns.',
          'Not updating the form: If months pass between filing and the interview, income data may become outdated.',
          'Not signing the form or sending an incorrect version: USCIS rejects forms without original signatures or with obsolete versions.',
          'Confusing the I-864 with the I-864EZ: The simplified form (I-864EZ) only applies when the sponsor is the sole income contributor and is sponsoring a single person. Using it incorrectly generates denials.',
          'Not including evidence of U.S. domicile: The sponsor must demonstrate they live in the United States at the time of signing.',
          'Omitting the employment page or listing income inconsistent with tax returns.',
          'Filing an I-864 with joint sponsor data but without the joint sponsor signing their own complete form.'
        ],
        note: 'A single error on the I-864 can delay your case by months. It is advisable to have an immigration attorney review the form before submitting it.'
      },
      i864vs134: {
        title: 'Difference Between I-864 and I-134',
        subtitle: 'When each is used and what level of commitment they imply',
        text: 'Many people confuse Form I-864 with the I-134 (Declaration of Financial Support). Although both are declarations of financial support, they have fundamental differences regarding when they are used, what level of obligation they create, and what income standard applies.',
        cards: {
          binding: { title: 'Legal Nature', desc: 'I-864: Legally binding and enforceable contract. I-134: Declaration of intent, generally not enforceable in court.' },
          when864: { title: 'When is I-864 used', desc: 'At the adjustment of status (I-485) stage or consular processing for family-based permanent residency.' },
          when134: { title: 'When is I-134 used', desc: 'At the K-1 (fiancé) visa stage, K-3 visa, or as temporary financial support evidence for other visas.' },
          standard: { title: 'Income Standard', desc: 'I-864: 125% of poverty level. I-134: Generally 100% of poverty level (no fixed formal requirement).' },
          duration864: { title: 'I-864 Duration', desc: 'Until the beneficiary naturalizes or accumulates 40 work quarters. Does not end with divorce.' },
          duration134: { title: 'I-134 Duration', desc: 'Considered temporary. Covers only the stage for which it was filed (e.g., K-1 visa entry).' }
        },
        note: 'If you sponsor a fiancé(e) with a K-1 visa, you will first file the I-134 for the consulate. After the marriage and when applying for adjustment of status, you will need to file the I-864 with the higher 125% standard.'
      },
      faq: {
        title: 'Frequently Asked Questions',
        items: [
          {
            q: 'Does my spouse need to have a permanent job to sponsor me?',
            a: 'Not necessarily. USCIS accepts income from different sources: employment, self-employment, investments, pensions, social security, and even income from other household members with I-864A. The important thing is that total household income reaches 125% of the poverty level. However, if the sponsor has no regular income, the case will be more difficult and will likely need a joint sponsor or sufficient assets.'
          },
          {
            q: 'Can a friend or acquaintance be my joint sponsor?',
            a: 'Yes. The joint sponsor does not need to have a family relationship with the beneficiary or the primary sponsor. Any U.S. citizen or permanent resident, over 18 years old, domiciled in the United States, and who independently meets the minimum income, can sign as a joint sponsor. That person will assume the same legal obligation as the primary sponsor.'
          },
          {
            q: 'How many joint sponsors can I have?',
            a: 'You can only have one joint sponsor per beneficiary. However, if your petition includes derivatives (for example, children of the primary beneficiary), you can have a different joint sponsor for each derivative. The joint sponsor must meet the income requirement independently, without combining income with the primary sponsor.'
          },
          {
            q: 'If the beneficiary already works in the U.S., does that replace the I-864?',
            a: 'No. Form I-864 is mandatory regardless of the beneficiary\'s income. However, if the beneficiary already works legally in the United States and will maintain the same source of employment after obtaining residency, their income can be counted as part of the sponsor\'s household income. This may help reach the required minimum, but it does not eliminate the need to file the I-864.'
          },
          {
            q: 'How long does the I-864 obligation last?',
            a: 'The sponsor\'s obligation under the I-864 lasts until one of the following events occurs: the beneficiary becomes a U.S. citizen, the beneficiary accumulates 40 qualifying work quarters under Social Security (approximately 10 years of work), the beneficiary dies, or the sponsor dies. Important: the obligation does NOT end with divorce. The sponsor remains legally responsible even after divorcing the beneficiary.'
          }
        ]
      },
      conclusion: {
        title: 'Conclusion',
        text: 'Form I-864 is much more than a bureaucratic formality: it is a legal contract with real consequences that can last for years. Understanding who can sign, how to correctly calculate household size, what to do if income falls short, and the difference between the I-864 and I-134 can make the difference between a smooth approval and a delayed or denied case.',
        advice: 'If you are about to file an I-864 or need to find a joint sponsor, consult with an immigration attorney who can review your financial situation, ensure all forms are correct, and prevent errors that could cost you time and money.'
      },
      sources: {
        title: 'Sources Cited',
        list: [
          'USCIS – Form I-864P: HHS Poverty Guidelines for Affidavit of Support',
          'U.S. Department of State – Affidavit of Support FAQs',
          'U.S. Department of State – Affidavit of Support Overview',
          'USCIS – Instructions for Form I-864, Affidavit of Support'
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
      url: `${SITE_URL}/${lang}/blog/i-864-patrocinador-ingreso-minimo`,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: t.title,
        },
      ],
      type: 'article',
      publishedTime: '2025-04-30T08:00:00.000Z',
      authors: ['Manuel Solís'],
      section: 'Inmigración',
      tags: ['I-864', 'Affidavit of Support', 'Patrocinador', 'Ingreso Mínimo', 'Inmigración'],
    },
    twitter: {
      card: 'summary_large_image',
      title: t.title,
      description: t.metaDesc,
      images: [imageUrl],
      creator: '@AbogadoMSolis',
    },
    alternates: {
      canonical: `${SITE_URL}/${lang}/blog/i-864-patrocinador-ingreso-minimo`,
      languages: {
        'es': `${SITE_URL}/es/blog/i-864-patrocinador-ingreso-minimo`,
        'en': `${SITE_URL}/en/blog/i-864-patrocinador-ingreso-minimo`,
        'x-default': `${SITE_URL}/es/blog/i-864-patrocinador-ingreso-minimo`,
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
    { name: t.title, url: `/${lang}/blog/i-864-patrocinador-ingreso-minimo` },
  ]);

  return (
    <>
      <BlogSchema
        title={blogContent[lang as 'es' | 'en']?.metaTitle || blogContent.es.metaTitle}
        description={blogContent[lang as 'es' | 'en']?.metaDesc || blogContent.es.metaDesc}
        slug="i-864-patrocinador-ingreso-minimo"
        date="2025-04-30"
        image={IMAGES.article}
        lang={lang as string}
        readTime="10"
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
                     alt="Formulario I-864 Affidavit of Support patrocinador"
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

                  {/* Sección 1: Qué es el I-864 */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mt-0 mb-6 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><FileText size={24} className="text-[#B2904D]" /></div>
                      {t.sections.whatIs.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.whatIs.subtitle}</p>
                    <p className="mb-4">{t.sections.whatIs.text}</p>
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.whatIs.list.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <CheckCircle2 size={24} className="text-green-400 shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.whatIs.note}
                    </div>
                  </section>

                  {/* Sección 2: Quién puede ser patrocinador */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mb-2 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><Users size={24} className="text-[#B2904D]" /></div>
                      {t.sections.whoCanSign.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.whoCanSign.subtitle}</p>
                    <p className="mb-4">{t.sections.whoCanSign.text}</p>
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.whoCanSign.list.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <CheckCircle2 size={24} className="text-green-400 shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.whoCanSign.note}
                    </div>
                  </section>

                  {/* Imagen interior 1 */}
                  <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-xl group">
                     <Image
                       src={IMAGES.inside1}
                       alt="Tabla ingreso mínimo I-864 2025"
                       fill
                       className="object-cover transition-transform duration-1000 group-hover:scale-105"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-[#001540] via-transparent to-transparent opacity-20" />
                  </div>

                  {/* Sección 3: Tabla de ingreso mínimo */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mb-2 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><DollarSign size={24} className="text-[#B2904D]" /></div>
                      {t.sections.incomeTable.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.incomeTable.subtitle}</p>
                    <p className="mb-4">{t.sections.incomeTable.text}</p>
                    <div className="grid md:grid-cols-2 gap-4 my-8">
                      {Object.entries(t.sections.incomeTable.cards).map(([key, card]) => (
                        <div key={key} className="p-5 bg-[#000a20] rounded-xl border border-white/10">
                          <span className="font-bold text-white block mb-2">{card.title}</span>
                          <span className="text-sm text-blue-50/70">{card.desc}</span>
                        </div>
                      ))}
                    </div>
                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.incomeTable.note}
                    </div>
                  </section>

                  {/* Sección 4: Qué hacer si no ganas suficiente */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mb-2 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><Lightbulb size={24} className="text-[#B2904D]" /></div>
                      {t.sections.notEnough.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.notEnough.subtitle}</p>
                    <p className="mb-4">{t.sections.notEnough.text}</p>
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.notEnough.list.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <CheckCircle2 size={24} className="text-green-400 shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.notEnough.note}
                    </div>
                  </section>

                  {/* Sección 5: Errores comunes */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mb-2 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><AlertTriangle size={24} className="text-[#B2904D]" /></div>
                      {t.sections.commonErrors.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.commonErrors.subtitle}</p>
                    <p className="mb-4">{t.sections.commonErrors.text}</p>
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.commonErrors.list.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-red-500/10">
                          <AlertCircle size={24} className="text-red-400 shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.commonErrors.note}
                    </div>
                  </section>

                  {/* Imagen interior 2 */}
                  <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-xl group">
                     <Image
                       src={IMAGES.inside2}
                       alt="I-864 vs I-134 comparación"
                       fill
                       className="object-cover transition-transform duration-1000 group-hover:scale-105"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-[#001540] via-transparent to-transparent opacity-20" />
                  </div>

                  {/* Sección 6: I-864 vs I-134 */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mb-2 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><Scale size={24} className="text-[#B2904D]" /></div>
                      {t.sections.i864vs134.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.i864vs134.subtitle}</p>
                    <p className="mb-4">{t.sections.i864vs134.text}</p>
                    <div className="grid md:grid-cols-2 gap-4 my-8">
                      {Object.entries(t.sections.i864vs134.cards).map(([key, card]) => (
                        <div key={key} className="p-5 bg-[#000a20] rounded-xl border border-white/10">
                          <span className="font-bold text-white block mb-2">{card.title}</span>
                          <span className="text-sm text-blue-50/70">{card.desc}</span>
                        </div>
                      ))}
                    </div>
                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.i864vs134.note}
                    </div>
                  </section>

                  {/* FAQ */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mb-8 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><HelpCircle size={24} className="text-[#B2904D]" /></div>
                      {t.sections.faq.title}
                    </h2>
                    <div className="grid gap-6">
                      {t.sections.faq.items.map((item, i) => (
                        <div key={i} className="p-6 bg-[#000a20] rounded-2xl border border-white/10">
                          <p className="font-bold text-white mb-3 text-lg">P: {item.q}</p>
                          <p className="text-blue-50/70">{item.a}</p>
                        </div>
                      ))}
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
            articles={getRelatedArticles('i-864-patrocinador-ingreso-minimo', (lang as 'es' | 'en') || 'es')}
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
