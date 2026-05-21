// Screenshot-diff capture. reduced-motion + fine scroll-through latches
// whileInView reveals (once:true); a final force-reveal style neutralizes any
// element framer still left at inline opacity:0 so fullPage captures show the
// FINAL visible state (no blank sections). Capture aid only — not an app change.
// Usage: node scripts/shot.mjs <path> <outdir>
import { chromium } from 'playwright-core';
import { existsSync } from 'node:fs';

const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const routePath = process.argv[2] || '/servicios/inmigracion';
const out = process.argv[3] || 'docs/fase-2-3';
const slug = routePath.replace(/\//g, '_').replace(/^_/, '') || 'home';

const browser = await chromium.launch({ executablePath: existsSync(EDGE) ? EDGE : undefined, headless: true });

for (const lang of ['es', 'en']) {
  for (const vp of [{ n: 'desktop', w: 1440, h: 900 }, { n: 'mobile', w: 390, h: 844 }]) {
    const ctx = await browser.newContext({ viewport: { width: vp.w, height: vp.h }, deviceScaleFactor: 2, reducedMotion: 'reduce' });
    const page = await ctx.newPage();
    await page.goto(`http://localhost:3000/${lang}${routePath}`, { waitUntil: 'networkidle' });
    await page.evaluate(async () => {
      for (let y = 0; y <= document.body.scrollHeight; y += 300) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 60)); }
      window.scrollTo(0, 0);
      await new Promise(r => setTimeout(r, 300));
    });
    // force-reveal anything framer left hidden inline (final-state guarantee)
    await page.addStyleTag({ content: '[style*="opacity: 0"],[style*="opacity:0"]{opacity:1!important;transform:none!important;}' });
    await page.waitForTimeout(300);
    await page.screenshot({ path: `${out}/${slug}-${lang}-${vp.n}.png`, fullPage: true });
    await ctx.close();
  }
}
await browser.close();
console.log('done');
