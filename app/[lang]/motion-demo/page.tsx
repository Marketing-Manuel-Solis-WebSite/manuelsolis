import type { Metadata } from 'next';
import { Reveal, Stagger, StaggerItem, Parallax, MagneticButton, Shimmer, TextReveal } from '../../components/motion';
import RevealPlaygroundClient from './RevealPlayground';

// DEV-ONLY showcase. noindex + not in sitemapData + not linked from nav/footer.
export const metadata: Metadata = {
  title: 'Motion Demo (dev)',
  robots: { index: false, follow: false },
};

export function generateStaticParams() {
  return [{ lang: 'es' }, { lang: 'en' }];
}

function SectionTitle({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="mb-8">
      <p className="text-gold-500 text-xs font-bold uppercase tracking-[0.25em] mb-2">{kicker}</p>
      <h2 className="text-3xl md:text-4xl font-light text-white">{title}</h2>
    </div>
  );
}

const REVEAL_VARIANTS = ['up', 'down', 'left', 'right', 'fade', 'scale', 'blur'] as const;

export default function MotionDemoPage() {
  return (
    <main className="relative min-h-screen bg-navy-500 text-white overflow-x-hidden">
      {/* DEV banner */}
      <div className="sticky top-0 z-50 bg-gold-500 text-navy-500 text-center text-sm font-bold py-2 px-4">
        DEV ONLY · /motion-demo · noindex · no enlazada · borrar o mantener noindex al desplegar
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16 space-y-28">
        <header className="space-y-4">
          <TextReveal as="h1" splitBy="word" className="text-4xl md:text-6xl font-light leading-tight">
            Librería de movimiento — Manuel Solís
          </TextReveal>
          <p className="text-white/60 max-w-2xl">
            Demo de las 6 primitivas server-first. Para verificar reduced-motion: activa
            &quot;Reducir movimiento&quot; en tu SO (Windows: Configuración → Accesibilidad → Efectos visuales →
            Efectos de animación = Desactivado) y recarga — parallax y shimmer se desactivan, los reveals
            colapsan a solo-opacidad, y el botón magnético deja de moverse.
          </p>
        </header>

        {/* 1. Reveal — interactive */}
        <section>
          <SectionTitle kicker="01 · Reveal" title="Reveal con profundidad (interactivo)" />
          <RevealPlaygroundClient />
        </section>

        {/* 1b. Reveal — all variants static (server children, replay on re-scroll) */}
        <section>
          <SectionTitle kicker="01 · Reveal" title="Todas las variantes" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {REVEAL_VARIANTS.map((v) => (
              <Reveal key={v} variant={v} once={false} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <p className="text-gold-500 text-xs font-bold uppercase tracking-widest mb-1">{v}</p>
                <p className="text-white/80">Contenido renderizado en servidor.</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* 2. Stagger */}
        <section>
          <SectionTitle kicker="02 · Stagger" title="Revelado en cascada" />
          <Stagger className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <StaggerItem key={i} className="rounded-xl border border-white/10 bg-white/5 p-5 text-center">
                <span className="text-2xl font-light text-gold-500">{i + 1}</span>
              </StaggerItem>
            ))}
          </Stagger>
        </section>

        {/* 3. TextReveal */}
        <section>
          <SectionTitle kicker="03 · TextReveal" title="Mask reveal de tipografía" />
          <div className="space-y-10">
            <div>
              <p className="text-white/40 text-xs uppercase tracking-widest mb-3">splitBy=&quot;word&quot; (default, sin CLS)</p>
              <TextReveal as="p" splitBy="word" className="text-2xl md:text-3xl font-light text-white/90">
                Defendemos a las familias inmigrantes con experiencia y compasión.
              </TextReveal>
            </div>
            <div>
              <p className="text-white/40 text-xs uppercase tracking-widest mb-3">splitBy=&quot;line&quot; (saltos explícitos, máscara)</p>
              <TextReveal as="h3" splitBy="line" className="text-3xl md:text-5xl font-light leading-tight text-white">
                {'Más de 50,000\ncasos ganados\npara nuestra comunidad'}
              </TextReveal>
            </div>
          </div>
        </section>

        {/* 4. MagneticButton */}
        <section>
          <SectionTitle kicker="04 · MagneticButton" title="Hover magnético (CTA)" />
          <div className="flex flex-wrap gap-6 items-center">
            <MagneticButton as="a" href="#top" className="px-8 py-4 bg-gold-500 text-navy-500 font-bold rounded-xl shadow-glow-gold">
              Consulta gratis
            </MagneticButton>
            <MagneticButton strength={0.5} radius={160} className="px-8 py-4 border border-gold-500/40 text-gold-500 font-bold rounded-xl">
              Imán fuerte
            </MagneticButton>
            <span className="text-white/40 text-sm">(en touch: solo tap-scale)</span>
          </div>
        </section>

        {/* 5. Shimmer */}
        <section>
          <SectionTitle kicker="05 · Shimmer" title="Barrido dorado" />
          <div className="flex flex-wrap gap-6">
            <Shimmer trigger="hover" tint="gold" className="rounded-xl border border-white/10 bg-white/5 px-8 py-5 text-white/80">
              Hover: barrido dorado
            </Shimmer>
            <Shimmer trigger="inView" tint="white" className="rounded-xl border border-white/10 bg-white/5 px-8 py-5 text-white/80">
              InView: barrido blanco
            </Shimmer>
          </div>
        </section>

        {/* 6. Parallax */}
        <section>
          <SectionTitle kicker="06 · Parallax" title="Parallax por capas" />
          <div className="relative h-[420px] rounded-3xl border border-white/10 overflow-hidden bg-navy-600">
            <Parallax speed={0.4} className="absolute -top-16 -right-10 w-72 h-72 bg-blue-600/20 rounded-full blur-[70px]" />
            <Parallax speed={0.15} className="absolute bottom-0 left-0 w-full grid place-items-center h-full">
              <p className="text-4xl md:text-6xl font-light text-white/90">Profundidad cinematográfica</p>
            </Parallax>
          </div>
          <p className="text-white/40 text-sm mt-3">Scrollea para ver las capas moverse a distinta velocidad.</p>
        </section>

        {/* STRESS TEST */}
        <section>
          <SectionTitle kicker="STRESS TEST" title="12 cards (Stagger+Reveal) · varios MagneticButton · 2 Parallax" />
          <div className="relative rounded-3xl border border-gold-500/20 overflow-hidden p-8 bg-navy-600">
            <Parallax speed={0.3} className="absolute -top-10 left-1/4 w-60 h-60 bg-gold-500/10 rounded-full blur-[60px]" />
            <Parallax speed={0.18} className="absolute -bottom-10 right-1/4 w-72 h-72 bg-blue-600/10 rounded-full blur-[70px]" />
            <Stagger gap={0.05} className="relative grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 12 }).map((_, i) => (
                <StaggerItem key={i} variant="up" className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-gold-500 text-xs font-bold uppercase tracking-widest mb-2">Card {i + 1}</p>
                  <p className="text-white/70 text-sm mb-4">Contenido server-rendered.</p>
                  <MagneticButton className="px-4 py-2 text-sm bg-gold-500/90 text-navy-500 font-bold rounded-lg">
                    Acción
                  </MagneticButton>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      </div>
    </main>
  );
}
