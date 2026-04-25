import type { BosPerson, BlastVariant } from './types';

/**
 * THE SWAPPABLE CLASSIFIER.
 *
 * Current BOS API only exposes identity fields (id, name, email, phone).
 * There is no is_client / consultations_count / status field, so today the
 * only signal is "known in BOS" vs "unknown". Person in BOS => assume warm,
 * suppress hard CTA. Person not in BOS => cold, show full CTA.
 *
 * When BOS extends /api/persons/search with pipeline fields, change this
 * function only. Add 'warm-lead' variant in BlastVariant if a third tier
 * is introduced.
 */
export function classify(person: BosPerson | null): BlastVariant {
  if (!person) return 'cta';
  return 'no-cta';
}

export function bosLookupFailedFallback(): BlastVariant {
  return 'cta';
}

export function emailsMatchCaseInsensitive(a: string, b: string): boolean {
  return a.trim().toLowerCase() === b.trim().toLowerCase();
}
