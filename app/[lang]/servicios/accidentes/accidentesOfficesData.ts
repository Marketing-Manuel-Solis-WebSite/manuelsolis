/**
 * Oficinas de accidentes — fuente de datos única de:
 *   1. La sección "Oficinas Disponibles" al final de /servicios/accidentes
 *      (componente AccidentesOffices).
 *   2. Las páginas por-oficina enfocadas en accidentes en
 *      /servicios/accidentes/oficinas/[slug] (AccidenteOfficePageView).
 *
 * `id` = slug y DEBE coincidir EXACTAMENTE con la carpeta en
 * app/[lang]/oficinas/ y con la clave en app/lib/officesRegistry.ts, para que
 * los enlaces "Ver oficina" y el sync de Google Places sigan alineados.
 *
 * Datos NAP transcritos de cada OfficeClient.tsx (2026-06-26). El orden de la
 * lista respeta el orden pedido para la sección de accidentes.
 *
 * NO emitimos schema LocalBusiness desde las páginas de accidentes: la ficha
 * canónica de cada oficina ya vive en /oficinas/[slug] y varias direcciones son
 * virtuales (Regus/IWG) — duplicar el LocalBusiness sería riesgo de NAP/GBP
 * (ver app/lib/officesRegistry.ts → VIRTUAL_OFFICE_SLUGS).
 */

export type BiText = { es: string; en: string };

export interface AccidentOffice {
  /** Slug — coincide con app/[lang]/oficinas/<id> y officesRegistry. */
  id: string;
  /** Nombre comercial corto para la tarjeta (lista pedida). */
  name: BiText;
  /** Etiqueta de zona para el badge. */
  area: string;
  city: string;
  state: string;
  /** Título largo bilingüe (reutilizado en el hero de la página por-oficina). */
  title: BiText;
  /**
   * Zona para el <title>/H1 SEO de la página por-oficina. Sin esto, las 8
   * fichas del área de Houston compiten por la misma keyword ("abogado de
   * accidentes houston") entre sí y contra la landing abogado-accidentes-houston.
   * El head term de ciudad se queda en la landing; aquí se apunta a la zona.
   */
  seoZone?: BiText;
  address: string;
  phone: string;
  email: string;
  hours: BiText;
  /** Share link de Google Maps de la ficha (pin exacto). */
  mapLink: string;
  image: string;
  /** Nota opcional (ej. servicio en chino). */
  note?: BiText;
}

/** Nombre comercial común a todas las fichas de accidentes. */
export const OFFICE_NAME = 'Abogado de Accidentes Manuel Solís';

