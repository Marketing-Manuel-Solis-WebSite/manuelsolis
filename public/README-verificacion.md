# Archivos de verificación de dominio

Los `tiktok*.txt`, y cualquier equivalente de otra plataforma, se sirven desde
la raíz del dominio para demostrar la propiedad del sitio.

**No son secretos.** El token solo prueba algo cuando se sirve DESDE este
dominio: quien lo copie no puede verificar nada con él. Por eso van al repo
como cualquier otro archivo estático, aunque sea público — es la práctica
estándar, la misma de los ficheros de verificación de Google o Bing.

Lo que sí es secreto y NUNCA va aquí ni en ningún archivo del repo: el
`client secret` de la app. Ese vive en las variables de entorno de Vercel.

El matcher de `proxy.ts` excluye `.txt`, así que estos archivos NO pasan por
la redirección de idioma y responden en la raíz tal cual.
