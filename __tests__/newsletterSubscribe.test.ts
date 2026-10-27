import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { NextRequest } from 'next/server';
import {
  FIRST_NAME_MAX,
  parseLanguage,
  sanitizeFirstName,
} from '../app/lib/newsletter/subscribeInput';
import {
  DEFAULT_FROM_ADDRESS,
  getFromAddress,
} from '../app/lib/newsletter/fromAddress';

/**
 * Alta al boletín. Las funciones de validación se prueban sueltas; el route se
 * prueba con Resend y BotID simulados para fijar que la forma de la respuesta
 * y el camino válido no cambian, y que los campos sucios no llegan a Resend.
 */

const contactsCreate = vi.fn();
const emailsSend = vi.fn();

vi.mock('resend', () => ({
  Resend: class {
    contacts = { create: contactsCreate };
    emails = { send: emailsSend };
  },
}));

vi.mock('botid/server', () => ({
  checkBotId: async () => ({ isBot: false }),
}));

// Sin tope: cada test usaría la misma IP y el límite real (3/min) cortaría.
vi.mock('../app/lib/rateLimit', () => ({
  rateLimit: () => ({ success: true }),
}));

describe('sanitizeFirstName', () => {
  it('devuelve vacío si falta', () => {
    expect(sanitizeFirstName(undefined)).toBe('');
    expect(sanitizeFirstName(null)).toBe('');
  });

  it('rechaza lo que no es string', () => {
    expect(sanitizeFirstName(42)).toBeNull();
    expect(sanitizeFirstName({ name: 'x' })).toBeNull();
    expect(sanitizeFirstName(['Ana'])).toBeNull();
  });

  it('deja intacto un nombre normal, con acentos y eñes', () => {
    expect(sanitizeFirstName('María José Peña')).toBe('María José Peña');
  });

  it('recorta espacios y colapsa los internos', () => {
    expect(sanitizeFirstName('   Ana    Luisa  ')).toBe('Ana Luisa');
  });

  it('quita etiquetas HTML y corchetes angulares sueltos', () => {
    expect(sanitizeFirstName('<b>Ana</b>')).toBe('Ana');
    expect(sanitizeFirstName('<script>alert(1)</script>Ana')).toBe('alert(1) Ana');
    expect(sanitizeFirstName('Ana <img src=x onerror=y>')).toBe('Ana');
    expect(sanitizeFirstName('Ana < Luis')).toBe('Ana Luis');
    expect(sanitizeFirstName('Ana > Luis')).toBe('Ana Luis');
  });

  it('quita caracteres de control', () => {
    expect(sanitizeFirstName('Ana\u0000\r\nBcc: x@y.com')).toBe('Ana Bcc: x@y.com');
    expect(sanitizeFirstName('Ana' + String.fromCharCode(0x2028) + 'Luisa\u007F')).toBe('Ana Luisa');
  });

  it(`corta en ${FIRST_NAME_MAX} caracteres sin partir emojis`, () => {
    expect(sanitizeFirstName('a'.repeat(200))).toHaveLength(FIRST_NAME_MAX);
    const emojis = sanitizeFirstName('😀'.repeat(100))!;
    expect(Array.from(emojis)).toHaveLength(FIRST_NAME_MAX);
    expect(emojis).toBe('😀'.repeat(FIRST_NAME_MAX));
  });

  it('un nombre que solo era marcado queda vacío', () => {
    expect(sanitizeFirstName('<br/>')).toBe('');
  });
});

describe('parseLanguage', () => {
  it('acepta es y en', () => {
    expect(parseLanguage('es')).toBe('es');
    expect(parseLanguage('en')).toBe('en');
  });

  it('usa es si falta, como siempre', () => {
    expect(parseLanguage(undefined)).toBe('es');
    expect(parseLanguage(null)).toBe('es');
  });

  it('rechaza cualquier otro valor', () => {
    for (const v of ['', 'EN', 'fr', 'es-MX', 1, {}]) expect(parseLanguage(v)).toBeNull();
  });
});

describe('getFromAddress', () => {
  const ORIGINAL = process.env.NEWSLETTER_FROM_ADDRESS;
  afterEach(() => {
    if (ORIGINAL === undefined) delete process.env.NEWSLETTER_FROM_ADDRESS;
    else process.env.NEWSLETTER_FROM_ADDRESS = ORIGINAL;
  });

  it('conserva el remitente de siempre', () => {
    delete process.env.NEWSLETTER_FROM_ADDRESS;
    expect(DEFAULT_FROM_ADDRESS).toBe('Manuel Solis Law <newsletter@manuelsolis.com>');
    expect(getFromAddress()).toBe(DEFAULT_FROM_ADDRESS);
  });
});

describe('POST /api/newsletter/subscribe', () => {
  const ENV = { ...process.env };

  beforeEach(() => {
    process.env.RESEND_API_KEY = 'test';
    process.env.RESEND_AUDIENCE_ID = 'aud_test';
    delete process.env.NEWSLETTER_FROM_ADDRESS;
    contactsCreate.mockReset().mockResolvedValue({});
    emailsSend.mockReset().mockResolvedValue({});
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    process.env = { ...ENV };
    vi.restoreAllMocks();
  });

  async function post(body: unknown) {
    const { POST } = await import('../app/api/newsletter/subscribe/route');
    const res = await POST(
      new NextRequest('https://www.manuelsolis.com/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'content-type': 'application/json', 'x-forwarded-for': '203.0.113.9' },
        body: JSON.stringify(body),
      }),
    );
    return { status: res.status, json: await res.json() };
  }

  it('alta válida: misma respuesta, mismo remitente, idioma por defecto es', async () => {
    const res = await post({ email: 'ana@example.com', firstName: 'Ana' });
    expect(res).toEqual({ status: 200, json: { success: true } });
    expect(contactsCreate).toHaveBeenCalledWith(
      expect.objectContaining({ email: 'ana@example.com', firstName: 'Ana' }),
    );
    const sent = emailsSend.mock.calls[0][0];
    expect(sent.from).toBe('Manuel Solis Law <newsletter@manuelsolis.com>');
    expect(sent.subject).toBe('¡Bienvenido al Newsletter de Manuel Solis!');
  });

  it('respeta language=en', async () => {
    await post({ email: 'ana@example.com', firstName: 'Ana', language: 'en' });
    expect(emailsSend.mock.calls[0][0].subject).toBe('Welcome to the Manuel Solis Newsletter!');
  });

  it('el nombre llega limpio a Resend', async () => {
    await post({ email: 'ana@example.com', firstName: '  <b>Ana</b>\r\n' });
    expect(contactsCreate.mock.calls[0][0].firstName).toBe('Ana');
  });

  it('400 si firstName no es string', async () => {
    const res = await post({ email: 'ana@example.com', firstName: { $gt: '' } });
    expect(res).toEqual({ status: 400, json: { success: false, error: 'Invalid first name.' } });
    expect(contactsCreate).not.toHaveBeenCalled();
  });

  it('400 si language no es es|en', async () => {
    const res = await post({ email: 'ana@example.com', language: 'fr' });
    expect(res).toEqual({ status: 400, json: { success: false, error: 'Invalid language.' } });
    expect(emailsSend).not.toHaveBeenCalled();
  });

  it('el email sigue validándose primero', async () => {
    const res = await post({ email: 'nope', language: 'fr' });
    expect(res).toEqual({ status: 400, json: { success: false, error: 'Invalid email address.' } });
  });
});
