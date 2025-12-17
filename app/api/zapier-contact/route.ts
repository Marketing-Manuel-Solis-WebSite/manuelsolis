import { NextRequest, NextResponse } from 'next/server';

const EXTERNAL_API_URL = 'https://bos.manuelsolis.com/lead/manuelsolis';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        
        // 1. Desestructuramos incluyendo los nuevos campos del front
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
            // CAPTURAMOS LOS UTMs QUE VIENEN DEL FRONT
            utm_source,
            utm_medium,
            utm_campaign
        } = body;

        // 2. Lógica de Respaldo (Fallback)
        // Si por alguna razón el front no envió utm_source, ponemos "Sitio web"
        const finalSource = utm_source || 'Sitio web';
        const finalMedium = utm_medium || 'Organico';

        // 3. CREAMOS EL PAYLOAD FINAL
        const payload = {
            name: first_name,
            first_name: first_name,
            last_name: last_name,
            phone: phone,
            email: email,
            // Agregamos el origen al detalle para que no se pierda
            enquiry_detail: `${enquiry_detail} | Origen: ${finalSource} | Medio: ${finalMedium}`,
            acceptedTerms: acceptedTerms ? 1 : 0,      
            marketingConsent: marketingConsent ? 1 : 0,
            uri: uri,
            language_preference: language,
            // Si la API externa acepta estos campos, los enviamos:
            source: finalSource,
            medium: finalMedium,
            campaign: utm_campaign
        };

        // --- LOG PARA DEBUGGING ---
        console.log("------------------------------------------------");
        console.log("🚀 PAYLOAD RECIBIDO DEL FRONT:", body);
        console.log("📤 ENVIANDO A API EXTERNA CON ORIGEN:", finalSource);
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
            return NextResponse.json({ success: false, error: 'External API error' }, { status: response.status });
        }
    } catch (error) {
        console.error('❌ ERROR SERVIDOR:', error);
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
    }
}