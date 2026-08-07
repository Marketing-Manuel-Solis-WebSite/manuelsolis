import OfficePageView, { type OfficeData, type OfficeUIText } from '../../../components/OfficePageView';

// --- DATOS ESPECÍFICOS: DALLAS ---
const officeData: OfficeData = {
  badge: 'Dallas, Texas',
  id: 'dallas',
  city: 'Dallas',
  state: 'TX',
  title: { es: 'Dallas, TX Oficina', en: 'Dallas, TX Office' },
  quote: { es: 'Bendecidos con la fuerza y la gracia de Dios, e inspirados por nuestro deseo de ayudar.', en: 'Blessed with the strength and grace of God, and inspired by our desire to help.' },
  description: { 
    es: 'Abogado de Inmigración Manuel Solís, con más de 35 años de experiencia y 50,000 casos ganados, le guía en su trámite de visa humanitaria: visa U, visa VAWA, visa T, visa juvenil, permiso de trabajo en USA y residencia permanente en USA. Contamos con representación legal en todo Estados Unidos y también ofrecemos asesoría en áreas legales como derecho familiar, accidentes, negligencia médica, derecho civil y criminal. Nuestro equipo de más de 200 profesionales analiza cada situación de manera detallada, elaborando estrategias legales personalizadas que buscan proteger sus derechos. Ofrecemos servicios legales en español e inglés, brindando atención cercana, asesoría confiable y compromiso total con cada cliente migratorio o legal.', 
    en: 'Immigration Attorney Manuel Solís, with more than 35 years of experience and 50,000 cases won, guides you through your humanitarian visa process: U visa, VAWA visa, T visa, juvenile visa, work permits in the USA, and permanent residence in the USA. We provide legal representation throughout the United States and also offer legal guidance in areas such as family law, personal injury, medical malpractice, civil law, and criminal law. Our team of more than 200 professionals carefully analyzes each situation, developing personalized legal strategies designed to protect your rights. We offer legal services in Spanish and English, providing personalized attention, trusted guidance, and full commitment to every immigration or legal client.' 
  },
  address: '1120 Empire Central PL, Dallas, TX 75247, United States',
  phone: '(214) 753-8315',
  email: 'dallas@manuelsolis.com',
  hours: { es: 'Lun - Vie 9:00 AM - 7:00 PM | Sáb 8:00 AM - 4:00 PM', en: 'Mon - Fri 9:00 AM - 7:00 PM | Sat 8:00 AM - 4:00 PM' },
  mapLink: 'https://share.google/sotBoLXMzRVJcTVJ5',
  image: '/offices/Dallas.png',
  
  // --- GERENCIA ---
  managers: [
    { name: 'Maribel Degollado', role: { es: 'Gerente', en: 'Manager' } }
  ],
  // --- ABOGADOS (ACTUALIZADO SEGÚN TU LISTA) ---
  attorneys: [
    { 
      name: 'Mark McBroom', 
      role: { es: 'Abogado', en: 'Attorney' }, 
      image: 'https://uenjwzjx3vckezns.public.blob.vercel-storage.com/Mark%20McBroom.png',
      quote: { es: "Representación eficiente y precisa con compasión y comprensión.", en: "Efficient and accurate representation with compassion and understanding." }
    },
    {
      name: 'Michael Salas',
      role: { es: 'Abogado', en: 'Attorney' }, 
      image: '/LogoInformacion.png', // Placeholder
      quote: { es: "Defendiendo el futuro de su familia.", en: "Defending your family's future." }
    }
  ],
  // --- SERVICIOS (AÑADIDO) ---
  services: [
    { es: 'Inmigración', en: 'Immigration' },
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
  managers: { es: 'Gerencia', en: 'Management' },
  services: { es: 'Servicios Disponibles', en: 'Available Services' } // Nuevo
};

export default function OfficeClient({ lang }: { lang: 'es' | 'en' }) {
  return <OfficePageView data={officeData} ui={uiText} lang={lang} />;
}