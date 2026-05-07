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

initBotId({
  protect: [
    { path: '/api/zapier-contact', method: 'POST' },
    { path: '/api/newsletter/subscribe', method: 'POST' },
  ],
});
