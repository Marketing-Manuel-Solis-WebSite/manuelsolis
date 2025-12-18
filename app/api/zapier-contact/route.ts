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
        // Usamos trim() para mayor seguridad contra cadenas con solo espacios.
        const finalSource = (utm_source && utm_source.trim() !== '') ? utm_source : 'Sitio Web';
        const finalMedium = (utm_medium && utm_medium.trim() !== '') ? utm_medium : 'Organico';
        const finalCampaign = (utm_campaign && utm_campaign.trim() !== '') ? utm_campaign : 'Directo';

        // 2. Construcción del detalle reforzado
        const enhancedDetail = `${enquiry_detail} | Origen: ${finalSource} | Medio: ${finalMedium}`;

        // 3. PAYLOAD "A PRUEBA DE FALLOS"
        // Duplicamos el source en 'utm_source' y 'source' para asegurar que el CRM lea uno de los dos.
        const payload = {
            name: first_name,
            first_name: first_name,
            last_name: last_name,
            phone: phone,
            email: email,
            enquiry_detail: enhancedDetail, 
            acceptedTerms: acceptedTerms ? 1 : 0,      
            marketingConsent: marketingConsent ? 1 : 0,
            uri: uri, // URI ya limpia desde el front
            language_preference: language,
            
            // --- REDUNDANCIA DE ORIGEN ---
            source: finalSource,       // Campo estándar
            utm_source: finalSource,   // Campo backup
            medium: finalMedium,
            utm_medium: finalMedium,
            campaign: finalCampaign
        };

        // --- LOG PARA VERIFICAR QUE SALE BIEN ---
        console.log("------------------------------------------------");
        console.log("🚀 PROCESANDO LEAD (Backend)");
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
            const errorText = await response.text();
            console.error("❌ ERROR API EXTERNA:", errorText);
            return NextResponse.json({ success: false, error: 'External API error' }, { status: response.status });
        }
    } catch (error) {
        console.error('❌ ERROR SERVIDOR INTERNO:', error);
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
    }
}