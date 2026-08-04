'use client';

import { fireConversion } from '../lib/conversion';

/**
 * Tracked tel: link — small client island that preserves the office-page phone
 * conversion event (pushToDataLayer + trackConversion) when an office detail
 * page is rendered server-first. The display text and styling come from the
 * server (1:1 with the original anchor); only the click handler lives here, so
 * no page content enters the client bundle.
 */
export default function TrackedPhoneLink({
  phone,
  className,
}: {
  phone: string;
  className?: string;
}) {
  // El NAP del repo trae 10 dígitos —«(713) 701-1731»—, pero este componente
  // recibe el número por prop desde tres páginas distintas: si alguna pasa el
  // 1 de país incluido, `+1` + dígitos daría un tel: inválido («+11713…»).
  const digits = phone.replace(/\D/g, '');
  const national = digits.length === 11 && digits.startsWith('1') ? digits.slice(1) : digits;
  const href = `tel:+1${national}`;
  return (
    <a
      href={href}
      onClick={() => {
        fireConversion('phone_click', 'office_page_call', { location: 'office_page' });
      }}
      className={className}
    >
      {phone}
    </a>
  );
}
