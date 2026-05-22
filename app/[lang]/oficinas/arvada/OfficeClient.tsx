import OfficePageView, { type OfficeData, type OfficeUIText } from '../../../components/OfficePageView';

// --- DATOS ESPECÍFICOS: ARVADA ---
const officeData: OfficeData = {
  badge: 'Arvada, CO',
  id: 'arvada',
  city: 'Arvada',
  state: 'CO',
  title: { es: 'Arvada, CO Oficina (Área de Denver)', en: 'Arvada, CO Office (Denver Area)' },
  quote: { es: 'Bendecidos con la fuerza y la gracia de Dios, e inspirados por nuestro deseo de ayudar.', en: 'Blessed with the strength and grace of God, and inspired by our desire to help.' },
  description: { 
    es: 'Abogado de Inmigración Manuel Solís, con más de 35 años de experiencia y 50,000 casos ganados, le guía en su trámite de visa humanitaria: visa U, visa VAWA, visa T, visa juvenil, permiso de trabajo en USA y residencia permanente en USA. Contamos con representación legal en todo Estados Unidos y también ofrecemos asesoría en áreas legales como derecho familiar, accidentes, negligencia médica, derecho civil y criminal. Nuestro equipo de más de 200 profesionales analiza cada situación de manera detallada, elaborando estrategias legales personalizadas que buscan proteger sus derechos. Ofrecemos servicios legales en español e inglés, brindando atención cercana, asesoría confiable y compromiso total con cada cliente migratorio o legal.', 
    en: 'Immigration Attorney Manuel Solís, with more than 35 years of experience and 50,000 cases won, guides you through your humanitarian visa process: U visa, VAWA visa, T visa, juvenile visa, work permits in the USA, and permanent residence in the USA. We provide legal representation throughout the United States and also offer legal guidance in areas such as family law, personal injury, medical malpractice, civil law, and criminal law. Our team of more than 200 professionals carefully analyzes each situation, developing personalized legal strategies designed to protect your rights. We offer legal services in Spanish and English, providing personalized attention, trusted guidance, and full commitment to every immigration or legal client.' 
  },
  address: '5400 Ward Rd, Bldg IV, Arvada, CO 80002',
  phone: '(720) 358-8973',
  email: 'denver@manuelsolis.com',
  hours: { es: 'Lun - Vie 9:00 AM - 7:00 PM | Sáb: 9:00 AM - 2:00 PM', en: 'Mon - Fri 9:00 AM - 7:00 PM | Sat: 9:00 AM - 2:00 PM' },
  mapLink: 'https://share.google/QbeutobA9WchbNPcu',
  image: '/offices/Denver.png',
  
  // --- GERENCIA ---
  managers: [
    { name: 'Nombre Gerente', role: { es: 'Gerente de Oficina', en: 'Office Manager' } },
  ],
  // --- ABOGADOS (ACTUALIZADO SEGÚN TU LISTA) ---
  attorneys: [
    { 
      name: 'Alexis Alvarez', 
      role: { es: 'Abogada', en: 'Attorney' }, 
      image: 'https://uenjwzjx3vckezns.public.blob.vercel-storage.com/Alexis-Alvarez.png',
      quote: { es: "Cree firmemente en el principio de retribuir a la comunidad.", en: "She firmly believes in the principle of giving back to the community." }
    },
    { 
      name: 'Edwin Zavala', 
      role: { es: 'Abogado', en: 'Attorney' }, 
      image: 'https://uenjwzjx3vckezns.public.blob.vercel-storage.com/Edwin%20Zavala.png',
      quote: { es: "Soy hijo de un inmigrante... realmente creo que estamos cambiando el mundo.", en: "I am the son of an immigrant... I truly believe we are changing the world." }
    },
    { 
      name: 'Camila Vizcarra Guevara', 
      role: { es: 'Abogada', en: 'Attorney' }, 
      image: '/LogoInformacion.png', // Placeholder
      quote: { es: "Justicia y compasión.", en: "Justice and compassion." }
    },
    { 
      name: 'John Zalvator', 
      role: { es: 'Abogado', en: 'Attorney' }, 
      image: '/LogoInformacion.png', // Placeholder
      quote: { es: "Defendiendo sus derechos.", en: "Defending your rights." }
    }
  ],
  // --- SERVICIOS (AÑADIDO) ---
  services: [
    { es: 'Inmigración', en: 'Immigration' },
    { es: 'Planificación Patrimonial', en: 'Estate Planning' },
    { es: 'Seguros', en: 'Insurance' },
    { es: 'Accidentes', en: 'Accidents' },
    { es: 'Detenidos', en: 'Detained' }
  ]
};

// --- TEXTOS DE INTERFAZ ---
const uiText: OfficeUIText = {
  address: { es: 'Dirección', en: 'Address' },
  phone: { es: 'Teléfono', en: 'Phone' },
  hours: { es: 'Horario', en: 'Hours' },
  viewMap: { es: 'Ver en mapa', en: 'View on map' },
  team: { es: 'Nuestro Equipo Legal', en: 'Our Legal Team' },
  managers: { es: 'Nuestra Gerencia', en: 'Our Management Team' },
  services: { es: 'Servicios Disponibles', en: 'Available Services' } // Nuevo
};

export default function OfficeClient({ lang }: { lang: 'es' | 'en' }) {
  return <OfficePageView data={officeData} ui={uiText} lang={lang} />;
}