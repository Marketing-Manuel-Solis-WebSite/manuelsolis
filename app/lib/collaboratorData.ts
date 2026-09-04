// Shared collaborator data — public "digital business card" profiles for
// non-attorney team members (marketing, operations, intake, etc.).
//
// Mirrors the attorneyData.ts shape (bilingual ES/EN, resolved to the active
// locale on the server) so the inactive locale never reaches the client bundle.
// Each profile is a shareable trust page that a collaborator can hand to a
// client: photo, role, email, the firm's official links, and verified Google
// reviews with documents in hand.

export type TranslatableString = string | { es: string; en: string };

// Helper to resolve translatable strings (same contract as attorneyData.getText)
export function getText(obj: TranslatableString, language: 'es' | 'en'): string {
  if (typeof obj === 'string') return obj;
  return obj[language] || obj.es || '';
}

// ---------------------------------------------------------------------------
// FIRM-LEVEL DATA (shared across every collaborator profile)
// ---------------------------------------------------------------------------

export type OfficialLinkType =
  | 'website'
  | 'facebook'
  | 'instagram'
  | 'youtube'
  | 'linkedin'
  | 'tiktok';

export interface OfficialLink {
  type: OfficialLinkType;
  label: string;
  href: string;
}

// Single source mirrors the social links in components/Footer.tsx.
export const officialLinks: OfficialLink[] = [
  { type: 'website', label: 'manuelsolis.com', href: 'https://www.manuelsolis.com' },
  { type: 'facebook', label: 'Facebook', href: 'https://www.facebook.com/AbogadoManuelSolisOficial/' },
  { type: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/abogadomanuelsolisoficial/' },
  { type: 'youtube', label: 'YouTube', href: 'https://www.youtube.com/channel/UCWD61mNBq6qJ0BMhj_-a4Vg' },
  { type: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/company/manuel-solis-law-firm/' },
  { type: 'tiktok', label: 'TikTok', href: 'https://www.tiktok.com/@abogadosmanuelsolis' },
];

// "Reviews positivas de Google con documentos en mano."
// Real clients photographed holding their approved documents (public/reviews).
export interface DocumentReview {
  src: string;
  name: string;
}

export const documentReviews: DocumentReview[] = [
  { src: '/reviews/bertha.png', name: 'Bertha Isabel' },
  { src: '/reviews/edgar.png', name: 'Edgar Guadalupe' },
  { src: '/reviews/juan.png', name: 'Juan Ramón' },
  { src: '/reviews/margarita.png', name: 'Margarita Reyes' },
  { src: '/reviews/marina.png', name: 'Marina Salgado' },
  { src: '/reviews/monseraf.png', name: 'Monseraf Meléndez' },
  { src: '/reviews/nidia.png', name: 'Nidia Elena' },
  { src: '/reviews/pedro.png', name: 'Pedro Rogel' },
];

// A few verified, positive Google reviews (subset of the featured set used in
// /testimonios). Shown alongside the document gallery as social proof.
export interface GoogleReview {
  name: string;
  office: { es: string; en: string };
  text: string;
  googleUrl: string;
}

export const featuredGoogleReviews: GoogleReview[] = [
  {
    name: 'Gilmar Guzman',
    office: { es: 'Los Angeles', en: 'Los Angeles' },
    text: 'He tenido una grata experiencia con mi preparadora de documentos Veronica Velasquez. Ella me ha asesorado y preparado para la entrevista, eso me hace sentir mucha confianza. Actualizando, recibí mi residencia y seguro social al mismo tiempo. Recomiendo al Abogado Manuel Solis.',
    googleUrl: 'https://maps.app.goo.gl/gu57uFG4eWHAQZdD9',
  },
  {
    name: 'Wendy Alfaro',
    office: { es: 'Harlingen', en: 'Harlingen' },
    text: 'Recomiendo mucho el bufete de abogados Manuel Solís pues te ayudan en todo tu trámite migratorio. Recibí buena asesoría y también desde que viajas a México por tu cita consular ellos tienen asesoría en Ciudad Juárez. Lo recomiendo mucho, es lo mejor.',
    googleUrl: 'https://maps.app.goo.gl/wadPG8TUHV7E7rad9',
  },
  {
    name: 'Nancy Mendez',
    office: { es: 'Houston', en: 'Houston' },
    text: 'Martha A. Melendez was excellent in all our interviews, she was so knowledgeable and was very patient with all our questions. Overall we are extremely pleased with her services. Thank you so much Martha!',
    googleUrl: 'https://maps.app.goo.gl/UwkncNrYHBEVaGtw7',
  },
];

// ---------------------------------------------------------------------------
// PER-COLLABORATOR DATA
// ---------------------------------------------------------------------------

export interface CollaboratorTestimonial {
  quote: { es: string; en: string };
  author: string;
  // Short context label shown under the author (e.g. "Cliente").
  context?: { es: string; en: string };
}

export interface Collaborator {
  id: string;
  name: string;
  image: string;
  role: { es: string; en: string }; // Título / Puesto
  /**
   * Opcional a propósito. Se pinta como `mailto:` y entra en el `email` del
   * Person JSON-LD, así que una dirección aproximada no es un detalle
   * cosmético: manda correo de clientes a un buzón que puede no existir y
   * publica un dato falso sobre una persona con nombre y apellido. Si no
   * consta la suya, se omite y la ficha no enseña bloque de contacto.
   */
  email?: string;
  /**
   * Oficina asignada, tal y como la nombra la credencial de la firma. Se pinta
   * justo debajo del correo, no dentro de la biografía: es un dato de contacto,
   * no prosa, y ahí es donde lo busca quien abre la ficha.
   */
  office?: { es: string; en: string };
  /**
   * Breve descripción — array of paragraphs, like attorney bios.
   *
   * Opcional: una ficha puede no tener biografía. Cuando falta, el `<meta
   * description>` y el `description` del Person se componen con nombre, cargo y
   * oficina, que son datos que sí constan — nunca se inventa un párrafo para
   * rellenar el hueco.
   */
  description?: { es: string[]; en: string[] };
  // Optional on purpose: only set it for a real, attributable testimonial with
  // documented consent. Never a placeholder — the profile is public advertising.
  testimonial?: CollaboratorTestimonial;
  // This person's OWN public profiles (LinkedIn, etc.) — used for the Person
  // JSON-LD `sameAs`. Never reuse the firm-level `officialLinks` here: on a
  // Person node `sameAs` must identify the individual, not the firm. Omit when
  // the collaborator has no personal public profiles.
  socialProfiles?: string[];
}

export const collaborators: Collaborator[] = [
  {
    id: 'oscar-manuel-oliva',
    /**
     * Datos tomados de la credencial digital que emite la firma
     * (`credencial-digital-manuel-solis.html`, 2026-09-04), que es el artefacto
     * oficial y lleva sello de identidad verificada. De ahí salen el nombre tal
     * y como la firma lo publica, el cargo, el correo institucional y la oficina.
     *
     * El slug conserva `manuel` —su nombre completo, el que codifica el correo
     * `omoliva`— aunque la credencial muestre la forma corta. La URL ya está
     * publicada y el slug no se ve; cambiarlo solo añadiría otro redirect.
     *
     * ⚠️ En inglés el cargo es «Legal Representative», NUNCA «Attorney». No es
     * un matiz de traducción: en un despacho de inmigración de EE. UU. son dos
     * figuras distintas, los abogados van en /abogados con su colegiatura, y
     * declarar aquí una que no consta sería una credencial falsa en el
     * `jobTitle` del Person.
     */
    name: 'Oscar Oliva',
    image: '/openers/oscar-manuel-oliva.jpg',
    role: {
      es: 'Representante legal · Inmigración',
      en: 'Legal Representative · Immigration',
    },
    email: 'omoliva@manuelsolis.com',
    office: {
      es: 'Oficina Principal; Houston, Texas',
      en: 'Main Office; Houston, Texas',
    },
  },
];

export function getCollaborator(id: string): Collaborator | undefined {
  return collaborators.find((c) => c.id === id);
}
