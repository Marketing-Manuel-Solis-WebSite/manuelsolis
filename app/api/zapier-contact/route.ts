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
            // CAPTURAMOS LOS UTMs QUE VIENEN DEL FRONT
            utm_source,
            utm_medium,
            utm_campaign
        } = body;

        // 1. Lógica de Respaldo Estricta
        // Si viene null, undefined o string vacío, forzamos "Sitio web"
        const finalSource = (utm_source && utm_source.trim() !== '') ? utm_source : 'Sitio web';
        const finalMedium = (utm_medium && utm_medium.trim() !== '') ? utm_medium : 'Organico';
        const finalCampaign = (utm_campaign && utm_campaign.trim() !== '') ? utm_campaign : 'Directo';

        // 2. Construcción del detalle reforzado
        // Agregamos el origen al cuerpo del mensaje para que quede constancia escrita en el CRM
        const enhancedDetail = `${enquiry_detail} | Origen: ${finalSource} | Medio: ${finalMedium}`;

        // 3. CREAMOS EL PAYLOAD FINAL
        const payload = {
            name: first_name,
            first_name: first_name,
            last_name: last_name,
            phone: phone,
            email: email,
            enquiry_detail: enhancedDetail, 
            acceptedTerms: acceptedTerms ? 1 : 0,      
            marketingConsent: marketingConsent ? 1 : 0,
            uri: uri, // Usamos la URI limpia que envió el front
            language_preference: language,
            
            // Campos explícitos para la API externa
            source: finalSource,
            medium: finalMedium,
            campaign: finalCampaign
        };

        // --- LOG PARA DEBUGGING ---
        console.log("------------------------------------------------");
        console.log("🚀 PROCESANDO LEAD");
        console.log("📥 Source Original:", utm_source);
        console.log("📤 Source Final:", finalSource);
        console.log("🔗 URI:", uri);
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
            // Log del error externo si ocurre
            const errorText = await response.text();
            console.error("❌ ERROR API EXTERNA:", errorText);
            return NextResponse.json({ success: false, error: 'External API error' }, { status: response.status });
        }
    } catch (error) {
        console.error('❌ ERROR SERVIDOR INTERNO:', error);
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
    }
}