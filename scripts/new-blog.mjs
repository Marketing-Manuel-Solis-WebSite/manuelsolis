#!/usr/bin/env node
// Scaffold a new blog post end-to-end:
//   1. Creates app/[lang]/blog/<slug>/page.tsx skeleton
//   2. Injects entry into BLOG_DATA.posts in app/[lang]/blog/page.tsx
//   3. Injects route into getBlogEntries() in app/lib/sitemapData.ts
//   4. Creates public/blog/blog_<NN>/ folder for images
//
// Manual follow-up (not automated): add the post to app/lib/blogRelations.ts
// (blogServiceMap + authorArticleMap + allArticles + clusters).
//
// Usage:
//   npm run new-blog -- \
//     --slug "mi-nuevo-blog" \
//     --title-es "Título en español" \
//     --title-en "Title in English" \
//     --excerpt-es "Resumen corto..." \
//     --excerpt-en "Short summary..." \
//     --category-id "procesos-migratorios" \
//     --image "/blog/blog_31/hero.png" \
//     --read-time "10 min" \
//     [--author "Manuel Solís"] \
//     [--date "2026-05-01"] \
//     [--dry-run]

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

// --- arg parsing ---
function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (!a.startsWith('--')) continue;
    const key = a.slice(2);
    if (key === 'dry-run' || key === 'help' || key === 'h') {
      args[key] = true;
      continue;
    }
    const next = argv[i + 1];
    if (!next || next.startsWith('--')) {
      args[key] = true;
    } else {
      args[key] = next;
      i++;
    }
  }
  return args;
}

const args = parseArgs(process.argv.slice(2));

const USAGE = `
Usage:
  npm run new-blog -- --slug <slug> --title-es <es> --title-en <en> \\
                      --excerpt-es <es> --excerpt-en <en> \\
                      --category-id <id> --image <path> [--read-time <t>] \\
                      [--author <name>] [--date YYYY-MM-DD] [--dry-run]

Required:
  --slug          kebab-case slug (e.g. "tps-2026-mayo")
  --title-es      Spanish title
  --title-en      English title
  --excerpt-es    Spanish excerpt (~150 chars)
  --excerpt-en    English excerpt (~150 chars)
  --category-id   one of: procesos-migratorios, defensa-deportacion,
                  visa-u, visa-T, visa-VAWA, visa-humanitaria, accidentes
  --image         absolute path under public/, e.g. "/blog/blog_31/hero.png"

Optional:
  --read-time     e.g. "10 min" (default: "10 min")
  --author        author name (default: "Manuel Solís")
  --date          publish date YYYY-MM-DD (default: today)
  --dry-run       show changes without writing files
`;

if (args.help || args.h) {
  console.log(USAGE);
  process.exit(0);
}

// --- validation ---
function fail(msg) {
  console.error(`\nERROR: ${msg}\n${USAGE}`);
  process.exit(1);
}

const REQUIRED = ['slug', 'title-es', 'title-en', 'excerpt-es', 'excerpt-en', 'category-id', 'image'];
for (const r of REQUIRED) {
  if (!args[r] || typeof args[r] !== 'string') fail(`Missing required flag: --${r}`);
}

const slug = args['slug'].trim();
if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) {
  fail(`Invalid slug "${slug}". Use lowercase letters, digits, and hyphens only.`);
}

const VALID_CATEGORIES = [
  'procesos-migratorios', 'defensa-deportacion', 'visa-u', 'visa-T',
  'visa-VAWA', 'visa-humanitaria', 'accidentes',
];
const categoryId = args['category-id'].trim();
if (!VALID_CATEGORIES.includes(categoryId)) {
  fail(`Invalid --category-id "${categoryId}". Valid: ${VALID_CATEGORIES.join(', ')}`);
}

