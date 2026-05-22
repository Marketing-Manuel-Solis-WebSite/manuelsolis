import React from 'react';
import Link from 'next/link';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { BookOpen, Calendar, User } from 'lucide-react';
import { Stagger, StaggerItem } from '../../../components/motion';

/**
 * Category: Derechos de Migrantes — server-first (Fase 2.3 blog). Purely
 * presentational (no interactive state), so it's a pure Server Component: the
 * bilingual `texts` resolve to the active `lang` on the server and the inactive
 * locale never reaches the client bundle (enfoque b). The animated background
 * orbs + scrolling word are now static (matching the site-wide conversion);
 * the article grid enters via Stagger and uses `.card-3d`. page.tsx
 * (generateMetadata) is untouched — only the `lang` prop is threaded in.
 */

// --- FUNCIÓN AUXILIAR PARA OBTENER EL TEXTO TRADUCIDO ---
const getTranslatedText = (key: string, lang: 'es' | 'en') => {
  const parts = key.split('.');
  let current: any = texts;
  for (const part of parts) {
    if (current && current[part]) {
      current = current[part];
    } else {
      return '';
    }
  }
  return current[lang] || current.es;
};

// --- DATOS BILINGÜES COMPLETOS ---
const texts = {
  header: {
    library: { es: 'Biblioteca Legal', en: 'Legal Library' },
    title: { es: 'Derechos de Migrantes', en: 'Migrant Rights' },
    subtitle: {
      es: 'Información esencial, guías y recursos legales para proteger tu estatus y bienestar en Estados Unidos.',
      en: 'Essential information, guides, and legal resources to protect your status and well-being in the United States.',
    },
  },
  article: {
    tag: { es: 'Artículo Legal', en: 'Legal Article' },
    read_full: { es: 'Leer artículo completo', en: 'Read Full Article' },
    author_icon: { es: 'Autor', en: 'Author' }
  },
  articles: [
    {
      id: 12015,
      title: { es: "Derechos Migratorios: Qué hacer si son transgredidos", en: "Immigration Rights: What to do if they are violated" },
      url: "/derechos-de-migrantes/derechos-migratorios-que-hacer-si-son-transgredidos",
      author: "Carlos Anaya Ruiz",
      date: { es: "noviembre 29, 2024", en: "November 29, 2024" },
      isoDate: "2024-11-29",
      excerpt: {
        es: "El respeto a los derechos migratorios es un tema fundamental para la comunidad de migrantes latinoamericanos en Estados Unidos. Conocer y defender tus derechos es crucial, especialmente en situaciones donde puedes enfrentar abusos o discriminación...",
        en: "Respect for immigration rights is a fundamental issue for the community of Latin American migrants in the United States. Knowing and defending your rights is crucial, especially in situations where you may face abuse or discrimination...",
      },
    },
    {
      id: 11960,
      title: { es: "Asesoría Legal para Migrantes: Asegura tus Derechos", en: "Legal Advice for Migrants: Secure Your Rights" },
      url: "/derechos-de-migrantes/asesoria-legal-para-migrantes-asegura-tus-derechos",
      author: "Carlos Anaya Ruiz",
      date: { es: "noviembre 28, 2024", en: "November 28, 2024" },
      isoDate: "2024-11-28",
      excerpt: {
        es: "Enfrentar un proceso migratorio en Estados Unidos puede ser un desafío complejo, especialmente cuando los derechos migratorios no siempre son claros para quienes los necesitan y se desconoce sobre la asesoría legal para migrantes...",
        en: "Facing an immigration process in the United States can be a complex challenge, especially when immigration rights are not always clear to those who need them and legal advice for migrants is unknown...",
      },
    },
    {
      id: 11883,
      title: { es: "Derechos Migratorios para Víctimas de Crimen en EE.UU.", en: "Immigration Rights for Crime Victims in the U.S." },
      url: "/derechos-de-migrantes/derechos-migratorios-para-victimas-de-crimen",
      author: "Carlos Anaya Ruiz",
      date: { es: "noviembre 28, 2024", en: "November 28, 2024" },
      isoDate: "2024-11-28",
      excerpt: {
        es: "Si has sido víctima de un delito en Estados Unidos, comprender tus derechos migratorios puede ser clave para tu bienestar. En el Bufete de Abogados Manuel Solís reconocemos que ser víctima de un crimen puede ser abrumador y aterrador...",
        en: "If you have been a victim of a crime in the United States, understanding your immigration rights can be key to your well-being. At the Law Offices of Manuel Solís, we recognize that being a victim of a crime can be overwhelming and frightening...",
      },
    },
    {
      id: 11799,
      title: { es: "Protección de Derechos Migratorios Durante el Proceso", en: "Protection of Immigration Rights During the Process" },
      url: "/derechos-de-migrantes/proteccion-de-derechos-migratorios",
      author: "Carlos Anaya Ruiz",
      date: { es: "noviembre 27, 2024", en: "November 27, 2024" },
      isoDate: "2024-11-27",
      excerpt: {
        es: "El proceso migratorio en los Estados Unidos puede ser complejo y lleno de desafíos. Más aún para quienes buscan regularizar su estatus legal o enfrentar situaciones de detención y deportación. Por ello, la protección de derechos...",
        en: "The immigration process in the United States can be complex and full of challenges. Even more so for those seeking to regularize their legal status or face detention and deportation situations. Therefore, the protection of rights...",
      },
    },
    {
      id: 11529,
      title: { es: "Derechos fundamentales de Migrantes en EE.UU.", en: "Fundamental Rights of Migrants in the U.S." },
      url: "/derechos-de-migrantes/derechos-fundamentales-de-migrantes-en-ee-uu",
      author: "Carlos Anaya Ruiz",
      date: { es: "noviembre 26, 2024", en: "November 26, 2024" },
      isoDate: "2024-11-26",
      excerpt: {
        es: "Migrar a Estados Unidos es una decisión trascendental y, a menudo, un acto de valentía orillado por distintas situaciones. Muchas personas buscan un futuro mejor, estabilidad y oportunidades para ellas y sus familias...",
        en: "Migrating to the United States is a transcendental decision and often an act of courage driven by different situations. Many people seek a better future, stability, and opportunities for themselves and their families...",
      },
    },
    {
      id: 11319,
      title: { es: "Protección Legal para Migrantes Víctimas de Abuso o Crimen", en: "Legal Protection for Migrants Who Are Victims of Abuse or Crime" },
      url: "/derechos-de-migrantes/proteccion-legal-para-migrantes",
      author: "Carlos Anaya Ruiz",
      date: { es: "noviembre 25, 2024", en: "November 25, 2024" },
      isoDate: "2024-11-25",
      excerpt: {
        es: "Llegar a un nuevo país trae consigo desafíos significativos, especialmente para quienes enfrentan situaciones de abuso, violencia o explotación. Sin embargo, en Estados Unidos, las víctimas de abuso o crimen...",
        en: "Arriving in a new country brings significant challenges, especially for those facing situations of abuse, violence, or exploitation. However, in the United States, victims of abuse or crime...",
      },
    }
  ]
};

