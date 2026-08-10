import { ALL_SERVICE_FAQ_SETS } from '../app/lib/serviceFaq';

/**
 * Vuelca los bloques de FAQ como JSON para scripts/faq-review.mjs.
 *
 * Es un archivo aparte y no un `--eval` porque el shell de Windows parte las
 * cadenas multilínea y esbuild recibe TypeScript truncado.
 */
process.stdout.write(JSON.stringify(ALL_SERVICE_FAQ_SETS));
