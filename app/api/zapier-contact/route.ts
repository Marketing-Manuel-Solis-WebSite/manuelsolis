import { NextRequest, NextResponse } from 'next/server';

const EXTERNAL_API_URL = 'https://bos.manuelsolis.com/lead/manuelsolis';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        
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
            // CAPTURAMOS LOS UTMs
            utm_source,
            utm_medium,
            utm_campaign
        } = body;

        // --- 1. LÓGICA DE FUENTE (SOURCE) ---
        let finalSource = utm_source;

        // Si NO hay source (es null, undefined o vacío) -> Es tráfico Orgánico
        if (!finalSource || finalSource.trim() === '') {
            finalSource = 'SITIO WEB';
        }
        // Si SÍ hay source (ej. "Facebook"), se queda como está.

        // Definimos Medio y Campaña por defecto para orgánicos
        const finalMedium = (utm_medium && utm_medium.trim() !== '') ? utm_medium : 'Organico';
        const finalCampaign = (utm_campaign && utm_campaign.trim() !== '') ? utm_campaign : 'Directo';

        // --- 2. LÓGICA DE LA PREGUNTA (DETAIL) ---
        // Objetivo: No ensuciar la pregunta si vienen directo del sitio.
        
        let finalDetail = enquiry_detail;

        // Solo agregamos info técnica si NO es tráfico orgánico del sitio web
        if (finalSource !== 'SITIO WEB') {
             finalDetail = `${enquiry_detail} | Origen: ${finalSource} | Medio: ${finalMedium}`;
        }

        // --- 3. PAYLOAD ---
        const payload = {
            name: first_name,
            first_name: first_name,
            last_name: last_name,
            phone: phone,
            email: email,
            enquiry_detail: finalDetail, // Va limpia si es SITIO WEB, con datos si es CAMPAÑA
            acceptedTerms: acceptedTerms ? 1 : 0,      
            marketingConsent: marketingConsent ? 1 : 0,
            uri: uri, 
            language_preference: language,
            
            // --- ENVÍO DE FUENTE ---
            source: finalSource,       
            utm_source: finalSource,   
            medium: finalMedium,
            utm_medium: finalMedium,
            campaign: finalCampaign
        };

        console.log("------------------------------------------------");
        console.log("🚀 PROCESANDO LEAD");
        console.log("📤 Source Final:", finalSource); // Dirá "FACEBOOK" o "SITIO WEB"
        console.log("📝 Pregunta Final:", finalDetail);
        console.log("------------------------------------------------");

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
            console.error("❌ ERROR API EXTERNA:", errorText);
            return NextResponse.json({ success: false, error: 'External API error' }, { status: response.status });
        }
    } catch (error) {
        console.error('❌ ERROR SERVIDOR INTERNO:', error);
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
    }
}