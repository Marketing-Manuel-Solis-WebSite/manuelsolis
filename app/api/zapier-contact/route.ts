import { NextRequest, NextResponse } from 'next/server';
import { checkBotId } from 'botid/server';
import { rateLimit } from '../../lib/rateLimit';

const EXTERNAL_API_URL = 'https://bos.manuelsolis.com/lead/manuelsolis';

export async function POST(request: NextRequest) {
    try {
        // Rate limiting: 5 form submissions per minute per IP
        const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
                   request.headers.get('x-real-ip') ||
                   'anonymous';
        const { success: rateLimitOk } = rateLimit(`contact:${ip}`, 5, 60000);
        if (!rateLimitOk) {
            return NextResponse.json(
                { success: false, error: 'Too many requests. Please wait before submitting again.' },
                { status: 429, headers: { 'Retry-After': '60' } }
            );
        }

        // Vercel BotID — Basic Detection in report-only mode by default.
        // Promote to BOTID_MODE=block after 7 days if false-positive rate is OK.
        const botMode = process.env.BOTID_MODE ?? 'report-only';
        const verification = await checkBotId();
        if (verification.isBot) {
            console.warn(JSON.stringify({
                event: 'botid_detected',
                endpoint: '/api/zapier-contact',
                mode: botMode,
                timestamp: new Date().toISOString(),
                ip,
                ua: request.headers.get('user-agent') ?? null,
            }));
            if (botMode === 'block') {
                return NextResponse.json(
                    { success: false, error: 'Access denied' },
                    { status: 403 }
                );
            }
        }

        const body = await request.json();
        
        console.log("📥 [BACKEND] Body recibido:", body);

        const { 
            first_name, 
            last_name, 
            email, 
            phone, 
            enquiry_detail, 
            acceptedTerms,
            marketingConsent,
            uri,
            language,
            utm_source,
            utm_medium,
            utm_campaign
        } = body;

        // --- LÓGICA DE FUENTE (SOURCE) ---
        // Defaults a centinelas estándar GA4 cuando llegan vacíos / null / undefined.
        // El cliente ya envía centinelas correctos; esto es defensa adicional para
        // requests que pudieran venir de otras integraciones.
        const isMissing = (v: unknown): boolean =>
            v === undefined || v === null ||
            (typeof v === 'string' && (v.trim() === '' || v === 'null' || v === 'undefined'));

        const finalSource = isMissing(utm_source) ? '(direct)' : utm_source;
        const finalMedium = isMissing(utm_medium) ? '(none)' : utm_medium;
        const finalCampaign = isMissing(utm_campaign) ? '(not set)' : utm_campaign;

        // --- LÓGICA DE PREGUNTA ---
        // Solo agregar suffix "| Fuente: X" cuando el source NO es centinela
        // (i.e. es UTM real de paid/referral). Evita ensuciar el detalle con
        // "(direct)" / "(none)" / "(not set)" que no aporta info al equipo legal.
        const SENTINEL_SOURCES = ['(direct)', '(none)', '(not set)'];
        const isSentinelSource = SENTINEL_SOURCES.includes(finalSource);

        let finalDetail = enquiry_detail || '';
        if (!isSentinelSource && finalSource) {
            finalDetail = `${finalDetail} | Fuente: ${finalSource}`;
        }

        // --- PAYLOAD ---
        const payload = {
            name: first_name,       
            first_name: first_name,
            last_name: last_name,
            phone: phone,
            email: email,
            enquiry_detail: finalDetail, 
            
            acceptedTerms: acceptedTerms ? 1 : 0,      
            marketingConsent: marketingConsent ? 1 : 0,
            
            // Aquí pasamos la URI tal cual vino del frontend (Completa o Limpia según corresponda)
            uri: uri, 
            
            language_preference: language,
            
            source: finalSource,       
            utm_source: finalSource,   
            medium: finalMedium,
            utm_medium: finalMedium,
            campaign: finalCampaign
        };

        console.log("🚀 [BACKEND] Enviando Source:", finalSource);
        console.log("🔗 [BACKEND] Enviando URI:", uri);

        const response = await fetch(EXTERNAL_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(payload),
        });

        if (response.ok) {
            return NextResponse.json({ success: true });
        } else {
            const errorText = await response.text();
            console.error("❌ ERROR API:", errorText);
            return NextResponse.json({ success: false, error: 'External API error' }, { status: response.status });
        }
    } catch (error) {
        console.error('❌ ERROR SERVIDOR:', error);
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
    }
}