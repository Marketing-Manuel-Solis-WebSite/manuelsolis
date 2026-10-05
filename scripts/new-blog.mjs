#!/usr/bin/env node
// Scaffold a new blog post end-to-end:
//   1. Creates app/[lang]/blog/<slug>/page.tsx skeleton
//   2. Injects entry into ALL_POSTS in app/[lang]/blog/page.tsx
//   3. Creates public/blog/blog_<NN>/ folder for images
//
// El sitemap no se toca: app/lib/sitemapData.ts genera las rutas del blog a
// partir de BLOG_DATA, así que el post entra solo (y solo cuando ya salió).
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
  --date          publish date YYYY-MM-DD (default: today). Antes de esa
                  fecha el post no sale (publicación programada).
  --service-path  servicio enlazado al final (default: según la categoría,
                  p. ej. /servicios/defensa-deportacion)
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

// --- detect duplicates ---
if (fs.existsSync(blogPagePath)) fail(`Blog folder already exists: ${blogPageDir}`);
const hubContent = fs.readFileSync(blogHubPath, 'utf8');
if (hubContent.includes(`slug: '${slug}'`)) {
  fail(`Slug "${slug}" already present in ALL_POSTS.`);
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
// Formato actual de los posts: un archivo de datos que pinta BlogArticleLayout
// (ver app/components/blogs/articleModel.ts para todos los bloques e iconos).
const MONTHS_ES = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
const MONTHS_EN = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const [yyyy, mm, dd] = date.split('-');
const displayDateEs = `${dd} ${MONTHS_ES[Number(mm) - 1]}, ${yyyy}`;
const displayDateEn = `${MONTHS_EN[Number(mm) - 1]} ${dd}, ${yyyy}`;

const SERVICE_PATHS = {
  'procesos-migratorios': '/servicios/inmigracion',
  'defensa-deportacion': '/servicios/defensa-deportacion',
  'visa-u': '/servicios/visa-u',
  'visa-T': '/servicios/inmigracion',
  'visa-VAWA': '/servicios/vawa',
  'visa-humanitaria': '/servicios/inmigracion',
  'accidentes': '/servicios/accidentes',
};
const servicePath = (args['service-path'] || SERVICE_PATHS[categoryId]).trim();

const lit = (s) => `'${escapeLiteral(s)}'`;

const pageTemplate = `import type { Metadata } from 'next';
import BlogArticleLayout from '../../../components/blogs/BlogArticleLayout';
import { buildArticleMetadata } from '../../../components/blogs/articleMetadata';
import { ARTICLE_UI, type BlogArticleContent } from '../../../components/blogs/articleModel';

const SLUG = ${lit(slug)};
// Debe coincidir con \`date\` del post en ALL_POSTS (app/[lang]/blog/page.tsx):
// antes de esa fecha la página no se publica.
const ISO_DATE = ${lit(date)};
const IMAGE = ${lit(image)};

const content: Record<'es' | 'en', BlogArticleContent> = {
  es: {
    // TODO: título SEO (~60 caracteres) y descripción (~155).
    metaTitle: ${lit(titleEs)},
    metaDesc: ${lit(excerptEs)},
    title: ${lit(titleEs)},
    displayDate: ${lit(displayDateEs)},
    readTime: ${lit(readTime)},
    categoryLabel: ${lit(CATEGORY_LABELS[categoryId].es)},
    summary: {
      title: 'Resumen inicial',
      // TODO: resumen de 3-5 líneas. Admite <strong>.
      text: '',
    },
    // TODO: párrafos de introducción.
    intro: [''],
    // TODO: secciones del artículo. Bloques: text, list, steps, cards, table, note, warning.
    sections: [
      {
        icon: 'file',
        title: '',
        subtitle: '',
        blocks: [{ kind: 'text', text: '' }],
      },
    ],
    faq: {
      title: 'Preguntas frecuentes',
      // TODO: preguntas frecuentes.
      items: [{ q: '', a: '' }],
    },
    conclusion: {
      title: '',
      // TODO: conclusión y consejo final.
      text: '',
      advice: '',
    },
    sources: {
      title: 'Fuentes y referencias',
      // TODO: fuentes.
      list: [''],
    },
    ui: ARTICLE_UI.es,
  },
  en: {
    // TODO: SEO title (~60 chars) and description (~155).
    metaTitle: ${lit(titleEn)},
    metaDesc: ${lit(excerptEn)},
    title: ${lit(titleEn)},
    displayDate: ${lit(displayDateEn)},
    readTime: ${lit(readTime)},
    categoryLabel: ${lit(CATEGORY_LABELS[categoryId].en)},
    summary: {
      title: 'Summary',
      // TODO: English summary.
      text: '',
    },
    // TODO: English intro paragraphs.
    intro: [''],
    // TODO: English sections (same structure as Spanish).
    sections: [
      {
        icon: 'file',
        title: '',
        subtitle: '',
        blocks: [{ kind: 'text', text: '' }],
      },
    ],
    faq: {
      title: 'Frequently asked questions',
      // TODO: English FAQ.
      items: [{ q: '', a: '' }],
    },
    conclusion: {
      title: '',
      // TODO: English conclusion and advice.
      text: '',
      advice: '',
    },
    sources: {
      title: 'Sources and references',
      // TODO: sources.
      list: [''],
    },
    ui: ARTICLE_UI.en,
  },
};

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const currentLang: 'es' | 'en' = lang === 'en' ? 'en' : 'es';
  return buildArticleMetadata({
    slug: SLUG,
    lang: currentLang,
    content: content[currentLang],
    image: IMAGE,
    isoDate: ISO_DATE,
  });
}

export default async function Page({ params }: Props) {
  const { lang } = await params;
  const currentLang: 'es' | 'en' = lang === 'en' ? 'en' : 'es';

  return (
    <BlogArticleLayout
      slug={SLUG}
      lang={currentLang}
      content={content[currentLang]}
      image={IMAGE}
      // TODO: describe la portada en los dos idiomas.
      imageAlt={currentLang === 'es' ? ${lit(titleEs)} : ${lit(titleEn)}}
      isoDate={ISO_DATE}
      servicePath=${JSON.stringify(servicePath)}
      trackerCategory=${JSON.stringify(CATEGORY_LABELS[categoryId].es)}
    />
  );
}

export function generateStaticParams() {
  return [{ lang: 'es' }, { lang: 'en' }];
}
`;

// --- newsletter: un correo cada 3 días como mínimo ---
// El cron avisa a los suscriptores en `newsletterAt` (o en `date`). Se agenda
// el primer día libre: la fecha del post o 3 días después del último aviso.
const NEWSLETTER_GAP_DAYS = 3;
const lastNewsletter = [...hubContent.matchAll(/newsletterAt:\s*'(\d{4}-\d{2}-\d{2})'/g)]
  .map((m) => m[1])
  .sort()
  .pop();
const addDays = (iso, n) => new Date(Date.parse(`${iso}T00:00:00Z`) + n * 86400000).toISOString().slice(0, 10);
const nextSlot = lastNewsletter ? addDays(lastNewsletter, NEWSLETTER_GAP_DAYS) : date;
const newsletterAt = nextSlot > date ? nextSlot : date;

// --- ALL_POSTS entry ---
const blogDataEntry = `    {
      id: '${idFromSlug}',
      slug: '${slug}',
      newsletterAt: '${newsletterAt}',
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

// --- inject helpers ---
function injectBlogData(content) {
  // Desde la publicación programada (7ad7f0c) los posts viven en ALL_POSTS;
  // BLOG_DATA.posts es esa lista filtrada por fecha.
  const marker = /(const ALL_POSTS = \[\s*[\r\n]+)/;
  if (!marker.test(content)) {
    throw new Error('Could not find ALL_POSTS marker in app/[lang]/blog/page.tsx');
  }
  return content.replace(marker, `$1${blogDataEntry}\n`);
}

// --- prepare changes ---
let changes;
try {
  changes = {
    blogPage: { path: blogPagePath, content: pageTemplate, action: 'create' },
    blogHub: { path: blogHubPath, content: injectBlogData(hubContent), action: 'patch' },
    imageDir: imageFolder ? { path: imageFolder, action: 'mkdir' } : null,
  };
} catch (err) {
  fail(err.message);
}

// --- show plan ---
console.log('\n📝 Plan:');
console.log(`  CREATE  ${path.relative(ROOT, blogPagePath)}`);
console.log(`  PATCH   ${path.relative(ROOT, blogHubPath)}  (insert ALL_POSTS entry)`);
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

  if (changes.imageDir) fs.mkdirSync(changes.imageDir.path, { recursive: true });

  console.log('\n✅ Blog scaffolded.\n');
  console.log('Next steps:');
  console.log(`  1. Drop the hero image at: public${image}`);
  console.log(`  2. Open ${path.relative(ROOT, blogPagePath)} and replace TODO content.`);
  console.log(`     Add the post to app/lib/blogRelations.ts (related articles).`);
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
  console.error('Rollback complete. Repo restored.\n');
  process.exit(1);
}
