/**
 * Entrega de un lead a sus destinos (BOS y/o BoSpot) según LEAD_DESTINATION.
 *
 * Con varios destinos los POST van en paralelo, así que el formulario no
 * espera más que con uno. El usuario ve éxito si CUALQUIER destino aceptó el
 * lead: no se perdió. El correo de respaldo depende solo del primario, que es
 * donde el equipo trabaja los leads; si falla ahí, hay que capturarlo a mano
 * aunque el secundario lo haya guardado.
 */
import {
  buildBospotPayload,
  BOSPOT_DEFAULT_ENDPOINT,
  resolveLeadDestinations,
  type BospotLeadContext,
  type LeadDestinations,
} from './bospot';
import { postLead, type LeadPayload, type PostLeadOptions, type PostLeadResult } from './leadCapture';

export interface LeadDeliveryResult {
  destinations: LeadDestinations;
  /** Algún destino aceptó el lead. */
  ok: boolean;
  /** Resultado del destino primario: decide el correo de respaldo. */
  primary: PostLeadResult;
  bos?: PostLeadResult;
  bospot?: PostLeadResult;
}

export interface DeliverLeadOptions {
  env?: Record<string, string | undefined>;
  /** Solo para pruebas: se pasa a cada postLead. */
  postOptions?: Pick<PostLeadOptions, 'maxAttempts' | 'baseDelayMs' | 'timeoutMs' | 'totalTimeoutMs'>;
}

export async function deliverLead(
  payload: LeadPayload,
  context: BospotLeadContext,
  options: DeliverLeadOptions = {},
): Promise<LeadDeliveryResult> {
  const env = options.env ?? process.env;
  const token = env.BOSPOT_LEADS_TOKEN?.trim();
  const destinations = resolveLeadDestinations(env.LEAD_DESTINATION, !!token);

  const [bos, bospot] = await Promise.all([
    destinations.bos
      ? postLead(payload, {
          ...options.postOptions,
          destination: 'bos',
          endpoint: env.LEAD_CAPTURE_ENDPOINT?.trim() || undefined,
        })
      : Promise.resolve(undefined),
    destinations.bospot
      ? postLead(payload, {
          ...options.postOptions,
          destination: 'bospot',
          endpoint: env.BOSPOT_LEADS_ENDPOINT?.trim() || BOSPOT_DEFAULT_ENDPOINT,
          headers: { Authorization: `Bearer ${token}` },
          body: buildBospotPayload(payload, context),
          // BoSpot deduplica por event_id: la misma clave en la cabecera.
          idempotencyKey: context.event_id,
        })
      : Promise.resolve(undefined),
  ]);

  const primary = (destinations.primary === 'bospot' ? bospot : bos) as PostLeadResult;
  return {
    destinations,
    ok: !!bos?.ok || !!bospot?.ok,
    primary,
    bos,
    bospot,
  };
}
