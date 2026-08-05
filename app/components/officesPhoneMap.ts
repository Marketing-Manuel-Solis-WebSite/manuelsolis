/**
 * Datos NAP compartidos de las 15 oficinas (versión client-safe).
 *
 * app/lib/officesRegistry.ts (placeIds de Google + lista de oficinas
 * virtuales) es `server-only`, así que las islas cliente —Header,
 * MobileStickyBar, OfficesExplorer— no pueden importarlo. El NAP que
 * necesitan a la vez servidor y cliente vive aquí.
 *
 * Las claves son los slugs de carpeta de app/[lang]/oficinas/ y coinciden
 * con OFFICES_PLACE_IDS; __tests__/napConsistency.test.ts lo verifica.
 *
 * Origen de los valores: OFFICE_INFO de app/[lang]/oficinas/<slug>/page.tsx
 * (calle, CP, mapUrl del schema LocalBusiness) y officeData de
 * <slug>/OfficeClient.tsx (horario mostrado). Cambiar un dato aquí obliga a
 * cambiarlo también allí: napConsistency falla si divergen.
 */

export type BiText = { es: string; en: string };

/** 0 = domingo … 6 = sábado (mismo índice que Date.getDay()). */
export type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6;

/** Franja de apertura en hora LOCAL de la oficina, formato "HH:MM" (24 h). */
export type OpenInterval = { opens: string; closes: string };

/** Un día ausente = cerrado. */
export type WeeklyOpen = Partial<Record<Weekday, OpenInterval>>;

export type OfficeHours =
  /** Horario de atención presencial con franjas por día. */
  | { kind: 'weekly'; label: BiText; open: WeeklyOpen }
  /** Local físico abierto 24/7 (centro de accidentes). */
  | { kind: 'always'; label: BiText }
  /**
   * Dirección virtual Regus/IWG: sin personal en sitio, se atiende con cita y
   * el 24/7 publicado es el enrutamiento del call-center. No hay franjas que
   * evaluar, así que la UI muestra el horario en vez de un estado abierto/cerrado.
   */
  | { kind: 'appointment'; label: BiText };

export interface OfficeNap {
  /** Slug = carpeta en app/[lang]/oficinas/ y clave en officesRegistry. */
  slug: OfficeNapSlug;
  /** Nombre de la ficha (índice /oficinas, enlaces internos). */
  name: BiText;
  /** Etiqueta corta del selector del explorador del home. */
  menuLabel: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  /** IANA time zone: el estado abierto/cerrado NO depende del reloj del visitante. */
  timeZone: string;
  /** Share-link de la ficha de Google Business Profile (pin exacto). */
  mapLink: string;
  hours: OfficeHours;
}

export type OfficeNapSlug =
  | 'houston-principal'
  | 'houston-accidentes'
  | 'houston-bellaire'
  | 'kirby'
  | 'main-st'
  | 'north-loop'
  | 'northchase'
  | 'league-city'
  | 'dallas'
  | 'el-paso'
  | 'harlingen'
  | 'losangeles'
  | 'chicago'
  | 'arvada'
  | 'memphis';

const MON_TO_FRI: readonly Weekday[] = [1, 2, 3, 4, 5];

function weekly(label: BiText, weekdays: OpenInterval, saturday?: OpenInterval): OfficeHours {
  const open: WeeklyOpen = {};
  for (const day of MON_TO_FRI) open[day] = weekdays;
  if (saturday) open[6] = saturday;
  return { kind: 'weekly', label, open };
}

/** Horario común de las 5 direcciones virtuales (VIRTUAL_OFFICE_SLUGS). */
const APPOINTMENT_HOURS: OfficeHours = {
  kind: 'appointment',
  label: {
    es: 'Con cita previa · atención telefónica 24 horas',
    en: 'By appointment · 24-hour phone support',
  },
};

