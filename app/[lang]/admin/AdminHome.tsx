'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Mail,
  FileText,
  Send,
  LogOut,
  ChevronRight,
  Terminal,
  Image as ImageIcon,
  Upload,
  GitBranch,
  Eye,
  CheckCircle2,
  Copy,
  Check,
  BookOpen,
  Layers,
  Sparkles,
  ArrowRight,
  AlertTriangle,
  Lightbulb,
  Calendar,
  Languages as LanguagesIcon,
  Users,
  Rocket,
} from 'lucide-react';
import { logoutAction } from './newsletter/actions';

export default function AdminHome({ lang }: { lang: 'es' | 'en' }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <Header lang={lang} />

        <Section
          icon={Rocket}
          title="Acceso rápido"
          subtitle="Entra directo a las herramientas del panel."
        >
          <div className="grid md:grid-cols-2 gap-4">
            <ToolCard
              href={`/${lang}/admin/newsletter`}
              icon={Mail}
              title="Newsletter Blast"
              description="Envía una edición o un blog a toda la audiencia activa, segmentado contra BOS."
              status="Operativo"
              statusColor="emerald"
            />
            <ToolCardDisabled
              icon={FileText}
              title="Crear Blog"
              description="Se hace desde la terminal con el script. Ver tutorial abajo."
              status="CLI"
              statusColor="navy"
            />
          </div>
        </Section>

        <Section
          icon={BookOpen}
          title="Tutorial · Crear un blog nuevo"
          subtitle="Cuatro pasos para que el blog quede vivo en el sitio + indexable + listo para newsletter."
        >
          <Tutorial steps={blogTutorial} />
        </Section>

        <Section
          icon={Send}
          title="Tutorial · Mandar el newsletter"
          subtitle="Cinco pasos desde login hasta envío real, con dry run intermedio."
        >
          <Tutorial steps={newsletterTutorial} />
        </Section>

        <Section
          icon={Layers}
          title="Flujo completo end-to-end"
          subtitle="Lo que pasa en automático cuando envías un newsletter de blog."
        >
          <FlowDiagram />
        </Section>

        <Section
          icon={Lightbulb}
          title="Cheat sheet"
          subtitle="Referencia rápida para que no tengas que buscar."
        >
          <CheatSheet />
        </Section>

        <FooterNote lang={lang} />
      </div>
    </div>
  );
}

function Header({ lang }: { lang: 'es' | 'en' }) {
  return (
    <header className="mb-10">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#001540] text-white text-xs font-bold tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Admin
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#001540] tracking-tight">
            Panel de Administración
          </h1>
          <p className="text-sm text-gray-600 mt-2">
            Manuel Solis Law · Herramientas internas · Acceso restringido
          </p>
        </div>
        <form action={logoutAction}>
          <input type="hidden" name="lang" value={lang} />
          <button
            type="submit"
            className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#001540] hover:bg-white px-3 py-2 rounded-lg transition border border-gray-200"
          >
            <LogOut className="w-3.5 h-3.5" />
            Cerrar sesión
          </button>
        </form>
      </div>
      <div className="h-[3px] w-20 bg-[#B2904D] mt-4 rounded-full" />
    </header>
  );
}

function Section({
  icon: Icon,
  title,
  subtitle,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4 }}
      className="mb-10"
    >
      <div className="flex items-start gap-3 mb-4">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#001540] flex-shrink-0">
          <Icon className="w-5 h-5 text-[#B2904D]" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-[#001540]">{title}</h2>
          <p className="text-sm text-gray-600 mt-0.5">{subtitle}</p>
        </div>
      </div>
      {children}
    </motion.section>
  );
}