const CATEGORY_LABELS = {
  'procesos-migratorios': { es: 'Procesos Migratorios', en: 'Immigration Process' },
  'defensa-deportacion': { es: 'Defensa contra Deportación', en: 'Deportation Defense' },
  'visa-u': { es: 'Visa U', en: 'U Visa' },
  'visa-T': { es: 'Visa T', en: 'T Visa' },
  'visa-VAWA': { es: 'Visa VAWA', en: 'VAWA Visa' },
  'visa-humanitaria': { es: 'Visa Humanitaria', en: 'Humanitarian Relief' },
  'accidentes': { es: 'Accidentes', en: 'Accidents' },
};

const image = args['image'].trim();
if (!image.startsWith('/')) fail(`--image must start with "/" (e.g. "/blog/blog_31/hero.png").`);

const today = new Date().toISOString().slice(0, 10);
const date = (args['date'] || today).trim();
if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) fail(`Invalid --date "${date}". Use YYYY-MM-DD.`);

const author = (args['author'] || 'Manuel Solís').trim();
const readTime = (args['read-time'] || '10 min').trim();
const titleEs = args['title-es'].trim();
const titleEn = args['title-en'].trim();
const excerptEs = args['excerpt-es'].trim();
const excerptEn = args['excerpt-en'].trim();

const idFromSlug = slug.replace(/-/g, '_');
const dryRun = Boolean(args['dry-run']);

// --- paths ---
const blogPagePath = path.join(ROOT, 'app', '[lang]', 'blog', slug, 'page.tsx');
const blogPageDir = path.dirname(blogPagePath);
const blogHubPath = path.join(ROOT, 'app', '[lang]', 'blog', 'page.tsx');
const sitemapPath = path.join(ROOT, 'app', 'lib', 'sitemapData.ts');

// --- detect duplicates ---
if (fs.existsSync(blogPagePath)) fail(`Blog folder already exists: ${blogPageDir}`);
const hubContent = fs.readFileSync(blogHubPath, 'utf8');
if (hubContent.includes(`slug: '${slug}'`)) {
  fail(`Slug "${slug}" already present in BLOG_DATA.posts.`);
}
const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
if (sitemapContent.includes(`/blog/${slug}'`)) {
  fail(`Route /blog/${slug} already present in sitemapData.ts.`);
}