export const OFFICES_NAP: Readonly<Record<OfficeNapSlug, OfficeNap>> = {
  'houston-principal': {
    slug: 'houston-principal',
    name: { es: 'Houston Principal', en: 'Houston Principal' },
    menuLabel: 'Houston Principal',
    street: '6657 Navigation Blvd',
    city: 'Houston',
    state: 'TX',
    zip: '77011',
    phone: '(713) 701-1731',
    timeZone: 'America/Chicago',
    mapLink: 'https://share.google/ZErZNzC4y9PtCrEJm',
    hours: weekly(
      {
        es: 'Lun - Vie 9:00 AM - 7:00 PM | Sáb 9:00 AM - 4:00 PM',
        en: 'Mon - Fri 9:00 AM - 7:00 PM | Sat 9:00 AM - 4:00 PM',
      },
      { opens: '09:00', closes: '19:00' },
      { opens: '09:00', closes: '16:00' },
    ),
  },
  'houston-accidentes': {
    slug: 'houston-accidentes',
    name: { es: 'Houston Accidentes', en: 'Houston Accidents' },
    menuLabel: 'Accidentes',
    street: '6705 Navigation Blvd',
    city: 'Houston',
    state: 'TX',
    zip: '77011',
    phone: '(713) 231-5384',
    timeZone: 'America/Chicago',
    mapLink: 'https://share.google/wEP84RY0RqTOqR787',
    hours: {
      kind: 'always',
      label: { es: 'Abierto las 24 horas', en: 'Open 24 hours' },
    },
  },
  'houston-bellaire': {
    slug: 'houston-bellaire',
    name: { es: 'Bellaire', en: 'Bellaire' },
    menuLabel: 'Bellaire',
    street: '9188 Bellaire Blvd, STE E',
    city: 'Houston',
    state: 'TX',
    zip: '77036',
    phone: '(713) 903-7875',
    timeZone: 'America/Chicago',
    mapLink: 'https://share.google/QsSM7vMPmZpPNFPRM',
    hours: weekly(
      {
        es: 'Lun - Vie 9:00 AM - 7:00 PM | Sáb 8:00 AM - 4:00 PM',
        en: 'Mon - Fri 9:00 AM - 7:00 PM | Sat 8:00 AM - 4:00 PM',
      },
      { opens: '09:00', closes: '19:00' },
      { opens: '08:00', closes: '16:00' },
    ),
  },
  kirby: {
    slug: 'kirby',
    name: { es: 'Kirby', en: 'Kirby' },
    menuLabel: 'Kirby',
    street: '3730 Kirby Dr Suite 1200',
    city: 'Houston',
    state: 'TX',
    zip: '77098',
    phone: '(713) 903-7875',
    timeZone: 'America/Chicago',
    mapLink: 'https://share.google/R85nYwhTFqoxLctD4',
    hours: APPOINTMENT_HOURS,
  },
  'main-st': {
    slug: 'main-st',
    name: { es: 'Main St', en: 'Main St' },
    menuLabel: 'Main St',
    street: '708 Main St',
    city: 'Houston',
    state: 'TX',
    zip: '77002',
    phone: '(713) 842-9575',
    timeZone: 'America/Chicago',
    mapLink: 'https://share.google/Fc3ISgQAihcayfmws',
    hours: APPOINTMENT_HOURS,
  },
  'north-loop': {
    slug: 'north-loop',
    name: { es: 'North Loop', en: 'North Loop' },
    menuLabel: 'North Loop',
    street: '2950 North Loop W',
    city: 'Houston',
    state: 'TX',
    zip: '77092',
    phone: '(713) 429-0237',
    timeZone: 'America/Chicago',
    mapLink: 'https://share.google/aKTPwIvhMmw7JfRcY',
    hours: APPOINTMENT_HOURS,
  },
  northchase: {
    slug: 'northchase',
    name: { es: 'Northchase', en: 'Northchase' },
    menuLabel: 'Northchase',
    street: '16510 Northchase Dr',
    city: 'Houston',
    state: 'TX',
    zip: '77060',
    phone: '(346) 522-4848',
    timeZone: 'America/Chicago',
    mapLink: 'https://share.google/wSptYM5hcuGigC3aS',
    hours: APPOINTMENT_HOURS,
  },
  'league-city': {
    slug: 'league-city',
    name: { es: 'League City', en: 'League City' },
    menuLabel: 'League City',
    street: '2600 S Shore Blvd',
    city: 'League City',
    state: 'TX',
    zip: '77573',
    phone: '(832) 598-3782',
    timeZone: 'America/Chicago',
    mapLink: 'https://share.google/8T736Tycmnh4BZw5o',
    hours: APPOINTMENT_HOURS,
  },
  dallas: {
    slug: 'dallas',
    name: { es: 'Dallas', en: 'Dallas' },
    menuLabel: 'Dallas',
    street: '1120 Empire Central Pl',
    city: 'Dallas',
    state: 'TX',
    zip: '75247',
    phone: '(214) 753-8315',
    timeZone: 'America/Chicago',
    mapLink: 'https://share.google/sotBoLXMzRVJcTVJ5',
    hours: weekly(
      {
        es: 'Lun - Vie 9:00 AM - 7:00 PM | Sáb 8:00 AM - 4:00 PM',
        en: 'Mon - Fri 9:00 AM - 7:00 PM | Sat 8:00 AM - 4:00 PM',
      },
      { opens: '09:00', closes: '19:00' },
      { opens: '08:00', closes: '16:00' },
    ),
  },
  'el-paso': {
    slug: 'el-paso',
    name: { es: 'El Paso', en: 'El Paso' },
    menuLabel: 'El Paso',
    street: '3632 Admiral St',
    city: 'El Paso',
    state: 'TX',
    zip: '79925',
    phone: '(915) 233-7127',
    // El Paso es la excepción de Texas: huso Montaña, no Central.
    timeZone: 'America/Denver',
    mapLink: 'https://share.google/uVjOe9OdhnatA0rr6',
    hours: weekly(
      {
        es: 'Lun - Vie 9:00 AM - 5:00 PM | Sáb 9:00 AM - 2:00 PM',
        en: 'Mon - Fri 9:00 AM - 5:00 PM | Sat 9:00 AM - 2:00 PM',
      },
      { opens: '09:00', closes: '17:00' },
      { opens: '09:00', closes: '14:00' },
    ),
  },
  harlingen: {
    slug: 'harlingen',
    name: { es: 'Harlingen', en: 'Harlingen' },
    menuLabel: 'Harlingen',
    street: '320 E Jackson St',
    city: 'Harlingen',
    state: 'TX',
    zip: '78550',
    phone: '(956) 597-7090',
    timeZone: 'America/Chicago',
    mapLink: 'https://share.google/usYVNMsAK6c9gaUWs',
    hours: weekly(
      { es: 'Lun - Vie 9:00 AM - 6:00 PM', en: 'Mon - Fri 9:00 AM - 6:00 PM' },
      { opens: '09:00', closes: '18:00' },
    ),
  },
  losangeles: {
    slug: 'losangeles',
    name: { es: 'Los Angeles', en: 'Los Angeles' },
    menuLabel: 'Los Angeles',
    street: '8337 Telegraph Rd, STE 115',
    city: 'Pico Rivera',
    state: 'CA',
    zip: '90660',
    phone: '(213) 784-1554',
    timeZone: 'America/Los_Angeles',
    mapLink: 'https://share.google/VnrxOpNfWDbNYkwjP',
    hours: weekly(
      {
        es: 'Lun - Vie 9:00 AM - 6:00 PM | Sáb 9:00 AM - 2:00 PM',
        en: 'Mon - Fri 9:00 AM - 6:00 PM | Sat 9:00 AM - 2:00 PM',
      },
      { opens: '09:00', closes: '18:00' },
      { opens: '09:00', closes: '14:00' },
    ),
  },
  chicago: {
    slug: 'chicago',
    name: { es: 'Chicago', en: 'Chicago' },
    menuLabel: 'Chicago',
    street: '6000 W Cermak Rd',
    city: 'Cicero',
    state: 'IL',
    zip: '60804',
    phone: '(312) 477-0389',
    timeZone: 'America/Chicago',
    mapLink: 'https://share.google/IwdeP5BMwUKl3rB9G',
    hours: weekly(
      {
        es: 'Lun - Vie 9:00 AM - 6:00 PM | Sáb 8:00 AM - 4:00 PM',
        en: 'Mon - Fri 9:00 AM - 6:00 PM | Sat 8:00 AM - 4:00 PM',
      },
      { opens: '09:00', closes: '18:00' },
      { opens: '08:00', closes: '16:00' },
    ),
  },
  arvada: {
    slug: 'arvada',
    name: { es: 'Arvada (Denver)', en: 'Arvada (Denver)' },
    menuLabel: 'Arvada',
    street: '5400 Ward Rd, Bldg IV',
    city: 'Arvada',
    state: 'CO',
    zip: '80002',
    phone: '(720) 358-8973',
    timeZone: 'America/Denver',
    mapLink: 'https://share.google/QbeutobA9WchbNPcu',
    hours: weekly(
      {
        es: 'Lun - Vie 9:00 AM - 7:00 PM | Sáb: 9:00 AM - 2:00 PM',
        en: 'Mon - Fri 9:00 AM - 7:00 PM | Sat: 9:00 AM - 2:00 PM',
      },
      { opens: '09:00', closes: '19:00' },
      { opens: '09:00', closes: '14:00' },
    ),
  },
  memphis: {
    slug: 'memphis',
    name: { es: 'Memphis', en: 'Memphis' },
    menuLabel: 'Memphis',
    street: '3385 Airways Blvd, STE 320',
    city: 'Memphis',
    state: 'TN',
    zip: '38116',
    phone: '(901) 557-8357',
    timeZone: 'America/Chicago',
    // TODO(GBP): falta un dato que nadie del repo puede generar: el share-link
    // (`https://share.google/…`) de la ficha de Google Business Profile de
    // Memphis. Lo tiene que entregar quien administra el GBP del despacho
    // (dueño del proyecto / marketing), copiándolo desde el botón Compartir de
    // ESA ficha — no vale el de otra oficina (ya pasó una vez: se había pegado
    // el de Main St). Este módulo lo consumen islas cliente, así que el enlace
    // tiene que ser una cadena literal; no se puede derivar de Places API aquí.
    // Mientras no llegue, la búsqueda de Maps de abajo lleva a la dirección
    // correcta y funciona; solo no abre la ficha.
    mapLink:
      'https://www.google.com/maps/search/?api=1&query=Manuel+Solis+Law+Firm+3385+Airways+Blvd+STE+320+Memphis+TN+38116',
    hours: weekly(
      {
        es: 'Lun - Vie 9:00 AM - 5:00 PM | Sáb 9:00 AM - 1:00 PM',
        en: 'Mon - Fri 9:00 AM - 5:00 PM | Sat 9:00 AM - 1:00 PM',
      },
      { opens: '09:00', closes: '17:00' },
      { opens: '09:00', closes: '13:00' },
    ),
  },
};

