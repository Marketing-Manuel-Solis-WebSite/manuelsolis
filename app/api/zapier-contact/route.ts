// app/api/zapier-contact/route.ts
import { NextRequest, NextResponse } from 'next/server';

// Nuevo endpoint directo
const EXTERNAL_API_URL = 'https://bos.manuelsolis.com/lead/manuelsolis';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        
        // 1. Desestructuramos lo que llega del Frontend (camelCase)
        const { 
            first_name, 
            last_name, 
            email, 
            phone, 
            enquiry_detail, 
            acceptedTerms,    // Viene del front (probablemente true/false)
            marketingConsent, // Viene del front (probablemente true/false)
            uri,
            language 
        } = body;

        // 2. CREAMOS EL PAYLOAD FINAL (Transformación)
        // Aquí es donde convertimos todo al formato que pide la API externa
        const payload = {
            // Requerimiento: Añadir name (copia de first_name)
            name: first_name,
            
            // Datos estándar
            first_name: first_name,
            last_name: last_name,
            phone: phone,
            email: email,
            enquiry_detail: enquiry_detail,
            accepted_terms: acceptedTerms ? 1 : 0,      
            marketing_consent: marketingConsent ? 1 : 0,
            
            // La URL con UTMs
            uri: uri,
            
            // Extra opcional
            language_preference: language
        };

        // --- LOG PARA DEBUGGING ---
        console.log("------------------------------------------------");
        console.log("🚀 ENVIANDO A MANUEL SOLIS (PAYLOAD FINAL):");
        console.log(JSON.stringify(payload, null, 2));
        console.log("------------------------------------------------");

        // 3. Enviar al endpoint externo
        const response = await fetch(EXTERNAL_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(payload),
        });

        if (response.ok) {
            console.log("✅ ÉXITO: Recibido 200 OK");
            return NextResponse.json({ success: true });
        } else {
            const errorText = await response.text();
            console.error('❌ ERROR API EXTERNA:', response.status, errorText);
            return NextResponse.json({ success: false, error: 'External API error' }, { status: response.status });
        }
    } catch (error) {
        console.error('❌ ERROR SERVIDOR:', error);
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
    }
}