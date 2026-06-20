'use client';

import { useEffect } from 'react';
import { fireConversion } from '../lib/conversion';

/**
 * Scoped phone / WhatsApp click tracker — a tiny client island with no UI.
 *
 * Mount it INSIDE a page's `<main id="main-content">` (server pages can render
 * it directly — it ships no content to the client beyond this effect). It
 * attaches ONE delegated click listener scoped to `#main-content` and fires
 * `fireConversion()` for any `tel:` or `wa.me`/WhatsApp link clicked inside it.
 *
 * This closes the tracking gap on the city×service landings and the offices
 * index, whose phone CTAs previously fired ZERO conversion events — so calls
 * from the firm's main paid/organic entry points were invisible to
 * GA4/Meta/TikTok/Flight-Check.
 *
 * Scoped to `#main-content` on purpose: the global Header, FloatingCtas and
 * MobileStickyBar live OUTSIDE `<main>` and fire their own conversion events,
 * so this never double-counts them. Links keep working natively — we never
 * call preventDefault.
 */
export default function PhoneClickTracker({
  label = 'page',
  office,
  practiceArea,
}: {
  label?: string;
  office?: string;
  practiceArea?: string;
}) {
  useEffect(() => {
    const root = document.getElementById('main-content') ?? document.body;

    const onClick = (e: Event) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest?.('a[href]') as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute('href') ?? '';

      const meta: Record<string, string> = {};
      if (office) meta.office = office;
      if (practiceArea) meta.practice_area = practiceArea;

      if (href.startsWith('tel:')) {
        fireConversion('phone_click', label, meta);
      } else if (/wa\.me|whatsapp/i.test(href)) {
        fireConversion('whatsapp_click', label, meta);
      }
    };

    // Capture phase so the event is recorded before the tel:/wa.me navigation.
    root.addEventListener('click', onClick, true);
    return () => root.removeEventListener('click', onClick, true);
  }, [label, office, practiceArea]);

  return null;
}
