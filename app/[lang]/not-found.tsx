// notFound() lanzado dentro de una página de [lang] (hoy solo los posts
// programados: las rutas dinámicas heredan dynamicParams = false del root
// layout, así que un slug desconocido ya es un 404 de framework y lo pinta
// app/global-not-found.tsx).
//
// Medido con Next 16.4.3 (oct-2026): este boundary NO llega al HTML del
// servidor. El 404 de un post programado sale como el "error shell" de Next
// (<html id="__next_error__"> sin lang ni vista) y esta vista aparece solo al
// hidratar. No filtra contenido del post (ver articleMetadata.ts). Probado y
// descartado: un blog/not-found.tsx anidado (mismo shell) y un catch-all
// [lang]/[...rest] (hereda dynamicParams = false → fallback: false, nunca se
// renderiza). Leer headers() en global-not-found daría lang="en" en /en/...
// pero volvería dinámica la 404 de todo el sitio (una función por cada 404).
export { default } from '../components/NotFoundView';
