import { NextRequest, NextResponse } from 'next/server';
import { rateLimit } from '../../lib/rateLimit';

/**
 * FASE 4 — Flight Check API
 * Registra conversiones del lado servidor para conciliar con GA4.
 *
 * POST /api/conversions  → Registra una conversión
 * GET  /api/conversions   → Devuelve el resumen (protegido con ?key=)
 */

// ─── Almacenamiento en memoria (per-instance) ───
interface StoredConversion {
  type: string;
  source: string;
  medium: string;
  campaign?: string;
  label?: string;
  domain: string;
  timestamp: string;
  ip: string;
}

const conversions: StoredConversion[] = [];
const MAX_STORED = 10000; // Límite de memoria

// Limpiar registros con más de 30 días
function cleanup() {
  const cutoff = Date.now() - 30 * 24 * 60 * 60 * 1000;
  let i = 0;
  while (i < conversions.length && new Date(conversions[i].timestamp).getTime() < cutoff) {
    i++;
  }
  if (i > 0) conversions.splice(0, i);
}

// ─── POST: Registrar conversión ───
export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      'anonymous';

    // Rate limit: 30 eventos/minuto por IP (más permisivo que formularios)
    const { success: rateLimitOk } = rateLimit(`conv:${ip}`, 30, 60000);
    if (!rateLimitOk) {
      return NextResponse.json({ ok: false }, { status: 429 });
    }

    const body = await request.json();

    const validTypes = ['form_submit', 'phone_click', 'whatsapp_click', 'consulta_click', 'qualified_lead'];
    if (!body.type || !validTypes.includes(body.type)) {
      return NextResponse.json({ ok: false, error: 'Invalid event type' }, { status: 400 });
    }

    const entry: StoredConversion = {
      type: body.type,
      source: String(body.source || 'direct').slice(0, 100),
      medium: String(body.medium || 'none').slice(0, 100),
      campaign: body.campaign ? String(body.campaign).slice(0, 200) : undefined,
      label: body.label ? String(body.label).slice(0, 200) : undefined,
      domain: String(body.domain || 'unknown').slice(0, 100),
      timestamp: body.timestamp || new Date().toISOString(),
      ip,
    };

    // Almacenar
    cleanup();
    if (conversions.length >= MAX_STORED) {
      conversions.splice(0, 1000); // liberar espacio
    }
    conversions.push(entry);

    // Log estructurado para Vercel Logs (permite queries posteriores)
    console.log(
      `[FLIGHT-CHECK] ${entry.type} | src=${entry.source} | med=${entry.medium} | cmp=${entry.campaign || '-'} | dom=${entry.domain} | lbl=${entry.label || '-'}`
    );

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

// ─── GET: Reporte de conciliación ───
export async function GET(request: NextRequest) {
  // Auth via Authorization header (Bearer token); fallback a query param para retrocompatibilidad pero deprecated
  const expectedKey = process.env.CONVERSIONS_API_KEY;
  if (!expectedKey) {
    return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 });
  }

  const authHeader = request.headers.get('authorization');
  const bearerKey = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;
  const queryKey = request.nextUrl.searchParams.get('key');
  const providedKey = bearerKey || queryKey;

  if (!providedKey || providedKey !== expectedKey) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const daysBack = parseInt(request.nextUrl.searchParams.get('days') || '7', 10);
  const cutoff = Date.now() - daysBack * 24 * 60 * 60 * 1000;

  const filtered = conversions.filter(
    (c) => new Date(c.timestamp).getTime() >= cutoff
  );

  // Agrupar por dominio y tipo
  const summary: Record<string, Record<string, number>> = {};
  for (const c of filtered) {
    if (!summary[c.domain]) summary[c.domain] = {};
    summary[c.domain][c.type] = (summary[c.domain][c.type] || 0) + 1;
  }

  // Agrupar por fuente
  const bySource: Record<string, number> = {};
  for (const c of filtered) {
    const key = `${c.source}/${c.medium}`;
    bySource[key] = (bySource[key] || 0) + 1;
  }

  return NextResponse.json({
    period_days: daysBack,
    total_conversions: filtered.length,
    by_domain: summary,
    by_source: bySource,
    raw: filtered.slice(-200), // últimos 200 para inspección
  });
}
