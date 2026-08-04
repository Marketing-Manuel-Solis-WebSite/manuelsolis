import React from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import ContactForm from '../../components/ContactForm'
import Image from 'next/image'
import {
  MessageSquare, Mail, Phone, MapPin, FileText, UserCheck, Server, Globe,
  Cookie, Megaphone, SlidersHorizontal
} from 'lucide-react'


// --- TEXTOS UI (PRIVACIDAD ACTUALIZADA) ---
const interfaceTexts = {
  hero: {
    title: { es: 'POLÍTICA DE PRIVACIDAD', en: 'PRIVACY POLICY' },
    subtitle: { es: 'Proteger su información privada es nuestra prioridad.', en: 'Protecting your private information is our priority.' },
    lastUpdated: { es: 'Última actualización: 4 de agosto de 2026', en: 'Last updated: August 4, 2026' },
  },
  generalStatement: {
    es: 'La Oficina Legal de Manuel Solís ("nosotros", "nuestro" o "nos") se compromete a proteger su privacidad. Esta Política de Privacidad explica cómo recopilamos, usamos, divulgamos y salvaguardamos su información cuando visita nuestro sitio web, envía formularios, se comunica con nuestra oficina o participa en nuestro programa de mensajería SMS/texto. Al utilizar nuestro sitio web o optar por recibir mensajes SMS, usted acepta las prácticas descritas en esta Política de Privacidad.',
    en: 'The Law Office of Manuel Solís ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, submit forms, communicate with our office, or participate in our SMS/text messaging program. By using our website or opting in to receive SMS messages, you consent to the practices described in this Privacy Policy.'
  },

  // 1. Información que Recopilamos
  section1: {
    title: { es: '1. Información que Recopilamos', en: '1. Information We Collect' },
    A: {
      title: { es: 'A. Información Personal', en: 'A. Personal Information' },
      intro: { es: 'Proporcionada directamente por usted, como:', en: 'Provided directly by you, such as:' },
      items: [
        { es: 'Nombre', en: 'Name' },
        { es: 'Dirección de correo electrónico', en: 'Email address' },
        { es: 'Número de teléfono', en: 'Phone number' },
        { es: 'Dirección postal', en: 'Mailing address' },
        { es: 'Información relacionada con el caso', en: 'Case-related information' },
        { es: 'Cualquier información enviada a través de formularios de nuestro sitio web o programa SMS', en: 'Any information submitted through our website forms or SMS program' },
      ]
    },
    B: {
      title: { es: 'B. Información Recopilada Automáticamente', en: 'B. Automatically Collected Information' },
      intro: { es: 'Cuando visita nuestro sitio web, podemos recopilar automáticamente:', en: 'When you visit our website, we may automatically collect:' },
      items: [
        { es: 'Dirección IP', en: 'IP address' },
        { es: 'Tipo y versión de navegador', en: 'Browser type and version' },
        { es: 'Información del dispositivo', en: 'Device information' },
        { es: 'Páginas vistas', en: 'Pages viewed' },
        { es: 'Cookies e identificadores de seguimiento', en: 'Cookies and tracking identifiers' },
      ],
      note: { es: 'Esta información nos ayuda a mantener la seguridad, funcionalidad y rendimiento del sitio web. Parte de ella también se comparte con las plataformas de publicidad y analítica descritas en la Sección 5.', en: 'This information helps us maintain website security, functionality, and performance. Some of it is also shared with the advertising and analytics platforms described in Section 5.' }
    },
    C: {
      title: { es: 'C. Información de Mensajería SMS/Texto', en: 'C. SMS/Text Messaging Information' },
      intro: { es: 'Si se inscribe en nuestro programa de notificaciones SMS, recopilamos:', en: 'If you enroll in our SMS notifications program, we collect:' },
      items: [
        { es: 'Número de teléfono móvil', en: 'Mobile phone number' },
        { es: 'Actividad de mensajería (altas, bajas, respuestas)', en: 'Messaging activity (opt-ins, opt-outs, responses)' },
        { es: 'Registros de estado de entrega', en: 'Delivery status records' },
      ],
      note: { es: 'No recopilamos información personal sensible a través de SMS.', en: 'We do not collect sensitive personal information through SMS.' }
    }
  },

  // 2. Cómo Usamos Su Información
  section2: {
    title: { es: '2. Cómo Usamos Su Información', en: '2. How We Use Your Information' },
    intro: { es: 'Utilizamos la información que recopilamos para:', en: 'We use the information we collect for:' },
    items: [
      { es: 'Responder a consultas sobre servicios de inmigración', en: 'Respond to immigration service inquiries' },
      { es: 'Programar consultas', en: 'Schedule consultations' },
      { es: 'Enviar recordatorios de citas', en: 'Send appointment reminders' },
      { es: 'Solicitar documentos', en: 'Request documents' },
      { es: 'Proporcionar actualizaciones de casos', en: 'Provide case updates' },
      { es: 'Operar y mejorar nuestro sitio web', en: 'Operating and improving our website' },
      { es: 'Cumplir con obligaciones legales y éticas', en: 'Complying with legal and ethical obligations' },
      { es: 'Mantener una comunicación segura con el cliente', en: 'Maintaining secure client communication' },
    ],
    note: { es: 'No vendemos su información personal. Para medir el rendimiento de nuestra publicidad y de nuestro sitio web, sí compartimos datos técnicos y de navegación —como su dirección IP, la identificación de su navegador y cookies publicitarias— con plataformas de anuncios y de analítica. La Sección 5 detalla cuáles son y qué reciben.', en: 'We do not sell your personal information. To measure the performance of our advertising and our website, we do share technical and browsing data — such as your IP address, your browser identification, and advertising cookies — with advertising and analytics platforms. Section 5 details which ones they are and what they receive.' }
  },

  // 3. Programa SMS/Texto
  section3: {
    title: { es: '3. Programa de Mensajería SMS/Texto', en: '3. SMS/Text Messaging Program' },
    intro: { es: 'Si elige participar en nuestro programa de comunicación por SMS:', en: 'If you choose to opt in to our SMS communication program:' },
    A: {
      title: { es: 'A. Propósito del Mensaje', en: 'A. Message Purpose' },
      items: [
        { es: 'Responder a consultas sobre servicios de inmigración', en: 'Respond to immigration service inquiries' },
        { es: 'Programar consultas', en: 'Schedule consultations' },
        { es: 'Enviar recordatorios de citas', en: 'Send appointment reminders' },
        { es: 'Solicitar documentos', en: 'Request documents' },
        { es: 'Proporcionar actualizaciones de casos', en: 'Provide case updates' },
      ]
    },
    B: {
      title: { es: 'B. Instrucciones para Cancelar (Opt-Out)', en: 'B. Opt-Out Instructions' },
      content: { es: 'Puede optar por no participar en cualquier momento enviando un mensaje de texto con la palabra **STOP**. Puede solicitar ayuda en cualquier momento enviando un mensaje de texto con la palabra **HELP**.', en: 'You may opt out at any time by texting **STOP**. You may request help at any time by texting **HELP**.' }
    },
    C: {
      title: { es: 'C. Tarifas de Mensajes y Datos', en: 'C. Message and Data Rates' },
      content: { es: 'Se pueden aplicar tarifas de mensajes y datos según su plan de telefonía móvil.', en: 'Message and data rates may apply depending on your wireless plan.' }
    },
    D: {
      title: { es: 'D. Responsabilidad del Operador', en: 'D. Carrier Liability' },
      content: { es: 'Los operadores de telefonía inalámbrica no son responsables por mensajes retrasados o no entregados.', en: 'Wireless carriers are not liable for delayed or undelivered messages.' }
    }
  },

  // 4. Cómo Compartimos Su Información
  section4: {
    title: { es: '4. Cómo Compartimos Su Información', en: '4. How We Share Your Information' },
    intro: { es: 'Podemos compartir su información solo en las siguientes circunstancias limitadas:', en: 'We may share your information only in the following limited circumstances:' },
    A: {
      title: { es: 'A. Con Proveedores de Servicios', en: 'A. With Service Providers' },
      intro: { es: 'Proveedores externos de confianza que nos ayudan a:', en: 'Trusted third-party vendors that help us:' },
      items: [
        { es: 'Enviar mensajes SMS', en: 'Send SMS messages' },
        { es: 'Alojar y asegurar los datos del sitio web', en: 'Host and secure website data' },
        { es: 'Gestionar las comunicaciones con el cliente', en: 'Manage client communications' },
      ],
      note: { es: 'Todos los proveedores están obligados a proteger su información y no pueden usarla para ningún otro propósito que no sea proporcionar servicios a nuestra firma.', en: 'All providers are required to protect your information and may not use it for any purpose other than providing services to our firm.' }
    },
    B: {
      title: { es: 'B. Requisitos Legales o Éticos', en: 'B. Legal or Ethical Requirements' },
      intro: { es: 'Podemos divulgar su información si es requerido:', en: 'We may disclose your information if required:' },
      items: [
        { es: 'Por ley', en: 'By law' },
        { es: 'Para cumplir con órdenes judiciales', en: 'To comply with court orders' },
        { es: 'Para proteger sus derechos o seguridad', en: 'To protect your rights or safety' },
        { es: 'Para cumplir con las obligaciones éticas del abogado', en: 'To meet attorney ethical obligations' },
      ],
      note: { es: '**NO** hacemos: Vender su información. Divulgar los detalles de su caso o sus comunicaciones con un abogado sin su autorización. Enviar su nombre, correo electrónico o número de teléfono a plataformas de publicidad.', en: 'We do **NOT**: Sell your information. Disclose the details of your case or your communications with an attorney without your authorization. Send your name, email address, or phone number to advertising platforms.' },
      noteAdvertising: { es: '**SÍ** compartimos datos técnicos y de navegación con plataformas de publicidad y analítica para medir nuestras campañas y el uso del sitio. La Sección 5 detalla cada plataforma y los datos que recibe.', en: 'We **DO** share technical and browsing data with advertising and analytics platforms to measure our campaigns and site usage. Section 5 details each platform and the data it receives.' }
    }
  },

  // 5. Cookies, Píxeles y Terceros
  section5: {
    title: { es: '5. Cookies, Píxeles y Terceros', en: '5. Cookies, Pixels, and Third Parties' },
    intro: { es: 'Nuestro sitio web usa cookies propias y de terceros, además de píxeles de medición. A continuación explicamos cuáles son, qué datos recibe cada tercero y con qué finalidad.', en: 'Our website uses first-party and third-party cookies, as well as measurement pixels. Below we explain which ones they are, what data each third party receives, and for what purpose.' },
    A: {
      title: { es: 'A. Cookies y Tecnologías Similares', en: 'A. Cookies and Similar Technologies' },
      intro: { es: 'Cuando navega el sitio se pueden guardar en su dispositivo:', en: 'When you browse the site, the following may be stored on your device:' },
      items: [
        { es: '**Cookies de funcionamiento:** recuerdan su preferencia de idioma (cookie NEXT_LOCALE) y mantienen la seguridad del sitio.', en: '**Functional cookies:** remember your language preference (NEXT_LOCALE cookie) and keep the site secure.' },
        { es: '**Cookie propia de atribución (msl_attr):** registra cómo llegó a nuestro sitio —fuente, medio, campaña y, si viene de un anuncio, el identificador de clic— para saber qué campañas generan consultas.', en: '**Our own attribution cookie (msl_attr):** records how you reached our site — source, medium, campaign and, if you came from an ad, the click identifier — so we can tell which campaigns generate inquiries.' },
        { es: '**Identificador de sesión:** un número aleatorio guardado en el almacenamiento de sesión de su navegador que agrupa las páginas de una misma visita. Se borra al cerrar la pestaña.', en: '**Session identifier:** a random number stored in your browser\'s session storage that groups the pages of a single visit. It is deleted when you close the tab.' },
        { es: '**Cookies de terceros:** las fijan Meta (_fbp y _fbc), Google Analytics y TikTok cuando cargan sus píxeles.', en: '**Third-party cookies:** set by Meta (_fbp and _fbc), Google Analytics, and TikTok when their pixels load.' },
      ],
      note: { es: 'Puede borrar o bloquear cookies desde la configuración de su navegador. El sitio seguirá funcionando, aunque algunas funciones pueden verse limitadas.', en: 'You can delete or block cookies from your browser settings. The site will still work, though some features may be limited.' }
    },
    B: {
      title: { es: 'B. Plataformas de Publicidad y Analítica', en: 'B. Advertising and Analytics Platforms' },
      intro: { es: 'Compartimos datos técnicos y de navegación —no su nombre, correo electrónico ni teléfono— con las siguientes plataformas:', en: 'We share technical and browsing data — not your name, email address, or phone number — with the following platforms:' },
      items: [
        { es: '**Meta (Facebook e Instagram):** a través del píxel que carga en su navegador y también desde nuestro servidor mediante la Conversions API. Meta recibe su dirección IP, la identificación de su navegador (user agent), la dirección de la página visitada y las cookies publicitarias _fbp y _fbc. Finalidad: medir las visitas y conversiones atribuibles a nuestros anuncios.', en: '**Meta (Facebook and Instagram):** through the pixel that loads in your browser and also from our server via the Conversions API. Meta receives your IP address, your browser identification (user agent), the address of the page visited, and the _fbp and _fbc advertising cookies. Purpose: to measure visits and conversions attributable to our ads.' },
        { es: '**Google (Google Analytics 4):** páginas vistas, dirección IP, tipo de dispositivo y navegador, idioma y el sitio desde el que llegó. Finalidad: analítica de uso del sitio web.', en: '**Google (Google Analytics 4):** pages viewed, IP address, device and browser type, language, and the site you came from. Purpose: website usage analytics.' },
        { es: '**TikTok (TikTok Pixel):** datos de navegación y de dispositivo equivalentes. Finalidad: medir el rendimiento de nuestros anuncios en TikTok.', en: '**TikTok (TikTok Pixel):** equivalent browsing and device data. Purpose: to measure the performance of our advertising on TikTok.' },
        { es: '**Eventos de conversión:** cuando envía un formulario o pulsa un botón de llamada o de WhatsApp, avisamos a estas plataformas de que ocurrió una conversión. Ese aviso indica el tipo de acción, nunca el contenido de su consulta ni sus datos de contacto.', en: '**Conversion events:** when you submit a form or tap a call or WhatsApp button, we notify these platforms that a conversion occurred. That notice indicates the type of action, never the content of your inquiry or your contact details.' },
      ],
      note: { es: 'Estas plataformas tratan los datos conforme a sus propias políticas de privacidad y pueden combinar estos identificadores con la información que ya tienen de usted. No les enviamos información sobre su caso.', en: 'These platforms process the data under their own privacy policies and may combine these identifiers with information they already hold about you. We do not send them any information about your case.' }
    },
    C: {
      title: { es: 'C. Proveedores de Tecnología y Contenido Incrustado', en: 'C. Technology Providers and Embedded Content' },
      intro: { es: 'Para operar el sitio y sus funciones recurrimos a:', en: 'To operate the site and its features, we rely on:' },
      items: [
        { es: '**Google (Gemini):** los mensajes que escribe en el asistente virtual del sitio se procesan con el modelo Gemini de Google para generar la respuesta. Le pedimos no compartir por ese canal documentos ni detalles sensibles de su caso: para eso use el teléfono, el correo electrónico o una consulta con un abogado.', en: '**Google (Gemini):** the messages you type into the site\'s virtual assistant are processed with Google\'s Gemini model to generate the reply. Please do not share documents or sensitive case details through that channel: for that, use the phone, email, or a consultation with an attorney.' },
        { es: '**Vercel:** aloja el sitio web y nos proporciona analítica de uso y de rendimiento de las páginas.', en: '**Vercel:** hosts the website and provides us with page usage and performance analytics.' },
        { es: '**Resend:** envía los correos electrónicos del sitio, incluidos los del boletín, y administra la lista de suscriptores.', en: '**Resend:** sends the site\'s emails, including newsletter emails, and manages the subscriber list.' },
        { es: '**Google Maps y YouTube:** algunas páginas incluyen mapas y videos incrustados. Al cargarlos, Google puede recibir su dirección IP y datos de su navegador.', en: '**Google Maps and YouTube:** some pages include embedded maps and videos. When they load, Google may receive your IP address and browser data.' },
      ],
      note: { es: 'Los proveedores de esta lista tratan los datos para prestarnos el servicio descrito. Los proveedores de mensajería SMS y de comunicación con el cliente se describen en la Sección 4.A.', en: 'The providers in this list process data in order to provide us with the service described. SMS messaging and client communication providers are described in Section 4.A.' }
    },
    D: {
      title: { es: 'D. Sus Opciones', en: 'D. Your Choices' },
      intro: { es: 'En cuanto a cookies y publicidad, usted puede:', en: 'Regarding cookies and advertising, you may:' },
      items: [
        { es: 'Borrar o bloquear las cookies, incluidas las de terceros, desde la configuración de su navegador.', en: 'Delete or block cookies, including third-party cookies, from your browser settings.' },
        { es: 'Ajustar sus preferencias de anuncios directamente en su cuenta de Meta, Google o TikTok.', en: 'Adjust your advertising preferences directly in your Meta, Google, or TikTok account.' },
        { es: 'Pedirnos que dejemos de usar sus identificadores con fines de publicidad dirigida, por los medios indicados en la Sección 8.', en: 'Ask us to stop using your identifiers for targeted advertising purposes, through the channels listed in Section 8.' },
        { es: 'Si es residente de Texas, ejercer los derechos que le reconoce la ley de privacidad de datos del estado, incluida la oposición al uso de sus datos para publicidad dirigida.', en: 'If you are a Texas resident, exercise the rights granted to you by the state\'s data privacy law, including objecting to the use of your data for targeted advertising.' },
      ],
      note: { es: 'Actualmente el sitio no muestra un banner de consentimiento: las cookies y píxeles descritos se cargan cuando visita el sitio. Puede limitarlos con los controles de su navegador o solicitándonoslo por los medios indicados arriba.', en: 'The site does not currently display a consent banner: the cookies and pixels described here load when you visit the site. You can limit them using your browser controls or by requesting it from us through the channels listed above.' }
    }
  },

  // 6. Seguridad de Datos
  section6: {
    title: { es: '6. Seguridad de Datos', en: '6. Data Security' },
    content1: { es: 'Implementamos salvaguardas administrativas, técnicas y físicas para proteger su información, incluyendo:', en: 'We implement administrative, technical, and physical safeguards to protect your information, including:' },
    items: [
      { es: 'Canales de comunicación cifrados', en: 'Encrypted communication channels' },
      { es: 'Almacenamiento de datos seguro', en: 'Secure data storage' },
      { es: 'Controles de acceso limitado', en: 'Limited access controls' },
      { es: 'Cumplimiento de los requisitos de confidencialidad abogado-cliente', en: 'Compliance with attorney-client confidentiality requirements' },
    ],
    content2: { es: 'Aunque tomamos medidas razonables para proteger sus datos, ningún método de transmisión es 100% seguro.', en: 'While we take reasonable measures to protect your data, no method of transmission is 100% secure.' }
  },

  // 7. Retención de Datos
  section7: {
    title: { es: '7. Retención de Datos', en: '7. Data Retention' },
    content1: { es: 'Retenemos la información solo el tiempo necesario para:', en: 'We retain information only as long as necessary to:' },
    items: [
      { es: 'Proporcionar servicios', en: 'Provide services' },
      { es: 'Cumplir con obligaciones legales', en: 'Comply with legal obligations' },
      { es: 'Resolver disputas', en: 'Resolve disputes' },
      { es: 'Mantener registros legales precisos', en: 'Maintain accurate legal records' },
    ],
    content2: { es: 'Los datos relacionados con SMS se conservan de acuerdo con nuestros requisitos de comunicación y cumplimiento.', en: 'SMS-related data is retained in accordance with our communication and compliance requirements.' }
  },

  // 8. Sus Derechos y Opciones
  section8: {
    title: { es: '8. Sus Derechos y Opciones', en: '8. Your Rights and Choices' },
    intro: { es: 'Usted puede:', en: 'You may:' },
    items: [
      { es: 'Optar por no recibir mensajes SMS en cualquier momento enviando un mensaje de texto con la palabra **STOP**', en: 'Opt out of SMS messages at any time by texting **STOP**' },
      { es: 'Solicitar acceso a la información que tenemos sobre usted', en: 'Request access to the information we have about you' },
      { es: 'Solicitar correcciones a su información', en: 'Request corrections to your information' },
      { es: 'Solicitar la eliminación de datos que no sean de registro legal', en: 'Request deletion of non-legal record data' },
      { es: 'Negarse a proporcionar cierta información (aunque esto puede limitar nuestros servicios)', en: 'Decline to provide certain information (though this may limit our services)' },
    ],
    contact: { es: 'Para ejercer sus derechos, contáctenos en:', en: 'To exercise your rights, contact us at:' },
    email: 'support@manuelsolis.com',
    phone: '713-844-2700'
  },

  // 9. Enlaces de Terceros
  section9: {
    title: { es: '9. Enlaces de Terceros', en: '9. Third-Party Links' },
    content: { es: 'Nuestro sitio web puede contener enlaces a sitios externos. No somos responsables de las prácticas de privacidad o el contenido de los sitios web de terceros.', en: 'Our website may contain links to external sites. We are not responsible for the privacy practices or content of third-party websites.' }
  },

  // 10. Privacidad de los Niños
  section10: {
    title: { es: '10. Privacidad de los Niños', en: '10. Children\'s Privacy' },
    content: { es: 'Nuestro sitio web y servicios SMS no están dirigidos a niños menores de 13 años. No recopilamos a sabiendas información de niños sin el consentimiento de los padres.', en: 'Our website and SMS services are not directed to children under 13. We do not knowingly collect information from children without parental consent.' }
  },

  // 11. Cambios a Esta Política
  section11: {
    title: { es: '11. Cambios a Esta Política', en: '11. Changes to This Policy' },
    content: { es: 'Podemos actualizar esta Política de Privacidad de vez en cuando. Las versiones revisadas se publicarán en esta página con una fecha de "Última Actualización" actualizada.', en: 'We may update this Privacy Policy from time to time. Revised versions will be posted on this page with an updated "Last Updated" date.' }
  },

  // 12. Contacto
  section12: {
    title: { es: '12. Contáctenos', en: '12. Contact Us' },
    intro: { es: 'Si tiene preguntas sobre esta Política de Privacidad o nuestras prácticas de datos, puede contactarnos en:', en: 'If you have questions about this Privacy Policy or our data practices, you may contact us at:' },
    phone: '713-844-2700',
    email: 'support@manuelsolis.com',
    address: '6657 Navigation Blvd Houston, Texas 77011',
  }
};

