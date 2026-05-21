import type { Metadata } from 'next';
import { Reveal, Stagger, StaggerItem, Parallax, MagneticButton, Shimmer, TextReveal, Tilt, TiltLayer } from '../../components/motion';
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
            Demo de las primitivas server-first + la extensión 3D (Tilt, TiltLayer, card-3d). Para
            verificar reduced-motion: activa
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

        {/* ===================== EXTENSIÓN 3D / DIMENSIONAL ===================== */}

        {/* 7. Tilt 3D — text sharpness is the headline check */}
        <section>
          <SectionTitle kicker="07 · Tilt 3D" title="Tilt 3D al puntero (≤ ±6°)" />
          <p className="text-white/50 text-sm mb-6 max-w-2xl">
            Mueve el cursor sobre las cards. <strong className="text-white/80">QA crítico:</strong> el
            texto debe verse NÍTIDO en reposo y tras el tilt (nada de borroso/subpixel). En touch o con
            reduced-motion el tilt se desactiva (queda plano). El tilt es whisper-subtle a propósito.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Service-style card with body text — the sharpness probe */}
            <Tilt className="rounded-2xl border border-white/10 bg-white/5 p-7 shadow-e2">
              <p className="text-gold-500 text-xs font-bold uppercase tracking-[0.25em] mb-3">Inmigración</p>
              <h3 className="text-xl font-light text-white mb-2">Defensa de Deportación</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Representación ante la corte de inmigración. Texto de cuerpo para verificar nitidez
                tipográfica bajo transform 3D — debe permanecer afilado.
              </p>
            </Tilt>

            {/* Glare / sheen reactive to tilt */}
            <Tilt glare className="rounded-2xl border border-gold-500/20 bg-white/5 p-7 shadow-e2">
              <p className="text-gold-500 text-xs font-bold uppercase tracking-[0.25em] mb-3">Con glare</p>
              <h3 className="text-xl font-light text-white mb-2">Sheen dorado reactivo</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Un reflejo sutil sigue al cursor (gold = valor). Solo transform/opacity; se desactiva en
                reduced-motion.
              </p>
            </Tilt>

            {/* TiltLayer pop-out — decorative element floats forward */}
            <Tilt className="relative rounded-2xl border border-white/10 bg-white/5 p-7 shadow-e2 overflow-visible">
              <TiltLayer depth={40} className="absolute -top-5 -right-3">
                <span className="grid place-items-center w-14 h-14 rounded-2xl bg-gold-500 text-navy-500 font-black text-lg shadow-e3">
                  3D
                </span>
              </TiltLayer>
              <p className="text-gold-500 text-xs font-bold uppercase tracking-[0.25em] mb-3">TiltLayer</p>
              <h3 className="text-xl font-light text-white mb-2">Pop-out por profundidad</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                El badge dorado vive en una capa con translateZ: flota sobre el plano de la card durante el
                tilt. El texto se queda en el plano base (nítido).
              </p>
            </Tilt>
          </div>
        </section>

        {/* 8. card-3d restraint — depth hover without pointer tilt */}
        <section>
          <SectionTitle kicker="08 · card-3d" title="Profundidad sin tilt (restraint)" />
          <p className="text-white/50 text-sm mb-6 max-w-2xl">
            Para la mayoría de superficies: lift + glow por cross-fade de opacity (nunca anima box-shadow),
            sin listeners de puntero. No toda card necesita tilt — esto es lo profesional por defecto.
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="card-3d rounded-2xl border border-white/10 bg-white/5 p-6 shadow-e1">
                <p className="text-2xl font-light text-gold-500 mb-1">{i + 1}</p>
                <p className="text-white/70 text-sm">Hover: se eleva y enciende su glow.</p>
              </div>
            ))}
          </div>
        </section>

        {/* STRESS TEST 3D — REAL worst case: 20 cards w/ Tilt (attorney page = 20) */}
        <section>
          <SectionTitle kicker="STRESS TEST 3D" title="20 cards con Tilt (peor caso: página de abogados)" />
          <p className="text-white/50 text-sm mb-6 max-w-2xl">
            20 cards con tilt de puntero simultáneas (conteo real de <code>abogados</code>; oficinas = 15).
            Verifica que mover el cursor entre cards no causa jank — listener por elemento + rect cacheado
            en enter (sin layout thrash), springs sobre el rAF compartido de framer.
          </p>
          <div className="relative rounded-3xl border border-gold-500/20 overflow-hidden p-8 bg-navy-600">
            <Parallax speed={0.25} className="absolute -top-10 left-1/3 w-72 h-72 bg-gold-500/10 rounded-full blur-[70px]" />
            <div className="relative grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {Array.from({ length: 20 }).map((_, i) => (
                <Tilt key={i} glare className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-e1">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 mb-3" />
                  <p className="text-white font-light text-sm mb-1">Abogado {i + 1}</p>
                  <p className="text-white/50 text-xs">Inmigración · Accidentes</p>
                </Tilt>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
