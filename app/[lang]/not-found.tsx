// notFound() lanzado dentro de una página de [lang] (perfiles de abogado,
// colaboradores, newsletter, posts programados…). Se pinta dentro del root
// layout del locale, así que su <html lang> ya sale correcto del servidor.
// Las URLs que no coinciden con ninguna ruta las pinta app/global-not-found.tsx.
export { default } from '../components/NotFoundView';