// --- UTILIDADES ---
// Función para procesar el texto con Markdown y saltos de línea
const parseContent = (text: string) => {
  // Bolding
  let parsed = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  // Newlines to breaks
  parsed = parsed.replace(/\n/g, '<br />');
  // Simple wrapping in <p> for paragraphs (handles double breaks as paragraph separation)
  parsed = parsed.split('<br /><br />').map(p => `<p>${p}</p>`).join('');
  return parsed;
};

// Variante sin envoltura en <p>: para texto dentro de un <li>, donde un
// bloque dejaría la viñeta sola en su propia línea (list-style-position: inside).
const parseInline = (text: string) => text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

// --- COMPONENTE TÍTULO DE SECCIÓN ---
const SectionTitle = ({ title }: { title: string }) => (
  <div className="mb-8 flex items-center gap-4">
    <div className="h-px bg-gradient-to-r from-transparent via-[#B2904D] to-transparent w-full opacity-50 hidden md:block"></div>
    <h2 className="text-2xl md:text-3xl font-light text-white whitespace-nowrap drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
      {title}
    </h2>
    <div className="h-px bg-gradient-to-r from-transparent via-[#B2904D] to-transparent w-full opacity-50 hidden md:block"></div>
  </div>
);

// --- PÁGINA DE PRIVACIDAD ---
export default function PrivacidadClient({ lang }: { lang: 'es' | 'en' }) {
  // Función 't' robusta para evitar errores de undefined
  const t = (key: string): string => {
    const parts = key.split('.');
    let current: any = interfaceTexts;
    for (const part of parts) {
      if (current && current[part]) current = current[part];
      else return '';
    }
    if (typeof current === 'object' && (current.es || current.en)) return current[lang] || current.es || '';
    if (typeof current === 'string') return current;
    return '';
  };

  const parseText = (key: string) => parseContent(t(key));

  return (
    <main className={`relative min-h-screen w-full bg-[#001540] text-white overflow-x-hidden`}>
      <Header />

      {/* =========================================================================
          FONDO (Fixed - Cubre toda la página) — orbes estáticos
      ========================================================================= */}
      <div className="fixed inset-0 z-0 w-full h-full bg-[#001540]">
          {/* Gradiente Azul Profundo */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#002868] via-[#001540] to-[#000a20]" />

          {/* Ruido de textura */}
          <div className="absolute inset-0 opacity-[0.06] mix-blend-overlay" style={{ backgroundImage: 'url(/noise.png)', backgroundRepeat: 'repeat' }}></div>

          {/* Orbes de luz (estáticos) */}
          <div className="absolute top-[-10%] right-[-5%] w-[50vw] h-[50vw] bg-blue-600/10 rounded-full blur-[120px] opacity-40" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-sky-800/10 rounded-full blur-[150px] opacity-30" />

          {/* Texto de Fondo Sutil (estático) */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none select-none overflow-hidden">
            <span className="text-[80vh] font-black italic text-white tracking-tighter whitespace-nowrap">
                PRIVACIDAD
            </span>
          </div>
      </div>

      {/* =========================================================================
          CONTENIDO
      ========================================================================= */}

      {/* --- HERO SECTION (static — LCP) --- */}
      <section className="relative pt-64 pb-16 z-10 px-6 lg:px-12">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-12 gap-12 items-center">

            {/* IZQUIERDA: IMAGEN LOGO INFORMACION */}
            <div className="lg:col-span-5 relative flex items-center justify-center h-[300px] lg:h-[400px]">
              <div className="absolute inset-0 bg-[#B2904D]/10 blur-[80px] rounded-full z-0" />

              <div className="relative z-10 w-full h-full flex items-center justify-center">
                  <Image
                      src="/LogoInformacion.png"
                      alt="Law Offices of Manuel Solis"
                      width={600}
                      height={600}
                      className="object-contain drop-shadow-[0_0_30px_rgba(178,144,77,0.3)] hover:scale-105 transition-transform duration-700"
                      priority
                  />
              </div>
            </div>

            {/* DERECHA: TÍTULO Y SUBTÍTULO */}
            <div className="lg:col-span-7 space-y-8 pl-0 lg:pl-10 relative z-20">

              <div className="relative">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-thin text-white tracking-tight leading-none">
                  <span className="block text-white/90 font-extralight mb-2">
                    {t('hero.title').split(' ')[0]}
                  </span>
                  <span className="block font-medium text-[#B2904D] drop-shadow-2xl">
                    {t('hero.title').split(' ').slice(1).join(' ')}
                  </span>
                </h1>
              </div>

              <div className="relative pl-6 border-l-2 border-[#B2904D]/50">
                <p className="text-xl md:text-2xl text-white/80 font-light leading-relaxed">
                  {t('hero.subtitle')}
                </p>
                <p className="text-sm mt-2 text-white/50">{t('hero.lastUpdated')}</p>
              </div>

              <div className="text-base md:text-lg text-blue-100/70 font-light leading-relaxed space-y-4 bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm shadow-xl">
                 <div dangerouslySetInnerHTML={{ __html: parseContent(t('generalStatement')) }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECCIÓN PRINCIPAL DE POLÍTICA DE PRIVACIDAD --- */}
      <section className="container mx-auto px-4 py-20 relative z-10 max-w-7xl space-y-24">

        {/* SECCIÓN 1: INFORMACIÓN QUE RECOPILAMOS */}
        <div>
            <SectionTitle title={t('section1.title')} />
            <div className="p-8 bg-white/5 rounded-2xl border border-white/10 space-y-8 shadow-xl">

                {/* A. Personal Information */}
                <div className="p-6 bg-[#001026] rounded-xl border border-[#B2904D]/20">
                    <h3 className="text-xl font-bold text-[#B2904D] mb-4 flex items-center gap-2"><UserCheck size={20}/> {t('section1.A.title')}</h3>
                    <p className="text-base text-blue-100/80 mb-4">{t('section1.A.intro')}</p>
                    <ul className="text-sm list-disc list-inside space-y-3 pl-4">
                        {interfaceTexts.section1.A.items.map((item, index) => (
                            <li key={index} className="text-white/80">{item[lang] || item.es}</li>
                        ))}
                    </ul>
                </div>

                {/* B. Automatically Collected Information */}
                <div className="p-6 bg-[#001026] rounded-xl border border-white/10">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><Globe size={20}/> {t('section1.B.title')}</h3>
                    <p className="text-base text-blue-100/80 mb-4">{t('section1.B.intro')}</p>
                    <ul className="text-sm list-disc list-inside space-y-3 pl-4">
                        {interfaceTexts.section1.B.items.map((item, index) => (
                            <li key={index} className="text-white/80">{item[lang] || item.es}</li>
                        ))}
                    </ul>
                    <p className="text-xs pt-4 text-white/50">{t('section1.B.note')}</p>
                </div>

                {/* C. SMS/Text Messaging Information */}
                <div className="p-6 bg-[#001026] rounded-xl border border-white/10">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><MessageSquare size={20}/> {t('section1.C.title')}</h3>
                    <p className="text-base text-blue-100/80 mb-4">{t('section1.C.intro')}</p>
                    <ul className="text-sm list-disc list-inside space-y-3 pl-4">
                        {interfaceTexts.section1.C.items.map((item, index) => (
                            <li key={index} className="text-white/80">{item[lang] || item.es}</li>
                        ))}
                    </ul>
                    <p className="text-xs pt-4 text-orange-300/80">{t('section1.C.note')}</p>
                </div>
            </div>
        </div>

        {/* SECCIÓN 2: USO DE INFORMACIÓN */}
        <div>
            <SectionTitle title={t('section2.title')} />
            <div className="p-8 bg-[#000814]/60 rounded-2xl border border-white/10 space-y-6 shadow-lg">
                <p className="text-base text-blue-100/80 mb-6">{t('section2.intro')}</p>
                <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
                    {interfaceTexts.section2.items.map((item, index) => (
                        <div key={index} className="flex items-start gap-3 text-white/90">
                            <FileText size={18} className="text-[#B2904D] flex-shrink-0 mt-1"/>
                            <p className="text-base font-light">{item[lang] || item.es}</p>
                        </div>
                    ))}
                </div>
                <p className="text-sm pt-6 border-t border-white/10 text-orange-300/80 font-medium">{t('section2.note')}</p>
            </div>
        </div>

        {/* SECCIÓN 3: PROGRAMA SMS/TEXTO */}
        <div>
            <SectionTitle title={t('section3.title')} />
            <div className="p-8 bg-white/5 rounded-2xl border border-white/10 space-y-6 shadow-xl">
                <p className="text-base text-blue-100/80 mb-4">{t('section3.intro')}</p>

                {/* A. Purpose */}
                <div className="p-6 bg-[#001026] rounded-lg border border-white/10">
                    <h4 className="text-lg font-semibold text-white mb-4">{t('section3.A.title')}</h4>
                    <ul className="text-sm list-disc list-inside space-y-3 pl-4">
                        {interfaceTexts.section3.A.items.map((item, index) => (
                            <li key={index} className="text-white/80">{item[lang] || item.es}</li>
                        ))}
                    </ul>
                </div>

                {/* B. Opt-Out */}
                <div className="p-6 bg-[#001026] rounded-lg border border-red-500/30">
                    <h4 className="text-lg font-semibold text-white mb-3">{t('section3.B.title')}</h4>
                    <div className="text-base text-blue-100/80" dangerouslySetInnerHTML={{ __html: parseText('section3.B.content') }} />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* C. Rates */}
                    <div className="p-6 bg-[#001026] rounded-lg border border-white/10">
                        <h4 className="text-lg font-semibold text-white mb-3">{t('section3.C.title')}</h4>
                        <div className="text-sm text-blue-100/80" dangerouslySetInnerHTML={{ __html: parseText('section3.C.content') }} />
                    </div>
                    {/* D. Carrier */}
                    <div className="p-6 bg-[#001026] rounded-lg border border-white/10">
                        <h4 className="text-lg font-semibold text-white mb-3">{t('section3.D.title')}</h4>
                        <div className="text-sm text-blue-100/80" dangerouslySetInnerHTML={{ __html: parseText('section3.D.content') }} />
                    </div>
                </div>
            </div>
        </div>

        {/* SECCIÓN 4: CÓMO COMPARTIMOS SU INFORMACIÓN */}
        <div>
            <SectionTitle title={t('section4.title')} />
            <div className="p-8 bg-white/5 rounded-2xl border border-white/10 space-y-6 shadow-xl">
                <p className="text-base text-blue-100/80 mb-4">{t('section4.intro')}</p>

                {/* A. Service Providers */}
                <div className="p-6 bg-[#001026] rounded-xl border border-[#B2904D]/20">
                    <h3 className="text-xl font-bold text-[#B2904D] mb-4 flex items-center gap-2"><Server size={20}/> {t('section4.A.title')}</h3>
                    <p className="text-base text-blue-100/80 mb-4">{t('section4.A.intro')}</p>
                    <ul className="text-sm list-disc list-inside space-y-3 pl-4">
                        {interfaceTexts.section4.A.items.map((item, index) => (
                            <li key={index} className="text-white/80">{item[lang] || item.es}</li>
                        ))}
                    </ul>
                    <p className="text-xs pt-4 text-orange-300/80">{t('section4.A.note')}</p>
                </div>

                {/* B. Legal Requirements */}
                <div className="p-6 bg-[#001026] rounded-xl border border-white/10">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><FileText size={20}/> {t('section4.B.title')}</h3>
                    <p className="text-base text-blue-100/80 mb-4">{t('section4.B.intro')}</p>
                    <ul className="text-sm list-disc list-inside space-y-3 pl-4">
                        {interfaceTexts.section4.B.items.map((item, index) => (
                            <li key={index} className="text-white/80">{item[lang] || item.es}</li>
                        ))}
                    </ul>
                    <p className="text-sm pt-4 font-semibold text-red-400/90" dangerouslySetInnerHTML={{ __html: parseText('section4.B.note') }} />
                    <p className="text-sm pt-3 text-orange-300/80" dangerouslySetInnerHTML={{ __html: parseText('section4.B.noteAdvertising') }} />
                </div>
            </div>
        </div>

        {/* SECCIÓN 5: COOKIES, PÍXELES Y TERCEROS */}
        <div>
            <SectionTitle title={t('section5.title')} />
            <div className="p-8 bg-white/5 rounded-2xl border border-white/10 space-y-6 shadow-xl">
                <p className="text-base text-blue-100/80 mb-4">{t('section5.intro')}</p>

                {/* A. Cookies */}
                <div className="p-6 bg-[#001026] rounded-xl border border-white/10">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><Cookie size={20}/> {t('section5.A.title')}</h3>
                    <p className="text-base text-blue-100/80 mb-4">{t('section5.A.intro')}</p>
                    <ul className="text-sm list-disc list-inside space-y-3 pl-4">
                        {interfaceTexts.section5.A.items.map((item, index) => (
                            <li key={index} className="text-white/80" dangerouslySetInnerHTML={{ __html: parseInline(item[lang] || item.es) }} />
                        ))}
                    </ul>
                    <p className="text-xs pt-4 text-white/50">{t('section5.A.note')}</p>
                </div>

                {/* B. Plataformas de publicidad y analítica */}
                <div className="p-6 bg-[#001026] rounded-xl border border-[#B2904D]/20">
                    <h3 className="text-xl font-bold text-[#B2904D] mb-4 flex items-center gap-2"><Megaphone size={20}/> {t('section5.B.title')}</h3>
                    <p className="text-base text-blue-100/80 mb-4">{t('section5.B.intro')}</p>
                    <ul className="text-sm list-disc list-inside space-y-3 pl-4">
                        {interfaceTexts.section5.B.items.map((item, index) => (
                            <li key={index} className="text-white/80" dangerouslySetInnerHTML={{ __html: parseInline(item[lang] || item.es) }} />
                        ))}
                    </ul>
                    <p className="text-xs pt-4 text-orange-300/80">{t('section5.B.note')}</p>
                </div>

                {/* C. Proveedores de tecnología y contenido incrustado */}
                <div className="p-6 bg-[#001026] rounded-xl border border-white/10">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><Server size={20}/> {t('section5.C.title')}</h3>
                    <p className="text-base text-blue-100/80 mb-4">{t('section5.C.intro')}</p>
                    <ul className="text-sm list-disc list-inside space-y-3 pl-4">
                        {interfaceTexts.section5.C.items.map((item, index) => (
                            <li key={index} className="text-white/80" dangerouslySetInnerHTML={{ __html: parseInline(item[lang] || item.es) }} />
                        ))}
                    </ul>
                    <p className="text-xs pt-4 text-white/50">{t('section5.C.note')}</p>
                </div>

                {/* D. Sus opciones */}
                <div className="p-6 bg-[#001026] rounded-xl border border-white/10">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><SlidersHorizontal size={20}/> {t('section5.D.title')}</h3>
                    <p className="text-base text-blue-100/80 mb-4">{t('section5.D.intro')}</p>
                    <ul className="text-sm list-disc list-inside space-y-3 pl-4">
                        {interfaceTexts.section5.D.items.map((item, index) => (
                            <li key={index} className="text-white/80">{item[lang] || item.es}</li>
                        ))}
                    </ul>
                    <p className="text-xs pt-4 text-orange-300/80">{t('section5.D.note')}</p>
                </div>
            </div>
        </div>

        {/* SECCIONES 6, 7, 8 */}
        <div className="grid lg:grid-cols-3 gap-8">
            {/* SECCIÓN 6: SEGURIDAD DE DATOS */}
            <div className="lg:col-span-1">
                <SectionTitle title={t('section6.title')} />
                <div className="h-full p-6 bg-[#001026] rounded-xl border border-white/10 space-y-4 shadow-inner">
                    <p className="text-base text-blue-100/80">{t('section6.content1')}</p>
                    <ul className="text-sm list-disc list-inside space-y-3 pl-4">
                        {interfaceTexts.section6.items.map((item, index) => (
                            <li key={index} className="text-white/80">{item[lang] || item.es}</li>
                        ))}
                    </ul>
                    <p className="text-xs pt-4 text-red-300/80">{t('section6.content2')}</p>
                </div>
            </div>

            {/* SECCIÓN 7: RETENCIÓN DE DATOS */}
            <div className="lg:col-span-1">
                <SectionTitle title={t('section7.title')} />
                <div className="h-full p-6 bg-[#001026] rounded-xl border border-white/10 space-y-4 shadow-inner">
                    <p className="text-base text-blue-100/80">{t('section7.content1')}</p>
                    <ul className="text-sm list-disc list-inside space-y-3 pl-4">
                        {interfaceTexts.section7.items.map((item, index) => (
                            <li key={index} className="text-white/80">{item[lang] || item.es}</li>
                        ))}
                    </ul>
                    <p className="text-xs pt-4 text-orange-300/80">{t('section7.content2')}</p>
                </div>
            </div>

            {/* SECCIÓN 8: DERECHOS Y OPCIONES */}
            <div className="lg:col-span-1">
                <SectionTitle title={t('section8.title')} />
                <div className="h-full p-6 bg-[#001026] rounded-xl border border-white/10 space-y-4 shadow-inner flex flex-col">
                    <p className="text-base text-blue-100/80">{t('section8.intro')}</p>
                    <ul className="text-sm list-disc list-inside space-y-3 pl-4 flex-grow">
                        {interfaceTexts.section8.items.map((item, index) => (
                            <li key={index} className="text-white/80" dangerouslySetInnerHTML={{ __html: item[lang] || item.es }} />
                        ))}
                    </ul>
                    <div className="pt-6 border-t border-white/10 space-y-2 text-sm">
                        <p className="text-white font-medium">{t('section8.contact')}</p>
                        <div className="flex items-center gap-2 text-[#B2904D]">
                            <Mail size={16} />
                            <a href={`mailto:${interfaceTexts.section8.email}`} className="hover:text-sky-300 transition">
                              {interfaceTexts.section8.email}
                            </a>
                        </div>
                        <div className="flex items-center gap-2 text-[#B2904D]">
                            <Phone size={16} />
                            <a href={`tel:+1${interfaceTexts.section8.phone.replace(/\D/g, '')}`} className="hover:text-sky-300 transition">
                              {interfaceTexts.section8.phone}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* SECCIONES 9, 10, 11, 12 */}
        <div className="grid md:grid-cols-2 gap-8">
            {/* SECCIÓN 9: Enlaces de Terceros */}
            <div>
                <SectionTitle title={t('section9.title')} />
                <div className="p-6 bg-white/5 rounded-2xl border border-white/10 text-base text-blue-100/80 font-light shadow-inner">
                    <div dangerouslySetInnerHTML={{ __html: parseText('section9.content') }} />
                </div>
            </div>

            {/* SECCIÓN 10: Privacidad de los Niños */}
            <div>
                <SectionTitle title={t('section10.title')} />
                <div className="p-6 bg-white/5 rounded-2xl border border-white/10 text-base text-blue-100/80 font-light shadow-inner">
                    <div dangerouslySetInnerHTML={{ __html: parseText('section10.content') }} />
                </div>
            </div>

            {/* SECCIÓN 11: Cambios a Esta Política */}
            <div>
                <SectionTitle title={t('section11.title')} />
                <div className="p-6 bg-white/5 rounded-2xl border border-white/10 text-base text-blue-100/80 font-light shadow-inner">
                    <div dangerouslySetInnerHTML={{ __html: parseText('section11.content') }} />
                </div>
            </div>

            {/* SECCIÓN 12: Contáctenos */}
            <div>
                <SectionTitle title={t('section12.title')} />
                <div className="p-6 bg-white/5 rounded-2xl border border-white/10 space-y-4 shadow-inner">
                    <p className="text-base text-white font-medium">{t('section12.intro')}</p>
                    <div className="flex flex-col gap-4 text-sm">
                        <div className="flex items-center gap-3 text-white/90">
                            <Mail size={18} className="text-sky-400" />
                            <a href={`mailto:${interfaceTexts.section12.email}`} className="hover:text-[#B2904D] transition">
                              {interfaceTexts.section12.email}
                            </a>
                        </div>
                        <div className="flex items-center gap-3 text-white/90">
                            <Phone size={18} className="text-sky-400" />
                            <a href={`tel:+1${interfaceTexts.section12.phone.replace(/\D/g, '')}`} className="hover:text-[#B2904D] transition">
                              {interfaceTexts.section12.phone}
                            </a>
                        </div>
                        <div className="flex items-start gap-3 text-white/90">
                            <MapPin size={18} className="text-sky-400 flex-shrink-0 mt-1" />
                            <span>{interfaceTexts.section12.address}</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>

      </section>

      {/* --- FORMULARIO DE CONTACTO --- */}
      <div className="relative z-20 mt-24 py-12">
        <ContactForm />
      </div>

      <Footer />
    </main>
  );
}