/** Orden estable para recorrer el registro (índice, sitemaps, enlaces). */
export const OFFICE_NAP_SLUGS = Object.keys(OFFICES_NAP) as OfficeNapSlug[];

export function getOfficeNap(slug: string): OfficeNap | undefined {
  return (OFFICES_NAP as Readonly<Record<string, OfficeNap>>)[slug];
}

/** Dirección de una línea, tal como se muestra en el explorador y el schema. */
export function formatOfficeAddress(nap: OfficeNap): string {
  return `${nap.street}, ${nap.city}, ${nap.state} ${nap.zip}, United States`;
}

export type OfficeOpenState = 'open' | 'closed' | 'always-open' | 'appointment';

const officeClocks = new Map<string, Intl.DateTimeFormat>();

function officeClock(timeZone: string): Intl.DateTimeFormat {
  const cached = officeClocks.get(timeZone);
  if (cached) return cached;
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  });
  officeClocks.set(timeZone, formatter);
  return formatter;
}

const WEEKDAY_INDEX: Record<string, Weekday> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};

function toMinutes(time: string): number {
  const [hour, minute] = time.split(':');
  return Number(hour) * 60 + Number(minute);
}

/** Día y minuto del día en la zona horaria de la oficina, no en la del visitante. */
function officeLocalNow(timeZone: string, now: Date): { day: Weekday; minutes: number } | null {
  const parts = officeClock(timeZone).formatToParts(now);
  const weekday = parts.find((p) => p.type === 'weekday')?.value;
  const hour = parts.find((p) => p.type === 'hour')?.value;
  const minute = parts.find((p) => p.type === 'minute')?.value;
  if (!weekday || !hour || !minute) return null;
  const day = WEEKDAY_INDEX[weekday];
  if (day === undefined) return null;
  return { day, minutes: Number(hour) * 60 + Number(minute) };
}

