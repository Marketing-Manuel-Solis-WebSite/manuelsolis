import { describe, expect, it } from 'vitest';

/**
 * Skeleton contract test for the lead-capture payload mapping.
 *
 * STATUS — Phase 2 placeholder:
 *   The lead-capture client (app/lib/leadCapture.ts) doesn't exist
 *   yet — Phase 3 will replace bos.manuelsolis.com with Solislead
 *   and extract the payload mapping into a pure function. Until
 *   that lands, this file documents the expected contract via
 *   `it.todo()` so the assertions become a checklist for Phase 3.
 *
 * Phase 3 must:
 *   1. Export `mapFormToPayload(input: FormInput): SolisleadPayload`
 *      from app/lib/leadCapture.ts as a pure function.
 *   2. Each `it.todo()` below converts to a real assertion.
 *
 * See DISCOVERY_v3.md §10.4 for the proposed payload contract.
 */

describe('mapFormToPayload — UTM defaults', () => {
  it.todo(
    "emits '(direct)' when utm_source is missing, empty, null, or undefined",
  );
  it.todo("emits '(none)' when utm_medium is missing");
  it.todo("emits '(not set)' when utm_campaign is missing");
  it.todo('preserves real UTM values verbatim when present');
  it.todo("returns null for utm_content / utm_term when not provided");
});

describe('mapFormToPayload — practice/office inference', () => {
  it.todo(
    "infers practice_area='visa-u' from page_url '/es/visa-u-houston'",
  );
  it.todo(
    "infers office='houston' from page_url '/es/visa-u-houston'",
  );
  it.todo(
    "infers practice_area='defensa-deportacion' from /servicios/defensa-deportacion",
  );
  it.todo(
    "infers office='dallas' from page_url '/es/oficinas/dallas'",
  );
  it.todo('returns null for both fields when no match in URL');
});

describe('mapFormToPayload — click IDs', () => {
  it.todo('captures gclid when present in URL');
  it.todo('captures fbclid when present in URL');
  it.todo('returns null for both when absent');
});

describe('mapFormToPayload — consent flags', () => {
  it.todo('passes consent_sms and consent_marketing through unchanged');
  it.todo('rejects payloads where consent_sms is missing');
});

describe('mapFormToPayload — required fields', () => {
  it.todo('throws when name is empty');
  it.todo('throws when phone is empty');
  it.todo('throws when email is invalid');
  it.todo("strips trailing whitespace from text fields");
});
