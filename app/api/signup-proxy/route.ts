// app/api/signup-proxy/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { rateLimit } from '../../lib/rateLimit';

const EXTERNAL_API_URL = 'https://solislawruler.azurewebsites.net/api/signup';
// Usamos HARDCODED_TOKEN para evitar problemas de parsing en .env.local con el símbolo '$'
// Este es el token confirmado: uE7#pN1@qL4$XzV9!sW2rM6&dB8F0gT%Kj3A*Hn5C$yR1^vZ7!mP4#G8tQ2hD9
const HARDCODED_TOKEN = 'uE7#pN1@qL4$XzV9!sW2rM6&dB8F0gT%Kj3A*Hn5C$yR1^vZ7!mP4#G8tQ2hD9'; 

export async function POST(request: NextRequest) {
    // Usamos el token hardcodeado
    const EXTERNAL_API_TOKEN = HARDCODED_TOKEN; 

    if (!EXTERNAL_API_TOKEN) {
        return NextResponse.json({ 
            success: false, 
            error: 'Internal server error: API Token not set.' 
        }, { status: 500 });
    }

    try {
        // Rate limiting: 5 signups per minute per IP
        const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
                   request.headers.get('x-real-ip') ||
                   'anonymous';
        const { success: rateLimitOk } = rateLimit(`signup:${ip}`, 5, 60000);
        if (!rateLimitOk) {
            return NextResponse.json(
                { success: false, error: 'Too many requests. Please wait before submitting again.' },
                { status: 429, headers: { 'Retry-After': '60' } }
            );
        }

        const data = await request.json();

        // Limpieza de datos
        const phoneNumberCleaned = data.phoneNumber ? String(data.phoneNumber).replace(/[^0-9]/g, '') : '';

        // Construir el payload
        const payload = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phoneNumber: phoneNumberCleaned,
            acceptedTerms: data.acceptedTerms,
            receiveUpdates: data.receiveUpdates,
        };

        // Llamada al API externa con el token que sabemos que funciona
        const response = await fetch(EXTERNAL_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Api-Token': EXTERNAL_API_TOKEN, 
            },
            body: JSON.stringify(payload),
            signal: AbortSignal.timeout(10000) 
        });

        // Reenviar la respuesta de la API externa
        if (response.ok) {
            const result = await response.json();
            return NextResponse.json(result, { status: 200 });
        } else {
            console.error(`Error de API externa: ${response.status} - ${response.statusText}`);
            
            return NextResponse.json({ 
                success: false, 
                error: `Error de la API externa (HTTP ${response.status}).` 
            }, { 
                status: response.status 
            });
        }
    } catch (error) {
        console.error('Error interno del proxy:', error);
        return NextResponse.json({ 
            success: false, 
            error: 'Error de red o interno del servidor. Por favor, revise la consola.' 
        }, { status: 500 });
    }
}