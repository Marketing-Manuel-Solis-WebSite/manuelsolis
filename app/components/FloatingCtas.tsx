'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

/**
 * Floating CTAs are not LCP-critical and not needed in the SSR HTML, so they
 * are loaded client-side only (`ssr: false`) and code-split out of the First
 * Load. They still appear on screen — just hydrated a beat after the page is
 * interactive. AIChatButton in particular drags chat logic, so deferring it
 * keeps that weight off every route's initial bundle.
 */
const WhatsAppButton = dynamic(() => import('./WhatsAppButton'), { ssr: false });
const ConsultaFloatingCta = dynamic(() => import('./ConsultaFloatingCta'), { ssr: false });
const AIChatButton = dynamic(() => import('./AIChatButton'), { ssr: false });
const MobileStickyBar = dynamic(() => import('./MobileStickyBar'), { ssr: false });

export default function FloatingCtas() {
  // El panel móvil del Header es un diálogo modal (role="dialog", z-40) y estos
  // CTAs son fixed z-50: sin ocultarlos flotarían sobre el overlay y taparían
  // los últimos enlaces del menú (idioma / consulta) por debajo de 1024px.
  // Header.tsx emite este evento al abrir y cerrar el panel.
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onToggle = (event: Event) => {
      setIsMobileMenuOpen(Boolean((event as CustomEvent<boolean>).detail));
    };
    window.addEventListener('msolis:mobile-menu-toggle', onToggle);
    return () => window.removeEventListener('msolis:mobile-menu-toggle', onToggle);
  }, []);

  // Envoltorio sin estilos propios: todos los hijos son `fixed`, así que no
  // altera la maquetación; solo permite apagarlos en bloque con display:none
  // (que además los saca del árbol de accesibilidad y del orden de tabulación).
  return (
    <div className={isMobileMenuOpen ? 'hidden' : undefined}>
      <WhatsAppButton />
      <ConsultaFloatingCta />
      <AIChatButton />
      <MobileStickyBar />
    </div>
  );
}