function ToolCard({
  href,
  icon: Icon,
  title,
  description,
  status,
  statusColor,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  status: string;
  statusColor: 'emerald' | 'navy' | 'gold';
}) {
  const colorMap = {
    emerald: 'bg-emerald-100 text-emerald-700',
    navy: 'bg-[#001540] text-white',
    gold: 'bg-[#B2904D] text-white',
  };
  return (
    <Link
      href={href}
      className="group bg-white border-2 border-gray-100 hover:border-[#B2904D] rounded-2xl p-6 transition-all hover:shadow-md"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#fbf7ef] group-hover:bg-[#B2904D]/20 transition">
          <Icon className="w-6 h-6 text-[#B2904D]" />
        </div>
        <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${colorMap[statusColor]}`}>
          {status}
        </span>
      </div>
      <h3 className="font-bold text-[#001540] text-lg mb-1">{title}</h3>
      <p className="text-sm text-gray-600 mb-4">{description}</p>
      <div className="inline-flex items-center gap-1 text-sm font-semibold text-[#B2904D] group-hover:gap-2 transition-all">
        Abrir
        <ArrowRight className="w-4 h-4" />
      </div>
    </Link>
  );
}

function ToolCardDisabled({
  icon: Icon,
  title,
  description,
  status,
  statusColor,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  status: string;
  statusColor: 'emerald' | 'navy' | 'gold';
}) {
  const colorMap = {
    emerald: 'bg-emerald-100 text-emerald-700',
    navy: 'bg-[#001540] text-white',
    gold: 'bg-[#B2904D] text-white',
  };
  return (
    <div className="bg-white border-2 border-dashed border-gray-200 rounded-2xl p-6 opacity-90">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gray-100">
          <Icon className="w-6 h-6 text-gray-500" />
        </div>
        <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${colorMap[statusColor]}`}>
          {status}
        </span>
      </div>
      <h3 className="font-bold text-[#001540] text-lg mb-1">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}

type TutorialStep = {
  number: number;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  body: React.ReactNode;
};

