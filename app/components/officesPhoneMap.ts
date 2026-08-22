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
   * OFICINA SATÉLITE (decisión del despacho, 2026-08-22).
   *
   * Tiene horario real de operación —el mismo que publica su ficha de Google—
   * pero NO es una sede de atención presencial: no se recibe sin aviso. Es una
   * categoría distinta de `weekly` justamente por eso: comparten la forma del
   * dato pero no lo que se le puede prometer al visitante, y mezclarlas fue lo
   * que produjo el problema anterior. La UI no debe pintar "Abierto ahora" en
   * una satélite, porque invita a presentarse en una dirección donde no van a
   * poder atender.
   */
  | { kind: 'satellite'; label: BiText; open: WeeklyOpen }
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
  // Direcciones virtuales del área metropolitana de Chicago, alta de
  // 2026-08-11. Llevan prefijo `chicago-` porque el despacho las agrupa bajo
  // ese mercado (igual que las `houston-*`) y porque `/oficinas/wall` o
  // `/oficinas/prospect` a secas no dicen dónde están.
  | 'chicago-martingale'
  | 'chicago-prospect'
  | 'chicago-wacker'
  | 'chicago-burr-ridge'
  | 'chicago-wall'
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
/**
 * Línea general del despacho. Se declara aquí arriba porque OFFICES_NAP la
 * necesita: `DEFAULT_PHONE` la reexporta más abajo para el resto del sitio, y
 * así el número sigue viviendo en un solo sitio.
 */
const FIRM_MAIN_PHONE = '1-888-676-1238';

/**
 * Número del mercado de Chicago, compartido por las cinco direcciones nuevas.
 *
 * Es el mismo que publica la oficina de Chicago (6000 W Cermak Rd), y es cierto:
 * quien llama llega al equipo que atiende esas cinco direcciones. Se eligió
 * frente al 1-888 general por dos razones — el resto de las oficinas publica un
 * número LOCAL y hay un test que lo exige, y un fijo local convierte mejor que
 * un gratuito en una pagina de sede.
 *
 * No crea conflicto de ficha de Google porque ninguna de las cinco tiene GBP
 * todavia.
 *
 * ⚠️ Es provisional: marketing aun no ha asignado lineas de seguimiento por
 * sede. Cuando lleguen, cambiar el campo phone de cada entrada.
 */
const CHICAGO_MARKET_PHONE = '(312) 477-0389';

/**
 * Enlace de mapa por búsqueda de dirección.
 *
 * Las oficinas antiguas traen un `share.google` acortado, que solo se obtiene a
 * mano desde Maps. Para una sede nueva, una búsqueda por la dirección exacta
 * lleva al mismo sitio y no depende de que alguien pegue un enlace: es el mismo
 * recurso que ya usa officeSchema.ts cuando falta el `mapLink`.
 */
