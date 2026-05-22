'use client';

import { pushToDataLayer, trackConversion } from '../lib/tracking';

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
  const href = `tel:+1${phone.replace(/\D/g, '')}`;
  return (
    <a
      href={href}
      onClick={() => {
        pushToDataLayer('phone_click', { event_category: 'conversion', event_label: 'office_page_call' });
        trackConversion('phone_click', 'office_page_call');
      }}
      className={className}
    >
      {phone}
    </a>
  );
}