// --- determine image folder (from image path) ---
let imageFolder = null;
const imageMatch = image.match(/^\/blog\/(blog_\d+)\//);
if (imageMatch) imageFolder = path.join(ROOT, 'public', 'blog', imageMatch[1]);

// --- generate page.tsx skeleton ---
const escapeLiteral = (s) => s.replace(/\\/g, '\\\\').replace(/'/g, "\\'");

// Los `// TODO:` que aparecen dentro de esta plantilla NO son deuda de este
// repo: son marcas que se escriben en el archivo generado y que el paso 3 del
// panel (app/[lang]/admin/AdminHome.tsx) le pide buscar al autor para saber qué
// reemplazar. Si se renombran o se quitan, esa instrucción deja de coincidir.
const pageTemplate = `import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, ArrowLeft, ShieldCheck, FileText } from 'lucide-react';

import { generateBreadcrumbSchema } from '../../../lib/breadcrumbSchema';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import BlogBackground from '../../../components/blogs/BlogBackground';
import ShareButtons from '../../../components/blogs/ShareButtons';
import BlogTracker from '../../../components/blogs/BlogTracker';
import ReadingProgress from '../../../components/blogs/ReadingProgress';
import BlogSchema from '../../../components/blogs/BlogSchema';

const SITE_URL = 'https://www.manuelsolis.com';
const SLUG = '${escapeLiteral(slug)}';

const IMAGES = {
  article: '${escapeLiteral(image)}',
  author: '/abogado-manuel-solis.jpg',
};

const blogContent = {
  es: {
    metaTitle: '${escapeLiteral(titleEs)}',
    metaDesc: '${escapeLiteral(excerptEs)}',
    title: '${escapeLiteral(titleEs)}',
    excerpt: '${escapeLiteral(excerptEs)}',
    author: '${escapeLiteral(author)}',
    date: '${escapeLiteral(date)}',
    readTime: '${escapeLiteral(readTime)}',
    ui: {
      back: 'Volver al blog',
      share: 'Compartir artículo',
      writtenBy: 'Escrito por',
      published: 'Publicado',
      readTime: '${escapeLiteral(readTime)} de lectura',
      authorRole: 'Fundador & Abogado Principal',
      ctaButton: 'Consultar con un Abogado Ahora',
    },
    // TODO: rellenar con contenido real
    intro: [
      'Reemplaza este texto introductorio con el primer párrafo del artículo.',
      'Puedes agregar más párrafos según necesites. Soporta <strong>HTML inline</strong>.',
    ],
    sections: [
      {
        heading: 'Primera sección — reemplazar título',
        body: 'Contenido de la primera sección. Reemplaza este placeholder con texto real.',
      },
      {
        heading: 'Segunda sección — reemplazar título',
        body: 'Contenido de la segunda sección.',
      },
    ],
    cta: {
      title: '¿Necesitas ayuda con tu caso?',
      body: 'Agenda una consulta con nuestro equipo legal.',
      button: 'Agendar consulta',
    },
  },
  en: {
    metaTitle: '${escapeLiteral(titleEn)}',
    metaDesc: '${escapeLiteral(excerptEn)}',
    title: '${escapeLiteral(titleEn)}',
    excerpt: '${escapeLiteral(excerptEn)}',
    author: '${escapeLiteral(author)}',
    date: '${escapeLiteral(date)}',
    readTime: '${escapeLiteral(readTime)}',
    ui: {
      back: 'Back to blog',
      share: 'Share article',
      writtenBy: 'Written by',
      published: 'Published',
      readTime: '${escapeLiteral(readTime)} read',
      authorRole: 'Founder & Lead Attorney',
      ctaButton: 'Consult with an Attorney Now',
    },
    // TODO: fill with real content
    intro: [
      'Replace this introduction with the first paragraph of the article.',
      'You can add more paragraphs as needed. Supports <strong>inline HTML</strong>.',
    ],
    sections: [
      {
        heading: 'First section — replace title',
        body: 'Content of the first section. Replace this placeholder with real text.',
      },
      {
        heading: 'Second section — replace title',
        body: 'Content of the second section.',
      },
    ],
    cta: {
      title: 'Need help with your case?',
      body: 'Book a consultation with our legal team.',
      button: 'Book consultation',
    },
  },
};

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const isEs = lang === 'es';
  const t = isEs ? blogContent.es : blogContent.en;

  return {
    title: t.metaTitle,
    description: t.metaDesc,
    alternates: {
      canonical: \`\${SITE_URL}/\${lang}/blog/\${SLUG}\`,
      languages: {
        es: \`\${SITE_URL}/es/blog/\${SLUG}\`,
        en: \`\${SITE_URL}/en/blog/\${SLUG}\`,
        'x-default': \`\${SITE_URL}/es/blog/\${SLUG}\`,
      },
    },
    openGraph: {
      title: t.metaTitle,
      description: t.metaDesc,
      url: \`\${SITE_URL}/\${lang}/blog/\${SLUG}\`,
      siteName: 'Manuel Solis Law Firm',
      locale: isEs ? 'es_US' : 'en_US',
      type: 'article',
      publishedTime: t.date,
      authors: [t.author],
      images: [{ url: \`\${SITE_URL}\${IMAGES.article}\`, width: 1200, height: 630, alt: t.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: t.metaTitle,
      description: t.metaDesc,
      images: [\`\${SITE_URL}\${IMAGES.article}\`],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { lang } = await params;
  const currentLang: 'es' | 'en' = lang === 'en' ? 'en' : 'es';
  const t = blogContent[currentLang];

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: currentLang === 'es' ? 'Inicio' : 'Home', url: \`\${SITE_URL}/\${currentLang}\` },
    { name: 'Blog', url: \`\${SITE_URL}/\${currentLang}/blog\` },
    { name: t.title, url: \`\${SITE_URL}/\${currentLang}/blog/\${SLUG}\` },
  ]);

  return (
    <>
      <BlogSchema
        title={t.metaTitle}
        description={t.metaDesc}
        slug={SLUG}
        date={t.date}
        image={IMAGES.article}
        lang={currentLang}
        readTime={t.readTime}
      />
      <script id="breadcrumb-schema" type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <BlogTracker title={t.title} author={t.author} category="${escapeLiteral(CATEGORY_LABELS[categoryId].es)}" />
      <ReadingProgress />

      <div className="min-h-screen bg-[#001540] text-white selection:bg-[#B2904D] selection:text-[#001540]">
        <Header />
        <BlogBackground />

        <main id="main-content" tabIndex={-1} className="relative z-10 pt-32 pb-20">
          <section className="container mx-auto px-4 md:px-6 lg:px-8 max-w-4xl">
            <div className="mb-8">
              <Link href={\`/\${currentLang}/blog\`} className="inline-flex items-center gap-2 text-white/60 hover:text-[#B2904D] transition-colors text-sm font-medium uppercase tracking-wider">
                <ArrowLeft size={16} />
                {t.ui.back}
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="flex items-center gap-2 text-white/60 text-sm">
                <Calendar size={14} /> {t.date}
              </span>
              <span className="flex items-center gap-2 text-white/60 text-sm">
                <Clock size={14} /> {t.ui.readTime}
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6 text-white">
              {t.title}
            </h1>

            <p className="text-white/70 text-sm mb-8">
              {t.ui.writtenBy} <strong className="text-white">{t.author}</strong>
            </p>

            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-10 border border-white/10">
              <Image src={IMAGES.article} alt={t.title} fill className="object-cover" priority sizes="(max-width: 768px) 100vw, 1200px" />
            </div>

            {t.intro.map((p, i) => (
              <p key={i} className="text-lg text-white/80 leading-relaxed mb-5"
                 dangerouslySetInnerHTML={{ __html: p }} />
            ))}

            {t.sections.map((s, i) => (
              <section key={i} className="my-10">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 flex items-center gap-2">
                  <FileText className="w-6 h-6 text-[#B2904D]" />
                  {s.heading}
                </h2>
                <p className="text-base text-white/80 leading-relaxed"
                   dangerouslySetInnerHTML={{ __html: s.body }} />
              </section>
            ))}

            <section className="my-12 p-8 rounded-2xl bg-[#B2904D]/10 border border-[#B2904D]/30 text-center">
              <h2 className="text-2xl font-bold mb-3 flex items-center justify-center gap-2 text-white">
                <ShieldCheck className="w-6 h-6 text-[#B2904D]" />
                {t.cta.title}
              </h2>
              <p className="text-white/70 mb-6">{t.cta.body}</p>
              <Link href={\`/\${currentLang}/consulta\`}
                className="inline-block bg-[#B2904D] hover:bg-[#9a7c40] text-white font-semibold px-8 py-3 rounded-lg transition-colors">
                {t.cta.button}
              </Link>
            </section>

            <ShareButtons title={t.title} uiShareText={t.ui.share} />
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}

export async function generateStaticParams() {
  return [{ lang: 'es' }, { lang: 'en' }];
}
`;

// --- BLOG_DATA entry ---
const blogDataEntry = `    {
      id: '${idFromSlug}',
      slug: '${slug}',
      title: {
        es: '${escapeLiteral(titleEs)}',
        en: '${escapeLiteral(titleEn)}'
      },
      excerpt: {
        es: '${escapeLiteral(excerptEs)}',
        en: '${escapeLiteral(excerptEn)}'
      },
      categoryId: '${categoryId}',
      category: { es: '${escapeLiteral(CATEGORY_LABELS[categoryId].es)}', en: '${escapeLiteral(CATEGORY_LABELS[categoryId].en)}' },
      author: '${escapeLiteral(author)}',
      date: '${date}',
      readTime: '${escapeLiteral(readTime)}',
      image: '${escapeLiteral(image)}',
      featured: false
    },
    // ---`;

// --- sitemap entry ---
const sitemapEntry = `  { route: '/blog/${slug}', priority: 0.7, changeFrequency: 'monthly', lastModified: '${date}' },`;

// --- inject helpers ---
function injectBlogData(content) {
  const marker = /(export const BLOG_DATA = \{[\r\n]+\s*posts:\s*\[\s*[\r\n]+)/;
  if (!marker.test(content)) {
    throw new Error('Could not find BLOG_DATA.posts marker in app/[lang]/blog/page.tsx');
  }
  return content.replace(marker, `$1${blogDataEntry}\n`);
}

function injectSitemap(content) {
  const marker = /(\{\s*route:\s*'\/blog',\s*priority:\s*0\.7,\s*changeFrequency:\s*'weekly',\s*lastModified:\s*'[^']+'\s*\},)/;
  if (!marker.test(content)) {
    throw new Error('Could not find /blog hub entry marker in app/lib/sitemapData.ts');
  }
  return content.replace(marker, `$1\n${sitemapEntry}`);
}

// --- prepare changes ---
let changes;
try {
  changes = {
    blogPage: { path: blogPagePath, content: pageTemplate, action: 'create' },
    blogHub: { path: blogHubPath, content: injectBlogData(hubContent), action: 'patch' },
    sitemap: { path: sitemapPath, content: injectSitemap(sitemapContent), action: 'patch' },
    imageDir: imageFolder ? { path: imageFolder, action: 'mkdir' } : null,
  };
} catch (err) {
  fail(err.message);
}

// --- show plan ---
console.log('\n📝 Plan:');
console.log(`  CREATE  ${path.relative(ROOT, blogPagePath)}`);
console.log(`  PATCH   ${path.relative(ROOT, blogHubPath)}  (insert BLOG_DATA entry)`);
console.log(`  PATCH   ${path.relative(ROOT, sitemapPath)}  (insert sitemap route)`);
if (changes.imageDir) {
  const exists = fs.existsSync(changes.imageDir.path);
  console.log(`  MKDIR   ${path.relative(ROOT, changes.imageDir.path)}${exists ? ' (already exists)' : ''}`);
}

if (dryRun) {
  console.log('\n--dry-run: no files written.\n');
  process.exit(0);
}

// --- apply changes with rollback ---
const created = [];
try {
  fs.mkdirSync(blogPageDir, { recursive: true });
  created.push({ kind: 'dir', path: blogPageDir });
  fs.writeFileSync(blogPagePath, pageTemplate, 'utf8');
  created.push({ kind: 'file', path: blogPagePath });

  fs.writeFileSync(blogHubPath, changes.blogHub.content, 'utf8');
  fs.writeFileSync(sitemapPath, changes.sitemap.content, 'utf8');

  if (changes.imageDir) fs.mkdirSync(changes.imageDir.path, { recursive: true });

  console.log('\n✅ Blog scaffolded.\n');
  console.log('Next steps:');
  console.log(`  1. Drop the hero image at: public${image}`);
  console.log(`  2. Open ${path.relative(ROOT, blogPagePath)} and replace TODO content.`);
  console.log(`  3. Run \`npm run dev\` and check http://localhost:3000/es/blog/${slug}`);
  console.log(`  4. Commit + push → Vercel deploys → blog appears in admin newsletter.\n`);
} catch (err) {
  console.error(`\n❌ Failed: ${err.message}\nRolling back...`);
  // Rollback created files/dirs
  for (const c of created.reverse()) {
    try {
      if (c.kind === 'file') fs.unlinkSync(c.path);
      else if (c.kind === 'dir') fs.rmdirSync(c.path);
    } catch { /* ignore */ }
  }
  // Restore patched files from disk-cached originals
  fs.writeFileSync(blogHubPath, hubContent, 'utf8');
  fs.writeFileSync(sitemapPath, sitemapContent, 'utf8');
  console.error('Rollback complete. Repo restored.\n');
  process.exit(1);
}
