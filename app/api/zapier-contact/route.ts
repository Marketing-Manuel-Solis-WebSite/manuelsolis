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

        // 1. REGLA DE ORO: Validar que no llegue vacío
        // Si no hay utm_source, asumimos que es 'Sitio Web' (Orgánico)
        const finalSource = (utm_source && utm_source.trim() !== '') ? utm_source : 'Sitio Web';
        const finalMedium = (utm_medium && utm_medium.trim() !== '') ? utm_medium : 'Organico';
        const finalCampaign = (utm_campaign && utm_campaign.trim() !== '') ? utm_campaign : 'Directo';

        // 2. CORRECCIÓN: Lógica para "Pregunta" (enquiry_detail)
        // Solo modificamos el detalle si NO es tráfico orgánico.
        // Si es orgánico ('Sitio Web'), dejamos el mensaje del usuario limpio.
        let finalDetail = enquiry_detail;

        if (finalSource !== 'Sitio Web') {
             // Si viene de Google/Facebook/Ads, tal vez sí quieras ver el origen en el texto
             finalDetail = `${enquiry_detail} | Origen: ${finalSource} | Medio: ${finalMedium}`;
        }
        // NOTA: Si quieres que NUNCA se concatene nada en la pregunta, simplemente borra el if de arriba
        // y deja: const finalDetail = enquiry_detail;

        // 3. PAYLOAD
        const payload = {
            name: first_name,
            first_name: first_name,
            last_name: last_name,
            phone: phone,
            email: email,
            
            // Aquí va el mensaje (Limpio si es orgánico, con detalles si es pagado)
            enquiry_detail: finalDetail, 
            
            acceptedTerms: acceptedTerms ? 1 : 0,      
            marketingConsent: marketingConsent ? 1 : 0,
            uri: uri, 
            language_preference: language,
            
            // --- ESTO VA A LA CASILLA FUENTE DEL CRM ---
            // Aquí aseguramos que "Sitio Web" llegue al campo Source
            source: finalSource,       
            utm_source: finalSource,   
            medium: finalMedium,
            utm_medium: finalMedium,
            campaign: finalCampaign
        };

        // --- LOG PARA VERIFICAR ---
        console.log("------------------------------------------------");
        console.log("🚀 PROCESANDO LEAD (Backend)");
        console.log("📤 Source (Fuente):", finalSource);
        console.log("📝 Detalle enviado:", finalDetail);
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