/**
 * Estado de una oficina en SU zona horaria. `null` cuando el slug no está en
 * el registro; 'appointment' cuando el horario no permite decidir (direcciones
 * virtuales) y la UI debe mostrar el horario en lugar de un estado.
 */
export function getOfficeOpenState(slug: string, now: Date = new Date()): OfficeOpenState | null {
  const nap = getOfficeNap(slug);
  if (!nap) return null;
  if (nap.hours.kind === 'appointment') return 'appointment';
  if (nap.hours.kind === 'always') return 'always-open';

  const local = officeLocalNow(nap.timeZone, now);
  if (!local) return null;
  const interval = nap.hours.open[local.day];
  if (!interval) return 'closed';
  return local.minutes >= toMinutes(interval.opens) && local.minutes < toMinutes(interval.closes)
    ? 'open'
    : 'closed';
}

// Mapeo de slugs de oficinas a números de teléfono de emergencia
export const officesPhoneMap: Record<string, string> = Object.fromEntries(
  OFFICE_NAP_SLUGS.map((slug) => [slug, OFFICES_NAP[slug].phone]),
);

// Número por defecto (global)
export const DEFAULT_PHONE = '1-888-676-1238';
export const DEFAULT_PHONE_LINK = 'tel:+18886761238';

/**
 * WhatsApp del despacho, en el formato que exige wa.me: solo dígitos, con
 * código de país y sin "+" ni separadores.
 *
 * Vive aquí porque lo usan a la vez MobileStickyBar, WhatsAppButton y el
 * asistente del chat. Estaba copiado a mano en cada uno de esos sitios, que es
 * la misma forma de romperse que ya tuvo el NAP de las oficinas: cambiar el
 * número en un botón y dejar los otros dos apuntando al viejo no da ningún
 * error, solo pierde los mensajes que llegan al número muerto.
 */
export const WHATSAPP_NUMBER = '17138763560';

/** El mismo número en formato legible, para mostrarlo dentro de un texto. */
export const WHATSAPP_DISPLAY = '(713) 876-3560';