function Tutorial({ steps }: { steps: TutorialStep[] }) {
  return (
    <ol className="space-y-3">
      {steps.map((step) => (
        <li
          key={step.number}
          className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm"
        >
          <div className="flex items-start gap-4">
            <div className="flex flex-col items-center flex-shrink-0">
              <div className="flex items-center justify-center w-9 h-9 rounded-full bg-[#001540] text-white font-bold text-sm">
                {step.number}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <step.icon className="w-4 h-4 text-[#B2904D]" />
                <h3 className="font-semibold text-[#001540]">{step.title}</h3>
              </div>
              <div className="text-sm text-gray-700 leading-relaxed">{step.body}</div>
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}

const blogTutorial: TutorialStep[] = [
  {
    number: 1,
    icon: Terminal,
    title: 'Correr el script de scaffolding',
    body: (
      <>
        <p className="mb-3">
          Desde la raíz del proyecto, en una terminal:
        </p>
        <CodeBlock
          code={`npm run new-blog -- \\
  --slug "mi-blog-de-mayo" \\
  --title-es "Cancelación de Deportación: Guía Mayo 2026" \\
  --title-en "Cancellation of Removal: May 2026 Guide" \\
  --excerpt-es "Aprende los requisitos actualizados..." \\
  --excerpt-en "Learn the updated requirements..." \\
  --category-id "defensa-deportacion" \\
  --image "/blog/blog_31/hero.png" \\
  --read-time "11 min"`}
        />
        <p className="mt-3 text-xs text-gray-500">
          💡 Tip: agrega <code className="px-1 bg-gray-100 rounded">--dry-run</code> al final la primera vez para ver qué hará sin escribir archivos.
        </p>
      </>
    ),
  },
  {
    number: 2,
    icon: ImageIcon,
    title: 'Subir la imagen del hero',
    body: (
      <>
        <p>
          El script crea la carpeta <code className="px-1.5 py-0.5 bg-gray-100 rounded text-xs">public/blog/blog_XX/</code>. Pon ahí tu imagen del blog (la que pasaste como <code className="px-1.5 py-0.5 bg-gray-100 rounded text-xs">--image</code>).
        </p>
        <ul className="mt-3 space-y-1.5 text-xs text-gray-600">
          <li>· <strong>Formato:</strong> PNG, JPG o WebP</li>
          <li>· <strong>Aspecto recomendado:</strong> 1200×630 (estándar OpenGraph y email)</li>
          <li>· <strong>Tamaño:</strong> idealmente menos de 200 KB</li>
          <li>· <strong>Esta misma imagen</strong> sale en la página del blog Y en el correo de newsletter</li>
        </ul>
      </>
    ),
  },
  {
    number: 3,
    icon: FileText,
    title: 'Reemplazar el contenido placeholder',
    body: (
      <>
        <p>
          Abre el archivo <code className="px-1.5 py-0.5 bg-gray-100 rounded text-xs">app/[lang]/blog/{'{tu-slug}'}/page.tsx</code> y busca los comentarios <code className="px-1.5 py-0.5 bg-gray-100 rounded text-xs">// TODO:</code>.
        </p>
        <p className="mt-2">
          Reemplaza:
        </p>
        <ul className="mt-2 space-y-1.5 text-xs text-gray-600">
          <li>· <strong>intro</strong> — los párrafos de apertura</li>
          <li>· <strong>sections</strong> — el cuerpo del artículo (puedes agregar/quitar secciones)</li>
          <li>· <strong>cta</strong> — el bloque de call-to-action al final</li>
        </ul>
        <p className="mt-3 text-xs text-gray-500">
          El SEO ya está armado: <code className="px-1 bg-gray-100 rounded">generateMetadata</code>, <code className="px-1 bg-gray-100 rounded">BlogSchema</code>, breadcrumbs y canonical/hreflang. No hay que tocar nada de eso.
        </p>
      </>
    ),
  },
  {
    number: 4,
    icon: GitBranch,
    title: 'Push y deploy',
    body: (
      <>
        <CodeBlock
          code={`git add app/[lang]/blog app/sitemap.ts public/blog package.json
git commit -m "Add blog: cancelación deportación mayo 2026"
git push`}
        />
        <p className="mt-3">
          Vercel deploya en ~2 minutos. Después:
        </p>
        <ul className="mt-2 space-y-1.5 text-xs text-gray-600">
          <li>· La página queda viva en <code className="px-1 bg-gray-100 rounded">/blog/{'{slug}'}</code></li>
          <li>· Aparece en el feed del hub del blog</li>
          <li>· Google la indexa vía sitemap.xml</li>
          <li>· <strong>Aparece automáticamente en el admin de newsletter</strong> (en la pestaña &quot;Blog post&quot;, primera de la lista por fecha desc)</li>
        </ul>
      </>
    ),
  },
];

const newsletterTutorial: TutorialStep[] = [
  {
    number: 1,
    icon: Mail,
    title: 'Entrar al admin del newsletter',
    body: (
      <>
        <p>
          Desde este panel, pica <strong>&quot;Newsletter Blast&quot;</strong> arriba, o ve directo a:
        </p>
        <CodeBlock code="https://www.manuelsolis.com/es/admin/newsletter" small />
        <p className="mt-2 text-xs text-gray-500">
          La sesión de admin dura 4 horas, después te pide login otra vez.
        </p>
      </>
    ),
  },
  {
    number: 2,
    icon: FileText,
    title: 'Elegir tipo de envío y contenido',
    body: (
      <>
        <p>
          En el Step 1 del admin verás dos pestañas:
        </p>
        <ul className="mt-2 space-y-1.5 text-sm text-gray-700">
          <li>· <strong>📝 Blog post</strong> — manda el blog que elijas, auto-rellenando título, imagen, excerpt, categoría y link.</li>
          <li>· <strong>📰 Edición de newsletter</strong> — manda contenido editorial multi-tema curado a mano (lo viejo).</li>
        </ul>
        <p className="mt-3 text-xs text-gray-500">
          Para el flujo &quot;subo blog → mando newsletter de ese blog&quot;, usa la pestaña <strong>Blog post</strong>.
        </p>
      </>
    ),
  },
  {
    number: 3,
    icon: LanguagesIcon,
    title: 'Idioma + audiencia',
    body: (
      <>
        <ul className="space-y-1.5 text-sm text-gray-700">
          <li>· <strong>Idioma</strong>: ES o EN. El correo se manda en ese idioma a TODA la lista (no segmenta por idioma del suscriptor).</li>
          <li>· <strong>Toda la audiencia activa</strong> (default) — trae todos los suscriptores activos de Resend automáticamente y los clasifica contra BOS.</li>
          <li>· <strong>Lista manual de prueba</strong> — solo manda a los emails que pegues (útil para QA antes del envío real).</li>
        </ul>
      </>
    ),
  },
  {
    number: 4,
    icon: Eye,
    title: 'Dry run primero (recomendado)',
    body: (
      <>
        <p>
          Deja <strong>&quot;Dry run&quot;</strong> activado (verde). Pica <strong>&quot;Preparar dry run&quot;</strong> → confirma.
        </p>
        <p className="mt-2 text-sm text-gray-700">
          Esto trae todos los suscriptores, los clasifica contra BOS, y te muestra el resumen final <strong>sin enviar nada</strong>:
        </p>
        <ul className="mt-2 space-y-1 text-xs text-gray-600">
          <li>· Procesados / total</li>
          <li>· Cuántos recibirían el correo CON CTA</li>
          <li>· Cuántos lo recibirían SIN CTA</li>
          <li>· Errores (lookup BOS fallidos)</li>
        </ul>
        <p className="mt-2 text-xs text-gray-500">
          Si los números cuadran, procedes con el envío real.
        </p>
      </>
    ),
  },
  {
    number: 5,
    icon: Rocket,
    title: 'Envío real',
    body: (
      <>
        <p>
          Destilda <strong>&quot;Dry run&quot;</strong> (el botón se vuelve dorado/CTA real). Pica <strong>&quot;Preparar envío real&quot;</strong> → confirma con el doble paso.
        </p>
        <p className="mt-2 text-sm text-gray-700">
          El sistema procesa la lista respetando el rate limit de 55 req/min de BOS. La barra de progreso se actualiza en vivo. Espera al resumen final con métricas reales de envío.
        </p>
        <div className="mt-3 px-3 py-2 bg-amber-50 border border-amber-200 rounded-lg">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-amber-900">
              No cierres la pestaña mientras corre. Si la cierras se interrumpe el envío (puedes retomar disparando otro blast).
            </p>
          </div>
        </div>
      </>
    ),
  },
];

function FlowDiagram() {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
      <ol className="space-y-3">
        {flowSteps.map((s, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#fbf7ef] text-[#B2904D] font-bold text-xs flex-shrink-0">
              {i + 1}
            </span>
            <div className="flex-1">
              <p className="text-sm text-gray-800">
                <strong className="text-[#001540]">{s.actor}</strong> {s.action}
              </p>
              {s.detail && <p className="text-xs text-gray-500 mt-0.5">{s.detail}</p>}
            </div>
          </li>
        ))}
      </ol>
      <div className="mt-5 pt-5 border-t border-gray-100">
        <div className="flex items-start gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-gray-600">
            Tu único trabajo manual: <strong>pasos 1-3</strong> (crear blog, subir imagen, push). El resto es automático.
          </p>
        </div>
      </div>
    </div>
  );
}

const flowSteps: { actor: string; action: string; detail?: string }[] = [
  { actor: 'Tú', action: 'corres `npm run new-blog -- ...` con los datos del blog.' },
  { actor: 'Script', action: 'genera page.tsx, parchea BLOG_DATA y sitemap, crea carpeta de imagen.' },
  { actor: 'Tú', action: 'pones la imagen, rellenas el contenido, haces push.' },
  { actor: 'Vercel', action: 'deploya el blog (~2 min). La URL queda viva e indexable.', detail: 'sitemap automáticamente incluye la nueva URL' },
  { actor: 'Tú', action: 'entras al admin del newsletter, picas el blog en la lista.' },
  { actor: 'Sistema', action: 'trae todos los suscriptores activos de Resend.', detail: 'filtra unsubscribed=true automáticamente' },
  { actor: 'Sistema', action: 'consulta BOS por cada email para clasificar (con rate limit 55/min).' },
  { actor: 'Sistema', action: 'manda template CON CTA si NO existe en BOS, SIN CTA si sí existe.', detail: 'imagen, título, excerpt y categoría salen del BLOG_DATA' },
  { actor: 'Resend', action: 'entrega los correos. Resumen final con métricas en vivo.' },
];

function CheatSheet() {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <CheatCard title="URL del admin" icon={Mail}>
        <CodeBlock code="https://www.manuelsolis.com/es/admin" small />
        <p className="text-xs text-gray-500 mt-2">También funciona /en/admin.</p>
      </CheatCard>

      <CheatCard title="Categorías válidas para blog" icon={Layers}>
        <ul className="text-xs text-gray-700 space-y-1 font-mono">
          <li>· procesos-migratorios</li>
          <li>· defensa-deportacion</li>
          <li>· visa-u</li>
          <li>· visa-T</li>
          <li>· visa-VAWA</li>
          <li>· visa-humanitaria</li>
          <li>· accidentes</li>
        </ul>
      </CheatCard>

      <CheatCard title="Especificaciones de imagen" icon={ImageIcon}>
        <ul className="text-xs text-gray-700 space-y-1">
          <li>· Aspecto: <strong>1200×630</strong></li>
          <li>· Formato: PNG, JPG, WebP</li>
          <li>· Peso: &lt; 200 KB ideal</li>
          <li>· Path: <code className="px-1 bg-gray-100 rounded">/blog/blog_XX/...</code></li>
        </ul>
      </CheatCard>

      <CheatCard title="Comandos útiles" icon={Terminal}>
        <div className="space-y-2">
          <CodeBlock code="npm run new-blog -- --help" small />
          <CodeBlock code="npm run dev" small />
          <CodeBlock code="npm run build" small />
        </div>
      </CheatCard>

      <CheatCard title="Rate limit del envío" icon={Users}>
        <p className="text-xs text-gray-700">
          BOS permite 60 req/min. Dejamos margen a 55. Calculadora rápida:
        </p>
        <ul className="text-xs text-gray-700 space-y-0.5 mt-2 font-mono">
          <li>50 subs ≈ 55 segundos</li>
          <li>100 subs ≈ 2 minutos</li>
          <li>250 subs ≈ 5 minutos</li>
        </ul>
        <p className="text-xs text-gray-500 mt-2">
          Tope: 250 subs por blast (default). Configurable con BLAST_MAX_PER_RUN.
        </p>
      </CheatCard>

      <CheatCard title="Lógica de clasificación" icon={Sparkles}>
        <ul className="text-xs text-gray-700 space-y-1.5">
          <li>
            <span className="px-1.5 py-0.5 bg-[#B2904D] text-white rounded text-[10px] font-bold">CTA</span>
            <span className="ml-1.5">→ NO existe en BOS (frío)</span>
          </li>
          <li>
            <span className="px-1.5 py-0.5 bg-emerald-600 text-white rounded text-[10px] font-bold">SIN CTA</span>
            <span className="ml-1.5">→ SÍ existe en BOS (conocido)</span>
          </li>
          <li>
            <span className="px-1.5 py-0.5 bg-red-600 text-white rounded text-[10px] font-bold">CTA</span>
            <span className="ml-1.5">→ BOS lookup falló (fallback seguro)</span>
          </li>
        </ul>
      </CheatCard>
    </div>
  );
}

function CheatCard({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <Icon className="w-4 h-4 text-[#B2904D]" />
        <h3 className="font-bold text-[#001540] text-sm">{title}</h3>
      </div>
      <div>{children}</div>
    </div>
  );
}

function CodeBlock({ code, small }: { code: string; small?: boolean }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  }

  return (
    <div className="relative group">
      <pre
        className={`bg-[#0a1a3d] text-[#e6e9ef] rounded-lg overflow-x-auto ${
          small ? 'text-[11px] p-2.5 pr-10' : 'text-xs p-3 pr-12'
        } leading-relaxed`}
      >
        <code className="font-mono whitespace-pre">{code}</code>
      </pre>
      <button
        type="button"
        onClick={handleCopy}
        className="absolute top-2 right-2 p-1.5 rounded-md bg-white/10 hover:bg-white/20 text-white/80 transition opacity-0 group-hover:opacity-100"
        aria-label="Copiar"
      >
        {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
      </button>
    </div>
  );
}

function FooterNote({ lang: _lang }: { lang: 'es' | 'en' }) {
  return (
    <div className="mt-12 px-5 py-4 bg-white/60 border border-gray-200 rounded-xl">
      <div className="flex items-start gap-3">
        <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-gray-500">
          Esta página es interna. Acceso restringido por contraseña, sin indexar en buscadores. Si encuentras un bug o necesitas una herramienta nueva, levántalo con el equipo de desarrollo.
        </p>
      </div>
    </div>
  );
}