export const accidentOffices: AccidentOffice[] = [
  {
    id: 'arvada',
    name: { es: 'Arvada (Denver)', en: 'Arvada (Denver)' },
    area: 'Arvada, CO',
    city: 'Arvada',
    state: 'CO',
    title: { es: 'Accidentes en Arvada, CO (Área de Denver)', en: 'Accidents in Arvada, CO (Denver Area)' },
    address: '5400 Ward Rd, Bldg IV, Arvada, CO 80002',
    phone: '(720) 358-8973',
    email: 'denver@manuelsolis.com',
    hours: { es: 'Lun - Vie 9:00 AM - 7:00 PM | Sáb: 9:00 AM - 2:00 PM', en: 'Mon - Fri 9:00 AM - 7:00 PM | Sat: 9:00 AM - 2:00 PM' },
    mapLink: 'https://share.google/QbeutobA9WchbNPcu',
    image: '/offices/Denver.png',
  },
  {
    id: 'chicago',
    name: { es: 'Chicago', en: 'Chicago' },
    area: 'Chicago, IL',
    city: 'Chicago',
    state: 'IL',
    title: { es: 'Accidentes en Chicago, IL', en: 'Accidents in Chicago, IL' },
    address: '6000 W Cermak Rd, Cicero, IL 60804, United States',
    phone: '(312) 477-0389',
    email: 'chicago@manuelsolis.com',
    hours: { es: 'Lun - Vie 9:00 AM - 6:00 PM | Sáb 8:00 AM - 4:00 PM', en: 'Mon - Fri 9:00 AM - 6:00 PM | Sat 8:00 AM - 4:00 PM' },
    mapLink: 'https://share.google/IwdeP5BMwUKl3rB9G',
    image: '/og/oficina-chicago.jpg',
  },
  {
    id: 'dallas',
    name: { es: 'Dallas', en: 'Dallas' },
    area: 'Dallas, TX',
    city: 'Dallas',
    state: 'TX',
    title: { es: 'Accidentes en Dallas, TX', en: 'Accidents in Dallas, TX' },
    address: '1120 Empire Central PL, Dallas, TX 75247, United States',
    phone: '(214) 753-8315',
    email: 'dallas@manuelsolis.com',
    hours: { es: 'Lun - Vie 9:00 AM - 7:00 PM | Sáb 8:00 AM - 4:00 PM', en: 'Mon - Fri 9:00 AM - 7:00 PM | Sat 8:00 AM - 4:00 PM' },
    mapLink: 'https://share.google/sotBoLXMzRVJcTVJ5',
    image: '/offices/Dallas.png',
  },
  {
    id: 'el-paso',
    name: { es: 'El Paso', en: 'El Paso' },
    area: 'El Paso, TX',
    city: 'El Paso',
    state: 'TX',
    title: { es: 'Accidentes en El Paso, TX', en: 'Accidents in El Paso, TX' },
    address: '3632 Admiral ST, El Paso, TX 79925, United States',
    phone: '(915) 233-7127',
    email: 'elpaso@manuelsolis.com',
    hours: { es: 'Lun - Vie 9:00 AM - 5:00 PM | Sáb 9:00 AM - 2:00 PM', en: 'Mon - Fri 9:00 AM - 5:00 PM | Sat 9:00 AM - 2:00 PM' },
    mapLink: 'https://share.google/uVjOe9OdhnatA0rr6',
    image: '/offices/el-paso.png',
  },
  {
    id: 'harlingen',
    name: { es: 'Harlingen', en: 'Harlingen' },
    area: 'Harlingen, TX',
    city: 'Harlingen',
    state: 'TX',
    title: { es: 'Accidentes en Harlingen, TX', en: 'Accidents in Harlingen, TX' },
    address: '320 E Jackson St, Harlingen, Texas 78550, United States',
    phone: '(956) 597-7090',
    email: 'harlingen@manuelsolis.com',
    hours: { es: 'Lun - Vie 9:00 AM - 6:00 PM', en: 'Mon - Fri 9:00 AM - 6:00 PM' },
    mapLink: 'https://share.google/usYVNMsAK6c9gaUWs',
    image: '/offices/Harlingen.png',
  },
  {
    id: 'houston-bellaire',
    seoZone: { es: 'Bellaire y Chinatown, Houston', en: 'Bellaire & Chinatown, Houston' },
    name: { es: 'Bellaire', en: 'Bellaire' },
    area: 'Houston Bellaire, TX',
    city: 'Houston',
    state: 'TX',
    title: { es: 'Accidentes en Houston Bellaire, TX', en: 'Accidents in Houston Bellaire, TX' },
    address: '9188 Bellaire Blvd, STE E, Houston, TX 77036, United States',
    phone: '(713) 903-7875',
    email: 'bellaire@manuelsolis.com',
    hours: { es: 'Lun - Vie 9:00 AM - 7:00 PM | Sáb 8:00 AM - 4:00 PM', en: 'Mon - Fri 9:00 AM - 7:00 PM | Sat 8:00 AM - 4:00 PM' },
    mapLink: 'https://share.google/QsSM7vMPmZpPNFPRM',
    image: '/offices/Houston.png',
    note: { es: 'Servicio en chino', en: 'Chinese service' },
  },
  {
    id: 'losangeles',
    name: { es: 'Los Angeles', en: 'Los Angeles' },
    area: 'Los Angeles (Pico Rivera), CA',
    city: 'Los Angeles',
    state: 'CA',
    title: { es: 'Accidentes en Los Angeles, CA', en: 'Accidents in Los Angeles, CA' },
    address: '8337 Telegraph Rd, STE 115, Pico Rivera, CA 90660, United States',
    phone: '(213) 784-1554',
    email: 'losangeles@manuelsolis.com',
    hours: { es: 'Lun - Vie 9:00 AM - 6:00 PM | Sáb 9:00 AM - 2:00 PM', en: 'Mon - Fri 9:00 AM - 6:00 PM | Sat 9:00 AM - 2:00 PM' },
    mapLink: 'https://share.google/VnrxOpNfWDbNYkwjP',
    image: '/offices/los-angeles.png',
  },
  {
    id: 'houston-principal',
    seoZone: { es: 'el East End de Houston (Oficina Principal)', en: 'Houston East End (Main Office)' },
    name: { es: 'Houston Principal', en: 'Houston Main' },
    area: 'Houston, TX',
    city: 'Houston',
    state: 'TX',
    title: { es: 'Accidentes en Houston, TX (Oficina Principal)', en: 'Accidents in Houston, TX (Main Office)' },
    address: '6657 Navigation Blvd, Houston, Texas 77011, United States',
    phone: '(713) 701-1731',
    email: 'houston@manuelsolis.com',
    hours: { es: 'Lun - Vie 9:00 AM - 7:00 PM | Sáb 9:00 AM - 4:00 PM', en: 'Mon - Fri 9:00 AM - 7:00 PM | Sat 9:00 AM - 4:00 PM' },
    mapLink: 'https://share.google/ZErZNzC4y9PtCrEJm',
    image: '/offices/Houston.png',
  },
  {
    id: 'houston-accidentes',
    // El despacho retiró el "24 horas" el 2026-08-22 y reclasificó la sede como
    // satélite: la zona ya no puede venderse por una disponibilidad que no hay.
    seoZone: { es: 'el East End de Houston (Navigation Blvd)', en: 'Houston East End (Navigation Blvd)' },
    name: { es: 'Houston Accidentes', en: 'Houston Accidents' },
    area: 'Houston, TX',
    city: 'Houston',
    state: 'TX',
    title: { es: 'Accidentes en Houston, TX (Centro de Accidentes)', en: 'Accidents in Houston, TX (Accident Center)' },
    address: '6705 Navigation Blvd, Houston, TX 77011, United States',
    phone: '(713) 231-5384',
    email: 'houston@manuelsolis.com',
    hours: { es: 'Lun - Vie 9:00 AM - 7:00 PM | Sáb 9:00 AM - 4:00 PM', en: 'Mon - Fri 9:00 AM - 7:00 PM | Sat 9:00 AM - 4:00 PM' },
    mapLink: 'https://share.google/wEP84RY0RqTOqR787',
    image: '/offices/Houston.png',
  },
  {
    id: 'main-st',
    seoZone: { es: 'Downtown Houston (Main St)', en: 'Downtown Houston (Main St)' },
    name: { es: 'Houston Main St', en: 'Houston Main St' },
    area: 'Houston (Main St), TX',
    city: 'Houston',
    state: 'TX',
    title: { es: 'Accidentes en Houston (Main St), TX', en: 'Accidents in Houston (Main St), TX' },
    address: '708 Main St, Houston, Texas 77002, United States',
    phone: '(713) 842-9575',
    email: 'houston@manuelsolis.com',
    hours: { es: 'Lun - Vie 9:00 AM - 7:00 PM | Sáb 9:00 AM - 4:00 PM', en: 'Mon - Fri 9:00 AM - 7:00 PM | Sat 9:00 AM - 4:00 PM' },
    mapLink: 'https://share.google/Fc3ISgQAihcayfmws',
    image: '/offices/main.png',
  },
  {
    id: 'north-loop',
    seoZone: { es: 'North Loop, Noroeste de Houston', en: 'North Loop, Northwest Houston' },
    name: { es: 'Houston NorthLoop', en: 'Houston NorthLoop' },
    area: 'Houston (North Loop), TX',
    city: 'Houston',
    state: 'TX',
    title: { es: 'Accidentes en Houston (North Loop), TX', en: 'Accidents in Houston (North Loop), TX' },
    address: '2950 North Loop W, Houston, TX 77092, United States',
    phone: '(713) 429-0237',
    email: 'houston@manuelsolis.com',
    hours: { es: 'Lun - Vie 9:00 AM - 7:00 PM | Sáb 9:00 AM - 4:00 PM', en: 'Mon - Fri 9:00 AM - 7:00 PM | Sat 9:00 AM - 4:00 PM' },
    mapLink: 'https://share.google/aKTPwIvhMmw7JfRcY',
    image: '/offices/ofLoop.png',
  },
  {
    id: 'northchase',
    seoZone: { es: 'Northchase, Norte de Houston (Greenspoint)', en: 'Northchase, North Houston (Greenspoint)' },
    name: { es: 'Houston NorthChase', en: 'Houston NorthChase' },
    area: 'Houston (Northchase), TX',
    city: 'Houston',
    state: 'TX',
    title: { es: 'Accidentes en Houston (Northchase), TX', en: 'Accidents in Houston (Northchase), TX' },
    address: '16510 Northchase Dr, Houston, TX 77060, United States',
    phone: '(346) 522-4848',
    email: 'houston@manuelsolis.com',
    hours: { es: 'Lun - Vie 9:00 AM - 7:00 PM | Sáb 9:00 AM - 4:00 PM', en: 'Mon - Fri 9:00 AM - 7:00 PM | Sat 9:00 AM - 4:00 PM' },
    mapLink: 'https://share.google/wSptYM5hcuGigC3aS',
    image: '/offices/ofNorth.png',
  },
  {
    id: 'kirby',
    seoZone: { es: 'Upper Kirby, Houston', en: 'Upper Kirby, Houston' },
    name: { es: 'Houston Kirby', en: 'Houston Kirby' },
    area: 'Houston (Kirby), TX',
    city: 'Houston',
    state: 'TX',
    title: { es: 'Accidentes en Houston (Kirby), TX', en: 'Accidents in Houston (Kirby), TX' },
    address: '3730 Kirby Dr Suite 1200, Houston, TX 77098, United States',
    phone: '(713) 903-7875',
    email: 'houston@manuelsolis.com',
    hours: { es: 'Lun - Vie 9:00 AM - 7:00 PM | Sáb 9:00 AM - 4:00 PM', en: 'Mon - Fri 9:00 AM - 7:00 PM | Sat 9:00 AM - 4:00 PM' },
    mapLink: 'https://share.google/R85nYwhTFqoxLctD4',
    image: '/offices/ofhouston.png',
  },
  {
    id: 'memphis',
    name: { es: 'Memphis', en: 'Memphis' },
    area: 'Memphis, TN',
    city: 'Memphis',
    state: 'TN',
    title: { es: 'Accidentes en Memphis, TN', en: 'Accidents in Memphis, TN' },
    address: '3385 Airways Blvd, STE 320, Memphis, TN 38116, United States',
    phone: '(901) 557-8357',
    email: 'memphis@manuelsolis.com',
    hours: { es: 'Lun - Vie 9:00 AM - 5:00 PM | Sáb 9:00 AM - 1:00 PM', en: 'Mon - Fri 9:00 AM - 5:00 PM | Sat 9:00 AM - 1:00 PM' },
    // TODO(GBP): falta el share-link (`https://share.google/…`) de la ficha de
    // Google Business Profile de Memphis; lo entrega quien administra el GBP del
    // despacho (dueño del proyecto / marketing). Ver el TODO gemelo en
    // app/components/officesPhoneMap.ts → OFFICES_NAP.memphis. Hasta entonces
    // esta búsqueda de Maps lleva a la dirección correcta.
    mapLink: 'https://www.google.com/maps/search/?api=1&query=Manuel+Solis+Law+Firm+3385+Airways+Blvd+STE+320+Memphis+TN+38116',
    image: '/offices/ofAirways.png',
  },
  {
    id: 'league-city',
    seoZone: { es: 'League City, TX (Área de Galveston)', en: 'League City, TX (Galveston Area)' },
    name: { es: 'League City, TX', en: 'League City, TX' },
    area: 'League City, TX',
    city: 'League City',
    state: 'TX',
    title: { es: 'Accidentes en League City, TX', en: 'Accidents in League City, TX' },
    address: '2600 S Shore Blvd, League City, TX 77573, United States',
    phone: '(832) 598-3782',
    email: 'leaguecity@manuelsolis.com',
    hours: { es: 'Con cita previa · atención telefónica 24 horas', en: 'By appointment · 24-hour phone support' },
    mapLink: 'https://share.google/8T736Tycmnh4BZw5o',
    image: '/og/oficina-league-city.jpg',
  },
];

/** Lookup por slug — usado por la página por-oficina. */
export function getAccidentOffice(slug: string): AccidentOffice | undefined {
  return accidentOffices.find((o) => o.id === slug);
}

export const officesUi = {
  badge: { es: 'Nuestras Oficinas', en: 'Our Offices' },
  title: { es: 'Oficinas Disponibles', en: 'Available Offices' },
  subtitle: {
    es: 'Visítanos en cualquiera de nuestras ubicaciones para atender tu caso de accidentes y lesiones personales.',
    en: 'Visit us at any of our locations for your accident and personal injury case.',
  },
  phone: { es: 'Teléfono', en: 'Phone' },
  hours: { es: 'Horario', en: 'Hours' },
  address: { es: 'Dirección', en: 'Address' },
  viewMap: { es: 'Ver en mapa', en: 'View on map' },
  viewOffice: { es: 'Ver oficina de accidentes', en: 'View accident office' },
  viewOfficeProfile: { es: 'Ver ficha completa de esta oficina', en: "View this office's full profile" },
} satisfies Record<string, BiText>;