// --- COMPONENTE DE PÁGINA ---
export default function DerechosMigrantesClient({ lang }: { lang: 'es' | 'en' }) {
  const t = (key: string) => getTranslatedText(key, lang);

  return (
    <div className={`min-h-screen w-full bg-[#001540] text-white`}>

      <Header />

      {/* =========================================================================
          FONDO (Fixed - Cubre toda la página) — orbes estáticos
      ========================================================================= */}
      <div className="fixed inset-0 z-0 w-full h-full bg-[#001540] overflow-hidden">
        {/* Gradiente Azul Profundo */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#002868] via-[#001540] to-[#000a20]" />

        {/* Ruido de textura */}
        <div className="absolute inset-0 opacity-[0.06] mix-blend-overlay" style={{ backgroundImage: 'url(/noise.png)', backgroundRepeat: 'repeat' }}></div>

        {/* Orbes de luz (estáticos) - CONTENIDOS */}
        <div className="absolute top-[-10%] right-[-5%] w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] bg-blue-600/10 rounded-full blur-[120px] opacity-40" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] bg-sky-800/10 rounded-full blur-[150px] opacity-30" />

        {/* Texto de Fondo Sutil - CONTENIDO (estático) */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none select-none overflow-hidden">
          <span className="text-[60vh] font-black italic text-white tracking-tighter whitespace-nowrap">
            DERECHOS
          </span>
        </div>
      </div>

      {/* MAIN CONTENT - Con overflow-x-hidden y contenido centrado */}
      <main className="relative z-10 w-full overflow-x-hidden">
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-50 pb-20">

          {/* --- HERO/HEADER SECTION (static — LCP) --- */}
          <div className="w-full mb-20 text-center">
            <span className="inline-block text-sm font-bold tracking-widest text-[#B2904D] uppercase mb-4 drop-shadow-[0_0_10px_rgba(178,144,77,0.3)]">
              {t('header.library')}
            </span>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white mb-4 tracking-tighter leading-tight px-4">
              <span className="font-extrabold text-[#B2904D] drop-shadow-lg">{t('header.title').split(' ')[0]}</span>
              <span className="block text-white/90">{t('header.title').split(' ').slice(1).join(' ')}</span>
            </h1>

            <div className="h-1 w-24 bg-gradient-to-r from-[#002868] to-[#B2904D] mx-auto rounded-full mt-6" />

            <p className="mt-8 text-lg sm:text-xl text-blue-100/70 max-w-3xl mx-auto font-light leading-relaxed px-4">
              {t('header.subtitle')}
            </p>
          </div>

          {/* --- GRID DE ARTÍCULOS --- */}
          <Stagger
            gap={0.1}
            className="w-full grid gap-8 sm:gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            amount={0.01}
          >
            {texts.articles.map((article) => (
              <StaggerItem key={article.id} as="div" className="w-full">
                <Link href={article.url} className="group h-full block">
                  <article className="card-3d h-full flex flex-col bg-[#000814]/60 rounded-xl border border-white/10 overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(178,144,77,0.3)] relative backdrop-blur-sm">

                    {/* Borde Superior Animado (Dorado) */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#B2904D] to-transparent transform origin-center transition-all duration-500 group-hover:scale-x-100 scale-x-0"></div>

                    <div className="p-6 sm:p-8 flex flex-col flex-grow">
                      <div className="flex items-center gap-2 mb-4 text-xs font-semibold text-[#B2904D] uppercase tracking-widest">
                        <BookOpen size={16} className="text-[#B2904D] flex-shrink-0" />
                        <span className="truncate">{t('article.tag')}</span>
                      </div>

                      <h2 className="text-xl sm:text-2xl font-normal text-white mb-4 leading-snug group-hover:text-[#B2904D] transition-colors drop-shadow-[0_0_5px_rgba(255,255,255,0.1)] flex-grow">
                        {article.title[lang]}
                      </h2>

                      <p className="text-blue-100/70 mb-6 line-clamp-3 leading-relaxed text-sm font-light">
                        {article.excerpt[lang]}
                      </p>

                      <div className="pt-4 mt-auto border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between text-sm text-white/50 gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <User size={16} className="text-[#002868] fill-[#B2904D]/30 flex-shrink-0" />
                          <span className="font-light text-white/80 truncate">{article.author}</span>
                        </div>
                        <time dateTime={article.isoDate} className="flex items-center gap-1 text-white/40 font-medium text-xs whitespace-nowrap">
                          <Calendar size={14} className="text-white/30 flex-shrink-0" />
                          {article.date[lang]}
                        </time>
                      </div>
                    </div>

                    {/* Pie de tarjeta para leer más */}
                    <div className="bg-[#000510]/80 px-6 sm:px-8 py-4 flex items-center justify-between group-hover:bg-[#002868]/70 transition-colors duration-300 border-t border-white/10">
                      <span className="text-sm font-medium text-[#B2904D] group-hover:text-white transition-colors truncate">
                        {t('article.read_full')}
                      </span>
                      <svg
                        className="w-5 h-5 text-[#B2904D] transform transition-transform duration-300 group-hover:translate-x-1 group-hover:text-white flex-shrink-0 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                      </svg>
                    </div>
                  </article>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </main>

      <Footer />
    </div>
  );
}
