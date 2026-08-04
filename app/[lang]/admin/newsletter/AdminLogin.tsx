'use client';

import { Lock, ShieldAlert, Mail } from 'lucide-react';
import { m } from 'framer-motion';
import { loginAction } from './actions';

export type LoginErrorKind = 'invalid' | 'server' | 'ratelimited';

const ERROR_MESSAGES: Record<LoginErrorKind, string> = {
  invalid: 'Contraseña incorrecta.',
  server: 'Error de configuración del servidor. Contacta al equipo de desarrollo.',
  ratelimited:
    'Demasiados intentos de acceso desde esta red. Espera 5 minutos e intenta de nuevo.',
};

export default function AdminLogin({
  lang,
  hasError,
  errorKind,
  next,
}: {
  lang: 'es' | 'en';
  hasError: boolean;
  errorKind?: LoginErrorKind;
  next?: string;
}) {
  const errorMessage = ERROR_MESSAGES[errorKind ?? 'invalid'];

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="min-h-screen bg-[#001540] flex items-center justify-center px-4 py-12"
    >
      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-white/10">
          <div className="bg-[#001540] px-8 py-10 text-center border-b-2 border-[#B2904D]">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#B2904D] mb-4">
              <Mail className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Newsletter Blast
            </h1>
            <p className="text-sm text-white/70 mt-2">
              Panel interno · Manuel Solis Law
            </p>
          </div>

          <form action={loginAction} className="px-8 py-8 space-y-5">
            <input type="hidden" name="lang" value={lang} />
            {next && <input type="hidden" name="next" value={next} />}

            <div>
              <label
                htmlFor="password"
                className="flex items-center gap-2 text-sm font-semibold text-[#001540] mb-2"
              >
                <Lock className="w-4 h-4" />
                Contraseña de acceso
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoFocus
                autoComplete="current-password"
                placeholder="••••••••••••••"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#B2904D] focus:border-transparent transition"
              />
            </div>

            {hasError && (
              <m.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="flex items-start gap-2 px-4 py-3 bg-red-50 border border-red-200 rounded-lg"
              >
                <ShieldAlert className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">{errorMessage}</p>
              </m.div>
            )}

            <button
              type="submit"
              className="w-full py-3 px-4 bg-[#001540] hover:bg-[#002a73] text-white font-semibold rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              Ingresar
            </button>
          </form>

          <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-500">
              La sesión expira a las 4 horas. Acceso registrado en logs del servidor.
            </p>
          </div>
        </div>
      </m.div>
    </main>
  );
}
