// app/api/signup-proxy/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { rateLimit } from '../../lib/rateLimit';

const EXTERNAL_API_URL = 'https://solislawruler.azurewebsites.net/api/signup';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NAME_MAX_LENGTH = 100;
const EMAIL_MAX_LENGTH = 254;
const PHONE_MIN_DIGITS = 7;
const PHONE_MAX_DIGITS = 15;

interface SignupPayload {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    acceptedTerms: true;
    receiveUpdates?: boolean;
}

type ValidationResult =
    | { ok: true; payload: SignupPayload }
    | { ok: false; error: string };

function validateSignupBody(data: unknown): ValidationResult {
    if (typeof data !== 'object' || data === null) {
        return { ok: false, error: 'Cuerpo de la petición inválido.' };
    }

    const body = data as Record<string, unknown>;

    const firstName = typeof body.firstName === 'string' ? body.firstName.trim() : '';
    if (!firstName || firstName.length > NAME_MAX_LENGTH) {
        return { ok: false, error: `firstName es obligatorio (1-${NAME_MAX_LENGTH} caracteres).` };
    }

    const lastName = typeof body.lastName === 'string' ? body.lastName.trim() : '';
    if (!lastName || lastName.length > NAME_MAX_LENGTH) {
        return { ok: false, error: `lastName es obligatorio (1-${NAME_MAX_LENGTH} caracteres).` };
    }

    const email = typeof body.email === 'string' ? body.email.trim() : '';
    if (!email || email.length > EMAIL_MAX_LENGTH || !EMAIL_RE.test(email)) {
        return { ok: false, error: 'Correo electrónico inválido.' };
    }

    // Limpieza de datos: el API externo espera solo dígitos.
    const phoneNumber =
        typeof body.phoneNumber === 'string' || typeof body.phoneNumber === 'number'
            ? String(body.phoneNumber).replace(/[^0-9]/g, '')
            : '';
    if (phoneNumber.length < PHONE_MIN_DIGITS || phoneNumber.length > PHONE_MAX_DIGITS) {
        return {
            ok: false,
            error: `phoneNumber debe tener entre ${PHONE_MIN_DIGITS} y ${PHONE_MAX_DIGITS} dígitos.`,
        };
    }

    if (body.acceptedTerms !== true) {
        return { ok: false, error: 'acceptedTerms debe ser true.' };
    }

    if (body.receiveUpdates !== undefined && typeof body.receiveUpdates !== 'boolean') {
        return { ok: false, error: 'receiveUpdates debe ser booleano.' };
    }

    return {
        ok: true,
        payload: {
            firstName,
            lastName,
            email,
            phoneNumber,
            acceptedTerms: true,
            receiveUpdates: typeof body.receiveUpdates === 'boolean' ? body.receiveUpdates : undefined,
        },
    };
}

export async function POST(request: NextRequest) {
    const EXTERNAL_API_TOKEN = process.env.API_SOLIS_TOKEN;

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

        let data: unknown;
        try {
            data = await request.json();
        } catch {
            return NextResponse.json(
                { success: false, error: 'Cuerpo de la petición inválido.' },
                { status: 400 }
            );
        }

        const validation = validateSignupBody(data);
        if (!validation.ok) {
            return NextResponse.json(
                { success: false, error: validation.error },
                { status: 400 }
            );
        }

        // Llamada al API externa
        const response = await fetch(EXTERNAL_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Api-Token': EXTERNAL_API_TOKEN,
            },
            body: JSON.stringify(validation.payload),
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