function mapsSearch(fullAddress: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`;
}

const APPOINTMENT_HOURS: OfficeHours = {
  kind: 'appointment',
  label: {
    es: 'Con cita previa · atención telefónica 24 horas',
    en: 'By appointment · 24-hour phone support',
  },
};

/**
 * Horario de las oficinas SATÉLITE (decisión del despacho, 2026-08-22):
 * Kirby, Main St, North Loop, Northchase y League City.
 *
 * Sustituye al "atención telefónica 24 horas" que publicaban como horario. Es
 * el horario real de operación —el mismo que muestra su ficha de Google— y
 * coincide con el de la oficina principal.
 *
 * NO incluye a Houston Accidentes: es un local propio con atención presencial
 * 24/7 y se queda como está. Tampoco a las cinco del área de Chicago, que
 * siguen siendo direcciones de solo cita.
 *
 * Domingo no aparece porque en este modelo un día ausente es día cerrado.
 */
const SATELLITE_HOURS: OfficeHours = {
  kind: 'satellite',
  label: {
    es: 'Lun - Vie 9:00 AM - 7:00 PM | Sáb 9:00 AM - 4:00 PM',
    en: 'Mon - Fri 9:00 AM - 7:00 PM | Sat 9:00 AM - 4:00 PM',
  },
  open: {
    1: { opens: '09:00', closes: '19:00' },
    2: { opens: '09:00', closes: '19:00' },
    3: { opens: '09:00', closes: '19:00' },
    4: { opens: '09:00', closes: '19:00' },
    5: { opens: '09:00', closes: '19:00' },
    6: { opens: '09:00', closes: '16:00' },
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
    // NO es satélite: es un local propio con atención presencial 24/7. Se
    // reclasificó por error el 2026-08-22 al leer "todas las de Houston menos
    // Principal y Bellaire", y el despacho lo corrigió el mismo día: Accidentes
    // es la tercera sede de Houston que sí recibe sin cita.
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
    hours: SATELLITE_HOURS,
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
    hours: SATELLITE_HOURS,
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
    hours: SATELLITE_HOURS,
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
    hours: SATELLITE_HOURS,
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
    hours: SATELLITE_HOURS,
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

  // ───────────────────────────────────────────────────────────────────────
  // Área metropolitana de Chicago — direcciones virtuales (alta 2026-08-11)
  //
  // `city` es el MUNICIPIO REAL, no "Chicago". Es la misma convención que ya
  // sigue la oficina `chicago`, cuya dirección está en Cicero: el nombre es la
  // etiqueta de mercado y `city` es el dato que va al `addressLocality` del
  // schema y a la ficha de Google. Poner "Chicago" en una dirección de
  // Schaumburg o Naperville rompería el NAP y con él el posicionamiento local.
  //
  // ⚠️ TELÉFONO: las cinco publican el número general del despacho porque
  // marketing todavía no ha asignado líneas de seguimiento por sede. Es un dato
  // cierto —contesta el despacho— pero no local. Cambiar el campo `phone` de
  // cada entrada cuando lleguen los números.
  // ───────────────────────────────────────────────────────────────────────
  'chicago-martingale': {
    slug: 'chicago-martingale',
    name: { es: 'Martingale', en: 'Martingale' },
    menuLabel: 'Martingale',
    street: '10 N Martingale Rd, Ste 4137',
    city: 'Schaumburg',
    state: 'IL',
    zip: '60173',
    phone: CHICAGO_MARKET_PHONE,
    timeZone: 'America/Chicago',
    mapLink: mapsSearch('10 N Martingale Rd, Ste 4137, Schaumburg, IL 60173'),
    hours: APPOINTMENT_HOURS,
  },
  'chicago-prospect': {
    slug: 'chicago-prospect',
    name: { es: 'Prospect', en: 'Prospect' },
    menuLabel: 'Prospect',
    street: '222 S Prospect Ave, Ste 338',
    city: 'Park Ridge',
    state: 'IL',
    zip: '60068',
    phone: CHICAGO_MARKET_PHONE,
    timeZone: 'America/Chicago',
    mapLink: mapsSearch('222 S Prospect Ave, Ste 338, Park Ridge, IL 60068'),
    hours: APPOINTMENT_HOURS,
  },
  'chicago-wacker': {
    slug: 'chicago-wacker',
    name: { es: 'Wacker', en: 'Wacker' },
    menuLabel: 'Wacker',
    street: '125 S Wacker Dr, Ste 341',
    city: 'Chicago',
    state: 'IL',
    zip: '60606',
    phone: CHICAGO_MARKET_PHONE,
    timeZone: 'America/Chicago',
    mapLink: mapsSearch('125 S Wacker Dr, Ste 341, Chicago, IL 60606'),
    hours: APPOINTMENT_HOURS,
  },
  'chicago-burr-ridge': {
    slug: 'chicago-burr-ridge',
    name: { es: 'Burr Ridge', en: 'Burr Ridge' },
    menuLabel: 'Burr Ridge',
    street: '1333 Burr Ridge Pkwy, Ste 244',
    city: 'Burr Ridge',
    state: 'IL',
    zip: '60527',
    phone: CHICAGO_MARKET_PHONE,
    timeZone: 'America/Chicago',
    mapLink: mapsSearch('1333 Burr Ridge Pkwy, Ste 244, Burr Ridge, IL 60527'),
    hours: APPOINTMENT_HOURS,
  },
  'chicago-wall': {
    slug: 'chicago-wall',
    name: { es: 'Wall', en: 'Wall' },
    menuLabel: 'Wall',
    street: '1560 Wall St, Ste 319',
    city: 'Naperville',
    state: 'IL',
    zip: '60563',
    phone: CHICAGO_MARKET_PHONE,
    timeZone: 'America/Chicago',
    mapLink: mapsSearch('1560 Wall St, Ste 319, Naperville, IL 60563'),
    hours: APPOINTMENT_HOURS,
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

/**
 * Sedes con personal propio, es decir todas menos las direcciones que solo
 * abren con cita.
 *
 * Vive aquí, y una sola vez, por dos motivos:
 *
 *   · Estaba repetida en cuatro archivos como
 *     `Object.keys(OFFICES_PLACE_IDS).filter(s => !isVirtualOffice(s)).length`,
 *     que además contaba mal: derivaba de QUIÉN TIENE FICHA DE GOOGLE, así que
 *     una oficina física sin ficha no habría contado. Daba 10 por casualidad.
 *   · Se deriva de `hours.kind`, que es dato de este mismo módulo, así que no
 *     arrastra `officesRegistry` (server-only) a componentes de cliente.
 *
 * napConsistency verifica que las de solo cita sean exactamente
 * VIRTUAL_OFFICE_SLUGS, así que las dos fuentes no pueden separarse.
 */
export const PHYSICAL_OFFICE_COUNT = OFFICE_NAP_SLUGS.filter(
  (slug) => isWalkInOffice(slug),
).length;

/**
 * Las tres categorías, derivadas de `hours.kind` y de nada más.
 *
 * Antes solo había dos —atendida o con cita— y el conteo se hacía negando
 * `appointment`. Al reclasificar las cinco de Houston como satélite el
 * 2026-08-22 esa negación habría contado a las satélite como oficinas
 * atendidas, que es justo lo contrario de lo que el despacho decidió publicar.
 *
 * `isWalkInOffice` es la pregunta que importa para el visitante: ¿puedo
 * presentarme sin avisar? Solo `weekly` y `always` responden que sí.
 */
export function isSatelliteOffice(slug: string): boolean {
  return getOfficeNap(slug)?.hours.kind === 'satellite';
}

export function isAppointmentOnlyOffice(slug: string): boolean {
  return getOfficeNap(slug)?.hours.kind === 'appointment';
}

export function isWalkInOffice(slug: string): boolean {
  const kind = getOfficeNap(slug)?.hours.kind;
  return kind === 'weekly' || kind === 'always';
}

/** Sedes satélite: horario real, pero sin atención presencial. */
export const SATELLITE_OFFICE_SLUGS = OFFICE_NAP_SLUGS.filter(isSatelliteOffice);

/** Direcciones que solo abren con cita previa. */
export const APPOINTMENT_OFFICE_SLUGS = OFFICE_NAP_SLUGS.filter(isAppointmentOnlyOffice);

export function getOfficeNap(slug: string): OfficeNap | undefined {
  return (OFFICES_NAP as Readonly<Record<string, OfficeNap>>)[slug];
}

/** Dirección de una línea, tal como se muestra en el explorador y el schema. */
export function formatOfficeAddress(nap: OfficeNap): string {
  return `${nap.street}, ${nap.city}, ${nap.state} ${nap.zip}, United States`;
}

export type OfficeOpenState = 'open' | 'closed' | 'always-open' | 'appointment' | 'satellite';

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
  // Satélite: tiene franjas, pero NO se evalúa abierto/cerrado a propósito.
  // Pintar "Abierto ahora" en una dirección sin atención presencial invita a
  // presentarse allí, que es exactamente lo que la reclasificación evita.
  if (nap.hours.kind === 'satellite') return 'satellite';

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
export const DEFAULT_PHONE = FIRM_MAIN_PHONE;
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
