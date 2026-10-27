# IndexNow

IndexNow avisa a Bing (y a Yandex, Seznam, Naver…, que comparten el protocolo)
de que unas URLs cambiaron, sin esperar a que las vuelvan a rastrear. Google
no lo usa.

## Piezas

- **Clave**: `public/755c476bdf9ecba438cf7a3f869b6919.txt`. El contenido es la
  propia clave. Se sirve en
  `https://www.manuelsolis.com/755c476bdf9ecba438cf7a3f869b6919.txt`: el
  matcher de `proxy.ts` excluye los `.txt` y `robots.ts` no bloquea la raíz.
  No es un secreto: IndexNow la descarga para comprobar que el sitio es
  nuestro.
- **Script**: `scripts/indexnow.mjs` (`npm run indexnow`). Lee el índice del
  sitemap y sus sub-sitemaps, se queda con las URLs de `www.manuelsolis.com` y
  las manda a `https://api.indexnow.org/indexnow` en lotes de hasta 10.000.

## Uso

```bash
npm run indexnow                                              # dry-run contra producción
npm run indexnow -- --sitemap http://localhost:3123/sitemap.xml   # dry-run contra `npm start`
npm run indexnow -- --sitemap ./ruta/sitemap.xml              # dry-run con un archivo
npm run indexnow -- --send                                    # ENVÍO REAL
```

- Sin `--send` nunca envía nada: imprime el recuento, una muestra y los lotes.
- El firewall de Vercel responde 429 a peticiones que no parecen de navegador.
  Si pasa con el sitemap de producción, usa `--sitemap` contra un servidor
  local (`npm run build && npx next start -p 3123`); los sub-sitemaps se piden
  al mismo origen.
- Envía solo después de desplegar: la clave tiene que estar en producción, o
  IndexNow responderá 403.
- No está conectado a CI, deploy ni cron a propósito. Enviar el sitemap entero
  en cada deploy es justo lo que IndexNow pide no hacer: lo indicado es mandar
  las URLs nuevas o cambiadas.

## Respuestas

| HTTP | Significado |
| ---- | ----------- |
| 200 / 202 | Aceptado (202 = clave aún pendiente de validar) |
| 400 | Formato inválido |
| 403 | La clave no coincide con `keyLocation` (¿no desplegada?) |
| 422 | URLs de otro host o clave mal formada |
| 429 | Demasiadas peticiones |

## Revertir / rotar

Borrar el `.txt` deja de validar la clave. Para rotarla: generar otra con
`node -e "console.log(require('crypto').randomBytes(16).toString('hex'))"`,
crear `public/<nueva>.txt` con ese contenido y borrar la anterior (el script
exige que haya exactamente una).
