'use client';

import { useEffect, useRef } from 'react';

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  'iframe',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

/**
 * Comportamiento de diálogo modal: Escape para cerrar, foco atrapado dentro del
 * panel, scroll del body bloqueado y foco devuelto al disparador al cerrar.
 *
 * El elemento que recibe el ref debe llevar `role="dialog"`, `aria-modal="true"`,
 * un nombre accesible (`aria-label` o `aria-labelledby`) y `tabIndex={-1}` para
 * que sirva de destino de foco cuando no hay nada enfocable dentro.
 */
export function useDialog<T extends HTMLElement = HTMLDivElement>(
  isOpen: boolean,
  onClose: () => void,
) {
  const containerRef = useRef<T | null>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!isOpen) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const getFocusable = () =>
      Array.from(
        containerRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR) ?? [],
      ).filter((el) => el.getClientRects().length > 0);

    const initial = getFocusable()[0] ?? containerRef.current;
    initial?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        onCloseRef.current();
        return;
      }
      if (event.key !== 'Tab') return;

      const items = getFocusable();
      if (items.length === 0) {
        event.preventDefault();
        containerRef.current?.focus();
        return;
      }

      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      const insidePanel = containerRef.current?.contains(active) ?? false;

      if (event.shiftKey && (active === first || !insidePanel)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (active === last || !insidePanel)) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown, true);

    return () => {
      document.removeEventListener('keydown', handleKeyDown, true);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus?.();
    };
  }, [isOpen]);

  return containerRef;
}
