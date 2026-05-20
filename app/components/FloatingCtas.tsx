'use client';

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
  return (
    <>
      <WhatsAppButton />
      <ConsultaFloatingCta />
      <AIChatButton />
      <MobileStickyBar />
    </>
  );
}
