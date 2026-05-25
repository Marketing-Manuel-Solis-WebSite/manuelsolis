// Vercel BotID — client-side initialization.
// Registers the endpoints whose POST requests must carry a bot-detection
// signal. The actual decision is made server-side via checkBotId() inside
// each protected route.
//
// Mode is controlled by env BOTID_MODE on the server side:
//   - 'report-only' (default): bot detections are logged but NOT blocked.
//   - 'block': bot detections return 403.
//
// See DISCOVERY_v3.md §9.0 hotfix #4. Promote to 'block' after 7 days
// of report-only observation if false-positive rate is acceptable.
import { initBotId } from 'botid/client/core';

// Skip BotID on localhost / non-Vercel hosts: el script de challenge se sirve
// vía HTTPS desde la infraestructura de Vercel; en `next dev` (HTTP) falla
// con ERR_SSL_PROTOCOL_ERROR y deja los fetch() de formularios colgados
// esperando un token que nunca llega. El server (`checkBotId`) ya auto-
// bypasea en dev vía developmentOptions.isDevelopment default. En producción
// (manuelsolis.com en Vercel) este guard es falso y BotID corre normal.
const host =
  typeof window !== 'undefined' ? window.location.hostname : '';
const isLocalDev =
  host === 'localhost' ||
  host === '127.0.0.1' ||
  host === '0.0.0.0' ||
  host.endsWith('.local');

if (!isLocalDev) {
  initBotId({
    protect: [
      { path: '/api/lead-capture', method: 'POST' },
      { path: '/api/newsletter/subscribe', method: 'POST' },
    ],
  });
}
