// Vercel BotID — client-side initialization.
//
// El client-side patching de fetch() requiere que Vercel BotID esté
// realmente activado en el proyecto (Dashboard → Settings → Security →
// BotID). Si no lo está, el script de challenge (/149e9513-…/c.js) no
// se sirve, getChallenge() nunca resuelve, y CUALQUIER fetch a un path
// protegido se queda colgado para siempre, sin error visible. Eso fue
// lo que rompió newsletter y contact form en producción desde 2026-05-07.
//
// Por eso ahora el init es opt-in vía NEXT_PUBLIC_BOTID_CLIENT_ENABLED:
//   - Default (sin la env var) → BotID client NO inicia, fetch va directo.
//     El server sigue ejecutando checkBotId() pero en report-only no bloquea.
//   - 'true' → BotID client inicia y patchea fetch. Solo prender cuando se
//     confirme en el Dashboard de Vercel que BotID está activo en el
//     proyecto y el dominio (manuelsolis.com).
//
// Mode is controlled by env BOTID_MODE on the server side:
//   - 'report-only' (default): bot detections are logged but NOT blocked.
//   - 'block': bot detections return 403.
import { initBotId } from 'botid/client/core';

const host =
  typeof window !== 'undefined' ? window.location.hostname : '';
const isLocalDev =
  host === 'localhost' ||
  host === '127.0.0.1' ||
  host === '0.0.0.0' ||
  host.endsWith('.local');
const botidClientEnabled =
  process.env.NEXT_PUBLIC_BOTID_CLIENT_ENABLED === 'true';

if (!isLocalDev && botidClientEnabled) {
  initBotId({
    protect: [
      { path: '/api/lead-capture', method: 'POST' },
      { path: '/api/newsletter/subscribe', method: 'POST' },
      // /api/chat ejecuta checkBotId() en el servidor: sin esta entrada, el
      // fetch del navegador no lleva challenge y BOTID_MODE=block devolvería
      // 403 a usuarios reales del chat.
      { path: '/api/chat', method: 'POST' },
    ],
  });
}
